//----- This js file covers all the upload functionality on forum Frontend---------//
var config = require('../../../config/config.json');
var json = require('../../testdata/inContextLogin.json');
var uploadMethods = require('../methods/uploadmethod.js');
var inContextLoginMethod = require('../methods/inContextLogin.js');
var loginPrivacyOptionMethod = require('../methods/loginByPrivacyOption.js');
var wait=require('../wait.js');
var utils=require('../utils.js');
uploadTests = module.exports = {};


//Verify with post from topic listing page(Attachment/insert photos)
uploadTests.uploadPostAttachment=function(){
	casper.echo('                   TestCase 1                 ' ,'INFO');
	casper.echo('*************Verify with post from topic listing page(Attachment/insert photos)**********','INFO');
	inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
		if (err) {
			casper.echo("Error occurred in callback user not logged-in", "ERROR");	
		}else {
			casper.echo('Processing to Login on forum.....','INFO');
			try {
				wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists){
					if(isExists){
						casper.test.assertExists('form[name="posts"] a.topic-title','Topic found');
						casper.click('span.topic-content a');
						wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' , casper , function(err , isExists){
							if(isExists) {
								casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
							}
						});						
					}
				});
			} catch (e) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						//method to create a new topic
						uploadMethods.startTopic(json['newtopic'], casper, function(err) {
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
		
	});
};
		
//Verify with post from topic listing page camera browse
uploadTests.uploadPostAttachmentCamera=function(){
	casper.thenOpen(config.url, function() {
		casper.echo('                   TestCase 2                 ' ,'INFO');
		casper.echo('**********Verify with post from topic listing page(insert photos)*******','INFO');
		inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
			if (err) {
				casper.echo("Error occurred in callback user not logged-in", "ERROR");	
			}else {
				casper.echo('Processing to Login on forum.....','INFO');
				wait.waitForElement('form[name="posts"] a.topic-title', casper, function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('form[name="posts"] a.topic-title');
						casper.click('span.topic-content a');
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
	});

};
			
//Verify with start new Topic(latest topics page)(Attachment/insert photos)
uploadTests.uploadStartNewTopic=function(){				
	casper.thenOpen(config.url, function() {
		casper.echo('                   TestCase 3                ' ,'INFO');						
		casper.echo('*****Verify with start new topic page Attachment photo','INFO');							
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');	
		inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
			if (err) {
				casper.echo("Error occurred in callback user not logged-in", "ERROR");	
			}else {
				casper.echo('Processing to Login on forum.....','INFO');
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
	});
};

//Verify with start new Topic(latest topics page) insert photo Image button
uploadTests.uploadStartNewTopicImageButton=function(){
	casper.thenOpen(config.url, function() {
		casper.echo('                   TestCase 4                ' ,'INFO');						
		casper.echo('*****Verify with start new topic page(insert photo) Image button','INFO');		
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');	
		inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
			if (err) {
				casper.echo("Error occurred in callback user not logged-in", "ERROR");	
			}else {
				casper.echo('Processing to Login on forum.....','INFO');
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
	});
};	

//Verify with start new Topic Insert Photo  camera browse
uploadTests.uploadStartNewTopicCameraBrowse=function(){
	casper.thenOpen(config.url, function() {
		casper.echo('                   TestCase 5                ' ,'INFO');						
		casper.echo('*****Verify with start new topic page(insert photo) camera browse','INFO');		
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
			if (err) {
				casper.echo("Error occurred in callback user not logged-in", "ERROR");	
			}else {
				casper.echo('Processing to Login on forum.....','INFO');
				wait.waitForElement('div#topics a' , casper , function(err , isExists) {
					if(isExists) {
						casper.click('div#topics a');	
						wait.waitForElement('button#post_submit' , casper , function(err , isExists ){
							if(isExists) {
								casper.click('i.glyphicon.glyphicon-camera');
								uploadMethods.Webbrowse(casper , function(err){
									if(!err)
										casper.echo('Webaddress method called successfully','INFO');
								});
																						
								casper.then(function() {
									inContextLoginMethod.logoutFromApp(casper, function(err){
										if (!err)
											casper.echo('Successfully logout from application', 'INFO');
				
									});
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
	});
};	

//Verify with start new Topic Insert Photo camera webaddress
uploadTests.uploadStartNewTopicCameraWebaddress=function(){
	casper.thenOpen(config.url, function() {
		casper.echo('                   TestCase 6                ' ,'INFO');						
		casper.echo('*****Verify with start new topic page(insert photo) camera webaddress','INFO');		
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');	
		inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
			if (err) {
				casper.echo("Error occurred in callback user not logged-in", "ERROR");	
			}else {
				casper.echo('Processing to Login on forum.....','INFO');
				wait.waitForElement('div#topics a' , casper , function(err , isExists) {
					if(isExists) {
						casper.click('div#topics a');	
						wait.waitForElement('button#post_submit' , casper , function(err , isExists ){
							if(isExists) {
								casper.click('i.glyphicon.glyphicon-camera');
								uploadMethods.Webaddress(casper , function(err){
									if(!err)
										casper.echo('Webaddress method called successfully','INFO');
								});
								casper.then(function() {
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
	});
};


//Verify with topic listing page under category(start new topic)(Attachment/insert photos)

uploadTests.uploadStartNewTopicUnderCat=function(){
	casper.thenOpen(config.url, function() {
		casper.echo('                   TestCase 7                 ' ,'INFO');	
		casper.echo('*****Verify with start new topic page from undercategory ','INFO');		
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');		
		inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
			if (err) {
				casper.echo("Error occurred in callback user not logged-in", "ERROR");	
			}else {
				casper.echo('Processing to Login on forum.....','INFO');
				wait.waitForElement('a[href="/categories"]' , casper , function(err , isExists) {
					if(isExists) {
						casper.click('a[href="/categories"]');
						wait.waitForElement('a#startTopic' , casper ,function(err ,isExists) {
							if(isExists) {
								casper.click('a#startTopic');		
								wait.waitForElement('button#post_submit' , casper , function(err , isExists ){
									if(isExists) {
										casper.click('i.glyphicon.glyphicon-camera');
										uploadMethods.Webaddress(casper , function(err){
											if(!err)
												casper.echo('Webaddress method called successfully','INFO');
										});
										casper.then(function() {
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
			casper.thenOpen('https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/16748357' , function(){
				wait.waitForTime(1000 , casper , function(err) {
					casper.capture('uploadunderstart.png');	
				});
			});	
		});
	});
};


//Verify with category from forum listing page(start new topic) camera webaddress
uploadTests.uploadStartNewTopicforumlisting=function(){
	casper.thenOpen(config.url, function() {
		casper.echo('                   TestCase 8                 ' ,'INFO');
		casper.echo('*****Verify with start new topic page from forum listing page ','INFO');		
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');		
		inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
			if (err) {
				casper.echo("Error occurred in callback user not logged-in", "ERROR");	
			}else {
				casper.echo('Processing to Login on forum.....','INFO');
				wait.waitForElement('a[href="/categories"]' , casper , function(err , isExists) {
					if(isExists) {
						casper.click('a[href="/categories"]');
						wait.waitForElement('span.forum-title:nth-child(1)' ,casper , function(err , isExists) {
							if(isExists){
								casper.click('span.forum-title:nth-child(1)');
								wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary ' , casper , function( err , isExists) {
									if(isExists) {
										casper.click('a.pull-right.btn.btn-uppercase.btn-primary ');
										wait.waitForTime(1000 , casper , function(err) { 
											wait.waitForElement('button#post_submit' , casper , function(err , isExists ){
												if(isExists) {
													casper.click('i.glyphicon.glyphicon-camera');
													uploadMethods.Webaddress(casper , function(err){
														if(!err)
															casper.echo('Webaddress method called successfully','INFO');
													});
													casper.then(function() {
														inContextLoginMethod.logoutFromApp(casper, function(err){
															if (!err)
																casper.echo('Successfully logout from application', 'INFO');
														});
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
							}
						});
					}
				});
			}
		});
	});
};

//Verify with post listing page under category(post a reply)(Attachment/insert photos) camera webaddress
uploadTests.uploadPostListingUnderCategory=function(){
	casper.thenOpen(config.url, function() {
		casper.echo('                   TestCase 9                ' ,'INFO');
		casper.echo('*****Verify with (post a reply) undercategory on forum listing page camera web address','INFO');		
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
			if (err) {
				casper.echo("Error occurred in callback user not logged-in", "ERROR");	
			}else {
				casper.echo('Processing to Login on forum.....','INFO');
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
												uploadMethods.Webaddress(casper , function(err){
													if(!err)
														casper.echo('Webaddress method called successfully','INFO');
												});
												casper.then(function() {
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
			}
		});
	});
};



//calender

//Verify with calender page(insert photos) Image button web address
uploadTests.uploadCalenderEventImageButton=function(){
	casper.thenOpen(config.backEndUrl, function() {	
		casper.echo('                   TestCase 10                 ' ,'INFO');
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
		casper.echo('                   TestCase 11                ' ,'INFO');
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
		casper.echo('                   TestCase 12                 ' ,'INFO');
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
/*uploadTests.uploadPMSendNewMessage=function(){
	casper.thenOpen(config.url , function(){
		casper.echo('                   TestCase 13                 ' ,'INFO');	
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
};*/

//Verify with private message(Inbox)(Insert photo) Attachment
uploadTests.uploadPMInboxAttachment=function(){
	casper.thenOpen(config.url , function(){
		casper.echo('                   TestCase 14                 ' ,'INFO');	
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


//Verify with private message(Inbox)(Insert photo) camera address
uploadTests.uploadPrivateMessageInboxaddress=function(){
	casper.thenOpen(config.url , function(){
		casper.echo('                   TestCase 15                 ' ,'INFO');	
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
											wait.waitForTime(1000 , casper , function(err) {
												casper.click('i.glyphicon.glyphicon-camera');
												wait.waitForTime(5000 , casper , function(err){
													casper.capture('cam.png');
													casper.then(function(){
														uploadMethods.Webaddressinbox(casper , function(err){
															if(!err) {
																casper.echo('Webbrowse method called successfully','INFO');
													
																}
														});												
													});
													casper.then(function(){
														inContextLoginMethod.logoutFromApp(casper, function(err){
															if (!err)
																casper.echo('Successfully logout from application', 'INFO');
														});
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
			}
			casper.thenOpen('https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/thumb/16748462' , function(){
				wait.waitForTime(1000 , casper , function(err) {
					casper.capture('uploadunderstart.png');	
				});
			});
			
		});
	});
};

//Verify with private message(Inbox)(Insert photo) camera webbrowse
uploadTests.uploadPMInboxwebbrowse=function(){
	casper.thenOpen(config.url , function(){
		casper.echo('                   TestCase 16                 ' ,'INFO');	
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
											 wait.waitForTime(5000 , casper , function(err) {
												casper.click('i.glyphicon.glyphicon-camera');
												
												wait.waitForTime(5000 , casper , function(err){
													casper.capture('cam.png');
													casper.then(function(){
														uploadMethods.Webbrowseinbox(casper , function(err){
															if(!err) {
																casper.echo('Webbrowse method called successfully','INFO');
													
																}
														});												
													});
													casper.then(function(){
														inContextLoginMethod.logoutFromApp(casper, function(err){
															if (!err)
																casper.echo('Successfully logout from application', 'INFO');
														});
													});
												});
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
				});
		      }

		});
	});
    	
};

//Verify with private message(Inbox)(Insert photo) camera Image button
/*uploadTests.uploadPMInboxImageButton=function(){
	casper.thenOpen(config.url , function(){
		casper.echo('                   TestCase 17                 ' ,'INFO');	
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
											 
											casper.click('a#pmessage_new_imagebutton span');
											wait.waitForElement('a#insertImage_' , casper , function(err , isExists) {
												if(isExists) {
																										
casper.evaluate(function() {
	document.querySelector('a#web').click();
												});													  					casper.wait(1000,function(){
	casper.capture('imagePopUp.png');
	casper.sendKeys('input[name="fname"]', 'https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/thumb/16748462');	
	casper.click('button#insert_image_btn');				
	casper.wait(1000, function(){
		casper.capture('inboxImageButton.png');
	});
});
casper.then(function(){
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
				});
				casper.thenOpen('https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/thumb/16748462' , function(){
					wait.waitForTime(1000 , casper , function(err) {
						casper.capture('InboxCameraImagebutton.png');	
					});
				});
			
			}
		});
   	 });
};*/

//------------------------------------------------------------------------------------------------------------------------------------------------
//Edit Section
//Verify with Edit the Post from Topic listing page(attachment/insert photos)	
uploadTests.uploadEditPostAttachment=function(){
	//casper.echo('***********Edit Section**********' ,'INFO');
	casper.thenOpen(config.url , function(){
		casper.echo('                   TestCase 18                 ' ,'INFO');
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
										casper.then(function(){
											inContextLoginMethod.logoutFromApp(casper, function(err){
												if (!err)
													casper.echo('Successfully logout from application', 'INFO');
											});
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
	});
		
};
			
//Verify with Edit the Post from Topic listing page(insert photos) camera web address
	
uploadTests.uploadEditPostCameraWebaddress=function(){
	casper.thenOpen(config.url , function(){
		//casper.echo('***********Edit Section**********' ,'INFO');
		casper.echo('                   TestCase 19                 ' ,'INFO');
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
casper.then(function(){
															
	inContextLoginMethod.logoutFromApp(casper, function(err){
		if (!err)
																								casper.echo('Successfully logout from application', 'INFO');

});
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
												casper.capture('EditPostcameraWebAddress.png');
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
		casper.echo('                   TestCase 20                 ' ,'INFO');
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

														casper.then(function(){
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
//------------------------------------------------------------------------------------------------------------------------------------------------

//Verify with Edit the Topic/Post from Topic listing page Attachment
uploadTests.uploadEditTopicAttachment=function(){
	casper.thenOpen(config.url , function(){
		casper.echo('***********Edit Section**********' ,'INFO');
		casper.echo('                   TestCase 21                 ' ,'INFO');
		casper.echo('*************Verify with Edit post from topic listing page(Attachment)**********','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....',
			
 'INFO');
						wait.waitForElement(' ul li:nth-child(2) span:nth-child(1) span:nth-child(2) h4 a', casper, function(err, isExist) {
							if(isExists) {
								//casper.test.assertExists('form[name="posts"] a.topic-title');
								casper.click(' ul li:nth-child(2) span:nth-child(1) span:nth-child(2) h4 a');
								wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' ,casper , function(err , isExists) {
									if(isExists) {
										wait.waitForElement('i.glyphicon.glyphicon-chevron-down' , casper , function( err , isExists) {
											if(isExists){
												casper.click('i.glyphicon.glyphicon-chevron-down');
												wait.waitForTime(1000 , casper , function(err) {
													casper.click('a#edit_post_request');
													wait.waitForElement('i.icon.glyphicon-paperclip' , casper , function(err , isExists) {
														if(isExists){
															casper.then(function(){
															inContextLoginMethod.logoutFromApp(casper, function(err){
																	if (!err)
																		casper.echo('Successfully logout from application', 'INFO');
																});
															});
														}
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
								casper.capture('upload.png');
							});
						});
						
					}
				});
			}
		});
	});
};

//Verify with Edit the Topic/Post from Topic listing page insert photo camera webaddress
uploadTests.uploadEditTopicCameraWebaddress=function(){
	casper.thenOpen(config.url , function(){
		casper.echo('                   TestCase 22               ' ,'INFO');
		casper.echo('*************Verify with Edit post from topic listing using webaddress**********','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....',
			
 'INFO');
						wait.waitForElement('ul li:nth-child(2) span:nth-child(1) span:nth-child(2) h4 a', casper, function(err, isExist) {
							if(isExists) {
								casper.test.assertExists('form[name="posts"] a.topic-title');
								casper.click('ul li:nth-child(2) span:nth-child(1) span:nth-child(2) h4 a');
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
														});														casper.then(function(){		
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

//Verify with Edit the Topic/Post from Topic listing page insert camera  browse
uploadTests.uploadEditTopicCameraWebbrowse=function(){
	casper.thenOpen(config.url , function(){
		//casper.echo('***********Edit Section**********' ,'INFO');
		casper.echo('                   TestCase 23                 ' ,'INFO');
		casper.echo('*************Verify with Edit post from topic listing page using browse**********','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....',
			
 'INFO');
						wait.waitForElement('ul li:nth-child(2) span:nth-child(1) span:nth-child(2) h4 a', casper, function(err, isExist) {
							if(isExists) {
								casper.test.assertExists('form[name="posts"] a.topic-title');
								casper.click('ul li:nth-child(2) span:nth-child(1) span:nth-child(2) h4 a');
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
														casper.then(function(){															
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

//Verify with Edit the Topic/Post from Topic listing page using image button browse
uploadTests.uploadEditTopicImageButtonbrowse=function(){
	casper.thenOpen(config.url , function(){
		//casper.echo('***********Edit Section**********' ,'INFO');
		casper.echo('                   TestCase 24                 ' ,'INFO');
		casper.echo('*************Verify with Edit post from topic listing page using Image button**********','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....',
			
 'INFO');
						wait.waitForElement('ul li:nth-child(2) span:nth-child(1) span:nth-child(2) h4 a', casper, function(err, isExist) {
							if(isExists) {
								casper.test.assertExists('form[name="posts"] a.topic-title');
								casper.click('ul li:nth-child(2) span:nth-child(1) span:nth-child(2) h4 a');
								wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' ,casper , function(err , isExists) {
									if(isExists) {
										wait.waitForElement('i.glyphicon.glyphicon-chevron-down' , casper , function( err , isExists) {
											if(isExists){
												casper.click('i.glyphicon.glyphicon-chevron-down');
												casper.click('a#edit_post_request');
												wait.waitForElement('a#message1_imagebutton span' , casper , function(err , isExists) {
													if(isExists){
														casper.click('a#message1_imagebutton span');
														uploadMethods.Webbrowse(casper , function(err){
															if(!err)
																casper.echo('Webbrowse method called successfully','INFO');
														
});														casper.then(function() {
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

//Verify with Edit the Topic/Post from Topic listing page using Image button webaddress
uploadTests.uploadEditTopicImageButtonWebaddress=function(){
	casper.thenOpen(config.url , function(){
		casper.echo('***********Edit Section**********' ,'INFO');
		casper.echo('                   TestCase 25                 ' ,'INFO');
		casper.echo('*************Verify with Edit post from topic listing page using Image button web address**********','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....',
			
 'INFO');
						wait.waitForElement('ul li:nth-child(2) span:nth-child(1) span:nth-child(2) h4 a', casper, function(err, isExist) {
							if(isExists) {
								casper.test.assertExists('form[name="posts"] a.topic-title');
								casper.click('ul li:nth-child(2) span:nth-child(1) span:nth-child(2) h4 a');
								wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' ,casper , function(err , isExists) {
									if(isExists) {
										wait.waitForElement('i.glyphicon.glyphicon-chevron-down' , casper , function( err , isExists) {
											if(isExists){
												casper.click('i.glyphicon.glyphicon-chevron-down');
												casper.click('a#edit_post_request');
												wait.waitForElement('a#message1_imagebutton' , casper , function(err , isExists) {
													if(isExists){
														

casper.click('a#message1_imagebutton');
casper.capture('144.png');
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
//-----------------------------------------------------------------------------------------------------------------------------------------------------
//Verify with Edit topic listing page under category (post a reply)Attachment
uploadTests.uploadEditPostUnderCategoryPostReplyAttachment=function(){
	casper.thenOpen(config.url , function(){
		casper.echo('***********Edit Section**********' ,'INFO');
		casper.echo('                   TestCase 26                 ' ,'INFO');
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
															casper.then(function() {
															inContextLoginMethod.logoutFromApp(casper, function(err){
																if (!err)
																	casper.echo('Successfully logout from application', 'INFO');
																});
															});	
														});
													}
												});
											} 											});
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
	});
	
};

//Verify with Edit topic listing page under category (using post a reply)camera browse
uploadTests.uploadEditPostUnderCategoryPostReplyCamerabrowse=function(){
	casper.thenOpen(config.url , function(){
		casper.echo('                   TestCase 27                ' ,'INFO');
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
uploadTests.uploadEditPostUnderCategoryPostReplyCameraWebaddress=function(){
	casper.thenOpen(config.url , function(){
		casper.echo('                   TestCase 28                ' ,'INFO');	
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


//Verify with Edit topic listing page under category (using post a reply) Imagebutton browse
uploadTests.uploadEditPostUnderCategoryPostReplyImagebuttonbrowse=function(){
	casper.thenOpen(config.url , function(){
		casper.echo('                   TestCase 29                 ' ,'INFO');	
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
		casper.echo('                   TestCase 30                ' ,'INFO');	
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		uploadMethods.webaddresslogin(casper ,function(err) {
			if(!err)
				casper.echo('Merthod called successfully' , 'INFO');
				
		});
		casper.then(function(){
			
			wait.waitForElement('input.btn.btn-primary' , casper , function(err , isExists){
				if(isExists) {
					//casper.click('span.mceIcon.mce_imagebutton');
					casper.evaluate(function() {
						document.querySelector('a#message_imagebutton span').click();
					});
					casper.wait(1000 , function(){
						uploadMethods.Webaddress(casper , function(err){
							if(!err)
																																				casper.echo('Webbrowse method called successfully','INFO');
																	
						});
						casper.then(function(){
							inContextLoginMethod.logoutFromApp(casper, function(err){
								if (!err)
									casper.echo('Successfully logout from application', 'INFO');
					

							});
						});
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
uploadTests.uploadEditPostunderCategoryAttachment=function(){
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 31                 ' ,'INFO');	
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
uploadTests.uploadEditPostunderCategoryCamerabrowse=function(){
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 32                 ' ,'INFO');	
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
					//casper.click('i.icon.glyphicon');
					wait.waitForElement('input.btn.btn-primary' , casper , function(err , isExists){
						if(isExists) {
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
		});
	});
};

//Verify with Edit topic listing page under category insert photo camera webaddress
uploadTests.uploadEditPostunderCategoryCameraWebaddress=function(){
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 33                 ' ,'INFO');	
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
					//casper.click('i.icon.glyphicon');
					wait.waitForElement('input.btn.btn-primary' , casper , function(err , isExists){
						if(isExists) {
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
		});
	});
};

//Verify with Edit topic listing page under category insert photo Image button browse
uploadTests.uploadEditPostunderCategoryImageButtonbrowse=function(){
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 34                ' ,'INFO');	
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
					//casper.click('i.icon.glyphicon');
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
				}
			});
		});
	});
};

//Verify with Edit topic listing page under category insert photo Image button webaddress
uploadTests.uploadEditPostunderCategoryImageButtonWebaddress=function(){
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 35                ' ,'INFO');	
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
					//casper.click('i.icon.glyphicon');
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
				}
			});
		});
	});
};


//Verify with Edit the Post from Search result page Attachment
uploadTests.uploadEditPostSearch=function(){
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 36                ' ,'INFO');	
		casper.echo('***********Verify with Edit the Post from Search result page************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('input#inline_search_box' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('input#inline_search_box');
								casper.fill('form#inlineSearchForm', {
									'keywords' :'hello'
								},true);
								try {
									wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists){
										if(isExists){
											//casper.test.assertExists('form[name="posts"] a.topic-title','Topic found');
											/*var grp = casper.evaluate(function(){
												document.querySelector('div.post-body.pull-left span:nth-child(2) a').getAttribute('href');
											});
											casper.echo("message :" +grp,'INFO');
											casper.click('a[href="'+grp+'"]');*/
											casper.click('div.post-body.pull-left span:nth-child(2) a');
											wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' , casper , function(err , isExists){
												if(isExists) {
													casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
											
												}
											});						
										}
									});
								} catch (e) {
									wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
										if(isExists) {
											//method to create a new topic
											uploadMethods.startTopic(json['newtopic'], casper, function(err) {
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
							}

						});
					}
				});
			}
			casper.then(function() {
				inContextLoginMethod.logoutFromApp(casper, function(err){
					if (!err)
						casper.echo('Successfully logout from application', 'INFO');
				
				});
			});
		});
		casper.thenOpen('https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/16748357' , function(){
			wait.waitForTime(1000 , casper , function(err) {
				casper.capture('1.png');
			});
		});
		
	});
};

//Verify with Edit the Post from Search result page camera webaddress
uploadTests.uploadEditPostSearchCameraWebaddress=function(){
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 37                 ' ,'INFO');	
		casper.echo('***********Verify with Edit the Post from Search result page camera webaddress************','INFO');
		uploadMethods.searchlogin(casper ,function(err) {
			if(!err)
				casper.echo('Method called successfully' , 'INFO');
				
		});
		casper.then(function(){
			wait.waitForElement('i.glyphicon.glyphicon-chevron-down' , casper , function( err , isExists) {
				if(isExists){
					casper.click('i.glyphicon.glyphicon-chevron-down');
					casper.click('a#edit_post_request');
					//casper.click('i.icon.glyphicon');
					wait.waitForElement('input.btn.btn-primary' , casper , function(err , isExists){
						if(isExists) {
							casper.click('i.glyphicon.glyphicon-camera');
							uploadMethods.Webaddress(casper , function(err){
								if(!err)
									casper.echo('Webbrowse method called successfully','INFO');
																
																	
							});
							casper.then(function(){
								inContextLoginMethod.logoutFromApp(casper, function(err){
									if (!err)
										casper.echo('Successfully logout from application', 'INFO');
								});	

							});															
						}
					});
				}
			});
		});
	});
};

//Verify with Edit the Post from Search result page Image webaddress
uploadTests.uploadEditPostSearchCamerabrowse=function(){
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 38                ' ,'INFO');	
		casper.echo('***********Verify with Edit the Post from Search result page Image webaddress************','INFO');
		uploadMethods.searchlogin(casper ,function(err) {
			if(!err)
				casper.echo('Method called successfully' , 'INFO');
				
		});
		casper.then(function(){
			wait.waitForElement('i.glyphicon.glyphicon-chevron-down' , casper , function( err , isExists) {
				if(isExists){
					casper.click('i.glyphicon.glyphicon-chevron-down');
					casper.click('a#edit_post_request');
					//casper.click('i.icon.glyphicon');
					wait.waitForElement('input.btn.btn-primary' , casper , function(err , isExists){
						if(isExists) {
							casper.click('span.mceIcon.mce_imagebutton');
							uploadMethods.Webbrowse(casper , function(err){
								if(!err)
									casper.echo('Webbrowse method called successfully','INFO');
																	
							});
							casper.then(function(){
								inContextLoginMethod.logoutFromApp(casper, function(err){
									if (!err)
										casper.echo('Successfully logout from application', 'INFO');
								});	
						        });
							
														
						}
					});
				}
			});
		});
	});
};

//Verify with Edit the Post from Search result page Image button browse
uploadTests.uploadEditPostSearchImagebrowse=function(){
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 39               ' ,'INFO');	
		casper.echo('***********Verify with Edit the Post from Search result page Image button browse************','INFO');
		uploadMethods.searchlogin(casper ,function(err) {
			if(!err)
				casper.echo('Method called successfully' , 'INFO');
				
		});
		casper.then(function(){
			wait.waitForElement('i.glyphicon.glyphicon-chevron-down' , casper , function( err , isExists) {
				if(isExists){
					casper.click('i.glyphicon.glyphicon-chevron-down');
					casper.click('a#edit_post_request');
					//casper.click('i.icon.glyphicon');
					wait.waitForElement('input.btn.btn-primary' , casper , function(err , isExists){
						if(isExists) {
							casper.click('span.mceIcon.mce_imagebutton');
							uploadMethods.Webbrowse(casper , function(err){
								if(!err)
									casper.echo('Webbrowse method called successfully','INFO');
																	
							});
							casper.then(function(){
								inContextLoginMethod.logoutFromApp(casper, function(err){
									if (!err)
										casper.echo('Successfully logout from application', 'INFO');
								});
							});	

															
						}
					});
				}
			});
		});
		casper.thenOpen('https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/16748357' , function(){
			wait.waitForTime(1000 , casper , function(err) {
				casper.capture('1.png');
			});
		});
	});
};

//Verify with Edit the post from Profile page(Attachment)
uploadTests.uploadEditProfileAttachment=function(){
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 40                 ' ,'INFO');	
		casper.echo('***********Verify with Edit the post from Profile page(Attachment)************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('ul.nav.pull-right span.caret' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('ul.nav.pull-right span.caret');
								casper.click('a#user-nav-panel-profile');
								wait.waitForElement('a#send_message', casper , function(err ,isExists) {
									if(isExists) {
										casper.click('i.glyphicon.glyphicon-chevron-down');
										casper.click('a#search_edit_post');
										wait.waitForElement(' form[name="PostTopic"] input[type="button"]' , casper , function(err , isExists){
											if(isExists){
												casper.click('i.icon.glyphicon-paperclip');	
											
											}
										});
										casper.then(function(){
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
			casper.thenOpen('https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/16748357' , function(){
				wait.waitForTime(1000 , casper , function(err) {
					casper.capture('1.png');
				});
			});
		});
	});
};

//Verify with Edit the post from Profile page camera browse
uploadTests.uploadEditPostProfileCamerabrowse=function(){
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 41                ' ,'INFO');	
		casper.echo('***********Verify with Edit the post from Profile page camera browse************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('ul.nav.pull-right span.caret' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('ul.nav.pull-right span.caret');
								casper.click('a#user-nav-panel-profile');
								wait.waitForElement('a#send_message', casper , function(err ,isExists) {
									if(isExists) {
										casper.click('i.glyphicon.glyphicon-chevron-down');
										casper.click('a#search_edit_post');
										wait.waitForElement(' form[name="PostTopic"] input[type="button"]' , casper , function(err , isExists){
											if(isExists){
												casper.click('a#insert_image_dialog_34289513');
												uploadMethods.Webbrowse(casper , function(err){
													if(!err)
														casper.echo('Webbrowse method called successfully','INFO');
																	
												});
												casper.then(function(){
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
			}
		});
		casper.thenOpen('https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/16748357' , function(){
			wait.waitForTime(1000 , casper , function(err) {
				casper.capture('1.png');
			});
		});
	});
};

//Verify with Edit the post from Profile page camera webaddress
uploadTests.uploadEditPostProfileCameraWebaddress=function(){
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 42                ' ,'INFO');	
		casper.echo('***********Verify with Edit the post from Profile page camera webaddress************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('ul.nav.pull-right span.caret' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('ul.nav.pull-right span.caret');
								casper.click('a#user-nav-panel-profile');
								wait.waitForElement('a#send_message', casper , function(err ,isExists) {
									if(isExists) {
										casper.click('i.glyphicon.glyphicon-chevron-down');
										casper.click('a#search_edit_post');
										wait.waitForElement(' form[name="PostTopic"] input[type="button"]' , casper , function(err , isExists){
											if(isExists){
												casper.click('a#insert_image_dialog_34289513');
												casper.wait(2000, function(){

													casper.capture('cam55.png');

												});
												wait.waitForTime(2000 , casper , function(err ){
													uploadMethods.Webaddress(casper , function(err){
														if(!err)
															casper.echo('Webaddress method called successfully','INFO');
																	
													});
													casper.then(function(){
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

//Verify with Edit the post from Profile page Image webaddress
uploadTests.uploadEditPostProfileImagewebaddress=function(){
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 43                ' ,'INFO');	
		casper.echo('***********Verify with Edit the post from Profile page Image webaddress************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('ul.nav.pull-right span.caret' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('ul.nav.pull-right span.caret');
								casper.click('a#user-nav-panel-profile');
								wait.waitForElement('a#send_message', casper , function(err ,isExists) {
									if(isExists) {
										casper.click('i.glyphicon.glyphicon-chevron-down');
										casper.click('a#search_edit_post');
										wait.waitForElement(' form[name="PostTopic"] input[type="button"]' , casper , function(err , isExists){
											if(isExists){
												casper.click('span.mceIcon.mce_imagebutton');
												uploadMethods.Webaddress(casper , function(err){
													if(!err)
														casper.echo('Webaddress method called successfully','INFO');
																	
												});
												casper.then(function(){
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
			}
		});
		casper.thenOpen('https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/16748357' , function(){
			wait.waitForTime(1000 , casper , function(err) {
				casper.capture('1.png');
			});
		});
	});
};

//Verify with Edit the post from Profile page Image browse
 uploadTests.uploadEditPostProfileImagebrowse=function(){
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 44                ' ,'INFO');	
		casper.echo('***********Verify with Edit the post from Profile page Image browse************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('ul.nav.pull-right span.caret' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('ul.nav.pull-right span.caret');
								casper.click('a#user-nav-panel-profile');
								wait.waitForElement('a#send_message', casper , function(err ,isExists) {
									if(isExists) {
										casper.click('i.glyphicon.glyphicon-chevron-down');
										casper.click('a#search_edit_post');
										wait.waitForElement(' form[name="PostTopic"] input[type="button"]' , casper , function(err , isExists){
											if(isExists){
												casper.click('span.mceIcon.mce_imagebutton');
												uploadMethods.Webbrowse(casper , function(err){
													if(!err)
														casper.echo('Webbrowse method called successfully','INFO');
																	
												});
												casper.then(function(){
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
			}
		});
		casper.thenOpen('https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/16748357' , function(){
			wait.waitForTime(1000 , casper , function(err) {
				casper.capture('1.png');
			});
		});
	});
};

//Verify with Edit the topic/post by Admin for himself/registered user Attachment
 uploadTests.uploadAdminLogin=function(){
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 45                ' ,'INFO');	
		casper.echo('***********Verify with Edit the topic/post by Admin for himself/registered user Attachment************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				inContextLoginMethod.loginToApp(json['validInfose'].username, json['validInfose'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						try {
							wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists){
								if(isExists){
									casper.test.assertExists('form[name="posts"] a.topic-title','Topic found');
									casper.click('span.topic-content a');
									wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' , casper , function(err , isExists){
										if(isExists) {
											casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
											casper.click('i.icon.glyphicon-paperclip');
											
										}
									});						
								}
							});
						} catch (e) {
							wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
								if(isExists) {
									//method to create a new topic
									uploadMethods.startTopic(json['newtopic'], casper, function(err) {
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
						
					}
					casper.then(function() {
						inContextLoginMethod.logoutFromApp(casper, function(err){
							if (!err)
								casper.echo('Successfully logout from application', 'INFO');
				
						});
					});
					
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

//Verify with Edit the topic/post by Admin for himself/registered user Camera browse
uploadTests.uploadAdminCamerabrowse=function(){		
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 46                ' ,'INFO');	
		casper.echo('**********Verify with Edit the topic/post by Admin for himself/registered user Camera browse************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				inContextLoginMethod.loginToApp(json['validInfose'].username, json['validInfose'].password, casper, function(err) {
					if (err) {
						casper.loginPrivacyOptionMethod.loginToForumBackEnd(casper , function(err) {
			if (!err)
				casper.echo('LoggedIn to forum backend....', 'INFO');
		});echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists){
							if(isExists){
								casper.test.assertExists('form[name="posts"] a.topic-title','Topic found');
								casper.click('span.topic-content a');
								wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' , casper , function(err , isExists){
									if(isExists) {
										casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
										wait.waitForElement('input.pull-left.btn.btn-uppercase.btn-primary' , casper , function( err , isExists){
											if(isExists) {
												casper.click('i.glyphicon.glyphicon-camera');
												uploadMethods.Webbrowse(casper , function(err){
													if(!err)
														casper.echo('Webaddress method called successfully','INFO');
																	
												});
												casper.then(function(){
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
			}
		});
		casper.thenOpen('https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/16748357' , function(){
			wait.waitForTime(1000 , casper , function(err) {
				casper.capture('1.png');
			});
		});
	});
};

//Verify with Edit the topic/post by Admin for himself/registered user camera webaddress
uploadTests.uploadAdminCameraWebaddress=function(){		
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 47                 ' ,'INFO');	
		casper.echo('******Verify with Edit the topic/post by Admin for himself/registered user camera webaddress*******','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				inContextLoginMethod.loginToApp(json['validInfose'].username, json['validInfose'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists){
							if(isExists){
								casper.test.assertExists('form[name="posts"] a.topic-title','Topic found');
								casper.click('span.topic-content a');
								wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' , casper , function(err , isExists){
									if(isExists) {
										casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
										wait.waitForElement('input.pull-left.btn.btn-uppercase.btn-primary' , casper , function( err , isExists){
											if(isExists) {
												casper.click('i.glyphicon.glyphicon-camera');
												uploadMethods.Webaddress(casper , function(err){
													if(!err)
														casper.echo('Webaddress method called successfully','INFO');
																	
												});
												casper.then(function(){
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
			}
		});
		casper.thenOpen('https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/16748357' , function(){
			wait.waitForTime(1000 , casper , function(err) {
				casper.capture('1.png');
			});
		});
	});
};

//Verify with Edit the topic/post by Admin for himself/registered user Image browse
uploadTests.uploadAdminImagebrowse=function(){		
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 48                 ' ,'INFO');	
		casper.echo('********Verify with Edit the topic/post by Admin for himself/registered user Image browse***','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				inContextLoginMethod.loginToApp(json['validInfose'].username, json['validInfose'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('ul li:nth-child(2) span:nth-child(1) span:nth-child(2) h4 a' , casper , function(err , isExists){
							if(isExists){
								//casper.test.assertExists('form[name="posts"] a.topic-title','Topic found');
								casper.click('ul li:nth-child(2) span:nth-child(1) span:nth-child(2) h4 a');
								wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' , casper , function(err , isExists){
									if(isExists) {
										//casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
										wait.waitForElement('i.glyphicon.glyphicon-chevron-down' , casper , function( err , isExists){
											if(isExists) {
												casper.click('i.glyphicon.glyphicon-chevron-down');
												casper.capture('566.png');
												wait.waitForTime(2000 , casper , function(err) {
													casper.click('a#edit_post_request');
													wait.waitForTime(5000 , casper , function(err){
													
														casper.click('a#message1_imagebutton span');
														uploadMethods.Webbrowse(casper , function(err){
															if(!err)
																casper.echo('Webbrowse method called successfully','INFO');
																	
														});
														casper.then(function(){
															inContextLoginMethod.logoutFromApp(casper, function(err){
																if (!err)
																	casper.echo('Successfully logout from application', 'INFO');
															});
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
			}
		});
		casper.thenOpen('https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/16748357' , function(){
			wait.waitForTime(1000 , casper , function(err) {
				casper.capture('1.png');
			});
		});
	});
};

//Verify with Edit the topic/post by Admin for himself/registered user Image webaddress
uploadTests.uploadAdminImageWebaddress=function(){		
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 49                 ' ,'INFO');	
		casper.echo('***********Verify with Edit the topic/post by Admin for himself/registered user Image webaddress**********','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				inContextLoginMethod.loginToApp(json['validInfose'].username, json['validInfose'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists){
							if(isExists){
								casper.test.assertExists('form[name="posts"] a.topic-title','Topic found');
								casper.click('span.topic-content a');
								wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' , casper , function(err , isExists){
									if(isExists) {
										casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
										wait.waitForElement('input.pull-left.btn.btn-uppercase.btn-primary' , casper , function( err , isExists){
											if(isExists) {
												casper.click('span.mceIcon.mce_imagebutton');
												uploadMethods.Webaddress(casper , function(err){
													if(!err)
														casper.echo('Webaddress method called successfully','INFO');
																	
												});
												casper.then(function(){
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
			}
		});
		casper.thenOpen('https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/16748357' , function(){
			wait.waitForTime(1000 , casper , function(err) {
				casper.capture('1.png');
			});
		});
	});
};


//Verify with sub category from forum listing page(Attachement/insert photos)
uploadTests.uploadSubCategory=function(){		
	//casper.thenOpen(config.backEndUrl , function(){
		//casper.echo("Title of the page :"+this.getTitle(), 'INFO');	
		//casper.echo('**********Verify with sub category from forum listing page(Attachement)***********','INFO');
		/*uploadMethods.createSubCategory(casper ,function(err){
			if(!err)
				casper.echo('create subcategory  method called successfully','INFO');
		});*/
		casper.thenOpen(config.url , function(){
			casper.echo('                   TestCase 50                ' ,'INFO');
			casper.echo("Title of the page :"+this.getTitle(), 'INFO');
			casper.echo('**********Verify with sub category from forum listing page(Attachement)***********','INFO');
			inContextLoginMethod.loginToApp(json['validInfose'].username, json['validInfose'].password, casper, function(err) {
				if (err) {
					casper.echo("Error occurred in callback user not logged-in", "ERROR");	
				}else {
					casper.echo('Processing to Login on forum.....','INFO');
					wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists){
						if(isExists){
							casper.click('a[href="/categories"]');
							wait.waitForElement('span.forum-title:nth-child(1)' , casper , function(err , isExists){
								if(isExists) {
									casper.click('span.forum-title:nth-child(1)');
									wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary ' , casper , function(err , isExists) {
										if(isExists) {
											casper.click('span.forum-title:nth-child(1)');
											uploadMethods.createSubTopic(casper , function(err){
												if(!err)
													casper.echo('createsubtopic called', 'INFO');
											});
											casper.then(function(){
												casper.click('i.icon.glyphicon-paperclip');
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
		});
		casper.thenOpen('https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/16748357' , function(){
			wait.waitForTime(1000 , casper , function(err) {
				casper.capture('1.png');
			});
		});
		
		
	//});
};

//Verify with sub category from forum listing page camera browse
uploadTests.uploadSubCategoryCamerabrowse=function(){		
	casper.thenOpen(config.url , function(){
		casper.echo('                   TestCase 51                 ' ,'INFO');	
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('Verify with sub category from forum listing page camera browse' ,'INFO');
		inContextLoginMethod.loginToApp(json['validInfose'].username, json['validInfose'].password, casper, function(err) {
			if (err) {
				casper.echo("Error occurred in callback user not logged-in", "ERROR");	
			}else {
				casper.echo('Processing to Login on forum.....','INFO');
				wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists){
					if(isExists){
						casper.click('a[href="/categories"]');
						wait.waitForElement('span.forum-title:nth-child(1)' , casper , function(err , isExists){
							if(isExists) {
								casper.click('span.forum-title:nth-child(1)');
								wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary ' , casper , function(err , isExists) {
									if(isExists) {
										casper.click('span.forum-title:nth-child(1)');
										uploadMethods.createSubTopic(casper , function(err){
											if(!err)
												casper.echo('createsubtopic called', 'INFO');
										});
										casper.then(function(){
											casper.click('i.glyphicon.glyphicon-camera');
											uploadMethods.Webbrowse(casper , function(err){
												if(!err) {
													casper.echo('Webbrowse method called successfully','INFO');
													
													
												}
											});
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
	});
	casper.thenOpen('https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/16748357' , function(){
		wait.waitForTime(1000 , casper , function(err) {
			casper.capture('1.png');
		});
	});
};

//Verify with sub category from forum listing page camera webaddress
uploadTests.uploadSubCategoryCameraWebaddress=function(){		
	casper.thenOpen(config.url , function(){
		casper.echo('                   TestCase 52                 ' ,'INFO');	
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('Verify with sub category from forum listing page camera webaddress' ,'INFO');
		inContextLoginMethod.loginToApp(json['validInfose'].username, json['validInfose'].password, casper, function(err) {
			if (err) {
				casper.echo("Error occurred in callback user not logged-in", "ERROR");	
			}else {
				casper.echo('Processing to Login on forum.....','INFO');
				wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists){
					if(isExists){
						casper.click('a[href="/categories"]');
						wait.waitForElement('span.forum-title:nth-child(1)' , casper , function(err , isExists){
							if(isExists) {
								casper.click('span.forum-title:nth-child(1)');
								wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary ' , casper , function(err , isExists) {
									if(isExists) {
										casper.click('span.forum-title:nth-child(1)');
										uploadMethods.createSubTopic(casper , function(err){
											if(!err)
												casper.echo('createsubtopic called', 'INFO');
										});
										casper.then(function(){
											casper.click('i.glyphicon.glyphicon-camera');
											uploadMethods.Webaddress(casper , function(err){
												if(!err) {
													casper.echo('Webbrowse method called successfully','INFO');
													
												}
											});
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
	});
	casper.thenOpen('https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/16748357' , function(){
		wait.waitForTime(1000 , casper , function(err) {
			casper.capture('1.png');
		});
	});
};

//Verify with sub category from forum listing page Image browse
uploadTests.uploadSubCategoryImagebrowse=function(){		
	casper.thenOpen(config.url , function(){
		casper.echo('                   TestCase 53                 ' ,'INFO');	
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('Verify with sub category from forum listing page Image browse' ,'INFO');
		inContextLoginMethod.loginToApp(json['validInfose'].username, json['validInfose'].password, casper, function(err) {
			if (err) {
				casper.echo("Error occurred in callback user not logged-in", "ERROR");	
			}else {
				casper.echo('Processing to Login on forum.....','INFO');
				wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists){
					if(isExists){
						casper.click('a[href="/categories"]');
						wait.waitForElement('span.forum-title:nth-child(1)' , casper , function(err , isExists){
							if(isExists) {
								casper.click('span.forum-title:nth-child(1)');
								wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary ' , casper , function(err , isExists) {
									if(isExists) {
										casper.click('span.forum-title:nth-child(1)');
										uploadMethods.createSubTopic(casper , function(err){
											if(!err)
												casper.echo('createsubtopic called', 'INFO');
										});
										casper.then(function(){
											wait.waitForElement('a#message_imagebutton span' , casper , function(err , isExists) {
												if(isExists) {
													casper.click('span.mceIcon.mce_imagebutton');
													uploadMethods.Webbrowse(casper , function(err){
														if(!err) {
															casper.echo('Webbrowse method called successfully','INFO');
													
														}
													});
													inContextLoginMethod.logoutFromApp(casper, function(err){
														if (!err)
														casper.echo('Successfully logout from application', 'INFO');
													});
												}	
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
				casper.capture('1.png');
			});
		});
	});
};

//Verify with sub category from forum listing page Image webaddress
uploadTests.uploadSubCategoryImageWebaddress=function(){		
	casper.thenOpen(config.url , function(){
		casper.echo('                   TestCase 54                 ' ,'INFO');	
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('Verify with sub category from forum listing page Image webaddress' ,'INFO');
		inContextLoginMethod.loginToApp(json['validInfose'].username, json['validInfose'].password, casper, function(err) {
			if (err) {
				casper.echo("Error occurred in callback user not logged-in", "ERROR");	
			}else {
				casper.echo('Processing to Login on forum.....','INFO');
				wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists){
					if(isExists){
						casper.click('a[href="/categories"]');
						wait.waitForElement('span.forum-title:nth-child(1)' , casper , function(err , isExists){
							if(isExists) {
								casper.click('span.forum-title:nth-child(1)');
								wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary ' , casper , function(err , isExists) {
									if(isExists) {
										
											casper.click('span.forum-title:nth-child(1)');
											uploadMethods.createSubTopic(casper , function(err){
												if(!err)
													casper.echo('createsubtopic called', 'INFO');
											});
											casper.then(function(){
												wait.waitForElement('a#message_imagebutton span' , casper , function(err , isExists){
													if(isExists) {
														casper.click('a#message_imagebutton span');
														uploadMethods.Webaddress(casper , function(err){
															if(!err) {
																casper.echo('Webaddress method called successfully','INFO');
													
															}
														});
														inContextLoginMethod.logoutFromApp(casper, function(err){
															if (!err)
																casper.echo('Successfully logout from application', 'INFO');
														});
													}
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
					casper.capture('1.png');
				});
			});
	});
};

//Verify with Edit the post from  Approval queue Page
uploadTests.uploadApprovalqueue=function(){
	casper.thenOpen(config.url , function(){
		casper.echo('                   TestCase 55                 ' ,'INFO');	
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('Verify with Edit the post from  Approval queue Page Attachment' ,'INFO');	
		inContextLoginMethod.loginToApp(json['validInfose'].username, json['validInfose'].password, casper, function(err) {
			if (err) {
				casper.echo("Error occurred in callback user not logged-in", "ERROR");	
			}else {
				casper.echo('Processing to Login on forum.....','INFO');
				wait.waitForElement('form[name="posts"] a.topic-title' ,casper , function(err , isExists){
					if(isExists) {
						casper.click('a[href="/categories"]');
						wait.waitForElement('span.forum-title:nth-child(1)' , casper , function( err , isexists) {
							if(isexists) {
								casper.click('i.glyphicon.glyphicon-tasks.has-notif');	
								wait.waitForElement('i.glyphicon.glyphicon-pencil' , casper , function( err , isExists) {
									if(isExists) {
										casper.click('i.glyphicon.glyphicon-pencil');
										wait.waitForElement('input[name="save"]' , casper , function(err , isExists){
											if(isExists) {
												casper.click('i.icon.glyphicon-paperclip');
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
			}
		});
	});
	casper.thenOpen('https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/16748357' , function(){
		wait.waitForTime(1000 , casper , function(err) {
			casper.capture('1.png');
		});
	});
};

//Verify with Edit the post from  Approval queue Page camera browse
uploadTests.uploadApprovalCamerabrowse=function(){
	casper.thenOpen(config.url , function(){
		casper.echo('                   TestCase 56                ' ,'INFO');	
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('Verify with Edit the post from  Approval queue Page Attachment' ,'INFO');	
		inContextLoginMethod.loginToApp(json['validInfose'].username, json['validInfose'].password, casper, function(err) {
			if (err) {
				casper.echo("Error occurred in callback user not logged-in", "ERROR");	
			}else {
				casper.echo('Processing to Login on forum.....','INFO');
				wait.waitForElement('form[name="posts"] a.topic-title' ,casper , function(err , isExists){
					if(isExists) {
						casper.click('a[href="/categories"]');
						wait.waitForElement('span.forum-title:nth-child(1)' , casper , function( err , isexists) {
							if(isexists) {
								casper.click('i.glyphicon.glyphicon-tasks.has-notif');	
								wait.waitForElement('i.glyphicon.glyphicon-pencil' , casper , function( err , isExists) {
									if(isExists) {
										casper.click('i.glyphicon.glyphicon-pencil');
										wait.waitForElement('input[name="save"]' , casper , function(err , isExists){
											if(isExists) {
												casper.click('i.glyphicon.glyphicon-camera');
												casper.then(function(){
													uploadMethods.Webbrowse(casper , function(err){
															if(!err) {
																casper.echo('Webaddress method called successfully','INFO');
													
															}
													});												

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
			}
		});
	});
	casper.thenOpen('https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/16748357' , function(){
		wait.waitForTime(1000 , casper , function(err) {
			casper.capture('1.png');
		});
	});
};


//
//Verify with Edit the post from  Approval queue Page camera webaddress
uploadTests.uploadApprovalCameraWebaddress=function(){
	casper.thenOpen(config.url , function(){
		casper.echo('                   TestCase 57                ' ,'INFO');	
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('Verify with Edit the post from  Approval queue Page Attachment' ,'INFO');	
		inContextLoginMethod.loginToApp(json['validInfose'].username, json['validInfose'].password, casper, function(err) {
			if (err) {
				casper.echo("Error occurred in callback user not logged-in", "ERROR");	
			}else {
				casper.echo('Processing to Login on forum.....','INFO');
				wait.waitForElement('form[name="posts"] a.topic-title' ,casper , function(err , isExists){
					if(isExists) {
						casper.click('a[href="/categories"]');
						wait.waitForElement('span.forum-title:nth-child(1)' , casper , function( err , isexists) {
							if(isexists) {
								casper.click('i.glyphicon.glyphicon-tasks.has-notif');	
								wait.waitForElement('i.glyphicon.glyphicon-pencil' , casper , function( err , isExists) {
									if(isExists) {
										casper.click('i.glyphicon.glyphicon-pencil');
										wait.waitForElement('input[name="save"]' , casper , function(err , isExists){
											if(isExists) {
												casper.click('i.glyphicon.glyphicon-camera');
												casper.then(function(){
													uploadMethods.Webaddress(casper , function(err){
															if(!err) {
																casper.echo('Webaddress method called successfully','INFO');
													
															}
													});												

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
			}
		});
	});
	casper.thenOpen('https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/16748357' , function(){
		wait.waitForTime(1000 , casper , function(err) {
			casper.capture('1.png');
		});
	});
};

//Verify with Edit the post from  Approval queue Page Image browse
uploadTests.uploadApprovalImagebrowse=function(){
	casper.thenOpen(config.url , function(){
		casper.echo('                   TestCase 58                ' ,'INFO');	
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('Verify with Edit the post from  Approval queue Page Image browse' ,'INFO');	
		inContextLoginMethod.loginToApp(json['validInfose'].username, json['validInfose'].password, casper, function(err) {
			if (err) {
				casper.echo("Error occurred in callback user not logged-in", "ERROR");	
			}else {
				casper.echo('Processing to Login on forum.....','INFO');
				wait.waitForElement('form[name="posts"] a.topic-title' ,casper , function(err , isExists){
					if(isExists) {
						casper.click('a[href="/categories"]');
						wait.waitForElement('span.forum-title:nth-child(1)' , casper , function( err , isexists) {
							if(isexists) {
								casper.click('i.glyphicon.glyphicon-tasks.has-notif');	
								wait.waitForElement('i.glyphicon.glyphicon-pencil' , casper , function( err , isExists) {
									if(isExists) {
										casper.click('i.glyphicon.glyphicon-pencil');
										wait.waitForElement('input[name="save"]' , casper , function(err , isExists){
											if(isExists) {
												//casper.click('img');
												wait.waitForTime(5000 , casper ,function(err){
													casper.click('a#message1_imagebutton span');
													casper.then(function(){
														uploadMethods.Webbrowse(casper , function(err){
																if(!err) {
																	casper.echo('Webaddress method called successfully','INFO');
													
																}
														});												
													});
													casper.then(function(){
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
				});
			}
		});
	});
	casper.thenOpen('https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/16748357' , function(){
		wait.waitForTime(1000 , casper , function(err) {
			casper.capture('1.png');
		});
	});
};

//Verify with Edit the post from  Approval queue Page Image webaddress
uploadTests.uploadApprovalImageWebaddress=function(){
	casper.thenOpen(config.url , function(){
		casper.echo('                   TestCase 59               ' ,'INFO');	
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('Verify with Edit the post from  Approval queue Page Image Webaddress' ,'INFO');	
		inContextLoginMethod.loginToApp(json['validInfose'].username, json['validInfose'].password, casper, function(err) {
			if (err) {
				casper.echo("Error occurred in callback user not logged-in", "ERROR");	
			}else {
				casper.echo('Processing to Login on forum.....','INFO');
				wait.waitForElement('form[name="posts"] a.topic-title' ,casper , function(err , isExists){
					if(isExists) {
						casper.click('a[href="/categories"]');
						wait.waitForElement('span.forum-title:nth-child(1)' , casper , function( err , isexists) {
							if(isexists) {
								casper.click('i.glyphicon.glyphicon-tasks.has-notif');	
								wait.waitForElement('i.glyphicon.glyphicon-pencil' , casper , function( err , isExists) {
									if(isExists) {
										casper.click('i.glyphicon.glyphicon-pencil');
										wait.waitForElement('input[name="save"]' , casper , function(err , isExists){
											if(isExists) {
												wait.waitForTime(5000 , casper ,function(err){
													casper.click('a#message1_imagebutton span');
													casper.then(function(){
														uploadMethods.Webbrowse(casper , function(err){
																if(!err) {
																	casper.echo('Webaddress method called successfully','INFO');
													
																}
														});												
													});
													casper.then(function(){
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
				});
			}
		});
	});
	casper.thenOpen('https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/16748357' , function(){
		wait.waitForTime(1000 , casper , function(err) {
			casper.capture('1.png');
		});
	});
};

//*****************************************************Album Section*********************************************************
//verify with add new pic in album from add photos button
uploadTests.uploadAlbum=function(){
	casper.thenOpen(config.url , function(){
		casper.echo('                   TestCase 60              ' ,'INFO');	
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('verify with add new pic in album from add photos button' ,'INFO');	
		inContextLoginMethod.loginToApp(json['validInfose'].username, json['validInfose'].password, casper, function(err) {
			if (err) {
				casper.echo("Error occurred in callback user not logged-in", "ERROR");	
			}else {
				casper.echo('Processing to Login on forum.....','INFO');
				wait.waitForElement('form[name="posts"] a.topic-title' , casper , function( err , isExists) {
					if(isExists) {
						wait.waitForElement('ul li:nth-child(1) span:nth-child(1) span:nth-child(1) a' , casper , function(err , isExists) {
							if(isExists) {

								//casper.click('ul li:nth-child(1) span:nth-child(1) span:nth-child(1) a');
								casper.evaluate(function() {
									document.querySelector('ul li:nth-child(1) span:nth-child(1) span:nth-child(1) a').click();
								});
								wait.waitForElement('li.active a' , casper , function(err , isExists){
									if(isExists) {
										casper.click('li.active a');
										
									}
								});
								casper.then(function(){
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
		
		});
		casper.thenOpen('https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/thumb/16749540' , function(){
			wait.waitForTime(1000 , casper , function(err) {
				casper.capture('1.png');
			});
		});
};

//verify with upload pic by click on add album>add photos
uploadTests.uploadAlbumAddPhotos=function(){
	casper.thenOpen(config.url , function(){
		casper.echo('                   TestCase 61              ' ,'INFO');	
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('verify with upload pic by click on add album>add photos' ,'INFO');	
		inContextLoginMethod.loginToApp(json['validInfose'].username, json['validInfose'].password, casper, function(err) {
			if (err) {
				casper.echo("Error occurred in callback user not logged-in", "ERROR");	
			}else {
				casper.echo('Processing to Login on forum.....','INFO');
				wait.waitForElement('form[name="posts"] a.topic-title' , casper , function( err , isExists) {
					if(isExists) {
						//casper.click('ul li:nth-child(1) span:nth-child(1) span:nth-child(1) a');
						casper.evaluate(function() {
							document.querySelector('ul li:nth-child(1) span:nth-child(1) span:nth-child(1) a').click();
						});
						wait.waitForElement('li.active a' , casper , function(err , isExists){
							if(isExists) {
								casper.click('li.active a');
								wait.waitForTime(1000 , casper , function(err) {
									casper.capture('156.png');
									wait.waitForElement('a#uploadphotos' , casper , function(err , isExists) {
										if(isExists) {
											casper.click('a#uploadphotos');	
											casper.then(function(){
												inContextLoginMethod.logoutFromApp(casper, function(err){
													if (!err)
														casper.echo('Successfully logout from application', 'INFO');
												});
											});
											
										}
									});
								});	
							}
						});	
					}
				});
			}
		});
		
	});
	casper.thenOpen('https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/thumb/16749583' , function(){
		wait.waitForTime(1000 , casper , function(err) {
			casper.capture('1.png');
		});
	});
};

//verify with  upload pic after click on  edit album>add photos
uploadTests.uploadEditAlbum=function(){
	casper.thenOpen(config.url , function(){
		casper.echo('                   TestCase 62              ' ,'INFO');	
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('verify with  upload pic after click on  edit album>add photos' ,'INFO');	
		inContextLoginMethod.loginToApp(json['validInfose'].username, json['validInfose'].password, casper, function(err) {
			if (err) {
				casper.echo("Error occurred in callback user not logged-in", "ERROR");	
			}else {
				casper.echo('Processing to Login on forum.....','INFO');
				wait.waitForElement('form[name="posts"] a.topic-title' , casper , function( err , isExists) {	
					if(isExists) {
						//casper.click('ul li:nth-child(1) span:nth-child(1) span:nth-child(1) a');
						casper.evaluate(function() {
							document.querySelector('ul li:nth-child(1) span:nth-child(1) span:nth-child(1) a').click();
						});
						
						wait.waitForElement('li.active a' , casper , function(err , isExists){	
							if(isExists) {
								casper.click('li.active a');
								wait.waitForTime(1000 , casper , function(err) {
									casper.capture('156.png');
									wait.waitForElement('span.album-wrapper a' , casper , function(err , isExists) {
										if(isExists) {
											casper.click('span.album-wrapper a');
											wait.waitForElement('a#anchor_tab_new_topic_up' , casper , function(err , isExists) {
												if(isExists) {
													casper.click('a#anchor_tab_new_topic_up');
													casper.capture('166.png');
													casper.then(function(){
														inContextLoginMethod.logoutFromApp(casper, function(err){
															if (!err)
																casper.echo('Successfully logout from application', 'INFO');
														});
													});	
												}
											});
										}	
									});
								});	
							}
						});
					}
				});
			}
		
		});
		casper.thenOpen('https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/thumb/16749583' , function(){
			wait.waitForTime(1000 , casper , function(err) {
				casper.capture('1.png');
			});
		});
     });
};

//verify with upload picz by click on album cover photo>add photo
uploadTests.uploadAlbumCover=function(){
	casper.thenOpen(config.url , function(){
		casper.echo('                   TestCase 63              ' ,'INFO');	
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('verify with upload picz by click on album cover photo>add photo' ,'INFO');	
		inContextLoginMethod.loginToApp(json['validInfose'].username, json['validInfose'].password, casper, function(err) {
			if (err) {
				casper.echo("Error occurred in callback user not logged-in", "ERROR");	
			}else {
				casper.echo('Processing to Login on forum.....','INFO');
				wait.waitForElement('form[name="posts"] a.topic-title' , casper , function( err , isExists) {
					if(isExists) {
						casper.click('ul li:nth-child(1) span:nth-child(1) span:nth-child(1) a');
						wait.waitForElement('span.album-wrapper a' , casper , function(err , isExists){
							if(isExists) {
								casper.click('span.album-wrapper a');
								wait.waitForTime(1000 , casper , function(err) {
									//casper.capture('156.png');
									wait.waitForElement('a#uploadphotos' , casper , function(err , isExists) {
										if(isExists) {
											casper.click('a#uploadphotos');
											casper.click('166.png');	
											
										}
									});
								});	
							}
						});	
					}
				});
			}
		});
		
	});
	casper.thenOpen('https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/thumb/16749583' , function(){
		wait.waitForTime(1000 , casper , function(err) {
			casper.capture('1.png');
		});
	});
};






	



































