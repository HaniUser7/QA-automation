'use strict';
var wait = require('../wait.js');
var utils = require('../utils.js');
var forumLoginMethod = require('../methods/login.js');
var json = require('../../testdata/loginData.json');
var registerMethod = require('./register.js');
var composeTopicMethod=module.exports = {};
var errorMessage = "";


//1.Method for create topic
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
				'forum' : 'categories1',
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

//2.Method for Backend Setting(Compost Topic (Make sure 'Post approval' is disabled))
composeTopicMethod.backendSettingCompostTopic= function(casper,test,callback) {	
	casper.thenOpen(config.backEndUrl, function() {
		forumLoginMethod.logoutFromApp (casper,function(err) {
			if(!err){
				registerMethod.loginToForumBackEnd(casper, test, function(err) {
					if(!err){
						casper.echo('Logged-in successfully from back-end', 'INFO');
						wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
							if(isExists) {
								test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', 'Users Link Found'); 
								casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
								test.assertExists('div#ddSettings div a:nth-child(3)', 'Group permission is found');
								casper.click('div#ddSettings div a:nth-child(3)');
								wait.waitForElement('form#frmForumSettings', casper, function(err, isExists) {
									if(isExists) {
										casper.fill('form#frmForumSettings', {
											'post_approval' : 'Disabled'
										}, true);
										forumLoginMethod.logoutFromApp (casper,function(err) {
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

//3.Method for Backend Setting(Topic view in front-setting)
composeTopicMethod.topicViewSetting = function(casper,test,callback) {	
	casper.thenOpen(config.backEndUrl, function() {
		forumLoginMethod.logoutFromApp (casper,function(err) {
			if(!err){
				registerMethod.loginToForumBackEnd(casper, test, function(err) {
				    if(!err){
						casper.echo('Logged-in successfully from back-end', 'INFO');
						wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
									casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
									casper.test.assertExists('div#ddUsers div a:nth-child(1)');
									casper.click('div#ddUsers div a:nth-child(1)');
				     				casper.wait(2000, function(){
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
																				forumLoginMethod.logoutFromApp (casper, function(err) {
																					if(!err){
																						casper.echo('backend logout sucessful');
																						return callback(null);
																					}
																				});																		 
																			}else{
																				 casper.echo('Message not generated', 'ERROR');
																			}
																		}
																	});
																}
															});
														}
													});
												}else{
													 casper.echo('View Category Checkbox Not Found', 'ERROR');
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

//4.test case for Verify Compost Topic on Topic Listing Page(Delete topic)
composeTopicMethod.deleteTopic = function(driver,callback) {	
		casper.thenOpen(config.url, function() {
			casper.echo('                   Delete topic                 ', 'INFO');
			casper.echo('********************************************', 'INFO');
			casper.echo('Title of the page :' +this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
				if(!err) {
					casper.echo('login by valid username and password and verify error message', 'INFO');
					casper.wait(2000, function(){
						 try{
							casper.test.assertExists('div#topics div div div form div div:nth-child(2) span input[name="allbox"]');
							casper.click('div#topics div div div form div div:nth-child(2) span input[name="allbox"]');
							casper.wait(2000, function(){
								 casper.test.assertExists('a#delete');
								 casper.click('a#delete');
							});
						
						}catch(e){
							casper.test.assertDoesntExist('div#topics div div div form div div:nth-child(2) span input[name="allbox"]');
						}
						casper.wait(2000, function(){
							forumLoginMethod.logoutFromApp(casper, function(err){
								if (!err)
								casper.echo('Successfully logout from application', 'INFO');
								return callback(null);
							});			
						});		   
					});		  
				}
			});
		});
}



/******************************  3.Compose Topic Options   ******************************************/

//5.Method for Backend Setting(Compost Topic (Make sure 'Post approval' is disabled))
composeTopicMethod.compostTopic= function(value,casper,test,callback) {	
	casper.thenOpen(config.backEndUrl, function() {
		forumLoginMethod.logoutFromApp (casper, function(err) {
			if(!err){
				registerMethod.loginToForumBackEnd(casper, test, function(err) {
					 if(!err){
						casper.echo('Logged-in successfully from back-end', 'INFO');
						wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
							if(isExists) {
								test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', 'Users Link Found'); 
								casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
								test.assertExists('div#ddSettings div a:nth-child(2)', 'Group permission is found');
								casper.click('div#ddSettings div a:nth-child(2)');
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
							casper.test.assertExists('div#ddUsers div a:nth-child(1)');
							casper.click('div#ddUsers div a:nth-child(1)');
							casper.wait(2000, function(){
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
																					forumLoginMethod.logoutFromApp (casper, function(err) {
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

//6.Method for Backend Setting(Compose Topic Permission)
composeTopicMethod.composeTopicPermission = function(value,casper,test,callback) {	
	casper.thenOpen(config.backEndUrl, function() {
		forumLoginMethod.logoutFromApp (casper,function(err) {
			if(!err){
				registerMethod.loginToForumBackEnd(casper, test, function(err) {
				 if(!err){
						casper.echo('Logged-in successfully from back-end', 'INFO');
						wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
									casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
									casper.test.assertExists('div#ddUsers div a:nth-child(1)');
									casper.click('div#ddUsers div a:nth-child(1)');
				     				casper.wait(2000, function(){
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
																		forumLoginMethod.logoutFromApp (casper, function(err) {
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

//7.Method for Backend Setting(listingPageDisabledOneCateogry)
composeTopicMethod.listingPageDisabledOneCateogry = function(Custom,id,driver,test,callback) {	
	casper.thenOpen(config.backEndUrl, function() {
		forumLoginMethod.logoutFromApp (casper,function(err) {
			if(!err){
				registerMethod.loginToForumBackEnd(casper, test, function(err) {
				 if(!err){
						casper.echo('Logged-in successfully from back-end', 'INFO');
						wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
									casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
									casper.test.assertExists('div#ddContent div a:nth-child(1)');
									casper.click('div#ddContent div a:nth-child(1)');
				     				casper.wait(2000, function(){
										var grpName = casper.evaluate(function(){
										    for(var i=1; i<=7; i++) {
												var x1 = document.querySelector('div#sortable ul li:nth-child('+i+') div:nth-child(1) a');
												if (x1.innerText == 'categories2') {
														var x2 = document.querySelector('div#sortable ul li:nth-child(1) a:nth-child(2)');
														x2.click();
														var x3 = document.querySelector('div.tooltipMenu.forumActionbutton a:nth-child(3)').getAttribute('data-url');
													return x3;
													
												}  
                                            }												
											
										});
										casper.echo(grpName);
										casper.click('a[data-url="'+grpName+'"]');
										casper.wait(2000, function(){
										  
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
																						casper.wait(2000, function(){
																							
																							forumLoginMethod.logoutFromApp (casper,function(err) {
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

//8.Method for Backend Setting(Compost Topic (start new topic permission is disabled for register User)
composeTopicMethod.permissionDisabled = function(value,casper,test,callback) {	
	casper.thenOpen(config.backEndUrl, function() {
		forumLoginMethod.logoutFromApp (casper,function(err) {
			if(!err){
				registerMethod.loginToForumBackEnd(casper, casper.test, function(err) {
					 if(!err){
						casper.echo('Logged-in successfully from back-end', 'INFO');
						wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
						    if(!err){
								if(isExists) {
									test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', 'Users Link Found'); 
									casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
									test.assertExists('div#ddSettings div a:nth-child(2)', 'Group permission is found');
									casper.click('div#ddSettings div a:nth-child(2)');
									wait.waitForElement('form#frmForumSettings', casper, function(err, isExists) {
									    if(!err){
											if(isExists) {
												casper.fill('form#frmForumSettings', {
													'file_uploading' : value
												}, true);
											} else{
												casper.echo('Change user group permission not found','ERROR');
											}
										}
									});
								} else {
									casper.echo('Backend Menu not found', 'ERROR');
								}
							}
						});
						casper.then(function(){
							casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
							casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
							casper.test.assertExists('div#ddUsers div a:nth-child(1)');
							casper.click('div#ddUsers div a:nth-child(1)');
							casper.wait(2000, function(){
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
																forumLoginMethod.logoutFromApp (casper,function(err) {
																	if(!err){
																		casper.echo('backend logout sucessful');
																		return callback(null);
																	}
																});																		 
															}else{
																 casper.echo('Message not generated ', 'ERROR');
															}
														}
													});
												}
											});
										}else{
											 casper.echo('Start Topics Checkbox not found', 'ERROR');
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

//9.Method for Backend Setting(Compost Topic (Make sure 'Post approval' is disabled))
 composeTopicMethod.enableUserRegister= function(username, casper, test) {	
	casper.thenOpen(config.backEndUrl, function() {
		forumLoginMethod.logoutFromApp (casper, function(err) {
			if(!err){
				registerMethod.loginToForumBackEnd(casper,casper.test, function(err) {
					 if(!err){
						casper.echo('Logged-in successfully from back-end', 'INFO');
						wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
						    if(!err){
								if(isExists) {
									casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
									casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
									casper.test.assertExists('div#ddUsers div a:nth-child(1)');
									casper.click('div#ddUsers div a:nth-child(1)');
									wait.waitForElement('input#autosuggest', casper, function(err, isExists) {
										if(!err){
								            if(isExists) {
												casper.test.assertExists('#autosuggest');
												casper.sendKeys('#autosuggest',username, {keepFocus: true});
												casper.click('#autosuggest');
												casper.page.sendEvent("keypress", casper.page.event.key.Enter);
												casper.waitForSelector('form[name="ugfrm"]', function success(){
													if(!err){
											            if(isExists) {
															var grpName = casper.evaluate(function(){
																for(var i=2;i<6;i++){
																	var x1 = document.querySelector('form#frmChangeUsersGroupFinal div:nth-child('+i+') label');
																	if (x1.innerText == 'Registered Users') {
																		var x3 = document.querySelector('form#frmChangeUsersGroupFinal div:nth-child('+i+') input').getAttribute('value');
																		return x3;
																	}
																}
															});
															casper.echo(+grpName,'INFO');
															casper.wait(2000, function(){ 
																casper.fillSelectors('form[name="ugfrm"]', {
																	'input[type="checkbox"]' :grpName
																}, true);
																casper.test.assertExists('button[title="Close"]');
																casper.click('button[title="Close"]');
																casper.wait(2000, function(){ 
																    forumLoginMethod.logoutFromApp (casper, function(err) {
																		if(!err){
																			casper.echo('backend logout sucessful','ERROR');
																		}
																	});	
																});
															});
														} else {
															casper.echo('form not found', 'ERROR');
														}
													}
												});
											} else {
												casper.echo('Change a Users User Group textbox not found', 'ERROR');
											}
										}
									});
								} else {
									casper.echo('Backend Menu not found', 'ERROR');
								}
							}
						});
					}
				});
			}
		});
	});
}

//10.Method for Backend Setting(Compost Topic (Make sure 'Post approval' is disabled))
 composeTopicMethod.enableUserAdmin= function(username,casper,test) {	
	casper.thenOpen(config.backEndUrl, function() {
		forumLoginMethod.logoutFromApp (casper,function(err) {
			if(!err){
				registerMethod.loginToForumBackEnd(casper, test, function(err) {
					 if(!err){
						casper.echo('Logged-in successfully from back-end', 'INFO');
						wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
						    if(!err){
								if(isExists) {
									casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
									casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
									casper.test.assertExists('div#ddUsers div a:nth-child(1)');
									casper.click('div#ddUsers div a:nth-child(1)');
									wait.waitForElement('input#autosuggest', casper, function(err, isExists) {
										if(!err){
											if(isExists) {
												casper.test.assertExists('#autosuggest');
												casper.sendKeys('#autosuggest',username, {keepFocus: true});
												casper.click('#autosuggest');
												casper.page.sendEvent("keypress", casper.page.event.key.Enter);
												casper.waitForSelector('form[name="ugfrm"]', function success(){
												    var userName = casper.evaluate(function(){
														for(var i=2;i<6;i++){
															var x1 = document.querySelector('form#frmChangeUsersGroupFinal div:nth-child('+i+') label');
															if (x1.innerText == 'Administrators') {
																var x3 = document.querySelector('form#frmChangeUsersGroupFinal div:nth-child('+i+') input').getAttribute('value');
																return x3;
															}
														}
													});
													casper.echo('User :',userName,'INFO');
													casper.wait(2000, function(){ 
														casper.fillSelectors('form[name="ugfrm"]', {
															'input[type="checkbox"]' :userName
														}, true);
														casper.test.assertExists('button[title="Close"]');
														casper.click('button[title="Close"]');
														casper.wait(2000, function(){ 
															forumLoginMethod.logoutFromApp (casper,function(err) {
																if(!err){
																	casper.echo('backend logout sucessful','INFO');
																}
															});	
														});
													});
												},function fail(){
													casper.echo('form not found','ERROR');
												});
											} else {
												casper.echo('Change a Users User Group textbox not found', 'ERROR');
											}
										}
									});
								} else {
									casper.echo('Backend Menu not found', 'ERROR');
								}
							}
						});
					}
				});
			}
		});
	});
}

//11.Method for Backend Setting(Compost Topic (Make sure 'Post approval' is disabled))
 composeTopicMethod.captchaRegistration= function(casper, test, callback) {	
	casper.thenOpen(config.backEndUrl, function() {
		forumLoginMethod.logoutFromApp (casper, function(err) {
			if(!err){
				registerMethod.loginToForumBackEnd(casper, casper.test, function(err) {
					if(!err){
						wait.waitForElement('div#my_account_forum_menu',casper, function(err, isExists) {
						    if(!err){
								if(isExists) {
									casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
									casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
									wait.waitForElement('div#ddSettings', casper, function(err, isExists) {
										if(!err){
											if(isExists) {
												casper.click('div#ddSettings a:nth-child(3)');
												wait.waitForElement('input#captcha_registration', casper, function(err, isExists) {
													if(!err){
														if(isExists) {
															utils.enableorDisableCheckbox('captcha_registration', false, casper, function() {
																casper.test.assertExists('button.button.btn-m.btn-blue');
																casper.click('button.button.btn-m.btn-blue');
																casper.wait(4000, function(){
																	casper.echo(casper.fetchText('div#ajax-msg-top'),'INFO');
																	forumLoginMethod.logoutFromApp (casper, function(err) {
																		if(!err){
																			casper.echo('backend logout successful');
																			  return callback(null);
																		}
																	});	
																}, function fail() { 
																	casper.echo('Saved not found', 'ERROR');
																});
															});
														} else {
															casper.echo('Image Verification checkbox not found', 'ERROR');
														}
													}
												});
											} else {
												casper.echo('Setting  tooltip menu not found', 'ERROR');
											}
										}
									});
								} else {
									casper.echo('Backend Menu not found', 'ERROR');
								}
							}
						});
					}else {
						casper.echo('loginToForumBackEnd method not working', 'ERROR');
					}
				});
            }
        });
	});
}

//12.Method for Backend Setting(create Categories)
composeTopicMethod.createCategories= function(value,casper,test,callback) {/*Return callback missing*/	
	casper.thenOpen(config.backEndUrl, function() {
		forumLoginMethod.logoutFromApp (casper,function(err) {
			if(!err){
				registerMethod.loginToForumBackEnd(casper, casper.test, function(err) {
				    if(!err){
						wait.waitForElement('div#my_account_forum_menu',casper, function(err, isExists) {
						    if(!err){
								if(isExists) {
								    casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
									casper.test.assertExists('div#ddContent div a:nth-child(1)');
								    casper.click('div#ddContent div a:nth-child(1)');
										wait.waitForElement('div#forum-manager-heading-actions a' , casper , function(err , isExists) {	
											if(!err){
												if(isExists) {
													casper.click('div#forum-manager-heading-actions a');
													casper.wait(2000, function(){
														utils.enableorDisableCheckbox('isSubcategory',false, casper, function(err) {
															if(!err){ 
																casper.fillSelectors('form#edit_forum_form',{	
																	'input[name="forum_name"]': value
																},false);
																casper.click('form[name="frmOptions"] button');
																casper.wait(2000, function(){ 					 
																	forumLoginMethod.logoutFromApp (casper, function(err) {
																		if(!err){
																			casper.echo('forumLoginMethod working sucessful','INFO');
																			return callback(null);
																		}
																	});	
																});	
															}
														});													
													});	
												}else {
													casper.echo('New Category button not found', 'ERROR');
												}
											}
										});
							    }else {
									casper.echo('Top menu link not found', 'ERROR');
								}
							}
						});
					}
				});
			}
		});
	});
}
