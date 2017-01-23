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



/**************************** 1. Test case for composeTopic *********************/


//1.Test case for Add New topic by enable Follow check box and verify unfollow topic option on forum listing page
followpinlockTest.enableFollowCheckbox= function() {
	casper.then(function(){
		casper.thenOpen(config.url, function() {
			casper.echo('                   case-1                    ', 'INFO');
			casper.echo(' Add New topic by enable Follow check box and verify unfollow topic option on forum listing page', 'INFO');
			casper.echo('************************************************************************************************', 'INFO');
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
followpinlockTest.enableFollowCheckboxAddNewTopic= function() {
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
													wait.waitForTime(3000 , casper , function() {
													    casper.capture('232.png');
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
															wait.waitForTime(2000 , casper , function() {
																forumLoginMethod.logoutFromApp(casper, function(err){
																	if (!err){
																		casper.echo('Successfully logout from application', 'INFO');
																	}
																});
															});
														});	
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



	/************************   2.Lock-unLock Topic  ****************************/
	

//17.Lock any topic and Verify Lock option of topic listing page[Home page]
followpinlockTest.lockAnyTopic= function() {
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
		
		//17.test case for create topic 
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                case-17-a              ', 'INFO');
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
		
		//17.Verify the follow option visibility on topic listing page by the guest user.
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                        case-17-b                            ', 'INFO');
				casper.echo(' Lock any topic and Verify Lock option of topic listing page.', 'INFO');
				casper.echo('*************************************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
						wait.waitForElement('div#topics ul li:nth-child(1) a', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
								   casper.click('div#topics ul li:nth-child(1) a');
								   wait.waitForElement('div#topics div div div form div div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
										if(!err){
											if(isExist) {
												casper.click('div#topics div div div form div div:nth-child(2) ul li:nth-child(1) a');		
												wait.waitForTime(3000 , casper , function() {
													casper.capture('17(b)1.png');
													try{
														casper.test.assertExists('div#topics div div div form div div:nth-child(3) ul li span:nth-child(2) span:nth-child(1) input');
														casper.click('div#topics div div div form div div:nth-child(3) ul li span:nth-child(2) span:nth-child(1) input');
														wait.waitForTime(3000 , casper , function() {
															casper.test.assertExists('div#topics-menu span:nth-child(2) a');
															casper.click('div#topics-menu span:nth-child(2) a');
															casper.test.assertExists('a#lock');
															casper.click('a#lock');
															   try{
																	casper.test.assertExists('i.glyphicon.glyphicon-lock');
																	casper.echo('lock icon found','INFO');
																}
																catch(e){
																	casper.test.assertDoesntExist('i.glyphicon.glyphicon-lock');
																	casper.echo('lock icon not found','ERROR');
																}
														});
													}catch(e){
														casper.test.assertDoesntExist('div#topics div div div form div div:nth-child(3) ul li span:nth-child(2) span:nth-child(1) input');
													}
													wait.waitForTime(3000 , casper , function() {
														casper.capture('17(b)2.png');
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err){
																casper.echo('Successfully logout from application', 'INFO');
															}
														});
													});
												});				   						   
											}else {
												casper.echo(' Latest link not found in Topic page', 'INFO');
											}
										}
									});						   
								}else {
									casper.echo('Topic link not found', 'INFO');
								}
							}
						});
				    }else {
						casper.echo('Error','ERROR');
					}
				});
			});
		});
	});
}

//18.un-Lock any topic and Verify Lock optipon of topic listing page[Home page]
followpinlockTest.unlockAnyTopic= function() {
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
		
		//18.test case for create topic 
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                case-18-a              ', 'INFO');
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
		
		//18.Verify the follow option visibility on topic listing page by the guest user.
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                        case-18-b                            ', 'INFO');
				casper.echo(' un-Lock any topic and Verify Lock optipon of topic listing page[Home page].', 'INFO');
				casper.echo('****************************************************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
						wait.waitForElement('div#topics ul li:nth-child(1) a', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
								   casper.click('div#topics ul li:nth-child(1) a');
								   wait.waitForElement('div#topics div div div form div div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
										if(!err){
											if(isExist) {
												casper.click('div#topics div div div form div div:nth-child(2) ul li:nth-child(1) a');		
												wait.waitForTime(3000 , casper , function() {
													try{
														casper.test.assertExists('div#topics div div div form div div:nth-child(3) ul li span:nth-child(2) span:nth-child(1) input');
														casper.click('div#topics div div div form div div:nth-child(3) ul li span:nth-child(2) span:nth-child(1) input');
														wait.waitForTime(3000 , casper , function() {
															casper.test.assertExists('div#topics-menu span:nth-child(2) a');
															casper.click('div#topics-menu span:nth-child(2) a');
															casper.test.assertExists('a#unlock');
															casper.click('a#unlock');
												            wait.waitForTime(3000 , casper , function() {
																    try{
																		casper.test.assertExists('i.glyphicon.glyphicon-lock');
																		casper.echo('lock icon found','INFO');
																	}
																	catch(e){
																		casper.test.assertDoesntExist('i.glyphicon.glyphicon-lock');
																		casper.echo('lock icon not found','ERROR');
																	}
																  /*  var grpName = casper.evaluate(function(){
																		var x3 = document.querySelector('div#topics div div div form div div:nth-child(3) ul li span:nth-child(2) span:nth-child(1) i').getAttribute('class');
																			return x3;
																	});
																	casper.click(''+grpName+'','INFO');
																	});
															       */
														    });
														});
													}catch(e){
														casper.test.assertDoesntExist('div#topics div div div form div div:nth-child(3) ul li span:nth-child(2) span:nth-child(1) input');
													}
													wait.waitForTime(3000 , casper , function() {
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err){
																casper.echo('Successfully logout from application', 'INFO');
															}
														});
													});
												});				   						   
											}else {
												casper.echo(' Latest link not found in Topic page', 'INFO');
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

//19.Lock any topic and Verify Lock option of forum listing page[Home page]
followpinlockTest.lockAnyTopicForumListingPage= function() {
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
		
		//19.test case for create topic 
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                case-19-a              ', 'INFO');
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
		
		//19.Lock any topic and Verify Lock option of forum listing page[Home page]
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                        case-19-b                            ', 'INFO');
				casper.echo('Lock any topic and Verify Lock option of forum listing page[Home page].', 'INFO');
				casper.echo('*************************************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
						wait.waitForElement('div#topics ul li:nth-child(2) a', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
								   casper.click('div#topics ul li:nth-child(2) a');
								   wait.waitForElement('div#topics ul li:nth-child(1)', casper, function(err, isExist) {
										if(!err){
											if(isExist) {
												casper.click('div#topics ul li:nth-child(1)');		
												wait.waitForTime(3000 , casper , function() {
													casper.capture('17(b)1.png');
													try{
														casper.test.assertExists('div#topics div div div form div div:nth-child(3) ul li span:nth-child(2) span:nth-child(1) input');
														casper.click('div#topics div div div form div div:nth-child(3) ul li span:nth-child(2) span:nth-child(1) input');
														wait.waitForTime(3000 , casper , function() {
															casper.test.assertExists('div#topics-menu span:nth-child(2) a');
															casper.click('div#topics-menu span:nth-child(2) a');
															casper.test.assertExists('a#lock');
															casper.click('a#lock');
															   try{
																	casper.test.assertExists('i.glyphicon.glyphicon-lock');
																	casper.echo('lock icon found','INFO');
																}
																catch(e){
																	casper.test.assertDoesntExist('i.glyphicon.glyphicon-lock');
																	casper.echo('lock icon not found','ERROR');
																}
														});
													}catch(e){
														casper.test.assertDoesntExist('div#topics div div div form div div:nth-child(3) ul li span:nth-child(2) span:nth-child(1) input');
													}
													wait.waitForTime(3000 , casper , function() {
														casper.capture('17(b)2.png');
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err){
																casper.echo('Successfully logout from application', 'INFO');
															}
														});
													});
												});				   						   
											}else {
												casper.echo(' Latest link not found in Topic page', 'INFO');
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

//20.Un-Lock any topic and Verify Lock option of forum listing page[Home page]
followpinlockTest.unlockAnyTopicForumListingPage= function() {
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
		
		//20.test case for create topic 
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                case-18-a              ', 'INFO');
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
		
		//20.Un-Lock any topic and Verify Lock option of forum listing page[Home page]
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                        case-20-b                            ', 'INFO');
				casper.echo(' Un-Lock any topic and Verify Lock option of forum listing page[Home page].', 'INFO');
				casper.echo('****************************************************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
						wait.waitForElement('div#topics ul li:nth-child(1) a', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
								   casper.click('div#topics ul li:nth-child(1) a');
								   wait.waitForElement('div#topics div div div form div div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
										if(!err){
											if(isExist) {
												casper.click('div#topics div div div form div div:nth-child(2) ul li:nth-child(1) a');		
												wait.waitForTime(3000 , casper , function() {
													try{
														casper.test.assertExists('div#topics div div div form div div:nth-child(3) ul li span:nth-child(2) span:nth-child(1) input');
														casper.click('div#topics div div div form div div:nth-child(3) ul li span:nth-child(2) span:nth-child(1) input');
														wait.waitForTime(3000 , casper , function() {
															casper.test.assertExists('div#topics-menu span:nth-child(2) a');
															casper.click('div#topics-menu span:nth-child(2) a');
															casper.test.assertExists('a#unlock');
															casper.click('a#unlock');
												            wait.waitForTime(3000 , casper , function() {
																    try{
																		casper.test.assertExists('i.glyphicon.glyphicon-lock');
																		casper.echo('lock icon found','INFO');
																	}
																	catch(e){
																		casper.test.assertDoesntExist('i.glyphicon.glyphicon-lock');
																		casper.echo('lock icon not found','ERROR');
																	}
																  /*  var grpName = casper.evaluate(function(){
																		var x3 = document.querySelector('div#topics div div div form div div:nth-child(3) ul li span:nth-child(2) span:nth-child(1) i').getAttribute('class');
																			return x3;
																	});
																	casper.click(''+grpName+'','INFO');
																	});
															       */
														    });
														});
													}catch(e){
														casper.test.assertDoesntExist('div#topics div div div form div div:nth-child(3) ul li span:nth-child(2) span:nth-child(1) input');
													}
													wait.waitForTime(3000 , casper , function() {
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err){
																casper.echo('Successfully logout from application', 'INFO');
															}
														});
													});
												});				   						   
											}else {
												casper.echo(' Latest link not found in Topic page', 'INFO');
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

//21.Add New topic by enable lock check box and verify lock topic  on forum listing page
followpinlockTest.enableLockCheckBoxForumListingPage= function() {
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
		
		//21.Add New topic by enable lock check box and verify lock topic  on forum listing page
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                case-21-a              ', 'INFO');
				casper.echo('Add New topic by enable lock check box and verify lock topic  on forum listing page', 'INFO');
				casper.echo('***********************************************************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('div#topics a', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.click('div#topics a');
									composeTopicMethod.startTopic(true,false,true,data['Topicmessage'],casper,function(err){
										if(!err){
											wait.waitForTime(2000 , casper , function() {
											casper.capture('lockmassage.png');
											    try{
													casper.test.assertExists('div.alert.alert-warning.text-center');
													//var lockmassage=casper.fetch('div.alert.alert-warning text-center');
													//casper.echo(''+lockmassage+'','INFO');
													var grpName = casper.evaluate(function(){
														var x3 = document.querySelector('div.alert.alert-warning.text-center')
														return x3.innerHTML;
													});
													casper.echo('subject :'+grpName,'INFO');
												}
												catch(e){
												    casper.test.assertDoesntExist('div.alert.alert-warning.text-center');
												}
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
		
		
	});
}

//22.Add New topic by disabling Follow check box and verify follow topic option on Post page
followpinlockTest.disablingFollowCheckBoxForumListingPage= function() {
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
		
		//22.Add New topic by disabling Follow check box and verify follow topic option on Post page
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                case-22-a              ', 'INFO');
				casper.echo('Add New topic by enable lock check box and verify lock topic  on forum listing page', 'INFO');
				casper.echo('***********************************************************************************', 'INFO');
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
											casper.capture('lockmassage.png');
											    try{
													casper.test.assertExists('div.alert.alert-warning text-center');
													var lockmassage=casper.fetch('div.alert.alert-warning text-center');
													casper.echo(''+lockmassage+'','INFO');
												}
												catch(e){
												    casper.test.assertDoesntExist('div.alert.alert-warning text-center');
													casper.echo('lock message not be generated','INFO');
												}
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
		
		
	});
}

//23.Add New topic by enable lock check box and verify unlock topic option on latest topic page
followpinlockTest.enableLockCheckBoxLatestTopicPage= function() {
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
		
		//23.Add New topic by enable lock check box and verify unlock topic option on latest topic page
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                case-23-a              ', 'INFO');
				casper.echo('Add New topic by enable lock check box and verify unlock topic option on latest topic page', 'INFO');
				casper.echo('***********************************************************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('div#topics a', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.click('div#topics a');
									composeTopicMethod.startTopic(true,false,true,data['Topicmessage'],casper,function(err){
										if(!err){
											wait.waitForTime(2000 , casper , function() {
											casper.capture('lockmassage.png');
											    try{
													casper.test.assertExists('div.alert.alert-warning.text-center');
													//var lockmassage=casper.fetch('div.alert.alert-warning text-center');
													//casper.echo(''+lockmassage+'','INFO');
													var grpName = casper.evaluate(function(){
														var x3 = document.querySelector('div.alert.alert-warning.text-center')
														return x3.innerHTML;
													});
													casper.echo('subject :'+grpName,'INFO');
												}
												catch(e){
												    casper.test.assertDoesntExist('div.alert.alert-warning.text-center');
												}
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
		
		
	});
}

//24.Add New topic by disabling lock check box and verify lock topic option on latest topic page
followpinlockTest.disablingLockCheckBoxLatestTopicPage= function() {
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
		
		//24.Add New topic by disabling lock check box and verify lock topic option on latest topic page
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                case-24-a              ', 'INFO');
				casper.echo('Add New topic by disabling lock check box and verify lock topic option on latest topic page', 'INFO');
				casper.echo('***********************************************************************************', 'INFO');
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
											casper.capture('lockmassage.png');
											    try{
													casper.test.assertExists('div.alert.alert-warning text-center');
													var lockmassage=casper.fetch('div.alert.alert-warning text-center');
													casper.echo(''+lockmassage+'','INFO');
												}
												catch(e){
												    casper.test.assertDoesntExist('div.alert.alert-warning text-center');
													casper.echo('lock message not be generated','INFO');
												}
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
		
		
	});
}

//25.Lock any topic and Verify Lock optipon of post listing page under category
followpinlockTest.lockAnyTopicVerifyPostListingPage= function() {
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
		
		//25.test case for create topic 
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                case-25-a              ', 'INFO');
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
		
		//25.Verify the follow option visibility on topic listing page by the guest user.
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                        case-25-b                        ', 'INFO');
				casper.echo(' Verify the follow option visibility on topic listing page by the guest user.', 'INFO');
				casper.echo('****************************************************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('a#links-nav i', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.click('a#links-nav i');
									wait.waitForElement('ul#forums_toggle_link li a', casper, function(err, isExist) {
										if(!err){
											if(isExist) {
												casper.click('ul#forums_toggle_link li a');
												wait.waitForTime(3000 , casper , function() {
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
													
														casper.test.assertExists('div#topics div form div div:nth-child(3) ul li span:nth-child(2) span:nth-child(1) input');
														casper.click('div#topics div form div div:nth-child(3) ul li span:nth-child(2) span:nth-child(1) input');
														wait.waitForTime(3000 , casper , function() {
															casper.test.assertExists('div#topics-menu span:nth-child(2) a');
															casper.click('div#topics-menu span:nth-child(2) a');
															casper.test.assertExists('a#lock');
															casper.click('a#lock');
															   try{
																	casper.test.assertExists('i.glyphicon.glyphicon-lock');
																	casper.echo('lock icon found','INFO');
																}
																catch(e){
																	casper.test.assertDoesntExist('i.glyphicon.glyphicon-lock');
																	casper.echo('lock icon not found','ERROR');
																}
														});
														wait.waitForTime(3000 , casper , function() {
															casper.capture('17(b)2.png');
															forumLoginMethod.logoutFromApp(casper, function(err){
																if (!err){
																	casper.echo('Successfully logout from application', 'INFO');
																}
															});
														});
													});		
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
					}else {
						casper.echo('Error : '+err, 'INFO');
					}
				});
			});
		});
	
	});
}

//26.un-Lock any topic and Verify Lock optipon of post listing page under category
followpinlockTest.unlockAnyTopicVerifyPostListingPage= function() {
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
		
		//26.test case for create topic 
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                case-26-a              ', 'INFO');
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
		
		
		//26.un-Lock any topic and Verify Lock optipon of post listing page under category
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                        case-26-b                        ', 'INFO');
				casper.echo('un-Lock any topic and Verify Lock optipon of post listing page under category.', 'INFO');
				casper.echo('****************************************************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('a#links-nav i', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.click('a#links-nav i');
									wait.waitForElement('ul#forums_toggle_link li a', casper, function(err, isExist) {
										if(!err){
											if(isExist) {
												casper.click('ul#forums_toggle_link li a');
												wait.waitForTime(3000 , casper , function() {
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
														casper.test.assertExists('div#topics div form div div:nth-child(3) ul li span:nth-child(2) span:nth-child(1) input');
														casper.click('div#topics div form div div:nth-child(3) ul li span:nth-child(2) span:nth-child(1) input');
														wait.waitForTime(3000 , casper , function() {
															casper.test.assertExists('div#topics-menu span:nth-child(2) a');
															casper.click('div#topics-menu span:nth-child(2) a');
															casper.test.assertExists('a#unlock');
															casper.click('a#unlock');
															   try{
																	casper.test.assertExists('i.glyphicon.glyphicon-lock');
																	casper.echo('lock icon found','INFO');
																}
																catch(e){
																	casper.test.assertDoesntExist('i.glyphicon.glyphicon-lock');
																	casper.echo('lock icon not found','ERROR');
																}
														});
														wait.waitForTime(3000 , casper , function() {
															casper.capture('17(b)2.png');
															forumLoginMethod.logoutFromApp(casper, function(err){
																if (!err){
																	casper.echo('Successfully logout from application', 'INFO');
																}
															});
														});
													});		
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
					}else {
						casper.echo('Error : '+err, 'INFO');
					}
				});
			});
		});
	
	});
}

//27.Lock topic from Profile page and verify locked topic
followpinlockTest.lockTopicProfilePage= function() {
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
	    
	
		//27.test case for create topic 
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                case-27-a              ', 'INFO');
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
		
		//27.Lock topic from Profile page and verify locked topic
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                        case-27-b                    ', 'INFO');
				casper.echo('Lock topic from Profile page and verify locked topic.', 'INFO');
				casper.echo('*****************************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('header#forum_header_fixed div:nth-child(1) ul li:nth-child(1) button', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.click('header#forum_header_fixed div:nth-child(1) ul li:nth-child(1) button');
									wait.waitForElement('a#user-nav-panel-profile', casper, function(err, isExist) {
										if(!err){
											if(isExist) {
												casper.click('a#user-nav-panel-profile');
													wait.waitForElement('a#Topics_Started', casper, function(err, isExist) {
														if(!err){
															if(isExist) {
																casper.click('a#Topics_Started');
																wait.waitForTime(3000 , casper , function() {
																	casper.test.assertExists('div#feed-main div div div div:nth-child(1) div input');
																	casper.click('div#feed-main div div div div:nth-child(1) div input');
																	wait.waitForTime(3000 , casper , function() {
																		casper.test.assertExists('div#topics-menu span:nth-child(4) a i:nth-child(2)');
																		casper.click('div#topics-menu span:nth-child(4) a i:nth-child(2)');
																		casper.test.assertExists('a#lock');
																		casper.click('a#lock');
																		wait.waitForTime(3000 , casper , function() {
																		casper.capture('17(b)3.png');
																			try{
																				casper.test.assertExists('div#feed-main div:nth-child(1) div div span:nth-child(2) span i');
																				casper.echo('lock icon found','INFO');
																				/*  var grpName = casper.evaluate(function(){
																					var x3 = document.querySelector('div#feed-main div:nth-child(1) div div span:nth-child(2) span i').getAttribute('data-original-title');
																						return x3;
																				});
																				casper.click(''+grpName+'','INFO');
																				*/
																			}
																			catch(e){
																				casper.test.assertDoesntExist('div#feed-main div:nth-child(1) div div span:nth-child(2) span i');
																				casper.echo('lock icon not found','ERROR');
																			}
																			wait.waitForTime(3000 , casper , function() {
																				casper.capture('17(b)2.png');
																				forumLoginMethod.logoutFromApp(casper, function(err){
																					if (!err){
																						casper.echo('Successfully logout from application', 'INFO');
																					}
																				});
																			});
																		});
																	});	
                                                                });																
															}else {
																casper.echo('Topic Started link not found', 'INFO');
															}
														}
													});	   
											}else {
												casper.echo('Profile link not found', 'INFO');
											}
										}
									});					   
								}else {
									casper.echo('dropdown-toggle button not found', 'INFO');
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

//28.un-Lock topic from Profile page and verify unlocked topic
followpinlockTest.unlockTopicProfilePage= function() {
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
	    
	
		//28.test case for create topic 
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                case-27-a              ', 'INFO');
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
		
		//28.un-Lock topic from Profile page and verify unlocked topic
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                        case-28-b                    ', 'INFO');
				casper.echo('un-Lock topic from Profile page and verify unlocked topic', 'INFO');
				casper.echo('*****************************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('header#forum_header_fixed div:nth-child(1) ul li:nth-child(1) button', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.click('header#forum_header_fixed div:nth-child(1) ul li:nth-child(1) button');
									wait.waitForElement('a#user-nav-panel-profile', casper, function(err, isExist) {
										if(!err){
											if(isExist) {
												casper.click('a#user-nav-panel-profile');
													wait.waitForElement('a#Topics_Started', casper, function(err, isExist) {
														if(!err){
															if(isExist) {
																casper.click('a#Topics_Started');
																wait.waitForTime(3000 , casper , function() {
																	casper.test.assertExists('div#feed-main div div div div:nth-child(1) div input');
																	casper.click('div#feed-main div div div div:nth-child(1) div input');
																	wait.waitForTime(3000 , casper , function() {
																		casper.test.assertExists('div#topics-menu span:nth-child(4) a i:nth-child(2)');
																		casper.click('div#topics-menu span:nth-child(4) a i:nth-child(2)');
																		casper.test.assertExists('a#unlock');
																		casper.click('a#unlock');
																		wait.waitForTime(3000 , casper , function() {
																		casper.capture('17(b)3.png');
																			try{
																				casper.test.assertExists('div#feed-main div:nth-child(1) div div span:nth-child(2) span i');
																				casper.echo('lock icon found','INFO');
																				/*  var grpName = casper.evaluate(function(){
																					var x3 = document.querySelector('div#feed-main div:nth-child(1) div div span:nth-child(2) span i').getAttribute('data-original-title');
																						return x3;
																				});
																				casper.click(''+grpName+'','INFO');
																				*/
																			}
																			catch(e){
																				casper.test.assertDoesntExist('div#feed-main div:nth-child(1) div div span:nth-child(2) span i');
																				casper.echo('lock icon not found','ERROR');
																			}
																			wait.waitForTime(3000 , casper , function() {
																				casper.capture('17(b)2.png');
																				forumLoginMethod.logoutFromApp(casper, function(err){
																					if (!err){
																						casper.echo('Successfully logout from application', 'INFO');
																					}
																				});
																			});
																		});
																	});	
                                                                });																
															}else {
																casper.echo('Topic Started link not found', 'INFO');
															}
														}
													});	   
											}else {
												casper.echo('Profile link not found', 'INFO');
											}
										}
									});					   
								}else {
									casper.echo('dropdown-toggle button not found', 'INFO');
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

//29.Lock any topic from post page and verify locked message
followpinlockTest.lockTopicPostPage= function() {
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
		
		//29.test case for create topic 
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                case-29-a              ', 'INFO');
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
		
		
		//29.Lock any topic from post page and verify locked message
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                        case-29-b                       ', 'INFO');
				casper.echo('Lock any topic from post page and verify locked message.', 'INFO');
				casper.echo('********************************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('a#links-nav i', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.click('a#links-nav i');
									wait.waitForElement('ul#forums_toggle_link li a', casper, function(err, isExist) {
										if(!err){
											if(isExist) {
												casper.click('ul#forums_toggle_link li a');
												wait.waitForTime(3000 , casper , function() {
													var grpName = casper.evaluate(function(){
														for(var i=3; i<=7; i++) {
															var x1 = document.querySelector('ul#forums_toggle_link li ul:nth-child('+i+') li a');
															if (x1.innerText == 'General') {
																var x3 = document.querySelector('ul#forums_toggle_link li ul:nth-child('+i+') li a').getAttribute('href');
																return x3;
															}
														}
													});
													casper.echo('subject :'+grpName,'INFO');
													casper.click('a[href="'+grpName+'"]');
													wait.waitForElement('div#topics div form div div:nth-child(3) ul li:nth-child(1) span:nth-child(1) span:nth-child(2) h4 a', casper, function(err, isExist) {
														if(!err){
															if(isExist) {
																casper.test.assertExists('div#topics div form div div:nth-child(3) ul li:nth-child(1) span:nth-child(1) span:nth-child(2) h4 a');
																casper.click('div#topics div form div div:nth-child(3) ul li:nth-child(1) span:nth-child(1) span:nth-child(2) h4 a');
																wait.waitForElement('div#body-wrapper div:nth-child(3) div a', casper, function(err, isExist) {
																	if(!err){
																		if(isExist) {
																			    casper.test.assertExists('div#body-wrapper div:nth-child(3) div a ');
																				casper.click('div#body-wrapper div:nth-child(3) div a ');
																				casper.test.assertExists('div#body-wrapper div:nth-child(3) div  ul li:nth-child(1) a');
																				casper.click('div#body-wrapper div:nth-child(3) div  ul li:nth-child(1) a');
																				wait.waitForTime(3000 , casper , function() {
																					casper.capture('17(b)46.png');
																				   try{
																						casper.test.assertExists('div.alert.alert-warning.text-center');
																							var grpName = casper.evaluate(function(){
																							var x1 = document.querySelector('div.alert.alert-warning.text-center');
																							return x1.innerHTML;
																					});
																						 casper.echo('subject :'+grpName,'INFO');
																					}
																					catch(e){
																						casper.test.assertDoesntExist('div.alert.alert-warning.text-center');
																					}
																					wait.waitForTime(3000 , casper , function() {
																						casper.capture('17(b)2.png');
																						forumLoginMethod.logoutFromApp(casper, function(err){
																							if (!err){
																								casper.echo('Successfully logout from application', 'INFO');
																							}
																						});
																					});
																				});
																	
																			}else {
																			 casper.echo('Moderate topic link not found', 'INFO');
																		}
																	}
																});
															}else {
															     casper.echo('no topic found in topic listing page under the Categories ', 'INFO');
															}
														}
													});	
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
					}else {
						casper.echo('Error : '+err, 'INFO');
					}
				});
			});
		});
	
	});
}

//30.UnLock any locked  topic from post page and verify that the locked message should be disappeared 
followpinlockTest.unlockTopicPostPage= function() {
	casper.then(function(){
	    
		//29.Lock any topic from post page and verify locked message
		casper.then(function(){
			followpinlockTest.lockTopicPostPage();
		});
		
		//30.UnLock any locked  topic from post page and verify that the locked message should be disappeared 
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                        case-29-b                       ', 'INFO');
				casper.echo('Lock any topic from post page and verify locked message.', 'INFO');
				casper.echo('********************************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('a#links-nav i', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.click('a#links-nav i');
									wait.waitForElement('ul#forums_toggle_link li a', casper, function(err, isExist) {
										if(!err){
											if(isExist) {
												casper.click('ul#forums_toggle_link li a');
												wait.waitForTime(3000 , casper , function() {
													var grpName = casper.evaluate(function(){
														for(var i=3; i<=7; i++) {
															var x1 = document.querySelector('ul#forums_toggle_link li ul:nth-child('+i+') li a');
															if (x1.innerText == 'General') {
																var x3 = document.querySelector('ul#forums_toggle_link li ul:nth-child('+i+') li a').getAttribute('href');
																return x3;
															}
														}
													});
													casper.echo('subject :'+grpName,'INFO');
													casper.click('a[href="'+grpName+'"]');
													wait.waitForElement('div#topics div form div div:nth-child(3) ul li:nth-child(1) span:nth-child(1) span:nth-child(2) h4 a', casper, function(err, isExist) {
														if(!err){
															if(isExist) {
																casper.test.assertExists('div#topics div form div div:nth-child(3) ul li:nth-child(1) span:nth-child(1) span:nth-child(2) h4 a');
																casper.click('div#topics div form div div:nth-child(3) ul li:nth-child(1) span:nth-child(1) span:nth-child(2) h4 a');
																wait.waitForElement('div#body-wrapper div:nth-child(3) div a', casper, function(err, isExist) {
																	if(!err){
																		if(isExist) {
																			    casper.test.assertExists('div#body-wrapper div:nth-child(3) div a ');
																				casper.click('div#body-wrapper div:nth-child(3) div a ');
																				casper.test.assertExists('div#body-wrapper div:nth-child(3) div  ul li:nth-child(1) a');
																				casper.click('div#body-wrapper div:nth-child(3) div  ul li:nth-child(1) a');
																				wait.waitForTime(3000 , casper , function() {
																					casper.capture('17(b)46.png');
																				   try{
																						casper.test.assertExists('div.alert.alert-warning.text-center');
																							var grpName = casper.evaluate(function(){
																							var x1 = document.querySelector('div.alert.alert-warning.text-center');
																							return x1.innerHTML;
																					});
																						 casper.echo('subject :'+grpName,'INFO');
																					}
																					catch(e){
																						casper.test.assertDoesntExist('div.alert.alert-warning.text-center');
																						casper.echo('unlock sucessful','INFO');
																					}
																					wait.waitForTime(3000 , casper , function() {
																						casper.capture('17(b)2.png');
																						forumLoginMethod.logoutFromApp(casper, function(err){
																							if (!err){
																								casper.echo('Successfully logout from application', 'INFO');
																							}
																						});
																					});
																				});
																	
																			}else {
																			 casper.echo('Moderate topic link not found', 'INFO');
																		}
																	}
																});
															}else {
															     casper.echo('no topic found in topic listing page under the Categories ', 'INFO');
															}
														}
													});	
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
					}else {
						casper.echo('Error : '+err, 'INFO');
					}
				});
			});
		});
	
	});
}

//31.Verify Reply a Post option angainst locked topic on post page for registered user
followpinlockTest.ReplyPostOptionAngainstLockedTopic= function() {
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
		
		//31.test case for create topic (lock)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                case-31-a              ', 'INFO');
				casper.echo(' test case for create topic (lock)       ', 'INFO');
				casper.echo('*****************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('div#topics a', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.click('div#topics a');
									composeTopicMethod.startTopic(true,false,true,data['Topicmessage'],casper,function(err){
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
	
		//31.Verify Reply a Post option angainst locked topic on post page for registered user
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                        case-31-b                       ', 'INFO');
				casper.echo('Verify Reply a Post option angainst locked topic on post page for registered user.', 'INFO');
				casper.echo('**********************************************************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['Valid'].username, json['Valid'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('a#links-nav i', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
								    casper.test.assertExists('div#topics div div div form div div:nth-child(3) ul li:nth-child(1) span:nth-child(1) span:nth-child(2) h4 a ');
									casper.click('div#topics div div div form div div:nth-child(3) ul li:nth-child(1) span:nth-child(1) span:nth-child(2) h4 a');
									wait.waitForTime(3000 , casper , function() {
										try{
											 casper.test.assertExists('#message');
											 casper.echo('reply text exist','INFO');
										}catch(e){
											 casper.test.assertDoesntExist('#message');
											 casper.echo('reply text doesnot exist','INFO');
										}
										forumLoginMethod.logoutFromApp(casper, function(err){
											if (!err){
												casper.echo('Successfully logout from application', 'INFO');
											}
										});
									});					   
								}else {
									casper.echo('Menu link not found', 'INFO');
								}
							}
						});	
					}else {
						casper.echo('Error', 'ERROR');
					}
				});
			});
		});
	
	});
}

//32.Verify Vote option against locked topic on post page
followpinlockTest.voteOptionAgainstLockedTopic= function() {
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
		
		//31.test case for create topic (lock with poll)
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                case-31-a              ', 'INFO');
				casper.echo(' test case for create topic (lock with poll)       ', 'INFO');
				casper.echo('*****************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('div#topics a', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									casper.click('div#topics a');
									followpinlockMethod.startTopic(true,false,true,data['Topicmessage'],casper,function(err){
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
		
		//32.Verify Vote option against locked topic on post page
		casper.then(function(){
			casper.thenOpen(config.url, function() {
				casper.echo('                        case-32-b                    ', 'INFO');
				casper.echo('Verify Vote option against locked topic on post page.', 'INFO');
				casper.echo('*****************************************************', 'INFO');
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(json['Valid'].username, json['Valid'].password, casper, function(err){
					if(!err) {
						casper.echo('login by valid username and password and verify error message', 'INFO');
						wait.waitForElement('a#links-nav i', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
								    casper.test.assertExists('div#topics div div div form div div:nth-child(3) ul li:nth-child(1) span:nth-child(1) span:nth-child(2) h4 a ');
									casper.click('div#topics div div div form div div:nth-child(3) ul li:nth-child(1) span:nth-child(1) span:nth-child(2) h4 a');
									wait.waitForTime(3000 , casper , function() {
										try{
											 casper.test.assertExists('div.poll-vote input:nth-child(5)');
											 casper.click('div.poll-vote input:nth-child(5)');
											 var grpName = casper.evaluate(function(){
												var x3 = document.querySelector('div.poll-vote input:nth-child(5)').getAttribute('data-original-title');
												return x3;
											});
										     casper.echo('subject :'+grpName,'INFO');
										}catch(e){
											 casper.test.assertDoesntExist('div.poll-vote  input:nth-child(5)');
											 casper.echo('reply text doesnot exist','INFO');
										}
										forumLoginMethod.logoutFromApp(casper, function(err){
											if (!err){
												casper.echo('Successfully logout from application', 'INFO');
											}
										});
									});					   
								}else {
									casper.echo('Menu link not found', 'ERROR');
								}
							}
						});	
					}else {
						casper.echo('Error', 'ERROR');
					}
				});
			});
		});
	
	});
}



	/***************************   3.Pin-unPin Topic  ****************************/
	

//33.Pin any topic and Verify Pin icon of topic listing page[Home page]
followpinlockTest.PinIconTopicListingPage= function() {
	casper.then(function(){
		casper.thenOpen(config.url, function() {
			casper.echo('                   case-1                    ', 'INFO');
			casper.echo(' Pin any topic and Verify Pin icon of topic listing page[Home page]', 'INFO');
			casper.echo('*******************************************************************', 'INFO');
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



	
	
	
