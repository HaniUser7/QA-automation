var uploadMethods= module.exports = {};

uploadMethods.uploadMethod=function(data , driver , callback ){
	casper.thenOpen('data', function(){
		casper.echo('ImageUploaded','INFO');
		casper.wait(1000 , function(){
			casper.capture('uploadImage.png');
		});
	});

};




