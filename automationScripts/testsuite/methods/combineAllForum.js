var config = require('../../../config/config.json');
var json = require('../../testdata/inContextLogin.json');
var uploadMethods = require('../methods/uploadmethod.js');
var inContextLoginMethod = require('../methods/inContextLogin.js');
var loginPrivacyOptionMethod = require('../methods/loginByPrivacyOption.js');
var wait=require('../wait.js');
var utils=require('../utils.js');
uploadCombine = module.exports = {};


//Verify with post from topic listing page(Attachment/insert photos)
uploadCombine.uploadPostAttachment=function(driver , callback){
	casper.echo('                   TestCase 1 Combine All Forum Cases               ' ,'INFO');
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
uploadCombine.uploadPostAttachmentCamera=function(){
	casper.thenOpen(config.url, function() {
		casper.echo('                   TestCase 2 Combine All Forum Cases                 ' ,'INFO');
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
						wait.waitForElement('a#sub_post_reply' , casper , function(err) {
							if(isExists) {
								casper.click('a#sub_post_reply');
								wait.waitForTime(2000 , casper , function(err) {
									casper.capture('11.png');
									casper.click('i.glyphicon.glyphicon-camera');
									uploadMethods.Webbrowse(casper , function(err){
										if(!err)
																																																																						casper.echo('Webbrowse method called successfully','INFO');
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
	});

};

//*********************************************Start New Topic ******************************************************
//Verify with start new Topic(latest topics page)(Attachment/insert photos)
uploadCombine.uploadStartNewTopic=function(){				
	casper.thenOpen(config.url, function() {
		casper.echo('                   TestCase 3  Combine All Forum Cases               ' ,'INFO');						
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

								casper.click('i.glyphicon.glyphicon-paperclip');
							}
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
	});
};

//Verify with start new Topic(latest topics page) insert photo Image button
uploadCombine.uploadStartNewTopicImageButton=function(){
	casper.thenOpen(config.url, function() {
		casper.echo('                   TestCase 4  Combine All Forum Cases               ' ,'INFO');						
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
								casper.capture('1.png');
								
							}
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
	});
};	

//Verify with start new Topic Insert Photo  camera browse
uploadCombine.uploadStartNewTopicCameraBrowse=function(){
	casper.thenOpen(config.url, function() {
		casper.echo('                   TestCase 5 Combine All Forum Cases                ' ,'INFO');						
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
			}
		});
	});
};	

//Verify with start new Topic Insert Photo camera webaddress
uploadCombine.uploadStartNewTopicCameraWebaddress=function(){
	casper.thenOpen(config.url, function() {
		casper.echo('                   TestCase 6 Combine All Forum Cases                 ' ,'INFO');						
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

//*******************************************Edit section*********************************************************

//Verify with Edit the Post from Topic listing page(insert photos) camera web address
uploadCombine.uploadEditPostCameraWebaddress=function(){
	casper.thenOpen(config.url , function(){
		casper.echo('***********Edit Section**********' ,'INFO');
		casper.echo('                   TestCase 7  Combine All Forum Cases                ' ,'INFO');
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
uploadCombine.uploadEditPostCamerabrowse=function(){
	casper.thenOpen(config.url , function(){
		casper.echo('***********Edit Section**********' ,'INFO');
		casper.echo('                   TestCase 8  Combine All Forum Cases              ' ,'INFO');
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
uploadCombine.uploadEditTopicAttachment=function(){
	casper.thenOpen(config.url , function(){
		casper.echo('***********Edit Section**********' ,'INFO');
		casper.echo('                   TestCase 9 Combine All Forum Cases               ' ,'INFO');
		casper.echo('*************Verify with Edit post from topic listing page(Attachment)**********','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				inContextLoginMethod.loginToApp(json['validInfose'].username, json['validInfose'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....',
			
 'INFO');
						wait.waitForElement('form[name="posts"] a.topic-title', casper, function(err, isExist) {
							if(isExists) {
								//casper.test.assertExists('form[name="posts"] a.topic-title');
								casper.evaluate(function() {
									document.querySelector('form[name="posts"] a.topic-title').click();
								});
								//casper.click(' ul li:nth-child(2) span:nth-child(1) span:nth-child(2) h4 a');
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
					}
				});
			}
		});
	});
};

//Verify with Edit the Topic/Post from Topic listing page insert photo camera webaddress
uploadCombine.uploadEditTopicCameraWebaddress=function(){
	casper.thenOpen(config.url , function(){
		casper.echo('                   TestCase 10 Combine All Forum Cases             ' ,'INFO');
		casper.echo('*************Verify with Edit post from topic listing using webaddress**********','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				inContextLoginMethod.loginToApp(json['validInfose'].username, json['validInfose'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....',
			
 'INFO');
						wait.waitForElement('form[name="posts"] a.topic-title', casper, function(err, isExist) {
							if(isExists) {
								casper.test.assertExists('form[name="posts"] a.topic-title');
								casper.click('form[name="posts"] a.topic-title');
								
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
					}
				});
			}
		});
	});
};

//Verify with Edit the Topic/Post from Topic listing page insert camera  browse
uploadCombine.uploadEditTopicCameraWebbrowse=function(){
	casper.thenOpen(config.url , function(){
		casper.echo('***********Edit Section**********' ,'INFO');
		casper.echo('                   TestCase 11 Combine All Forum Cases                ' ,'INFO');
		casper.echo('*************Verify with Edit post from topic listing page using browse**********','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				inContextLoginMethod.loginToApp(json['validInfose'].username, json['validInfose'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....',
			
 'INFO');
						wait.waitForElement('form[name="posts"] a.topic-title', casper, function(err, isExist) {
							if(isExists) {
								casper.test.assertExists('form[name="posts"] a.topic-title');
								casper.click('form[name="posts"] a.topic-title');
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
					}
				});
			}
		});
	});
};

//Verify with Edit the Topic/Post from Topic listing page using Image button webaddress
uploadCombine.uploadEditTopicImageButtonWebaddress=function(){ 
	casper.thenOpen(config.url , function(){
		casper.echo('***********Edit Section**********' ,'INFO');
		casper.echo('                   TestCase 12 Combine All Forum Cases               ' ,'INFO');
		casper.echo('*************Verify with Edit post from topic listing page using Image button web address**********','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				inContextLoginMethod.loginToApp(json['validInfose'].username, json['validInfose'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....',
			
 'INFO');
						wait.waitForElement('form[name="posts"] a.topic-title', casper, function(err, isExist) {
							if(isExists) {
								casper.test.assertExists('form[name="posts"] a.topic-title');
								casper.click('form[name="posts"] a.topic-title');
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
						}
				});
			}
		});
	});

};

//Verify with Edit the Post from Search result page Attachment
uploadCombine.uploadEditPostSearch=function(){
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 13  Combine All Forum Cases              ' ,'INFO');	
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
									'keywords' :'NewTopic'
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
	});
};

//Verify with Edit the Post from Search result page camera webaddress
uploadCombine.uploadEditPostSearchCameraWebaddress=function(){
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 14 Combine All Forum Cases                ' ,'INFO');	
		casper.echo('***********Verify with Edit the Post from Search result page camera webaddress************','INFO');
		uploadMethods.searchlogin(casper ,function(err) {
			if(!err)
				casper.echo('Method called successfully' , 'INFO');
				
		});
		casper.then(function(){
			wait.waitForElement('i.glyphicon.glyphicon-chevron-down' , casper , function( err , isExists) {
				if(isExists){
					casper.click('i.glyphicon.glyphicon-chevron-down');
					wait.wait
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
uploadCombine.uploadEditPostSearchCamerabrowse=function(){
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 15 Combine All Forum Cases                ' ,'INFO');	
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
uploadCombine.uploadEditPostSearchImagebrowse=function(){
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 16 Combine All Forum Cases               ' ,'INFO');	
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
		
	});
};
//-----------------------------------------------------Profile page-----------------------------------------------------
//Verify with Edit the post from Profile page(Attachment)
uploadCombine.uploadEditProfileAttachment=function(){
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 17 Combine All Forum Cases                 ' ,'INFO');	
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
			
		});
	});
};

//Verify with Edit the post from Profile page camera browse
uploadCombine.uploadEditPostProfileCamerabrowse=function(){
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 18 Combine All Forum Cases                ' ,'INFO');	
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
												casper.click('a[data-toggle="modal"] i.glyphicon.glyphicon-camera');
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
		
	});
};

////Verify with Edit the post from Profile page camera webaddress
uploadCombine.uploadEditPostProfileCameraWebaddress=function(){
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 19 Combine All Forum Cases                ' ,'INFO');	
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
												
												casper.click('a[data-toggle="modal"] i.glyphicon.glyphicon-camera');
																								
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
		
	});
};

////Verify with Edit the post from Profile page Image webaddress
uploadCombine.uploadEditPostProfileImagewebaddress=function(){
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 20 Combine All Forum Cases                ' ,'INFO');	
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
		
	});
};

////Verify with Edit the post from Profile page Image browse
 uploadCombine.uploadEditPostProfileImagebrowse=function(){
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 21 Combine All Forum Cases               ' ,'INFO');	
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
		
	});
};


////Verify with Edit the topic/post by Admin for himself/registered user Attachment
 uploadCombine.uploadAdminLogin=function(){
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 22 Combine All Forum Cases                ' ,'INFO');	
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
		
	});
};


////Verify with Edit the topic/post by Admin for himself/registered user Camera browse
uploadCombine.uploadAdminCamerabrowse=function(){		
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 23 Combine All Forum Cases                ' ,'INFO');	
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
		
	});
};


////Verify with Edit the topic/post by Admin for himself/registered user camera webaddress
uploadCombine.uploadAdminCameraWebaddress=function(){		
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 24 Combine All Forum Cases                ' ,'INFO');	
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
		
	});
};


//Verify with Edit the topic/post by Admin for himself/registered user Image browse
uploadCombine.uploadAdminImagebrowse=function(){		
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 25 Combine All Forum Cases                 ' ,'INFO');	
		casper.echo('********Verify with Edit the topic/post by Admin for himself/registered user Image browse***','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				inContextLoginMethod.loginToApp(json['validInfose'].username, json['validInfose'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists){
							if(isExists){
								//casper.test.assertExists('form[name="posts"] a.topic-title','Topic found');
								//casper.click('ul li:nth-child(2) span:nth-child(1) span:nth-child(2) h4 a');
								casper.click('form[name="posts"] a.topic-title');
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
		
	});
};


////Verify with Edit the topic/post by Admin for himself/registered user Image webaddress
uploadCombine.uploadAdminImageWebaddress=function(){		
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 26 Combine All Forum Cases                 ' ,'INFO');	
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
		
	});
};

//---------------------------------------------Approval section-------------------------------------------------

//Verify with Edit the post from  Approval queue Page
uploadCombine.uploadApprovalqueue=function(){
	casper.thenOpen(config.url , function(){
		casper.echo('                   TestCase 27 Combine All Forum Cases                 ' ,'INFO');	
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('Verify with Edit the post from  Approval queue Page Attachment' ,'INFO');	
		inContextLoginMethod.loginToApp(json['validInfose'].username, json['validInfose'].password, casper, function(err) {
			if (err) {
				casper.echo("Error occurred in callback user not logged-in", "ERROR");	
			}else {
				casper.echo('Processing to Login on forum.....','INFO');
				casper.wait(1000 , function(){

					casper.capture('home.png');

				});
				wait.waitForElement('i.glyphicon.glyphicon-tasks.has-notif' ,casper , function(err , isExists){
					if(isExists) {
						//casper.click('a[href="/categories"]');
						wait.waitForElement('i.glyphicon.glyphicon-tasks.has-notif' , casper , function( err , isexists) {
							if(isexists) {
								casper.click('i.glyphicon.glyphicon-tasks.has-notif');	
								wait.waitForElement('i.glyphicon.glyphicon-pencil' , casper , function( err , isExists) {
									if(isExists) {
										casper.click('div.post-body.pull-left:nth-child(1) div.panel-dropdown a:nth-child(4) i');
										wait.waitForTime(5000, casper , function(err){
											casper.capture('333.png');
											wait.waitForElement('input[name="save"]' , casper , function(err , isExists){
												if(isExists) {
													casper.click('i.icon.glyphicon-paperclip');
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
	});
	
};

//Verify with Edit the post from  Approval queue Page camera browse
uploadCombine.uploadApprovalCamerabrowse=function(){
	casper.thenOpen(config.url , function(){
		casper.echo('                   TestCase 28 Combine All Forum Cases                ' ,'INFO');	
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('Verify with Edit the post from  Approval queue Page Attachment' ,'INFO');	
		inContextLoginMethod.loginToApp(json['validInfose'].username, json['validInfose'].password, casper, function(err) {
			if (err) {
				casper.echo("Error occurred in callback user not logged-in", "ERROR");	
			}else {
				casper.echo('Processing to Login on forum.....','INFO');
				wait.waitForElement('i.glyphicon.glyphicon-tasks.has-notif' ,casper , function(err , isExists){
					if(isExists) {
						//casper.click('a[href="/categories"]');
						wait.waitForElement('i.glyphicon.glyphicon-tasks.has-notif' , casper , function( err , isexists) {
							if(isexists) {
								casper.click('i.glyphicon.glyphicon-tasks.has-notif');	
								wait.waitForElement('i.glyphicon.glyphicon-pencil' , casper , function( err , isExists) {
									if(isExists) {
										casper.click('div.post-body.pull-left:nth-child(1) div.panel-dropdown a:nth-child(4) i');
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
	
};

//Verify with Edit the post from  Approval queue Page camera webaddress
uploadCombine.uploadApprovalCameraWebaddress=function(){
	casper.thenOpen(config.url , function(){
		casper.echo('                   TestCase 29 Combine All Forum Cases                ' ,'INFO');	
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('Verify with Edit the post from  Approval queue Page Attachment' ,'INFO');	
		inContextLoginMethod.loginToApp(json['validInfose'].username, json['validInfose'].password, casper, function(err) {
			if (err) {
				casper.echo("Error occurred in callback user not logged-in", "ERROR");	
			}else {
				casper.echo('Processing to Login on forum.....','INFO');
				wait.waitForElement('i.glyphicon.glyphicon-tasks.has-notif' ,casper , function(err , isExists){
					if(isExists) {
						//casper.click('a[href="/categories"]');
						wait.waitForElement('i.glyphicon.glyphicon-tasks.has-notif' , casper , function( err , isexists) {
							if(isexists) {
								casper.click('i.glyphicon.glyphicon-tasks.has-notif');	
								wait.waitForElement('i.glyphicon.glyphicon-pencil' , casper , function( err , isExists) {
									if(isExists) {
										casper.click('div.post-body.pull-left:nth-child(1) div.panel-dropdown a:nth-child(4) i');
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
	
};

////Verify with Edit the post from  Approval queue Page Image browse
uploadCombine.uploadApprovalImagebrowse=function(){
	casper.thenOpen(config.url , function(){
		casper.echo('                   TestCase 30 Combine All Forum Cases                ' ,'INFO');	
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('Verify with Edit the post from  Approval queue Page Image browse' ,'INFO');	
		inContextLoginMethod.loginToApp(json['validInfose'].username, json['validInfose'].password, casper, function(err) {
			if (err) {
				casper.echo("Error occurred in callback user not logged-in", "ERROR");	
			}else {
				casper.echo('Processing to Login on forum.....','INFO');
				wait.waitForElement('i.glyphicon.glyphicon-tasks.has-notif' ,casper , function(err , isExists){
					if(isExists) {
						//casper.click('a[href="/categories"]');
						wait.waitForElement('i.glyphicon.glyphicon-tasks.has-notif' , casper , function( err , isexists) {
							if(isexists) {
								casper.click('i.glyphicon.glyphicon-tasks.has-notif');	
								wait.waitForElement('i.glyphicon.glyphicon-pencil' , casper , function( err , isExists) {
									if(isExists) {
										casper.click('div.post-body.pull-left:nth-child(1) div.panel-dropdown a:nth-child(4) i');
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
	
};

///Verify with Edit the post from  Approval queue Page Image webaddress
uploadCombine.uploadApprovalImageWebaddress=function(){
	casper.thenOpen(config.url , function(){
		casper.echo('                   TestCase 31 Combine All Forum Cases               ' ,'INFO');	
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('Verify with Edit the post from  Approval queue Page Image Webaddress' ,'INFO');	
		inContextLoginMethod.loginToApp(json['validInfose'].username, json['validInfose'].password, casper, function(err) {
			if (err) {
				casper.echo("Error occurred in callback user not logged-in", "ERROR");	
			}else {
				casper.echo('Processing to Login on forum.....','INFO');
				wait.waitForElement('i.glyphicon.glyphicon-tasks.has-notif' ,casper , function(err , isExists){
					if(isExists) {
						//casper.click('a[href="/categories"]');
						wait.waitForElement('i.glyphicon.glyphicon-tasks.has-notif' , casper , function( err , isexists) {
							if(isexists) {
								casper.click('i.glyphicon.glyphicon-tasks.has-notif');	
								wait.waitForElement('i.glyphicon.glyphicon-pencil' , casper , function( err , isExists) {
									if(isExists) {
										casper.click('div.post-body.pull-left:nth-child(1) div.panel-dropdown a:nth-child(4) i');
										wait.waitForTime(2000 , casper , function(err){
											casper.capture('666.png');
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





		

