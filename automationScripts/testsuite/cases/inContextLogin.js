//'use strict';
var json = require('../../testdata/inContextLogin.json');
var config = require('../../../config/config.json');
var inContextLoginMethod = require('../methods/inContextLogin.js');
var loginPrivacyOptionMethod = require('../methods/loginByPrivacyOption.js');
var utils=require('../utils.js')
inContextLoginTests = module.exports = {};
var wait=require('../wait.js');

//Testcase Incontext login from Start New Topic button via 'Create an account or log in' link 

inContextLoginTests.inContextLoginfrmStartTopic=function(){
	loginPrivacyOptionMethod.loginToForumBackEnd(casper , function(err) {
		if (!err)
			casper.echo('LoggedIn to forum backend....', 'INFO');
	});
	wait.waitForElement('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', casper , function(err, isExists) {
		if(isExists) {
			casper.evaluate(function() {
				document.querySelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"').click();
			});
			wait.waitForElement('div.tooltipMenu.text a[title="Assign permissions to user groups"]', casper , function(err , isExists) {
				if( isExists) {
					casper.evaluate(function() {
						document.querySelector('div.tooltipMenu.text a[title="Assign permissions to user groups"]').click();
					});
					wait.waitForTime(1000 , casper , function(err) {
						casper.capture('h.png');
						casper.click('a[data-tooltip-elm="ugManage20237478"]');
						casper.click('div#ugManage20237478 a');
						wait.waitForElement('button.button.btn-m.btn-blue', casper , function(err, isExists) {
							if(isExists) {
									
								utils.enableorDisableCheckbox('post_threads',true, casper, function(err) {
									if(!err)
										casper.echo('Successfully checked','INFO');
								});
								casper.click('button.button.btn-m.btn-blue');
								casper.thenOpen(config.url, function() {
									casper.echo("Title of the page :"+this.getTitle(), 'INFO');
									//Startnnew topic id
									wait.waitForElement('div#topics a', casper , function(err , isExists){
										if(isExists) {
											//casper.click('div#topics a');
											casper.evaluate(function() {
												document.querySelector('div#topics a').click();
											});
										wait.waitForTime(3000, casper , function(err){
											wait.waitForElement('a#guest_user_create_account', casper,function(err, isExists) {
												if(isExists) {
													casper.click('a#guest_user_create_account');
													wait.waitForTime(1000, casper , function(er) {
														inContextLoginMethod.loginToApp(json['validInfo'].username, json['validInfo'].password, casper, function(err) {
															if (err) {
																casper.echo("Error occurred in callback user not logged-in", "ERROR");
															}else {
																casper.echo('Processing to Login on forum.....', 'INFO');
																wait.waitForTime(1000 , casper ,function(err) {
																	wait.waitForElement('ul.nav.pull-right span.caret', casper ,function(err ,isExists){
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

											});
										}
									});
								});
							}												
						});
					});
				}else {
					casper.echo('Start topic button selector not found ','ERROR');
				}
			});
		}
	});
};

//Incontext login from Start New Topic button when its permission is OFF.

inContextLoginTests.inContextLoginLikePostTopicPage=function(){
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('******************Incontext login from Start New Topic button when its permission is OFF.*****************','INFO');
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		loginPrivacyOptionMethod.loginToForumBackEnd(casper , function(err) {
			if (!err)
				casper.echo('LoggedIn to forum backend....', 'INFO');
		});
		wait.waitForElement('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', casper , function(err, isExists) {
			if(isExists) {	
				casper.evaluate(function() {
					document.querySelector('div.tooltipMenu.text a[title="Assign permissions to user groups"]').click();
				});
				wait.waitForTime(1000 , casper , function(err) {
					casper.click('a[data-tooltip-elm="ugManage20237478"]');
					casper.click('div#ugManage20237478 a');	
					wait.waitForElement('button.button.btn-m.btn-blue', casper , function(err, isExists) {
						if(isExists) {
							utils.enableorDisableCheckbox('post_threads',false, casper, function(err) {
								if(!err)
									casper.echo('Successfully unchecked','INFO');
							});
							casper.click('button.button.btn-m.btn-blue');
							casper.thenOpen(config.url, function() {
								casper.echo("Title of the page :"+this.getTitle(), 'INFO');
								wait.waitForElement('div#topics a', casper , function(err , isExists){
									if(isExists) {
										casper.click('div#topics a');
										inContextLoginMethod.loginToApp(json['validInfo'].username, json['validInfo'].password, casper, function(err) {
											if (err) {
												casper.echo("Error occurred in callback user not logged-in", "ERROR");
											}else {
												casper.echo('Processing to Login on forum.....', 'INFO');
												wait.waitForTime(1000 , casper ,function(err) {
																				wait.waitForElement('ul.nav.pull-right span.caret', casper ,function(err ,isExists){
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
						}
					});
				});	
			}			
		});		
	});
};


//inContext Login from Quote on post from post list 

inContextLoginTests.inContextLoginQuote=function(){
	casper.thenOpen(config.backEndUrl, function() {		
		casper.echo('*********************inContext Login from Quote on post from post list*****************','INFO');
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		loginPrivacyOptionMethod.loginToForumBackEnd(casper , function(err) {
			if (!err)
				casper.echo('LoggedIn to forum backend....', 'INFO');
		});
		wait.waitForElement('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', casper , function(err, isExists) {
			if(isExists) {	
				casper.evaluate(function() {
					document.querySelector('div.tooltipMenu.text a[title="Assign permissions to user groups"]').click();
				});
				wait.waitForTime(1000 , casper , function(err) {
					casper.click('a[data-tooltip-elm="ugManage20237478"]');
					casper.click('div#ugManage20237478 a');
					wait.waitForElement('button.button.btn-m.btn-blue', casper , function(err, isExists) {
						if(isExists) {
							utils.enableorDisableCheckbox('other_post_replies',true, casper, function(err) {
								if(!err)
									casper.echo('Successfully unchecked','INFO');
							});
							casper.click('button.button.btn-m.btn-blue');
							casper.thenOpen(config.url, function() {
								wait.waitForElement('form[name="posts"] a.topic-title', casper , function(err, isExists) {
									if(isExists) {	
										casper.click('form[name="posts"] a.topic-title');
										wait.waitForElement('a.text-muted.quote', casper , function(err, isExists){	
											if(isExists) {
												casper.evaluate(function() {
													document.querySelector('a.text-muted.quote').click();
												});
												inContextLoginMethod.loginToApp(json['validInfo'].username, json['validInfo'].password, casper, function(err) {
													if (err) {
														casper.echo("Error occurred in callback user not logged-in", "ERROR");
													}else {
														casper.echo('Processing to Login on forum.....', 'INFO');
														wait.waitForTime(1000 , casper ,function(err) {
																				wait.waitForElement('ul.nav.pull-right span.caret', casper ,function(err ,isExists){
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
							});
						}
					});
				});
			}
		});	
	});
};


//Incontext Login while like this post from Topic page

inContextLoginTests.inContextLoginLikePostTopicPage=function(){
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('*******************Incontext Login while like this post from Topic page************************','INFO');
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		loginPrivacyOptionMethod.loginToForumBackEnd(casper , function(err) {
			if (!err)
				casper.echo('LoggedIn to forum backend....', 'INFO');
		});
		wait.waitForElement('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', casper , function(err, isExists) {
			if(isExists) {		
				casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
				casper.click('div#ddSettings  div a:nth-child(2)');
				wait.waitForElement('button.button.btn-m.btn-blue' , casper, function(err , isExists) {
					if(isExists) {
						utils.enableorDisableCheckbox('reputation',true, casper, function(err) {
							if(!err)
								casper.echo('Successfully checked','INFO');
						});
						casper.click('button.button.btn-m.btn-blue');
						casper.thenOpen(config.url, function() {
							wait.waitForElement('form[name="posts"] a.topic-title', casper , function(err, isExists) {
								if(isExists) {	
									casper.click('i.glyphicon.glyphicon-like-alt');
									inContextLoginMethod.loginToApp(json['validInfo'].username, json['validInfo'].password, casper, function(err) {
										if (err) {
											casper.echo("Error occurred in callback user not logged-in", "ERROR");	
										}else {
											casper.echo('Processing to Login on forum.....', 'INFO');
											wait.waitForTime(1000 , casper , function(err){
												wait.waitForElement('ul.nav.pull-right span.caret', casper , function(err, isExists){
													if(isExists) {
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
						});
					}
				});
			}
		});	
		
	});
};



//Incontext Login while disLike this Topic from list of topics 
inContextLoginTests.inContextLoginDisLikeTopicHome=function(){
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('*******************Incontext Login while dislike this post from Topic page************************','INFO');
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		loginPrivacyOptionMethod.loginToForumBackEnd(casper , function(err) {
			if (!err)
				casper.echo('LoggedIn to forum backend....', 'INFO');
		});
		wait.waitForElement('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', casper , function(err, isExists) {
			if(isExists) {		
				casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
				casper.click('div#ddSettings  div a:nth-child(2)');
				wait.waitForElement('button.button.btn-m.btn-blue' , casper, function(err , isExists) {
					if(isExists) {
						utils.enableorDisableCheckbox('reputation',true, casper, function(err) {
							if(!err)
								casper.echo('Successfully checked','INFO');
						});
						casper.click('button.button.btn-m.btn-blue');
						casper.thenOpen(config.url, function() {
							wait.waitForElement('form[name="posts"] a.topic-title', casper , function(err, isExists) {
								if(isExists) {
									casper.click('form[name="posts"] a.topic-title');	
									casper.click('i.glyphicon.glyphicon-like-alt');
									inContextLoginMethod.loginToApp(json['validInfo'].username, json['validInfo'].password, casper, function(err) {
										if (err) {
											casper.echo("Error occurred in callback user not logged-in", "ERROR");	
										}else {
											casper.echo('Processing to Login on forum.....', 'INFO');
											wait.waitForTime(1000 , casper , function(err){
												wait.waitForElement('ul.nav.pull-right span.caret', casper , function(err, isExists){
													if(isExists) {
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
						});
					}
				});
			}
		});
	});
};

//Incontext Login while Like this Topic from list of topics
inContextLoginTests.inContextLoginLikeTopicHome=function(){
	casper.thenOpen(config.url, function() {	
		casper.echo('*********************Incontext Login while Like this Topic from list of topics*****************','INFO');	
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		wait.waitForElement('i.glyphicon.glyphicon-like-alt', casper , function(err, isExists) {					
			if(isExists) {
				casper.test.assertExists('i.glyphicon.glyphicon-like-alt');
				casper.click('i.glyphicon.glyphicon-like-alt');
				inContextLoginMethod.loginToApp(json['validInfo'].username, json['validInfo'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....', 'INFO');
						wait.waitForTime(1000 , casper , function(err){
							wait.waitForElement('ul.nav.pull-right span.caret', casper , function(err, isExists){
								if(isExists) {
									inContextLoginMethod.logoutFromApp(casper, function(err){
										if (!err)
											casper.echo('Successfully logout from application', 'INFO');
									});
									
								}else {
									casper.echo('Logout toggle selector not found ul.nav.pull-right span.caret','ERROR');
								}
							});
					   	 });
					}	
				});
			}else {
				casper.echo('Like post selector not found i.glyphicon.glyphicon-like-alt','ERROR');
			}
		});
	});
};

//inContext Login from vote on post from post list 

/*inContextLoginTests.inContextLoginVoteOnpost=function(){
	casper.thenOpen(config.url, function() {	
		casper.echo('*********************inContext Login from vote on post from post list *****************','INFO');
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
	   	wait.waitForElement('form[name="posts"] a.topic-title', casper , function(err, isExists) {
			if(isExists) {
				casper.click('form[name="posts"] a.topic-title');		
				wait.waitForElement('a.dislike_post.text-muted', casper , function(err, isExists){
					if(isExists) {
						try {
							casper.click('textarea#message');
							wait.waitForTime(1000 , casper , function(err){
								wait.waitForElement('input#reply_submit.pull-left.btn.btn-uppercase.btn-primary', casper , function(err, isExists){
									if(isExists) {
										wait.waitForElement('a[href="#form-dialog"]', casper, function(err){
											casper.test.assertExists('a[href="#form-dialog"]');
											casper.click('a[href="#form-dialog"]');
											casper.echo('You have clicked on create an account and log-in link...', 'INFO');
											inContextLoginMethod.loginToApp(json['validInfo'].username, json['validInfo'].password, casper, function(err) {
												if (err) {
													casper.echo("Error occurred in callback user not logged-in", "ERROR");	
												}else {
													casper.echo('Processing to Login on forum.....', 'INFO');
													wait.waitForTime(1000 , casper, function(){	
														wait.waitForElement('ul.nav.pull-right span.caret', casper , function(err, isExists){
															if(isExists) {
															inContextLoginMethod.logoutFromApp(casper, function(err){
																	if (!err)
																		casper.echo('Successfully logout from application', 'INFO');
																	});
															}else {
																casper.echo('Logout toggle selector not found ul.nav.pull-right span.caret','ERROR');
															}		
														});
						   					 		});
												}	
											});
										});
									}else {
										casper.echo('Post button not found topics post page','ERROR');
									}
								});
							});
						}catch(e) {
							casper.test.assertDoesntExist('a#guest_user_vote');
							casper.echo('You did not find create an account and log-in link...', 'INFO');
						}
					}else {
						casper.echo('dislike post selector not found a.dislike_post.text-muted','ERROR');
					}
				});
			}
		});
	});
};*/



//inContext Login from Email button on Profile view screen of any user

inContextLoginTests.inContextLoginEmailButton=function(){
	casper.thenOpen(config.backEndUrl, function() {		
		casper.echo('***********inContext Login from Email button on Profile view screen of any user**********','INFO');
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		loginPrivacyOptionMethod.loginToForumBackEnd(casper , function(err) {
			if (!err)
				casper.echo('LoggedIn to forum backend....', 'INFO');
		});
		wait.waitForElement('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', casper , function(err, isExists) {
			if(isExists) {		
				casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
				casper.click('div#ddSettings  div a:nth-child(3)');
				wait.waitForElement('button.button.btn-m.btn-blue' , casper , function(err, isExists) {
					if(isExists) {
						utils.enableorDisableCheckbox('aEMS',true, casper, function(err) {
							if(!err)
								casper.echo('Successfully checked','INFO');
						});
						casper.click('button.button.btn-m.btn-blue');
						casper.thenOpen(config.url, function() {
							wait.waitForElement('a.default-user.username', casper , function(err, isExists) {		
								if(isExists) {
									casper.evaluate(function() {
										document.querySelector('a.default-user.username').click();
									});									
									wait.waitForElement('a#send_email', casper ,function(err , isExists) {
										if(isExists) {
											casper.evaluate(function() {
												document.querySelector('a#send_email').click();
										});
										inContextLoginMethod.loginToApp(json['validInfo'].username, json['validInfo'].password, casper, function(err) {
											if (err) {
												casper.echo("Error occurred in callback user not logged-in", "ERROR");	
											}else {
												casper.echo('Processing to Login on forum.....', 'INFO');
												wait.waitForTime(1000 , casper , function(err){
													wait.waitForElement('ul.nav.pull-right span.caret', casper , function(err, isExists){
														if(isExists) {
															inContextLoginMethod.logoutFromApp(casper, function(err){
															if (!err)
																casper.echo('Successfully logout from application', 'INFO');
});
														}
													});
						    						});
											}
										});
									}else {
										casper.echo('Email button selector not found on user profile page a#send_email','ERROR');
									}
								});
							
}
							});
						});
					}
				});
			}
		});
	});
};

//inContext Login from Topic listing page when 'View Topic Content' permission is Disabled.

inContextLoginTests.inContextLoginTopicListing=function(){
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('**********inContext Login from Topic listing page when','INFO');
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		loginPrivacyOptionMethod.loginToForumBackEnd(casper , function(err) {
			if (!err)
				casper.echo('LoggedIn to forum backend....', 'INFO');
		});	
		wait.waitForElement('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', casper , function(err, isExists) {
			if(isExists) {	
				casper.evaluate(function() {
					document.querySelector('div.tooltipMenu.text a[title="Assign permissions to user groups"]').click();
				});
				wait.waitForTime(1000 , casper , function(err) {
					casper.click('a[data-tooltip-elm="ugManage20237478"]');
					casper.click('div#ugManage20237478 a');
					wait.waitForElement('button.button.btn-m.btn-blue', casper , function(err, isExists) {
						if(isExists) {
							utils.enableorDisableCheckbox('view_thread_content',false, casper, function(err) {
								if(!err)
									casper.echo('Successfully unchecked','INFO');
							});
							casper.click('button.button.btn-m.btn-blue');
							casper.thenOpen(config.url, function() {
								wait.waitForElement('a.topic-title' , casper , function(err, isExists) {		
									if(isExists) {
										casper.click('a.topic-title');
										inContextLoginMethod.loginToApp(json['validInfo'].username, json['validInfo'].password, casper, function(err) {
											if (err) {
												casper.echo("Error occurred in callback user not logged-in", "ERROR");	
											}else {
												casper.echo('Processing to Login on forum.....', 'INFO');
												wait.waitForTime(1000 , casper , function(err){
													wait.waitForElement('ul.nav.pull-right span.caret', casper , function(err, isExists){
														if(isExists) {
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
							});
						}
					});
				});
			}
		});
	});
};

//inContext Login from the Forum Main page when 'View Forum' permission is Disabled.
inContextLoginTests.inContextLoginForumDisable=function(){
	casper.thenOpen(config.backEndUrl, function() {	
		casper.echo('**********inContext Login from the Forum Main page when view forum disable*********','INFO');
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		loginPrivacyOptionMethod.loginToForumBackEnd(casper , function(err) {
			if (!err)
				casper.echo('LoggedIn to forum backend....', 'INFO');
		});	
		wait.waitForElement('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', casper , function(err, isExists) {
			if(isExists) {	
				casper.evaluate(function() {
					document.querySelector('div.tooltipMenu.text a[title="Assign permissions to user groups"]').click();
				});
				wait.waitForTime(1000 , casper , function(err) {
					casper.click('a[data-tooltip-elm="ugManage20237478"]');
					casper.click('div#ugManage20237478 a');
					wait.waitForElement('button.button.btn-m.btn-blue', casper , function(err, isExists) {
						if(isExists) {
							utils.enableorDisableCheckbox('view_messageboard',false, casper, function(err) {
								if(!err)
									casper.echo('Successfully unchecked','INFO');
							});
							casper.click('button.button.btn-m.btn-blue');
							casper.thenOpen(config.url, function() {
								
										
										//casper.click('a.topic-title');
										casper.evaluate(function() {
											document.querySelector('a.topic-title').click();
										});

										inContextLoginMethod.loginToApp(json['validInfo'].username, json['validInfo'].password, casper, function(err) {
											if (err) {
												casper.echo("Error occurred in callback user not logged-in", "ERROR");	
											}else {
												casper.echo('Processing to Login on forum.....', 'INFO');
												wait.waitForTime(1000 , casper , function(err){
													wait.waitForElement('ul.nav.pull-right span.caret', casper , function(err, isExists){
														if(isExists) {
															inContextLoginMethod.logoutFromApp(casper, function(err){
															if (!err)
																casper.echo('Successfully logout from application', 'INFO');
});
														}
													});
						    						});
											}
										});
										
									});
								}
							});							
						});
					}
				});
			});
};



