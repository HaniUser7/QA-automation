/***These are the function which has been called in above test cases and also will be used in other js file as per requirement**********/
'use strict';

var config = require('../../../config/config.json');
var backArrowMethods = module.exports = {};
var wait = require('../wait.js');

backArrowMethods.startTopic = function(data,driver,callback){
	driver.click('a[href^="/post/printadd"]');
	driver.waitForSelector('#message_ifr',function success(){								
		driver.sendKeys('input[name="subject"]', data.subject, {reset:true});								
		driver.withFrame('message_ifr', function() {
			driver.sendKeys('#tinymce', driver.page.event.key.Ctrl,driver.page.event.key.A, {keepFocus: true});			
			driver.sendKeys('#tinymce', driver.page.event.key.Backspace, {keepFocus: true});
			driver.sendKeys('#tinymce',data.content);
		});
		driver.waitForSelector('#all_forums_dropdown', function success() {
			driver.click('#all_forums_dropdown');
			var val = driver.fetchText('#all_forums_dropdown option[value="537762"]');
			driver.fill('form[name="PostTopic"]',{
				'forum' : val.trim()
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


backArrowMethods.selectCategory = function(data,driver,callback){
	driver.test.assertExists('i.icon.icon-menu');
	driver.click('i.icon.icon-menu');
	driver.test.assertExists('a[href="/categories"]');
	driver.click('a[href="/categories"]');
	wait.waitForElement('.table-responsive ul li', driver, function(err, isExists) {	
		if(!err){
			if(isExists) {
				driver.test.assertExists('.table-responsive ul li:nth-child(1) a');
				driver.click('.table-responsive ul li:nth-child(1) a');
				wait.waitForElement('#back_arrow_topic', driver, function(err, isExists) {	
					if(!err){
						if(isExists) {
							try{
								driver.test.assertExists('a#topics_tab');
								driver.click('a#topics_tab');
							}catch(e){
								driver.test.assertDoesntExist('a#topics_tab');
							}   
							wait.waitForElement('.panel-heading li:nth-child(1).active', driver, function(err, isExists) {	
								if(!err){
									if(isExists) {
										try{
											driver.test.assertExists('span.topic-content a');
											return callback(null);	
										}catch(e){
											driver.test.assertDoesntExist('span.topic-content a');
											backArrowMethods.startTopic(data, driver, function(err){
												if(!err){
													driver.capture('234.png');
													driver.test.assertExists('#backArrowPost');
													driver.click('#backArrowPost');
													wait.waitForElement('#back_arrow_topic', driver, function(err, isExists) {	
														if(!err){
															if(isExists) {
																return callback(null);															
															} else {
																driver.echo('Back arrow does not appears in 5 seconds ', 'ERROR');
															}	
														}
													});												}
											});							
										}
											
									} else {
										driver.echo('latest topic is not appeared in 5 seconds ', 'ERROR');
									}	
								}
							});
						} else {
							driver.echo('Category Doesnot open Sucessfully', 'ERROR');
						}	
					}
				});
			} else {
				driver.echo('Category Doesnot open Sucessfully', 'ERROR');
			}	
		}
	});
}

//Method to change the approval new post permission to all post
var approveAllPost=function(driver,callback){
	driver.thenOpen(config.backEndUrl,function() {
		driver.echo('Login To Backend URL and Enable Approve New Posts', 'INFO');
		driver.echo('Title of the page :' +driver.getTitle(), 'INFO');
		driver.echo('---------------------------------------------------------------------------');		
		//setting page -> security page
		driver.waitForSelector('a[data-tooltip-elm="ddSettings"]', function success() {
			driver.test.assertExists('a[data-tooltip-elm="ddSettings"]');
			driver.click('a[data-tooltip-elm="ddSettings"]');
			driver.waitForSelector('a[href="/tool/members/mb/settings?tab=Security"]', function success() {
				driver.test.assertExists('a[href="/tool/members/mb/settings?tab=Security"]');
				driver.click('a[href="/tool/members/mb/settings?tab=Security"]');
				driver.waitForSelector('#post_approval', function success() {
					driver.test.assertExists('#post_approval');
					driver.click('#post_approval');
					driver.sendKeys('select[name="post_approval"] option[value="99"]', 'All posts');
					driver.test.assertExists('button[type="submit"]');
					driver.click('button[type="submit"]');
					driver.waitUntilVisible('div#ajax-msg-top', function success() {
						driver.echo('Forum Settings Changed Successfully','INFO');
						driver.test.assertExists('a[data-tooltip-elm="ddAccount"]');
						driver.click('a[data-tooltip-elm="ddAccount"]');
						driver.test.assertExists('a[href="/tool/members/login?action=logout"]');
						driver.click('a[href="/tool/members/login?action=logout"]');
						wait.waitForElement('form[name="frmLogin"]', driver, function(err, isExists) {	
							if(!err){
								if(isExists) {
									driver.echo('Logout Succesfully......','INFO');
									return callback(null);
								} else {
									driver.echo('Unable to logout successfully', 'ERROR');
								}	
							}
						});
						},function fail(){
							driver.echo('Forum setting is not changed','ERROR');
					});
					}, function fail() {
						driver.echo('Post approval checkbox does not appears','ERROR');
				});
				}, function fail() {
					driver.echo('Forum Setting page is not visible','ERROR');
			});
			}, function fail() {
				driver.echo('Setting link is not visible','ERROR');
		});

	});
}




