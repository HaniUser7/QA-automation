'use strict';
var registerTests = require('./register.js');
var json = require('../../testdata/registerSettingData.json');
var jsons = require('../../testdata/registerData.json');
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
	//01.Test case for Back end deafult "Yes",Required "Registration Page Only"  
	casper.then(function() {
		casper.echo('******************** case-01 ************************','INFO');
		casper.echo('Test case for Back end deafult "Yes",Required "Registration Page Only" ','INFO');
		casper.echo('********************************************','INFO');
		registerSettingMethod.registerBackUrl('form[name="posts"] select[name="required_name"]',json['setRegistrationValueOn'],casper, function(err) {
			if(!err){
				registerSettingMethod.registerFrontUrl(registerTests.blankUsername(), casper, function(err) {
					if(!err){
					    casper.echo('registerSettingMethod of registerFrontUrl is working','INFO');	 
					}
				});	
			}
		});
		//02.Test case for Back end  deafult "Yes",Required "Visible"  
		casper.then(function() {
			casper.echo('******************** case-02 ************************','INFO');
			casper.echo('Test case for deafult "Yes",Required "Visible" ','INFO');
			casper.echo('********************************************','INFO');
			registerSettingMethod.registerBackUrl('form[name="posts"] select[name="required_name"]',json['setVisibleValueOn'], casper, function(err) {
				if(!err){
					registerSettingMethod.registerFrontUrl(registerTests.blankUsername(), casper, function(err) {
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
	//01.Test case for Back end deafult "Yes",Required "Registration Page Only"
	casper.then(function() {
		casper.echo('********************************************','INFO');
		casper.echo('BACKEND BIRTHDAY BLANK DATA ************************','INFO');
		casper.echo('Test case for Back end deafult "Yes",Required "Registration Page Only"','INFO');
		casper.echo('********************************************','INFO');
		registerSettingMethod.registerBackUrl('form[name="posts"] select[name="required_dob"]',json['setRegistrationValueOn'],casper, function(err) {
			if(!err){
				registerSettingMethod.registerFrontUrl(registerTests.blankBirthday(), casper, function(err) {
					if(!err){
					    casper.echo('registerFrontUrl is working','INFO');	 
					}
				});	
			}
		});
		//02.Test case for deafult "Yes",Required "Visible" 
		casper.then(function() {
			casper.echo('******************** case-02 ************************','INFO');
			casper.echo('Test case for deafult "Yes",Required "Visible" ','INFO');
			casper.echo('********************************************','INFO');
			registerSettingMethod.registerBackUrl('form[name="posts"] select[name="required_dob"]',json['setVisibleValueOn'], casper, function(err) {
				if(!err){
					registerSettingMethod.registerFrontUrl(registerTests.blankBirthday(), casper, function(err) {
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

	//01.Test case for Back end deafult "Yes",Required "Registration Page Only"
	casper.then(function() {
		casper.echo('********************************************','INFO');
	    casper.echo('BACKEND SIGNATURE BLANK DATA************************','INFO');
		casper.echo('Test case for Back end deafult "Yes",Required "Registration Page Only"','INFO');
		casper.echo('********************************************','INFO');
		registerSettingMethod.registerBackUrl('form[name="posts"] select[name="required_signature"]',json['setRegistrationValueOn'],casper, function(err) {
			if(!err){
				registerSettingMethod.registerFrontUrl(registerTests.blankSignature(), casper, function(err) {
					if(!err){
					    casper.echo('registerFrontUrl is working','INFO');	 
					}
				});	
			}
		});
		//02.Test case for deafult "Yes",Required "Visible" 
		casper.then(function() {
			casper.echo('******************** case-02 ************************','INFO');
			casper.echo('Test case for deafult "Yes",Required "Visible"','INFO');
			casper.echo('********************************************','INFO');
			registerSettingMethod.registerBackUrl('form[name="posts"] select[name="required_signature"]',json['setVisibleValueOn'], casper, function(err) {
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
	 
	//01.Test case for Back end deafult "Yes",Required "Registration Page Only" 
	casper.then(function() {
		casper.echo('********************************************','INFO');
	    casper.echo('BACKEND INSTANTMESSAGE BLANK DATA************************','INFO');
		casper.echo('Test case for Back end deafult "Yes",Required "Registration Page Only" ','INFO');
		casper.echo('********************************************','INFO');
		registerSettingMethod.registerBackUrl('form[name="posts"] select[name="required_imType"]',json['setRegistrationValueOn'],casper, function(err) {
			if(!err){
				registerSettingMethod.registerFrontUrl(registerTests.blankImId(), casper, function(err) {
					if(!err){
					    casper.echo('registerFrontUrl is working','INFO');	 
					}
				});	
			}
		});
		//02.Test case for deafult "Yes",Required "Visible"
		casper.then(function() {
			casper.echo('******************** case-02 ************************','INFO');
			casper.echo('Test case for deafult "Yes",Required "Visible" ','INFO');
			casper.echo('********************************************','INFO');
			registerSettingMethod.registerBackUrl('form[name="posts"] select[name="required_imType"]',json['setVisibleValueOn'], casper, function(err) {
				if(!err){
					registerSettingMethod.registerFrontUrl(registerTests.blankImId(), casper, function(err) {
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


//9.Test case for New Registration With Start New Topic Page Login
registerSettingTests.registrationStartNewTopic = function() {
	casper.thenOpen(config.url, function() {
		casper.echo('********************************************','INFO');
		casper.echo('Test case for New Registration With Start New Topic Page Login" ','INFO');
		casper.echo('********************************************','INFO');
		casper.echo('Title of the page :' +this.getTitle(), 'INFO');
		wait.waitForElement('div#topics a', casper, function(err, isExist) {
			if(!err){
				if(isExist) {
					casper.test.assertExists('div#topics a:nth-child(3)');
					casper.click('div#topics a:nth-child(3)');
					wait.waitForElement('a#guest_user_create_account', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.test.assertExists('a#guest_user_create_account');
								casper.click('a#guest_user_create_account');
								registerSettingTests.validInfo();
							} else {
							casper.echo('Create an account link not found', 'ERROR');
							}
						}
					});
				} else {
				casper.echo('User didn\'t not found any register link', 'ERROR');
				}
			}
		});
	});


}


//10.Test case for New Registration With Login page 
registerSettingTests.registrationNewTopic = function() {
	casper.thenOpen(config.url, function() {
		casper.echo('Title of the page :' +this.getTitle(), 'INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExist) {
			if(!err){
				if(isExist) {
					casper.test.assertExists('a#td_tab_login');
					casper.click('a#td_tab_login');
					wait.waitForElement('div.pull-right.login-btn a', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.test.assertExists('div.pull-right.login-btn a');
								casper.click('div.pull-right.login-btn a');
								registerTests.validInfo();
							} else {
							casper.echo('User didn\'t not found any Login link', 'ERROR');
							}
						}
					});
					
				} else {
				casper.echo('User didn\'t not found any Login link', 'ERROR');
				}
			}
		});
	});
}


//11.Test case for Incontext login with New Registration 
registerSettingTests.registrationIncontextlogin = function() {
	casper.then(function(){ 
		registerSettingMethod.backEndSetting(casper,casper.test,function(err){
			if(!err){
				casper.thenOpen(config.url, function() {
					//1.Test case for Incontext login with New Registration (while Like this post from Topic page)
							casper.echo('***********************case-01 *********************','INFO');
							casper.echo('Incontext login with New Registration (while Like this post from Topic page)" ','INFO');
							casper.echo('********************************************','INFO');
							casper.echo('Title of the page :' +this.getTitle(), 'INFO');
							//Clicking On 'topic ' Tab Under Topics module 
							wait.waitForElement('a[aria-controls="topics"]', casper, function(err, isExist) {
								if(err) {
									if(isExist) {
										casper.test.assertExists('a[aria-controls="topics"]');
										casper.click('a[aria-controls="topics"]');
										casper.test.assertExists('.read.pinned.col-xs-12:nth-child(1) span:nth-child(1) span:nth-child(2) a');
										//Clicking On 'Topics module ' Tab Under Topics 
										wait.waitForElement('.read.pinned.col-xs-12:nth-child(1) span:nth-child(1) span:nth-child(2) a', casper, function(err, isExist) {
											if(!err){
												if(isExist) {
													casper.test.assertExists('li.read.pinned.col-xs-12:nth-child(1) span:nth-child(1) span:nth-child(2) a');
													casper.click('li.read.pinned.col-xs-12:nth-child(1) span:nth-child(1) span:nth-child(2) a');
													//Clicking On 'like ' Tab Under Topics module 
													wait.waitForElement('div#ajax_subscription_vars div div:nth-child(5) a:nth-child(2)', casper, function(err, isExist) {
														if(err) {
															if(isExist) {
																casper.test.assertExists('div#ajax_subscription_vars div div:nth-child(5) a:nth-child(2)');
																casper.click('div#ajax_subscription_vars div div:nth-child(5) a:nth-child(2)');
                                                            
																 
															} else {
															casper.echo('Like button not found', 'ERROR');
															}
														}
													});		
												} else {
												casper.echo('Topics are not display', 'ERROR');
												}
											}
										});
									} else {
									casper.echo('topic link not found', 'ERROR');
									}
								}
							});	
							
							casper.then(function(){ 
								registerSettingTests.validInfo();
							});			
				
					//2.Test case for Incontext login with New Registration ( while Dislike this post from Topic page)
					casper.then(function(){
						casper.echo('***********************case-2 *********************','INFO');
						casper.echo('Incontext login with New Registration (while Dislike this post from Topic page)" ','INFO');
						casper.echo('********************************************','INFO');
						casper.echo('Title of the page :' +this.getTitle(), 'INFO');
						//Clicking On 'Topics module ' Tab Under Topics 
						wait.waitForElement('a[aria-controls="topics"]', casper, function(err, isExist) {
							if(err) {
								if(isExist) {
									casper.test.assertExists('a[aria-controls="topics"]');
									casper.click('a[aria-controls="topics"]');
									//Clicking On 'Topics module ' Tab Under Topics 
									wait.waitForElement('li.read.pinned.col-xs-12:nth-child(1) span:nth-child(1) span:nth-child(2) a', casper, function(err, isExist) {
										if(!err){
											if(isExist) {
												casper.test.assertExists('li.read.pinned.col-xs-12:nth-child(1) span:nth-child(1) span:nth-child(2) a');
												casper.click('li.read.pinned.col-xs-12:nth-child(1) span:nth-child(1) span:nth-child(2) a');
												//Clicking On 'like ' Tab Under Topics module 
												wait.waitForElement('div#ajax_subscription_vars div div:nth-child(5) a:nth-child(4)', casper, function(err, isExist) {
													if(err) {
														if(isExist) {
															casper.test.assertExists('div#ajax_subscription_vars div div:nth-child(5) a:nth-child(4)');
															casper.click('div#ajax_subscription_vars div div:nth-child(5) a:nth-child(4)');

														} else {
														casper.echo('Dislike button not found', 'ERROR');
														}
													}
												});		
											} else {
											casper.echo('Topics are not display', 'ERROR');
											}
										}
									});
								} else {
								casper.echo('topic link not found', 'ERROR');
								}
							}
						});	
						casper.then(function(){ 
							registerSettingTests.validInfo();
						})
					});
					
					//3.Test case for Incontext login with New Registration ( while Like this Topic from list of topics)
					casper.then(function() {
						casper.echo('***********************case-13 *********************','INFO');
						casper.echo('Incontext login with New Registration (while Like this Topic from list of topics)" ','INFO');
						casper.echo('********************************************','INFO');
						casper.echo('Title of the page :' +this.getTitle(), 'INFO');
					    //Clicking On 'Topics module ' Tab Under Topics 
						wait.waitForElement('a[aria-controls="topics"]', casper, function(err, isExist) {
							if(err) {
								if(isExist) {
									casper.test.assertExists('a[aria-controls="topics"]');
									casper.click('a[aria-controls="topics"]');
									//Clicking On 'Topics module ' Tab Under Topics 
									wait.waitForElement('li.read.pinned.col-xs-12:nth-child(1) span:nth-child(2) span a:nth-child(2)', casper, function(err, isExist) {
										if(!err){
											if(isExist) {
												casper.test.assertExists('li.read.pinned.col-xs-12:nth-child(1) span:nth-child(2) span a:nth-child(2)');
												casper.click('li.read.pinned.col-xs-12:nth-child(1) span:nth-child(2) span a:nth-child(2)');
													
											} else {
											casper.echo('Topics are not display', 'ERROR');
											}
										}
									});
								} else {
								casper.echo('topic link not found', 'ERROR');
								}
							}
						});	
						casper.then(function(){ 
							registerSettingTests.validInfo();
						});
					});
					
					//4.Test case for Incontext login with New Registration ( from Quote on post from post list)
					casper.then(function() {
						casper.echo('***********************case-14 *********************','INFO');
						casper.echo('Incontext login with New Registration ( from Quote on post from post list)" ','INFO');
						casper.echo('********************************************','INFO');
						casper.echo('Title of the page :' +this.getTitle(), 'INFO');
						wait.waitForElement('a#topic_8897193', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.test.assertExists('a#topic_8897193');
									casper.click('a#topic_8897193');
									//Clicking On 'Quote' Tab Under Topics module 
									wait.waitForElement('a#reply_with_quote_1294164878', casper, function(err, isExist) {
										if(err) {
											if(isExist) {
												casper.test.assertExists('a#reply_with_quote_1294164878');
												casper.click('a#reply_with_quote_1294164878');
												wait.waitForElement('a#guest_user', casper, function(err, isExist) {
													if(err) {
														if(isExist) {
															casper.test.assertExists('a#guest_user');
															 casper.click('a#guest_user');
															
														} else {
														casper.echo('Create an account form not found', 'ERROR');
														}
													}
												});
											} else {
											casper.echo('Create an account form not found', 'ERROR');
											}
										}
									});
									
								} else {
								casper.echo('User didn\'t not found any Login link', 'ERROR');
								}
							}
						});
						casper.then(function(){ 
							registerSettingTests.validInfo();
						})
					});
					
					//5.Test case for Incontext login with New Registration ( from vote on post from post list)
					casper.then(function() {
						casper.echo('***********************case-15 *********************','INFO');
						casper.echo('Incontext login with New Registration ( from Quote on post from post list)" ','INFO');
						casper.echo('********************************************','INFO');
						casper.echo('Title of the page :' +this.getTitle(), 'INFO');
						wait.waitForElement('a#topic_8897360', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.test.assertExists('a#topic_8897360');
									casper.click('a#topic_8897360');
									//Clicking On 'Dislike ' Tab Under Topics module 
									wait.waitForElement('a#guest_user_vote', casper, function(err, isExist) {
										if(err) {
											if(isExist) {
												casper.test.assertExists('a#guest_user_vote');
												casper.click('a#guest_user_vote');
												
											} else {
											casper.echo('Create an account form not found', 'ERROR');
											}
										}
									});
									
								} else {
								casper.echo('User didn\'t not found any Login link', 'ERROR');
								}
							}
						});
						casper.then(function(){ 
							registerSettingTests.validInfo();
						})
					});
					
					//6.Test case for Incontext login with New Registration (from message Mouse Mover Button)
					casper.then(config.url, function() {
						casper.echo('***********************case-16 *********************','INFO');
						casper.echo('Incontext login with New Registration ( from message Mouse Mover Button)" ','INFO');
						casper.echo('********************************************','INFO');
						casper.echo('Title of the page :' +this.getTitle(), 'INFO');
						casper.evaluate(function() {
								document.querySelector("div.popover.hovercard.fade.top.in").style.display = 'block';
						});
						wait.waitForElement('a#guest_user_message', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
								 casper.test.assertExists('a#guest_user_message');
								 casper.click('a#guest_user_message');
									
								} else {
								casper.echo('User didn\'t not found any Login link', 'ERROR');
								}
							}
						});		
					});
					
					
					//7.Test case for inContext New Registration from any of the above pages described but
					//when any of the registeration field is marked as required.say you are doing a 
					//incontext registeration on quote reply  & dob field is required
					casper.then(function() {
						registerSettingTests.inContextRegistrationEnable();
						casper.then(function() {
							casper.echo('***********************case-7 *********************','INFO');
							casper.echo('inContext New Registration from any of the above pages described " ','INFO');
							casper.echo('but when any of the registeration field is marked as required" ','INFO');
							casper.echo('say you are doing a incontext registeration on quote reply  & dob field is required" ','INFO');
							casper.echo('********************************************','INFO');
							casper.echo('Title of the page :' +this.getTitle(), 'INFO');
							casper.then(function() {
								wait.waitForElement('a#topic_8335430', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('a#topic_8335430');
											casper.click('a#topic_8335430');
											//Clicking On 'Quote ' Tab Under Topics module 
											wait.waitForElement('a#reply_with_quote_1294164878', casper, function(err, isExist) {
												if(err) {
													if(isExist) {
														casper.test.assertExists('a#reply_with_quote_1294164878');
														casper.click('a#reply_with_quote_1294164878');
														
													} else {
													casper.echo('Create an account form not found', 'ERROR');
													}
												}
											});
											
										} else {
										casper.echo('User didn\'t not found any Login link', 'ERROR');
										}
									}
								});
								casper.then(function(){ 
									registerSettingTests.blankEmail(); 
									casper.thenOpen(config.url, function() {
										casper.echo('Title of the page :' +this.getTitle(), 'INFO');
										wait.waitForElement('.pull-right a[href="/register/register"]', casper, function(err, isExist) {
											if(!err){
												if(isExist) {
													casper.test.assertExists('.pull-right a[href="/register/register"]');
													casper.click('.pull-right a[href="/register/register"]');
													casper.echo('Successfully open register form.....', 'INFO');
													 casper.then(function(){ 
														registerTests.validInfo();
													});
												} else {
													casper.echo('User didn\'t not found any register link', 'ERROR');
												}
											}
										});
									});
								});
								
							});
						});
					});		
				});	
			}
		});
	});
}



//12.Test case for Registration with different username format
registerSettingTests.differentUsernameFormat= function() {
    casper.then(function() {
	
	      //1.Select "Uppercase letters from A-Z including spaces" format from the backend Settings page
		  casper.thenOpen(config.backEndUrl, function() {
			casper.echo('***********************case-01 *********************','INFO');
			casper.echo('Select "Uppercase letters from A-Z" format from backend setting page" ','INFO');
			casper.echo('********************************************','INFO');
			registerSettingMethod.differentUsernameFormat('Uppercase letters from A-Z only',json['uppercaseInvaild'],'Your username must contain uppercase letters from A-Z',casper,function(err){
				if(!err){
					registerSettingMethod.registration(json['uppercaseVaild'],casper,function(err){
						if(!err){
						  casper.echo('registration working','INFO');
						}
					});	
				}
			});
			
			//2.Select "Uppercase letters from A-Z including spaces" format from the backend Settings page
		   casper.thenOpen(config.backEndUrl, function() {
				casper.echo('***********************case-02 *********************','INFO');
				casper.echo('Select "Lowercase letters from a-z including spaces" format from the backend Settings page" ','INFO');
				casper.echo('********************************************','INFO');
				registerSettingMethod.differentUsernameFormat('Uppercase letters from A-Z including spaces',json['uppercaseSpaceInvaild'],'Your username must contain uppercase letters from A-Z including spaces',casper,function(err){
					if(!err){
						registerSettingMethod.registration(json['uppercaseSpaceVaild'],casper,function(err){
							if(!err){
							  casper.echo('registration working','INFO');
							}
						});	
					}
				});
			});
			
			//3.Select "Lowercase letters from a-z including spaces" format from the backend Settings page
			casper.thenOpen(config.backEndUrl, function() {
				casper.echo('***********************case-03 *********************','INFO');
				casper.echo('Select "Lowercase letters from a-z including spaces" format from the backend Settings page" ','INFO');
				casper.echo('********************************************','INFO');
				registerSettingMethod.differentUsernameFormat('Lowercase letters from a-z including spaces',json['lowercaseSpaceInvaild'],'Your usename must contain "Lowercase letters from a-z including spaces',casper,function(err){
					if(!err){
						registerSettingMethod.registration(json['lowercaseSpaceVaild'],casper,function(err){
							if(!err){
							  casper.echo('registration working','INFO');
							}
						});	
					}
				});
			});
			
			//4.Select "Lowercase letters from a-z" format
			casper.thenOpen(config.backEndUrl, function() {
				casper.echo('***********************case-04 *********************','INFO');
				casper.echo('Select "Lowercase letters from a-z" format" ','INFO');
				casper.echo('********************************************','INFO');
				registerSettingMethod.differentUsernameFormat('Lowercase letters from a-z only',json['lowercase-a-zInvaild'],'Your usename must contain Lowercase letters from a-z',casper,function(err){
					if(!err){
						registerSettingMethod.registration(json['lowercase-a-zVaild'],casper,function(err){
							if(!err){
							  casper.echo('registration working','INFO');
							}
						});	
					}
				});
			});
			
			//5.Registration with "lowercase and uppercase letters" format
			casper.thenOpen(config.backEndUrl, function() {
				casper.echo('***********************case-05 *********************','INFO');
				casper.echo('Registration with "lowercase and uppercase letters" format" ','INFO');
				casper.echo('********************************************','INFO');
				registerSettingMethod.differentUsernameFormat('Lower and upper case letters',json['lowercaseUpperInvaild'],' Your usename must contain lowercase and uppercase letters',casper,function(err){
					if(!err){
						registerSettingMethod.registration(json['lowercaseUpperVaild'],casper,function(err){
							if(!err){
							  casper.echo('registration working','INFO');
							}
						});	
					}
				});
			});
			
			//6.Registration with "Alphanumeric characters only" format
			casper.thenOpen(config.backEndUrl, function() {
				casper.echo('***********************case-06 *********************','INFO');
				casper.echo('Registration with "Alphanumeric characters only" format" ','INFO');
				casper.echo('********************************************','INFO');
				registerSettingMethod.differentUsernameFormat('Alphanumeric characters only',json['alphanumericInvaild'],'Your usename must contain Alphanumeric characters',casper,function(err){
					if(!err){
						registerSettingMethod.registration(json['alphanumericVaild'],casper,function(err){
							if(!err){
							  casper.echo('registration working','INFO');
							}
						});	
					}
				});
			});
			
			//7.Lower case and upper case letters  including spaces 
			casper.thenOpen(config.backEndUrl, function() {
				casper.echo('***********************case-07 *********************','INFO');
				casper.echo('Lower case and upper case letters  including spaces " ','INFO');
				casper.echo('********************************************','INFO');
				registerSettingMethod.differentUsernameFormat('Lower and upper case letters including spaces',json['lowercaseUpperSpaceInvaild'],'Your usename must contain Lower case and upper case letters including spaces',casper,function(err){
					if(!err){
						registerSettingMethod.registration(json['lowercaseUpperSpaceVaild'],casper,function(err){
							if(!err){
							  casper.echo('registration working','INFO');
							}
						});	
					}
				});
			});
			
			//8.Lower case and upper case letters including underscore 
			casper.thenOpen(config.backEndUrl, function() {
				casper.echo('***********************case-08 *********************','INFO');
				casper.echo('Lower case and upper case letters including underscore " ','INFO');
				casper.echo('********************************************','INFO');
				registerSettingMethod.differentUsernameFormat('Lower and upper case letters including underscores',json['lowercaseUpperUnderscoreInvaild'],' Your usename must contain  Lower case and upper case letters including underscore',casper,function(err){
					if(!err){
						registerSettingMethod.registration(json['lowercaseUpperUnderscoreVaild'],casper,function(err){
							if(!err){
							  casper.echo('registration working','INFO');
							}
						});	
					}
				});
			});
			
			//9.Alphanumeric charecter inculdind space
			casper.thenOpen(config.backEndUrl, function() {
				casper.echo('***********************case-09 *********************','INFO');
				casper.echo('Alphanumeric charecter inculdind space" ','INFO');
				casper.echo('********************************************','INFO');
				registerSettingMethod.differentUsernameFormat('Alphanumeric characters including spaces',json['alphanumericSpaceInvaild'],casper,function(err){
					if(!err){
						registerSettingMethod.registration(json['alphanumericSpaceVaild'],casper,function(err){
							if(!err){
							  casper.echo('registration working','INFO');
							}
						});	
					}
				});
			});	
		 
		});
	});	
}







/*********************************Common Method calling ***********************************************/


//Method For DefaultRegistrationSetting  
registerSettingTests.defaultRegistrationSetting = function(id,casper,callback) {

	//03.Test case for deafult "Yes",Required "Hidden"
	casper.then(function() {
		casper.echo('******************** case-03 ************************','INFO');
		casper.echo('Test case for deafult "Yes",Required "Hidden"','INFO');
		casper.echo('********************************************','INFO');
		registerSettingMethod.registerBackUrl(id,json['setHiddenValueOn'], casper, function(err) {
			if(!err){
				registerSettingMethod.registerFrontUrl(registerTests.existEmail(), casper, function(err) {
					if(!err){
					     casper.echo('registerFrontUrl is working','INFO');	 
					}
				});
			}
		});

		//04.Test case for deafult "No", Required "Registration Page Only" 
		casper.then(function() {
			casper.echo('******************** case-04 ************************','INFO');
			casper.echo('Test case for deafult "No", Required "Registration Page Only"','INFO');
			casper.echo('********************************************','INFO');
			registerSettingMethod.registerBackUrl(id,json['setRegistrationValueOff'], casper, function(err) {
				if(!err){
					registerSettingMethod.registerFrontUrl(registerTests.existEmail(), casper, function(err) {
						if(!err){
						     casper.echo('registerSettingMethod.registerFrontUrl is working','INFO');	 
						}
					});
				}
			});
		});

		//05.Test case for deafult "No",Required "Visible" 
		casper.then(function() {
			casper.echo('******************** case-05 ************************','INFO');
			casper.echo('Test case for deafult "No",Required "Visible"','INFO');
			casper.echo('********************************************','INFO');
			registerSettingMethod.registerBackUrl(id,json['setVisibleValueOff'], casper, function(err) {
				if(!err){
					registerSettingMethod.registerFrontUrl(registerTests.existEmail(), casper, function(err) {
						if(!err){
						     casper.echo('registerSettingMethod.registerFrontUrl is working','INFO');	 
						}
					});
				}
			});
		});

		//06.Test case for deafult "No",Required "Hidden"
		casper.then(function() {
			casper.echo('******************** case-06 ************************','INFO');
			casper.echo('Test case for deafult "No",Required "Hidden" ','INFO')
			casper.echo('********************************************************','INFO');
			registerSettingMethod.registerBackUrl(id,json['setHiddenValueOff'], casper, function(err) {
				if(!err){
					registerSettingMethod.registerFrontUrl(registerTests.existEmail(), casper, function(err) {
						if(!err){
						      casper.echo('registerSettingMethod.registerFrontUrl is working','INFO');	 
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

	//01.Test case for Back end deafult "Yes",Required "Registration Page Only"   
	casper.then(function() {
		casper.echo('******************** case-01 ************************','INFO');
		casper.echo('Test case for Back end deafult "Yes",Required "Registration Page Only" ','INFO');
		casper.echo('********************************************','INFO');
		registerSettingMethod.registerBackUrl(id,json['setRegistrationValueOn'],casper, function(err) {
			if(!err){
				formLabelCheck(formModuldId,casper, function(err) {
					if(!err){
					casper.echo('formLabelCheck is working','INFO');	 
					}
				});	
			}
		});

		//02.Test case for Back end  deafult "Yes",Required "Visible"  
		casper.then(function() {
			casper.echo('******************** case-02 ************************','INFO');
			casper.echo('Test case for deafult "Yes",Required "Visible" ','INFO');
			casper.echo('********************************************','INFO');
			registerSettingMethod.registerBackUrl(id,json['setVisibleValueOn'], casper, function(err) {
				if(!err){
					formLabelCheck(formModuldId,casper, function(err) {
						if(!err){
						      casper.echo('formLabelCheck is working','INFO');	 
						}
					});
				}
			});
		});

		//03.Test case for deafult "Yes",Required "Hidden"
		casper.then(function() {
			casper.echo('******************** case-03 ************************','INFO');
			casper.echo('Test case for deafult "Yes",Required "Hidden"','INFO');
			casper.echo('********************************************','INFO');
			registerSettingMethod.registerBackUrl(id,json['setHiddenValueOn'], casper, function(err) {
				if(!err){
					formLabelCheck(formModuldId,casper, function(err) {
						if(!err){
						     casper.echo('formLabelCheck is working','INFO');	 
						}
					});
				}
			});
		});

		//04.Test case for deafult "No", Required "Registration Page Only" 
		casper.then(function() {
			casper.echo('******************** case-04 ************************','INFO');
			casper.echo('Test case for deafult "No", Required "Registration Page Only"','INFO');
			casper.echo('********************************************','INFO');
			registerSettingMethod.registerBackUrl(id,json['setRegistrationValueOff'], casper, function(err) {
				if(!err){
					formLabelCheck(formModuldId,casper, function(err) {
						if(!err){
						      casper.echo('formLabelCheck is working','INFO');	 
						}
					});	
				}
			});
		});

		//05.Test case for deafult "No",Required "Visible" 
		casper.then(function() {
			casper.echo('******************** case-05 ************************','INFO');
			casper.echo('Test case for deafult "No",Required "Visible"','INFO');
			casper.echo('********************************************','INFO');
			registerSettingMethod.registerBackUrl(id,json['setVisibleValueOff'], casper, function(err) {
				if(!err){
					formLabelCheck(formModuldId,casper, function(err) {
						if(!err){
						      casper.echo('formLabelCheck is working','INFO');	 
						}
					});
				}
			});
		});

		//06.Test case for deafult "No",Required "Hidden"
		casper.then(function() {
			casper.echo('******************** case-06 ************************','INFO');
			casper.echo('Test case for deafult "No",Required "Hidden" ','INFO')
			casper.echo('********************************************************','INFO');
			registerSettingMethod.registerBackUrl(id,json['setHiddenValueOff'], casper, function(err) {
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


//Method for Incontext login with New Registration(Incontext Registration from)
registerSettingTests.validInfo= function() {
	casper.then(function() {
	    casper.echo('*************************************************', 'INFO');
		casper.echo('test case for registerSetting to application by valid data and verify error message', 'INFO');
		casper.echo('********************************************', 'INFO');
		registerSettingMethod.registerToApp(json['validInfo'], casper, function(err) {
			if(!err) {
				casper.echo('Processing to registration on forum.....', 'INFO');
				registerMethod.redirectToLogout(casper, casper.test, function(err) {
					if(!err) {
						casper.echo('User logout successfully', 'INFO');
					}
				});
			}
		});
	});
}


//test case for register to application by leaving blank email and verify error message
registerSettingTests.blankEmail = function() {
	casper.then(function() {
		casper.echo('*************************************************', 'INFO');
		casper.echo('test case for registerSetting to application by leaving blank email and verify error message', 'INFO');
		casper.echo('********************************************', 'INFO');
		registerSettingMethod.registerToApp(jsons['blankEmail'], casper, function(err){
			if(!err) {
				casper.echo('register by leaving blank email and verify error message', 'INFO');
				wait.waitForElement('form[name="PostTopics"] input[name="email"]', casper, function(err, isExist){ 
				 if(!err){
						 if(isExist) {
							var errorMessage = casper.getElementAttribute('form[name="PostTopics"] input[name="email"]', 'data-original-title');
							errorMessage = errorMessage.trim();
							if(errorMessage && errorMessage!= '')
								registerMethod.verifyErrorMsg(errorMessage, 'Please enter your email address.', 'blankEmail', casper, function(err) {
									if(!err) {
										casper.echo('Verified error message successfully', 'INFO');
									}
								});	
						} else {
								casper.echo('postTopic form  Not Found', 'ERROR');
					   }
					}
				});
			}				
		});
	});
}







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


//Method For inContextRegistrationEnable 
registerSettingTests.inContextRegistrationEnable = function() {
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
	//Login To Forum BackEnd
	casper.then(function() {
		registerMethod.loginToForumBackEnd(casper, casper.test, function(err) {
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
											'required_name' : 1,
											'required_imType' : 1,
											'required_dob' : 1,
											'required_signature' : 1
										}, true);
										casper.click('form[name="posts"] button');
										wait.waitForElement('font[color="red"]', casper, function(err, isExist) {
											if(!err){
												if(isExist) {
													var successMsg = casper.fetchText('font[color="red"]');
													casper.echo('success message : '+successMsg, 'INFO');
													casper.echo('success message is verified', 'INFO');
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
		casper.thenOpen(config.url, function() {
			casper.echo('Title of the page :' +this.getTitle(), 'INFO');
			
		});
	});
};



	
	
						


























