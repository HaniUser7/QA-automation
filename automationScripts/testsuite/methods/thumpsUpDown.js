/***These are the function which has been called in thumpsUpDown.js and also will be used in other js file as per requirement**********/

'use strict';
var registerMethod = require('./register.js');
var utils = require('./utils.js');
var wait = require('../wait.js');
var backEndForumRegisterMethod = require('./backEndRegistration.js');
var thumpsUpDownMethod = module.exports = {};
//*************************************************PRIVATE METHODS***********************************************

//Method For Verifying Error Message On Thumps UP/DOWN
thumpsUpDownMethod.verifyErrorMsg = function(errorMessage, expectedErrorMsg, msgTitle, driver, callback) {
	driver.echo('Actual Error message : '+errorMessage, 'INFO');
	driver.echo('Expected Error message : '+expectedErrorMsg, 'INFO');
	if((errorMessage == expectedErrorMsg) || (errorMessage.indexOf(expectedErrorMsg) > -1)) {
		driver.echo('Error message is verified when user try to edit with "' +msgTitle+'"', 'INFO');
	} else {
		driver.echo("Error Message Is Not Correct", 'ERROR');
	}
	return callback(null);
};

//Method For Verifying Success Message On Thums UP/DOWN
thumpsUpDownMethod.verifySuccessMsg = function(successMsg, expectedSuccessMsg, msgTitle, driver, callback) {
	driver.echo('Actual Success message : '+successMsg, 'INFO');
	driver.echo('Expected Success message : '+expectedSuccessMsg, 'INFO');
	if((successMsg == expectedSuccessMsg) || (successMsg.indexOf(expectedSuccessMsg) > -1)) {
		driver.echo('Success message is verified when user try to edit with "' +msgTitle+'"', 'INFO');
	} else {
		driver.echo("Error Message Is Not Correct", 'ERROR');
	}
	return callback(null);
};

// method for goto post topic page to application
thumpsUpDownMethod.postTopicpage = function(data, driver, callback) {
	casper.echo("data.title : "+data.title, 'INFO');
	casper.echo("data.content : "+data.content, 'INFO');
	casper.echo("data.category : "+data.category, 'INFO');
	driver.sendKeys('input[name="subject"]', data.title, {reset:true});
	driver.withFrame('message_ifr', function() {
		this.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
		this.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
 		this.sendKeys('#tinymce', data.content);
	});	
		driver.click('#all_forums_dropdown');
		driver.fill('form[name="PostTopic"]',{
			'forum' : data.category
		},false);
	
	driver.then(function() {
		driver.click('#post_submit');
	});
	
	return callback(null);
};

//Method to change the permission For Registered User
thumpsUpDownMethod.viewChangePermission = function(driver, callback) {
	try {
		driver.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		try {
			driver.test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			driver.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			wait.waitForElement('table.text.fullborder', driver, function(err, isExists) {
				if(isExists) {
					var grpName = driver.evaluate(function(){
						for(var i=1; i<=7; i++) {
							var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
							if (x1.innerText == 'Registered Users') {
								document.querySelector('tr:nth-child('+i+') td:nth-child(3) a').click();
								var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('href');
								return x2;
							}
						}
					});
					driver.click('a[href="'+grpName+'"]');
					return callback(null);
				} else {
					driver.echo('Table not found', 'ERROR');
				}
			});
		}catch(e) {
			driver.test.assertDoesntExist('div#ddUsers a[href="/tool/members/mb/usergroup"]');
		}
	}catch(e) {
		driver.test.assertDoesntExist('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	}
};
//Method For Disable View Profile For Registered User
thumpsUpDownMethod.disableViewProfile = function(driver, callback) {
//Login To Forum Back-end And Change Permissions From back End
	driver.then(function() {
		registerMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', driver, function(err, isExists) {
					if(isExists) {
						thumpsUpDownMethod.viewChangePermission(casper, function(err) {
							if(!err) {
								wait.waitForElement('#view_profiles', casper, function(err, isExists) {
									if(isExists) {
										casper.echo('Opened Change Permission Page Successfully', 'INFO')
										try {
											utils.enableorDisableCheckbox('view_profiles', false, casper, function() {
											casper.echo('checkbox is unchecked', 'INFO');
											});
											try {
												casper.test.assertExists('button.button.btn-m.btn-blue');
												casper.click('button.button.btn-m.btn-blue');
												wait.waitForElement('font[color="red"]', driver, function(err, isExists) {
													if(isExists) {
														var successMsg = casper.fetchText('font[color="red"]');
														var expectedSuccessMsg = 'Your user group settings have been updated.';
														if(successMsg && successMsg!= '')
															thumpsUpDownMethod.verifySuccessMsg(successMsg, expectedSuccessMsg, 'UncheckedViewProfile', casper, function() {
															
														});
													} else {
														casper.echo('Red colored text not found', 'ERROR');
													}
												});
											}catch(e) {
												casper.test.assertDoesntExist('button.button.btn-m.btn-blue');
												return callback(null);
											}
										}catch(e) {
											casper.test.assertDoesntExist('#view_messageboard');
										}
									} else {
										casper.echo('View profile checkbox not found', 'ERROR');
									}
								});
							}else {
								casper.echo('Error : '+err, 'INFO');
							}
						});
					} else {
						casper.echo('Forum Menu not found', 'ERROR');
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
	});
};
//Method For Enable View Profile For Registered User
thumpsUpDownMethod.enableViewProfile = function(driver, callback) {
//Login To Forum Back-end And Change Permissions From back End
	driver.then(function() {
		registerMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', driver, function(err, isExists) {
					if(isExists) {
						thumpsUpDownMethod.viewChangePermission(casper, function(err) {
							if(!err) {
								wait.waitForElement('#view_profiles', casper, function(err, isExists) {
									if(isExists) {
										casper.echo('Opened Change Permission Page Successfully', 'INFO')
										try {
											utils.enableorDisableCheckbox('view_profiles', true, casper, function() {
											casper.echo('checkbox is checked', 'INFO');
											});
											try {
												casper.test.assertExists('button.button.btn-m.btn-blue');
												casper.click('button.button.btn-m.btn-blue');
												wait.waitForElement('font[color="red"]', driver, function(err, isExists) {
													if(isExists) {
														var successMsg = casper.fetchText('font[color="red"]');
														var expectedSuccessMsg = 'Your user group settings have been updated.';
														if(successMsg && successMsg!= '')
															thumpsUpDownMethod.verifySuccessMsg(successMsg, expectedSuccessMsg, 'UncheckedViewProfile', casper, function() {
															
														});
													} else {
														casper.echo('Red colored text not found', 'ERROR');
													}
												});
											}catch(e) {
												casper.test.assertDoesntExist('button.button.btn-m.btn-blue');
												return callback(null);
											}
										}catch(e) {
											casper.test.assertDoesntExist('#view_messageboard');
										}
									} else {
										casper.echo('View profile checkbox not found', 'ERROR');
									}
								});
							}else {
								casper.echo('Error : '+err, 'INFO');
							}
						});
					} else {
						casper.echo('ERROR OCCURRED', 'ERROR');
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
	});
};
//Method to disable Likes & Reputation from back end
thumpsUpDownMethod.disableReputation = function(driver, callback) {
	registerMethod.loginToForumBackEnd(casper, function(err) {
		if(!err) {
			wait.waitForElement('div#my_account_forum_menu', driver, function(err, isExists) {
				if(isExists) {
					driver.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					wait.waitForElement('div#ddSettings', casper, function(err, isExists) {
						if(isExists) {
							casper.click('div#ddSettings a:nth-child(2)');
							wait.waitForElement('input#reputation', casper, function(err, isExists) {
								if(isExists) {
									utils.enableorDisableCheckbox('reputation', false, casper, function() {
										casper.echo('checkbox is uncheckedchecked', 'INFO');
									});
									try {
										casper.test.assertExists('button.button.btn-m.btn-blue');
										casper.click('button.button.btn-m.btn-blue');
										casper.wait(2000);
									}catch(e) {
										casper.test.assertDoesntExist('button.button.btn-m.btn-blue');
									}
								} else {
									casper.echo('Reputation checkbox not found', 'ERROR');
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
			casper.echo('Error : '+err, 'INFO');
		}
	});
	casper.then(function() {
		backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
		});
		return callback(null);
	});
};
//Method to Enable Likes & Reputation from back end
thumpsUpDownMethod.enableReputation = function(driver, callback) {
	registerMethod.loginToForumBackEnd(casper, function(err) {
		if(!err) {
			wait.waitForElement('div#my_account_forum_menu', driver, function(err, isExists) {
				if(isExists) {
					driver.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					wait.waitForElement('div#ddSettings', casper, function(err, isExists) {
						if(isExists) {
							casper.click('div#ddSettings a:nth-child(2)');
							wait.waitForElement('input#reputation', casper, function(err, isExists) {
								if(isExists) {
									utils.enableorDisableCheckbox('reputation', true, casper, function() {
										casper.echo('checkbox is checked', 'INFO');
									});
									try {
										casper.test.assertExists('button.button.btn-m.btn-blue');
										casper.click('button.button.btn-m.btn-blue');
										casper.wait(2000);
									}catch(e) {
										casper.test.assertDoesntExist('button.button.btn-m.btn-blue');
									}
								} else {
									casper.echo('Reputation checkbox not found', 'ERROR');
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
			casper.echo('Error : '+err, 'INFO');
		}
	});
	casper.then(function() {
		backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
		});
		return callback(null);
	});
};
//Method to disable User Account from back end
thumpsUpDownMethod.disableUserAccount = function(driver, callback) {
	registerMethod.loginToForumBackEnd(casper, function(err) {
		if(!err) {
			wait.waitForElement('div#my_account_forum_menu', driver, function(err, isExists) {
				if(isExists) {
					driver.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					wait.waitForElement('div#ddSettings', casper, function(err, isExists) {
						if(isExists) {
							casper.click('div#ddSettings a:nth-child(2)');
							wait.waitForElement('input#REQreg', casper, function(err, isExists) {
								if(isExists) {
									utils.enableorDisableCheckbox('REQreg', false, casper, function() {
										casper.echo('checkbox is uncheckedchecked', 'INFO');
									});
									casper.click('div.ui-dialog-buttonset button');
									try {
										casper.test.assertExists('button.button.btn-m.btn-blue');
										casper.click('button.button.btn-m.btn-blue');
										casper.wait(2000);
									}catch(e) {
										casper.test.assertDoesntExist('button.button.btn-m.btn-blue');
									}
								} else {
									casper.echo('User Account checkbox not found', 'ERROR');
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
			casper.echo('Error : '+err, 'INFO');
		}
	});
	casper.then(function() {
		backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
		});
		return callback(null);
	});
};
//Method to enable User Account from back end
thumpsUpDownMethod.enableUserAccount = function(driver, callback) {
	registerMethod.loginToForumBackEnd(casper, function(err) {
		if(!err) {
			wait.waitForElement('div#my_account_forum_menu', driver, function(err, isExists) {
				if(isExists) {
					driver.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					wait.waitForElement('div#ddSettings', casper, function(err, isExists) {
						if(isExists) {
							casper.click('div#ddSettings a:nth-child(2)');
							wait.waitForElement('input#REQreg', casper, function(err, isExists) {
								if(isExists) {
									utils.enableorDisableCheckbox('REQreg', true, casper, function() {
										casper.echo('checkbox is checked', 'INFO');
									});
									try {
										casper.test.assertExists('button.button.btn-m.btn-blue');
										casper.click('button.button.btn-m.btn-blue');
										casper.wait(2000);
									}catch(e) {
										casper.test.assertDoesntExist('button.button.btn-m.btn-blue');
									}
								} else {
									casper.echo('User Account checkbox not found', 'ERROR');
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
			casper.echo('Error : '+err, 'INFO');
		}
	});
	casper.then(function() {
		backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
		});
		return callback(null);
	});
};
//Method to disable New Registration from back end
thumpsUpDownMethod.disableNewRegistration = function(driver, callback) {
	registerMethod.loginToForumBackEnd(casper, function(err) {
		if(!err) {
			wait.waitForElement('div#my_account_forum_menu', driver, function(err, isExists) {
				if(isExists) {
					driver.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					wait.waitForElement('div#ddSettings', casper, function(err, isExists) {
						if(isExists) {
							casper.click('div#ddSettings a:nth-child(3)');
							wait.waitForElement('input#new_user_registration', casper, function(err, isExists) {
								if(isExists) {
									utils.enableorDisableCheckbox('new_user_registration', false, casper, function() {
										casper.echo('checkbox is checked', 'INFO');
									});
									try {
										casper.test.assertExists('button.button.btn-m.btn-blue');
										casper.click('button.button.btn-m.btn-blue');
										casper.wait(2000);
									}catch(e) {
										casper.test.assertDoesntExist('button.button.btn-m.btn-blue');
									}
								} else {
									casper.echo('New Registration checkbox not found', 'ERROR');
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
			casper.echo('Error : '+err, 'INFO');
		}
	});
	casper.then(function() {
		backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
		});
		return callback(null);
	});
};
//Method to enable New Registration from back end
thumpsUpDownMethod.enableNewRegistration = function(driver, callback) {
	registerMethod.loginToForumBackEnd(casper, function(err) {
		if(!err) {
			wait.waitForElement('div#my_account_forum_menu', driver, function(err, isExists) {
				if(isExists) {
					driver.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					wait.waitForElement('div#ddSettings', casper, function(err, isExists) {
						if(isExists) {
							casper.click('div#ddSettings a:nth-child(3)');
							wait.waitForElement('input#new_user_registration', casper, function(err, isExists) {
								if(isExists) {
									utils.enableorDisableCheckbox('new_user_registration', true, casper, function() {
										casper.echo('checkbox is checked', 'INFO');
									});
									try {
										casper.test.assertExists('button.button.btn-m.btn-blue');
										casper.click('button.button.btn-m.btn-blue');
										casper.wait(2000);
									}catch(e) {
										casper.test.assertDoesntExist('button.button.btn-m.btn-blue');
									}
								} else {
									casper.echo('New Registration checkbox not found', 'ERROR');
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
			casper.echo('Error : '+err, 'INFO');
		}
	});
	casper.then(function() {
		backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
		});
		return callback(null);
	});
};
//Method to enable Facebook login from back end
thumpsUpDownMethod.enableFacebookLogin = function(driver, callback) {
	registerMethod.loginToForumBackEnd(casper, function(err) {
		if(!err) {
			wait.waitForElement('div#my_account_forum_menu', driver, function(err, isExists) {
				if(isExists) {
					driver.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					wait.waitForElement('div#ddSettings', casper, function(err, isExists) {
						if(isExists) {
							casper.click('div#ddSettings a:nth-child(5)');
							wait.waitForElement('input#facebook_connect', casper, function(err, isExists) {
								if(isExists) {
									utils.enableorDisableCheckbox('facebook_connect', true, casper, function() {
										casper.echo('checkbox is checked', 'INFO');
									});
									try {
										casper.test.assertExists('button.button.btn-m.btn-blue');
										casper.click('button.button.btn-m.btn-blue');
										casper.wait(2000);
									}catch(e) {
										casper.test.assertDoesntExist('button.button.btn-m.btn-blue');
									}
								} else {
									casper.echo('Facebook Connect checkbox not found', 'ERROR');
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
			casper.echo('Error : '+err, 'INFO');
		}
	});
	casper.then(function() {
		backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
		});
		return callback(null);
	});
};
//Method to disable Facebook login from back end
thumpsUpDownMethod.disableFacebookLogin = function(driver, callback) {
	registerMethod.loginToForumBackEnd(casper, function(err) {
		if(!err) {
			wait.waitForElement('div#my_account_forum_menu', driver, function(err, isExists) {
				if(isExists) {
					driver.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					wait.waitForElement('div#ddSettings', casper, function(err, isExists) {
						if(isExists) {
							casper.click('div#ddSettings a:nth-child(5)');
							wait.waitForElement('input#facebook_connect', casper, function(err, isExists) {
								if(isExists) {
									utils.enableorDisableCheckbox('facebook_connect', false, casper, function() {
										casper.echo('checkbox is checked', 'INFO');
									});
									try {
										casper.test.assertExists('button.button.btn-m.btn-blue');
										casper.click('button.button.btn-m.btn-blue');
										casper.wait(2000);
									}catch(e) {
										casper.test.assertDoesntExist('button.button.btn-m.btn-blue');
									}
								} else {
									casper.echo('Facebook Connect checkbox not found', 'ERROR');
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
			casper.echo('Error : '+err, 'INFO');
		}
	});
	casper.then(function() {
		backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
		});
		return callback(null);
	});
};

