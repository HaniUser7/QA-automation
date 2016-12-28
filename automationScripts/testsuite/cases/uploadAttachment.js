'use strict';
var wait = require('../wait.js');
var forumLoginMethod = require('../methods/login.js');
var uploadAttachmentMethod = require('../methods/uploadAttachment.js');
var json = require('../../testdata/loginData.json');
var jsons = require('../../testdata/fbData.json');
var registerTests = require('./register.js');
var uploadAttachmentTest=module.exports = {};
var screenShotsDir = config.screenShotsLocation + 'uploadAttachment/';
var errorMessage = "";


//test case for uploadAttachmentBackendSetting
uploadAttachmentTest.backEndSetting= function() {
	casper.then(function() {
	casper.echo('*************************************************', 'INFO');
	casper.echo('test case for registerBackendSetting ', 'INFO');
	casper.echo('********************************************', 'INFO'); upload
		uploadAttachmentMethod.backEndSetting(casper, function(err) {
			if(!err){
			    casper.echo('registerSettingMethod of backEndSetting run sucessful')
			}
		});

	});

}


//1.test case for verify with upload avatar from registration page(verify it from )
uploadAttachmentTest.avatarFromRegistration= function() {
	casper.then(function(){
		casper.thenOpen(config.url, function() {
			casper.echo('******************** case-1 ************************', 'INFO');
			casper.echo('verify with upload avatar from registration page', 'INFO');
			casper.echo('********************************************', 'INFO');
			casper.echo('Title of the page :' +this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a[href="/register/register"]', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a[href="/register/register"]');
						casper.click('.pull-right a[href="/register/register"]');
						casper.echo('Successfully open register form.....', 'INFO');
						
						wait.waitForElement('form[name="PostTopic"]', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
								  
								   casper.test.assertExists('input[type="file"]');
						           casper.click('input[type="file"]');
                                  	casper.thenOpen('http://s3.amazonaws.com/files.websitetoolbox.com/200676/3156405' , function(){
										wait.waitForTime(1000 , casper , function(err) {
										
										});
									});								   
								} else {
									casper.echo('User didn\'t not found any Member Registration form link', 'ERROR');
								}
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

//2.test case for verify with upload avatar when you change the avatar after upload on registration page
uploadAttachmentTest.uploadAvatarRegistrationChange= function() {
	casper.then(function(){
		casper.thenOpen(config.url, function() {
			casper.echo('******************** case-2 ************************', 'INFO');
			casper.echo('verify with upload avatar when you change the avatar after upload on registration page', 'INFO');
			casper.echo('********************************************', 'INFO');
			casper.echo('Title of the page :' +this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a[href="/register/register"]', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a[href="/register/register"]');
						casper.click('.pull-right a[href="/register/register"]');
						casper.echo('Successfully open register form.....', 'INFO');
					
						wait.waitForElement('form[name="PostTopic"]', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
								  
									 casper.test.assertExists('input[type="file"]');
						             casper.click('input[type="file"]');
                                  	 casper.thenOpen('http://s3.amazonaws.com/files.websitetoolbox.com/200676/3156405' , function(){
										wait.waitForTime(1000 , casper , function(err) {
											
										});
									});	
                                     casper.test.assertExists('input[type="file"]');
						             casper.click('input[type="file"]');
                                    	casper.thenOpen('http://s3.amazonaws.com/files.websitetoolbox.com/200676/3156405' , function(){
										wait.waitForTime(1000 , casper , function(err) {
										
										});
									});										
								} else {
									casper.echo('User didn\'t not found any Member Registration form link', 'ERROR');
								}
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

//3.test case for verify with upload avatar when you change the avatar after upload on  edit profile page
uploadAttachmentTest.uploadAvatarEditProfileChange= function() {
	casper.then(function(){
		casper.thenOpen(config.url, function() {
			casper.echo('******************** case-3 ************************', 'INFO');
			casper.echo('verify with upload avatar when you change the avatar after upload on  edit profile page', 'INFO');
			casper.echo('********************************************', 'INFO');
			casper.echo('Title of the page :' +this.getTitle(), 'INFO');
			wait.waitForElement('#td_tab_login', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('#td_tab_login');
						casper.click('#td_tab_login');
						forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
							if(!err) {
								casper.echo('login by valid username and password and verify error message', 'INFO');
								wait.waitForTime(1000 , casper , function(err) {
									wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
										if(!err){
											if(isExist) {
												casper.test.assertExists('ul.nav.pull-right span.caret');
												casper.click('ul.nav.pull-right span.caret');
												casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
												casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
												wait.waitForElement('form[name="PostTopic"]', casper, function(err, isExist) {
													if(!err){
														if(isExist) {
															
															casper.test.assertExists('input[type="file"]');
															casper.click('input[type="file"]');
															//casper.thenOpen('http://s3.amazonaws.com/files.websitetoolbox.com/200676/3156405' , function(){
																//wait.waitForTime(1000 , casper , function(err) {
														
																//});
															//});	
															
															wait.waitForElement('a.default-user', casper , function(err, isExists) {
																if(isExists) {
																	casper.test.assertDoesntExist('#td_tab_login');
																	casper.echo('User has been successfuly login to application', 'INFO');
																	forumLoginMethod.logoutFromApp(casper, function(err){
																		if (!err)
																		casper.echo('Successfully logout from application', 'INFO');
																	});
																}else{
																casper.echo('User not logged-in element a.default-user not found','ERROR');
																}
															});									
														} else {
														casper.echo('User didn\'t not found any Edit Profile form link', 'ERROR');
														}
													}
												});										   
											} else {
											casper.echo('User didn\'t not found any  link', 'ERROR');
											}
										}
									});	
                                });								
							}
						});
					} else {
					casper.echo('User didn\'t not found any login link', 'ERROR');
					}
				}
			});
		});
	});
}

//4.test case for verify with upload avatar when you upload avatar after deleting it on registration page
uploadAttachmentTest.uploadAvatarRegistrationDeleting= function() {
	casper.then(function(){
		casper.thenOpen(config.url, function() {
			casper.echo('******************** case-4 ************************', 'INFO');
			casper.echo('verify with upload avatar when you upload avatar after deleting it on registration page', 'INFO');
			casper.echo('********************************************', 'INFO');
			casper.echo('Title of the page :' +this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a[href="/register/register"]', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a[href="/register/register"]');
						casper.click('.pull-right a[href="/register/register"]');
						casper.echo('Successfully open register form.....', 'INFO');
						
						wait.waitForElement('form[name="PostTopic"]', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
								
								   casper.test.assertExists('input[type="file"]');
						           casper.click('input[type="file"]');
                                  //	casper.thenOpen('http://s3.amazonaws.com/files.websitetoolbox.com/200676/3156405' , function(){
									//	wait.waitForTime(1000 , casper , function(err) {
										
									//	});
									//});	
                                    casper.test.assertExists('div#avatar span#deleteAvatar');
						            casper.click('div#avatar span#deleteAvatar');
                                    										
								} else {
									casper.echo('User didn\'t not found any Member Registration form link', 'ERROR');
								}
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

//5.test case for verify with upload avatar when you upload  avatar after deleting it on edit profile page
uploadAttachmentTest.uploadAvatarEditProfileDeleting= function() {
	casper.then(function(){
		casper.thenOpen(config.url, function() {
			casper.echo('******************** case-5 ************************', 'INFO');
			casper.echo('verify with upload avatar when you upload  avatar after deleting it on edit profile page', 'INFO');
			casper.echo('********************************************', 'INFO');
			casper.echo('Title of the page :' +this.getTitle(), 'INFO');
			wait.waitForElement('#td_tab_login', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('#td_tab_login');
						casper.click('#td_tab_login');
						forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
							if(!err) {
								casper.echo('login by valid username and password and verify error message', 'INFO');
								wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('ul.nav.pull-right span.caret');
											casper.click('ul.nav.pull-right span.caret');
											casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
											casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
											wait.waitForElement('form[name="PostTopic"]', casper, function(err, isExist) {
												if(!err){
													if(isExist) {
														
														casper.test.assertExists('input[type="file"]');
														casper.click('input[type="file"]');
															//casper.thenOpen('http://s3.amazonaws.com/files.websitetoolbox.com/200676/3156405' , function(){
															//wait.waitForTime(1000 , casper , function(err) {
															
															//});
														//});	
														casper.test.assertExists('div#uploadAvatar span#deleteAvatar');
														casper.click('div#uploadAvatar span#deleteAvatar');
														wait.waitForElement('a.default-user', casper , function(err, isExists) {
															if(isExists) {
																casper.test.assertDoesntExist('#td_tab_login');
																casper.echo('User has been successfuly login to application', 'INFO');
																forumLoginMethod.logoutFromApp(casper, function(err){
																	if (!err)
																	casper.echo('Successfully logout from application', 'INFO');
																});
															}else{
															casper.echo('User not logged-in element a.default-user not found','ERROR');
															}
														});									
													} else {
													casper.echo('User didn\'t not found any Edit Profile form link', 'ERROR');
													}
												}
											});										   
										} else {
										casper.echo('User didn\'t not found any  link', 'ERROR');
										}
									}
								});			
							}
						});
					} else {
					casper.echo('User didn\'t not found any login link', 'ERROR');
					}
				}
			});
		});
	});
}

//6.test case for verify upload avatar for the first time on profile page(with registration new)
uploadAttachmentTest.uploadAvatarProfile= function() {
	casper.then(function(){
		casper.thenOpen(config.url, function() {
			casper.echo('******************** case-6 ************************', 'INFO');
			casper.echo('verify upload avatar for the first time on profile page', 'INFO');
			casper.echo('********************************************', 'INFO');
			casper.echo('Title of the page :' +this.getTitle(), 'INFO');
			wait.waitForElement('#td_tab_login', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('#td_tab_login');
						casper.click('#td_tab_login');
						forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
							if(!err) {
								casper.echo('login by valid username and password and verify error message', 'INFO');
								wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											 casper.test.assertExists('ul.nav.pull-right span.caret');
											 casper.click('ul.nav.pull-right span.caret');
											 casper.test.assertExists('span.pull-right.user-nav-panel a');
											 casper.click('span.pull-right.user-nav-panel a');
											 wait.waitForElement('div#change_Avatar', casper, function(err, isExist) {
												if(!err){
													if(isExist) {
													
														//casper.thenOpen('http://s3.amazonaws.com/files.websitetoolbox.com/200676/3156405' , function(){
															//wait.waitForTime(1000 , casper , function(err) {
															
															//});
														//});	
														wait.waitForElement('a.default-user', casper , function(err, isExists) {
															if(isExists) {
																casper.test.assertDoesntExist('#td_tab_login');
																casper.echo('User has been successfuly login to application', 'INFO');
																forumLoginMethod.logoutFromApp(casper, function(err){
																	if (!err)
																	casper.echo('Successfully logout from application', 'INFO');
																	});
															}else{
															casper.echo('User not logged-in element a.default-user not found','ERROR');
															}
														});																
													} else {
														casper.echo('User didn\'t not found any Edit Profile form link', 'ERROR');
													}
												}
											});										   
										} else {
											casper.echo('User didn\'t not found any  link', 'ERROR');
										}
									}
								});		
							}
						});
					} else {
					casper.echo('User didn\'t not found any login link', 'ERROR');
					}
				}
			});
		});
	});
}

//7.test case for verify upload avatar on profile page again when you already upload a avatar
uploadAttachmentTest.uploadAvatarProfileAgain= function() {
	casper.then(function(){
	casper.thenOpen(config.url, function() {
		casper.echo('******************** case-7 ************************', 'INFO');
		casper.echo('verify upload avatar on profile page again when you already upload a avatar', 'INFO');
		casper.echo('********************************************', 'INFO');
		casper.echo('Title of the page :' +this.getTitle(), 'INFO');
		wait.waitForElement('#td_tab_login', casper, function(err, isExist) {
			if(!err){
				if(isExist) {
					casper.test.assertExists('#td_tab_login');
					casper.click('#td_tab_login');
					forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
						if(!err) {
							casper.echo('login by valid username and password and verify error message', 'INFO');
							wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
								if(!err){
									if(isExist) {
										 casper.test.assertExists('ul.nav.pull-right span.caret');
										 casper.click('ul.nav.pull-right span.caret');
										 casper.test.assertExists('span.pull-right.user-nav-panel a');
										 casper.click('span.pull-right.user-nav-panel a');
										 wait.waitForElement('div#change_Avatar', casper, function(err, isExist) {
											if(!err){
												if(isExist) {
											
												/*	casper.thenOpen('http://s3.amazonaws.com/files.websitetoolbox.com/200676/3156405' , function(){
														wait.waitForTime(1000 , casper , function(err) {
														
														});
														
													});	
													 wait.waitForElement('div#change_Avatar', casper, function(err, isExist) {
														if(!err){
															if(isExist) {
															
																casper.thenOpen('http://s3.amazonaws.com/files.websitetoolbox.com/200676/3156406' , function(){
																	wait.waitForTime(1000 , casper , function(err) {
																		
																	});
																	
																});	
														*/		wait.waitForElement('a.default-user', casper , function(err, isExists) {
																	if(isExists) {
																	casper.test.assertDoesntExist('#td_tab_login');
																	casper.echo('User has been successfuly login to application', 'INFO');
																	forumLoginMethod.logoutFromApp(casper, function(err){
																		if (!err)
																		casper.echo('Successfully logout from application', 'INFO');
																		});
																	}else{
																	casper.echo('User not logged-in element a.default-user not found','ERROR');
																	}
																});																
															//} else {
																//casper.echo('User didn\'t not found any Edit Profile form link', 'ERROR');
														//	}
														//}
													//});																
												} else {
													casper.echo('User didn\'t not found any Edit Profile form link', 'ERROR');
												}
											}
										});										   
									} else {
										casper.echo('User didn\'t not found any  link', 'ERROR');
									}
								}
							});		
						}
					});
				} else {
				casper.echo('User didn\'t not found any login link', 'ERROR');
				}
			}
		});
	});
   });
}

//8.test case for verify upload avatar on profile page after remove the already uploaded avatar.
uploadAttachmentTest.uploadAvatarProfileRemove= function() {
	casper.then(function(){
		casper.thenOpen(config.url, function() {
			casper.echo('******************** case-8 ************************', 'INFO');
			casper.echo('verify upload avatar on profile page after remove the already uploaded avatar', 'INFO');
			casper.echo('********************************************', 'INFO');
			casper.echo('Title of the page :' +this.getTitle(), 'INFO');
			wait.waitForElement('#td_tab_login', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('#td_tab_login');
						casper.click('#td_tab_login');
						forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
							if(!err) {
								casper.echo('login by valid username and password and verify error message', 'INFO');
								wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											 casper.test.assertExists('ul.nav.pull-right span.caret');
											 casper.click('ul.nav.pull-right span.caret');
											 casper.test.assertExists('span.pull-right.user-nav-panel a');
											 casper.click('span.pull-right.user-nav-panel a');
											 wait.waitForElement('div#change_Avatar', casper, function(err, isExist) {
												if(!err){
													if(isExist) {
													/*	
														casper.thenOpen('http://s3.amazonaws.com/files.websitetoolbox.com/200676/3156405' , function(){
															wait.waitForTime(1000 , casper , function(err) {
															
															});
															
														});	
														 casper.test.assertExists('div#change_Avatar');
														 casper.click('div#change_Avatar');
														casper.thenOpen('http://s3.amazonaws.com/files.websitetoolbox.com/200676/3156406' , function(){
															wait.waitForTime(1000 , casper , function(err) {
															
															});
															
														});	
													*/	wait.waitForElement('a.default-user', casper , function(err, isExists) {
															if(isExists) {
															casper.test.assertDoesntExist('#td_tab_login');
															casper.echo('User has been successfuly login to application', 'INFO');
															forumLoginMethod.logoutFromApp(casper, function(err){
																if (!err)
																casper.echo('Successfully logout from application', 'INFO');
																});
															}else{
															casper.echo('User not logged-in element a.default-user not found','ERROR');
															}
														});																																	
													} else {
														casper.echo('User didn\'t not found any Edit Profile form link', 'ERROR');
													}
												}
											});										   
										} else {
											casper.echo('User didn\'t not found any  link', 'ERROR');
										}
									}
								});		
							}
						});
					} else {
					casper.echo('User didn\'t not found any login link', 'ERROR');
					}
				}
			});
		});
	 });
 }

//9.test case for verify with upload avatar by pc when facebook is enable(backend facebook enable and registration)
uploadAttachmentTest.uploadAvatarFacebookEnable= function() {
	
		casper.then(function(){
			casper.echo('******************** case-9 ************************', 'INFO');
			casper.echo('verify with upload avatar by pc when facebook is enable', 'INFO');
			casper.echo('********************************************', 'INFO');
			uploadAttachmentMethod.backendSettingFacebook('Yes',casper,casper.test,function(err){
				if(!err){
					casper.thenOpen(config.url, function() {
						casper.echo('Title of the page :' +this.getTitle(), 'INFO');
						wait.waitForElement('.pull-right a[href="/register/register"]', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.test.assertExists('.pull-right a[href="/register/register"]');
									casper.click('.pull-right a[href="/register/register"]');
									casper.echo('Successfully open register form.....', 'INFO');
								} else {
									casper.echo('User didn\'t not found any register link', 'ERROR');
								}
							}
						});
					});
				}
			});	
		});
		casper.then(function(){
			registerTests.validInfo()	
		});
	
}

//10.test case for verify with select none option for avavtar
uploadAttachmentTest.uploadAvatarFacebookNone= function() {
	casper.then(function(){
	casper.thenOpen(config.url, function() {
			casper.echo('******************** case-10 ************************', 'INFO');
			casper.echo('test case for verify with use my facebook avatar option', 'INFO');
			casper.echo('********************************************', 'INFO');
			casper.echo('Title of the page :' +this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a[href="/register/register"]', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a[href="/register/register"]');
						casper.click('.pull-right a[href="/register/register"]');
						casper.echo('Successfully open register form.....', 'INFO');
							wait.waitForElement('form[name="PostTopic"]', casper, function(err, isExist) {
								if(!err){
									if(isExist) {			
										casper.test.assertExists('a#fblogin','Facebook Login Button Found On login Page Of FrontEndUrl');
										casper.click('a#fblogin');
									    uploadAttachmentMethod.facebookPopUp(casper,casper.test, function(err) {
											if(!err){
												wait.waitForElement('form[name="PostTopic"]', casper, function(err, isExist) {
													if(!err){
														if(isExist) {
														    //casper.test.assertExists('#av_none');
						                                 // casper.click('#av_none');
																		   
														} else {
															casper.echo('User didn\'t not found any Member Registration form link', 'ERROR');
														}
													}
												});
											}
										});
									} else {
										casper.echo('User didn\'t not found any register link', 'ERROR');
									}
								}
							});
					} else {
						casper.echo('User didn\'t not found any register link', 'ERROR');
					}
				}
			});
			casper.then(function(){
			  registerTests.validInfo();
			});
			
		});	
	});
}

//11.test case for verify with use my facebook avatar option(error)
uploadAttachmentTest.uploadAvatarFacebookOption= function() {
	casper.then(function(){
    casper.thenOpen(config.url, function() {
			casper.echo('******************** case-11 ************************', 'INFO');
			casper.echo('verify with use my facebook avatar option', 'INFO');
			casper.echo('********************************************', 'INFO');
			casper.echo('Title of the page :' +this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a[href="/register/register"]', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a[href="/register/register"]');
						casper.click('.pull-right a[href="/register/register"]');
						casper.echo('Successfully open register form.....', 'INFO');
						
						wait.waitForElement('form[name="PostTopic"]', casper, function(err, isExist) {
							if(!err){
								if(isExist) {			
									casper.test.assertExists('a#fblogin','Facebook Login Button Found On login Page Of FrontEndUrl');
									casper.click('a#fblogin');
									uploadAttachmentMethod.facebookPopUp(casper,casper.test, function(err) {
										if(!err){
										 casper.echo('uploadAttachmentMethod facebookPopUp is working ','INFO');
										}
									});
								} else {
									casper.echo('User didn\'t not found any register link', 'ERROR');
								}
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

//12.test case for verify with upload avavtar when none option is enable(testcase related 11)
uploadAttachmentTest.uploadAvatarFacebookNoneOption= function() {	
    // casper.then(function(){
		/* casper.then(function(){
			uploadAttachmentMethod.defaultRegistrationOption('No',casper,casper.test,function(err){
					 if(!err){
						casper.echo('uploadAttachmentMethod of defaultRegistrationOption working','INFO');
					 }
				 });
		 });
	*/	 casper.then(function(){	
			casper.thenOpen(config.url, function() {
					casper.echo('******************** case-12 ************************', 'INFO');
					casper.echo('test case for verify with upload avavtar when none option is enable', 'INFO');
					casper.echo('********************************************', 'INFO');
					casper.echo('Title of the page :' +this.getTitle(), 'INFO');
					wait.waitForElement('.pull-right a[href="/register/register"]', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.test.assertExists('.pull-right a[href="/register/register"]');
								casper.click('.pull-right a[href="/register/register"]');
								casper.echo('Successfully open register form.....', 'INFO');
										wait.waitForElement('form[name="PostTopic"]', casper, function(err, isExist) {
										if(!err){
											if(isExist) {			
												casper.test.assertExists('a#fblogin','Facebook Login Button Found On login Page Of FrontEndUrl');
												casper.click('a#fblogin');
												uploadAttachmentMethod.facebookPopUp(casper,casper.test, function(err) {
													if(!err){
													    //wait.waitForTime(2000 , casper , function(err) {
															wait.waitForElement('form[name="PostTopic"]', casper, function(err, isExist) {
																if(!err){
																	if(isExist) {
																		//wait.waitForTime(1000 , casper , function(err) {
																
																			casper.test.assertExists('#av_none');
																			casper.click('#av_none');
																			registerTests.validInfo();	
																		//});															
																	} else {
																		casper.echo('User didn\'t not found any Member Registration form link', 'ERROR');
																	}
																}
															});
														//});
													}
												});
											} else {
												casper.echo('User didn\'t not found any register link', 'ERROR');
											}
										}
									});
							} else {
								casper.echo('User didn\'t not found any register link', 'ERROR');
							}
						}
					});
				});
		});	
   // });		
}

//13.test case for verify with upload avavtar on profile page when use face book  is enable
uploadAttachmentTest.uploadAvatarFacebookProfile= function() {
	casper.then(function(){	
		casper.thenOpen(config.url, function() {
			casper.echo('******************** case-13 ************************', 'INFO');
			casper.echo('test case for verify with upload avavtar when none option is enable', 'INFO');
			casper.echo('********************************************', 'INFO');
			casper.echo('Title of the page :' +this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a[href="/register/register"]', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a[href="/register/register"]');
						casper.click('.pull-right a[href="/register/register"]');
						casper.echo('Successfully open register form.....', 'INFO');
							wait.waitForElement('form[name="PostTopic"]', casper, function(err, isExist) {
								if(!err){
									if(isExist) {			
										casper.test.assertExists('a#fblogin','Facebook Login Button Found On login Page Of FrontEndUrl');
										casper.click('a#fblogin');
									    uploadAttachmentMethod.facebookPopUp(casper,casper.test, function(err) {
											if(!err){
												wait.waitForElement('form[name="PostTopic"]', casper, function(err, isExist) {
													if(!err){
														if(isExist) {
														  casper.test.assertExists('#av_fb');
						                                  casper.click('#av_fb');
														  registerTests.validInfo();	
																					   
														} else {
															casper.echo('User didn\'t not found any Member Registration form link', 'ERROR');
														}
													}
												});
											}
										});
									} else {
										casper.echo('User didn\'t not found any register link', 'ERROR');
									}
								}
							});
					} else {
						casper.echo('User didn\'t not found any register link', 'ERROR');
					}
				}
			});
			
			casper.then(function(){
			  // verify upload avatar for the first time on profile page
                uploadAttachmentTest.uploadAvatarProfile();	
			});
			
		});
	});		
}

//14.test case for verify with upload avavtar from profile page when you select none at the time of registration
uploadAttachmentTest.uploadAvatarFacebookProfileNone= function() {
	casper.then(function(){	
		casper.thenOpen(config.url, function() {
			casper.echo('******************** case-13 ************************', 'INFO');
			casper.echo('test case for verify with upload avavtar when none option is enable', 'INFO');
			casper.echo('********************************************', 'INFO');
			casper.echo('Title of the page :' +this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a[href="/register/register"]', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a[href="/register/register"]');
						casper.click('.pull-right a[href="/register/register"]');
						casper.echo('Successfully open register form.....', 'INFO');
							wait.waitForElement('form[name="PostTopic"]', casper, function(err, isExist) {
								if(!err){
									if(isExist) {			
										casper.test.assertExists('a#fblogin','Facebook Login Button Found On login Page Of FrontEndUrl');
										casper.click('a#fblogin');
									   uploadAttachmentMethod.facebookPopUp(casper,casper.test, function(err) {
											if(!err){
												wait.waitForElement('form[name="PostTopic"]', casper, function(err, isExist) {
													if(!err){
														if(isExist) {
															casper.test.assertExists('#av_none');
															casper.click('#av_none');
															registerTests.validInfo();			   
														} else {
															casper.echo('User didn\'t not found any Member Registration form link', 'ERROR');
														}
													}
												});
											}
										});
									} else {
										casper.echo('User didn\'t not found any register link', 'ERROR');
									}
								}
							});
					} else {
						casper.echo('User didn\'t not found any register link', 'ERROR');
					}
				}
			});
			
			casper.then(function(){
			  // verify upload avatar for the first time on profile page
                uploadAttachmentTest.uploadAvatarProfile();	
			});
			
		});
	});			
}


//15.test case for verify upload avatar on edit profile page if you select use my face book at the time of registration
uploadAttachmentTest.uploadAvatarFacebookEditeProfile= function() {
     casper.then(function(){
		 uploadAttachmentMethod.defaultRegistrationOption('Yes',casper,casper.test,function(err){
					 if(!err){
						casper.echo('uploadAttachmentMethod of defaultRegistrationOption working','INFO');
					 }
				 });
	});
	casper.then(function(){	
		casper.thenOpen(config.url, function() {
			casper.echo('******************** case-15 ************************', 'INFO');
			casper.echo('test case for verify with upload avavtar when none option is enable', 'INFO');
			casper.echo('********************************************', 'INFO');
			casper.echo('Title of the page :' +this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a[href="/register/register"]', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a[href="/register/register"]');
						casper.click('.pull-right a[href="/register/register"]');
						casper.echo('Successfully open register form.....', 'INFO');
							wait.waitForElement('form[name="PostTopic"]', casper, function(err, isExist) {
								if(!err){
									if(isExist) {			
										casper.test.assertExists('a#fblogin','Facebook Login Button Found On login Page Of FrontEndUrl');
										casper.click('a#fblogin');
									    uploadAttachmentMethod.facebookPopUp(casper,casper.test, function(err) {
											if(!err){
												wait.waitForElement('form[name="PostTopic"]', casper, function(err, isExist) {
													if(!err){
														if(isExist) {
														    // casper.test.assertExists('#av_fb');
						                                    // casper.click('#av_fb');
														     registerTests.validInfo();	
																					   
														} else {
															casper.echo('User didn\'t not found any Member Registration form link', 'ERROR');
														}
													}
												});
											}
										});
									} else {
										casper.echo('User didn\'t not found any register link', 'ERROR');
									}
								}
							});
					} else {
						casper.echo('User didn\'t not found any register link', 'ERROR');
					}
				}
			});
			casper.then(function(){
               uploadAttachmentTest.uploadAvatarEditProfileChange();	
			});
			
		});
		
	});	
}


//16.verify with upload avavtar from edit profile page when you select none at the time of registration
uploadAttachmentTest.uploadAvatarFacebookEditeProfileNone= function() {
	casper.then(function(){	
		casper.thenOpen(config.url, function() {
			casper.echo('******************** case-16 ************************', 'INFO');
			casper.echo('verify with upload avavtar from edit profile page when you select none at the time of registration', 'INFO');
			casper.echo('********************************************', 'INFO');
			casper.echo('Title of the page :' +this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a[href="/register/register"]', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a[href="/register/register"]');
						casper.click('.pull-right a[href="/register/register"]');
						casper.echo('Successfully open register form.....', 'INFO');
							wait.waitForElement('form[name="PostTopic"]', casper, function(err, isExist) {
								if(!err){
									if(isExist) {			
										casper.test.assertExists('a#fblogin','Facebook Login Button Found On login Page Of FrontEndUrl');
										casper.click('a#fblogin');
									    uploadAttachmentMethod.facebookPopUp(casper,casper.test, function(err) {
											if(!err){
												wait.waitForElement('form[name="PostTopic"]', casper, function(err, isExist) {
													if(!err){
														if(isExist) {
														    casper.test.assertExists('#av_none');
						                                   casper.click('#av_none');
															registerTests.validInfo();			   
														} else {
															casper.echo('User didn\'t not found any Member Registration form link', 'ERROR');
														}
													}
												});
											}
										});
									} else {
										casper.echo('User didn\'t not found any register link', 'ERROR');
									}
								}
							});
					} else {
						casper.echo('User didn\'t not found any register link', 'ERROR');
					}
				}
			});
			casper.then(function(){
               uploadAttachmentTest.uploadAvatarEditProfileChange();	
			});
		});
		
	});	
}



/**************************************** Test case of PrivateMessage   ************************************/

//.test case send new message
uploadAttachmentTest.sendMessage= function() {
	
	casper.thenOpen(config.url, function() {
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
																		forumLoginMethod.logoutFromApp(casper, function(err){
																			if (!err)
																			casper.echo('Successfully logout from application', 'INFO');
																		});
																	}
																});
														} else {
															driver.echo('PostPrivateMessage form not found','ERROR');
														}
													});
												});
											} else {
												driver.echo('Send a New Messag Pop not found','ERROR');
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
	});
}

//1.test case for Verify with private message(send new message)(Attachment/Insert photos)
uploadAttachmentTest.privateMessageSendNewMessage= function() {
	
	//1(a).Verify with private message(reply section)camera browse
		casper.then(function(){
			casper.thenOpen(config.url, function(){
				casper.echo('******************** case-1(a) ************************', 'INFO');
				casper.echo('Verify with private message(reply section)camera browse', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
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
														casper.test.assertExists('a#insert_image_dialog_pmsDialog');
														casper.click('a#insert_image_dialog_pmsDialog');
														wait.waitForTime(1000 , casper , function(err) {
															wait.waitForElement('a#computerpmsDialog', casper, function(err, isExist) {
																if(!err){
																	if(isExist) {
																		casper.test.assertExists('a#computerpmsDialog');
																		casper.click('a#computerpmsDialog');
																		casper.test.assertExists('a#insertImage_pmsDialog');
																		//casper.click('a#insertImage_reply');
																		casper.test.assertExists('button#bootstrap_close_image_dialogpmsDialog');
																		casper.click('button#bootstrap_close_image_dialogpmsDialog');
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
														driver.echo('PostPrivateMessage form not found','ERROR');
													}
												});
											});
										} else {
											driver.echo('Send a New Messag Pop not found','ERROR');
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
			});
		});

		//1(b).Verify with private message(reply section) camera webaddress
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('******************** case-1(b) ************************', 'INFO');
				casper.echo('Verify with private message(reply section) camera webaddress', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
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
														casper.test.assertExists('a#insert_image_dialog_pmsDialog');
														casper.click('a#insert_image_dialog_pmsDialog');
														wait.waitForTime(2000 , casper , function(err) {
															wait.waitForElement('a#webpmsDialog', casper, function(err, isExist) {
																if(!err){
																	if(isExist) {
																		casper.test.assertExists('a#webpmsDialog');
																		casper.click('a#webpmsDialog');
																		casper.sendKeys('input[name="fname"]', 'https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/thumb/16748462');	
																		casper.click('button#insert_image_btnpmsDialog');

																		wait.waitForElement('a.default-user', casper , function(err, isExists) {
																			if(isExists) {
																				casper.test.assertDoesntExist('#td_tab_login');
																				casper.echo('User has been successfuly login to application', 'INFO');
																				forumLoginMethod.logoutFromApp(casper, function(err){
																					if (!err)
																					casper.echo('Successfully logout from application', 'INFO');
																					
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
														driver.echo('PostPrivateMessage form not found','ERROR');
													}
												});
											});
										} else {
											driver.echo('Send a New Messag Pop not found','ERROR');
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
			});
		});

		//1(c).Verify with private message(reply section)Attachment
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('******************** case-2(c) ************************', 'INFO');
				casper.echo('Verify with private message(reply section)Attachment', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
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
														casper.test.assertExists('a#fancy_attach_pmsDialog');
														casper.click('a#fancy_attach_pmsDialog');
															//	driver.thenOpen('http://s3.amazonaws.com/files.websitetoolbox.com/200676/3156405' , function(){
															//	wait.waitForTime(1000 , driver , function(err) {
															
															//	});
															//});	
															wait.waitForElement('a.default-user',casper , function(err, isExists) {
																if(isExists) {
																	casper.test.assertDoesntExist('#td_tab_login');
																	casper.echo('User has been successfuly login to application', 'INFO');
																	forumLoginMethod.logoutFromApp(casper, function(err){
																		if (!err)
																		casper.echo('Successfully logout from application', 'INFO');
																		
																	});
																}else{
																driver.echo('User not logged-in element a.default-user not found','ERROR');
																}
															});	
														
													} else {
														driver.echo('PostPrivateMessage form not found','ERROR');
													}
												});
											});
										} else {
											driver.echo('Send a New Messag Pop not found','ERROR');
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
			});
		});
 
		//1(d).Verify with private message(reply section)Insert Photos browse
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('******************** case-2(d) ************************', 'INFO');
				casper.echo('Verify with private message(reply section)Insert Photos browse', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
			    forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
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
														casper.test.assertExists('#image_button_pmessage_new');
														casper.click('#image_button_pmessage_new');
														wait.waitForTime(7000 , casper , function(err) {
															wait.waitForElement('a#computerpmsDialog', casper, function(err, isExist) {
																if(!err){
																	if(isExist) {
																		casper.test.assertExists('a#computerpmsDialog');
																		casper.click('a#computerpmsDialog');
																		casper.test.assertExists('a#insertImage_pmsDialog');
																		//casper.click('a#insertImage_reply');
																		casper.test.assertExists('button#bootstrap_close_image_dialogpmsDialog');
																		casper.click('button#bootstrap_close_image_dialogpmsDialog');
																		//casper.thenOpen('http://s3.amazonaws.com/files.websitetoolbox.com/200676/3156405' , function(){
																		//	wait.waitForTime(1000 , casper , function(err) {
																		
																		//	});
																		//});
																		wait.waitForTime(5000 , casper , function(err) {
																			
																			 forumLoginMethod.logoutFromApp(casper,function(err){
																				if(!err){
																					casper.echo('logout sucessful ','INFO');
																																
																				}
																			});											
																		});
																	} else {
																	casper.echo('User didn\'t not found any images Inserted reply form link', 'ERROR');
																	}
																}
															});
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
			});
		});
	
		//1(e).Verify with private message(reply section)Insert Photos webaddress
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('******************** case-2(e) ************************', 'INFO');
				casper.echo('Verify with private message(reply section) Insert Photos webaddress', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
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
														casper.test.assertExists('#image_button_pmessage_new');
														casper.click('#image_button_pmessage_new');
														wait.waitForTime(7000 , casper , function(err) {
															wait.waitForElement('a#webpmsDialog', casper, function(err, isExist) {
																if(!err){
																	if(isExist) {
																		casper.test.assertExists('a#webpmsDialog');
																		casper.click('a#webpmsDialog');
																		casper.sendKeys('input[name="fname"]', 'https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/thumb/16748462');	
																		casper.click('button#insert_image_btnpmsDialog');
																		wait.waitForTime(5000 , casper , function(err) {
																		
																			 forumLoginMethod.logoutFromApp(casper,function(err){
																				if(!err){
																					casper.echo('logout sucessful ','INFO');
																																
																				}
																			});											
																		});
																	} else {
																	casper.echo('User didn\'t not found any images Inserted reply form link', 'ERROR');
																	}
																}
															});
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
					
			});
		});
		
}



//2.test case for Verify with private message(reply section)(Attachment/insert photos)
uploadAttachmentTest.privateMessageReplySection= function() {
	casper.then(function(){
		//test case for reply message generated
		casper.then(function(){
		      uploadAttachmentTest.sendMessage();
		});
		
		//2(a).Verify with private message(reply section)camera browse
		casper.then(function(){
			casper.thenOpen(config.url, function(){
				casper.echo('******************** case-2(a) ************************', 'INFO');
				casper.echo('Verify with private message(reply section)camera browse', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
							if(isExists) {
								try {	
									casper.click('i#private_message_notification');
									wait.waitForElement('span.pull-left.user-nav-panel li:nth-child(2)', casper, function(err, isExists) {
										if(isExists) {
											casper.click('span.pull-left.user-nav-panel li:nth-child(2)');
											 uploadAttachmentMethod.cameraBrowse(casper, function(err){
												if (!err){
												casper.echo('uploadAttachmentMethod of cameraWebaddress working ', 'INFO');
												}
											});
										} else {
											driver.echo('Send a New Messag Pop not found','ERROR');
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
			});
		});

		//2(b).Verify with private message(reply section) camera webaddress
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('******************** case-2(b) ************************', 'INFO');
				casper.echo('Verify with private message(reply section) camera webaddress', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
							if(isExists) {
								try {	
									casper.click('i#private_message_notification');
									wait.waitForElement('span.pull-left.user-nav-panel li:nth-child(2)', casper, function(err, isExists) {
										if(isExists) {
											casper.click('span.pull-left.user-nav-panel li:nth-child(2)');
											wait.waitForTime(2000 , casper , function(err) {
												 uploadAttachmentMethod.cameraWebaddress(casper, function(err){
													if (!err){
													casper.echo('uploadAttachmentMethod of cameraWebaddress working ', 'INFO');
													}
												});
											});
										} else {
											driver.echo('Send a New Messag Pop not found','ERROR');
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
			});
		});

		//2(c).Verify with private message(reply section)Attachment
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('******************** case-2(c) ************************', 'INFO');
				casper.echo('Verify with private message(reply section)Attachment', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
							if(isExists) {
								try {	
									casper.click('i#private_message_notification');
									wait.waitForElement('span.pull-left.user-nav-panel li:nth-child(2)', casper, function(err, isExists) {
										if(isExists) {
											casper.click('span.pull-left.user-nav-panel li:nth-child(2)');
											wait.waitForTime(2000 , casper , function(err) {
												 uploadAttachmentMethod.Attachment(casper, function(err){
													if (!err){
													casper.echo('uploadAttachmentMethod of cameraWebaddress working ', 'INFO');
													}
												});
											});
											
										} else {
											driver.echo('Send a New Messag Pop not found','ERROR');
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
			});
		});
 
		//2(d).Verify with private message(reply section)Insert Photos browse
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('******************** case-2(d) ************************', 'INFO');
				casper.echo('Verify with private message(reply section)Insert Photos browse', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
							if(isExists) {
								try {	
									casper.click('i#private_message_notification');
									wait.waitForElement('span.pull-left.user-nav-panel li:nth-child(2)', casper, function(err, isExists) {
										if(isExists) {
											casper.click('span.pull-left.user-nav-panel li:nth-child(2)');
											wait.waitForTime(2000 , casper , function(err) {
												 uploadAttachmentMethod.insertPhotosBrowse(casper, function(err){
													if (!err){
													casper.echo('uploadAttachmentMethod of cameraWebaddress working ', 'INFO');
													}
												});
											});
									
										} else {
											driver.echo('Send a New Messag Pop not found','ERROR');
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
			});
		});
	
		//2(e).Verify with private message(reply section)Insert Photos webaddress
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('******************** case-2(e) ************************', 'INFO');
				casper.echo('Verify with private message(reply section) Insert Photos webaddress', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('i#private_message_notification', casper,function(err, isExists) {
							if(isExists) {
								try {	
									casper.click('i#private_message_notification');
									wait.waitForElement('span.pull-left.user-nav-panel li:nth-child(2)', casper, function(err, isExists) {
										if(isExists) {
											casper.click('span.pull-left.user-nav-panel li:nth-child(2)');
											wait.waitForTime(2000 , casper , function(err) {
												 uploadAttachmentMethod.insertPhotosWebaddress(casper, function(err){
													if (!err){
													casper.echo('uploadAttachmentMethod of cameraWebaddress working ', 'INFO');
													}
												});
											});
										} else {
											driver.echo('Send a New Messag Pop not found','ERROR');
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
					
			});
		});
		
	});
}


//3.test case for Verify with private message from PM page(new message)(Attachment/Insert photos)
uploadAttachmentTest.privateMessageFromPm= function() {
	casper.then(function(){
		//3(a).Verify with private message(reply section)camera browse
		casper.then(function(){
			casper.thenOpen(config.url, function(){
				casper.echo('******************** case-3(a) ************************', 'INFO');
				casper.echo('Verify with private message(reply section)camera browse', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
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
												wait.waitForElement('div.dropdown a:nth-child(4)', casper, function(err, isExist) {
												if(!err){
													if(isExist) {
														casper.test.assertExists('div.dropdown a:nth-child(4)');
														casper.click('div.dropdown a:nth-child(4)');
														wait.waitForTime(6000 , casper , function(err) {
															wait.waitForElement('form[name="PostTopic"]', casper, function(err, isExist) {
																if(!err){
																	if(isExist) {
																	
																		casper.test.assertExists('a#insert_image_dialog_pmsDialog');
																		casper.click('a#insert_image_dialog_pmsDialog');
																		
																		wait.waitForTime(2000 , casper , function(err) {
																		wait.waitForElement('a#computerpmsDialog', casper, function(err, isExist) {
																			if(!err){
																				if(isExist) {
																			
																					casper.test.assertExists('a#computerpmsDialog');
																					casper.click('a#computerpmsDialog');
																					casper.test.assertExists('a#insertImage_pmsDialog');
																					//casper.click('a#insertImage_reply');
																					casper.test.assertExists('button#bootstrap_close_image_dialogpmsDialog');
																					casper.click('button#bootstrap_close_image_dialogpmsDialog');
																					//casper.thenOpen('http://s3.amazonaws.com/files.websitetoolbox.com/200676/3156405' , function(){
																					//	wait.waitForTime(1000 , casper , function(err) {
																			
																					//	});
																					//});	
																					wait.waitForElement('a.default-user', casper , function(err, isExists) {
																						if(isExists) {
																							casper.test.assertDoesntExist('#td_tab_login');
																							casper.echo('User has been successfuly login to application', 'INFO');
																							forumLoginMethod.logoutFromApp(casper, function(err){
																								if (!err)
																								casper.echo('Successfully logout from application', 'INFO');
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
																		casper.echo('User didn\'t not found any form-PostPrivateMessage link', 'ERROR');
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
			});
		});
		
		//3(b).Verify with private message(reply section) camera webaddress
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('******************** case-3(b) ************************', 'INFO');
				casper.echo('Verify with private message(reply section) camera webaddress', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
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
												wait.waitForElement('div.dropdown a:nth-child(4)', casper, function(err, isExist) {
												if(!err){
													if(isExist) {
														casper.test.assertExists('div.dropdown a:nth-child(4)');
														casper.click('div.dropdown a:nth-child(4)');
														wait.waitForTime(6000 , casper , function(err) {
															wait.waitForElement('form[name="PostTopic"]', casper, function(err, isExist) {
																if(!err){
																	if(isExist) {
																	
																		casper.test.assertExists('a#insert_image_dialog_pmsDialog');
																		casper.click('a#insert_image_dialog_pmsDialog');
																	   
																		wait.waitForTime(2000 , casper , function(err) {
																		wait.waitForElement('a#webpmsDialog', casper, function(err, isExist) {
																			if(!err){
																				if(isExist) {
																				
																					casper.test.assertExists('a#webpmsDialog');
																					casper.click('a#webpmsDialog');
																					casper.sendKeys('input[name="fname"]', 'https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/thumb/16748462');	
																				   casper.click('button#insert_image_btnpmsDialog');
																					
																					wait.waitForElement('a.default-user', casper , function(err, isExists) {
																						if(isExists) {
																							casper.test.assertDoesntExist('#td_tab_login');
																							casper.echo('User has been successfuly login to application', 'INFO');
																							forumLoginMethod.logoutFromApp(casper, function(err){
																								if (!err)
																								casper.echo('Successfully logout from application', 'INFO');
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
																		casper.echo('User didn\'t not found any form-PostPrivateMessage link', 'ERROR');
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
					
			});
		});
		
		//3(c).Verify with private message(reply section)Attachment
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('******************** case-3(c) ************************', 'INFO');
				casper.echo('Verify with private message(reply section)Attachment', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
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
												wait.waitForElement('div.dropdown a:nth-child(4)', casper, function(err, isExist) {
												if(!err){
													if(isExist) {
														casper.test.assertExists('div.dropdown a:nth-child(4)');
														casper.click('div.dropdown a:nth-child(4)');
														wait.waitForTime(5000 , casper , function(err) {
															wait.waitForElement('form[name="PostTopic"]', casper, function(err, isExist) {
																if(!err){
																	if(isExist) {
																		
																		casper.test.assertExists('a#fancy_attach_pmsDialog');
																		casper.click('a#fancy_attach_pmsDialog');
																		
																	//	casper.thenOpen('http://s3.amazonaws.com/files.websitetoolbox.com/200676/3156405' , function(){
																		//	wait.waitForTime(1000 , casper , function(err) {
																		
																		//	});
																		//});	
																		
																		wait.waitForElement('a.default-user', casper , function(err, isExists) {
																			if(isExists) {
																				casper.test.assertDoesntExist('#td_tab_login');
																				casper.echo('User has been successfuly login to application', 'INFO');
																				forumLoginMethod.logoutFromApp(casper, function(err){
																					if (!err)
																					casper.echo('Successfully logout from application', 'INFO');
																				});
																			}else{
																			casper.echo('User not logged-in element a.default-user not found','ERROR');
																			}
																		});
																	} else {
																		casper.echo('User didn\'t not found any form-PostPrivateMessage link', 'ERROR');
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
					
			});
		});
	
		//3(d).Verify with private message(reply section)Insert Photos browse
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('******************** case-3(d) ************************', 'INFO');
				casper.echo('Verify with private message(reply section)Insert Photos browse', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
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
												wait.waitForElement('div.dropdown a:nth-child(4)', casper, function(err, isExist) {
												if(!err){
													if(isExist) {
														casper.test.assertExists('div.dropdown a:nth-child(4)');
														casper.click('div.dropdown a:nth-child(4)');
															wait.waitForTime(8000 , casper , function(err) {
															wait.waitForElement('form[name="PostTopic"]', casper, function(err, isExist) {
																if(!err){
																	if(isExist) {
																	
																	   casper.test.assertExists('div#image_button_pmessage_new');
																	   casper.click('div#image_button_pmessage_new');
																	   wait.waitForTime(4000 , casper , function(err) {
																			wait.waitForElement('a#computerpmsDialog', casper, function(err, isExist) {
																				if(!err){
																					if(isExist) {
																						
																						casper.test.assertExists('a#computerpmsDialog');
																						casper.click('a#computerpmsDialog');
																						casper.test.assertExists('a#insertImage_pmsDialog');
																						//casper.click('a#insertImage_reply');
																						casper.test.assertExists('button#bootstrap_close_image_dialogpmsDialog');
																						casper.click('button#bootstrap_close_image_dialogpmsDialog');
																						//casper.thenOpen('http://s3.amazonaws.com/files.websitetoolbox.com/200676/3156405' , function(){
																						//	wait.waitForTime(1000 , casper , function(err) {
																						
																						//	});
																						//});
																						wait.waitForElement('a.default-user', casper , function(err, isExists) {
																							if(isExists) {
																								casper.test.assertDoesntExist('#td_tab_login');
																								casper.echo('User has been successfuly login to application', 'INFO');
																								forumLoginMethod.logoutFromApp(casper, function(err){
																									if (!err)
																									casper.echo('Successfully logout from application', 'INFO');
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
																		casper.echo('User didn\'t not found any form-PostPrivateMessage link', 'ERROR');
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
			});
		});
		
		//3(e).Verify with private message(reply section)Insert Photos webaddress
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('******************** case-3(e) ************************', 'INFO');
				casper.echo('Verify with private message(reply section) Insert Photos webaddress', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
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
												wait.waitForElement('div.dropdown a:nth-child(4)', casper, function(err, isExist) {
												if(!err){
													if(isExist) {
														casper.test.assertExists('div.dropdown a:nth-child(4)');
														casper.click('div.dropdown a:nth-child(4)');
														wait.waitForTime(8000 , casper , function(err) {
															wait.waitForElement('form[name="PostTopic"]', casper, function(err, isExist) {
																if(!err){
																	if(isExist) {
																	  
																	   casper.test.assertExists('div#image_button_pmessage_new');
																	   casper.click('div#image_button_pmessage_new');
																	   wait.waitForTime(4000 , casper , function(err) {
																			wait.waitForElement('a#webpmsDialog', casper, function(err, isExist) {
																				if(!err){
																					if(isExist) {
																					
																						casper.test.assertExists('a#webpmsDialog');
																						casper.click('a#webpmsDialog');
																						casper.sendKeys('input[name="fname"]', 'https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/thumb/16748462');	
																						casper.click('button#insert_image_btnpmsDialog');
																							
																						wait.waitForElement('a.default-user', casper , function(err, isExists) {
																							if(isExists) {
																								casper.test.assertDoesntExist('#td_tab_login');
																								casper.echo('User has been successfuly login to application', 'INFO');
																								forumLoginMethod.logoutFromApp(casper, function(err){
																									if (!err)
																									casper.echo('Successfully logout from application', 'INFO');
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
																		casper.echo('User didn\'t not found any form-PostPrivateMessage link', 'ERROR');
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
					
			});
		});	
		
	});
}

//4.test case for Verify with send the message from profile page message button (Attachement/Insert photos)
uploadAttachmentTest.messageFromProfilePage= function() {
	
	casper.then(function(){
		
		//4(a).Verify with private message(reply section)camera browse
		casper.then(function(){
			casper.thenOpen(config.url, function(){
				casper.echo('******************** case-4(a) ************************', 'INFO');
				casper.echo('Verify with private message(reply section)camera browse', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.test.assertExists('ul.nav.pull-right span.caret');
									casper.click('ul.nav.pull-right span.caret');
									casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(2) a');
									casper.click('span.pull-right.user-nav-panel li:nth-child(2) a');
									wait.waitForElement('a#send_message', casper, function(err, isExist) {
										if(!err){
											if(isExist) {
												casper.test.assertExists('a#send_message');
												casper.click('a#send_message');
												wait.waitForTime(6000 , casper , function(err) {
															wait.waitForElement('form[name="PostTopic"]', casper, function(err, isExist) {
																if(!err){
																	if(isExist) {
																		
																		casper.test.assertExists('a#insert_image_dialog_pmsDialog');
																		casper.click('a#insert_image_dialog_pmsDialog');
																		
																		wait.waitForTime(2000 , casper , function(err) {
																		wait.waitForElement('a#computerpmsDialog', casper, function(err, isExist) {
																			if(!err){
																				if(isExist) {
																					
																					casper.test.assertExists('a#computerpmsDialog');
																					casper.click('a#computerpmsDialog');
																					casper.test.assertExists('a#insertImage_pmsDialog');
																					//casper.click('a#insertImage_reply');
																					casper.test.assertExists('button#bootstrap_close_image_dialogpmsDialog');
																					casper.click('button#bootstrap_close_image_dialogpmsDialog');
																					//casper.thenOpen('http://s3.amazonaws.com/files.websitetoolbox.com/200676/3156405' , function(){
																					//	wait.waitForTime(1000 , casper , function(err) {
																					
																					//	});
																					//});	
																					
																							casper.echo('User has been successfuly login to application', 'INFO');
																							forumLoginMethod.logoutFromApp(casper, function(err){
																								if (!err)
																								casper.echo('Successfully logout from application', 'INFO');
																							});
																						
																					casper.echo('User didn\'t not found any images Inserted reply form link', 'ERROR');
																				}
																			}
																		});
																		});
																	} else {
																		casper.echo('User didn\'t not found any form-PostPrivateMessage link', 'ERROR');
																	}
																}
															});
														});					
											} else {
											casper.echo('User didn\'t not found any Edit Profile form link', 'ERROR');
											}
										}
									});										   
								} else {
								casper.echo('User didn\'t not found any  link', 'ERROR');
								}
							}
						});			
					}
				});	
			});
		});
		
		//4(b).Verify with private message(reply section) camera webaddress
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('******************** case-4(b) ************************', 'INFO');
				casper.echo('Verify with private message(reply section) camera webaddress', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.test.assertExists('ul.nav.pull-right span.caret');
									casper.click('ul.nav.pull-right span.caret');
									casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(2) a');
									casper.click('span.pull-right.user-nav-panel li:nth-child(2) a');
									wait.waitForElement('a#send_message', casper, function(err, isExist) {
										if(!err){
											if(isExist) {
												casper.test.assertExists('a#send_message');
												casper.click('a#send_message');
												wait.waitForTime(6000 , casper , function(err) {
													wait.waitForElement('form[name="PostTopic"]', casper, function(err, isExist) {
														if(!err){
															if(isExist) {
																
																casper.test.assertExists('a#insert_image_dialog_pmsDialog');
																casper.click('a#insert_image_dialog_pmsDialog');
															   
																wait.waitForTime(2000 , casper , function(err) {
																wait.waitForElement('a#webpmsDialog', casper, function(err, isExist) {
																	if(!err){
																		if(isExist) {
																			
																			casper.test.assertExists('a#webpmsDialog');
																			casper.click('a#webpmsDialog');
																			casper.sendKeys('input[name="fname"]', 'https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/thumb/16748462');	
																		   casper.click('button#insert_image_btnpmsDialog');
																			
																			wait.waitForElement('a.default-user', casper , function(err, isExists) {
																				if(isExists) {
																					casper.test.assertDoesntExist('#td_tab_login');
																					casper.echo('User has been successfuly login to application', 'INFO');
																					forumLoginMethod.logoutFromApp(casper, function(err){
																						if (!err)
																						casper.echo('Successfully logout from application', 'INFO');
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
																casper.echo('User didn\'t not found any form-PostPrivateMessage link', 'ERROR');
															}
														}
													});
												});	
																				
											} else {
											casper.echo('User didn\'t not found any Edit Profile form link', 'ERROR');
											}
										}
									});										   
								} else {
								casper.echo('User didn\'t not found any  link', 'ERROR');
								}
							}
						});			
					}
				});
			});
		});
		
		//4(c).Verify with private message(reply section)Attachment
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('******************** case-4(c) ************************', 'INFO');
				casper.echo('Verify with private message(reply section)Attachment', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.test.assertExists('ul.nav.pull-right span.caret');
									casper.click('ul.nav.pull-right span.caret');
									casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(2) a');
									casper.click('span.pull-right.user-nav-panel li:nth-child(2) a');
									wait.waitForElement('a#send_message', casper, function(err, isExist) {
										if(!err){
											if(isExist) {
												casper.test.assertExists('a#send_message');
												casper.click('a#send_message');
												wait.waitForTime(5000 , casper , function(err) {
													wait.waitForElement('form[name="PostTopic"]', casper, function(err, isExist) {
														if(!err){
															if(isExist) {
															
																casper.test.assertExists('a#fancy_attach_pmsDialog');
																casper.click('a#fancy_attach_pmsDialog');
																
															//	casper.thenOpen('http://s3.amazonaws.com/files.websitetoolbox.com/200676/3156405' , function(){
																//	wait.waitForTime(1000 , casper , function(err) {
																
																//	});
																//});	
																casper.echo('User has been successfuly login to application', 'INFO');
																forumLoginMethod.logoutFromApp(casper, function(err){
																	if (!err)
																	casper.echo('Successfully logout from application', 'INFO');
																});																
															} else {
																casper.echo('User didn\'t not found any form-PostPrivateMessage link', 'ERROR');
															}
														}
													});
												});
																				
											} else {
											casper.echo('User didn\'t not found any Edit Profile form link', 'ERROR');
											}
										}
									});										   
								} else {
								casper.echo('User didn\'t not found any  link', 'ERROR');
								}
							}
						});			
					}
				});
					
			});
		});
	
		//4(d).Verify with private message(reply section)Insert Photos browse
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('******************** case-4(d) ************************', 'INFO');
				casper.echo('Verify with private message(reply section)Insert Photos browse', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				
							forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
								if(!err) {
									casper.echo('login by valid username and password and verify error message', 'INFO');
									wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
										if(!err){
											if(isExist) {
												casper.test.assertExists('ul.nav.pull-right span.caret');
												casper.click('ul.nav.pull-right span.caret');
												casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(2) a');
												casper.click('span.pull-right.user-nav-panel li:nth-child(2) a');
												wait.waitForElement('a#send_message', casper, function(err, isExist) {
													if(!err){
														if(isExist) {
															casper.test.assertExists('a#send_message');
															casper.click('a#send_message');
														    	wait.waitForTime(8000 , casper , function(err) {
																		wait.waitForElement('form[name="PostTopic"]', casper, function(err, isExist) {
																			if(!err){
																				if(isExist) {
																				
																				   casper.test.assertExists('a#image_button_pmessage_new');
																				   casper.click('a#image_button_pmessage_new');
																				   wait.waitForTime(4000 , casper , function(err) {
																						wait.waitForElement('a#computerpmsDialog', casper, function(err, isExist) {
																							if(!err){
																								if(isExist) {
																								
																									casper.test.assertExists('a#computerpmsDialog');
																									casper.click('a#computerpmsDialog');
																									casper.test.assertExists('a#insertImage_pmsDialog');
																									//casper.click('a#insertImage_reply');
																									casper.test.assertExists('button#bootstrap_close_image_dialogpmsDialog');
																									casper.click('button#bootstrap_close_image_dialogpmsDialog');
																									//casper.thenOpen('http://s3.amazonaws.com/files.websitetoolbox.com/200676/3156405' , function(){
																									//	wait.waitForTime(1000 , casper , function(err) {
																									
																									//	});
																									//});
																									forumLoginMethod.logoutFromApp(casper, function(err){
																										if (!err)
																										casper.echo('Successfully logout from application', 'INFO');
																									});		
																								} else {
																									casper.echo('User didn\'t not found any images Inserted reply form link', 'ERROR');
																								}
																							}
																						});
																					});
																							
																				} else {
																					casper.echo('User didn\'t not found any form-PostPrivateMessage link', 'ERROR');
																				}
																			}
																		});
																	});
																							
														} else {
														casper.echo('User didn\'t not found any Edit Profile form link', 'ERROR');
														}
													}
												});										   
											} else {
											casper.echo('User didn\'t not found any  link', 'ERROR');
											}
										}
									});			
								}
							});
					
			});
		});
		
		//4(e).Verify with private message(reply section)Insert Photos webaddress
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('******************** case-4(e) ************************', 'INFO');
				casper.echo('Verify with private message(reply section) Insert Photos webaddress', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				
							forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
								if(!err) {
									casper.echo('login by valid username and password and verify error message', 'INFO');
									wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
										if(!err){
											if(isExist) {
												casper.test.assertExists('ul.nav.pull-right span.caret');
												casper.click('ul.nav.pull-right span.caret');
												casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(2) a');
												casper.click('span.pull-right.user-nav-panel li:nth-child(2) a');
												wait.waitForElement('a#send_message', casper, function(err, isExist) {
													if(!err){
														if(isExist) {
															casper.test.assertExists('a#send_message');
															casper.click('a#send_message');
														    wait.waitForTime(8000 , casper , function(err) {
																		wait.waitForElement('form[name="PostTopic"]', casper, function(err, isExist) {
																			if(!err){
																				if(isExist) {

																				   casper.test.assertExists('a#pmessage_new_imagebutton');
																				   casper.click('a#pmessage_new_imagebutton');
																				   wait.waitForTime(4000 , casper , function(err) {
																						wait.waitForElement('a#webpmsDialog', casper, function(err, isExist) {
																							if(!err){
																								if(isExist) {
																									
																									casper.test.assertExists('a#webpmsDialog');
																									casper.click('a#webpmsDialog');
																									casper.sendKeys('input[name="fname"]', 'https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/thumb/16748462');	
																									casper.click('button#insert_image_btnpmsDialog');
																										
																									
																											forumLoginMethod.logoutFromApp(casper, function(err){
																												if (!err)
																												casper.echo('Successfully logout from application', 'INFO');
																											});
																									
																								} else {
																									casper.echo('User didn\'t not found any images Inserted reply form link', 'ERROR');
																								}
																							}
																						});
																					});
																							
																				} else {
																					casper.echo('User didn\'t not found any form-PostPrivateMessage link', 'ERROR');
																				}
																			}
																		});
																	});
																							
														} else {
														casper.echo('User didn\'t not found any Edit Profile form link', 'ERROR');
														}
													}
												});										   
											} else {
											casper.echo('User didn\'t not found any  link', 'ERROR');
											}
										}
									});			
								}
							});
				
			});
		});		
	
	});
}
	
//5.test case for Verify with send the message from archieve box (Attachement/Insert photos)
uploadAttachmentTest.messageFromArchieveBox= function() {
     // need message
	casper.then(function(){
	
	 //test case for reply message generated
		casper.then(function(){
		      uploadAttachmentTest.sendMessage();
		});
		
	    //5(a).Verify with private message(reply section)camera browse
		casper.then(function(){
			casper.thenOpen(config.url, function(){
				casper.echo('******************** case-5(a) ************************', 'INFO');
				casper.echo('Verify with private message(reply section)camera browse', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				uploadAttachmentMethod.messageFromArchieveBox(casper, function(err){
					if (!err){
						casper.echo('uploadAttachmentMethod of messageFromArchieveBox working', 'INFO');
						wait.waitForTime(2000 , casper , function(err) {
							 uploadAttachmentMethod.cameraBrowse(casper, function(err){
								if (!err){
								casper.echo('uploadAttachmentMethod of cameraWebaddress working ', 'INFO');
								}
							});
						});
					}
				});
			});
		});
		
		//test case for reply message generated
		casper.then(function(){
		      uploadAttachmentTest.sendMessage();
		});
		
		 //5(b).Verify with private message(reply section) camera webaddress
		casper.then(function(){
			casper.thenOpen(config.url, function(){
				casper.echo('******************** case-5(b) ************************', 'INFO');
				casper.echo('Verify with private message(reply section) camera webaddress', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				uploadAttachmentMethod.messageFromArchieveBox(casper, function(err){
					if (!err){
						casper.echo('uploadAttachmentMethod of messageFromArchieveBox working', 'INFO');
						wait.waitForTime(2000 , casper , function(err) {
							 uploadAttachmentMethod.cameraWebaddress(casper, function(err){
								if (!err){
								casper.echo('uploadAttachmentMethod of cameraWebaddress working ', 'INFO');
								}
							});
						});
					}
				});
			});
		});
		
		//test case for reply message generated
		casper.then(function(){
		      uploadAttachmentTest.sendMessage();
		});
		
		 //5(c).Verify with private message(reply section)Attachment
		casper.then(function(){
			casper.thenOpen(config.url, function(){
				casper.echo('******************** case-5(c) ************************', 'INFO');
				casper.echo('Verify with private message(reply section)Attachment', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				uploadAttachmentMethod.messageFromArchieveBox(casper, function(err){
					if (!err){
						casper.echo('uploadAttachmentMethod of messageFromArchieveBox working', 'INFO');
						wait.waitForTime(2000 , casper , function(err) {
							 uploadAttachmentMethod.Attachment(casper, function(err){
								if (!err){
								casper.echo('uploadAttachmentMethod of cameraWebaddress working ', 'INFO');
								}
							});
						});
					}
				});
			});
		});
		
		//test case for reply message generated
		casper.then(function(){
		      uploadAttachmentTest.sendMessage();
		});
		
		 //5(d).Verify with private message(reply section)Insert Photos browse
		casper.then(function(){
			casper.thenOpen(config.url, function(){
				casper.echo('******************** case-5(d) ************************', 'INFO');
				casper.echo('Verify with private message(reply section)Insert Photos browse', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				uploadAttachmentMethod.messageFromArchieveBox(casper, function(err){
					if (!err){
						casper.echo('uploadAttachmentMethod of messageFromArchieveBox working', 'INFO');
						wait.waitForTime(2000 , casper , function(err) {
							 uploadAttachmentMethod.insertPhotosBrowse(casper, function(err){
								if (!err){
								casper.echo('uploadAttachmentMethod of cameraWebaddress working ', 'INFO');
								}
							});
						});
					}
				});
			});
		});
		
		//test case for reply message generated
		casper.then(function(){
		      uploadAttachmentTest.sendMessage();
		});
		
		 //5(e).Verify with private message(reply section)Insert Photos webaddress
		casper.then(function(){
			casper.thenOpen(config.url, function(){
				casper.echo('******************** case-5(e) ************************', 'INFO');
				casper.echo('Verify with private message(reply section)Insert Photos webaddress', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				uploadAttachmentMethod.messageFromArchieveBox(casper, function(err){
					if (!err){
						casper.echo('uploadAttachmentMethod of messageFromArchieveBox working', 'INFO');
						wait.waitForTime(2000 , casper , function(err) {
							 uploadAttachmentMethod.insertPhotosWebaddress(casper, function(err){
								if (!err){
								casper.echo('uploadAttachmentMethod of cameraWebaddress working ', 'INFO');
								}
							});
						});
					}
				});
			});
		});
		
	});

}
		
/**************************************** Test case of Signature   ************************************/


//1.test case for verify with signature attachment from Member Registration page
uploadAttachmentTest.memberRegistrationPage= function() {
     // need message
	casper.then(function(){
	
		//Field Signature setting in Default Registration Option(Backend)
		casper.thenOpen(config.url, function() {
			casper.echo('******************** case-1 ************************', 'INFO');
			casper.echo('Field Signature setting in Default Registration Option', 'INFO');
			casper.echo('********************************************', 'INFO');
			
			uploadAttachmentMethod.defaultSignatureSetting(casper,casper.test, function(err){
				if (!err)
				casper.echo('uploadAttachmentMethod-defaultSignatureSetting application run', 'INFO');
			});
			
				
		});
		
	    //1(a).Verify with signature attachment image webaddress
		casper.then(function(){
			casper.thenOpen(config.url, function(){
				casper.echo('******************** case-1(a) ************************', 'INFO');
				casper.echo('Verify with signature attachment camera browse', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				wait.waitForElement('.pull-right a[href="/register/register"]', casper, function(err, isExist) {
					if(!err){
						if(isExist) {
							casper.test.assertExists('.pull-right a[href="/register/register"]');
							casper.click('.pull-right a[href="/register/register"]');
							casper.echo('Successfully open register form.....', 'INFO');
							
							wait.waitForElement('form[name="PostTopic"]', casper, function(err, isExist) {
								if(!err){
									if(isExist) {
									 
									   casper.test.assertExists('#signature');
									   casper.click('#signature');
									   	wait.waitForTime(2000 , casper , function() {
										     casper.test.assertExists('#image_button_signature');
									         casper.click('#image_button_signature');
											 wait.waitForTime(2000 , casper , function() {
												 casper.test.assertExists('#web');
												 casper.click('#web');
												 casper.sendKeys('input[name="fname"]', 'https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/thumb/16748462');	
								                 casper.click('button#btn btn-primary');
											});	
										});							   
									} else {
										casper.echo('User didn\'t not found any Member Registration form link', 'ERROR');
									}
								}
							});
						} else {
							casper.echo('User didn\'t not found any register link', 'ERROR');
						}
					}
				});
			});
		});
		
		 //1(b).Verify with signature attachment 
		casper.then(function(){
			casper.thenOpen(config.url, function(){
				casper.echo('******************** case-1(b) ************************', 'INFO');
				casper.echo('Verify with signature attachment camera webaddress', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				wait.waitForElement('.pull-right a[href="/register/register"]', casper, function(err, isExist) {
					if(!err){
						if(isExist) {
							casper.test.assertExists('.pull-right a[href="/register/register"]');
							casper.click('.pull-right a[href="/register/register"]');
							casper.echo('Successfully open register form.....', 'INFO');
						
							wait.waitForElement('form[name="PostTopic"]', casper, function(err, isExist) {
								if(!err){
									if(isExist) {
									  
									   casper.test.assertExists('#signature');
									   casper.click('#signature');
									   	wait.waitForTime(2000 , casper , function() {
										     casper.test.assertExists('#mceu_10');
									         casper.click('#mceu_10');
										});							   
									} else {
										casper.echo('User didn\'t not found any Member Registration form link', 'ERROR');
									}
								}
							});
						} else {
							casper.echo('User didn\'t not found any register link', 'ERROR');
						}
					}
				});
			});
		});
	});

}

//2.test case for verify with signature attachment from edit profile page
uploadAttachmentTest.editProfilePage= function() {
     // need message
	casper.then(function(){
	
	    //2(a).Verify with signature attachment image webaddress
		casper.then(function(){
			casper.thenOpen(config.url, function(){
				casper.echo('******************** case-1(a) ************************', 'INFO');
				casper.echo('Verify with signature attachment camera browse', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForTime(1000 , casper , function(err) {
							wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
								if(!err){
									if(isExist) {
										casper.test.assertExists('ul.nav.pull-right span.caret');
										casper.click('ul.nav.pull-right span.caret');
										casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
										casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
										wait.waitForElement('form[name="PostTopic"]', casper, function(err, isExist) {
											if(!err){
												if(isExist) {
													
													casper.test.assertExists('#signature');
													casper.click('#signature');
													wait.waitForTime(2000 , casper , function() {
														 casper.test.assertExists('#image_button_signature');
														 casper.click('#image_button_signature');
														 wait.waitForTime(2000 , casper , function() {
															 casper.test.assertExists('#web');
															 casper.click('#web');
															 casper.sendKeys('input[name="fname"]', 'https://s3.amazonaws.com/betafiles.websitetoolbox.com/117/thumb/16748462');	
															 casper.click('button#insert_image_btn');
														});	
													});		
													forumLoginMethod.logoutFromApp(casper, function(err){
														if (!err)
														casper.echo('Successfully logout from application', 'INFO');
													});								
												} else {
												casper.echo('User didn\'t not found any Edit Profile form link', 'ERROR');
												}
											}
										});										   
									} else {
									casper.echo('User didn\'t not found any  link', 'ERROR');
									}
								}
							});	
						});								
					}
				});	
			});
		});
	});

}

/**************************************** Test case of  User Account off cases   ************************************/


//test case for backend setting User Account off cases 
uploadAttachmentTest.backendSettingUserAccount= function() {
	casper.then(function(){
		casper.thenOpen(config.url, function() {
			casper.echo('******************** User Account off cases  ************************', 'INFO');
			casper.echo('test case for backend setting User Account off cases ', 'INFO');
			casper.echo('********************************************', 'INFO');
			casper.echo('Title of the page :' +this.getTitle(), 'INFO');
			uploadAttachmentMethod.userAccountSettings(false,casper,casper.test,function(err){
				if(!err){
				   casper.echo('uploadAttachmentMethod of userAccountSettings working','INFO');
				}
			});
		});
	});

}  















