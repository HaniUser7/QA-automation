/***These are the function which has been called in postEventMemberApproval.js and also will be used in other js file as per requirement**********/

'use strict';
var json = require('../../testdata/combinationOfSubCategoryAndGroupPermissions.json');
var config = require('../../../config/config.json');
var combinationOfSubCategoryAndGroupPermissionsMethod = require('../methods/combinationOfSubCategoryAndGroupPermissions.js');
var registerMethod = require('../methods/register.js');
var forumLoginMethod = require('../methods/login.js');
var privateMessageMethod = require('../methods/privateMessage.js');
var backEndForumRegisterMethod = require('../methods/backEndRegistration.js');
var wait = require('../wait.js');
var category_Id;
var subCategory_Id;
var combinationOfSubCategoryAndGroupPermissionsTestcases = module.exports = {};

// method to test all backend setting
combinationOfSubCategoryAndGroupPermissionsTestcases.toTestmethods = function() {
	casper.thenOpen(config.backEndUrl, function() {
		registerMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPage(casper, function(err) {
							if(!err) {
								combinationOfSubCategoryAndGroupPermissionsMethod.getId(casper, function(err,categoryId, subCategoryId) {
									if(!err) {
										category_Id = categoryId;
										subCategory_Id = subCategoryId;
									}
								});
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.enableViewCategoryForSubCategory(subCategory_Id, casper, function(err) {
										if(!err) {
											casper.echo('EnableViewCategoryForSubCategory method called ','INFO');
										}
									});
								});
							}
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
};

// method to create a category and its sub category and get their id
combinationOfSubCategoryAndGroupPermissionsTestcases.createCategoryAndSubCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		registerMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPage(casper, function(err) {
							if(!err) {
								combinationOfSubCategoryAndGroupPermissionsMethod.isCategoryExists(json["category"], casper, function(err, isExists) {
									if(isExists) {
										casper.echo('Category already existed', 'INFO');
									} else {
										casper.echo('Category not exist', 'INFO');
										combinationOfSubCategoryAndGroupPermissionsMethod.createCategory(json["category"], casper, function(err) {
											if(!err) {
												casper.then(function() {
													casper.reload(function(){;
																										combinationOfSubCategoryAndGroupPermissionsMethod.createSubCategory(json["subCategory"], casper, function(err) {
														if(!err) {
													
														}
													});
													});
												});
											}
										});
									}
								});
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.getId(casper, function(err,categoryId, subCategoryId) {
										if(!err) {
											category_Id = categoryId;
											subCategory_Id = subCategoryId;
										}
									});
								});
							}
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
};

// method to verify with category cat1
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		registerMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPage(casper, function(err) {
							if(!err) {
								combinationOfSubCategoryAndGroupPermissionsMethod.getId(casper, function(err,categoryId, subCategoryId) {
									if(!err) {
										category_Id = categoryId;
										subCategory_Id = subCategoryId;
									}
								});
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.enableViewCategoryForSubCategory(subCategory_Id, casper, function(err) {
										if(!err) {
											casper.echo('enableViewCategoryForSubCategory method called ','INFO');
											casper.then(function() {
												backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
												});
											});
										}
									});
								});
								casper.thenOpen(config.backEndUrl, function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.enableViewCategory(casper, function(err) {
										if(!err) {
											casper.echo('enableViewCategory method called ','INFO');
										}
									});
								});
							}
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with registerd user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});        
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
					} else {
						casper.echo('User not logged in','ERROR');	
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify with sub-category cat1a
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithSubCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		registerMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPage(casper, function(err) {
							if(!err) {
								combinationOfSubCategoryAndGroupPermissionsMethod.getId(casper, function(err,categoryId, subCategoryId) {
									if(!err) {
										category_Id = categoryId;
										subCategory_Id = subCategoryId;
									}
								});
								casper.then(function() {
									backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
									});
								});
							}
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with registerd user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1a visible','INFO');
											}else{
												casper.echo('cat1a not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});        
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
					} else {
						casper.echo('User not logged in','ERROR');	
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
	
};

// method to verify with the private sub-category cat1a
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPrivateSubCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		registerMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPage(casper, function(err) {
							if(!err) {
								combinationOfSubCategoryAndGroupPermissionsMethod.getId(casper, function(err,categoryId, subCategoryId) {
									if(!err) {
										category_Id = categoryId;
										subCategory_Id = subCategoryId;
									}
								});
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.disableViewCategoryForSubCategory(casper, function(err) {
										if(!err) {
											casper.echo('disableViewCategoryForSubCategory method called ','INFO');
											casper.then(function() {
												backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
												});
											});
										}
									});
								});
								/*casper.thenOpen(config.backEndUrl, function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.enableViewCategory(casper, function(err) {
										if(!err) {
											casper.echo('enableViewCategory method called ','INFO');
										}
									});
								});*/
							}
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with registerd user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1a visible','INFO');
												casper.click('li#forum_'+subCategory_Id+' a');
												wait.waitForElement('div.text-center.bmessage.alert-info.text-danger', casper,function(err, isExists) {
													if(isExists) {
														var actualText = casper.fetchText('div.text-center.bmessage.alert-info.text-danger');
														var expectedText = "Sorry! You don't have permission to perform this action.";
														//casper.test.assert(actualText.indexOf(expectedText) > -1);
														casper.echo(actualText,'INFO');
													}else{
														casper.echo('not visible on category listing page','ERROR');
													}
												});
											}else{
												casper.echo('cat1a not visible','ERROR');
											}
										}); 
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});        
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
					} else {
						casper.echo('User not logged in','ERROR');	
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify with the parent category cat1
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithParentCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		registerMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPage(casper, function(err) {
							if(!err) {
								combinationOfSubCategoryAndGroupPermissionsMethod.getId(casper, function(err,categoryId, subCategoryId) {
									if(!err) {
										category_Id = categoryId;
										subCategory_Id = subCategoryId;
									}
								});
								casper.then(function() {
									backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
									});
								});
							}
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with registerd user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});        
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
					} else {
						casper.echo('User not logged in','ERROR');	
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify start new topic button with the sub-category cat1a
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithNewTopicButtonForSubCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		registerMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPage(casper, function(err) {
							if(!err) {
								combinationOfSubCategoryAndGroupPermissionsMethod.getId(casper, function(err,categoryId, subCategoryId) {
									if(!err) {
										category_Id = categoryId;
										subCategory_Id = subCategoryId;
									}
								});
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.enableStartTopicsForSubCategory(casper, function(err) {
										if(!err) {
											casper.echo('enableViewCategoryForSubCategory method called ','INFO');
											casper.then(function() {
												backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
												});
											});
										}
									});
								});
								/*casper.thenOpen(config.backEndUrl, function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.enableStartTopics(casper, function(err) {
										if(!err) {
											casper.echo('enableViewCategory method called ','INFO');
										}
									});
								});*/
							}
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with registerd user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1a visible','INFO');
												casper.click('li#forum_'+subCategory_Id+' a');
												wait.waitForTime(2000, casper,function(err) {
													if(!err) {
															
													}else{
														casper.echo('not visible on category listing page','ERROR');
													}
												});
											}else{
												casper.echo('cat1a not visible','ERROR');
											}
										}); 
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});        
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
					} else {
						casper.echo('User not logged in','ERROR');	
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify start new topic button with the sub-category cat1a(Disable)
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithNewTopicButtonForSubCategoryDisable = function() {
	casper.thenOpen(config.backEndUrl, function() {
		registerMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPage(casper, function(err) {
							if(!err) {
								combinationOfSubCategoryAndGroupPermissionsMethod.getId(casper, function(err,categoryId, subCategoryId) {
									if(!err) {
										category_Id = categoryId;
										subCategory_Id = subCategoryId;
									}
								});
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.disableStartTopicsForSubCategory(casper, function(err) {
										if(!err) {
											casper.echo('enableViewCategoryForSubCategory method called ','INFO');
											casper.then(function() {
												backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
												});
											});
										}
									});
								});
								/*casper.thenOpen(config.backEndUrl, function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.enableStartTopics(casper, function(err) {
										if(!err) {
											casper.echo('enableViewCategory method called ','INFO');
										}
									});
								});*/
							}
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with registerd user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1a visible','INFO');
												casper.click('li#forum_'+subCategory_Id+' a');
												wait.waitForTime(2000, casper,function(err) {
													if(!err) {
														casper.capture('dg.png');	
													}else{
														casper.echo('not visible on category listing page','ERROR');
													}
												});
											}else{
												casper.echo('cat1a not visible','ERROR');
											}
										}); 
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});        
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
					} else {
						casper.echo('User not logged in','ERROR');	
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify start new topic button with the sub-category cat1a(Disable)
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithNewTopicButtonForParentCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		registerMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPage(casper, function(err) {
							if(!err) {
								combinationOfSubCategoryAndGroupPermissionsMethod.getId(casper, function(err,categoryId, subCategoryId) {
									if(!err) {
										category_Id = categoryId;
										subCategory_Id = subCategoryId;
									}
								});
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.disableStartTopicsForSubCategory(casper, function(err) {
										if(!err) {
											casper.echo('enableViewCategoryForSubCategory method called ','INFO');
											casper.then(function() {
												backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
												});
											});
										}
									});
								});
								/*casper.thenOpen(config.backEndUrl, function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.enableStartTopics(casper, function(err) {
										if(!err) {
											casper.echo('enableViewCategory method called ','INFO');
										}
									});
								});*/
							}
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with registerd user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
											
											}else{
												casper.echo('cat1a not visible','ERROR');
											}
										}); 
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});        
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
					} else {
						casper.echo('User not logged in','ERROR');	
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify Reply topic button with the sub-category cat1a
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForSubCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		registerMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPage(casper, function(err) {
							if(!err) {
								combinationOfSubCategoryAndGroupPermissionsMethod.getId(casper, function(err,categoryId, subCategoryId) {
									if(!err) {
										category_Id = categoryId;
										subCategory_Id = subCategoryId;
									}
								});
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.enableReplyTopicsForSubCategory(casper, function(err) {
										if(!err) {
											casper.echo('enableViewCategoryForSubCategory method called ','INFO');
											casper.then(function() {
												backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
												});
											});
										}
									});
								});
								/*casper.thenOpen(config.backEndUrl, function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.enableReplyTopics(casper, function(err) {
										if(!err) {
											casper.echo('enableViewCategory method called ','INFO');
										}
									});
								});*/
							}
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with registerd user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
											
											}else{
												casper.echo('cat1a not visible','ERROR');
											}
										}); 
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});        
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
					} else {
						casper.echo('User not logged in','ERROR');	
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};


