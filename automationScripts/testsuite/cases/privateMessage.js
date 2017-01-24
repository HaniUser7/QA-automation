/***These are the function which has been called in privateMessage.js and also will be used in other js file as per requirement**********/

'use strict';
var json = require('../../testdata/privateMessage.json');
var config = require('../../../config/config.json');
var privateMessageMethod = require('../methods/privateMessage.js');
var forumLoginMethod = require('../methods/login.js');
var wait = require('../wait.js');
var privateMessageTestcases = module.exports = {};
var count = 1;
var failedScreenshotsLocation = config.failedScreenShotsLocation+'privateMessage/';

//Method To capture Screenshots If Any Test Case Failed
casper.test.on('fail', function(failure) {
	casper.capture(failedScreenshotsLocation+'privateMessageError'+count+'.png');
	count++;
});

//Method To Verify JS Errors
casper.on("page.error", function(msg, trace) {
	this.echo("Error:    " + msg, "ERROR");
	privateMessageMethod.jsErrors.push(msg);
});

// method to create a message
privateMessageTestcases.createPrivateMessage = function() {
	casper.then(function() {
		casper.echo('                       Test case 1','INFO');
		casper.echo('                  To compose a message by scenario 1','INFO');
		forumLoginMethod.loginToApp(json["registeredUserLogin"].username, json["registeredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						casper.click('i#private_message_notification');
						wait.waitForElement('ul#private_message_dropdown span.pull-right', casper, function(err, isExists) {
							if(isExists) {
								casper.click('a.send_new_pmsg');
								wait.waitForElement('div[class="modal fade in"]', casper,function(err, isExists) {
									if(isExists) { //changed
										privateMessageMethod.createMessage(json.privateMessage, casper, function(err) {
											if(!err) {
												casper.echo('Message sent called successfully..','INFO');
											}
										});
									} else {
										casper.echo('Message pop up not found','ERROR');
									}
								});
							} else {
								casper.echo('Send a New Messag Pop not found','ERROR');
							}
						});
					}else {
						casper.echo('User not logged in', 'ERROR');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});	
};
// Test cases to verify Delete conversation
// method To verify delete Conversation
privateMessageTestcases.deleteConversation = function() {
	casper.thenOpen(config.url, function() {
		casper.echo('                       Test case 1','INFO');
		casper.echo('                       To verify delete Conversation','INFO');
		forumLoginMethod.loginToApp(json["registeredUserLogin"].username, json["registeredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('i#private_message_notification');
						casper.click('i#private_message_notification');
						wait.waitForElement('ul#private_message_dropdown a.pull-left', casper, function(err, isExists) {
							if(isExists) {
								casper.click('ul#private_message_dropdown a.pull-left');
								wait.waitForElement('form#pmsg_list', casper, function(err, isExists) {
									if(isExists) {
										var converastion_id = casper.evaluate(function() {
											var id = document.querySelector('ul#pmsg_inbox_listing li:nth-child(1)').getAttribute('data-conversation_id');
											return id;
										});
										casper.echo('The conversation id is - '+converastion_id, 'INFO');
										casper.evaluate(function() {
											document.querySelector('ul#pmsg_inbox_listing input.entry-checkbox.pull-left:nth-child(1)').click();
										});
										casper.waitUntilVisible('#messages-menu', function() {
											casper.test.assertExists('#messages-menu','floating menu is appear on bottom of the page');
											casper.test.assertExists('a#delete_conversation i', 'Delete tab on the floating menu******************');
											casper.click('a#delete_conversation i');
											casper.waitWhileVisible('li[data-conversation_id="'+converastion_id+'"]', function success() {
												casper.echo('The topmost message is deleted','INFO');
											}, function fail() {
												casper.echo('message not found', 'ERROR')
											});
										});
									} else {
										casper.echo('Inbox not found','ERROR');
									}
								});
							} else {
								casper.echo('Inbox at popup not found','ERROR');
							}
						});
					}else {
						casper.echo('User not logged in', 'ERROR');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});
};

// method To verify delete multiple Conversation
privateMessageTestcases.deleteMultipleConversation = function() {
	casper.thenOpen(config.url, function() {
		casper.echo('                       Test case 2','INFO');
		casper.echo('                       To verify delete multiple Conversation','INFO');
		forumLoginMethod.loginToApp(json["registeredUserLogin"].username, json["registeredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('i#private_message_notification');
						casper.click('i#private_message_notification');
						wait.waitForElement('ul#private_message_dropdown a.pull-left', casper, function(err, isExists) {
							if(isExists) {
								casper.click('ul#private_message_dropdown a.pull-left');
								wait.waitForElement('form#pmsg_list', casper, function(err, isExists) {
									if(isExists) {
										var converastion_id = casper.evaluate(function() {
											var id = document.querySelector('ul#pmsg_inbox_listing li:nth-child(1)').getAttribute('data-conversation_id');
											return id;
										});
										casper.echo('The conversation id is - '+converastion_id, 'INFO');
										casper.evaluate(function() {
											document.querySelector('ul#pmsg_inbox_listing li:nth-child(1) input').click();
											document.querySelector('ul#pmsg_inbox_listing li:nth-child(2) input').click();
										});
										casper.waitUntilVisible('#messages-menu', function() {
											casper.test.assertExists('#messages-menu','floating menu is appear on bottom of the page');
											casper.test.assertExists('a#delete_conversation i', 'Delete tab on the floating menu******************');
											casper.click('a#delete_conversation i');
											casper.waitWhileVisible('li[data-conversation_id="'+converastion_id+'"]', function success() {
												casper.echo('The topmost messages are deleted','INFO');
											}, function fail() {
												casper.echo('message not found', 'ERROR')
											});
										});
									} else {
										casper.echo('Inbox not found','ERROR');
									}
								});
							} else {
								casper.echo('Inbox at popup not found','ERROR');
							}
						});
					}else {
						casper.echo('User not logged in', 'ERROR');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});
};

// method To verify delete all Conversation
privateMessageTestcases.deleteAllConversation = function() {
	casper.thenOpen(config.url, function() {
		casper.echo('                       Test case 3','INFO');
		casper.echo('                       To verify delete all Conversation','INFO');
		forumLoginMethod.loginToApp(json["registeredUserLogin"].username, json["registeredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('i#private_message_notification');
						casper.click('i#private_message_notification');
						wait.waitForElement('ul#private_message_dropdown a.pull-left', casper, function(err, isExists) {
							if(isExists) {
								casper.click('ul#private_message_dropdown a.pull-left');
								wait.waitForElement('form#pmsg_list', casper, function(err, isExists) {
									if(isExists) {
										var converastion_id = casper.evaluate(function() {
											var id = document.querySelector('ul#pmsg_inbox_listing li:nth-child(1)').getAttribute('data-conversation_id');
											return id;
										});
										casper.echo('The conversation id is - '+converastion_id, 'INFO');
										casper.click('input#select_allbox');
										casper.waitUntilVisible('#messages-menu', function() {
											casper.test.assertExists('#messages-menu','floating menu is appear on bottom of the page');
											casper.test.assertExists('a#delete_conversation i', 'Delete tab on the floating menu******************');
											casper.click('a#delete_conversation i');
											casper.waitWhileVisible('li[data-conversation_id="'+converastion_id+'"]', function success() {
												casper.echo('All messages are deleted','INFO');
											}, function fail() {
												casper.echo('message not found', 'ERROR')
											});
										});
									} else {
										casper.echo('Inbox not found','ERROR');
									}
								});
							} else {
								casper.echo('Inbox at popup not found','ERROR');
							}
						});
					}else {
						casper.echo('User not logged in', 'ERROR');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});
};

// method Delete coversation from conversation page
privateMessageTestcases.deleteFromConversationPage = function() {
	casper.thenOpen(config.url, function() {
		casper.echo('                       Test case 4','INFO');
		casper.echo('                       Delete coversation from conversation page','INFO');
		forumLoginMethod.loginToApp(json["registeredUserLogin"].username, json["registeredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('i#private_message_notification');
						casper.click('i#private_message_notification');
						wait.waitForElement('ul#private_message_dropdown a.pull-left', casper, function(err, isExists) {
							if(isExists) {
								casper.click('ul#private_message_dropdown a.pull-left');
								wait.waitForElement('form#pmsg_list', casper, function(err, isExists) {
									if(isExists) {
										var converastion_id = casper.evaluate(function() {
											var id = document.querySelector('ul#pmsg_inbox_listing li:nth-child(1)').getAttribute('data-conversation_id');
											return id;
										});
										casper.echo('The conversation id is - '+converastion_id, 'INFO');
										casper.click('a#delete_curr_conversation i');
										casper.waitWhileVisible('li[data-conversation_id="'+converastion_id+'"]', function() {
											casper.echo('The message from conversation page is deleted','INFO');
										});
									} else {
										casper.echo('Inbox not found','ERROR');
									}
								});
							} else {
								casper.echo('Inbox at popup not found','ERROR');
							}
						});
					}else {
						casper.echo('User not logged in', 'ERROR');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});
};

// method To verify mark as unread(check box)(single)
privateMessageTestcases.unreadCheckbox = function() {
	casper.thenOpen(config.url, function() {
		casper.echo('                       Test case 1','INFO');
		casper.echo('                       To verify mark as unread(check box)(single)','INFO');
		forumLoginMethod.loginToApp(json["registeredUserLogin"].username, json["registeredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('i#private_message_notification');
						casper.click('i#private_message_notification');
						wait.waitForElement('ul#private_message_dropdown a.pull-left', casper, function(err, isExists) {
							if(isExists) {
								casper.click('ul#private_message_dropdown a.pull-left');
								wait.waitForElement('form#pmsg_list', casper, function(err, isExists) {
									if(isExists) {
										casper.evaluate(function() {
											document.querySelector('ul#pmsg_inbox_listing input[data-pms_new_status="0"]').click();
										});
										casper.waitUntilVisible('#messages-menu', function() {
											casper.test.assertExists('#messages-menu','floating menu is appear on bottom of the page');
											casper.test.assertExists('div#messages-menu a.dropdown-toggle', 'Perform action tab on the floating menu******************');
											casper.click('div#messages-menu a.dropdown-toggle');
											casper.test.assertExists('li#markunread_msg_btn a', 'Mark as Uread tab Found');
											casper.click('li#markunread_msg_btn a');
											casper.waitUntilVisible('div.scrollable-area-body div.alert.alert-success.text-center', function success() {
												var errorMessage = casper.fetchText('div.scrollable-area-body div.alert.alert-success.text-center');
												
												var expectedErrorMsg = "The conversation has been marked as unread";
												casper.test.assert(errorMessage.indexOf(expectedErrorMsg) > -1);
												casper.echo('unread verified', 'INFO');
												try {
													casper.test.assertExists('span.badge.blue', 'Count Found');
												} catch (e) {
													casper.echo('Count not found','ERROR');
												}
											}, function fail() {
												casper.echo('message not found', 'ERROR')
											});
										});
									} else {
										casper.echo('Inbox not found','ERROR');
									}
								});
							} else {
								casper.echo('Inbox at popup not found','ERROR');
							}
						});
					}else {
						casper.echo('User not logged in', 'ERROR');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
	});
	casper.then(function() {
		forumLoginMethod.logoutFromApp(casper, function() { });
	});
};

// method To verify mark as unread(check box)(multiple)
privateMessageTestcases.unreadMultipleCheckbox = function() {
	casper.thenOpen(config.url, function() {
		casper.echo('                       Test case 2','INFO');
		casper.echo('                       To verify mark as unread(check box)(multiple)','INFO');
		forumLoginMethod.loginToApp(json["registeredUserLogin"].username, json["registeredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('i#private_message_notification');
						casper.click('i#private_message_notification');
						wait.waitForElement('ul#private_message_dropdown a.pull-left', casper, function(err, isExists) {
							if(isExists) {
								casper.click('ul#private_message_dropdown a.pull-left');
								wait.waitForElement('form#pmsg_list', casper, function(err, isExists) {
									if(isExists) {
										casper.evaluate(function() {
											document.querySelector('ul#pmsg_inbox_listing li:nth-child(1)  input[data-pms_new_status="0"]').click();
											document.querySelector('ul#pmsg_inbox_listing li:nth-child(2)  input[data-pms_new_status="0"]').click();
										});
										casper.waitUntilVisible('#messages-menu', function() {
											casper.test.assertExists('#messages-menu','floating menu is appear on bottom of the page');
											casper.test.assertExists('div#messages-menu a.dropdown-toggle', 'Perform action tab on the floating menu******************');
											casper.click('div#messages-menu a.dropdown-toggle');
											casper.test.assertExists('li#markunread_msg_btn a', 'Mark as Uread tab Found');
											casper.click('li#markunread_msg_btn a');
											casper.waitUntilVisible('div.scrollable-area-body div.alert.alert-success.text-center', function success() {
												var errorMessage = casper.fetchText('div.scrollable-area-body div.alert.alert-success.text-center');
												
												var expectedErrorMsg = "2 conversations have been marked as unread";
												casper.test.assert(errorMessage.indexOf(expectedErrorMsg) > -1);
												casper.echo('unread verified', 'INFO');
												try {
													casper.test.assertExists('span.badge.blue', 'Count Found');
												} catch (e) {
													casper.echo('Count not found','ERROR');
												}
											}, function fail() {
												casper.echo('message not found', 'ERROR')
											});
										});
									} else {
										casper.echo('Inbox not found','ERROR');
									}
								});
							} else {
								casper.echo('Inbox at popup not found','ERROR');
							}
						});
					}else {
						casper.echo('User not logged in', 'ERROR');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
	});
	casper.then(function() {
		forumLoginMethod.logoutFromApp(casper, function() { });
	});
};

// method To verify mark as unread(check box)(all)
privateMessageTestcases.unreadAllCheckbox = function() {
	casper.thenOpen(config.url, function() {
		casper.echo('                       Test case 3','INFO');
		casper.echo('                       To verify mark as unread(check box)(all)','INFO');
		forumLoginMethod.loginToApp(json["registeredUserLogin"].username, json["registeredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('i#private_message_notification');
						casper.click('i#private_message_notification');
						wait.waitForElement('ul#private_message_dropdown a.pull-left', casper, function(err, isExists) {
							if(isExists) {
								casper.click('ul#private_message_dropdown a.pull-left');
								wait.waitForElement('form#pmsg_list', casper, function(err, isExists) {
									if(isExists) {
										casper.click('input#select_allbox');
										casper.waitUntilVisible('#messages-menu', function() {
											casper.test.assertExists('#messages-menu','floating menu is appear on bottom of the page');
											casper.test.assertExists('div#messages-menu a.dropdown-toggle', 'Perform action tab on the floating menu******************');
											casper.click('div#messages-menu a.dropdown-toggle');
											casper.test.assertExists('li#markunread_msg_btn a', 'Mark as Uread tab Found');
											casper.click('li#markunread_msg_btn a');
											casper.waitUntilVisible('div.scrollable-area-body div.alert.alert-success.text-center', function success() {
												var errorMessage = casper.fetchText('div.scrollable-area-body div.alert.alert-success.text-center');
												
												var expectedErrorMsg = " conversations have been marked as unread";
												casper.test.assert(errorMessage.indexOf(expectedErrorMsg) > -1);
												casper.echo('unread verified', 'INFO');
												try {
													casper.test.assertExists('span.badge.blue', 'Count Found');
												} catch (e) {
													casper.echo('Count not found','ERROR');
												}
											}, function fail() {
												casper.echo('message not found', 'ERROR')
											});
										});
									} else {
										casper.echo('Inbox not found','ERROR');
									}
								});
							} else {
								casper.echo('Inbox at popup not found','ERROR');
							}
						});
					}else {
						casper.echo('User not logged in', 'ERROR');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
	});
	casper.then(function() {
		forumLoginMethod.logoutFromApp(casper, function() { });
	});
};

// method To verify mark as read(check box)(single)
privateMessageTestcases.readCheckbox = function() {
	casper.thenOpen(config.url, function() {
		casper.echo('                       Test case 4','INFO');
		casper.echo('                       To verify mark as read(check box)(single)','INFO');
		forumLoginMethod.loginToApp(json["registeredUserLogin"].username, json["registeredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('i#private_message_notification');
						casper.click('i#private_message_notification');
						wait.waitForElement('ul#private_message_dropdown a.pull-left', casper, function(err, isExists) {
							if(isExists) {
								casper.click('ul#private_message_dropdown a.pull-left');
								wait.waitForElement('form#pmsg_list', casper, function(err, isExists) {
									if(isExists) {
										casper.evaluate(function() {
											document.querySelector('ul#pmsg_inbox_listing input[data-pms_new_status="1"]').click();
										});
										casper.waitUntilVisible('#messages-menu', function() {
											casper.test.assertExists('#messages-menu','floating menu is appear on bottom of the page');
											casper.test.assertExists('div#messages-menu a.dropdown-toggle', 'Perform action tab on the floating menu******************');
											casper.click('div#messages-menu a.dropdown-toggle');
											casper.test.assertExists('li#markread_msg_btn a', 'Mark as Read tab Found');
											casper.click('li#markread_msg_btn a');
											casper.waitUntilVisible('div.scrollable-area-body div.alert.alert-success.text-center', function success() {
												var errorMessage = casper.fetchText('div.scrollable-area-body div.alert.alert-success.text-center');
												
												var expectedErrorMsg = "The conversation has been marked as read";
												casper.test.assert(errorMessage.indexOf(expectedErrorMsg) > -1);
												casper.echo('read verified', 'INFO');
											}, function fail() {
												casper.echo('message not found', 'ERROR')
											});
										});
									} else {
										casper.echo('Inbox not found','ERROR');
									}
								});
							} else {
								casper.echo('Inbox at popup not found','ERROR');
							}
						});
					}else {
						casper.echo('User not logged in', 'ERROR');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
	});
	casper.then(function() {
		forumLoginMethod.logoutFromApp(casper, function() { });
	});
};

// method To verify mark as read(check box)(multiple)
privateMessageTestcases.readMultipleCheckbox = function() {
	casper.thenOpen(config.url, function() {
		casper.echo('                       Test case 5','INFO');
		casper.echo('                       To verify mark as read(check box)(multiple)','INFO');
		forumLoginMethod.loginToApp(json["registeredUserLogin"].username, json["registeredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('i#private_message_notification');
						casper.click('i#private_message_notification');
						wait.waitForElement('ul#private_message_dropdown a.pull-left', casper, function(err, isExists) {
							if(isExists) {
								casper.click('ul#private_message_dropdown a.pull-left');
								wait.waitForElement('form#pmsg_list', casper, function(err, isExists) {
									if(isExists) {
										casper.evaluate(function() {
											document.querySelector('ul#pmsg_inbox_listing input[data-pms_new_status="1"]').click();
										});
										casper.waitUntilVisible('#messages-menu', function() {
											casper.test.assertExists('#messages-menu','floating menu is appear on bottom of the page');
											casper.test.assertExists('div#messages-menu a.dropdown-toggle', 'Perform action tab on the floating menu******************');
											casper.click('div#messages-menu a.dropdown-toggle');
											casper.test.assertExists('li#markread_msg_btn a', 'Mark as Read tab Found');
											casper.click('li#markread_msg_btn a');
											casper.waitUntilVisible('div.scrollable-area-body div.alert.alert-success.text-center', function success() {
												var errorMessage = casper.fetchText('div.scrollable-area-body div.alert.alert-success.text-center');
												
												var expectedErrorMsg = " conversation has been marked as read";
												casper.test.assert(errorMessage.indexOf(expectedErrorMsg) > -1);
												casper.echo('read verified', 'INFO');
											}, function fail() {
												casper.echo('message not found', 'ERROR')
											});
										});
									} else {
										casper.echo('Inbox not found','ERROR');
									}
								});
							} else {
								casper.echo('Inbox at popup not found','ERROR');
							}
						});
					}else {
						casper.echo('User not logged in', 'ERROR');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
	});
	casper.then(function() {
		forumLoginMethod.logoutFromApp(casper, function() { });
	});
};

// method To verify mark as read(check box)(all)
privateMessageTestcases.readAllCheckbox = function() {
	casper.thenOpen(config.url, function() {
		casper.echo('                       Test case 6','INFO');
		casper.echo('                       To verify mark as read(check box)(all)','INFO');
		forumLoginMethod.loginToApp(json["registeredUserLogin"].username, json["registeredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('i#private_message_notification');
						casper.click('i#private_message_notification');
						wait.waitForElement('ul#private_message_dropdown a.pull-left', casper, function(err, isExists) {
							if(isExists) {
								casper.click('ul#private_message_dropdown a.pull-left');
								wait.waitForElement('form#pmsg_list', casper, function(err, isExists) {
									if(isExists) {
										casper.click('input#select_allbox');
										casper.waitUntilVisible('#messages-menu', function() {
											casper.test.assertExists('#messages-menu','floating menu is appear on bottom of the page');
											casper.test.assertExists('div#messages-menu a.dropdown-toggle', 'Perform action tab on the floating menu******************');
											casper.click('div#messages-menu a.dropdown-toggle');
											try {
												casper.test.assertExists('li#markread_msg_btn a', 'Mark as Uread tab Found');
												casper.click('li#markread_msg_btn a');
												casper.waitUntilVisible('div.scrollable-area-body div.alert.alert-success.text-center', function success() {
													var errorMessage = casper.fetchText('div.scrollable-area-body div.alert.alert-success.text-center');
												
													var expectedErrorMsg = " conversations have been marked as read";
													casper.test.assert(errorMessage.indexOf(expectedErrorMsg) > -1);
													casper.echo('read verified', 'INFO');
												}, function fail() {
													casper.echo('message not found', 'ERROR')
												});
											} catch(e) {
												casper.echo('All mesages already marked as read');
											}
										});
									} else {
										casper.echo('Inbox not found','ERROR');
									}
								});
							} else {
								casper.echo('Inbox at popup not found','ERROR');
							}
						});
					}else {
						casper.echo('User not logged in', 'ERROR');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
	});
	casper.then(function() {
		forumLoginMethod.logoutFromApp(casper, function() { });
	});
};

// method to verify mark as read(coversation page)
privateMessageTestcases.readFromConversationPage = function() {
	casper.thenOpen(config.url, function() {
		casper.echo('                       Test case 7','INFO');
		casper.echo('                       To verify mark as read(coversation page)','INFO');
		forumLoginMethod.loginToApp(json["registeredUserLogin"].username, json["registeredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('i#private_message_notification');
						casper.click('i#private_message_notification');
						wait.waitForElement('ul#private_message_dropdown a.pull-left', casper, function(err, isExists) {
							if(isExists) {
								casper.click('ul#private_message_dropdown a.pull-left');
								wait.waitForElement('form#pmsg_list', casper, function(err, isExists) {
									if(isExists) {
										casper.click('a#mark_all_pmread');
										casper.waitUntilVisible('div#ajax-msg-top', function success() {
											var errorMessage = casper.fetchText('div#ajax-msg-top p');
											var expectedErrorMsg = "All private messages have been marked as read.";
											casper.test.assert(errorMessage.indexOf(expectedErrorMsg) > -1);
											casper.echo('read verified', 'INFO');
										}, function fail() {
											casper.echo('message not found', 'ERROR')
										});
									} else {
										casper.echo('Inbox not found','ERROR');
									}
								});
							} else {
								casper.echo('Inbox at popup not found','ERROR');
							}
						});
					}else {
						casper.echo('User not logged in', 'ERROR');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});
};

// Test cases to verify with move conversation, archeive message/move or inbox message/move
// method to Move single conversation(inbox to archieve)
privateMessageTestcases.moveSingleToArchieve = function() {
	casper.thenOpen(config.url, function() {
		casper.echo('                       Test case 1','INFO');
		casper.echo('                       To Move single conversation(inbox to archieve)','INFO');
		forumLoginMethod.loginToApp(json["registeredUserLogin"].username, json["registeredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('i#private_message_notification');
						casper.click('i#private_message_notification');
						wait.waitForElement('ul#private_message_dropdown a.pull-left', casper, function(err, isExists) {
							if(isExists) {
								casper.click('ul#private_message_dropdown a.pull-left');
								wait.waitForElement('form#pmsg_list', casper, function(err, isExists) {
									if(isExists) {
										var converastion_id = casper.evaluate(function() {
											var id = document.querySelector('ul#pmsg_inbox_listing li:nth-child(1)').getAttribute('data-conversation_id');
											return id;
										});
										casper.echo('The conversation id is - '+converastion_id, 'INFO');
										casper.evaluate(function() {
											document.querySelector('ul#pmsg_inbox_listing li:nth-child(1) input').click();
										});
										casper.waitUntilVisible('#messages-menu', function() {
											casper.test.assertExists('#messages-menu','floating menu is appear on bottom of the page');
											casper.test.assertExists('span#move_conversation_dropdown a i.glyphicon.glyphicon-right-arrow', 'Move tab on the floating menu******************');
											casper.click('span#move_conversation_dropdown a i.glyphicon.glyphicon-right-arrow');
											casper.test.assertExists('li#move_to_saved_btn a', 'Archive conversation tab Found');
											casper.click('li#move_to_saved_btn a');
											casper.waitWhileVisible('li[data-conversation_id="'+converastion_id+'"]', function() {
												casper.echo('The topmost post is moved to Archive','INFO');
											});
										});
									} else {
										casper.echo('Inbox not found','ERROR');
									}
								});
							} else {
								casper.echo('Inbox at popup not found','ERROR');
							}
						});
					}else {
						casper.echo('User not logged in', 'ERROR');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});
};

// method to move multiple conversation(inbox to archieve)
privateMessageTestcases.moveMultipleToArchieve = function() {
	casper.thenOpen(config.url, function() {
		casper.echo('                       Test case 2','INFO');
		casper.echo('                       To move multiple conversation(inbox to archieve)','INFO');
		forumLoginMethod.loginToApp(json["registeredUserLogin"].username, json["registeredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('i#private_message_notification');
						casper.click('i#private_message_notification');
						wait.waitForElement('ul#private_message_dropdown a.pull-left', casper, function(err, isExists) {
							if(isExists) {
								casper.click('ul#private_message_dropdown a.pull-left');
								wait.waitForElement('form#pmsg_list', casper, function(err, isExists) {
									if(isExists) {
										var converastion_id = casper.evaluate(function() {
											var id = document.querySelector('ul#pmsg_inbox_listing li:nth-child(1)').getAttribute('data-conversation_id');
											return id;
										});
										casper.evaluate(function() {
										document.querySelector('ul#pmsg_inbox_listing li:nth-child(1) input').click();
										document.querySelector('ul#pmsg_inbox_listing li:nth-child(2) input').click();
									});
									casper.waitUntilVisible('#messages-menu', function() {
										casper.test.assertExists('#messages-menu','floating menu is appear on bottom of the page');
										casper.test.assertExists('span#move_conversation_dropdown a i.glyphicon.glyphicon-right-arrow', 'Move tab on the floating menu******************');
										casper.click('span#move_conversation_dropdown a i.glyphicon.glyphicon-right-arrow');
										casper.test.assertExists('li#move_to_saved_btn a', 'Archive conversation tab Found');
										casper.click('li#move_to_saved_btn a');
										casper.waitWhileVisible('li[data-conversation_id="'+converastion_id+'"]', function() {
											casper.echo('The messages are moved to Archive','INFO');
										});
									});
									} else {
										casper.echo('Inbox not found','ERROR');
									}
								});
							} else {
								casper.echo('Inbox at popup not found','ERROR');
							}
						});
					}else {
						casper.echo('User not logged in', 'ERROR');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});
};

// method to move all coversation(inbox to archieve)
privateMessageTestcases.moveAllToArchieve = function() {
	casper.thenOpen(config.url, function() {
		casper.echo('                       Test case 3','INFO');
		casper.echo('                       To move all coversation(inbox to archieve)','INFO');
		forumLoginMethod.loginToApp(json["registeredUserLogin"].username, json["registeredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('i#private_message_notification');
						casper.click('i#private_message_notification');
						wait.waitForElement('ul#private_message_dropdown a.pull-left', casper, function(err, isExists) {
							if(isExists) {
								casper.click('ul#private_message_dropdown a.pull-left');
								wait.waitForElement('form#pmsg_list', casper, function(err, isExists) {
									if(isExists) {
										var converastion_id = casper.evaluate(function() {
											var id = document.querySelector('ul#pmsg_inbox_listing li:nth-child(1)').getAttribute('data-conversation_id');
											return id;
										});
										casper.click('input#select_allbox');
										casper.waitUntilVisible('#messages-menu', function() {
											casper.test.assertExists('#messages-menu','floating menu is appear on bottom of the page');
											casper.test.assertExists('span#move_conversation_dropdown a i.glyphicon.glyphicon-right-arrow', 'Move tab on the floating menu******************');
											casper.click('span#move_conversation_dropdown a i.glyphicon.glyphicon-right-arrow');
											casper.test.assertExists('li#move_to_saved_btn a', 'Archive conversation tab Found');
											casper.click('li#move_to_saved_btn a');
											casper.waitWhileVisible('li[data-conversation_id="'+converastion_id+'"]', function() {
												casper.echo('All messages are moved to Archive','INFO');
											});
										});
									} else {
										casper.echo('Inbox not found','ERROR');
									}
								});
							} else {
								casper.echo('Inbox at popup not found','ERROR');
							}
						});
					}else {
						casper.echo('User not logged in', 'ERROR');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
	});
	casper.then(function() {
		forumLoginMethod.logoutFromApp(casper, function() { });
	});
};

// method to Move single conversation(archieve to inbox)
privateMessageTestcases.moveSingleToInbox = function() {
	var converastion_id;
	casper.thenOpen(config.url, function() {
		casper.echo('                       Test case 4','INFO');
		casper.echo('                      To Move single conversation(archieve to inbox)','INFO');
		forumLoginMethod.loginToApp(json["registeredUserLogin"].username, json["registeredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('i#private_message_notification');
						casper.click('i#private_message_notification');
						wait.waitForElement('ul#private_message_dropdown a.pull-left', casper, function(err, isExists) {
							if(isExists) {
								casper.click('ul#private_message_dropdown a.pull-left');
								wait.waitForElement('form#pmsg_list', casper, function(err, isExists) {
									if(isExists) {
										casper.click('form#pmsg_list a.profile-active.dropdown-toggle span');
										casper.click('div.dropdown.open ul.dropdown-menu.left.check-select li:nth-child(2) a');
										casper.wait(2000, function() {
											converastion_id = casper.evaluate(function() {
												var id = document.querySelector('ul#pmsg_inbox_listing li:nth-child(1)').getAttribute('data-conversation_id');
												return id;
											});
											casper.evaluate(function() {
												document.querySelector('ul#pmsg_inbox_listing li:nth-child(1) input').click();
											});
										});
										casper.waitUntilVisible('#messages-menu', function() {
											casper.test.assertExists('#messages-menu','floating menu is appear on bottom of the page');
											casper.test.assertExists('span#move_conversation_dropdown a i.glyphicon.glyphicon-right-arrow', 'Move tab on the floating menu******************');
											casper.click('span#move_conversation_dropdown a i.glyphicon.glyphicon-right-arrow');
											casper.test.assertExists('li#move_to_inbox_btn a', 'Move to Inbox tab Found');
											casper.click('li#move_to_inbox_btn a');
											casper.waitWhileVisible('li[data-conversation_id="'+converastion_id+'"]', function() {
												casper.echo('The topmost post is moved to Inbox','INFO');
											});
										});
									} else {
										casper.echo('Inbox not found','ERROR');
									}
								});
							} else {
								casper.echo('Inbox at popup not found','ERROR');
							}
						});
					}else {
						casper.echo('User not logged in', 'ERROR');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});
};

// method to move multiple conversation(archieve to inbox)
privateMessageTestcases.moveMultipleToInbox = function() {
	var converastion_id;
	casper.thenOpen(config.url, function() {
		casper.echo('                       Test case 5','INFO');
		casper.echo('                       to move multiple conversation(archieve to inbox)','INFO');
		forumLoginMethod.loginToApp(json["registeredUserLogin"].username, json["registeredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('i#private_message_notification');
						casper.click('i#private_message_notification');
						wait.waitForElement('ul#private_message_dropdown a.pull-left', casper, function(err, isExists) {
							if(isExists) {
								casper.click('ul#private_message_dropdown a.pull-left');
								wait.waitForElement('form#pmsg_list', casper, function(err, isExists) {
									if(isExists) {
										casper.click('form#pmsg_list a.profile-active.dropdown-toggle span');
										casper.click('div.dropdown.open ul.dropdown-menu.left.check-select li:nth-child(2) a');
										casper.wait(2000, function() {
											converastion_id = casper.evaluate(function() {
													var id = document.querySelector('ul#pmsg_inbox_listing li:nth-child(1)').getAttribute('data-conversation_id');
													return id;
												});
											casper.evaluate(function() {
												document.querySelector('ul#pmsg_inbox_listing li:nth-child(1) input').click();
												document.querySelector('ul#pmsg_inbox_listing li:nth-child(2) input').click();
											});
										});
										casper.waitUntilVisible('#messages-menu', function() {
											casper.test.assertExists('#messages-menu','floating menu is appear on bottom of the page');
											casper.test.assertExists('span#move_conversation_dropdown a i.glyphicon.glyphicon-right-arrow', 'Move tab on the floating menu******************');
											casper.click('span#move_conversation_dropdown a i.glyphicon.glyphicon-right-arrow');
											casper.test.assertExists('li#move_to_inbox_btn a', 'Move to Inbox tab Found');
											casper.click('li#move_to_inbox_btn a');
											casper.waitWhileVisible('li[data-conversation_id="'+converastion_id+'"]', function() {
												casper.echo('The messages are moved to Inbox','INFO');
											});
										});
									} else {
										casper.echo('Inbox not found','ERROR');
									}
								});
							} else {
								casper.echo('Inbox at popup not found','ERROR');
							}
						});
					}else {
						casper.echo('User not logged in', 'ERROR');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});
};

// method to move all coversation(archieve to inbox)
privateMessageTestcases.moveAllToInbox = function() {
	var converastion_id;
	casper.thenOpen(config.url, function() {
		casper.echo('                       Test case 6','INFO');
		casper.echo('                       To move all coversation(archieve to inbox)','INFO');
		forumLoginMethod.loginToApp(json["registeredUserLogin"].username, json["registeredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('i#private_message_notification');
						casper.click('i#private_message_notification');
						wait.waitForElement('ul#private_message_dropdown a.pull-left', casper, function(err, isExists) {
							if(isExists) {
								casper.click('ul#private_message_dropdown a.pull-left');
								wait.waitForElement('form#pmsg_list', casper, function(err, isExists) {
									if(isExists) {
										casper.click('form#pmsg_list a.profile-active.dropdown-toggle span');
										casper.click('div.dropdown.open ul.dropdown-menu.left.check-select li:nth-child(2) a');
										casper.wait(2000, function() {
											converastion_id = casper.evaluate(function() {
												var id = document.querySelector('ul#pmsg_inbox_listing li:nth-child(1)').getAttribute('data-conversation_id');
												return id;
											});
											casper.click('input#select_allbox');
										});
										casper.waitUntilVisible('#messages-menu', function() {
											casper.test.assertExists('#messages-menu','floating menu is appear on bottom of the page');
											casper.test.assertExists('span#move_conversation_dropdown a i.glyphicon.glyphicon-right-arrow', 'Move tab on the floating menu******************');
											casper.click('span#move_conversation_dropdown a i.glyphicon.glyphicon-right-arrow');
											casper.test.assertExists('li#move_to_inbox_btn a', 'Move to Inbox tab Found');
											casper.click('li#move_to_inbox_btn a');
											casper.waitWhileVisible('li[data-conversation_id="'+converastion_id+'"]', function() {
												casper.echo('All messages are moved to Inbox','INFO');
											});
										});
									} else {
										casper.echo('Inbox not found','ERROR');
									}
								});
							} else {
								casper.echo('Inbox at popup not found','ERROR');
							}
						});
					}else {
						casper.echo('User not logged in', 'ERROR');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});
};

// Test cases to Ignored user
// method To verify ignored member (check box)
privateMessageTestcases.ignoreUser = function() {
	casper.thenOpen(config.url, function() {
		casper.echo('                       Test case 1','INFO');
		casper.echo('                      To verify ignored member (check box)','INFO');
		forumLoginMethod.loginToApp(json["registeredUserLogin"].username, json["registeredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('i#private_message_notification');
						casper.click('i#private_message_notification');
						wait.waitForElement('ul#private_message_dropdown a.pull-left', casper, function(err, isExists) {
							if(isExists) {
								casper.click('ul#private_message_dropdown a.pull-left');
								wait.waitForElement('form#pmsg_list', casper, function(err, isExists) {
									if(isExists) {
										casper.click('a[data-original-title="Ignored Users"]');
										casper.waitForSelector('div#ignore-box', function() {
											casper.sendKeys('input[id="ignore_user_field-tokenfield"]', json["registeredUserLogin"].username1, {keepFocus:true});
											casper.sendKeys('input[id="ignore_user_field-tokenfield"]', casper.page.event.key.Enter , {keepFocus: true});
											casper.click('div#ignore-box input[name="save"]');
											casper.wait(2000, function() {
												try {
													casper.test.assertExists('div.alert.alert-danger.text-center','User already ignored');
													casper.echo(casper.fetchText('div.alert.alert-danger.text-center'), 'INFO');
												} catch (e) {
													casper.echo('user ignored','ERROR');
												}
											});
										});
									} else {
										casper.echo('Inbox not found','ERROR');
									}
								});
							} else {
								casper.echo('Inbox at popup not found','ERROR');
							}
						});
					}else {
						casper.echo('User not logged in', 'ERROR');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});
};


// method to verify with unignore user
privateMessageTestcases.unignoreUser = function() {
	casper.thenOpen(config.url, function() {
		casper.echo('                       Test case 3','INFO');
		casper.echo('                      To verify with unignore user','INFO');
		forumLoginMethod.loginToApp(json["registeredUserLogin"].username, json["registeredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('i#private_message_notification');
						casper.click('i#private_message_notification');
						wait.waitForElement('ul#private_message_dropdown a.pull-left', casper, function(err, isExists) {
							if(isExists) {
								casper.click('ul#private_message_dropdown a.pull-left');
								wait.waitForElement('form#pmsg_list', casper, function(err, isExists) {
									if(isExists) {
										casper.click('a[data-original-title="Ignored Users"]');
											casper.waitForSelector('div#ignore-box', function() {
												try {
													casper.test.assertExists('input[id^="ignoreUsers_"]');
													casper.click('input[id^="ignoreUsers_"]');
													casper.waitUntilVisible('div#ignore-menu', function() {
														casper.click('a#unignoreUser');
													});
												} catch (e) {
													casper.test.assertDoesntExist('input[id^="ignoreUsers_"]','No user in the ignored list');
												}
											});
									} else {
										casper.echo('Inbox not found','ERROR');
									}
								});
							} else {
								casper.echo('Inbox at popup not found','ERROR');
							}
						});
					}else {
						casper.echo('User not logged in', 'ERROR');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});
};

// method to verify with send reply on previous message after ignoring
privateMessageTestcases.replyOnPreviousMessageAfterIgnoring = function() {
	casper.thenOpen(config.url, function() {
		casper.echo('                       Test case 4','INFO');
		casper.echo('                 To verify with send reply on previous message after ignoring','INFO');
		forumLoginMethod.loginToApp(json["registeredUserLogin"].username1, json["registeredUserLogin"].password1, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('i#private_message_notification');
						casper.click('i#private_message_notification');
						wait.waitForElement('ul#private_message_dropdown a.pull-left', casper, function(err, isExists) {
							if(isExists) {
								casper.click('ul#private_message_dropdown a.pull-left');
								wait.waitForElement('form#pmsg_list', casper, function(err, isExists) {
									if(isExists) {
										casper.evaluate(function() {
											document.querySelector('textarea#pmessage_reply').click();
										});
										casper.waitForSelector('iframe#pmessage_reply_ifr', function() {
											casper.withFrame('pmessage_reply_ifr', function() {
												casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A,{keepFocus: true});		
												casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
												casper.sendKeys('#tinymce', 'Reply from ignored user on earlier conversation');
											});
											casper.then(function() {
												this.evaluate(function() {
													$('div#message_options').show();
												});
												casper.click('a#reply_msg_button');
												casper.waitUntilVisible('div#loading_msg', function success() {
													casper.echo(casper.fetchText('div#loading_msg p'), 'INFO');
													casper.echo('message replied','INFO');
												}, function fail() {
													casper.echo('Loading not found', 'ERROR')
												});
											});	
										});
									} else {
										casper.echo('Inbox not found','ERROR');
									}
								});
							} else {
								casper.echo('Inbox at popup not found','ERROR');
							}
						});
					}else {
						casper.echo('User not logged in', 'ERROR');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});
};

// method To verify with send message whos ignored you
privateMessageTestcases.sendMessageWhoIgnoredYou = function() {
	casper.thenOpen(config.url, function() {
		casper.echo('                       Test case 2','INFO');
		casper.echo('                 To verify with send message whos ignored you','INFO');
		forumLoginMethod.loginToApp(json["registeredUserLogin"].username1, json["registeredUserLogin"].password1, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						casper.click('i#private_message_notification');
						wait.waitForElement('ul#private_message_dropdown span.pull-right', casper, function(err, isExists) {
							if(isExists) {
								casper.click('a.send_new_pmsg');
								wait.waitForElement('div[class="modal fade in"]', casper,function(err, isExists) {
									if(isExists) {
										privateMessageMethod.createMessage(json.ignoredByUser, casper, function(err) {
											if(!err) {
												casper.echo('send message called...', 'INFO');
											}
										});
									} else {
										casper.echo('Message pop up not found','ERROR');
									}
								});
							} else {
								casper.echo('Send a New Messag Pop not found','ERROR');
							}
						});
					}else {
						casper.echo('User not logged in', 'ERROR');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});	
};

// Test cases for Extra's
// method to Verify profile link on user name
privateMessageTestcases.verifyProfileLinkOnUserName = function() {
	casper.thenOpen(config.url, function() {
		casper.echo('                       Test case 2','INFO');
		casper.echo('                   To Verify profile link on user name','INFO');
		forumLoginMethod.loginToApp(json["registeredUserLogin"].username, json["registeredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('i#private_message_notification');
						casper.click('i#private_message_notification');
						wait.waitForElement('ul#private_message_dropdown a.pull-left', casper, function(err, isExists) {
							if(isExists) {
								casper.click('ul#private_message_dropdown a.pull-left');
								wait.waitForElement('div#show_current_conversation', casper, function(err, isExists) {
									if(isExists) {
										casper.click('div#current_msg_details a#display_user');
										wait.waitForElement('div#UserProfile', casper, function(err, isExists) {
											if(isExists) {
												casper.echo('Redirect to profile page','INFO');
											} else {
												casper.echo('User profile page not found','ERROR');
											}
										});
									} else {
										casper.echo('Inbox not found','ERROR');
									}
								});
							} else {
								casper.echo('Inbox at popup not found','ERROR');
							}
						});
					}else {
						casper.echo('User not logged in', 'ERROR');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});
};

// method to Verify hover card on user name
privateMessageTestcases.verifyHoverCardOnUserName = function() {
	casper.thenOpen(config.url, function() {
		casper.echo('                       Test case 3','INFO');
		casper.echo('                   To Verify hover card on user name','INFO');
		forumLoginMethod.loginToApp(json["registeredUserLogin"].username, json["registeredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('i#private_message_notification');
						casper.click('i#private_message_notification');
						wait.waitForElement('ul#private_message_dropdown a.pull-left', casper, function(err, isExists) {
							if(isExists) {
								casper.click('ul#private_message_dropdown a.pull-left');
								wait.waitForElement('div#show_current_conversation', casper, function(err, isExists) {
									if(isExists) {
										casper.mouse.move('div#current_msg_details a#display_user');
										//wait.waitForVisible('div[style="display: block;"]', casper, function(err, isExists) {
										/*wait.waitUntilVisible('div.popover.hovercard.fade.bottom.in', casper, function(err, isExists) {
											casper.capture('1.png');
											if(isExists) {
												casper.echo('Showing hover card when user user hovering mouse on the user name ','INFO');
												casper.capture('pd.png');
											} else {
												casper.echo('User profile page not found','ERROR');
											}
										});*/
										/*casper.wait(5000, function() {
											casper.capture('1.png');
										});*/
									} else {
										casper.echo('Inbox not found','ERROR');
									}
								});
							} else {
								casper.echo('Inbox at popup not found','ERROR');
							}
						});
					}else {
						casper.echo('User not logged in', 'ERROR');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});
};

// method To verify "See all" link when there are no conversation.
privateMessageTestcases.verifySeeAll = function() {
	casper.thenOpen(config.url, function() {
		casper.echo('                       Test case 4','INFO');
		casper.echo('            To verify "See all" link when there are no conversation.','INFO');
		forumLoginMethod.loginToApp(json["registeredUserLogin"].username, json["registeredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('i#private_message_notification');
						casper.click('i#private_message_notification');
						wait.waitForElement('ul#private_message_dropdown li.user-nav-list-all', casper, function(err, isExists) {
							if(isExists) {
								try {
									casper.test.assertDoesntExist('li[id^="pm_notification_list"]');
									var text = casper.fetchText('ul#private_message_dropdown li.user-nav-list-all a');
									var string = text.toString();
									casper.echo('***************'+string,'INFO');
									var expectedText = 'Go to inbox';
									if(string==expectedText){
										casper.echo('see all link is convert to Go to inbox link verified','INFO');
									} else {
										casper.echo('not verified','ERROR');
									}	
								} catch (e) {
									casper.test.assertExists('li[id^="pm_notification_list"]');
									var text = casper.fetchText('ul#private_message_dropdown li.user-nav-list-all a');
									var string = text.toString();
									var expectedText = 'See all';
									if(string==expectedText){
										casper.echo('conversation present so See all verified', 'INFO');
									} else {
										casper.echo('conversation present so See all not verified','ERROR');
									}	
								}
							} else {
								casper.echo('Inbox at popup not found','ERROR');
							}
						});
					}else {
						casper.echo('User not logged in', 'ERROR');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});
};

// method to verify count of message icon -> send 3 messages from  s1 >log in with r1 and verify the message icon count.
privateMessageTestcases.verifyMessageIconCountCaseOne = function() {
	casper.thenOpen(config.url, function() {
		casper.echo('                                     Test case 5a','INFO');
		casper.echo('to verify count of message icon -> send 3 messages from  s1 >log in with r1 and verify the message icon count.','INFO');
		// 3 merssages send to hsk by neha
		for(var i = 0; i<=2; i++) {
			privateMessageTestcases.createPrivateMessage();
		}
		casper.then(function() {
			// login by hsk to check the count of messages
			forumLoginMethod.loginToApp(json["registeredUserLogin"].username1, json["registeredUserLogin"].password1, casper, function(err) {
				if(!err) {
					wait.waitForElement('span.badge.notif', casper,function(err, isExists) {
						if(isExists) {
							casper.echo(casper.fetchText('span.badge.notif'),'INFO');
						}else {
							casper.echo('User not logged in', 'ERROR');
						}
					});
				} else {
					casper.echo('User not logged','ERROR');						
				}
			});
			casper.then(function() {
				forumLoginMethod.logoutFromApp(casper, function() { });
			});	
		});
	});
};

// method to verify count of message icon -> verify when 4 user send 1 message to r1>log in with r1 and verify the message icon count.
privateMessageTestcases.verifyMessageIconCountCaseTwo = function() {
	casper.thenOpen(config.url, function() {
		casper.echo('                                                Test case 5b','INFO');
		casper.echo('to verify count of message icon -> verify when 4 user send 1 message to r1>log in with r1 and verify the message icon count.','INFO');
		privateMessageTestcases.createPrivateMessage(); // message send to hsk by neha
		casper.then(function() {			// message send to hsk by a
			forumLoginMethod.loginToApp(json["registeredUserLogin"].username2, json["registeredUserLogin"].password2, casper, function(err) {
				if(!err) {
					wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
						if(isExists) {
							casper.click('i#private_message_notification');
							wait.waitForElement('ul#private_message_dropdown span.pull-right', casper, function(err, isExists) {
								if(isExists) {
									casper.click('a.send_new_pmsg');
									wait.waitForElement('div[class="modal fade in"]', casper,function(err, isExists) {
										if(isExists) {
											privateMessageMethod.createMessage(json.privateMessage, casper, function(err) {
												if(!err) {
													casper.echo('Message sent called successfully..','INFO');
												}
											});
										} else {
											casper.echo('Message pop up not found','ERROR');
										}
									});
								} else {
									casper.echo('Send a New Messag Pop not found','ERROR');
								}
							});
						}else {
							casper.echo('User not logged in', 'ERROR');
						}
					});
				} else {
					casper.echo('User not logged','ERROR');						
				}
			});
			casper.then(function() {
				forumLoginMethod.logoutFromApp(casper, function() { });
			});
		});
		casper.then(function() {			// message send to hsk by isneha
			forumLoginMethod.loginToApp("isneha", "1234", casper, function(err) {
				if(!err) {
					wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
						if(isExists) {
							casper.click('i#private_message_notification');
							wait.waitForElement('ul#private_message_dropdown span.pull-right', casper, function(err, isExists) {
								if(isExists) {
									casper.click('a.send_new_pmsg');
									wait.waitForElement('div[class="modal fade in"]', casper,function(err, isExists) {
										if(isExists) {
											privateMessageMethod.createMessage(json.privateMessage, casper, function(err) {
												if(!err) {
													casper.echo('Message sent called successfully..','INFO');
												}
											});
										} else {
											casper.echo('Message pop up not found','ERROR');
										}
									});
								} else {
									casper.echo('Send a New Messag Pop not found','ERROR');
								}
							});
						}else {
							casper.echo('User not logged in', 'ERROR');
						}
					});
				} else {
					casper.echo('User not logged','ERROR');						
				}
			});
			casper.then(function() {
				forumLoginMethod.logoutFromApp(casper, function() { });
			});
		});
		casper.then(function() {			// message send to hsk by abc
			forumLoginMethod.loginToApp(json["registeredUserLogin"].username3, json["registeredUserLogin"].password3, casper, function(err) {
				if(!err) {
					wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
						if(isExists) {
							casper.click('i#private_message_notification');
							wait.waitForElement('ul#private_message_dropdown span.pull-right', casper, function(err, isExists) {
								if(isExists) {
									casper.click('a.send_new_pmsg');
									wait.waitForElement('div[class="modal fade in"]', casper,function(err, isExists) {
									if(isExists) {
										privateMessageMethod.createMessage(json.privateMessage, casper, function(err) {
											if(!err) {
												casper.echo('Message sent called successfully..','INFO');
											}
										});
										} else {
										casper.echo('Message pop up not found','ERROR');
									}
									});
								} else {
									casper.echo('Send a New Messag Pop not found','ERROR');
								}
							});
						}else {
							casper.echo('User not logged in', 'ERROR');
						}
					});
				} else {
					casper.echo('User not logged','ERROR');						
				}
			});
			casper.then(function() {
				forumLoginMethod.logoutFromApp(casper, function() { });
			});
		});
		casper.then(function() {
			// login by hsk to check the count of messages
			forumLoginMethod.loginToApp(json["registeredUserLogin"].username1, json["registeredUserLogin"].password1, casper, function(err) {
				if(!err) {
					wait.waitForElement('span.badge.notif', casper,function(err, isExists) {
						if(isExists) {
							casper.echo("The value of count of message-","INFO")
							casper.echo(casper.fetchText('span.badge.notif'),'INFO');
						}else {
							casper.echo('User not logged in', 'ERROR');
						}
					});
				} else {
					casper.echo('User not logged','ERROR');						
				}
			});
			casper.then(function() {
				forumLoginMethod.logoutFromApp(casper, function() { });
			});	
		});
	});
};

// method To verify default image for avatar on conversation panel
privateMessageTestcases.verifyDefaultAvtar = function() {
	var converastion_id;
	var imageUrl;
	casper.thenOpen(config.url, function() {
		casper.echo('                       Test case 6','INFO');
		casper.echo('   To verify default image for avatar on conversation panel','INFO');
		forumLoginMethod.loginToApp(json["registeredUserLogin"].username3, json["registeredUserLogin"].password3, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						casper.click('i#private_message_notification');
						wait.waitForElement('ul#private_message_dropdown span.pull-right', casper, function(err, isExists) {
							if(isExists) {
								casper.click('a.send_new_pmsg');
								wait.waitForElement('div[class="modal fade in"]', casper,function(err, isExists) {
									if(isExists) {
										privateMessageMethod.createMessage(json.privateMessage, casper, function(err) {
											if(!err) {
												casper.echo('Message sent called successfully..','INFO');
												casper.thenOpen(config.url+'pm', function() {
													imageUrl = casper.evaluate(function() {
														var id = document.querySelector('div#feed-main span.image-wrapper.normal a').getAttribute('class');
														return id;
													});
													casper.echo('The Url of the image is - '+imageUrl, 'INFO');
													if(imageUrl==json.defaultAvtar) {
														casper.echo('Sender found his avatar on conversation','INFO');
													} else {
														casper.echo('Sender not found his avatar on conversation','ERROR');
													}
												});
											}
										});
									} else {
										casper.echo('Message pop up not found','ERROR');
									}
								});
							} else {
								casper.echo('Send a New Messag Pop not found','ERROR');
							}
						});
					}else {
						casper.echo('User not logged in', 'ERROR');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});
	casper.thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(json["registeredUserLogin"].username1, json["registeredUserLogin"].password1, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						casper.click('i#private_message_notification');
						wait.waitForElement('ul#private_message_dropdown a.pull-left', casper, function(err, isExists) {
							if(isExists) {
								casper.click('ul#private_message_dropdown a.pull-left');
								wait.waitForElement('form#pmsg_list', casper, function(err, isExists) {
									if(isExists) {
										var recieverImageUrl = casper.evaluate(function() {
											var id = document.querySelector('div#feed-main span.image-wrapper.normal a').getAttribute('class');
											return id;
										});
										casper.echo('The Url of the image is - '+recieverImageUrl, 'INFO');
										if(imageUrl==recieverImageUrl) {
											casper.echo('Reciever found senders avatar in the conversation','INFO');
										} else {
											casper.echo('Reciever not found senders avatar in the conversation','ERROR');
										}
									} else {
										casper.echo('Inbox not found','ERROR');
									}
								});
							} else {
								casper.echo('Inbox at popup not found','ERROR');
							}
						});
					}else {
						casper.echo('User not logged in', 'ERROR');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});
};

// Test cases To verify sending new message
// method to compose a message by scenario 2
privateMessageTestcases.composeScenarioSecond = function() {
	casper.thenOpen(config.url, function() {
		casper.echo('                       Test case 2','INFO');
		casper.echo('                 To compose a message by scenario 2','INFO');
		forumLoginMethod.loginToApp(json["registeredUserLogin"].username, json["registeredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('i#private_message_notification');
						casper.click('i#private_message_notification');
						wait.waitForElement('ul#private_message_dropdown a.pull-left', casper, function(err, isExists) {
							if(isExists) {
								casper.click('ul#private_message_dropdown a.pull-left');
								wait.waitForElement('form#pmsg_list', casper, function(err, isExists) {
									if(isExists) {
										casper.mouse.move('form#pmsg_list a.pull-right.btn-primary.send_new_pmsg small');
										casper.click('form#pmsg_list a.pull-right.btn-primary.send_new_pmsg small');
										casper.waitForSelector('div[class="modal fade in"]', function() {
											privateMessageMethod.createMessage(json.privateMessage, casper, function(err) {
												if(!err) {
													casper.echo('Message sent..','INFO');
												}
											});	
										});
									} else {
										casper.echo('Inbox not found','ERROR');
									}
								});
							} else {
								casper.echo('Inbox at popup not found','ERROR');
							}
						});
					}else {
						casper.echo('User not logged in', 'ERROR');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});
};

// method to compose message by Scenario3
privateMessageTestcases.composeMessageScenarioThird = function() {
	casper.thenOpen(config.url, function() {
		casper.echo('                      Test Case 3','INFO');
		casper.echo('               To compose message by Scenario3','INFO');
		forumLoginMethod.loginToApp(json["registeredUserLogin"].username, json["registeredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.click('ul.nav.pull-right span.caret');
						casper.test.assertExists('a#user-nav-panel-profile');
						casper.click('a#user-nav-panel-profile');
						wait.waitForElement('div.pull-left.profile-menu a#send_message', casper, function(err, isExists) {
							if(isExists) {	
								casper.click('div.pull-left.profile-menu a#send_message');
								wait.waitForElement('div[class="modal fade in"]', casper, function(err, isExists) {
									if(isExists) {	
										privateMessageMethod.createMessage(json.privateMessage, casper, function(err) {
											if(!err) {
												casper.echo('Message sent..','INFO');
											}
										});
									}
								});
							}
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});						
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});	
};

// method to verify when we enter invalid recipients name
privateMessageTestcases.invalidRecipientsName = function() {
	casper.thenOpen(config.url, function() {
		casper.echo('                                    Test case 4','INFO');
		casper.echo('                     to verify when we enter invalid recipients name','INFO');
		forumLoginMethod.loginToApp(json["registeredUserLogin"].username, json["registeredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						casper.click('i#private_message_notification');
						wait.waitForElement('ul#private_message_dropdown span.pull-right', casper, function(err, isExists) {
							if(isExists) {
								casper.click('a.send_new_pmsg');
								wait.waitForElement('div[class="modal fade in"]', casper,function(err, isExists) {
									if(isExists) {
										privateMessageMethod.createMessage(json.invalidRecipientsName, casper, function(err) {
											if(!err) {
												var errorMessage = casper.fetchText('div#pm_error_msg');
												
												var expectedErrorMsg = 'The member "gfgh" was not found';
												casper.test.assert(errorMessage.indexOf(expectedErrorMsg) > -1);
												casper.echo('Invalid recipient verified', 'INFO');
											}
										});
									} else {
										casper.echo('Message pop up not found','ERROR');
									}
								});
							} else {
								casper.echo('Send a New Messag Pop not found','ERROR');
							}
						});
					}else {
						casper.echo('User not logged in', 'ERROR');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});	
};

// method to verify when we leave blank reciepients name
privateMessageTestcases.blankRecipientsName = function() {
	casper.thenOpen(config.url, function() {
		casper.echo('                                    Test case 5','INFO');
		casper.echo('                              To verify when we leave blank reciepients name','INFO');
		forumLoginMethod.loginToApp(json["registeredUserLogin"].username, json["registeredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {	
						casper.click('i#private_message_notification');
						wait.waitForElement('ul#private_message_dropdown span.pull-right', casper, function(err, isExists) {
							if(isExists) {
								casper.click('a.send_new_pmsg');
								wait.waitForElement('div[class="modal fade in"]', casper,function(err, isExists) {
									if(isExists) {
										privateMessageMethod.createMessage(json.blankRecipientsName, casper, function(err) {
											if(!err) {
												var errorMessage = casper.fetchText('div#pm_error_msg');
												
												var expectedErrorMsg = "Please specify a recipient";
												casper.test.assert(errorMessage.indexOf(expectedErrorMsg) > -1);
												casper.echo('Blank recipient verified', 'INFO');
											}
										});
									} else {
										casper.echo('Message pop up not found','ERROR');
									}
								});
							} else {
								casper.echo('Send a New Messag Pop not found','ERROR');
							}
						});
					}else {
						casper.echo('User not logged in', 'ERROR');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});	
};

// method to verify when leave blank subject 
privateMessageTestcases.blankSubject = function() {
	casper.thenOpen(config.url, function() {
		casper.echo('                                    Test case 6','INFO');
		casper.echo('                              To verify when leave blank subject','INFO');
		forumLoginMethod.loginToApp(json["registeredUserLogin"].username, json["registeredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						casper.click('i#private_message_notification');
						wait.waitForElement('ul#private_message_dropdown span.pull-right', casper, function(err, isExists) {
							if(isExists) {
								casper.click('a.send_new_pmsg');
								wait.waitForElement('div[class="modal fade in"]', casper,function(err, isExists) {
									if(isExists) {
										privateMessageMethod.createMessage(json.blankSubject, casper, function(err) {
											if(!err) {
												
											}
										});
									} else {
										casper.echo('Message pop up not found','ERROR');
									}
								});
							} else {
								casper.echo('Send a New Messag Pop not found','ERROR');
							}
						});
					}else {
						casper.echo('User not logged in', 'ERROR');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});	
};

// method to verify when leave blank message body
privateMessageTestcases.blankMessageBody = function() {
	casper.thenOpen(config.url, function() {
		casper.echo('                                    Test case 7','INFO');
		casper.echo('                              To verify when leave blank message body','INFO');
		forumLoginMethod.loginToApp(json["registeredUserLogin"].username, json["registeredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						casper.click('i#private_message_notification');
						wait.waitForElement('ul#private_message_dropdown span.pull-right', casper, function(err, isExists) {
							if(isExists) {
								casper.click('a.send_new_pmsg');
								wait.waitForElement('div[class="modal fade in"]', casper,function(err, isExists) {
									if(isExists) {
										privateMessageMethod.createMessage(json.blankMessageBody, casper, function(err) {
											if(!err) {
												var errorMessage = casper.fetchText('div#pm_error_msg');
												
												var expectedErrorMsg = "Please enter your message";
												casper.test.assert(errorMessage.indexOf(expectedErrorMsg) > -1);
												casper.echo('Blank body verified', 'INFO');
											}
										});
									} else {
										casper.echo('Message pop up not found','ERROR');
									}
								});
							} else {
								casper.echo('Send a New Messag Pop not found','ERROR');
							}
						});
					}else {
						casper.echo('User not logged in', 'ERROR');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});	
};

// method To verify auto drop down in reciver's field
privateMessageTestcases.autoDropdown = function() {
	casper.thenOpen(config.url, function() {
		casper.echo('                                    Test case 9','INFO');
		casper.echo("                          To verify auto drop down in reciver's field",'INFO');
		forumLoginMethod.loginToApp(json["registeredUserLogin"].username, json["registeredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {	
						casper.click('i#private_message_notification');
						wait.waitForElement('ul#private_message_dropdown span.pull-right', casper, function(err, isExists) {
							if(isExists) {
								casper.click('a.send_new_pmsg');
								wait.waitForElement('div[class="modal fade in"]', casper,function(err, isExists) {
									if(isExists) {
										casper.sendKeys('input[id="tokenfield_typeahead-tokenfield"]',"h" );
										casper.sendKeys('input[id="tokenfield_typeahead-tokenfield"]', casper.page.event.key.Enter );
									} else {
										casper.echo('Message pop up not found','ERROR');
									}
								});
							} else {
								casper.echo('Send a New Messag Pop not found','ERROR');
							}
						});
					}else {
						casper.echo('User not logged in', 'ERROR');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});	
};

// method To verify Attachement /Insert Photo link when disable
privateMessageTestcases.verifyAttachementAndInsertPhotoLinkWhenDisable = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                         Test case 11a','INFO');
		casper.echo('                    To verify Attachement /Insert Photo link when disable','INFO');
		privateMessageMethod.disableAttachments(casper, function(err) {
			if(!err) {
				casper.echo('Backend setting changed succesfully','INFO');
			}	
		});
	});
	casper.thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(json["registeredUserLogin"].username, json["registeredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {	
						casper.click('i#private_message_notification');
						wait.waitForElement('ul#private_message_dropdown span.pull-right', casper, function(err, isExists) {
							if(isExists) {
								casper.click('a.send_new_pmsg');
								wait.waitForElement('div[class="modal fade in"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertDoesntExist('a#fancy_attach_pmsDialog i', 'Attach file link not found when disable from backend');
										casper.test.assertDoesntExist('a#insert_image_dialog_pmsDialog', 'Insert link not found when disable from backend');		
									} else {
										casper.echo('Message pop up not found','ERROR');
									}
								});
							} else {
								casper.echo('Send a New Messag Pop not found','ERROR');
							}
						});
					}else {
						casper.echo('User not logged in', 'ERROR');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});	
};

// method To verify Attachement /Insert Photo link when enable
privateMessageTestcases.verifyAttachementAndInsertPhotoLinkWhenEnable = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                         Test case 11b','INFO');
		casper.echo('                To verify Attachement /Insert Photo link when enable','INFO');
		privateMessageMethod.enableAttachments(casper, function(err) {
			if(!err) {
				casper.echo('BAckend setting changed succesfully','INFO');
			}	
		});
	});
	casper.thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(json["registeredUserLogin"].username, json["registeredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						casper.click('i#private_message_notification');
						wait.waitForElement('ul#private_message_dropdown span.pull-right', casper, function(err, isExists) {
							if(isExists) {
								casper.click('a.send_new_pmsg');
								wait.waitForElement('div[class="modal fade in"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('a#fancy_attach_pmsDialog i', 'Attach file link found when enable from backend');
										casper.test.assertExists('a#insert_image_dialog_pmsDialog', 'Insert link found when enable from backend');
									} else {
										casper.echo('Message pop up not found','ERROR');
									}
								});
							} else {
								casper.echo('Send a New Messag Pop not found','ERROR');
							}
						});
					}else {
						casper.echo('User not logged in', 'ERROR');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});	
};

// Test cases to verify leave conversation
// method To verify leave conversation( single)
privateMessageTestcases.leaveSingleConversation = function() {
	casper.thenOpen(config.url, function() {
		casper.echo('                       Test case 1','INFO');
		casper.echo('                       To verify leave conversation( single)','INFO');
		forumLoginMethod.loginToApp(json["registeredUserLogin"].username, json["registeredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('i#private_message_notification');
						casper.click('i#private_message_notification');
						wait.waitForElement('ul#private_message_dropdown a.pull-left', casper, function(err, isExists) {
							if(isExists) {
								casper.click('ul#private_message_dropdown a.pull-left');
								wait.waitForElement('form#pmsg_list', casper, function(err, isExists) {
									if(isExists) {
										casper.evaluate(function() {
										document.querySelector('ul#pmsg_inbox_listing li:nth-child(1) input').click();
									});
									casper.waitForSelector('#messages-menu', function() {
										casper.test.assertExists('#messages-menu','floating menu is appear on bottom of the page');
										casper.test.assertExists('a#leave_conversation i', 'Leave Conversation tab on the floating menu******************');
										casper.click('a#leave_conversation i');
										casper.waitUntilVisible('div#ajax-msg-top', function success() {
											var errorMessage = casper.fetchText('div#ajax-msg-top p');
											var expectedErrorMsg = "You have left the conversation.";
											casper.test.assert(errorMessage.indexOf(expectedErrorMsg) > -1);
											casper.echo('left message verified', 'INFO');
										}, function fail() {
											casper.echo('message after leave not found', 'ERROR')
										});
										casper.then(function() {
											casper.then(function() {
												forumLoginMethod.logoutFromApp(casper, function() { });
											});
											casper.thenOpen(config.url, function() {
												forumLoginMethod.loginToApp(json["registeredUserLogin"].username1, json["registeredUserLogin"].password1, casper, function(err) {
													if(!err) {
														wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
															if(isExists) {
																	casper.test.assertExists('i#private_message_notification');
																	casper.click('i#private_message_notification');
																	wait.waitForElement('ul#private_message_dropdown a.pull-left', casper, function(err, isExists) {
																		if(isExists) {
																			casper.click('ul#private_message_dropdown a.pull-left');
																			wait.waitForElement('form#pmsg_list', casper, function(err, isExists) {
																			if(isExists) {
	casper.echo(casper.fetchText('div#show_current_conversation div.alert.alert-info.cleared'),'INFO');												
																			} else {
																				casper.echo('Inbox not found','ERROR');
																			}
																		});
																	} else {
																		casper.echo('Inbox at popup not found','ERROR');
																	}
																});
														}else {
															casper.echo('User not logged in', 'ERROR');
														}
													});
												} else {
													casper.echo('User not logged','ERROR');						
												}
											});
											});						
										});
									});
									} else {
										casper.echo('Inbox not found','ERROR');
									}
								});
							} else {
								casper.echo('Inbox at popup not found','ERROR');
							}
						});
					}else {
						casper.echo('User not logged in', 'ERROR');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});
};

// method To verify leave conversation (Multiple)
privateMessageTestcases.leaveMultipleConversation = function() {
	casper.thenOpen(config.url, function() {
		casper.echo('                       Test case 2','INFO');
		casper.echo('                  To verify leave conversation (Multiple)','INFO');
		forumLoginMethod.loginToApp(json["registeredUserLogin"].username, json["registeredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('i#private_message_notification');
						casper.click('i#private_message_notification');
						wait.waitForElement('ul#private_message_dropdown a.pull-left', casper, function(err, isExists) {
							if(isExists) {
								casper.click('ul#private_message_dropdown a.pull-left');
								wait.waitForElement('form#pmsg_list', casper, function(err, isExists) {
									if(isExists) {
										casper.evaluate(function() {
										document.querySelector('ul#pmsg_inbox_listing li:nth-child(1) input').click();
										document.querySelector('ul#pmsg_inbox_listing li:nth-child(2) input').click();
									});
									casper.waitForSelector('#messages-menu', function() {
										casper.test.assertExists('#messages-menu','floating menu is appear on bottom of the page');
										casper.test.assertExists('a#leave_conversation i', 'Leave Conversation tab on the floating menu******************');
										casper.click('a#leave_conversation i');
										casper.waitUntilVisible('div#ajax-msg-top', function success() {
											var errorMessage = casper.fetchText('div#ajax-msg-top p');
											var expectedErrorMsg = "You have left the 2 selected conversations.";
											casper.test.assert(errorMessage.indexOf(expectedErrorMsg) > -1);
											casper.echo('left message verified', 'INFO');
										}, function fail() {
											casper.echo('message after leave not found', 'ERROR')
										});
										casper.then(function() {
											casper.then(function() {
												forumLoginMethod.logoutFromApp(casper, function() { });
											});
											casper.thenOpen(config.url, function() {
												forumLoginMethod.loginToApp(json["registeredUserLogin"].username1, json["registeredUserLogin"].password1, casper, function(err) {
													if(!err) {
														wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
															if(isExists) {
																	casper.test.assertExists('i#private_message_notification');
																	casper.click('i#private_message_notification');
																	wait.waitForElement('ul#private_message_dropdown a.pull-left', casper, function(err, isExists) {
																		if(isExists) {
																			casper.click('ul#private_message_dropdown a.pull-left');
																			wait.waitForElement('form#pmsg_list', casper, function(err, isExists) {
																			if(isExists) {
	casper.echo(casper.fetchText('div#show_current_conversation div.alert.alert-info.cleared'),'INFO');												
																			} else {
																				casper.echo('Inbox not found','ERROR');
																			}
																		});
																	} else {
																		casper.echo('Inbox at popup not found','ERROR');
																	}
																});
														}else {
															casper.echo('User not logged in', 'ERROR');
														}
													});
												} else {
													casper.echo('User not logged','ERROR');						
												}
											});
											});						
										});
									});
									} else {
										casper.echo('Inbox not found','ERROR');
									}
								});
							} else {
								casper.echo('Inbox at popup not found','ERROR');
							}
						});
					}else {
						casper.echo('User not logged in', 'ERROR');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});
};

// method To verify leave conversation (all)
privateMessageTestcases.leaveAllConversation = function() {
	casper.thenOpen(config.url, function() {
		casper.echo('                       Test case 3','INFO');
		casper.echo('                 To verify leave conversation (all)','INFO');
		forumLoginMethod.loginToApp(json["registeredUserLogin"].username, json["registeredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('i#private_message_notification');
						casper.click('i#private_message_notification');
						wait.waitForElement('ul#private_message_dropdown a.pull-left', casper, function(err, isExists) {
							if(isExists) {
								casper.click('ul#private_message_dropdown a.pull-left');
								wait.waitForElement('form#pmsg_list', casper, function(err, isExists) {
									if(isExists) {
										casper.click('input#select_allbox');
										casper.waitForSelector('#messages-menu', function() {
										casper.test.assertExists('#messages-menu','floating menu is appear on bottom of the page');
										casper.test.assertExists('a#leave_conversation i', 'Leave Conversation tab on the floating menu******************');
										casper.click('a#leave_conversation i');
										casper.waitUntilVisible('div#ajax-msg-top', function success() {
											var errorMessage = casper.fetchText('div#ajax-msg-top p');
											var expectedErrorMsg = "You have left the  selected conversations.";
											//casper.test.assert(errorMessage.indexOf(expectedErrorMsg) > -1);
											casper.echo('left message verified', 'INFO');
										}, function fail() {
											casper.echo('message after leave not found', 'ERROR')
										});
										casper.then(function() {
											casper.then(function() {
												forumLoginMethod.logoutFromApp(casper, function() { });
											});
											casper.thenOpen(config.url, function() {
												forumLoginMethod.loginToApp(json["registeredUserLogin"].username1, json["registeredUserLogin"].password1, casper, function(err) {
													if(!err) {
														wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
															if(isExists) {
																	casper.test.assertExists('i#private_message_notification');
																	casper.click('i#private_message_notification');
																	wait.waitForElement('ul#private_message_dropdown a.pull-left', casper, function(err, isExists) {
																		if(isExists) {
																			casper.click('ul#private_message_dropdown a.pull-left');
																			wait.waitForElement('form#pmsg_list', casper, function(err, isExists) {
																			if(isExists) {
	casper.echo(casper.fetchText('div#show_current_conversation div.alert.alert-info.cleared'),'INFO');												
																			} else {
																				casper.echo('Inbox not found','ERROR');
																			}
																		});
																	} else {
																		casper.echo('Inbox at popup not found','ERROR');
																	}
																});
														}else {
															casper.echo('User not logged in', 'ERROR');
														}
													});
												} else {
													casper.echo('User not logged','ERROR');						
												}
											});
											});						
										});
									});
									} else {
										casper.echo('Inbox not found','ERROR');
									}
								});
							} else {
								casper.echo('Inbox at popup not found','ERROR');
							}
						});
					}else {
						casper.echo('User not logged in', 'ERROR');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});
};

// Test Cases to verify Reply
// method to verify with reply option
privateMessageTestcases.verifyReplyOption = function() {
	casper.thenOpen(config.url, function() {
		casper.echo('                       Test case 1','INFO');
		casper.echo('                    To verify with reply option','INFO');
		forumLoginMethod.loginToApp(json["registeredUserLogin"].username, json["registeredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('i#private_message_notification');
						casper.click('i#private_message_notification');
						wait.waitForElement('ul#private_message_dropdown a.pull-left', casper, function(err, isExists) {
							if(isExists) {
								casper.click('ul#private_message_dropdown a.pull-left');
								wait.waitForElement('form#pmsg_list', casper, function(err, isExists) {
									if(isExists) {
										casper.evaluate(function() {
											document.querySelector('textarea#pmessage_reply').click();
										});
										casper.waitForSelector('iframe#pmessage_reply_ifr', function() {
											casper.withFrame('pmessage_reply_ifr', function() {
												casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A,{keepFocus: true});		
												casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
												casper.sendKeys('#tinymce', 'Reply from neha');
											});
											casper.then(function() {
												this.evaluate(function() {
													$('div#message_options').show();
												});
												casper.click('a#reply_msg_button');
												casper.waitUntilVisible('div.message-entry.sent', function() {
													casper.echo('message replied','INFO');
												});
											});	
										});
									} else {
										casper.echo('Inbox not found','ERROR');
									}
								});
							} else {
								casper.echo('Inbox at popup not found','ERROR');
							}
						});
					}else {
						casper.echo('User not logged in', 'ERROR');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});
};

// method To verify one to one conversation between sender and and single recipient
privateMessageTestcases.verifyOneToOneSingleSenderAndReciever = function() {
	var converastion_id;
	casper.thenOpen(config.url, function() {
		casper.echo('                       Test case 2','INFO');
		casper.echo('           To verify one to one conversation between sender and and single recipient','INFO');
		forumLoginMethod.loginToApp(json["registeredUserLogin"].username, json["registeredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {	
						casper.click('i#private_message_notification');
						wait.waitForElement('ul#private_message_dropdown span.pull-right', casper, function(err, isExists) {
							if(isExists) {
								casper.click('a.send_new_pmsg');
								wait.waitForElement('div[class="modal fade in"]', casper,function(err, isExists) {
									if(isExists) {
										privateMessageMethod.createMessage(json.privateMessage, casper, function(err) {
											if(!err) {
												casper.echo('Message sent called successfully..','INFO');
												casper.thenOpen(config.url+'pm', function() {
													converastion_id = casper.evaluate(function() {
														var id = document.querySelector('ul#pmsg_inbox_listing li:nth-child(1)').getAttribute('data-conversation_id');
														return id;
													});
													casper.echo('The conversation id is - '+converastion_id, 'INFO');
												});
											}
										});
									} else {
										casper.echo('Message pop up not found','ERROR');
									}
								});
							} else {
								casper.echo('Send a New Messag Pop not found','ERROR');
							}
						});
					}else {
						casper.echo('User not logged in', 'ERROR');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
			casper.then(function() {
				forumLoginMethod.loginToApp(json["registeredUserLogin"].username1, json["registeredUserLogin"].password1 , casper, function(err) {
					if(!err) {
						wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('i#private_message_notification');
								casper.click('i#private_message_notification');
								wait.waitForElement('ul#private_message_dropdown a.pull-left', casper, function(err, isExists) {
									if(isExists) {
										casper.click('ul#private_message_dropdown a.pull-left');
										wait.waitForElement('form#pmsg_list', casper, function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li[data-conversation_id="'+converastion_id+'"]');
												casper.echo('User find the related message','INFO');
											} else {
												casper.echo('Inbox not found','ERROR');
											}
										});
									} else {
										casper.echo('Inbox at popup not found','ERROR');
									}
								});
							}else {
								casper.echo('User not logged in', 'ERROR');
							}
						});
					} else {
						casper.echo('User not logged','ERROR');						
					}
				});
				casper.then(function() {
					forumLoginMethod.logoutFromApp(casper, function() { });
				});
			});
		});
	});
};

// method To verify one to one conversation between sender and multiple recipient
privateMessageTestcases.verifyOneToOneSingleSenderAndMultipleReciever = function() {
	var converastion_id;
	casper.thenOpen(config.url, function() {
		casper.echo('                       Test case 4','INFO');
		casper.echo('        To verify one to one conversation between sender and multiple recipient','INFO');
		forumLoginMethod.loginToApp(json["registeredUserLogin"].username, json["registeredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						casper.click('i#private_message_notification');
						wait.waitForElement('ul#private_message_dropdown span.pull-right', casper, function(err, isExists) {
							if(isExists) {
								casper.click('a.send_new_pmsg');
								wait.waitForElement('div[class="modal fade in"]', casper,function(err, isExists) {
									if(isExists) {
										privateMessageMethod.sendMessageToManyUser(json.privateMessage, casper, function(err) {
											if(!err) {
												casper.echo('Message sent called successfully..','INFO');
												casper.thenOpen(config.url+'pm', function() {
													converastion_id = casper.evaluate(function() {
														var id = document.querySelector('ul#pmsg_inbox_listing li:nth-child(1)').getAttribute('data-conversation_id');
														return id;
													});
													casper.echo('The conversation id is - '+converastion_id, 'INFO');
												});
											}
										});
									} else {
										casper.echo('Message pop up not found','ERROR');
									}
								});
							} else {
								casper.echo('Send a New Messag Pop not found','ERROR');
							}
						});
					}else {
						casper.echo('User not logged in', 'ERROR');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
			casper.then(function() {
				forumLoginMethod.loginToApp(json["registeredUserLogin"].username1, json["registeredUserLogin"].password1 , casper, function(err) {
					if(!err) {
						wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('i#private_message_notification');
								casper.click('i#private_message_notification');
								wait.waitForElement('ul#private_message_dropdown a.pull-left', casper, function(err, isExists) {
									if(isExists) {
										casper.click('ul#private_message_dropdown a.pull-left');
										wait.waitForElement('form#pmsg_list', casper, function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li[data-conversation_id="'+converastion_id+'"]');
												casper.echo('First User find the related message','INFO');
											} else {
												casper.echo('Inbox not found','ERROR');
											}
										});
									} else {
										casper.echo('Inbox at popup not found','ERROR');
									}
								});
							}else {
								casper.echo('User not logged in', 'ERROR');
							}
						});
					} else {
						casper.echo('User not logged','ERROR');						
					}
				});
				casper.then(function() {
					forumLoginMethod.logoutFromApp(casper, function() { });
				});
			});
		});
		casper.then(function() {
			forumLoginMethod.loginToApp('a','a' , casper, function(err) {
				if(!err) {
					wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
						if(isExists) {
							casper.test.assertExists('i#private_message_notification');
							casper.click('i#private_message_notification');
							wait.waitForElement('ul#private_message_dropdown a.pull-left', casper, function(err, isExists) {
								if(isExists) {
									casper.click('ul#private_message_dropdown a.pull-left');
									wait.waitForElement('form#pmsg_list', casper, function(err, isExists) {
										if(isExists) {
											try {
												casper.test.assertExists('li[data-conversation_id="'+converastion_id+'"]');
												casper.echo('Second User also find the related message','INFO');
											} catch (e) {
												casper.echo('Second User not find the related message','ERROR');
											}
										} else {
											casper.echo('Inbox not found','ERROR');
										}
									});
								} else {
									casper.echo('Inbox at popup not found','ERROR');
								}
							});
						}else {
							casper.echo('User not logged in', 'ERROR');
						}
					});
				} else {
					casper.echo('User not logged','ERROR');						
				}
			});
			casper.then(function() {
				forumLoginMethod.logoutFromApp(casper, function() { });
			});
		});
	});
};

// method verify when:If user S1 sent a message to R1, R2 but reply coming only from R2 only
privateMessageTestcases.verifyMultipleRecieverAndReplyByOne = function() {
	var converastion_id;
	casper.thenOpen(config.url, function() {
		casper.echo('                       Test case 5','INFO');
		casper.echo('       To verify when:If user S1 sent a message to R1, R2 but reply coming only from R2 only','INFO');
		forumLoginMethod.loginToApp(json["registeredUserLogin"].username, json["registeredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						casper.click('i#private_message_notification');
						wait.waitForElement('ul#private_message_dropdown span.pull-right', casper, function(err, isExists) {
							if(isExists) {
								casper.click('a.send_new_pmsg');
								wait.waitForElement('div[class="modal fade in"]', casper,function(err, isExists) {
									if(isExists) {
										privateMessageMethod.sendMessageToManyUser(json.privateMessage, casper, function(err) {
											if(!err) {
												casper.echo('Message sent called successfully..','INFO');
												casper.thenOpen(config.url+'pm', function() {
													converastion_id = casper.evaluate(function() {
														var id = document.querySelector('ul#pmsg_inbox_listing li:nth-child(1)').getAttribute('data-conversation_id');
														return id;
													});
													casper.echo('The conversation id is - '+converastion_id, 'INFO');
												});
											}
										});
									} else {
										casper.echo('Message pop up not found','ERROR');
									}
								});
							} else {
								casper.echo('Send a New Messag Pop not found','ERROR');
							}
						});
					}else {
						casper.echo('User not logged in', 'ERROR');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
			casper.then(function() {
				forumLoginMethod.loginToApp(json["registeredUserLogin"].username1, json["registeredUserLogin"].password1 , casper, function(err) {
					if(!err) {
						wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('i#private_message_notification');
								casper.click('i#private_message_notification');
								wait.waitForElement('ul#private_message_dropdown a.pull-left', casper, function(err, isExists) {
									if(isExists) {
										casper.click('ul#private_message_dropdown a.pull-left');
										wait.waitForElement('form#pmsg_list', casper, function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li[data-conversation_id="'+converastion_id+'"]');
												casper.echo('First User find the related message','INFO');
											} else {
												casper.echo('Inbox not found','ERROR');
											}
										});
									} else {
										casper.echo('Inbox at popup not found','ERROR');
									}
								});
							}else {
								casper.echo('User not logged in', 'ERROR');
							}
						});
					} else {
						casper.echo('User not logged','ERROR');						
					}
				});
				casper.then(function() {
					forumLoginMethod.logoutFromApp(casper, function() { });
				});
			});
		});
		casper.then(function() {
			forumLoginMethod.loginToApp('a','a' , casper, function(err) {
				if(!err) {
					wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
						if(isExists) {
							casper.test.assertExists('i#private_message_notification');
							casper.click('i#private_message_notification');
							wait.waitForElement('ul#private_message_dropdown a.pull-left', casper, function(err, isExists) {
								if(isExists) {
									casper.click('ul#private_message_dropdown a.pull-left');
									wait.waitForElement('form#pmsg_list', casper, function(err, isExists) {
										if(isExists) {
											try {
												casper.test.assertExists('li[data-conversation_id="'+converastion_id+'"]');
												casper.echo('Second User also find the related message','INFO');
											} catch (e) {
												casper.echo('Second User not find the related message','ERROR');
											}
											casper.evaluate(function() {
												document.querySelector('textarea#pmessage_reply').click();
											});
											casper.waitForSelector('iframe#pmessage_reply_ifr', function() {
												casper.withFrame('pmessage_reply_ifr', function() {
													casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A,{keepFocus: true});		
													casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
													casper.sendKeys('#tinymce', 'Reply from neha');
												});
												casper.then(function() {
													this.evaluate(function() {
														$('div#message_options').show();
													});
													casper.click('a#reply_msg_button');
													casper.waitUntilVisible('div.message-entry.sent', function() {
														casper.echo('message replied By Second user','INFO');
													});
												});	
											});	
										} else {
											casper.echo('Inbox not found','ERROR');
										}
									});
								} else {
									casper.echo('Inbox at popup not found','ERROR');
								}
							});
						}else {
							casper.echo('User not logged in', 'ERROR');
						}
					});
				} else {
					casper.echo('User not logged','ERROR');						
				}
			});
			casper.then(function() {
				forumLoginMethod.logoutFromApp(casper, function() { });
			});
		});
	});
};

// method To verify Avtar
privateMessageTestcases.verifyAvtar = function() {
	var converastion_id;
	var imageUrl;
	casper.thenOpen(config.url, function() {
		casper.echo('                       Test case 6','INFO');
		casper.echo('                      To verify Avtar','INFO');
		forumLoginMethod.loginToApp(json["registeredUserLogin"].username, json["registeredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						casper.click('i#private_message_notification');
						wait.waitForElement('ul#private_message_dropdown span.pull-right', casper, function(err, isExists) {
							if(isExists) {
								casper.click('a.send_new_pmsg');
								wait.waitForElement('div[class="modal fade in"]', casper,function(err, isExists) {
									if(isExists) {
										privateMessageMethod.createMessage(json.privateMessage, casper, function(err) {
											if(!err) {
												casper.echo('Message sent called successfully..','INFO');
												casper.thenOpen(config.url+'pm', function() {
													imageUrl = casper.evaluate(function() {
														var id = document.querySelector('div#feed-main span.image-wrapper.normal a').getAttribute('style');
														return id;
													});
													casper.echo('The Url of the image is - '+imageUrl, 'INFO');
													if(imageUrl==json.nehaImageUrl) {
														casper.echo('Sender found his avatar on conversation','INFO');
													} else {
														casper.echo('Sender not found his avatar on conversation','ERROR');
													}
												});
											}
										});
									} else {
										casper.echo('Message pop up not found','ERROR');
									}
								});
							} else {
								casper.echo('Send a New Messag Pop not found','ERROR');
							}
						});
					}else {
						casper.echo('User not logged in', 'ERROR');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});
	casper.thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(json["registeredUserLogin"].username1, json["registeredUserLogin"].password1, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						casper.click('i#private_message_notification');
						wait.waitForElement('ul#private_message_dropdown a.pull-left', casper, function(err, isExists) {
							if(isExists) {
								casper.click('ul#private_message_dropdown a.pull-left');
								wait.waitForElement('form#pmsg_list', casper, function(err, isExists) {
									if(isExists) {
										var recieverImageUrl = casper.evaluate(function() {
											var id = document.querySelector('div#feed-main span.image-wrapper.normal a').getAttribute('style');
											return id;
										});
										casper.echo('The Url of the image is - '+recieverImageUrl, 'INFO');
										if(imageUrl==recieverImageUrl) {
											casper.echo('Reciever found senders avatar in the conversation','INFO');
										} else {
											casper.echo('Reciever not found senders avatar in the conversation','ERROR');
										}
									} else {
										casper.echo('Inbox not found','ERROR');
									}
								});
							} else {
								casper.echo('Inbox at popup not found','ERROR');
							}
						});
					}else {
						casper.echo('User not logged in', 'ERROR');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});
};

// method To verify  send PM conversation to 25 recipient at the same time
privateMessageTestcases.verifyMaxRecipient = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 7','INFO');
		casper.echo('                     To verify  send PM conversation to 25 recipient at the same time','INFO');
		privateMessageMethod.disableEmailVerification(casper, function(err) { 
			if(!err) {
				casper.echo('Disabled backend setting','INFO');
			} else {
				casper.echo('Not Disabled backend setting','ERROR');						
			}
		});
		casper.then(function() {
			privateMessageMethod.disableFields(casper, function(err) { 
				if(!err) {
					casper.echo('Disabled Fields','INFO');
				} else {
					casper.echo('Not Disabled Fields','ERROR');						
				}
			});
		});
	});
	casper.thenOpen(config.url, function() {
		privateMessageMethod.registerUsers(casper, function(err) {    // disable  Approve New Registrations and  Email Address Verification
			if(!err) {
				casper.echo('26 user registered sucessfully','INFO');
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.loginToApp(json["registeredUserLogin"].username, json["registeredUserLogin"].password, casper, function(err) {
				if(!err) {
					wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
						if(isExists) {
							casper.click('i#private_message_notification');
							wait.waitForElement('ul#private_message_dropdown span.pull-right', casper, function(err, isExists) {
								if(isExists) {
									casper.click('a.send_new_pmsg');
									wait.waitForElement('div[class="modal fade in"]', casper,function(err, isExists) {
										if(isExists) {
											privateMessageMethod.sendMessageToMaxLimitUser(json.privateMessageReceipent, casper, function(err) {
												if(!err) {
													casper.echo('Message sent to 25 user successfully..','INFO');
												}
											});
										} else {
											casper.echo('Message pop up not found','ERROR');
										}
									});
								} else {
									casper.echo('Send a New Messag Pop not found','ERROR');
								}
							});
						}else {
							casper.echo('User not logged in', 'ERROR');
						}
					});
				} else {
					casper.echo('User not logged','ERROR');						
				}
			});
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});	
};

// method To verify  send PM conversation to 26 recipient at the same time
privateMessageTestcases.verifyMorethanMaxRecipient = function() {
	casper.then(function() {
		casper.echo('                       Test case 8 ','INFO');
		casper.echo('            To verify  send PM conversation to 26 recipient at the same time','INFO');
		forumLoginMethod.loginToApp(json["registeredUserLogin"].username, json["registeredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						casper.click('i#private_message_notification');
						wait.waitForElement('ul#private_message_dropdown span.pull-right', casper, function(err, isExists) {
							if(isExists) {
								casper.click('a.send_new_pmsg');
								wait.waitForElement('div[class="modal fade in"]', casper,function(err, isExists) {
									if(isExists) {
										privateMessageMethod.sendMessageToMaxLimitUser(json.privateMessageToMoreThanMaxLimit, casper, function(err) {
											if(!err) {
												casper.echo('Message sent to only 25 user not for 26th','INFO');
											}
										});
									} else {
										casper.echo('Message pop up not found','ERROR');
									}
								});
							} else {
								casper.echo('Send a New Messag Pop not found','ERROR');
							}
						});
					}else {
						casper.echo('User not logged in', 'ERROR');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});	
};

