/****This script is dedicated for start new topic on the forum. It covers testing of topic detail page with all defined validations****/

"use strict";

var utils = require('./utils.js');
var forumRegister = require('./register.js');
var pinTopic = require('./pinTopic.js');
var moveTopic = require('./moveTopic.js');
var lock_unLockTopic = require('./lock_unLockTopic.js');
var editTopic = require('./editTopic.js');
var postAReply = require('./postAReply.js');
var deleteTopic = require('./deleteTopic.js');
var poll = require('./poll.js');
var json = require('../testdata/topic.json');
var forumLogin = require('./forum_login.js');
var config = require('../config/config.json');

var newTopic = module.exports = {};
var screenShotsDir = config.screenShotsLocation + 'newTopic/';

newTopic.featureTest = function(casper, test, x, callback) {
		
		casper.start(config.url, function() {
			casper.echo('start pin topic, move topic and lock/un-lock topic', 'INFO');
			casper.echo('title of the page : ' +this.getTitle(), 'INFO');
		});
		//start pin/unpin topic
		casper.then(function() {
			casper.echo('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
			casper.echo('start pin / unpin topic ', 'INFO');
			pinTopic.pinUnPinFeature(casper,test, x, function(){
				casper.echo('Pin Unpin Topic Feature', 'INFO');
			});
		});

		//start move topic
		casper.then(function() {
			casper.echo('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
			casper.echo('start move topic ', 'INFO');
			moveTopic.moveTopicFeature(casper,test, x, function(){
				casper.echo('move Topic Feature', 'INFO');
			});
		});

		//start lock/unLock topic
		casper.then(function() {
			casper.echo('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
			casper.echo('start Lock / unLock topic ', 'INFO');
			lock_unLockTopic.lockUnLockFeature(casper,test, x, function(){
				casper.echo('Lock UnLock Topic Feature', 'INFO');
			});
		});
	return callback;
};


//private methods


/************************************PRIVATE METHODS***********************************/


// method for goto New Topic page to application

var gotoNewTopicpage = function(driver, callback) {
	driver.click('#links-nav');
	driver.click('#latest_topics_show');
	driver.click('a[href="/post/printadd"]');
	driver.then(function() {
		this.capture(screenShotsDir+ 'startTopic.png');
	});
	return callback();
};


// method for goto New Topic page to application

var postTopicpage = function(data, driver, callback) {
	driver.sendKeys('input[name="subject"]', data.title, {reset:true});
	 driver.withFrame('message_ifr', function() {
		this.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
		this.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
 		this.sendKeys('#tinymce', data.content);
	});	
	driver.then(function() {
		if(data.category) {
			driver.click('#all_forums_dropdown');
			var val = this.fetchText('#all_forums_dropdown option[value="188757"]');
			driver.fill('form[name="PostTopic"]',{
				'forum' : val.trim()
			},false);
			driver.capture(screenShotsDir+ 'content.png');
		}
	});	
	driver.then(function() {
		driver.click('#post_submit');
	});
	
	return callback();
};

// method for verify post content Topic page to application

var verifyPostContent = function(content, driver, callback) {
	var contentMsg = driver.fetchText('div.post-body-content span[id^="post_message_"]');
	casper.echo('***********************  contentMsg' +contentMsg.trim());
	driver.test.assertEquals(content,contentMsg.trim(), content+' and verified post content');
	casper.echo('---------------------------------------------------------------------------');
	return callback();
};

// method for follow content on follow content page to application

var verifyFollowContent = function(driver, callback) {
		var url = driver.getCurrentUrl();
		url = url.split("#");
		url= url[0].split(".com");			
		driver.click('li.user-panel .dropdown-toggle');
		driver.capture(screenShotsDir+ 'dropdown.png');
		driver.click('span.user-nav-panel li a[href^="/search"]');
		driver.then(function() {
			this.capture(screenShotsDir+ 'followedContent.png');
		});
		driver.then(function() {
			casper.echo('a[href="'+url[1]+'"]','INFO');
			this.test.assertExists('span.topic-content h4 a[href="'+url[1]+'"]');
			casper.echo('---------------------------------------------------------------------------');
		});
	return callback();
};

// method for verify unFollow content on follow content page to application

var verifyUnFollowContent = function(driver, callback) {
		var url = driver.getCurrentUrl();
		url = url.split("#");
		url= url[0].split(".com");
		driver.click('li.user-panel .dropdown-toggle');
		driver.capture(screenShotsDir+ 'dropdown.png');
		driver.click('span.user-nav-panel li a[href^="/search"]');
		driver.then(function() {
			this.capture(screenShotsDir+ 'followedContent.png');
		});
		driver.then(function() {
			this.test.assertDoesntExist('span.topic-content h4 a[href="'+url[1]+'"]');
			casper.echo('---------------------------------------------------------------------------');
		});
			json.newTopic.tempHref = 'a[href="'+url[1]+'"]';
		
	return callback();
};

// verify warning message for follow content and follow category

var verifyWarningMsg = function(warningMsg, driver, callback){

	var warningMessage = driver.fetchText('.no-space');
	casper.echo('warningMessage : ' +warningMessage.trim());
	driver.test.assertEquals(warningMessage.trim(), warningMsg.trim(), warningMessage.trim()+' and warning message is verified');
	casper.echo('---------------------------------------------------------------------------');
	return callback();
};
