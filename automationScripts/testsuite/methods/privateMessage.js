/***These are the function which has been called in privateMessage.js and also will be used in other js file as per requirement**********/

'use strict';
var registerMethod = require('./register.js');
var config = require('../../../config/config.json');
var utils = require('./utils.js');
var wait = require('../wait.js');
var json = require('../../testdata/forgotpasswordData.json');
var forumLoginMethod = require('../methods/login.js');
var backEndForumRegisterMethod = require('./backEndRegistration.js');
var privateMessageMethod = module.exports = {};

//*************************************************PRIVATE METHODS***********************************************
//Method to enable message from back end
privateMessageMethod.enableMessage = function(driver, callback) {
	registerMethod.loginToForumBackEnd(casper, function(err) {
		if(!err) {
			wait.waitForElement('div#my_account_forum_menu', driver, function(err, isExists) {
				if(isExists) {
					driver.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					wait.waitForElement('div#ddSettings', casper, function(err, isExists) {
						if(isExists) {
							casper.click('div#ddSettings a:nth-child(2)');
							wait.waitForElement('input#allow_pm', casper, function(err, isExists) {
								if(isExists) {
									utils.enableorDisableCheckbox('allow_pm', true, casper, function() {
										casper.echo('checkbox is checked', 'INFO');
									});
									try {
										casper.test.assertExists('button.button.btn-m.btn-blue');
										casper.click('button.button.btn-m.btn-blue');
										casper.waitUntilVisible('div#ajax-msg-top', function() {
											casper.echo(casper.fetchText('div#ajax-msg-top'),'INFO');
										});
									}catch(e) {
										casper.test.assertDoesntExist('button.button.btn-m.btn-blue');
									}
								} else {
									casper.echo('Message checkbox not found', 'ERROR');
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
			casper.echo('Error ', 'INFO');
		}
	});
	casper.then(function() {
		backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
		});
		return callback(null);
	});
};

//Method to disable message from back end
privateMessageMethod.disableMessage = function(driver, callback) {
	registerMethod.loginToForumBackEnd(casper, function(err) {
		if(!err) {
			wait.waitForElement('div#my_account_forum_menu', driver, function(err, isExists) {
				if(isExists) {
					driver.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					wait.waitForElement('div#ddSettings', casper, function(err, isExists) {
						if(isExists) {
							casper.click('div#ddSettings a:nth-child(2)');
							wait.waitForElement('input#allow_pm', casper, function(err, isExists) {
								if(isExists) {
									utils.enableorDisableCheckbox('allow_pm', false, casper, function() {
										casper.echo('checkbox is unchecked', 'INFO');
									});
									try {
										casper.test.assertExists('button.button.btn-m.btn-blue');
										casper.click('button.button.btn-m.btn-blue');
										casper.waitUntilVisible('div#ajax-msg-top', function() {
											casper.echo(casper.fetchText('div#ajax-msg-top'),'INFO');
										});
									}catch(e) {
										casper.test.assertDoesntExist('button.button.btn-m.btn-blue');
									}
								} else {
									casper.echo('Message checkbox not found', 'ERROR');
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
			casper.echo('Error ', 'INFO');
		}
	});
	casper.then(function() {
		backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
		});
		return callback(null);
	});
};

//Method to enable Attachments from back end
privateMessageMethod.enableAttachments = function(driver, callback) {
	registerMethod.loginToForumBackEnd(casper, function(err) {
		if(!err) {
			wait.waitForElement('div#my_account_forum_menu', driver, function(err, isExists) {
				if(isExists) {
					driver.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					wait.waitForElement('div#ddSettings', casper, function(err, isExists) {
						if(isExists) {
							casper.click('div#ddSettings a:nth-child(2)');
							wait.waitForElement('input#FU', casper, function(err, isExists) {
								if(isExists) {
									utils.enableorDisableCheckbox('FU', true, casper, function() {
										casper.echo('checkbox is checked', 'INFO');
									});
									try {
										casper.test.assertExists('button.button.btn-m.btn-blue');
										casper.click('button.button.btn-m.btn-blue');
										casper.waitUntilVisible('div#ajax-msg-top', function() {
											casper.echo(casper.fetchText('div#ajax-msg-top'),'INFO');
										});
									}catch(e) {
										casper.test.assertDoesntExist('button.button.btn-m.btn-blue');
									}
								} else {
									casper.echo('Message checkbox not found', 'ERROR');
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
			casper.echo('Error ', 'INFO');
		}
	});
	casper.then(function() {
		backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
		});
		return callback(null);
	});
};

//Method to disable Attachments from back end
privateMessageMethod.disableAttachments = function(driver, callback) {
	registerMethod.loginToForumBackEnd(casper, function(err) {
		if(!err) {
			wait.waitForElement('div#my_account_forum_menu', driver, function(err, isExists) {
				if(isExists) {
					driver.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					wait.waitForElement('div#ddSettings', casper, function(err, isExists) {
						if(isExists) {
							casper.click('div#ddSettings a:nth-child(2)');
							wait.waitForElement('input#FU', casper, function(err, isExists) {
								if(isExists) {
									utils.enableorDisableCheckbox('FU', false, casper, function() {
										casper.echo('checkbox is unchecked', 'INFO');
									});
									try {
										casper.test.assertExists('button.button.btn-m.btn-blue');
										casper.click('button.button.btn-m.btn-blue');
										casper.waitUntilVisible('div#ajax-msg-top', function() {
											casper.echo(casper.fetchText('div#ajax-msg-top'),'INFO');
										});
									}catch(e) {
										casper.test.assertDoesntExist('button.button.btn-m.btn-blue');
									}
								} else {
									casper.echo('Message checkbox not found', 'ERROR');
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
			casper.echo('Error ', 'INFO');
		}
	});
	casper.then(function() {
		backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
		});
		return callback(null);
	});
};


// method to compose a private message to a user
privateMessageMethod.createMessage = function(data, driver, callback) {		
	driver.sendKeys('input[id="tokenfield_typeahead-tokenfield"]', data.to, {keepFocus:true});
	driver.sendKeys('input[id="tokenfield_typeahead-tokenfield"]', casper.page.event.key.Enter, {keepFocus:true} );
	driver.sendKeys('input[id="pm_subject"]', data.subject, {keepFocus:true});		
	driver.test.assertExists('textarea#pmessage_new');
	driver.evaluate(function() {
		document.querySelector('textarea#pmessage_new').click();
	});
	driver.waitUntilVisible('iframe#pmessage_new_ifr', function() {
		driver.withFrame('pmessage_new_ifr', function() {
			driver.sendKeys('#tinymce', driver.page.event.key.Ctrl,driver.page.event.key.A,{keepFocus: true});		
			driver.sendKeys('#tinymce', driver.page.event.key.Backspace, {keepFocus: true});
			driver.sendKeys('#tinymce', data.pmessage);
		});
	});
	driver.then(function() {
		driver.test.assertExists('a#send_pmsg_button');
		driver.click('a#send_pmsg_button');
		//driver.waitUntilVisible('div#loading_msg', function() {
			//driver.echo(casper.fetchText('div#loading_msg p'), 'INFO');
			driver.waitUntilVisible('div#ajax-msg-top', function success() {
				driver.echo(driver.fetchText('div#ajax-msg-top p'),'INFO');
			}, function fail() {
				driver.echo(casper.fetchText('div#pm_error_msg'), 'INFO');
			});	
			driver.then(function() {
				return callback(null);
			});
		//});
	});
};

// method to compose a private message to many user
privateMessageMethod.sendMessageToManyUser = function(data, driver, callback) {		
	driver.sendKeys('input[id="tokenfield_typeahead-tokenfield"]', data.to, {keepFocus:true});
	driver.sendKeys('input[id="tokenfield_typeahead-tokenfield"]', casper.page.event.key.Enter, {keepFocus:true} );
	driver.sendKeys('input[id="tokenfield_typeahead-tokenfield"]',json["RegisteredUserLogin"].username2, {keepFocus:true});
	driver.sendKeys('input[id="tokenfield_typeahead-tokenfield"]', casper.page.event.key.Enter, {keepFocus:true} );
	driver.sendKeys('input[id="pm_subject"]', data.subject, {keepFocus:true});		
	driver.test.assertExists('textarea#pmessage_new');
	driver.evaluate(function() {
		document.querySelector('textarea#pmessage_new').click();
	});
	driver.waitUntilVisible('iframe#pmessage_new_ifr', function() {
		driver.withFrame('pmessage_new_ifr', function() {
			driver.sendKeys('#tinymce', driver.page.event.key.Ctrl,driver.page.event.key.A,{keepFocus: true});		
			driver.sendKeys('#tinymce', driver.page.event.key.Backspace, {keepFocus: true});
			driver.sendKeys('#tinymce', data.pmessage);
		});
	});
	driver.then(function() {
		driver.test.assertExists('a#send_pmsg_button');
		driver.click('a#send_pmsg_button');
		//driver.waitUntilVisible('div#loading_msg', function() {
			//driver.echo(casper.fetchText('div#loading_msg p'), 'INFO');
			driver.waitUntilVisible('div#ajax-msg-top', function success() {
				driver.echo(driver.fetchText('div#ajax-msg-top p'),'INFO');
			}, function fail() {
				driver.echo(casper.fetchText('div#pm_error_msg'), 'INFO');
			});
			driver.then(function() {
				return callback(null);
			});
		//});
	});
};

// method to compose a private message to max limit user
privateMessageMethod.sendMessageToMaxLimitUser = function(data, driver, callback) {
	// Enter recipients
	driver.then(function() {
		for( var i = 0; i < data.length; i++) {
			driver.echo('Response Data : ' +data[i], 'INFO');
			driver.sendKeys('input[id="tokenfield_typeahead-tokenfield"]', data[i], {keepFocus:true});
			driver.sendKeys('input[id="tokenfield_typeahead-tokenfield"]', casper.page.event.key.Enter, {keepFocus:true} );
		}
	});
	driver.then(function() {
		driver.sendKeys('input[id="pm_subject"]', "Max Limit", {keepFocus:true});		
		driver.test.assertExists('textarea#pmessage_new');
		driver.evaluate(function() {
			document.querySelector('textarea#pmessage_new').click();
		});
		driver.waitUntilVisible('iframe#pmessage_new_ifr', function() {
			driver.withFrame('pmessage_new_ifr', function() {
				driver.sendKeys('#tinymce', driver.page.event.key.Ctrl,driver.page.event.key.A,{keepFocus: true});		
				driver.sendKeys('#tinymce', driver.page.event.key.Backspace, {keepFocus: true});
				driver.sendKeys('#tinymce', "Message Send to 25 user at same time");
			});
		});
		driver.then(function() {
			driver.test.assertExists('a#send_pmsg_button');
			driver.click('a#send_pmsg_button');
			//driver.waitUntilVisible('div#loading_msg', function() {
				//driver.echo(casper.fetchText('div#loading_msg p'), 'INFO');
				driver.waitUntilVisible('div#ajax-msg-top', function success() {
					driver.echo(driver.fetchText('div#ajax-msg-top p'),'INFO');
				}, function fail() {
					driver.echo(casper.fetchText('div#pm_error_msg'), 'INFO');
				});	
				driver.then(function() {
					return callback(null);
				});
			//});
		});
	});
};

// method to register 26 user
privateMessageMethod.registerUsers = function(driver, callback) {
	driver.thenOpen(config.url, function() {
		driver.echo('Title of the page :' +this.getTitle(), 'INFO');
		wait.waitForElement('li.pull-right a[href="/register/register"]', casper, function(err, isExist) {
			if(!err){
				if(isExist) {
					driver.test.assertExists('li.pull-right a[href="/register/register"]');
					driver.click('li.pull-right a[href="/register/register"]');
					wait.waitForElement('form[name="PostTopic"] input[name="member"]', casper, function(err, isExist){ 
						 if(isExist) {
							driver.echo('Successfully open register form.....', 'INFO');
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
	driver.eachThen(json['infoToRegisterUser'], function(response) {
		registerMethod.registerToApp(response.data, casper, function(err) {
			if(!err) {
				casper.echo('Processing to registration on forum.....', 'INFO');
				registerMethod.redirectToLogout(casper, casper.test, function(err) {
					if(!err) {
						casper.echo('User logout successfully', 'INFO');
					}
				});
			}
		});
	});
	driver.then(function() {
		return callback(null);
	});
};

