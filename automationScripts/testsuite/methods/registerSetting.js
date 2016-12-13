'use strict';
var wait = require('../wait.js');
var utils = require('../utils.js');
var forumLoginMethod = require('../methods/login.js');
var registerMethod = require('./register.js');
var json = require('../../testdata/registerSettingData.json');
var registerSettingMethod=module.exports = {};
var errorMessage = "";


//Method For Filling Data In Default Registration Options
registerSettingMethod.registerBackUrl= function(id,jsonData, casper, callback) {
	casper.thenOpen(config.backEndUrl, function() {
		registerSettingMethod.logoutFromApp(casper, casper.test, function(err) {
			if(!err){
				registerMethod.loginToForumBackEnd(casper, casper.test, function(err) {
					 if(!err){					
						casper.echo('Successfully Login To Forum Back End...........', 'INFO');
						//Clicking On "General" Tab Under Settings 
						wait.waitForElement('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
									casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
									casper.test.assertExists(' div.tooltipMenu.text a[title="Specify the default behavior of profile fields and preferences"]');
									casper.click(' div.tooltipMenu.text a[title="Specify the default behavior of profile fields and preferences"]');
									casper.echo('Successfully open Default Option page.....', 'INFO');
									wait.waitForElement(id, casper, function(err, isExist) {
										if(!err){
											if(isExist) {
												registerSettingMethod.registerEditProfile(jsonData, casper, function(err){
													if(!err){
														wait.waitForElement('p[align="center"] font[color="red"]', casper, function(err, isExist) {
															if(!err){
																if(isExist) {
																	casper.test.assertExists('p[align="center"] font[color="red"]');
																	var message = casper.fetchText('p[align="center"] font[color="red"]');
																	casper.echo("message : "+message, 'INFO');
																	var expectedErrorMsg = 'Your profile fields have been updated.';
																	casper.test.assertEquals(message, expectedErrorMsg);
																	registerSettingMethod.logoutFromApp(casper, casper.test, function(err) {
																		if(!err){
																			casper.thenOpen(config.url, function() {
																					casper.echo('Title of the page :' +this.getTitle(), 'INFO');
																					wait.waitForElement('.pull-right a', casper, function(err, isExist) {
																						if(!err){
																							if(isExist) {
																								casper.test.assertExists('.pull-right a');
																								casper.click('.pull-right a');
																								casper.echo('Successfully open register form.....', 'INFO');
																								return callback(null);
																							} else {
																								casper.echo('User didn\'t not found any register link', 'ERROR');
																								return callback(null);
																							}
																						}
																					});
																				});
																			
																		}
																	});
																} else {
																casper.echo('Default registration message not generated', 'ERROR');
																}
															}
														});
													}
												});
											} else {
											casper.echo('Default registration form not found', 'ERROR');
											}
										}
									});	
								} else {
								casper.echo('Setting Link Not Found', 'ERROR');
								}
							}
						});	
					}
				});
			}
		});
	});			
};

//Method For call registration method  
registerSettingMethod.registerFrontUrl= function(functioncall,driver,callback) {
	driver.then(function() {
		functioncall;
		return callback(null);	
	});
};


//Method for Incontext login with New Registration
registerSettingMethod.backEndSetting = function(casper,callback) {	
	casper.then(function(){
		casper.echo('***********************case-01 *********************','INFO');
		registerSettingMethod.userAccountSettings(true,casper,casper.test,function(err){
			if(!err){
               casper.echo('registerSettingMethod of userAccountSettings working','INFO');
			}
		});
		casper.then(function(){
			  casper.echo('***********************case-02 *********************','INFO');
			 registerSettingMethod.defaultRegistrationOption('Yes',casper,casper.test,function(err){
				 if(!err){
	                casper.echo('registerSettingMethod of defaultRegistrationOption working','INFO');
				 }
			 });
		});
		casper.then(function(){
			 casper.echo('***********************case-03 *********************','INFO');
			 registerSettingMethod.topicViewSetting(casper,casper.test,function(err){
				 if(!err){
					 casper.echo('registerSettingMethod of topicViewSetting working','INFO');
				 }
			 });
		});
		casper.then(function(){
			casper.echo('***********************case-04 *********************','INFO');
			registerSettingMethod.customFields(casper,casper.test,function(err){
				if(!err){
					  casper.echo('registerSettingMethod of customFields working','INFO');
				}
			});	
		})
		casper.then(function(){
			return callback(null);	
		})
	});
}


/**************************** Method for Backend Setting *********************/

//Method for Backend Setting(Forum Settings Enable/Disable in user Account)
registerSettingMethod.userAccountSettings = function(value,casper,test,callback) {	
	casper.thenOpen(config.backEndUrl, function() {
		registerSettingMethod.logoutFromApp(casper, casper.test, function(err) {
			if(!err){
				registerMethod.loginToForumBackEnd(casper, test, function(err) {
					 if(!err){
						casper.echo('Logged-in successfully from back-end', 'INFO');
						wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									wait.waitForElement('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', casper, function(err, isExist) {
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
																	registerSettingMethod.logoutFromApp(casper, casper.test, function(err) {
																		if(!err){
																			casper.echo('registerSettingMethod of logoutFromApp working sucessful ', 'INFO');
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
												casper.echo('Setting Link Not Found', 'ERROR');
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


//Method for Backend Setting(Field Enable/Disable in Default Registration Option)
registerSettingMethod.defaultRegistrationOption = function(value,casper,test,callback) {	
	casper.thenOpen(config.backEndUrl, function() {
		registerSettingMethod.logoutFromApp(casper, casper.test, function(err) {
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
													'required_signature' : value
												}, true);
												casper.click('form[name="posts"] button');
												wait.waitForElement('font[color="red"]', casper, function(err, isExist) {
													if(!err){
														if(isExist) {
															var successMsg = casper.fetchText('font[color="red"]');
															casper.echo('success message : '+successMsg, 'INFO');
															casper.echo('success message is verified', 'INFO');
															registerSettingMethod.logoutFromApp(casper, casper.test, function(err) {
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


//Method for Backend Setting(Topic view in front-setting)
registerSettingMethod.topicViewSetting = function(casper,test,callback) {	
	casper.thenOpen(config.backEndUrl, function() {
		registerSettingMethod.logoutFromApp(casper, casper.test, function(err) {
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
																		registerSettingMethod.logoutFromApp(casper, casper.test, function(err) {
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


//Method for Backend Setting(Deleted field in Custom Profile Fields)
registerSettingMethod.customFields = function(casper,test,callback) {	
	casper.thenOpen(config.backEndUrl, function() {
		registerSettingMethod.logoutFromApp(casper, casper.test, function(err) {
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
															registerSettingMethod.logoutFromApp(casper, casper.test, function(err) {
																if(!err){
																	casper.echo('registerSettingMethod of logoutFromApp work sucessful', 'INFO');
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


/**********************Method For Registration with different username format ************/

//Method For Registration with different username format(backend setting and front end setting)
registerSettingMethod.differentUsernameFormat = function(formateName,jsonData, expectedErrorMsg,casper,callback) {
   casper.thenOpen(config.backEndUrl, function() {
		registerSettingMethod.logoutFromApp(casper, casper.test, function(err) {
			if(!err){
				registerMethod.loginToForumBackEnd(casper, casper.test, function(err) {
					 if(!err){
						casper.echo('Logged-in successfully from back-end', 'INFO');
						wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
									casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
									casper.test.assertExists('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
									casper.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
									wait.waitForElement('select#username_regexp', casper, function(err, isExist) {
										if(!err){
											if(isExist) {
												casper.test.assertExists('select#username_regexp');
												casper.click('select#username_regexp');
												casper.fill('form[name="posts"] ', {
													'username_regexp' : formateName
												},false);
												casper.test.assertExists('form[name="posts"] button');
												casper.click('form[name="posts"] button');
												wait.waitForElement('div#ajax-msg-top', casper, function(err, isExist) {
														if(!err){
															if(isExist) {  
																var successMsg = casper.fetchText('div#ajax-msg-top');
																casper.echo('success message : '+successMsg, 'INFO');
																registerSettingMethod.logoutFromApp(casper, casper.test, function(err) {
																	if(!err){
																	    wait.waitForTime(5000, casper, function() {
																			casper.thenOpen(config.url, function() {
																				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
																				wait.waitForElement('.pull-right a[href="/register/register"]', casper, function(err, isExist) {
																					if(!err){
																						if(isExist) {
																							casper.test.assertExists('.pull-right a[href="/register/register"]');
																							casper.click('.pull-right a[href="/register/register"]');
																							casper.echo('Successfully open register form.....', 'INFO');
																							registerSettingMethod.changeUsernameFormat(jsonData, expectedErrorMsg,formateName,casper,function(err){
																								if(!err){
																								  casper.echo('changeUsernameFormat working','INFO');
																								  return callback(null);
																								}
																							});
																						} else {
																							casper.echo('User didn\'t not found any register link', 'ERROR');
																						}
																					}
																				});
																			});
																		});
																	}
																});	
															}else{
																 casper.echo('Message is not generated Found', 'ERROR');
															}
														}
													});
											}else{
												 casper.echo('Forum Settings Link Not Found', 'ERROR');
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
};


//Method For Registration with different username format(test case for register to application by  verify error message)
registerSettingMethod.changeUsernameFormat= function(Data, expectedErrorMsg, msgTitle,casper,callback) {
	casper.then(function() {
		casper.echo('**************************************************************', 'INFO');
		casper.echo('test case for register to application by  verify error message', 'INFO');
		casper.echo('**************************************************************', 'INFO');
		registerMethod.registerToApp(Data, casper, function(err){
			if(!err) {
				casper.echo('register by leaving blank username and verify error message', 'INFO');
				wait.waitForElement('form[name="PostTopic"] input[name="member"]', casper, function(err, isExist){ 
					 if(!err){
						 if(isExist) {
							var errorMessage = casper.getElementAttribute('form[name="PostTopic"] input[name="member"]', 'data-original-title');
							errorMessage = errorMessage.trim();
							if(errorMessage && errorMessage!= '')
								registerMethod.verifyErrorMsg(errorMessage,expectedErrorMsg, msgTitle, casper, function(err) {
									if(!err) {
										casper.echo('Verified error message successfully', 'INFO');
										return callback(null);
									}
								});
						} else {
							casper.echo('postTopic form  Not Found', 'ERROR');
							return callback(null);
						}
					}
				});
			}
		});	
	});	
}

//Method For Registration with different username format(test case for register to application by  verify message)
registerSettingMethod.registration= function(Data,casper,callback) {
	casper.then(function() {
		casper.echo('****************************************************************************************', 'INFO');
		casper.echo('test case for register to application by leaving blank username and verify error message', 'INFO');
		casper.echo('****************************************************************************************', 'INFO');
		registerMethod.registerToApp(Data, casper, function(err){
			if(!err) {
				casper.echo('register by leaving blank username and verify error message', 'INFO');
				wait.waitForElement('form[name="PostTopic"] input[name="member"]', casper, function(err, isExist){ 
					 if(!err){
						 if(isExist) {
							registerMethod.redirectToLogout(casper, casper.test, function(err) {
								if(!err) {
									casper.echo('User logout successfully', 'INFO');
									return callback(null);
								}
							});						
						} else {
							casper.echo('postTopic form  Not Found', 'ERROR');
							return callback(null);
						}
					}
				});
			}
		});	
	});	
}


//Method for logout from application
registerSettingMethod.logoutFromApp = function(driver,test, callback) {
	
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


//Method For Filling Data In Default Registration Options
registerSettingMethod.registerEditProfile = function(data, driver, callback) {		
	try {
		driver.test.assertExists('form[name="posts"] select[name="required_name"] ');
		driver.fill('form[name="posts"]', {
			'required_name' : data.required,
			'visiblity_name' : data.visiblity,
		},false);
	} catch(e) {
	    driver.test.assertDoesntExist('form[name="posts"] select[name="required_name"]');
	}
	
	try {
		driver.test.assertExists('form[name="posts"] select[name="required_imType"]');
		driver.fill('form[name="posts"] ', {
			'required_imType' : data.required,
			'visiblity_imType' : data.visiblity,
		},false);
	} catch(e) {
	    driver.test.assertDoesntExist('form[name="posts"] select[name="required_imType"]');
	}
	
	try {
		driver.test.assertExists('form[name="posts"] select[name="required_dob"] ');
		driver.fill('form[name="posts"] ', {
			'required_dob' : data.required,
			'visiblity_dob' : data.visiblity,
		},false);
	} catch(e) {
	    driver.test.assertDoesntExist('form[name="posts"] select[name="required_dob"] ');
	}
	
	try {
		driver.test.assertExists('form[name="posts"] select[name="required_signature"] ');
		driver.fill('form[name="posts"] ', {
			'required_signature' : data.required,
			'visiblity_signature' : data.visiblity,
		},false);
	} catch(e) {
	    driver.test.assertDoesntExist('form[name="posts"] select[name="required_signature"] ');
	}

	driver.test.assertExists('form[name="posts"] button');
	driver.click('form[name="posts"] button');

	return callback(null);		
};


//Method For Filling Data In Login Form(Front end)
registerSettingMethod.fillDataToLoginFront = function( driver,data, callback) {
			driver.fill('form[name="frmLogin"]', {
				'member' : data.username,
				'pw' : data.password,
			}, false);
			driver.test.assertExists('form[name="frmLogin"] button');
			driver.click('form[name="frmLogin"] button');
			return callback();
		};

		
//Method For label check in Front registration form  method call 
registerSettingMethod.formLabelCheck= function(formModuldId,driver,callback) {
	driver.then(function() {	
		wait.waitForElement(formModuldId,driver, function(err, isExist){ 
			if(!err){
				if(isExist) {
					driver.test.assertExists(formModuldId);
					var message = driver.fetchText(formModuldId);
					driver.echo("message : "+message, 'INFO');
					return callback(null);
				} else {
					driver.echo('postTopic form  Not Found', 'ERROR');
					return callback(null);
				}
			}
		});

	});		
};


//Method For label check in Front registration form  method call 
registerSettingMethod.getSelector= function(id,driver,callback) {
	var grpName = driver.evaluate(function(){
	    var x3 = document.querySelector(id).getAttribute('id');
		return x3;
	});
	
	wait.waitForElement(grpName,driver, function(err, isExist) {
		if(!err){
			if(isExist) {
				driver.test.assertExists(grpName);
				driver.click(grpName);
				return callback(null);
				
			} else {
			casper.echo('link not found', 'ERROR');
			return callback(null);
			}
		}
	});	
}


//Method For Filling Data In Registration Form(related topic,like,dislike)
registerSettingMethod.registerToApp = function(data, driver, callback) {
	driver.fill('form[name="PostTopics"]', {
		'member' : data.uname,
		'email': data.uemail,
		'pw' : data.upass
		
	}, false);
	/*
	try {
		driver.test.assertExists('form[name="PostTopic"] input[name="name"]');
		driver.fill('form[name="PostTopic"]', {
			'name' : data.fullName,
			'name_private' : true
		}, false);
	} catch(e) {
		driver.test.assertDoesntExist('form[name="PostTopic"] input[name="name"]');
	}
	
	try {
		driver.test.assertExists('form[name="PostTopic"] input[name="imID"]');
		driver.fill('form[name="PostTopic"]', {
			'imID' : data.imID
		}, false);
	} catch(e) {
		driver.test.assertDoesntExist('form[name="PostTopic"] input[name="imID"]');
	}
	
	try {
		driver.test.assertExists('form[name="PostTopic"] div.sign-container');
		driver.fill('form[name="PostTopic"]', {
			'signature' : data.usignature
		}, false);
	} catch(e) {
		driver.test.assertDoesntExist('form[name="PostTopic"] div.sign-container');
	}
	
	try {
		driver.test.assertExists('form[name="PostTopic"] input[name="birthDatepicker"]');
		driver.sendKeys('input[name="birthDatepicker"]', data.birthday, {reset : true});
	} catch(e) {
		driver.test.assertDoesntExist('form[name="PostTopics"] input[name="birthDatepicker"]');
	}
	
	try {
		driver.test.assertExists('form[name="PostTopic"] input[name="rules_checkbox"]');
		utils.enableorDisableCheckbox('rules_checkbox', true, driver, function() {
			casper.echo("Rules Checkbox Has Been Enabled For User", 'INFO');
		});
	} catch(e) {
		driver.test.assertDoesntExist('form[name="PostTopic"] input[name="rules_checkbox"]');
	}
	
	var actionValue = driver.evaluate(function() {   
		document.querySelector('form[name="PostTopic"]').setAttribute('action', '/register/create_account?apikey=4XXhjFbE6fBhmfFwGWkmjgPIN4UKBFDYdSWGcR4q&type=json');
		return document.querySelector('form[name="PostTopic"]').getAttribute('action');     
	});
	*/
	driver.test.assertExists('form[name="PostTopics"] button');
	driver.click('form[name="PostTopics"] button');
	return callback(null);		
};
