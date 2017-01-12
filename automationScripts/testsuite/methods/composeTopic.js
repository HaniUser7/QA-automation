'use strict';
var wait = require('../wait.js');
var utils = require('../utils.js');
var forumLoginMethod = require('../methods/login.js');
var json = require('../../testdata/loginData.json');
var registerMethod = require('./register.js');
var composeTopicMethod=module.exports = {};
var errorMessage = "";


//1.Method for logout from application
composeTopicMethod.logoutFromApp = function(driver,test, callback) {
	
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
composeTopicMethod.startTopic = function(value1,value2,value3,data,driver,callback) {
   
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
				driver.click('#post_submit');
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

//3.Method for Backend Setting(Compost Topic (Make sure 'Post approval' is disabled))
composeTopicMethod.backendSettingCompostTopic= function(casper,test,callback) {	
	casper.thenOpen(config.backEndUrl, function() {
		composeTopicMethod.logoutFromApp(casper, casper.test, function(err) {
			if(!err){
				registerMethod.loginToForumBackEnd(casper, test, function(err) {
					 if(!err){
						casper.echo('Logged-in successfully from back-end', 'INFO');
						wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
							if(isExists) {
								test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', 'Users Link Found'); 
								casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
								test.assertExists('a[href^="/tool/members/mb/settings?tab=Security"]', 'Group permission is found');
								casper.click('a[href^="/tool/members/mb/settings?tab=Security"]');
								wait.waitForElement('form#frmForumSettings', casper, function(err, isExists) {
									if(isExists) {
										casper.fill('form#frmForumSettings', {
											'post_approval' : 'Disabled'
										}, true);
										composeTopicMethod.logoutFromApp(casper, casper.test, function(err) {
											if(!err){
												casper.echo('uploadAttachmentMethod of logoutFromApp work sucessful', 'INFO');
												 return callback(null);
											}
										});
									} else{
										casper.echo('Change user group permission not found','ERROR');
									}
								});
							} else {
								casper.echo('Backend Menu not found', 'ERROR');
							}
						});
					}
				});
			}
		});	
	});

}

//4.Method for Backend Setting(Topic view in front-setting)
composeTopicMethod.topicViewSetting = function(casper,test,callback) {	
	casper.thenOpen(config.backEndUrl, function() {
		composeTopicMethod.logoutFromApp(casper, casper.test, function(err) {
			if(!err){
				registerMethod.loginToForumBackEnd(casper, test, function(err) {
				    if(!err){
						casper.echo('Logged-in successfully from back-end', 'INFO');
						wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
									casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
									casper.test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
									casper.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
				     				wait.waitForTime(2000, casper, function() { 
										var grpName = casper.evaluate(function(){
											for(var i=1; i<=7; i++) {
												var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
												if (x1.innerText == 'Unregistered / Not Logged In') {
													  var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3)  a');
													x2.click();
													var x3 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('href');
													return x3;
												}
											}
										});
										casper.click('a[href="'+grpName+'"]');
										wait.waitForElement('#view_forum', casper, function(err, isExist) {
											if(!err){
												if(isExist) {
													utils.enableorDisableCheckbox('view_forum', true, casper, function(err) {
														 if(!err){
															casper.echo("View Category Checkbox Has Been Disabled For Un-Registered User", 'INFO');
															utils.enableorDisableCheckbox('post_threads', true, casper, function(err) {
																if(!err){
																	casper.echo(" Start Topics  Checkbox Has Been Disabled For Un-Registered User", 'INFO');
																	casper.click('button.button.btn-m.btn-blue');
																	wait.waitForElement('div#tab_wrapper .heading[color="red"]', casper, function(err, isExist) {
																		if(!err){
																			if(isExist) {
																				var message = casper.fetchText('div#tab_wrapper .heading[color="red"]');
																				var expectedErrorMsg = 'Your user group settings have been updated.';
																				casper.test.assertEquals(message, expectedErrorMsg);
																				composeTopicMethod.logoutFromApp(casper, casper.test, function(err) {
																					if(!err){
																						casper.echo('backend logout sucessful');
																						return callback(null);
																					}
																				});																		 
																			}else{
																				 casper.echo('Default_registration_option Link Not Found', 'ERROR');
																			}
																		}
																	});
																}
															});
														}
													});
												}else{
													 casper.echo('Default_registration_option Link Not Found', 'ERROR');
												}
											}
										});	
									});						
								} else {
									casper.echo('Account Forum Menu Not Found', 'ERROR');
								}
							}
						});
					}
				});
			}
		});
    });	

}

 //5.test case for Verify Compost Topic on Topic Listing Page(Delete topic)
composeTopicMethod.deleteTopic = function(driver,callback) {	
		casper.thenOpen(config.url, function() {
			casper.echo('                   Delete topic                 ', 'INFO');
			casper.echo('********************************************', 'INFO');
			casper.echo('Title of the page :' +this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
				if(!err) {
					casper.echo('login by valid username and password and verify error message', 'INFO');
					wait.waitForElement('span.mod.icons.pull-right input[name="allbox"]', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
							   casper.click('span.mod.icons.pull-right input[name="allbox"]');
							   wait.waitForTime(2000 , casper , function(err) {
									 casper.test.assertExists('a#delete');
									 casper.click('a#delete');
									 wait.waitForTime(2000 , casper , function(err) {
										forumLoginMethod.logoutFromApp(casper, function(err){
											if (!err)
											casper.echo('Successfully logout from application', 'INFO');
											return callback(null);
										});			
									});
								});			   
							}
						}
					});		  
				}
			});
		});
	
}


/******************************  3.Compose Topic Options   ******************************************/

//6.Method for Backend Setting(Compost Topic (Make sure 'Post approval' is disabled))
composeTopicMethod.compostTopic= function(value,casper,test,callback) {	
	casper.thenOpen(config.backEndUrl, function() {
		composeTopicMethod.logoutFromApp(casper, casper.test, function(err) {
			if(!err){
				registerMethod.loginToForumBackEnd(casper, test, function(err) {
					 if(!err){
						casper.echo('Logged-in successfully from back-end', 'INFO');
						wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
							if(isExists) {
								test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', 'Users Link Found'); 
								casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
								test.assertExists('a[href^="/tool/members/mb/settings?tab=General"]', 'Group permission is found');
								casper.click('a[href^="/tool/members/mb/settings?tab=General"]');
								wait.waitForElement('form#frmForumSettings', casper, function(err, isExists) {
									if(isExists) {
										casper.fill('form#frmForumSettings', {
											'file_uploading' : value
										}, true);
									} else{
										casper.echo('Change user group permission not found','ERROR');
									}
								});
							} else {
								casper.echo('Backend Menu not found', 'ERROR');
							}
						});
						casper.then(function(){
							casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
							casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
							casper.test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
							casper.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
							wait.waitForTime(2000, casper, function() { 
								var grpName = casper.evaluate(function(){
									for(var i=1; i<=7; i++) {
										var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
										if (x1.innerText == 'Registered Users') {
											  var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3)  a');
											x2.click();
											var x3 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('href');
											return x3;
										}
									}
								});
								casper.click('a[href="'+grpName+'"]');
								wait.waitForElement('#upload_attachments', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											utils.enableorDisableCheckbox('upload_attachments', value, casper, function(err) {
												 if(!err){
													casper.echo("upload_attachments Checkbox setting For Registered User", 'INFO');
												    wait.waitForElement('#post_threads', casper, function(err, isExist) {
														if(!err){
															if(isExist) {
																utils.enableorDisableCheckbox('post_threads', value, casper, function(err) {
																	 if(!err){
																		casper.echo("upload_attachments Checkbox setting For Registered User", 'INFO');
																		casper.click('button.button.btn-m.btn-blue');
																		wait.waitForElement('div#tab_wrapper .heading[color="red"]', casper, function(err, isExist) {
																			if(!err){
																				if(isExist) {
																					var message = casper.fetchText('div#tab_wrapper .heading[color="red"]');
																					var expectedErrorMsg = 'Your user group settings have been updated.';
																					casper.test.assertEquals(message, expectedErrorMsg);
																					composeTopicMethod.logoutFromApp(casper, casper.test, function(err) {
																						if(!err){
																							casper.echo('backend logout sucessful');
																							return callback(null);
																						}
																					});																		 
																				}else{
																					 casper.echo('Default_registration_option Link Not Found', 'ERROR');
																				}
																			}
																		});
																	}
																});
															}else{
																 casper.echo('Default_registration_option Link Not Found', 'ERROR');
															}
														}
													});	
												}
											});
										}else{
											 casper.echo('Default_registration_option Link Not Found', 'ERROR');
										}
									}
								});	
							});											
						});
					}
				});
			}
		});	
	});

}

/**************  4.Compose Topic Permission(Make sure 'Post approval' is disabled)  ******************/

//7.Method for Backend Setting(Compose Topic Permission)
composeTopicMethod.composeTopicPermission = function(value,casper,test,callback) {	
	casper.thenOpen(config.backEndUrl, function() {
		composeTopicMethod.logoutFromApp(casper, casper.test, function(err) {
			if(!err){
				registerMethod.loginToForumBackEnd(casper, test, function(err) {
				 if(!err){
						casper.echo('Logged-in successfully from back-end', 'INFO');
						wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
									casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
									casper.test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
									casper.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
				     				wait.waitForTime(2000, casper, function() { 
										var grpName = casper.evaluate(function(){
											for(var i=1; i<=7; i++) {
												var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
												if (x1.innerText == 'Unregistered / Not Logged In') {
													  var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3)  a');
													x2.click();
													var x3 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('href');
													return x3;
												}
											}
										});
										casper.click('a[href="'+grpName+'"]');
				                
										wait.waitForElement('#post_threads', casper, function(err, isExist) {
											if(!err){
												if(isExist) {
													utils.enableorDisableCheckbox('post_threads',value, casper, function(err) {
														if(!err){
														
															casper.echo(" Start Topics  Checkbox Has Been Disabled For Un-Registered User", 'INFO');
															casper.click('button.button.btn-m.btn-blue');
															wait.waitForElement('div#tab_wrapper .heading[color="red"]', casper, function(err, isExist) {
																if(!err){
																	if(isExist) {
																	
																		var message = casper.fetchText('div#tab_wrapper .heading[color="red"]');
																		var expectedErrorMsg = 'Your user group settings have been updated.';
																		casper.test.assertEquals(message, expectedErrorMsg);
																		composeTopicMethod.logoutFromApp(casper, casper.test, function(err) {
																			if(!err){
																				casper.echo('backend logout sucessful');
																				return callback(null);
																			}
																		});																		 
																	}else{
																		 casper.echo('Default_registration_option Link Not Found', 'ERROR');
																	}
																}
															});
														}
													});	
												}else{
													 casper.echo('Default_registration_option Link Not Found', 'ERROR');
												}
											}
										});	
									});						
								} else {
									casper.echo('Account Forum Menu Not Found', 'ERROR');
								}
							}
						});
					}
				});
			}
		});
    });	
}

//8.Method for Backend Setting(listingPageDisabledOneCateogry)
composeTopicMethod.listingPageDisabledOneCateogry = function(Custom,id,driver,test,callback) {	
	casper.thenOpen(config.backEndUrl, function() {
		composeTopicMethod.logoutFromApp(casper, casper.test, function(err) {
			if(!err){
				registerMethod.loginToForumBackEnd(casper, test, function(err) {
				 if(!err){
						casper.echo('Logged-in successfully from back-end', 'INFO');
						wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
									casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
									casper.test.assertExists('div#ddContent a[href="/tool/members/mb/forums"]');
									casper.click('div#ddContent a[href="/tool/members/mb/forums"]');
				     				wait.waitForTime(2000, casper, function() { 
										var grpName = casper.evaluate(function(){
										
												var x1 = document.querySelector('div#sortable ul li:nth-child(1) div:nth-child(1) a');
												if (x1.innerText == 'News') {
												    var x2 = document.querySelector('div#sortable ul li:nth-child(1) a:nth-child(2)');
												    x2.click();
													var x3 = document.querySelector('div.tooltipMenu.forumActionbutton a:nth-child(3)').getAttribute('data-url');
													return x3;
												}    
											
										});
										
										casper.click('a[data-url="'+grpName+'"]');
										wait.waitForTime(2000, casper, function() { 
										   
											wait.waitForElement('#list_usergroup', casper, function(err, isExist) {
												if(!err){
													if(isExist) {
														casper.test.assertExists('#list_usergroup');
														casper.click('#list_usergroup');
														casper.sendKeys('#list_usergroup',Custom);
														wait.waitForElement('div.usergroup_perm_dialog', casper, function(err, isExist) {
															if(!err){
																if(isExist) {
																	
																	utils.enableorDisableCheckbox(id,false, casper, function(err) {
																		if(!err){
																		   
																			casper.echo(" Start Topics  Checkbox Has Been Disabled ", 'INFO');
																			wait.waitForElement('button[type="button"] span.ui-button-text', casper, function(err, isExist) {
																				if(!err){
																					if(isExist) {
																						casper.test.assertExists('button[type="button"] span.ui-button-text');
																						//casper.click('button[type="button"] span.ui-button-text');
																						wait.waitForTime(2000, casper, function() { 
																							
																							composeTopicMethod.logoutFromApp(casper, casper.test, function(err) {
																								if(!err){
																									casper.echo('backend logout sucessful');
																									return callback(null);
																								}
																							});	
																						});																							
																					}else{
																						 casper.echo('Default_registration_option Link Not Found', 'ERROR');
																					}
																				}
																			});
																			
																		}
																	});																	 
																}else{
																	 casper.echo('Default_registration_option Link Not Found', 'ERROR');
																}
															}
														});
													}else{
														 casper.echo('Default_registration_option Link Not Found', 'ERROR');
													}
												}
											});	
										});	
									});						
								} else {
									casper.echo('Account Forum Menu Not Found', 'ERROR');
								}
							}
						});
					}
				});
			}
		});
    });	
}

//9.Method for Backend Setting(Compost Topic (start new topic permission is disabled for register User)
composeTopicMethod.permissionDisabled = function(value,casper,test,callback) {	
	casper.thenOpen(config.backEndUrl, function() {
		composeTopicMethod.logoutFromApp(casper, casper.test, function(err) {
			if(!err){
				registerMethod.loginToForumBackEnd(casper, test, function(err) {
					 if(!err){
						casper.echo('Logged-in successfully from back-end', 'INFO');
						wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
							if(isExists) {
								test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', 'Users Link Found'); 
								casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
								test.assertExists('a[href^="/tool/members/mb/settings?tab=General"]', 'Group permission is found');
								casper.click('a[href^="/tool/members/mb/settings?tab=General"]');
								wait.waitForElement('form#frmForumSettings', casper, function(err, isExists) {
									if(isExists) {
										casper.fill('form#frmForumSettings', {
											'file_uploading' : value
										}, true);
									} else{
										casper.echo('Change user group permission not found','ERROR');
									}
								});
							} else {
								casper.echo('Backend Menu not found', 'ERROR');
							}
						});
						casper.then(function(){
							casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
							casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
							casper.test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
							casper.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
							wait.waitForTime(2000, casper, function() { 
								var grpName = casper.evaluate(function(){
									for(var i=1; i<=7; i++) {
										var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
										if (x1.innerText == 'Registered Users') {
											  var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3)  a');
											x2.click();
											var x3 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('href');
											return x3;
										}
									}
								});
								casper.click('a[href="'+grpName+'"]');
								wait.waitForElement('#post_threads', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											utils.enableorDisableCheckbox('post_threads', value, casper, function(err) {
												 if(!err){
												   
													casper.echo(" Start Topics  Checkbox Has Been change For Registered User", 'INFO');
													casper.click('button.button.btn-m.btn-blue');
													wait.waitForElement('div#tab_wrapper .heading[color="red"]', casper, function(err, isExist) {
														if(!err){
															if(isExist) {
																var message = casper.fetchText('div#tab_wrapper .heading[color="red"]');
																var expectedErrorMsg = 'Your user group settings have been updated.';
																casper.test.assertEquals(message, expectedErrorMsg);
																composeTopicMethod.logoutFromApp(casper, casper.test, function(err) {
																	if(!err){
																		casper.echo('backend logout sucessful');
																		return callback(null);
																	}
																});																		 
															}else{
																 casper.echo('Default_registration_option Link Not Found', 'ERROR');
															}
														}
													});
												}
											});
										}else{
											 casper.echo('Default_registration_option Link Not Found', 'ERROR');
										}
									}
								});	
							});											
						});
					}
				});
			}
		});	
	});

}

/**************  4.Making enable registration user as admin or register user  ******************/

//10.Method for Backend Setting(Compost Topic (Make sure 'Post approval' is disabled))
composeTopicMethod.enableUser= function(username,id,casper,test,callback) {	
	casper.thenOpen(config.backEndUrl, function() {
		composeTopicMethod.logoutFromApp(casper, casper.test, function(err) {
			if(!err){
				registerMethod.loginToForumBackEnd(casper, test, function(err) {
					 if(!err){
						casper.echo('Logged-in successfully from back-end', 'INFO');
						wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
								casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
								casper.test.assertExists('div#ddUsers a[href="/tool/members/mb/addusers"]');
								casper.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
								wait.waitForElement('form#frmForumSettings', casper, function(err, isExists) {
									casper.test.assertExists('input#autosuggest');
									casper.sendKeys('input#autosuggest',username);
									wait.waitForTime(2000 , casper , function(err) {
										casper.test.assertExists('div#tab_wrapper');
										casper.click('div#tab_wrapper');
										wait.waitForTime(2000 , casper , function(err) {
											casper.test.assertExists('form#frmChangeUsersGroupFinal');
											casper.sendKeys(id,true);
										});
									});
								});
							} else {
								casper.echo('Backend Menu not found', 'ERROR');
							}
						});
					}
				});
			}
		});	
	});

}
