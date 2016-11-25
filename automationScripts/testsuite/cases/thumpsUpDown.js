/***These are the function which has been called in thumpsUpDownMethod.js and also will be used in other js file as per requirement**********/

'use strict';
var json = require('../../testdata/forgotpasswordData.json');
var config = require('../../../config/config.json');
var thumpsUpDownMethod = require('../methods/thumpsUpDown.js');
var wait = require('../wait.js');
var thumpsUpDownTestcases = module.exports = {};
//var forumLogin = require('./login.js');
thumpsUpDownTestcases.errors = [];

// method to verify the thumbs up and down for guest user(unregister user) on post listing page
thumpsUpDownTestcases.unregisterUserOnPostListingPage = function() {
		casper.echo('                                      CASE 1', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*                                 LIKE POST FROM TOPIC PAGE                        *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.test.assertExists('i.icon.icon-menu');
		casper.click('i.icon.icon-menu');
		casper.test.assertExists('a[href="/latest"]');
		casper.click('a[href="/latest"]');
		casper.waitForSelector('form[name="posts"] a.topic-title', function success() {
			casper.click('form[name="posts"] a.topic-title');
			casper.waitForSelector('i.glyphicon.glyphicon-like-alt', function success() {
				casper.click('i.glyphicon.glyphicon-like-alt');
				casper.waitForSelector('div#form-dialog[aria-hidden="false"]', function success() {
					casper.test.assertExists('div#form-dialog[aria-hidden="false"]');
					casper.test.assertExists('button#bootstrap_close_register_dialog');
					casper.click('button#bootstrap_close_register_dialog');
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			
			}, function fail() {
				casper.echo('ERROR OCCURRED', 'ERROR');
			});
		}, function fail() {
			casper.echo('ERROR OCCURRED', 'ERROR');
		});
	
	/*casper.then(function() {
		casper.echo('                                      CASE 2', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('DISLIKE POST FROM TOPIC PAGE', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});
	
	casper.then(function() {
		test.assertExists('i.icon.icon-menu');
		this.click('i.icon.icon-menu');
		test.assertExists('a[href="/latest"]');
		this.click('a[href="/latest"]');
		casper.waitForSelector('form[name="posts"] a.topic-title', function success() {
			this.click('form[name="posts"] a.topic-title');
			casper.waitForSelector('a.dislike_post.text-muted', function success() {
				this.click('a.dislike_post.text-muted');
				casper.waitForSelector('div#form-dialog[aria-hidden="false"]', function success() {
					test.assertExists('div#form-dialog[aria-hidden="false"]');
					test.assertExists('button#bootstrap_close_register_dialog');
					this.click('button#bootstrap_close_register_dialog');
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			
			}, function fail() {
				casper.echo('ERROR OCCURRED', 'ERROR');
			});
		}, function fail() {
			casper.echo('ERROR OCCURRED', 'ERROR');
		});
	});*/
};
	
	
