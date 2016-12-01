/***These are the function which has been called in thumpsUpDownMethod.js and also will be used in other js file as per requirement**********/

'use strict';
var json = require('../../testdata/forgotpasswordData.json');
var config = require('../../../config/config.json');
var thumpsUpDownMethod = require('../methods/thumpsUpDown.js');
var registerMethod = require('../methods/register.js');
var forumLoginMethod = require('../methods/login.js');
var wait = require('../wait.js');
var thumpsUpDownTestcases = module.exports = {};
//var forumLogin = require('./login.js');
thumpsUpDownTestcases.errors = [];

// method to verify the thumbs up for guest user(unregister user) on post listing page
thumpsUpDownTestcases.unregisterUserOnPostListingPageLike = function() {
	casper.echo('                                      CASE 1a', 'INFO');
	casper.echo('************************************************************************************', 'INFO');
	casper.echo('*                        LIKE POST From Post Listing Page                          *', 'INFO');
	casper.echo('************************************************************************************', 'INFO');
	casper.click('form[name="posts"] a.topic-title');
	wait.waitForElement('i.glyphicon.glyphicon-like-alt', casper, function(err, isExists) {
		if(isExists) {
			casper.click('i.glyphicon.glyphicon-like-alt');
			wait.waitForElement('div#form-dialog[aria-hidden="false"]', casper, function(err, isExists) {
				if(isExists) {
					casper.test.assertExists('button#bootstrap_close_register_dialog','Close button at the Pop Up');
					casper.click('button#bootstrap_close_register_dialog');
				} else {
					casper.echo('Pop Up not found','INFO');
				}
			});
		} else {
			casper.echo('Like button not found','INFO');
		}
	});
};
// method to verify the thumbs down for guest user(unregister user) on post listing page
thumpsUpDownTestcases.unregisterUserOnPostListingPageDislike = function() {
	casper.thenOpen(config.url, function() {
		casper.echo('                                      CASE 1b', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*                        DISLIKE POST From Post Listing Page                       *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.click('form[name="posts"] a.topic-title');
		wait.waitForElement('i.glyphicon.glyphicon-dislike-alt', casper, function(err, isExists) {
			if(isExists) {
				casper.click('i.glyphicon.glyphicon-dislike-alt');
				wait.waitForElement('div#form-dialog[aria-hidden="false"]', casper, function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('button#bootstrap_close_register_dialog','Close button at the Pop Up');
						casper.click('button#bootstrap_close_register_dialog');
					} else {
						casper.echo('Pop Up not found','INFO');
					}
				});
			} else {
				casper.echo('Dislike button not found','INFO');
			}
		});
	});
};
// method to verify the thumbs up and down for guest user(unregister user) on Topic listing page"""
thumpsUpDownTestcases.unregisterUserOnTopicListingPageLike = function() {
	casper.thenOpen(config.url, function() {
		casper.echo('                                      CASE 2', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*                           LIKE POST From Topic Listing Page                       *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.test.assertExists('i.glyphicon.glyphicon-like-alt','Like button on the topic listing page');
		casper.click('i.glyphicon.glyphicon-like-alt');
		wait.waitForElement('div#form-dialog[aria-hidden="false"]', casper, function(err, isExists) {
			if(isExists) {
				casper.test.assertExists('button#bootstrap_close_register_dialog','Close button at the Pop Up');
				casper.click('button#bootstrap_close_register_dialog');
			} else {
				casper.echo('Pop Up not found','INFO');
			}
		});
	});
};

// method to verify the thumbs up and down for (register user) on Topic listing page
thumpsUpDownTestcases.registerUserOnTopicListingPageLike = function() {
	casper.thenOpen(config.url, function() {
		casper.echo('                                      CASE 3', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*                           LIKE POST From Topic Listing Page                       *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function() {
			casper.echo('Processing to Login on forum.....', 'INFO');
			wait.waitForElement('li.pull-right.user-panel', casper, function(err, isExists) {
				if(isExists) {
					casper.test.assertExists("i.glyphicon.glyphicon-like-alt", 'Thump up found on topic listing page');
					casper.mouse.move('i.glyphicon.glyphicon-like-alt');
					casper.click("i.glyphicon.glyphicon-like-alt");
					casper.wait(2000, function() {
						casper.capture('fgfgh.png');
					});
				} else {
				
				}
			});
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});	
	});
};
// method to verify the thumbs up and down for (register user) on Post listing page
thumpsUpDownTestcases.registerUserOnPostListingPageLike = function() {
	casper.thenOpen(config.url, function() {
		casper.echo('                                      CASE 4', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*                           LIKE POST From Post Listing Page                       *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.test.assertExists('a[href="/register/login"]');
		this.click('a[href="/register/login"]');
			forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function() {
				casper.echo('Processing to Login on forum.....', 'INFO');
				wait.waitForElement('i.icon.icon-menu', casper, function(err, isExists) {
					if(isExists) {
						casper.click('i.icon.icon-menu');
						casper.test.assertExists('a[href="/latest"]');
						casper.click('a[href="/latest"]');
						wait.waitForElement('form[name="posts"] a.topic-title', casper, function(err, isExists) {
							if(isExists) {
								casper.click('form[name="posts"] a.topic-title');
								
								wait.waitForElement('i.glyphicon.glyphicon-like-alt', casper, function(err, isExists) {
									casper.capture('b.png');
									if(isExists) {
										casper.click('i.glyphicon.glyphicon-like-alt');
										casper.then(function() {
											try {
												casper.test.assertExists('a.login_dialog.text-muted.voted-yes');
												casper.echo('CLICK OF THUMBS UP FROM TOPIC PAGE.....', 'INFO');
											} catch(e) {
												casper.test.assertExists('a.login_dialog.text-muted');
												casper.echo('CLICK OF THUMBS UP FROM TOPIC PAGE.....', 'INFO');
											};
										});
		
									} else {
										casper.echo('Like button not found', 'INFO');
									}
								});
							} else{
								casper.echo('Topic not found', 'INFO');
							}
						});
					} else {
						casper.echo('Menu not found', 'INFO');
					}
				});
			});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});
};
// method to verify with click on likers/dislikers username when disable view profile permission ->AS A REGISTER USER 
thumpsUpDownTestcases.clickOnLikersUsername = function() {
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                      CASE 5', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('        TO VERIFY WITH CLICK ON LIKERS/DISLIKERS USERNAME IN CASE OF REGISTERED USER', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		// method called to change the backend setting-> disable View Profile
		thumpsUpDownMethod.disableViewProfile(casper, function(err) {
			if(!err) {
				casper.echo('Disable view profile method called ','INFO');
			}
		});
	});
	
	//Open Front-End URL and verify with click on likers/dislikers username when disable view profile permission AS A REGISTER USER 
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		wait.waitForElement('a#td_tab_login',casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
					if(!err) {
						wait.waitForElement('i.icon.icon-menu', casper, function(err, isExists) {
							if(isExists) {
								casper.click('i.icon.icon-menu');
								casper.test.assertExists('a[href="/latest"]');
								casper.click('a[href="/latest"]');
								wait.waitForElement('form[name="posts"] a.topic-title', casper, function(err, isExists) {
									if(isExists) {
										casper.click('form[name="posts"] a.topic-title');
										wait.waitForElement('i.glyphicon.glyphicon-like-alt', casper, function(err, isExists) {
											if(isExists) {
												try {
													casper.test.assertExists('a.login_dialog.text-muted.voted-yes');
												}catch(e) {
													casper.click('i.glyphicon.glyphicon-like-alt');
												}
												wait.waitForElement('div.post-options.pull-right span.text-muted a',casper, function(err, isExists) {
													if(isExists) {
											
														casper.click('div.post-options.pull-right span.text-muted a');
											
														wait.waitForElement('i.who-username', casper, function(err, isExists) {
															if(isExists) {
																casper.click('i.who-username');
																wait.waitForElement('div.text-center.bmessage.alert-info.text-danger', casper, function(err, isExists) {
																	if(isExists) {
																	var message = casper.fetchText('div.text-center.bmessage.alert-info.text-danger');
																	var errorMsg = message.substring(0, message.indexOf('<'));
																	if(errorMsg && errorMsg!= '')
																		thumpsUpDownMethod.verifyErrorMsg(errorMsg, "Sorry! You don't have permission to perform this action.", 'ThumsUpDown', casper, function() {});
																	} else {
																		casper.echo('div.text-center.bmessage.alert-info.text-danger not found', 'ERROR');
																	}
																});
															} else {
																casper.echo('i.who-username not found', 'ERROR');
															}
														});
													} else {
														casper.echo('div.post-options.pull-right span.text-muted a not found', 'ERROR');
													}
												});	
											} else {
												casper.echo('i.glyphicon.glyphicon-like-alt not found', 'ERROR');
											}
										});
									} else {
										casper.echo('form[name="posts"] a.topic-title not found', 'ERROR');
									}
								});
							} else {
								casper.echo('i.icon.icon-menu not found', 'ERROR');
							}
						});
					}else {
						casper.echo('Error : '+err, 'INFO');
					}
				});
			} else {
				casper.echo('a#td_tab_login not found', 'ERROR');
			}
			casper.then(function() {
				forumLoginMethod.logoutFromApp(casper, function() { });
			});
		});
	});
};

//"method to verify When registered/moderator user click on link of own name from voter list. when disable view profile permission"
thumpsUpDownTestcases.clickOnOwnName = function() {
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                      CASE 6', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo(' TO VERIFY WITH CLICK on link of own name from voter list IN CASE OF REGISTERED USER', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +this.getTitle(), 'INFO');
		// method called to change the backend setting-> disable View Profile
		thumpsUpDownMethod.disableViewProfile(casper, function(err) {
			if(!err) {
				casper.echo('Disable view profile method called ','INFO');
			}
		});
	});
	//Open Front-End URL and verify with click on likers/dislikers username when disable view profile permission AS A REGISTER USER 
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		wait.waitForElement('a#td_tab_login',casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
					if(!err) {
						wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
							if(isExists) {
								casper.click("a.topic-title");
								wait.waitForElement('div.post-body.pull-left', casper,function(err, isExists) {
									if(isExists) {
										casper.click('div.post-options.pull-right span.text-muted a');
										casper.wait(2000, function() {
											casper.capture('bgd.png');
											var username = casper.evaluate(function() {
												var user = document.querySelectorAll('i.who-username');
												var len = user.length;
												//return len;
												for (i=0; i<=len; i++) {
													var name = user[i].innerHTML;
													var n = name.toString();
													if(n=='neha') {
														user[i].click();
														return"The user found and clicked";
													}
													
												}
											});
											casper.echo('The names of the users are- '+username,'INFO');
											casper.wait(2000, function() {
												casper.capture('fgfgh.png');
											});
										});
									} else {
							
									}
								});
							} else {
							
							}
						});
					}else {
						casper.echo('Error : '+err, 'INFO');
					}
				});
			} else {
				casper.echo('a#td_tab_login not found', 'ERROR');
			}
			casper.then(function() {
				forumLoginMethod.logoutFromApp(casper, function() { });
			});
		});
	});
};
					
//"method To verify the functionality of reputation tab which is showing in profile page-
thumpsUpDownTestcases.clickReputationTab = function() {
	casper.thenOpen(config.url, function() {
		casper.echo('                                      CASE 8', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*     verify the functionality of reputation tab which is showing in profile page- *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function() {
			casper.echo('Processing to Login on forum.....', 'INFO');
			wait.waitForElement('li.pull-right.user-panel', casper, function(err, isExists) {
				if(isExists) {
					casper.click('i.icon.icon-menu');
					wait.waitForElement('li#members_list_show a', casper, function(err, isExists) {
						if(isExists) {
							casper.click('li#members_list_show a');
							casper.wait(2000, function() {
								casper.capture('fgfgh.png');
							});
						} else {
				
						}
					});
				} else {
				
				}
			});
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});	
	});
};
