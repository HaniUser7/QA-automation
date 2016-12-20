/***These are the function which has been called in privateMessage.js and also will be used in other js file as per requirement**********/

'use strict';
var json = require('../../testdata/forgotpasswordData.json');
var config = require('../../../config/config.json');
var privateMessageMethod = require('../methods/privateMessage.js');
var registerMethod = require('../methods/register.js');
var forumLoginMethod = require('../methods/login.js');
var backEndForumRegisterMethod = require('../methods/backEndRegistration.js');
var wait = require('../wait.js');
var privateMessageTestcases = module.exports = {};

// method to create a message
privateMessageTestcases.createPrivateMessage = function() {
	casper.echo('                       Test case 1- Method to send a msg','INFO');
	forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
		if(!err) {
			wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
				if(isExists) {
					try {	
						casper.click('i#private_message_notification');
						wait.waitForElement('ul#private_message_dropdown span.pull-right', casper, function(err, isExists) {
							if(isExists) {
								casper.click('a.send_new_pmsg');
								casper.waitUntilVisible('div#pmessage_modal', function() {
									privateMessageMethod.createMessage(json.Privatemessage, casper, function(err) {
										if(!err) {
											casper.echo('Message sent called successfully..','INFO');
										}
									});
								});
							} else {
								driver.echo('Send a New Messag Pop not found','ERROR');
							}
						});
					} catch (e) {
						casper.echo('Message not sent..','INFO');
					}
				}else {
					casper.echo('User not logged in', 'INFO');
				}
			});
		} else {
			casper.echo('User not logged','ERROR');						
		}
	});
	casper.then(function() {
		forumLoginMethod.logoutFromApp(casper, function() { });
	});	
};
// Test cases to verify Delete conversation
// method To verify delete Conversation
privateMessageTestcases.deleteConversation = function() {
	casper.thenOpen(config.url, function() {
		casper.echo('                       Test case 1','INFO');
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						try {
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
											casper.wait(1000, function() {
												casper.test.assertExists('#messages-menu','floating menu is appear on bottom of the page');
												casper.test.assertExists('a#delete_conversation i', 'Delete tab on the floating menu******************');
												casper.click('a#delete_conversation i');
												casper.waitWhileVisible('li[data-conversation_id="'+converastion_id+'"]', function() {
													casper.echo('The topmost post is deleted','INFO');
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
						} catch (e) {
							casper.echo('Private message tab not found','INFO');
						}
					}else {
						casper.echo('User not logged in', 'INFO');
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
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						try {
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
											casper.wait(1000, function() {
												casper.test.assertExists('#messages-menu','floating menu is appear on bottom of the page');
												casper.test.assertExists('a#delete_conversation i', 'Delete tab on the floating menu******************');
												casper.click('a#delete_conversation i');
												casper.waitWhileVisible('li[data-conversation_id="'+converastion_id+'"]', function() {
													casper.echo('The topmost post is deleted','INFO');
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
						} catch (e) {
							casper.echo('Private message tab not found','INFO');
						}
					}else {
						casper.echo('User not logged in', 'INFO');
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
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						try {
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
											casper.wait(1000, function() {
												casper.test.assertExists('#messages-menu','floating menu is appear on bottom of the page');
												casper.test.assertExists('a#delete_conversation i', 'Delete tab on the floating menu******************');
												casper.click('a#delete_conversation i');
												casper.waitWhileVisible('li[data-conversation_id="'+converastion_id+'"]', function() {
													casper.echo('The topmost post is deleted','INFO');
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
						} catch (e) {
							casper.echo('Private message tab not found','INFO');
						}
					}else {
						casper.echo('User not logged in', 'INFO');
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
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						try {
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
												casper.echo('The topmost post is deleted','INFO');
											});
										} else {
											casper.echo('Inbox not found','ERROR');
										}
									});
								} else {
									casper.echo('Inbox at popup not found','ERROR');
								}
							});
						} catch (e) {
							casper.echo('Private message tab not found','INFO');
						}
					}else {
						casper.echo('User not logged in', 'INFO');
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
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						try {
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
											casper.wait(1000, function() {
												casper.test.assertExists('#messages-menu','floating menu is appear on bottom of the page');
												casper.test.assertExists('div#messages-menu a.dropdown-toggle', 'Perform action tab on the floating menu******************');
												casper.click('div#messages-menu a.dropdown-toggle');
												casper.test.assertExists('li#markunread_msg_btn a', 'Mark as Uread tab Found');
												casper.click('li#markunread_msg_btn a');
												casper.waitUntilVisible('div.scrollable-area-body div.alert.alert-success.text-center', function() {
													casper.echo(casper.fetchText('div.scrollable-area-body div.alert.alert-success.text-center'),'INFO');
													try {
														casper.test.assertExists('span.badge.blue', 'Count Found');
													} catch (e) {
														casper.echo('Count not found','INFO');
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
						} catch (e) {
							casper.echo('Private message tab not found','INFO');
						}
					}else {
						casper.echo('User not logged in', 'INFO');
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
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						try {
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
											casper.wait(1000, function() {
												casper.test.assertExists('#messages-menu','floating menu is appear on bottom of the page');
												casper.test.assertExists('div#messages-menu a.dropdown-toggle', 'Perform action tab on the floating menu******************');
												casper.click('div#messages-menu a.dropdown-toggle');
												casper.test.assertExists('li#markunread_msg_btn a', 'Mark as Uread tab Found');
												casper.click('li#markunread_msg_btn a');
												casper.waitUntilVisible('div.scrollable-area-body div.alert.alert-success.text-center', function() {
													casper.echo(casper.fetchText('div.scrollable-area-body div.alert.alert-success.text-center'),'INFO');
													try {
														casper.test.assertExists('span.badge.blue', 'Count Found');
													} catch (e) {
														casper.echo('Count not found','INFO');
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
						} catch (e) {
							casper.echo('Private message tab not found','INFO');
						}
					}else {
						casper.echo('User not logged in', 'INFO');
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
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						try {
							casper.test.assertExists('i#private_message_notification');
							casper.click('i#private_message_notification');
							wait.waitForElement('ul#private_message_dropdown a.pull-left', casper, function(err, isExists) {
								if(isExists) {
									casper.click('ul#private_message_dropdown a.pull-left');
									wait.waitForElement('form#pmsg_list', casper, function(err, isExists) {
										if(isExists) {
											casper.click('input#select_allbox');
											casper.wait(1000, function() {
												casper.test.assertExists('#messages-menu','floating menu is appear on bottom of the page');
												casper.test.assertExists('div#messages-menu a.dropdown-toggle', 'Perform action tab on the floating menu******************');
												casper.click('div#messages-menu a.dropdown-toggle');
												casper.test.assertExists('li#markunread_msg_btn a', 'Mark as Uread tab Found');
												casper.click('li#markunread_msg_btn a');
												casper.waitUntilVisible('div.scrollable-area-body div.alert.alert-success.text-center', function() {
													casper.echo(casper.fetchText('div.scrollable-area-body div.alert.alert-success.text-center'),'INFO');
													try {
														casper.test.assertExists('span.badge.blue', 'Count Found');
													} catch (e) {
														casper.echo('Count not found','INFO');
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
						} catch (e) {
							casper.echo('Private message tab not found','INFO');
						}
					}else {
						casper.echo('User not logged in', 'INFO');
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
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						try {
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
											casper.wait(1000, function() {
												casper.test.assertExists('#messages-menu','floating menu is appear on bottom of the page');
												casper.test.assertExists('div#messages-menu a.dropdown-toggle', 'Perform action tab on the floating menu******************');
												casper.click('div#messages-menu a.dropdown-toggle');
												casper.test.assertExists('li#markread_msg_btn a', 'Mark as Read tab Found');
												casper.click('li#markread_msg_btn a');
												casper.waitUntilVisible('div.scrollable-area-body div.alert.alert-success.text-center', function() {
													casper.echo(casper.fetchText('div.scrollable-area-body div.alert.alert-success.text-center'),'INFO');
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
						} catch (e) {
							casper.echo('Private message tab not found','INFO');
						}
					}else {
						casper.echo('User not logged in', 'INFO');
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
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						try {
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
											casper.wait(1000, function() {
											
												casper.test.assertExists('#messages-menu','floating menu is appear on bottom of the page');
												casper.test.assertExists('div#messages-menu a.dropdown-toggle', 'Perform action tab on the floating menu******************');
												casper.click('div#messages-menu a.dropdown-toggle');
												casper.test.assertExists('li#markread_msg_btn a', 'Mark as Read tab Found');
												casper.click('li#markread_msg_btn a');
												casper.waitUntilVisible('div.scrollable-area-body div.alert.alert-success.text-center', function() {
													casper.echo(casper.fetchText('div.scrollable-area-body div.alert.alert-success.text-center'),'INFO');
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
						} catch (e) {
							casper.echo('Private message tab not found','INFO');
						}
					}else {
						casper.echo('User not logged in', 'INFO');
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
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						try {
							casper.test.assertExists('i#private_message_notification');
							casper.click('i#private_message_notification');
							wait.waitForElement('ul#private_message_dropdown a.pull-left', casper, function(err, isExists) {
								if(isExists) {
									casper.click('ul#private_message_dropdown a.pull-left');
									wait.waitForElement('form#pmsg_list', casper, function(err, isExists) {
										if(isExists) {
											casper.click('input#select_allbox');
											casper.wait(1000, function() {
												casper.test.assertExists('#messages-menu','floating menu is appear on bottom of the page');
												casper.test.assertExists('div#messages-menu a.dropdown-toggle', 'Perform action tab on the floating menu******************');
												casper.click('div#messages-menu a.dropdown-toggle');
												try {
													casper.test.assertExists('li#markread_msg_btn a', 'Mark as Uread tab Found');
													casper.click('li#markread_msg_btn a');
													casper.waitUntilVisible('div.scrollable-area-body div.alert.alert-success.text-center', function() {
														casper.echo(casper.fetchText('div.scrollable-area-body div.alert.alert-success.text-center'),'INFO');
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
						} catch (e) {
							casper.echo('Private message tab not found','INFO');
						}
					}else {
						casper.echo('User not logged in', 'INFO');
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
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						try {
							casper.test.assertExists('i#private_message_notification');
							casper.click('i#private_message_notification');
							wait.waitForElement('ul#private_message_dropdown a.pull-left', casper, function(err, isExists) {
								if(isExists) {
									casper.click('ul#private_message_dropdown a.pull-left');
									wait.waitForElement('form#pmsg_list', casper, function(err, isExists) {
										if(isExists) {
											casper.click('a#mark_all_pmread');
											casper.waitUntilVisible('div#ajax-msg-top', function() {
												casper.echo(casper.fetchText('div#ajax-msg-top p'),'INFO');
											});
										} else {
											casper.echo('Inbox not found','ERROR');
										}
									});
								} else {
									casper.echo('Inbox at popup not found','ERROR');
								}
							});
						} catch (e) {
							casper.echo('Private message tab not found','INFO');
						}
					}else {
						casper.echo('User not logged in', 'INFO');
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
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						try {
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
											casper.wait(1000, function() {
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
						} catch (e) {
							casper.echo('Private message tab not found','INFO');
						}
					}else {
						casper.echo('User not logged in', 'INFO');
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
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						try {
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
										casper.wait(1000, function() {
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
						} catch (e) {
							casper.echo('Private message tab not found','INFO');
						}
					}else {
						casper.echo('User not logged in', 'INFO');
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
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						try {
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
											casper.wait(1000, function() {
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
						} catch (e) {
							casper.echo('Private message tab not found','INFO');
						}
					}else {
						casper.echo('User not logged in', 'INFO');
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
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						try {
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
												casper.capture('rfer.png');
												converastion_id = casper.evaluate(function() {
													var id = document.querySelector('ul#pmsg_inbox_listing li:nth-child(1)').getAttribute('data-conversation_id');
													return id;
												});
												casper.evaluate(function() {
													document.querySelector('ul#pmsg_inbox_listing li:nth-child(1) input').click();
												});
											});
											casper.wait(1000, function() {
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
						} catch (e) {
							casper.echo('Private message tab not found','INFO');
						}
					}else {
						casper.echo('User not logged in', 'INFO');
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
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						try {
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
											casper.wait(1000, function() {
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
						} catch (e) {
							casper.echo('Private message tab not found','INFO');
						}
					}else {
						casper.echo('User not logged in', 'INFO');
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
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						try {
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
											casper.wait(1000, function() {
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
						} catch (e) {
							casper.echo('Private message tab not found','INFO');
						}
					}else {
						casper.echo('User not logged in', 'INFO');
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
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						try {
							casper.test.assertExists('i#private_message_notification');
							casper.click('i#private_message_notification');
							wait.waitForElement('ul#private_message_dropdown a.pull-left', casper, function(err, isExists) {
								if(isExists) {
									casper.click('ul#private_message_dropdown a.pull-left');
									wait.waitForElement('form#pmsg_list', casper, function(err, isExists) {
										if(isExists) {
											casper.click('a[data-original-title="Ignored Users"]');
											casper.waitForSelector('div#ignore-box', function() {
												casper.sendKeys('input[id="ignore_user_field-tokenfield"]', 'hsk', {keepFocus:true});
												casper.sendKeys('input[id="ignore_user_field-tokenfield"]', casper.page.event.key.Enter , {keepFocus: true});
												casper.click('div#ignore-box input[name="save"]');
												casper.wait(2000, function() {
													try {
														casper.test.assertExists('div.alert.alert-danger.text-center','User already ignored');
														casper.echo(casper.fetchText('div.alert.alert-danger.text-center'), 'INFO');
													} catch (e) {
														casper.echo('user ignored','INFO');
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
						} catch (e) {
							casper.echo('Private message tab not found','INFO');
						}
					}else {
						casper.echo('User not logged in', 'INFO');
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
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						try {
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
						} catch (e) {
							casper.echo('Private message tab not found','INFO');
						}
					}else {
						casper.echo('User not logged in', 'INFO');
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
		forumLoginMethod.loginToApp('hsk', 'hsk', casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						try {
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
													casper.waitUntilVisible('div#loading_msg', function() {
														casper.echo(casper.fetchText('div#loading_msg p'), 'INFO');
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
						} catch (e) {
							casper.echo('Private message tab not found','INFO');
						}
					}else {
						casper.echo('User not logged in', 'INFO');
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
		forumLoginMethod.loginToApp('hsk', 'hsk', casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						try {	
							casper.click('i#private_message_notification');
							wait.waitForElement('ul#private_message_dropdown span.pull-right', casper, function(err, isExists) {
								if(isExists) {
									casper.click('a.send_new_pmsg');
									casper.waitUntilVisible('div#pmessage_modal', function() {
										privateMessageMethod.createMessage(json.ignoredByUser, casper, function(err) {
											if(!err) {
												casper.echo('send message called...', 'INFO');
											}
										});
									});
								} else {
									driver.echo('Send a New Messag Pop not found','ERROR');
								}
							});
						} catch (e) {
							casper.echo('Message not sent..','INFO');
						}
					}else {
						casper.echo('User not logged in', 'INFO');
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
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						try {
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
						} catch (e) {
							casper.echo('Private message tab not found','INFO');
						}
					}else {
						casper.echo('User not logged in', 'INFO');
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
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						try {
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
											casper.wait(5000, function() {
												casper.capture('1.png');
											});
										} else {
											casper.echo('Inbox not found','ERROR');
										}
									});
								} else {
									casper.echo('Inbox at popup not found','ERROR');
								}
							});
						} catch (e) {
							casper.echo('Private message tab not found','INFO');
						}
					}else {
						casper.echo('User not logged in', 'INFO');
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
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						try {
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
											casper.echo('not verified','INFO');
										}	
									} catch (e) {
										casper.test.assertExists('li[id^="pm_notification_list"]');
										var text = casper.fetchText('ul#private_message_dropdown li.user-nav-list-all a');
										var string = text.toString();
										var expectedText = 'See All';
										if(string==expectedText){
											casper.echo('conversation present so See All verified', 'INFO');
										} else {
											casper.echo('conversation present so See All not verified','INFO');
										}	
									}
								} else {
									casper.echo('Inbox at popup not found','ERROR');
								}
							});
						} catch (e) {
							casper.echo('Private message tab not found','INFO');
						}
					}else {
						casper.echo('User not logged in', 'INFO');
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
	casper.echo('                       Test case 2','INFO');
	forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
		if(!err) {
			wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
				if(isExists) {
					try {
						casper.test.assertExists('i#private_message_notification');
						casper.click('i#private_message_notification');
						wait.waitForElement('ul#private_message_dropdown a.pull-left', casper, function(err, isExists) {
							if(isExists) {
								casper.click('ul#private_message_dropdown a.pull-left');
								wait.waitForElement('form#pmsg_list', casper, function(err, isExists) {
									if(isExists) {
										casper.mouse.move('form#pmsg_list a.pull-right.btn-primary.send_new_pmsg small');
										casper.click('form#pmsg_list a.pull-right.btn-primary.send_new_pmsg small');
										casper.wait(9000, function() {
											casper.sendKeys('input[id="tokenfield_typeahead-tokenfield"]', json["Privatemessage"].to, {keepFocus: true});
											casper.sendKeys('input[id="tokenfield_typeahead-tokenfield"]', casper.page.event.key.Enter, {keepFocus: true} );
					
											casper.sendKeys('input[id="pm_subject"]', json["Privatemessage"].subject, {keepFocus:true});							
											
											casper.withFrame('pmessage_new_ifr', function() {
												casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A,{keepFocus: true});		
												casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
												casper.sendKeys('#tinymce',json["Privatemessage"].pmessage);
											});
											casper.then(function() {
												casper.click('a#send_pmsg_button');
												casper.wait(5000, function() {
													casper.capture('tyr.png');
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
					} catch (e) {
						casper.echo('Private message tab not found','INFO');
					}
				}else {
					casper.echo('User not logged in', 'INFO');
				}
			});
		} else {
			casper.echo('User not logged','ERROR');						
		}
	});
	casper.then(function() {
		forumLoginMethod.logoutFromApp(casper, function() { });
	});
};

// method to compose message by Scenario3
privateMessageTestcases.composeMessageScenarioThird = function() {
	casper.echo('                      Test Case 3','INFO');
	forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
		if(!err) {
			wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
				if(isExists) {
					casper.click('ul.nav.pull-right span.caret');
					casper.test.assertExists('a[href^="/profile"]');
					casper.click('a[href^="/profile"]');
					casper.wait(2000, function() {
						casper.click('div.pull-left.profile-menu a#send_message');
						casper.capture('abc.png');
						casper.wait(9000, function() {
							privateMessageMethod.createMessage(json.Privatemessage, casper, function(err) {
								if(!err) {
									casper.echo('Message sent..','INFO');
								}
							});
						});
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
};

// method to verify when we enter invalid recipients name
privateMessageTestcases.invalidRecipientsName = function() {
	casper.echo('                                    Test case 4','INFO');
	forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
		if(!err) {
			wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
				if(isExists) {
					try {	
						casper.click('i#private_message_notification');
						wait.waitForElement('ul#private_message_dropdown span.pull-right', casper, function(err, isExists) {
							if(isExists) {
								casper.click('a.send_new_pmsg');
								casper.wait(9000, function() {
									casper.capture('tyr.png');
									privateMessageMethod.createMessage(json.invalidRecipientsName, casper, function(err) {
										if(!err) {
											casper.capture('case4.png');
											casper.echo('Message sent..','INFO');
											casper.echo(casper.fetchText('div#pm_error_msg'),'INFO');
										}
									});
								});
							} else {
								driver.echo('Send a New Messag Pop not found','ERROR');
							}
						});
					} catch (e) {
						casper.echo('Message not sent..','INFO');
					}
				}else {
					casper.echo('User not logged in', 'INFO');
				}
			});
		} else {
			casper.echo('User not logged','ERROR');						
		}
	});
	casper.then(function() {
		forumLoginMethod.logoutFromApp(casper, function() { });
	});	
};

// method to verify when we leave blank reciepients name
privateMessageTestcases.blankRecipientsName = function() {
	casper.echo('                                    Test case 5','INFO');
	forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
		if(!err) {
			wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
				if(isExists) {
					try {	
						casper.click('i#private_message_notification');
						wait.waitForElement('ul#private_message_dropdown span.pull-right', casper, function(err, isExists) {
							if(isExists) {
								casper.click('a.send_new_pmsg');
								casper.wait(9000, function() {
									casper.capture('tyr.png');
									privateMessageMethod.createMessage(json.blankRecipientsName, casper, function(err) {
										if(!err) {
											casper.capture('case5.png');
											casper.echo('Message sent..','INFO');
											casper.echo(casper.fetchText('div#pm_error_msg'),'INFO');
										}
									});
								});
							} else {
								driver.echo('Send a New Messag Pop not found','ERROR');
							}
						});
					} catch (e) {
						casper.echo('Message not sent..','INFO');
					}
				}else {
					casper.echo('User not logged in', 'INFO');
				}
			});
		} else {
			casper.echo('User not logged','ERROR');						
		}
	});
	casper.then(function() {
		forumLoginMethod.logoutFromApp(casper, function() { });
	});	
};

// method to verify when leave blank subject 
privateMessageTestcases.blankSubject = function() {
	casper.echo('                                    Test case 6','INFO');
	forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
		if(!err) {
			wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
				if(isExists) {
					try {	
						casper.click('i#private_message_notification');
						wait.waitForElement('ul#private_message_dropdown span.pull-right', casper, function(err, isExists) {
							if(isExists) {
								casper.click('a.send_new_pmsg');
								casper.wait(9000, function() {
									casper.capture('tyr.png');
									privateMessageMethod.createMessage(json.blankSubject, casper, function(err) {
										if(!err) {
											casper.capture('case6.png');
											casper.echo('Message sent..','INFO');
											//casper.echo(casper.fetchText('div#pm_error_msg'),'INFO');
										}
									});
								});
							} else {
								driver.echo('Send a New Messag Pop not found','ERROR');
							}
						});
					} catch (e) {
						casper.echo('Message not sent..','INFO');
					}
				}else {
					casper.echo('User not logged in', 'INFO');
				}
			});
		} else {
			casper.echo('User not logged','ERROR');						
		}
	});
	casper.then(function() {
		forumLoginMethod.logoutFromApp(casper, function() { });
	});	
};

// method to verify when leave blank message body
privateMessageTestcases.blankMessageBody = function() {
	casper.echo('                                    Test case 7','INFO');
	forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
		if(!err) {
			wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
				if(isExists) {
					try {	
						casper.click('i#private_message_notification');
						wait.waitForElement('ul#private_message_dropdown span.pull-right', casper, function(err, isExists) {
							if(isExists) {
								casper.click('a.send_new_pmsg');
								casper.wait(9000, function() {
									casper.capture('tyr.png');
									privateMessageMethod.createMessage(json.blankMessageBody, casper, function(err) {
										if(!err) {
											casper.capture('case7.png');
											casper.echo('Message sent..','INFO');
											casper.echo(casper.fetchText('div#pm_error_msg'),'INFO');
										}
									});
								});
							} else {
								driver.echo('Send a New Messag Pop not found','ERROR');
							}
						});
					} catch (e) {
						casper.echo('Message not sent..','INFO');
					}
				}else {
					casper.echo('User not logged in', 'INFO');
				}
			});
		} else {
			casper.echo('User not logged','ERROR');						
		}
	});
	casper.then(function() {
		forumLoginMethod.logoutFromApp(casper, function() { });
	});	
};

// method To verify auto drop down in reciver's field
privateMessageTestcases.autoDropdown = function() {
	casper.echo('                                    Test case 9','INFO');
	forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
		if(!err) {
			wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
				if(isExists) {
					try {	
						casper.click('i#private_message_notification');
						wait.waitForElement('ul#private_message_dropdown span.pull-right', casper, function(err, isExists) {
							if(isExists) {
								casper.click('a.send_new_pmsg');
								casper.wait(9000, function() {
									casper.capture('tyr.png');
									driver.sendKeys('input[id="tokenfield_typeahead-tokenfield"]',"h" );
									driver.sendKeys('input[id="tokenfield_typeahead-tokenfield"]', casper.page.event.key.Enter );
								});
							} else {
								driver.echo('Send a New Messag Pop not found','ERROR');
							}
						});
					} catch (e) {
						casper.echo('Message not sent..','INFO');
					}
				}else {
					casper.echo('User not logged in', 'INFO');
				}
			});
		} else {
			casper.echo('User not logged','ERROR');						
		}
	});
	casper.then(function() {
		forumLoginMethod.logoutFromApp(casper, function() { });
	});	
};

//To verify Attachement /Insert Photo link when disable
privateMessageTestcases.verifyAttachementAndInsertPhotoLinkWhenDisable = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                         Test case 11a','INFO');
		privateMessageMethod.disableAttachments(casper, function(err) {
			if(!err) {
				casper.echo('Backend setting changed succesfully','INFO');
			}	
		});
	});
	casper.thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						try {	
							casper.click('i#private_message_notification');
							wait.waitForElement('ul#private_message_dropdown span.pull-right', casper, function(err, isExists) {
								if(isExists) {
									casper.click('a.send_new_pmsg');
									casper.waitUntilVisible('div#pmessage_modal', function() {
										casper.test.assertDoesntExist('a#fancy_attach_pmsDialog i', 'Attach file link not found when disable from backend');
										casper.test.assertDoesntExist('a#insert_image_dialog_pmsDialog', 'Insert link not found when disable from backend');
									});
								} else {
									driver.echo('Send a New Messag Pop not found','ERROR');
								}
							});
						} catch (e) {
							casper.echo('Message not sent..','INFO');
						}
					}else {
						casper.echo('User not logged in', 'INFO');
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
		privateMessageMethod.enableAttachments(casper, function(err) {
			if(!err) {
				casper.echo('BAckend setting changed succesfully','INFO');
			}	
		});
	});
	casper.thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						try {	
							casper.click('i#private_message_notification');
							wait.waitForElement('ul#private_message_dropdown span.pull-right', casper, function(err, isExists) {
								if(isExists) {
									casper.click('a.send_new_pmsg');
									casper.waitUntilVisible('div#pmessage_modal', function() {
										casper.test.assertExists('a#fancy_attach_pmsDialog i', 'Attach file link found when enable from backend');
										casper.test.assertExists('a#insert_image_dialog_pmsDialog', 'Insert link found when enable from backend');
									});
								} else {
									driver.echo('Send a New Messag Pop not found','ERROR');
								}
							});
						} catch (e) {
							casper.echo('Message not sent..','INFO');
						}
					}else {
						casper.echo('User not logged in', 'INFO');
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
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						try {
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
											casper.waitUntilVisible('div#ajax-msg-top', function() {
												casper.echo(casper.fetchText('div#ajax-msg-top'),'INFO');
											});
											casper.then(function() {
												casper.then(function() {
													forumLoginMethod.logoutFromApp(casper, function() { });
												});
												casper.thenOpen(config.url, function() {
													forumLoginMethod.loginToApp('hsk', 'hsk', casper, function(err) {
														if(!err) {
															wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
																if(isExists) {
																	try {
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
																} catch (e) {
																	casper.echo('Private message tab not found','INFO');
																}
															}else {
																casper.echo('User not logged in', 'INFO');
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
						} catch (e) {
							casper.echo('Private message tab not found','INFO');
						}
					}else {
						casper.echo('User not logged in', 'INFO');
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
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						try {
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
											casper.waitUntilVisible('div#ajax-msg-top', function() {
												casper.echo(casper.fetchText('div#ajax-msg-top'),'INFO');
											});
											casper.then(function() {
												casper.then(function() {
													forumLoginMethod.logoutFromApp(casper, function() { });
												});
												casper.thenOpen(config.url, function() {
													forumLoginMethod.loginToApp('hsk', 'hsk', casper, function(err) {
														if(!err) {
															wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
																if(isExists) {
																	try {
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
																} catch (e) {
																	casper.echo('Private message tab not found','INFO');
																}
															}else {
																casper.echo('User not logged in', 'INFO');
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
						} catch (e) {
							casper.echo('Private message tab not found','INFO');
						}
					}else {
						casper.echo('User not logged in', 'INFO');
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
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						try {
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
											casper.waitUntilVisible('div#ajax-msg-top', function() {
												casper.echo(casper.fetchText('div#ajax-msg-top'),'INFO');
											});
											casper.then(function() {
												casper.then(function() {
													forumLoginMethod.logoutFromApp(casper, function() { });
												});
												casper.thenOpen(config.url, function() {
													forumLoginMethod.loginToApp('hsk', 'hsk', casper, function(err) {
														if(!err) {
															wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
																if(isExists) {
																	try {
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
																} catch (e) {
																	casper.echo('Private message tab not found','INFO');
																}
															}else {
																casper.echo('User not logged in', 'INFO');
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
						} catch (e) {
							casper.echo('Private message tab not found','INFO');
						}
					}else {
						casper.echo('User not logged in', 'INFO');
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
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						try {
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
						} catch (e) {
							casper.echo('Private message tab not found','INFO');
						}
					}else {
						casper.echo('User not logged in', 'INFO');
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
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						try {	
							casper.click('i#private_message_notification');
							wait.waitForElement('ul#private_message_dropdown span.pull-right', casper, function(err, isExists) {
								if(isExists) {
									casper.click('a.send_new_pmsg');
									casper.waitUntilVisible('div#pmessage_modal', function() {
										privateMessageMethod.createMessage(json.Privatemessage, casper, function(err) {
											if(!err) {
												casper.echo('Message sent called successfully..','INFO');
												casper.thenOpen('http://beta23.websitetoolbox.com/pm', function() {
													casper.capture('fhji.png');
													converastion_id = casper.evaluate(function() {
														var id = document.querySelector('ul#pmsg_inbox_listing li:nth-child(1)').getAttribute('data-conversation_id');
														return id;
													});
													casper.echo('The conversation id is - '+converastion_id, 'INFO');
												});
											}
										});
									});
								} else {
									driver.echo('Send a New Messag Pop not found','ERROR');
								}
							});
						} catch (e) {
							casper.echo('Message not sent..','INFO');
						}
					}else {
						casper.echo('User not logged in', 'INFO');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
			casper.then(function() {
				forumLoginMethod.loginToApp('hsk','hsk' , casper, function(err) {
					if(!err) {
						wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
							if(isExists) {
								try {
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
								} catch (e) {
									casper.echo('Private message tab not found','INFO');
								}
							}else {
								casper.echo('User not logged in', 'INFO');
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
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						try {	
							casper.click('i#private_message_notification');
							wait.waitForElement('ul#private_message_dropdown span.pull-right', casper, function(err, isExists) {
								if(isExists) {
									casper.click('a.send_new_pmsg');
									casper.waitUntilVisible('div#pmessage_modal', function() {
										privateMessageMethod.sendMessageToManyUser(json.Privatemessage, casper, function(err) {
											if(!err) {
												casper.echo('Message sent called successfully..','INFO');
												casper.thenOpen('http://beta23.websitetoolbox.com/pm', function() {
													casper.capture('fhji.png');
													converastion_id = casper.evaluate(function() {
														var id = document.querySelector('ul#pmsg_inbox_listing li:nth-child(1)').getAttribute('data-conversation_id');
														return id;
													});
													casper.echo('The conversation id is - '+converastion_id, 'INFO');
												});
											}
										});
									});
								} else {
									driver.echo('Send a New Messag Pop not found','ERROR');
								}
							});
						} catch (e) {
							casper.echo('Message not sent..','INFO');
						}
					}else {
						casper.echo('User not logged in', 'INFO');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
			casper.then(function() {
				forumLoginMethod.loginToApp('hsk','hsk' , casper, function(err) {
					if(!err) {
						wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
							if(isExists) {
								try {
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
								} catch (e) {
									casper.echo('Private message tab not found','INFO');
								}
							}else {
								casper.echo('User not logged in', 'INFO');
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
			//forumLoginMethod.logoutFromApp(casper, function() { });
			//casper.then(function() {
				forumLoginMethod.loginToApp('a','a' , casper, function(err) {
					if(!err) {
						wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
							if(isExists) {
								try {
									casper.test.assertExists('i#private_message_notification');
									casper.click('i#private_message_notification');
									wait.waitForElement('ul#private_message_dropdown a.pull-left', casper, function(err, isExists) {
										if(isExists) {
											casper.click('ul#private_message_dropdown a.pull-left');
											wait.waitForElement('form#pmsg_list', casper, function(err, isExists) {
												if(isExists) {
													casper.test.assertExists('li[data-conversation_id="'+converastion_id+'"]');
													casper.echo('Second User also find the related message','INFO');
												} else {
													casper.echo('Inbox not found','ERROR');
												}
											});
										} else {
											casper.echo('Inbox at popup not found','ERROR');
										}
									});
								} catch (e) {
									casper.echo('Private message tab not found','INFO');
								}
							}else {
								casper.echo('User not logged in', 'INFO');
							}
						});
					} else {
						casper.echo('User not logged','ERROR');						
					}
				});
				casper.then(function() {
					forumLoginMethod.logoutFromApp(casper, function() { });
				});
			//});
		});
	});
};

// method verify when:If user S1 sent a message to R1, R2 but reply coming only from R2 only
privateMessageTestcases.verifyMultipleRecieverAndReplyByOne = function() {
	var converastion_id;
	casper.thenOpen(config.url, function() {
		casper.echo('                       Test case 5','INFO');
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
					if(isExists) {
						try {	
							casper.click('i#private_message_notification');
							wait.waitForElement('ul#private_message_dropdown span.pull-right', casper, function(err, isExists) {
								if(isExists) {
									casper.click('a.send_new_pmsg');
									casper.waitUntilVisible('div#pmessage_modal', function() {
										privateMessageMethod.sendMessageToManyUser(json.Privatemessage, casper, function(err) {
											if(!err) {
												casper.echo('Message sent called successfully..','INFO');
												casper.thenOpen('http://beta23.websitetoolbox.com/pm', function() {
													converastion_id = casper.evaluate(function() {
														var id = document.querySelector('ul#pmsg_inbox_listing li:nth-child(1)').getAttribute('data-conversation_id');
														return id;
													});
													casper.echo('The conversation id is - '+converastion_id, 'INFO');
												});
											}
										});
									});
								} else {
									driver.echo('Send a New Messag Pop not found','ERROR');
								}
							});
						} catch (e) {
							casper.echo('Message not sent..','INFO');
						}
					}else {
						casper.echo('User not logged in', 'INFO');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
			casper.then(function() {
				forumLoginMethod.loginToApp('hsk','hsk' , casper, function(err) {
					if(!err) {
						wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
							if(isExists) {
								try {
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
								} catch (e) {
									casper.echo('Private message tab not found','INFO');
								}
							}else {
								casper.echo('User not logged in', 'INFO');
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
							try {
								casper.test.assertExists('i#private_message_notification');
								casper.click('i#private_message_notification');
								wait.waitForElement('ul#private_message_dropdown a.pull-left', casper, function(err, isExists) {
									if(isExists) {
										casper.click('ul#private_message_dropdown a.pull-left');
										wait.waitForElement('form#pmsg_list', casper, function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li[data-conversation_id="'+converastion_id+'"]');
												casper.echo('Second User also find the related message','INFO');
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
														casper.capture('1.png');
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
							} catch (e) {
								casper.echo('Private message tab not found','INFO');
							}
						}else {
							casper.echo('User not logged in', 'INFO');
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





