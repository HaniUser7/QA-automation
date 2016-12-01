/***These are the function which has been called in above test cases and also will be used in other js file as per requirement**********/
'use strict';

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
																casper.echo('Back arrow does not appears in 5 seconds ', 'ERROR');
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




