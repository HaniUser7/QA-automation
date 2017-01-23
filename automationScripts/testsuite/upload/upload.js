//----- This js file covers all the upload functionality on forum Frontend---------//
var config = require('../../../config/config.json');
var uploadMethods = require('../uploadmethods/uploadmethod.js');
var wait=require('../wait.js');
uploadTests = module.exports = {};


//Verify with post from topic listing page(Attachment/insert photos)
uploadTests.uploadPostAttachment=function(){
	casper.echo('*************Verify with post from topic listing page(Attachment/insert photos)**********','INFO');
	wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
		if(isExists) {
			casper.test.assertExists('a#td_tab_login');
			casper.click('a#td_tab_login');
			wait.waitForElement('form[name="frmLogin"]', casper, function(err, isExists) {
				if(isExists) {
					casper.fill('form[name="frmLogin"]', {
						'member' : 'hani',
						 'pw' : 'hani'
					}, false);
					casper.test.assertExists('form[name="frmLogin"] button');
					casper.click('form[name="frmLogin"] button');
					wait.waitForElement('form[name="posts"] a.topic-title', casper, function(err, isExist) {
						if(isExists) {
							casper.test.assertExists('form[name="posts"] a.topic-title');
							casper.click('span.topic-content a');
								/*uploadMethods.uploadMethod('https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/16748357' , casper , function(err , isExists) {
									if(!err)
									{
										casper.echo('Image  uploaded successfully' ,'INFO');

									}								
								});
								casper.click('a#message_imagebutton span.mceIcon.mce_imagebutton');
								wait.waitForElement('a#insertImage_' , casper , function(err , isExists) {
									if(isExists) {
												

									
									}
										
								});*/
								casper.thenOpen('https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/16748357' , function(){
									wait.waitForTime(1000 , casper , function(err) {
										casper.capture('upload.png');	

									});
								});							
							}
						});
					}
				});
			}
		});
};
		
			
//Verify with post from topic listing page(InsertPhoto)
			
uploadTests.uploadPostAttachmentInsert=function(){
	casper.thenOpen(config.url, function() {
		casper.echo('**********Verify with post from topic listing page(insert photos)*******','INFO');		
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				casper.test.assertExists('a#td_tab_login');
				casper.click('a#td_tab_login');
				wait.waitForElement('form[name="frmLogin"]', casper, function(err, isExists) {
					if(isExists) {
						casper.fill('form[name="frmLogin"]', {
							'member' : 'hani',
							 'pw' : 'hani'
						}, false);
						casper.test.assertExists('form[name="frmLogin"] button');
						casper.click('form[name="frmLogin"] button');
						wait.waitForElement('form[name="posts"] a.topic-title', casper, function(err, isExist) {
							if(isExists) {
								casper.test.assertExists('form[name="posts"] a.topic-title');
								casper.click('span.topic-content a');
								casper.click('a#message_imagebutton span.mceIcon.mce_imagebutton');
									
								casper.thenOpen('https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/16748357' , function(){
									wait.waitForTime(1000 , casper , function(err) {
										casper.capture('upload.png');	

									});
								});							
							}
						});
					}
				});
			}
		});
	});
};


					
						
												











										

										
									

