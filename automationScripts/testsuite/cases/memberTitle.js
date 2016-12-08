/****This script is dedicated for Member on the forum. It covers testing of move topic/post with all defined validations****/

"use strict";

var memberTitleTests= module.exports = {};

var wait = require('../wait.js');

var forumLoginMethods  = require('../methods/login.js');

var json  = require('../../testdata/memberTitle.json');

var forumRegisterMethods = require('../methods/register.js');

var memberTitleMethods = require('../methods/memberTitle.js');

var backArrowMethod  = require('../methods/backArrow.js');


memberTitleTests.addTitle= function() {

	/*****verify add new automatic member title.e*****/
	casper.echo('verify add new automatic member title.', 'INFO');
	forumRegisterMethods.loginToForumBackEnd(casper, casper.test, function(err) {
		if(!err){
			casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
			casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
			casper.test.assertExists('a[href^="/tool/members/mb/titles"]');
			casper.click('a[href^="/tool/members/mb/titles"]');
			casper.eachThen(json['Member'], function(response) {
				casper.log('Response Data : ' +JSON.stringify(response.data), 'INFO');
				var responseData = response.data;
				wait.waitForElement('a[href="titles?action=edit"]', casper, function(err, isExists) {	
					if(!err){
						if(isExists) {
							casper.click('a[href="titles?action=edit"]');
							wait.waitForElement('form[action="/tool/members/mb/titles"]', casper, function(err, isExists) {	
								if(!err){
									if(isExists) {
										casper.fill('form[action="/tool/members/mb/titles"]',{
												'title': responseData.title,
												'min_posts': responseData.numberofpost
										},false);
										casper.click('.button.btn-m.btn-blue');
									}else{
										casper.echo('Form Doesnt Exist to add new title','ERROR');
									}
								}
							});
						}else{
							casper.echo('Link not found','ERROR');
						}
					}
				});
			});	
		}
	});
			
}; 

memberTitleTests.post10Topics= function() {

	/*****verify automatic member title for user who post 10 topics*****/
	casper.echo('verify automatic member title for user who post 10 topics', 'INFO');
	casper.thenOpen(config.url,function(){
		forumLoginMethods.loginToApp(json['registered_user'].username, json['registered_user'].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExists) {	
					if(!err){
						if(isExists) {
							memberTitleMethods.postTopic(10,casper,function(err){
								if(!err){
									casper.test.assertExists('ul.nav.pull-right span.caret');
									casper.click('ul.nav.pull-right span.caret');
									casper.test.assertExists('#user-nav-panel-profile');
									casper.click('#user-nav-panel-profile');
									wait.waitForElement('span.profile-title', casper, function(err, isExists) {	
										if(!err){
											if(isExists) {
												var msg = casper.fetchText('.profile-title');
												casper.echo(msg.trim(),'INFO')
				
											} else {
												casper.echo('User Profile does not open Sucessfully ', 'ERROR');
											}	
										}
									});
								}
							});	
						} else {
							casper.echo('Unable to successfully login ', 'ERROR');
						}	
					}
				});
			}
		});
	});		
}; 

memberTitleTests.post15Topics =function() {

	/*****verify automatic member title for user who post 15 topics*****/
	casper.then(function(){
		casper.echo('verify automatic member title for user who post 15 topics', 'INFO');
		casper.thenOpen(config.url,function(){
			wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExists) {	
				if(!err){
					if(isExists) {
						memberTitleMethods.postTopic(5,casper,function(err){
							if(!err){
								casper.test.assertExists('ul.nav.pull-right span.caret');
								casper.click('ul.nav.pull-right span.caret');
								casper.test.assertExists('#user-nav-panel-profile');
								casper.click('#user-nav-panel-profile');
								wait.waitForElement('span.profile-title', casper, function(err, isExists) {	
									if(!err){
										if(isExists) {
											var msg = casper.fetchText('.profile-title');
											casper.echo(msg.trim(),'INFO');

										} else {
											casper.echo('User Profile does not open Sucessfully ', 'ERROR');
										}	
									}
								});
							}
						});	
					} else {
						casper.echo('Unable to successfully login ', 'ERROR');
					}	
				}
			});
		});
	});			
}; 









