/***These are the function which has been called in thumpsUpDownMethod.js and also will be used in other js file as per requirement**********/

'use strict';
var json = require('../../testdata/forgotpasswordData.json');
var config = require('../../../config/config.json');
var thumpsUpDownMethod = require('../methods/thumpsUpDown.js');
var postEventMemberApprovalTestcases = require('../cases/postEventMemberApproval.js');
var registerMethod = require('../methods/register.js');
var forumLoginMethod = require('../methods/login.js');
var wait = require('../wait.js');
var thumpsUpDownTestcases = module.exports = {};
//var forumLogin = require('./login.js');
thumpsUpDownTestcases.errors = [];

// method to verify the thumbs up for guest user(unregister user) on post listing page
thumpsUpDownTestcases.unregisterUserOnPostListingPageLike = function() {
	// method of postEventMemberApproval called once to create a topic if the topic is not created on the forum
	postEventMemberApprovalTestcases.createTopic();
	casper.thenOpen(config.url, function() {
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
						try {
						casper.test.assertExists('a.login_dialog.text-muted.voted-yes');
						} catch (e) {
							casper.echo('Post is disliked by the user','INFO');
						}
					});
				} else {
					casper.echo('User not logged in','ERROR');
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
			forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function() {
				casper.echo('Processing to Login on forum.....', 'INFO');
				wait.waitForElement('i.icon.icon-menu', casper, function(err, isExists) {
					if(isExists) {
						casper.click('i.icon.icon-menu');
						casper.test.assertExists('li#latest_topics_show a');
						casper.click('li#latest_topics_show a');
						wait.waitForElement('form[name="posts"] a.topic-title', casper, function(err, isExists) {
							if(isExists) {
								casper.click('form[name="posts"] a.topic-title');
								
								wait.waitForElement('i.glyphicon.glyphicon-like-alt', casper, function(err, isExists) {
									if(isExists) {
										casper.click('i.glyphicon.glyphicon-like-alt');
										casper.then(function() {
											try {
												casper.test.assertExists('a.login_dialog.text-muted.voted-yes');
												casper.echo('CLICK OF THUMBS UP FROM TOPIC PAGE.....', 'INFO');
											} catch(e) {
												casper.test.assertExists('a.login_dialog.text-muted');
												casper.echo('CLICK ON THUMBS UP FROM TOPIC PAGE.....', 'INFO');
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
				forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
					if(!err) {
						wait.waitForElement('i.icon.icon-menu', casper, function(err, isExists) {
							if(isExists) {
								casper.click('i.icon.icon-menu');
								casper.test.assertExists('li#latest_topics_show a');
								casper.click('li#latest_topics_show a');
								wait.waitForElement('form[name="posts"] a.topic-title', casper, function(err, isExists) {
									if(isExists) {
										casper.click('form[name="posts"] a.topic-title');
										wait.waitForElement('i.glyphicon.glyphicon-like-alt', casper, function(err, isExists) {
											if(isExists) {
												try {
													casper.test.assertExists('a.login_dialog.text-muted.voted-yes');
												}catch(e) {
													try {
														casper.click('i.glyphicon.glyphicon-like-alt');
													} catch (e) {
														casper.echo('This is the logged in user post','INFO');
													}
												}
												casper.wait(2000, function() {
													casper.reload(function() {
														try {
															casper.test.assertExists('div.post-options.pull-right span.text-muted a');		
															casper.click('div.post-options.pull-right span.text-muted a');
															wait.waitForElement('i.who-username', casper, function(err, isExists) {
																if(isExists) {
																	casper.click('i.who-username');
																	casper.wait(2000, function() {
																		try {
																			casper.test.assertExists('div.text-center.bmessage.alert-info.text-danger');
	var message = casper.fetchText('div.text-center.bmessage.alert-info.text-danger');
	var errorMsg = message.substring(0, message.indexOf('<'));
	if(errorMsg && errorMsg!= '')
	thumpsUpDownMethod.verifyErrorMsg(errorMsg, "Sorry! You don't have permission to perform this action.", 'ThumsUpDown', casper, function() {});
																		} catch (e) {
		casper.echo("The liker name is user's logged in name so user is able to click on users name",'INFO');
	    }
		});
																} else {
																	casper.echo('i.who-username not found', 'ERROR');
																}
															});
														} catch (e) {
															casper.test.assertDoesntExist('div.post-options.pull-right span.text-muted a')	;	
														}
													});
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
			casper.then(function() {
				forumLoginMethod.logoutFromApp(casper, function() { });
			});
	});
	casper.thenOpen(config.backEndUrl, function() {
		// method called to change the backend setting-> enable View Profile
		thumpsUpDownMethod.enableViewProfile(casper, function(err) {
			if(!err) {
				casper.echo('Enable view profile method called ','INFO');
			}
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
				forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
					if(!err) {
						wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
							if(isExists) {
								casper.click("a.topic-title");
								wait.waitForElement('div.post-body.pull-left', casper,function(err, isExists) {
									if(isExists) {
										casper.click('div.post-options.pull-right span.text-muted a');
										casper.wait(2000, function() {
											var username = casper.evaluate(function() {
												var user = document.querySelectorAll('i.who-username');
												var len = user.length;
												for (i=0; i<=len; i++) {
													var name = user[i].innerHTML;
													var n = name.toString();
													if(n=='neha') {
														user[i].click();
														return"The user found and clicked";
													}
													
												}
											});
											casper.echo(username,'INFO');
										});
									} else {
										casper.echo('Post not found','ERROR');
									}
								});
							} else {
								casper.echo('User not logged in','ERROR');
							}
						});
					}else {
						casper.echo('Error : '+err, 'INFO');
					}
				});
			casper.then(function() {
				forumLoginMethod.logoutFromApp(casper, function() { });
			});
	});
	casper.thenOpen(config.backEndUrl, function() {
		// method called to change the backend setting-> enable View Profile
		thumpsUpDownMethod.enableViewProfile(casper, function(err) {
			if(!err) {
				casper.echo('enable view profile method called ','INFO');
			}
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
							wait.waitForElement('div.panel-body.table-responsive a', casper, function(err, isExists) {
								if(isExists) {
									casper.click('div.panel-body.table-responsive a');
									casper.wait(2000, function() {
										var reputationCount = casper.fetchText('li.reputation span.profile-count a');
										var reputationCount2;
										casper.echo('The value of reputation count is -'+reputationCount, 'INFO');
										try {
											casper.click('i.glyphicon.glyphicon-like-alt');
											casper.wait(1000, function() {
												casper.reload(function() {
													casper.echo('The page is reloaded','INFO');
													reputationCount2 = casper.fetchText('li.reputation span.profile-count a');
													casper.echo('The value of reputation count is -'+reputationCount2, 'INFO');
													if(reputationCount > reputationCount2) {
														casper.echo('The post is disliked and verified that reputation count is changed.','INFO');	
													}
													if(reputationCount < reputationCount2) {
														casper.echo('The post is liked and verified that reputation count is changed.','INFO');
													}
												});
											});
										} catch (e) {
											casper.echo('The clicked user not post any post yet','INFO');
										}
									});
								} else {
									casper.echo('Not clicked on a member','ERROR');
								}
							});
						} else {
							casper.echo('Member list not found','ERROR');
						}
					});
				} else {
					casper.echo('User not logged in','ERROR');
				}
			});
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});	
	});
};
//method To verify the reputation functionality of back end(disable)"
thumpsUpDownTestcases.verifyReputationTab = function() {
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                      CASE 9', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('             To verify the reputation functionality of back end(disable)           *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +this.getTitle(), 'INFO');
		// method called to change the backend setting-> disable reputation functionality
		thumpsUpDownMethod.disableReputation(casper, function(err) {
			if(!err) {
				casper.echo('Disable reputation functionality method called ','INFO');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function() {
			casper.echo('Processing to Login on forum.....', 'INFO');
			wait.waitForElement('li.pull-right.user-panel', casper, function(err, isExists) {
				if(isExists) {
					casper.click('i.icon.icon-menu');
					wait.waitForElement('li#members_list_show a', casper, function(err, isExists) {
						if(isExists) {
							casper.click('li#members_list_show a');
							wait.waitForElement('div.panel-body.table-responsive a', casper, function(err, isExists) {
								if(isExists) {
									casper.click('div.panel-body.table-responsive a');
									casper.wait(2000, function() {
										try {
											casper.test.assertDoesntExist('li.reputation span.profile-label.text-muted','Reputation not available');
										} catch (e) {
											casper.test.assertExists('li.reputation span.profile-label.text-muted','Reputation available');
										}
									});
								} else {
									casper.echo('Not clicked on a member','ERROR');
								}
							});
						} else {
							casper.echo('Member list not found','ERROR');
						}
					});
				} else {
					casper.echo('User not logged in','ERROR');
				}
			});
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});	
	});
	casper.thenOpen(config.backEndUrl, function() {
		// method called to change the backend setting-> enable Reputation
		thumpsUpDownMethod.enableReputation(casper, function(err) {
			if(!err) {
				casper.echo('Enable Reputation method called ','INFO');
			}
		});
	});
};
// Method to Verify  with the increasing  order of count
thumpsUpDownTestcases.verifyIncreasedCount = function() {
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.url, function() {
		casper.echo('                                      CASE 10', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*                         to Verify  with the increasing  order of count           *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +this.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.click("a.topic-title");
						wait.waitForElement('div.post-body.pull-left', casper,function(err, isExists) {
							if(isExists) {
								var earlierCount = casper.fetchText('div.post-options.pull-right span.text-muted a');
								casper.echo('The count of like before liked'+earlierCount,'INFO');
								var laterCount;
								try {
									casper.test.assertExists('a.login_dialog.text-muted.voted-yes','the post is already liked by the user ');
								} catch (e) {
									casper.click('i.glyphicon.glyphicon-like-alt');
									casper.wait(2000, function() {
										casper.reload(function() {
											laterCount = casper.fetchText('div.post-options.pull-right span.text-muted a');
											casper.echo('The count of like after liked'+laterCount,'INFO');
											if((earlierCount+1)==laterCount) {
												casper.echo('The count is increased by 1 after liked','INFO');
											} else {
												casper.echo('The count is not increased by 1 after liked','INFO');
											}
										});
									});
								}
							} else {
								casper.echo('Not clicked on Topic','ERROR');
							}
						});
					} else {
						casper.echo('User not logged in','ERROR');		
					}
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});
};
// Metod To verify the counter of thumbs down
thumpsUpDownTestcases.verifyDecreasedCount = function() {
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.url, function() {
		casper.echo('                                      CASE 11', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*                    to Verify  with the decreasing order of count                 *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +this.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.click("a.topic-title");
						wait.waitForElement('div.post-body.pull-left', casper,function(err, isExists) {
							if(isExists) {
								var earlierCount = casper.fetchText('div.post-options.pull-right span.text-muted a');
								casper.echo('The count of like before disliked'+earlierCount,'INFO');
								var laterCount;
								try {
									casper.test.assertExists('a.dislike_post.login_dialog.text-muted.voted-yes','the post is already disliked by the user ');
									
								} catch (e) {
									casper.test.assertDoesntExist('a.dislike_post.login_dialog.text-muted.voted-yes','the post is not disliked by the user ');
									casper.click('i.glyphicon.glyphicon-dislike-alt');
									casper.wait(2000, function() {
										casper.reload(function() {
											laterCount = casper.fetchText('div.post-options.pull-right span.text-muted a');
											casper.echo('The count of like after liked'+laterCount,'INFO');
											if((earlierCount+1)===laterCount) {
												casper.echo('The count is decreased by 1 after liked','INFO');
											} else {
												casper.echo('The count is not decreased by 1 after liked','INFO');
											}
										});
									});
								}
							} else {
								casper.echo('Not clicked on Topic','ERROR');
							}
						});
					} else {
						casper.echo('User not logged in','ERROR');	
					}
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});
};
// method To verify the counter when user click on 2 times of thumbs up link
thumpsUpDownTestcases.verifyDecreasedCount = function() {
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.url, function() {
		casper.echo('                                      CASE 12', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*            To verify the counter when user click on 2 times of thumbs up link    *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +this.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.click("a.topic-title");
						wait.waitForElement('div.post-body.pull-left', casper,function(err, isExists) {
							if(isExists) {
								var earlierCount = casper.fetchText('div.post-options.pull-right span.text-muted a');
								casper.echo('The count of like before disliked'+earlierCount,'INFO');
								var laterCount;
								try {
									casper.test.assertExists('a.dislike_post.login_dialog.text-muted.voted-yes','the post is already disliked by the user ');
									
								} catch (e) {
									casper.test.assertDoesntExist('a.dislike_post.login_dialog.text-muted.voted-yes','the post is not disliked by the user ');
									casper.click('i.glyphicon.glyphicon-dislike-alt');
									casper.wait(2000, function() {
										casper.reload(function() {
											laterCount = casper.fetchText('div.post-options.pull-right span.text-muted a');
											casper.echo('The count of like after liked'+laterCount,'INFO');
											if((earlierCount+1)===laterCount) {
												casper.echo('The count is decreased by 1 after liked','INFO');
											} else {
												casper.echo('The count is not decreased by 1 after liked','INFO');
											}
										});
									});
									casper.then(function() {
										casper.click('i.glyphicon.glyphicon-dislike-alt');
										casper.wait(2000, function() {
											casper.reload(function() {
												laterCount = casper.fetchText('div.post-options.pull-right span.text-muted a');
												casper.echo('The count of like after second time clicked on disliked'+laterCount,'INFO');
												if((earlierCount)===(laterCount+1)) {
													casper.echo('The count is increased by 1 after liked','INFO');
												} else {
													casper.echo('The count is not increased by 1 after liked','INFO');
												}
											});
										});
									});
								}
							} else {
								casper.echo('Not clicked on Topic','ERROR');
							}
						});
					} else {
						casper.echo('User not logged in','ERROR');	
					}
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});
};
// Method To verify the colour of like/dislike link
thumpsUpDownTestcases.verifyColour = function() {
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.url, function() {
		casper.echo('                                      CASE 13', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*                       To verify the colour of like/dislike link                  *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +this.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.click("a.topic-title");
						wait.waitForElement('div.post-body.pull-left', casper,function(err, isExists) {
							if(isExists) {
								try {
									casper.test.assertExists('a.login_dialog.text-muted.voted-yes','the post is already liked by the user ');
									var colour = casper.evaluate(function() {
										//var color = document.querySelector('.post-options a.text-muted.voted-yes').style.color;
										var color = document.querySelector('a#post_vote_up_34222956').getAttribute('color');
										return color;
									});
									casper.echo('The color of the like thump after clicked'+colour,'INFO');
								} catch (e) {
									casper.test.assertDoesntExist('a.login_dialog.text-muted.voted-yes','the post is not liked by the user ');
									casper.click('i.glyphicon.glyphicon-like-alt');
									casper.wait(2000, function() {
										var colour = casper.evaluate(function() {
											var color = document.querySelector('.post-options a.text-muted.voted-yes').style.color;
											return color;
										});
										casper.echo('The color of the like thump after clicked'+colour, 'INFO');
									});
								}
							} else {
								casper.echo('Not clicked on Topic','ERROR');
							}
						});
					} else {
						casper.echo('User not logged in','ERROR');	
					}
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});
};
// "Method To verify the functionality of reputation on profile page"
thumpsUpDownTestcases.verifyReputationOnProfilePage = function() {
	casper.thenOpen(config.url, function() {
		casper.echo('                                      CASE 14', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*                To verify the functionality of reputation on profile page-        *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function() {
			casper.echo('Processing to Login on forum.....', 'INFO');
			wait.waitForElement('li.pull-right.user-panel', casper, function(err, isExists) {
				if(isExists) {
					casper.click('ul.nav.pull-right span.caret');
					casper.test.assertExists('a#user-nav-panel-profile');
					casper.click('a#user-nav-panel-profile');
					casper.wait(2000, function() {
						var reputationCount = casper.fetchText('li.reputation span.profile-count a');
						var reputationCount2;
						casper.echo('The value of reputation count is -'+reputationCount, 'INFO');
						try {
							casper.test.assertExists('i.glyphicon.glyphicon-chevron-down');
							casper.click('i.glyphicon.glyphicon-chevron-down');
							casper.test.assertExists('i.glyphicon.glyphicon-trash.text-muted.pull-right');
							casper.click('i.glyphicon.glyphicon-trash.text-muted.pull-right');
							casper.wait(1000, function() {
								casper.reload(function() {
									casper.echo('The page is reloaded','INFO');
									reputationCount2 = casper.fetchText('li.reputation span.profile-count a');
									casper.echo('The value of reputation count is -'+reputationCount2, 'INFO');
									if(reputationCount > reputationCount2) {
										casper.echo('The post is deleted and count is not added in reputation.','INFO');	
										}
									if(reputationCount < reputationCount2) {
										casper.echo('The post is deleted and count is added in reputation.','INFO');
									}
								});
							});
						} catch (e) {
							casper.echo('No post is available to delete','INFO');
						}
					});
				} else {
					casper.echo('User not logged in','ERROR');
				}
			});
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});	
	});
};
//Method To verify the user account off case
thumpsUpDownTestcases.verifyUserAccountOffCase = function() {
	//Open Back-End URL And Get Title and logout if logged in Method to disable User Account from back end
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                      CASE 15', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*                       To verify the user account off case                        *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +this.getTitle(), 'INFO');
		thumpsUpDownMethod.disableUserAccount(casper, function(err) {
			if(!err) {
				casper.echo('Disable User Account method called ','INFO');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		casper.echo('Title of the page :' +this.getTitle(), 'INFO');
		casper.click("a.topic-title");
		wait.waitForElement('div.post-body.pull-left', casper,function(err, isExists) {
			if(isExists) {
				try {
					casper.test.assertDoesntExist('i.glyphicon.glyphicon-like-alt','Like thump not found hence verified');
					casper.test.assertDoesntExist('i.glyphicon.glyphicon-dislike-alt','Like thump not found hence verified');
				} catch (e) {
					casper.test.assertExists('i.glyphicon.glyphicon-like-alt','Like thump found hence verified');
					casper.test.assertExists('i.glyphicon.glyphicon-dislike-alt','Like thump found hence verified');
				}
			} else {
				casper.echo('Not clicked on Topic','ERROR');			
			}
		});
	});
	casper.thenOpen(config.backEndUrl, function() {
		thumpsUpDownMethod.enableUserAccount(casper, function(err) {
			if(!err) {
				casper.echo('Enable User Account method called ','INFO');
			}
		});
	});
};
// Method To verify user reputation
thumpsUpDownTestcases.verifyReputation = function() {
	casper.thenOpen(config.url, function() {
		casper.echo('                                      CASE 18', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*                To verify the functionality of reputation on profile page-        *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +this.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function() {
			casper.echo('Processing to Login on forum.....', 'INFO');
			wait.waitForElement('li.pull-right.user-panel', casper, function(err, isExists) {
				if(isExists) {
					casper.click('a.pull-right.btn.btn-uppercase.btn-primary ');
					wait.waitForElement('div.post-body.pull-left', casper,function(err, isExists) {
						if(isExists) {
							thumpsUpDownMethod.postTopicpage(json.newTopic, casper, function(err) {
								if(!err) {
									casper.echo('new topic created', 'INFO');
								}else {
									casper.echo('Error : '+err, 'INFO');
								}
							});
								
						} else {
							casper.echo('Start New Topic button not found','ERROR');
						}
					});
				} else {
					casper.echo('User not logged in','ERROR');
				}
			});
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});	
	});
	casper.thenOpen(config.url, function() {
		forumLoginMethod.loginToApp("hsk", "hsk", casper, function() {
			casper.echo('Processing to Login on forum.....', 'INFO');
			wait.waitForElement('li.pull-right.user-panel', casper, function(err, isExists) {
				if(isExists) {
					casper.click('ul.nav.pull-right span.caret');
					casper.test.assertExists('a#user-nav-panel-profile');
					casper.click('a#user-nav-panel-profile');
					casper.wait(2000, function() {
						var reputationCount = casper.fetchText('li.reputation span.profile-count a');
						var reputationCount2;
						casper.echo('The value of reputation count is -'+reputationCount, 'INFO');
						try {  //changed
							casper.test.assertExists('i.glyphicon.glyphicon-like-alt');
							casper.click('i.glyphicon.glyphicon-like-alt');
							casper.wait(1000, function() {
								casper.reload(function() {
									casper.echo('The page is reloaded','INFO');
									reputationCount2 = casper.fetchText('li.reputation span.profile-count a');
									casper.echo('The value of reputation count is -'+reputationCount2, 'INFO');
									if(reputationCount > reputationCount2) {
										casper.echo('The post is deleted and count is not added in reputation.','INFO');	
									}
									if(reputationCount < reputationCount2) {
										casper.echo('The post is deleted and count is added in reputation.','INFO');
									}
								});
							});
						} catch (e) { //changed
						
						}
					});
				} else {
					casper.echo('User not logged in','ERROR');
				}
			});
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});	
	});
};
// Method To verify the like/unlike icon in guest user 
thumpsUpDownTestcases.verifyLikeInGuestUser = function() {
	casper.thenOpen(config.url, function() {
		casper.echo('                                      CASE 20', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*                       To verify the like/unlike icon in guest user               *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +this.getTitle(), 'INFO');
		casper.click("a.topic-title");
		wait.waitForElement('div.post-body.pull-left', casper,function(err, isExists) {
			if(isExists) {
				try {
					casper.test.assertDoesntExist('i.glyphicon.glyphicon-like-alt','Like thump not found hence verified');
					casper.test.assertDoesntExist('i.glyphicon.glyphicon-dislike-alt','Like thump not found hence verified');
				} catch (e) {
					casper.test.assertExists('i.glyphicon.glyphicon-like-alt','Like thump found hence verified');
					casper.test.assertExists('i.glyphicon.glyphicon-dislike-alt','Like thump found hence verified');
				}
			} else {
				casper.echo('Not clicked on Topic','ERROR');			
			}
		});
	});
};
// Method verify with log in pop up
thumpsUpDownTestcases.verifyLogInPopUp = function() {
	casper.thenOpen(config.url, function() {
		casper.echo('                                      CASE 21', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*                         To verify  with log in pop up                            *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +this.getTitle(), 'INFO');
		casper.click("a.topic-title");
		wait.waitForElement('div.post-body.pull-left', casper,function(err, isExists) {
			if(isExists) {
				casper.test.assertExists('i.glyphicon.glyphicon-like-alt','Like thump find hence verified');
				casper.test.assertExists('i.glyphicon.glyphicon-dislike-alt','Dislike thump find hence verified');
				casper.click('i.glyphicon.glyphicon-like-alt');
				wait.waitForElement('div#form-dialog', casper,function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('span#user-login-modal-heading','Login pop up window found hence verified');
					} else {
						casper.echo('Login Popup not appeared','ERROR');	
					}
				});
			} else {
				casper.echo('Not clicked on Topic','ERROR');			
			}
		});
	});
};

// Method To verify the login button 
thumpsUpDownTestcases.verifyLoginButton = function() {
	casper.thenOpen(config.url, function() {
		casper.echo('                                      CASE 22', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*                            To verify  the login button                           *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +this.getTitle(), 'INFO');
		casper.click("a.topic-title");
		wait.waitForElement('div.post-body.pull-left', casper,function(err, isExists) {
			if(isExists) {
				casper.test.assertExists('i.glyphicon.glyphicon-like-alt','Like thump find hence verified');
				casper.test.assertExists('i.glyphicon.glyphicon-dislike-alt','Dislike thump find hence verified');
				casper.click('i.glyphicon.glyphicon-like-alt');
				wait.waitForElement('div#form-dialog', casper,function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('span#user-login-modal-heading','Login pop up window found hence verified');
						forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
								if(!err) {
									casper.echo('Logged in verified','INFO');
								}else {
									casper.echo('Error : '+err, 'INFO');
								}
							});
					} else {
						casper.echo('Login Popup not appeared','ERROR');	
					}
				});
			} else {
				casper.echo('Not clicked on Topic','ERROR');			
			}
		});
	});
};

// Method To verify the forget pass word link of pop up window
thumpsUpDownTestcases.verifyForgotPasswordLink = function() {
	casper.thenOpen(config.url, function() {
		casper.echo('                                      CASE 25', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*                 To verify  the forget pass word link of pop up window            *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +this.getTitle(), 'INFO');
		casper.click("a.topic-title");
		wait.waitForElement('div.post-body.pull-left', casper,function(err, isExists) {
			if(isExists) {
				casper.test.assertExists('i.glyphicon.glyphicon-like-alt','Like thump find hence verified');
				casper.click('i.glyphicon.glyphicon-like-alt');
				wait.waitForElement('div#form-dialog', casper,function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('div.pull-right a#anchor_tab_forget_password');
						casper.click('div.pull-right a#anchor_tab_forget_password');
						wait.waitForElement('div.panel-body.table-responsive', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('div.panel-body.table-responsive form.form-horizontal','Forgot password link redirected');
						
							} else {
								casper.echo('Not clicked on Forgot password link','ERROR');
							}
						});
					} else {
						casper.echo('Popup not appeared','ERROR');	
					}
				});
			} else {
				casper.echo('Not clicked on Topic','ERROR');			
			}
		});
	});
};
// Method "to verify create account link on pop up window when new registration is disable"
thumpsUpDownTestcases.verifyCreateAccountInPopUp = function() {
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                      CASE 26', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('* To verify  create account link on pop up window when new registration is disable *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +this.getTitle(), 'INFO');
		//Method to disable New Registration from back end
		thumpsUpDownMethod.disableNewRegistration(casper, function(err) {
			if(!err) {
				casper.echo('Disable New Registration functionality method called ','INFO');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		casper.echo('Title of the page :' +this.getTitle(), 'INFO');
		casper.click("a.topic-title");
		wait.waitForElement('div.post-body.pull-left', casper,function(err, isExists) {
			if(isExists) {
				casper.test.assertExists('i.glyphicon.glyphicon-like-alt','Like thump find hence verified');
				casper.click('i.glyphicon.glyphicon-like-alt');
				wait.waitForElement('div.modal-dialog', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('Create account not found hence verified','INFO');
					} else {
						casper.echo('Popup not appeared','ERROR');	
					}
				});
			} else {
				casper.echo('Not clicked on Topic','ERROR');			
			}
		});
	});
	casper.thenOpen(config.backEndUrl, function() {
		//Method to enable New Registration from back end
		thumpsUpDownMethod.enableNewRegistration(casper, function(err) {
			if(!err) {
				casper.echo('Enable New Registration method called ','INFO');
			}
		});
	});
};

// Method To verify reputaion count of fb user
thumpsUpDownTestcases.reputationCountFbUser = function() {
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('                                      CASE 27', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*                        To verify reputaion count of fb user                      *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +this.getTitle(), 'INFO');
		//Method to enable Facebook login from back end
		thumpsUpDownMethod.enableFacebookLogin(casper, function(err) {
			if(!err) {
				casper.echo('enable Facebook login functionality method called ','INFO');
			}
		});
		// method called to change the backend setting-> enable Reputation
		casper.then(function() {
			thumpsUpDownMethod.enableReputation(casper, function(err) {
				if(!err) {
					casper.echo('Enable Reputation method called ','INFO');
				}
			});
		});
	});
	casper.thenOpen(config.url, function() {
		casper.echo('Title of the page :' +this.getTitle(), 'INFO');
		casper.test.assertExists('a#td_tab_login');
		casper.click('a#td_tab_login');
		casper.test.assertExists('div.modal-footer a#fb_login em','Facebook Login Button Found On login Page Of FrontEndUrl');
		casper.click('div.modal-footer a#fb_login em');
		casper.waitForPopup(/facebook/, function(popup) {
		});
		casper.withPopup(/facebook/ , function() {
			casper.waitForSelector('form#login_form', function success(){
				casper.test.assertExists('form#login_form','Form Found');
				casper.fill('form#login_form',{
					'email': "neha2top@gmail.com",
					'pass': "vishal@kvs"
				}, false);
						
				casper.test.assertExists('form[id="login_form"] input[id="u_0_2"]');
				casper.click('form[id="login_form"] input[id="u_0_2"]');
			},function fail(){
				casper.echo('Facebook Form Not Found','ERROR');
			});			
		});
		wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
			if(isExists) {
				casper.click('a.pull-right.btn.btn-uppercase.btn-primary ');
				wait.waitForElement('div.post-body.pull-left', casper,function(err, isExists) {
					if(isExists) {
						thumpsUpDownMethod.postTopicpage(json.newTopic, casper, function(err) {
							if(!err) {
								casper.echo('new topic created', 'INFO');
							}else {
								casper.echo('Error : '+err, 'INFO');
							}
						});		
					} else {
						casper.echo('Start New Topic not found','ERROR');	
					}
				});
			} else {
				casper.echo('User not logged in','ERROR');				
			}
		});
		// code to logout for facebook user
		casper.then(function() {
			try {
				casper.test.assertExists('ul.nav.pull-right span.caret','Toggle button Found');
				casper.click('ul.nav.pull-right span.caret');
				try {
					casper.test.assertExists('a#logout');			
					casper.click('a#logout');
					casper.waitForSelector('a#td_tab_login', function() {
						casper.test.assertExists('a#td_tab_login');
					});			
				}catch(e) {
					casper.test.assertDoesntExist('a#logout');
				}
			} catch(e) {
				casper.test.assertDoesntExist('ul.nav.pull-right span.caret','Toggle button not Found');
			}
		});        
	});
	casper.thenOpen(config.url, function() {
		forumLoginMethod.loginToApp("hsk", "hsk", casper, function() {
			casper.echo('Processing to Login on forum.....', 'INFO');
			wait.waitForElement('li.pull-right.user-panel', casper, function(err, isExists) {
				if(isExists) {
					casper.click("a.topic-title");
					wait.waitForElement('div.post-body.pull-left', casper,function(err, isExists) {
						if(isExists) {
							casper.test.assertExists('i.glyphicon.glyphicon-like-alt','Like thump found');
							casper.click('i.glyphicon.glyphicon-like-alt');
							casper.wait(2000, function() {
								casper.reload(function() {
									casper.click('div.post-body.pull-left span.post-body-author a');
									casper.wait(2000, function() {
										var reputationCount = casper.fetchText('li.reputation span.profile-count a');
										var reputationCount2;
										casper.echo('The value of reputation count is -'+reputationCount, 'INFO');
										casper.test.assertExists('i.glyphicon.glyphicon-like-alt');
										casper.click('i.glyphicon.glyphicon-like-alt');
										casper.wait(1000, function() {
											casper.reload(function() {
												casper.echo('The page is reloaded','INFO');
												reputationCount2 = casper.fetchText('li.reputation span.profile-count a');
												casper.echo('The value of reputation count is -'+reputationCount2, 'INFO');
												if(reputationCount > reputationCount2) {
													casper.echo('The post is deleted and count is not added in reputation.','INFO');	
												}
												if(reputationCount < reputationCount2) {
													casper.echo('The post is deleted and count is added in reputation.','INFO');
												}
											});
										});
									});
								});
							});
						} else {
							casper.echo('TOpic not found','ERROR');
						}
					});
				} else {
					casper.echo('User not logged in','ERROR');
				}
			});
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		}); 	
	});
	//Method to disable Facebook login from back end
	casper.thenOpen(config.backEndUrl, function() {
		thumpsUpDownMethod.disableFacebookLogin(casper, function(err) {
			if(!err) {
				casper.echo('Disable Facebook login functionality method called ','INFO');
			}
		});
	});	
};

// Method To verify likers/dislikers list 
thumpsUpDownTestcases.verifyLikersList = function() {
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.url, function() {
		casper.echo('                                      CASE 28', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*                          To verify likers/dislikers list                         *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +this.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.click("a.topic-title");
						wait.waitForElement('div.post-body.pull-left', casper,function(err, isExists) {
							if(isExists) {
									casper.click('i.glyphicon.glyphicon-like-alt');
									casper.wait(2000,function() {
										casper.reload(function() {
											try {
												casper.click('a[id^=total_vote_up_count_]');
												casper.wait(2000, function() {
													try {
														casper.test.assertExists('ul#who-all','List of users found');
													} catch (e) {
														casper.test.assertDoesntExist('ul#who-all','List of users found');
													}
												});
											} catch (e) {
												casper.echo('The like count is 0 so not clicked','INFO');
											}
										});
									});
							} else {
								casper.echo('Not clicked on Topic','ERROR');
							}
						});
					} else {
						casper.echo('User not logged in','ERROR');	
					}
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});
};

// Method To verify like list of fb user
thumpsUpDownTestcases.verifyFbUserLikersList = function() {
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                      CASE 29', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*                          To verify like list of fb user                          *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +this.getTitle(), 'INFO');
		//Method to Enable Facebook login from back end
		thumpsUpDownMethod.enableFacebookLogin(casper, function(err) {
			if(!err) {
				casper.echo('Enable Facebook login functionality method called ','INFO');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		casper.echo('Title of the page :' +this.getTitle(), 'INFO');
		casper.test.assertExists('a#td_tab_login');
		casper.click('a#td_tab_login');
		casper.test.assertExists('div.modal-footer a#fb_login em','Facebook Login Button Found On login Page Of FrontEndUrl');
		casper.click('div.modal-footer a#fb_login em');
		casper.waitForPopup(/facebook/, function(popup) {
		});
		casper.withPopup(/facebook/ , function() {
			casper.waitForSelector('form#login_form', function success(){
				casper.test.assertExists('form#login_form','Form Found');
				casper.fill('form#login_form',{
					'email': "neha2top@gmail.com",
					'pass': "vishal@kvs"
				}, false);
				casper.test.assertExists('form[id="login_form"] input[id="u_0_2"]');
				casper.click('form[id="login_form"] input[id="u_0_2"]');
			},function fail(){
				casper.echo('Facebook Form Not Found','ERROR');
			});			
		});
		wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
			if(isExists) {
				casper.click("a.topic-title");
				wait.waitForElement('div.post-body.pull-left', casper,function(err, isExists) {
					if(isExists) {
						casper.click('a[id^=total_vote_up_count_]');
						casper.wait(5000, function() {
							casper.test.assertExists('ul#who-all','List of users found');
						});
					} else {
						casper.echo('Not clicked on Topic','ERROR');	
					}
				});
			} else {
				casper.echo('User not logged in','ERROR');			
			}
		});
		// code to logout for facebook user
		casper.then(function() {
			casper.test.assertExists('ul.nav.pull-right span.caret','Toggle button Found');
			casper.click('ul.nav.pull-right span.caret');
			try {
				casper.test.assertExists('a#logout');			
				casper.click('a#logout');
				casper.waitForSelector('a#td_tab_login', function() {
					casper.test.assertExists('a#td_tab_login');
				});			
			}catch(e) {
				casper.test.assertDoesntExist('a#logout');
			}
		});
	});
	//Method to disable Facebook login from back end
	casper.thenOpen(config.backEndUrl, function() {
		thumpsUpDownMethod.disableFacebookLogin(casper, function(err) {
			if(!err) {
				casper.echo('Disable Facebook login functionality method called ','INFO');
			}
		});
	});
};

//verify combine all forum.
thumpsUpDownTestcases.verifyCombineAllForum = function() {
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                      CASE 30', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*                           To verify combine all forum                            *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +this.getTitle(), 'INFO');
		// method called to change the backend content-> category
	});
	//Open front end
	casper.thenOpen(config.url, function() {
		casper.echo('Title of the page :' +this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('i.glyphicon.glyphicon-like-alt','Like thump find hence verified');
						casper.click('i.glyphicon.glyphicon-like-alt');
					} else {
						casper.echo('User not logged in','ERROR');	
					}
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});
	casper.thenOpen(config.backEndUrl, function() {
		// method called to change the backend content-> category
	});
};
// Method To verify reputaion link on profile page when reputation is off for fb user
thumpsUpDownTestcases.verifyReputationOnFbUser = function() {
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                      CASE 31', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*   To verify reputaion link on profile page when reputation is off for fb user    *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +this.getTitle(), 'INFO');
		// method called to change the backend setting-> disable reputation functionality
		thumpsUpDownMethod.disableReputation(casper, function(err) {
			if(!err) {
				casper.echo('Disable reputation functionality method called ','INFO');
			}
		});
		//Method to enable Facebook login from back end
		casper.then(function() {
			thumpsUpDownMethod.enableFacebookLogin(casper, function(err) {
				if(!err) {
					casper.echo('enable Facebook login functionality method called ','INFO');
				}
			});
		});
	});
	//Open front and logged in from fb user
	casper.thenOpen(config.url, function() {
		casper.echo('Title of the page :' +this.getTitle(), 'INFO');
		casper.test.assertExists('a#td_tab_login');
		casper.click('a#td_tab_login');
		casper.test.assertExists('a#fb_login em','Facebook Login Button Found On login Page Of FrontEndUrl');
		casper.click('a#fb_login em');
		casper.waitForPopup(/facebook/, function(popup) {
		});
		casper.withPopup(/facebook/ , function() {
			casper.waitForSelector('form#login_form', function success(){
				casper.test.assertExists('form#login_form','Form Found');
				casper.fill('form#login_form',{
					'email': "neha2top@gmail.com",
					'pass': "vishal@kvs"
				}, false);
						
				casper.test.assertExists('form[id="login_form"] input[id="u_0_2"]');
				casper.click('form[id="login_form"] input[id="u_0_2"]');
			},function fail(){
				casper.echo('Facebook Form Not Found','ERROR');
			});			
		});
		wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
			if(isExists) {
				casper.click('ul.nav.pull-right span.caret');
				casper.test.assertExists('a#user-nav-panel-profile');
				casper.click('a#user-nav-panel-profile');
				casper.wait(2000, function() {
					try {
						casper.test.assertDoesntExist('li.reputation span.profile-label.text-muted','Reputation not available');
					} catch (e) {
						casper.test.assertExists('li.reputation span.profile-label.text-muted','Reputation available');
					}
				});
			} else {
				casper.echo('User not logged in','ERROR');
			}
		});
		// code to logout for facebook user
		casper.then(function() {
			casper.test.assertExists('ul.nav.pull-right span.caret','Toggle button Found');
			casper.click('ul.nav.pull-right span.caret');
			try {
				casper.test.assertExists('a#logout');			
				casper.click('a#logout');
				casper.waitForSelector('a#td_tab_login', function() {
					casper.test.assertExists('a#td_tab_login');
				});			
			}catch(e) {
				casper.test.assertDoesntExist('a#logout');
			}
		});		
	});
	casper.thenOpen(config.backEndUrl, function() {
		// method called to change the backend setting-> enable Reputation
		thumpsUpDownMethod.enableReputation(casper, function(err) {
			if(!err) {
				casper.echo('Enable Reputation method called ','INFO');
			}
		});
		//Method to disable Facebook login from back end
		casper.then(function() {
			thumpsUpDownMethod.disableFacebookLogin(casper, function(err) {
				if(!err) {
					casper.echo('Disable Facebook login functionality method called ','INFO');
				}
			});
		});
	});
};
// Method To verify reputaion link on profile page when reputation is on for fb user
thumpsUpDownTestcases.verifyReputationOnFbUserWhenOn = function() {
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                      CASE 32', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*   To verify reputaion link on profile page when reputation is on for fb user    *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +this.getTitle(), 'INFO');
		// method called to change the backend setting-> Enable reputation functionality
		thumpsUpDownMethod.enableReputation(casper, function(err) {
			if(!err) {
				casper.echo('Enable reputation functionality method called ','INFO');
			}
		});
		//Method to enable Facebook login from back end
		casper.then(function() {
			thumpsUpDownMethod.enableFacebookLogin(casper, function(err) {
				if(!err) {
					casper.echo('enable Facebook login functionality method called ','INFO');
				}
			});
		});
	});
	//Open front and logged in from fb user
	casper.thenOpen(config.url, function() {
		casper.echo('Title of the page :' +this.getTitle(), 'INFO');
		casper.test.assertExists('a#td_tab_login');
		casper.click('a#td_tab_login');
		casper.test.assertExists('a#fb_login em','Facebook Login Button Found On login Page Of FrontEndUrl');
		casper.click('a#fb_login em');
		casper.waitForPopup(/facebook/, function(popup) {
		});
		casper.withPopup(/facebook/ , function() {
			casper.waitForSelector('form#login_form', function success(){
				casper.test.assertExists('form#login_form','Form Found');
				casper.fill('form#login_form',{
					'email': "neha2top@gmail.com",
					'pass': "vishal@kvs"
				}, false);
						
				casper.test.assertExists('form[id="login_form"] input[id="u_0_2"]');
				casper.click('form[id="login_form"] input[id="u_0_2"]');
			},function fail(){
				casper.echo('Facebook Form Not Found','ERROR');
			});			
		});
		wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
			if(isExists) {
				casper.click('ul.nav.pull-right span.caret');
				casper.test.assertExists('a#user-nav-panel-profile');
				casper.click('a#user-nav-panel-profile');
				casper.wait(2000, function() {
					try {
						casper.test.assertDoesntExist('li.reputation span.profile-label.text-muted','Reputation not available');
					} catch (e) {
						casper.test.assertExists('li.reputation span.profile-label.text-muted','Reputation available');
					}
				});
			} else {
				casper.echo('User not logged in','ERROR');
			}
		});
		// code to logout for facebook user
		casper.then(function() {
			casper.test.assertExists('ul.nav.pull-right span.caret','Toggle button Found');
			casper.click('ul.nav.pull-right span.caret');
			try {
				casper.test.assertExists('a#logout');			
				casper.click('a#logout');
				casper.waitForSelector('a#td_tab_login', function() {
					casper.test.assertExists('a#td_tab_login');
				});			
			}catch(e) {
				casper.test.assertDoesntExist('a#logout');
			}
		});
	});
	//Method to disable Facebook login from back end
	casper.thenOpen(config.backEndUrl, function() {
		thumpsUpDownMethod.disableFacebookLogin(casper, function(err) {
			if(!err) {
				casper.echo('Disable Facebook login functionality method called ','INFO');
			}
		});
	});
};
