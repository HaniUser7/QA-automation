/***These are the function which has been called in thumpsUpDownMethod.js and also will be used in other js file as per requirement**********/

'use strict';
var json = require('../../testdata/forgotpasswordData.json');
var config = require('../../../config/config.json');
var thumpsUpDownMethod = require('../methods/thumpsUpDown.js');
var registerMethod = require('../methods/register.js');
var forumLoginMethod = require('../methods/login.js');
var wait = require('../wait.js');
var thumpsUpDownTestcases = module.exports = {};
//var forumLogin = require('./login.js');
thumpsUpDownTestcases.errors = [];

// method to verify the thumbs up for guest user(unregister user) on post listing page
thumpsUpDownTestcases.unregisterUserOnPostListingPageLike = function() {
	casper.echo('                                      CASE 1a', 'INFO');
	casper.echo('************************************************************************************', 'INFO');
	casper.echo('*                        LIKE POST From Post Listing Page                          *', 'INFO');
	casper.echo('************************************************************************************', 'INFO');
	casper.click('form[name="posts"] a.topic-title');
	wait.waitForElement('i.glyphicon.glyphicon-like-alt', casper, function(err, isExists) {
		if(isExists) {
			casper.click('i.glyphicon.glyphicon-like-alt');
			wait.waitForElement('div#form-dialog[aria-hidden="false"]', casper, function(err, isExists) {
				if(isExists) {
					casper.test.assertExists('button#bootstrap_close_register_dialog','Close button at the Pop Up');
					casper.click('button#bootstrap_close_register_dialog');
				} else {
					casper.echo('Pop Up not found','INFO');
				}
			});
		} else {
			casper.echo('Like button not found','INFO');
		}
	});
};
// method to verify the thumbs down for guest user(unregister user) on post listing page
thumpsUpDownTestcases.unregisterUserOnPostListingPageDislike = function() {
	casper.thenOpen(config.url, function() {
		casper.echo('                                      CASE 1b', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*                        DISLIKE POST From Post Listing Page                       *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.click('form[name="posts"] a.topic-title');
		wait.waitForElement('i.glyphicon.glyphicon-dislike-alt', casper, function(err, isExists) {
			if(isExists) {
				casper.click('i.glyphicon.glyphicon-dislike-alt');
				wait.waitForElement('div#form-dialog[aria-hidden="false"]', casper, function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('button#bootstrap_close_register_dialog','Close button at the Pop Up');
						casper.click('button#bootstrap_close_register_dialog');
					} else {
						casper.echo('Pop Up not found','INFO');
					}
				});
			} else {
				casper.echo('Dislike button not found','INFO');
			}
		});
	});
};
// method to verify the thumbs up and down for guest user(unregister user) on Topic listing page"""
thumpsUpDownTestcases.unregisterUserOnTopicListingPageLike = function() {
	casper.thenOpen(config.url, function() {
		casper.echo('                                      CASE 2', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*                           LIKE POST From Topic Listing Page                       *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.test.assertExists('i.glyphicon.glyphicon-like-alt','Like button on the topic listing page');
		casper.click('i.glyphicon.glyphicon-like-alt');
		wait.waitForElement('div#form-dialog[aria-hidden="false"]', casper, function(err, isExists) {
			if(isExists) {
				casper.test.assertExists('button#bootstrap_close_register_dialog','Close button at the Pop Up');
				casper.click('button#bootstrap_close_register_dialog');
			} else {
				casper.echo('Pop Up not found','INFO');
			}
		});
	});
};
// method to verify the thumbs up and down for (register user) on Post listing page
thumpsUpDownTestcases.registerUserOnTopicListingPageLike = function() {
	casper.thenOpen(config.url, function() {
		casper.echo('                                      CASE 4', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*                           LIKE POST From Post Listing Page                       *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
			casper.test.assertExists('a[href="/register/login"]');
			this.click('a[href="/register/login"]');
			forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function() {
				casper.echo('Processing to Login on forum.....', 'INFO');
				wait.waitForElement('i.icon.icon-menu', casper, function(err, isExists) {
					if(isExists) {
						casper.click('i.icon.icon-menu');
						casper.test.assertExists('a[href="/latest"]');
						casper.click('a[href="/latest"]');
						wait.waitForElement('form[name="posts"] a.topic-title', casper, function(err, isExists) {
							if(isExists) {
								casper.click('form[name="posts"] a.topic-title');
								
								wait.waitForElement('i.glyphicon.glyphicon-like-alt', casper, function(err, isExists) {
									casper.capture('b.png');
									if(isExists) {
										casper.click('i.glyphicon.glyphicon-like-alt');
										casper.then(function() {
											try {
												casper.test.assertExists('a.login_dialog.text-muted.voted-yes');
												casper.echo('CLICK OF THUMBS UP FROM TOPIC PAGE.....', 'INFO');
											} catch(e) {
												casper.test.assertExists('a.login_dialog.text-muted');
												casper.echo('CLICK OF THUMBS UP FROM TOPIC PAGE.....', 'INFO');
											};
										});
		
									} else {
										casper.echo('Like button not found', 'INFO');
									}
								});
							} else{
								casper.echo('Topic not found', 'INFO');
							}
						});
					} else {
						casper.echo('Menu not found', 'INFO');
					}
				});
			});
	});
};
// method to verify with click on likers/dislikers username when disable view profile permission ->AS A REGISTER USER 

