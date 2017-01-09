'use strict';
var wait = require('../wait.js');
var forumLoginMethod = require('../methods/login.js');
var composeTopicMethod = require('../methods/composeTopic.js');
var json = require('../../testdata/loginData.json');
var composeTopicTest=module.exports = {};
var screenShotsDir = config.screenShotsLocation + 'composeTopic/';
var errorMessage = "";



/**************************** Test case for composeTopic *********************/


//1.Test case for Add New Topic with selecting category and verify message
composeTopicTest.addNewTopicSelectingCategory= function() {
	casper.then(function(){
		casper.thenOpen(config.url, function() {
			casper.echo('                   case-1                    ', 'INFO');
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
								composeTopicMethod.startTopic(true,false,false,json['Topicmessage'],casper,function(err){
									if(!err){
										casper.echo('composeTopicMethod.startTopic');
										forumLoginMethod.logoutFromApp(casper, function(err){
											if (!err)
											casper.echo('Successfully logout from application', 'INFO');
										});
									}
								});						   
							}
						}
					});		  
				}
			});
		});
	});
}

//2.test case for Add New Topic with hindi text and verify message
composeTopicTest.addNewTopicHindiText= function() {
	casper.then(function(){
		casper.thenOpen(config.url, function() {
			casper.echo('                   case-2                    ', 'INFO');
			casper.echo(' test case for Add New Topic with hindi text and verify message', 'INFO');
			casper.echo('********************************************', 'INFO');
			casper.echo('Title of the page :' +this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
				if(!err) {
					casper.echo('login by valid username and password and verify error message', 'INFO');
					wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
							   casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
								composeTopicMethod.startTopic(true,false,false,json['topicHindiMessage'],casper,function(err){
									if(!err){
										casper.echo('composeTopicMethod.startTopic');
										forumLoginMethod.logoutFromApp(casper, function(err){
											if (!err)
											casper.echo('Successfully logout from application', 'INFO');
										});
									}
								});						   
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
	casper.then(function(){
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
											casper.sendKeys('#tinymce','hello khan');
										
										});
										casper.waitForSelector('#all_forums_dropdown', function success() {
											casper.click('#all_forums_dropdown');
											casper.fill('form[name="PostTopic"]',{
												'forum' : 'General'
											},false);
											casper.then(function() {
												casper.click('#previewpost_sbt');
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
							}
						}
					});		  
				}
			});
			casper.then(function(){
			 	forumLoginMethod.logoutFromApp(casper, function(err){
					if (!err)
					casper.echo('Successfully logout from application', 'INFO');
				});
			});
		});
	});
}

//4.test case for Verify Post preview with image of entered message
composeTopicTest.postPreviewImage= function() {
	casper.then(function(){
		casper.thenOpen(config.url, function() {
			casper.echo('                   case-3                    ', 'INFO');
			casper.echo(' Verify Post preview with image of entered message', 'INFO');
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
											//casper.sendKeys('#tinymce','hello khan');
											casper.capture('34.png');
										});
										casper.waitForSelector('#all_forums_dropdown', function success() {
											casper.click('#all_forums_dropdown');
											casper.fill('form[name="PostTopic"]',{
												'forum' : 'General'
											},false);
											casper.then(function() {
												casper.click('#previewpost_sbt');
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
							}
						}
					});		  
				}
			});
			casper.then(function(){
			 	forumLoginMethod.logoutFromApp(casper, function(err){
					if (!err)
					casper.echo('Successfully logout from application', 'INFO');
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
								composeTopicMethod.startTopic(true,false,false,json['topicMoreMessage'],casper,function(err){
									if(!err){
										casper.echo('composeTopicMethod.startTopic');
											forumLoginMethod.logoutFromApp(casper, function(err){
											if (!err)
											casper.echo('Successfully logout from application', 'INFO');
										});
									}
								});						   
							}
						}
					});		  
				}
			});
		});
	});
}



/**************************** Test case for Compost Topic (Make sure 'Post approval' is disabled)  *********************/


//1.test case for Verify Compost Topic on Category Listing Page(For Guest/Registered User/Admin)
composeTopicTest.compostTopicCategoryListingPage= function() {
   
   casper.then(function(){	
      
	  //Test case for Verify Compost Topic on Category Listing Page(BackendSetting)
	    casper.then(function(){
		    casper.echo('                   BackendSetting                 ', 'INFO');
			composeTopicMethod.backendSettingCompostTopic(casper, casper.test, function(err) {
				if(!err){
				   casper.echo('composeTopicMethod backendSettingCompostTopic working', 'INFO');
				}
			});
		});
		
		//1(a).test case for Verify Compost Topic on Category Listing Page(Admin)
	    casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                   case-1-a(Admin)                  ', 'INFO');
				casper.echo(' Verify Compost Topic on Category Listing Page', 'INFO');
				casper.echo('********************************************', 'INFO');
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
												composeTopicMethod.startTopic(true,false,false,json['Topicmessage'],casper,function(err){
													if(!err){
														casper.echo('composeTopicMethod.startTopic');
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err)
															casper.echo('Successfully logout from application', 'INFO');
														});
													}
												});						   
											}
										}
									});						   
								}
							}
						});		  
					}
				});
			});
		});
		
		//1(b).test case for Verify Compost Topic on Category Listing Page(Registered User)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                   case-1-b(Registered User)                  ', 'INFO');
				casper.echo(' Verify Compost Topic on Category Listing Page', 'INFO');
				casper.echo('********************************************', 'INFO');
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
												composeTopicMethod.startTopic(true,false,false,json['Topicmessage'],casper,function(err){
													if(!err){
														casper.echo('composeTopicMethod.startTopic');
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err)
															casper.echo('Successfully logout from application', 'INFO');
														});
													}
												});						   
											}
										}
									});						   
								}
							}
						});		  
					}
				});
			});
		});
		
		//Test case for Verify Compost Topic on Category Listing Page(BackendSetting)
	    casper.then(function(){
		    casper.echo('                   **BackendSetting**                 ', 'INFO');
			composeTopicMethod.topicViewSetting(casper, casper.test, function(err) {
				if(!err){
				   casper.echo('composeTopicMethod backendSettingCompostTopic working', 'INFO');
				}
			});
		});
	
		//1(c).test case for Verify Compost Topic on Category Listing Page(For Guest)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                   case-1-c(For Guest)        ', 'INFO');
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
												casper.sendKeys('#tinymce','hrwwkwkkkfnksdnf');
											});
											casper.fill('form[name="PostTopic"]',{
												'name' : 'sahil',
												'email' : 'sahil@gmail.com',
												'subject':'topic-data',
												'forum' : 'General'
											},false);
											casper.then(function() {
												casper.click('#post_submit');
											});
										});
									}
								}
							});	
						}
					}
				});	
			});
		});
	});	
}

//2.test case for Verify Compost Topic on Topic Listing Page(For Guest/Registered User/Admin)
composeTopicTest.compostTopicListingPage= function() {
   
   casper.then(function(){	
      
		//2(a).test case for Verify Compost Topic on Topic Listing Page(Admin)
	    casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                   case-2-a(Admin)                  ', 'INFO');
				casper.echo(' Verify Compost Topic on Topic Listing Page', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
								   casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
									composeTopicMethod.startTopic(true,false,false,json['Topicmessage'],casper,function(err){
										if(!err){
											casper.echo('composeTopicMethod.startTopic');
											forumLoginMethod.logoutFromApp(casper, function(err){
												if (!err)
												casper.echo('Successfully logout from application', 'INFO');
											});
										}
									});						   
								}
							}
						});		  
					}
				});
			});
		});
		
		//2(b).test case for Verify Compost Topic on Topic Listing Page(Registered User)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                   case-1-b(Registered User)            ', 'INFO');
				casper.echo(' Verify Compost Topic on Topic Listing Page', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['Valid'].username, json['Valid'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
								   casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
									composeTopicMethod.startTopic(true,false,false,json['Topicmessage'],casper,function(err){
										if(!err){
											casper.echo('composeTopicMethod.startTopic');
											forumLoginMethod.logoutFromApp(casper, function(err){
												if (!err)
												casper.echo('Successfully logout from application', 'INFO');
											});
										}
									});						   
								}
							}
						});		  
					}
				});
			});
		});
		
		//2(c).test case for Verify Compost Topic on Topic Listing Page(For Guest)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                   case-1-c(For Guest)        ', 'INFO');
				casper.echo(' Verify Compost Topic on Topic Listing Page', 'INFO');
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
									casper.sendKeys('#tinymce','hrwwkwkkkfnksdnf');
								});
							    casper.fill('form[name="PostTopic"]',{
									'name' : 'sahil',
									'email' : 'sahil@gmail.com',
									'subject':'topic-data',
									'forum' : 'General'
								},false);
								casper.then(function() {
									casper.click('#post_submit');
								});
							});
						}
					}
				});	
			});
		});
	
	});	
}

//3.test case for Verify Compost Topic on Topic Listing Page(For Guest/Registered User/Admin)
composeTopicTest.compostTopicLatestTopicPage= function() {
   
   casper.then(function(){	
      
		//3(a).test case for Verify Compost Topic on Topic Listing Page(Admin)
	    casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                   case-3-a(Admin)                  ', 'INFO');
				casper.echo(' test case for Verify Compost Topic on Topic Listing Page', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
								   casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
									composeTopicMethod.startTopic(true,false,false,json['Topicmessage'],casper,function(err){
										if(!err){
											casper.echo('composeTopicMethod.startTopic');
											forumLoginMethod.logoutFromApp(casper, function(err){
												if (!err)
												casper.echo('Successfully logout from application', 'INFO');
											});
										}
									});						   
								}
							}
						});		  
					}
				});
			});
		});
		
		//3(b).test case for Verify Compost Topic on Topic Listing Page(Registered User)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                   case-3-b(Registered User)            ', 'INFO');
				casper.echo(' test case for Verify Compost Topic on Topic Listing Page', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['Valid'].username, json['Valid'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
								   casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
									composeTopicMethod.startTopic(true,false,false,json['Topicmessage'],casper,function(err){
										if(!err){
											casper.echo('composeTopicMethod.startTopic');
											forumLoginMethod.logoutFromApp(casper, function(err){
												if (!err)
												casper.echo('Successfully logout from application', 'INFO');
											});
										}
									});						   
								}
							}
						});		  
					}
				});
			});
		});
		
		//3(c).test case for Verify Compost Topic on Topic Listing Page(For Guest)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                   case-3-c(For Guest)        ', 'INFO');
				casper.echo(' test case for Verify Compost Topic on Topic Listing Page', 'INFO');
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
									casper.sendKeys('#tinymce','hrwwkwkkkfnksdnf');
								});
							    casper.fill('form[name="PostTopic"]',{
									'name' : 'sahil',
									'email' : 'sahil@gmail.com',
									'subject':'topic-data',
									'forum' : 'General'
								},false);
								casper.then(function() {
									casper.click('#post_submit');
								});
							});
						}
					}
				});	
			});
		});
	
	});	
}

//4.test case for Verify Compose Topic when there is no topic available(For Guest/Registered User/Admin)
composeTopicTest.composeTopicNoTopicAvailable= function() {
   
   casper.then(function(){	
        
		//4(a).test case for Verify Compost Topic on Topic Listing Page(Admin topic)
	    casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                   case-4-a(Admin)                  ', 'INFO');
				casper.echo(' test case for Verify Compose Topic when there is no topic available', 'INFO');
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
										 casper.capture('23.png');
										 casper.test.assertExists('a#delete');
										 casper.click('a#delete');
										 wait.waitForTime(2000 , casper , function(err) {
											 casper.capture('24.png');
											 wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary', casper, function(err, isExist) {
												if(!err){
													if(isExist) {
													   casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
														composeTopicMethod.startTopic(true,false,false,json['Topicmessage'],casper,function(err){
															if(!err){
																casper.echo('composeTopicMethod.startTopic');
																forumLoginMethod.logoutFromApp(casper, function(err){
																	if (!err)
																	casper.echo('Successfully logout from application', 'INFO');
																});
															}
														});						   
													}
												}
											});	
										});
									});			   
								}
							}
						});		  
					}
				});
			});
		});
		  
		//4.test case for Verify Compost Topic on Topic Listing Page(Delete topic)
		casper.then(function(){
			  composeTopicMethod.deleteTopic(casper,function(err){
					if (!err)
					casper.echo('Successfully logout from application', 'INFO');
				});
		});
		
		//4(b).test case for Verify Compost Topic on Topic Listing Page(Registered User)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                   case-4-b(Registered User)            ', 'INFO');
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
									composeTopicMethod.startTopic(true,false,false,json['Topicmessage'],casper,function(err){
										if(!err){
											casper.echo('composeTopicMethod.startTopic');
											forumLoginMethod.logoutFromApp(casper, function(err){
												if (!err)
												casper.echo('Successfully logout from application', 'INFO');
											});
										}
									});						   
								}
							}
						});		  
					}
				});
			});
		});
		
		 //4.test case for Verify Compost Topic on Topic Listing Page(Delete topic)
		casper.then(function(){
			  composeTopicMethod.deleteTopic(casper,function(err){
					if (!err)
					casper.echo('Successfully logout from application', 'INFO');
				});
		});
		
		//4(c).test case for Verify Compost Topic on Topic Listing Page(For Guest)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                   case-4-c(For Guest)        ', 'INFO');
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
									casper.sendKeys('#tinymce','hrwwkwkkkfnksdnf');
								});
							    casper.fill('form[name="PostTopic"]',{
									'name' : 'sahil',
									'email' : 'sahil@gmail.com',
									'subject':'topic-data',
									'forum' : 'General'
								},false);
								casper.then(function() {
									casper.click('#post_submit');
								});
							});
						}
					}
				});	
			});
		});

	});	
}

//5.test case for Verify Preview Post of Compose Topic(For Guest/Registered User/Admin-preview)
composeTopicTest.previewPostComposeTopic= function() {
   
   casper.then(function(){	
     
		//5(a).test case for Verify Preview Post of Compose Topic(For Admin-preview)
	    casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                   case-5-a(Admin)                  ', 'INFO');
				casper.echo('test case for Verify Preview Post of Compose Topic(For Admin-preview)', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
					    casper.capture('533.png');
					    wait.waitForTime(4000 , casper , function(err) {
							casper.capture('5433.png');
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
										'forum' : 'General'
									},false);
									casper.then(function() {
										casper.click('#previewpost_sbt');
										 wait.waitForTime(3000 , casper , function(err) {										 
											//casper.test.assertExists('div#ajax_subscription_vars div div:nth-child(4) span');
											var res = casper.evaluate(function(){
												var element =document.querySelector('div#ajax_subscription_vars div div:nth-child(4) span').getAttribute('id');
												return element;
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
		
		//5(b).test case for Verify Preview Post of Compose Topic(For Registered User-preview)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                   case-5-b(Registered User)            ', 'INFO');
				casper.echo('test case for Verify Preview Post of Compose Topic(For Registered User-preview)', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['Valid'].username, json['Valid'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
					    casper.capture('633.png');
					    wait.waitForTime(3000 , casper , function(err) {
							casper.capture('6333.png');
							casper.click('a.pull-right.btn.btn-uppercase.btn-primary ');
							casper.waitForSelector('div.post-body.pull-left',function success() {    							
								casper.sendKeys('input[name="subject"]','raj-registerUser',{reset:true});								
								casper.withFrame('message_ifr', function() {
									casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
									casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
									casper.sendKeys('#tinymce','social-issue-registerUser');
									casper.capture('634.png');
								});
								casper.waitForSelector('#all_forums_dropdown', function success() {
									casper.click('#all_forums_dropdown');
									casper.fill('form[name="PostTopic"]',{
										'forum' : 'General'
									},false);
									casper.then(function() {
										casper.click('#previewpost_sbt');
										 wait.waitForTime(2000 , casper , function(err) {
											//casper.test.assertExists('div#ajax_subscription_vars div div:nth-child(4) span');
											var res = casper.evaluate(function(){
												var element =document.querySelector('div#ajax_subscription_vars div div:nth-child(4) span').getAttribute('id');
												return element;
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
		
		//5(c).test case for Verify Preview Post of Compose Topic(For Guest-preview)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                   case-5-c(For Guest)        ', 'INFO');
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
							casper.capture('734.png');
						});
						casper.waitForSelector('#all_forums_dropdown', function success() {
							casper.click('#all_forums_dropdown');
							casper.fill('form[name="PostTopic"]',{
								'forum' : 'General'
							},false);
							casper.then(function() {
								casper.click('#previewpost_sbt');
								wait.waitForTime(2000 , casper , function(err) {
									//casper.test.assertExists('div#ajax_subscription_vars div div:nth-child(4) span');
									var res = casper.evaluate(function(){
										var element =document.querySelector('div#ajax_subscription_vars div div:nth-child(4) span').getAttribute('id');
										return element;
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

//6.Verify Preview Post of Compose Topic(For Guest/Registered User/Admin-Message generate)
composeTopicTest.previewPostComposeTopicMessage= function() {
   
   casper.then(function(){	
     
		//6(a).test case for Verify Preview Post of Compose Topic(For Admin-Message generate)
	    casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                   case-6-a(Admin)                  ', 'INFO');
				casper.echo('test case for Verify Preview Post of Compose Topic(For Admin-Message generate)', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
					    casper.capture('533.png');
					    wait.waitForTime(4000 , casper , function(err) {
							
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
										'forum' : 'General'
									},false);
									casper.then(function() {
										casper.click('#previewpost_sbt');
										 wait.waitForTime(3000 , casper , function(err) {										 
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
		
		//6(b).test case for Verify Preview Post of Compose Topic(For Registered User-Message generate)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                   case-6-b(Registered User)            ', 'INFO');
				casper.echo('test case for Verify Preview Post of Compose Topic(For Registered User-Message generate)', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['Valid'].username, json['Valid'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
					    casper.capture('633.png');
					    wait.waitForTime(3000 , casper , function(err) {
							casper.capture('6333.png');
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
										'forum' : 'General'
									},false);
									casper.then(function() {
										casper.click('#previewpost_sbt');
										 wait.waitForTime(2000 , casper , function(err) {
											var res = casper.fetchText('div.alert.alert-danger.text-center');
											casper.echo('post_message :' +res,'INFO');
											forumLoginMethod.logoutFromApp(casper, function(err){
												if (!err)
												casper.echo('Successfully logout from application', 'INFO');
												wait.waitForTime(4000 , casper , function(err) {
												
												});
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
		
		//6(c).test case for Verify Preview Post of Compose Topic(For Guest-Message generate)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                   case-6-c(For Guest)        ', 'INFO');
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
							'forum' : 'General'
						},false);
						casper.then(function() {
							casper.click('#previewpost_sbt');
							wait.waitForTime(2000 , casper , function(err) {
							     casper.capture('23.png');
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

//7.Verify Compose Topic without selecting any category(For Guest/Registered User/Admin)
composeTopicTest.composeTopicWithoutSelectingAnyCategory= function() {
   
   casper.then(function(){	
     
		//7(a).Verify Compose Topic without selecting any category(For Admin)
	    casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                   case-7-a(Admin)                  ', 'INFO');
				casper.echo('Verify Compose Topic without selecting any category(For Admin)', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
					    casper.capture('533.png');
					    wait.waitForTime(4000 , casper , function(err) {
							
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
										 wait.waitForTime(3000 , casper , function(err) {										 
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
		
		//7(b).Verify Compose Topic without selecting any category(For Registered User)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                   case-7-b(Registered User)            ', 'INFO');
				casper.echo('Verify Compose Topic without selecting any category(For Registered User)', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['Valid'].username, json['Valid'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
					    casper.capture('633.png');
					    wait.waitForTime(3000 , casper , function(err) {
							casper.capture('6333.png');
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
										 wait.waitForTime(2000 , casper , function(err) {
											var res = casper.fetchText('div.alert.alert-danger.text-center');
											casper.echo('post_message :' +res,'INFO');
											forumLoginMethod.logoutFromApp(casper, function(err){
												if (!err)
												casper.echo('Successfully logout from application', 'INFO');
												wait.waitForTime(4000 , casper , function(err) {
												
												});
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
		
		//7(c).Verify Compose Topic without selecting any category(For Guest)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                   case-7-c(For Guest)        ', 'INFO');
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
							wait.waitForTime(2000 , casper , function(err) {
							     casper.capture('23.png');
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


//1.Test case for Verify Compose Post Options(For Guest User)
composeTopicTest.composePostOptions= function() {
   
   casper.then(function(){	
        
		 //1(a).Test case for Verify Compose Post Options(For Guest)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                   case-1-a(For Guest)        ', 'INFO');
				casper.echo('Test case for Verify Compose Post Options(For Guest)', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');  
				casper.click('a.pull-right.btn.btn-uppercase.btn-primary ');
				wait.waitForTime(2000 , casper , function(err) {
				  casper.capture('23.png');
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
		 
		//1(b).Test case for Verify Compose Post Options(For Registered User)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                   case-1-b(Registered User)            ', 'INFO');
				casper.echo('Verify Compose Topic without selecting any category(For Registered User)', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['Valid'].username, json['Valid'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
					    wait.waitForTime(3000 , casper , function(err) {
							casper.click('a.pull-right.btn.btn-uppercase.btn-primary ');
							wait.waitForTime(2000 , casper , function(err) {
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
		
		//1(c).Test case for Verify Compose Post Options(For Registered User)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                   case-1-b(Registered User)            ', 'INFO');
				casper.echo('Verify Compose Topic without selecting any category(For Registered User)', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['Valid'].username, json['Valid'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
					    wait.waitForTime(3000 , casper , function(err) {
							casper.click('a.pull-right.btn.btn-uppercase.btn-primary ');
							wait.waitForTime(2000 , casper , function(err) {
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
		 
		//1.Test case for Verify Compose Post Options backend Setting
		  casper.then(function(){
		    casper.echo('                   **BackendSetting**                 ', 'INFO');
			composeTopicMethod.compostTopic(false,casper, casper.test, function(err) {
				if(!err){
				   casper.echo('composeTopicMethod backendSettingCompostTopic working', 'INFO');
				}
			});
		});
		
		//1(d).Test case for Verify Compose Post Options(For Admin)
	    casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                   case-1-d(Admin)                  ', 'INFO');
				casper.echo('Verify Compose Topic without selecting any category(For Admin)', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
					 
					    wait.waitForTime(4000 , casper , function(err) {
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

//1.Verify Compose Topic on Category/topic Listing Page(if start new topic permission is disabled)(For Guest User)
composeTopicTest.startNewTopicPermissionDisabled= function() {
	casper.then(function(){
	    casper.echo('                   case-1                 ', 'INFO');
		casper.echo('Verify Compose Topic on Category/topic Listing Page(if start new topic permission is disabled)', 'INFO');
		casper.echo('********************************************', 'INFO');
		composeTopicMethod.composeTopicPermission(false,casper, casper.test, function(err) {
			if(!err){
				casper.thenOpen(config.url, function() { 
					casper.click('a.pull-right.btn.btn-uppercase.btn-primary ');
					wait.waitForTime(3000 , casper , function(err) {								
						var res = casper.fetchText('#myModalLabel');
						casper.echo('message :' +res,'INFO');
					});
				});
			}
		});
	});
}

//2.Verify Compose Topic on topic listing page(if start new topic permission is disabled of one cateogry)(For Guest User)
composeTopicTest.listingPageDisabledOneCateogry= function() {
	casper.then(function(){
	   
	   //test case for Backend Setting( Unregistered / Not Logged In Start Topics Permission enable /disable)
		casper.then(function(){
			casper.echo('Backend Setting( Unregistered / Not Logged In Start Topics Permission enable)', 'INFO');
			composeTopicMethod.composeTopicPermission(true,casper,casper.test, function(err) {
				if(!err){
					 casper.echo('composeTopicMethod composeTopicPermission working', 'INFO');
				}
			});
		});
	
	  //test case for Backend Setting(listingPageDisabledOneCateogry)
		casper.then(function(){
		      casper.echo('Backend Setting(listingPageDisabledOneCateogry for Unregistered / Not Logged In) ', 'INFO');
			  composeTopicMethod.listingPageDisabledOneCateogry('Unregistered / Not Logged In',casper,casper.test,function(err) {
				if(!err){
					casper.echo('composeTopicMethod listingPageDisabledOneCateogry working', 'INFO');
				}
			});
		});
	
	    //Verify Compose Topic on topic listing page if start new topic permission is disabled of one cateogry (Message verify)
	    casper.then(function(){
			casper.thenOpen(config.url, function() { 
			casper.echo('                   case-2                 ', 'INFO');
			casper.echo('test case if start new topic permission is disabled of one cateogry(Message verify)', 'INFO');
			casper.echo('********************************************', 'INFO');
				casper.test.assertExists('div#topics ul li:nth-child(2) a');
				casper.click('div#topics ul li:nth-child(2) a');
				wait.waitForElement('ul li[id^="forum_"]:nth-child(1) span span:nth-child(1) a', casper, function(err, isExist) {
					if(!err){
						if(isExist) {
							casper.test.assertExists('ul li[id^="forum_"]:nth-child(1) span span:nth-child(1) a');
							casper.click('ul li[id^="forum_"]:nth-child(1) span span:nth-child(1) a');
							wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary.signupLogin', casper, function(err, isExist) {
								if(!err){
									if(isExist) {
										casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary.signupLogin');
										casper.click('a.pull-right.btn.btn-uppercase.btn-primary.signupLogin');
										wait.waitForTime(2000 , casper , function(err) {								
											var res = casper.fetchText('#myModalLabel');
											casper.echo('message :' +res,'INFO');
										});																						
									}else{
										 casper.echo('Start New Topic Not Found', 'ERROR');
									}
								}
							});																							
						}else{
							 casper.echo('Categories Not Found', 'ERROR');
						}
					}
				});
			
			});
		});
		
		//Verify Compose Topic on topic listing page(create topic)
		casper.then(function(){
		casper.echo('                   case-2-b                ', 'INFO');
		casper.echo('test case if start new topic permission is disabled of one cateogry(Message verify)', 'INFO');
		casper.echo('********************************************', 'INFO');
		    casper.thenOpen(config.url, function() { 
				casper.test.assertExists('div#topics ul li:nth-child(2) a');
				casper.click('div#topics ul li:nth-child(2) a');
				wait.waitForElement('ul li[id^="forum_"]:nth-child(2) span span:nth-child(1) a', casper, function(err, isExist) {
					if(!err){
						if(isExist) {
							casper.test.assertExists('ul li[id^="forum_"]:nth-child(2) span span:nth-child(1) a');
							casper.click('ul li[id^="forum_"]:nth-child(2) span span:nth-child(1) a');
							wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary ', casper, function(err, isExist) {
								if(!err){
									if(isExist) {
										casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary ');
										casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
										casper.waitForSelector('div.post-body.pull-left',function success() { 
											casper.withFrame('message_ifr', function() {
												casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
												casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
												casper.sendKeys('#tinymce','hrwwkwkkkfnksdnf');
											});
											casper.fill('form[name="PostTopic"]',{
												'name' : 'sahil',
												'email' : 'sahil@gmail.com',
												'subject':'topic-data'
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
						}else{
							 casper.echo('Categories Not Found', 'ERROR');
						}
					}
				});
			});
		});
	
	});
	  
}

//3.Verify Dropdown of Compose Topic on Category/Latest topic page(if start new topic permission is disabled of one cateogry)(For Guest User)
composeTopicTest.dropdownDisabledOneCateogry = function() {
	casper.then(function(){
	   
	   //test case for Backend Setting( Unregistered / Not Logged In Start Topics Permission enable /disable)
		casper.then(function(){
			casper.echo('Backend Setting( Unregistered / Not Logged In Start Topics Permission enable)', 'INFO');
			composeTopicMethod.composeTopicPermission(true,casper,casper.test, function(err) {
				if(!err){
					 casper.echo('composeTopicMethod composeTopicPermission working', 'INFO');
				}
			});
		});
		
		//test case for Backend Setting(listingPageDisabledOneCateogry for Unregistered / Not Logged In)
		casper.then(function(){
		      casper.echo('Backend Setting( listingPage Disabled OneCateogry for Unregistered / Not Logged In)', 'INFO');
			  composeTopicMethod.listingPageDisabledOneCateogry('Unregistered / Not Logged In',casper,casper.test,function(err) {
				if(!err){
					casper.echo('composeTopicMethod listingPageDisabledOneCateogry working', 'INFO');
				}
			});
		});
		
	    //3(a).test case for Dropdown if start new topic permission is disabled of one cateogry(Message verify))
		casper.then(function(){
		    casper.thenOpen(config.url, function() { 
			    casper.echo('                   case-3-a                ', 'INFO');
				casper.echo('test case for Dropdown if start new topic permission is disabled of one cateogry(Message verify)', 'INFO');
				casper.echo('********************************************', 'INFO');
				wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary ', casper, function(err, isExist) {
					if(!err){
						if(isExist) {
							casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary ');
							casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
							casper.waitForSelector('div.post-body.pull-left',function success() { 
							
								casper.withFrame('message_ifr', function() {
									casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
									casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
									casper.sendKeys('#tinymce','hrwwkwkkkfnksdnf');
								});
								casper.fill('form[name="PostTopic"]',{
									'name' : 'darpan',
									'email' : 'sahil@gmail.com',
									'subject':'topic-data',
									'forum' : 'News'
								},false);
								casper.then(function() {
								     
									casper.click('#post_submit');
									wait.waitForTime(2000, casper, function() { 
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
		
		 //3(b).test case for Dropdown if start new topic permission is disabled of one cateogry(Message verify)
		casper.then(function(){
		    casper.thenOpen(config.url, function() { 
			    casper.echo('                   case-3-b                ', 'INFO');
				casper.echo('test case for Dropdown if start new topic permission is disabled of one cateogry(create topic)', 'INFO');
				casper.echo('********************************************', 'INFO');
				wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary ', casper, function(err, isExist) {
					if(!err){
						if(isExist) {
							casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary ');
							casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
							casper.waitForSelector('div.post-body.pull-left',function success() { 
							
								casper.withFrame('message_ifr', function() {
									casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
									casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
									casper.sendKeys('#tinymce','hrwwkwkkkfnksdnf');
								});
								casper.fill('form[name="PostTopic"]',{
									'name' : 'darpan',
									'email' : 'sahil@gmail.com',
									'subject':'topic-data',
									'forum' : 'General'
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

//4.Verify Compose Topic on Category/topic/Latest topic Page(if start new topic permission is disabled)(For Register User)
composeTopicTest.composePostRegisterUser = function() {
	casper.then(function(){
	
	    //test case for Backend Setting(Compost Topic (start new topic permission is disabled for register User)
		casper.then(function(){
			casper.echo('BackendSetting(start new topic permission is disabled for register User)', 'INFO');
			composeTopicMethod.permissionDisabled(casper,casper.test, function(err) {
				if(!err){
					 casper.echo('composeTopicMethod composeTopicPermission working', 'INFO');
				}
			});
		});
		
		//4(a).Verify Compose Topic on topic Page
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('Verify Compose Topic on topic Page', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['Valid'].username, json['Valid'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForTime(2000, casper, function() {
                            casper.capture('22.png');	
							var grpName = casper.evaluate(function() {
								var id = document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary ').innerHTML;
								return id;
							});
                            casper.echo('message'+grpName,'INFO');

							forumLoginMethod.logoutFromApp(casper, function(err){
								if (!err)
								casper.echo('Successfully logout from application', 'INFO');
							});
					    });			  
					}
				});
			});
		});
		
		//4(b).Verify Compose Topic on Category topic Page
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                   case-4-b(Registered User)            ', 'INFO');
				casper.echo('Verify Compose Topic on Category topic Page', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['Valid'].username, json['Valid'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForTime(2000, casper, function() {
                            casper.capture('22.png');	
							var grpName = this.evaluate(function() {
							var id = document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary ').getAttribute('data-original-title');
							return id;
							});
                            				casper.echo('a[href="'+grpName+'"]');

							forumLoginMethod.logoutFromApp(casper, function(err){
								if (!err)
								casper.echo('Successfully logout from application', 'INFO');
							});
					    });			  
					}
				});
			});
		});
		
		//4(c).Verify Compose Topic on Latest topic Page
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                   case-4-b(Registered User)            ', 'INFO');
				casper.echo('Verify Compose Topic on Latest topic Page', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['Valid'].username, json['Valid'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForTime(2000, casper, function() {
                            casper.capture('22.png');	
							var grpName = this.evaluate(function() {
							var id = document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary ').getAttribute('data-original-title');
							return id;
							});
                            				casper.echo('a[href="'+grpName+'"]');

							forumLoginMethod.logoutFromApp(casper, function(err){
								if (!err)
								casper.echo('Successfully logout from application', 'INFO');
							});
					    });			  
					}
				});
			});
		});
	});
	  
}

//5.Verify Compose Topic on topic listing page(if start new topic permission is disabled of one cateogry)(For Register User)
composeTopicTest.previewPostComposeTopic = function() {
	casper.then(function(){
	
	    //test case for Backend Setting(listingPageDisabledOneCateogry for Registered Users)
		casper.then(function(){
		      casper.echo('Backend Setting( listingPage Disabled OneCateogry for Registered Users)', 'INFO');
			  composeTopicMethod.listingPageDisabledOneCateogry('Registered Users',casper,casper.test,function(err) {
				if(!err){
					casper.echo('composeTopicMethod listingPageDisabledOneCateogry working', 'INFO');
				}
			});
		});
	
	    //5(b).test case for Verify Compost Topic on Topic Listing Page(Registered User)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('         case-5-b(Registered User diable Categories)     ', 'INFO');
				casper.echo(' test case for Verify Compost Topic on Topic Listing Page', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['Valid'].username, json['Valid'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						casper.test.assertExists('div#topics ul li:nth-child(2) a');
					    casper.click('div#topics ul li:nth-child(2) a');
						wait.waitForElement('ul li[id^="forum_"]:nth-child(1) span span:nth-child(1) a', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
								   	casper.test.assertExists('ul li[id^="forum_"]:nth-child(1) span span:nth-child(1) a');
					                casper.click('ul li[id^="forum_"]:nth-child(1) span span:nth-child(1) a');
								    wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary', casper, function(err, isExist) {
										if(!err){
											if(isExist) {
											   	casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary');
					                            casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
												casper.capture('error1.png');
												forumLoginMethod.logoutFromApp(casper, function(err){
													if (!err)
													casper.echo('Successfully logout from application', 'INFO');
												});					   
											}
										}
									});						   
								}
							}
						});		  
					}
				});
			});
		});
		
		 //5(c).test case for Verify Compost Topic on Topic Listing Page(Registered User)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('       case-5-c(Registered User enable Categories)       ', 'INFO');
				casper.echo(' test case for Verify Compost Topic on Topic Listing Page', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['Valid'].username, json['Valid'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						casper.test.assertExists('div#topics ul li:nth-child(2) a');
					    casper.click('div#topics ul li:nth-child(2) a');
						wait.waitForElement('ul li[id^="forum_"]:nth-child(2) span span:nth-child(1) a', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
								   	casper.test.assertExists('ul li[id^="forum_"]:nth-child(2) span span:nth-child(1) a');
					                casper.click('ul li[id^="forum_"]:nth-child(2) span span:nth-child(1) a');
								    wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary', casper, function(err, isExist) {
										if(!err){
											if(isExist) {
											   	casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary');
					                            casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
												composeTopicMethod.startTopic(true,false,false,json['Topicmessage'],casper,function(err){
													if(!err){
														casper.echo('composeTopicMethod.startTopic');
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err)
															casper.echo('Successfully logout from application', 'INFO');
														});
													}
												});						   
											}
										}
									});						   
								}
							}
						});		  
					}
				});
			});
		});
	});
}

//6.Verify Dropdown of Compose Topic on Category/Latest topic page(if start new topic permission is disabled of one cateogry)(For Register User)
composeTopicTest.previewPostDropdownTopicMessage = function() {
	casper.then(function(){
	
	    //test case for Backend Setting(listingPageDisabledOneCateogry for Registered Users)
		casper.then(function(){
		      casper.echo('   Backend Setting( listingPage Disabled OneCateogry for Registered Users)  ', 'INFO');
			  composeTopicMethod.listingPageDisabledOneCateogry('Registered Users',casper,casper.test,function(err) {
				if(!err){
					casper.echo('composeTopicMethod listingPageDisabledOneCateogry working', 'INFO');
				}
			});
		});
	   
	   //6(a).test case for Category Dropdown(disable Category)
	   casper.then(function(){
		    casper.thenOpen(config.url, function() { 
			    casper.echo('         case-6-b(Registered User)              ', 'INFO');
				casper.echo('test case for Category Dropdown(disable Category)','INFO');
				casper.echo('************************************************', 'INFO');
				wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary ', casper, function(err, isExist) {
					if(!err){
						if(isExist) {
							casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary ');
							casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
							casper.waitForSelector('div.post-body.pull-left',function success() { 
							
								casper.withFrame('message_ifr', function() {
									casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
									casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
									casper.sendKeys('#tinymce','hrwwkwkkkfnksdnf');
								});
								casper.fill('form[name="PostTopic"]',{
									'name' : 'darpan',
									'email' : 'sahil@gmail.com',
									'subject':'topic-data',
									'forum' : 'News'
								},false);
								casper.then(function() {
								     
									casper.click('#post_submit');
									wait.waitForTime(2000, casper, function() { 
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
		
		//6(b).test case for Category Dropdown(enable Category)
		casper.then(function(){
		    casper.thenOpen(config.url, function() { 
			    casper.echo('         case-6-b(Registered User)              ', 'INFO');
				casper.echo('test case for Category Dropdown(enable Category)', 'INFO');
				casper.echo('************************************************', 'INFO');
				wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary ', casper, function(err, isExist) {
					if(!err){
						if(isExist) {
							casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary ');
							casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
							casper.waitForSelector('div.post-body.pull-left',function success() { 
							
								casper.withFrame('message_ifr', function() {
									casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
									casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
									casper.sendKeys('#tinymce','hrwwkwkkkfnksdnf');
								});
								casper.fill('form[name="PostTopic"]',{
									'name' : 'darpan',
									'email' : 'sahil@gmail.com',
									'subject':'topic-data',
									'forum' : 'General'
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


/**************  5.Compose Topic With Attach, Insert and Follow Option  ******************/

//1.Verify Compose Topic with Un-FollowOption(For Register user/Admin)
composeTopicTest.composeTopicUnFollowOption = function() {
    casper.then(function(){
	
	    //1(a).test case for Verify Compose Topic with Un-FollowOption(Admin User)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('       case-1-a(Admin User-Topic Listing)             ', 'INFO');
				casper.echo('test case for Verify Compose Topic with Un-FollowOption', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('div#topics ', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
								  casper.click('div#topics ul li:nth-child(1) a');
									composeTopicMethod.startTopic(false,false,false,json['Topicmessage'],casper,function(err){
										if(!err){
											wait.waitForTime(2000 , casper , function(err) {
												var sub = casper.fetchText('div#ajax_subscription_vars div div:nth-child(4) span');
												casper.echo('subject :'+sub,'INFO');
												forumLoginMethod.logoutFromApp(casper, function(err){
													if (!err){
													casper.echo('Successfully logout from application', 'INFO');
													}
												});
											});
										}
									});						   
								}
							}
						});		  
					}
				});
			});
		});
	
		 //1(b).test case for Verify Compose Topic with Un-FollowOption(Admin User)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('       case-1-b(Admin User-CategoryLisitng)             ', 'INFO');
				casper.echo('test case for Verify Compose Topic with Un-FollowOption', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('div#topics', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.click('div#topics ul li:nth-child(2) a');
									composeTopicMethod.startTopic(false,false,false,json['Topicmessage'],casper,function(err){
										if(!err){
											wait.waitForTime(2000 , casper , function(err) {
												var sub = casper.fetchText('div#ajax_subscription_vars div div:nth-child(4) span');
												casper.echo('subject :'+sub,'INFO');
												
												forumLoginMethod.logoutFromApp(casper, function(err){
													if (!err){
													casper.echo('Successfully logout from application', 'INFO');
													}
												});
											});
										}
									});									
								}
							}
						});		  
					}
				});
			});
		});
		
		 //1(c).test case for Verify Compose Topic with Un-FollowOption(Admin User)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('       case-1-c(Registered User-Topic Listing)             ', 'INFO');
				casper.echo('test case for Verify Compose Topic with Un-FollowOption', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['Valid'].username, json['Valid'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('div#topics ', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
								  casper.click('div#topics ul li:nth-child(1) a');
									composeTopicMethod.startTopic(false,false,false,json['Topicmessage'],casper,function(err){
										if(!err){
											 wait.waitForTime(2000 , casper , function(err) {
												var sub = casper.fetchText('div#ajax_subscription_vars div div:nth-child(4) span');
												casper.echo('subject :'+sub,'INFO');	
												forumLoginMethod.logoutFromApp(casper, function(err){
													if (!err){
													casper.echo('Successfully logout from application', 'INFO');
													}
												});
											});
										}
									});						   
								}
							}
						});		  
					}
				});
			});
		});
	
		 //1(d).test case for Verify Compose Topic with Un-FollowOption(Registered User)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('       case-1-d(Registered User-CategoryLisitng)             ', 'INFO');
				casper.echo('test case for Verify Compose Topic with Un-FollowOption', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('div#topics', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.click('div#topics ul li:nth-child(2) a');
									composeTopicMethod.startTopic(false,false,false,json['Topicmessage'],casper,function(err){
										if(!err){
											 wait.waitForTime(2000 , casper , function(err) {
												var sub = casper.fetchText('div#ajax_subscription_vars div div:nth-child(4) span');
												casper.echo('subject :'+sub,'INFO');	
												forumLoginMethod.logoutFromApp(casper, function(err){
													if (!err){
													casper.echo('Successfully logout from application', 'INFO');
													}
												});
											});
										}
									});									
								}
							}
						});		  
					}
				});
			});
		});

	});
}

//2.Verify Compose Topic with follow option(For Register user/Admin)
composeTopicTest.composeTopicFollowOption= function() {
    casper.then(function(){
	
	    //2(a).test case for Verify Compose Topic with follow option(Admin User)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('       case-2-a(Admin User-Topic Listing)             ', 'INFO');
				casper.echo('test case for Verify Compose Topic with follow option', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('div#topics ', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
								  casper.click('div#topics ul li:nth-child(1) a');
									composeTopicMethod.startTopic(true,true,true,json['Topicmessage'],casper,function(err){
										if(!err){
											 wait.waitForTime(2000 , casper , function(err) {
												var sub = casper.fetchText('div#ajax_subscription_vars div div:nth-child(4) span');
												casper.echo('subject :'+sub,'INFO');	
												forumLoginMethod.logoutFromApp(casper, function(err){
													if (!err){
													casper.echo('Successfully logout from application', 'INFO');
													}
												});
											});
										}
									});						   
								}
							}
						});		  
					}
				});
			});
		});
	
		 //2(b).test case for Verify Compose Topic with follow option(Admin User)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('       case-2-b(Admin User-CategoryLisitng)             ', 'INFO');
				casper.echo('test case for Verify Compose Topic with follow option', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('div#topics', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.click('div#topics ul li:nth-child(2) a');
									composeTopicMethod.startTopic(true,true,true,json['Topicmessage'],casper,function(err){
										if(!err){
											 wait.waitForTime(2000 , casper , function(err) {
												var sub = casper.fetchText('div#ajax_subscription_vars div div:nth-child(4) span');
												casper.echo('subject :'+sub,'INFO');	
												forumLoginMethod.logoutFromApp(casper, function(err){
													if (!err){
													casper.echo('Successfully logout from application', 'INFO');
													}
												});
											});
										}
									});									
								}
							}
						});		  
					}
				});
			});
		});
		
		 //2(c).test case for Verify Compose Topic with follow option(Admin User)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('       case-2-c(Registered User-Topic Listing)             ', 'INFO');
				casper.echo('test case for Verify Compose Topic with follow option', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['Valid'].username, json['Valid'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('div#topics ', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
								  casper.click('div#topics ul li:nth-child(1) a');
									composeTopicMethod.startTopic(true,true,true,json['Topicmessage'],casper,function(err){
										if(!err){
											 wait.waitForTime(2000 , casper , function(err) {
												var sub = casper.fetchText('div#ajax_subscription_vars div div:nth-child(4) span');
												casper.echo('subject :'+sub,'INFO');	
												forumLoginMethod.logoutFromApp(casper, function(err){
													if (!err){
													casper.echo('Successfully logout from application', 'INFO');
													}
												});
											});
										}
									});						   
								}
							}
						});		  
					}
				});
			});
		});
	
		 //2(d).test case for Verify Compose Topic with follow option(Registered User)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('       case-2-d(Registered User-CategoryLisitng)             ', 'INFO');
				casper.echo('test case for Verify Compose Topic with follow option', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['Valid'].username, json['Valid'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('div#topics', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.click('div#topics ul li:nth-child(2) a');
									composeTopicMethod.startTopic(true,true,true,json['Topicmessage'],casper,function(err){
										if(!err){
											 wait.waitForTime(2000 , casper , function(err) {
												var sub = casper.fetchText('div#ajax_subscription_vars div div:nth-child(4) span');
												casper.echo('subject :'+sub,'INFO');	
												forumLoginMethod.logoutFromApp(casper, function(err){
													if (!err){
													casper.echo('Successfully logout from application', 'INFO');
													}
												});
											});
										}
									});									
								}
							}
						});		  
					}
				});
			});
		});

	});
}

//3.Verify Compost Topic with attach file on Category/topic/Latest topic Page (Registered User/Admin)
composeTopicTest.compostTopicAttachFile= function() {
    casper.then(function(){
	    
		//3.Test case for Verify Compose Post Options backend Setting
		  casper.then(function(){
		    casper.echo('Verify Compose Post Options backend Setting', 'INFO');
			composeTopicMethod.compostTopic(true,casper, casper.test, function(err) {
				if(!err){
				   casper.echo('composeTopicMethod backendSettingCompostTopic working', 'INFO');
				}
			});
		});
		
	    //3(a).Verify Compost Topic with attach file on Category/topic/Latest topic Page (Admin User)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('       case-3-a(Admin User-Topic Listing)             ', 'INFO');
				casper.echo('Compost Topic with attach file on Category/topic/Latest topic Page', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('div#topics ', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.click('div#topics ul li:nth-child(1) a');
									wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary ', casper, function(err, isExist) {
										if(!err){
											if(isExist) {
												casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary ');
												casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
												casper.waitForSelector('div.post-body.pull-left',function success() { 
												
													casper.withFrame('message_ifr', function() {
														casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
														casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
														
													});
													
													wait.waitForTime(2000 , casper , function(err) {
														casper.test.assertExists('a#fancy_attach_');
														 casper.capture('attach2.png');
														//casper.click('a#fancy_attach_');
													 forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err)
															casper.echo('Successfully logout from application', 'INFO');
														});
													});
												});																		
											}else{
												 casper.echo('Start New Topic Not Found', 'ERROR');
											}
										}
									});						   
								}
							}
						});		  
					}
				});
			});
		});
		
		//3(b).Verify Compost Topic with attach file on Category/topic/Latest topic Page (Register User)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('       case-3-a(Register User-Topic Listing)             ', 'INFO');
				casper.echo('Compost Topic with attach file on Category/topic/Latest topic Page', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['Valid'].username, json['Valid'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
					    wait.waitForElement('div#topics ', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.click('div#topics ul li:nth-child(1) a');
									wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary ', casper, function(err, isExist) {
										if(!err){
											if(isExist) {
												casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary ');
												casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
												casper.waitForSelector('div.post-body.pull-left',function success() { 
													casper.withFrame('message_ifr', function() {
														casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
														casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
													});
													
													wait.waitForTime(2000 , casper , function(err) {
													    casper.capture('attach2.png');
														casper.test.assertExists('a#fancy_attach_');
														//casper.click('a#fancy_attach_');
													 forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err)
															casper.echo('Successfully logout from application', 'INFO');
														});
													});
												});																		
											}else{
												 casper.echo('Start New Topic Not Found', 'ERROR');
											}
										}
									});						   
								}
							}
						});	  
					}
				});
			});
		});

	});
}

//4.Verify Compost Topic with Insert photos on Category/topic/Latest topic Page (Registered User/Admin)
composeTopicTest.compostTopicInsert= function() {
    casper.then(function(){
	    
		//4.Test case for Verify Compose Post Options backend Setting
		  casper.then(function(){
		    casper.echo('Verify Compose Post Options backend Setting', 'INFO');
			composeTopicMethod.compostTopic(true,casper, casper.test, function(err) {
				if(!err){
				   casper.echo('composeTopicMethod backendSettingCompostTopic working', 'INFO');
				}
			});
		});
		
	    //4(a).Verify Compost Topic with Insert photos on Category/topic/Latest topic Page (Admin User)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('       case-4-a(Admin User-Topic Listing)             ', 'INFO');
				casper.echo('Compost Topic with Insert photos on Category/topic/Latest topic Page', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('div#topics ', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.click('div#topics ul li:nth-child(1) a');
									wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary ', casper, function(err, isExist) {
										if(!err){
											if(isExist) {
												casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary ');
												casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
												casper.waitForSelector('div.post-body.pull-left',function success() { 
												
													casper.withFrame('message_ifr', function() {
														casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
														casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
														
													});
													
													wait.waitForTime(2000 , casper , function(err) {
													    casper.capture('232.png');
														casper.test.assertExists('a#insert_image_dialog_');
														//casper.click('a#fancy_attach_');
													 forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err)
															casper.echo('Successfully logout from application', 'INFO');
														});
													});
												});																		
											}else{
												 casper.echo('Start New Topic Not Found', 'ERROR');
											}
										}
									});						   
								}
							}
						});		  
					}
				});
			});
		});
		
		//4(b).Verify Compost Topic with Insert photos on Category/topic/Latest topic Page (Register User)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('       case-4-b(Register User-Topic Listing)             ', 'INFO');
				casper.echo('Compost Topic with Insert photos on Category/topic/Latest topic Page', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['Valid'].username, json['Valid'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
					    wait.waitForElement('div#topics ', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.click('div#topics ul li:nth-child(1) a');
									wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary ', casper, function(err, isExist) {
										if(!err){
											if(isExist) {
												casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary ');
												casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
												casper.waitForSelector('div.post-body.pull-left',function success() { 
													casper.withFrame('message_ifr', function() {
														casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
														casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
													});
													
													wait.waitForTime(2000 , casper , function(err) {
													casper.capture('2002.png');
														casper.test.assertExists('a#insert_image_dialog_');
														//casper.click('a#fancy_attach_');
													 forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err)
															casper.echo('Successfully logout from application', 'INFO');
														});
													});
												});																		
											}else{
												 casper.echo('Start New Topic Not Found', 'ERROR');
											}
										}
									});						   
								}
							}
						});	  
					}
				});
			});
		});

	});
}

//5.Verify Compose Topic with Pin option(Admin)
composeTopicTest.composeTopicPinOption= function() {
	casper.then(function(){
		casper.thenOpen(config.url, function() {
			casper.echo('                case-5               ', 'INFO');
			casper.echo('Verify Compose Topic with Pin option(Admin)', 'INFO');
			casper.echo('********************************************', 'INFO');
			casper.echo('Title of the page :' +this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
				if(!err) {
					casper.echo('login by valid username and password and verify error message', 'INFO');
					wait.waitForElement('div#topics ', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
							  casper.click('div#topics ul li:nth-child(1) a');
								composeTopicMethod.startTopic(false,true,false,json['Topicmessage'],casper,function(err){
									if(!err){
									    wait.waitForTime(2000 , casper , function(err) {
											var sub = casper.fetchText('div#ajax_subscription_vars div div:nth-child(4) span');
											casper.echo('subject :'+sub,'INFO');
											
											forumLoginMethod.logoutFromApp(casper, function(err){
												if (!err){
												casper.echo('Successfully logout from application', 'INFO');
												}
											});
										});
									}
								});						   
							}
						}
					});		  
				}
			});
		});
	});
}

//6.Verify Compose Topic with Lock option(Admin)
composeTopicTest.composeTopicLockOption= function() {
	casper.then(function(){
		casper.thenOpen(config.url, function() {
			casper.echo('                case-5               ', 'INFO');
			casper.echo('Verify Compose Topic with Lock option(Admin)', 'INFO');
			casper.echo('********************************************', 'INFO');
			casper.echo('Title of the page :' +this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
				if(!err) {
					casper.echo('login by valid username and password and verify error message', 'INFO');
					wait.waitForElement('div#topics ', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
							  casper.click('div#topics ul li:nth-child(1) a');
								composeTopicMethod.startTopic(false,false,true,json['Topicmessage'],casper,function(err){
									if(!err){
										  wait.waitForTime(2000 , casper , function(err) {
											var sub = casper.fetchText('div#ajax_subscription_vars div div:nth-child(4) span');
											casper.echo('subject :'+sub,'INFO');
											
											forumLoginMethod.logoutFromApp(casper, function(err){
												if (!err){
												casper.echo('Successfully logout from application', 'INFO');
												}
											});
										});
									}
								});						   
							}
						}
					});		  
				}
			});
		});
	});
}





