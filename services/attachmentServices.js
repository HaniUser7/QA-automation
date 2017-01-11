'use strict';
var fs = require('fs');
var attachmentServices = module.exports = {};

//Method to Delete Old Directory
attachmentServices.deleteFolderRecursive = function(path, callback) {
	if( fs.existsSync(path) ) {
		fs.readdirSync(path).forEach(function(file,index){
			var curPath = path + "/" + file;
			if(fs.lstatSync(curPath).isDirectory()) { 
				// recurse
				attachmentServices.deleteFolderRecursive(curPath, callback);
			} else { 
				// Delete File
				console.log('deleting file : '+curPath);
				fs.unlinkSync(curPath);
			}
		});
		console.log('deleting directory : '+path);
		fs.rmdirSync(path);
	}
	return callback();
};

//Method to Add Attachments
attachmentServices.addAttachments = function(dirPath, commitDetails, callback) {
	if( fs.existsSync(dirPath) ) {
		console.log('directory path "'+dirPath+'" exists');
		console.log('commitDetails : '+JSON.stringify(commitDetails));
		fs.readdirSync(dirPath).forEach(function(file,index){
			var curPath = dirPath + "/" + file;
			if(fs.lstatSync(curPath).isDirectory()) { 
				// recurse
				attachmentServices.addAttachments(curPath, commitDetails, callback);
			} else { 
				//Adding Files To The Attachments
				var imagePath = { 
					path: curPath
				};
				commitDetails.attachments.push(imagePath);
			}
		});
	}
	return callback(commitDetails);
};
