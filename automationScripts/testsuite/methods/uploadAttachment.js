'use strict';
var wait = require('../wait.js');
var utils = require('../utils.js');
var registerMethod = require('./register.js');
var forumLoginMethod = require('../methods/login.js');
var json = require('../../testdata/loginData.json');
var jsons = require('../../testdata/fbData.json');
var screenShotsDir = config.screenShotsLocation + 'uploadAttachment/';
var uploadAttachmentMethod=module.exports = {};
var errorMessage = "";

/**************************** Method for Backend Setting *********************/

//1.Method for Backend Setting(Forum Settings Enable/Disable in user Account)
uploadAttachmentMethod.userAccountSettings = function(value,casper,test,callback) {	
	casper.thenOpen(config.backEndUrl, function() {
		uploadAttachmentMethod.logoutFromApp(casper, casper.test, function(err) {
			if(!err){
				registerMethod.loginToForumBackEnd(casper, test, function(err) {
					 if(!err){
						casper.echo('Logged-in successfully from back-end', 'INFO');
						wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
									casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
									casper.test.assertExists('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]');
									casper.click('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]');
									casper.echo('Successfully open forum settings form.....', 'INFO');
									//Getting 'User Accounts' Field Value, If, Enabled, Then Filling Data For Testing
									wait.waitForElement('#REQreg', casper, function(err, isExist) {
										if(!err){
											if(isExist) {
												utils.enableorDisableCheckbox('REQreg', value, casper, function(err) {
													if (!err){
														casper.echo("User Accounts Checkbox Has Been Enabled For Registered User", 'INFO');
														casper.test.assertExists('.button.btn-m.btn-blue');
														casper.click('.button.btn-m.btn-blue');	
														uploadAttachmentMethod.logoutFromApp(casper, casper.test, function(err) {
															if(!err){
																casper.echo('uploadAttachmentMethod of logoutFromApp working sucessful ', 'INFO');
																return callback(null);
															}
														});
													}	
												});	
											} else {
												casper.echo('User Accounts Checkbox Not Found', 'ERROR');
											}	
										}
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

//2.Method for Backend Setting(Field Enable/Disable in Default Registration Option)
uploadAttachmentMethod.defaultRegistrationOption = function(value,casper,test,callback) {	
	casper.thenOpen(config.backEndUrl, function() {
		uploadAttachmentMethod.logoutFromApp(casper, casper.test, function(err) {
			if(!err){
				registerMethod.loginToForumBackEnd(casper, test, function(err) {
					 if(!err){
						casper.echo('Logged-in successfully from back-end', 'INFO');
						wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
									casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
									casper.test.assertExists('div#ddUsers a[href="/tool/members/mb/fields?action=default_registration_option"]');
									casper.click('div#ddUsers a[href="/tool/members/mb/fields?action=default_registration_option"]');
									wait.waitForElement('div.heading', casper, function(err, isExist) {
										if(!err){
											if(isExist) {
												casper.fill('form[name="posts"]', {
													'required_name' : value,
													'required_imType' : value,
													'required_dob' : value,
													'required_signature' : value,
													'required_avatar': value
												}, true);
												casper.click('form[name="posts"] button');
												wait.waitForElement('font[color="red"]', casper, function(err, isExist) {
													if(!err){
														if(isExist) {
															var successMsg = casper.fetchText('font[color="red"]');
															casper.echo('success message : '+successMsg, 'INFO');
															casper.echo('success message is verified', 'INFO');
															uploadAttachmentMethod.logoutFromApp(casper, casper.test, function(err) {
																if(!err){
																	casper.echo('backend logout sucessful');
																	return callback(null);
																}
															});
														}else{
															 casper.echo('Message is not generated Found', 'ERROR');
														}
													}
												});
											}else{
												 casper.echo('Default_registration_option Link Not Found', 'ERROR');
											}
										}
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

//3.Method for Backend Setting(Topic view in front-setting)
uploadAttachmentMethod.topicViewSetting = function(casper,test,callback) {	
	casper.thenOpen(config.backEndUrl, function() {
		uploadAttachmentMethod.logoutFromApp(casper, casper.test, function(err) {
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
										casper.echo('a[href="'+grpName+'"]');
										wait.waitForElement('#view_messageboard', casper, function(err, isExist) {
											if(!err){
												if(isExist) {
													utils.enableorDisableCheckbox('view_messageboard', true, casper, function(err) {
														 if(!err){
															casper.echo("View Category Checkbox Has Been Disabled For Un-Registered User", 'INFO');
															casper.click('button.button.btn-m.btn-blue');
															//Verifying 'Success Message' After Saving Settings
															wait.waitForElement('div#tab_wrapper .heading[color="red"]', casper, function(err, isExist) {
																if(!err){
																	if(isExist) {
																		var message = casper.fetchText('div#tab_wrapper .heading[color="red"]');
																		var expectedErrorMsg = 'Your user group settings have been updated.';
																		casper.test.assertEquals(message, expectedErrorMsg);
																		uploadAttachmentMethod.logoutFromApp(casper, casper.test, function(err) {
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

//4.Method for Backend Setting(Deleted field in Custom Profile Fields)
uploadAttachmentMethod.customFields = function(casper,test,callback) {	
	casper.thenOpen(config.backEndUrl, function() {
		uploadAttachmentMethod.logoutFromApp(casper, casper.test, function(err) {
			if(!err){
				registerMethod.loginToForumBackEnd(casper, test, function(err) {
					 if(!err){
						casper.echo('Logged-in successfully from back-end', 'INFO');
						wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
									casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
									test.assertExists('div#ddUsers a[href="/tool/members/mb/fields"]');
									casper.click('div#ddUsers a[href="/tool/members/mb/fields"]');
									wait.waitForElement('form[name="posts"]', casper, function(err, isExist) {
										if(!err){
											if(isExist) {
												casper.click('form#custom_fields_table input');
												casper.click('form#custom_fields_table button');
												wait.waitForElement('p:nth-child(4)', casper, function(err, isExist) {
													if(!err){
														if(isExist) {  
															var msg = casper.fetchText('p:nth-child(4)');
															casper.echo('Success Message: '+msg, 'INFO');
															casper.echo('all custom profile fields have been deleted', 'INFO');
															uploadAttachmentMethod.logoutFromApp(casper, casper.test, function(err) {
																if(!err){
																	casper.echo('uploadAttachmentMethod of logoutFromApp work sucessful', 'INFO');
																	 return callback(null);
																}
															});
														}else{
															 casper.echo('Message is not generated Found', 'ERROR');
														}
													}
												});
											}else{
												casper.echo('custom_fields Not Found', 'ERROR');
											}
										}
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

//5.Method for Backend Setting(Making user as a Administrators)
uploadAttachmentMethod.makeUserAdministrators = function(casper,test,callback) {	
	casper.thenOpen(config.backEndUrl, function() {
		uploadAttachmentMethod.logoutFromApp(casper, casper.test, function(err) {
			if(!err){
				registerMethod.loginToForumBackEnd(casper, test, function(err) {
					 if(!err){
						casper.echo('Logged-in successfully from back-end', 'INFO');
						wait.waitForElement('div#my_account_forum_menu',casper, function(err, isExists) {
							if(isExists) {
								test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', 'Users Link Found'); 
								casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
								test.assertExists('a[href^="/tool/members/mb/usergroup"]', 'Group permission is found');
								casper.click('a[href^="/tool/members/mb/usergroup"]');
								wait.waitForElement('form#frmChangeUsersGroup',casper, function(err, isExists) {
									if(isExists) {
										casper.fill('form#frmChangeUsersGroup', {
											'member' : 'rajan41'
										}, true);
										wait.waitForElement('form[name="ugfrm"]',casper, function(err, isExists) {
											if(isExists) {
												test.assertExists('form#frmChangeUsersGroupFinal', 'Found admin');
												casper.fillLabels('form#frmChangeUsersGroupFinal', {
													Administrators: 'checked'
												}, true);
												uploadAttachmentMethod.logoutFromApp(casper, casper.test, function(err) {
													if(!err){
														casper.echo('uploadAttachmentMethod of logoutFromApp work sucessful', 'INFO');
														 return callback(null);
													}
												});
											} else {
												casper.echo('Administration checkbox not found','ERROR');	
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

//6.Method for Backend Setting(Making facebook Enable/Disable)
uploadAttachmentMethod.backendSettingFacebook= function(value,casper,test,callback) {	
	casper.thenOpen(config.backEndUrl, function() {
		uploadAttachmentMethod.logoutFromApp(casper, casper.test, function(err) {
			if(!err){
				registerMethod.loginToForumBackEnd(casper, test, function(err) {
					 if(!err){
						casper.echo('Logged-in successfully from back-end', 'INFO');
						wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
							if(isExists) {
								test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', 'Users Link Found'); 
								casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
								test.assertExists('a[href^="/tool/members/mb/settings?tab=Single+Sign+On"]', 'Group permission is found');
								casper.click('a[href^="/tool/members/mb/settings?tab=Single+Sign+On"]');
								wait.waitForElement('form#frmForumSettings', casper, function(err, isExists) {
									if(isExists) {
										casper.fill('form#frmForumSettings', {
											'facebook_connect' : value
										}, true);
										uploadAttachmentMethod.logoutFromApp(casper, casper.test, function(err) {
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


/** Method common for Signature setting **/

//7.Method for Backend Setting(Field Signature setting in Default Registration Option)
uploadAttachmentMethod.defaultSignatureSetting = function(casper,test,callback) {	
	casper.thenOpen(config.backEndUrl, function() {
		uploadAttachmentMethod.logoutFromApp(casper, casper.test, function(err) {
			if(!err){
				registerMethod.loginToForumBackEnd(casper, test, function(err) {
					 if(!err){
						casper.echo('Logged-in successfully from back-end', 'INFO');
						wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
									casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
									casper.test.assertExists('div#ddUsers a[href="/tool/members/mb/fields?action=default_registration_option"]');
									casper.click('div#ddUsers a[href="/tool/members/mb/fields?action=default_registration_option"]');
									wait.waitForElement('div.heading', casper, function(err, isExist) {
										if(!err){
											if(isExist) {
												casper.fill('form[name="posts"]', {
													'required_signature' : 'Yes',
													'visiblity_signature' : 'Visible',
													
												}, true);
												casper.click('form[name="posts"] button');
												wait.waitForElement('font[color="red"]', casper, function(err, isExist) {
													if(!err){
														if(isExist) {
															var successMsg = casper.fetchText('font[color="red"]');
															casper.echo('success message : '+successMsg, 'INFO');
															casper.echo('success message is verified', 'INFO');
															uploadAttachmentMethod.logoutFromApp(casper, casper.test, function(err) {
																if(!err){
																	casper.echo('backend logout sucessful');
																	return callback(null);
																}
															});
														}else{
															 casper.echo('Message is not generated Found', 'ERROR');
														}
													}
												});
											}else{
												 casper.echo('Default_registration_option Link Not Found', 'ERROR');
											}
										}
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



/**********************Method For facebook popup with different username format ************/

//Method for logout from application
uploadAttachmentMethod.facebookPopUp = function(casper,test, callback) {
	casper.then(function(){		
		casper.test.assertExists('a#fblogin','Facebook Login Button Found On login Page Of FrontEndUrl');
		casper.click('a#fblogin');
		casper.eachThen(jsons['InvalidInfo'], function(response) {
			var responseData = response.data;
			casper.echo('user data : '+JSON.stringify(responseData), 'INFO');
				casper.waitForPopup(/facebook/, function(popup) {
			},20000);
			casper.withPopup(/facebook/ , function() {
				wait.waitForElement('form#login_form', casper, function(err, isExist) {
					if(!err){
						if(isExist) {	
							casper.test.assertExists('form#login_form');
							casper.echo("responseData.email : " +responseData.email+ " & responseData.pass : " +responseData.pass);
							casper.fill('form#login_form',{
								'email': responseData.email,
								'pass': responseData.pass
							}, false);
							casper.test.assertExists('form[id="login_form"] input[id="u_0_2"]');
							casper.click('form[id="login_form"] input[id="u_0_2"]');
							
						} else {
						casper.echo('Facebook Form Not Found','ERROR');
						}
					}
				});
				if (responseData.errorType != "success") {
					casper.wait(2000, function() {
						
						
					});
				}
				
			});
			if (responseData.errorType == "success") {
				casper.wait(5000, function() {
					
				});
			}	
		});	
	});
	casper.then(function(){
		 return callback(null);
	});
		
};


//Method for logout from application
uploadAttachmentMethod.logoutFromApp = function(driver,test, callback) {
	
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


//Method for logout from application
uploadAttachmentMethod.createMessage = function(data, driver, callback) {		
	
		driver.sendKeys('input[id="tokenfield_typeahead-tokenfield"]', data.to, {keepFocus:true});
		driver.sendKeys('input[id="tokenfield_typeahead-tokenfield"]', casper.page.event.key.Enter, {keepFocus:true} );
		driver.sendKeys('input[id="pm_subject"]', data.subject + 'raj', {keepFocus:true});		
		driver.test.assertExists('textarea#pmessage_new');
		driver.evaluate(function() {
			document.querySelector('textarea#pmessage_new').click();
		});
		driver.waitUntilVisible('iframe#pmessage_new_ifr', function() {
			driver.withFrame('pmessage_new_ifr', function() {
				driver.sendKeys('#tinymce', driver.page.event.key.Ctrl,driver.page.event.key.A,{keepFocus: true});		
				driver.sendKeys('#tinymce', driver.page.event.key.Backspace, {keepFocus: true});
				driver.sendKeys('#tinymce', data.pmessage);
			});
		});
		driver.then(function() {
			driver.test.assertExists('a#send_pmsg_button');
			driver.click('a#send_pmsg_button');
			driver.waitUntilVisible('div#ajax-msg-top', function() {
				driver.echo(driver.fetchText('div#ajax-msg-top p'),'INFO');
				return callback(null);
			});

		});
	

};	

/********************************* Method for private method *************************/

//1.Method for Verify with private message(reply section)camera browse
uploadAttachmentMethod.cameraBrowse = function(driver,callback) {	
	wait.waitForElement('form#PostPrivateMessageReply', casper, function(err, isExist) {
		if(!err){
			if(isExist) {
				casper.test.assertExists('a#insert_image_dialog_reply');
				casper.click('a#insert_image_dialog_reply');
				wait.waitForTime(1000 , casper , function(err) {
					wait.waitForElement('a#computerreply', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								
								casper.test.assertExists('a#computerreply');
								casper.click('a#computerreply');
								casper.test.assertExists('a#insertImage_reply');
								//casper.click('a#insertImage_reply');
								casper.test.assertExists('button#bootstrap_close_image_dialogreply');
								casper.click('button#bootstrap_close_image_dialogreply');
								//casper.thenOpen('http://s3.amazonaws.com/files.websitetoolbox.com/200676/3156405' , function(){
								//	wait.waitForTime(1000 , driver , function(err) {
								
								//	});
								//});	
								wait.waitForElement('a.default-user', casper , function(err, isExists) {
									if(isExists) {
										casper.test.assertDoesntExist('#td_tab_login');
										casper.echo('User has been successfuly login to application', 'INFO');
										forumLoginMethod.logoutFromApp(casper, function(err){
											if (!err)
											casper.echo('Successfully logout from application', 'INFO');
											return callback(null);
										});
									}else{
									casper.echo('User not logged-in element a.default-user not found','ERROR');
									}
								});
							} else {
							casper.echo('User didn\'t not found any images Inserted reply form link', 'ERROR');
							}
						}
					});
				});
			} else {
			casper.echo('User didn\'t not found any form-PostPrivateMessageReply link', 'ERROR');
			}
		}
	});
}

//2.Method for Verify with private message(reply section) camera webaddress
uploadAttachmentMethod.cameraWebaddress = function(driver,callback) {	
	wait.waitForElement('form#PostPrivateMessageReply', casper, function(err, isExist) {
		if(!err){
			if(isExist) {
				casper.test.assertExists('a#insert_image_dialog_reply');
				casper.click('a#insert_image_dialog_reply');
				wait.waitForTime(2000 , casper , function(err) {
					wait.waitForElement('a#webreply', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.test.assertExists('a#webreply');
								casper.click('a#webreply');
								casper.sendKeys('input[name="fname"]', 'https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/thumb/16748462');	
								casper.click('button#insert_image_btnreply');

								wait.waitForElement('a.default-user', casper , function(err, isExists) {
									if(isExists) {
										casper.test.assertDoesntExist('#td_tab_login');
										casper.echo('User has been successfuly login to application', 'INFO');
										forumLoginMethod.logoutFromApp(casper, function(err){
											if (!err)
											casper.echo('Successfully logout from application', 'INFO');
											return callback(null);
										});
									}else{
									casper.echo('User not logged-in element a.default-user not found','ERROR');
									}
								});
							} else {
							casper.echo('User didn\'t not found any images Inserted reply form link', 'ERROR');
							}
						}
					});
				});
			} else {
			casper.echo('User didn\'t not found any form-PostPrivateMessageReply link', 'ERROR');
			}
		}
	});	
}

//3.Method for Verify with private message(reply section)Attachment
uploadAttachmentMethod.Attachment= function(driver,callback) {	
	wait.waitForElement('form#PostPrivateMessageReply', driver, function(err, isExist) {
		if(!err){
			if(isExist) {
				driver.test.assertExists('a#fancy_attach_reply');
				driver.click('a#fancy_attach_reply');
				
				//	driver.thenOpen('http://s3.amazonaws.com/files.websitetoolbox.com/200676/3156405' , function(){
				//	wait.waitForTime(1000 , driver , function(err) {
				
				//	});
				//});	
				wait.waitForElement('a.default-user', driver , function(err, isExists) {
					if(isExists) {
						driver.test.assertDoesntExist('#td_tab_login');
						driver.echo('User has been successfuly login to application', 'INFO');
						forumLoginMethod.logoutFromApp(casper, function(err){
							if (!err)
							casper.echo('Successfully logout from application', 'INFO');
							return callback(null);
						});
					}else{
					driver.echo('User not logged-in element a.default-user not found','ERROR');
					}
				});	
			} else {
			driver.echo('User didn\'t not found any form-PostPrivateMessageReply link', 'ERROR');
			}
		}
	});
}

//4.Method for Verify with private message(reply section)Insert Photos browse
uploadAttachmentMethod.insertPhotosBrowse= function(driver,callback) {	
	wait.waitForElement('form#PostPrivateMessageReply', casper, function(err, isExist) {
		if(!err){
			if(isExist) {
				casper.test.assertExists('textarea#pmessage_reply');
				casper.click('textarea#pmessage_reply');
				wait.waitForTime(5000 , casper , function(err) {
				
				casper.waitUntilVisible('iframe#pmessage_reply_ifr', function() {
					casper.test.assertExists('iframe#pmessage_reply_ifr');
					
						casper.test.assertExists('div#image_button_pmessage_reply');
						casper.click('div#image_button_pmessage_reply');
					    wait.waitForTime(2000 , casper , function(err) {
							wait.waitForElement('a#computerreply', casper, function(err, isExist) {
								if(!err){
									if(isExist) {
										casper.test.assertExists('a#computerreply');
										casper.click('a#computerreply');
										casper.test.assertExists('a#insertImage_reply');
										//casper.click('a#insertImage_reply');
										casper.test.assertExists('button#bootstrap_close_image_dialogreply');
										casper.click('button#bootstrap_close_image_dialogreply');
										//casper.thenOpen('http://s3.amazonaws.com/files.websitetoolbox.com/200676/3156405' , function(){
										//	wait.waitForTime(1000 , casper , function(err) {
										
										//	});
										//});
										wait.waitForTime(5000 , casper , function(err) {
										
											 forumLoginMethod.logoutFromApp(casper,function(err){
												if(!err){
													casper.echo('logout sucessful ','INFO');
                                                    return callback(null);													
												}
											});											
							        	});
									} else {
									casper.echo('User didn\'t not found any images Inserted reply form link', 'ERROR');
									}
								}
							});
						});
					});
				});
			} else {
			casper.echo('User didn\'t not found any form-PostPrivateMessageReply link', 'ERROR');
			}
		}
	});	
}

//5.Method for Verify with private message(reply section)Insert Photos webaddress
uploadAttachmentMethod.insertPhotosWebaddress= function(casper,callback) {	
	wait.waitForElement('form#PostPrivateMessageReply', casper, function(err, isExist) {
		if(!err){
			if(isExist) {
				casper.test.assertExists('textarea#pmessage_reply');
				casper.click('textarea#pmessage_reply');
				casper.waitUntilVisible('iframe#pmessage_reply_ifr', function() {
					casper.test.assertExists('iframe#pmessage_reply_ifr');
					wait.waitForTime(1000 , casper , function(err) {
						casper.test.assertExists('div#image_button_pmessage_reply');
						casper.click('div#image_button_pmessage_reply');
						wait.waitForTime(2000 , casper , function(err) {
							wait.waitForElement('a#webreply', casper, function(err, isExist) {
								if(!err){
									if(isExist) {
										
										casper.test.assertExists('a#webreply');
										casper.click('a#webreply');
										casper.sendKeys('input[name="fname"]', 'https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/thumb/16748462');	
										casper.click('button#insert_image_btnreply');
										forumLoginMethod.logoutFromApp(casper, function(err){
											if (!err){
												casper.echo('Successfully logout from application', 'INFO');
												return callback(null);
										   }
										});
									} else {
									casper.echo('User didn\'t not found any images Inserted reply form link', 'ERROR');
									}
								}
							});
						});
					});
				});
			} else {
			casper.echo('User didn\'t not found any form-PostPrivateMessageReply link', 'ERROR');
			}
		}
	});	
}

//6.Method for Verify with send message
uploadAttachmentMethod.sendMessage= function(casper,callback) {	
    //casper.thenOpen(config.url, function() {
		wait.waitForElement('#td_tab_login', casper, function(err, isExist) {
			if(!err){
				if(isExist) {
					casper.test.assertExists('#td_tab_login');
					casper.click('#td_tab_login');
					forumLoginMethod.loginToApp(json['Valid'].username, json['Valid'].password, casper, function(err){
						if(!err) {
							casper.echo('login by valid username and password and verify error message', 'INFO');
							wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
								if(isExists) {
									try {	
										casper.click('i#private_message_notification');
										wait.waitForElement('ul#private_message_dropdown span.pull-right', casper, function(err, isExists) {
											if(isExists) {
												casper.click('a.send_new_pmsg');
												wait.waitForTime(7000 , casper , function(err) {
													
													wait.waitForElement('form#PostPrivateMessage', casper, function(err, isExists) {
														if(isExists) {
															uploadAttachmentMethod.createMessage(json.Privatemessage, casper, function(err) {
																if(!err) {
																	casper.echo('Message sent called successfully..','INFO');
																	}
																});
														} else {
															casper.echo('PostPrivateMessage form not found','ERROR');
														}
													});
												});
											} else {
												casper.echo('Send a New Messag Pop not found','ERROR');
											}
										});
									} catch (e) {
										casper.echo('Message not sent..','INFO');
									}
								}else {
									casper.echo('User not logged in', 'INFO');
								}
							});		
						}
					});
				} else {
				casper.echo('User didn\'t not found any login link', 'ERROR');
				}
			}
		});
	//});
}

/********************************* Method common for archieve box *************************/
//1.Method for test case for Verify with send the message from archieve box
uploadAttachmentMethod.messageFromArchieveBox= function(casper,callback) {	
	
	forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
		if(!err) {
			casper.echo('login by valid username and password and verify error message', 'INFO');
			wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
				if(isExists) {
					try {	
						casper.click('i#private_message_notification');
						wait.waitForElement('span.pull-left.user-nav-panel li.user-nav-list-all a', casper, function(err, isExists) {
							if(isExists) {
								casper.click('span.pull-left.user-nav-panel li.user-nav-list-all a');
								wait.waitForElement('ul#pmsg_inbox_listing', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('ul#pmsg_inbox_listing li:nth-child(1) input[type="checkbox"]');
											casper.click('ul#pmsg_inbox_listing li:nth-child(1) input[type="checkbox"]');
											casper.test.assertExists(' span#move_conversation_dropdown a i:nth-child(2)');
											casper.evaluate(function() {
											document.querySelector('span#move_conversation_dropdown a i:nth-child(2)').click();
											});
											wait.waitForTime(4000 , casper , function(err) {
												casper.test.assertExists(' li#move_to_saved_btn a');
												casper.evaluate(function() {
												document.querySelector('li#move_to_saved_btn a').click();
												}); 
												wait.waitForElement('div.dropdown a:nth-child(1) span', casper, function(err, isExist) {
													if(!err){
														if(isExist) {
													
														casper.test.assertExists('div.dropdown a:nth-child(1) span');
														casper.click('div.dropdown a:nth-child(1) span');
														wait.waitForElement('a[href="/pm/inbox?fid=2"]', casper, function(err, isExist) {
															if(!err){
																if(isExist) {			
																	casper.test.assertExists('a[href="/pm/inbox?fid=2"]');
																		casper.evaluate(function() {
																		document.querySelector('a[href="/pm/inbox?fid=2"]').click();
																		});
																	return callback(null);
																	} else {
																	casper.echo('User didn\'t not found any form-PostPrivateMessageReply link', 'ERROR');
																	}
																}
															});
														} else {
														casper.echo('User didn\'t not found any form-PostPrivateMessageReply link', 'ERROR');
														}
													}
												});
											});
										} else {
										casper.echo('User didn\'t not found any form-PostPrivateMessageReply link', 'ERROR');
										}
									}
								});
							} else {
							driver.echo('User didn\'t not found any See all link','ERROR');
							}
						});
					} catch (e) {
					casper.echo('Message not sent..','INFO');
					}
				}else {
				casper.echo('User not logged in', 'INFO');
				}
			});		
		}
	});	
}


/********************************* Method common for User Account off cases *************************/
//Method for Incontext login with New Registration
uploadAttachmentMethod.backEndSetting = function(casper,callback) {	
	casper.then(function(){
		casper.echo('***********************case-01 *********************','INFO');
		uploadAttachmentMethod.userAccountSettings(true,casper,casper.test,function(err){
			if(!err){
               casper.echo('uploadAttachmentMethod of userAccountSettings working','INFO');
			}
		});
		casper.then(function(){
			  casper.echo('***********************case-02 *********************','INFO');
			 uploadAttachmentMethod.defaultRegistrationOption('Yes',casper,casper.test,function(err){
				 if(!err){
	                casper.echo('uploadAttachmentMethod of defaultRegistrationOption working','INFO');
				 }
			 });
		});
		casper.then(function(){
			 casper.echo('***********************case-03 *********************','INFO');
			 uploadAttachmentMethod.topicViewSetting(casper,casper.test,function(err){
				 if(!err){
					 casper.echo('uploadAttachmentMethod of topicViewSetting working','INFO');
				 }
			 });
		});
		casper.then(function(){
			casper.echo('***********************case-04 *********************','INFO');
			uploadAttachmentMethod.customFields(casper,casper.test,function(err){
				if(!err){
					  casper.echo('uploadAttachmentMethod of customFields working','INFO');
				}
			});	
		});
		casper.then(function(){
			casper.echo('***********************case-05 *********************','INFO');
			uploadAttachmentMethod.makeUserAdministrators(casper,casper.test,function(err){
				if(!err){
					  casper.echo('uploadAttachmentMethod of customFields working','INFO');
				}
			});	
		});
		casper.then(function(){
			casper.echo('***********************case-06 *********************','INFO');
			uploadAttachmentMethod.backendSettingFacebook('Yes',casper,casper.test,function(err){
				if(!err){
					  casper.echo('uploadAttachmentMethod of customFields working','INFO');
				}
			});	
		});
		casper.then(function(){
			return callback(null);	
		})
	});
}


