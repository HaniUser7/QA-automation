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
						//casper.capture('h.png');
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
											casper.click('div#topics a.pull-right.btn.btn-uppercase.btn-primary ');
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
							wait.waitForElement('a#first_post_vote_34222956', casper , function(err, isExists) {
								if(isExists) {	
									casper.click('a#first_post_vote_34222956');
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

inContextLoginTests.inContextLoginVoteOnpost=function(){
	casper.thenOpen(config.backEndUrl, function() {	
		casper.echo('*********************inContext Login from vote on post from post list *****************','INFO');
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		loginPrivacyOptionMethod.loginToForumBackEnd(casper , function(err) {
			if (!err)
				casper.echo('LoggedIn to forum backend....', 'INFO');
		});
		wait.waitForElement('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]' , casper , function(err , isExists) {
			if(isExists) {
				casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
				casper.evaluate(function() {
					document.querySelector('div#ddSettings  div a:nth-child(2)').click();
				});
				wait.waitForElement('form#frmForumSettings' ,casper ,function(err , isExists) {
					if(isExists) {
						casper.fill('form#frmForumSettings',{
							'enable_polls' : '1'
						}, true);
						casper.click('button.button.btn-m.btn-blue');
					}
				});
				casper.thenOpen(config.url ,function() {
					wait.waitForElement('form[name="posts"] a#topic_8897360', casper , function(err, isExists) {
						if(isExists)	{

							
							casper.evaluate(function() {
								document.querySelector('form[name="posts"] a#topic_8897360').click();
							});							

							wait.waitForElement('a#guest_user_vote' , casper , function(err , isExists) {
								if(isExists) {
									casper.evaluate(function() {
										document.querySelector('a#guest_user_vote').click();
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
													}else {
														casper.echo('Logout toggle selector not found ul.nav.pull-right span.caret','ERROR');
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
			}
		});
	});
};


//inContext Login from Email button on Profile view screen of any user
//topic id require in this testcase.
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
									casper.click('a[href="/profile/24525818"]');

									/*casper.wait(1000,function(){
										casper.capture('dddf.png');									

									});*/
								
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

inContextLoginTests.inContextLoginViewTopicContent=function(){
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

//Incontext login from Start New Topic button when its permission is OFF.

inContextLoginTests.inContextLoginLikeStartPermissionOff=function(){
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
																				wait.waitForElement('ul.nav.pull-right span.caret',casper ,function(err ,isExists){
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

//inContext Login when 'Post Event' permission is Disabled.

inContextLoginTests.inContextLoginPostEvent=function(){
	casper.thenOpen(config.backEndUrl , function() {	
		casper.echo('*********inContext Login when Post Event permission is Disabled **********','INFO');
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
							utils.enableorDisableCheckbox('view_calendar',true, casper, function(err) {
								if(!err)
									casper.echo('Successfully checked','INFO');
							});
							utils.enableorDisableCheckbox('post_events',false, casper, function(err) {
								if(!err)
									casper.echo('Successfully PostEvent  unchecked','INFO');
							});
							
							casper.click('button.button.btn-m.btn-blue');
							casper.thenOpen(config.url , function() {
								wait.waitForElement('i.icon.icon-menu' , casper , function(err , isExists) {
									if(isExists) {
										casper.click('i.icon.icon-menu');
										casper.evaluate(function() {
											document.querySelector('ul#calendars_toggle_link li a').click();
										});
										wait.waitForElement('a.btn.btn-sm.btn-primary i' , casper ,function(err , isExists) {
											if(isExists) {

												casper.click('i.glyphicon.glyphicon-plus');
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
//check required on live
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
							utils.enableorDisableCheckbox('other_post_replies',false, casper, function(err) {
								if(!err)
									casper.echo('Successfully unchecked','INFO');
							});
							casper.click('button.button.btn-m.btn-blue');
							casper.thenOpen(config.url, function() {
								wait.waitForElement('form[name="posts"] a#topic_8849273', casper , function(err, isExists) {
									if(isExists) {	
										casper.evaluate(function() {
											document.querySelector('a#topic_8849273').click();
										});

										wait.waitForElement('a#reply_with_quote_34220345', casper , function(err, isExists){	
											if(isExists) {
												casper.evaluate(function() {
													document.querySelector('a#reply_with_quote_34220345').click();
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
							wait.waitForElement('a#topic_8913666', casper , function(err, isExists) {
								if(isExists) {
									casper.click('a#topic_8913666');	
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

//inContext Login  when 'View Profile' permission is Disabled.

inContextLoginTests.inContextLoginViewProfileDisable=function(){
	casper.thenOpen(config.backEndUrl, function() {	
		casper.echo('*********inContext Login  when View Profile permission is Disabled.**********','INFO');
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
							utils.enableorDisableCheckbox('view_profiles',false, casper, function(err) {
								if(!err)
									casper.echo('Successfully unchecked','INFO');
							});
							casper.click('button.button.btn-m.btn-blue');
							casper.thenOpen(config.url , function () {
								wait.waitForElement('a[data-placement="bottom"]:nth-child(1)' , casper , function(err , isExists) {
									if(isExists) {

										casper.evaluate(function() {
											document.querySelector('a[data-placement="bottom"]:nth-child(1)').click();
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

//calendar id is required
//inContext Login when 'View Calendar' permission is Disabled.

inContextLoginTests.inContextLoginViewCalendarDisable=function(){
	casper.thenOpen(config.backEndUrl , function() {	
		casper.echo('*********inContext Login when View Calendar permission is Disabled..**********','INFO');
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
							utils.enableorDisableCheckbox('view_calendar',false, casper, function(err) {
								if(!err)
									casper.echo('Successfully unchecked','INFO');
							});
							casper.click('button.button.btn-m.btn-blue');
							casper.thenOpen(config.url , function() {
								wait.waitForElement('i.icon.icon-menu' , casper , function(err , isExists) {
									if(isExists) {
										casper.click('i.icon.icon-menu');
										casper.evaluate(function() {
											document.querySelector('ul#calendars_toggle_link li a').click();
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
















