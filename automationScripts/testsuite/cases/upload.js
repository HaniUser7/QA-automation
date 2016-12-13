//----- This js file covers all the upload functionality on forum Frontend---------//
var config = require('../../../config/config.json');
var uploadMethods = require('../uploadmethods/uploadmethod.js');
var inContextLoginMethod = require('../methods/inContextLogin.js');
var loginPrivacyOptionMethod = require('../methods/loginByPrivacyOption.js');
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
								inContextLoginMethod.logoutFromApp(casper, function(err){
									if (!err)
										casper.echo('Successfully logout from application', 'INFO');
								});
	
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
						wait.waitForElement('form[name="posts"] a.topic-title', casper, function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('form[name="posts"] a.topic-title');
								casper.click('span.topic-content a');
								//casper.click(' a#message_imagebutton span:nth-child(1)');
								inContextLoginMethod.logoutFromApp(casper, function(err){
									if (!err)
										casper.echo('Successfully logout from application', 'INFO');
								});
								casper.thenOpen('https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/16748357' , function(){
									wait.waitForTime(1000 , casper , function(err) {
										casper.capture('uploadInsert.png');	
										

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
			
//Verify with start new Topic(latest topics page)(Attachment/insert photos)

uploadTests.uploadStartNewTopic=function(){				
	casper.thenOpen(config.url, function() {						
		casper.echo('*****Verify with start new topic page(Attachment photo','INFO');							
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');	
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
						wait.waitForElement('div#topics a' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('div#topics a');	
								wait.waitForElement('button#post_submit' , casper , function(err , isExists ){
									if(isExists) {
										inContextLoginMethod.logoutFromApp(casper, function(err){
											if (!err)
												casper.echo('Successfully logout from application', 'INFO');
										});	

									}
									casper.thenOpen('https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/16748357' , function(){
										wait.waitForTime(1000 , casper , function(err) {
											casper.capture('uploadstart.png');	

										});
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

//Verify with start new Topic(latest topics page)(Attachment/insert photos)
uploadTests.uploadStartNewTopicInsert=function(){
	casper.thenOpen(config.url, function() {						
		casper.echo('*****Verify with start new topic page(insert photo)','INFO');		
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');	
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
						wait.waitForElement('div#topics a' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('div#topics a');	
								wait.waitForElement('button#post_submit' , casper , function(err , isExists ){
									if(isExists) {
										casper.click('a#message_imagebutton span:nth-child(1)');
										inContextLoginMethod.logoutFromApp(casper, function(err){
											if (!err)
												casper.echo('Successfully logout from application', 'INFO');
										});	

									}
									casper.thenOpen('https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/16748357' , function(){
										wait.waitForTime(1000 , casper , function(err) {
											casper.capture('uploadstartinsert.png');	

										});
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

//Verify with start new Topic Insert Photo IInd
uploadTests.uploadStartNewTopicInsertCamera=function(){
	casper.thenOpen(config.url, function() {						
		casper.echo('*****Verify with start new topic page(insert photo) 2nd','INFO');		
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');	
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
						wait.waitForElement('div#topics a' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('div#topics a');	
								wait.waitForElement('button#post_submit' , casper , function(err , isExists ){
									if(isExists) {
										casper.click('i.glyphicon.glyphicon-camera');
										//casper.capture('');
										inContextLoginMethod.logoutFromApp(casper, function(err){
											if (!err)
												casper.echo('Successfully logout from application', 'INFO');
										});	

									}
									casper.thenOpen('https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/16748357' , function(){
										wait.waitForTime(1000 , casper , function(err) {
											casper.capture('uploadstartinsert2.png');	

										});
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

//Verify with start new Topic Insert Photo IInd camera
uploadTests.uploadStartNewTopicInsertCameraWeb=function(){
	casper.thenOpen(config.url, function() {						
		casper.echo('*****Verify with start new topic page(insert photo) camera','INFO');		
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');	
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
						wait.waitForElement('div#topics a' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('div#topics a');	
								wait.waitForElement('button#post_submit' , casper , function(err , isExists ){
									if(isExists) {
										casper.click('i.glyphicon.glyphicon-camera');
										wait.waitForElement('a#insertImage_' , casper , function(err , isExists) {
											if(isExists) {
												casper.click('a[href^="#url"]');
												wait.waitForElement('button#insert_image_btn' ,casper , function(err , isExists) {
													if(isExists) {
													casper.sendKeys('#web_image_url', 'https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/16748357');	
													casper.capture('send.png');
													casper.click('button#insert_image_btn');				
														
													}


												});
												
												

											}
										



										});
										//casper.capture('');
										inContextLoginMethod.logoutFromApp(casper, function(err){
											if (!err)
												casper.echo('Successfully logout from application', 'INFO');
										});	

									}
									casper.thenOpen('https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/16748357' , function(){
										wait.waitForTime(1000 , casper , function(err) {
											casper.capture('uploadstartinsert2.png');	

										});
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


//Verify with topic listing page under category(start new topic)(Attachment/insert photos)

uploadTests.uploadStartNewTopicUnderCat=function(){
	casper.thenOpen(config.url, function() {	
		casper.echo('*****Verify with start new topic page from undercategory ','INFO');		
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');		
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
						wait.waitForElement('a[href="/categories"]' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('a[href="/categories"]');
								wait.waitForElement('a#startTopic' , casper ,function(err ,isExists) {
									if(isExists) {
										casper.click('a#startTopic');		
										wait.waitForElement('button#post_submit' , casper , function(err , isExists ){
											if(isExists) {

												casper.click('i.glyphicon.glyphicon-camera');
												wait.waitForElement('a#insertImage_' , casper , function(err , isExists) {
													if(isExists) {

														//casper.click('a#web');
														casper.evaluate(function() {
															document.querySelector('a#web').click();
														});													  																		



														casper.wait(1000,function(){

															casper.capture('1.png');
															casper.sendKeys('input[name="fname"]', 'https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/16748357');	
															casper.click('button#insert_image_btn');				
															casper.wait(2000, function(){
															casper.capture('2.png');
															inContextLoginMethod.logoutFromApp(casper, function(err){
	if (!err)
		casper.echo('Successfully logout from application', 'INFO');
});	


															});
															
															
														});


													}


												});
												
											}
											

										});


									}


								});
								
								
									
									casper.thenOpen('https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/16748357' , function(){
										wait.waitForTime(1000 , casper , function(err) {
											casper.capture('uploadunderstart.png');	

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


//Verify with category from forum listing page(start new topic)(Attachment/insert photos)
uploadTests.uploadStartNewTopicforumlisting=function(){
	casper.thenOpen(config.url, function() {
	
		casper.echo('*****Verify with start new topic page from forum listing page ','INFO');		
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');		
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
						wait.waitForElement('a[href="/categories"]' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('a[href="/categories"]');
								wait.waitForElement('span.forum-title:nth-child(1)' ,casper , function(err , isExists) {
								if(isExists){
								casper.click('span.forum-title:nth-child(1)');
								wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary ' , casper , function( err , isExists) {

									if(isExists) {
										casper.click('a.pull-right.btn.btn-uppercase.btn-primary ');
										wait.waitForElement('button#post_submit' , casper , function(err , isExists ){
											if(isExists) {

												casper.click('i.glyphicon.glyphicon-camera');
												wait.waitForElement('a#insertImage_' , casper , function(err , isExists) {
													if(isExists) {

												
														casper.evaluate(function() {
															document.querySelector('a#web').click();
														});													  																		



														casper.wait(1000,function(){

															casper.capture('1.png');
															casper.sendKeys('input[name="fname"]', 'https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/thumb/16748462');	
															casper.click('button#insert_image_btn');				
															casper.wait(2000, function(){
															casper.capture('2.png');
															inContextLoginMethod.logoutFromApp(casper, function(err){
	if (!err)
		casper.echo('Successfully logout from application', 'INFO');
});	

															});
														});
													}
												});
											}
										});
									}
									casper.thenOpen('https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/thumb/16748462' , function(){
										wait.waitForTime(1000 , casper , function(err) {
											casper.capture('uploadunderstart.png');	

										});
									});	



								});
							     }
							});



							}
						});
					}
				});
			}
		});
	});
		
};

//Verify with post listing page under category(post a reply)(Attachment/insert photos)
uploadTests.uploadPostListingUnderCategory=function(){
	casper.thenOpen(config.url, function() {
		
		casper.echo('*****Verify with postreply undercategory on forum listing page ','INFO');		
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');		
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
						wait.waitForElement('a[href="/categories"]' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('a[href="/categories"]');
								wait.waitForElement('span.forum-title:nth-child(1)' ,casper , function(err , isExists) {
									if(isExists){
										casper.click('span.forum-title:nth-child(1)');
										wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary ' , casper , function( err , isExists) {
											if(isExists) {
												casper.click('form[name="posts"] a.topic-title');
												wait.waitForElement('a#sub_post_reply' , casper , function(err , isExists) {
													if(isExists) {
														
																casper.click('i.glyphicon.glyphicon-camera');
																wait.waitForElement('a#insertImage_' , casper , function(err , isExists) {
																		if(isExists) {

														
														casper.evaluate(function() {
															document.querySelector('a#web').click();
														});													  																				casper.wait(1000,function(){

															casper.capture('1.png');
															casper.sendKeys('input[name="fname"]', 'https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/thumb/16748462');	
															casper.click('button#insert_image_btn');				
															casper.wait(1000, function(){
															casper.capture('2.png');
															inContextLoginMethod.logoutFromApp(casper, function(err){
	if (!err)
		casper.echo('Successfully logout from application', 'INFO');
});	

															});
														});
													}
												});
											
										casper.thenOpen('https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/thumb/16748462' , function(){
											wait.waitForTime(1000 , casper , function(err) {
												casper.capture('uploadunderstart.png');	

											});
										});	




															

													}												


												});
											}


										});
									}
								});
							}
						});
					}
				});
			}
		});
	});
};



