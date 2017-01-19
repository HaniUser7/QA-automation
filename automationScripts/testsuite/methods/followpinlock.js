'use strict';
var wait = require('../wait.js');
var utils = require('../utils.js');
var forumLoginMethod = require('../methods/login.js');
var composeTopicMethod = require('../methods/composeTopic.js');
var json = require('../../testdata/loginData.json');
var registerMethod = require('./register.js');
var followpinlockMethod=module.exports = {};
var errorMessage = "";


//1.Method for logout from application
followpinlockMethod.logoutFromApp = function(driver,test, callback) {
	
	try {
		test.assertExists('div#account_sub_menu a:nth-of-type(2)');
		driver.click('div#account_sub_menu a:nth-of-type(2)');
		try{
			test.assertExists('div#ddAccount a:nth-of-type(5)');
			driver.click('div#ddAccount a:nth-of-type(5)');
			wait.waitForElement('div#content_wrapper div.text', casper, function(err, isExist) {
				if(isExist) {
					var logout = driver.fetchText('div#content_wrapper div.text');
					driver.echo("message : "+logout, 'INFO');
					return callback(null);
				} else {
					driver.echo('Logout  message not generated', 'ERROR');
					return callback(null);
				}
			});
		} catch(e) {
			driver.test.assertDoesntExist('div#ddAccount a:nth-of-type(5)');
			return callback(null);
		}
	} catch(e) {
		driver.test.assertDoesntExist('div#account_sub_menu a:nth-of-type(2)');
		return callback(null);
	}
};



