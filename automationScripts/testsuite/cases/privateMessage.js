/***These are the function which has been called in privateMessage.js and also will be used in other js file as per requirement**********/

'use strict';
var json = require('../../testdata/forgotpasswordData.json');
var config = require('../../../config/config.json');
var privateMessageMethod = require('../methods/privateMessage.js');
var registerMethod = require('../methods/register.js');
var forumLoginMethod = require('../methods/login.js');
var wait = require('../wait.js');
var privateMessageTestcases = module.exports = {};

// method to create a message
privateMessageTestcases.createPrivateMessage = function() {
	try {
		casper.test.assertExists('i#private_message_notification');
		privateMessageMethod.createMessage(json.Privatemessage, casper, function(err) {
			if(!err) {
			
			}
		});
	} catch (e) {
	
	}	
};

// method To verify delete Conversation
privateMessageTestcases.deleteConversation = function() {
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
											document.querySelector('ul#pmsg_inbox_listing input.entry-checkbox.pull-left:nth-child(1)').click();
										});
										casper.wait(1000, function() {
											casper.test.assertExists('#messages-menu','floating menu is appear on bottom of the page');
											casper.test.assertExists('a#delete_conversation i', 'Delete tab on the floating menu******************');
											casper.click('a#delete_conversation i');
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

// method To verify delete multiple Conversation
privateMessageTestcases.deleteMultipleConversation = function() {
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
										casper.wait(1000, function() {
											casper.test.assertExists('#messages-menu','floating menu is appear on bottom of the page');
											casper.test.assertExists('a#delete_conversation i', 'Delete tab on the floating menu******************');
											casper.click('a#delete_conversation i');
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
											casper.click('input#select_allbox');
											casper.wait(1000, function() {
												casper.test.assertExists('#messages-menu','floating menu is appear on bottom of the page');
												casper.test.assertExists('a#delete_conversation i', 'Delete tab on the floating menu******************');
												casper.click('a#delete_conversation i');
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
											casper.click('a#delete_curr_conversation i');
											casper.wait(1000, function() {
							
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
											casper.wait(2000, function() {
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
											casper.wait(2000, function() {
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
											casper.wait(2000, function() {
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
											casper.wait(2000, function() {
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
											casper.wait(2000, function() {
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
											casper.test.assertExists('li#markread_msg_btn a', 'Mark as Uread tab Found');
											casper.click('li#markread_msg_btn a');
											casper.wait(2000, function() {
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
											casper.wait(2000, function() {
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
