'use strict';
var utils = require('./utils.js');
var json = require('../testdata/moderator.json');
var forumLogin = require('./forum_login.js');
var forumRegister = require('./register.js');
var generalPermission = require('./generalPermission.js');
var verifyModeratorPermission = module.exports = {};
var AddPoll=0;

verifyModeratorPermission.verifyModeratorPermissionfeatureTest=function(casper, x, callback) {

		//Open Forum Frontend URL And Register User.
		casper.thenOpen(config.url, function(){
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
		
		//Open Forum frontend URL And logout from frontend.
		casper.thenOpen(config.url,function() {
			forumRegister.redirectToLogout(casper, casper.test, function() {});
		});


		//Open forum backend url and enable start topic and view category.
		casper.thenOpen(config.backEndUrl,function() {
			this.echo('Login To Backend URL and enable start topic checkbox and view category checkbox', 'INFO');
			this.echo('title of the page : ' +this.getTitle(), 'INFO');
			forumRegister.loginToForumBackEnd(casper, casper.test, function(err) {
				if(!err) {
					casper.echo('User has been successfuly login to backend', 'INFO');
					//go to user permission
					utils.gotoEditUserGroupPermissionpage(x, "Registered Users", casper, function(err) {
						if (!err) {
							casper.echo('Successfully navigated to Edit User group Permission page', 'INFO');
							//click on checkbox
							casper.waitForSelector('form#frmFullUsergroupPerms', function success() {
								casper.fill('form#frmFullUsergroupPerms',{
									'post_threads': true,
									'view_forum': true,
									'delete_threads':true,
									'other_post_replies':true,
									'post_replies':true
								}, false);
								//click on save button
								utils.clickOnElement(casper, '.btn-blue', function(err) {
									if(!err) {
										casper.echo('Saving Changes', 'INFO');
										casper.waitForSelector('p[align="center"] font.heading', function success() {
											casper.echo('Permission Setting Changed', 'INFO');;
											}, function fail(err){
												casper.echo('Permission Setting not changed','ERROR');						
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
			this.echo('title of the page : ' +this.getTitle(), 'INFO');
			casper.waitForSelector('div#my_account_forum_menu', function success() {
				generalPermission.viewChangePermission(casper,casper.test, function(err,grpId) {
					if(!err){	
						casper.then(function(){
							casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
							casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
							casper.test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
							casper.click('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
								casper.waitForSelector('div.select', function success() {
									casper.mouse.move('div#sortable ul.ui-sortable li:nth-child(1) div.select');
									casper.waitUntilVisible('div#sortable ul.ui-sortable li:nth-child(1) div.select a.manageAction', function success() {
										casper.click('div#sortable ul.ui-sortable li:nth-child(1) div.select a.manageAction');
										casper.click('div#sortable ul.ui-sortable li:nth-child(1) div.select a.change_perm');
										casper.waitForSelector('form[name="frmFormPermissionsDialog"]', function success() {

											utils.enableorDisableCheckbox('view_forum_'+grpId, true, casper, function() {
												casper.echo('checkbox is checked for view category for general category', 'INFO');
											});
											casper.then(function(){
												casper.click('div[aria-describedby="change_perm_dialog"]  button[title="Close"] span.ui-button-text');
											});
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
					this.echo('Backend Does Not Open Succesfully', 'ERROR');
			});
		});

		//Enable the edit post moderator permission from backend of general category and verify from frontend after login as moderator post is editable for the general category.
		casper.thenOpen(config.backEndUrl,function() {
			this.echo('*******************************Case-8********************************', 'INFO');
			this.echo('******************************Enable Edit Post********************************', 'INFO');
			this.echo('Verify by edit post from category(cat1)', 'INFO');
			this.echo('title of the page : ' +this.getTitle(), 'INFO');
			 ModeratorPermission(casper,'p_edit_post',true,1,function(err,href){
				if(!err){
					casper.waitForSelector('a[href="'+href+'"]',function success(){
						casper.click('a[href="'+href+'"]');
						casper.waitForSelector('i.glyphicon.glyphicon-chevron-down',function sucess(){
							casper.click('i.glyphicon.glyphicon-chevron-down');
							casper.test.assertExists('a#edit_post_request');
							casper.echo('Message:Post is Editable','INFO');
							casper.then(function(){
								DeleteTopic(casper,href,function(err){
									if(!err){
										casper.echo('*******************************Case-8********************************', 'INFO');
										casper.echo('*******************************Successfully Verified********************************', 'INFO');
									}
								});
							});
							},function fail(){
								casper.echo('Dropdown menu doesnot appears','ERROR');
						});
						},function fail(){
							casper.echo('Topic that we have started previously does not exist','ERROR');	
					}); 
				}
			});
		});

			//Enable the edit post moderator permission from backend of general category and verify from frontend after login as moderator post is not editable for the other category.
		casper.thenOpen(config.backEndUrl,function() {
			this.echo('*******************************Case-9********************************', 'INFO');
			this.echo('*******************************Enable Edit Post********************************', 'INFO');
			this.echo('Verify by edit post from other category', 'INFO');
			this.echo('title of the page : ' +this.getTitle(), 'INFO');
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
								casper.echo('Dropdown menu doesnot appears','ERROR');
						});
						},function fail(){
							casper.echo('Topic that we have started previously does not exist','ERROR');		
					}); 
				}
			});
		});

	//Disable the edit post moderator permission from backend of general category  and verify from frontend after login as moderator post is not editable for the general category.
	casper.thenOpen(config.backEndUrl,function() {
		this.echo('*******************************Case-10********************************', 'INFO');
		this.echo('*******************************Disable Edit Post********************************', 'INFO');
		this.echo('Verify by edit post from category(cat1)', 'INFO');
		this.echo('title of the page : ' +this.getTitle(), 'INFO');
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
							casper.echo('Dropdown menu doesnot appears','ERROR');
					});
					},function fail(){
						casper.echo('Topic that we have started previously does not exist','ERROR');		
				}); 
			}
		});
	});

	//Disable the edit post moderator permission from backend of general category  and verify from frontend after login as moderator post is not editable for the other category.
	casper.thenOpen(config.backEndUrl,function() {
		this.echo('*******************************Case-11********************************', 'INFO');
		this.echo('*******************************Disable Edit Post********************************', 'INFO');
		this.echo('Verify by edit post from other category', 'INFO');
		this.echo('title of the page : ' +this.getTitle(), 'INFO');
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
							casper.echo('Dropdown menu doesnot appears','ERROR');
					});
					},function fail(){
						casper.echo('Topic that we have started previously does not exist','ERROR');	
				}); 
			}
		});
	});
	
	//Enable the delete post moderator permission from backend of general category  and verify from frontend after login as moderator post can be deleted of general category.
	casper.thenOpen(config.backEndUrl,function() {
		this.echo('*******************************Case-12********************************', 'INFO');
		this.echo('*******************************Enable Delete Post********************************', 'INFO');
		casper.echo('Verify by delete post/topic from category(cat1)', 'INFO');
		this.echo('title of the page : ' +this.getTitle(), 'INFO');
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
								forumLogin.logoutFromApp(casper, function(){
										casper.waitForSelector('a#td_tab_login',function success(){
											casper.echo('Successfully logout from application', 'INFO');
											casper.echo('*******************************Case-12********************************', 'INFO');
											casper.echo('*******************************Successfully Verified********************************', 'INFO');
											},function fail(){
												casper.echo('Unable to Successfully logout from application', 'ERROR');
										});
								});
						});
						},function fail(){
							casper.echo('Dropdown menu doesnot appears','ERROR');
					});
					},function fail(){
						casper.echo('Topic that we have started previously does not exist','ERROR');	
				}); 
			}
		});
	});


	//Enable the delete post moderator permission from backend of general category  and verify from frontend after login as moderator post cannot deleted of other category.
	casper.thenOpen(config.backEndUrl,function() {
		this.echo('*******************************Case-13********************************', 'INFO');
		this.echo('*******************************Enable Delete Post********************************', 'INFO');
		this.echo('Verify by delete post/topic from other category', 'INFO');
		this.echo('title of the page : ' +this.getTitle(), 'INFO');
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
							casper.echo('Dropdown menu doesnot appears','ERROR');
					});
					},function fail(){
						casper.echo('Topic that we have started previously does not exist','ERROR');	
				}); 
			}
		});
	});
	
	//Enable the delete post moderator permission from backend of general category  and verify from frontend after login as moderator post can be deleted from floating menu of general category.
	casper.thenOpen(config.backEndUrl,function() {
		this.echo('*******************************Case-14********************************', 'INFO');
		this.echo('*******************************Enable Delete Post********************************', 'INFO');
		this.echo('verify with delete post from cat1 by select one/all post/topic by check box', 'INFO');
		this.echo('title of the page : ' +this.getTitle(), 'INFO');
		 ModeratorPermission(casper,'p_delete_post',true,1,function(err,href){
			if(!err){
				CheckboxChecked(href,function(){
					if(!err){
						casper.waitForSelector('div#topics-menu.hover-menu.open', function success() {
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
								casper.echo('Floating menu doesnot appears in 5 second','ERROR');
						});
					}

				});
			}
		});
	});
	
	//Disable the delete post moderator permission from backend of general category  and verify from frontend after login as moderator post cannot deleted of general category.
	casper.thenOpen(config.backEndUrl,function() {
		this.echo('*******************************Case-15********************************', 'INFO');
		this.echo('*******************************Disable Delete Post********************************', 'INFO');
		this.echo('Verify by delete post/topic from category(cat1)', 'INFO');
		this.echo('title of the page : ' +this.getTitle(), 'INFO');
		 ModeratorPermission(casper,'p_delete_post',false,1,function(err,href){
			if(!err){
				casper.waitForSelector('a[href="'+href+'"]',function success(){
					casper.click('a[href="'+href+'"]');
					casper.waitForSelector('i.glyphicon.glyphicon-chevron-down',function sucess(){
						casper.click('i.glyphicon.glyphicon-chevron-down');
						casper.test.assertDoesntExist('a[id^="delete_first_post"]');
						casper.echo('Message:Post cannot be deleted','INFO');
						DeleteTopic(casper,href,function(err){
							if(!err){
								casper.echo('*******************************Case-15********************************', 'INFO');

								casper.echo('*******************************Successfully Verified********************************', 'INFO');

							}

						});
						},function fail(){
							casper.echo('Dropdown menu doesnot appears','ERROR');
					});
					},function fail(){
						casper.echo('Topic that we have started previously does not exist','ERROR');
				}); 
			}
		});
	});

	//Disable the delete post moderator permission from backend of general category  and verify from frontend after login as moderator post cannot deleted of other category.
	casper.thenOpen(config.backEndUrl,function() {
		this.echo('*******************************Case-16********************************', 'INFO');
		this.echo('*******************************Disable Delete Post********************************', 'INFO');
		this.echo('Verify by delete post/topic from other category', 'INFO');
		this.echo('title of the page : ' +this.getTitle(), 'INFO');
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
							casper.echo('Dropdown menu doesnot appears','ERROR');
					});
					},function fail(){
						casper.echo('Topic that we have started previously does not exist','ERROR');	
				}); 
			}
		});
	});

	//Enable the move post moderator permission from backend of general category  and verify from frontend after login as moderator post of general category can be moved to other category.
	casper.thenOpen(config.backEndUrl,function() {
		this.echo('*******************************Case-17********************************', 'INFO');
		this.echo('*******************************Enable Move Topic/Post*****************', 'INFO');
		this.echo('Verify by move post/topic from category(cat1)', 'INFO');
		this.echo('title of the page : ' +this.getTitle(), 'INFO');
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
								casper.echo('form doesnot open form to move topic','ERROR');
						});
						},function fail(){
							casper.echo('Shield Icon Doesnt appears in 5 seconds','ERROR');
					});
					},function fail(){
						casper.echo('Topic that we have started previously does not exist','ERROR');
				}); 
			}
		});
	});


	//Enable the move post moderator permission from backend of general category  and verify from frontend after login as moderator post of other category cannot be moved to other category as shield icon is not  visible.
	casper.thenOpen(config.backEndUrl,function() {
		this.echo('*******************************Case-18********************************', 'INFO');
		this.echo('*******************************Enable Move Post********************************', 'INFO');
		this.echo('Verify by move post/topic from other category', 'INFO');
		this.echo('title of the page : ' +this.getTitle(), 'INFO');
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
							casper.echo('Unable to open post of this topic','ERROR');
					});
					},function fail(){
						casper.echo('Topic that we have started previously does not exist','ERROR');
				}); 
			}
		});
	});

	//Enable the move post moderator permission from backend of general category  and verify from frontend after login as moderator post of general category can be moved to other category using floating menu move icon.
	casper.thenOpen(config.backEndUrl,function() {
		this.echo('*******************************Case-19****************************************************************', 'INFO');
		this.echo('*******************************Enable Move Post********************************', 'INFO');
		this.echo('verify with Move post from cat1 by select one/all post/topic by check box', 'INFO');
		this.echo('title of the page : ' +this.getTitle(), 'INFO');
		 ModeratorPermission(casper,'p_move_post',true,1,function(err,href){
			if(!err){
				CheckboxChecked(href,function(){
					if(!err){
						casper.waitForSelector('div#topics-menu.hover-menu.open', function success() {
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
								casper.echo('Floating menu doesnot appears in 5 seconds','ERROR');
						});
					}
				});
			}	
		});
	});

	//Enable the move post moderator permission from backend of general category and verify from frontend after login as moderator post of general category is not movable to the other category.
	casper.thenOpen(config.backEndUrl,function() {
		this.echo('*******************************Case-20******************************************', 'INFO');
		this.echo('*******************************Disable Move Post********************************', 'INFO');
		this.echo('Verify by move post/topic from category(cat1)', 'INFO');
		this.echo('title of the page : ' +this.getTitle(), 'INFO');
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
						casper.echo('Topic that we have started previously does not exist','ERROR');	
				}); 
			}
		});
	});	

	//Disable move post moderator permission from backend of general category and verify from frontend after login as moderator post of other general category is not movable to the other category.
	casper.thenOpen(config.backEndUrl,function() {
		this.echo('*******************************Case-21******************************************', 'INFO');
		this.echo('*******************************Disable Move Post********************************', 'INFO');
		this.echo('Verify by move post/topic from other category', 'INFO');
		this.echo('title of the page : ' +this.getTitle(), 'INFO');
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
						casper.echo('Topic that we have started previously does not exist','ERROR');	
				}); 
			}
		});
	});
	
	//Disable the move post moderator permission from backend of general category and verify from frontend after login as moderator post of general category cannot be moved to other category as floating menu is not visible.
	casper.thenOpen(config.backEndUrl,function() {
		this.echo('*******************************Case-22******************************************', 'INFO');
		this.echo('*******************************Disable Move Post********************************', 'INFO');
		this.echo('verify with Move post from cat1 by select one/all post/topic by check box', 'INFO');
		this.echo('title of the page : ' +this.getTitle(), 'INFO');
		 ModeratorPermission(casper,'p_move_post',false,1,function(err,href){
			if(!err){
				CheckboxChecked(href,function(){
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
								casper.echo('Floating menu doesnot appears in 5 seconds','ERROR');
						});
					}
				});
			}	
		});
	});


	//Enable the lock topic moderator permission from backend of general category and verify from frontend after login as moderator topic of general category is locked.
	casper.thenOpen(config.backEndUrl,function() {
		this.echo('*******************************Case-23********************************', 'INFO');
		this.echo('*******************************Enable Lock Topic/Post*****************', 'INFO');
		this.echo('Verify by lock post/topic from category(cat1)', 'INFO');
		this.echo('title of the page : ' +this.getTitle(), 'INFO');
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
						casper.echo('Topic that we have started previously does not exist','ERROR');	
				}); 
			}
		});
	});

	//Enable the lock topic moderator permission from backend of general category and verify from frontend after login as moderator topic of other category cannot be locked as sheild icon is not visible.
	casper.thenOpen(config.backEndUrl,function() {
		this.echo('*******************************Case-24********************************', 'INFO');
		this.echo('*******************************Enable Lock Topic/Post*****************', 'INFO');
		this.echo('Verify by lock post/topic from other category', 'INFO');
		this.echo('title of the page : ' +this.getTitle(), 'INFO');
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
						casper.echo('Topic that we have started previously does not exist','ERROR');	
				}); 
			}
		});
	});

	//Disable the lock topic moderator permission from backend of general category and verify from frontend after login as moderator topic of general category can not be locked as there is no option for lock topic.
	casper.thenOpen(config.backEndUrl,function() {
		this.echo('*******************************Case-25********************************', 'INFO');
		this.echo('*******************************Disable Lock Topic/Post*****************', 'INFO');
		this.echo('Verify by lock post/topic from category(cat1)', 'INFO');
		this.echo('title of the page : ' +this.getTitle(), 'INFO');
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
						casper.echo('Topic that we have started previously does not exist','ERROR');	
				}); 
			}
		});
	});

	//Disable the lock topic moderator permission from backend of general category and verify from frontend after login as moderator topic of other category can not be locked as shield icon is not visible.
	casper.thenOpen(config.backEndUrl,function() {
		this.echo('*******************************Case-26********************************', 'INFO');
		this.echo('*******************************Disable Lock Topic/Post*****************', 'INFO');
		this.echo('Verify by lock post/topic from other category', 'INFO');
		this.echo('title of the page : ' +this.getTitle(), 'INFO');
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
						casper.echo('Topic that we have started previously does not exist','ERROR');	
				}); 
			}
		});
	});

	//Enable the pin topic moderator permission from backend of general category and verify from frontend after login as moderator topic of general category can be pinned.
	casper.thenOpen(config.backEndUrl,function() {
		this.echo('*******************************Case-27********************************', 'INFO');
		this.echo('*******************************Enable Pin Topic/Post*****************', 'INFO');
		this.echo('Verify by pin post/topic from category(cat1)', 'INFO');
		this.echo('title of the page : ' +this.getTitle(), 'INFO');
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
						casper.echo('Topic that we have started previously does not exist','ERROR');	
				}); 
			}
		});
	});

	//Enable the pin topic moderator permission from backend of general category and verify from frontend after login as moderator topic of other category can be pinned as shield icon is not.
	casper.thenOpen(config.backEndUrl,function() {
		this.echo('*******************************Case-28********************************', 'INFO');
		this.echo('*******************************Enable pin Topic/Post*****************', 'INFO');
		this.echo('Verify by pin post/topic from other category', 'INFO');
		this.echo('title of the page : ' +this.getTitle(), 'INFO');
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
						casper.echo('Topic that we have started previously does not exist','ERROR');	
				}); 
			}
		});
	});

	//Enable the pin topic moderator permission from backend of general category and verify from frontend after login as moderator topic of general category can be pinned using the floating menu.
	casper.thenOpen(config.backEndUrl,function() {
		this.echo('*******************************Case-29******************************************', 'INFO');
		this.echo('*******************************Enable pin topic********************************', 'INFO');
		this.echo('verify with pin post/topic from cat1 by select one/all post/topic by check box', 'INFO');
		this.echo('title of the page : ' +this.getTitle(), 'INFO');
		 ModeratorPermission(casper,'p_pin_threads',true,1,function(err,href){
			if(!err){
				CheckboxChecked(href,function(){
					if(!err){
						casper.waitForSelector('div#topics-menu.hover-menu.open', function success() {
							casper.test.assertExists('i.icon.glyphicon-pushpin');
							casper.click('i.icon.glyphicon-pushpin');
							casper.test.assertExists('a#pin');
							casper.click('a#pin');
							casper.wait(5000,function(){
								casper.click('i.icon.icon-menu');
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
										casper.echo('Topic that we have started previously does not exist','ERROR');	
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

	//Disable the pin topic moderator permission from backend of general category and verify from frontend after login as moderator topic of general category cannot be pinned.
	casper.thenOpen(config.backEndUrl,function() {
		this.echo('*******************************Case-30********************************', 'INFO');
		this.echo('*******************************Disable Pin Topic/Post*****************', 'INFO');
		this.echo('Verify by pin post/topic from category(cat1)', 'INFO');
		this.echo('title of the page : ' +this.getTitle(), 'INFO');
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
						casper.echo('Topic that we have started previously does not exist','ERROR');	
				}); 
			}
		});
	});

	//Disable the pin topic moderator permission from backend of general category and verify from frontend after login as moderator topic of other category cannot be pinned as shield icon is not visible.	
	casper.thenOpen(config.backEndUrl,function() {
		this.echo('*******************************Case-31********************************', 'INFO');
		this.echo('*******************************Disable pin Topic/Post*****************', 'INFO');
		this.echo('Verify by pin post/topic from other category', 'INFO');
		this.echo('title of the page : ' +this.getTitle(), 'INFO');
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
						casper.echo('Topic that we have started previously does not exist','ERROR');	
				}); 
			}
		});
	});

	
	//Disable the pin topic moderator permission from backend of general category and verify from frontend after login as moderator topic of general category cannot be pinned as floating icon is not visible.
	casper.thenOpen(config.backEndUrl,function() {
		this.echo('*******************************Case-32******************************************', 'INFO');
		this.echo('*******************************Disable pin topic********************************', 'INFO');
		this.echo('verify with pin post/topic from cat1 by select one/all post/topic by check box', 'INFO');
		this.echo('title of the page : ' +this.getTitle(), 'INFO');
		 ModeratorPermission(casper,'p_pin_threads',false,1,function(err,href){
			if(!err){
				CheckboxChecked(href,function(){
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


	//Enable the add poll topic moderator permission from backend of general category and verify from frontend after login as moderator poll can be added in topic in a topic of general category.
	casper.thenOpen(config.backEndUrl,function() {
		this.echo('*******************************Case-33********************************', 'INFO');
		this.echo('*******************************Enable Add poll Topic/Post*****************', 'INFO');
		this.echo('verify create a poll on a topic of cat1 from the Shield icon','INFO'); 
		this.echo('title of the page : ' +this.getTitle(), 'INFO');
		 ModeratorPermission(casper,'p_poll_add',true,1,function(err,href){
			if(!err){
				casper.waitForSelector('a[href="'+href+'"]',function success(){
					casper.click('a[href="'+href+'"]');
					casper.waitForSelector('a span.caret',function sucess(){     
						casper.click('a span.caret'); 						
						casper.test.assertExist('a[href^="/poll/polladd?id="]');
						casper.click('a[href^="/poll/polladd?id="]');
						casper.waitForSelector('form#formEditPoll',function success(){
							casper.sendKeys('#poll_question',  json['AddPoll'].pollQues, {reset:true});
							casper.sendKeys('input[name="public"]',json['AddPoll'].publicCheckbox);
							casper.sendKeys('#poll_option_1 div input',json['AddPoll'].option1, {reset:true});
							casper.sendKeys('#poll_option_2 div input', json['AddPoll'].option2, {reset:true});
							casper.click('#save_poll');
							casper.waitForSelector('input[name="pollvotesave"]',function success(){
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
						casper.echo('Topic that we have started previously does not exist','ERROR');	
				}); 
			}
		});
	});

	//Enable the add poll topic moderator permission from backend of general category and verify from frontend after login as moderator  poll can not be added in topic of other category .
	casper.thenOpen(config.backEndUrl,function() {
		this.echo('*******************************Case-34********************************', 'INFO');
		this.echo('*******************************Enable Add poll Topic/Post*****************', 'INFO');
		this.echo('verify create a poll on a topic of other category from the Shield icon', 'INFO');
		this.echo('title of the page : ' +this.getTitle(), 'INFO');
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
						casper.echo('Topic that we have started previously does not exist','ERROR');	
				}); 
			}
		});
	});

	//Disable the add poll topic moderator permission from backend of general category and verify from frontend after login as moderator  poll can not be added in topic of general category .
	casper.thenOpen(config.backEndUrl,function() {
		this.echo('*******************************Case-35********************************', 'INFO');
		this.echo('*******************************Disable Add poll Topic/Post*****************', 'INFO');
		this.echo('Verify by add poll on a topic from category(cat1) from shield icon', 'INFO');
		this.echo('title of the page : ' +this.getTitle(), 'INFO');
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
						casper.echo('Topic that we have started previously does not exist','ERROR');	
				}); 
			}
		});
	});

	//Enable the edit poll topic moderator permission from backend of general category and verify from frontend after login as moderator general category poll can be edited.
	casper.thenOpen(config.backEndUrl,function() {
		this.echo('*******************************Case-36********************************', 'INFO');
		this.echo('*******************************Enable edit poll Topic/Post*****************', 'INFO');
		this.echo('Verify by edit poll on a topic from category(cat1) from shield icon', 'INFO');
		this.echo('title of the page : ' +this.getTitle(), 'INFO');
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
						casper.echo('Topic that we have started previously does not exist','ERROR');	
				}); 
			}
		});
	});

	
	//Enable the edit poll topic moderator permission from backend of general category and verify from frontend after login as moderator other category poll can not be edited as there is no poll dropdown.
	casper.thenOpen(config.backEndUrl,function() {
		this.echo('*******************************Case-37********************************', 'INFO');
		this.echo('*******************************Enable edit poll Topic/Post*****************', 'INFO');
		this.echo('Verify by edit poll on a topic from other category from shield icon', 'INFO');
		this.echo('title of the page : ' +this.getTitle(), 'INFO');
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
						casper.echo('Topic that we have started previously does not exist','ERROR');	
				}); 
			}
		});

	});

	//Disable the edit poll topic moderator permission from backend of general category and verify from frontend after login as moderator general category poll can not be edited as there is no poll option in poll dropdown.
	casper.thenOpen(config.backEndUrl,function() {
		this.echo('*******************************Case-38********************************', 'INFO');
		this.echo('*******************************Enable edit poll Topic/Post*****************', 'INFO');
		this.echo('Verify by edit poll on a topic from category(cat1) from shield icon', 'INFO');
		this.echo('title of the page : ' +this.getTitle(), 'INFO');
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
						casper.echo('Topic that we have started previously does not exist','ERROR');	
				}); 
			}
		});
	});

	//Disable the edit poll topic moderator permission from backend of general category and verify from frontend after login as moderator other category poll can not be edited as there is no poll dropdown.
	casper.thenOpen(config.backEndUrl,function() {
		this.echo('*******************************Case-39********************************', 'INFO');
		this.echo('*******************************Enable edit poll Topic/Post*****************', 'INFO');
		this.echo('Verify by edit poll on a topic from other category from shield icon', 'INFO');
		this.echo('title of the page : ' +this.getTitle(), 'INFO');
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
						casper.echo('Topic that we have started previously does not exist','ERROR');	
				}); 
			}
		});
	});


	//Enable the Delete poll topic moderator permission from backend of general category and verify from frontend after login as moderator general category poll can be deleted.
	casper.thenOpen(config.backEndUrl,function() {
		this.echo('*******************************Case-40********************************', 'INFO');
		this.echo('*******************************Enable Delete poll Topic/Post*****************', 'INFO');
		this.echo('Verify by Delete poll on a topic from category(cat1) from shield icon', 'INFO');
		this.echo('title of the page : ' +this.getTitle(), 'INFO');
		AddPoll=1;
		 ModeratorPermission(casper,'p_poll_delete',true,1,function(err,href){
			if(!err){
				casper.waitForSelector('a[href="'+href+'"]',function success(){
					casper.click('a[href="'+href+'"]');
					casper.waitForSelector('a span.caret',function sucess(){  
						casper.click('a.dropdown-toggle.text-muted i.glyphicon.glyphicon-chevron-down'); 	
						casper.test.assertExists('a[href^="/poll/polldelete"]');
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
						casper.echo('Topic that we have started previously does not exist','ERROR');	
				}); 
			}
		});
	});

	//Enable the Delete poll topic moderator permission from backend of general category and verify from frontend after login as moderator other category poll can not be deleted.
	casper.thenOpen(config.backEndUrl,function() {
		this.echo('*******************************Case-41********************************', 'INFO');
		this.echo('*******************************Enable Delete poll Topic/Post*****************', 'INFO');
		this.echo('Verify by delete poll on a topic from other category from shield icon', 'INFO');
		this.echo('title of the page : ' +this.getTitle(), 'INFO');
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
						casper.echo('Topic that we have started previously does not exist','ERROR');	
				}); 
			}
		});
	});

	//This is for reassigning a editing poll permission to a moderator  
	casper.thenOpen(config.backEndUrl,function() {
		this.echo('*******************************Changing Editing poll permission in order to show poll dropdown*****************', 'INFO');
		this.echo('title of the page : ' +this.getTitle(), 'INFO');
		casper.then(function(){
			change_permission(casper,'p_poll_edit',true,function(err){
				if(!err){
					casper.echo('Now Moderator have again Edit poll Moderator Permission','INFO');
				}
			});
		});
	});

	//Disable the Delete poll topic moderator permission from backend of general category and verify from frontend after login as moderator general category poll cannot be deleted as there is not delete option in poll dropdown.
	casper.thenOpen(config.backEndUrl,function() {
		this.echo('*******************************Case-42********************************', 'INFO');
		this.echo('*******************************Disable Delete poll Topic/Post*****************', 'INFO');
		this.echo('Verify by Delete poll on a topic from category(cat1) from shield icon', 'INFO');
		this.echo('title of the page : ' +this.getTitle(), 'INFO');
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
						casper.echo('Topic that we have started previously does not exist','ERROR');	
				}); 
			}
		});
	});

	//Disable the Delete poll topic moderator permission from backend of general category and verify from frontend after login as moderator other category poll cannot be deleted as there is no poll dropdown.
	casper.thenOpen(config.backEndUrl,function() {
		this.echo('*******************************Case-43********************************', 'INFO');
		this.echo('*******************************Disable Delete poll Topic/Post*****************', 'INFO');
		this.echo('Verify by delete poll on a topic from other category from shield icon', 'INFO');
		this.echo('title of the page : ' +this.getTitle(), 'INFO');
		AddPoll=1;
		 ModeratorPermission(casper,'p_poll_delete',false,2,function(err,href){
			if(!err){
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
						casper.echo('Topic that we have started previously does not exist','ERROR');	
				}); 
			}
		});
	});

	//changing the approval new post permission to all post
	casper.thenOpen(config.backEndUrl,function() {
		this.echo('Login To Backend URL and Enable Approve New Posts', 'INFO');
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		this.echo('---------------------------------------------------------------------------');		
		//setting page -> security page
		casper.waitForSelector('a[data-tooltip-elm="ddSettings"]', function success() {
			casper.test.assertExists('a[data-tooltip-elm="ddSettings"]');
			this.click('a[data-tooltip-elm="ddSettings"]');
			casper.waitForSelector('a[href="/tool/members/mb/settings?tab=Security"]', function success() {
				casper.test.assertExists('a[href="/tool/members/mb/settings?tab=Security"]');
				this.click('a[href="/tool/members/mb/settings?tab=Security"]');
				casper.waitForSelector('#post_approval', function success() {
					casper.test.assertExists('#post_approval');
					this.click('#post_approval');
					this.sendKeys('select[name="post_approval"] option[value="99"]', 'All posts');
					casper.test.assertExists('button[type="submit"]');
					this.click('button[type="submit"]');
					casper.then(function(){});
					}, function fail() {
						casper.echo(err);
				});
				}, function fail(err) {
					casper.echo(err);
			});
			}, function fail(err) {
				casper.echo(err);
		});

	});

	//Open forum backend url and enable post approval for registered user.
		casper.thenOpen(config.backEndUrl,function() {
			this.echo('Login To Backend URL and enable start topic checkbox and view category checkbox', 'INFO');
			this.echo('title of the page : ' +this.getTitle(), 'INFO');
			forumRegister.loginToForumBackEnd(casper, casper.test, function(err) {
				if(!err) {
					casper.echo('User has been successfuly login to backend', 'INFO');
					//go to user permission
					utils.gotoEditUserGroupPermissionpage(x, "Registered Users", casper, function(err) {
						if (!err) {
							casper.echo('Successfully navigated to Edit User group Permission page', 'INFO');
							//click on checkbox
							casper.waitForSelector('#post_threads', function success() {
								utils.enableorDisableCheckbox('post_approval', true, casper, function(err) {
									if(!err) {
										casper.echo("Post approval checkbox has been enabled", 'INFO');
										//click on save button
										utils.clickOnElement(casper, '.btn-blue', function(err) {
											if(!err) {
												casper.echo('Saving Changes', 'INFO');
												casper.waitForSelector('p[align="center"] font.heading', function success() {
													casper.echo('Permission Setting Changed', 'INFO');;
												}, function fail(err){
													casper.echo('Permission Setting not changed','ERROR');						
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

	//Enable approve pending post permission from backend of general category and verify from frontend after login as moderator by approving pending post of general category.
	casper.thenOpen(config.backEndUrl,function() {
		this.echo('*******************************Case-44********************************', 'INFO');
		this.echo('*******************************Enable Pending Post*****************', 'INFO');
		this.echo('verify by approve pending posts of cat1', 'INFO');
		this.echo('title of the page : ' +this.getTitle(), 'INFO');
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
									if(TotalPost.length==CategoryPost.length){
										return 'All Post for Approval are from General Category';
									}else{
										return 'All Post for Approval are not from this Category';
									}
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


	//Enable approve pending post permission from backend of general category and verify from frontend after login as moderator by message all pending post are from other category .
	casper.thenOpen(config.backEndUrl,function() {
		this.echo('*******************************Case-45********************************', 'INFO');
		this.echo('*******************************Enable Pending Post*****************', 'INFO');
		this.echo('verify by approve pending posts of other cat1', 'INFO');
		this.echo('title of the page : ' +this.getTitle(), 'INFO');
		casper.then(function(){
			change_permission(casper,'p_approve_post',true,function(err){
				if(!err){
					ComposePost(casper,1,function(err,href){
						if(!err){
							forumLogin.logoutFromApp(casper, function(){
								casper.waitForSelector('a#td_tab_login',function success(){
									casper.echo('Successfully logout from application', 'INFO');
									ComposePost(casper,2,function(err,href){
										if(!err){
											var selector='ul li.col-xs-12:nth-child(2) span.columns-wrapper span.col-xs-7 a';
											var forum = casper.evaluate(function(a) {
													var forum=document.querySelector(a).getAttribute('href');
													return forum;
											},selector);	
											casper.click('i.glyphicon.glyphicon-tasks.has-notif');
											casper.waitForSelector('i.glyphicon.glyphicon-ok',function success(){
												var msg = casper.evaluate(function(a) {
									
													var CategoryPost=document.querySelectorAll('div#feed-main a[href="'+ a +'"]');
													if(CategoryPost.length==0){
														return 'There are no pending post available from this category';
													}else{
														return 'Some post are pending for approval for this category';
													}
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
	
	//Disable approve pending post permission from backend of general category and verify from frontend after login as moderator approvel queue is not available.
	casper.thenOpen(config.backEndUrl,function() {
		this.echo('*******************************Case-46********************************', 'INFO');
		this.echo('*******************************Disable Pending Post*****************', 'INFO');
		this.echo('verify by approve pending posts of cat1', 'INFO');
		this.echo('title of the page : ' +this.getTitle(), 'INFO');
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
		
	});

	//Deleting the user1 i.e moderator.
	casper.thenOpen(config.backEndUrl, function(){
		this.echo('************************Deleting user1*********************', 'INFO');
		this.echo('title of the page : '+casper.getTitle());
		 casper.waitForSelector('div#my_account_forum_menu', function success() {
			DeleteUser(casper,json['user1'].uname,function(err){
				if(!err){
					casper.echo('Sucessfully Deleted...............','INFO');
				}
			});
			},function fail() {
				casper.echo('Backend Does Not Open Succesfully', 'ERROR');
		});	
	});

	//Deleting the user2 i.e  registered user
	casper.thenOpen(config.backEndUrl, function(){
		this.echo('************************Deleting user2*********************', 'INFO');
		this.echo('title of the page : '+ this.getTitle());
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
				casper.echo('Backend Does Not Open Succesfully', 'ERROR');
		});	
	});

}

//Method to chenge permission of moderator ac to the user pass the name of checkbox and its value true or false, open category after login as register user ac to category no pass by user,add poll if addpoll flag is set,logout from registered user and finally login as moderator.
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
								if(AddPoll==1){	
									driver.then(function(){
										driver.click('i.glyphicon.glyphicon-chevron-down'); 		
										driver.test.assertExist('a[href^="/poll/polladd?id="]');
										driver.click('a[href^="/poll/polladd?id="]');
										driver.waitForSelector('form#formEditPoll',function success(){
											driver.sendKeys('#poll_question', json['AddPoll'].pollQues, {reset:true});
											driver.sendKeys('input[name="public"]',json['AddPoll'].publicCheckbox);
											driver.sendKeys('#poll_option_1 div input',json['AddPoll'].option1, {reset:true});
											driver.sendKeys('#poll_option_2 div input', json['AddPoll'].option2, {reset:true});
											driver.click('#save_poll');
											driver.waitForSelector('input[name="pollvotesave"]',function success(){
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
								'message': json['ReplyTopic'].content
						},false);
						driver.waitForSelector('#reply_submit',function success(){
							driver.test.assertExists('#reply_submit');
							driver.click('#reply_submit');
							driver.wait(7000,function(){
								forumLogin.logoutFromApp(driver,function(){
									driver.waitForSelector('a#td_tab_login',function success(){
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
						driver.wait(7000,function(){driver.capture('img.png');});
						},function fail(){
							driver.echo('Form Doesnt open to change permission of moderator','ERROR');
					});
					},function fail(){
						driver.echo('Does Not find div#tab_wrapper selector','ERROR');
				});
			}
		});
		},function fail() {
			casper.echo('Backend Does Not Open Succesfully', 'ERROR');
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
						casper.waitForSelector('.table-responsive ul li',function success(){ 				
							casper.click('ul li.col-xs-12:nth-child('+ category_no +') span.columns-wrapper span.col-xs-7 a');
							},function fail(){
								casper.echo('Unable to Open This Category','ERROR');
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
			driver.echo('Successfully logout from application', 'INFO');
			driver.thenOpen(config.url, function() {
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
		driver.sendKeys('input[name="subject"]', json['StartTopic'].subject, {reset:true});								
		driver.withFrame('message_ifr', function() {
			driver.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
			driver.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
			driver.sendKeys('#tinymce',json['StartTopic'].content);
		});
		driver.waitForSelector('#post_submit',function success() {												
			driver.test.assertExists('#post_submit');
			driver.click('#post_submit');
			driver.waitForSelector('span[id^=post_message]',function success(){ 
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
					driver.echo('Topic does not Started Successfully','ERROR');
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
	driver.then(function(){
		driver.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
		driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
		driver.test.assertExists('div#ddContent a[href="/tool/members/mb/forums"]');
		driver.click('div#ddContent a[href="/tool/members/mb/forums"]');
	});
	driver.then(function() {
		return callback(null);
	});
};

//Method to check the checkbox in order to show floating menu if appears.	
var CheckboxChecked= function(href,callback){
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
		casper.echo('Checkbox checked','INFO');
		},function fail(){
			casper.echo('Checkbox doesnot checked','ERROR');
	});
	casper.then(function(){
		return callback(null);
	});
}

//Method to delete user
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


