/***These are the function which has been called in thumpsUpDown.js and also will be used in other js file as per requirement**********/

'use strict';
var registerMethod = require('./register.js');
var utils = require('./utils.js');
var wait = require('../wait.js');
var json = require('../../testdata/combinationOfSubCategoryAndGroupPermissions.json');
var forumLoginMethod = require('../methods/login.js');
var backEndForumRegisterMethod = require('./backEndRegistration.js');
var combinationOfSubCategoryAndGroupPermissionsMethod = module.exports = {};

//*************************************************PRIVATE METHODS***********************************************

//*************************Method to enable View category for registered User from backend ************************
combinationOfSubCategoryAndGroupPermissionsMethod.enableViewCategory = function(driver, callback) {
	registerMethod.loginToForumBackEnd(casper, function(err) {
		if(!err) {
			wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
				if(isExists) {
					driver.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
					driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
					wait.waitForElement('div#ddUsers', casper, function(err, isExists) {
						if(isExists) {
							casper.click('div#ddUsers a:nth-child(1)');
							wait.waitForElement('div#tab_wrapper', casper, function(err, isExists) {
								if(isExists) {
									//casper.click('li.inactive_tab a');
									wait.waitForElement('table.text.fullborder', driver, function(err, isExists) {
										if(isExists) {
											var id = casper.evaluate(function(){
												for(var i=1; i<=7; i++) {
													var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
													if (x1.innerText == 'Registered Users') {
														document.querySelector('tr:nth-child('+i+') td:nth-child(3) a').click();
														var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('id');
														return x2;
													}
												}
											});
											casper.click('a[id="'+id+'"]');
											wait.waitForElement('input#view_forum', casper, function(err, isExists) {
												if(isExists) {
													utils.enableorDisableCheckbox('view_forum', true, casper, function() {
														casper.echo('checkbox is checked', 'INFO');
													});
													casper.test.assertExists('button.button.btn-m.btn-blue');
													casper.click('button.button.btn-m.btn-blue');
													casper.wait(40000, function() {
													});
													/*wait.waitForElement('font[color="red"]', casper, function(err, isExists) {
														if(isExists) {
															casper.echo("Permission unchanged",'INFO');
														}
													});*/
												}else {
													casper.echo(' Viewable on Members List  not found', 'ERROR');
												}
											});
										} else {
											casper.echo('Table not found', 'ERROR');
										}
									});
								} else {
									casper.echo('Calendar Permissions tab not found', 'ERROR');
								}
							});
						} else {
							casper.echo('Content  tooltip menu not found', 'ERROR');
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
	casper.then(function() {
		backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
		});
		return callback(null);
	});
};

//*************************Method to enable Start Topics for registered User from backend ************************
combinationOfSubCategoryAndGroupPermissionsMethod.enableStartTopics = function(driver, callback) {
	registerMethod.loginToForumBackEnd(casper, function(err) {
		if(!err) {
			wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
				if(isExists) {
					driver.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
					driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
					wait.waitForElement('div#ddUsers', casper, function(err, isExists) {
						if(isExists) {
							casper.click('div#ddUsers a:nth-child(1)');
							wait.waitForElement('div#tab_wrapper', casper, function(err, isExists) {
								if(isExists) {
									//casper.click('li.inactive_tab a');
									wait.waitForElement('table.text.fullborder', driver, function(err, isExists) {
										if(isExists) {
											var id = casper.evaluate(function(){
												for(var i=1; i<=7; i++) {
													var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
													if (x1.innerText == 'Registered Users') {
														document.querySelector('tr:nth-child('+i+') td:nth-child(3) a').click();
														var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('id');
														return x2;
													}
												}
											});
											casper.click('a[id="'+id+'"]');
											wait.waitForElement('input#post_threads', casper, function(err, isExists) {
												if(isExists) {
													utils.enableorDisableCheckbox('post_threads', true, casper, function() {
														casper.echo('checkbox is checked', 'INFO');
													});
													casper.test.assertExists('button.button.btn-m.btn-blue');
													casper.click('button.button.btn-m.btn-blue');
													casper.wait(40000, function() {
													});
													/*wait.waitForElement('font[color="red"]', casper, function(err, isExists) {
														if(isExists) {
															casper.echo("Permission unchanged",'INFO');
														}
													});*/
												}else {
													casper.echo(' Viewable on Members List  not found', 'ERROR');
												}
											});
										} else {
											casper.echo('Table not found', 'ERROR');
										}
									});
								} else {
									casper.echo('Calendar Permissions tab not found', 'ERROR');
								}
							});
						} else {
							casper.echo('Content  tooltip menu not found', 'ERROR');
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
	casper.then(function() {
		backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
		});
		return callback(null);
	});
};

//*************************Method to enable Reply Topics for registered User from backend ************************
combinationOfSubCategoryAndGroupPermissionsMethod.enableReplyTopics = function(driver, callback) {
	registerMethod.loginToForumBackEnd(casper, function(err) {
		if(!err) {
			wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
				if(isExists) {
					driver.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
					driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
					wait.waitForElement('div#ddUsers', casper, function(err, isExists) {
						if(isExists) {
							casper.click('div#ddUsers a:nth-child(1)');
							wait.waitForElement('div#tab_wrapper', casper, function(err, isExists) {
								if(isExists) {
									//casper.click('li.inactive_tab a');
									wait.waitForElement('table.text.fullborder', driver, function(err, isExists) {
										if(isExists) {
											var id = casper.evaluate(function(){
												for(var i=1; i<=7; i++) {
													var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
													if (x1.innerText == 'Registered Users') {
														document.querySelector('tr:nth-child('+i+') td:nth-child(3) a').click();
														var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('id');
														return x2;
													}
												}
											});
											casper.click('a[id="'+id+'"]');
											wait.waitForElement('input#other_post_replies', casper, function(err, isExists) {
												if(isExists) {
													utils.enableorDisableCheckbox('other_post_replies', true, casper, function() {
														casper.echo('checkbox is checked', 'INFO');
													});
													casper.test.assertExists('button.button.btn-m.btn-blue');
													casper.click('button.button.btn-m.btn-blue');
													casper.wait(40000, function() {
													});
													/*wait.waitForElement('font[color="red"]', casper, function(err, isExists) {
														if(isExists) {
															casper.echo("Permission unchanged",'INFO');
														}
													});*/
												}else {
													casper.echo(' Viewable on Members List  not found', 'ERROR');
												}
											});
										} else {
											casper.echo('Table not found', 'ERROR');
										}
									});
								} else {
									casper.echo('Calendar Permissions tab not found', 'ERROR');
								}
							});
						} else {
							casper.echo('Content  tooltip menu not found', 'ERROR');
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
	casper.then(function() {
		backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
		});
		return callback(null);
	});
};

//*************************Method to enable Upload Attachments for registered User from backend ************************
combinationOfSubCategoryAndGroupPermissionsMethod.enableUploadAttachments = function(driver, callback) {
	registerMethod.loginToForumBackEnd(casper, function(err) {
		if(!err) {
			wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
				if(isExists) {
					driver.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
					driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
					wait.waitForElement('div#ddUsers', casper, function(err, isExists) {
						if(isExists) {
							casper.click('div#ddUsers a:nth-child(1)');
							wait.waitForElement('div#tab_wrapper', casper, function(err, isExists) {
								if(isExists) {
									//casper.click('li.inactive_tab a');
									wait.waitForElement('table.text.fullborder', driver, function(err, isExists) {
										if(isExists) {
											var id = casper.evaluate(function(){
												for(var i=1; i<=7; i++) {
													var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
													if (x1.innerText == 'Registered Users') {
														document.querySelector('tr:nth-child('+i+') td:nth-child(3) a').click();
														var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('id');
														return x2;
													}
												}
											});
											casper.click('a[id="'+id+'"]');
											wait.waitForElement('input#upload_attachments', casper, function(err, isExists) {
												if(isExists) {
													utils.enableorDisableCheckbox('upload_attachments', true, casper, function() {
														casper.echo('checkbox is checked', 'INFO');
													});
													casper.test.assertExists('button.button.btn-m.btn-blue');
													casper.click('button.button.btn-m.btn-blue');
													casper.wait(40000, function() {
													});
													/*wait.waitForElement('font[color="red"]', casper, function(err, isExists) {
														if(isExists) {
															casper.echo("Permission unchanged",'INFO');
														}
													});*/
												}else {
													casper.echo(' Viewable on Members List  not found', 'ERROR');
												}
											});
										} else {
											casper.echo('Table not found', 'ERROR');
										}
									});
								} else {
									casper.echo('Calendar Permissions tab not found', 'ERROR');
								}
							});
						} else {
							casper.echo('Content  tooltip menu not found', 'ERROR');
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
	casper.then(function() {
		backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
		});
		return callback(null);
	});
};

//*************************Method to enable View Attachments for registered User from backend ************************
combinationOfSubCategoryAndGroupPermissionsMethod.enableViewAttachments = function(driver, callback) {
	registerMethod.loginToForumBackEnd(casper, function(err) {
		if(!err) {
			wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
				if(isExists) {
					driver.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
					driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
					wait.waitForElement('div#ddUsers', casper, function(err, isExists) {
						if(isExists) {
							casper.click('div#ddUsers a:nth-child(1)');
							wait.waitForElement('div#tab_wrapper', casper, function(err, isExists) {
								if(isExists) {
									//casper.click('li.inactive_tab a');
									wait.waitForElement('table.text.fullborder', driver, function(err, isExists) {
										if(isExists) {
											var id = casper.evaluate(function(){
												for(var i=1; i<=7; i++) {
													var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
													if (x1.innerText == 'Registered Users') {
														document.querySelector('tr:nth-child('+i+') td:nth-child(3) a').click();
														var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('id');
														return x2;
													}
												}
											});
											casper.click('a[id="'+id+'"]');
											wait.waitForElement('input#view_attachments', casper, function(err, isExists) {
												if(isExists) {
													utils.enableorDisableCheckbox('view_attachments', true, casper, function() {
														casper.echo('checkbox is checked', 'INFO');
													});
													casper.test.assertExists('button.button.btn-m.btn-blue');
													casper.click('button.button.btn-m.btn-blue');
													casper.wait(40000, function() {
													});
													/*wait.waitForElement('font[color="red"]', casper, function(err, isExists) {
														if(isExists) {
															casper.echo("Permission unchanged",'INFO');
														}
													});*/
												}else {
													casper.echo(' Viewable on Members List  not found', 'ERROR');
												}
											});
										} else {
											casper.echo('Table not found', 'ERROR');
										}
									});
								} else {
									casper.echo('Calendar Permissions tab not found', 'ERROR');
								}
							});
						} else {
							casper.echo('Content  tooltip menu not found', 'ERROR');
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
	casper.then(function() {
		backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
		});
		return callback(null);
	});
};

//*************************Method to enable Require Post Approval for registered User from backend ************************
combinationOfSubCategoryAndGroupPermissionsMethod.enableRequirePostApproval = function(driver, callback) {
	registerMethod.loginToForumBackEnd(casper, function(err) {
		if(!err) {
			wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
				if(isExists) {
					driver.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
					driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
					wait.waitForElement('div#ddUsers', casper, function(err, isExists) {
						if(isExists) {
							casper.click('div#ddUsers a:nth-child(1)');
							wait.waitForElement('div#tab_wrapper', casper, function(err, isExists) {
								if(isExists) {
									//casper.click('li.inactive_tab a');
									wait.waitForElement('table.text.fullborder', driver, function(err, isExists) {
										if(isExists) {
											var id = casper.evaluate(function(){
												for(var i=1; i<=7; i++) {
													var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
													if (x1.innerText == 'Registered Users') {
														document.querySelector('tr:nth-child('+i+') td:nth-child(3) a').click();
														var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('id');
														return x2;
													}
												}
											});
											casper.click('a[id="'+id+'"]');
											wait.waitForElement('input#post_approval', casper, function(err, isExists) {
												if(isExists) {
													utils.enableorDisableCheckbox('post_approval', true, casper, function() {
														casper.echo('checkbox is checked', 'INFO');
													});
													casper.test.assertExists('button.button.btn-m.btn-blue');
													casper.click('button.button.btn-m.btn-blue');
													casper.wait(40000, function() {
													});
													/*wait.waitForElement('font[color="red"]', casper, function(err, isExists) {
														if(isExists) {
															casper.echo("Permission unchanged",'INFO');
														}
													});*/
												}else {
													casper.echo(' Viewable on Members List  not found', 'ERROR');
												}
											});
										} else {
											casper.echo('Table not found', 'ERROR');
										}
									});
								} else {
									casper.echo('Calendar Permissions tab not found', 'ERROR');
								}
							});
						} else {
							casper.echo('Content  tooltip menu not found', 'ERROR');
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
	casper.then(function() {
		backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
		});
		return callback(null);
	});
};

//*************************Method to create a category from backend ************************
combinationOfSubCategoryAndGroupPermissionsMethod.createCategory = function(driver, callback) {
	registerMethod.loginToForumBackEnd(casper, function(err) {
		if(!err) {
			wait.waitForElement('div#my_account_forum_menu', driver, function(err, isExists) {
				if(isExists) {
					driver.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
					driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
					wait.waitForElement('div#ddContent', driver, function(err, isExists) {
						if(isExists) {
							driver.click('div#ddContent a:nth-child(1)');
							wait.waitForElement('a#addForumButton', casper, function(err, isExists) {
								if(isExists) {
									driver.click('a#addForumButton');
									wait.waitForElement('div#addedit_forum_dialog', driver, function(err, isExists) {
										if(isExists) {
											driver.sendKeys('input[name="forum_name"]', data.title, {reset:true});								
											driver.sendKeys('textarea[name="forum_description"]', data.title, {reset:true});
											casper.test.assertExists('button.button.btn-m.btn-blue');
											casper.click('button.button.btn-m.btn-blue');
											casper.wait(40000, function() {
											});
											/*wait.waitForElement('font[color="red"]', casper, function(err, isExists) {
												if(isExists) {
													casper.echo("Permission unchanged",'INFO');
												}
											});*/
										} else {
											casper.echo('Form not found', 'ERROR');
										}
									});
								} else {
									casper.echo('Calendar Permissions tab not found', 'ERROR');
								}
							});
						} else {
							casper.echo('Content  tooltip menu not found', 'ERROR');
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
	casper.then(function() {
		backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
		});
		return callback(null);
	});
};

//*************************Method to create a Sub Category from backend ************************
combinationOfSubCategoryAndGroupPermissionsMethod.createSubCategory = function(driver, callback) {
	registerMethod.loginToForumBackEnd(casper, function(err) {
		if(!err) {
			wait.waitForElement('div#my_account_forum_menu', driver, function(err, isExists) {
				if(isExists) {
					driver.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
					driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
					wait.waitForElement('div#ddContent', driver, function(err, isExists) {
						if(isExists) {
							driver.click('div#ddContent a:nth-child(1)');
							wait.waitForElement('a#addForumButton', casper, function(err, isExists) {
								if(isExists) {
									driver.click('a#addForumButton');
									wait.waitForElement('div#addedit_forum_dialog', driver, function(err, isExists) {
										if(isExists) {
											driver.sendKeys('input[name="forum_name"]', data.title, {reset:true});								
											driver.sendKeys('textarea[name="forum_description"]', data.title, {reset:true});
											utils.enableorDisableCheckbox('isSubcategory', true, casper, function() {
												casper.echo('checkbox is checked', 'INFO');
											});
											driver.fillSelectors('form[name="posts"]', {
				    								'select[name="parentid"]': '99'
											}, true);
											casper.test.assertExists('button.button.btn-m.btn-blue');
											casper.click('button.button.btn-m.btn-blue');
											casper.wait(40000, function() {
											});
											/*wait.waitForElement('font[color="red"]', casper, function(err, isExists) {
												if(isExists) {
													casper.echo("Permission unchanged",'INFO');
												}
											});*/
										} else {
											casper.echo('Form not found', 'ERROR');
										}
									});
								} else {
									casper.echo('Calendar Permissions tab not found', 'ERROR');
								}
							});
						} else {
							casper.echo('Content  tooltip menu not found', 'ERROR');
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
	casper.then(function() {
		backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
		});
		return callback(null);
	});
};

//*************************Method to goto the permission of Sub Category from backend ************************
combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermission = function(driver, callback) {
	registerMethod.loginToForumBackEnd(casper, function(err) {
		if(!err) {
			wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
				if(isExists) {
					casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
					casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
					wait.waitForElement('div#ddContent', casper, function(err, isExists) {
						if(isExists) {
							casper.click('div#ddContent a:nth-child(1)');
							wait.waitForElement('a#addForumButton', casper, function(err, isExists) {
								if(isExists) {
									var id = casper.evaluate(function(){
										var x1 = document.querySelectorAll('div#wrapper li a.forumName.atree');
										for(var i=1; i<=x1.length; i++) {
											var cat = document.querySelector('div#wrapper li:nth-child('+i+') a.forumName.atree');
											if (cat.innerText == 'Cat1') {
												var x2 = document.querySelector("div#wrapper li:nth-child('+i+')").getAttribute('id');
												var x3 = document.querySelector('li[id="'+x2+'"] ul li').getAttribute('id');
												return x3;
											}
										}
									});
									casper.echo('the id of the subcategory'+id,'INFO');
									casper.mouse.move('a[data-forumid="'+id+'"]');
									casper.click('a[data-forumid="'+id+'"]'); // click on manage of cat1
									casper.click('div[id="forumAction'+id+' a:nth-child(3)'); // click on change permission
									wait.waitForElement('div#change_perm_dialog', casper, function(err, isExists) {
										if(isExists) {
											casper.echo("Change Permission Page opened",'INFO');
											return callback(null);
										}
									});
								} else {
									casper.echo('Calendar Permissions tab not found', 'ERROR');
								}
							});
						} else {
							casper.echo('Content  tooltip menu not found', 'ERROR');
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
};

//*************************Method to change permission of Sub Category for View Category from backend ************************
combinationOfSubCategoryAndGroupPermissionsMethod.enableViewCategoryForSubCategory = function(driver, callback) {
	wait.waitForElement('div#change_perm_dialog', driver, function(err, isExists) {
		if(isExists) {
			utils.enableorDisableCheckbox('view_forum_20237761', true, casper, function() {
				casper.echo('checkbox is checked', 'INFO');
			});
			casper.wait(2000, function() {
				return callback(null);
			});
		}
	});
};

//*************************Method to change permission of Sub Category for Start topics from backend ************************
combinationOfSubCategoryAndGroupPermissionsMethod.enableStartTopicsForSubCategory = function(driver, callback) {
	wait.waitForElement('div#change_perm_dialog', driver, function(err, isExists) {
		if(isExists) {
			utils.enableorDisableCheckbox('post_threads_20237761', true, casper, function() {
				casper.echo('checkbox is checked', 'INFO');
			});
			casper.wait(2000, function() {
				return callback(null);
			});
		}
	});
};

//*************************Method to change permission of Sub Category for Reply Topics from backend ************************
combinationOfSubCategoryAndGroupPermissionsMethod.enableReplyTopicsForSubCategory = function(driver, callback) {
	wait.waitForElement('div#change_perm_dialog', driver, function(err, isExists) {
		if(isExists) {
			utils.enableorDisableCheckbox('other_post_replies_20237761', true, casper, function() {
				casper.echo('checkbox is checked', 'INFO');
			});
			casper.wait(2000, function() {
				return callback(null);
			});
		}
	});
};

//*************************Method to change permission of Sub Category for Upload Attachments from backend ************************
combinationOfSubCategoryAndGroupPermissionsMethod.enableUploadAttachmentsForSubCategory = function(driver, callback) {
	wait.waitForElement('div#change_perm_dialog', driver, function(err, isExists) {
		if(isExists) {
			utils.enableorDisableCheckbox('upload_attachments_20237761', true, casper, function() {
				casper.echo('checkbox is checked', 'INFO');
			});
			casper.wait(2000, function() {
				return callback(null);
			});
		}
	});
};

//*************************Method to change permission of Sub Category for View Attachments from backend ************************
combinationOfSubCategoryAndGroupPermissionsMethod.enableViewAttachmentsForSubCategory = function(driver, callback) {
	wait.waitForElement('div#change_perm_dialog', driver, function(err, isExists) {
		if(isExists) {
			utils.enableorDisableCheckbox('view_attachments_20237761', true, casper, function() {
				casper.echo('checkbox is checked', 'INFO');
			});
			casper.wait(2000, function() {
				return callback(null);
			});
		}
	});
};

//*************************Method to change permission of Sub Category for Require Post Approval from backend ************************
combinationOfSubCategoryAndGroupPermissionsMethod.enablePostApprovalForSubCategory = function(driver, callback) {
	wait.waitForElement('div#change_perm_dialog', driver, function(err, isExists) {
		if(isExists) {
			utils.enableorDisableCheckbox('post_approval_20237761', true, casper, function() {
				casper.echo('checkbox is checked', 'INFO');
			});
			casper.wait(2000, function() {
				return callback(null);
			});
		}
	});
};
