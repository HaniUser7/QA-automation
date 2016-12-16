/***These are the function which has been called in privateMessage.js and also will be used in other js file as per requirement**********/

'use strict';
var registerMethod = require('./register.js');
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
		driver.waitUntilVisible('div#ajax-msg-top', function() {
			driver.echo(driver.fetchText('div#ajax-msg-top p'),'INFO');
			return callback(null);
		});
	});
};
