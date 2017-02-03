'use strict';
var wait = require('../wait.js');
var forumLoginMethod = require('../methods/login.js');
var composeTopicMethod = require('../methods/composeTopic.js');
var registerMethod = require('../methods/register.js');
var json = require('../../testdata/loginData.json');
var data = require('../../testdata/composeTopic.json');
var registerTests = require('./register.js');
var composeTopicTest=module.exports = {};
var errorMessage = "";


/**************************** Test case for basic need composeTopic *********************/

//1.Test case for create register user
composeTopicTest.createRegisterUser= function() {
       
	casper.then(function(){  /* Uncessary use of then*/
		
		//backend setting in captchaRegistration
		casper.then(function(){
			casper.echo(' ****   1.Method captchaRegistration            ', 'INFO');
			casper.echo('************************************************', 'INFO');
			composeTopicMethod.captchaRegistration(casper, casper.test, function(err) {
				if(!err){
					casper.echo('composeTopicMethod captchaRegistration working', 'INFO');
				}
			});
		});
		
		//backend setting in registration
		casper.then(function(){
			registerTests.userAccountsEnable();
		});
                
		//1.1 Test case for create registration for register user
		casper.then(function(){
			casper.echo('************************************************', 'INFO');
			casper.echo('1.1 register user(registration for register user)', 'INFO');
			casper.echo('*************************************************', 'INFO');
			registerMethod.registerToApp(data['validInfoRegister'], casper, function(err) {
				if(!err) {
					casper.echo('Processing to registration on forum.....', 'INFO');
					casper.wait(3000,function(){
						registerMethod.redirectToLogout(casper, casper.test, function(err) {
						    if(!err) {
								casper.echo('User logout successfully', 'ERROR');
							}
						});
					});
				}
			});
		});

		//1.2 Test case for backend setting  for enable user as register user 
		casper.then(function(){
			casper.echo('***************************************************', 'INFO');
			casper.echo('1.2 register user(backend enable for register user)', 'INFO');
			casper.echo('***************************************************', 'INFO');
			composeTopicMethod.enableUser('rajan41','Registered Users',casper, function(){
				casper.echo('enableUserRegister working', 'INFO');
			});
		});
	});
}

//2.Test case for create admin user
composeTopicTest.createAdminUser= function() {
       
	casper.then(function(){  

		//2.1 Test case for create registration for Admin user
        casper.then(function(){  
			casper.thenOpen(config.url, function() {
				casper.echo('*******************************************', 'INFO');
				casper.echo('2.1 Admin user(registration for Admin user)', 'INFO');
				casper.echo('*******************************************', 'INFO');
				casper.wait(2000,function(){/* Uncessary use of wait*/
					wait.waitForElement('a[href="/register/register"]', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.test.assertExists('a[href="/register/register"]');
								casper.click('a[href="/register/register"]');
								casper.echo('Successfully open register form.....', 'INFO');
								casper.wait(3000,function(){
									registerMethod.registerToApp(data['validInfoAdmin'], casper, function(err) {
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
							}else {
								casper.echo('registration link not found','ERROR');
							}
						}
					});	
				});
			});
        });

		//2.2 Test case for backend setting  for enable user as  Admin user
		casper.then(function(){
			casper.echo('*********************************************', 'INFO');
			casper.echo('1.2 Admin user(backend enable for Admin user)', 'INFO');
			casper.echo('*********************************************', 'INFO');
			composeTopicMethod.enableUser('sangita','Administrators', casper, function(err){
			    if(err){
				     casper.echo('enableUser working', 'INFO');
				}
			});
		});

	});
}

//3.Test case for create register user
composeTopicTest.backendSetting= function() {
       
	casper.then(function(){ 
		
		casper.then(function(){ 
		    casper.echo(' ****   1.categories          ', 'INFO');
			composeTopicMethod.createCategories('categories2',casper,casper.test,function(err) {
				if(!err){
					casper.echo('composeTopicMethod captchaRegistration working', 'INFO');
					}
			});
		});
	
		casper.then(function(){ 
			casper.echo(' ****   2.categories          ', 'INFO');
			composeTopicMethod.createCategories('categories1',casper,casper.test,function(err) {
				if(!err){
					casper.echo('composeTopicMethod captchaRegistration working', 'INFO');
					}
			});
		});
	});
}



	
/**************************** Test case for composeTopic *********************/


//1.Test case for Add New Topic with selecting category and verify message
composeTopicTest.addNewTopicSelectingCategory= function() {
	casper.then(function(){
		casper.thenOpen(config.url, function() {
			casper.echo('                            case-1                      ', 'INFO');
			casper.echo(' Add New Topic with selecting category and verify message', 'INFO');
			casper.echo('*********************************************************', 'INFO');
			casper.echo('Title of the page :' +this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
				if(!err) {
					casper.echo('login by valid username and password and verify error message', 'INFO');
                    casper.wait(2000,function(){
						wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
									composeTopicMethod.startTopic(true,false,false,data['Topicmessage'],casper,function(err){
										if(!err){
											wait.waitForElement('div#ajax_subscription_vars div div:nth-child(4) span', casper, function(err, isExist) {
												if(!err){
													if(isExist) {
														casper.test.assertExists('div#ajax_subscription_vars div div:nth-child(4) span');
														var sub = casper.fetchText('div#ajax_subscription_vars div div:nth-child(4) span');
														casper.echo('subject :'+sub,'INFO');													
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err){
																casper.echo('Successfully logout from application', 'INFO');
															}
														});
													}else{
														casper.echo('Message not be generated', 'ERROR');
													}
                                                }													
											});
										}
									});						   
								}else{
									casper.echo('Start New Topic link Found', 'ERROR');
								}
							}
						});
                    });		  
				}
			});
		});
	});
}

//2.test case for Add New Topic with hindi text and verify message
composeTopicTest.addNewTopicHindiText= function() {
	casper.then(function(){/* Uncessary use of then*/
		casper.thenOpen(config.url, function() {
			casper.echo('                   case-2                                      ', 'INFO');
			casper.echo(' test case for Add New Topic with hindi text and verify message', 'INFO');
			casper.echo('***************************************************************', 'INFO');
			casper.echo('Title of the page :' +this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
				if(!err) {
					casper.echo('login by valid username and password and verify error message', 'INFO');
					wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
								composeTopicMethod.startTopic(true,false,false,data['TopicHindiMessage'],casper,function(err){
									if(!err){
										wait.waitForElement('div#ajax_subscription_vars div div:nth-child(4) span', casper, function(err, isExist) {
										    if(!err){
												if(isExist) {
													casper.test.assertExists('div#ajax_subscription_vars div div:nth-child(4) span');
													var sub = casper.fetchText('div#ajax_subscription_vars div div:nth-child(4) span');
													casper.echo('subject :'+sub,'INFO');													
													forumLoginMethod.logoutFromApp(casper, function(err){
														if (!err){
															casper.echo('Successfully logout from application', 'INFO');
														}
													});
											    }else{
													casper.echo('Start New Topic link Found', 'ERROR');
												}
											}													
										});
									}
								});						   
							}else{
								 casper.echo('Start New Topic link Found', 'ERROR');
							}
						}
					});		  
				}
			});
		});
	});
}

//3.test case for Verify Post preview with entered message
composeTopicTest.postPreviewEnteredMessage= function() {
	casper.then(function(){/* Uncessary use of then*/
		casper.thenOpen(config.url, function() {
			casper.echo('                   case-3                    ', 'INFO');
			casper.echo(' test case for Verify Post preview with entered message', 'INFO');
			casper.echo('********************************************', 'INFO');
			casper.echo('Title of the page :' +this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
				if(!err) {
					casper.echo('login by valid username and password and verify error message', 'INFO');
					wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
								casper.click('a.pull-right.btn.btn-uppercase.btn-primary ');
								casper.waitForSelector('div.post-body.pull-left',function success() {    							
									casper.sendKeys('input[name="subject"]','khan',{reset:true});								
									casper.withFrame('message_ifr', function() {
										casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
										casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
										casper.sendKeys('#tinymce','Verify Post preview with entered message');
									});
									casper.waitForSelector('#all_forums_dropdown', function success() {
										casper.click('#all_forums_dropdown');
										casper.fill('form[name="PostTopic"]',{
											'forum' : 'categories1'
										},false);
										casper.then(function() {
											casper.click('#previewpost_sbt');
											var res = casper.evaluate(function(){
												var element =document.querySelector('span#first_coloumn_ div div div span');
												return element.innerHTML;
											});
											casper.echo('post_message :' +res,'INFO');
                                            casper.wait(3000 ,function() {
												forumLoginMethod.logoutFromApp(casper, function(err){
													if (!err){
														casper.echo('Successfully logout from application', 'INFO');
													}
												});
                                            });
										});
									}, function fail() {
										casper.waitForSelector('#previewpost_sbt',function success() {							
											casper.test.assertExists('#previewpost_sbt');
											casper.click('#previewpost_sbt');
										},function fail() {
											casper.echo('Unable to submit form','ERROR');
										});
									});
								},function fail(){
									casper.echo('Unable to Open Form To Start Topic','ERROR');
								});
							}else{
								 casper.echo('Start New Topic link Found', 'ERROR');
							}
						}
					});		  
				}
			});
			
		});
	});
}

//4.test case for Verify Post preview with image of entered message
composeTopicTest.postPreviewImage= function() {
	casper.then(function(){/* Uncessary use of then*/
		casper.thenOpen(config.url, function() {
			casper.echo('                   case-4                        ', 'INFO');
			casper.echo(' Verify Post preview with image of entered message', 'INFO');
			casper.echo('**************************************************', 'INFO');
			casper.echo('Title of the page :' +this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
				if(!err) {
					casper.echo('login by valid username and password and verify error message', 'INFO');
					wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.click('a.pull-right.btn.btn-uppercase.btn-primary ');
								casper.waitForSelector('div.post-body.pull-left',function success() {    							
									casper.sendKeys('input[name="subject"]','khan',{reset:true});								
									casper.withFrame('message_ifr', function() {
										casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
										casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
										//casper.sendKeys('#tinymce','hello khan');
									});
									casper.waitForSelector('#all_forums_dropdown', function success() {
										casper.click('#all_forums_dropdown');
										casper.fill('form[name="PostTopic"]',{
											'forum' : 'categories1'
										},false);
										casper.then(function() {
											casper.click('#previewpost_sbt');
										});
									}, function fail() {
										casper.waitForSelector('#previewpost_sbt',function success() {							
											casper.test.assertExists('#previewpost_sbt');
											casper.click('#previewpost_sbt');
												var res = casper.evaluate(function(){
												var element =document.querySelector('span#first_coloumn_ div div div span');
												return element.innerHTML;
											});
											casper.echo('post_message :' +res,'INFO');
										},function fail() {
											casper.echo('Unable to submit form','ERROR');
										});
									});
								},function fail(){
									casper.echo('Unable to Open Form To Start Topic','ERROR');
								});
							}else{
								 casper.echo('Start New Topic link Found', 'ERROR');
							}
						} 
					});		  
				}
			});
			casper.then(function(){
			 	forumLoginMethod.logoutFromApp(casper, function(err){
					if (!err){
						casper.echo('Successfully logout from application', 'INFO');
					}
				});
			});
		});
	});
}

//5.test case for Verify Error message after entering message more than 65000 charecters while adding new Topic
composeTopicTest.errorMessageMoreCharecters= function() {
	casper.then(function(){
		casper.thenOpen(config.url, function() {
			casper.echo('                   case-5                    ', 'INFO');
			casper.echo(' Add New Topic with selecting category and verify message', 'INFO');
			casper.echo('********************************************', 'INFO');
			casper.echo('Title of the page :' +this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
				if(!err) {
					casper.echo('login by valid username and password and verify error message', 'INFO');
					wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
							    casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
								composeTopicMethod.startTopic(true,false,false,data['topicMoreMessage'],casper,function(err){
									if(!err){
										var res = casper.evaluate(function(){
											var element =document.querySelector('div.alert.alert-danger.text-center');
											return element.innerHTML;
										});
										casper.echo('post_message :' +res,'INFO');
										forumLoginMethod.logoutFromApp(casper, function(err){
											if (!err){
												casper.echo('Successfully logout from application', 'INFO');
											}
										});
									}
								});						   
							}else{
								 casper.echo('Start New Topic link Found', 'ERROR');
							}
						}
					});		  
				}
			});
		});
	});
}



/**************************** Test case for Compost Topic (Make sure 'Post approval' is disabled)  *********************/


//6.test case for Verify Compost Topic on Category Listing Page(For Guest/Registered User/Admin)
composeTopicTest.compostTopicCategoryListingPage= function() {
   
   casper.then(function(){	
     
		//Test case for Verify Compost Topic on Category Listing Page(BackendSetting)
		casper.then(function(){
		    casper.echo(' **** 6. BackendSetting(Make sure Post approval is disabled)  ****   ', 'INFO');
			composeTopicMethod.backendSettingCompostTopic(casper, casper.test, function(err) {
				if(!err){
				   casper.echo('composeTopicMethod backendSettingCompostTopic working', 'INFO');
				}
			});
		});
		
		//.Test case for Verify Compose Post Options backend Setting
		  casper.then(function(){
		    casper.echo('***6.Verify Compose Post Options backend Setting', 'INFO');
			composeTopicMethod.compostTopic(true,casper, casper.test, function(err) {
				if(!err){
				   casper.echo('composeTopicMethod backendSettingCompostTopic working', 'INFO');
				}
			});
		});
		
		//6(a).test case for Verify Compost Topic on Category Listing Page(Admin)
	    casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                   case-6-a(Admin)            ', 'INFO');
				casper.echo(' Verify Compost Topic on Category Listing Page', 'INFO');
				casper.echo('**********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('div#topics ul li:nth-child(2) a', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.test.assertExists('div#topics ul li:nth-child(2) a');
									casper.click('div#topics ul li:nth-child(2) a');
								    wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary', casper, function(err, isExist) {
										if(!err){
											if(isExist) {
											    casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
												composeTopicMethod.startTopic(true,false,false,data['Topicmessage'],casper,function(err){
													if(!err){
														wait.waitForElement('div#ajax_subscription_vars div div:nth-child(4) span', casper, function(err, isExist) {
															if(!err){
																if(isExist) {
																	casper.test.assertExists('div#ajax_subscription_vars div div:nth-child(4) span');
																	var sub = casper.fetchText('div#ajax_subscription_vars div div:nth-child(4) span');
																	casper.echo('subject :'+sub,'INFO');													
																	forumLoginMethod.logoutFromApp(casper, function(err){
																		if (!err){
																			casper.echo('Successfully logout from application', 'INFO');
																		}
																	});
																}else{
																	casper.echo('Message not be generated', 'ERROR');
																}
															}													
														});
													}
												});						   
											}else{
												 casper.echo(' Start New Topic Link Not Found', 'ERROR');
											}
										}
									});						   
								}else{
									 casper.echo('Categories Link Not Found', 'ERROR');
								}
							}
						});		  
					}
				});
			});
		});
		
		//6(b).test case for Verify Compost Topic on Category Listing Page(Registered User)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                   case-6-b(Registered User)  ', 'INFO');
				casper.echo(' Verify Compost Topic on Category Listing Page', 'INFO');
				casper.echo('**********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['Valid'].username, json['Valid'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('div#topics ul li:nth-child(2) a', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.test.assertExists('div#topics ul li:nth-child(2) a');
									casper.click('div#topics ul li:nth-child(2) a');
									wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary', casper, function(err, isExist) {
										if(!err){
											if(isExist) {
											    casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
												composeTopicMethod.startTopic(true,false,false,data['Topicmessage'],casper,function(err){
													if(!err){
														wait.waitForElement('div#ajax_subscription_vars div div:nth-child(4) span', casper, function(err, isExist) {
															if(!err){
																if(isExist) {
																	casper.test.assertExists('div#ajax_subscription_vars div div:nth-child(4) span');
																	var sub = casper.fetchText('div#ajax_subscription_vars div div:nth-child(4) span');
																	casper.echo('subject :'+sub,'INFO');													
																	forumLoginMethod.logoutFromApp(casper, function(err){
																		if (!err){
																			casper.echo('Successfully logout from application', 'INFO');
																		}
																	});
																}else{
																	casper.echo('Message not be generated', 'ERROR');
																	forumLoginMethod.logoutFromApp(casper, function(err){
																		if (!err){
																			casper.echo('Successfully logout from application', 'INFO');
																		}
																	});
																}
															}													
														});
													}
												});						   
											}else{
												 casper.echo('Start New Topic Link Not Found', 'ERROR');
											}
										}
									});						   
								}else{
									 casper.echo('Categories  Link Not Found', 'ERROR');
								}
							}
						});		  
					}
				});
			});
		});
		
		//Test case for Verify Compost Topic on Category Listing Page(BackendSetting)
		casper.then(function(){
			
			casper.echo('********   6.Method topicViewSetting ****** ', 'INFO');
			casper.echo('********************************************', 'INFO');
			composeTopicMethod.topicViewSetting(casper, casper.test, function(err) {
				if(!err){
					casper.echo('topicViewSetting working', 'INFO');
				}
			});
		});
	
		//6(c).test case for Verify Compost Topic on Category Listing Page(For Guest)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                   case-6-c(For Guest)        ', 'INFO');
				casper.echo(' Verify Compost Topic on Category Listing Page', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				wait.waitForElement('div#topics ul li:nth-child(2) a', casper, function(err, isExist) {
					if(!err){
						if(isExist) {
						  casper.test.assertExists('div#topics ul li:nth-child(2) a');
						  casper.click('div#topics ul li:nth-child(2) a');
						  wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary', casper, function(err, isExist) {
								if(!err){
									if(isExist) {
									    casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
										casper.waitForSelector('div.post-body.pull-left',function success() { 
											casper.withFrame('message_ifr', function() {
												casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
												casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
												casper.sendKeys('#tinymce','Compost Topic on Category Listing Page For Guest');
											});
											casper.fill('form[name="PostTopic"]',{
												'name' : 'sahil',
												'email' : 'sahil@gmail.com',
												'subject':'For Guest',
												'forum' : 'categories1'
											},false);
											casper.then(function() {
												casper.click('#post_submit');
											});
										});
									}else{
										 casper.echo('Start New Topic link Found', 'ERROR');
									}
									
								}
							});	
						}else{
							 casper.echo('Categories Link Not Found', 'ERROR');
						}
					}
				});	
			});
		});
	});	
}

//7.test case for Verify Compost Topic on Topic Listing Page(For Guest/Registered User/Admin)
composeTopicTest.compostTopicListingPage= function() {
   
   casper.then(function(){	
      
		//7(a).test case for Verify Compost Topic on Topic Listing Page(Admin)
	    casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                   case-7-a(Admin)         ', 'INFO');
				casper.echo(' Verify Compost Topic on Topic Listing Page', 'INFO');
				casper.echo('*******************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
								    casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
									composeTopicMethod.startTopic(true,false,false,data['Topicmessage'],casper,function(err){
										if(!err){
											wait.waitForElement('div#ajax_subscription_vars div div:nth-child(4) span', casper, function(err, isExist) {
												if(!err){
													if(isExist) {
														casper.test.assertExists('div#ajax_subscription_vars div div:nth-child(4) span');
														var sub = casper.fetchText('div#ajax_subscription_vars div div:nth-child(4) span');
														casper.echo('subject :'+sub,'INFO');													
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err){
																casper.echo('Successfully logout from application', 'INFO');
															}
														});
													}else{
														casper.echo('Message not be generated', 'ERROR');
													}
                                                }													
											});
										}
									});						   
								}else{
									 casper.echo('Start New Topic link Found', 'ERROR');
								}
								
							}
						});		  
					}
				});
			});
		});
		
		//7(b).test case for Verify Compost Topic on Topic Listing Page(Registered User)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('               case-7-b(Registered User)   ', 'INFO');
				casper.echo(' Verify Compost Topic on Topic Listing Page', 'INFO');
				casper.echo('*******************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['Valid'].username, json['Valid'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
								    casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
									composeTopicMethod.startTopic(true,false,false,data['Topicmessage'],casper,function(err){
										if(!err){
											wait.waitForElement('div#ajax_subscription_vars div div:nth-child(4) span', casper, function(err, isExist) {
												if(!err){
													if(isExist) {
														casper.test.assertExists('div#ajax_subscription_vars div div:nth-child(4) span');
														var sub = casper.fetchText('div#ajax_subscription_vars div div:nth-child(4) span');
														casper.echo('subject :'+sub,'INFO');													
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err){
																casper.echo('Successfully logout from application', 'INFO');
															}
														});
													}else{
														casper.echo('Message not be generated', 'ERROR');
													}
                                                }													
											});
										}
									});						   
								}else{
									 casper.echo('Start New Topic link Found', 'ERROR');
								}
							}
						});		  
					}
				});
			});
		});
		
		//7(c).test case for Verify Compost Topic on Topic Listing Page(For Guest)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                   case-7-c(For Guest)     ', 'INFO');
				casper.echo(' Verify Compost Topic on Topic Listing Page', 'INFO');
				casper.echo('*******************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary', casper, function(err, isExist) {
					if(!err){
					    if(isExist) {
						    casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
							casper.waitForSelector('div.post-body.pull-left',function success() { 
							   	casper.withFrame('message_ifr', function() {
									casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
									casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
									casper.sendKeys('#tinymce','hello my name is khan');
								});
							    casper.fill('form[name="PostTopic"]',{
									'name' : 'sahil',
									'email' : 'sahil@gmail.com',
									'subject':'topic-data',
									'forum' : 'categories1'
								},false);
								casper.then(function() {
									casper.click('#post_submit');
								});
							});
						}else{
							 casper.echo('Start New Topic link Found', 'ERROR');
						}
					}
				});	
			});
		});
	
	});	
}

//8.test case for Verify Compost Topic on Topic Listing Page(For Guest/Registered User/Admin)
composeTopicTest.compostTopicLatestTopicPage= function() {
   
   casper.then(function(){	
      
		//8(a).test case for Verify Compost Topic on Topic Listing Page(Admin)
	    casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                   case-8-a(Admin)                       ', 'INFO');
				casper.echo(' test case for Verify Compost Topic on Topic Listing Page', 'INFO');
				casper.echo('*********************************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
								    casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
									composeTopicMethod.startTopic(true,false,false,data['Topicmessage'],casper,function(err){
										if(!err){
											wait.waitForElement('div#ajax_subscription_vars div div:nth-child(4) span', casper, function(err, isExist) {
												if(!err){
													if(isExist) {
														casper.test.assertExists('div#ajax_subscription_vars div div:nth-child(4) span');
														var sub = casper.fetchText('div#ajax_subscription_vars div div:nth-child(4) span');
														casper.echo('subject :'+sub,'INFO');													
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err){
																casper.echo('Successfully logout from application', 'INFO');
															}
														});
													}else{
														casper.echo('Message not be generated', 'ERROR');
													}
                                                }													
											});
										}
									});						   
								}else{
									 casper.echo('Start New Topic link Found', 'ERROR');
								}
							}
						});		  
					}
				});
			});
		});
		
		//8(b).test case for Verify Compost Topic on Topic Listing Page(Registered User)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                   case-8-b(Registered User)             ', 'INFO');
				casper.echo(' test case for Verify Compost Topic on Topic Listing Page', 'INFO');
				casper.echo('*********************************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['Valid'].username, json['Valid'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
								    casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
									composeTopicMethod.startTopic(true,false,false,data['Topicmessage'],casper,function(err){
										if(!err){
											wait.waitForElement('div#ajax_subscription_vars div div:nth-child(4) span', casper, function(err, isExist) {
												if(!err){
													if(isExist) {
														casper.test.assertExists('div#ajax_subscription_vars div div:nth-child(4) span');
														var sub = casper.fetchText('div#ajax_subscription_vars div div:nth-child(4) span');
														casper.echo('subject :'+sub,'INFO');													
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err){
																casper.echo('Successfully logout from application', 'INFO');
															}
														});
													}else{
														casper.echo('Message not be generated', 'ERROR');
													}
                                                }													
											});
										}
									});						   
								}else{
									 casper.echo('Start New Topic link Found', 'ERROR');
								}
							}
						});		  
					}
				});
			});
		});
		
		//8(c).test case for Verify Compost Topic on Topic Listing Page(For Guest)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                   case-8-c(For Guest)                   ', 'INFO');
				casper.echo(' test case for Verify Compost Topic on Topic Listing Page', 'INFO');
				casper.echo('*********************************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary', casper, function(err, isExist) {
					if(!err){
						if(isExist) {
						    casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
							casper.waitForSelector('div.post-body.pull-left',function success() { 
							   	casper.withFrame('message_ifr', function() {
									casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
									casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
									casper.sendKeys('#tinymce','hello raj day for .....');
								});
							    casper.fill('form[name="PostTopic"]',{
									'name' : 'Darpan',
									'email' : 'Darpan@gmail.com',
									'subject':'topic-data',
									'forum' : 'categories1'
								},false);
								casper.then(function() {
									casper.click('#post_submit');
								});
							});
						}else{
						    casper.echo('Start New Topic link Found', 'ERROR');
						}
					}
				});	
			});
		});
	
	});	
}

//9.test case for Verify Compose Topic when there is no topic available(For Guest/Registered User/Admin)
composeTopicTest.composeTopicNoTopicAvailable= function() {
   
   casper.then(function(){	
         
		  //9.test case for Verify Compose Topic when there is no topic available(Delete topic)
		casper.then(function(){
			composeTopicMethod.deleteTopic(casper,function(err){
				if (!err){
					 casper.echo('deleteTopic working', 'INFO');
				}
			});
		});
		 
		//9(a).test case for Verify Compose Topic when there is no topic available(Admin topic)
	    casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                   case-9-a(Admin)                  ', 'INFO');
				casper.echo(' test case for Verify Compose Topic when there is no topic available', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						casper.wait(2000, function() {   
							wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary', casper, function(err, isExist) {
								if(!err){
									if(isExist) {
										casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
										composeTopicMethod.startTopic(true,false,false,data['Topicmessage'],casper,function(err){
											if(!err){
												wait.waitForElement('div#ajax_subscription_vars div div:nth-child(4) span', casper, function(err, isExist) {
													if(!err){
														if(isExist) {
															casper.test.assertExists('div#ajax_subscription_vars div div:nth-child(4) span');
															var sub = casper.fetchText('div#ajax_subscription_vars div div:nth-child(4) span');
															casper.echo('subject :'+sub,'INFO');													
															forumLoginMethod.logoutFromApp(casper, function(err){
																if (!err){
																	casper.echo('Successfully logout from application', 'INFO');
																}
															});
														}else{
															casper.echo('Message not be generated', 'ERROR');
														}
													}													
												});
											}
										});						   
									}else {
										casper.echo('Start New Topic link Found', 'ERROR');
									}
								}
							});
                        });						
					}
				});
			});
		});
		  
		//9.test case for Verify Compose Topic when there is no topic available(Delete topic)
		casper.then(function(){
			composeTopicMethod.deleteTopic(casper,function(err){
				if (!err){
					 casper.echo('deleteTopic working', 'INFO');
				}
			});
		});
		
		//9(b).test case for Verify Compose Topic when there is no topic available(Registered User)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                   case-9-b(Registered User)            ', 'INFO');
				casper.echo(' test case for Verify Compose Topic when there is no topic available', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['Valid'].username, json['Valid'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
								    casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
									composeTopicMethod.startTopic(true,false,false,data['Topicmessage'],casper,function(err){
										if(!err){
											wait.waitForElement('div#ajax_subscription_vars div div:nth-child(4) span', casper, function(err, isExist) {
												if(!err){
													if(isExist) {
														casper.test.assertExists('div#ajax_subscription_vars div div:nth-child(4) span');
														var sub = casper.fetchText('div#ajax_subscription_vars div div:nth-child(4) span');
														casper.echo('subject :'+sub,'INFO');													
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err){
																casper.echo('Successfully logout from application', 'INFO');
															}
														});
													}else{
														casper.echo('Message not be generated', 'ERROR');
													}
                                                }													
											});
										}
									});						   
								}else{
									 casper.echo('Start New Topic link Found', 'ERROR');
								}
							}
						});		  
					}
				});
			});
		});
		
		 //9.test case for Verify Compose Topic when there is no topic available(Delete topic)
		casper.then(function(){
			composeTopicMethod.deleteTopic(casper,function(err){
				if (!err){
					casper.echo('deleteTopic working', 'INFO');
				}
			});
		});
		
		//9(c).test case for Verify Compose Topic when there is no topic available(For Guest)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                   case-9-c(For Guest)        ', 'INFO');
				casper.echo(' test case for Verify Compose Topic when there is no topic available', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary', casper, function(err, isExist) {
					if(!err){
						if(isExist) {
						    casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
							casper.waitForSelector('div.post-body.pull-left',function success() { 
							   	casper.withFrame('message_ifr', function() {
									casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
									casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
									casper.sendKeys('#tinymce','this is test case 4c please pass it');
								});
							    casper.fill('form[name="PostTopic"]',{
									'name' : 'hellio',
									'email' : 'hellio@gmail.com',
									'subject':'top-data',
									'forum' : 'categories1'
								},false);
								casper.then(function() {
									casper.click('#post_submit');
								});
							});
						}else{
							 casper.echo('Start New Topic link Found', 'ERROR');
						}
					}
				});	
			});
		});

	});	
}

//10.test case for Verify Preview Post of Compose Topic(For Guest/Registered User/Admin-preview)
composeTopicTest.previewPostComposeTopics= function() {
   
    casper.then(function(){	
     
		//10(a).test case for Verify Preview Post of Compose Topic(For Admin-preview)
	    casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                   case-10-a(Admin)                  ', 'INFO');
				casper.echo('test case for Verify Preview Post of Compose Topic(For Admin-preview)', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
					     casper.wait(4000 , function() {
							casper.click('a.pull-right.btn.btn-uppercase.btn-primary ');
							casper.waitForSelector('div.post-body.pull-left',function success() {    							
								casper.sendKeys('input[name="subject"]','raj-Admin',{reset:true});								
								casper.withFrame('message_ifr', function() {
									casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
									casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
									casper.sendKeys('#tinymce','social-issue-Admin');
									
								});
								casper.waitForSelector('#all_forums_dropdown', function success() {
									casper.click('#all_forums_dropdown');
									casper.fill('form[name="PostTopic"]',{
										'forum' : 'categories1'
									},false);
									casper.then(function() {
										 casper.click('#previewpost_sbt');
										 	wait.waitForElement('span#first_coloumn_ div div div span', casper, function(err, isExist) {
												if(!err){
													if(isExist) {
														casper.test.assertExists('span#first_coloumn_ div div div span');
														var sub = casper.fetchText('span#first_coloumn_ div div div span');
														casper.echo('subject :'+sub,'INFO');													
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err){
																casper.echo('Successfully logout from application', 'INFO');
															}
														});
													}else{
														casper.echo('Message not be generated', 'ERROR');
													}
                                                }													
											});
									});
								}, function fail() {
									casper.waitForSelector('#previewpost_sbt',function success() {							
										casper.test.assertExists('#previewpost_sbt');
										casper.click('#previewpost_sbt');
									},function fail() {
										casper.echo('Unable to submit form','ERROR');
									});
								});
							},function fail(){
								casper.echo('Unable to Open Form To Start Topic','ERROR');
							});	
                        });						
					}
				});
			});
		});
		
		//10(b).test case for Verify Preview Post of Compose Topic(For Registered User-preview)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                   case-10-b(Registered User)            ', 'INFO');
				casper.echo('test case for Verify Preview Post of Compose Topic(For Registered User-preview)', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['Valid'].username, json['Valid'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
					    casper.wait(3000 ,function() {
							casper.click('a.pull-right.btn.btn-uppercase.btn-primary ');
							casper.waitForSelector('div.post-body.pull-left',function success() {    							
								casper.sendKeys('input[name="subject"]','raj-registerUser',{reset:true});								
								casper.withFrame('message_ifr', function() {
									casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
									casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
									casper.sendKeys('#tinymce','social-issue-registerUser');
								});
								casper.waitForSelector('#all_forums_dropdown', function success() {
									casper.click('#all_forums_dropdown');
									casper.fill('form[name="PostTopic"]',{
										'forum' : 'categories1'
									},false);
									casper.then(function() {
										casper.click('#previewpost_sbt');
										casper.wait(3000 ,function() {
											//casper.test.assertExists('div#ajax_subscription_vars div div:nth-child(4) span');
											var res = casper.evaluate(function(){
												var element =document.querySelector('span#first_coloumn_ div div div span');
												return element.innerHTML;
											});
											casper.echo('post_message :' +res,'INFO');
											forumLoginMethod.logoutFromApp(casper, function(err){
												if (!err)
												casper.echo('Successfully logout from application', 'INFO');
											});
										 });
									});
								}, function fail() {
									casper.waitForSelector('#previewpost_sbt',function success() {							
										casper.test.assertExists('#previewpost_sbt');
										casper.click('#previewpost_sbt');
										
									},function fail() {
										casper.echo('Unable to submit form','ERROR');
									});
								});
							},function fail(){
								casper.echo('Unable to Open Form To Start Topic','ERROR');
							});	
                        });						
					}
				});
			});
		});
		
		//10(c).test case for Verify Preview Post of Compose Topic(For Guest-preview)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                   case-10-c(For Guest)        ', 'INFO');
				casper.echo(' test case for Verify Preview Post of Compose Topic(For Guest-preview)', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');  
					casper.click('a.pull-right.btn.btn-uppercase.btn-primary ');
					casper.waitForSelector('div.post-body.pull-left',function success() {    							
						casper.sendKeys('input[name="subject"]','raj-registerUser',{reset:true});								
						casper.withFrame('message_ifr', function() {
							casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
							casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
							casper.sendKeys('#tinymce','social-issue-registerUser');
						});
						casper.waitForSelector('#all_forums_dropdown', function success() {
							casper.click('#all_forums_dropdown');
							casper.fill('form[name="PostTopic"]',{
								'forum' : 'categories1'
							},false);
							casper.then(function() {
								casper.click('#previewpost_sbt');
								casper.wait(2000 ,function() {
									//casper.test.assertExists('div#ajax_subscription_vars div div:nth-child(4) span');
									var res = casper.evaluate(function(){
										var element =document.querySelector('span#first_coloumn_ div div div span');
										return element.innerHTML;
									});
									casper.echo('post_message :' +res,'INFO');
								 });
							});
						}, function fail() {
							casper.waitForSelector('#previewpost_sbt',function success() {							
								casper.test.assertExists('#previewpost_sbt');
								casper.click('#previewpost_sbt');
								
							},function fail() {
								casper.echo('Unable to submit form','ERROR');
							});
						});
					},function fail(){
						casper.echo('Unable to Open Form To Start Topic','ERROR');
					});		
			});
		});
	
	});	
}

//11.Verify Preview Post of Compose Topic(For Guest/Registered User/Admin-Message generate)
composeTopicTest.previewPostComposeTopicMessage= function() {
   
   casper.then(function(){	
     
		//11(a).test case for Verify Preview Post of Compose Topic(For Admin-Message generate)
	    casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                   case-11-a(Admin)                  ', 'INFO');
				casper.echo('test case for Verify Preview Post of Compose Topic(For Admin-Message generate)', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
					    casper.wait(4000 ,function() {
							casper.click('a.pull-right.btn.btn-uppercase.btn-primary ');
							casper.waitForSelector('div.post-body.pull-left',function success() {    							
								casper.sendKeys('input[name="subject"]','raj-Admin',{reset:true});								
								casper.withFrame('message_ifr', function() {
									casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
									casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
									casper.sendKeys('#tinymce','');
								});
								casper.waitForSelector('#all_forums_dropdown', function success() {
									casper.click('#all_forums_dropdown');
									casper.fill('form[name="PostTopic"]',{
										'forum' : 'categories1'
									},false);
									casper.then(function() {
										casper.click('#previewpost_sbt');
										casper.wait(3000 ,function() {										 
										    var res = casper.fetchText('div.alert.alert-danger.text-center');
											casper.echo('post_message :' +res,'INFO');
											forumLoginMethod.logoutFromApp(casper, function(err){
												if (!err)
												casper.echo('Successfully logout from application', 'INFO');
											});
										 });
									});
								}, function fail() {
									casper.waitForSelector('#previewpost_sbt',function success() {							
										casper.test.assertExists('#previewpost_sbt');
										casper.click('#previewpost_sbt');
									},function fail() {
										casper.echo('Unable to submit form','ERROR');
									});
								});
							},function fail(){
								casper.echo('Unable to Open Form To Start Topic','ERROR');
							});	
                        });						
					}
				});
			});
		});
		
		//11(b).test case for Verify Preview Post of Compose Topic(For Registered User-Message generate)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                   case-11-b(Registered User)            ', 'INFO');
				casper.echo('test case for Verify Preview Post of Compose Topic(For Registered User-Message generate)', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['Valid'].username, json['Valid'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
					    casper.wait(3000,function() {
							casper.click('a.pull-right.btn.btn-uppercase.btn-primary ');
							casper.waitForSelector('div.post-body.pull-left',function success() {    							
								casper.sendKeys('input[name="subject"]','raj-registerUser',{reset:true});								
								casper.withFrame('message_ifr', function() {
									casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
									casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
									casper.sendKeys('#tinymce','');
								});
								casper.waitForSelector('#all_forums_dropdown', function success() {
									casper.click('#all_forums_dropdown');
									casper.fill('form[name="PostTopic"]',{
										'forum' : 'categories1'
									},false);
									casper.then(function() {
										casper.click('#previewpost_sbt');
										casper.wait(2000 ,function() {
											var res = casper.fetchText('div.alert.alert-danger.text-center');
											casper.echo('post_message :' +res,'INFO');
											forumLoginMethod.logoutFromApp(casper, function(err){
												if (!err)
												casper.echo('Successfully logout from application', 'INFO');
											});
										 });
									});
								}, function fail() {
									casper.waitForSelector('#previewpost_sbt',function success() {							
										casper.test.assertExists('#previewpost_sbt');
										casper.click('#previewpost_sbt');
										
									},function fail() {
										casper.echo('Unable to submit form','ERROR');
									});
								});
							},function fail(){
								casper.echo('Unable to Open Form To Start Topic','ERROR');
							});	
                        });						
					}
				});
			});
		});
		
		//11(c).test case for Verify Preview Post of Compose Topic(For Guest-Message generate)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                   case-11-c(For Guest)        ', 'INFO');
				casper.echo(' test case for Verify Preview Post of Compose Topic(For Guest-Message generate)', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');  
				casper.click('a.pull-right.btn.btn-uppercase.btn-primary ');
				casper.waitForSelector('div.post-body.pull-left',function success() {    
					casper.sendKeys('input[name="name"]','raj',{reset:true});	
					casper.sendKeys('input[name="email"]','raj41@gmail.com',{reset:true});					
					casper.sendKeys('input[name="subject"]','raj-registerUser',{reset:true});								
					casper.withFrame('message_ifr', function() {
						casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
						casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
						casper.sendKeys('#tinymce','');
					
					});
					casper.waitForSelector('#all_forums_dropdown', function success() {
						casper.click('#all_forums_dropdown');
						casper.fill('form[name="PostTopic"]',{
							'forum' : 'categories1'
						},false);
						casper.then(function() {
							casper.click('#previewpost_sbt');
							casper.wait(2000 , function() {
								 var res = casper.fetchText('div.alert.alert-danger.text-center');
								 casper.echo('post_message :' +res,'INFO');
							 });
						});
					}, function fail() {
						casper.waitForSelector('#previewpost_sbt',function success() {							
							casper.test.assertExists('#previewpost_sbt');
							casper.click('#previewpost_sbt');
							
						},function fail() {
							casper.echo('Unable to submit form','ERROR');
						});
					});
				},function fail(){
					casper.echo('Unable to Open Form To Start Topic','ERROR');
				});	
			});
		});
	});	
}

//12.Verify Compose Topic without selecting any category(For Guest/Registered User/Admin)
composeTopicTest.composeTopicWithoutSelectingAnyCategory= function() {
   
   casper.then(function(){	
     
		//12(a).Verify Compose Topic without selecting any category(For Admin)
	    casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                   case-12-a(Admin)                  ', 'INFO');
				casper.echo('Verify Compose Topic without selecting any category(For Admin)', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
					    casper.wait(4000 ,function() {
							casper.click('a.pull-right.btn.btn-uppercase.btn-primary ');
							casper.waitForSelector('div.post-body.pull-left',function success() {    							
								casper.sendKeys('input[name="subject"]','raj-Admin',{reset:true});								
								casper.withFrame('message_ifr', function() {
									casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
									casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
									casper.sendKeys('#tinymce','social-issue-Admin');
								});
								casper.waitForSelector('#all_forums_dropdown', function success() {
									casper.click('#all_forums_dropdown');
									casper.fill('form[name="PostTopic"]',{
										'forum' : ''
									},false);
									casper.then(function() {	
										casper.click('#previewpost_sbt');
										casper.wait(3000 ,function() {											
										    var res = casper.fetchText('div.alert.alert-danger.text-center');
											casper.echo('post_message :' +res,'INFO');
											forumLoginMethod.logoutFromApp(casper, function(err){
												if (!err)
												casper.echo('Successfully logout from application', 'INFO');
											});
										 });
									});
								}, function fail() {
									casper.waitForSelector('#previewpost_sbt',function success() {							
										casper.test.assertExists('#previewpost_sbt');
										casper.click('#previewpost_sbt');
									},function fail() {
										casper.echo('Unable to submit form','ERROR');
									});
								});
							},function fail(){
								casper.echo('Unable to Open Form To Start Topic','ERROR');
							});	
                        });						
					}
				});
			});
		});
		
		//12(b).Backend setting enable of register user(For Registered User)
		  casper.then(function(){
		    casper.echo('                  12-- **BackendSetting**                 ', 'INFO');
			composeTopicMethod.compostTopic(true,casper, casper.test, function(err) {
				if(!err){
				   casper.echo('composeTopicMethod backendSettingCompostTopic working', 'INFO');
				}
			});
		});
		
		//12(b).Verify Compose Topic without selecting any category(For Registered User)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                   case-12-b(Registered User)            ', 'INFO');
				casper.echo('Verify Compose Topic without selecting any category(For Registered User)', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['Valid'].username, json['Valid'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
					    casper.wait(3000 , function() {
							casper.click('a.pull-right.btn.btn-uppercase.btn-primary ');
							casper.waitForSelector('div.post-body.pull-left',function success() {    							
								casper.sendKeys('input[name="subject"]','raj-registerUser',{reset:true});								
								casper.withFrame('message_ifr', function() {
									casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
									casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
									casper.sendKeys('#tinymce','social-issue-registerUser');
									
								});
								casper.waitForSelector('#all_forums_dropdown', function success() {
									casper.click('#all_forums_dropdown');
									casper.fill('form[name="PostTopic"]',{
										'forum' : ''
									},false);
									casper.then(function() {	
										casper.click('#previewpost_sbt');
										casper.wait(2000 ,function() {	
											var res = casper.fetchText('div.alert.alert-danger.text-center');
											casper.echo('post_message :' +res,'INFO');
											casper.wait(2000 ,function() {
												forumLoginMethod.logoutFromApp(casper, function(err){
													if (!err){
														casper.echo('Successfully logout from application', 'INFO');
													}
												});
											});
										 });
									});
								}, function fail() {
									casper.waitForSelector('#previewpost_sbt',function success() {							
										casper.test.assertExists('#previewpost_sbt');
										casper.click('#previewpost_sbt');
										forumLoginMethod.logoutFromApp(casper, function(err){
											if (!err){
												casper.echo('Successfully logout from application', 'INFO');
											}
										});
										
									},function fail() {
										casper.echo('Unable to submit form','ERROR');
									});
								});
							},function fail(){
								casper.echo('Unable to Open Form To Start Topic','ERROR');
							});	
                        });						
					}
				});
			});
		});
	
		//12(c).Verify Compose Topic without selecting any category(For Guest)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                   case-12-c(For Guest)        ', 'INFO');
				casper.echo('Verify Compose Topic without selecting any category(For Guest)', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');  
				casper.click('a.pull-right.btn.btn-uppercase.btn-primary ');
				casper.waitForSelector('div.post-body.pull-left',function success() {    
					casper.sendKeys('input[name="name"]','raj',{reset:true});	
					casper.sendKeys('input[name="email"]','raj41@gmail.com',{reset:true});					
					casper.sendKeys('input[name="subject"]','raj-registerUser',{reset:true});								
					casper.withFrame('message_ifr', function() {
						casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
						casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
						casper.sendKeys('#tinymce','social-issue-registerUser');
					
					});
					casper.waitForSelector('#all_forums_dropdown', function success() {
						casper.click('#all_forums_dropdown');
						casper.fill('form[name="PostTopic"]',{
							'forum' : ''
						},false);
						casper.then(function() {
							casper.click('#previewpost_sbt');
							casper.wait(2000 , function() {
								 var res = casper.fetchText('div.alert.alert-danger.text-center');
								 casper.echo('post_message :' +res,'INFO');
							 });
						});
					}, function fail() {
						casper.waitForSelector('#previewpost_sbt',function success() {							
							casper.test.assertExists('#previewpost_sbt');
							casper.click('#previewpost_sbt');
							
						},function fail() {
							casper.echo('Unable to submit form','ERROR');
						});
					});
				},function fail(){
					casper.echo('Unable to Open Form To Start Topic','ERROR');
				});	
			});
		});
	});	
}



/******************************  3.Compose Topic Options   ******************************************/


//13.Test case for Verify Compose Post Options(For Guest User)
composeTopicTest.composePostOptions= function() {
   
   casper.then(function(){	
        
		 //13(a).Test case for Verify Compose Post Options(For Guest)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                   case-13-a(For Guest)        ', 'INFO');
				casper.echo('Test case for Verify Compose Post Options(For Guest)', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');  
				casper.click('a.pull-right.btn.btn-uppercase.btn-primary ');
				casper.wait(2000 ,function() {
				   try {
					 casper.test.assertExists('#fancy_attach_');
					 casper.test.assertExists('#insert_image_dialog_');
					}catch(e) {
						casper.test.assertDoesntExist('#fancy_attach_');
						casper.test.assertDoesntExist('#insert_image_dialog_');
					}
				});
			});
		});
		 
		//13(b).Test case for Verify Compose Post Options(For Registered User)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                   case-13-b(Registered User)            ', 'INFO');
				casper.echo('Verify Compose Topic without selecting any category(For Registered User)', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['Valid'].username, json['Valid'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
					    casper.wait(3000 ,function() {
							casper.click('a.pull-right.btn.btn-uppercase.btn-primary ');
							casper.wait(2000 , function() {
							    try {
									 casper.test.assertExists('#fancy_attach_');
									 casper.test.assertExists('#insert_image_dialog_');
								}catch(e) {
									casper.test.assertDoesntExist('#fancy_attach_');
									casper.test.assertDoesntExist('#insert_image_dialog_');
								}
								casper.wait(3000 ,function() {
									forumLoginMethod.logoutFromApp(casper, function(err){
										if (!err)
										casper.echo('Successfully logout from application', 'INFO');
									});
								});
							});
                        });						
					}
				});
			});
		});
		
		//13(c).Test case for Verify Compose Post Options(For Registered User)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                   case-13-c(Registered User)            ', 'INFO');
				casper.echo('Verify Compose Topic without selecting any category(For Registered User)', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['Valid'].username, json['Valid'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
					    casper.wait(3000 ,function() {
							casper.click('a.pull-right.btn.btn-uppercase.btn-primary ');
							casper.wait(2000 ,function() {
							    try {
									 casper.test.assertExists('#fancy_attach_');
									 casper.test.assertExists('#insert_image_dialog_');
								}catch(e) {
									casper.test.assertDoesntExist('#fancy_attach_');
									casper.test.assertDoesntExist('#insert_image_dialog_');
								}
								casper.then(function(){
									forumLoginMethod.logoutFromApp(casper, function(err){
										if (!err)
										casper.echo('Successfully logout from application', 'INFO');
									});
								});
							});
                        });						
					}
				});
			});
		});
		 
		//Test case for Verify Compose Post Options backend Setting
		  casper.then(function(){
		    casper.echo('                  13-- **BackendSetting**                 ', 'INFO');
			composeTopicMethod.compostTopic(false,casper, casper.test, function(err) {
				if(!err){
				   casper.echo('composeTopicMethod backendSettingCompostTopic working', 'INFO');
				}
			});
		});
		
		//13(d).Test case for Verify Compose Post Options(For Admin)
	    casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                   case-13-d(Admin)                  ', 'INFO');
				casper.echo('Verify Compose Topic without selecting any category(For Admin)', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
					    casper.wait(4000 ,function() {
							casper.click('a.pull-right.btn.btn-uppercase.btn-primary ');
							casper.waitForSelector('div.post-body.pull-left',function success() {    							
							    try {
									 casper.test.assertExists('#fancy_attach_');
									 casper.test.assertExists('#insert_image_dialog_');
								}catch(e) {
									casper.test.assertDoesntExist('#fancy_attach_');
									casper.test.assertDoesntExist('#insert_image_dialog_');
								}
								casper.then(function(){
									forumLoginMethod.logoutFromApp(casper, function(err){
										if (!err)
										casper.echo('Successfully logout from application', 'INFO');
									});
								});
							},function fail(){
								casper.echo('Unable to Open Form To Start Topic','ERROR');
							});	
                        });						
					}
				});
			});
		});
	
	});	
}



/**************  4.Compose Topic Permission(Make sure 'Post approval' is disabled)  ******************/

//14.Verify Compose Topic on Category/topic Listing Page(if start new topic permission is disabled)(For Guest User)
composeTopicTest.startNewTopicPermissionDisabled= function() {
	casper.then(function(){
	    casper.echo('                   case-14                 ', 'INFO');
		casper.echo('Verify Compose Topic on Category/topic Listing Page(if start new topic permission is disabled)', 'INFO');
		casper.echo('**********************************************************************************************', 'INFO');
		composeTopicMethod.composeTopicPermission(false,casper, casper.test, function(err) {
			if(!err){
				casper.thenOpen(config.url, function() { 
					casper.click('a.pull-right.btn.btn-uppercase.btn-primary ');
					casper.wait(3000 ,function() {								
						var res = casper.fetchText('#myModalLabel');
						casper.echo('message :' +res,'INFO');
					});
				});
			}
		});
	});
}

//15.Verify Compose Topic on topic listing page(if start new topic permission is disabled of one cateogry)(For Guest User)
composeTopicTest.listingPageDisabledOneCateogry= function() {
	casper.then(function(){
	  
	   //test case for Backend Setting( Unregistered / Not Logged In Start Topics Permission enable /disable)
		casper.then(function(){
			casper.echo('15.Backend Setting( Unregistered / Not Logged In Start Topics Permission enable)', 'INFO');
			composeTopicMethod.composeTopicPermission(true,casper,casper.test, function(err) {
				if(!err){
					 casper.echo(' composeTopicPermission working', 'INFO');
				}
			});
		});
	
	  //test case for Backend Setting(listingPageDisabledOneCateogry)
		casper.then(function(){
		      casper.echo('15.Backend Setting(listingPageDisabledOneCateogry for Unregistered / Not Logged In) ', 'INFO');
			  composeTopicMethod.listingPageDisabledOneCateogry('Unregistered / Not Logged In','post_threads_20237800',casper,casper.test,function(err) {
				if(!err){
					casper.echo('Method listingPageDisabledOneCateogry working', 'INFO');
				}
			});
		});
	
	    //15(a)Verify Compose Topic on topic listing page if start new topic permission is disabled of one cateogry (Message verify)
	    casper.then(function(){
			casper.thenOpen(config.url, function() { 
			casper.echo('                              case-15-a                                ', 'INFO');
			casper.echo(' start new topic permission is disabled of one cateogry(Message verify)', 'INFO');
			casper.echo('***********************************************************************', 'INFO');
				casper.test.assertExists('div#topics ul li:nth-child(2) a');
				casper.click('div#topics ul li:nth-child(2) a');
				wait.waitForTime(3000 , casper , function() {
					var cateogrySelection = casper.evaluate(function(){
						for(var i=3; i<=7; i++) {
							var x1 = document.querySelector('ul#forums_toggle_link li ul:nth-child('+i+') li a');
							if (x1.innerText == 'categories2') {
								var x3 = document.querySelector('ul#forums_toggle_link li ul:nth-child('+i+') li a').getAttribute('href');
								return x3;
							}
						}
					});
					casper.echo('a[href="'+cateogrySelection+'"]');
					casper.click('a[href="'+cateogrySelection+'"]');
					casper.wait(2000 ,function() {	
						wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary.signupLogin', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary.signupLogin');
									casper.click('a.pull-right.btn.btn-uppercase.btn-primary.signupLogin');
									casper.wait(2000 ,function() {								
										var res = casper.fetchText('#myModalLabel');
										casper.echo('message :' +res,'INFO');
									});																						
								}else{
									 casper.echo('Start New Topic Not Found', 'ERROR');
								}
							}
						});																							
				    });
			
			    });
		    });
		});

		//15(b)Verify Compose Topic on topic listing page(create topic)
		casper.then(function(){
			casper.echo('                                    case-15-b                                      ', 'INFO');
			casper.echo('test case if start new topic permission is disabled of one cateogry(Message verify)', 'INFO');
			casper.echo('***********************************************************************************', 'INFO');
		    casper.thenOpen(config.url, function() { 
				casper.test.assertExists('div#topics ul li:nth-child(2) a');
				casper.click('div#topics ul li:nth-child(2) a');
				wait.waitForTime(3000 , casper , function() {
					var cateogrySelection = casper.evaluate(function(){
						for(var i=3; i<=7; i++) {
							var x1 = document.querySelector('ul#forums_toggle_link li ul:nth-child('+i+') li a');
							if (x1.innerText == 'categories1') {
								var x3 = document.querySelector('ul#forums_toggle_link li ul:nth-child('+i+') li a').getAttribute('href');
								return x3;
							}
						}
					});
					casper.echo('a[href="'+cateogrySelection+'"]');
					casper.click('a[href="'+cateogrySelection+'"]');
					wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary ', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary ');
								casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
								casper.waitForSelector('div.post-body.pull-left',function success() { 
									casper.withFrame('message_ifr', function() {
										casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
										casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
										casper.sendKeys('#tinymce',' topic permission is disabled of one cateogry Message verify');
									});
									casper.fill('form[name="PostTopic"]',{
										'name' : 'sahil',
										'email' : 'sahil@gmail.com',
										'subject':'topic-data'
									},false);
									casper.then(function() {
										casper.click('#post_submit');
										wait.waitForElement('div#ajax_subscription_vars div div:nth-child(4) span:nth-child(1)', casper, function(err, isExist) {
											if(!err){
												if(isExist) {
													casper.test.assertExists('div#ajax_subscription_vars div div:nth-child(4) span:nth-child(1)');
													var sub = casper.fetchText('div#ajax_subscription_vars div div:nth-child(4) span:nth-child(1)');
													casper.echo('subject :'+sub,'INFO');													
													forumLoginMethod.logoutFromApp(casper, function(err){
														if (!err){
															casper.echo('Successfully logout from application', 'INFO');
														}
													});
												}else{
													casper.echo('Message not be generated', 'ERROR');
												}
											}													
										});
									});
								});																					
							}else{
								 casper.echo('Start New Topic Not Found', 'ERROR');
							}
						}
					});																							
				});
			});
		});
	});
	  
}

//16.Verify Dropdown of Compose Topic on Category/Latest topic page(if start new topic permission is disabled of one cateogry)(For Guest User)
composeTopicTest.dropdownDisabledOneCateogry = function() {
	casper.then(function(){
	   
	   //test case for Backend Setting( Unregistered / Not Logged In Start Topics Permission enable /disable)
		casper.then(function(){
			casper.echo('16.Backend Setting( Unregistered / Not Logged In Start Topics Permission enable)', 'INFO');
			composeTopicMethod.composeTopicPermission(true,casper,casper.test, function(err) {
				if(!err){
					 casper.echo('Method composeTopicPermission working', 'INFO');
				}
			});
		});
		
		//test case for Backend Setting(listingPageDisabledOneCateogry for Unregistered / Not Logged In)
		casper.then(function(){
		      casper.echo('16.Backend Setting( listingPage Disabled OneCateogry for Unregistered / Not Logged In)', 'INFO');
			  composeTopicMethod.listingPageDisabledOneCateogry('Unregistered / Not Logged In','post_threads_20237800',casper,casper.test,function(err) {
				if(!err){
					casper.echo('Method listingPageDisabledOneCateogry working', 'INFO');
				}
			});
		});
		
	    //16(a).test case for Dropdown if start new topic permission is disabled of one cateogry(Message verify))
		casper.then(function(){
		    casper.thenOpen(config.url, function() { 
			    casper.echo('                   case-16-a                                                      ', 'INFO');
				casper.echo('Dropdown if start new topic permission is disabled of one cateogry(Message verify)', 'INFO');
				casper.echo('**********************************************************************************', 'INFO');
				wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary ', casper, function(err, isExist) {
					if(!err){
						if(isExist) {
							casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary ');
							casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
							casper.waitForSelector('div.post-body.pull-left',function success() { 
							
								casper.withFrame('message_ifr', function() {
									casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
									casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
									casper.sendKeys('#tinymce','Dropdown start new topic permission is disabled of one cateogry');
								});
								casper.fill('form[name="PostTopic"]',{
									'name' : 'darpan',
									'email' : 'sahil@gmail.com',
									'subject':'topic-data',
									'forum' : 'categories2'
								},false);
								casper.then(function() {
									casper.click('#post_submit');
									casper.wait(2000, function() { 
										var res = casper.fetchText('div.alert.alert-danger.text-center');
										casper.echo('message :' +res,'INFO');
									});
								});
							});	
                         							
						}else{
							 casper.echo('Start New Topic Not Found', 'ERROR');
						}
					}
				});																							
					
			});
		});
		
		 //16(b).test case for Dropdown if start new topic permission is disabled of one cateogry(Message verify)
		casper.then(function(){
		    casper.thenOpen(config.url, function() { 
			    casper.echo('                                     case-16-b                                  ', 'INFO');
				casper.echo('Dropdown if start new topic permission is disabled of one cateogry(create topic)', 'INFO');
				casper.echo('********************************************************************************', 'INFO');
				wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary ', casper, function(err, isExist) {
					if(!err){
						if(isExist) {
							casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary ');
							casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
							casper.waitForSelector('div.post-body.pull-left',function success() { 
							
								casper.withFrame('message_ifr', function() {
									casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
									casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
									casper.sendKeys('#tinymce','Dropdown start new topic permission is disabled of one cateogry');
								});
								casper.fill('form[name="PostTopic"]',{
									'name' : 'darpan',
									'email' : 'sahil@gmail.com',
									'subject':'topic-data',
									'forum' : 'categories1'
								},false);
								casper.then(function() {
									casper.click('#post_submit');
								});
							});	
                         							
						}else{
							 casper.echo('Start New Topic Not Found', 'ERROR');
						}
					}
				});																							
					
			});
		});
	
	});
	  
}

//17.Verify Compose Topic on Category/topic/Latest topic Page(if start new topic permission is disabled)(For Register User)
composeTopicTest.composePostRegisterUser = function() {
	casper.then(function(){
	
	    //test case for Backend Setting(Compost Topic (start new topic permission is disabled for register User)
		casper.then(function(){
			casper.echo('BackendSetting(start new topic permission is disabled for register User)', 'INFO');
			composeTopicMethod.permissionDisabled(false,casper,casper.test, function(err) {
				if(!err){
					 casper.echo('Method permissionDisabled working', 'INFO');
				}
			});
		});
		
		//17(a).Verify Compose Topic on topic Page
		casper.then(function(){
			casper.thenOpen(config.url, function() {
			    casper.echo('          case-17(a)              ', 'INFO');
				casper.echo('Verify Compose Topic on topic Page', 'INFO');
				casper.echo('**********************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['Valid'].username, json['Valid'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						casper.wait(3000, function() {
							var grpName = casper.evaluate(function() {
							     var x3 = document.querySelector('div#topics a').getAttribute('data-original-title');
								return x3;
							});
                            casper.echo('message : '+grpName,'INFO');
							forumLoginMethod.logoutFromApp(casper, function(err){
								if (!err)
								casper.echo('Successfully logout from application', 'INFO');
							});
					    });			  
					}else {
						casper.echo('forumLogin Method loginToApp not working', 'ERROR');
					}
				});
			});
		});
		
		//17(b).Verify Compose Topic on Category topic Page
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('          case-17-b(Registered User)       ', 'INFO');
				casper.echo('Verify Compose Topic on Category topic Page', 'INFO');
				casper.echo('*******************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['Valid'].username, json['Valid'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						casper.wait(2000, function() {
							var grpName = casper.evaluate(function() {
								var id = document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary ').getAttribute('data-original-title');
								return id;
							});
							casper.echo('message :'+grpName ,'INFO');
                            casper.wait(2000,function() {
								forumLoginMethod.logoutFromApp(casper, function(err){
									if (!err)
									     casper.echo('Successfully logout from application', 'INFO');
								});
                            });
					    });			  
					}else {
						casper.echo('forumLogin Method loginToApp not working', 'ERROR');
					}
				});
			});
		});
		
		//17(c).Verify Compose Topic on Latest topic Page
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('           case-17-c(Registered User)    ', 'INFO');
				casper.echo('Verify Compose Topic on Latest topic Page', 'INFO');
				casper.echo('*****************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['Valid'].username, json['Valid'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						casper.wait(3000, function() {
							var grpName = casper.evaluate(function() {
								var id = document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary ').getAttribute('data-original-title');
								return id;
							});
                            casper.echo('message :'+grpName ,'INFO');
							forumLoginMethod.logoutFromApp(casper, function(err){
								if (!err)
								casper.echo('Successfully logout from application', 'INFO');
							});
					    });			  
					}else {
						casper.echo('forumLogin Method loginToApp not working', 'ERROR');
					}
				});
			});
		});
	});
	  
}

//18.Verify Compose Topic on topic listing page(if start new topic permission is disabled of one cateogry)(For Register User)
composeTopicTest.previewPostComposeTopic = function() {
	casper.then(function(){
	 
		//test case for Backend Setting(Compost Topic (start new topic permission is enable for register User)
		casper.then(function(){
			casper.echo('*******18.BackendSetting(start new topic permission is disabled for register User)', 'INFO');
			composeTopicMethod.permissionDisabled(true,casper,casper.test, function(err) {
				if(!err){
					 casper.echo('Method permissionDisabled working', 'INFO');
				}
			});
		});
	
	    //test case for Backend Setting(listingPageDisabledOneCateogry for Registered Users)
		casper.then(function(){
		      casper.echo('****18.Backend Setting( listingPage Disabled OneCateogry for Registered Users)', 'INFO');
			  composeTopicMethod.listingPageDisabledOneCateogry('Registered Users','view_forum_',casper,casper.test,function(err) {
				if(!err){
					casper.echo('Method listingPageDisabledOneCateogry working', 'INFO');
				}
			});
		});
	
	    //18(b).test case for Verify Compost Topic on Topic Listing Page(Registered User diable Categories)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('         case-18-b(Registered User diable Categories)    ', 'INFO');
				casper.echo(' test case for Verify Compost Topic on Topic Listing Page', 'INFO');
				casper.echo('*********************************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['Valid'].username, json['Valid'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('div#topics ul li:nth-child(2) a', casper, function(err, isExist) {
							if(!err){
							    if(isExist) {
									casper.test.assertExists('div#topics ul li:nth-child(2) a');
									casper.click('div#topics ul li:nth-child(2) a');
									wait.waitForTime(3000 , casper , function() {
										var cateogrySelection = casper.evaluate(function(){
											for(var i=3; i<=7; i++) {
												var x1 = document.querySelector('ul#forums_toggle_link li ul:nth-child('+i+') li a');
												if (x1.innerText == 'categories2') {
													var x3 = document.querySelector('ul#forums_toggle_link li ul:nth-child('+i+') li a').getAttribute('href');
													return x3;
												}
											}
										});
										casper.echo('a[href="'+cateogrySelection+'"]');
										casper.click('a[href="'+cateogrySelection+'"]');
										casper.wait(2000, function() {									
											var grpName = casper.evaluate(function() {
												var id = document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary ').getAttribute('data-original-title');
												return id;
											});
											casper.echo('message :'+grpName ,'INFO');
											casper.wait(2000, function() {
												forumLoginMethod.logoutFromApp(casper, function(err){
													if (!err)
													casper.echo('Successfully logout from application', 'INFO');
												});
											});					   
										});						   
							        });	
								}else {
									casper.echo('forumLogin Method loginToApp not working', 'ERROR');
								}
					        }
                        });						
					}else {
						casper.echo('forumLogin Method loginToApp not working', 'ERROR');
					}
				});
			});
		});
	
		 //18(c).test case for Verify Compost Topic on Topic Listing Page(Registered User)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('       case-18-c(Registered User enable Categories)      ', 'INFO');
				casper.echo(' test case for Verify Compost Topic on Topic Listing Page', 'INFO');
				casper.echo('*********************************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['Valid'].username, json['Valid'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
					        casper.wait(2000 ,function() {
							casper.test.assertExists('div#topics ul li:nth-child(2) a');
							casper.click('div#topics ul li:nth-child(2) a');
							wait.waitForTime(3000 , casper , function() {
									var cateogrySelection = casper.evaluate(function(){
										for(var i=3; i<=7; i++) {
											var x1 = document.querySelector('ul#forums_toggle_link li ul:nth-child('+i+') li a');
											if (x1.innerText == 'categories1') {
												var x3 = document.querySelector('ul#forums_toggle_link li ul:nth-child('+i+') li a').getAttribute('href');
												return x3;
											}
										}
									});
									casper.echo('a[href="'+cateogrySelection+'"]');
									casper.click('a[href="'+cateogrySelection+'"]');
									wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary', casper, function(err, isExist) {
										if(!err){
											if(isExist) {
												casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary');
												casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
												composeTopicMethod.startTopic(true,false,false,data['Topicmessage'],casper,function(err){
													if(!err){
														wait.waitForElement('div#ajax_subscription_vars div div:nth-child(4) span', casper, function(err, isExist) {
															if(!err){
																if(isExist) {
																	casper.test.assertExists('div#ajax_subscription_vars div div:nth-child(4) span');
																	var sub = casper.fetchText('div#ajax_subscription_vars div div:nth-child(4) span');
																	casper.echo('subject :'+sub,'INFO');													
																	forumLoginMethod.logoutFromApp(casper, function(err){
																		if (!err){
																			casper.echo('Successfully logout from application', 'INFO');
																		}
																	});
																}else{
																	casper.echo('Message not be generated', 'ERROR');
																}
															}													
														});
													}
												});						   
											}else {
												casper.echo('Start New Topic link Found', 'ERROR');
											}
										}
									});						   
								
							});
                        });						
					}else {
						casper.echo('forumLogin Method loginToApp not working', 'ERROR');
					}
				});
			});
		});
	});
}

//19.Verify Dropdown of Compose Topic on Category/Latest topic page(if start new topic permission is disabled of one cateogry)(For Register User)
composeTopicTest.previewPostDropdownTopicMessage = function() {
	casper.then(function(){
	  
	   //19(a).test case for Category Dropdown(disable Category)
	   casper.then(function(){
		    casper.thenOpen(config.url, function() { 
			    casper.echo('         case-19-a(Registered User)              ', 'INFO');
				casper.echo('test case for Category Dropdown(disable Category)','INFO');
				casper.echo('************************************************', 'INFO');
				forumLoginMethod.loginToApp(json['Valid'].username, json['Valid'].password, casper, function(err){
					if(!err) {
						wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary ', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary ');
									casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
									casper.waitForSelector('div.post-body.pull-left',function success() { 
									   casper.sendKeys('input[name="subject"]','hello',{reset:true});
										casper.withFrame('message_ifr', function() {
											casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
											casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
											casper.sendKeys('#tinymce','Dropdown disable Category');
										});
										casper.fill('form[name="PostTopic"]',{
											'forum' : 'categories2'
										},false);
										casper.then(function() {
											 casper.click('#post_submit');
											 casper.wait(2000, function() { 
												var res = casper.fetchText('div.alert.alert-danger.text-center');
												casper.echo('message :' +res,'INFO');
												forumLoginMethod.logoutFromApp(casper, function(err){
													if(!err){
															casper.echo('Successfully logout from application', 'INFO');
													}
												});
											});
										});
									});							
								}else{
									 casper.echo('Start New Topic Not Found', 'ERROR');
								}
							}
						});	
					}else {
						casper.echo('forumLogin Method loginToApp not working', 'ERROR');
					}					
				});
			});
		});
	
		//19(b).test case for Category Dropdown(enable Category)
		casper.then(function(){
		    casper.thenOpen(config.url, function() { 
			    casper.echo('         case-19-b(Registered User)             ', 'INFO');
				casper.echo('test case for Category Dropdown(enable Category)', 'INFO');
				casper.echo('************************************************', 'INFO');
			    forumLoginMethod.loginToApp(json['Valid'].username, json['Valid'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary');
									casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
									composeTopicMethod.startTopic(true,false,false,data['Topicmessage'],casper,function(err){
										if(!err){
												wait.waitForElement('div#ajax_subscription_vars div div:nth-child(4) span', casper, function(err, isExist) {
												if(!err){
													if(isExist) {
														casper.test.assertExists('div#ajax_subscription_vars div div:nth-child(4) span');
														var sub = casper.fetchText('div#ajax_subscription_vars div div:nth-child(4) span');
														casper.echo('subject :'+sub,'INFO');													
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err){
																casper.echo('Successfully logout from application', 'INFO');
															}
														});
													}else{
														casper.echo('Message not be generated', 'ERROR');
													}
                                                }													
											});
										}
									});						   
								}else {
									casper.echo('Start New Topic link Found', 'ERROR');
								}
							}
						});						   			
					}else {
						casper.echo('forumLogin Method loginToApp not working', 'ERROR');
					}
				});																							
			});
		});
	});
}


/**************  5.Compose Topic With Attach, Insert and Follow Option  ******************/

//20.Verify Compose Topic with Un-FollowOption(For Register user/Admin User)
composeTopicTest.composeTopicUnFollowOption = function() {
    casper.then(function(){
	
	    //20(a).test case for Verify Compose Topic with Un-FollowOption(Admin User-Topic Listing)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('       case-20-a(Admin User-Topic Listing)             ', 'INFO');
				casper.echo('test case for Verify Compose Topic with Un-FollowOption', 'INFO');
				casper.echo('*******************************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('div#topics ul li:nth-child(1) a', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
								    casper.click('div#topics ul li:nth-child(1) a');
									composeTopicMethod.startTopic(false,false,false,data['Topicmessage'],casper,function(err){
										if(!err){
											wait.waitForElement('div#ajax_subscription_vars div div:nth-child(4) span', casper, function(err, isExist) {
												if(!err){
													if(isExist) {
														casper.test.assertExists('div#ajax_subscription_vars div div:nth-child(4) span');
														var sub = casper.fetchText('div#ajax_subscription_vars div div:nth-child(4) span');
														casper.echo('subject :'+sub,'INFO');													
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err){
																casper.echo('Successfully logout from application', 'INFO');
															}
														});
													}else{
														casper.echo('Message not be generated', 'ERROR');
													}
                                                }													
											});
										}
									});						   
								}else{
									 casper.echo('Topics Link Not Found', 'ERROR');
								}
							}
						});		  
					}else {
						casper.echo('forumLogin Method loginToApp not working', 'ERROR');
					}
				});
			});
		});
	
		 //20(b).test case for Verify Compose Topic with Un-FollowOption(Admin User-CategoryLisitng)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('       case-20-b(Admin User-CategoryLisitng)           ', 'INFO');
				casper.echo('test case for Verify Compose Topic with Un-FollowOption', 'INFO');
				casper.echo('*******************************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('div#topics ul li:nth-child(2) a', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.click('div#topics ul li:nth-child(2) a');
									composeTopicMethod.startTopic(false,false,false,data['Topicmessage'],casper,function(err){
										if(!err){
											wait.waitForElement('div#ajax_subscription_vars div div:nth-child(4) span', casper, function(err, isExist) {
												if(!err){
													if(isExist) {
														casper.test.assertExists('div#ajax_subscription_vars div div:nth-child(4) span');
														var sub = casper.fetchText('div#ajax_subscription_vars div div:nth-child(4) span');
														casper.echo('subject :'+sub,'INFO');													
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err){
																casper.echo('Successfully logout from application', 'INFO');
															}
														});
													}else{
														casper.echo('Message not be generated', 'ERROR');
													}
                                                }													
											});
										}
									});									
								}else{
									 casper.echo('Topics Link Not Found', 'ERROR');
								}
							}
						});		  
					}else {
						casper.echo('forumLogin Method loginToApp not working', 'ERROR');
					}
				});
			});
		});
		
		 //20(c).test case for Verify Compose Topic with Un-FollowOption(Registered User-Topic Listing)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('       case-20-c(Registered User-Topic Listing)        ', 'INFO');
				casper.echo('test case for Verify Compose Topic with Un-FollowOption', 'INFO');
				casper.echo('*******************************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['Valid'].username, json['Valid'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('div#topics ul li:nth-child(1) a', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
								    casper.click('div#topics ul li:nth-child(1) a');
									composeTopicMethod.startTopic(false,false,false,data['Topicmessage'],casper,function(err){
										if(!err){
											wait.waitForElement('div#ajax_subscription_vars div div:nth-child(4) span', casper, function(err, isExist) {
												if(!err){
													if(isExist) {
														casper.test.assertExists('div#ajax_subscription_vars div div:nth-child(4) span');
														var sub = casper.fetchText('div#ajax_subscription_vars div div:nth-child(4) span');
														casper.echo('subject :'+sub,'INFO');													
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err){
																casper.echo('Successfully logout from application', 'INFO');
															}
														});
													}else{
														casper.echo('Message not be generated', 'ERROR');
													}
                                                }													
											});
										}
									});						   
								}else{
									 casper.echo('forumLogin Method loginToApp not working', 'ERROR');
								}
							}
						});		  
					}
				});
			});
		});
	
		 //20(d).test case for Verify Compose Topic with Un-FollowOption(Registered User-CategoryLisitng)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('       case-20-d(Registered User-CategoryLisitng)      ', 'INFO');
				casper.echo('test case for Verify Compose Topic with Un-FollowOption', 'INFO');
				casper.echo('*******************************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['Valid'].username, json['Valid'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('div#topics ul li:nth-child(2) a', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.click('div#topics ul li:nth-child(2) a');
								    composeTopicMethod.startTopic(false,false,false,data['Topicmessage'],casper,function(err){
										if(!err){
											wait.waitForElement('div#ajax_subscription_vars div div:nth-child(4) span', casper, function(err, isExist) {
												if(!err){
													if(isExist) {
														casper.test.assertExists('div#ajax_subscription_vars div div:nth-child(4) span');
														var sub = casper.fetchText('div#ajax_subscription_vars div div:nth-child(4) span');
														casper.echo('subject :'+sub,'INFO');													
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err){
																casper.echo('Successfully logout from application', 'INFO');
															}
														});
													}else{
														casper.echo('Message not be generated', 'ERROR');
													}
                                                }													
											});
										}
									});								
								}else{
									 casper.echo('Category Link Not Found', 'ERROR');
								}
							}
						});		  
					}else {
						casper.echo('forumLogin Method loginToApp not working', 'ERROR');
					}
				});
			});
		});

	});
}

//21.Verify Compose Topic with follow option(For Register user/Admin)
composeTopicTest.composeTopicFollowOption= function() {
    casper.then(function(){
	
	    //21(a).test case for Verify Compose Topic with follow option(Admin User-Topic Listing)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('       case-21-a(Admin User-Topic Listing)           ', 'INFO');
				casper.echo('test case for Verify Compose Topic with follow option', 'INFO');
				casper.echo('*****************************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('div#topics ul li:nth-child(1) a', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
								    casper.click('div#topics ul li:nth-child(1) a');
									composeTopicMethod.startTopic(true,false,false,data['Topicmessage'],casper,function(err){
										if(!err){
											wait.waitForElement('div#ajax_subscription_vars div div:nth-child(4) span', casper, function(err, isExist) {
												if(!err){
													if(isExist) {
														casper.test.assertExists('div#ajax_subscription_vars div div:nth-child(4) span');
														var sub = casper.fetchText('div#ajax_subscription_vars div div:nth-child(4) span');
														casper.echo('subject :'+sub,'INFO');													
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err){
																casper.echo('Successfully logout from application', 'INFO');
															}
														});
													}else{
														casper.echo('Message not be generated', 'ERROR');
													}
                                                }													
											});
										}
									});									
								}else{
									 casper.echo('Topics Link Not Found', 'ERROR');
								}
							}
						});		  
					}else {
						casper.echo('forumLogin Method loginToApp not working', 'ERROR');
					}
				});
			});
		});
	
		 //21(b).test case for Verify Compose Topic with follow option(Admin User-CategoryLisitng)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('     case-21-b(Admin User-CategoryLisitng)           ', 'INFO');
				casper.echo('test case for Verify Compose Topic with follow option', 'INFO');
				casper.echo('*****************************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('div#topics ul li:nth-child(2) a', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.click('div#topics ul li:nth-child(2) a');
									composeTopicMethod.startTopic(true,false,false,data['Topicmessage'],casper,function(err){
										if(!err){
											wait.waitForElement('div#ajax_subscription_vars div div:nth-child(4) span', casper, function(err, isExist) {
												if(!err){
													if(isExist) {
														casper.test.assertExists('div#ajax_subscription_vars div div:nth-child(4) span');
														var sub = casper.fetchText('div#ajax_subscription_vars div div:nth-child(4) span');
														casper.echo('subject :'+sub,'INFO');													
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err){
																casper.echo('Successfully logout from application', 'INFO');
															}
														});
													}else{
														casper.echo('Message not be generated', 'ERROR');
													}
                                                }													
											});
										}
									});									
								}else{
									 casper.echo('Category Link Not Found', 'ERROR');
								}
							}
						});		  
					}else {
						casper.echo('forumLogin Method loginToApp not working', 'ERROR');
					}
				});
			});
		});
		
		 //21(c).test case for Verify Compose Topic with follow option(Registered User-Topic Listing)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('       case-21-c(Registered User-Topic Listing)      ', 'INFO');
				casper.echo('test case for Verify Compose Topic with follow option', 'INFO');
				casper.echo('*****************************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['Valid'].username, json['Valid'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('div#topics ul li:nth-child(1) a', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
								    casper.click('div#topics ul li:nth-child(1) a');
									composeTopicMethod.startTopic(true,false,false,data['Topicmessage'],casper,function(err){
										if(!err){
											wait.waitForElement('div#ajax_subscription_vars div div:nth-child(4) span', casper, function(err, isExist) {
												if(!err){
													if(isExist) {
														casper.test.assertExists('div#ajax_subscription_vars div div:nth-child(4) span');
														var sub = casper.fetchText('div#ajax_subscription_vars div div:nth-child(4) span');
														casper.echo('subject :'+sub,'INFO');													
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err){
																casper.echo('Successfully logout from application', 'INFO');
															}
														});
													}else{
														casper.echo('Message not be generated', 'ERROR');
													}
                                                }													
											});
										}
									});									
								}else{
									 casper.echo('Topics Link Not Found', 'ERROR');
								}
							}
						});		  
					}else {
						casper.echo('forumLogin Method loginToApp not working', 'ERROR');
					}
				});
			});
		});
	
		 //21(d).test case for Verify Compose Topic with follow option(Registered User-CategoryLisitng)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('       case-21-d(Registered User-CategoryLisitng)             ', 'INFO');
				casper.echo('test case for Verify Compose Topic with follow option', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['Valid'].username, json['Valid'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('div#topics ul li:nth-child(2) a', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.click('div#topics ul li:nth-child(2) a');
									composeTopicMethod.startTopic(true,false,false,data['Topicmessage'],casper,function(err){
										if(!err){
											wait.waitForElement('div#ajax_subscription_vars div div:nth-child(4) span', casper, function(err, isExist) {
												if(!err){
													if(isExist) {
														casper.test.assertExists('div#ajax_subscription_vars div div:nth-child(4) span');
														var sub = casper.fetchText('div#ajax_subscription_vars div div:nth-child(4) span');
														casper.echo('subject :'+sub,'INFO');													
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err){
																casper.echo('Successfully logout from application', 'INFO');
															}
														});
													}else{
														casper.echo('Message not be generated', 'ERROR');
													}
                                                }													
											});
										}
									});									
								}else{
									 casper.echo('Category Link Not Found', 'ERROR');
								}
							}
						});		  
					}else {
						casper.echo('forumLogin Method loginToApp not working', 'ERROR');
					}
				});
			});
		});

	});
}

//22.Verify Compost Topic with attach file on Category/topic/Latest topic Page (Registered User/Admin)
composeTopicTest.compostTopicAttachFile= function() {
    casper.then(function(){
	    
		//22.Test case for Verify Compose Post Options backend Setting
		  casper.then(function(){
		    casper.echo('Verify Compose Post Options backend Setting', 'INFO');
			composeTopicMethod.compostTopic(true,casper, casper.test, function(err) {
				if(!err){
				   casper.echo('composeTopicMethod  working', 'INFO');
				}
			});
		});
		
	    //22(a).Verify Compost Topic with attach file on Latest topic Page (Admin User)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('       case-22-a(Admin User-Topic Listing)         ', 'INFO');
				casper.echo('Compost Topic with attach file on Latest topic Page', 'INFO');
				casper.echo('***************************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
									casper.waitForSelector('div.post-body.pull-left',function success() {    							
										casper.sendKeys('input[name="subject"]','khan',{reset:true});								
										casper.withFrame('message_ifr', function() {
											casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
											casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
											casper.sendKeys('#tinymce','Verify Post preview with entered message Admin User-Topic Listing');
										});
										casper.waitForSelector('#all_forums_dropdown', function success() {
											casper.click('#all_forums_dropdown');
											casper.fill('form[name="PostTopic"]',{
												'forum' : 'categories1'
											},false);
											casper.click('#autoUploadAttachment');
											casper.wait(3000 ,function() {
												casper.click('#post_submit');
												wait.waitForElement('div#ajax_subscription_vars div div:nth-child(4) span:nth-child(1)', casper, function(err, isExist) {
													if(!err){
														if(isExist) {
															casper.test.assertExists('div#ajax_subscription_vars div div:nth-child(4) span:nth-child(1)');
															var sub = casper.fetchText('div#ajax_subscription_vars div div:nth-child(4) span:nth-child(1)');
															casper.echo('subject :'+sub,'INFO');													
															forumLoginMethod.logoutFromApp(casper, function(err){
																if (!err){
																	casper.echo('Successfully logout from application', 'INFO');
																}
															});
														}else{
															casper.echo('Message not be generated', 'ERROR');
														}
													}													
												});
											});
										}, function fail() {
											casper.waitForSelector('#previewpost_sbt',function success() {							
												casper.test.assertExists('#previewpost_sbt');
												casper.click('#previewpost_sbt');
											},function fail() {
												casper.echo('Unable to submit form','ERROR');
											});
										});
									},function fail(){
										casper.echo('Unable to Open Form To Start Topic','ERROR');
									});
								}else{
									 casper.echo('Start New Topic link Found', 'ERROR');
								}
							}
						});		  
					}
				});
			});
		});
	
		//22(b).Verify Compost Topic with attach file on Category/topic/Latest topic Page (Admin User)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('       case-22-a(Admin User-Topic Listing)     ', 'INFO');
				casper.echo('Compost Topic with attach file on Category Page', 'INFO');
				casper.echo('***********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('div#topics ul li:nth-child(2) a', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.click('div#topics ul li:nth-child(2) a');
									wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary', casper, function(err, isExist) {
										if(!err){
											if(isExist) {
												casper.click('a.pull-right.btn.btn-uppercase.btn-primary ');
												casper.waitForSelector('div.post-body.pull-left',function success() {    							
													casper.sendKeys('input[name="subject"]','khan',{reset:true});								
													casper.withFrame('message_ifr', function() {
														casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
														casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
														casper.sendKeys('#tinymce','Verify Post preview with entered message');
													});
													casper.waitForSelector('#all_forums_dropdown', function success() {
														casper.click('#all_forums_dropdown');
														casper.fill('form[name="PostTopic"]',{
															'forum' : 'categories1'
														},false);
														casper.click('#autoUploadAttachment');
														casper.wait(3000 ,function() {
															casper.click('#post_submit');
														    wait.waitForElement('div#ajax_subscription_vars div div:nth-child(4) span:nth-child(1)', casper, function(err, isExist) {
																if(!err){
																	if(isExist) {
																		casper.test.assertExists('div#ajax_subscription_vars div div:nth-child(4) span:nth-child(1)');
																		var sub = casper.fetchText('div#ajax_subscription_vars div div:nth-child(4) span:nth-child(1)');
																		casper.echo('subject :'+sub,'INFO');													
																		forumLoginMethod.logoutFromApp(casper, function(err){
																			if (!err){
																				casper.echo('Successfully logout from application', 'INFO');
																			}
																		});
																	}else{
																		casper.echo('Message not be generated', 'ERROR');
																	}
																}													
															});
														});
													}, function fail() {
														casper.waitForSelector('#previewpost_sbt',function success() {							
															casper.test.assertExists('#previewpost_sbt');
															casper.click('#previewpost_sbt');
														},function fail() {
															casper.echo('Unable to submit form','ERROR');
														});
													});
												},function fail(){
													casper.echo('Unable to Open Form To Start Topic','ERROR');
												});
											}else{
												 casper.echo('Start New Topic link Found', 'ERROR');
											}
										}
									});
								}else{
									 casper.echo('Categories link Found', 'ERROR');
								}
							}
						});		  
					}
				});
			});
		});
	
	    //22(c).Verify Compost Topic with attach file on Latest topic Page (Register User)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('       case-22-a(Register User-Topic Listing)      ', 'INFO');
				casper.echo('Compost Topic with attach file on Latest topic Page', 'INFO');
				casper.echo('***************************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['Valid'].username, json['Valid'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
									casper.waitForSelector('div.post-body.pull-left',function success() {    							
										casper.sendKeys('input[name="subject"]','khan',{reset:true});								
										casper.withFrame('message_ifr', function() {
											casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
											casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
											casper.sendKeys('#tinymce','Verify Post preview with entered message');
										});
										casper.waitForSelector('#all_forums_dropdown', function success() {
											casper.click('#all_forums_dropdown');
											casper.fill('form[name="PostTopic"]',{
												'forum' : 'categories1'
											},false);
											casper.click('#autoUploadAttachment');
											casper.wait(3000 ,function() {
												casper.click('#post_submit');
												wait.waitForElement('div#ajax_subscription_vars div div:nth-child(4) span', casper, function(err, isExist) {
													if(!err){
														if(isExist) {
															casper.test.assertExists('div#ajax_subscription_vars div div:nth-child(4) span');
															var sub = casper.fetchText('div#ajax_subscription_vars div div:nth-child(4) span');
															casper.echo('subject :'+sub,'INFO');													
															forumLoginMethod.logoutFromApp(casper, function(err){
																if (!err){
																	casper.echo('Successfully logout from application', 'INFO');
																}
															});
														}else{
															casper.echo('Message not be generated', 'ERROR');
														}
													}													
												});
											});
										}, function fail() {
											casper.waitForSelector('#previewpost_sbt',function success() {							
												casper.test.assertExists('#previewpost_sbt');
												casper.click('#previewpost_sbt');
											},function fail() {
												casper.echo('Unable to submit form','ERROR');
											});
										});
									},function fail(){
										casper.echo('Unable to Open Form To Start Topic','ERROR');
									});
								}else{
									 casper.echo('Start New Topic link Found', 'ERROR');
								}
							}
						});		  
					}
				});
			});
		});
		
		//22(d).Verify Compost Topic with attach file on Category/topic/Latest topic Page (Register User)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('       case-22-a(register User)                       ', 'INFO');
				casper.echo('Compost Topic with attach file on Category Latest Page', 'INFO');
				casper.echo('******************************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['Valid'].username, json['Valid'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('div#topics ul li:nth-child(2) a', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.click('div#topics ul li:nth-child(2) a');
									wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary', casper, function(err, isExist) {
										if(!err){
											if(isExist) {
												casper.click('a.pull-right.btn.btn-uppercase.btn-primary ');
												casper.waitForSelector('div.post-body.pull-left',function success() {    							
													casper.sendKeys('input[name="subject"]','khan',{reset:true});								
													casper.withFrame('message_ifr', function() {
														casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
														casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
														casper.sendKeys('#tinymce','Verify Post preview with entered message');
													});
													casper.waitForSelector('#all_forums_dropdown', function success() {
														casper.click('#all_forums_dropdown');
														casper.fill('form[name="PostTopic"]',{
															'forum' : 'categories1'
														},false);
														casper.click('#autoUploadAttachment');
														casper.wait(3000 ,function() {
															casper.click('#post_submit');
														    wait.waitForElement('div#ajax_subscription_vars div div:nth-child(4) span', casper, function(err, isExist) {
																if(!err){
																	if(isExist) {
																		casper.test.assertExists('div#ajax_subscription_vars div div:nth-child(4) span');
																		var sub = casper.fetchText('div#ajax_subscription_vars div div:nth-child(4) span');
																		casper.echo('subject :'+sub,'INFO');													
																		forumLoginMethod.logoutFromApp(casper, function(err){
																			if (!err){
																				casper.echo('Successfully logout from application', 'INFO');
																			}
																		});
																	}else{
																		casper.echo('Message not be generated', 'ERROR');
																	}
																}													
															});
														});
													}, function fail() {
														casper.waitForSelector('#previewpost_sbt',function success() {							
															casper.test.assertExists('#previewpost_sbt');
															casper.click('#previewpost_sbt');
														},function fail() {
															casper.echo('Unable to submit form','ERROR');
														});
													});
												},function fail(){
													casper.echo('Unable to Open Form To Start Topic','ERROR');
												});
											}else{
												 casper.echo('Start New Topic link Found', 'ERROR');
											}
										}
									});
								}else{
									 casper.echo('Categories link Found', 'ERROR');
								}
							}
						});		  
					}
				});
			});
		});

	});
}

//23.Verify Compost Topic with Insert photos on Category/topic/Latest topic Page (Registered User/Admin)
composeTopicTest.compostTopicInsert= function() {
    casper.then(function(){
	   
		//23.Test case for Verify Compose Post Options backend Setting
		casper.then(function(){
		    casper.echo('Verify Compose Post Options backend Setting', 'INFO');
			composeTopicMethod.compostTopic(true,casper, casper.test, function(err) {
				if(!err){
				   casper.echo('composeTopicMethod backendSettingCompostTopic working', 'INFO');
				}
			});
		});
		
	    //23(a).Verify Compost Topic with Insert photos on Latest topic Page (Admin)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('       case-23-a(Admin User-Topic Listing)         ', 'INFO');
				casper.echo('Compost Topic with Insert photos on Latest topic Page', 'INFO');
				casper.echo('***************************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
									casper.waitForSelector('div.post-body.pull-left',function success() {    							
										casper.sendKeys('input[name="subject"]','khan',{reset:true});								
										casper.withFrame('message_ifr', function() {
											casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
											casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
											casper.sendKeys('#tinymce','Verify Post preview with entered message');
										});
										casper.click('#image_button_message');
										casper.wait(4000 ,function() {
											casper.click('#autoUploadInsertPhoto');
										    casper.waitForSelector('#all_forums_dropdown', function success() {
												casper.click('#all_forums_dropdown');
												casper.fill('form[name="PostTopic"]',{
													'forum' : 'categories1'
												},false);
												casper.wait(3000 ,function() {
													casper.click('#post_submit');
													 wait.waitForElement('div#ajax_subscription_vars div div:nth-child(4) span:nth-child(1)', casper, function(err, isExist) {
														if(!err){
															if(isExist) {
																casper.test.assertExists('div#ajax_subscription_vars div div:nth-child(4) span:nth-child(1)');
																var sub = casper.fetchText('div#ajax_subscription_vars div div:nth-child(4) span:nth-child(1)');
																casper.echo('subject :'+sub,'INFO');													
																forumLoginMethod.logoutFromApp(casper, function(err){
																	if (!err){
																		casper.echo('Successfully logout from application', 'INFO');
																	}
																});
															}else{
																casper.echo('Message not be generated', 'ERROR');
															}
														}													
													});
												});
											}, function fail() {
												casper.waitForSelector('#previewpost_sbt',function success() {							
													casper.test.assertExists('#previewpost_sbt');
													casper.click('#previewpost_sbt');
												},function fail() {
													casper.echo('Unable to submit form','ERROR');
												});
											});
										});
									},function fail(){
										casper.echo('Unable to Open Form To Start Topic','ERROR');
									});
								}else{
									 casper.echo('Start New Topic link Found', 'ERROR');
								}
							}
						});		  
					}
				});
			});
		});
		
		//23(b).Verify Compost Topic with Insert photos on Category Latest tPage (Admin)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('       case-23-a(Admin User-Topic Listing)     ', 'INFO');
				casper.echo('Compost Topic with Insert photos on Category Page', 'INFO');
				casper.echo('***********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('div#topics ul li:nth-child(2) a', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.click('div#topics ul li:nth-child(2) a');
									wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary', casper, function(err, isExist) {
										if(!err){
											if(isExist) {
												casper.click('a.pull-right.btn.btn-uppercase.btn-primary ');
												casper.waitForSelector('div.post-body.pull-left',function success() {    							
												casper.sendKeys('input[name="subject"]','khan',{reset:true});								
												casper.withFrame('message_ifr', function() {
													casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
													casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
													casper.sendKeys('#tinymce','Verify Post preview with entered message');
												});
												casper.click('#image_button_message');
												casper.wait(4000 ,function() {
													casper.click('#autoUploadInsertPhoto');
													casper.waitForSelector('#all_forums_dropdown', function success() {
														casper.click('#all_forums_dropdown');
														casper.fill('form[name="PostTopic"]',{
															'forum' : 'categories1'
														},false);
														casper.wait(3000 ,function() {
															casper.click('#post_submit');
															wait.waitForElement('div#ajax_subscription_vars div div:nth-child(4) span:nth-child(1)', casper, function(err, isExist) {
																if(!err){
																	if(isExist) {
																		casper.test.assertExists('div#ajax_subscription_vars div div:nth-child(4) span:nth-child(1)');
																		var sub = casper.fetchText('div#ajax_subscription_vars div div:nth-child(4) span:nth-child(1)');
																		casper.echo('subject :'+sub,'INFO');													
																		forumLoginMethod.logoutFromApp(casper, function(err){
																			if (!err){
																				casper.echo('Successfully logout from application', 'INFO');
																			}
																		});
																	}else{
																		casper.echo('Message not be generated', 'ERROR');
																	}
																}													
															});
														});
													}, function fail() {
														casper.waitForSelector('#previewpost_sbt',function success() {							
															casper.test.assertExists('#previewpost_sbt');
															casper.click('#previewpost_sbt');
														},function fail() {
															casper.echo('Unable to submit form','ERROR');
														});
													});
												});
											},function fail(){
												casper.echo('Unable to Open Form To Start Topic','ERROR');
											});
											}else{
												 casper.echo('Start New Topic link Found', 'ERROR');
											}
										}
									});
								}else{
									 casper.echo('Categories link Found', 'ERROR');
								}
							}
						});		  
					}
				});
			});
		});
	
	    //23(c).Verify Compost Topic with Insert photos on Latest topic Page (Registered User)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('       case-23-c(Register User-Topic Listing)      ', 'INFO');
				casper.echo('Compost Topic with Insert photos on Latest topic Page', 'INFO');
				casper.echo('***************************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['Valid'].username, json['Valid'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
								    casper.waitForSelector('div.post-body.pull-left',function success() {    							
										casper.sendKeys('input[name="subject"]','khan',{reset:true});								
										casper.withFrame('message_ifr', function() {
											casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
											casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
											casper.sendKeys('#tinymce','Verify Post preview with entered message');
										});
										casper.click('#image_button_message');
										casper.wait(4000 ,function() {
											casper.click('#autoUploadInsertPhoto');
										    casper.waitForSelector('#all_forums_dropdown', function success() {
												casper.click('#all_forums_dropdown');
												casper.fill('form[name="PostTopic"]',{
													'forum' : 'categories1'
												},false);
												casper.wait(3000 ,function() {
													casper.click('#post_submit');
												    wait.waitForElement('div#ajax_subscription_vars div div:nth-child(4) span', casper, function(err, isExist) {
														if(!err){
															if(isExist) {
																casper.test.assertExists('div#ajax_subscription_vars div div:nth-child(4) span');
																var sub = casper.fetchText('div#ajax_subscription_vars div div:nth-child(4) span');
																casper.echo('subject :'+sub,'INFO');													
																forumLoginMethod.logoutFromApp(casper, function(err){
																	if (!err){
																		casper.echo('Successfully logout from application', 'INFO');
																	}
																});
															}else{
																casper.echo('Message not be generated', 'ERROR');
															}
														}													
													});
												});
											}, function fail() {
												casper.waitForSelector('#previewpost_sbt',function success() {							
													casper.test.assertExists('#previewpost_sbt');
													casper.click('#previewpost_sbt');
												},function fail() {
													casper.echo('Unable to submit form','ERROR');
												});
											});
										});
									},function fail(){
										casper.echo('Unable to Open Form To Start Topic','ERROR');
									});
								}else{
									 casper.echo('Start New Topic link Found', 'ERROR');
								}
							}
						});		  
					}
				});
			});
		});
		
		//23(d).Verify Compost Topic with Insert photos on Category Latest topic Page (Registered User)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('       case-23-d(register User)                       ', 'INFO');
				casper.echo('Compost Topic with Insert photos on Category Latest Page', 'INFO');
				casper.echo('******************************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['Valid'].username, json['Valid'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('div#topics ul li:nth-child(2) a', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.click('div#topics ul li:nth-child(2) a');
									wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary', casper, function(err, isExist) {
										if(!err){
											if(isExist) {
												casper.click('a.pull-right.btn.btn-uppercase.btn-primary ');
												casper.waitForSelector('div.post-body.pull-left',function success() {    							
													casper.sendKeys('input[name="subject"]','khan',{reset:true});								
													casper.withFrame('message_ifr', function() {
														casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
														casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
														casper.sendKeys('#tinymce','Verify Post preview with entered message');
													});
													casper.click('#image_button_message');
													casper.wait(4000 ,function() {
														casper.click('#autoUploadInsertPhoto');
														casper.waitForSelector('#all_forums_dropdown', function success() {
															casper.click('#all_forums_dropdown');
															casper.fill('form[name="PostTopic"]',{
																'forum' : 'categories1'
															},false);
															casper.wait(3000 ,function() {
																casper.click('#post_submit');
																wait.waitForElement('div#ajax_subscription_vars div div:nth-child(4) span', casper, function(err, isExist) {
																	if(!err){
																		if(isExist) {
																			casper.test.assertExists('div#ajax_subscription_vars div div:nth-child(4) span');
																			var sub = casper.fetchText('div#ajax_subscription_vars div div:nth-child(4) span');
																			casper.echo('subject :'+sub,'INFO');													
																			forumLoginMethod.logoutFromApp(casper, function(err){
																				if (!err){
																					casper.echo('Successfully logout from application', 'INFO');
																				}
																			});
																		}else{
																			casper.echo('Message not be generated', 'ERROR');
																		}
																	}													
																});
															});
														}, function fail() {
															casper.waitForSelector('#previewpost_sbt',function success() {							
																casper.test.assertExists('#previewpost_sbt');
																casper.click('#previewpost_sbt');
															},function fail() {
																casper.echo('Unable to submit form','ERROR');
															});
														});
													});
												},function fail(){
													casper.echo('Unable to Open Form To Start Topic','ERROR');
												});
											}else{
												 casper.echo('Start New Topic link Found', 'ERROR');
											}
										}
									});
								}else{
									 casper.echo('Categories link Found', 'ERROR');
								}
							}
						});		  
					}
				});
			});
		});
	
	});
}

//24.Verify Compose Topic with Pin option(Admin)
composeTopicTest.composeTopicPinOption= function() {
	casper.then(function(){
		casper.thenOpen(config.url, function() {
			casper.echo('                case-24               ', 'INFO');
			casper.echo('Verify Compose Topic with Pin option(Admin)', 'INFO');
			casper.echo('********************************************', 'INFO');
			casper.echo('Title of the page :' +this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
				if(!err) {
					casper.echo('login by valid username and password and verify error message', 'INFO');
					wait.waitForElement('div#topics ul li:nth-child(1) a ', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
							    casper.click('div#topics ul li:nth-child(1) a');
								composeTopicMethod.startTopic(false,true,false,data['Topicmessage'],casper,function(err){
									if(!err){
									   	wait.waitForElement('div#ajax_subscription_vars div div:nth-child(4) span', casper, function(err, isExist) {
											if(!err){
												if(isExist) {
													casper.test.assertExists('div#ajax_subscription_vars div div:nth-child(4) span');
													var sub = casper.fetchText('div#ajax_subscription_vars div div:nth-child(4) span');
													casper.echo('subject :'+sub,'INFO');													
													forumLoginMethod.logoutFromApp(casper, function(err){
														if (!err){
															casper.echo('Successfully logout from application', 'INFO');
														}
													});
												}else{
													casper.echo('Message not be generated', 'ERROR');
												}
											}													
										});
									}
								});						   
							}else{
								 casper.echo('Topic Link Not Found', 'ERROR');
							}
						}
					});		  
				}else {
					casper.echo('forumLogin Method loginToApp not working', 'ERROR');
				}
			});
		});
	});
}

//25.Verify Compose Topic with Lock option(Admin)
composeTopicTest.composeTopicLockOption= function() {
	casper.then(function(){	
	
	casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                case-25               ', 'INFO');
				casper.echo('Verify Compose Topic with Lock option(Admin)', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('div#topics ul li:nth-child(1) a', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
								    casper.click('div#topics ul li:nth-child(1) a');
									composeTopicMethod.startTopic(false,false,true,data['Topicmessage'],casper,function(err){
										if(!err){
											wait.waitForElement('div#ajax_subscription_vars div div:nth-child(4) span', casper, function(err, isExist) {
												if(!err){
													if(isExist) {
														casper.test.assertExists('div#ajax_subscription_vars div div:nth-child(4) span');
														var sub = casper.fetchText('div#ajax_subscription_vars div div:nth-child(4) span');
														casper.echo('subject :'+sub,'INFO');													
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err){
																casper.echo('Successfully logout from application', 'INFO');
															}
														});
													}else{
														casper.echo('Message not be generated', 'ERROR');
													}
                                                }													
											});
										}else {
											casper.echo('Method startTopic not working', 'ERROR');
										}
									});						   
								}else{
									 casper.echo('Topic Link Not Found', 'ERROR');
								}
							}
						});		  
					}else {
						casper.echo('forumLogin Method loginToApp not working', 'ERROR');
					}
				});
			});
		});
        
	casper.then(function(){
		composeTopicMethod.deleteTopic(casper,function(err){
			if (!err){
				casper.echo('deleteTopic working', 'INFO');
			}else {
			        casper.echo('composeTopic Method deleteTopic not working', 'ERROR');
			}
		});
	});
});

}


/**************  5.Compose Topic With unnecessary data  ******************/


//26.Test case for create register user(delete Categories)
composeTopicTest.deleteCategories= function() {
       
	casper.then(function(){ 
		
		casper.then(function(){ 
		    casper.echo(' ****   1.categories1        ', 'INFO');
			composeTopicMethod.deleteCategories('categories1',casper,function(err) {
				if(!err){
					casper.echo('composeTopicMethod delete categories2 working', 'INFO');
					}
			});
		});
	
		casper.then(function(){ 
			casper.echo(' ****   2.categories2      ', 'INFO');
			composeTopicMethod.deleteCategories('categories2',casper,function(err) {
				if(!err){
					casper.echo('composeTopicMethod delete categories2 working', 'INFO');
					}
			});
		});
	});
}

//27.Test case for create register user
composeTopicTest.deleteUser= function() {
       
	casper.then(function(){  /* Uncessary use of then*/
		
		casper.then(function(){ 
		    casper.echo(' ****   1.Delete register user         ', 'INFO');
			composeTopicMethod.deleteUser('rajan41',casper,function(err) {
				if(!err){
					casper.echo('composeTopicMethod deleteUser working', 'INFO');
					}
			});
		});
	
		casper.then(function(){ 
			casper.echo(' ****   2.Delete admin user      ', 'INFO');
			composeTopicMethod.deleteUser('sangita',casper,function(err) {
				if(!err){
					casper.echo('composeTopicMethod deleteUser working', 'INFO');
					}
			});
		});
	});
}



