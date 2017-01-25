/***These are the function which has been called in thumpsUpDown.js and also will be used in other js file as per requirement**********/

'use strict';
var registerMethod = require('./register.js');
var utils = require('./utils.js');
var wait = require('../wait.js');
var json = require('../../testdata/forgotpasswordData.json');
var forumLoginMethod = require('../methods/login.js');
var backEndForumRegisterMethod = require('./backEndRegistration.js');
var postEventMemberApprovalMethod = module.exports = {};
var currentUrl;
var topic;
var postId;
//*************************************************PRIVATE METHODS***********************************************

//method to set the user permission to Administration 
postEventMemberApprovalMethod.setAdmin = function(driver, test, callback) {
	registerMethod.loginToForumBackEnd(casper, function(err) {
		if(!err) {
			wait.waitForElement('div#my_account_forum_menu', driver, function(err, isExists) {
				if(isExists) {
					test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', 'Users Link Found'); 
					driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
					test.assertExists('a[href^="/tool/members/mb/usergroup"]', 'Group permission is found');
					driver.click('a[href^="/tool/members/mb/usergroup"]');
					wait.waitForElement('form#frmChangeUsersGroup', driver, function(err, isExists) {
						if(isExists) {
							driver.fill('form#frmChangeUsersGroup', {
								'member' : 'isneha'
							}, true);
							wait.waitForElement('form[name="ugfrm"]',  driver, function(err, isExists) {
								if(isExists) {
									test.assertExists('form#frmChangeUsersGroupFinal', 'Found admin');
									driver.fillLabels('form#frmChangeUsersGroupFinal', {
										Administrators: 'checked'
									}, true);
								} else {
									driver.echo('Administration checkbox not found','ERROR');	
								}
							});
						} else{
							driver.echo('Change user group permission not found','ERROR');
						}
					});
				} else {
					casper.echo('Backend Menu not found', 'ERROR');
				}
			});
		}else {
			casper.echo('Error : '+err, 'INFO');
		}
	});
	casper.then(function() {
		backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
		});
		return callback(null);
	});
};

//method to enable approve new post** All posts
postEventMemberApprovalMethod.enableApproveNewPost = function(driver, test, callback) {
        registerMethod.loginToForumBackEnd(casper, function(err) {
		if(!err) {
			wait.waitForElement('div#my_account_forum_menu', driver, function(err, isExists) {
				if(isExists) {
					driver.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					wait.waitForElement('div#ddSettings', casper, function(err, isExists) {
						if(isExists) {
							casper.click('div#ddSettings a:nth-child(3)');
							wait.waitForElement('td#approval_drop_down', casper, function(err, isExists) {
								if(isExists) {
									driver.fillSelectors('form[name="posts"]', {
		    								'select[name="post_approval"]': '99'
									}, true);
									try {
										casper.test.assertExists('button.button.btn-m.btn-blue');
										casper.click('button.button.btn-m.btn-blue');
										casper.wait(2000);
									}catch(e) {
										casper.test.assertDoesntExist('button.button.btn-m.btn-blue');
									}
								} else {
									casper.echo('approve new post dropDown not found', 'ERROR');
								}
							});
						} else {
							casper.echo('Setting  tooltip menu not found', 'ERROR');
						}
					});
				} else {
					casper.echo('Backend Menu not found', 'ERROR');
				}
			});
		}else {
			casper.echo('Error : '+err, 'INFO');
		}
	});
	casper.then(function() {
		backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
		});
		return callback(null);
	});
};

//code to disable approve new post** All posts  
postEventMemberApprovalMethod.disableApproveNewPost = function(driver, test, callback) {
        registerMethod.loginToForumBackEnd(casper, function(err) {
		if(!err) {
			wait.waitForElement('div#my_account_forum_menu', driver, function(err, isExists) {
				if(isExists) {
					driver.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					wait.waitForElement('div#ddSettings', casper, function(err, isExists) {
						if(isExists) {
							casper.click('div#ddSettings a:nth-child(3)');
							wait.waitForElement('input#reqregapp', casper, function(err, isExists) {
								if(isExists) {
									driver.fillSelectors('form[name="posts"]', {
		    								'select[name="post_approval"]': '0'
									}, true);
									try {
										casper.test.assertExists('button.button.btn-m.btn-blue');
										casper.click('button.button.btn-m.btn-blue');
										casper.wait(2000);
									}catch(e) {
										casper.test.assertDoesntExist('button.button.btn-m.btn-blue');
									}
								} else {
									casper.echo('approve new post checkbox not found', 'ERROR');
								}
							});
						} else {
							casper.echo('Setting  tooltip menu not found', 'ERROR');
						}
					});
				} else {
					casper.echo('Backend Menu not found', 'ERROR');
				}
			});
		}else {
			casper.echo('Error : '+err, 'INFO');
		}
	});
	casper.then(function() {
		backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
		});
		return callback(null);
	});
};

//method to create a new topic
postEventMemberApprovalMethod.startTopic = function(data,driver,callback) {
	driver.click('a.pull-right.btn.btn-uppercase.btn-primary ');
	driver.waitForSelector('div.post-body.pull-left',function success() {								
		driver.sendKeys('input[name="subject"]', data.title, {reset:true});								
		driver.withFrame('message_ifr', function() {
			driver.sendKeys('#tinymce', driver.page.event.key.Ctrl,driver.page.event.key.A, {keepFocus: true});			
			driver.sendKeys('#tinymce', driver.page.event.key.Backspace, {keepFocus: true});
			driver.sendKeys('#tinymce',data.content);
		});
		driver.waitForSelector('#all_forums_dropdown', function success() {
			driver.click('#all_forums_dropdown');
			driver.fill('form[name="PostTopic"]',{
				'forum' : data.category
			},false);
			driver.then(function() {
				driver.click('#post_submit');
			});
		}, function fail() {
			driver.waitForSelector('#post_submit',function success() {							
				driver.test.assertExists('#post_submit');
				driver.click('#post_submit');
			},function fail() {
				driver.echo('Unable to submit form','ERROR');
			});
		});
	},function fail(){
		driver.echo('Unable to Open Form To Start Topic','ERROR');
	});
	driver.then(function() {
		return callback(null);
	});
};
//*************************method to compose a post by register user ************************************
postEventMemberApprovalMethod.composePost = function(driver, test, callback) {
	driver.echo('Inside the composePost method','INFO');
	test.assertExists('a.topic-title', 'Composed topic is found');
	topic = driver.evaluate(function() {
		var name = document.querySelector('a.topic-title span');
		return name.innerHTML;
	});
	driver.echo('*******************************************************','INFO');
	driver.echo('*           The name of the topic is-'+topic+        '*','INFO');
	driver.echo('*******************************************************','INFO');
	driver.click('div.panel-body.table-responsive ul li span span:nth-child(2) a');
	driver.waitForSelector('form[name="PostTopic"]',function success(){
		currentUrl = driver.getCurrentUrl();
		driver.fill('form[name="PostTopic"]',{
			'message': "Hello I am Register user"
		},false);
		driver.waitForSelector('#reply_submit',function success() {
			driver.test.assertExists('#reply_submit');
			driver.click('#reply_submit');
			driver.wait(2000,function() {
				return callback(null);
			});
		},function fail(){
			driver.echo('Reply Submit button not found', 'ERROR');
		});
	},function fail(){
		driver.echo('Reply Post Compose form Doesnot visible', 'ERROR');
	});
};

// method to get the id of the post
postEventMemberApprovalMethod.getPostId = function(driver, test, callback) {
	driver.then(function() {
		forumLoginMethod.logoutFromApp(casper, function() { });
	});
	driver.then(function() {
		//login with admin user to get the id of the post and to approve it
		casper.echo('Title of the page :' +driver.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(json["AdminUserLogin"].username, json["AdminUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						driver.echo('User has been successfuly login to application with admin user', 'INFO');
						driver.capture('aftercategory.png');
						driver.waitForSelector('a[href="/categories"]', function success() {
							test.assertExists('a[href="/categories"]','Category link found');
							driver.click('a[href="/categories"]');
							driver.wait(5000, function() {
								driver.capture('aftercategory.png');
							});
							driver.waitForSelector('li#approvalQueue a', function success() {
								test.assertExists('li#approvalQueue a','Approval Queue found');
								driver.click('li#approvalQueue a');
								driver.wait(3000, function() {
									var post_id = casper.evaluate(function() {
										var element=document.querySelectorAll("div[id^='post_message_']");
										var id = element[element.length-1].id;
										return id;	
										});
									postId = post_id.split("_");
									driver.echo('post id ; '+postId[2], 'INFO');
									return callback(null, postId[2]);
								});
							},function fail(){
								driver.echo('Approval Queue not Found','INFO');
							});        
						},function fail(){
							driver.echo('Categories not Found','ERROR');
						});
					} else {
						casper.echo('User not logged in','ERROR');	
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'INFO');
			}
		});
	});
};

//****************** method to delete the approved post*************************
postEventMemberApprovalMethod.deletePost = function(driver, test, callback) {
	driver.thenOpen(currentUrl, function() {
		casper.echo('Inside the deletePost method','INFO');
		driver.test.assertExists('form[name="posts"] div#post_list_'+postId[2] + ' input');
		driver.click('form[name="posts"] div#post_list_'+postId[2] + ' input');
		driver.waitForSelector('input#deleteposts', function() {
			driver.click('input#deleteposts');
			driver.wait(5000,function() {
				driver.capture('approveddelete.png');
				return callback(null);
			});
		});
	});
};

