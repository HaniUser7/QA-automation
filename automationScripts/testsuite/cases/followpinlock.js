'use strict';
var wait = require('../wait.js');
var forumLoginMethod = require('../methods/login.js');
var followpinlockMethod = require('../methods/followpinlock.js');
var composeTopicMethod = require('../methods/composeTopic.js');
var json = require('../../testdata/loginData.json');
var data = require('../../testdata/composeTopic.json');
var followpinlockTest=module.exports = {};
var errorMessage = "";


//create admin,register,unregister user
//backend setting for enable start new topic

/**************************** Test case for composeTopic *********************/


//1.Test case for Add New topic by enable Follow check box and verify unfollow topic option on forum listing page
followpinlockTest.enableFollowCheckbox= function() {
	casper.then(function(){
		casper.thenOpen(config.url, function() {
			casper.echo('                   case-1                    ', 'INFO');
			casper.echo(' Add New topic by enable Follow check box and verify unfollow topic option on forum listing page', 'INFO');
			casper.echo('********************************************', 'INFO');
			casper.echo('Title of the page :' +this.getTitle(), 'INFO');
		    forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
				if(!err) {
					casper.echo('login by valid username and password and verify error message', 'INFO');
					wait.waitForElement('div#topics ', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
							  casper.click('div#topics ul li:nth-child(1) a');
								composeTopicMethod.startTopic(true,false,false,data['Topicmessage'],casper,function(err){
									if(!err){
										  wait.waitForTime(2000 , casper , function(err) {
											var grpName = casper.evaluate(function(){
												var x3 = document.querySelector('a#submenu_unfollow_topic i').getAttribute('data-original-title');
												return x3;
											});
										    casper.echo('subject :'+grpName,'INFO');
											forumLoginMethod.logoutFromApp(casper, function(err){
												if (!err){
												casper.echo('Successfully logout from application', 'INFO');
												}
											});
										});
									}else {
										casper.echo('Error : '+err, 'INFO');
									}
								});						   
							}
						}
					});		  
				}else {
					casper.echo('Error : '+err, 'INFO');
				}
			});
		});
	});
}


//2.test case for Add New topic by disabling Follow check box and verify follow topic option on Post page
followpinlockTest.disablingFollowCheckbox= function() {
	casper.then(function(){
		casper.thenOpen(config.url, function() {
			casper.echo('                   case-2                    ', 'INFO');
			casper.echo(' Add New topic by disabling Follow check box and verify follow topic option on Post page', 'INFO');
			casper.echo('********************************************', 'INFO');
			casper.echo('Title of the page :' +this.getTitle(), 'INFO');
		    forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
				if(!err) {
					casper.echo('login by valid username and password and verify error message', 'INFO');
					wait.waitForElement('div#topics ', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
							  casper.click('div#topics ul li:nth-child(1) a');
								composeTopicMethod.startTopic(false,false,false,data['Topicmessage'],casper,function(err){
									if(!err){
										  wait.waitForTime(2000 , casper , function(err) {
											var grpName = casper.evaluate(function(){
												var x3 = document.querySelector('div.topic-tools.pull-right a:nth-child(2) i').getAttribute('data-original-title');
												return x3;
											});
										    casper.echo('subject :'+grpName,'INFO');
											 casper.capture('23.png')
											forumLoginMethod.logoutFromApp(casper, function(err){
												if (!err){
												casper.echo('Successfully logout from application', 'INFO');
												}
											});
										});
									}else {
										casper.echo('Error : '+err, 'INFO');
									}
								});						   
							}
						}
					});		  
				}else {
					casper.echo('Error : '+err, 'INFO');
				}
			});
		});
	});
}


//3.test case for Add New topic by disabling Follow check box and verify follow topic option on Post page
followpinlockTest.deleteTopic= function(){
	composeTopicMethod.deleteTopic(casper,function(err){
		if (!err){
			 casper.echo('deleteTopic working', 'INFO');
		}else {
			casper.echo('Error : '+err, 'INFO');
		}
	});
}


//3. test case for Follow any topic and verify followed topic in Followed Content page
followpinlockTest.followedTopicContentPage= function() {  
	casper.then(function(){
	    
		//3.1. Add New topic by enable Follow check box and verify unfollow topic option on forum listing page
		casper.then(function(){
		    followpinlockTest.enableFollowCheckbox();
		});
		
		//3.2. test case for Follow any topic and verify followed topic in Followed Content page
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                   case-3                    ', 'INFO');
				casper.echo('test case for Follow any topic and verify followed topic in Followed Content page', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForTime(4000,casper,function(err){
							casper.click('div#topics ul li:nth-child(2) a');
							wait.waitForTime(3000,casper,function(err){
									 casper.capture('32(a).png');
										casper.click('div.panel-body.table-responsive ul li:nth-child(2) span span:nth-child(1) a');
										wait.waitForElement('div.panel-body.table-responsive ul li:nth-child(1) span span:nth-child(2) a', casper, function(err, isExist) {
											if(!err){
												if(isExist) {
													casper.click('div.panel-body.table-responsive ul li:nth-child(1) span span:nth-child(2) a');
														wait.waitForElement('a#submenu_unfollow_topic', casper, function(err, isExist) {
															if(!err){
																if(isExist) {
																	casper.click('a#submenu_unfollow_topic i');
																	wait.waitForTime(2000 , casper , function(err) {
																		casper.test.assertExists('ul.nav.pull-right span.caret');
																		casper.click('ul.nav.pull-right span.caret');
																		wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExists) {
																			if(isExists) {		
																				casper.test.assertExists('li.pull-right.user-panel.open ul span:nth-child(2) li:nth-child(5) a');
																				casper.evaluate(function() {
																					document.querySelector('li.pull-right.user-panel.open ul span:nth-child(2) li:nth-child(5) a').click();
																				});
																				wait.waitForTime(2000 , casper , function(err) {
																						casper.capture('23323.png');
																						forumLoginMethod.logoutFromApp(casper, function(err){
																							if (!err){
																							casper.echo('Successfully logout from application', 'INFO');
																							}
																						});
																				});
																			}
																		});
																	});					   
																}else {
																	casper.echo('Topic not found ', 'ERROR');
																}
															}
														});						   
												}else {
													casper.echo('Topic not found ', 'ERROR');
												}
											}
										});					   
								
							});						   	
						});		  
					}else {
						casper.echo('Error : '+err, 'INFO');
					}
				});
			});
		});  
	});
}


//4.test case for unFollow any topic and verify unfollowed topic in Followed Content page
followpinlockTest.unfollowedTopicContentPage= function() {  
	casper.then(function(){
	    
		//4.1. test case for Add New topic by disabling Follow check box and verify follow topic option on Post page
		casper.then(function(){
		   followpinlockTest.disablingFollowCheckbox();
		});
		
		//4.2. unFollow any topic and verify unfollowed topic in Followed Content page
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                   case-4                    ', 'INFO');
				casper.echo(' unFollow any topic and verify unfollowed topic in Followed Content page', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForTime(4000,casper,function(err){
							casper.click('div#topics ul li:nth-child(2) a');
							wait.waitForTime(3000,casper,function(err){
									 casper.capture('32(a).png');
										casper.click('div.panel-body.table-responsive ul li:nth-child(2) span span:nth-child(1) a');
										wait.waitForElement('div.panel-body.table-responsive ul li:nth-child(1) span span:nth-child(2) a', casper, function(err, isExist) {
											if(!err){
												if(isExist) {
													casper.click('div.panel-body.table-responsive ul li:nth-child(1) span span:nth-child(2) a');
														wait.waitForElement('a#submenu_unfollow_topic', casper, function(err, isExist) {
															if(!err){
																if(isExist) {
																	casper.click('div.topic-tools.pull-right a:nth-child(2) i');
																	wait.waitForTime(2000 , casper , function(err) {
																		casper.test.assertExists('ul.nav.pull-right span.caret');
																		casper.click('ul.nav.pull-right span.caret');
																		wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExists) {
																			if(isExists) {		
																				casper.test.assertExists('li.pull-right.user-panel.open ul span:nth-child(2) li:nth-child(5) a');
																				casper.evaluate(function() {
																					document.querySelector('li.pull-right.user-panel.open ul span:nth-child(2) li:nth-child(5) a').click();
																				});
																				wait.waitForTime(2000 , casper , function(err) {
																						casper.capture('23323.png');
																						forumLoginMethod.logoutFromApp(casper, function(err){
																							if (!err){
																							casper.echo('Successfully logout from application', 'INFO');
																							}
																						});
																				});
																			}
																		});
																	});					   
																}else {
																	casper.echo('Topic not found ', 'ERROR');
																}
															}
														});						   
												}else {
													casper.echo('Topic not found ', 'ERROR');
												}
											}
										});					   
								
							});						   	
						});		  
					}else {
						casper.echo('Error : '+err, 'INFO');
					}
				});
			});
		});  
	});
}


//5.test case for Unfollow Topic from followed content page and verify that topic on the page
followpinlockTest.unfollowTopicFollowed= function() {
	
	casper.then(function(){
		
		//5.1. test case for Add New topic by disabling Follow check box and verify follow topic option on Post page
		casper.then(function(){
		   followpinlockTest.unfollowedTopicContentPage();
		});
		
		//5.2test case for Unfollow Topic from followed content page and verify that topic on the page
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                   case-5                    ', 'INFO');
				casper.echo(' Unfollow Topic from followed content page and verify that topic on the page', 'INFO');
				casper.echo('********************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExists) {
							if(!err) {
								if(isExists) {	
									casper.test.assertExists('ul.nav.pull-right span.caret');
									casper.click('ul.nav.pull-right span.caret');
									wait.waitForElement('li.pull-right.user-panel.open ul span:nth-child(2) li:nth-child(5) a', casper, function(err, isExists) {
										if(!err) {
											if(isExists) {		
												casper.test.assertExists('li.pull-right.user-panel.open ul span:nth-child(2) li:nth-child(5) a');
												casper.click('li.pull-right.user-panel.open ul span:nth-child(2) li:nth-child(5) a');
												wait.waitForElement('div#search_topics', casper, function(err, isExists) {
													if(!err) {
														if(isExists) {									
															casper.click('div#search_topics div div ul li:nth-child(1) span:nth-child(2) span:nth-child(1) input');
															wait.waitForElement('a#unsubscribe', casper, function(err, isExists) {
																if(!err) {
																	if(isExists) {	
																		casper.test.assertExists('a#unsubscribe');
																		casper.click('a#unsubscribe');
																		wait.waitForTime(4000 , casper , function() {
																		    try{
																				casper.test.assertExists('div.alert.alert-info.text-center.no-space');
																				var sub = casper.fetchText('div.alert.alert-info.text-center.no-space');
																				casper.echo('subject :'+sub,'INFO');													
																			}catch(e){
																				casper.test.assertDoesntExist('div.alert.alert-info.text-center.no-space');
																			}
																			forumLoginMethod.logoutFromApp(casper, function(err){
																				if (!err){
																					casper.echo('Successfully logout from application', 'INFO');
																				}else {
																					casper.echo('Error : '+err, 'ERROR');
																				}
														                    });
													                    });
																	}else {
																		casper.echo('Error : '+err, 'ERROR');
																	}
																}
												            });
														}else {
															casper.echo('Error : '+err, 'ERROR');
														}
													}
										        });
											}else {
												casper.echo('Error : '+err, 'ERROR');
											}
										}
								    });			  
								}else {
									casper.echo('Error : '+err, 'ERROR');
								}
						    }
						});
					}else {
						casper.echo('Error : '+err, 'ERROR');
					}
				});
			});
		});
	});
		
}


//6.Test case for Verify message in Topic list content on Followed Content page if there is no any followed topic in the list
followpinlockTest.compostTopicCategoryListingPage= function() {
	
	casper.then(function(){
		
		//6.1. test case for Add New topic by disabling Follow check box and verify follow topic option on Post page
		casper.then(function(){
		   followpinlockTest.unfollowedTopicContentPage();
		});
		
		//6.2 Verify message in Topic list content on Followed Content page if there is no any followed topic in the list
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                   case-6.2                      ', 'INFO');
				casper.echo(' Verify message in Topic list content on Followed Content page', 'INFO');
				casper.echo('      if there is no any followed topic in the list'           , 'INFO');
				casper.echo('**************************************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExists) {
							if(!err) {
								if(isExists) {
                                    casper.capture('19.png');								
									casper.test.assertExists('ul.nav.pull-right span.caret');
									casper.click('ul.nav.pull-right span.caret');
									wait.waitForElement('li.pull-right.user-panel.open ul span:nth-child(2) li:nth-child(5) a', casper, function(err, isExists) {
										if(!err) {
											if(isExists) {	
                                                casper.capture('20.png');											
												casper.test.assertExists('li.pull-right.user-panel.open ul span:nth-child(2) li:nth-child(5) a');
												casper.click('li.pull-right.user-panel.open ul span:nth-child(2) li:nth-child(5) a');
												wait.waitForElement('div#search_posts_menu span input', casper, function(err, isExists) {
													if(!err) {
														if(isExists) {	
                                                            casper.capture('21.png');														
															casper.click('div#search_posts_menu span input');
															wait.waitForElement('a#unsubscribe', casper, function(err, isExists) {
																if(!err) {
																	if(isExists) {	
																	    casper.capture('22.png');
																		casper.test.assertExists('a#unsubscribe');
																		casper.click('a#unsubscribe');
																		wait.waitForTime(4000 , casper , function() {
																		    casper.capture('23.png');
																		    try{
																				casper.test.assertExists('div.alert.alert-info.text-center.no-space');
																				var sub = casper.fetchText('div.alert.alert-info.text-center.no-space');
																				casper.echo('subject :'+sub,'INFO');													
																			}catch(e){
																				casper.test.assertDoesntExist('div.alert.alert-info.text-center.no-space');
																			}
																			forumLoginMethod.logoutFromApp(casper, function(err){
																				if (!err){
																					casper.echo('Successfully logout from application', 'INFO');
																				}else {
																					casper.echo('Error : '+err, 'ERROR');
																				}
														                    });
													                    });
																	}else {
																		casper.echo('Error : '+err, 'ERROR');
																	}
																}
												            });
														}else {
															casper.echo('search_topics link not found', 'ERROR');
														}
													}
										        });
											}else {
												casper.echo('Followed Content link not found', 'ERROR');
											}
										}
								    });			  
								}else {
									casper.echo('default-user icon not found', 'ERROR');
								}
						    }
						});
					}else {
						casper.echo('Error : '+err, 'ERROR');
					}
				});
			});
		});
	});
		
}


//7.test case for Follow any category and verify that topic in category lis on Followed Content page
 followpinlockTest.followAnyCategory = function() {
	casper.then(function(){
		casper.thenOpen(config.url, function() {
			casper.echo('                   case-7                    ', 'INFO');
			casper.echo('Follow any category and verify that topic in category lis on Followed Content page', 'INFO');
			casper.echo('********************************************', 'INFO');
			casper.echo('Title of the page :' +this.getTitle(), 'INFO');
		    forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
				if(!err) {
					casper.echo('login by valid username and password and verify error message', 'INFO');
					wait.waitForElement('a[href="/categories"]', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.click('a[href="/categories"]');
								wait.waitForTime(4000 , casper , function(err) {
									wait.waitForElement('div.panel-body.table-responsive', casper, function(err, isExist) {
										if(!err){
											if(isExist) {
												var grpName = casper.evaluate(function(){
													for(var i=1; i<=7; i++) {
														var x1 = document.querySelector('ul li:nth-child('+i+') span span:nth-child(1) h3 a span');
														if (x1.innerText == 'General') {
															var x3 = document.querySelector('ul li:nth-child('+i+') span span:nth-child(1) h3 a ').getAttribute('href');
															return x3;
														}
													}
											    });
												casper.click('a[href="'+grpName+'"]');
												 wait.waitForTime(2000 , casper , function() {
													var grpName = casper.evaluate(function(){
														var x3 = document.querySelector('a#submenu_unfollow_forum i').getAttribute('data-original-title');
														return x3;
													});
													casper.echo('subject :'+grpName,'INFO');
													casper.click('a#submenu_unfollow_forum i');
												    wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExists) {
														if(!err) {
															if(isExists) {
																casper.capture('19.png');								
																casper.test.assertExists('ul.nav.pull-right span.caret');
																casper.click('ul.nav.pull-right span.caret');
																wait.waitForElement('li.pull-right.user-panel.open ul span:nth-child(2) li:nth-child(5) a', casper, function(err, isExists) {
																	if(!err) {
																		if(isExists) {	
																			casper.capture('20.png');											
																			casper.test.assertExists('li.pull-right.user-panel.open ul span:nth-child(2) li:nth-child(5) a');
																			casper.click('li.pull-right.user-panel.open ul span:nth-child(2) li:nth-child(5) a');
																			wait.waitForElement('a#anchor_tab_forum_subscriptions', casper, function(err, isExists) {
																				if(!err) {
																					if(isExists) {	
																						casper.capture('21.png');														
																						casper.click('a#anchor_tab_forum_subscriptions');
																							wait.waitForTime(4000 , casper , function() {
																							casper.capture('23.png');
																							try{
																								casper.test.assertExists('ul li:nth-child(2) span span:nth-child(1) h3 a spna');
																								var sub = casper.fetchText('ul li:nth-child(2) span span:nth-child(1) h3 a spna');
																								casper.echo('subject :'+sub,'INFO');													
																							}catch(e){
																								casper.test.assertDoesntExist('ul li:nth-child(2) span span:nth-child(1) h3 a spna');
																							}
																							forumLoginMethod.logoutFromApp(casper, function(err){
																								if (!err){
																									casper.echo('Successfully logout from application', 'INFO');
																								}else {
																									casper.echo('Error : '+err, 'ERROR');
																								}
																							});
																						});
																				
																					}else {
																						casper.echo('Categories link not found in Followed Content page', 'ERROR');
																					}
																				}
																			});
																		}else {
																			casper.echo('Followed Content link not found', 'ERROR');
																		}
																	}
																});			  
															}else {
																casper.echo('default-user icon not found', 'ERROR');
															}
														}
													});
												});
																	   
											}else {
												casper.echo('Categories link categories not found', 'ERROR');
											}
										}
									});
                                });								
							}else {
								casper.echo('Categories link not found', 'ERROR');
							}
						}
					});		  
				}else {
					casper.echo('Error : '+err, 'INFO');
				}
			});
		});
	});
}


//8.test case for UnFollow category from followed content list and verify visibility of that category in the list
 followpinlockTest.unfollowAnyCategory= function() {
	casper.then(function(){
		casper.thenOpen(config.url, function() {
			casper.echo('                   case-8                    ', 'INFO');
			casper.echo('UnFollow category from followed content list and verify visibility of that category in the list', 'INFO');
			casper.echo('********************************************', 'INFO');
			casper.echo('Title of the page :' +this.getTitle(), 'INFO');
		    forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
				if(!err) {
					casper.echo('login by valid username and password and verify error message', 'INFO');
					wait.waitForElement('a[href="/categories"]', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.click('a[href="/categories"]');
								wait.waitForTime(4000 , casper , function(err) {
									wait.waitForElement('div.panel-body.table-responsive', casper, function(err, isExist) {
										if(!err){
											if(isExist) {
												var grpName = casper.evaluate(function(){
													for(var i=1; i<=7; i++) {
														var x1 = document.querySelector('ul li:nth-child('+i+') span span:nth-child(1) h3 a span');
														if (x1.innerText == 'General') {
															var x3 = document.querySelector('ul li:nth-child('+i+') span span:nth-child(1) h3 a ').getAttribute('href');
															return x3;
														}
													}
											    });
												casper.click('a[href="'+grpName+'"]');
												 wait.waitForTime(2000 , casper , function() {
													var grpName = casper.evaluate(function(){
														var x3 = document.querySelector('div.topic-tools.pull-right a:nth-child(2) i').getAttribute('data-original-title');
														return x3;
													});
													casper.echo('subject :'+grpName,'INFO');
													casper.click('div.topic-tools.pull-right a:nth-child(2) i');
												    wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExists) {
														if(!err) {
															if(isExists) {
																casper.capture('19.png');								
																casper.test.assertExists('ul.nav.pull-right span.caret');
																casper.click('ul.nav.pull-right span.caret');
																wait.waitForElement('li.pull-right.user-panel.open ul span:nth-child(2) li:nth-child(5) a', casper, function(err, isExists) {
																	if(!err) {
																		if(isExists) {	
																			casper.capture('20.png');											
																			casper.test.assertExists('li.pull-right.user-panel.open ul span:nth-child(2) li:nth-child(5) a');
																			casper.click('li.pull-right.user-panel.open ul span:nth-child(2) li:nth-child(5) a');
																			wait.waitForElement('a#anchor_tab_forum_subscriptions', casper, function(err, isExists) {
																				if(!err) {
																					if(isExists) {	
																						casper.capture('21.png');														
																						casper.click('a#anchor_tab_forum_subscriptions');
																							wait.waitForTime(4000 , casper , function() {
																							casper.capture('23.png');
																							
																								var grpName = casper.evaluate(function(){
																									for(var i=1; i<=7; i++) {
																										var x1 = document.querySelector('ul li:nth-child('+i+') span span:nth-child(1) h3 a span');
																										if (x1.innerText == 'General') {
																											var x3 = document.querySelector('ul li:nth-child('+i+') span span:nth-child(1) h3 a ').getAttribute('href');
																											return 'General link found';
																										}else{
																										    return 'General link not found';
																										}
																									}
																								});
																								casper.echo(grpName ,'INFO');													
																							
																							forumLoginMethod.logoutFromApp(casper, function(err){
																								if (!err){
																									casper.echo('Successfully logout from application', 'INFO');
																								}else {
																									casper.echo('Error : '+err, 'ERROR');
																								}
																							});
																						});
																				
																					}else {
																						casper.echo('Categories link not found in Followed Content page', 'ERROR');
																					}
																				}
																			});
																		}else {
																			casper.echo('Followed Content link not found', 'ERROR');
																		}
																	}
																});			  
															}else {
																casper.echo('default-user icon not found', 'ERROR');
															}
														}
													});
												});
																	   
											}else {
												casper.echo('Categories link categories not found', 'ERROR');
											}
										}
									});
                                });								
							}else {
								casper.echo('Categories link not found', 'ERROR');
							}
						}
					});		  
				}else {
					casper.echo('Error : '+err, 'INFO');
				}
			});
		});
	});
}


//9.test case Add New topic by enable Follow check box and verify unfollow topic option on latest topic page
followpinlockTest.enableFollowCheckboxLatestAddNewTopic= function() {
	casper.then(function(){
		casper.thenOpen(config.url, function() {
			casper.echo('                   case-9                    ', 'INFO');
			casper.echo('Add New topic by enable Follow check box and verify unfollow topic option on latest topic page', 'INFO');
			casper.echo('********************************************', 'INFO');
			casper.echo('Title of the page :' +this.getTitle(), 'INFO');
		    forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
				if(!err) {
					casper.echo('login by valid username and password and verify error message', 'INFO');
					wait.waitForElement('div#topics a', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
							  casper.click('div#topics a');
								composeTopicMethod.startTopic(true,false,false,data['Topicmessage'],casper,function(err){
									if(!err){
										  wait.waitForTime(2000 , casper , function(err) {
										    try{
												casper.test.assertExists('a#submenu_unfollow_topic i');
												var grpName = casper.evaluate(function(){
													var x3 = document.querySelector('a#submenu_unfollow_topic i').getAttribute('data-original-title');
													return x3;
												});
												casper.echo('subject :'+grpName,'INFO');
											}catch(e){
											    casper.test.assertDoesntExist('a#submenu_unfollow_topic i');
											}
											wait.waitForTime(2000 , casper , function(err) {
												forumLoginMethod.logoutFromApp(casper, function(err){
													if (!err){
													     casper.echo('Successfully logout from application', 'INFO');
													}
												});
											});
										});
									}else {
										casper.echo('Error : '+err, 'INFO');
									}
								});						   
							}else {
								casper.echo('Start New Topic link not found', 'INFO');
							}
						}
					});		  
				}else {
					casper.echo('Error : '+err, 'INFO');
				}
			});
		});
	});
}


//10.test case Add New topic by disabling Follow check box and verify unfollow topic option on latest topic page
followpinlockTest.disablingFollowCheckboxLatestAddNewTopic= function() {
	casper.then(function(){
		casper.thenOpen(config.url, function() {
			casper.echo('                   case-10                    ', 'INFO');
			casper.echo(' Add New topic by disabling Follow check box and verify unfollow topic option on latest topic page', 'INFO');
			casper.echo('********************************************', 'INFO');
			casper.echo('Title of the page :' +this.getTitle(), 'INFO');
		    forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
				if(!err) {
					casper.echo('login by valid username and password and verify error message', 'INFO');
					wait.waitForElement('div#topics a', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
							  casper.click('div#topics a');
								composeTopicMethod.startTopic(false,false,false,data['Topicmessage'],casper,function(err){
									if(!err){
										  wait.waitForTime(2000 , casper , function(err) {
										    try{
												casper.test.assertExists('div.topic-tools.pull-right a:nth-child(2) i');
												var grpName = casper.evaluate(function(){
													var x3 = document.querySelector('div.topic-tools.pull-right a:nth-child(2) i').getAttribute('data-original-title');
													return x3;
												});
												casper.echo('subject :'+grpName,'INFO');
											}catch(e){
											    casper.test.assertDoesntExist('div.topic-tools.pull-right a:nth-child(2) i');
											}
											wait.waitForTime(2000 , casper , function(err) {
												forumLoginMethod.logoutFromApp(casper, function(err){
													if (!err){
													    casper.echo('Successfully logout from application', 'INFO');
													}
												});
											});
										});
									}else {
										casper.echo('Error : '+err, 'INFO');
									}
								});						   
							}else {
								casper.echo('Start New Topic link not found', 'INFO');
							}
						}
					});		  
				}else {
					casper.echo('Error : '+err, 'INFO');
				}
			});
		});
	});
}


//11.Add New topic by disabling Follow check box and verify follow topic option on topic listing page
followpinlockTest.disablingFollowCheckboxLatestTopicPage= function() {
	casper.then(function(){
		casper.thenOpen(config.url, function() {
			casper.echo('                   case-11                    ', 'INFO');
			casper.echo('Add New topic by enable Follow check box and verify unfollow topic option on latest topic page', 'INFO');
			casper.echo('********************************************', 'INFO');
			casper.echo('Title of the page :' +this.getTitle(), 'INFO');
		    forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
				if(!err) {
					casper.echo('login by valid username and password and verify error message', 'INFO');
					wait.waitForElement('div#topics a', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
							  casper.click('div#topics a');
								composeTopicMethod.startTopic(true,false,false,data['Topicmessage'],casper,function(err){
									if(!err){
										  wait.waitForTime(2000 , casper , function(err) {
										    try{
											    casper.capture('unfollow.png');
												casper.test.assertExists('a#submenu_unfollow_topic i');
												var unfollow = casper.evaluate(function(){
													var x3 = document.querySelector('a#submenu_unfollow_topic i').getAttribute('data-original-title');
													return x3;
												});
												casper.echo('subject :'+unfollow,'INFO');
												casper.click('a#submenu_unfollow_topic i');
												wait.waitForTime(2000 , casper , function() {
													casper.capture('follow.png');
													try{
														casper.test.assertExists('div.topic-tools.pull-right a:nth-child(2) i');
														var follow = casper.evaluate(function(){
															var x3 = document.querySelector('div.topic-tools.pull-right a:nth-child(2) i').getAttribute('data-original-title');
															return x3;
														});
														casper.echo('subject :'+follow,'INFO');
													}catch(e){
														casper.test.assertDoesntExist('div.topic-tools.pull-right a:nth-child(2) i');
													}
												});
											}catch(e){
												casper.test.assertDoesntExist('a#submenu_unfollow_topic i');
											}
											wait.waitForTime(2000 , casper , function() {
												forumLoginMethod.logoutFromApp(casper, function(err){
													if (!err){
														casper.echo('Successfully logout from application', 'INFO');
													}
												});
											});
										});
									}else {
										casper.echo('Error : '+err, 'INFO');
									}
								});						   
							}else {
								casper.echo('Start New Topic link not found', 'INFO');
							}
						}
					});		  
				}else {
					casper.echo('Error : '+err, 'INFO');
				}
			});
		});
	});
}


//12.Add New topic by enable Follow check box and verify unfollow topic option on topic listing page
followpinlockTest.enableFollowCheckboxLatestTopicPage= function() {
	casper.then(function(){
		casper.thenOpen(config.url, function() {
			casper.echo('                   case-12                    ', 'INFO');
			casper.echo(' Add New topic by disabling Follow check box and verify unfollow topic option on latest topic page', 'INFO');
			casper.echo('**************************************************************************************************', 'INFO');
			casper.echo('Title of the page :' +this.getTitle(), 'INFO');
		    forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
				if(!err) {
					casper.echo('login by valid username and password and verify error message', 'INFO');
					wait.waitForElement('div#topics a', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
							  casper.click('div#topics a');
								composeTopicMethod.startTopic(false,false,false,data['Topicmessage'],casper,function(err){
									if(!err){
										  wait.waitForTime(2000 , casper , function(err) {
										    try{
											    casper.capture('follow.png');
												casper.test.assertExists('div.topic-tools.pull-right a:nth-child(2) i');
												var grpName = casper.evaluate(function(){
													var x3 = document.querySelector('div.topic-tools.pull-right a:nth-child(2) i').getAttribute('data-original-title');
													return x3;
												});
												casper.echo('subject :'+grpName,'INFO');
												casper.click('div.topic-tools.pull-right a:nth-child(2) i');
												wait.waitForTime(2000 , casper , function() {
													try{
														casper.capture('unfollow.png');
														casper.test.assertExists('a#submenu_unfollow_topic i');
														var unfollow = casper.evaluate(function(){
															var x3 = document.querySelector('a#submenu_unfollow_topic i').getAttribute('data-original-title');
															return x3;
														});
														casper.echo('subject :'+unfollow,'INFO');
													}catch(e){
														casper.test.assertDoesntExist('a#submenu_unfollow_topic i');
													}
												});
											}catch(e){
											    casper.test.assertDoesntExist('div.topic-tools.pull-right a:nth-child(2) i');
											}
											wait.waitForTime(2000 , casper , function() {
												forumLoginMethod.logoutFromApp(casper, function(err){
													if (!err){
														casper.echo('Successfully logout from application', 'INFO');
													}
												});
											});
										});
									}else {
										casper.echo('Error : '+err, 'INFO');
									}
								});						   
							}else {
								casper.echo('Start New Topic link not found', 'INFO');
							}
						}
					});		  
				}else {
					casper.echo('Error : '+err, 'INFO');
				}
			});
		});
	});
}


//13.Add New topic by enable Follow check box and verify unfollow topic option on topic listing page for sub category topic
followpinlockTest.enableFollowCheckboxSubCategoryTopic= function() {
	casper.then(function(){
		casper.thenOpen(config.url, function() {
			casper.echo('                             case-13                      ', 'INFO');
			casper.echo('           Add New topic by enable Follow check box and                  ', 'INFO');
			casper.echo('verify unfollow topic option on topic listing page for sub category topic', 'INFO');
			casper.echo('*************************************************************************', 'INFO');
			casper.echo('Title of the page :' +this.getTitle(), 'INFO');
		    forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
				if(!err) {
					casper.echo('login by valid username and password and verify error message', 'INFO');
					wait.waitForElement('form[name="posts"] div div:nth-child(2) ul a', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
							    casper.click('form[name="posts"] div div:nth-child(2) ul a');
								wait.waitForElement('div#topics a', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
										    casper.click('div#topics a');
											composeTopicMethod.startTopic(true,false,false,data['Topicmessage'],casper,function(err){
												if(!err){
													wait.waitForTime(2000 , casper , function(err) {
														try{
															casper.capture('unfollow.png');
															casper.test.assertExists('a#submenu_unfollow_topic i');
															var unfollow = casper.evaluate(function(){
																var x3 = document.querySelector('a#submenu_unfollow_topic i').getAttribute('data-original-title');
																return x3;
															});
															casper.echo('subject :'+unfollow,'INFO');
															casper.click('a#submenu_unfollow_topic i');
															wait.waitForTime(2000 , casper , function() {
																casper.capture('follow.png');
																try{
																	casper.test.assertExists('div.topic-tools.pull-right a:nth-child(2) i');
																	var follow = casper.evaluate(function(){
																		var x3 = document.querySelector('div.topic-tools.pull-right a:nth-child(2) i').getAttribute('data-original-title');
																		return x3;
																	});
																	casper.echo('subject :'+follow,'INFO');
																}catch(e){
																	casper.test.assertDoesntExist('div.topic-tools.pull-right a:nth-child(2) i');
																}
															});
														}catch(e){
															casper.test.assertDoesntExist('a#submenu_unfollow_topic i');
														}
														wait.waitForTime(2000 , casper , function() {
															forumLoginMethod.logoutFromApp(casper, function(err){
																if (!err){
																	casper.echo('Successfully logout from application', 'INFO');
																}
															});
														});
													});
												}else {
													casper.echo('Error : '+err, 'INFO');
												}
											});						   
										}else {
											casper.echo('Start New Topic link not found', 'INFO');
										}
									}
								});					   
							}else {
								casper.echo('Latest link on Topic page not found', 'INFO');
							}
						}
					});		  
				}else {
					casper.echo('Error : '+err, 'INFO');
				}
			});
		});
	});
}


//14.Verify the follow option visibility on latest topic page by the guest user/unregistered user.
followpinlockTest.optionVisibilityLatestTopicPage= function() {
	casper.then(function(){
	    
		casper.then(function(){
			composeTopicMethod.deleteTopic(casper,function(err){
				if (!err){
					 casper.echo('deleteTopic working', 'INFO');
				}else {
					casper.echo('Error : '+err, 'INFO');
				}
			});
		});
		
		//14.test case for create topic 
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                case-14-a              ', 'INFO');
				casper.echo(' test case for create topic              ', 'INFO');
				casper.echo('*****************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('div#topics a', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.click('div#topics a');
									composeTopicMethod.startTopic(true,false,false,data['Topicmessage'],casper,function(err){
										if(!err){
											wait.waitForTime(2000 , casper , function() {
												forumLoginMethod.logoutFromApp(casper, function(err){
													if (!err){
														casper.echo('Successfully logout from application', 'INFO');
													}
												});
											});
										}else {
											casper.echo('Error : '+err, 'INFO');
										}
									});						   
								}else {
									casper.echo('Start New Topic link not found', 'INFO');
								}
							}
						});					   		  
					}else {
						casper.echo('Error : '+err, 'INFO');
					}
				});
			});
		});
		
		//14.Verify the follow option visibility on latest topic page by the guest user.
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                        case-14-b                        ', 'INFO');
				casper.echo(' Verify the follow option visibility on latest topic page by the guest user.', 'INFO');
				casper.echo('****************************************************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				wait.waitForElement('div#topics ul li:nth-child(1) a', casper, function(err, isExist) {
					if(!err){
						if(isExist) {
							casper.click('div#topics ul li:nth-child(1) a');
							wait.waitForElement('form[name="posts"] div div:nth-child(2) ul a', casper, function(err, isExist) {
								if(!err){
									if(isExist) {
										casper.click('form[name="posts"] div div:nth-child(2) ul a');
										wait.waitForTime(2000 , casper , function() {
											try{
												casper.test.assertExists('form div div:nth-child(3) ul li:nth-child(1) span:nth-child(1) span:nth-child(2) h4 a ');
												var topic = casper.evaluate(function(){
													//var x3 = document.querySelector('form div div:nth-child(3) ul li:nth-child(1) span:nth-child(1) span:nth-child(2) h4 a').getAttribute('id');
													var x3 = document.querySelector('form div div:nth-child(3) ul li:nth-child(1) span:nth-child(1) span:nth-child(2) h4 a');
													return x3.innerHTML;
												});
												casper.echo('subject :'+topic,'INFO');
											}catch(e){
												casper.test.assertDoesntExist('form div div:nth-child(3) ul li:nth-child(1) span:nth-child(1) span:nth-child(2) h4 a ');
												 try{
													casper.test.assertExists('form div div:nth-child(3) ul li:nth-child(1) span');
													var noTopic = casper.evaluate(function(){
														var x3 = document.querySelector('form div div:nth-child(3) ul li:nth-child(1) span');
														return x3.innerHTML;
													});
													casper.echo('subject :'+noTopic,'INFO');
												}catch(e){
													casper.test.assertDoesntExist('form div div:nth-child(3) ul li:nth-child(1) span');
												}
											}
											
										});				   
									}else {
										casper.echo('latest topic page link not found', 'INFO');
									}
								}
							});				   
						}else {
							casper.echo('Topic link not found', 'INFO');
						}
					}
				});	
			});
		});
		
		//14(c).Verify the follow option visibility on latest topic page by the unregistered user.
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                case-14-c              ', 'INFO');
				casper.echo(' Verify the follow option visibility on latest topic page by the unregistered user', 'INFO');
				casper.echo('**********************************************************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['Valid'].username, json['Valid'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('div#topics ul li:nth-child(1) a', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.click('div#topics ul li:nth-child(1) a');
									wait.waitForElement('form[name="posts"] div div:nth-child(2) ul a', casper, function(err, isExist) {
										if(!err){
											if(isExist) {
												casper.click('form[name="posts"] div div:nth-child(2) ul a');
												wait.waitForTime(2000 , casper , function() {
													try{
														casper.test.assertExists('form div div:nth-child(3) ul li:nth-child(1) span:nth-child(1) span:nth-child(2) h4 a ');
														var topic = casper.evaluate(function(){
															//var x3 = document.querySelector('form div div:nth-child(3) ul li:nth-child(1) span:nth-child(1) span:nth-child(2) h4 a').getAttribute('id');
															var x3 = document.querySelector('form div div:nth-child(3) ul li:nth-child(1) span:nth-child(1) span:nth-child(2) h4 a');
															return x3.innerHTML;
														});
														casper.echo('subject :'+topic,'INFO');
													}catch(e){
														casper.test.assertDoesntExist('form div div:nth-child(3) ul li:nth-child(1) span:nth-child(1) span:nth-child(2) h4 a ');
														 try{
															casper.test.assertExists('form div div:nth-child(3) ul li:nth-child(1) span');
															var noTopic = casper.evaluate(function(){
																var x3 = document.querySelector('form div div:nth-child(3) ul li:nth-child(1) span');
																return x3.innerHTML;
															});
															casper.echo('subject :'+noTopic,'INFO');
														}catch(e){
															casper.test.assertDoesntExist('form div div:nth-child(3) ul li:nth-child(1) span');
														}
													}
													wait.waitForTime(2000 , casper , function() {
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err){
																casper.echo('Successfully logout from application', 'INFO');
															}
														});
													});
												});				   
											}else {
												casper.echo('latest topic page link not found', 'INFO');
											}
										}
									});					   
								}else {
									casper.echo('Topic link not found', 'INFO');
								}
							}
						});					   		  
					}else {
						casper.echo('Error : '+err, 'INFO');
					}
				});
			});
		});
	});
}


//15.Verify the follow option visibility on topic listing page by the guest user/unregistered user.
followpinlockTest.optionVisibilityTopicListingPage= function() {
	casper.then(function(){
	    
		casper.then(function(){
			composeTopicMethod.deleteTopic(casper,function(err){
				if (!err){
					 casper.echo('deleteTopic working', 'INFO');
				}else {
					casper.echo('Error : '+err, 'INFO');
				}
			});
		});
		
		//15.test case for create topic 
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                case-14-a              ', 'INFO');
				casper.echo(' test case for create topic              ', 'INFO');
				casper.echo('*****************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('div#topics a', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.click('div#topics a');
									composeTopicMethod.startTopic(true,false,false,data['Topicmessage'],casper,function(err){
										if(!err){
											wait.waitForTime(2000 , casper , function() {
												forumLoginMethod.logoutFromApp(casper, function(err){
													if (!err){
														casper.echo('Successfully logout from application', 'INFO');
													}
												});
											});
										}else {
											casper.echo('Error : '+err, 'INFO');
										}
									});						   
								}else {
									casper.echo('Start New Topic link not found', 'INFO');
								}
							}
						});					   		  
					}else {
						casper.echo('Error : '+err, 'INFO');
					}
				});
			});
		});
		
		//15.Verify the follow option visibility on topic listing page by the guest user.
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                        case-15-b                        ', 'INFO');
				casper.echo(' Verify the follow option visibility on topic listing page by the guest user.', 'INFO');
				casper.echo('****************************************************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				wait.waitForElement('div#topics ul li:nth-child(1) a', casper, function(err, isExist) {
					if(!err){
						if(isExist) {
							casper.click('div#topics ul li:nth-child(1) a');
							wait.waitForTime(2000 , casper , function() {
								try{
									casper.test.assertExists('form div div:nth-child(3) ul li:nth-child(1) span:nth-child(1) span:nth-child(2) h4 a ');
									var topic = casper.evaluate(function(){
										//var x3 = document.querySelector('form div div:nth-child(3) ul li:nth-child(1) span:nth-child(1) span:nth-child(2) h4 a').getAttribute('id');
										var x3 = document.querySelector('form div div:nth-child(3) ul li:nth-child(1) span:nth-child(1) span:nth-child(2) h4 a');
										return x3.innerHTML;
									});
									casper.echo('subject :'+topic,'INFO');
								}catch(e){
									casper.test.assertDoesntExist('form div div:nth-child(3) ul li:nth-child(1) span:nth-child(1) span:nth-child(2) h4 a ');
									 try{
										casper.test.assertExists('form div div:nth-child(3) ul li:nth-child(1) span');
										var noTopic = casper.evaluate(function(){
											var x3 = document.querySelector('form div div:nth-child(3) ul li:nth-child(1) span');
											return x3.innerHTML;
										});
										casper.echo('subject :'+noTopic,'INFO');
									}catch(e){
										casper.test.assertDoesntExist('form div div:nth-child(3) ul li:nth-child(1) span');
									}
								}
								
							});				   
						}else {
							casper.echo('Topic link not found', 'INFO');
						}
					}
				});	
			});
		});
		
		//15.Verify the follow option visibility on topic listing page by the unregistered user.
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                case-15-c              ', 'INFO');
				casper.echo('Verify the follow option visibility on topic listing page by the unregistered user', 'INFO');
				casper.echo('**********************************************************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['Valid'].username, json['Valid'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('div#topics ul li:nth-child(1) a', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.click('div#topics ul li:nth-child(1) a');
									wait.waitForTime(2000 , casper , function() {
									    try{
											casper.test.assertExists('form div div:nth-child(3) ul li:nth-child(1) span:nth-child(1) span:nth-child(2) h4 a ');
											var topic = casper.evaluate(function(){
												//var x3 = document.querySelector('form div div:nth-child(3) ul li:nth-child(1) span:nth-child(1) span:nth-child(2) h4 a').getAttribute('id');
												var x3 = document.querySelector('form div div:nth-child(3) ul li:nth-child(1) span:nth-child(1) span:nth-child(2) h4 a');
												return x3.innerHTML;
											});
											casper.echo('subject :'+topic,'INFO');
										}catch(e){
											casper.test.assertDoesntExist('form div div:nth-child(3) ul li:nth-child(1) span:nth-child(1) span:nth-child(2) h4 a ');
											 try{
												casper.test.assertExists('form div div:nth-child(3) ul li:nth-child(1) span');
												var noTopic = casper.evaluate(function(){
													var x3 = document.querySelector('form div div:nth-child(3) ul li:nth-child(1) span');
													return x3.innerHTML;
												});
												casper.echo('subject :'+noTopic,'INFO');
											}catch(e){
												casper.test.assertDoesntExist('form div div:nth-child(3) ul li:nth-child(1) span');
											}
										}
										wait.waitForTime(2000 , casper , function() {
											forumLoginMethod.logoutFromApp(casper, function(err){
												if (!err){
													casper.echo('Successfully logout from application', 'INFO');
												}
											});
										});
									});				   
								}else {
									casper.echo('Topic link not found', 'INFO');
								}
							}
						});					   		  
					}else {
						casper.echo('Error : '+err, 'INFO');
					}
				});
			});
		});
	});
}


//16.Verify the follow option visibility on post listing page by the guest user/unregistered user.
followpinlockTest.optionVisibilityPostListingPage= function() {
	casper.then(function(){
	  /*  
		casper.then(function(){
			composeTopicMethod.deleteTopic(casper,function(err){
				if (!err){
					 casper.echo('deleteTopic working', 'INFO');
				}else {
					casper.echo('Error : '+err, 'INFO');
				}
			});
		});
		
		//16.test case for create topic 
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                case-16-a              ', 'INFO');
				casper.echo(' test case for create topic              ', 'INFO');
				casper.echo('*****************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('div#topics a', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.click('div#topics a');
									composeTopicMethod.startTopic(true,false,false,data['Topicmessage'],casper,function(err){
										if(!err){
											wait.waitForTime(2000 , casper , function() {
												forumLoginMethod.logoutFromApp(casper, function(err){
													if (!err){
														casper.echo('Successfully logout from application', 'INFO');
													}
												});
											});
										}else {
											casper.echo('Error : '+err, 'INFO');
										}
									});						   
								}else {
									casper.echo('Start New Topic link not found', 'INFO');
								}
							}
						});					   		  
					}else {
						casper.echo('Error : '+err, 'INFO');
					}
				});
			});
		});
		
		//16.Verify the follow option visibility on topic listing page by the guest user.
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                        case-16-b                        ', 'INFO');
				casper.echo(' Verify the follow option visibility on topic listing page by the guest user.', 'INFO');
				casper.echo('****************************************************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				wait.waitForElement('a#links-nav i', casper, function(err, isExist) {
					if(!err){
						if(isExist) {
						    casper.click('a#links-nav i');
							wait.waitForElement('ul#forums_toggle_link li a', casper, function(err, isExist) {
								if(!err){
									if(isExist) {
										casper.click('ul#forums_toggle_link li a');
										var grpName = casper.evaluate(function(){
											for(var i=3; i<=7; i++) {
												var x1 = document.querySelector('ul#forums_toggle_link li ul:nth-child('+i+') li a');
												if (x1.innerText == 'General') {
													var x3 = document.querySelector('ul#forums_toggle_link li ul:nth-child('+i+') li a').getAttribute('href');
													return x3;
												}
											}
										});
										casper.echo('a[href="'+grpName+'"]');
										casper.click('a[href="'+grpName+'"]');
										wait.waitForTime(3000 , casper , function() {
											try{
												casper.test.assertExists('form div div:nth-child(3) ul li:nth-child(1) span:nth-child(1) span:nth-child(2) h4 a ');
												var topic = casper.evaluate(function(){
													//var x3 = document.querySelector('form div div:nth-child(3) ul li:nth-child(1) span:nth-child(1) span:nth-child(2) h4 a').getAttribute('id');
													var x3 = document.querySelector('form div div:nth-child(3) ul li:nth-child(1) span:nth-child(1) span:nth-child(2) h4 a');
													return x3.innerHTML;
												});
												casper.echo('subject :'+topic,'INFO');
											}catch(e){
												casper.test.assertDoesntExist('form div div:nth-child(3) ul li:nth-child(1) span:nth-child(1) span:nth-child(2) h4 a ');
												 try{
													casper.test.assertExists('form div div:nth-child(3) ul li:nth-child(1) span');
													var noTopic = casper.evaluate(function(){
														var x3 = document.querySelector('form div div:nth-child(3) ul li:nth-child(1) span');
														return x3.innerHTML;
													});
													casper.echo('subject :'+noTopic,'INFO');
												}catch(e){
													casper.test.assertDoesntExist('form div div:nth-child(3) ul li:nth-child(1) span');
												}
											}
											
										});				   
									}else {
										casper.echo('Categories link not found', 'INFO');
									}
								}
							});					   
						}else {
							casper.echo('Menu link not found', 'INFO');
						}
					}
				});	
			});
		});
		*/
		//16.Verify the follow option visibility on topic listing page by the unregistered user.
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                case-16-c              ', 'INFO');
				casper.echo('Verify the follow option visibility on topic listing page by the unregistered user', 'INFO');
				casper.echo('**********************************************************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['Valid'].username, json['Valid'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForTime(3000 , casper , function() {
							wait.waitForElement('a#links-nav i', casper, function(err, isExist) {
								if(!err){
									if(isExist) {
										casper.click('a#links-nav i');
										wait.waitForElement('ul#forums_toggle_link li a', casper, function(err, isExist) {
											if(!err){
												if(isExist) {
													casper.click('ul#forums_toggle_link li a');
													var grpName = casper.evaluate(function(){
														for(var i=3; i<=7; i++) {
															var x1 = document.querySelector('ul#forums_toggle_link li ul:nth-child('+i+') li a');
															if (x1.innerText == 'General') {
																var x3 = document.querySelector('ul#forums_toggle_link li ul:nth-child('+i+') li a').getAttribute('href');
																return x3;
															}
														}
													});
													casper.click('a[href="'+grpName+'"]');
													wait.waitForTime(3000 , casper , function() {
														try{
															casper.test.assertExists('form div div:nth-child(3) ul li:nth-child(1) span:nth-child(1) span:nth-child(2) h4 a ');
															var topic = casper.evaluate(function(){
																var x3 = document.querySelector('form div div:nth-child(3) ul li:nth-child(1) span:nth-child(1) span:nth-child(2) h4 a');
																return x3.innerHTML;
															});
															casper.echo('subject :'+topic,'INFO');
														}catch(e){
															casper.test.assertDoesntExist('form div div:nth-child(3) ul li:nth-child(1) span:nth-child(1) span:nth-child(2) h4 a ');
															 try{
																casper.test.assertExists('form div div:nth-child(3) ul li:nth-child(1) span');
																var noTopic = casper.evaluate(function(){
																	var x3 = document.querySelector('form div div:nth-child(3) ul li:nth-child(1) span');
																	return x3.innerHTML;
																});
																casper.echo('subject :'+noTopic,'INFO');
															}catch(e){
																casper.test.assertDoesntExist('form div div:nth-child(3) ul li:nth-child(1) span');
															}
														}
														
													});				   
												}else {
													casper.echo('Categories link not found', 'INFO');
												}
											}
										});					   
									}else {
										casper.echo('Menu link not found', 'INFO');
									}
								}
							});	
                        });						
					}else {
						casper.echo('Error : '+err, 'INFO');
					}
				});
			});
		});
	});
}





