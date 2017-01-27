/***These are the function which has been called in thumpsUpDown.js and also will be used in other js file as per requirement**********/

'use strict';
var registerMethod = require('./register.js');
var utils = require('./utils.js');
var wait = require('../wait.js');
var json = require('../../testdata/postEventMemberApproval.json');
var forumLoginMethod = require('../methods/login.js');
var backEndForumRegisterMethod = require('./backEndRegistration.js');
var postEventMemberApprovalMethod = module.exports = {};
var currentUrl;
var topic;
var postId;
var eventId;
var memberId;
//*************************************************PRIVATE METHODS***********************************************

//method to set the user permission to Administration 
postEventMemberApprovalMethod.setAdmin = function(driver, test, callback) {
	registerMethod.loginToForumBackEnd(casper, function(err) {
		if(!err) {
			wait.waitForElement('div#my_account_forum_menu', driver, function(err, isExists) {
				if(isExists) {
					test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', 'Users Link Found'); 
					driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
					test.assertExists('div#ddUsers a', 'Group permission is found');
					driver.click('div#ddUsers a');
					wait.waitForElement('form#frmChangeUsersGroup', driver, function(err, isExists) {
						if(isExists) {
							driver.fill('form#frmChangeUsersGroup', {
								'member' : 'isneha'
							}, true);
							wait.waitForElement('form[name="ugfrm"]',  driver, function(err, isExists) {
								if(isExists) {
									test.assertExists('form#frmChangeUsersGroupFinal', 'Found admin');
									driver.fillLabels('form#frmChangeUsersGroupFinal', {
										Administrators: 'checked'
									}, true);
									casper.wait(2000,function() {
									
									});
								} else {
									driver.echo('Administration checkbox not found','ERROR');	
								}
							});
						} else{
							driver.echo('Change user group permission not found','ERROR');
						}
					});
				} else {
					casper.echo('Backend Menu not found', 'ERROR');
				}
			});
		}else {
			casper.echo('Error : '+err, 'INFO');
		}
	});
	casper.then(function() {
		backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
		});
		return callback(null);
	});
};

//method to enable approve new post** All posts
postEventMemberApprovalMethod.enableApproveNewPost = function(driver, test, callback) {
        registerMethod.loginToForumBackEnd(casper, function(err) {
		if(!err) {
			wait.waitForElement('div#my_account_forum_menu', driver, function(err, isExists) {
				if(isExists) {
					driver.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					wait.waitForElement('div#ddSettings', casper, function(err, isExists) {
						if(isExists) {
							casper.click('div#ddSettings a:nth-child(3)');
							wait.waitForElement('td#approval_drop_down', casper, function(err, isExists) {
								if(isExists) {
									driver.fillSelectors('form[name="posts"]', {
		    								'select[name="post_approval"]': '99'
									}, true);
									casper.test.assertExists('button.button.btn-m.btn-blue');
									casper.click('button.button.btn-m.btn-blue');
									casper.wait(40000, function() {
											});
									//casper.waitUntilVisible('div#loading_msg', function success() {
										//casper.echo(casper.fetchText('div#loading_msg'),'INFO');
										/*casper.waitUntilVisible('div#ajax-msg-top', function success() {
											casper.echo(casper.fetchText('div#ajax-msg-top'),'INFO');
										}, function fail() { 
											casper.echo('Saved not found', 'ERROR');
											casper.waitUntilVisible('div#ajax-msg-top', function success() {
												casper.echo(casper.fetchText('div#ajax-msg-top'),'INFO');
											});
										});*/
									//}, function fail() {
										//casper.echo('Loading... not found', 'INFO');
									//});
								} else {
									casper.echo('approve new post dropDown not found', 'ERROR');
								}
							});
						} else {
							casper.echo('Setting  tooltip menu not found', 'ERROR');
						}
					});
				} else {
					casper.echo('Backend Menu not found', 'ERROR');
				}
			});
		}else {
			casper.echo('Error : ', 'ERROR');
		}
	});
	casper.then(function() {
		backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
		});
		return callback(null);
	});
};

//code to disable approve new post** All posts  
postEventMemberApprovalMethod.disableApproveNewPost = function(driver, test, callback) {
        registerMethod.loginToForumBackEnd(casper, function(err) {
		if(!err) {
			wait.waitForElement('div#my_account_forum_menu', driver, function(err, isExists) {
				if(isExists) {
					driver.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					wait.waitForElement('div#ddSettings', casper, function(err, isExists) {
						if(isExists) {
							casper.click('div#ddSettings a:nth-child(3)');
							wait.waitForElement('input#reqregapp', casper, function(err, isExists) {
								if(isExists) {
									driver.fillSelectors('form[name="posts"]', {
		    								'select[name="post_approval"]': '0'
									}, true);
									casper.test.assertExists('button.button.btn-m.btn-blue');
									casper.click('button.button.btn-m.btn-blue');
									casper.wait(40000, function() {
											});
									/*casper.waitUntilVisible('div#loading_msg', function success() {
										casper.echo(casper.fetchText('div#loading_msg'),'INFO');
									}, function fail() {
										casper.echo('Loading... not found', 'INFO');
									});*/
								} else {
									casper.echo('approve new post checkbox not found', 'ERROR');
								}
							});
						} else {
							casper.echo('Setting  tooltip menu not found', 'ERROR');
						}
					});
				} else {
					casper.echo('Backend Menu not found', 'ERROR');
				}
			});
		}else {
			casper.echo('Error : ', 'ERROR');
		}
	});
	casper.then(function() {
		backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
		});
		return callback(null);
	});
};

//method to create a new topic
postEventMemberApprovalMethod.startTopic = function(data,driver,callback) {
	driver.click('a.pull-right.btn.btn-uppercase.btn-primary ');
	wait.waitForElement('div.post-body.pull-left', driver, function(err, isExists) {
		if(isExists) {								
			driver.sendKeys('input[name="subject"]', data.title, {reset:true});								
			driver.withFrame('message_ifr', function() {
				driver.sendKeys('#tinymce', driver.page.event.key.Ctrl,driver.page.event.key.A, {keepFocus: true});			
				driver.sendKeys('#tinymce', driver.page.event.key.Backspace, {keepFocus: true});
				driver.sendKeys('#tinymce',data.content);
			});
			wait.waitForElement('#all_forums_dropdown', driver, function(err, isExists) {
				if(isExists) {
					driver.click('#all_forums_dropdown');
					driver.fill('form[name="PostTopic"]',{
						'forum' : data.category
					},false);
					driver.then(function() {
						driver.click('#post_submit');
						wait.waitForElement('div#posts-list', driver, function(err, isExists) {
							if(isExists) {
								driver.echo('New topic Created','INFO');
							}
						});
					});
				} else {
					wait.waitForElement('#post_submit', driver, function(err, isExists) {
						if(isExists) {							
							driver.test.assertExists('#post_submit');
							driver.click('#post_submit');
							wait.waitForElement('div#posts-list', driver, function(err, isExists) {
								if(isExists) {
									driver.echo('New topic Created','INFO');
								}
							});
						}
					});
				}
			});
		}
	});
	driver.then(function() {
		return callback(null);
	});
};
//*************************method to compose a post by register user ************************************
postEventMemberApprovalMethod.composePost = function(driver, test, callback) {
	driver.echo('Inside the composePost method','INFO');
	test.assertExists('a.topic-title', 'Composed topic is found');
	topic = driver.evaluate(function() {
		var name = document.querySelector('a.topic-title span');
		return name.innerHTML;
	});
	driver.echo('*******************************************************','INFO');
	driver.echo('*           The name of the topic is-'+topic+        '*','INFO');
	driver.echo('*******************************************************','INFO');
	driver.click('div.panel-body.table-responsive ul li span span:nth-child(2) a');
	wait.waitForElement('form[name="PostTopic"]', driver, function(err, isExists) {
		if(isExists) {
			currentUrl = driver.getCurrentUrl();
			driver.fill('form[name="PostTopic"]',{
				'message': "Hello I am Register user"
			},false);
			wait.waitForElement('#reply_submit', driver, function(err, isExists) {
				if(isExists) {
					driver.test.assertExists('#reply_submit');
					driver.click('#reply_submit');
					driver.wait(2000,function() {
						return callback(null);
					});
				}else {
					driver.echo('Reply Submit button not found', 'ERROR');
				}
			});
		}else {
			driver.echo('Reply Post Compose form Doesnot visible', 'ERROR');
		}
	});
};

// method to get the id of the post
postEventMemberApprovalMethod.getPostId = function(driver, test, callback) {
	driver.then(function() {
		forumLoginMethod.logoutFromApp(casper, function() { });
	});
	driver.thenOpen(config.url, function() {
		//login with admin user to get the id of the post and to approve it
		casper.echo('Title of the page :' +driver.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(json["AdminUserLogin"].username, json["AdminUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						driver.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', driver, function(err, isExists) {
							if(isExists) {
								test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								driver.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', driver, function(err, isExists) {
									if(isExists) {
										test.assertExists('li#approvalQueue a','Approval Queue found');
										driver.click('li#approvalQueue a');
										wait.waitForElement('form#approveMembers', driver, function(err, isExists) {
												if(isExists) {
												var post_id = casper.evaluate(function() {
													var element=document.querySelectorAll("div[id^='post_message_']");
													var id = element[element.length-1].id;
													return id;	
													});
												postId = post_id.split("_");
												driver.echo('post id ; '+postId[2], 'INFO');
												return callback(null, postId[2]);
											}
										});
									}else {
										driver.echo('Approval Queue not Found','INFO');
									}
								});      
							}else{
								driver.echo('Categories not Found','ERROR');
							}
						});
					} else {
						casper.echo('User not logged in','ERROR');	
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'INFO');
			}
		});
	});
};

//****************** method to delete the approved post*************************
postEventMemberApprovalMethod.deletePost = function(driver, test, callback) {
	driver.thenOpen(currentUrl, function() {
		casper.echo('Inside the deletePost method','INFO');
		driver.test.assertExists('form[name="posts"] div#post_list_'+postId[2] + ' input');
		driver.click('form[name="posts"] div#post_list_'+postId[2] + ' input');
		wait.waitForElement('input#deleteposts', driver, function(err, isExists) {
			if(isExists) {
				driver.click('input#deleteposts');
				driver.wait(2000,function() {
					return callback(null);
				});
			}
		});
	});
};

//*************************Method for calendar functionality ***************************************

//*************************Method to enable the event approval from backend ************************
postEventMemberApprovalMethod.enableEventApproval = function(driver, test, callback) {
	registerMethod.loginToForumBackEnd(casper, function(err) {
		if(!err) {
			wait.waitForElement('div#my_account_forum_menu', driver, function(err, isExists) {
				if(isExists) {
					driver.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
					driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
					wait.waitForElement('div#ddContent', casper, function(err, isExists) {
						if(isExists) {
							casper.click('div#ddContent a:nth-child(2)');
							wait.waitForElement('div#tab_wrapper', casper, function(err, isExists) {
								if(isExists) {
									casper.click('tr:nth-child(2) td:nth-child(3) a');
									wait.waitForElement('a.menuOpened', casper, function(err, isExists) {
										if(isExists) {
											casper.click('div[id^="calendarAction"] a');
											wait.waitForElement('input#f', casper, function(err, isExists) {
												if(isExists) {
													utils.enableorDisableCheckbox('f', true, casper, function() {
														casper.echo('checkbox is checked', 'INFO');
													});
												}
												casper.test.assertExists('button.button.btn-m.btn-blue');
												casper.click('button.button.btn-m.btn-blue');
												wait.waitForElement('font[color="red"]', casper, function(err, isExists) {
													if(isExists) {
														casper.echo("Permission changed",'INFO');
													}
												});
											});
										}
									});
									casper.then(function() {
										casper.click('li.inactive_tab a');
										wait.waitForElement('td.userGroupActions', casper, function(err, isExists) {
											if(isExists) {
												var grpName = casper.evaluate(function(){
													for(var i=3; i<=7; i++) {
														var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1) li'); // change li
														if (x1.innerText == 'Registered Users') {
															document.querySelector('tr:nth-child('+i+') td:nth-child(2) a').click();
															return (x1.innerText);
														}
													}
												});
												casper.echo('a[id="'+grpName,"INFO");
												wait.waitForElement('input#t', casper, function(err, isExists) {
													if(isExists) {
														utils.enableorDisableCheckbox('t', true, casper, function() {
															casper.echo('checkbox is checked', 'INFO');
														});
														casper.test.assertExists('button.button.btn-m.btn-blue');
														casper.click('button.button.btn-m.btn-blue');
														wait.waitForElement('font[color="red"]', casper, function(err, isExists) {
															if(isExists) {
																casper.echo("Permission changed",'INFO');
															}
														});
													} else {
														driver.echo(' Require event approval checkbox not found', 'ERROR');
													}
												});
											} else {
												driver.echo('Table not found', 'ERROR');
											}
										});
									});
								} else {
									casper.echo('Calendar Permissions tab not found', 'ERROR');
								}
							});
						} else {
							casper.echo('Content  tooltip menu not found', 'ERROR');
						}
					});
				} else {
					casper.echo('Backend Menu not found', 'ERROR');
				}
			});
		}else {
			casper.echo('Error : '+err, 'INFO');
		}
	});
	casper.then(function() {
		backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
		});
		return callback(null);
	});
};

//*************************Method to disable the event approval from backend ************************
postEventMemberApprovalMethod.disableEventApproval = function(driver, test, callback) {
	registerMethod.loginToForumBackEnd(casper, function(err) {
		if(!err) {
			wait.waitForElement('div#my_account_forum_menu', driver, function(err, isExists) {
				if(isExists) {
					driver.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
					driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
					wait.waitForElement('div#ddContent', casper, function(err, isExists) {
						if(isExists) {
							casper.click('div#ddContent a:nth-child(2)');
							wait.waitForElement('div#tab_wrapper', casper, function(err, isExists) {
								if(isExists) {
									casper.click('li.inactive_tab a');
									wait.waitForElement('table.text.fullborder', driver, function(err, isExists) {
										if(isExists) {
											casper.evaluate(function(){
												for(var i=1; i<=7; i++) {
													var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
													if (x1.innerText == 'Registered Users') {
														document.querySelector('tr:nth-child('+i+') td:nth-child(2) a').click();
													}
												}
											});
											wait.waitForElement('font[color="red"]', casper, function(err, isExists) {
												if(isExists) {
													casper.echo("Permission unchanged",'INFO');
												}
											});
										} else {
											driver.echo('Table not found', 'ERROR');
										}
									});
								} else {
									casper.echo('Calendar Permissions tab not found', 'ERROR');
								}
							});
						} else {
							casper.echo('Content  tooltip menu not found', 'ERROR');
						}
					});
				} else {
					casper.echo('Backend Menu not found', 'ERROR');
				}
			});
		}else {
			casper.echo('Error : ', 'ERROR');
		}
	});
	casper.then(function() {
		backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
		});
		return callback(null);
	});
};

//*************************method to compose a event and got id ************************************
postEventMemberApprovalMethod.composeEvent = function(driver, test, callback) {
	driver.echo('Inside the composeEvent method','INFO');
	try {
		driver.test.assertExists('ul.nav.pull-right span.caret');
		driver.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	} catch (e) {
		driver.echo('No user logged in','INFO');
	}
	casper.then(function() {
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.click('i.icon.icon-menu');
						try {
							casper.test.assertExists('ul#calendars_toggle_link i','calender menu found');
							casper.click('ul#calendars_toggle_link i');
							casper.test.assertExists('a[href^="/calendar/display?from_month=&from_year=&view="]','First calender found');
							casper.click('a[href^="/calendar/display?from_month=&from_year=&view="]');
						} catch (e) {
							casper.test.assertExists('li#calenders_show a','calender menu found');
							casper.click('li#calenders_show a');
						}
						wait.waitForElement('div.bd-wrapper.calendar-add-event a', driver, function(err, isExists) {
							if(isExists) {
								casper.click('div.bd-wrapper.calendar-add-event a');
								casper.then(function() {
									casper.sendKeys('form#PostCalEvent input[name="event_title"]', 'New event');
									casper.fillSelectors('form#PostCalEvent', {
											'input#allDay' : 1
									}, false); 
									casper.then(function() {
										wait.waitForElement('#message_ifr', driver, function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('#message_ifr','message-ifr found');
												casper.withFrame('message_ifr', function() {
													try{
														casper.test.assertExists('#tinymce');
														casper.sendKeys('#tinymce', "This is a new event");
													}catch(e) {
														casper.test.assertDoesntExist('#tinymce');
													}
												});
										
												// code get the id of event
												driver.then(function() {
													casper.click('#post_event_buttton');
													casper.wait(5000, function() {
														eventId = casper.evaluate( function(a) {
															var n = a.indexOf('eventid=');
															var stre='eventid=';
															var leng=stre.length;
															var h = n+leng;
															var stringt=a.substring(h);
															var t = stringt.indexOf('&');
															var id = stringt.substring(0,t);
															return id;
														}, casper.getCurrentUrl());
														casper.echo('*******event_id='+eventId,'INFO');
														return callback(null, eventId);
													});
												});
											}else{
												casper.echo('message_ifr not found','ERROR');
											}
										});
									});
								});
							} else {
								casper.echo('Calendar tab not found','ERROR');
							}
						});
					} else {
						casper.echo('User not logged in','ERROR');	
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'INFO');
			}
		});
	});
};

// method to go to approval queue page
postEventMemberApprovalMethod.goToApprovalQueuePage = function(driver, test, callback) {
	try {
		driver.test.assertExists('ul.nav.pull-right span.caret');
		driver.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	} catch (e) {
		driver.echo('No user logged in','INFO');
	}
	driver.thenOpen(config.url, function() {
		//login with admin user to get the id of the post and to approve it
		casper.echo('Title of the page :' +driver.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(json["AdminUserLogin"].username, json["AdminUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						driver.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', driver, function(err, isExists) {
							if(isExists) {
								test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								driver.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', driver, function(err, isExists) {
									if(isExists) {
										test.assertExists('li#approvalQueue a','Approval Queue found');
										driver.click('li#approvalQueue a');
										wait.waitForElement('form#approveMembers', driver, function(err, isExists) {
											if(isExists) {
												return callback(null);
											}
										});
									}else{
										driver.echo('Approval Queue not Found','INFO');
									}
								});        
							}else {
								driver.echo('Categories not Found','ERROR');
							}
						});
					} else {
						casper.echo('User not logged in','ERROR');	
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'INFO');
			}
		});
	});
};

//*************************Method for Member functionality ***************************************

//*************************Method to Enable - Approve New Registrations And Disable - Email verification" ************************
postEventMemberApprovalMethod.enableApproveRegistrationsAndDisableEmail = function(driver, callback) {
	registerMethod.loginToForumBackEnd(casper, function(err) {
		if(!err) {
			wait.waitForElement('div#my_account_forum_menu', driver, function(err, isExists) {
				if(isExists) {
					driver.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					wait.waitForElement('div#ddSettings', casper, function(err, isExists) {
						if(isExists) {
							casper.click('div#ddSettings a:nth-child(3)');
							wait.waitForElement('input#confirm_email', casper, function(err, isExists) {
								if(isExists) {
									utils.enableorDisableCheckbox('confirm_email', false, casper, function() {
										casper.echo('checkbox is unchecked', 'INFO');
									});
									casper.then(function() {
										utils.enableorDisableCheckbox('reqregapp', true, casper, function() {
											casper.echo('checkbox is checked', 'INFO');
										});
										casper.then(function() {
											utils.enableorDisableCheckbox('captcha_registration', false, casper, function() {
												casper.echo('checkbox is unchecked', 'INFO');
											});
											casper.test.assertExists('button.button.btn-m.btn-blue');
											casper.click('button.button.btn-m.btn-blue');
											casper.wait(40000, function() {
											});
											/*casper.waitUntilVisible('div#ajax-msg-top', function success() {
												casper.echo(casper.fetchText('div#ajax-msg-top'),'INFO');
											}, function fail() { 
												casper.waitUntilVisible('div#ajax-msg-top', function success() {
													casper.echo(casper.fetchText('div#ajax-msg-top'),'INFO');
												}, function fail() { 
													casper.echo('Saved not found', 'ERROR');
												});
											});*/
										});
									});
								} else {
									casper.echo('Email Address Verification checkbox not found', 'ERROR');
								}
							});
						} else {
							casper.echo('Setting  tooltip menu not found', 'ERROR');
						}
					});
				} else {
					casper.echo('Backend Menu not found', 'ERROR');
				}
			});
		}else {
			casper.echo('Error ', 'ERROR');
		}
	});
	casper.thenOpen(config.backEndUrl, function() {
		wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
			if(isExists) {
				casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', 'Users Link Found'); 
				casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
				casper.test.assertExists('div#ddUsers a', '*****Group permission is found****');
				casper.click('div#ddUsers a');
				wait.waitForElement('table.text.fullborder', driver, function(err, isExists) {
					if(isExists) {
						var text = casper.evaluate(function() {
									var x1, x2;
									for(var i=1; i<=7; i++) {
										var x = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
										if (x.innerText == 'Pending Approval') {
											x1=x.innerText;
											break;	
										}	
									}
									for(var i=1; i<=7; i++) {
										var x = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
										if (x.innerText == 'Pending Email Verification') {
											x2 = x.innerText;
											break;
										}	
									}
									if(x1 == 'Pending Approval' && x2 !== 'Pending Email Verification'){
										return "On Default User Groups Pending Email Verification-disappear Pending Approval-appear";
									}
									else {
									return "Error";
									}
								});	
						casper.echo(text,'INFO');
					}else{
						casper.echo('User table not found','ERROR');
					}
				});
			} else {
				casper.echo('Backend Menu not found', 'ERROR');
			}
		});
	});
	casper.then(function() {
		backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
		});
		return callback(null);
	});
};

//*************************Method to Disable - Approve New Registrations And Enable - Email verification" ************************
postEventMemberApprovalMethod.disableApproveRegistrationsAndEnableEmail = function(driver, callback) {
	registerMethod.loginToForumBackEnd(casper, function(err) {
		if(!err) {
			wait.waitForElement('div#my_account_forum_menu', driver, function(err, isExists) {
				if(isExists) {
					driver.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					wait.waitForElement('div#ddSettings', casper, function(err, isExists) {
						if(isExists) {
							casper.click('div#ddSettings a:nth-child(3)');
							wait.waitForElement('input#confirm_email', casper, function(err, isExists) {
								if(isExists) {
									utils.enableorDisableCheckbox('confirm_email', true, casper, function() {
										casper.echo('checkbox is checked', 'INFO');
									});
									casper.then(function() {
										utils.enableorDisableCheckbox('reqregapp', false, casper, function() {
											casper.echo('checkbox is unchecked', 'INFO');
										});
										casper.then(function() {
											utils.enableorDisableCheckbox('captcha_registration', false, casper, function() {
												casper.echo('checkbox is unchecked', 'INFO');
											});
											casper.test.assertExists('button.button.btn-m.btn-blue');
											casper.click('button.button.btn-m.btn-blue');
											casper.wait(40000, function() {
											});
											/*casper.waitUntilVisible('div#ajax-msg-top', function success() {
												casper.echo(casper.fetchText('div#ajax-msg-top'),'INFO');
											}, function fail() { 
												casper.waitUntilVisible('div#ajax-msg-top', function success() {
													casper.echo(casper.fetchText('div#ajax-msg-top'),'INFO');
												}, function fail() { 
													casper.echo('Saved not found', 'ERROR');
												});
											});*/
										});
									});
								} else {
									casper.echo('Email Address Verification checkbox not found', 'ERROR');
								}
							});
						} else {
							casper.echo('Setting  tooltip menu not found', 'ERROR');
						}
					});
				} else {
					casper.echo('Backend Menu not found', 'ERROR');
				}
			});
		}else {
			casper.echo('Error ', 'ERROR');
		}
	});
	casper.thenOpen(config.backEndUrl, function() {
		wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
			if(isExists) {
				casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', 'Users Link Found'); 
				casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
				casper.test.assertExists('div#ddUsers a', '*****Group permission is found****');
				casper.click('div#ddUsers a');
				wait.waitForElement('table.text.fullborder', driver, function(err, isExists) {
					if(isExists) {
						var text = casper.evaluate(function() {
									var x1, x2;
									for(var i=1; i<=7; i++) {
										var x = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
										if (x.innerText == 'Pending Approval') {
											x1=x.innerText;
											break;	
										}	
									}
									for(var i=1; i<=7; i++) {
										var x = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
										if (x.innerText == 'Pending Email Verification') {
											x2 = x.innerText;
											break;
										}	
									}
									if(x1 !== 'Pending Approval' && x2 == 'Pending Email Verification'){
										return "On Default User Groups Pending Email Verification-appear Pending Approval-disappear";
									}
									else {
									return "Error";
									}
								});	
						casper.echo(text,'INFO');
					}else{
						casper.echo('User table not found','ERROR');
					}
				});
			} else {
				casper.echo('Backend Menu not found', 'ERROR');
			}
		});
	});
	casper.then(function() {
		backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
		});
		return callback(null);
	});
};

//*************************Method to Enable - Approve New Registrations And Enable - Email verification" ************************
postEventMemberApprovalMethod.enableApproveRegistrationsAndEnableEmail = function(driver, callback) {
	registerMethod.loginToForumBackEnd(casper, function(err) {
		if(!err) {
			wait.waitForElement('div#my_account_forum_menu', driver, function(err, isExists) {
				if(isExists) {
					driver.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					wait.waitForElement('div#ddSettings', casper, function(err, isExists) {
						if(isExists) {
							casper.click('div#ddSettings a:nth-child(3)');
							wait.waitForElement('input#confirm_email', casper, function(err, isExists) {
								if(isExists) {
									utils.enableorDisableCheckbox('confirm_email', true, casper, function() {
										casper.echo('checkbox is checked', 'INFO');
									});
									casper.then(function() {
										utils.enableorDisableCheckbox('reqregapp', true, casper, function() {
											casper.echo('checkbox is checked', 'INFO');
										});
										casper.then(function() {
											utils.enableorDisableCheckbox('captcha_registration', false, casper, function() {
												casper.echo('checkbox is unchecked', 'INFO');
											});
											casper.test.assertExists('button.button.btn-m.btn-blue');
											casper.click('button.button.btn-m.btn-blue');
											casper.wait(40000, function() {
											});
											/*casper.waitUntilVisible('div#ajax-msg-top', function success() {
												casper.echo(casper.fetchText('div#ajax-msg-top'),'INFO');
											}, function fail() { 
												casper.waitUntilVisible('div#ajax-msg-top', function success() {
													casper.echo(casper.fetchText('div#ajax-msg-top'),'INFO');
												}, function fail() { 
													casper.echo('Saved not found', 'ERROR');
												});
											});*/
										});
									});
								} else {
									casper.echo('Email Address Verification checkbox not found', 'ERROR');
								}
							});
						} else {
							casper.echo('Setting  tooltip menu not found', 'ERROR');
						}
					});
				} else {
					casper.echo('Backend Menu not found', 'ERROR');
				}
			});
		}else {
			casper.echo('Error ', 'ERROR');
		}
	});
	casper.thenOpen(config.backEndUrl, function() {
		wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
			if(isExists) {
				casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', 'Users Link Found'); 
				casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
				casper.test.assertExists('div#ddUsers a', '*****Group permission is found****');
				casper.click('div#ddUsers a');
				wait.waitForElement('table.text.fullborder', driver, function(err, isExists) {
					if(isExists) {
						var text = casper.evaluate(function() {
									var x1, x2;
									for(var i=1; i<=7; i++) {
										var x = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
										if (x.innerText == 'Pending Approval') {
											x1=x.innerText;
											break;	
										}	
									}
									for(var i=1; i<=7; i++) {
										var x = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
										if (x.innerText == 'Pending Email Verification') {
											x2 = x.innerText;
											break;
										}	
									}
									if(x1 == 'Pending Approval' && x2 == 'Pending Email Verification'){
										return "On Default User Groups Pending Email Verification-- appear Pending Approval-- appear";
									}
									else {
									return "Error";
									}
								});	
						casper.echo(text,'INFO');
					}else{
						casper.echo('User table not found','ERROR');
					}
				});
			} else {
				casper.echo('Backend Menu not found', 'ERROR');
			}
		});
	});
	casper.then(function() {
		backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
		});
		return callback(null);
	});
};

//*************************Method to Disable - Approve New Registrations And Disable - Email verification" ************************
postEventMemberApprovalMethod.disableApproveRegistrationsAndDisableEmail = function(driver, callback) {
	registerMethod.loginToForumBackEnd(casper, function(err) {
		if(!err) {
			wait.waitForElement('div#my_account_forum_menu', driver, function(err, isExists) {
				if(isExists) {
					driver.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					wait.waitForElement('div#ddSettings', casper, function(err, isExists) {
						if(isExists) {
							casper.click('div#ddSettings a:nth-child(3)');
							wait.waitForElement('input#confirm_email', casper, function(err, isExists) {
								if(isExists) {
									utils.enableorDisableCheckbox('confirm_email', false, casper, function() {
										casper.echo('checkbox is unchecked', 'INFO');
									});
									casper.then(function() {
										utils.enableorDisableCheckbox('reqregapp', false, casper, function() {
											casper.echo('checkbox is unchecked', 'INFO');
										});
										casper.then(function() {
											utils.enableorDisableCheckbox('captcha_registration', false, casper, function() {
												casper.echo('checkbox is unchecked', 'INFO');
											});
											casper.test.assertExists('button.button.btn-m.btn-blue');
											casper.click('button.button.btn-m.btn-blue');
											casper.wait(40000, function() {
											});
											/*casper.waitUntilVisible('div#ajax-msg-top', function success() {
												casper.echo(casper.fetchText('div#ajax-msg-top'),'INFO');
											}, function fail() { 
												casper.waitUntilVisible('div#ajax-msg-top', function success() {
													casper.echo(casper.fetchText('div#ajax-msg-top'),'INFO');
												}, function fail() { 
													casper.echo('Saved not found', 'ERROR');
												});
											});*/
										});
									});
								} else {
									casper.echo('Email Address Verification checkbox not found', 'ERROR');
								}
							});
						} else {
							casper.echo('Setting  tooltip menu not found', 'ERROR');
						}
					});
				} else {
					casper.echo('Backend Menu not found', 'ERROR');
				}
			});
		}else {
			casper.echo('Error ', 'ERROR');
		}
	});
	casper.thenOpen(config.backEndUrl, function() {
		wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
			if(isExists) {
				casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', 'Users Link Found'); 
				casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
				casper.test.assertExists('div#ddUsers a', '*****Group permission is found****');
				casper.click('div#ddUsers a');
				wait.waitForElement('table.text.fullborder', driver, function(err, isExists) {
					if(isExists) {
						var text = casper.evaluate(function() {
									var x1, x2;
									for(var i=1; i<=7; i++) {
										var x = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
										if (x.innerText == 'Pending Approval') {
											x1=x.innerText;
											break;	
										}	
									}
									for(var i=1; i<=7; i++) {
										var x = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
										if (x.innerText == 'Pending Email Verification') {
											x2 = x.innerText;
											break;
										}	
									}
									if(x1 !== 'Pending Approval' && x2 !== 'Pending Email Verification') {
										return "On Default User Groups Pending Email Verification-- disappear Pending Approval-- disappear";
									}
									else {
									return "Error";
									}
								});	
						casper.echo(text,'INFO');
					}else{
						casper.echo('User table not found','ERROR');
					}
				});
			} else {
				casper.echo('Backend Menu not found', 'ERROR');
			}
		});
	});
	casper.then(function() {
		backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
		});
		return callback(null);
	});
};

//*************************Method to Register member ************************
postEventMemberApprovalMethod.registerMember = function(data, driver, callback) {
	driver.thenOpen(config.url, function() {
		try {
			driver.test.assertExists('ul.nav.pull-right span.caret');
			driver.then(function() {
				forumLoginMethod.logoutFromApp(casper, function() { });
			});
		} catch (e) {
			driver.echo('No user logged in','INFO');
		}
		driver.echo('Title of the page :' +this.getTitle(), 'INFO');
		wait.waitForElement('li.pull-right a[href="/register/register"]', casper, function(err, isExist) {
			if(!err){
				if(isExist) {
					driver.test.assertExists('li.pull-right a[href="/register/register"]');
					driver.click('li.pull-right a[href="/register/register"]');
					wait.waitForElement('form[name="PostTopic"] input[name="member"]', casper, function(err, isExist){ 
						 if(isExist) {
							driver.echo('Successfully open register form.....', 'INFO');
							driver.then(function() {
								registerMethod.registerToApp(data, casper, function(err) {
									if(!err) {
										casper.echo('Processing to registration on forum.....', 'INFO');
										wait.waitForElement('div.panel-body.table-responsive', casper, function(err, isExist) {
											if(isExist) {
												casper.then(function() {
													registerMethod.redirectToLogout(casper, casper.test, function(err) {
														if(!err) {
															casper.echo('User logout successfully', 'INFO');
														}
													});
												});
											} else {
												casper.echo('Message Not Found', 'ERROR');
											}
										});
									}
								});
							});
						} else {
							casper.echo('postTopic form  Not Found', 'ERROR');
						}
					});
				} else {
					driver.echo("User didn't not found any register link", 'ERROR');
				}
			}
		});
	});
	driver.then(function() {
		return callback(null);
	});
};

//******************method to find the id of member*******************************************
postEventMemberApprovalMethod.memberId = function(driver, callback) {
	wait.waitForElement('div#pendingMembers', driver, function(err, isExists) {
		if(isExists) {
			var member_id = casper.evaluate(function() {
				var element=document.querySelectorAll("li[id^='member_']");
				var id = element[element.length-1].id;
				return id;	
			});
			memberId = member_id.split("_");
			driver.echo('Member id is = '+memberId[1], 'INFO');
			return callback(null, memberId);
		}else {
			driver.echo('pending member not found','ERROR');
		}
	});
};

//****************** method to delete the Register user after approval*************************
postEventMemberApprovalMethod.deleteMember = function(driver, callback) {
	driver.thenOpen(config.backEndUrl,function() {
		registerMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', driver, function(err, isExists) {
					if(isExists) {
						driver.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', 'Users Link Found'); 
						driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
						driver.test.assertExists('div#ddUsers a', '*****Group permission is found****');
						driver.click('div#ddUsers a');
						wait.waitForElement('form#frmChangeUsersGroup', driver, function(err, isExists) {
							if(isExists) {
								driver.fill('form#frmChangeUsersGroup', {
									'member' : json.userToDelete
								}, true);
								wait.waitForElement('form[name="ugfrm"]', driver, function(err, isExists) {
									if(isExists) {
										driver.test.assertExists('a#delete_user', '******Delete user button found ******');
										driver.click('a#delete_user');
										driver.waitWhileVisible('div#dlgChangeUsersGroup', function() {
											driver.echo('Successfully deleted user', 'INFO');
										});
									}else{
										driver.echo('Delete user button not found','ERROR');
									}	
								});
							}else{
								driver.echo('Change user group permission not found','ERROR');
							}
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error ', 'ERROR');
			}
		});
		casper.then(function() {
			backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
			});
			return callback(null);
		});
	});
};

//****************** method to check pending user moved to Register user after approval*************************
postEventMemberApprovalMethod.checkPendingUser = function(driver, callback) {
	driver.thenOpen(config.backEndUrl,function() { // code to verify  user moved to Registered group
		registerMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', 'Users Link Found'); 
						casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
						casper.test.assertExists('div#ddUsers a', '*****Group permission is found****');
						casper.click('div#ddUsers a');
						wait.waitForElement('form#frmChangeUsersGroup', casper, function(err, isExists) {
							if(isExists) {
								casper.fill('form#frmChangeUsersGroup', {
									'member' : json.userToDelete
								}, true);
								wait.waitForElement('form[name="ugfrm"]', casper, function(err, isExists) {
									if(isExists) {
										var checked = casper.evaluate(function() {
											var element = document.getElementById(20237761).checked;
											return element;
										});
										casper.echo('the value of checked = '+checked,'INFO');
										if(checked == true) {
											casper.echo('The pending user is moved to Register user, Verified','INFO');
										}
										else {
											casper.echo('The pending user is not moved to Register user, Verified','INFO');
										}
									}	
								});
							}
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error ', 'ERROR');
			}
		});
		driver.then(function() {
			backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
			});
		});
	});
};

//*************************Method to enable Viewable on Members List for pending approval from backend ************************
postEventMemberApprovalMethod.enableViewableMembersPendingApproval = function(driver, test, callback) {
	registerMethod.loginToForumBackEnd(casper, function(err) {
		if(!err) {
			wait.waitForElement('div#my_account_forum_menu', driver, function(err, isExists) {
				if(isExists) {
					driver.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
					driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
					wait.waitForElement('div#ddUsers', casper, function(err, isExists) {
						if(isExists) {
							casper.click('div#ddUsers a:nth-child(1)');
							wait.waitForElement('div#tab_wrapper', casper, function(err, isExists) {
								if(isExists) {
									//casper.click('li.inactive_tab a');
									wait.waitForElement('table.text.fullborder', driver, function(err, isExists) {
										if(isExists) {
											var id = casper.evaluate(function(){
												for(var i=1; i<=7; i++) {
													var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
													if (x1.innerText == 'Pending Approval') {
														document.querySelector('tr:nth-child('+i+') td:nth-child(3) a').click();
														var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('id');
														return x2;
													}
												}
											});
											casper.click('a[id="'+id+'"]');
											wait.waitForElement('input#memberslist_viewable', casper, function(err, isExists) {
												if(isExists) {
													utils.enableorDisableCheckbox('memberslist_viewable', true, casper, function() {
														casper.echo('checkbox is checked', 'INFO');
													});
													casper.test.assertExists('button.button.btn-m.btn-blue');
													casper.click('button.button.btn-m.btn-blue');
													casper.wait(40000, function() {
													});
													/*wait.waitForElement('font[color="red"]', casper, function(err, isExists) {
														if(isExists) {
															casper.echo("Permission unchanged",'INFO');
														}
													});*/
												}else {
													casper.echo(' Viewable on Members List  not found', 'ERROR');
												}
											});
										} else {
											driver.echo('Table not found', 'ERROR');
										}
									});
								} else {
									casper.echo('Calendar Permissions tab not found', 'ERROR');
								}
							});
						} else {
							casper.echo('Content  tooltip menu not found', 'ERROR');
						}
					});
				} else {
					casper.echo('Backend Menu not found', 'ERROR');
				}
			});
		}else {
			casper.echo('Error : ', 'ERROR');
		}
	});
	casper.then(function() {
		backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
		});
		return callback(null);
	});
};

//*************************Method to enable Viewable on Members List for pending email verification from backend ************************
postEventMemberApprovalMethod.enableViewableMembersPendingEmailVerification = function(driver, test, callback) {
	registerMethod.loginToForumBackEnd(casper, function(err) {
		if(!err) {
			wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
				if(isExists) {
					driver.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
					driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
					wait.waitForElement('div#ddUsers', casper, function(err, isExists) {
						if(isExists) {
							casper.click('div#ddUsers a:nth-child(1)');
							wait.waitForElement('div#tab_wrapper', casper, function(err, isExists) {
								if(isExists) {
									//casper.click('li.inactive_tab a');
									wait.waitForElement('table.text.fullborder', driver, function(err, isExists) {
										if(isExists) {
											var id = casper.evaluate(function(){
												for(var i=1; i<=7; i++) {
													var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
													if (x1.innerText == 'Pending Email Verification') {
														document.querySelector('tr:nth-child('+i+') td:nth-child(3) a').click();
														var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('id');
														return x2;
													}
												}
											});
											casper.click('a[id="'+id+'"]');
											wait.waitForElement('input#memberslist_viewable', casper, function(err, isExists) {
												if(isExists) {
													utils.enableorDisableCheckbox('memberslist_viewable', true, casper, function() {
														casper.echo('checkbox is checked', 'INFO');
													});
													casper.test.assertExists('button.button.btn-m.btn-blue');
													casper.click('button.button.btn-m.btn-blue');
													casper.wait(40000, function() {
													});
													/*wait.waitForElement('font[color="red"]', casper, function(err, isExists) {
														if(isExists) {
															casper.echo("Permission unchanged",'INFO');
														}
													});*/
												}else {
													casper.echo(' Viewable on Members List  not found', 'ERROR');
												}
											});
										} else {
											casper.echo('Table not found', 'ERROR');
										}
									});
								} else {
									casper.echo('Calendar Permissions tab not found', 'ERROR');
								}
							});
						} else {
							casper.echo('Content  tooltip menu not found', 'ERROR');
						}
					});
				} else {
					casper.echo('Backend Menu not found', 'ERROR');
				}
			});
		}else {
			casper.echo('Error : ', 'ERROR');
		}
	});
	casper.then(function() {
		backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
		});
		return callback(null);
	});
};
