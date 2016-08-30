/****This script is dedicated for deleting user's  account on the forum. It covers testing of delete user's account on account setting page with all defined validations****/
'use strict';
var forumRegister = require('./register.js');
var forumLogin = require('./forum_login.js');
var utils = require('./utils.js');
var editProfile = require('./editprofile.js');
var json = require('../testdata/editData.json');
var config = require('../config/config.json');

var deleteAccount = module.exports = {};
var screenShotsDir = config.screenShotsLocation + 'deleteAccount/';

deleteAccount.featureTest = function(casper, test, x) {
	
	//Methos For Verifying Alert Message
	casper.on('remote.alert', function(message) {
		this.echo('alert message: ' + message, 'INFO');
		var expectedErrorMsg = 'Delete the selected user?';
		test.assertEquals(message, expectedErrorMsg);
		this.echo('Alert message is verified when user try to delete an account', 'INFO');
	});
//*******************************************1st Test Case Verification**************************************************

	//Open Forum URL And Get Title 
	casper.start(config.url, function() {
		casper.then(function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		});
	});

	//Logout From App
	casper.then(function() {
		forumRegister.redirectToLogout(casper, test, function() {
			casper.then(function() {
				this.capture(screenShotsDir+ 'logout.png');
			});		
		});
			
	});
	
	//Open Registration Form
	/*casper.then(function() {
		try {
			test.assertExists('a[href^="/register/register"]');
			this.click('a[href^="/register/register"]');
			casper.then(function() {
				this.capture(screenShotsDir+ '1_registerFrom.png');
				this.echo('registration from opened successfully', 'INFO');

				//Registering a user And Verifying Do Not Delete Account
				forumRegister.registerToApp(json.deleteAccount, casper, function() {
					casper.then(function() {
						this.capture(screenShotsDir+ '1_registeredUser.png');
						this.echo('user registered successfully', 'INFO');
		
					});
				});		
			});
		}catch(e) {
			test.assertDoesntExist('a[href^="/register/register"]', 'Register link not found on front-end home page,');
		}	
	});

	//Clicking On User's Icon To Display User's Drop-down For Editing Profile
	casper.then(function() {
		try {
			try {
				test.assertExists('.default-user');
				this.click('.default-user');
				this.echo('clicked on users icon successfully', 'INFO');
				try {
					test.assertExists('a[href^="/register/register?edit="]');
					this.click('a[href^="/register/register?edit="]');
					try {
						test.assertExists('a[href^="/register?action=preferences&userid="]');
						this.click('a[href^="/register?action=preferences&userid="]');
					}catch(e) {
						test.assertDoesntExist('a[href^="/register?action=preferences&userid="]', 'Account Setting Tab Not Found On Edit Profile Page');
					}
				}catch(e) {
					test.assertDoesntExist('a[href^="/register/register?edit="]', 'Edit Profile Link Not Found');
				}
			}catch(e) {
				test.assertDoesntExist('.default-user', '.default-user not found');
			}
		} catch (e) {
			forumLogin.loginToApp(json.deleteAccount.uname, json.deleteAccount.upass, casper, function() {
				casper.then(function() {
					this.capture(screenShotsDir+ '1_demo.png');
					this.echo('User Logged-in Successfully', 'INFO');
					try {
						test.assertExists('a.default-user');
						this.click('a.default-user');
						try {
							test.assertExists('a[href^="/register/register?edit="]');
							this.click('a[href^="/register/register?edit="]');
							try {
								test.assertExists('a[href^="/register?action=preferences&userid="]');
								this.click('a[href^="/register?action=preferences&userid="]');
							}catch(e) {
								test.assertDoesntExist('a[href^="/register?action=preferences&userid="]', 'Account Setting Tab Not Found On Edit Profile Page');
							}
						}catch(e) {
							test.assertDoesntExist('a[href^="/register/register?edit="]', 'Edit Profile Link Not Found');
						}
					}catch(e) {
						test.assertDoesntExist('a.default-user', '.default-user not found');
					}
				}); 						
			});
		}
	
		//Do Not Delete User's Account. 
		casper.then(function() {
			doNotDeleteAccount(casper, function() {
				casper.then(function() {
					this.capture(screenShotsDir+ '1_doNotDeleteAccount.png');
					//this.echo('Account is not deleted', 'INFO');
				});
			});

		});
	});

//*******************************************2nd Test Case Verification********************************************

	//Open Forum URL And Get Title 
	casper.thenOpen(config.url, function() {
		casper.then(function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		});
	});

	//Logout From App
	casper.then(function() {
		forumRegister.redirectToLogout(casper, test, function() {
			casper.then(function() {
				this.capture(screenShotsDir+ 'logout.png');
			});		
		});
			
	});

	//Login To App And Delete User's Account
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function() {
			casper.then(function() {
				this.capture(screenShotsDir+ '2_loggedIn_user.png');
				this.echo('User logged-in successfully', 'INFO');
				//Clicking On User's Icon To Display User's Drop-down For Editing Profile
				casper.then(function() {
					try {
						test.assertExists('a.default-user');
						this.click('a.default-user');
						try {
							test.assertExists('a[href^="/register/register?edit="]');
							this.click('a[href^="/register/register?edit="]');
							try {
								test.assertExists('a[href^="/register?action=preferences&userid="]');
								this.click('a[href^="/register?action=preferences&userid="]');
							} catch(e) {
								test.assertDoesntExist('a[href^="/register?action=preferences&userid="]', 'account setting tab not found on edit profile page');
							}
						} catch(e) {
							test.assertDoesntExist('a[href^="/register/register?edit="]', 'edit profile link not found');
						}
						
					} catch (e) {
						test.assertDoesntExist('a.default-user', '.default-user not found');
					}
					
						
					//Delete User's Account. 
					casper.then(function() {
						deleteAccount(casper, function() {
							casper.then(function() {
								this.capture(screenShotsDir+ '2_delete.png');
								this.echo('Delete Account Task Completed On Account Setting Page', 'INFO');
							});
						});
					});
				});
			});
		});

	});

//*************************************3rd Test Case Verification***************************************************8

	//Reopen Front-End URL 
	casper.thenOpen(config.url, function() {
		casper.then(function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		});
	});

	//Logout From App
	casper.then(function() {
		forumRegister.redirectToLogout(casper, test, function() {
			casper.then(function() {
				this.capture(screenShotsDir+ 'logout.png');
			});		
		});
			
	});

	//Registering A User And Make An Admin
	casper.then(function() {
		try {
			test.assertExists('a[href^="/register/register"]');
			this.click('a[href^="/register/register"]');
			casper.then(function() {
				this.capture(screenShotsDir+ '3_registerFrom.png');
				this.echo('registration from opened successfully', 'INFO');
				forumRegister.registerToApp(json.loginData, casper, function() {
					casper.then(function() {
						this.capture(screenShotsDir+ '3_registeredUser.png');
						this.echo('user registered successfully', 'INFO');
						casper.thenOpen(config.backEndUrl, function() {
							casper.then(function() {
								this.echo('Title of the page :' +this.getTitle(), 'INFO');
							});	
							//Logout From Back-End
							casper.then(function() {
								try {
									this.click('a[href="/tool/members/login?action=logout"]');
									casper.then(function() {
										this.capture(screenShotsDir+ 'logoutFromBackend.png');
									});
								}catch(e) {
									test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
								}			
							});
							casper.then(function() {
								forumRegister.loginToForumBackEnd(casper, test, function() {
									casper.echo('user logged-in successfully on forum back-end', 'INFO');
									casper.then(function() {
										makeAnAdminUser(casper, test, function() {
											casper.echo('user "hs123" has been made an admin', 'INFO');
										});
									});
								});						
							});
						});
					});
				});		
			});
		}catch(e) {
			test.assertDoesntExist('a[href^="/register/register"]', 'Register link not found on home page');
		}	
	});

	//Open Forum URL And Get Title 
	casper.thenOpen(config.url, function() {
		casper.then(function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		});
	});

	//Logout From App
	casper.then(function() {
		forumRegister.redirectToLogout(casper, test, function() {
			casper.then(function() {
				this.capture(screenShotsDir+ 'logout.png');
			});		
		});
			
	});
	
	//Login To App And An Admin Deletes An Account From Member's List By Selecting Checkbox 
	casper.then(function() {
		forumLogin.loginToApp(json['loginData'].uname, json['loginData'].upass, casper, function() {
			casper.then(function() {
				this.capture(screenShotsDir+ '3_loggedIn_user.png');
				casper.echo('User logged-in successfully', 'INFO');

				//Getting Members's List
				casper.then(function() {
					try {
						test.assertExists('.icon.icon-menu');
						this.click('.icon.icon-menu');
						try {
							test.assertExists('a[href^="/register/members"]');
							this.click('a[href^="/register/members"]');
							casper.then(function() {
								this.capture(screenShotsDir+ '3_memberList.png');
								casper.then(function() {
									try {
										test.assertExists('input[name="delete_member"][type="checkbox"]');
										this.click('input[name="delete_member"][type="checkbox"]');
										casper.then(function() {
											try {
												test.assertExists('i.glyphicon.glyphicon-trash');
												this.click('i.glyphicon.glyphicon-trash');
											}catch(e) {
												test.assertDoesntExist('i.glyphicon.glyphicon-trash', 'delete account button not found');
											}
											casper.then(function() {
												this.capture(screenShotsDir+ '3_delete.png');
												this.echo('member is deleted successfully','INFO');				
											});
										});
									} catch (e) {
										test.assertDoesntExist('input[name="delete_member"][type="checkbox"]', 'checkbox not found');
									}
								});
							});
						}catch(e) {
							test.assertDoesntExist('a[href^="/register/members"]', 'member tab not found');
						}
					}catch(e) {
						test.assertDoesntExist('.icon.icon-menu', 'menu tab not found');
					}
				});
			});
		});

	});
//******************************************4th Test Case Verification********************************************


	//Reopen Front-End URL 
	casper.thenOpen(config.url, function() {
		casper.then(function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		});
	});

	//Logout From App
	casper.then(function() {
		forumRegister.redirectToLogout(casper, test, function() {
			casper.then(function() {
				this.capture(screenShotsDir+ 'logout.png');
			});		
		});
			
	});

	//Login To App And An Admin Deletes An Account From Member's List By Selecting Member's Profile Page
	casper.then(function() {
		forumLogin.loginToApp(json['loginData'].uname, json['loginData'].upass, casper, function() {
			casper.then(function() {
				this.capture(screenShotsDir+ '4_loggedIn_user.png');
				casper.echo('User logged-in successfully', 'INFO');

				//Getting Members's List
				casper.then(function() {
					try {
						this.test.assertExists('.icon.icon-menu');
						this.click('.icon.icon-menu');
						try {
							this.test.assertExists('a[href^="/register/members"]');
							this.click('a[href^="/register/members"]');
							casper.then(function() {
								this.capture(screenShotsDir+ '4_memberList.png');
								casper.then(function() {
									try {
										test.assertExists('span.col-sm-9.right-side a strong');
										this.click('span.col-sm-9.right-side a strong');
										casper.then(function() {
											delAccount(casper, function() {
												casper.then(function() {
													this.echo('member is deleted successfully', 'INFO');
													this.capture(screenShotsDir+ '4_delete.png');
												});
											});										
										});
									} catch (e) {
										test.assertDoesntExist('span.col-sm-9.right-side a strong', 'user not found');
											
									}
								});
							});
						}catch(e) {
							test.assertDoesntExist('a[href^="/register/members"]', 'member tab not found');
						}
					}catch(e) {
						this.test.assertDoesntExist('.icon.icon-menu', 'menu tab not found');
					}
				});
			});
		});
	});

//**************************************5th Test Case Verification****************************************

	//Reopen Front-End URL 
	casper.thenOpen(config.url, function() {
		casper.then(function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		});
	});

	//Logout From App
	casper.then(function() {
		forumRegister.redirectToLogout(casper, test, function() {
			casper.then(function() {
				this.capture(screenShotsDir+ 'logout.png');
			});		
		});
			
	});
		
	//Registering A user
	casper.then(function() {
		try {
			test.assertExists('a[href^="/register/register"]');
			this.click('a[href^="/register/register"]');
			casper.then(function() {
				this.capture(screenShotsDir+ '5_registerFrom.png');
				this.echo('registration from opened successfully', 'INFO');
				forumRegister.registerToApp(json.deleteAccount, casper, function() {
					casper.then(function() {
						this.capture(screenShotsDir+ '5_registeredUser.png');
						this.echo('user registered successfully', 'INFO');
					});
				});		
			});
		}catch(e) {
			test.assertDoesntExist('a[href^="/register/register"]', 'Register link not found on home page');
		}	
	});

	//Login To App And An Admin Deletes An Account From Member's List Using Search-Box
	casper.then(function() {
		forumLogin.loginToApp(json['loginData'].uname, json['loginData'].upass, casper, function() {
			casper.then(function() {
				this.capture(screenShotsDir+ '5_loggedIn_user.png');
				casper.echo('User logged-in successfully', 'INFO');

				//Getting Members's List
				casper.then(function() {
					try {
						this.test.assertExists('.icon.icon-menu');
						this.click('.icon.icon-menu');
						try {
							this.test.assertExists('a[href^="/register/members"]');
							this.click('a[href^="/register/members"]');
							casper.then(function() {
								this.capture(screenShotsDir+ '5_memberList.png');
								casper.then(function() {
									try {
										test.assertExists('#inline_search_box');
										this.sendKeys('input[id="inline_search_box"]', 'hs1234');
										this.click('#inline_search_box');
										this.page.sendEvent("keypress", this.page.event.key.Enter);
										casper.then(function() {
											this.capture(screenShotsDir+ '5_search.png');
											try {
												test.assertExists(x('//a/strong[text()="hs1234"]/ancestor::li/span/input'), 'checkbox is verified');
												this.click(x('//a/strong[text()="hs1234"]/ancestor::li/span/input'));
												casper.then(function() {
												try {
													test.assertExists('i.glyphicon.glyphicon-trash');
												this.click('i.glyphicon.glyphicon-trash');
												}catch(e) {
													test.assertDoesntExist('i.glyphicon.glyphicon-trash', 'delete account button not found');
												}
												casper.then(function() {
													this.capture(screenShotsDir+ '5_delete.png');
													this.echo('member is deleted successfully','INFO');				
													});
												});
											} catch (e) {
												test.assertDoesntExist(x('//a/strong[text()="hs1234"]/ancestor::li/span/input'), 'checkbox is not verified');
											}										
										});
										
									} catch (e) {
										test.assertDoesntExist('#inline_search_box');
									}
								});
							});
						}catch(e) {
							test.assertDoesntExist('a[href^="/register/members"]', 'member tab not found');
						}
					}catch(e) {
						test.assertDoesntExist('.icon.icon-menu', 'menu tab not found');
					}
				});
			});
		});

	});

//*********************************6th Test Case Verification************************************************

	//Reopen Front-End URL 
	casper.thenOpen(config.url, function() {
		casper.then(function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		});
	});
		
	//Logout From App
	casper.then(function() {
		forumRegister.redirectToLogout(casper, test, function() {
			casper.then(function() {
				this.capture(screenShotsDir+ 'logout.png');
			});		
		});
			
	});
	
	//Registering A User And Make An Admin
	casper.then(function() {
		try {
			test.assertExists('a[href^="/register/register"]');
			this.click('a[href^="/register/register"]');
			casper.then(function() {
				this.capture(screenShotsDir+ '6_registerFrom.png');
				this.echo('registration from opened successfully', 'INFO');
				forumRegister.registerToApp(json.loginData, casper, function() {
					casper.then(function() {
						this.capture(screenShotsDir+ '6_registeredUser.png');
						this.echo('user registered successfully', 'INFO');
						casper.thenOpen(config.backEndUrl, function() {
							casper.then(function() {
								this.echo('Title of the page :' +this.getTitle(), 'INFO');
							});	
							//Logout From Back-End
							casper.then(function() {
								try {
									this.click('a[href="/tool/members/login?action=logout"]');
									casper.then(function() {
										this.capture(screenShotsDir+ 'logoutFromBackend.png');
									});
								}catch(e) {
									test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
								}			
							});
						});
						casper.then(function() {
							forumRegister.loginToForumBackEnd(casper, test, function() {
								casper.echo('user logged-in successfully on forum back-end', 'INFO');
								casper.then(function() {
									makeAnAdminUser(casper, test, function() {
										casper.echo('user "hs123" has been made an admin', 'INFO');
									});
								});
							});
						});
					});
				});		
			});
		}catch(e) {
			test.assertDoesntExist('a[href^="/register/register"]', 'Register link not found on home page');
		}	
	});

	//Reopen Front-End URL 
	casper.thenOpen(config.url, function() {
		casper.then(function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		});
	});
	
	//Logout From App
	casper.then(function() {
		forumRegister.redirectToLogout(casper, test, function() {
			casper.then(function() {
				this.capture(screenShotsDir+ 'logout.png');
			});		
		});
			
	});

	//Login To App And An Admin Deletes Own Account From Member's List
	casper.then(function() {
		forumLogin.loginToApp(json['loginData'].uname, json['loginData'].upass, casper, function() {
			casper.then(function() {
				this.capture(screenShotsDir+ '6_loggedIn_user.png');
				casper.echo('User logged-in successfully', 'INFO');

				//Getting Members's List
				casper.then(function() {
					try {
						this.test.assertExists('.icon.icon-menu');
						this.click('.icon.icon-menu');
						try {
							this.test.assertExists('a[href^="/register/members"]');
							this.click('a[href^="/register/members"]');
							casper.then(function() {
								this.capture(screenShotsDir+ '6_memberList.png');
								test.assertExists('#inline_search_box');
								this.sendKeys('input[id="inline_search_box"]', 'hs123');
								this.click('#inline_search_box');
								this.page.sendEvent("keypress", this.page.event.key.Enter);
								casper.then(function() {
									try {
										test.assertExists(x('//a/strong[text()="hs123"]/ancestor::li/span/input'), 'checkbox is verified');
										this.click(x('//a/strong[text()="hs123"]/ancestor::li/span/input'));
										casper.then(function() {
											try {
												test.assertExists('i.glyphicon.glyphicon-trash');
												this.click('i.glyphicon.glyphicon-trash');
											}catch(e) {
												test.assertDoesntExist('i.glyphicon.glyphicon-trash', 'delete account button not found');
											}
											casper.then(function() {
												this.capture(screenShotsDir+ '6_delete.png');
												this.echo('member is deleted successfully','INFO');				
											});
										});
									} catch (e) {
										test.assertDoesntExist(x('//a/strong[text()="hs123"]/ancestor::li/span/input'), 'checkbox is not verified');
									}
								});
							});
						}catch(e) {
							test.assertDoesntExist('a[href^="/register/members"]', 'member tab not found');
						}
					}catch(e) {
						test.assertDoesntExist('.icon.icon-menu', 'menu tab not found');
					}
				});
			});
		});
	});*/

//*******************************7th Test Case Verification**********************************************

	//Reopen Front-End URL 
	casper.thenOpen(config.url, function() {
		casper.then(function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		});
	});

	//Logout From App
	casper.then(function() {
		forumRegister.redirectToLogout(casper, test, function() {
			casper.then(function() {
				this.capture(screenShotsDir+ 'logout.png');
			});		
		});
			
	});

	//Registering A user 
	casper.then(function() {
		try {
			test.assertExists('a[href^="/register/register"]');
			this.click('a[href^="/register/register"]');
			casper.then(function() {
				this.capture(screenShotsDir+ '7_registerFrom.png');
				this.echo('registration from opened successfully', 'INFO');
				forumRegister.registerToApp(json.deleteAccount, casper, function() {
					casper.then(function() {
						this.capture(screenShotsDir+ '7_registeredUser.png');
						this.echo('user registered successfully', 'INFO');
					});
				});		
			});
		}catch(e) {
			test.assertDoesntExist('a[href^="/register/register"]', 'Register link not found on home page');
		}	
	});

	//Login To App And Create A New Topic
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function() {
			casper.then(function() {
				this.echo('user logged-in successfully', 'INFO');
				this.capture(screenShotsDir+ '7_logged-in.png');
				gotoNewTopicpage(casper, function() {
					casper.then(function() {
						this.echo('start new topic page opened successfully', 'INFO');								
					});							
				});						
			});

		});		
	});

	//Post A Topic
	casper.then(function() {
		postTopicpage(json.newTopic, casper, function() {
			casper.then(function() {
				this.echo('new topic created', 'INFO');
			});
		});	
	});

	//Login To App And User Deletes Own Account From Topic List
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function() {
			casper.then(function() {
				this.capture(screenShotsDir+ '7_loggedIn_user.png');
				casper.echo('User logged-in successfully', 'INFO');

				//Getting Topic List
				casper.then(function() {
					try {
						test.assertExists('.icon.icon-menu');
						this.click('.icon.icon-menu');
						try {
							test.assertExists('a[href^="/latest"]');
							this.click('a[href^="/latest"]');
							casper.then(function() {
								this.capture(screenShotsDir+ '7_topicList.png');
								var user = x('//p/a[text()="hs1234"]/ancestor::li/span/span/p/a');
								try {
									test.assertExists(user, 'user is verified');
									this.click(user);
									casper.then(function() {
										this.capture(screenShotsDir+ '7_topicListUser.png');
										deleteAccount(casper, function() {
											casper.then(function() {
this.echo('member is deleted successfully', 'INFO');
this.capture(screenShotsDir+ '7_delete.png');
											});
										});	
									});
								}catch(e) {
									test.assertDoesntExist(user, 'user is verified');
								}
							});
						}catch(e) {
							test.assertDoesntExist('a[href^="/latest"]', 'topics tab not found');
						}
					}catch(e) {
						test.assertDoesntExist('.icon.icon-menu', 'menu tab not found');
					}
				});
			});
		});

	});

//***********************************8th Test Case Verification*****************************************

	//Reopen Front-End URL 
	casper.thenOpen(config.url, function() {
		casper.then(function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		});
	});
		
	//Logout From App
	casper.then(function() {
		forumRegister.redirectToLogout(casper, test, function() {
			casper.then(function() {
				this.capture(screenShotsDir+ 'logout.png');
			});		
		});
			
	});

	//Registering A user 
	casper.then(function() {
		try {
			test.assertExists('a[href^="/register/register"]');
			this.click('a[href^="/register/register"]');
			casper.then(function() {
				this.capture(screenShotsDir+ '8_registerFrom.png');
				this.echo('registration from opened successfully', 'INFO');
				forumRegister.registerToApp(json.deleteAccount, casper, function() {
					casper.then(function() {
						this.capture(screenShotsDir+ '8_registeredUser.png');
						this.echo('user registered successfully', 'INFO');
					});
				});		
			});
		}catch(e) {
			test.assertDoesntExist('a[href^="/register/register"]', 'Register link not found on home page');
		}	
	});

	//Login To App And Create A New Topic
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function() {
			casper.then(function() {
				gotoNewTopicpage(casper, function() {
					casper.then(function() {
						this.echo('start new topic page opened successfully', 'INFO');								
					});							
				});						
			});

		});		
	});

	//Post A Topic
	casper.then(function() {
		postTopicpage(json.newTopic, casper, function() {
			casper.then(function() {
				this.echo('new topic created', 'INFO');
			});
		});	
	});

	//Login To App And User Deletes Own Account From Post Reply Topic List
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function() {
			casper.then(function() {
				this.capture(screenShotsDir+ '8_loggedIn_user.png');
				casper.echo('User logged-in successfully', 'INFO');

				//Getting Topic List
				casper.then(function() {
					try {
						this.test.assertExists('.icon.icon-menu');
						this.click('.icon.icon-menu');
						try {
							this.test.assertExists('a[href^="/latest"]');
							this.click('a[href^="/latest"]');
							casper.then(function() {
								this.capture(screenShotsDir+ '8_topicList.png');
								try {
									test.assertExists('a.topic-title span');
									this.click('a.topic-title span');
									casper.then(function() {
										this.capture(screenShotsDir+ '8_topicListUser.png');
										deleteAccount(casper, function() {
											casper.then(function() {
this.echo('member is deleted successfully', 'INFO');
this.capture(screenShotsDir+ '8_delete.png');
											});
										});	
									});
								}catch(e) {
									test.assertDoesntExist('a.topic-title span', 'user not found');
								}						
							});
						}catch(e) {
							test.assertDoesntExist('a[href^="/latest"]', 'topics tab not found');
						}
					}catch(e) {
						test.assertDoesntExist('.icon.icon-menu', 'menu tab not found');
					}
				});
			});
		});
	});

//***********************************9th Test Case Verification********************************************

	//Reopen Front-End URL 
	/*casper.thenOpen(config.url, function() {
		casper.then(function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		});
	});

	//Logout From App
	casper.then(function() {
		forumRegister.redirectToLogout(casper, test, function() {
			casper.then(function() {
				this.capture(screenShotsDir+ 'logout.png');
			});		
		});
			
	});

	//Registering A User And Make An Admin
	casper.then(function() {
		try {
			test.assertExists('a[href^="/register/register"]');
			this.click('a[href^="/register/register"]');
			casper.then(function() {
				this.capture(screenShotsDir+ '9_registerFrom.png');
				this.echo('registration from opened successfully', 'INFO');
				forumRegister.registerToApp(json.loginData, casper, function() {
					casper.then(function() {
						this.capture(screenShotsDir+ '9_registeredUser.png');
						this.echo('user registered successfully', 'INFO');
						casper.thenOpen(config.backEndUrl, function() {
							casper.then(function() {
								this.echo('Title of the page :' +this.getTitle(), 'INFO');
							});	
							//Logout From Back-End
							casper.then(function() {
								try {
									this.click('a[href="/tool/members/login?action=logout"]');
									casper.then(function() {
										this.capture(screenShotsDir+ 'logoutFromBackend.png');
									});
								}catch(e) {
									test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
								}			
							});
						});
						forumRegister.loginToForumBackEnd(casper, test, function() {
							casper.echo('user logged-in successfully on forum back-end', 'INFO');
							casper.then(function() {
								makeAnAdminUser(casper, test, function() {
									casper.echo('user "hs123" has been made an admin', 'INFO');
								});
							});
						});
					});
				});		
			});
		}catch(e) {
			test.assertDoesntExist('a[href^="/register/register"]', 'Register link not found on home page');
		}	
	});

	//Reopen Front-End URL 
	casper.thenOpen(config.url, function() {
		casper.then(function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		});
	});
	
	//Logout From App
	casper.then(function() {
		forumRegister.redirectToLogout(casper, test, function() {
			casper.then(function() {
				this.capture(screenShotsDir+ 'logout.png');
			});		
		});
			
	});

	//Login To App And An Admin Deletes Other user's Account From Setting Page
	casper.then(function() {
		forumLogin.loginToApp(json['loginData'].uname, json['loginData'].upass, casper, function() {
			casper.then(function() {
				this.capture(screenShotsDir+ '9_loggedIn_user.png');
				casper.echo('Admin User logged-in successfully', 'INFO');

				//Getting Topic List
				casper.then(function() {
					try {
						this.test.assertExists('.icon.icon-menu');
						this.click('.icon.icon-menu');
						try {
							this.test.assertExists('a[href^="/latest"]');
							this.click('a[href^="/latest"]');
							casper.then(function() {
								this.capture(screenShotsDir+ '9_topicList.png');
								var user = x('//p/a[text()="hs1234"]/ancestor::li/span/span/p/a');
								try {
									test.assertExists(user, 'user is verified');
									this.click(user);
									casper.then(function() {
										var id = this.getElementAttribute('input[type="hidden"][name="userid"]', 'value');
										this.capture(screenShotsDir+ '9_topicListUser.png');
										try {
											test.assertExists('#anchor_tab_edit');
											this.click('#anchor_tab_edit');
											casper.then(function() {
												this.capture(screenShotsDir+ '9_editProfile.png');
												try {
													test.assertExists('a[href^="/register?action=preferences&userid='+id+'"]');
													this.click('a[href^="/register?action=preferences&userid='+id+'"]');
													//Delete User's Account.
													casper.then(function() {
														this.capture(screenShotsDir+ '9_accountSetting.png');
														deleteAccount(casper, function() {
															casper.then(function() {
																this.echo('member is deleted successfully', 'INFO');
																this.capture(screenShotsDir+ '9_delete.png');
															});	
														});	
													});
												}catch(e) {
													test.assertDoesntExist('a[href^="/register?action=preferences&userid='+id+'"]', 'account setting tab not found on edit profile page');
												}																				
											});
										}catch(e) {
											test.assertDoesntExist('#anchor_tab_edit', 'edit button not found');
										}							
									});
								}catch(e) {
									test.assertDoesntExist(user, 'user is not verified');
								}
							});
						}catch(e) {
							test.assertDoesntExist('a[href^="/latest"]', 'topics tab not found');
						}
					}catch(e) {
						test.assertDoentExist('.icon.icon-menu', 'menu tab not found');
					}						
				});
			});
		});
	});

//*********************************10th Test Case Verification***************************************	

	//Reopen Front-End URL 
	casper.thenOpen(config.url, function() {
		casper.then(function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		});
	});
	
	//Logout From App
	casper.then(function() {
		forumRegister.redirectToLogout(casper, test, function() {
			casper.then(function() {
				this.capture(screenShotsDir+ 'logout.png');
			});		
		});
			
	});

	//Registering A User
	casper.then(function() {
		try {
			this.click('a[href^="/register/register"]');
			casper.then(function() {
				this.capture(screenShotsDir+ '10_registerFrom.png');
				this.echo('registration from opened successfully', 'INFO');
				forumRegister.registerToApp(json.deleteAccount, casper, function() {
					casper.then(function() {
						this.capture(screenShotsDir+ '10_registeredUser.png');
						this.echo('user registered successfully', 'INFO');
					});
				});		
			});
		}catch(e) {
			test.assertDoesntExist('a[href^="/register/register"]', 'Register link not found on home page');
		}	
	});

	//Login To App And Do Not Delete An Account From User's profilePage
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function() {
			casper.then(function() {
				this.capture(screenShotsDir+ '10_loggedIn_user.png');
				casper.echo('User logged-in successfully', 'INFO');

				//Getting Topic List
				casper.then(function() {
					try {
						this.test.assertExists('a.default-user ');
						this.click('a.default-user ');
						try {
							this.test.assertExists('span li a[href^="/profile/"]');
							this.click('span li a[href^="/profile/"]');
							casper.then(function() {
								this.capture(screenShotsDir+ '10_profile.png');
								casper.then(function() { 
									deleteAccount(casper, function() {
										casper.then(function() {
											this.echo('member is deleted successfully', 'INFO');
											this.capture(screenShotsDir+ '10_delete.png');
										});
									});
								});				
							});
						}catch(e) {
							test.assertDoesntExist('span li a[href^="/profile/"]', 'profile link not found');
						}
					}catch(e) {
						test.assertDoesntExist('a.default-user', '.default-user not found');
					}						
				});
			});
		});
	});

//********************************11th Test Case verification**************************************

	//Reopen Front-End URL 
	casper.thenOpen(config.url, function() {
		casper.then(function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		});
	});

	//Logout From App
	casper.then(function() {
		forumRegister.redirectToLogout(casper, test, function() {
			casper.then(function() {
				this.capture(screenShotsDir+ 'logout.png');
			});		
		});
			
	});

	//Login To App And Delete An Account From User's profilePage
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function() {
			casper.then(function() {
				this.capture(screenShotsDir+ '11_loggedIn_user.png');
				casper.echo('User logged-in successfully', 'INFO');

				//Getting Topic List
				casper.then(function() {
					try {
						this.test.assertExists('a.default-user ');
						this.click('a.default-user ');
						try {
							this.test.assertExists('span li a[href^="/profile/"]');
							this.click('span li a[href^="/profile/"]');
							casper.then(function() {
								this.capture(screenShotsDir+ '11_profile.png');
								casper.then(function() { 
									deleteAccount(casper, function() {
										casper.then(function() {
											this.echo('member is deleted successfully', 'INFO');
											this.capture(screenShotsDir+ '11_delete.png');
										});
									});
								});					
							});
						}catch(e) {
							test.assertDoesntExist('span li a[href^="/profile/"]', 'profile link not found');
						}
					}catch(e) {
						test.assertDoesntExist('a.default-user', '.default-user not found');
					}						
				});
			});
		});
	});

//*******************************************12th test Case Verification*************************************

	//Reopen Front-End URL
	casper.thenOpen(config.url, function() {
		casper.then(function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		});
	});

	//Logout From App
	casper.then(function() {
		forumRegister.redirectToLogout(casper, test, function() {
			casper.then(function() {
				this.capture(screenShotsDir+ 'logout.png');
			});		
		});
			
	});

	//Registering A user
	casper.then(function() {
		try {
			test.assertExists('a[href^="/register/register"]');
			this.click('a[href^="/register/register"]');
			casper.then(function() {
				this.capture(screenShotsDir+ '12_registerFrom.png');
				this.echo('registration from opened successfully', 'INFO');
				forumRegister.registerToApp(json.deleteAccount, casper, function() {
					casper.then(function() {
						this.capture(screenShotsDir+ '12_registeredUser.png');
						this.echo('user registered successfully', 'INFO');
					});
				});		
			});
		}catch(e) {
			test.assertDoesntExist('a[href^="/register/register"]', 'Register link not found on home page');
		}	
	});

	//Open Back-End URL And Get Title
	casper.thenOpen(config.backEndUrl, function() {
		casper.then(function() {
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
		});	
	});

	//Logout From Back-End
	casper.then(function() {
		try {
			this.click('a[href="/tool/members/login?action=logout"]');
			casper.then(function() {
				this.capture(screenShotsDir+ 'logoutFromBackend.png');
			});
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}			
	});

	//Login To Forum Back-end And Delete An Account
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.echo('Logged-in successfully from back-end', 'INFO');
			
			//Clicking On 'Users' Tab Under Settings And Open Group Permissions
			casper.then(function() {
				try {
					test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
					this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
					try {
						test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
						this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
						casper.then(function() {
							try {
								this.sendKeys('#autosuggest', 'hs1234', {keepFocus: true});
								this.click('#autosuggest');
								this.page.sendEvent("keypress", this.page.event.key.Enter);
								casper.then(function() {
									this.capture(screenShotsDir + '12_forum_popup.png');
									try {
										test.assertExists('#changeUserGroupActions a.button span.delete');
										this.click('#changeUserGroupActions a.button span.delete');
										casper.then(function() {
											this.capture(screenShotsDir + '12_delete.png');
											this.echo('Delete Account Task Completed Of Newly Registered User From Back-end', 'INFO');			
										});
									}catch(e) {
										test.assertDoesntExist('#changeUserGroupActions a.button span.delete', 'delete button not found');
									}
								});
							}catch(e) {
								test.assertDoesntExist('#autosuggest', 'searchbox not found on group permission page');
							}
						});
					}catch(e) {
						test.assertDoesntExist('div#ddUsers a[href="/tool/members/mb/usergroup"]', 'group permission link not found under users tab');
					}
				}catch(e) {
					test.assertDoesntExist('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', 'users tab not found');
				}
			});		
		});
	});

//******************************************13th Test Case Verification********************************************

	//Open Back-End URL And Get Title
	casper.thenOpen(config.backEndUrl, function() {
		casper.then(function() {
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
		});	
	});

	//Logout From Back-End
	casper.then(function() {
		try {
			this.click('a[href="/tool/members/login?action=logout"]');
			casper.then(function() {
				this.capture(screenShotsDir+ 'logoutFromBackend.png');
			});
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}			
	});

	//Login To Forum Back-end And Delete An Account Of A Registered User
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.echo('Logged-in successfully from back-end', 'INFO');
	
			//Clicking On 'Users' Tab Under Settings And Open Group Permissions
			casper.then(function() {
				try {
					test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
					this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
					try {
						test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
						this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
						casper.then(function() {
							this.capture(screenShotsDir+ '13_groupPermission.png');
							//Clicking On 'Change Permissions' Link With Respect To 'Registered Users'  
							casper.then(function() {
								try {
									var grpName = this.evaluate(function(){
										for(var i=1; i<=7; i++) {
											var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
											if (x1.innerText == 'Registered Users') {
												var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(4) div.tooltipMenu a:nth-child(2)').getAttribute('href');
												return x2;
											}
										}
										this.click('a[href="'+grpName+'"]');
									});
								}catch(e) {
									var grpName = this.evaluate(function(){
										for(var i=1; i<=7; i++) {
											var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
											if (x1.innerText == 'Registered Users') {
												var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a:nth-child(2)').getAttribute('href');
												return x2;
											}
										}
										this.click('a[href="'+grpName+'"]');
									});
								}
								casper.then(function() {
									this.capture(screenShotsDir+ '13_registeredUserList.png');
									try {
										test.assertExists('#groupUsersList input[name="user_id"][type="checkbox"]');
										this.click('#groupUsersList input[name="user_id"][type="checkbox"]');
										try {
											test.assertExists('#floatingActionMenu select.text');
											this.click('#floatingActionMenu select.text');
try {
test.assertExists('select.text option[value="delete_members"]');
														this.click('select.text option[value="delete_members"]');
																				casper.then(function() {
																					this.capture(screenShotsDir+ '13_delete.png');
																					this.echo('Delete Account Task Completed For Registered User From The Back-end', 'INFO');
																				});
}catch(e) {
test.assertDoesntExist('select.text option[value="delete_members"]');
}
										}catch(e) {
											test.assertDoesntExist('#floatingActionMenu select.text');
										}
									}catch(e) {
										test.assertDoesntExist('#groupUsersList input[name="user_id"][type="checkbox"]', 'There are currently no primary users in this group');
									}
								});
							});
						});
					}catch(e) {
						test.assertDoesntExist('div#ddUsers a[href="/tool/members/mb/usergroup"]', 'group permission link not found under users tab');
					}
				}catch(e) {
					test.assertDoesntExist('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', 'users tab not found');
				}
			});		
		});
	});

//*********************************************14th Test Case Verification*******************************************
	
	//Open Back-End URL And Get Title
	casper.thenOpen(config.backEndUrl, function() {
		casper.then(function() {
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
		});	
	});

	//Logout From Back-End
	casper.then(function() {
		try {
			this.click('a[href="/tool/members/login?action=logout"]');
			casper.then(function() {
				this.capture(screenShotsDir+ 'logoutFromBackend.png');
			});
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}			
	});

	//Login To Forum Back-end And Delete An Account Of A Pending Email Verification
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.echo('Logged-in successfully from back-end', 'INFO');
			
			//Clicking On 'Users' Tab Under Settings And Open Group Permissions
			casper.then(function() {
				try {
					test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
					this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
					try {
						test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
						this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
						casper.then(function() {
							this.capture(screenShotsDir+ '14_groupPermission.png');
							//Clicking On 'Change Permissions' Link With Respect To 'Pending Email Verifcation User'  
						});
							casper.then(function() {
								try {
									var grpName = this.evaluate(function(){
										for(var i=1; i<=7; i++) {
											var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
											if (x1.innerText == 'Pending Email Verification') {
												var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(4) div.tooltipMenu a:nth-child(2)').getAttribute('href');
												return x2;
											}
										}
										this.click('a[href="'+grpName+'"]');
									});
								}catch(e) {
									var grpName = this.evaluate(function(){
										for(var i=1; i<=7; i++) {
											var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
											if (x1.innerText == 'Pending Email Verification') {
												var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a:nth-child(2)').getAttribute('href');
												return x2;
											}
										}
										this.click('a[href="'+grpName+'"]');
									});
								}
								casper.then(function() {
									this.capture(screenShotsDir+ '14_pendingUserList.png');
									try {
										test.assertExists('#groupUsersList input[name="user_id"][type="checkbox"]');
										this.click('#groupUsersList input[name="user_id"][type="checkbox"]');
										try {
											test.assertExists('#floatingActionMenu select.text');
											this.click('#floatingActionMenu select.text');
											try {
test.assertExists('select.text option[value="delete_members"]');
											this.click('select.text option[value="delete_members"]');
											casper.then(function() {
												this.capture(screenShotsDir+ '14_delete.png');
												this.echo('Delete Account Task Completed For Pending Email Verification From The Back-end', 'INFO');
											});
											}catch(e) {
test.assertDoesntExist('select.text option[value="delete_members"]');
}
										}catch(e) {
											test.assertDoesntExist('#floatingActionMenu select.text');	
										}
									}catch(e) {
										test.assertDoesntExist('#groupUsersList input[name="user_id"][type="checkbox"]', 'There are currently no primary users in this group');
									}
								});
							});
					}catch(e) {
						test.assertDoesntExist('div#ddUsers a[href="/tool/members/mb/usergroup"]', 'group permission link not found under users tab');
					}
				}catch(e) {
					test.assertDoesntExist('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', 'users tab not found');
				}
			});		
		});
	});

//*************************************15th Test Case Verification************************************************

	//Open Back-End URL And Get Title
	casper.thenOpen(config.backEndUrl, function() {
		casper.then(function() {
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
		});	
	});

	//Logout From Back-End
	casper.then(function() {
		try {
			this.click('a[href="/tool/members/login?action=logout"]');
			casper.then(function() {
				this.capture(screenShotsDir+ 'logoutFromBackend.png');
			});
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}			
	});

	//Login To Forum Back-end And Delete An Account Of An Administrator Users
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.echo('Logged-in successfully from back-end', 'INFO');
			
			//Clicking On 'Users' Tab Under Settings And Open Group Permissions
			casper.then(function() {
				try {
					test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
					this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
					try {
						test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
						this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
						casper.then(function() {
							this.capture(screenShotsDir+ '15_groupPermission.png');
							//Clicking On 'Change Permissions' Link With Respect To 'Administrator Users'  
							casper.then(function() {
								try {
									var grpName = this.evaluate(function(){
										for(var i=1; i<=7; i++) {
											var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
											if (x1.innerText == 'Administrators') {
												var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(4) div.tooltipMenu a:nth-child(2)').getAttribute('href');
												return x2;
											}
										}
										this.click('a[href="'+grpName+'"]');
									});
								}catch(e) {
									var grpName = this.evaluate(function(){
										for(var i=1; i<=7; i++) {
											var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
											if (x1.innerText == 'Administrators') {
												var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a:nth-child(2)').getAttribute('href');
												return x2;
											}
										}
										this.click('a[href="'+grpName+'"]');
									});
								}
								casper.then(function() {
									this.capture(screenShotsDir+ '15_adminUserList.png');
									try {
										test.assertExists('#groupUsersList input[name="user_id"][type="checkbox"]');
										this.click('#groupUsersList input[name="user_id"][type="checkbox"]');
										try {
											test.assertExists('#floatingActionMenu select.text');
											this.click('#floatingActionMenu select.text');
											try {
test.assertExists('select.text option[value="delete_members"]');
												this.click('select.text option[value="delete_members"]');
												casper.then(function() {
													this.capture(screenShotsDir+ '15_delete.png');
													this.echo('Delete Account Task Completed For Administrator User From The Back-end', 'INFO');
												});
											}catch(e) {
test.assertDoesntExist('select.text option[value="delete_members"]');
}
										}catch(e) {
											test.assertDoesntExist('#floatingActionMenu select.text');
										}
									}catch(e) {
										test.assertDoesntExist('#groupUsersList input[name="user_id"][type="checkbox"]', 'There are currently no primary users in this group');
									}
								});
							});
						});
					}catch(e) {
						test.assertDoesntExist('div#ddUsers a[href="/tool/members/mb/usergroup"]', 'group permission link not found under users tab');
					}
				}catch(e) {
					test.assertDoesntExist('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', 'users tab not found');
				}
			});		
		});
	});*/
};

/************************************Delete Account with Settings**********************/

deleteAccount.customFieldsTest = function(casper, test) {

	//********************************1st Test Case Verification*******************************************

	//Open Back-End URL And Get Title
	casper.start(config.backEndUrl, function() {
		casper.then(function() {
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
		});	
	});

	//Logout From Back-End
	casper.then(function() {
		try {
			this.click('a[href="/tool/members/login?action=logout"]');
			casper.then(function() {
				this.capture(screenShotsDir+ 'logoutFromBackend.png');
			});
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}			
	});

	//Open Back-End URL And Change 'Delete Own Profile' Permission For Pending Email 		Verification User Group
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.echo('Logged-in successfully from back-end', 'INFO');
			casper.then(function() {
				disableDeleteOwnProfileForPendingUser(casper, casper.test, function() {
					casper.echo('permission changed for pending user', 'INFO');
			
				});
			});		
		});
	});

	//Open Front-End URL
	casper.thenOpen(config.url, function() {
		casper.then(function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		});
	});

	//Logout From App
	casper.then(function() {
		forumRegister.redirectToLogout(casper, test, function() {
			casper.then(function() {
				this.capture(screenShotsDir+ 'logout.png');
			});		
		});
			
	});
		
	//Registering A User On Forum
	casper.then(function () {
		try {
			test.assertExists('a[href^="/register/register"]');
			this.click('a[href^="/register/register"]');
			casper.then(function() {
				this.capture(screenShotsDir+ 'B_registerFrom.png');
				this.echo('registration from opened successfully', 'INFO');
				forumRegister.registerToApp(json.deleteAccount, casper, function() {
					casper.then(function() {
						this.capture(screenShotsDir+ 'B_registeredUser.png');
						this.echo('User registered successfully', 'INFO');
					});
				});		
			});
		}catch(e) {
			test.assertDoesntExist('a[href^="/register/register"]', 'Register link not found on home page');
		}
	});

	//Login To App And Delete An Account From Account Setting Page
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function() {
			casper.then(function() {
				this.capture(screenShotsDir+ 'B_loggedIn_user.png');
				casper.echo('User logged-in successfully', 'INFO');
				casper.then(function() {
					try {
						test.assertExists('a.default-user');	
						this.click('a.default-user');
						try {
							test.assertExists('a[href^="/register?action=preferences"]');	
							this.click('a[href^="/register?action=preferences"]');	
							casper.then(function() {
								this.capture(screenShotsDir+ 'B_accountSetting.png');
								deleteAccount(casper, function() {
									casper.then(function() {
										this.capture(screenShotsDir+ 'B_delete.png');
									});						
								});					
							});
						}catch(e) {
							test.assertDoesntExist('a[href^="/register?action=preferences"]', 'account setting tab not found');	
						}
					}catch(e) {
						test.assertDoesntExist('a.default-user', '.default-user not found');
					}	
				});
			});
		});
	});

	//*****************************************2nd Test Case Verification****************************************************
	
	//Open Front-End URL
	casper.thenOpen(config.url, function() {
		casper.then(function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		});
	});

	//Logout From App
	casper.then(function() {
		forumRegister.redirectToLogout(casper, test, function() {
			casper.then(function() {
				this.capture(screenShotsDir+ 'logout.png');
			});		
		});
			
	});
		
	//Registering A User On Forum
	casper.then(function () {
		try {
			test.assertExists('a[href^="/register/register"]');
			this.click('a[href^="/register/register"]');
			casper.then(function() {
				this.capture(screenShotsDir+ 'F_registerFrom.png');
				this.echo('registration from opened successfully', 'INFO');
				forumRegister.registerToApp(json.deleteAccount, casper, function() {
					casper.then(function() {
						this.capture(screenShotsDir+ 'F_registeredUser.png');
						this.echo('User registered successfully', 'INFO');
					});
				});		
			});
		}catch(e) {
			test.assertDoesntExist('a[href^="/register/register"]', 'Register link not found on home page');
		}
	});	

	//Open Back-End URL And Change 'Delete Own Profile' Permission For Registered User Group
	casper.then(function() {

		//Open Forum Backend URL And Get Title 
		casper.thenOpen(config.backEndUrl, function() {
			casper.then(function() {
				this.echo('Title of the page :' +this.getTitle(), 'INFO');
			});	
		});

		//Logout From Back-End
		casper.then(function() {
			try {
				this.click('a[href="/tool/members/login?action=logout"]');
				casper.then(function() {
					this.capture(screenShotsDir+ 'logoutFromBackend.png');
				});
			}catch(e) {
				test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
			}			
		});

		//Login To Forum Back-End
		casper.then(function() {
			forumRegister.loginToForumBackEnd(casper, test, function() {
				casper.echo('Logged-in successfully from back-end', 'INFO');
				casper.then(function() {
					disableDeleteOwnProfileForRegisteredUser(casper, casper.test, function() {
						casper.echo('permission changed for registered user', 'INFO');
				
					});
				});		
			});
		});
	});

	//Reopen Front-End URL
	casper.thenOpen(config.url, function() {
		casper.then(function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		});
	});

	//Logout From App
	casper.then(function() {
		forumRegister.redirectToLogout(casper, test, function() {
			casper.then(function() {
				this.capture(screenShotsDir+ 'logout.png');
			});		
		});
			
	});

	//Login To App And Delete An Account From Account Setting Page
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function() {
			casper.then(function() {
				this.capture(screenShotsDir+ 'F_loggedIn_user.png');
				casper.echo('User logged-in successfully', 'INFO');
				casper.then(function() {
					try {
						test.assertExists('a.default-user');	
						this.click('a.default-user');
						try {
							test.assertExists('a[href^="/register?action=preferences"]');	
							this.click('a[href^="/register?action=preferences"]');	
							casper.then(function() {
								this.capture(screenShotsDir+ 'F_accountSetting.png');
								deleteAccount(casper, function() {
									casper.then(function() {
										this.capture(screenShotsDir+ 'F_delete.png');
									});						
								});					
							});
						}catch(e) {
							test.assertDoesntExist('a[href^="/register?action=preferences"]', 'account setting tab not found');	
						}
					}catch(e) {
						test.assertDoesntExist('a.default-user', '.default-user not found');
					}	
				});
			});
		});
	});

	//****************************************3rd Test Case Verification*****************************************************

	//Open Back-End URL And Get Title
	casper.thenOpen(config.backEndUrl, function() {
		casper.then(function() {
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
		});	
	});

	//Logout From Back-End
	casper.then(function() {
		try {
			this.click('a[href="/tool/members/login?action=logout"]');
			casper.then(function() {
				this.capture(screenShotsDir+ 'logoutFromBackend.png');
			});
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}			
	});

	//Open Back-End URL And Change 'Delete Own Profile' Permission For Pending Email 		Verification User Group
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.echo('Logged-in successfully from back-end', 'INFO');
			casper.then(function() {
				disableDeleteOwnProfileForPendingUser(casper, casper.test, function() {
					casper.echo('permission changed for pending user', 'INFO');
			
				});
			});		
		});
	});

	//Open Front-End URL
	casper.thenOpen(config.url, function() {
		casper.then(function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		});
	});

	//Logout From App
	casper.then(function() {
		forumRegister.redirectToLogout(casper, test, function() {
			casper.then(function() {
				this.capture(screenShotsDir+ 'logout.png');
			});		
		});
			
	});
		
	//Registering A User On Forum
	casper.then(function () {
		try {
			test.assertExists('a[href^="/register/register"]');
			this.click('a[href^="/register/register"]');
			casper.then(function() {
				this.capture(screenShotsDir+ 'J_registerFrom.png');
				this.echo('registration from opened successfully', 'INFO');
				forumRegister.registerToApp(json.deleteAccount, casper, function() {
					casper.then(function() {
						this.capture(screenShotsDir+ 'J_registeredUser.png');
						this.echo('User registered successfully', 'INFO');
					});
				});		
			});
		}catch(e) {
			test.assertDoesntExist('a[href^="/register/register"]', 'Register link not found on home page');
		}
	});

	//Login To App And Delete An Account From User's Profile Page
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function() {
			casper.then(function() {
				this.capture(screenShotsDir+ 'J_loggedIn_user.png');
				casper.echo('User logged-in successfully', 'INFO');
				casper.then(function() {
					try {
						test.assertExists('a.default-user');	
						this.click('a.default-user');
						try {
							test.assertExists('a[href^="/profile"]');	
							this.click('a[href^="/profile/"]');	
							casper.then(function() {
								this.capture(screenShotsDir+ 'J_accountSetting.png');
								deleteAccount(casper, function() {
									casper.then(function() {
										this.capture(screenShotsDir+ 'J_delete.png');
									});						
								});					
							});
						}catch(e) {
							test.assertDoesntExist('a[href^="/profile"]', 'profile link not found');
						}
					}catch(e) {
						test.assertDoesntExist('a.default-user', '.default-user not found');
					}	
				});
			});
			
		});
	});

	//**********************************************4th Test Case Verification***********************************************

		//Open Front-End URL
	casper.thenOpen(config.url, function() {
		casper.then(function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		});
	});

	//Logout From App
	casper.then(function() {
		forumRegister.redirectToLogout(casper, test, function() {
			casper.then(function() {
				this.capture(screenShotsDir+ 'logout.png');
			});		
		});
			
	});
		
	//Registering A User On Forum
	casper.then(function () {
		try {
			test.assertExists('a[href^="/register/register"]');
			this.click('a[href^="/register/register"]');
			casper.then(function() {
				this.capture(screenShotsDir+ 'L_registerFrom.png');
				this.echo('registration from opened successfully', 'INFO');
				forumRegister.registerToApp(json.deleteAccount, casper, function() {
					casper.then(function() {
						this.capture(screenShotsDir+ 'L_registeredUser.png');
						this.echo('User registered successfully', 'INFO');
					});
				});		
			});
		}catch(e) {
			test.assertDoesntExist('a[href^="/register/register"]', 'Register link not found on home page');
		}
	});	

	//Open Back-End URL And Change 'Delete Own Profile' Permission For Registered User Group
	casper.then(function() {

		//Open Forum Backend URL And Get Title 
		casper.thenOpen(config.backEndUrl, function() {
			casper.then(function() {
				this.echo('Title of the page :' +this.getTitle(), 'INFO');
			});	
		});

		//Logout From Back-End
		casper.then(function() {
			try {
				this.click('a[href="/tool/members/login?action=logout"]');
				casper.then(function() {
					this.capture(screenShotsDir+ 'logoutFromBackend.png');
				});
			}catch(e) {
				test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
			}			
		});
		casper.then(function() {
			forumRegister.loginToForumBackEnd(casper, test, function() {
				casper.echo('Logged-in successfully from back-end', 'INFO');
				casper.then(function() {
					disableDeleteOwnProfileForRegisteredUser(casper, casper.test, function() {
						casper.echo('permission changed for registered user', 'INFO');
				
					});
				});		
			});
		});
	});

	//Reopen Front-End URL
	casper.thenOpen(config.url, function() {
		casper.then(function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		});
	});

	//Logout From App
	casper.then(function() {
		forumRegister.redirectToLogout(casper, test, function() {
			casper.then(function() {
				this.capture(screenShotsDir+ 'logout.png');
			});		
		});
			
	});

	//Login To App And Delete An Account From User's Profile Page
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function() {
			casper.then(function() {
				this.capture(screenShotsDir+ 'L_loggedIn_user.png');
				casper.echo('User logged-in successfully', 'INFO');
				casper.then(function() {
					try {
						test.assertExists('a.default-user');	
						this.click('a.default-user');
						try {
							test.assertExists('a[href^="/profile"]');	
							this.click('a[href^="/profile/"]');	
							casper.then(function() {
								this.capture(screenShotsDir+ 'L_accountSetting.png');
								deleteAccount(casper, function() {
									casper.then(function() {
										this.capture(screenShotsDir+ 'L_delete.png');
									});						
								});					
							});
						}catch(e) {
							test.assertDoesntExist('a[href^="/profile"]', 'profile link not found');	
						}
					}catch(e) {
						test.assertDoesntExist('a.default-user', '.default-user not found');
					}	
				});
			});
		});
	});
	
	//***********************5th Test Case Verification With Back-End Settings*********************
	
	//Open Back-End URL And Get Title
	casper.thenOpen(config.backEndUrl, function() {
		casper.then(function() {
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
		});	
	});

	//Logout From Back-End
	casper.then(function() {
		try {
			this.click('a[href="/tool/members/login?action=logout"]');
			casper.then(function() {
				this.capture(screenShotsDir+ 'logoutFromBackend.png');
			});
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}			
	});

	//Login To Forum BackEnd And Change 'Delete Own Profile' Permission For Pending Email Verification User Group
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.echo('Logged-in successfully from back-end', 'INFO');
			casper.then(function() {
				enableDeleteOwnProfileForPendingUser(casper, casper.test, function() {
					casper.echo('permission changed for pending user', 'INFO');	
				});
			});		
		});
	});

	//Open Front-End URL And Get Title
	casper.thenOpen(config.url, function() {
		casper.then(function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		});
	});

	//Logout From App
	casper.then(function() {
		forumRegister.redirectToLogout(casper, test, function() {
			casper.then(function() {
				this.capture(screenShotsDir+ 'logout.png');
			});		
		});
			
	});
		
	//Registering A User On Forum
	casper.then(function () {
		try {
			test.assertExists('a[href^="/register/register"]');
			this.click('a[href^="/register/register"]');
			casper.then(function() {
				this.capture(screenShotsDir+ 'A_registerFrom.png');
				this.echo('registration from opened successfully', 'INFO');
				forumRegister.registerToApp(json.deleteAccount, casper, function() {
					casper.then(function() {
						this.capture(screenShotsDir+ 'A_registeredUser.png');
						this.echo('User registered successfully', 'INFO');
					});
				});		
			});
		}catch(e) {
			test.assertDoesntExist('a[href^="/register/register"]', 'Register link not found on home page');
		}
		
	});

	//Login To App And Delete An Account From Account Setting Page
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function() {
			casper.then(function() {
				this.capture(screenShotsDir+ 'A_loggedIn_user.png');
				casper.echo('User logged-in successfully', 'INFO');
				casper.then(function() {
					try {
						test.assertExists('a.default-user');	
						this.click('a.default-user');
						try {
							test.assertExists('a[href^="/register?action=preferences"]');	
							this.click('a[href^="/register?action=preferences"]');	
							casper.then(function() {
								this.capture(screenShotsDir+ 'A_accountSetting.png');
								deleteAccount(casper, function() {
									casper.then(function() {
										this.capture(screenShotsDir+ 'A_delete.png');
									});						
								});					
							});
						}catch(e) {
							test.assertDoesntExist('a[href^="/register?action=preferences"]', 'account setting tab not found');	
						}
					}catch(e) {
						test.assertDoesntExist('a.default-user', '.default-user not found');
					}	
				});
			});
		});
	});


	//********************************6th Test Case Verification With Back-End Settings**********************************	

	//Open Back-End URL And Get Title
	casper.thenOpen(config.backEndUrl, function() {
		casper.then(function() {
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
		});	
	});

	//Logout From Back-End
	casper.then(function() {
		try {
			this.click('a[href="/tool/members/login?action=logout"]');
			casper.then(function() {
				this.capture(screenShotsDir+ 'logoutFromBackend.png');
			});
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}			
	});

	//Open Back-End URL And Change 'Delete Own Profile' Permission For Pending Email 		Verification User Group
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.echo('Logged-in successfully from back-end', 'INFO');
			casper.then(function() {
				enableDeleteOwnProfileForPendingUser(casper, casper.test, function() {
					casper.echo('permission changed for pending user', 'INFO');
			
				});
			});		
		});
	});

	//Open Front-End URL
	casper.thenOpen(config.url, function() {
		casper.then(function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		});
	});

	//Logout From App
	casper.then(function() {
		forumRegister.redirectToLogout(casper, test, function() {
			casper.then(function() {
				this.capture(screenShotsDir+ 'logout.png');
			});		
		});
			
	});
		
	//Registering A User On Forum
	casper.then(function () {
		try {
			test.assertExists('a[href^="/register/register"]');
			this.click('a[href^="/register/register"]');
			casper.then(function() {
				this.capture(screenShotsDir+ 'C_registerFrom.png');
				this.echo('registration from opened successfully', 'INFO');
				forumRegister.registerToApp(json.deleteAccount, casper, function() {
					casper.then(function() {
						this.capture(screenShotsDir+ 'C_registeredUser.png');
						this.echo('User registered successfully', 'INFO');
					});
				});		
			});
		}catch(e) {
			test.assertDoesntExist('a[href^="/register/register"]', 'Register link not found on home page');
		}
	});

	//Login To App And Delete An Account From Account Setting Page
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function() {
			casper.then(function() {
				this.capture(screenShotsDir+ 'C_loggedIn_user.png');
				casper.echo('User logged-in successfully', 'INFO');
				casper.then(function() {
					try {
						test.assertExists('a.default-user');	
						this.click('a.default-user');
						try {
							test.assertExists('a[href^="/register?action=preferences"]');	
							this.click('a[href^="/register?action=preferences"]');	
							casper.then(function() {
								this.capture(screenShotsDir+ 'C_accountSetting.png');
								deleteAccount(casper, function() {
									casper.then(function() {
										this.capture(screenShotsDir+ 'C_delete.png');
									});						
								});					
							});
						}catch(e) {
							test.assertDoesntExist('a[href^="/register?action=preferences"]', 'account setting tab not found');	
						}
					}catch(e) {
						test.assertDoesntExist('a.default-user', '.default-user not found');
					}	
				});
			});
		});
	});

	/******************7th Test Case Verification With Back-End Settings**************/	

	//Open Back-End URL And Get Title
	casper.thenOpen(config.backEndUrl, function() {
		casper.then(function() {
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
		});	
	});

	//Logout From Back-End
	casper.then(function() {
		try {
			this.click('a[href="/tool/members/login?action=logout"]');
			casper.then(function() {
				this.capture(screenShotsDir+ 'logoutFromBackend.png');
			});
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}			
	});

	//Open Back-End URL And Change 'Delete Own Profile' Permission For Pending Email 		Verification User Group
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.echo('Logged-in successfully from back-end', 'INFO');
			casper.then(function() {
				enableDeleteOwnProfileForPendingUser(casper, casper.test, function() {
					casper.echo('permission changed for pending user', 'INFO');
				});
			});		
		});		
	});
	

	//Open Front-End URL
	casper.thenOpen(config.url, function() {
		casper.then(function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		});
	});

	//Logout From App
	casper.then(function() {
		forumRegister.redirectToLogout(casper, test, function() {
			casper.then(function() {
				this.capture(screenShotsDir+ 'logout.png');
			});		
		});
			
	});
		
	//Registering A User On Forum
	casper.then(function () {
		try {
			test.assertExists('a[href^="/register/register"]');
			this.click('a[href^="/register/register"]');
			casper.then(function() {
				this.capture(screenShotsDir+ 'D_registerFrom.png');
				this.echo('registration from opened successfully', 'INFO');
				forumRegister.registerToApp(json.deleteAccount, casper, function() {
					casper.then(function() {
						this.capture(screenShotsDir+ 'D_registeredUser.png');
						this.echo('User registered successfully', 'INFO');
					});
				});		
			});
		}catch(e) {
			test.assertDoesntExist('a[href^="/register/register"]', 'Register link not found on home page');
		}
	});

	//Login To App And Delete An Account From Account Setting Page
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function() {
			casper.then(function() {
				this.capture(screenShotsDir+ 'D_loggedIn_user.png');
				casper.echo('User logged-in successfully', 'INFO');
				casper.then(function() {
					try {
						test.assertExists('a.default-user');	
						this.click('a.default-user');
						try {
							test.assertExists('a[href^="/register?action=preferences"]');	
							this.click('a[href^="/register?action=preferences"]');	
							casper.then(function() {
								this.capture(screenShotsDir+ 'D_accountSetting.png');
								deleteAccount(casper, function() {
									casper.then(function() {
										this.capture(screenShotsDir+ 'D_delete.png');
									});						
								});					
							});
						}catch(e) {
							test.assertDoesntExist('a[href^="/register?action=preferences"]', 'account setting tab not found');	
						}
					}catch(e) {
						test.assertDoesntExist('a.default-user', '.default-user not found');
					}	
				});
			});
		});
	});

	/******************8th Test Case Verification With Back-End Settings**************/

	//Open Front-End URL
	casper.thenOpen(config.url, function() {
		casper.then(function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		});
	});

	//Logout From App
	casper.then(function() {
		forumRegister.redirectToLogout(casper, test, function() {
			casper.then(function() {
				this.capture(screenShotsDir+ 'logout.png');
			});		
		});
			
	});
		
	//Registering A User On Forum
	casper.then(function () {
		try {
			test.assertExists('a[href^="/register/register"]');
			this.click('a[href^="/register/register"]');
			casper.then(function() {
				this.capture(screenShotsDir+ 'E_registerFrom.png');
				this.echo('registration from opened successfully', 'INFO');
				forumRegister.registerToApp(json.deleteAccount, casper, function() {
					casper.then(function() {
						this.capture(screenShotsDir+ 'E_registeredUser.png');
						this.echo('User registered successfully', 'INFO');
					});
				});		
			});
		}catch(e) {
			test.assertDoesntExist('a[href^="/register/register"]', 'Register link not found on home page');
		}
	});	

	//Open Back-End URL And Change 'Delete Own Profile' Permission For Registered User Group
	casper.then(function() {

		//Open Forum Backend URL And Get Title 
		casper.thenOpen(config.backEndUrl, function() {
			casper.then(function() {
				this.echo('Title of the page :' +this.getTitle(), 'INFO');
			});	
		});

		//Logout From Back-End
		casper.then(function() {
			try {
				this.click('a[href="/tool/members/login?action=logout"]');
				casper.then(function() {
					this.capture(screenShotsDir+ 'logoutFromBackend.png');
				});
			}catch(e) {
				test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
			}			
		});
		
		casper.then(function() {
			forumRegister.loginToForumBackEnd(casper, test, function() {
				casper.echo('Logged-in successfully from back-end', 'INFO');
				casper.then(function() {
					enableDeleteOwnProfileForRegisteredUser(casper, casper.test, function() {
						casper.echo('permission changed for registered user', 'INFO');
				
					});
				});		
			});
		});
	});

	//Reopen Front-End URL
	casper.thenOpen(config.url, function() {
		casper.then(function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		});
	});

	//Logout From App
	casper.then(function() {
		forumRegister.redirectToLogout(casper, test, function() {
			casper.then(function() {
				this.capture(screenShotsDir+ 'logout.png');
			});		
		});
			
	});

	//Login To App And Delete An Account From Account Setting Page
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function() {
			casper.then(function() {
				this.capture(screenShotsDir+ 'E_loggedIn_user.png');
				casper.echo('User logged-in successfully', 'INFO');
				casper.then(function() {
					try {
						test.assertExists('a.default-user');	
						this.click('a.default-user');
						try {
							test.assertExists('a[href^="/register?action=preferences"]');	
							this.click('a[href^="/register?action=preferences"]');	
							casper.then(function() {
								this.capture(screenShotsDir+ 'E_accountSetting.png');
								deleteAccount(casper, function() {
									casper.then(function() {
										this.capture(screenShotsDir+ 'E_delete.png');
									});						
								});					
							});
						}catch(e) {
							test.assertDoesntExist('a[href^="/register?action=preferences"]', 'account setting tab not found');	
						}
					}catch(e) {
						test.assertDoesntExist('a.default-user', '.default-user not found');
					}	
				});
			});
		});
	});

	/******************9th Test Case Verification With Back-End Settings**************/

	

	/******************7th Test Case Verification With Back-End Settings**************/

	//Open Front-End URL
	casper.thenOpen(config.url, function() {
		casper.then(function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		});
	});

	//Logout From App
	casper.then(function() {
		forumRegister.redirectToLogout(casper, test, function() {
			casper.then(function() {
				this.capture(screenShotsDir+ 'logout.png');
			});		
		});
			
	});
		
	//Registering A User On Forum
	casper.then(function () {
		try {
			test.assertExists('a[href^="/register/register"]');
			this.click('a[href^="/register/register"]');
			casper.then(function() {
				this.capture(screenShotsDir+ 'G_registerFrom.png');
				this.echo('registration from opened successfully', 'INFO');
				forumRegister.registerToApp(json.deleteAccount, casper, function() {
					casper.then(function() {
						this.capture(screenShotsDir+ 'G_registeredUser.png');
						this.echo('User registered successfully', 'INFO');
					});
				});		
			});
		}catch(e) {
			test.assertDoesntExist('a[href^="/register/register"]', 'Register link not found on home page');
		}
	});	

	//Open Back-End URL And Change 'Delete Own Profile' Permission For Registered User Group
	casper.then(function() {

		//Open Forum Backend URL And Get Title 
		casper.thenOpen(config.backEndUrl, function() {
			casper.then(function() {
				this.echo('Title of the page :' +this.getTitle(), 'INFO');
			});	
		});

		//Logout From Back-End
		casper.then(function() {
			try {
				this.click('a[href="/tool/members/login?action=logout"]');
				casper.then(function() {
					this.capture(screenShotsDir+ 'logoutFromBackend.png');
				});
			}catch(e) {
				test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
			}			
		});
		casper.then(function() {
			forumRegister.loginToForumBackEnd(casper, test, function() {
				casper.echo('Logged-in successfully from back-end', 'INFO');
				casper.then(function() {
					enableDeleteOwnProfileForRegisteredUser(casper, casper.test, function() {
						casper.echo('permission changed for registered user', 'INFO');
				
					});
				});		
			});
		});
	});

	//Reopen Front-End URL
	casper.thenOpen(config.url, function() {
		casper.then(function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		});
	});

	//Logout From App
	casper.then(function() {
		forumRegister.redirectToLogout(casper, test, function() {
			casper.then(function() {
				this.capture(screenShotsDir+ 'logout.png');
			});		
		});
			
	});

	//Login To App And Delete An Account From Account Setting Page
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function() {
			casper.then(function() {
				this.capture(screenShotsDir+ 'G_loggedIn_user.png');
				casper.echo('User logged-in successfully', 'INFO');
				casper.then(function() {
					try {
						test.assertExists('a.default-user');	
						this.click('a.default-user');
						try {
							test.assertExists('a[href^="/register?action=preferences"]');	
							this.click('a[href^="/register?action=preferences"]');	
							casper.then(function() {
								this.capture(screenShotsDir+ 'G_accountSetting.png');
								deleteAccount(casper, function() {
									casper.then(function() {
										this.capture(screenShotsDir+ 'G_delete.png');
									});						
								});					
							});
						}catch(e) {
							test.assertDoesntExist('a[href^="/register?action=preferences"]', 'account setting tab not found');	
						}
					}catch(e) {
						test.assertDoesntExist('a.default-user', '.default-user not found');
					}	
				});
			});
		});
	});

	/******************10th Test Case Verification With Back-End Settings**************/

	//Open Front-End URL
	casper.thenOpen(config.url, function() {
		casper.then(function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		});
	});

	//Logout From App
	casper.then(function() {
		forumRegister.redirectToLogout(casper, test, function() {
			casper.then(function() {
				this.capture(screenShotsDir+ 'logout.png');
			});		
		});
			
	});
		
	//Registering A User On Forum
	casper.then(function () {
		try {
			test.assertExists('a[href^="/register/register"]');
			this.click('a[href^="/register/register"]');
			casper.then(function() {
				this.capture(screenShotsDir+ 'H_registerFrom.png');
				this.echo('registration from opened successfully', 'INFO');
				forumRegister.registerToApp(json.deleteAccount, casper, function() {
					casper.then(function() {
						this.capture(screenShotsDir+ 'H_registeredUser.png');
						this.echo('User registered successfully', 'INFO');
					});
				});		
			});
		}catch(e) {
			test.assertDoesntExist('a[href^="/register/register"]', 'Register link not found on home page');
		}
	});	

	//Open Back-End URL And Change 'Delete Own Profile' Permission For Registered User Group
	casper.then(function() {

		//Open Forum Backend URL And Get Title 
	
		casper.thenOpen(config.backEndUrl, function() {
			casper.then(function() {
				this.echo('Title of the page :' +this.getTitle(), 'INFO');
			});	
		});

		//Logout From Back-End
		casper.then(function() {
			try {
				this.click('a[href="/tool/members/login?action=logout"]');
				casper.then(function() {
					this.capture(screenShotsDir+ 'logoutFromBackend.png');
				});
			}catch(e) {
				test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
			}			
		});

		//Login To Forum Back-End
		casper.then(function() {
			forumRegister.loginToForumBackEnd(casper, test, function() {
				casper.echo('Logged-in successfully from back-end', 'INFO');
				casper.then(function() {
					enableDeleteOwnProfileForRegisteredUser(casper, casper.test, function() {
						casper.echo('permission changed for registered user', 'INFO');
				
					});
				});		
			});
		});
	});

	//Reopen Front-End URL
	casper.thenOpen(config.url, function() {
		casper.then(function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		});
	});

	//Logout From App
	casper.then(function() {
		forumRegister.redirectToLogout(casper, test, function() {
			casper.then(function() {
				this.capture(screenShotsDir+ 'logout.png');
			});		
		});
			
	});

	//Login To App And Delete An Account From Account Setting Page
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function() {
			casper.then(function() {
				this.capture(screenShotsDir+ 'H_loggedIn_user.png');
				casper.echo('User logged-in successfully', 'INFO');
				casper.then(function() {
					try {
						test.assertExists('a.default-user');	
						this.click('a.default-user');
						try {
							test.assertExists('a[href^="/register?action=preferences"]');	
							this.click('a[href^="/register?action=preferences"]');	
							casper.then(function() {
								this.capture(screenShotsDir+ 'H_accountSetting.png');
								deleteAccount(casper, function() {
									casper.then(function() {
										this.capture(screenShotsDir+ 'H_delete.png');
									});						
								});					
							});
						}catch(e) {
							test.assertDoesntExist('a[href^="/register?action=preferences"]', 'account setting tab not found on edit profile page');	
						}
					}catch(e) {
						test.assertDoesntExist('a.default-user', '.default-user not found');
					}	
				});
			});
		});
	});

	/******************11th Test Case Verification With Back-End Settings**************/
	
	//Open Back-End URL And Get Title
	casper.thenOpen(config.backEndUrl, function() {
		casper.then(function() {
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
		});	
	});

	//Logout From Back-End
	casper.then(function() {
		try {
			this.click('a[href="/tool/members/login?action=logout"]');
			casper.then(function() {
				this.capture(screenShotsDir+ 'logoutFromBackend.png');
			});
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}			
	});

	//Login To Forum BackEnd And Change 'Delete Own Profile' Permission For Pending Email 		Verification User Group
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.echo('Logged-in successfully from back-end', 'INFO');
			casper.then(function() {
				enableDeleteOwnProfileForPendingUser(casper, casper.test, function() {
					casper.echo('permission changed for pending user', 'INFO');	
				});
			});		
		});
	});

	//Open Front-End URL And Get Title
	casper.thenOpen(config.url, function() {
		casper.then(function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		});
	});

	//Logout From App
	casper.then(function() {
		forumRegister.redirectToLogout(casper, test, function() {
			casper.then(function() {
				this.capture(screenShotsDir+ 'logout.png');
			});		
		});
			
	});
		
	//Registering A User On Forum
	casper.then(function () {
		try {
			test.assertExists('a[href^="/register/register"]');
			this.click('a[href^="/register/register"]');
			casper.then(function() {
				this.capture(screenShotsDir+ 'I_registerFrom.png');
				this.echo('registration from opened successfully', 'INFO');
				forumRegister.registerToApp(json.deleteAccount, casper, function() {
					casper.then(function() {
						this.capture(screenShotsDir+ 'I_registeredUser.png');
						this.echo('User registered successfully', 'INFO');
					});
				});		
			});
		}catch(e) {
			test.assertDoesntExist('a[href^="/register/register"]', 'Register link not found on home page');
		}
	});

	//Login To App And Delete An Account From User's Profile Page
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function() {
			casper.then(function() {
				this.capture(screenShotsDir+ 'I_loggedIn_user.png');
				casper.echo('User logged-in successfully', 'INFO');
				casper.then(function() {
					try {
						test.assertExists('a.default-user');	
						this.click('a.default-user');
						try {
							test.assertExists('a[href^="/profile"]');	
							this.click('a[href^="/profile/"]');	
							casper.then(function() {
								this.capture(screenShotsDir+ 'I_accountSetting.png');
								deleteAccount(casper, function() {
									casper.then(function() {
										this.capture(screenShotsDir+ 'I_delete.png');
									});						
								});					
							});
						}catch(e) {
							test.assertDoesntExist('a[href^="/profile"]', 'profile link not found');
						}
					}catch(e) {
						test.assertDoesntExist('a.default-user', '.default-user not found');
					}	
				});
			});
		});
	});

	/******************12th Test Case Verification With Back-End Settings**************/

	//Open Front-End URL
	casper.thenOpen(config.url, function() {
		casper.then(function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		});
	});

	//Logout From App
	casper.then(function() {
		forumRegister.redirectToLogout(casper, test, function() {
			casper.then(function() {
				this.capture(screenShotsDir+ 'logout.png');
			});		
		});
			
	});
		
	//Registering A User On Forum
	casper.then(function () {
		try {
			test.assertExists('a[href^="/register/register"]');
			this.click('a[href^="/register/register"]');
			casper.then(function() {
				this.capture(screenShotsDir+ 'K_registerFrom.png');
				this.echo('registration from opened successfully', 'INFO');
				forumRegister.registerToApp(json.deleteAccount, casper, function() {
					casper.then(function() {
						this.capture(screenShotsDir+ 'K_registeredUser.png');
						this.echo('User registered successfully', 'INFO');
					});
				});		
			});
		}catch(e) {
			test.assertDoesntExist('a[href^="/register/register"]', 'Register link not found on home page');
		}
	});	

	//Open Back-End URL And Change 'Delete Own Profile' Permission For Registered User Group
	casper.then(function() {

		//Open Forum Backend URL And Get Title 
		casper.thenOpen(config.backEndUrl, function() {
			casper.then(function() {
				this.echo('Title of the page :' +this.getTitle(), 'INFO');
			});	
		});

		//Logout From Back-End
		casper.then(function() {
			try {
				this.click('a[href="/tool/members/login?action=logout"]');
				casper.then(function() {
					this.capture(screenShotsDir+ 'logoutFromBackend.png');
				});
			}catch(e) {
				test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
			}			
		});

		//Login To Forum Back-End
		casper.then(function() {
			forumRegister.loginToForumBackEnd(casper, test, function() {
				casper.echo('Logged-in successfully from back-end', 'INFO');
				casper.then(function() {
					enableDeleteOwnProfileForRegisteredUser(casper, casper.test, function() {
						casper.echo('permission changed for registered user', 'INFO');
				
					});
				});		
			});
		});
	});

	//Reopen Front-End URL
	casper.thenOpen(config.url, function() {
		casper.then(function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		});
	});

	//Logout From App
	casper.then(function() {
		forumRegister.redirectToLogout(casper, test, function() {
			casper.then(function() {
				this.capture(screenShotsDir+ 'logout.png');
			});		
		});
			
	});

	//Login To App And Delete An Account From User's Profile Page
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function() {
			casper.then(function() {
				this.capture(screenShotsDir+ 'K_loggedIn_user.png');
				casper.echo('User logged-in successfully', 'INFO');
				casper.then(function() {
					try {
						test.assertExists('a.default-user');	
						this.click('a.default-user');
						try {
							test.assertExists('a[href^="/profile"]');	
							this.click('a[href^="/profile/"]');	
							casper.then(function() {
								this.capture(screenShotsDir+ 'K_accountSetting.png');
								deleteAccount(casper, function() {
									casper.then(function() {
										this.capture(screenShotsDir+ 'K_delete.png');
									});						
								});					
							});
						}catch(e) {
							test.assertDoesntExist('a[href^="/profile"]', 'profile link not found');
						}
					}catch(e) {
						test.assertDoesntExist('a.default-user', '.default-user not found');
					}	
				});
			});
		});
	});
};

/************************************PRIVATE METHODS***********************************/

//Method For Deleting User's Account

var deleteAccount = function(driver, callback) {
	try {
		driver.test.assertExists('#deleteAccountDialog');
		driver.click('#deleteAccountDialog');
		try {
			driver.test.assertExists('#deleteAccount');
			driver.click('#deleteAccount');
			driver.echo('account is deleted successfully', 'INFO');
		}catch(e) {
			driver.test.assertDoesntExist('#deleteAccount');
		}
	}catch(e) {
		driver.test.assertDoesntExist('#deleteAccountDialog');
	}
	return callback(null);
};

//Method For Deleting User's Account 

var delAccount = function(driver, callback) {
	try {
		driver.test.assertExists('i.glyphicon.glyphicon-trash');
		driver.click('i.glyphicon.glyphicon-trash');
		try {
			driver.test.assertExists('#delUserAccount');
			driver.click('#delUserAccount');
			driver.echo('account is deleted successfully', 'INFO');
		}catch(e) {
			driver.test.assertDoesntExist('#delUserAccount');
		}
	}catch(e) {
		driver.test.assertDoesntExist('i.glyphicon.glyphicon-trash', 'delete account button not found');
	}
	return callback(null);
};

//Method For Do Not Delete User's Account

var doNotDeleteAccount = function(driver, callback) {
	try {
		driver.test.assertExists('#deleteAccountDialog');
		driver.click('#deleteAccountDialog');
		try {
			driver.test.assertExists('#doNotDelAccount');
			driver.click('#doNotDelAccount');
			driver.echo('account is not deleted', 'INFO');
		}catch(e) {
			driver.test.assertDoesntExist('#doNotDelAccount');
		}
	}catch(e) {
		driver.test.assertDoesntExist('#deleteAccountDialog');
	}
	return callback(null);
};

//Method for Verifying Success Message
var verifySuccessMsg = function(successMsg, expectedSuccessMsg, driver, callback) {
	driver.echo('Actual Success Message : '+successMsg, 'INFO');
	driver.echo('Expected Success Message : '+expectedSuccessMsg, 'INFO');
	try {
		driver.test.assertEquals(successMsg, expectedSuccessMsg);
		driver.echo('success message verified when user change permission from back-end for pending email verification user', 'INFO');
	}catch(e) {
		driver.echo('success message is not verified when user change permission from back-end for pending email verification user', 'ERROR');
	}
	return callback(null);
};

//Method For Changing User Group To Admin User
var makeAnAdminUser = function(driver, test, callback) {
	try {
		test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		try {
			test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			driver.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			driver.then(function() {
				try {
					this.test.assertExists('#autosuggest');
					this.sendKeys('#autosuggest', 'hs123', {keepFocus: true});
					this.click('#autosuggest');
					this.page.sendEvent("keypress", this.page.event.key.Enter);
					driver.then(function() {
						driver.then(function() {
							try {
								this.fillSelectors('form[name="ugfrm"]', {
									'select[name="usergroupid"]' :  '20237479'
								}, true);
							}catch(e) {
								test.assertDoesntExist('form[name="ugfrm"]');
							}
						});
						driver.then(function() {
							this.capture(screenShotsDir + 'popUp.png');
							return callback(null);
						});
					});
				}catch(e) {
					this.test.assertDoesntExist('#autosuggest', 'searchbox not found on group permission page on gropu permission page');
				}
			});
		}catch(e) {
			test.assertDoesntExist('div#ddUsers a[href="/tool/members/mb/usergroup"]');
		}
	}catch(e) {
		test.assertDoesntExist('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	}
};

//Method For Enabling Delete Own Profile Permission For Registered User
var enableDeleteOwnProfileForRegisteredUser = function(driver, test, callback) {
	try {
		test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		try {
			test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			driver.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			driver.then(function() {
				this.capture(screenShotsDir+ 'groupPermission.png');
				//Clicking On 'Change Permissions' Link With Respect To 'Un-Registered Users'  
				driver.then(function() {
					try {
						var grpName = this.evaluate(function(){
							for(var i=1; i<=7; i++) {
								var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
								if (x1.innerText == 'Unregistered / Not Logged In') {
									var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(4) div.tooltipMenu a').getAttribute('href');
									return x2;
								}
							}
							this.click('a[href="'+grpName+'"]');
						});
					}catch(e) {
						var grpName = this.evaluate(function(){
							for(var i=1; i<=7; i++) {
								var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
								if (x1.innerText == 'Unregistered / Not Logged In') {
									var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('href');
									return x2;
								}
							}
							this.click('a[href="'+grpName+'"]');
						});
					}
					driver.then(function() {
						this.capture(screenShotsDir + 'group_un-registered.png');
						try {
							test.assertExists('#delete_profile');
							utils.enableorDisableCheckbox('delete_profile', true, driver, function() {
								driver.echo('checkbox is checked', 'INFO');
								driver.capture(screenShotsDir+ 'checked.png');			
							});
							try {
								test.assertExists('button.button.btn-m.btn-blue');
								this.click('button.button.btn-m.btn-blue');
								driver.then(function() {
									this.capture(screenShotsDir+ 'updatedChangePermission.png');
									try {
										test.assertExists('font[color="red"]');
										var successMsg = this.fetchText('font[color="red"]');
										var expectedSuccessMsg = 'Your user group settings have been updated.';
										verifySuccessMsg(successMsg, expectedSuccessMsg, driver, function() {
											driver.capture(screenShotsDir+ 'success.png');
											editProfile.makeRegisteredUser(driver, driver.test, function() {
												casper.echo('user group changed to registered user', 'INFO');
												return callback(null);					
											});
										});
									}catch(e) {
										test.assertDoesntExist('font[color="red"]');
									}
								});
							}catch(e) {
								test.assertDoesntExist('button.button.btn-m.btn-blue');
							}
							
						}catch(e) {
							test.assertDoesntExist('#delete_profile');
						}
					});
				});
			});
		}catch(e) {
			test.assertDoesntExist('div#ddUsers a[href="/tool/members/mb/usergroup"]');
		}
	}catch(e) {
		test.assertDoesntExist('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	}
};

//Method For Enabling Delete Own Profile Permission For Pending User
var enableDeleteOwnProfileForPendingUser = function(driver, test, callback) {
	try {
		test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		try {
			test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			driver.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			driver.then(function() {
				this.capture(screenShotsDir+ 'groupPermission.png');
				//Clicking On 'Change Permissions' Link With Respect To 'Pending Users'  
				driver.then(function() {
					try {
						var grpName = this.evaluate(function(){
							for(var i=1; i<=7; i++) {
								var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
								if (x1.innerText == 'Pending Email Verification') {
									var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(4) div.tooltipMenu a').getAttribute('href');
									return x2;
								}
							}
							this.click('a[href="'+grpName+'"]');
						});
					}catch(e) {
						var grpName = this.evaluate(function(){
							for(var i=1; i<=7; i++) {
								var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
								if (x1.innerText == 'Pending Email Verification') {
									var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('href');
									return x2;
								}
							}
							this.click('a[href="'+grpName+'"]');
						});
					}
					try {
						driver.then(function() {
							this.capture(screenShotsDir + 'group_pending.png');
							try {
								test.assertExists('#delete_profile');
								utils.enableorDisableCheckbox('delete_profile', true, driver, function() {
									driver.echo('checkbox is checked', 'INFO');
									driver.capture(screenShotsDir+ 'checked.png');			
								});
								try {
									test.assertExists('button.button.btn-m.btn-blue');
									this.click('button.button.btn-m.btn-blue');
									driver.then(function() {
										this.capture(screenShotsDir+ 'updatedChangePermission.png');
										try {
											test.assertExists('font[color="red"]');
											var successMsg = this.fetchText('font[color="red"]');
											var expectedSuccessMsg = 'Your user group settings have been updated.';
											verifySuccessMsg(successMsg, expectedSuccessMsg, driver, function() {
												driver.capture(screenShotsDir+ 'success.png');
												return callback(null);
											});
										}catch(e) {
											test.assertDoesntExist('font[color="red"]');
										}
									});
								}catch(e) {
									test.assertDoesntExist('button.button.btn-m.btn-blue');
								}
							}catch(e) {
								test.assertDoesntExist('#delete_profile');
							}
						});
					}catch(e) {
						this.assertDoesntExist('a[href="'+grpName+'"]');
						this.echo('Pending Email Address Verification is disabled', 'ERROR');
					}
				});
			});
		}catch(e) {
			test.assertDoesntExist('div#ddUsers a[href="/tool/members/mb/usergroup"]');
		}
	}catch(e) {
		test.assertDoesntExist('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	}
};

//Method For Disabling Delete Own Profile Permission For Registered User
var disableDeleteOwnProfileForRegisteredUser = function(driver, test, callback) {
	try {
		test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		try {
			test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			driver.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			driver.then(function() {
				this.capture(screenShotsDir+ 'groupPermission.png');
				//Clicking On 'Change Permissions' Link With Respect To 'Registered Users'  
				driver.then(function() {
					try {
						var grpName = this.evaluate(function(){
							for(var i=1; i<=7; i++) {
								var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
								if (x1.innerText == 'Registered Users') {
									var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(4) div.tooltipMenu a').getAttribute('href');
									return x2;
								}
							}
							this.click('a[href="'+grpName+'"]');
						});
					}catch(e) {
						var grpName = this.evaluate(function(){
							for(var i=1; i<=7; i++) {
								var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
								if (x1.innerText == 'Registered Users') {
									var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('href');
									return x2;
								}
							}
							this.click('a[href="'+grpName+'"]');
						});
					}
					driver.then(function() {
						this.capture(screenShotsDir + 'group_registered.png');
						try {
							test.assertExists('#delete_profile');
							utils.enableorDisableCheckbox('delete_profile', false, driver, function() {
								driver.echo('checkbox is unchecked', 'INFO');
								driver.capture(screenShotsDir+ 'unchecked.png');			
							});
							try {
								test.assertExists('button.button.btn-m.btn-blue');
								this.click('button.button.btn-m.btn-blue');
								driver.then(function() {
									this.capture(screenShotsDir+ 'updatedChangePermission.png');
									try {
										test.assertExists('font[color="red"]');
										var successMsg = this.fetchText('font[color="red"]');
										var expectedSuccessMsg = 'Your user group settings have been updated.';
										verifySuccessMsg(successMsg, expectedSuccessMsg, driver, function() {
											driver.capture(screenShotsDir+ 'success.png');
											editProfile.makeRegisteredUser(driver, driver.test, function() {
												casper.echo('user group changed to registered user', 'INFO');
												return callback(null);					
											});
										});
									}catch(e) {
										test.assertDoesntExist('font[color="red"]');
									}
								});
							}catch(e) {
								test.assertDoesntExist('button.button.btn-m.btn-blue');
							}
							
						}catch(e) {
							test.assertDoesntExist('#delete_profile');
						}
					});
				});
			});
		}catch(e) {
			test.assertDoesntExist('div#ddUsers a[href="/tool/members/mb/usergroup"]');
		}
	}catch(e) {
		test.assertDoesntExist('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	}
};

//Method For Disabling Delete Own Profile Permission For Pending User
var disableDeleteOwnProfileForPendingUser = function(driver, test, callback) {
	try {
		test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		try {
			test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			driver.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			driver.then(function() {
				this.capture(screenShotsDir+ 'groupPermission.png');
				//Clicking On 'Change Permissions' Link With Respect To 'Pending Email Verification Users'  
				driver.then(function() {
					try {
						var grpName = this.evaluate(function(){
							for(var i=1; i<=7; i++) {
								var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
								if (x1.innerText == 'Pending Email Verification') {
									var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(4) div.tooltipMenu a').getAttribute('href');
									return x2;
								}
							}
							this.click('a[href="'+grpName+'"]');
						});
					}catch(e) {
						var grpName = this.evaluate(function(){
							for(var i=1; i<=7; i++) {
								var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
								if (x1.innerText == 'Pending Email Verification') {
									var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('href');
									return x2;
								}
							}
							this.click('a[href="'+grpName+'"]');
						});
					}
					try {
						driver.then(function() {
							this.capture(screenShotsDir + 'group_pending.png');
							try {
								test.assertExists('#delete_profile');
								utils.enableorDisableCheckbox('delete_profile', false, driver, function() {
									driver.echo('checkbox is unchecked', 'INFO');
									driver.capture(screenShotsDir+ 'unchecked.png');			
								});
								try {
									test.assertExists('button.button.btn-m.btn-blue');
									this.click('button.button.btn-m.btn-blue');
									driver.then(function() {
										this.capture(screenShotsDir+ 'updatedChangePermission.png');
										try {
											test.assertExists('font[color="red"]');
											var successMsg = this.fetchText('font[color="red"]');
											var expectedSuccessMsg = 'Your user group settings have been updated.';
											verifySuccessMsg(successMsg, expectedSuccessMsg, driver, function() {
												driver.capture(screenShotsDir+ 'success.png');
												return callback(null);
											});
										}catch(e) {
											test.assertDoesntExist('font[color="red"]');
										}
									});
								}catch(e) {
									test.assertDoesntExist('button.button.btn-m.btn-blue');
								}
							}catch(e) {
								test.assertDoesntExist('#delete_profile');
							}
						});
					}catch(e) {
						this.echo('Email address Verification is disabled from Back-end', 'ERROR');
					}
				});
			});
		}catch(e) {
			test.assertDoesntExist('div#ddUsers a[href="/tool/members/mb/usergroup"]');
		}
	}catch(e) {
		test.assertDoesntExist('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	}
};

// method for goto New Topic page to application
var gotoNewTopicpage = function(driver, callback) {
	driver.click('#links-nav');
	driver.click('#latest_topics_show');
	driver.click('a[href="/post/printadd"]');
	driver.then(function() {
		this.capture(screenShotsDir+ 'startTopic.png');
	});
	return callback(null);
};


// method for goto New Topic page to application
var postTopicpage = function(data, driver, callback) {
	casper.echo("data.title : "+data.title, 'INFO');
	casper.echo("data.content : "+data.content, 'INFO');
	casper.echo("data.category : "+data.category, 'INFO');
	driver.sendKeys('input[name="subject"]', data.title, {reset:true});
	 driver.withFrame('message_ifr', function() {
		this.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
		this.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
 		this.sendKeys('#tinymce', data.content);
		this.capture(screenShotsDir+ 'content.png');	
	});	
		driver.then(function() {});
		driver.click('#all_forums_dropdown');
		driver.fill('form[name="PostTopic"]',{
			'forum' : data.category
		},false);
	
	driver.then(function() {
		driver.click('#post_submit');
	});
	
	return callback(null);
};
