'use strict';
var registerTests = require('./register.js');
var json = require('../../testdata/registerSettingData.json');
var registerMethod = require('../methods/register.js');
var registerSettingMethod = require('../methods/registerSetting.js');
var wait = require('../wait.js');
var registerSettingTests=module.exports = {};
var errorMessage = "";

//1.Back end Full Name front end Registration with Full name  blank data
registerSettingTests.fullNameBlankData = function() {
	casper.echo('********************************************','INFO');
	casper.echo('BACKEND FULL NAME BLANK DATA','INFO');
	casper.echo('********************************************','INFO');
	//1.Test case for Back end deafult "Yes",Required "Registration Page Only"  
	casper.then(function() {
		casper.echo('******************** case-01 ************************','INFO');
		casper.echo('Test case for Back end deafult "Yes",Required "Registration Page Only" ','INFO');
		casper.echo('********************************************','INFO');
		registerBackUrl('form[name="posts"] select[name="required_name"]',json['setRegistrationValueOn'],casper, function(err) {
			if(!err){
				registerFrontUrl(registerTests.blankUsername(), casper, function(err) {
					if(!err){
					    casper.echo('registerFrontUrl is working','INFO');	 
					}
				});	
			}
		});
		//2.Test case for Back end  deafult "Yes",Required "Visible"  
		casper.then(function() {
			casper.echo('******************** case-02 ************************','INFO');
			casper.echo('Test case for deafult "Yes",Required "Visible" ','INFO');
			casper.echo('********************************************','INFO');
			registerBackUrl('form[name="posts"] select[name="required_name"]',json['setVisibleValueOn'], casper, function(err) {
				if(!err){
					registerFrontUrl(registerTests.blankUsername(), casper, function(err) {
						if(!err){
						    casper.echo('registerFrontUrl is working','INFO');	 
						}
					});
				}
			});
		});
		casper.then(function() {
			registerSettingTests.defaultRegistrationSetting('form[name="posts"] select[name="required_name"]',casper, function(err) {
				if(!err){
				    casper.echo('defaultRegistrationSetting  working','INFO');
				}
			});
		});
	});
}


//2.Back end Birthday front end Registration with Birthday blank data
registerSettingTests.birthdayBlankData = function() {
	//1.Test case for Back end deafult "Yes",Required "Registration Page Only"
	casper.then(function() {
		casper.echo('********************************************','INFO');
		casper.echo('BACKEND BIRTHDAY BLANK DATA ************************','INFO');
		casper.echo('Test case for Back end deafult "Yes",Required "Registration Page Only"','INFO');
		casper.echo('********************************************','INFO');
		registerBackUrl('form[name="posts"] select[name="required_dob"]',json['setRegistrationValueOn'],casper, function(err) {
			if(!err){
				registerFrontUrl(registerTests.blankBirthday(), casper, function(err) {
					if(!err){
					    casper.echo('registerFrontUrl is working','INFO');	 
					}
				});	
			}
		});
		//2.Test case for deafult "Yes",Required "Visible" 
		casper.then(function() {
			casper.echo('******************** case-02 ************************','INFO');
			casper.echo('Test case for deafult "Yes",Required "Visible" ','INFO');
			casper.echo('********************************************','INFO');
			registerBackUrl('form[name="posts"] select[name="required_dob"]',json['setVisibleValueOn'], casper, function(err) {
				if(!err){
					registerFrontUrl(registerTests.blankBirthday(), casper, function(err) {
						if(!err){
						    casper.echo('registerFrontUrl is working','INFO');	 
						}
					});
				}
			});
		});
		casper.then(function() {
			registerSettingTests.defaultRegistrationSetting('form[name="posts"] select[name="required_dob"]',casper, function(err) {
				if(!err){
				    casper.echo('defaultRegistrationSetting  working','INFO');
				}
			});
		});
	});	
}


//3.Back end Signature end Registration with Signature  blank data
registerSettingTests.signatureBlankData = function() {

	//1.Test case for Back end deafult "Yes",Required "Registration Page Only"
	casper.then(function() {
		casper.echo('********************************************','INFO');
	    casper.echo('BACKEND SIGNATURE BLANK DATA************************','INFO');
		casper.echo('Test case for Back end deafult "Yes",Required "Registration Page Only"','INFO');
		casper.echo('********************************************','INFO');
		registerBackUrl('form[name="posts"] select[name="required_signature"]',json['setRegistrationValueOn'],casper, function(err) {
			if(!err){
				registerFrontUrl(registerTests.blankSignature(), casper, function(err) {
					if(!err){
					    casper.echo('registerFrontUrl is working','INFO');	 
					}
				});	
			}
		});
		//2.Test case for deafult "Yes",Required "Visible" 
		casper.then(function() {
			casper.echo('******************** case-02 ************************','INFO');
			casper.echo('Test case for deafult "Yes",Required "Visible"','INFO');
			casper.echo('********************************************','INFO');
			registerBackUrl('form[name="posts"] select[name="required_signature"]',json['setVisibleValueOn'], casper, function(err) {
				if(!err){
					registerFrontUrl(registerTests.blankSignature(), casper, function(err) {
						if(!err){
						    casper.echo('registerFrontUrl is working','INFO');	 
						}
					});
				}
			});
		});
		casper.then(function() {
			registerSettingTests.defaultRegistrationSetting('form[name="posts"] select[name="required_signature"]',casper, function(err) {
				if(!err){
				    casper.echo('defaultRegistrationSetting  working','INFO');
				}
			});
		});
	});	
}


//4.Back end instantMessage front end Registration with  instantMessage blank data
registerSettingTests.instantMessageBlankData = function() {
	 
	//1.Test case for Back end deafult "Yes",Required "Registration Page Only" 
	casper.then(function() {
		casper.echo('********************************************','INFO');
	    casper.echo('BACKEND INSTANTMESSAGE BLANK DATA************************','INFO');
		casper.echo('Test case for Back end deafult "Yes",Required "Registration Page Only" ','INFO');
		casper.echo('********************************************','INFO');
		registerBackUrl('form[name="posts"] select[name="required_imType"]',json['setRegistrationValueOn'],casper, function(err) {
			if(!err){
				registerFrontUrl(registerTests.blankImId(), casper, function(err) {
					if(!err){
					    casper.echo('registerFrontUrl is working','INFO');	 
					}
				});	
			}
		});
		//2.Test case for deafult "Yes",Required "Visible"
		casper.then(function() {
			casper.echo('******************** case-02 ************************','INFO');
			casper.echo('Test case for deafult "Yes",Required "Visible" ','INFO');
			casper.echo('********************************************','INFO');
			registerBackUrl('form[name="posts"] select[name="required_imType"]',json['setVisibleValueOn'], casper, function(err) {
				if(!err){
					registerFrontUrl(registerTests.blankImId(), casper, function(err) {
						if(!err){
						    casper.echo('registerFrontUrl is working','INFO');	 
						}
					});
				}
			});
		});
		casper.then(function() {
			registerSettingTests.defaultRegistrationSetting('form[name="posts"] select[name="required_imType"]',casper, function(err) {
				if(!err){
				    casper.echo('defaultRegistrationSetting  working','INFO');
				}
			});
		});
	});
}



//5.verify Full Name Back End And Fornt End Registration Page Full Name Enable/Disable
registerSettingTests.labelFullName = function() {
	casper.echo('********************************************','INFO');
	casper.echo('BACKEND FULL NAME ENABLE/DISABLE*************','INFO');
	casper.echo('********************************************','INFO');
		casper.then(function() {
			registerSettingTests.registrationSettingLabel('form[name="posts"] select[name="required_name"]','label[for="inputname"]',casper, function(err) {
				if(!err){
				    casper.echo('registrationSettingLabel  working','INFO');
				}
			});
		});
}


//6.verify Birthday Back End And Fornt End Registration Page Birthday Enable/Disable
registerSettingTests.labelBirthday = function() {
	
	casper.then(function() {
		casper.echo('********************************************','INFO');
		casper.echo('BACKEND BIRTHDAY ENABLE/DISABLE ************************','INFO');
		casper.echo('********************************************','INFO');
			registerSettingTests.registrationSettingLabel('form[name="posts"] select[name="required_dob"]','label[for="bd_month"]',casper, function(err) {
				if(!err){
				    casper.echo('registrationSettingLabel  working','INFO');
				}
			});
		
	});	
}


//7.verify Signature Back End And Fornt End Registration Page Signature Enable/Disable
registerSettingTests.labelSignature = function() {

	casper.then(function() {
		casper.echo('********************************************','INFO');
	    casper.echo('BACKEND SIGNATURE ENABLE/DISABLE************************','INFO');
		casper.echo('********************************************','INFO');
			registerSettingTests.registrationSettingLabel('form[name="posts"] select[name="required_signature"]','label[for="signature"]',casper, function(err) {
				if(!err){
				    casper.echo('registrationSettingLabel  working','INFO');
				}
			});
	});	
}


//8.verify instantMessage Back End And Fornt End Registration Page instantMessage Enable/Disable
registerSettingTests.labelInstantMessage = function() {
	  
	casper.then(function() {
		casper.echo('********************************************','INFO');
	    casper.echo('BACKEND INSTANTMESSAGE ENABLE/DISABLE************************','INFO');
		casper.echo('********************************************','INFO');
			registerSettingTests.registrationSettingLabel('form[name="posts"] select[name="required_imType"]','label[for="imType"]',casper, function(err) {
				if(!err){
					casper.echo('registrationSettingLabel  working','INFO');
				}
			});
	});
}


/*********************************PrivateMethod***********************************************/


//Method For DefaultRegistrationSetting  
registerSettingTests.defaultRegistrationSetting = function(id,casper,callback) {

	//3.Test case for deafult "Yes",Required "Hidden"
	casper.then(function() {
		casper.echo('******************** case-03 ************************','INFO');
		casper.echo('Test case for deafult "Yes",Required "Hidden"','INFO');
		casper.echo('********************************************','INFO');
		registerBackUrl(id,json['setHiddenValueOn'], casper, function(err) {
			if(!err){
				registerFrontUrl(registerTests.existEmail(), casper, function(err) {
					if(!err){
					     casper.echo('registerFrontUrl is working','INFO');	 
					}
				});
			}
		});

		//4.Test case for deafult "No", Required "Registration Page Only" 
		casper.then(function() {
			casper.echo('******************** case-04 ************************','INFO');
			casper.echo('Test case for deafult "No", Required "Registration Page Only"','INFO');
			casper.echo('********************************************','INFO');
			registerBackUrl(id,json['setRegistrationValueOff'], casper, function(err) {
				if(!err){
					registerFrontUrl(registerTests.existEmail(), casper, function(err) {
						if(!err){
						     casper.echo('registerFrontUrl is working','INFO');	 
						}
					});
				}
			});
		});

		//5.Test case for deafult "No",Required "Visible" 
		casper.then(function() {
			casper.echo('******************** case-05 ************************','INFO');
			casper.echo('Test case for deafult "No",Required "Visible"','INFO');
			casper.echo('********************************************','INFO');
			registerBackUrl(id,json['setVisibleValueOff'], casper, function(err) {
				if(!err){
					registerFrontUrl(registerTests.existEmail(), casper, function(err) {
						if(!err){
						     casper.echo('registerFrontUrl is working','INFO');	 
						}
					});
				}
			});
		});

		//6.Test case for deafult "No",Required "Hidden"
		casper.then(function() {
			casper.echo('******************** case-06 ************************','INFO');
			casper.echo('Test case for deafult "No",Required "Hidden" ','INFO')
			casper.echo('********************************************************','INFO');
			registerBackUrl(id,json['setHiddenValueOff'], casper, function(err) {
				if(!err){
					registerFrontUrl(registerTests.existEmail(), casper, function(err) {
						if(!err){
						      casper.echo('registerFrontUrl is working','INFO');	 
						}
					});
				}
			});
		});

	});
	casper.then(function() {


		return callback(null);	
	});

}





//Method For registrationSettingLabel  
registerSettingTests.registrationSettingLabel = function(id,formModuldId,casper,callback) {

	//1.Test case for Back end deafult "Yes",Required "Registration Page Only"   
	casper.then(function() {
		casper.echo('******************** case-01 ************************','INFO');
		casper.echo('Test case for Back end deafult "Yes",Required "Registration Page Only" ','INFO');
		casper.echo('********************************************','INFO');
		registerBackUrl(id,json['setRegistrationValueOn'],casper, function(err) {
			if(!err){
				formLabelCheck(formModuldId,casper, function(err) {
					if(!err){
					casper.echo('formLabelCheck is working','INFO');	 
					}
				});	
			}
		});

		//2.Test case for Back end  deafult "Yes",Required "Visible"  
		casper.then(function() {
			casper.echo('******************** case-02 ************************','INFO');
			casper.echo('Test case for deafult "Yes",Required "Visible" ','INFO');
			casper.echo('********************************************','INFO');
			registerBackUrl(id,json['setVisibleValueOn'], casper, function(err) {
				if(!err){
					formLabelCheck(formModuldId,casper, function(err) {
						if(!err){
						      casper.echo('formLabelCheck is working','INFO');	 
						}
					});
				}
			});
		});

		//3.Test case for deafult "Yes",Required "Hidden"
		casper.then(function() {
			casper.echo('******************** case-03 ************************','INFO');
			casper.echo('Test case for deafult "Yes",Required "Hidden"','INFO');
			casper.echo('********************************************','INFO');
			registerBackUrl(id,json['setHiddenValueOn'], casper, function(err) {
				if(!err){
					formLabelCheck(formModuldId,casper, function(err) {
						if(!err){
						     casper.echo('formLabelCheck is working','INFO');	 
						}
					});
				}
			});
		});

		//4.Test case for deafult "No", Required "Registration Page Only" 
		casper.then(function() {
			casper.echo('******************** case-04 ************************','INFO');
			casper.echo('Test case for deafult "No", Required "Registration Page Only"','INFO');
			casper.echo('********************************************','INFO');
			registerBackUrl(id,json['setRegistrationValueOff'], casper, function(err) {
				if(!err){
					formLabelCheck(formModuldId,casper, function(err) {
						if(!err){
						      casper.echo('formLabelCheck is working','INFO');	 
						}
					});	
				}
			});
		});

		//5.Test case for deafult "No",Required "Visible" 
		casper.then(function() {
			casper.echo('******************** case-05 ************************','INFO');
			casper.echo('Test case for deafult "No",Required "Visible"','INFO');
			casper.echo('********************************************','INFO');
			registerBackUrl(id,json['setVisibleValueOff'], casper, function(err) {
				if(!err){
					formLabelCheck(formModuldId,casper, function(err) {
						if(!err){
						      casper.echo('formLabelCheck is working','INFO');	 
						}
					});
				}
			});
		});

		//6.Test case for deafult "No",Required "Hidden"
		casper.then(function() {
			casper.echo('******************** case-06 ************************','INFO');
			casper.echo('Test case for deafult "No",Required "Hidden" ','INFO')
			casper.echo('********************************************************','INFO');
			registerBackUrl(id,json['setHiddenValueOff'], casper, function(err) {
				if(!err){
					formLabelCheck(formModuldId,casper, function(err) {
						if(!err){
						     casper.echo('formLabelCheck is working','INFO');	 
						}
					});	
				}
			});
		});

	});
	casper.then(function() {
		return callback(null);	
	});

}


//Method For call registration method  
var registerFrontUrl= function(functioncall,driver,callback) {

	driver.then(function() {
		functioncall;
		return callback(null);	
	});
};


//Method For Filling Data In Default Registration Options
var registerBackUrl= function(id,jsonData, casper, callback) {

	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('Title of the page :' +this.getTitle(), 'INFO');
		try {
			casper.test.assertExists('div#account_sub_menu a:nth-of-type(2)');
			casper.click('div#account_sub_menu a:nth-of-type(2)');
			try {
				casper.test.assertExists('div#ddAccount a:nth-of-type(5)');
				casper.click('div#ddAccount a:nth-of-type(5)');
			}catch(e) {
			        casper.test.assertDoesntExist('div#ddAccount a:nth-of-type(5)');
		}
		}catch(e) {
		       casper.test.assertDoesntExist('div#account_sub_menu a:nth-of-type(2)');
		}
	});
	 
	registerMethod.loginToForumBackEnd(casper, casper.test, function() {
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
								wait.waitForTime(5000, casper, function(err, isExist) {
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
																	//start from forum url
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
	});	
};


//Method For label check in Front registration form  method call 
var formLabelCheck= function(formModuldId,driver,callback) {
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






