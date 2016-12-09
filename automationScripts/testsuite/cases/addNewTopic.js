/****This script is dedicated for add new topics on the forum. It covers testing of add new topics with all defined validations****/

"use strict";

var addNewTopicTests = module.exports = {};

var wait = require('../wait.js');

var forumLoginMethod  = require('../methods/login.js');

var addNewTopicMethod  = require('../methods/addNewTopic.js');

var json  = require('../../testdata/addNewTopicData.json');


addNewTopicTests.addNewCategory = function() {

	/*****Add New Topic with selecting category and verify message*****/
	casper.echo('Add New Topic with selecting category and verify message', 'INFO');
	forumLoginMethod.loginToApp(json['registered_user'].username, json['registered_user'].password, casper, function(err) {
		if(!err) {
			wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExists) {	
				if(!err){
					if(isExists) {
						casper.test.assertExists('i.icon.icon-menu');
						casper.click('i.icon.icon-menu');
						casper.test.assertExists('a[href="/categories"]');
						casper.click('a[href="/categories"]');
						wait.waitForElement('.table-responsive ul li', casper, function(err, isExists) {	
							if(!err){
								if(isExists) {
									casper.test.assertExists('.table-responsive ul li:nth-child(1) a');
									casper.click('.table-responsive ul li:nth-child(1) a');
									wait.waitForElement('#back_arrow_topic', casper, function(err, isExists) {	
										if(!err){
											if(isExists) {
												/*addNewTopicMethod.startTopic(json["StartTopic"],casper,function(err){
													if(!err){
														var msg = casper.fetchText('span[id^=post_message]');
														

														casper.test.assertEquals(msg.trim(),json["StartTopic"].content);
														casper.echo('Verified Posted Message','INFO');
													}
												});*/
												
											} else {
												casper.echo('Category Doesnot open Sucessfully', 'ERROR');
											}	
										}
									});
								} else {
									casper.echo('Category Doesnot open Sucessfully', 'ERROR');
								}	
							}
						});
					} else {
						casper.echo('Unable to successfully login ', 'ERROR');
					}	
				}
			});
		}
	});		
}; 

addNewTopicTests.addNewTopicInHindi = function() {
	casper.then(function(){
		/*****Add New Topic with hindi text and verify message*****/
		casper.echo('Add New Topic with hindi text and verify message', 'INFO');
		casper.thenOpen(config.url,function(){
			wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExists) {	
				if(!err){
					if(isExists) {
						addNewTopicMethod.startTopic(json["StartTopicInHindi"],casper,function(err){
							if(!err){
								var msg = casper.fetchText('span[id^=post_message]');
								casper.test.assertEquals(msg.trim(),json["StartTopicInHindi"].content);
								casper.echo('Verified Posted Message','INFO');
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

addNewTopicTests.postPreview = function() {
	casper.then(function(){
		/*****Verify Post preview of entered message*****/
		casper.echo('Verify Post preview of entered message', 'INFO');
		casper.thenOpen(config.url,function(){
			wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExists) {	
				if(!err){
					if(isExists) {
						casper.test.assertExists('a[href^="/post/printadd"]');
						casper.click('a[href^="/post/printadd"]');
						wait.waitForElement('#message_ifr', casper, function(err, isExists) {	
							if(!err){
								if(isExists) {
									casper.sendKeys('input[name="subject"]', json["StartTopic"].subject, {reset:true});
									casper.withFrame('message_ifr', function() {
										casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
										casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
										casper.sendKeys('#tinymce',json["StartTopic"].content);
									});	
									wait.waitForElement('#all_forums_dropdown', casper, function(err, isExists) {	
										if(!err){
											if(isExists) {
												var Category = casper.evaluate(function(a) {
													var Category=document.querySelector('#all_forums_dropdown');
													return Category[1].value;
												});
												casper.fill('form[name="PostTopic"]',{
													'forum' : Category
												},false);
												casper.test.assertExists('#previewpost_sbt');
												casper.click('#previewpost_sbt');
												wait.waitForElement('#post_message_0', casper, function(err, isExists) {	
													if(!err){
														if(isExists) {
															var msg = casper.fetchText('#post_message_0');
															casper.test.assertEquals(msg.trim(),json["StartTopic"].content);
															casper.echo('Message Verified','INFO');	
															casper.test.assertExists('#cancel_post');
															casper.click('#cancel_post');							
														} else {
															casper.echo('Post for preview does not appear','ERROR');
														}	
													}
												});
																			
											} else {
												casper.echo('Category Dropdown doesnt appears','ERROR');
											}	
										}
									});
								} else {
									casper.echo('Unable to Open Form To Start Topic','ERROR');
								}	
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

addNewTopicTests.postPreviewwithImage = function() {
	casper.then(function(){
		/*****Verify Post preview with image of entered message*****/
		casper.echo('Verify Post preview with image of entered message', 'INFO');
		casper.thenOpen(config.url,function(){
			wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExists) {	
				if(!err){
					if(isExists) {
						casper.test.assertExists('a[href^="/post/printadd"]');
						casper.click('a[href^="/post/printadd"]');
						wait.waitForElement('#message_ifr', casper, function(err, isExists) {	
							if(!err){
								if(isExists) {
									casper.sendKeys('input[name="subject"]', json["StartTopic"].subject, {reset:true});
									casper.test.assertExists('.mceIcon.mce_imagebutton');
									casper.click('.mceIcon.mce_imagebutton');
									wait.waitForTime(3000,casper,function(err){
										if(!err){
											casper.sendKeys('#web_image_url','',{reset:true}); 												casper.sendKeys('#web_image_url',json["url"].link);
											//casper.test.assertExists('#insert_image_btn');
											//casper.click('#insert_image_btn');
											wait.waitForTime(5000,casper,function(err){
												if(!err){
													casper.test.assertExists('#insert_image_btn');
													casper.click('#insert_image_btn');
													
													wait.waitForTime(5000,casper,function(err){
														if(!err){
															casper.capture('1234.png');

														}
													});
												}
											});
										}
									});
									
								} else {
									casper.echo('Unable to Open Form To Start Topic','ERROR');
								}	
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

addNewTopicTests.verifyErrorMsg = function() {
	casper.then(function(){
		/*****Verify Error message after entering message more than 65000 charecters while adding new Topic*****/
		casper.echo('Verify Error message after entering message more than 65000 charecters while adding new Topic', 'INFO');
		casper.thenOpen(config.url,function(){
			wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExists) {	
				if(!err){
					if(isExists) {
						casper.test.assertExists('a[href^="/post/printadd"]');
						casper.click('a[href^="/post/printadd"]');
						wait.waitForElement('#message_ifr', casper, function(err, isExists) {	
							if(!err){
								if(isExists) {
									casper.sendKeys('input[name="subject"]', json["StartTopic65000words"].subject, {reset:true});
									casper.withFrame('message_ifr', function() {
										casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
										casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
										casper.sendKeys('#tinymce',json["StartTopic65000words"].content);
									});	
									wait.waitForElement('#all_forums_dropdown', casper, function(err, isExists) {	
										if(!err){
											if(isExists) {
												var Category = casper.evaluate(function(a) {
													var Category=document.querySelector('#all_forums_dropdown');
													return Category[1].value;
												});
												casper.fill('form[name="PostTopic"]',{
													'forum' : Category
												},false);
												casper.test.assertExists('#post_submit');
												casper.click('#post_submit');
												wait.waitForElement('.alert.alert-danger.text-center', casper, function(err, isExists) {	
													if(!err){
														if(isExists) {
															var msg = casper.fetchText('.alert.alert-danger.text-center');
												
															casper.echo(msg.trim(),'INFO');	
																								} else {
															casper.echo('Alert message doesnt visible','ERROR');
														}	
													}
												});
																			
											} else {
												casper.echo('Category Dropdown doesnt appears','ERROR');
											}	
										}
									});
								} else {
									casper.echo('Unable to Open Form To Start Topic','ERROR');
								}	
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


addNewTopicTests.composeCategoryListingPage = function() {
	casper.then(function(){
		/*****Verify Compost Topic on Category Listing Page(For Guest/Registered User/Admin)*****/
		casper.echo('Verify Compost Topic on Category Listing Page For Guest/Registered User/Admin)', 'INFO');
		casper.thenOpen(config.url,function(){
			wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExists) {	
				if(!err){
					if(isExists) {
						casper.test.assertExists('a[href="/categories"]');
						casper.click('a[href="/categories"]');
						wait.waitForElement('.table-responsive ul li', casper, function(err, isExists) {	
							if(!err){
								if(isExists) {
									addNewTopicMethod.startTopic(json["StartTopic"],casper,function(err){
										if(!err){
											casper.echo('Topic Started Successfully','INFO');
										}
									});
								} else {
									casper.echo('Category Doesnot open Sucessfully', 'ERROR');
								}	
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

addNewTopicTests.composeTopicListingPage = function() {
	casper.then(function(){
		/*****Verify Compost Topic on Topic Listing Page(For Guest/Registered User/Admin)*****/
		casper.echo('Verify Compose Topic on Topic Listing Page(For Guest/Registered User/Admin)', 'INFO');
		casper.thenOpen(config.url,function(){
			wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExists) {	
				if(!err){
					if(isExists) {
						casper.test.assertExists('a[href="/categories"]');
						casper.click('a[href="/categories"]');
						wait.waitForElement('.table-responsive ul li', casper, function(err, isExists) {	
							if(!err){
								if(isExists) {
									casper.test.assertExists('.table-responsive ul li:nth-child(1) a');
									casper.click('.table-responsive ul li:nth-child(1) a');
									wait.waitForElement('#back_arrow_topic', casper, function(err, isExists) {	
										if(!err){
											if(isExists) {
												addNewTopicMethod.startTopic(json["StartTopic"],casper,function(err){
													if(!err){
														casper.echo('Topic Started Successfully','INFO');
													}
												});
											} else {
												casper.echo('Category Doesnot open Sucessfully', 'ERROR');
											}	
										}
									});
								} else {
									casper.echo('Category Doesnot open Sucessfully', 'ERROR');
								}	
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


addNewTopicTests.composeLatestTopicPage = function() {
	casper.then(function(){
		/*****Verify Compost Topic on Latest Topic Page(For Guest/Registered User/Admin)*****/
		casper.echo('Verify Compost Topic on Latest Topic Page(For Guest/Registered User/Admin)', 'INFO');
		casper.thenOpen(config.url,function(){
			wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExists) {	
				if(!err){
					if(isExists) {
						casper.test.assertExists('#latest_topics_show a');
						casper.click('#latest_topics_show a');
						wait.waitForElement('.panel-heading', casper, function(err, isExists) {	
							if(!err){
								if(isExists) {
									addNewTopicMethod.startTopic(json["StartTopic"],casper,function(err){
										if(!err){
											casper.echo('Topic Started Successfully','INFO');
										}
									});
									
								} else {
									casper.echo('Does not navigate  to topic listing page ', 'ERROR');
								}	
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

addNewTopicTests.postPreviewForComposeTopic = function() {
	casper.then(function(){
		/*****Verify Preview Post of Compose Topic(For Guest/Registered User/Admin)*****/
		casper.echo('Verify Preview Post of Compose Topic(For Guest/Registered User/Admin)', 'INFO');
		casper.thenOpen(config.url,function(){
			wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExists) {	
				if(!err){
					if(isExists) {
						casper.test.assertExists('#latest_topics_show a');
						casper.click('#latest_topics_show a');
						wait.waitForElement('.panel-heading', casper, function(err, isExists) {	
							if(!err){
								if(isExists) {
									casper.test.assertExists('a[href^="/post/printadd"]');
									casper.click('a[href^="/post/printadd"]');
									wait.waitForElement('#message_ifr', casper, function(err, isExists) {	
										if(!err){
											if(isExists) {
												casper.sendKeys('input[name="subject"]', json["StartTopic"].subject, {reset:true});
												casper.withFrame('message_ifr', function() {
													casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
													casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
													casper.sendKeys('#tinymce',json["StartTopic"].content);
												});	
												wait.waitForElement('#all_forums_dropdown', casper, function(err, isExists) {	
													if(!err){
														if(isExists) {
															var Category = casper.evaluate(function(a) {
																var Category=document.querySelector('#all_forums_dropdown');
																return Category[1].value;
															});
															casper.fill('form[name="PostTopic"]',{
																'forum' : Category
															},false);
															casper.test.assertExists('#previewpost_sbt');
															casper.click('#previewpost_sbt');
															wait.waitForElement('#post_message_0', casper, function(err, isExists) {	
																casper.echo('Post preview get displayed on top of page','INFO');
															});
																
														} else {
															casper.echo('Category Dropdown doesnt appears','ERROR');
														}	
													}
												});
											} else {
												casper.echo('Unable to Open Form To Start Topic','ERROR');
											}	
										}
									});
			
			
								} else {
									casper.echo('Does not navigate  to topic listing page ', 'ERROR');
								}	
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


addNewTopicTests.displayMsg = function() {
	casper.then(function(){
		/*****Verify Preview Post of Compose Topic(For Guest/Registered User/Admin)*****/
		casper.echo('Verify Preview Post of Compose Topic(For Guest/Registered User/Admin)', 'INFO');
		casper.thenOpen(config.url,function(){
			wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExists) {	
				if(!err){
					if(isExists) {
						casper.test.assertExists('#latest_topics_show a');
						casper.click('#latest_topics_show a');
						wait.waitForElement('.panel-heading', casper, function(err, isExists) {	
							if(!err){
								if(isExists) {
									casper.test.assertExists('a[href^="/post/printadd"]');
									casper.click('a[href^="/post/printadd"]');
									wait.waitForElement('#message_ifr', casper, function(err, isExists) {	
										if(!err){
											if(isExists) {
												casper.test.assertExists('#previewpost_sbt');
												casper.click('#previewpost_sbt');
												wait.waitForElement('.alert.alert-danger.text-center', casper, function(err, isExists) {	
													if(!err){
														if(isExists) {
															var msg = casper.fetchText('.alert.alert-danger.text-center');
															casper.echo(msg.trim(),'INFO');	
														} else {
															casper.echo('Alert message doesnt visible','ERROR');
														}	
													}
												});
					
											} else {
												casper.echo('Unable to Open Form To Start Topic','ERROR');
											}	
										}
									});
								} else {
									casper.echo('Does not navigate  to topic listing page ', 'ERROR');
								}	
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

addNewTopicTests.postWithoutSelectingCategory = function() {
	casper.then(function(){
		/*****Verify Compose Topic without  selecting any category(For Guest/Registered User/Admin)*****/
		casper.echo('Verify Compose Topic without selecting any category(For Guest/Registered User/Admin)', 'INFO');
		casper.thenOpen(config.url,function(){
			wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExists) {	
				if(!err){
					if(isExists) {
						casper.test.assertExists('#latest_topics_show a');
						casper.click('#latest_topics_show a');
						wait.waitForElement('.panel-heading', casper, function(err, isExists) {	
							if(!err){
								if(isExists) {
									casper.test.assertExists('a[href^="/post/printadd"]');
									casper.click('a[href^="/post/printadd"]');
									wait.waitForElement('#message_ifr', casper, function(err, isExists) {	
										if(!err){
											if(isExists) {
												casper.sendKeys('input[name="subject"]', json["StartTopic"].subject, {reset:true});
												casper.withFrame('message_ifr', function() {
													casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
													casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
													casper.sendKeys('#tinymce',json["StartTopic"].content);
												});	
												wait.waitForElement('#post_submit', casper, function(err, isExists) {	
													if(!err){
														if(isExists) {
															casper.click('#post_submit');
															wait.waitForElement('.alert.alert-danger.text-center', casper, function(err, isExists) {	
																if(!err){
																	if(isExists) {
																		var msg = casper.fetchText('.alert.alert-danger.text-center');
												
																		casper.echo(msg.trim(),'INFO');	
																											} else {
																		casper.echo('Alert message doesnt visible','ERROR');
																	}	
																}
															});	
														} else {
															casper.echo('Category Dropdown doesnt appears','ERROR');
														}	
													}
												});
											} else {
												casper.echo('Unable to Open Form To Start Topic','ERROR');
											}	
										}
									});
			
			
								} else {
									casper.echo('Does not navigate  to topic listing page ', 'ERROR');
								}	
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








