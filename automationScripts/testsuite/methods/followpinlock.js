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

//2.Method for create topic
followpinlockMethod.startTopic = function(value1,value2,value3,data,driver,callback) {
   
	driver.click('a.pull-right.btn.btn-uppercase.btn-primary');
	driver.waitForSelector('div.post-body.pull-left',function success() {   
		driver.sendKeys('input[name="subject"]',data.to,{reset:true});								
		driver.withFrame('message_ifr', function() {
			driver.sendKeys('#tinymce', driver.page.event.key.Ctrl,driver.page.event.key.A, {keepFocus: true});			
			driver.sendKeys('#tinymce', driver.page.event.key.Backspace, {keepFocus: true});
			driver.sendKeys('#tinymce',data.subject);
		});
		driver.waitForSelector('#all_forums_dropdown', function success() {
			driver.click('#all_forums_dropdown');
			driver.fill('form[name="PostTopic"]',{
				'forum' : 'General',
				'e_reply': value1,
				'pin': value2,
				'locked': value3
			},false);
			driver.then(function() {
			    driver.test.assertExists('form#PostTopic div div:nth-child(1) div ul li:nth-child(2) a');
				driver.click('form#PostTopic div div:nth-child(1) div ul li:nth-child(2) a');
				driver.sendKeys('#poll_question','PM of india');
				driver.sendKeys('#public',true);
				driver.sendKeys('span#poll_option_1 div input','Modi');
				driver.sendKeys('span#poll_option_2 div input','Rahul');
				driver.sendKeys('#multiple',true);
			    driver.capture('check.png');
				driver.click('#save_poll');
			});
		}, function fail() {
			driver.waitForSelector('#post_submit',function success() {				
				driver.test.assertExists('#post_submit');
				driver.click('#post_submit');
			},function fail() {
				driver.echo('Unable to submit form','ERROR');
			});
		});
	},function fail(){
		driver.echo('Unable to Open Form To Start Topic','ERROR');
	});
	driver.then(function() {
		return callback(null);
	});
};

