/***These are the function which has been called in above test cases and also will be used in other js file as per requirement**********/
'use strict';

var config = require('../../../config/config.json');
var addNewTopicMethods = module.exports = {};
var wait = require('../wait.js');
var forumRegisterMethods = require('./register.js');
var forumLoginMethod  = require('./login.js');

//Method to start new topic in General category
addNewTopicMethods.startTopic = function(data,driver,callback){
	driver.click('a[href^="/post/printadd"]');
	driver.waitForSelector('#message_ifr',function success(){								
		driver.sendKeys('input[name="subject"]', data.subject, {reset:true});								
		driver.withFrame('message_ifr', function() {
			driver.sendKeys('#tinymce', driver.page.event.key.Ctrl,driver.page.event.key.A, {keepFocus: true});			
			driver.sendKeys('#tinymce', driver.page.event.key.Backspace, {keepFocus: true});
			driver.sendKeys('#tinymce',data.content);
		});
		driver.waitForSelector('#all_forums_dropdown', function success() {
			var Category = driver.evaluate(function() {
				var Category=document.querySelector('#all_forums_dropdown');
				return Category[1].value;
			});
			driver.fill('form[name="PostTopic"]',{
				'forum' : Category
			},false);
			driver.click('#post_submit');
			driver.waitForSelector('span[id^=post_message]',function success(){ 
				return callback(null);
				},function fail(){
					driver.echo('Topic does not Started Successfully','ERROR');
			});
			}, function fail() {
				driver.waitForSelector('#post_submit',function success() {												
					driver.test.assertExists('#post_submit');
					driver.click('#post_submit');
					driver.waitForSelector('span[id^=post_message]',function success(){ 
						return callback(null);
						},function fail(){
							driver.echo('Topic does not Started Successfully','ERROR');
					});
					},function fail(){
						driver.echo('Unable to submit form','ERROR');
				});
		});
		},function fail(){
			driver.echo('Unable to Open Form To Start Topic','ERROR');
	});
};

