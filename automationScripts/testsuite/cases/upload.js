//----- This js file covers all the upload functionality on forum Frontend---------//
var config = require('../../../config/config.json');
var json = require('../../testdata/inContextLogin.json');
var uploadMethods = require('../methods/uploadmethod.js');
var inContextLoginMethod = require('../methods/inContextLogin.js');
var loginPrivacyOptionMethod = require('../methods/loginByPrivacyOption.js');
var postEventMemberApprovalMethod = require('../methods/postEventMemberApproval.js');
var wait=require('../wait.js');
var utils=require('../utils.js');
uploadTests = module.exports = {};


//Verify with post from topic listing page(Attachment/insert photos)
uploadTests.uploadPostAttachment=function(){
	casper.echo('*************Verify with post from topic listing page(Attachment/insert photos)**********','INFO');
	inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
		if (err) {
			casper.echo("Error occurred in callback user not logged-in", "ERROR");	
		}else {
			casper.echo('Processing to Login on forum.....',

 'INFO');
			try {
				wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists){
				casper.test.assertExists('form[name="posts"] a.topic-title','Topic found');
				
				
				
			} catch (e) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						//method to create a new topic
						postEventMemberApprovalMethod.startTopic(json['newtopic'], casper, function(err) {
							if(!err) {
								casper.echo('new topic created', 'INFO');
							}else {
								casper.echo('Topic not created', 'INFO');
							}
						});	
					} else {
						casper.echo('User icon not found','ERROR');	
					}
				});
			}
			casper.then(function() {
				inContextLoginMethod.logoutFromApp(casper, function(err){
					if (!err)
						casper.echo('Successfully logout from application', 'INFO');
				});
			});
		}
			/*wait.waitForElement('form[name="posts"] a.topic-title', casper, function(err, isExist) {
				if(isExists) {
					
					casper.test.assertExists('form[name="posts"] a.topic-title');
					casper.click('span.topic-content a');
					inContextLoginMethod.logoutFromApp(casper, function(err){
						if (!err)
							casper.echo('Successfully logout from application', 'INFO');
					});
				}
			});*/
		});
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
/*uploadTests.uploadStartNewTopicInsertCameraWeb=function(){
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
									casper.thenOpen('https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/16748357' , function(){inContextLoginMethod.loginToApp(json['validInfo'].username, json['validInfo'].password, casper, function(err) {
													if (err) {
														casper.echo("Error occurred in callback user not logged-in", "ERROR");	
													}else {
														casper.echo('Processing to Login on forum.....', 'INFO');
										wait.waitForTime(1000 , casper , function(err) {
											casper.capture('uploadstartinsert2.png');	

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
};*/	


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



//calender

//Verify with calender page(insert photos)
uploadTests.uploadCalenderEvent=function(){
	casper.thenOpen(config.backEndUrl, function() {	
		casper.echo('Verify with calender page(insert photos)','INFO');		
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		loginPrivacyOptionMethod.loginToForumBackEnd(casper , function(err) {
			if (!err)
				casper.echo('LoggedIn to forum backend....', 'INFO');
		});
		wait.waitForElement('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]' , casper , function(err ,isExists) {
			if(isExists) {	

				uploadMethods.BackEndSettings(casper , function(err) {
					if(!err)
						casper.echo('Backend settings done','INFO');

				});
				casper.thenOpen(config.url , function(){
					casper.echo("Title of the page :"+this.getTitle(), 'INFO');
					inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
						if (err) {
							casper.echo("Error occurred in callback user not logged-in", "ERROR");	
						}else {
							casper.echo('Processing to Login on forum.....',
 'INFO');
											
						wait.waitForElement('i.icon.icon-menu' ,casper , function(err , isExists) {
							if(isExists) {
								casper.click('i.icon.icon-menu');
								casper.evaluate(function() {
									document.querySelector('a[href^="/calendar"]').click();
								});
								//casper.click('a[href^="/calendar"]');
								wait.waitForElement('i.glyphicon.glyphicon-plus' , casper , function(err , isExists) {
									if(isExists) {
										casper.click('i.glyphicon.glyphicon-plus');
										wait.waitForElement('button#post_event_buttton' , casper , function(err , isExists) {
											if(isExists) {
												casper.click(' a#message_imagebutton span:nth-child(1)');		

												casper.evaluate(function() {
																		document.querySelector('a#web').click();
												});													  																				casper.wait(1000,function(){

															casper.capture('calendar.png');
															casper.sendKeys('input[name="fname"]', 'https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/thumb/16748462');	
															casper.click('button#insert_image_btn');				
															casper.wait(1000, function(){
															casper.capture('calendar2.png');
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
		
								}
								//thenopen
								casper.thenOpen('https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/thumb/16748462' , function(){
									wait.waitForTime(1000 , casper , function(err) {
										casper.capture('uploadunderstart.png');	

									});
								});	
							});
						});
					}
				});
			});
};

//verify with Edit the event from calender page(insert photos)
uploadTests.uploadCalenderEditEvent=function(){
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('Verify with Edit event calender page(insert photos)','INFO');		
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		loginPrivacyOptionMethod.loginToForumBackEnd(casper , function(err) {
			if (!err)
				casper.echo('LoggedIn to forum backend....', 'INFO');
		});
		wait.waitForElement('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]' , casper , function(err ,isExists) {
			if(isExists) {	
				uploadMethods.BackEndSettings(casper , function(err) {
					if(!err)
						casper.echo('Backend settings done','INFO');

				});
				casper.thenOpen(config.url , function(){
					casper.echo("Title of the page :"+this.getTitle(), 'INFO');
					inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
						if (err) {
							casper.echo("Error occurred in callback user not logged-in", "ERROR");	
						}else {
							casper.echo('Processing to Login on forum.....',
 'INFO');
							wait.waitForElement('i.icon.icon-menu' ,casper , function(err , isExists) {
								if(isExists) {
									casper.click('i.icon.icon-menu');
									casper.evaluate(function() {
										document.querySelector('a[href^="/calendar"]').click();
									});
								
									wait.waitForElement('i.glyphicon.glyphicon-plus' , casper , function(err , isExists) {
										if(isExists) {
											casper.click('i.glyphicon.glyphicon-plus');
											wait.waitForElement('button#post_event_buttton' , casper , function(err , isExists) {
												if(isExists) {
													casper.sendKeys('input[name="event_title"]', 'hello how are you');
													
													utils.enableorDisableCheckbox('allDay',true, casper, function(err) {
														if(!err)
															casper.echo('Successfully checked','INFO');
													});


													casper.capture('444.png');


													casper.click(' a#message_imagebutton span:nth-child(1)');
													
													casper.evaluate(function() {
																		document.querySelector('a#web').click();
													});		
casper.wait(1000 ,function(err){
											  						casper.capture('calendaredit.png');
															casper.sendKeys('input[name="fname"]', 'https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/thumb/16748462');	
															casper.click('button#insert_image_btn');				
															casper.wait(1000, function(){
															casper.capture('calendaredit2.png');
casper.click('button#post_event_buttton');
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
									casper.thenOpen('https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/thumb/16748462' , function(){
										wait.waitForTime(1000 , casper , function(err) {
											casper.capture('uploadunderstart.png');	

										});
									});
									
								}
							});
						}
					});
				});
			}
		});
	});
};

//verify with Edit the event from calender page event ranged/recurring/same day
uploadTests.uploadCalenderEditEventrecurring=function(){
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('Verify with Edit event calender page recurring','INFO');		
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		loginPrivacyOptionMethod.loginToForumBackEnd(casper , function(err) {
			if (!err)
				casper.echo('LoggedIn to forum backend....', 'INFO');
		});
		wait.waitForElement('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]' , casper , function(err ,isExists) {
			if(isExists) {	
				uploadMethods.BackEndSettings(casper , function(err) {
					if(!err)
						casper.echo('Backend settings done','INFO');

				});
				casper.thenOpen(config.url , function(){
					casper.echo("Title of the page :"+this.getTitle(), 'INFO');
					inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
						if (err) {
							casper.echo("Error occurred in callback user not logged-in", "ERROR");	
						}else {
							casper.echo('Processing to Login on forum.....',
 'INFO');
							wait.waitForElement('i.icon.icon-menu' ,casper , function(err , isExists) {
								if(isExists) {
									casper.click('i.icon.icon-menu');
									casper.evaluate(function() {
										document.querySelector('a[href^="/calendar"]').click();
									});
								
									wait.waitForElement('i.glyphicon.glyphicon-plus' , casper , function(err , isExists) {
										if(isExists) {
											casper.click('i.glyphicon.glyphicon-plus');
											wait.waitForElement('button#post_event_buttton' , casper , function(err , isExists) {
												if(isExists) {
													casper.sendKeys('input[name="event_title"]', 'hello1');
													utils.enableorDisableCheckbox('repeat',true, casper, function(err) {
														if(!err)
															casper.echo('Successfully checked','INFO');
													});
													inContextLoginMethod.logoutFromApp(casper, function(err){
	if (!err)
		casper.echo('Successfully logout from application', 'INFO');
});	
													
												}
											});
										}
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
				});
			}
		});
	});
};

//Verify with private message(send new message)(Attachment)

uploadTests.uploadPrivateMessage=function(){
	casper.thenOpen(config.url , function(){	
		casper.echo('Verify with private message send new message Attachment','INFO');		
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');	
		inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
			if (err) {
				casper.echo("Error occurred in callback user not logged-in", "ERROR");	
			}else {
				casper.echo('Processing to Login on forum.....',
 'INFO');
				wait.waitForTime(1000 , casper , function(err) {
					wait.waitForElement('i#private_message_notification' , casper , function(err , isExists) {
						if(isExists){
							casper.click('i#private_message_notification');
							wait.waitForElement('ul#private_message_dropdown' , casper , function(err , isExists) {
								if(isExists){
									
									casper.click('a.send_new_pmsg');
									wait.waitForElement('a#send_pmsg_button' , casper , function(err , isExists) {
										if(isExists){
											uploadMethods.fillDataToMessage(casper, function(err , isExists) {
												if(!err)
													casper.echo('Data fill successfully','INFO');
											});
											inContextLoginMethod.logoutFromApp(casper, function(err){
												if (!err)
													casper.echo('Successfully logout from application', 'INFO');
											});	
										}							
	
									});
								}

						    });	
						}
					
					});
				});
			}
			casper.thenOpen('https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/thumb/16748462' , function(){
				wait.waitForTime(1000 , casper , function(err) {
					casper.capture('uploadunderstart.png');	
				});
			});
			
		});
	});
};

//Verify with private message(Inbox)(Insert photo) Attachment
uploadTests.uploadPrivateMessageInbox=function(){
	casper.thenOpen(config.url , function(){	
		casper.echo('Verify with private message send new message Inbox','INFO');		
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');	
		inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
			if (err) {
				casper.echo("Error occurred in callback user not logged-in", "ERROR");	
			}else {
				casper.echo('Processing to Login on forum.....',
 'INFO');
				wait.waitForTime(1000 , casper , function(err) {
					wait.waitForElement('i#private_message_notification' , casper , function(err , isExists) {
						if(isExists){
							casper.click('i#private_message_notification');
							wait.waitForElement('ul#private_message_dropdown a.pull-left' , casper , function(err , isExists) {
								if(isExists){
									
									casper.click('ul#private_message_dropdown a.pull-left');

									wait.waitForElement('a.pull-right.btn-primary.send_new_pmsg small' , casper , function(err , isExists) {
										if(isExists){
											  casper.click('a.pull-right.btn-primary.send_new_pmsg small.glyphicon.glyphicon-plus');
											 /*uploadMethods.fillDataToMessage(casper, function(err) {
												if(!err)
																	casper.echo('Data fill successfully','INFO');		
											});*/
	
											inContextLoginMethod.logoutFromApp(casper, function(err){
												if (!err)
													casper.echo('Successfully logout from application', 'INFO');
											});
										}							
	
									});
								}

						    });	
						}
					
					});
				});
			}
			casper.thenOpen('https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/thumb/16748462' , function(){
				wait.waitForTime(1000 , casper , function(err) {
					casper.capture('uploadunderstart.png');	
				});
			});
			
		});
	});
};


//Verify with private message(Inbox)(Insert photo) camera browse

uploadTests.uploadPrivateMessageInboxbrowse=function(){
	casper.thenOpen(config.url , function(){	
		casper.echo('Verify with private message send new message Inbox','INFO');		
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');	
		inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
			if (err) {
				casper.echo("Error occurred in callback user not logged-in", "ERROR");	
			}else {
				casper.echo('Processing to Login on forum.....',
 'INFO');
				wait.waitForTime(1000 , casper , function(err) {
					wait.waitForElement('i#private_message_notification' , casper , function(err , isExists) {
						if(isExists){
							casper.click('i#private_message_notification');
							wait.waitForElement('ul#private_message_dropdown a.pull-left' , casper , function(err , isExists) {
								if(isExists){
									
									casper.click('ul#private_message_dropdown a.pull-left');

									wait.waitForElement('a.pull-right.btn-primary.send_new_pmsg small' , casper , function(err , isExists) {
										if(isExists){
											  casper.click('a.pull-right.btn-primary.send_new_pmsg small.glyphicon.glyphicon-plus');
											 /*uploadMethods.fillDataToMessage(casper, function(err) {
												if(!err)
																	casper.echo('Data fill successfully','INFO');		
											});*/
											casper.click('i.glyphicon.glyphicon-camera');
											wait.waitForElement('a#insertImage_' , casper , function(err , isExists) {
												if(isExists) {
																										
													casper.echo('Image uploaded' ,'INFO');
												}
												
											
											});
	
											inContextLoginMethod.logoutFromApp(casper, function(err){
												if (!err)
													casper.echo('Successfully logout from application', 'INFO');
											});
										}							
	
									});
								}

						    });	
						}
					
					});
				});
			}
			casper.thenOpen('https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/thumb/16748462' , function(){
				wait.waitForTime(1000 , casper , function(err) {
					casper.capture('uploadunderstart.png');	
				});
			});
			
		});
	});
};

//Verify with private message(Inbox)(Insert photo) camera webaddress

uploadTests.uploadPrivateMessageInboxwebaddress=function(){
	casper.thenOpen(config.url , function(){	
		casper.echo('Verify with private message send new message Inbox web address','INFO');		
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');	
		inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
			if (err) {
				casper.echo("Error occurred in callback user not logged-in", "ERROR");	
			}else {
				casper.echo('Processing to Login on forum.....',
 'INFO');
				wait.waitForTime(1000 , casper , function(err) {
					wait.waitForElement('i#private_message_notification' , casper , function(err , isExists) {
						if(isExists){
							casper.click('i#private_message_notification');
							wait.waitForElement('ul#private_message_dropdown a.pull-left' , casper , function(err , isExists) {
								if(isExists){
									
									casper.click('ul#private_message_dropdown a.pull-left');

									wait.waitForElement('a.pull-right.btn-primary.send_new_pmsg small' , casper , function(err , isExists) {
										if(isExists){
											  casper.click('a.pull-right.btn-primary.send_new_pmsg small.glyphicon.glyphicon-plus');
											 /*uploadMethods.fillDataToMessage(casper, function(err) {
												if(!err)
																	casper.echo('Data fill successfully','INFO');		
											});*/
											casper.click('i.glyphicon.glyphicon-camera');
											wait.waitForElement('a#insertImage_' , casper , function(err , isExists) {
												if(isExists) {
																										
												casper.evaluate(function() {
																		document.querySelector('a#web').click();
												});													  																				casper.wait(1000,function(){

															casper.capture('calendar.png');
															casper.sendKeys('input[name="fname"]', 'https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/thumb/16748462');	
															casper.click('button#insert_image_btn');				
															casper.wait(1000, function(){
															casper.capture('calendar2.png');
												});
												
											
											});
	
											inContextLoginMethod.logoutFromApp(casper, function(err){
												if (!err)
													casper.echo('Successfully logout from application', 'INFO');
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
			casper.thenOpen('https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/thumb/16748462' , function(){
				wait.waitForTime(1000 , casper , function(err) {
					casper.capture('uploadunderstart.png');	
				});
			});
			
		}
	});
    });
};


//Verify with private message(Inbox)(Insert photo) camera Image button
uploadTests.uploadPrivateMessageInboxImageButton=function(){
	casper.thenOpen(config.url , function(){	
		casper.echo('Verify with private message send new message Inbox web address','INFO');		
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');	
		inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
			if (err) {
				casper.echo("Error occurred in callback user not logged-in", "ERROR");	
			}else {
				casper.echo('Processing to Login on forum.....',
 'INFO');
				wait.waitForTime(1000 , casper , function(err) {
					wait.waitForElement('i#private_message_notification' , casper , function(err , isExists) {
						if(isExists){
							casper.click('i#private_message_notification');
							wait.waitForElement('ul#private_message_dropdown a.pull-left' , casper , function(err , isExists) {
								if(isExists){
									
									casper.click('ul#private_message_dropdown a.pull-left');

									wait.waitForElement('a.pull-right.btn-primary.send_new_pmsg small' , casper , function(err , isExists) {
										if(isExists){
											  casper.click('a.pull-right.btn-primary.send_new_pmsg small.glyphicon.glyphicon-plus');
											 /*uploadMethods.fillDataToMessage(casper, function(err) {
												if(!err)
																	casper.echo('Data fill successfully','INFO');		
											});*/
											casper.click('a#pmessage_new_imagebutton span');
											wait.waitForElement('a#insertImage_' , casper , function(err , isExists) {
												if(isExists) {
																										
												casper.evaluate(function() {
																		document.querySelector('a#web').click();
												});													  																				casper.wait(1000,function(){

															casper.capture('imagePopUp.png');
															casper.sendKeys('input[name="fname"]', 'https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/thumb/16748462');	
															casper.click('button#insert_image_btn');				
															casper.wait(1000, function(){
															casper.capture('inboxImageButton.png');
												});
												
											
											});
	
											inContextLoginMethod.logoutFromApp(casper, function(err){
												if (!err)
													casper.echo('Successfully logout from application', 'INFO');
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
			casper.thenOpen('https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/thumb/16748462' , function(){
				wait.waitForTime(1000 , casper , function(err) {
					casper.capture('InboxCameraImagebutton.png');	
				});
			});
			
		}
	});
    });
};


//Verify with private message(reply section)(Attachment/insert photos)
/*uploadTests.uploadPrivateMessageInboxReplySection=function(){
	casper.thenOpen(config.url , function(){	
		casper.echo('Verify with private message Inbox reply section  web address','INFO');		
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');	
		inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
			if (err) {
				casper.echo("Error occurred in callback user not logged-in", "ERROR");	
			}else {
				casper.echo('Processing to Login on forum.....',
 'INFO');
				wait.waitForTime(1000 , casper , function(err) {
					wait.waitForElement('i#private_message_notification' , casper , function(err , isExists) {
						if(isExists){
							casper.click('i#private_message_notification');
							wait.waitForElement('ul#private_message_dropdown a.pull-left' , casper , function(err , isExists) {
								if(isExists) {message3_imagebutton
									casper.click('ul#private_message_dropdown a.pull-left');
									wait.waitForElement('a.pull-right.btn-primary.send_new_pmsg small' , casper , function(err , isExists) {
										if(isExists) {
											wait.waitForElement('pmessage_reply_ifr',casper ,function (err , is){								
casper.sendKeys('#tinymce', 								casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});		
											casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});		

										});

									});

										
 																		
								casper.wait(1000, function(){
									casper.capture('bod.png');
								});	

								}
							});
						}
					});
				});
			}
		});
	});
};*/

//Edit Section
//Verify with Edit the Post from Topic listing page(attachment/insert photos)	

uploadTests.uploadEditPostAttachment=function(){
	casper.echo('***********Edit Section**********' ,'INFO');
	casper.echo('*************Verify with post from topic listing page(Attachment)**********','INFO');
	wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
		if(isExists) {
			inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
				if (err) {
					casper.echo("Error occurred in callback user not logged-in", "ERROR");	
				}else {
					casper.echo('Processing to Login on forum.....',
			
 'INFO');
					wait.waitForElement('form[name="posts"] a.topic-title', casper, function(err, isExist) {
						if(isExists) {
							casper.test.assertExists('form[name="posts"] a.topic-title');
							casper.click('span.topic-content a');
							wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' ,casper , function(err , isExists) {
								if(isExists) {
									casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
									inContextLoginMethod.logoutFromApp(casper, function(err){
										if (!err)
											casper.echo('Successfully logout from application', 'INFO');
									});
								}
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
			
//Verify with Edit the Post from Topic listing page(insert photos) camera web address
	
uploadTests.uploadEditPostCameraWeb=function(){
	casper.thenOpen(config.url , function(){
		casper.echo('***********Edit Section**********' ,'INFO');
		casper.echo('*************Verify with post from topic listing page(Attachment)**********','INFO');
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....',
			
 'INFO');
						wait.waitForElement('form[name="posts"] a.topic-title', casper, function(err, isExist) {
							if(isExists) {
								casper.test.assertExists('form[name="posts"] a.topic-title');
								casper.click('span.topic-content a');
								wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' ,casper , function(err , isExists) {
									if(isExists) {
										casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
										wait.waitForElement('i.glyphicon.glyphicon-camera' , casper , function( err , isExists){
											if(isExists) {
												casper.click('i.glyphicon.glyphicon-camera');
												wait.waitForElement('a#insertImage_' , casper , function(err , isExists) {
													if(isExists) {
																										
														casper.evaluate(function() {
																document.querySelector('a#web').click();
														});													  																				casper.wait(1000,function(){

															casper.capture('imagePopUp.png');
															casper.sendKeys('input[name="fname"]', 'http://s3.amazonaws.com/betafiles.websitetoolbox.com/117/thumb/16748568');	
															casper.click('button#insert_image_btn');				
															casper.wait(9000, function(){
																casper.capture('inboxCameraButton.png');
															
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
									casper.thenOpen('https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/16748357' , function(){
										wait.waitForTime(1000 , casper , function(err) {
											casper.capture('EditPostcameraWebAddress.png');
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

//Verify with Edit the Post from Topic listing page(insert photos) camera browse
uploadTests.uploadEditPostCamerabrowse=function(){
	casper.thenOpen(config.url , function(){
		casper.echo('***********Edit Section**********' ,'INFO');
		casper.echo('*************Verify with post from topic listing page(Attachment)**********','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....',
			
 'INFO');
						wait.waitForElement('form[name="posts"] a.topic-title', casper, function(err, isExist) {
							if(isExists) {
								casper.test.assertExists('form[name="posts"] a.topic-title');
								casper.click('span.topic-content a');
								wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' ,casper , function(err , isExists) {
									if(isExists) {
										casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
										wait.waitForElement('i.glyphicon.glyphicon-camera' , casper , function( err , isExists){
											if(isExists) {
												casper.click('i.glyphicon.glyphicon-camera');
												wait.waitForElement('a#insertImage_' , casper , function(err , isExists) {
													if(isExists) {
														inContextLoginMethod.logoutFromApp(casper, function(err){
															if (!err)
																casper.echo('Successfully logout from application', 'INFO');
														});		

													}


												});
											}
										});
									}
								casper.thenOpen('https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/16748357' , function(){
									wait.waitForTime(1000 , casper , function(err) {
										casper.capture('upload.png');
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

//Verify with Edit the Topic/Post from Topic listing page Attachment
uploadTests.uploadEditPostAttachment=function(){
	casper.thenOpen(config.url , function(){
		casper.echo('***********Edit Section**********' ,'INFO');
		casper.echo('*************Verify with Edit post from topic listing page(Attachment)**********','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....',
			
 'INFO');
						wait.waitForElement('form[name="posts"] a.topic-title', casper, function(err, isExist) {
							if(isExists) {
								casper.test.assertExists('form[name="posts"] a.topic-title');
								casper.click('span.topic-content a');
								wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' ,casper , function(err , isExists) {
									if(isExists) {
										wait.waitForElement('i.glyphicon.glyphicon-chevron-down' , casper , function( err , isExists) {
											if(isExists){
												casper.click('i.glyphicon.glyphicon-chevron-down');
												casper.click('a#edit_post_request');
												wait.waitForElement('i.icon.glyphicon-paperclip' , casper , function(err , isExists) {
													if(isExists){
														inContextLoginMethod.logoutFromApp(casper, function(err){
															if (!err)
																casper.echo('Successfully logout from application', 'INFO');
														});		
	
																												

													}

												});
											}

										});
									
									}
								});
							}
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
	});
};

//Verify with Edit the Topic/Post from Topic listing page insert photo webaddress
uploadTests.uploadEditPostcameraWebaddress=function(){
	casper.thenOpen(config.url , function(){
		casper.echo('***********Edit Section**********' ,'INFO');
		casper.echo('*************Verify with Edit post from topic listing using webaddress**********','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....',
			
 'INFO');
						wait.waitForElement('form[name="posts"] a.topic-title', casper, function(err, isExist) {
							if(isExists) {
								casper.test.assertExists('form[name="posts"] a.topic-title');
								casper.click('span.topic-content a');
								wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' ,casper , function(err , isExists) {
									if(isExists) {
										wait.waitForElement('i.glyphicon.glyphicon-chevron-down' , casper , function( err , isExists) {
											if(isExists){
												casper.click('i.glyphicon.glyphicon-chevron-down');
												casper.click('a#edit_post_request');
												wait.waitForElement('i.glyphicon.glyphicon-camera' , casper , function(err , isExists) {
													if(isExists){
														casper.click('i.glyphicon.glyphicon-camera');
														uploadMethods.Webaddress(casper , function(err){
															if(!err)
																casper.echo('Webaddress method called successfully','INFO');
														});																
														inContextLoginMethod.logoutFromApp(casper, function(err){
															if (!err)
																casper.echo('Successfully logout from application', 'INFO');
														});
													}

												});
											}

										});
									
									}
								});
							}
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
	});
};

//Verify with Edit the Topic/Post from Topic listing page insert photo browse
uploadTests.uploadEditPostcameraWebbrowse=function(){
	casper.thenOpen(config.url , function(){
		casper.echo('***********Edit Section**********' ,'INFO');
		casper.echo('*************Verify with Edit post from topic listing page using browse**********','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....',
			
 'INFO');
						wait.waitForElement('form[name="posts"] a.topic-title', casper, function(err, isExist) {
							if(isExists) {
								casper.test.assertExists('form[name="posts"] a.topic-title');
								casper.click('span.topic-content a');
								wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' ,casper , function(err , isExists) {
									if(isExists) {
										wait.waitForElement('i.glyphicon.glyphicon-chevron-down' , casper , function( err , isExists) {
											if(isExists){
												casper.click('i.glyphicon.glyphicon-chevron-down');
												casper.click('a#edit_post_request');
												wait.waitForElement('i.glyphicon.glyphicon-camera' , casper , function(err , isExists) {
													if(isExists){
														casper.click('i.glyphicon.glyphicon-camera');
														uploadMethods.Webbrowse(casper , function(err){
															if(!err)
																casper.echo('Webbrowse method called successfully','INFO');
														});																
														inContextLoginMethod.logoutFromApp(casper, function(err){
															if (!err)
																casper.echo('Successfully logout from application', 'INFO');
														});
													}

												});
											}

										});
									
									}
								});
							}
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
	});
};

//Verify with Edit the Topic/Post from Topic listing page using image button
uploadTests.uploadEditPostcameraWebaddress=function(){
	casper.thenOpen(config.url , function(){
		casper.echo('***********Edit Section**********' ,'INFO');
		casper.echo('*************Verify with Edit post from topic listing page using Image button**********','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....',
			
 'INFO');
						wait.waitForElement('form[name="posts"] a.topic-title', casper, function(err, isExist) {
							if(isExists) {
								casper.test.assertExists('form[name="posts"] a.topic-title');
								casper.click('span.topic-content a');
								wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' ,casper , function(err , isExists) {
									if(isExists) {
										wait.waitForElement('i.glyphicon.glyphicon-chevron-down' , casper , function( err , isExists) {
											if(isExists){
												casper.click('i.glyphicon.glyphicon-chevron-down');
												casper.click('a#edit_post_request');
												wait.waitForElement('a#message3_imagebutton span.mceIcon.mce_imagebutton' , casper , function(err , isExists) {
													if(isExists){
														casper.click('a#message3_imagebutton span.mceIcon.mce_imagebutton');
														uploadMethods.Webbrowse(casper , function(err){
															if(!err)
																casper.echo('Webbrowse method called successfully','INFO');
inContextLoginMethod.logoutFromApp(casper, function(err){
																if (!err)
																	casper.echo('Successfully logout from application', 'INFO');
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
						casper.thenOpen('https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/16748357' , function(){
							wait.waitForTime(1000 , casper , function(err) {
								casper.capture('upload.png');
							});
						});
						
					}
				});
			}
		});
	});
};

//Verify with Edit the Topic/Post from Topic listing page using image button webaddress
uploadTests.uploadEditPostcameraWebaddress=function(){
	casper.thenOpen(config.url , function(){
		casper.echo('***********Edit Section**********' ,'INFO');
		casper.echo('*************Verify with Edit post from topic listing page using Image button web address**********','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....',
			
 'INFO');
						wait.waitForElement('form[name="posts"] a.topic-title', casper, function(err, isExist) {
							if(isExists) {
								casper.test.assertExists('form[name="posts"] a.topic-title');
								casper.click('span.topic-content a');
								wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' ,casper , function(err , isExists) {
									if(isExists) {
										wait.waitForElement('i.glyphicon.glyphicon-chevron-down' , casper , function( err , isExists) {
											if(isExists){
												casper.click('i.glyphicon.glyphicon-chevron-down');
												casper.click('a#edit_post_request');
												wait.waitForElement('a#message1_imagebutton' , casper , function(err , isExists) {
													if(isExists){
														//casper.click('a#message3_imagebutton');
														casper.evaluate(function() {
		document.querySelector('a#message3_imagebutton').click();
	});
														uploadMethods.Webaddress(casper , function(err){
															if(!err)
																casper.echo('Webbrowse method called successfully','INFO');
														});																
														inContextLoginMethod.logoutFromApp(casper, function(err){
															if (!err)
																casper.echo('Successfully logout from application', 'INFO');
														});
													}

												});
											}

										});
									
									}
								});
							}
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
	});
};

//Verify with Edit topic listing page under category (post a reply)Attachment
uploadTests.uploadEditPostUnderCategoryPostReplyAttachment=function(){
	casper.thenOpen(config.url , function(){
		casper.echo('***********Edit Section**********' ,'INFO');
		casper.echo('*************Verify with Edit post from topic listing page undercategory attachment**********','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....',
			
 'INFO');
						wait.waitForElement('a[href="/categories"]' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('a[href="/categories"]');
								wait.waitForElement('span.forum-title:nth-child(1)' ,casper , function(err , isExists) {
									if(isExists) {
										casper.click('span.forum-title:nth-child(1)');
										wait.waitForElement('a#topics_tab', casper , function(err , isExists) {
											if(isExists) {
												casper.click('a#topics_tab');	
												wait.waitForElement('form[name="posts"] a.topic-title' , casper , function( err , isExists){
													if(isExists) {
														casper.click('span.topic-content a');
														wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' ,casper , function(err , isExists){
															if(isExists) {
																
																casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
																casper.click('div#presence');
																//Inline selector
																//casper.click('a#addtoposto_1b4334tk91b62jmo17991aiill07');
																										
															} 
														});
													}
												});
											} 											});
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

//Verify with Edit topic listing page under category (using post a reply)camera browse
uploadTests.uploadEditPostUnderCategoryPostReplycamerabrowse=function(){
	casper.thenOpen(config.url , function(){
		//casper.echo('***********Edit Section**********' ,'INFO');
		casper.echo('*************Verify with Edit topic listing page under category camera browse**********','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....',
			
 'INFO');
						wait.waitForElement('a[href="/categories"]' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('a[href="/categories"]');
								wait.waitForElement('span.forum-title:nth-child(1)' ,casper , function(err , isExists) {
									if(isExists) {
										casper.click('span.forum-title:nth-child(1)');
										wait.waitForElement('a#topics_tab', casper , function(err , isExists) {
											if(isExists) {
												casper.click('a#topics_tab');	
												wait.waitForElement('form[name="posts"] a.topic-title' , casper , function( err , isExists){
													if(isExists) {
														casper.click('span.topic-content a');
														wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' ,casper , function(err , isExists){
															if(isExists) {
																
																casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
																casper.click('i.glyphicon.glyphicon-camera');
																uploadMethods.Webbrowse(casper , function(err){
if(!err)
																		casper.echo('Webbrowse method called successfully','INFO');
																	
});
inContextLoginMethod.logoutFromApp(casper, function(err){
	if (!err)
		casper.echo('Successfully logout from application', 'INFO');
});															
																
																//Inline selector
																//casper.click('a#addtoposto_1b4334tk91b62jmo17991aiill07');
																										
															} 
														});
													}
												});
											} 											});
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

//Verify with Edit topic listing page under category (using post a reply) camera webaddress
uploadTests.uploadEditPostUnderCategoryPostReplycamerawebaddress=function(){
	casper.thenOpen(config.url , function(){	
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		uploadMethods.webaddresslogin(casper ,function(err) {
			if(!err)
				casper.echo('Merthod called successfully' , 'INFO');
				
		});
		casper.then(function(){
			casper.click('i.glyphicon.glyphicon-camera');
			uploadMethods.Webaddress(casper , function(err){
				if(!err)
																											casper.echo('Webbrowse method called successfully','INFO');
																	
			});
			inContextLoginMethod.logoutFromApp(casper, function(err){
				if (!err)
					casper.echo('Successfully logout from application', 'INFO');
			});															
		
		
		});
		casper.thenOpen('https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/16748357' , function(){
			wait.waitForTime(1000 , casper , function(err) {
				casper.capture('upload.png');
			});
		});
		
		
	});
};

//
//Verify with Edit topic listing page under category (using post a reply) Imagebutton browse
uploadTests.uploadEditPostUnderCategoryPostReplyImagebuttonbrowse=function(){
	casper.thenOpen(config.url , function(){	
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		uploadMethods.webaddresslogin(casper ,function(err) {
			if(!err)
				casper.echo('Merthod called successfully' , 'INFO');
				
		});
		casper.then(function(){
			
			wait.waitForElement('input.btn.btn-primary' , casper , function(err , isExists){
				if(isExists) {
					casper.click('span.mceIcon.mce_imagebutton');
					uploadMethods.Webbrowse(casper , function(err){
						if(!err)
																														casper.echo('Webbrowse method called successfully','INFO');
																	
					});
					inContextLoginMethod.logoutFromApp(casper, function(err){
						if (!err)
							casper.echo('Successfully logout from application', 'INFO');
					});															
				}
			});
		});
		casper.thenOpen('https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/16748357' , function(){
			wait.waitForTime(1000 , casper , function(err) {
				casper.capture('upload.png');
			});
		});
	});
};

//Verify with Edit topic listing page under category(using post a reply) Imagebutton  webaddress
uploadTests.uploadEditPostUnderCategoryPostReplyImagebuttonwebaddress=function(){
	casper.thenOpen(config.url , function(){	
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		uploadMethods.webaddresslogin(casper ,function(err) {
			if(!err)
				casper.echo('Merthod called successfully' , 'INFO');
				
		});
		casper.then(function(){
			
			wait.waitForElement('input.btn.btn-primary' , casper , function(err , isExists){
				if(isExists) {
					casper.click('span.mceIcon.mce_imagebutton');
					uploadMethods.Webaddress(casper , function(err){
						if(!err)
																														casper.echo('Webbrowse method called successfully','INFO');
																	
					});
					inContextLoginMethod.logoutFromApp(casper, function(err){
						if (!err)
							casper.echo('Successfully logout from application', 'INFO');
					});															
				}
			});
		});
		casper.thenOpen('https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/16748357' , function(){
			wait.waitForTime(1000 , casper , function(err) {
				casper.capture('upload.png');
			});
		});
	});
};

//Verify with Edit topic listing page under category(Attachment)
uploadTests.uploadEditPostundercategoryAttachment=function(){
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');	
		casper.echo('*************Verify with Edit post from topic listing page(Attachment)**********','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....',
			
 'INFO');
						wait.waitForElement('a[href="/categories"]' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('a[href="/categories"]');
								wait.waitForElement('span.forum-title:nth-child(1)' ,casper , function(err , isExists) {
									if(isExists) {
										casper.click('span.forum-title:nth-child(1)');
										wait.waitForElement('a#topics_tab', casper , function(err , isExists) {
											if(isExists) {
												casper.click('a#topics_tab');	
												wait.waitForElement('form[name="posts"] a.topic-title' , casper , function( err , isExists){
													if(isExists) {
														casper.click('span.topic-content a');
														wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' ,casper , function(err , isExists) {
															if(isExists) {
																wait.waitForElement('i.glyphicon.glyphicon-chevron-down' , casper , function( err , isExists) {
																	if(isExists){
																	casper.click('i.glyphicon.glyphicon-chevron-down');
																	casper.click('a#edit_post_request');
casper.click('i.icon.glyphicon-paperclip');																
inContextLoginMethod.logoutFromApp(casper, function(err){
	if (!err)
		casper.echo('Successfully logout from application', 'INFO');
	});																							}
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
			}
		});
		casper.thenOpen('https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/16748357' , function(){
			wait.waitForTime(1000 , casper , function(err) {
				casper.capture('1.png');
			});
		});
	});
};

//Verify with Edit topic listing page under category insert photo camera browse
uploadTests.uploadEditPostundercategoryAttachment=function(){
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');	
		casper.echo('*************Verify with Edit post from topic listing page(Attachment)**********','INFO');
		uploadMethods.webaddresslogin(casper ,function(err) {
			if(!err)
				casper.echo('Method called successfully' , 'INFO');
				
		});
		casper.then(function(){
			wait.waitForElement('i.glyphicon.glyphicon-chevron-down' , casper , function( err , isExists) {
				if(isExists){
					casper.click('i.glyphicon.glyphicon-chevron-down');
					casper.click('a#edit_post_request');
					casper.click('i.icon.glyphicon
					wait.waitForElement('input.btn.btn-primary' , casper , function(err , isExists){
					if(isExists) {
						casper.click('span.mceIcon.mce_imagebutton');
						uploadMethods.Webbrowse(casper , function(err){
							if(!err)
								casper.echo('Webbrowse method called successfully','INFO');
																	
					});
					inContextLoginMethod.logoutFromApp(casper, function(err){
						if (!err)
							casper.echo('Successfully logout from application', 'INFO');
					});															
				}
			});
		});




















