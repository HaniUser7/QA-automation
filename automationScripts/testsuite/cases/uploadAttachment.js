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
		casper.echo('********************************************', 'INFO');

		uploadAttachmentMethod.backEndSetting(casper, function(err) {
			if(!err){
				casper.echo('registerSettingMethod of backEndSetting run sucessful')
			}
		});

	});

}



	

//1.test case for verify with upload avatar from registration page(verify it from )
uploadAttachmentTest.avatarFromRegistration= function() {
	
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
						casper.capture(screenShotsDir + '11.png');
						wait.waitForElement('form[name="PostTopic"]', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
								   casper.capture(screenShotsDir + '12.png');
								   casper.test.assertExists('input[type="file"]');
						           casper.click('input[type="file"]');
                                  	casper.thenOpen('http://s3.amazonaws.com/files.websitetoolbox.com/200676/3156405' , function(){
										wait.waitForTime(1000 , casper , function(err) {
											casper.capture(screenShotsDir + '13.png');
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

}

//2.test case for verify with upload avatar when you change the avatar after upload on registration page
uploadAttachmentTest.uploadAvatarRegistrationChange= function() {
	
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
						  casper.capture(screenShotsDir + '21.png');
						wait.waitForElement('form[name="PostTopic"]', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
								     casper.capture(screenShotsDir + '22.png');
									 casper.test.assertExists('input[type="file"]');
						             casper.click('input[type="file"]');
                                  	 casper.thenOpen('http://s3.amazonaws.com/files.websitetoolbox.com/200676/3156405' , function(){
										wait.waitForTime(1000 , casper , function(err) {
											casper.capture(screenShotsDir + '23.png');
										});
									});	
                                     casper.test.assertExists('input[type="file"]');
						             casper.click('input[type="file"]');
                                    	casper.thenOpen('http://s3.amazonaws.com/files.websitetoolbox.com/200676/3156405' , function(){
										wait.waitForTime(1000 , casper , function(err) {
											casper.capture(screenShotsDir + '24.png');
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

}

//3.test case for verify with upload avatar when you change the avatar after upload on  edit profile page
uploadAttachmentTest.uploadAvatarEditProfileChange= function() {
	
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
													casper.capture(screenShotsDir + '31.png');
													casper.test.assertExists('input[type="file"]');
						                            casper.click('input[type="file"]');
													casper.thenOpen('http://s3.amazonaws.com/files.websitetoolbox.com/200676/3156405' , function(){
														wait.waitForTime(1000 , casper , function(err) {
														casper.capture(screenShotsDir + '32.png');
														});
													});	
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
}

//4.test case for verify with upload avatar when you upload avatar after deleting it on registration page
uploadAttachmentTest.uploadAvatarRegistrationDeleting= function() {
	
		casper.thenOpen(config.url, function() {
			casper.echo('******************** case-7 ************************', 'INFO');
			casper.echo('verify with upload avatar when you upload avatar after deleting it on registration page', 'INFO');
			casper.echo('********************************************', 'INFO');
			casper.echo('Title of the page :' +this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a[href="/register/register"]', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a[href="/register/register"]');
						casper.click('.pull-right a[href="/register/register"]');
						casper.echo('Successfully open register form.....', 'INFO');
						  casper.capture(screenShotsDir + '41.png');
						wait.waitForElement('form[name="PostTopic"]', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
								   casper.capture(screenShotsDir + '42.png');
								   casper.test.assertExists('input[type="file"]');
						           casper.click('input[type="file"]');
                                  	casper.thenOpen('http://s3.amazonaws.com/files.websitetoolbox.com/200676/3156405' , function(){
										wait.waitForTime(1000 , casper , function(err) {
											casper.capture(screenShotsDir + '42.png');
										});
									});	
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

}

//5.test case for verify with upload avatar when you upload  avatar after deleting it on edit profile page
uploadAttachmentTest.uploadAvatarEditProfileDeleting= function() {
	
	casper.thenOpen(config.url, function() {
		casper.echo('******************** case-7 ************************', 'INFO');
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
													casper.capture(screenShotsDir + '51.png');
													casper.test.assertExists('input[type="file"]');
						                            casper.click('input[type="file"]');
														casper.thenOpen('http://s3.amazonaws.com/files.websitetoolbox.com/200676/3156405' , function(){
														wait.waitForTime(1000 , casper , function(err) {
														casper.capture(screenShotsDir + '52.png');
														});
													});	
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
}

//6.test case for verify upload avatar for the first time on profile page(with registration new)
uploadAttachmentTest.uploadAvatarProfile= function() {
	
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
													casper.capture(screenShotsDir + '53.png');
													casper.thenOpen('http://s3.amazonaws.com/files.websitetoolbox.com/200676/3156405' , function(){
														wait.waitForTime(1000 , casper , function(err) {
															casper.capture(screenShotsDir + '61.png');
														});
													});	
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
}

//7.test case for verify upload avatar on profile page again when you already upload a avatar
uploadAttachmentTest.uploadAvatarProfileAgain= function() {
	
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
													casper.capture(screenShotsDir + '71.png');
													casper.thenOpen('http://s3.amazonaws.com/files.websitetoolbox.com/200676/3156405' , function(){
														wait.waitForTime(1000 , casper , function(err) {
															casper.capture(screenShotsDir + '72.png');
														});
														
													});	
													 wait.waitForElement('div#change_Avatar', casper, function(err, isExist) {
														if(!err){
															if(isExist) {
																casper.capture(screenShotsDir + '73.png');
																casper.thenOpen('http://s3.amazonaws.com/files.websitetoolbox.com/200676/3156406' , function(){
																	wait.waitForTime(1000 , casper , function(err) {
																		casper.capture(screenShotsDir + '74.png');
																	});
																	
																});	
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
}

//8.test case for verify upload avatar on profile page after remove the already uploaded avatar.
uploadAttachmentTest.uploadAvatarProfileRemove= function() {
	
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
													casper.capture(screenShotsDir + '81.png');
													casper.thenOpen('http://s3.amazonaws.com/files.websitetoolbox.com/200676/3156405' , function(){
														wait.waitForTime(1000 , casper , function(err) {
															casper.capture(screenShotsDir + '82.png');
														});
														
													});	
													 casper.test.assertExists('div#change_Avatar');
													 casper.click('div#change_Avatar');
													casper.thenOpen('http://s3.amazonaws.com/files.websitetoolbox.com/200676/3156406' , function(){
														wait.waitForTime(1000 , casper , function(err) {
															casper.capture(screenShotsDir + '83.png');
														});
														
													});	
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
/*
//10.test case for verify with use my facebook avatar option
uploadAttachmentTest.uploadAvatarFacebookEnable= function() {
	
		
	
}
*/



//11.test case for verify with use my facebook avatar option(error)
uploadAttachmentTest.uploadAvatarFacebookOption= function() {
	
    casper.thenOpen(config.url, function() {
			casper.echo('******************** case-10 ************************', 'INFO');
			casper.echo('verify with use my facebook avatar option', 'INFO');
			casper.echo('********************************************', 'INFO');
			casper.echo('Title of the page :' +this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a[href="/register/register"]', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a[href="/register/register"]');
						casper.click('.pull-right a[href="/register/register"]');
						casper.echo('Successfully open register form.....', 'INFO');
						casper.capture(screenShotsDir + '11.png');
						wait.waitForElement('form[name="PostTopic"]', casper, function(err, isExist) {
							if(!err){
								if(isExist) {			
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
												casper.wait(1000, function() {
													casper.capture(screenShotsDir + '101.png');
												});
											}
											
										});
										if (responseData.errorType == "success") {
											casper.wait(5000, function() {
												casper.capture(screenShotsDir + '102.png');
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
		});
	
}

//12.test case for verify with upload avavtar when none option is enable(testcase related 11)
uploadAttachmentTest.uploadAvatarFacebookOption= function() {	
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
									//log in related pop issue
										wait.waitForElement('form[name="PostTopic"]', casper, function(err, isExist) {
											if(!err){
												if(isExist) {
												   casper.capture(screenShotsDir + '12.png');
												   casper.test.assertExists('input[type="file"]');
												   casper.click('input[type="file"]');
													casper.thenOpen('http://s3.amazonaws.com/files.websitetoolbox.com/200676/3156405' , function(){
														wait.waitForTime(1000 , casper , function(err) {
															casper.capture(screenShotsDir + '13.png');
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
					} else {
						casper.echo('User didn\'t not found any register link', 'ERROR');
					}
				}
			});
		});
			
		
	
}


//13.test case for verify with upload avavtar on profile pagewhen use face book  is enable
uploadAttachmentTest.uploadAvatarFacebookOption= function() {
		
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
									//log in related pop issue
										wait.waitForElement('form[name="PostTopic"]', casper, function(err, isExist) {
											if(!err){
												if(isExist) {
												   casper.capture(screenShotsDir + '12.png');
												   casper.test.assertExists('input[type="file"]');
												   casper.click('input[type="file"]');
													casper.thenOpen('http://s3.amazonaws.com/files.websitetoolbox.com/200676/3156405' , function(){
														wait.waitForTime(1000 , casper , function(err) {
															casper.capture(screenShotsDir + '13.png');
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
					} else {
						casper.echo('User didn\'t not found any register link', 'ERROR');
					}
				}
			});
			casper.then(function(){
				registerTests.validInfo()	
			});
			casper.then(function(){
			  // verify upload avatar for the first time on profile page
                uploadAttachmentTest.uploadAvatarProfile();	
			});
			
		});
		
		
}










	
						


























