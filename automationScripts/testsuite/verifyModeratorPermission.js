var utils = require('./utils.js');
var json = require('../testdata/moderator.json');
var forumLogin = require('./forum_login.js');
var forumRegister = require('./register.js');
var generalPermission = require('./generalPermission.js');
var verifyModeratorPermission = module.exports = {};
var AddPoll=0;

<<<<<<< HEAD
verifyModeratorPermission.verifyModeratorPermissionfeatureTest=function(casper, x, callback) {

		casper.thenOpen(config.url, function(){
=======
verifyModeratorPermission.verifyModeratorPermissionfeatureTest=function(casper, test, x, callback) {

		/*casper.thenOpen(config.url, function(){
>>>>>>> f1d4d24c0f595dafede98b0088be17bcd846af5a
			this.echo('**************************Registering User***************************', 'INFO');
			this.echo('title of the page : '+this.getTitle());
			casper.waitForSelector('a[href="/register/register"]', function sucess(){
				casper.test.assertExists('a[href="/register/register"]');
				this.click('a[href="/register/register"]');
				casper.waitForSelector('form[name="PostTopic"]', function sucess(){
					forumRegister.registerToApp(json['user2'], casper, function(err) {
							if(!err){
								casper.waitForSelector('div.panel-body.table-responsive', function sucess(){
									casper.echo('User is Succesfully Registered....................','INFO');
									},function fail(){
										this.echo('User is Not Succesfully Registered','ERROR');
								});
							}
					});
					},function fail(){
						this.echo('User Registeration Form Does Not Found','ERROR');
				});
				},function fail(){
					this.echo('Problem in opening Url','ERROR');
			});
		});
		
		casper.thenOpen(config.url,function() {
			forumRegister.redirectToLogout(casper, test, function() {});
<<<<<<< HEAD
		});
=======
		});*/
>>>>>>> f1d4d24c0f595dafede98b0088be17bcd846af5a

		casper.thenOpen(config.backEndUrl,function() {
			casper.echo('Login To Backend URL and enable start topic checkbox', 'INFO');
			casper.echo('title of the page : ' +this.getTitle(), 'INFO');
<<<<<<< HEAD
			forumRegister.loginToForumBackEnd(casper, casper.test, function(err) {
=======
			forumRegister.loginToForumBackEnd(casper, test, function(err) {
>>>>>>> f1d4d24c0f595dafede98b0088be17bcd846af5a
				if(!err) {
					casper.echo('User has been successfuly login to backend', 'INFO');
					//go to user permission
					utils.gotoEditUserGroupPermissionpage(x, "Registered Users", casper, function(err) {
						if (!err) {
							casper.echo('Successfully navigated to Edit User group Permission page', 'INFO');
							//click on checkbox
							casper.waitForSelector('#post_threads', function success() {
								utils.enableorDisableCheckbox('post_threads', true, casper, function(err) {
									if(!err) {
										casper.echo("Starts Topic checkbox has been enabled", 'INFO');
										utils.enableorDisableCheckbox('view_forum', true, casper, function(err) {
											if(!err){
												casper.echo("View Category checkbox has been enabled", 'INFO');
												//click on save button
												utils.clickOnElement(casper, '.btn-blue', function(err) {
													if(!err) {
														casper.echo('Saving Changes', 'INFO');
														casper.waitForSelector('p[align="center"] font.heading', function success() {
															casper.echo('Permission Setting Changed', 'INFO');;
														}, function fail(err){
															casper.echo(err);						
														});
													}
												});
											}
										});
										
									}
								});
								}, function fail(err) {
									casper.echo(err);
							});
						}
					});
				}
			});
		});
		//Changing the General Category Permission to view category.
		casper.thenOpen(config.backEndUrl,function() {
			casper.waitForSelector('div#my_account_forum_menu', function success() {
<<<<<<< HEAD
				generalPermission.viewChangePermission(casper, casper.test, function(err,grpId) {
					if(!err){	
						casper.then(function(){
							casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
							casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
							casper.test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
=======
				generalPermission.viewChangePermission(casper, test, function(err,grpId) {
					if(!err){	
						casper.then(function(){
							test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
							casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
							test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
>>>>>>> f1d4d24c0f595dafede98b0088be17bcd846af5a
							casper.click('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
								casper.waitForSelector('div.select', function success() {
									casper.mouse.move('div#sortable ul.ui-sortable li:nth-child(1) div.select');
									casper.waitUntilVisible('div#sortable ul.ui-sortable li:nth-child(1) div.select a.manageAction', function success() {
										casper.click('div#sortable ul.ui-sortable li:nth-child(1) div.select a.manageAction');
										casper.click('div#sortable ul.ui-sortable li:nth-child(1) div.select a.change_perm');
										casper.waitForSelector('form[name="frmFormPermissionsDialog"]', function success() {
<<<<<<< HEAD
											casper.then(function(){
												utils.enableorDisableCheckbox('view_forum_'+grpId, true, casper, function() {
													casper.echo('checkbox is checked for view category for general category', 'INFO');
													casper.capture('1223.png');	
													
												});

											});
											
											casper.wait(10000,function(){});
=======

											utils.enableorDisableCheckbox('view_forum_'+grpId, true, casper, function() {
												casper.capture('12333.png');
												casper.echo('checkbox is checked for view category for general category', 'INFO');
												casper.click('div.select');

											});
											casper.then(function() {});
>>>>>>> f1d4d24c0f595dafede98b0088be17bcd846af5a
											}, function fail() {
												casper.echo('change permission dialogue not opened for general category', 'ERROR');
										});
										}, function fail() {
											casper.echo('manage link not found for general category', 'ERROR');
									});
									}, function fail() {
										casper.echo('category permission page not loaded in 5 seconds', 'ERROR');
								});

					
						});
						
					}				
				});
				},function fail(){
			});
		});

		
<<<<<<< HEAD
		casper.thenOpen(config.backEndUrl,function() {
=======
		//Login To Backend URL and disable Approve New Posts
		/*casper.thenOpen(config.backEndUrl,function() {
			casper.echo('Login To Backend URL and disable Approve New Posts', 'INFO');
			casper.echo('Title of the page :' +this.getTitle(), 'INFO');
			casper.echo('---------------------------------------------------------------------------');		
			//setting page -> security page
			casper.waitForSelector('a[data-tooltip-elm="ddSettings"]', function success() {
				test.assertExists('a[data-tooltip-elm="ddSettings"]');
				this.click('a[data-tooltip-elm="ddSettings"]');
				this.waitForSelector('a[href="/tool/members/mb/settings?tab=Security"]', function success() {
					test.assertExists('a[href="/tool/members/mb/settings?tab=Security"]');
					this.click('a[href="/tool/members/mb/settings?tab=Security"]');
				}, function fail(err) {
					casper.echo(err);
				});
				this.waitForSelector('#post_approval', function success() {
					test.assertExists('#post_approval');
					this.click('#post_approval');
					this.sendKeys('select[name="post_approval"] option[value="0"]', 'Disabled');
					test.assertExists('button[type="submit"]');
					this.click('button[type="submit"]');
					this.wait(1000);
				}, function fail() {
					casper.echo(err);
				});
			}, function fail(err) {
				casper.echo(err);
			});
		});*/

		
		
		
		
		/*casper.thenOpen(config.backEndUrl,function() {
>>>>>>> f1d4d24c0f595dafede98b0088be17bcd846af5a
			casper.echo('*******************************Case-8********************************', 'INFO');
			casper.echo('******************************Enable Edit Post********************************', 'INFO');
			casper.echo('Verify by edit post from category(cat1)', 'INFO');
			 ModeratorPermission(casper,'p_edit_post',true,1,function(err,href){
				if(!err){
					casper.waitForSelector('a[href="'+href+'"]',function success(){
						casper.click('a[href="'+href+'"]');
						casper.waitForSelector('i.glyphicon.glyphicon-chevron-down',function sucess(){
							casper.click('i.glyphicon.glyphicon-chevron-down');
							casper.test.assertExists('a#edit_post_request');
							casper.echo('Message:Post is Editable','INFO');
							casper.then(function(){


							});
							DeleteTopic(casper,href,function(err){
								if(!err){
									casper.echo('*******************************Case-8********************************', 'INFO');
									casper.echo('*******************************Successfully Verified********************************', 'INFO');
								}
							});
							},function fail(){
								casper.echo('Unable to Click on Dropdown','ERROR');
						});
						},function fail(){
							casper.echo('Unable to Click on Dropdown','ERROR');	
					}); 
				}
			});
		});

		casper.thenOpen(config.backEndUrl,function() {
			casper.echo('*******************************Case-9********************************', 'INFO');
			casper.echo('*******************************Enable Edit Post********************************', 'INFO');
			casper.echo('Verify by edit post from other category', 'INFO');
			 ModeratorPermission(casper,'p_edit_post',true,2,function(err,href){
				if(!err){
					casper.waitForSelector('a[href="'+href+'"]',function success(){
						casper.click('a[href="'+href+'"]');
						casper.waitForSelector('i.glyphicon.glyphicon-chevron-down',function sucess(){
							casper.click('i.glyphicon.glyphicon-chevron-down');
							casper.test.assertDoesntExist('a#edit_post_request');
							casper.echo('Message:Post is Not Editable','INFO');
							DeleteTopic(casper,href,function(err){
								if(!err){
									casper.echo('*******************************Case-9********************************', 'INFO');
									casper.echo('*******************************Successfully Verified********************************', 'INFO');
								}

							});
							},function fail(){
								casper.echo('Unable to Click on Dropdown','ERROR');
						});
						},function fail(){
							casper.echo('Unable to Click on Dropdown','ERROR');	
					}); 
				}
			});
		});

	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('*******************************Case-10********************************', 'INFO');
		casper.echo('*******************************Disable Edit Post********************************', 'INFO');
		casper.echo('Verify by edit post from category(cat1)', 'INFO');
		 ModeratorPermission(casper,'p_edit_post',false,1,function(err,href){
			if(!err){
				casper.waitForSelector('a[href="'+href+'"]',function success(){
					casper.click('a[href="'+href+'"]');
					casper.waitForSelector('i.glyphicon.glyphicon-chevron-down',function sucess(){
						casper.click('i.glyphicon.glyphicon-chevron-down');
						casper.test.assertDoesntExist('a#edit_post_request');
						casper.echo('Message:Post is Not Editable','INFO');
						DeleteTopic(casper,href,function(err){
							if(!err){
								casper.echo('*******************************Case-10********************************', 'INFO');
								casper.echo('*******************************Successfully Verified********************************', 'INFO');
							}
						});
						},function fail(){
							casper.echo('Unable to Click on Dropdown','ERROR');
					});
					},function fail(){
						casper.echo('Unable to Click on Dropdown','ERROR');	
				}); 
			}
		});
	});
	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('*******************************Case-11********************************', 'INFO');
		casper.echo('*******************************Disable Edit Post********************************', 'INFO');
		casper.echo('Verify by edit post from other category', 'INFO');
		 ModeratorPermission(casper,'p_edit_post',false,2,function(err,href){
			if(!err){
				casper.waitForSelector('a[href="'+href+'"]',function success(){
					casper.click('a[href="'+href+'"]');
					casper.waitForSelector('i.glyphicon.glyphicon-chevron-down',function sucess(){
						casper.click('i.glyphicon.glyphicon-chevron-down');
						casper.test.assertDoesntExist('a#edit_post_request');
						casper.echo('Message:Post is Not Editable','INFO');;
						DeleteTopic(casper,href,function(err){
							if(!err){
								casper.echo('*******************************Case-11********************************', 'INFO');
								casper.echo('*******************************Successfully Verified********************************', 'INFO');
							}
						});
						},function fail(){
							casper.echo('Unable to Click on Dropdown','ERROR');
					});
					},function fail(){
						casper.echo('Unable to Click on Dropdown','ERROR');	
				}); 
			}
		});
	});
	
	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('*******************************Case-12********************************', 'INFO');
		casper.echo('*******************************Enable Delete Post********************************', 'INFO');
		casper.echo('Verify by delete post/topic from category(cat1)', 'INFO');
		 ModeratorPermission(casper,'p_delete_post',true,1,function(err,href){
			if(!err){
				casper.waitForSelector('a[href="'+href+'"]',function success(){
					casper.click('a[href="'+href+'"]');
					casper.waitForSelector('i.glyphicon.glyphicon-chevron-down',function sucess(){
						casper.click('i.glyphicon.glyphicon-chevron-down');
						casper.test.assertExists('a[id^="delete_first_post"]');
						casper.click('a[id^="delete_first_post"]');
						casper.echo('Message:Post is Deleted Successfully','INFO');
						casper.wait(7000,function(){
								casper.capture('111118.png');
								forumLogin.logoutFromApp(casper, function(){
										casper.waitForSelector('a#td_tab_login',function success(){
											casper.capture('wxyz.png');
											casper.echo('Successfully logout from application', 'INFO');
											casper.echo('*******************************Case-12********************************', 'INFO');
											casper.echo('*******************************Successfully Verified********************************', 'INFO');
											},function fail(){
												casper.echo('Unable to Successfully logout from application', 'ERROR');
										});
								});
						});
						},function fail(){
							casper.echo('Unable to Click on Dropdown','ERROR');
					});
					},function fail(){
						casper.echo('Unable to Click on Dropdown','ERROR');	
				}); 
			}
		});
	});

	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('*******************************Case-13********************************', 'INFO');
		casper.echo('*******************************Enable Delete Post********************************', 'INFO');
		casper.echo('Verify by delete post/topic from other category', 'INFO');
		 ModeratorPermission(casper,'p_delete_post',true,2,function(err,href){
			if(!err){
				casper.waitForSelector('a[href="'+href+'"]',function success(){
					casper.click('a[href="'+href+'"]');
					casper.waitForSelector('i.glyphicon.glyphicon-chevron-down',function sucess(){
						casper.click('i.glyphicon.glyphicon-chevron-down');
						casper.test.assertDoesntExist('a[id^="delete_first_post"]');
						casper.echo('Message:Post cannot be deleted','INFO');
						DeleteTopic(casper,href,function(err){
							if(!err){
								casper.echo('*******************************Case-13********************************', 'INFO');
								casper.echo('*******************************Successfully Verified********************************', 'INFO');
							}
						});
						},function fail(){
							casper.echo('Unable to Click on Dropdown','ERROR');
					});
					},function fail(){
						casper.echo('Href of topic doesnot found','ERROR');	
				}); 
			}
		});
	});
	casper.thenOpen(config.url,function() {
		this.capture('109.png');
	});

	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('*******************************Case-14********************************', 'INFO');
		casper.echo('*******************************Enable Delete Post********************************', 'INFO');
		casper.echo('verify with delete post from cat1 by select one/all post/topic by check box', 'INFO');
		 ModeratorPermission(casper,'p_delete_post',true,1,function(err,href){
			if(!err){
				checkbox_checked(href,function(){
					if(!err){
						casper.waitForSelector('div#topics-menu.hover-menu.open', function success() {
							casper.capture('999.png');
							casper.test.assertExists('i.glyphicon.glyphicon-trash');
							casper.click('i.glyphicon.glyphicon-trash');
							casper.echo('Message:Post is Deleted Successfully','INFO');
							casper.wait(7000,function(){
								forumLogin.logoutFromApp(casper, function(){
										casper.waitForSelector('a#td_tab_login',function success(){
											casper.echo('Successfully logout from application', 'INFO');
											casper.echo('*******************************Case-14********************************', 'INFO');
											casper.echo('*******************************Successfully Verified********************************', 'INFO');
											},function fail(){
												casper.echo('Unable to Successfully logout from application', 'ERROR');
										});
								});
							});
							},function fail(){
								casper.echo('Check doesnot check Successfully','ERROR');
						});
					}

				});
			}
		});
	});
	
	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('*******************************Case-15********************************', 'INFO');
		casper.echo('*******************************Disable Delete Post********************************', 'INFO');
		casper.echo('Verify by delete post/topic from category(cat1)', 'INFO');
		 ModeratorPermission(casper,'p_delete_post',false,1,function(err,href){
			if(!err){
				casper.waitForSelector('a[href="'+href+'"]',function success(){
					casper.click('a[href="'+href+'"]');
					casper.waitForSelector('i.glyphicon.glyphicon-chevron-down',function sucess(){
						casper.click('i.glyphicon.glyphicon-chevron-down');
						casper.test.assertDoesntExist('a[id^="delete_first_post"]');
						casper.echo('Message:Post cannot be deleted','INFO');
						DeleteTopic1(caspe,href,function(err){
							if(!err){
								casper.echo('*******************************Case-15********************************', 'INFO');

								casper.echo('*******************************Successfully Verified********************************', 'INFO');

							}

						});
						},function fail(){
							casper.echo('Unable to Click on Dropdown','ERROR');
					});
					},function fail(){
						casper.echo('Href of topic doesnot found','ERROR');	
				}); 
			}
		});
	});

	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('*******************************Case-16********************************', 'INFO');
		casper.echo('*******************************Disable Delete Post********************************', 'INFO');
		casper.echo('Verify by delete post/topic from other category', 'INFO');
		 ModeratorPermission(casper,'p_delete_post',false,2,function(err,href){
			if(!err){
				casper.waitForSelector('a[href="'+href+'"]',function success(){
					casper.click('a[href="'+href+'"]');
					casper.waitForSelector('i.glyphicon.glyphicon-chevron-down',function sucess(){
						casper.click('i.glyphicon.glyphicon-chevron-down');
						casper.test.assertDoesntExist('a[id^="delete_first_post"]');
						casper.echo('Message:Post cannot be deleted','INFO');
						DeleteTopic(casper,href,function(err){
							if(!err){
								casper.echo('*******************************Case-16********************************', 'INFO');
								casper.echo('*******************************Successfully Verified********************************', 'INFO');
							}
						});
						},function fail(){
							casper.echo('Unable to Click on Dropdown','ERROR');
					});
					},function fail(){
						casper.echo('Href of topic doesnot found','ERROR');	
				}); 
			}
		});
	});

	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('*******************************Case-17********************************', 'INFO');
		casper.echo('*******************************Enable Move Topic/Post*****************', 'INFO');
		casper.echo('Verify by move post/topic from category(cat1)', 'INFO');
		 ModeratorPermission(casper,'p_move_post',true,1,function(err,href){
			if(!err){
				casper.waitForSelector('a[href="'+href+'"]',function success(){
					casper.click('a[href="'+href+'"]');
					casper.waitForSelector('a span.caret',function sucess(){      						
						casper.click('a span.caret');
						casper.test.assertExists('a[href^="/mbactions/move"]');
						casper.click('a[href^="/mbactions/move"]');
						casper.waitForSelector('select#move_threads_dropdown',function success(){
							var category = casper.evaluate(function() {
										var cat = document.querySelector('select[name="moveto"]');			
										return cat[1].value;
 							});
							casper.fill('form[name="admindd"]',{
									'moveto': category
							},false);
							casper.test.assertExists('form[name="admindd"] button');
							casper.click('form[name="admindd"] button');
							casper.wait(5000,function(){
								casper.thenOpen(config.url+'?forum='+category,function(){
									casper.waitForSelector('span.topic-content a',function success(){
										casper.test.assertExists('a[href="'+ href +'"]');	
										casper.echo('Message:Post is Successfully moved','INFO');	
										DeleteTopic(casper,href,function(err){
											if(!err){
												casper.echo('*******************************Case-17********************************', 'INFO');
												casper.echo('*******************************Successfully Verified******************', 'INFO');
											}									});																									
										},function fail(){
											casper.echo('Topics of this category deoesnot open Successfully','ERROR');
									});
								});
							});
							},function fail(){
								casper.echo('Unable to open form to move topic','ERROR');
						});
						},function fail(){
							casper.echo('Shield Icon Doesnt Exists','ERROR');
					});
					},function fail(){
						casper.echo('Href of topic doesnot found','ERROR');	
				}); 
			}
		});
	});

	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('*******************************Case-18********************************', 'INFO');
		casper.echo('*******************************Enable Move Post********************************', 'INFO');
		casper.echo('Verify by move post/topic from other category', 'INFO');
		 ModeratorPermission(casper,'p_move_post',true,2,function(err,href){
			if(!err){
				casper.waitForSelector('a[href="'+href+'"]',function success(){
					casper.click('a[href="'+href+'"]');
					casper.waitForSelector('div#posts-list',function success(){
						casper.test.assertDoesntExist('i.icon.icon-shield');
						casper.echo('Shield Icon is not Visible','INFO');
						DeleteTopic(casper,href,function(err){
							if(!err){
								casper.echo('*******************************Case-18********************************', 'INFO');
								casper.echo('*******************************Successfully Verified********************************', 'INFO');
							}
						});
						},function fail(){
							this.echo('Unable to open post of this topic','ERROR');
					});
					},function fail(){
						casper.echo('Href of topic doesnot found','ERROR');	
				}); 
			}
		});
	});

	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('*******************************Case-19****************************************************************', 'INFO');
		casper.echo('*******************************Enable Move Post********************************', 'INFO');
		casper.echo('verify with Move post from cat1 by select one/all post/topic by check box', 'INFO');
		 ModeratorPermission(casper,'p_move_post',true,1,function(err,href){
			if(!err){
				checkbox_checked(href,function(){
					if(!err){
						casper.waitForSelector('div#topics-menu.hover-menu.open', function success() {
							casper.capture('999.png');
							casper.test.assertExists('i.glyphicon.glyphicon-right-arrow');
							casper.click('i.glyphicon.glyphicon-right-arrow');
							casper.waitForSelector('form[name=admindd]',function success(){											
								var category = casper.evaluate(function() {
											var cat = document.querySelector('select[name="moveto"]');			
											return cat[1].value;
								});
								casper.fill('form[name="admindd"]',{
										'moveto': category
								},false);
								casper.test.assertExists('form[name="admindd"] button');
								casper.click('form[name="admindd"] button');
								casper.wait(5000,function(){
									casper.thenOpen(config.url+'?forum='+category,function(){
										casper.waitForSelector('span.topic-content a',function success(){
											casper.test.assertExists('a[href="'+ href +'"]');	
											casper.echo('Message:Post is Successfully moved','INFO');	
											DeleteTopic(casper,href,function(err){
												if(!err){
													casper.echo('*******************************Case-19********************************', 'INFO');
													casper.echo('*******************************Successfully Verified******************', 'INFO');
												}									});																									
											},function fail(){
												casper.echo('Topics of this category deoesnot open Successfully','ERROR');
										});
									});
								});
							},function fail(){
								casper.echo('Unable to open form to Move post');
						});
						},function fail(){
							casper.echo('Check doesnot check Successfully','ERROR');
					});
				}
			});
		}	
		});
	});

	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('*******************************Case-20******************************************', 'INFO');
		casper.echo('*******************************Disable Move Post********************************', 'INFO');
		casper.echo('Verify by move post/topic from category(cat1)', 'INFO');
		 ModeratorPermission(casper,'p_move_post',false,1,function(err,href){
			if(!err){
				casper.waitForSelector('a[href="'+href+'"]',function success(){
					casper.click('a[href="'+href+'"]');
					casper.waitForSelector('a span.caret',function sucess(){      							casper.click('a span.caret');
						casper.test.assertDoesntExist('a[href^="/mbactions/move"]');
						casper.echo('Message:Topic cannot be moved','INFO');
						casper.then(function(){
							forumLogin.logoutFromApp(casper, function(){
								casper.waitForSelector('a#td_tab_login',function success(){
									casper.echo('Successfully logout from application', 'INFO');
									casper.echo('*******************************Case-20********************************', 'INFO');
									casper.echo('*******************************Successfully Verified********************************', 'INFO');
									},function fail(){
										casper.echo('Unable to Successfully logout from application', 'INFO');
								});
							});
						});
						},function fail(){
							casper.echo('Shield Icon is not Visible','ERROR');
					});
					},function fail(){
						casper.echo('Href of topic doesnot found','ERROR');	
				}); 
			}
		});
	});	

	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('*******************************Case-21******************************************', 'INFO');
		casper.echo('*******************************Disable Move Post********************************', 'INFO');
		casper.echo('Verify by move post/topic from other category', 'INFO');
		 ModeratorPermission(casper,'p_move_post',false,2,function(err,href){
			if(!err){
				casper.waitForSelector('a[href="'+href+'"]',function success(){
					casper.click('a[href="'+href+'"]');
					casper.waitForSelector('div#posts-list',function sucess(){      	
						casper.test.assertDoesntExist('a span.caret');
						casper.echo('Message:Shield Icon is not Visible','INFO');
						casper.then(function(){
							forumLogin.logoutFromApp(casper, function(){
								casper.waitForSelector('a#td_tab_login',function success(){
									casper.echo('Successfully logout from application', 'INFO');
									casper.echo('*******************************Case-21********************************', 'INFO');
									casper.echo('*******************************Successfully Verified********************************', 'INFO');
									},function fail(){
										casper.echo('Unable to Successfully logout from application', 'INFO');
								});
							});
						});
						},function fail(){
							casper.echo('Post of this topic Doesnt Open Successfully','ERROR');
					});
					},function fail(){
						casper.echo('Href of topic doesnot found','ERROR');	
				}); 
			}
		});
<<<<<<< HEAD
	});

	casper.thenOpen(config.backEndUrl,function() {
=======
	});*/

	/*casper.thenOpen(config.backEndUrl,function() {
>>>>>>> f1d4d24c0f595dafede98b0088be17bcd846af5a
		casper.echo('*******************************Case-22******************************************', 'INFO');
		casper.echo('*******************************Disable Move Post********************************', 'INFO');
		casper.echo('verify with Move post from cat1 by select one/all post/topic by check box', 'INFO');
		 ModeratorPermission(casper,'p_move_post',false,1,function(err,href){
			if(!err){
				checkbox_checked(href,function(){
					if(!err){
						casper.waitForSelector('div#topics-menu.hover-menu.open', function success() {
							casper.test.assertDoesntExist('a#move');
							casper.echo('Message:Post cannot moved','INFO');
							DeleteTopic(casper,href,function(err){
								if(!err){
									casper.echo('*******************************Case-22********************************', 'INFO');
									casper.echo('*******************************Successfully Verified******************', 'INFO');
									}									
							});
							},function fail(){
								casper.echo('Checkbox doesnot check Successfully','ERROR');
						});
					}
				});
			}	
		});
	});

	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('*******************************Case-23********************************', 'INFO');
		casper.echo('*******************************Enable Lock Topic/Post*****************', 'INFO');
		casper.echo('Verify by lock post/topic from category(cat1)', 'INFO');
		 ModeratorPermission(casper,'p_lock_threads',true,1,function(err,href){
			if(!err){
				casper.waitForSelector('a[href="'+href+'"]',function success(){
					casper.click('a[href="'+href+'"]');
					casper.waitForSelector('a span.caret',function sucess(){      						
						casper.click('a span.caret');
						casper.test.assertExists('a[href^="/mbactions/lock?id="]');
						casper.click('a[href^="/mbactions/lock?id="]');
						casper.waitForSelector('div.alert.alert-warning.text-center',function success(){
							casper.echo('Message:'+ casper.fetchText('div.alert.alert-warning.text-center').trim(),'INFO');
							DeleteTopic(casper,href,function(err){
								if(!err){
									casper.echo('*******************************Case-22********************************', 'INFO');
									casper.echo('*******************************Successfully Verified******************', 'INFO');
								}									
							});
							},function fail(){
								casper.echo('Topic is not Locked','ERROR');
						});
						},function fail(){
							casper.echo('Shield Icon Doesnt Exists','ERROR');
					});
					},function fail(){
						casper.echo('Href of topic doesnot found','ERROR');	
				}); 
			}
		});
	});

	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('*******************************Case-24********************************', 'INFO');
		casper.echo('*******************************Enable Lock Topic/Post*****************', 'INFO');
		casper.echo('Verify by lock post/topic from other category', 'INFO');
		 ModeratorPermission(casper,'p_lock_threads',true,2,function(err,href){
			if(!err){
				casper.waitForSelector('a[href="'+href+'"]',function success(){
					casper.click('a[href="'+href+'"]');
					casper.waitForSelector('div#posts-list',function success(){
						casper.test.assertDoesntExist('i.icon.icon-shield');
						casper.echo('Message:Shield Icon is not Visible','INFO');
						DeleteTopic(casper,href,function(err){
							if(!err){
								casper.echo('*******************************Case-24********************************', 'INFO');
								casper.echo('*******************************Successfully Verified********************************', 'INFO');
							}
						});
						},function fail(){
							this.echo('Unable to open post of this topic','ERROR');
					});
					},function fail(){
						casper.echo('Href of topic doesnot found','ERROR');	
				}); 
			}
		});
	});

	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('*******************************Case-25********************************', 'INFO');
		casper.echo('*******************************Disable Lock Topic/Post*****************', 'INFO');
		casper.echo('Verify by lock post/topic from category(cat1)', 'INFO');
		 ModeratorPermission(casper,'p_lock_threads',false,1,function(err,href){
			if(!err){
				casper.waitForSelector('a[href="'+href+'"]',function success(){
					casper.click('a[href="'+href+'"]');
					casper.waitForSelector('a span.caret',function sucess(){      						
						casper.click('a span.caret');
						casper.test.assertDoesntExist('a[href^="/mbactions/lock?id="]');
						casper.echo('Message:There is no option for lock topic','INFO');
						DeleteTopic(casper,href,function(err){
							if(!err){
								casper.echo('*******************************Case-25********************************', 'INFO');
								casper.echo('*******************************Successfully Verified********************************', 'INFO');
							}
						});
						},function fail(){
							casper.echo('Shield Icon Doesnt Exists','ERROR');
					});
					},function fail(){
						casper.echo('Href of topic doesnot found','ERROR');	
				}); 
			}
		});
	});

	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('*******************************Case-26********************************', 'INFO');
		casper.echo('*******************************Disable Lock Topic/Post*****************', 'INFO');
		casper.echo('Verify by lock post/topic from other category', 'INFO');
		 ModeratorPermission(casper,'p_lock_threads',true,2,function(err,href){
			if(!err){
				casper.waitForSelector('a[href="'+href+'"]',function success(){
					casper.click('a[href="'+href+'"]');
					casper.waitForSelector('div#posts-list',function success(){
						casper.test.assertDoesntExist('i.icon.icon-shield');
						casper.echo('Message:Shield Icon is not Visible','INFO');
						DeleteTopic(casper,href,function(err){
							if(!err){
								casper.echo('*******************************Case-26********************************', 'INFO');
								casper.echo('*******************************Successfully Verified********************************', 'INFO');
							}
						});
						},function fail(){
							this.echo('Unable to open post of this topic','ERROR');
					});
					},function fail(){
						casper.echo('Href of topic doesnot found','ERROR');	
				}); 
			}
		});
	});

	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('*******************************Case-27********************************', 'INFO');
		casper.echo('*******************************Enable Pin Topic/Post*****************', 'INFO');
		casper.echo('Verify by pin post/topic from category(cat1)', 'INFO');
		 ModeratorPermission(casper,'p_pin_threads',true,1,function(err,href){
			if(!err){
				casper.waitForSelector('a[href="'+href+'"]',function success(){
					casper.click('a[href="'+href+'"]');
					casper.waitForSelector('a span.caret',function sucess(){     
						casper.click('a span.caret'); 						
						casper.test.assertExist('a[href^="/mbactions/pin?id="]');
						casper.click('a[href^="/mbactions/pin?id="]');
						casper.wait(5000,function(){
							casper.click('a span.caret'); 	
							casper.test.assertExist('a[href^="/mbactions/unpin?id="]');
							casper.echo('Message:Topic is pinned','INFO');
							DeleteTopic(casper,href,function(err){
								if(!err){
									casper.echo('*******************************Case-27********************************', 'INFO');
									casper.echo('*******************************Successfully Verified********************************', 'INFO');
								}
							});
						});
						},function fail(){
							casper.echo('Shield Icon Doesnt Exists','ERROR');
					});
					},function fail(){
						casper.echo('Href of topic doesnot found','ERROR');	
				}); 
			}
		});
	});

	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('*******************************Case-28********************************', 'INFO');
		casper.echo('*******************************Enable pin Topic/Post*****************', 'INFO');
		casper.echo('Verify by pin post/topic from other category', 'INFO');
		 ModeratorPermission(casper,'p_pin_threads',true,2,function(err,href){
			if(!err){
				casper.waitForSelector('a[href="'+href+'"]',function success(){
					casper.click('a[href="'+href+'"]');
					casper.waitForSelector('div#posts-list',function success(){
						casper.test.assertDoesntExist('i.icon.icon-shield');
						casper.echo('Message:Shield Icon is not Visible','INFO');
						DeleteTopic(casper,href,function(err){
							if(!err){
								casper.echo('*******************************Case-28********************************', 'INFO');
								casper.echo('*******************************Successfully Verified********************************', 'INFO');
							}
						});
						},function fail(){
							this.echo('Unable to open post of this topic','ERROR');
					});
					},function fail(){
						casper.echo('Href of topic doesnot found','ERROR');	
				}); 
			}
		});
	});

	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('*******************************Case-29******************************************', 'INFO');
		casper.echo('*******************************Enable pin topic********************************', 'INFO');
		casper.echo('verify with pin post/topic from cat1 by select one/all post/topic by check box', 'INFO');
		 ModeratorPermission(casper,'p_pin_threads',true,1,function(err,href){
			if(!err){
				checkbox_checked(href,function(){
					if(!err){
						casper.waitForSelector('div#topics-menu.hover-menu.open', function success() {
							casper.test.assertExists('i.icon.glyphicon-pushpin');
							casper.click('i.icon.glyphicon-pushpin');
							casper.test.assertExists('a#pin');
							casper.click('a#pin');
							casper.wait(5000,function(){
								casper.click('i.icon.icon-menu');
								casper.capture('11111.png');
								casper.click('li#latest_topics_show');
								casper.waitForSelector('a[href="'+href+'"]',function success(){
									casper.click('a[href="'+href+'"]');
									casper.waitForSelector('a span.caret',function sucess(){     
										casper.click('a span.caret'); 					
										casper.test.assertExist('a[href^="/mbactions/unpin?id="]');
										casper.echo('Message:Topic is pinned','INFO');
										DeleteTopic(casper,href,function(err){
											if(!err){
												casper.echo('*******************************Case-29********************************', 'INFO');
												casper.echo('*******************************Successfully Verified********************************', 'INFO');
											}
										});		
										},function fail(){
											casper.echo('Shield Icon Doesnt Exists','ERROR');
									});
									},function fail(){
										casper.echo('Href of topic doesnot found','ERROR');	
								}); 
							});
							
							},function fail(){
								casper.echo('Floating menu doesnot Appears','ERROR');
						});
					}
				});
			}	
		});
	});

	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('*******************************Case-30********************************', 'INFO');
		casper.echo('*******************************Disable Pin Topic/Post*****************', 'INFO');
		casper.echo('Verify by pin post/topic from category(cat1)', 'INFO');
		 ModeratorPermission(casper,'p_pin_threads',false,1,function(err,href){
			if(!err){
				casper.waitForSelector('a[href="'+href+'"]',function success(){
					casper.click('a[href="'+href+'"]');
					casper.waitForSelector('a span.caret',function sucess(){     
						casper.click('a span.caret'); 						
						casper.test.assertDoesntExist('a[href^="/mbactions/pin?id="]');
						casper.echo('Message:Pin option is not available','INFO');
						DeleteTopic(casper,href,function(err){
							if(!err){
								casper.echo('*******************************Case-30********************************', 'INFO');
								casper.echo('*******************************Successfully Verified********************************', 'INFO');
							}
						});
						},function fail(){
							casper.echo('Shield Icon Doesnt Exists','ERROR');
					});
					},function fail(){
						casper.echo('Href of topic doesnot found','ERROR');	
				}); 
			}
		});
	});
	
	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('*******************************Case-31********************************', 'INFO');
		casper.echo('*******************************Disable pin Topic/Post*****************', 'INFO');
		casper.echo('Verify by pin post/topic from other category', 'INFO');
		 ModeratorPermission(casper,'p_pin_threads',false,2,function(err,href){
			if(!err){
				casper.waitForSelector('a[href="'+href+'"]',function success(){
					casper.click('a[href="'+href+'"]');
					casper.waitForSelector('div#posts-list',function success(){
						casper.test.assertDoesntExist('i.icon.icon-shield');
						casper.echo('Message:Shield Icon is not Visible','INFO');
						DeleteTopic(casper,href,function(err){
							if(!err){
								casper.echo('*******************************Case-31********************************', 'INFO');
								casper.echo('*******************************Successfully Verified********************************', 'INFO');
							}
						});
						},function fail(){
							this.echo('Unable to open post of this topic','ERROR');
					});
					},function fail(){
						casper.echo('Href of topic doesnot found','ERROR');	
				}); 
			}
		});
	});

	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('*******************************Case-32******************************************', 'INFO');
		casper.echo('*******************************Disable pin topic********************************', 'INFO');
		casper.echo('verify with pin post/topic from cat1 by select one/all post/topic by check box', 'INFO');
		 ModeratorPermission(casper,'p_pin_threads',false,1,function(err,href){
			if(!err){
				checkbox_checked(href,function(){
					if(!err){
						casper.waitForSelector('div#topics-menu.hover-menu.open', function success() {
							casper.test.assertDoesntExist('i.icon.glyphicon-pushpin','INFO');
							casper.echo('Message:Pin option is not available','INFO');
							DeleteTopic(casper,href,function(err){
								if(!err){
									casper.echo('*******************************Case-32********************************', 'INFO');
									casper.echo('*******************************Successfully Verified********************************', 'INFO');
								}
							});
							},function fail(){
								casper.echo('Checkbox doesnot check Successfully','ERROR');
						});
					}
				});
			}	
		});
	});


	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('*******************************Case-33********************************', 'INFO');
		casper.echo('*******************************Enable Add poll Topic/Post*****************', 'INFO');
		casper.echo('verify create a poll on a topic of cat1 from the Shield icon','INFO'); 
		 ModeratorPermission(casper,'p_poll_add',true,1,function(err,href){
			if(!err){
				casper.waitForSelector('a[href="'+href+'"]',function success(){
					casper.click('a[href="'+href+'"]');
					casper.waitForSelector('a span.caret',function sucess(){     
						casper.click('a span.caret'); 						
						casper.test.assertExist('a[href^="/poll/polladd?id="]');
						casper.click('a[href^="/poll/polladd?id="]');
						casper.waitForSelector('form#formEditPoll',function success(){
<<<<<<< HEAD
							casper.sendKeys('#poll_question',  json['AddPoll'].pollQues, {reset:true});
							casper.sendKeys('input[name="public"]',json['AddPoll'].publicCheckbox);
							casper.sendKeys('#poll_option_1 div input',json['AddPoll'].option1, {reset:true});
							casper.sendKeys('#poll_option_2 div input', json['AddPoll'].option2, {reset:true});
=======
							casper.sendKeys('#poll_question', 'Are you happy', {reset:true});
							casper.sendKeys('input[name="public"]',false);
							casper.sendKeys('#poll_option_1 div input','Yes', {reset:true});
							casper.sendKeys('#poll_option_2 div input', 'No', {reset:true});
>>>>>>> f1d4d24c0f595dafede98b0088be17bcd846af5a
							casper.click('#save_poll');
							casper.waitForSelector('input[name="pollvotesave"]',function success(){
								casper.capture('1a.png');
								casper.echo('Message:Poll Added Successfully','INFO');
								DeleteTopic(casper,href,function(err){
									if(!err){
										casper.echo('*******************************Case-33********************************', 'INFO');
										casper.echo('*******************************Successfully Verified********************************', 'INFO');
									}
								});
								},function fail(){
							});
							},function fail(){
						});
						},function fail(){
							casper.echo('Shield Icon Doesnt Exists','ERROR');
					});
					},function fail(){
						casper.echo('Href of topic doesnot found','ERROR');	
				}); 
			}
		});
	});

	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('*******************************Case-34********************************', 'INFO');
		casper.echo('*******************************Enable Add poll Topic/Post*****************', 'INFO');
		casper.echo('verify create a poll on a topic of other category from the Shield icon', 'INFO');
		 ModeratorPermission(casper,'p_poll_add',true,2,function(err,href){
			if(!err){
				casper.waitForSelector('a[href="'+href+'"]',function success(){
					casper.click('a[href="'+href+'"]');
					casper.waitForSelector('div#posts-list',function success(){
						casper.test.assertDoesntExist('i.icon.icon-shield');
						casper.echo('Message:Shield Icon is not Visible','INFO');
						DeleteTopic(casper,href,function(err){
							if(!err){
								casper.echo('*******************************Case-34********************************', 'INFO');
								casper.echo('*******************************Successfully Verified********************************', 'INFO');
							}
						});
						},function fail(){
							this.echo('Unable to open post of this topic','ERROR');
					});
					},function fail(){
						casper.echo('Href of topic doesnot found','ERROR');	
				}); 
			}
		});
	});

	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('*******************************Case-35********************************', 'INFO');
		casper.echo('*******************************Disable Add poll Topic/Post*****************', 'INFO');
		casper.echo('Verify by add poll on a topic from category(cat1) from shield icon', 'INFO');
		 ModeratorPermission(casper,'p_poll_add',false,1,function(err,href){
			if(!err){
				casper.waitForSelector('a[href="'+href+'"]',function success(){
					casper.click('a[href="'+href+'"]');
					casper.waitForSelector('a span.caret',function sucess(){     
						casper.click('a span.caret'); 						
						casper.test.assertDoesntExist('a[href^="/poll/polladd?id="]');
						casper.echo('Message:Add poll option is not available','INFO');
						DeleteTopic(casper,href,function(err){
							if(!err){
								casper.echo('*******************************Case-35********************************', 'INFO');
								casper.echo('*******************************Successfully Verified********************************', 'INFO');
							}
						});
						},function fail(){
							casper.echo('Shield Icon Doesnt Exists','ERROR');
					});
					},function fail(){
						casper.echo('Href of topic doesnot found','ERROR');	
				}); 
			}
		});
	});

	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('*******************************Case-36********************************', 'INFO');
		casper.echo('*******************************Enable edit poll Topic/Post*****************', 'INFO');
		casper.echo('Verify by edit poll on a topic from category(cat1) from shield icon', 'INFO');
		AddPoll=1;
		 ModeratorPermission(casper,'p_poll_edit',true,1,function(err,href){
			if(!err){
				casper.waitForSelector('a[href="'+href+'"]',function success(){
					casper.click('a[href="'+href+'"]');
					casper.waitForSelector('a span.caret',function sucess(){  
						casper.click('a.dropdown-toggle.text-muted i.glyphicon.glyphicon-chevron-down'); 	
						casper.test.assertExists('a[href^="/poll/polledit?id="]');
						casper.echo('Message:poll is editable','INFO');
						DeleteTopic(casper,href,function(err){
							if(!err){
								casper.echo('*******************************Case-36********************************', 'INFO');
								casper.echo('*******************************Successfully Verified********************************', 'INFO');
							}
						});
						},function fail(){
							casper.echo('Shield Icon Doesnt Exists','ERROR');
					});
					},function fail(){
						casper.echo('Href of topic doesnot found','ERROR');	
				}); 
			}
		});
	});

	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('*******************************Case-37********************************', 'INFO');
		casper.echo('*******************************Enable edit poll Topic/Post*****************', 'INFO');
		casper.echo('Verify by edit poll on a topic from other category from shield icon', 'INFO');
		AddPoll=1;
		 ModeratorPermission(casper,'p_poll_edit',true,2,function(err,href){
			if(!err){
				casper.waitForSelector('a[href="'+href+'"]',function success(){
					casper.click('a[href="'+href+'"]');
					casper.waitForSelector('div#posts-list',function sucess(){   	
						casper.test.assertDoesntExist('a.dropdown-toggle.text-muted i.glyphicon.glyphicon-chevron-down');
						casper.echo('Message:poll is there is no poll dropdown','INFO');
						DeleteTopic(casper,href,function(err){
							if(!err){
								casper.echo('*******************************Case-37********************************', 'INFO');
								casper.echo('*******************************Successfully Verified********************************', 'INFO');
							}

						});
						},function fail(){
							casper.echo('Shield Icon Doesnt Exists','ERROR');
					});
					},function fail(){
						casper.echo('Href of topic doesnot found','ERROR');	
				}); 
			}
		});

	});

	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('*******************************Case-38********************************', 'INFO');
		casper.echo('*******************************Enable edit poll Topic/Post*****************', 'INFO');
		casper.echo('Verify by edit poll on a topic from category(cat1) from shield icon', 'INFO');
		AddPoll=1;
		 ModeratorPermission(casper,'p_poll_edit',false,1,function(err,href){
			if(!err){
				casper.waitForSelector('a[href="'+href+'"]',function success(){
					casper.click('a[href="'+href+'"]');
					casper.waitForSelector('a span.caret',function sucess(){  
						casper.click('a.dropdown-toggle.text-muted i.glyphicon.glyphicon-chevron-down'); 	
						casper.test.assertDoesntExist('a[href^="/poll/polledit?id="]');
						casper.echo('Message:poll is not editable','INFO');
						DeleteTopic(casper,href,function(err){
							if(!err){
								casper.echo('*******************************Case-38********************************', 'INFO');
								casper.echo('*******************************Successfully Verified********************************', 'INFO');
							}
						});
						},function fail(){
							casper.echo('Shield Icon Doesnt Exists','ERROR');
					});
					},function fail(){
						casper.echo('Href of topic doesnot found','ERROR');	
				}); 
			}
		});
	});

	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('*******************************Case-39********************************', 'INFO');
		casper.echo('*******************************Enable edit poll Topic/Post*****************', 'INFO');
		casper.echo('Verify by edit poll on a topic from other category from shield icon', 'INFO');
		AddPoll=1;
		 ModeratorPermission(casper,'p_poll_edit',false,2,function(err,href){
			if(!err){
				casper.waitForSelector('a[href="'+href+'"]',function success(){
					casper.click('a[href="'+href+'"]');
					casper.waitForSelector('div#posts-list',function sucess(){   	
						casper.test.assertDoesntExist('a.dropdown-toggle.text-muted i.glyphicon.glyphicon-chevron-down');
						casper.echo('Message:poll is there is no poll dropdown','INFO');
						DeleteTopic(casper,href,function(err){
							if(!err){
								casper.echo('*******************************Case-39********************************', 'INFO');
								casper.echo('*******************************Successfully Verified********************************', 'INFO');
							}
						});
						},function fail(){
							casper.echo('Shield Icon Doesnt Exists','ERROR');
					});
					},function fail(){
						casper.echo('Href of topic doesnot found','ERROR');	
				}); 
			}
		});
	});


	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('*******************************Case-40********************************', 'INFO');
		casper.echo('*******************************Enable Delete poll Topic/Post*****************', 'INFO');
		casper.echo('Verify by Delete poll on a topic from category(cat1) from shield icon', 'INFO');
		AddPoll=1;
		 ModeratorPermission(casper,'p_poll_delete',true,1,function(err,href){
			if(!err){
				casper.waitForSelector('a[href="'+href+'"]',function success(){
					casper.click('a[href="'+href+'"]');
					casper.waitForSelector('a span.caret',function sucess(){  
						casper.click('a.dropdown-toggle.text-muted i.glyphicon.glyphicon-chevron-down'); 	
						casper.test.assertExists('a[href^="/poll/polldelete"]');
						casper.capture('19898.png');
						casper.click('a[href^="/poll/polldelete"]');
						casper.then(function(){
							casper.echo('Message:poll is deleted','INFO');
							DeleteTopic(casper,href,function(err){
								if(!err){
									casper.echo('*******************************Case-40********************************', 'INFO');
									casper.echo('*******************************Successfully Verified********************************', 'INFO');
								}
							});
						});
						
						},function fail(){
							casper.echo('Shield Icon Doesnt Exists','ERROR');
					});
					},function fail(){
						casper.echo('Href of topic doesnot found','ERROR');	
				}); 
			}
		});
	});

	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('*******************************Case-41********************************', 'INFO');
		casper.echo('*******************************Enable Delete poll Topic/Post*****************', 'INFO');
		casper.echo('Verify by edit poll on a topic from other category from shield icon', 'INFO');
		AddPoll=1;
		 ModeratorPermission(casper,'p_poll_delete',true,2,function(err,href){
			if(!err){
				casper.waitForSelector('a[href="'+href+'"]',function success(){
					casper.click('a[href="'+href+'"]');
					casper.waitForSelector('div#posts-list',function sucess(){   	
						casper.test.assertDoesntExist('a.dropdown-toggle.text-muted i.glyphicon.glyphicon-chevron-down');
						casper.echo('Message:poll is there is no poll dropdown','INFO');
						DeleteTopic(casper,href,function(err){
							if(!err){
								casper.echo('*******************************Case-37********************************', 'INFO');
								casper.echo('*******************************Successfully Verified********************************', 'INFO');
							}
						});
						},function fail(){
							casper.echo('Shield Icon Doesnt Exists','ERROR');
					});
					},function fail(){
						casper.echo('Href of topic doesnot found','ERROR');	
				}); 
			}
		});
	});

	//This is for reassigning a editing poll permission to a moderator  
	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('*******************************Changing Editing poll permission in order to show poll dropdown*****************', 'INFO');
		casper.then(function(){
			change_permission(casper,'p_poll_edit',true,function(err){
				if(!err){
					casper.echo('Now Moderator have again Edit poll Moderator Permission','INFO');
				}
			});
		});
	});

	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('*******************************Case-42********************************', 'INFO');
		casper.echo('*******************************Disable Delete poll Topic/Post*****************', 'INFO');
		casper.echo('Verify by Delete poll on a topic from category(cat1) from shield icon', 'INFO');
		AddPoll=1;
		 ModeratorPermission(casper,'p_poll_delete',false,1,function(err,href){
			if(!err){
				casper.waitForSelector('a[href="'+href+'"]',function success(){
					casper.click('a[href="'+href+'"]');
					casper.waitForSelector('a span.caret',function sucess(){  
						casper.click('a.dropdown-toggle.text-muted i.glyphicon.glyphicon-chevron-down'); 	
						casper.test.assertDoesntExist('a[href^="/poll/polldelete"]');
						casper.echo('Message:There is no delete poll option','INFO');
						DeleteTopic(casper,href,function(err){
							if(!err){
								casper.echo('*******************************Case-42********************************', 'INFO');
								casper.echo('*******************************Successfully Verified********************************', 'INFO');
							}
						});
						},function fail(){
							casper.echo('Shield Icon Doesnt Exists','ERROR');
					});
					},function fail(){
						casper.echo('Href of topic doesnot found','ERROR');	
				}); 
			}
		});
	});

	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('*******************************Case-43********************************', 'INFO');
		casper.echo('*******************************Disable Delete poll Topic/Post*****************', 'INFO');
		casper.echo('Verify by delete poll on a topic from other category from shield icon', 'INFO');
		AddPoll=1;
		 ModeratorPermission(casper,'p_poll_delete',false,2,function(err,href){
			if(!err){
<<<<<<< HEAD
				casper.echo('a[href="'+href+'"]');
=======
>>>>>>> f1d4d24c0f595dafede98b0088be17bcd846af5a
				casper.waitForSelector('a[href="'+href+'"]',function success(){
					casper.click('a[href="'+href+'"]');
					casper.waitForSelector('div#posts-list',function sucess(){   	
						casper.test.assertDoesntExist('a.dropdown-toggle.text-muted i.glyphicon.glyphicon-chevron-down');
						casper.echo('Message:poll is there is no poll dropdown','INFO');
						DeleteTopic(casper,href,function(err){
							if(!err){
								casper.echo('*******************************Case-43********************************', 'INFO');
								casper.echo('*******************************Successfully Verified********************************', 'INFO');
							}
						});
						},function fail(){
							casper.echo('Shield Icon Doesnt Exists','ERROR');
					});
					},function fail(){
						casper.echo('Href of topic doesnot found','ERROR');	
				}); 
			}
		});
	});

	casper.thenOpen(config.backEndUrl,function() {
<<<<<<< HEAD
		casper.echo('Login To Backend URL and Enable Approve New Posts', 'INFO');
=======
		casper.echo('Login To Backend URL and disable Approve New Posts', 'INFO');
>>>>>>> f1d4d24c0f595dafede98b0088be17bcd846af5a
		casper.echo('Title of the page :' +this.getTitle(), 'INFO');
		casper.echo('---------------------------------------------------------------------------');		
		//setting page -> security page
		casper.waitForSelector('a[data-tooltip-elm="ddSettings"]', function success() {
			casper.test.assertExists('a[data-tooltip-elm="ddSettings"]');
			casper.click('a[data-tooltip-elm="ddSettings"]');
			casper.waitForSelector('a[href="/tool/members/mb/settings?tab=Security"]', function success() {
				casper.test.assertExists('a[href="/tool/members/mb/settings?tab=Security"]');
				casper.click('a[href="/tool/members/mb/settings?tab=Security"]');
			}, function fail(err) {
				casper.echo(err);
			});
			casper.waitForSelector('#post_approval', function success() {
				casper.test.assertExists('#post_approval');
				casper.click('#post_approval');
				casper.sendKeys('select[name="post_approval"] option[value="99"]', 'All posts');
				casper.test.assertExists('button[type="submit"]');
				casper.click('button[type="submit"]');
				casper.then(function(){});
			}, function fail() {
				casper.echo(err);
			});
		}, function fail(err) {
			casper.echo(err);
		});

	});

	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('*******************************Case-44********************************', 'INFO');
		casper.echo('*******************************Enable Pending Post*****************', 'INFO');
		casper.echo('verify by approve pending posts of cat1', 'INFO');
		casper.then(function(){
			change_permission(casper,'p_approve_post',true,function(err){
				if(!err){
					ComposePost(casper,1,function(err,href){
						if(!err){
							var selector='ul li.col-xs-12:nth-child(1) span.columns-wrapper span.col-xs-7 a';
							var forum = casper.evaluate(function(a) {
									var forum=document.querySelector(a).getAttribute('href');
									return forum;
							},selector);
							casper.click('i.glyphicon.glyphicon-tasks.has-notif');
							casper.waitForSelector('i.glyphicon.glyphicon-ok',function success(){
								var msg = casper.evaluate(function(a) {
									var TotalPost=document.querySelectorAll('div#feed-main a[href^="/?forum="]');
									var CategoryPost=document.querySelectorAll('div#feed-main a[href="'+ a +'"]');
									if(TotalPost.length==CategoryPost.length)
									return 'All Post for Approval are from General Category';
									else
									return 'All Post for Approval are not from this Category';
								},forum);
								casper.echo('Message:'+msg,'INFO');
								casper.click('i.glyphicon.glyphicon-ok');
								casper.wait(7000,function(){
									forumLogin.logoutFromApp(casper, function(){
											casper.waitForSelector('a#td_tab_login',function success(){
												casper.echo('Successfully logout from application', 'INFO');
												casper.echo('*******************************Case-44********************************', 'INFO');
												casper.echo('*******************************Successfully Verified********************************', 'INFO');
												},function fail(){
													casper.echo('Unable to Successfully logout from application', 'INFO');
											});
									});
								});
								},function fail(){
									casper.echo("verfify post icon does not exist",'ERROR');
							});
						}
					});
				}
			});

		});
		
		
	});


	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('*******************************Case-45********************************', 'INFO');
		casper.echo('*******************************Enable Pending Post*****************', 'INFO');
		casper.echo('verify by approve pending posts of other cat1', 'INFO');
		casper.then(function(){
			change_permission(casper,'p_approve_post',true,function(err){
				if(!err){
					ComposePost(casper,1,function(err,href){
						if(!err){
							casper.capture('1asd.png');
							forumLogin.logoutFromApp(casper, function(){
								casper.waitForSelector('a#td_tab_login',function success(){
									casper.echo('Successfully logout from application', 'INFO');
									ComposePost(casper,2,function(err,href){
										if(!err){
											casper.capture('2asd.png');
											var selector='ul li.col-xs-12:nth-child(2) span.columns-wrapper span.col-xs-7 a';
											var forum = casper.evaluate(function(a) {
													var forum=document.querySelector(a).getAttribute('href');
													return forum;
											},selector);	
											casper.click('i.glyphicon.glyphicon-tasks.has-notif');
											casper.waitForSelector('i.glyphicon.glyphicon-ok',function success(){
												var msg = casper.evaluate(function(a) {
									
													var CategoryPost=document.querySelectorAll('div#feed-main a[href="'+ a +'"]');
													if(CategoryPost.length==0)
													return 'There are no pending post available from this category';
													else
													return 'Some post are pending for approval for this category';
												},forum);
												casper.echo('Message:'+msg,'INFO');
												casper.then(function(){
													forumLogin.logoutFromApp(casper, function(){
															casper.waitForSelector('a#td_tab_login',function success(){
																casper.echo('Successfully logout from application', 'INFO');
																casper.echo('*******************************Case-45********************************', 'INFO');
																casper.echo('*******************************Successfully Verified********************************', 'INFO');
																},function fail(){
																	casper.echo('Unable to Successfully logout from application', 'INFO');
															});
													});
												});
												},function fail(){
													casper.echo("verfify post icon does not exist",'ERROR');
											});												
										}
									});
									},function fail(){
										casper.echo('Unable to Successfully logout from application', 'INFO');
								});
							});
						}
					});
				}
			});

		});
		
		
	});

	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('*******************************Case-46********************************', 'INFO');
		casper.echo('*******************************Disable Pending Post*****************', 'INFO');
		casper.echo('verify by approve pending posts of cat1', 'INFO');
		change_permission(casper,'p_approve_post',false,function(err){
			if(!err){

				ComposePost(casper,1,function(err,href){
					if(!err){
						casper.test.assertDoesntExist('i.glyphicon.glyphicon-tasks.has-notif');
						casper.echo('Approvel queue is not available','INFO');
						casper.then(function(){
							forumLogin.logoutFromApp(casper, function(){
								casper.waitForSelector('a#td_tab_login',function success(){
									casper.echo('Successfully logout from application', 'INFO');
									casper.echo('*******************************Case-46********************************', 'INFO');
									casper.echo('*******************************Successfully Verified********************************', 'INFO');
									},function fail(){
										casper.echo('Unable to Successfully logout from application', 'INFO');
								});
							});
						});
					}
				});
			}
			
		});
		
<<<<<<< HEAD
	});	

	casper.thenOpen(config.backEndUrl, function(){
		casper.echo('************************Deleting user1*********************', 'INFO');
		casper.echo('title of the page : '+casper.getTitle());
		 casper.waitForSelector('div#my_account_forum_menu', function success() {
			DeleteUser(casper,json['user1'].uname,function(err){
				if(!err){
					casper.echo('Sucessfully Deleted...............','INFO');
				}
			});
			},function fail() {
				casper.echo('Problem in opening Dashboard as we have previosly login', 'ERROR');
		});	
	});

	casper.thenOpen(config.backEndUrl, function(){
		casper.echo('************************Deleting user2*********************', 'INFO');
		casper.echo('title of the page : '+casper.getTitle());
		 casper.waitForSelector('div#my_account_forum_menu', function success() {
			DeleteUser(casper,json['user2'].uname,function(err){
				if(!err){
					casper.echo('Sucessfully Deleted...............','INFO');
					casper.test.assertExists('div#account_sub_menu a[data-tooltip-elm="ddAccount"]');
					casper.click('div#account_sub_menu a[data-tooltip-elm="ddAccount"]');
					casper.test.assertExists('a[href="/tool/members/login?action=logout"]');
					casper.click('a[href="/tool/members/login?action=logout"]');			
						
				   	casper.echo('-----------------------Logout Successfully--------------------------------','INFO');
				}
			});
			},function fail() {
				casper.echo('Problem in opening Dashboard as we have previosly login', 'ERROR');
		});	
	});
=======
	});	*/
>>>>>>> f1d4d24c0f595dafede98b0088be17bcd846af5a

}

var ModeratorPermission=function(driver,checkbox_name,trueorfalse,category_no,callback){
	var ahref;
	change_permission(driver,checkbox_name,trueorfalse,function(err){
		if(!err){
			driver.then(function(){
				Open_Category(driver,category_no,'user2',function(err){
					if(!err){
						StartTopic(driver,function(err,href){
							if(!err){
								ahref=href;
<<<<<<< HEAD
								casper.echo('href1='+ahref,'INFO');
=======
>>>>>>> f1d4d24c0f595dafede98b0088be17bcd846af5a
								if(AddPoll==1){	
									driver.then(function(){
										driver.click('i.glyphicon.glyphicon-chevron-down'); 		
										driver.test.assertExist('a[href^="/poll/polladd?id="]');
										driver.click('a[href^="/poll/polladd?id="]');
										driver.waitForSelector('form#formEditPoll',function success(){
<<<<<<< HEAD
											driver.sendKeys('#poll_question', json['AddPoll'].pollQues, {reset:true});
											driver.sendKeys('input[name="public"]',json['AddPoll'].publicCheckbox);
											driver.sendKeys('#poll_option_1 div input',json['AddPoll'].option1, {reset:true});
											driver.sendKeys('#poll_option_2 div input', json['AddPoll'].option2, {reset:true});
=======
											driver.sendKeys('#poll_question', 'Are you happy', {reset:true});
											driver.sendKeys('input[name="public"]',false);
											driver.sendKeys('#poll_option_1 div input','Yes', {reset:true});
											driver.sendKeys('#poll_option_2 div input', 'No', {reset:true});
>>>>>>> f1d4d24c0f595dafede98b0088be17bcd846af5a
											driver.click('#save_poll');
											driver.waitForSelector('input[name="pollvotesave"]',function success(){
												driver.capture('1a.png');
												driver.echo('Message:Poll Added Successfully','INFO');
												},function fail(){
													driver.echo('Poll doesnot saved Succesfully','ERROR');
											});
											},function fail(){
												driver.echo('Form doesnt open to add poll','ERROR');
										});
									});
								}
								driver.then(function(){
									forumLogin.logoutFromApp(driver, function(){
											driver.waitForSelector('a#td_tab_login',function success(){
												driver.echo('Successfully logout from application', 'INFO');
												},function fail(){
													driver.echo('Unable to Successfully logout from application', 'INFO');
											});
									});
								});
								driver.then(function(){
									Open_Category(driver,category_no,'user1',function(err){
										if(!err){
											try{
											    driver.test.assertExists('a#topics_tab');
											    driver.click('a#topics_tab');
										  	 }catch(e){

										 	 }      
										}
									});
								});
							}
						});
					}
				});
			});	

		}		
	});
	driver.then(function(){
		return callback(null,ahref);
	});
	
}
//Method to compose post on existing topic in specified category.
var ComposePost=function(driver,category_no,callback){
	var href;
	driver.then(function(){
		Open_Category(driver,category_no,'user2',function(err){
			if(!err){
				driver.capture('9.png');
				try{
					driver.test.assertExists('a#topics_tab');
					driver.click('a#topics_tab');
				 }catch(e){
				 }     
				driver.waitForSelector('span.topic-content a',function success(){
					href = driver.evaluate(function() {
								var href=document.querySelector('span.topic-content a').getAttribute('href');
								return href;
					});
					driver.click('span.topic-content a');
					driver.waitForSelector('form[name="PostTopic"]',function success(){
						driver.fill('form[name="PostTopic"]',{
<<<<<<< HEAD
								'message': json['ReplyTopic'].content
=======
								'message': 'this is my first post of this topic in this category'
>>>>>>> f1d4d24c0f595dafede98b0088be17bcd846af5a
						},false);
						driver.waitForSelector('#reply_submit',function success(){
							driver.test.assertExists('#reply_submit');
							driver.click('#reply_submit');
							driver.wait(7000,function(){
								driver.capture('10.png');
								forumLogin.logoutFromApp(driver,function(){
									driver.waitForSelector('a#td_tab_login',function success(){
										casper.capture('11110.png');
										driver.echo('Successfully logout from application', 'INFO');
										driver.thenOpen(config.url, function() {
											forumLogin.loginToApp(json['user1'].uname, json['user1'].upass, casper, function(err){
												if(!err) {
													driver.waitForSelector('ul.nav.pull-right span.caret', function success() {
														driver.test.assertDoesntExist('#td_tab_login');
														driver.echo('User has been successfuly login to application', 'INFO'); 
															driver.click('i.icon.icon-menu');
															driver.test.assertExists('a[href="/categories"]');
															driver.click('a[href="/categories"]');
															}, function fail() {
																driver.echo('ERROR OCCURRED', 'ERROR');
													});
												}
											});
										});
										},function fail(){
											driver.echo('Unable to Successfully logout from application', 'ERROR');
									});
								});
							});
							},function fail(){
								driver.echo('Reply Submit button not found', 'ERROR');
						});
						
						},function fail(){
							driver.echo('Reply Post Compose form Doesnot visible', 'ERROR');
					});
					},function fail(){
						driver.echo('Topic listing page doesnt Appear Successfully', 'ERROR');
				});
			}
		});
	});
	
	driver.then(function() {
		return callback(null,href);
	});	
}

//Method to change moderator permission of a registered user.
var change_permission=function(driver,checkbox_name,trueorfalse,callback){
	driver.waitForSelector('div#my_account_forum_menu', function success() {
		ClickOnCategoryLinks(casper,function(err){
			if(!err){						
				driver.echo('Category Page Found..........................','INFO');					
				driver.waitForSelector('div#tab_wrapper',function sucess(){
					driver.test.assertExists('div#sortable ul.ui-sortable li:nth-child(1) div.select');
					driver.mouse.move('div#sortable ul.ui-sortable li:nth-child(1) div.select');
					var firstLiId = driver.evaluate(function() {
								document.querySelector("a.moderateAction").style.display = 'block';
								var id = document.querySelector('div#sortable ul.ui-sortable li:nth-child(1)').getAttribute('id');
								return id;
							});
					driver.test.assertExists('a.moderateAction[data-forumid="'+firstLiId+'"]');
					driver.click('a.moderateAction[data-forumid="'+firstLiId+'"]');
					driver.test.assertExists('div#forumModerator'+firstLiId + ' a:last-child');
					driver.click('div#forumModerator'+firstLiId + ' a:last-child');
					driver.waitForSelector('form#add_mod_form',function success(){
						driver.evaluate(function(a,b) {
							checkbox=document.getElementsByName(a);	
							checkbox[0].checked=b;	
						},checkbox_name,trueorfalse);
						driver.sendKeys('input[name="usertitle"]','', {keepFocus: true});
						driver.then(function(){
							driver.page.sendEvent("keypress", this.page.event.key.Enter);
						});
						driver.wait(7000,function(){driver.capture('ea.png');});
						},function fail(){
							driver.echo('Form Doesnt open to change permission of moderator','ERROR');
					});
					},function fail(){
						driver.echo('Does Not find div#tab_wrapper selector','ERROR');
				});
			}
		});
		},function fail() {
			casper.echo('Problem in opening Dashboard as we have previosly login', 'ERROR');
	});
	driver.then(function() {
		return callback(null);
	});		
}

//Method to open category.
var Open_Category=function(driver,category_no,user,callback){
	driver.thenOpen(config.url, function() {
		forumLogin.loginToApp(json[user].uname, json[user].upass, casper, function(err){
			if(!err) {
				casper.waitForSelector('a.default-user', function success() {
					casper.test.assertDoesntExist('#td_tab_login');
					casper.echo('User has been successfuly login to application', 'INFO'); 
					casper.waitForSelector('i.icon.icon-menu',function sucess(){

						casper.click('i.icon.icon-menu');

						casper.test.assertExists('a[href="/categories"]');

						casper.click('a[href="/categories"]');	
						casper.wait(7000,function(){
							casper.waitForSelector('ul li.col-xs-12:nth-child('+ category_no +') span.columns-wrapper span.col-xs-7 a',function success(){ 				
								casper.click('ul li.col-xs-12:nth-child('+ category_no +') span.columns-wrapper span.col-xs-7 a');
								},function fail(){
									casper.echo('Unable to Open This Category','ERROR');
							});

						
						});												
						},function fail(){
							casper.echo('Unable to Open Sidebar','ERROR');
					});
					}, function fail() {
						casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}
		});
	});
	driver.then(function() {
		return callback(null);
	});
}

//Method to Delete topic as after login as a Registered user.
var DeleteTopic=function(driver,href,callback){
	driver.echo('30000000000000****************.................', 'INFO');
	forumLogin.logoutFromApp(driver,function(){
		driver.waitForSelector('a#td_tab_login',function success(){
			casper.capture('11110.png');
			driver.echo('Successfully logout from application', 'INFO');
			driver.thenOpen(config.url, function() {
				casper.capture('11111.png');
				forumLogin.loginToApp(json['user2'].uname, json['user2'].upass, casper, function(err){
					if(!err) {
						driver.waitForSelector('ul.nav.pull-right span.caret', function success() {
							driver.test.assertDoesntExist('#td_tab_login');
							driver.waitForSelector('a[href="'+href+'"]',function success(){
								driver.click('a[href="'+href+'"]');
								driver.waitForSelector('i.glyphicon.glyphicon-chevron-down',function sucess(){
									driver.click('i.glyphicon.glyphicon-chevron-down');
									driver.test.assertExists('a[href^="/mbactions/delete"]');
									driver.click('a[href^="/mbactions/delete"]');
									driver.waitForSelector('div.panel-body.table-responsive',function sucess(){
										driver.echo('Message:Post is Deleted','INFO');
										driver.then(function(){
											forumLogin.logoutFromApp(driver, function(){
												driver.waitForSelector('a#td_tab_login',function success(){

													driver.echo('Successfully logout from application', 'INFO');
													},function fail(){
														driver.echo('Unable to Successfully logout from application', 'ERROR');
												});
											});
										});
										},function fail(){
											driver.echo('Post Doesnot Deleted Successfully','ERROR');
									});
									},function fail(){
										driver.echo('Unable to Click on Dropdown','ERROR');
								});
								},function fail(){
									driver.echo('Problem in opening this Topic','ERROR');	
							});
							}, function fail() {
								driver.echo('ERROR OCCURRED', 'ERROR');
						});
					}
				});
			});
			},function fail(){
				driver.echo('Unable to Successfully logout from application', 'INFO');
		});
	});
	driver.then(function() {
		return callback(null);
	});
}
//Method to StartTopic 
var StartTopic = function(driver,callback){
	var href;
	driver.click('a[href^="/post/printadd"]');
	driver.waitForSelector('#message_ifr',function success(){								
<<<<<<< HEAD
		driver.sendKeys('input[name="subject"]', json['StartTopic'].subject, {reset:true});								
		driver.withFrame('message_ifr', function() {
			driver.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
			driver.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
			driver.sendKeys('#tinymce',json['StartTopic'].content);
=======
		driver.sendKeys('input[name="subject"]', 'hello', {reset:true});								
		driver.withFrame('message_ifr', function() {
			driver.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
			driver.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
			driver.sendKeys('#tinymce','this is my first topic in this category');
>>>>>>> f1d4d24c0f595dafede98b0088be17bcd846af5a
		});
		driver.waitForSelector('#post_submit',function success() {												
			driver.test.assertExists('#post_submit');
			driver.click('#post_submit');
<<<<<<< HEAD
			driver.then(function(){
				driver.waitForSelector('a#sub_post_reply',function success(){ 
					href = driver.evaluate(function() {
							var ahref;				  
							var str= window.location.href;
							var n = str.indexOf('.com');
							ahref=str.substring(n+('.com').length);
							n =ahref.indexOf('#');
							ahref=ahref.substring(0,n);	
							return ahref;
					});
					return callback(null,href);
					},function fail(){
						driver.echo('Unable to Retrieve URL','ERROR');
				});
=======
			driver.waitForSelector('a#sub_post_reply',function success(){ 
				href = driver.evaluate(function() {
						var ahref;				  
						var str= window.location.href;
						var n = str.indexOf('.com');
						ahref=str.substring(n+('.com').length);
						n =ahref.indexOf('#');
						ahref=ahref.substring(0,n);	
						return ahref;
				});
				return callback(null,href);
				},function fail(){
					driver.echo('Unable to Retrieve URL','ERROR');
>>>>>>> f1d4d24c0f595dafede98b0088be17bcd846af5a
			});
			},function fail(){
				driver.echo('Unable to submit form','ERROR');
		});
		},function fail(){
			driver.echo('Unable to Open Form To Start Topic','ERROR');
	});
};

//Method  to Open Category Page.
var ClickOnCategoryLinks=function(driver, callback){
	driver.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
	driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
	driver.test.assertExists('div#ddContent a[href="/tool/members/mb/forums"]');
	driver.click('div#ddContent a[href="/tool/members/mb/forums"]');
	driver.echo('---------------------------------------------------------------------------','INFO');
	return callback(null);
};

	
var checkbox_checked= function(href,callback){
           var value = casper.evaluate(function(str) {
				var checkbox_value;				  
				var n = str.indexOf('-');
				checkbox_value=str.substring(n+1);
				n =checkbox_value.indexOf('?');
				checkbox_value=checkbox_value.substring(0,n);	
				return checkbox_value;
			},href);
	casper.waitForSelector('input[value="'+value+'"]',function success(){
		casper.click('input[value="'+value+'"]');
		casper.capture('123.png');
		casper.echo('Checkbox checked','INFO');
		},function fail(){
			casper.echo('Checkbox doesnot checked','ERROR');
	});
	casper.then(function(){
		return callback(null);
	});
}

<<<<<<< HEAD
//Method to Delete User
var DeleteUser=function(driver,data,callback){
	driver.then(function(){
		driver.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]'); 
		driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		driver.test.assertExists('a[href^="/tool/members/mb/usergroup"]');
		driver.click('a[href^="/tool/members/mb/usergroup"]');
		driver.waitForSelector('form#frmChangeUsersGroup', function success() {
			driver.fill('form#frmChangeUsersGroup', {
				'member' : data
			}, true);
			driver.waitForSelector('a#delete_user', function success() {
				driver.click('a#delete_user');
				}, function fail(){
					driver.echo('Delete User Button not found','ERROR');	
			});
			},function fail(){
				driver.echo('Change user group permission not found','ERROR');
		}); 
	});	
	driver.then(function() {
		return callback(null);
	});
}

=======
>>>>>>> f1d4d24c0f595dafede98b0088be17bcd846af5a

