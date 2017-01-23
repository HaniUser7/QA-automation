/***These are the function which has been called in postEventMemberApproval.js and also will be used in other js file as per requirement**********/

'use strict';
var json = require('../../testdata/postEventMemberApproval.json');
var config = require('../../../config/config.json');
var postEventMemberApprovalMethod = require('../methods/postEventMemberApproval.js');
var registerMethod = require('../methods/register.js');
var forumLoginMethod = require('../methods/login.js');
var privateMessageMethod = require('../methods/privateMessage.js');
var backEndForumRegisterMethod = require('../methods/backEndRegistration.js');
var wait = require('../wait.js');
var postEventMemberApprovalTestcases = module.exports = {};

// method to create a topic 
postEventMemberApprovalTestcases.createTopic = function() {
//Open front end and logged in as register user
	try {
		casper.test.assertExists('a.topic-title','Topic found');
	} catch (e) {
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						//method to create a new topic
						postEventMemberApprovalMethod.startTopic(json.newTopic, casper, function(err) {
							if(!err) {
								casper.echo('new topic method called successfully', 'INFO');
							}else {
								casper.echo('Topic not created', 'INFO');
							}
						});	
					} else {
						casper.echo('User icon not found','ERROR');	
					}
				});
			}else {
				casper.echo('User not logged in', 'INFO');
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	}
};

// method to Approve a pending post from- Approval queue button 
postEventMemberApprovalTestcases.approvalQueueButton = function() {
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                      CASE 1', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*                   Approve a pending post from- Approval queue button             *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		//method to enable approve new post** All posts
		postEventMemberApprovalMethod.enableApproveNewPost(casper, casper.test, function(err) {
			if(!err) {
				casper.echo('Enable Approve New Post functionality method called ','INFO');
			}
		});
		casper.then(function() {
			//method to set the user permission to Administration 
			postEventMemberApprovalMethod.setAdmin(casper, casper.test, function(err) {
				if(!err) {
					casper.echo('Set admin method called ','INFO');
				}
			});
		});
	});
	//Open front end and logged in as register user
	casper.thenOpen(config.url, function() {
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {							
						//method to compose a post by register user
						postEventMemberApprovalMethod.composePost(casper, casper.test, function(err) {
							if(!err) {
								casper.echo('Inside the composePost method calling...','INFO');	
								// method to get the id of the post
								postEventMemberApprovalMethod.getPostId(casper, casper.test, function(err, postId) {
									if(!err) {
										casper.echo('getPostId method calling...','INFO');
										casper.waitForSelector('div.post-edit.pull-right.dropdown a', function success() {
											casper.click('div.post-edit.pull-right.dropdown a i');
											casper.wait(7000, function() {
											});
										},function fail(){
											casper.echo('Approve button not found','ERROR');
										});
										casper.then(function() {
											casper.test.assertDoesntExist('span#post_message_'+postId[2],'post is not  visible on the approval queue page');
										});
										casper.then(function() {
											postEventMemberApprovalMethod.deletePost(casper, casper.test, function () {
												casper.echo('Inside the deletePost method calling...','INFO');
											});
										});
									} else {
										casper.echo('getPostId method not called successfully','INFO');
									}
								});
							} else {
								casper.echo('User icon not found','ERROR');	
							}
						});
					}else {
						casper.echo('User not logged in', 'INFO');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});
};

// // method to Approve a pending post -By clicking on topic
postEventMemberApprovalTestcases.byClickingOnTopic = function() {
	//Open Back-End URL And Get Title and logout if logged in
	/*casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                      CASE 2', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*                   Approve a pending post -By clicking on topic             *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		//method to enable approve new post** All posts
		postEventMemberApprovalMethod.enableApproveNewPost(casper, casper.test, function(err) {
			if(!err) {
				casper.echo('Enable Approve New Post functionality method called ','INFO');
			}
		});
		casper.then(function() {
			//method to set the user permission to Administration 
			postEventMemberApprovalMethod.setAdmin(casper, casper.test, function(err) {
				if(!err) {
					casper.echo('Set admin method called ','INFO');
				}
			});
		});
	});*/
	//Open front end and logged in as register user
	casper.thenOpen(config.url, function() {
		casper.echo('*                   Approve a pending post -By clicking on topic             *', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {							
						//method to compose a post by register user
						postEventMemberApprovalMethod.composePost(casper, casper.test, function(err) {
							if(!err) {
								casper.echo('Inside the composePost method calling...','INFO');	
								// method to get the id of the post
								postEventMemberApprovalMethod.getPostId(casper, casper.test, function(err, postId) {
									if(!err) {
										casper.echo('getPostId method calling...','INFO');
										casper.waitForSelector('form#approveMembers span.post-body-author a', function success(){
										casper.test.assertExists('form#approveMembers span.post-body-author a','topic button found');
										casper.click('form#approveMembers span.post-body-author a');
										casper.waitForSelector('div.pending-post span.text-danger', function success(){
											casper.test.assertExists('div.pending-post span.text-danger','post found');
											casper.echo(casper.fetchText('div.pending-post span.text-danger'));
											casper.echo('*****************************************', 'INFO');
											casper.test.assertExists('div.post-edit.pull-right.dropdown a.alert.alert-success.pull-left','approve tick found');
								                        casper.click('div.post-edit.pull-right.dropdown a.alert.alert-success.pull-left');
								                          
								                        casper.wait(5000,function(){
								                        casper.test.assertDoesntExist('div.post-edit.pull-right.dropdown a.alert.alert-success.pull-left' ,'All Approved and  delete options are disappear');
								                        casper.capture('removed.png');
								                        });
											casper.then(function() {
												postEventMemberApprovalMethod.deletePost(casper, casper.test, function () {
													casper.echo('Inside the deletePost method calling...','INFO');
												});
											});
										},function fail(){
											casper.echo('post not found','ERROR');
										});
									},function fail(){
										casper.echo('1st post not found','ERROR');
									});
									} else {
										casper.echo('getPostId method not called successfully','INFO');
									}
								});
							} else {
								casper.echo('User icon not found','ERROR');	
							}
						});
					}else {
						casper.echo('User not logged in', 'INFO');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});
};

// method to Approve a pending post by select the pending post by  check box
postEventMemberApprovalTestcases.byCheckBox = function() {
	//Open Back-End URL And Get Title and logout if logged in
	/*casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                      CASE 3', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*             Approve a pending post by select the pending post by  check box      *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		//method to enable approve new post** All posts
		postEventMemberApprovalMethod.enableApproveNewPost(casper, casper.test, function(err) {
			if(!err) {
				casper.echo('Enable Approve New Post functionality method called ','INFO');
			}
		});
		casper.then(function() {
			//method to set the user permission to Administration 
			postEventMemberApprovalMethod.setAdmin(casper, casper.test, function(err) {
				if(!err) {
					casper.echo('Set admin method called ','INFO');
				}
			});
		});
	});*/
	//Open front end and logged in as register user
	casper.thenOpen(config.url, function() {
		casper.echo('*             Approve a pending post by select the pending post by  check box      *', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {							
						//method to compose a post by register user
						postEventMemberApprovalMethod.composePost(casper, casper.test, function(err) {
							if(!err) {
								casper.echo('Inside the composePost method calling...','INFO');	
								// method to get the id of the post
								postEventMemberApprovalMethod.getPostId(casper, casper.test, function(err, postId) {
									if(!err) {
										casper.echo('getPostId method calling...','INFO');
										casper.waitForSelector('div.post-edit.pull-right.dropdown input.entry-checkbox', function success(){
											casper.evaluate(function() {
												document.querySelector('div.post-edit.pull-right.dropdown input.entry-checkbox:nth-of-type(1)').click();
											});
											casper.test.assertExists('div#pending-menu','floating menu is appear on bottom of the page');
											casper.test.assertExists('div#pending-menu span.dropdown a.text-success i', 'approve tick on the floating menu******************');
											casper.click('div#pending-menu span.dropdown a.text-success i');
										},function fail(){
											casper.echo('Checkbox not Found','INFO');
										});
										casper.then(function() {
											casper.test.assertDoesntExist('span#post_message_'+postId[2] ,'post is not visible on the approval queue page');
										});
										casper.then(function() {
											postEventMemberApprovalMethod.deletePost(casper, casper.test, function () {
												casper.echo('Inside the deletePost method calling...','INFO');
											});
										}); 
									} else {
										casper.echo('getPostId method not called successfully','INFO');
									}
								});
							} else {
								casper.echo('User icon not found','ERROR');	
							}
						});
					}else {
						casper.echo('User not logged in', 'INFO');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});
};

// method to Approve a pending post by select all pending post by  check box
postEventMemberApprovalTestcases.byCheckBoxAll = function() {
	//Open Back-End URL And Get Title and logout if logged in
	/*casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                      CASE 4', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*             Approve a pending post by select all pending post by  check box      *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		//method to enable approve new post** All posts
		postEventMemberApprovalMethod.enableApproveNewPost(casper, casper.test, function(err) {
			if(!err) {
				casper.echo('Enable Approve New Post functionality method called ','INFO');
			}
		});
		casper.then(function() {
			//method to set the user permission to Administration 
			postEventMemberApprovalMethod.setAdmin(casper, casper.test, function(err) {
				if(!err) {
					casper.echo('Set admin method called ','INFO');
				}
			});
		});
	});*/
	//Open front end and logged in as register user
	casper.thenOpen(config.url, function() {
		casper.echo('*             Approve a pending post by select all pending post by  check box      *', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {							
						//method to compose a post by register user
						postEventMemberApprovalMethod.composePost(casper, casper.test, function(err) {
							if(!err) {
								casper.echo('Inside the composePost method calling...','INFO');	
								// method to get the id of the post
								postEventMemberApprovalMethod.getPostId(casper, casper.test, function(err, postId) {
									if(!err) {
										casper.echo('getPostId method calling...','INFO');
										casper.waitForSelector('div.subheading input.entry-checkbox', function success(){
											casper.test.assertExists('div.subheading input.entry-checkbox','check box found');
											casper.evaluate(function(){
												document.querySelector('div.subheading input.entry-checkbox').click();
											});
											casper.test.assertExists('div#pending-menu','floating menu is appear on bottom of the page');
											casper.test.assertExists('div#pending-menu span.dropdown a.text-success i', 'APPROVE TICK ON THE FLOATING MENU');
											casper.waitForSelector('div#pending-menu',function success(){
												casper.click('div#pending-menu span.dropdown a.text-success i');
												casper.echo('***********TEXT FETCHED***********', 'INFO');
												casper.echo(casper.fetchText('form[name="posts"] div.alert.alert-info.text-center'),'INFO');	
											}, function fail(){
												casper.echo('Floating Menu not Found','INFO');
											});
										},function fail(){
											casper.echo('Checkbox not Found','INFO');
										});
										casper.then(function() {
											postEventMemberApprovalMethod.deletePost(casper, casper.test, function () {
												casper.echo('Inside the deletePost method calling...','INFO');
											});
										});
									} else {
										casper.echo('getPostId method not called successfully','INFO');
									}
								});
							} else {
								casper.echo('User icon not found','ERROR');	
							}
						});
					}else {
						casper.echo('User not logged in', 'INFO');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});
};

// method to Delete a pending post from- Approval queue button 
postEventMemberApprovalTestcases.deleteApprovalQueueButton = function() {
	//Open front end and logged in as register user
	casper.thenOpen(config.url, function() {
		casper.echo('*             Test case 5      *', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {							
						//method to compose a post by register user
						postEventMemberApprovalMethod.composePost(casper, casper.test, function(err) {
							if(!err) {
								casper.echo('Inside the composePost method calling...','INFO');	
								// method to get the id of the post
								postEventMemberApprovalMethod.getPostId(casper, casper.test, function(err, postId) {
									if(!err) {
										casper.waitForSelector('div.post-edit.pull-right.dropdown a.alert.alert-danger.pull-left', function success() {
											casper.click('div.post-edit.pull-right.dropdown a.alert.alert-danger.pull-left');
										},function fail(){
											casper.echo('Delete button not found','ERROR');
										});
										casper.then(function() {
											casper.test.assertDoesntExist('span#post_message_'+postId[2] ,'************Post is Deleted from the approval queue***************');
										});
									} else {
										casper.echo('getPostId method not called successfully','INFO');
									}
								});
							} else {
								casper.echo('User icon not found','ERROR');	
							}
						});
					}else {
						casper.echo('User not logged in', 'INFO');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});
};

// method to Delete a pending post -By clicking on  post 
postEventMemberApprovalTestcases.deleteClickingPost = function() {
	//Open front end and logged in as register user
	casper.thenOpen(config.url, function() {
		casper.echo('*             Test case 6      *', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {							
						//method to compose a post by register user
						postEventMemberApprovalMethod.composePost(casper, casper.test, function(err) {
							if(!err) {
								casper.echo('Inside the composePost method calling...','INFO');	
								// method to get the id of the post
								postEventMemberApprovalMethod.getPostId(casper, casper.test, function(err, postId) {
									if(!err) {
										casper.waitForSelector('form#approveMembers span.post-body-author a', function success() {
											casper.click('form#approveMembers span.post-body-author a');
											casper.waitForSelector('div.pending-post span.text-danger', function success() {
												casper.echo(casper.fetchText('div.pending-post span.text-danger'),'INFO');
												casper.echo('*************************************', 'INFO');
												casper.test.assertExists('a[id^="delete_pending_"]','Delete tick found');
												casper.click('a[id^="delete_pending_"]');
												casper.capture('delete_pending.png');
												casper.wait(3000);
												casper.reload(function() {
													casper.test.assertDoesntExist('span#post_message_'+postId[2] ,'**********post is  not  present on the approval queue page Hence Deleted.*************');
													casper.capture('post.png');
												});
											},function fail(){
												casper.echo('post found not found','ERROR');
											});
						
										},function fail(){
											casper.echo('post found not found','ERROR');
										});
									} else {
										casper.echo('getPostId method not called successfully','INFO');
									}
								});
							} else {
								casper.echo('User icon not found','ERROR');	
							}
						});
					}else {
						casper.echo('User not logged in', 'INFO');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});
};
// method to Delete a pending post by select the pending post by  check box
postEventMemberApprovalTestcases.deleteByCheckBox = function() {
	//Open front end and logged in as register user
	casper.thenOpen(config.url, function() {
		casper.echo('*             Test case 7      *', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {							
						//method to compose a post by register user
						postEventMemberApprovalMethod.composePost(casper, casper.test, function(err) {
							if(!err) {
								casper.echo('Inside the composePost method calling...','INFO');	
								// method to get the id of the post
								postEventMemberApprovalMethod.getPostId(casper, casper.test, function(err, postId) {
									if(!err) {
										casper.waitForSelector('div.post-edit.pull-right.dropdown input.entry-checkbox', function success(){
											casper.evaluate(function() {
												document.querySelector('div.post-edit.pull-right.dropdown input.entry-checkbox:nth-of-type(1)').click();
											});
											casper.test.assertExists('div#pending-menu','floating menu is appear on bottom of the page');
											casper.test.assertExists('div#pending-menu span.dropdown a.text-danger i', 'Delete tick on the floating menu******************');
											casper.click('div#pending-menu span.dropdown a.text-danger i');
										},function fail(){
											casper.echo('Checkbox not Found','INFO');
										});
										casper.then(function() {
											casper.test.assertDoesntExist('span#post_message_'+postId[2] , 'post is deleted from Approval Queue  on clicking checkbox');
										});
									} else {
										casper.echo('getPostId method not called successfully','INFO');
									}
								});
							} else {
								casper.echo('User icon not found','ERROR');	
							}
						});
					}else {
						casper.echo('User not logged in', 'INFO');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});
};
// method to Delete a pending post by select all pending post by  check box
postEventMemberApprovalTestcases.deleteByAllCheckBox = function() {
	//Open front end and logged in as register user
	casper.thenOpen(config.url, function() {
		casper.echo('*             Test case 8      *', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {							
						//method to compose a post by register user
						postEventMemberApprovalMethod.composePost(casper, casper.test, function(err) {
							if(!err) {
								casper.echo('Inside the composePost method calling...','INFO');	
								// method to get the id of the post
								postEventMemberApprovalMethod.getPostId(casper, casper.test, function(err, postId) {
									if(!err) {
										casper.waitForSelector('div.subheading input.entry-checkbox', function success() {
											casper.test.assertExists('div.subheading input.entry-checkbox','check box found');
											casper.evaluate(function(){
												document.querySelector('div.subheading input.entry-checkbox').click();
											});
											casper.test.assertExists('div#pending-menu','floating menu is appear on bottom of the page');
											casper.test.assertExists('div#pending-menu span.dropdown a.text-danger i', 'DELETE TICK ON THE FLOATING MENU');
											casper.waitForSelector('div#pending-menu',function success() {
												casper.capture('allcheckboxselected.png');
												casper.click('div#pending-menu span.dropdown a.text-danger i');
												casper.echo('***********TEXT FETCHED ***********', 'INFO');
												casper.echo(casper.fetchText('form[name="posts"] div.alert.alert-info.text-center'),'INFO');
											}, function fail(){
												casper.echo('Floating Menu not Found','INFO');
											});
										},function fail(){
											casper.echo('Checkbox not Found','INFO');
										});   
									} else {
										casper.echo('getPostId method not called successfully','INFO');
									}
								});
							} else {
								casper.echo('User icon not found','ERROR');	
							}
						});
					}else {
						casper.echo('User not logged in', 'INFO');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});
};
// method to edit a pending post from- Approval queue button 
postEventMemberApprovalTestcases.editApprovalQueueButton = function() {
	//Open front end and logged in as register user
	casper.thenOpen(config.url, function() {
		casper.echo('*             Test case 9      *', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {							
						//method to compose a post by register user
						postEventMemberApprovalMethod.composePost(casper, casper.test, function(err) {
							if(!err) {
								casper.echo('Inside the composePost method calling...','INFO');	
								// method to get the id of the post
								postEventMemberApprovalMethod.getPostId(casper, casper.test, function(err, postId) {
									if(!err) {
										casper.waitForSelector('div.post-edit.pull-right.dropdown a.alert.alert-gray.pull-left', function success() {
											casper.click('div.post-edit.pull-right.dropdown a.alert.alert-gray.pull-left');
												casper.waitForSelector('#message1_ifr', function success() {
													casper.test.assertExists('#message1_ifr','message1-ifr found So the post is editable');
													casper.withFrame('message1_ifr', function() {
												 		casper.sendKeys('#tinymce', "Hello I am Admin and edited the post");	
													});
												}, function fail(){
													casper.echo('message1_ifr not found','ERROR');
												});
											casper.then(function() {
												casper.click('div.form-group.cleared input[name="save"]');
												casper.wait(5000,function () {
													casper.capture('editqueue.png');
												});
											 });
										},function fail(){
											casper.echo('Edit button not found','ERROR');
										});
									} else {
										casper.echo('getPostId method not called successfully','INFO');
									}
								});
							} else {
								casper.echo('User icon not found','ERROR');	
							}
						});
					}else {
						casper.echo('User not logged in', 'INFO');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});
};

// method to edit a pending post by clicking on it
postEventMemberApprovalTestcases.editByClickingPost = function() {
	//Open front end and logged in as register user
	casper.thenOpen(config.url, function() {
		casper.echo('*             Test case 10     *', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(json["RegisteredUserLogin"].username, json["RegisteredUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {							
						//method to compose a post by register user
						postEventMemberApprovalMethod.composePost(casper, casper.test, function(err) {
							if(!err) {
								casper.echo('Inside the composePost method calling...','INFO');	
								// method to get the id of the post
								postEventMemberApprovalMethod.getPostId(casper, casper.test, function(err, postId) {
									if(!err) {
										casper.waitForSelector('form#approveMembers span.post-body-author a', function success() {
											casper.click('form#approveMembers span.post-body-author a');
											casper.waitForSelector('div.pending-post span.text-danger', function success() {
												casper.echo(casper.fetchText('div.pending-post span.text-danger'));
												casper.echo('*****************************************');
												casper.click('#posttoggle_'+postId[2]+' i');
												casper.mouse.move('#post_list_' +postId[2]);
												casper.click('a[data-pid="'+postId[2]+'"]');
												casper.waitForSelector('#message1_ifr', function success() {
													test.assertExists('#message1_ifr','message1-ifr found So the post is editable');
													casper.withFrame('message1_ifr', function() {
												 		casper.sendKeys('#tinymce', "Hello I am Admin and edited the post");	
													});
												}, function fail(){
													casper.echo('message1_ifr not found','ERROR');
												});
												casper.then(function() {
													casper.click('div.form-group.cleared input[name="save"]');
													casper.wait(5000,function () {
														casper.capture('edit2.png');
													});
											 	});
											},function fail(){
												casper.echo('alert not found','ERROR');
											});
										},function fail(){
											casper.echo('post not found','ERROR');
										});
									} else {
										casper.echo('getPostId method not called successfully','INFO');
									}
								});
							} else {
								casper.echo('User icon not found','ERROR');	
							}
						});
					}else {
						casper.echo('User not logged in', 'INFO');
					}
				});
			} else {
				casper.echo('User not logged','ERROR');						
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});
};

// method to check the functionality of approve post for guest user
postEventMemberApprovalTestcases.unregisterUserApprovePost = function() {
	//Open front end and logged in as register user
	casper.thenOpen(config.url, function() {
		casper.echo('*             Test case 11     *', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		//method to compose a post by register user
		postEventMemberApprovalMethod.composePost(casper, casper.test, function(err) {
			if(!err) {
				casper.echo('','INFO');
			} else {
				casper.echo('Not called compose method','INFO');
			}
		});
	});
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		//method to disable approve new post** All posts
		postEventMemberApprovalMethod.disableApproveNewPost(casper, casper.test, function(err) {
			if(!err) {
				casper.echo('Enable Approve New Post functionality method called ','INFO');
			}
		});
	});
};

// Test cases for event approval 
// method to Approve a pending event -Approval queue button
postEventMemberApprovalTestcases.eventApprovalByApprovalQueueButton = function() {
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                      CASE 1', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*                   Approve a pending Event from- Approval queue button             *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		//method to enable approve new post** All posts
		postEventMemberApprovalMethod.enableEventApproval(casper, casper.test, function(err) {
			if(!err) {
				casper.echo('Enable Approve New Event functionality method called ','INFO');
			}
		});
		casper.then(function() {
			//method to set the user permission to Administration 
			postEventMemberApprovalMethod.setAdmin(casper, casper.test, function(err) {
				if(!err) {
					casper.echo('Set admin method called ','INFO');
				}
			});
		});
	});
	//Open front end and logged in as register user
	casper.thenOpen(config.url, function() {
		//method to compose a post by register user
		postEventMemberApprovalMethod.composeEvent(casper, casper.test, function(err,eventId) {
			if(!err) {
				postEventMemberApprovalMethod.goToApprovalQueuePage(casper, casper.test, function(err) {
					if(!err) {
						casper.waitForSelector('div.post-edit.pull-right.dropdown', function success() {
							casper.click('a#approveEvent_'+eventId+' i');
							casper.waitWhileVisible('div#event_'+eventId , function success() {
								casper.test.assertDoesntExist('div#event_'+eventId ,'event is deleted from the page','INFO');
							}, function fail() { 
								casper.test.assertExists('div#event_'+eventId ,'event is not deleted from the page','INFO');
							});
						}, function fail() {
							casper.echo('approve tick not found','ERROR');
						});
					} else {
						casper.echo('Not called goToApprovalQueuePage method','INFO');
					}
				});
			} else {
				casper.echo('Not called compose event method','INFO');
			}
		});
	});
};

// method to Approve a pending event -By clicking on event
postEventMemberApprovalTestcases.eventApprovalByClickingOnEvent = function() {
	//Open front end and logged in as register user
	casper.thenOpen(config.url, function() {
		casper.echo('                                      CASE 12', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*                   Approve a pending event -By clicking on event                  *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		//method to compose a post by register user
		postEventMemberApprovalMethod.composeEvent(casper, casper.test, function(err,eventId) {
			if(!err) {
				postEventMemberApprovalMethod.goToApprovalQueuePage(casper, casper.test, function(err) {
					if(!err) {
						casper.waitForSelector('form#approveMembers span.post-body-author a', function success() {
							casper.click('span[data-eventid="'+eventId+'"] a');
							casper.waitForSelector('div.cleared.event-footer strong', function success(){
								casper.test.assertExists('div.cleared.event-footer strong','Event found');
								casper.echo(casper.fetchText('div.cleared.event-footer strong'),'INFO');
								casper.echo('*****************************************','INFO');
								casper.test.assertDoesntExist('a#deleteEvent_'+eventId+' i','Delete button is not available','INFO');
								casper.capture('OnEventClick.png');
							}, function fail() {
								casper.echo('Event alert not found','ERROR');
							});
						},function fail(){
							casper.echo('Event title not found','ERROR');
						});
					} else {
						casper.echo('Not called goToApprovalQueuePage method','INFO');
					}
				});
			} else {
				casper.echo('Not called compose event method','INFO');
			}
		});
	});
};
		
// method to Approve a pending event by select the pending event by  check box
postEventMemberApprovalTestcases.eventApprovalByCheckBox = function() {
	//Open front end and logged in as register user
	casper.thenOpen(config.url, function() {
		casper.echo('                                      CASE 13', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*           Approve a pending event by select the pending event by  check box       *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		//method to compose a post by register user
		postEventMemberApprovalMethod.composeEvent(casper, casper.test, function(err,eventId) {
			if(!err) {
				postEventMemberApprovalMethod.goToApprovalQueuePage(casper, casper.test, function(err) {
					if(!err) {
						casper.waitForSelector('div.post-edit.pull-right.dropdown input.entry-checkbox', function success(){
							casper.click('input#eventaction_'+eventId);
							casper.test.assertExists('div#pending-menu','floating menu is appear on bottom of the page','INFO');
							casper.test.assertExists('i#approvePending', 'approve tick on the floating menu******************');
							casper.click('i#approvePending');
							casper.waitWhileVisible('div#event_'+eventId , function success() {
								casper.test.assertDoesntExist('div#event_'+eventId ,'event is deleted from the page','INFO');
							}, function fail() { 
								casper.test.assertExists('div#event_'+eventId ,'event is not deleted from the page','INFO');
							});
						},function fail(){
							casper.echo('Checkbox not Found','INFO');
						});  
					} else {
						casper.echo('Not called goToApprovalQueuePage method','INFO');
					}
				});
			} else {
				casper.echo('Not called compose event method','INFO');
			}
		});
	});
};
		
// method to Approve a pending event by select all pending event by  check box
postEventMemberApprovalTestcases.eventApprovalByCheckBoxAll = function() {
	//Open front end and logged in as register user
	casper.thenOpen(config.url, function() {
		casper.echo('                                      CASE 14', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*           Approve a pending event by select all pending event by  check box      *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		//method to compose a post by register user
		postEventMemberApprovalMethod.composeEvent(casper, casper.test, function(err,eventId) {
			if(!err) {
				postEventMemberApprovalMethod.goToApprovalQueuePage(casper, casper.test, function(err) {
					if(!err) {
						casper.waitForSelector('input#select_all_pending_events', function success() {
							casper.click('input#select_all_pending_events');
							casper.test.assertExists('div#pending-menu','floating menu is appear on bottom of the page');
							casper.waitForSelector('div#pending-menu',function success() {
								casper.test.assertExists('div#pending-menu','floating menu is appear on bottom of the page');
								casper.test.assertExists('i#approvePending', 'APPROVE TICK ON THE FLOATING MENU');
								casper.click('i#approvePending');
								casper.waitUntilVisible('form[name="posts"] div.alert.alert-info.text-center', function success() {
									var actualText = casper.fetchText('form[name="posts"] div.alert.alert-info.text-center');
									var expectedText = "There's currently nothing that needs your approval.";	
									casper.test.assert(actualText.indexOf(expectedText) > -1);
								}, function fail() { 
									casper.echo('events not deleted from the page','INFO');
								});
							}, function fail(){
								casper.echo('Floating Menu not Found','INFO');
							});
						},function fail(){
							casper.echo('Checkbox not Found','INFO');
						});  
					} else {
						casper.echo('Not called goToApprovalQueuePage method','INFO');
					}
				});
			} else {
				casper.echo('Not called compose event method','INFO');
			}
		});
	});
};
		
// method to Delete a pending event from- Approval queue button 
postEventMemberApprovalTestcases.eventdeleteByApprovalQueueButton = function() {
	//Open front end and logged in as register user
	casper.thenOpen(config.url, function() {
		casper.echo('                                      CASE 15', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*                Delete a pending event from- Approval queue button                *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		//method to compose a post by register user
		postEventMemberApprovalMethod.composeEvent(casper, casper.test, function(err,eventId) {
			if(!err) {
				postEventMemberApprovalMethod.goToApprovalQueuePage(casper, casper.test, function(err) {
					if(!err) {
						casper.waitForSelector('div.post-edit.pull-right.dropdown', function success() {
							casper.click('a#deleteEvent_'+eventId+' i');
							casper.waitWhileVisible('div#event_'+eventId , function success() {
								casper.test.assertDoesntExist('div#event_'+eventId ,'event is deleted from the page','INFO');
							}, function fail() { 
								casper.test.assertExists('div#event_'+eventId ,'event is not deleted from the page','INFO');
							});
						}, function fail() {
							casper.echo('approve tick not found','ERROR');
						});  
					} else {
						casper.echo('Not called goToApprovalQueuePage method','INFO');
					}
				});
			} else {
				casper.echo('Not called compose event method','INFO');
			}
		});
	});
};
		
// method to Delete a pending event -By clicking on it 
postEventMemberApprovalTestcases.eventdeleteByClickingEvent = function() {
	//Open front end and logged in as register user
	casper.thenOpen(config.url, function() {
		casper.echo('                                      CASE 16', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*                   Delete a pending event -By clicking on it                      *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		//method to compose a post by register user
		postEventMemberApprovalMethod.composeEvent(casper, casper.test, function(err,eventId) {
			if(!err) {
				postEventMemberApprovalMethod.goToApprovalQueuePage(casper, casper.test, function(err) {
					if(!err) {
						casper.waitForSelector('form#approveMembers span.post-body-author a', function success() {
							casper.click('span[data-eventid="'+eventId+'"] a');
							casper.waitForSelector('div.cleared.event-footer strong', function success(){
								casper.test.assertExists('div.cleared.event-footer strong','Event found');
								casper.echo(casper.fetchText('div.cleared.event-footer strong'),'INFO');
								this.echo('*****************************************','INFO');
								casper.test.assertDoesntExist('a#deleteEvent_'+eventId+' i','Delete button is not available','INFO');
								this.capture('DeleteOnEventClick.png');
							}, function fail() {
								casper.echo('Event alert not found','ERROR');
							});
						},function fail(){
							casper.echo('Event title not found','ERROR');
						});
					} else {
						casper.echo('Not called goToApprovalQueuePage method','INFO');
					}
				});
			} else {
				casper.echo('Not called compose event method','INFO');
			}
		});
	});
};
		
// method to Delete a pending event by select the pending post by  check box
postEventMemberApprovalTestcases.eventdeleteByCheckBox = function() {
	//Open front end and logged in as register user
	casper.thenOpen(config.url, function() {
		casper.echo('                                      CASE 17', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*         Delete a pending event by select the pending post by  check box          *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		//method to compose a post by register user
		postEventMemberApprovalMethod.composeEvent(casper, casper.test, function(err,eventId) {
			if(!err) {
				postEventMemberApprovalMethod.goToApprovalQueuePage(casper, casper.test, function(err) {
					if(!err) {
						casper.waitForSelector('div.post-edit.pull-right.dropdown input.entry-checkbox', function success(){
							casper.click('input#eventaction_'+eventId);
							casper.test.assertExists('div#pending-menu','floating menu is appear on bottom of the page','INFO');
							casper.test.assertExists('i#decline_pending', 'Delete tick on the floating menu******************');
							casper.click('i#decline_pending');
							casper.waitWhileVisible('div#event_'+eventId , function success() {
								casper.test.assertDoesntExist('div#event_'+eventId ,'event is deleted from the page','INFO');
							}, function fail() { 
								casper.test.assertExists('div#event_'+eventId ,'event is not deleted from the page','INFO');
							});
						},function fail(){
							casper.echo('Checkbox not Found','INFO');
						});  
					} else {
						casper.echo('Not called goToApprovalQueuePage method','INFO');
					}
				});
			} else {
				casper.echo('Not called compose event method','INFO');
			}
		});
	});
};
		
// method to Delete a pending event by select all pending post by  check box
postEventMemberApprovalTestcases.eventdeleteByAllCheckBox = function() {
	//Open front end and logged in as register user
	casper.thenOpen(config.url, function() {
		casper.echo('                                      CASE 18', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*           Delete a pending event by select all pending post by  check box        *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		//method to compose a post by register user
		postEventMemberApprovalMethod.composeEvent(casper, casper.test, function(err,eventId) {
			if(!err) {
				postEventMemberApprovalMethod.goToApprovalQueuePage(casper, casper.test, function(err) {
					if(!err) {
						casper.waitForSelector('input#select_all_pending_events', function success() {
							casper.click('input#select_all_pending_events');
							casper.test.assertExists('div#pending-menu','floating menu is appear on bottom of the page');
							casper.waitForSelector('div#pending-menu',function success() {
								casper.test.assertExists('i#decline_pending', 'Delete TICK ON THE FLOATING MENU');
								casper.click('i#decline_pending');
								casper.waitUntilVisible('form[name="posts"] div.alert.alert-info.text-center', function success() {
									var actualText = casper.fetchText('form[name="posts"] div.alert.alert-info.text-center');
									var expectedText = "There's currently nothing that needs your approval.";	
									casper.test.assert(actualText.indexOf(expectedText) > -1);
								}, function fail() { 
									casper.echo('events not deleted from the page','INFO');
								});
							}, function fail(){
								casper.echo('Floating Menu not Found','INFO');
							});
						},function fail(){
							casper.echo('Checkbox not Found','INFO');
						}); 
					} else {
						casper.echo('Not called goToApprovalQueuePage method','INFO');
					}
				});
			} else {
				casper.echo('Not called compose event method','INFO');
			}
		});
	});
};
		
// method to edit a pending event by clicking on it
postEventMemberApprovalTestcases.eventEditByClickingOnIt = function() {
	//Open front end and logged in as register user
	casper.thenOpen(config.url, function() {
		casper.echo('                                      CASE 19', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*                         edit a pending event by clicking on it                   *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		//method to compose a post by register user
		postEventMemberApprovalMethod.composeEvent(casper, casper.test, function(err,eventId) {
			if(!err) {
				postEventMemberApprovalMethod.goToApprovalQueuePage(casper, casper.test, function(err) {
					if(!err) {
						casper.waitForSelector('div.post-edit.pull-right.dropdown', function success() {
						casper.click('a#edit_'+eventId+' i');
							casper.waitForSelector('div.editable-input textarea', function success() {
								var text = this.fetchText('div.editable-input textarea');
								casper.echo('The text of the event is--'+text,'INFO');
								casper.sendKeys('div.editable-input textarea', 'Event is edited');
								casper.wait(5000,function () {
									casper.click('a#edit_'+eventId+' i');
									var text2 = this.fetchText('div.editable-input textarea');
									casper.echo('The text of the event is--'+text2,'INFO');
									if(text2!=text){
										casper.echo('Event edited','INFO');
									} else {
										casper.echo('Event not edited','INFO');
									}
								});
								casper.click('div.editable-buttons i.glyphicon.glyphicon-ok');
								casper.click('div.editable-buttons i.glyphicon.glyphicon-ok');
							}, function fail(){
								casper.echo('Text Area not found','ERROR');
							});
						},function fail(){
							casper.echo('Edit button not found','ERROR');
						});
					} else {
						casper.echo('Not called goToApprovalQueuePage method','INFO');
					}
				});
			} else {
				casper.echo('Not called compose event method','INFO');
			}
		});
	});
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.backEndUrl, function() {
		//method to disable approve new post** All posts
		postEventMemberApprovalMethod.disableEventApproval(casper, casper.test, function(err) {
			if(!err) {
				casper.echo('Disable Approve New Event functionality method called ','INFO');
			}
		});
	});
};

// TestCases to test Member Approval functionality
// method to Approve a pending user from- Approval queue button 
postEventMemberApprovalTestcases.memberApprovalByApprovalQueueButton = function() {
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                      CASE 1', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*                   Approve a pending Member from- Approval queue button           *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		//method to enable approve new post** All posts
		postEventMemberApprovalMethod.enableApproveRegistrationsAndDisableEmail(casper, function(err) {
			if(!err) {
				casper.echo('Enable Approve New Event functionality method called ','INFO');
			}
		});
		casper.then(function() {
			//method to set the user permission to Administration 
			postEventMemberApprovalMethod.setAdmin(casper, casper.test, function(err) {
				if(!err) {
					casper.echo('Set admin method called ','INFO');
				}
			});
		});
	});
	casper.then(function() {
		postEventMemberApprovalMethod.registerMember(json['memberInfo'], casper, function(err) {
			if(!err) {
				casper.then(function() {
					postEventMemberApprovalMethod.goToApprovalQueuePage(casper, casper.test, function(err) {
						if(!err) {
							postEventMemberApprovalMethod.memberId(casper, function(err,memberId) {
								if(!err) {
									casper.then(function() {
										casper.test.assertExists('a#approveMember_'+memberId[1]+' i','approve tick for user member found');
										casper.click('a#approveMember_'+memberId[1]+' i');
										casper.waitWhileVisible('li#member_'+memberId[1], function success() {
											casper.test.assertDoesntExist('li#member_'+memberId[1] ,'username is deleted from the approval queue page','INFO');
										}, function fail() { 
											casper.test.assertExists('li#member_'+memberId[1] ,'username is deleted from the approval queue page','INFO');
										});
									});
									casper.then(function() { // method called to verify  user moved to Registered group
										postEventMemberApprovalMethod.checkPendingUser(casper, function (err) {
											if(!err) {
												casper.echo('Inside the checkPendingUser method','INFO');
											}
										});
									});
									casper.then(function() { // method called to delete the user which is approved above
										postEventMemberApprovalMethod.deleteMember(casper, function (err) {
											if(!err) {
												casper.echo('Inside the deleteUser method','INFO');
											}
										});
									});	
								}
							});
						} else {
							casper.echo('Not called goToApprovalQueuePage method','ERROR');
						}
					});
				});
			} else {
				casper.echo('Not called registerMember method','ERROR');
			}
		});
	});
};

// method to Approve a pending user -By clicking on  user name 
postEventMemberApprovalTestcases.memberApprovalByClickingOnUsername  = function() {
	casper.then(function() {
		casper.echo('                                      CASE 2', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*                   Approve a pending user -By clicking on  user name              *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		postEventMemberApprovalMethod.registerMember(json['memberInfo'], casper, function(err) {
			if(!err) {
				casper.then(function() {
					postEventMemberApprovalMethod.goToApprovalQueuePage(casper, casper.test, function(err) {
						if(!err) {
							postEventMemberApprovalMethod.memberId(casper, function(err,memberId) {
								if(!err) {
									casper.then(function() {
										casper.test.assertExists('li#member_'+memberId[1]+' a strong','Pending user name found');
										casper.click('li#member_'+memberId[1]+' a strong');
										casper.waitForSelector('div.alert.alert-danger', function() {
											var actualText = casper.fetchText('div.alert.alert-danger.text-center strong');
											var expectedText = "This user is pending approval.";
											casper.test.assert(actualText.indexOf(expectedText) > -1);
											casper.click('div.alert.alert-danger.text-center a.btn.btn-success');
											casper.waitWhileVisible('li#member_'+memberId[1], function success() {
												casper.test.assertDoesntExist('li#member_'+memberId[1] ,'username is deleted from the approval queue page','INFO');
											}, function fail() { 
												casper.test.assertExists('li#member_'+memberId[1] ,'username is deleted from the approval queue page','INFO');
											});
										}, function fail() {
											casper.echo('Alert div not found','ERROR');
										});
									});
									casper.then(function() { // method called to delete the user which is approved above
										postEventMemberApprovalMethod.deleteMember(casper, function (err) {
											if(!err) {
												casper.echo('Inside the deleteUser method','INFO');
											}
										});
									});	
								}
							});
						} else {
							casper.echo('Not called goToApprovalQueuePage method','ERROR');
						}
					});
				});
			} else {
				casper.echo('Not called registerMember method','ERROR');
			}
		});
	});
};

// method to Approve a pending user-by  Searching pending User  
postEventMemberApprovalTestcases.memberApprovalBySearchingPendingUser = function() {
	casper.then(function() {
		casper.echo('                                      CASE 3', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*                   Approve a pending user-by  Searching pending User              *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		postEventMemberApprovalMethod.registerMember(json['memberInfo'], casper, function(err) {
		
		});
	});
	casper.thenOpen("http://beta8.websitetoolbox.com/cgi/members/cloudsearch_batch_changes.cgi" , function() {

	});
	casper.thenOpen(config.url, function() {
		//login with admin user to get the id of the post and to approve it
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(json["AdminUserLogin"].username, json["AdminUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.waitForSelector('button#searchContent', function success() {
							casper.click('button#searchContent');
							casper.waitForSelector('a#searchMembers', function success() {
								casper.click('a#searchMembers');
								casper.waitForSelector('input[name="s_username"]', function success() {
									casper.sendKeys('input[name="s_username"]',json.userToDelete, {keepFocus: true});
									casper.page.sendEvent("keypress", casper.page.event.key.Enter);
									casper.waitForSelector('div.panel-body.table-responsive a strong',function success() {
										casper.click('div.panel-body.table-responsive a strong');
										casper.waitForSelector('div.alert.alert-danger.text-center strong', function() {
											casper.echo(casper.fetchText('div.alert.alert-danger.text-center strong'),'INFO');
											casper.click('div.alert.alert-danger.text-center a.btn.btn-success');	
										});
									}, function fail() {
										casper.echo('Pending Member not found','ERROR');
									});
								}, function fail() {
									casper.echo('Search bar not found','ERROR');
								});
							}, function fail() {
								casper.echo('Member Search button not found','ERROR');
							});
						}, function fail() {
							casper.echo('Search button not found','ERROR');
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
	casper.then(function() { // method called to verify  user moved to Registered group
		postEventMemberApprovalMethod.checkPendingUser(casper, function (err) {
			if(!err) {
				casper.echo('Inside the checkPendingUser method','INFO');
			}
		});
	});
	/*casper.then(function() {    // method called to delete the user which is approved above
		postEventMemberApprovalMethod.deleteMember(casper, function (err) {
			if(!err) {
				casper.echo('Inside the deleteUser method','INFO');
			}
		});
	});*/
};

// method to Approve a single user by selecting a checkbox 
postEventMemberApprovalTestcases.memberApprovalBySelectingCheckbox = function() {
	casper.then(function() {
		casper.echo('                                      CASE 4', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*                   Approve a single user by selecting a checkbox                  *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		postEventMemberApprovalMethod.registerMember(json['memberInfo'], casper, function(err) {
			if(!err) {
				casper.then(function() {
					postEventMemberApprovalMethod.goToApprovalQueuePage(casper, casper.test, function(err) {
						if(!err) {
							postEventMemberApprovalMethod.memberId(casper, function(err,memberId) {
								if(!err) {
									casper.then(function() {
										casper.click('input#mem_'+memberId[1]);
										casper.test.assertExists('div#pending-menu','floating menu is appear on bottom of the page','INFO');
										casper.test.assertExists('div#pending-menu span.dropdown a.text-success i', 'approve tick on the floating menu******************');
										casper.click('div#pending-menu span.dropdown a.text-success i');
										casper.waitWhileVisible('li#member_'+memberId[1], function success() {
											casper.test.assertDoesntExist('li#member_'+memberId[1] ,'username is deleted from the approval queue page','INFO');
										}, function fail() { 
											casper.test.assertExists('li#member_'+memberId[1] ,'username is deleted from the approval queue page','INFO');
										});
									});
									casper.then(function() { // method called to delete the user which is approved above
										postEventMemberApprovalMethod.deleteMember(casper, function (err) {
											if(!err) {
												casper.echo('Inside the deleteUser method','INFO');
											}
										});
									});	
								}
							});
						} else {
							casper.echo('Not called goToApprovalQueuePage method','ERROR');
						}
					});
				});
			} else {
				casper.echo('Not called registerMember method','ERROR');
			}
		});
	});
};

// method to Approve All user by selecting the checkbox appearing on the top right corner 
postEventMemberApprovalTestcases.memberApprovalBySelectingRightCornerCheckbox = function() {
	casper.then(function() {
		casper.echo('                                      CASE 5', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*     Approve All user by selecting the checkbox appearing on the top right corner *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		postEventMemberApprovalMethod.registerMember(json['memberInfo'], casper, function(err) {
			if(!err) {
				casper.then(function() {
					postEventMemberApprovalMethod.goToApprovalQueuePage(casper, casper.test, function(err) {
						if(!err) {
							postEventMemberApprovalMethod.memberId(casper, function(err,memberId) {
								if(!err) {
									casper.then(function() {
										casper.click('div.subheading input#select_all_pending_members');
										casper.test.assertExists('div#pending-menu','floating tab is appear on bottom of the page');
										casper.test.assertExists('div#pending-menu span.dropdown a.text-success i', 'APPROVE TICK ON THE FLOATING MENU');
										casper.waitForSelector('div#pending-menu',function success() {
											casper.click('div#pending-menu span.dropdown a.text-success i');
											var actualText = casper.fetchText('form[name="posts"] div.alert.alert-info.text-center');
											var expectedText ="There's currently nothing that needs your approval."; 
											casper.echo('TEXT FETCHED = '+actualText,'INFO');
											casper.test.assert(actualText.indexOf(expectedText) > -1);
										}, function fail(){
											casper.echo('Floating Menu not Found','INFO');
										});
									});
									casper.then(function() { // method called to delete the user which is approved above
										postEventMemberApprovalMethod.deleteMember(casper, function (err) {
											if(!err) {
												casper.echo('Inside the deleteUser method','INFO');
											}
										});
									});	
								}
							});
						} else {
							casper.echo('Not called goToApprovalQueuePage method','ERROR');
						}
					});
				});
			} else {
				casper.echo('Not called registerMember method','ERROR');
			}
		});
	});
};

// method to Approve pending member by searching it from advance search 
postEventMemberApprovalTestcases.memberApprovalByAdvanceSearch = function() {
	casper.then(function() {
		casper.echo('                                      CASE 6', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*            Approve pending member by searching it from advance search            *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		postEventMemberApprovalMethod.registerMember(json['memberInfo'], casper, function(err) {
			
		});
	});
	casper.thenOpen(config.url, function() {
		//login with admin user to get the id of the post and to approve it
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(json["AdminUserLogin"].username, json["AdminUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.waitForSelector('button#searchContent', function success() {
							casper.click('button#searchContent');
							casper.waitForSelector('a#advancedSearch', function success() {
								casper.click('a#advancedSearch');
								casper.waitForSelector('a#anchor_tab_member_search', function success() {
									casper.click('a#anchor_tab_member_search');
									casper.waitForSelector('#search-par', function success() {
										casper.sendKeys('input[name="s_username"]',json.userToDelete, {keepFocus: true});
										casper.page.sendEvent("keypress", casper.page.event.key.Enter);
										casper.fillSelectors('form[name="posts"]', {
			    								'select[name="usergroupid"]': '20237757'
										}, true);
										casper.click('input.btn.btn-primary');
										casper.waitForSelector('div.panel-body.table-responsive a strong',function success() {
											casper.click('div.panel-body.table-responsive a strong');
											casper.waitForSelector('div.alert.alert-danger.text-center strong', function() {
												casper.echo(casper.fetchText('div.alert.alert-danger.text-center strong'),'INFO');
												casper.click('div.alert.alert-danger.text-center a.btn.btn-success');
											});
										}, function fail() {
											casper.echo('Pending Member not found','ERROR');
										});
									}, function fail() {
										casper.echo('Member Search Form not found','ERROR');	
									});
								}, function fail() {
									casper.echo('Member panel-heading not found','ERROR');
								});
							}, function fail() {
								casper.echo('Advance Search button not found','ERROR');
							});
						}, function fail() {
							casper.echo('Search button not found','ERROR');
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
	casper.then(function() { // method called to verify  user moved to Registered group
		postEventMemberApprovalMethod.checkPendingUser(casper, function (err) {
			if(!err) {
				casper.echo('Inside the checkPendingUser method','INFO');
			}
		});
	});	
	casper.then(function() { // method called to delete the user which is approved above
		postEventMemberApprovalMethod.deleteMember(casper, function (err) {
			if(!err) {
				casper.echo('Inside the deleteUser method','INFO');
			}
		});
	});
};

// method to Approve a pending user from- Approval queue button for backend setting two 
postEventMemberApprovalTestcases.memberApprovalByApprovalQueueButtonSettingTwo = function() {
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                      CASE 7', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*    Approve a pending user from- Approval queue button for backend setting two    *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		//method to Enable -  Email verification and Disable -Approve New Registrations
		postEventMemberApprovalMethod.disableApproveRegistrationsAndEnableEmail(casper, function(err) {
			if(!err) {
				casper.echo('Enable Approve New Event functionality method called ','INFO');
			}
		});
		casper.then(function() {
			//method to set the user permission to Administration 
			postEventMemberApprovalMethod.setAdmin(casper, casper.test, function(err) {
				if(!err) {
					casper.echo('Set admin method called ','INFO');
				}
			});
		});
	});
	casper.then(function() {
		try {
			casper.test.assertExists('ul.nav.pull-right span.caret');
			casper.then(function() {
				forumLoginMethod.logoutFromApp(casper, function() { });
			});
		} catch (e) {
			casper.echo('No user logged in','INFO');
		}
		postEventMemberApprovalMethod.registerMember(json['memberInfo'], casper, function(err) {
		
		});
		casper.thenOpen(config.url, function() {
			//login with admin user to get the id of the post and to approve it
			casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(json["AdminUserLogin"].username, json["AdminUserLogin"].password, casper, function(err) {
				if(!err) {
					wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
						if(isExists) {
							casper.echo('User has been successfuly login to application with admin user', 'INFO');
							casper.waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function success() {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								casper.waitForSelector('li[id^="forum_"]', function success() {
									casper.test.assertDoesntExist('li#approvalQueue a' ,'approval queue icon is deleted from the forum','INFO');
								},function fail(){
									casper.echo('Approval Queue not Found','INFO');
								});        
							},function fail(){
								casper.echo('Categories not Found','ERROR');
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
	});
	casper.then(function() { // method called to delete the user which is approved above
		postEventMemberApprovalMethod.deleteMember(casper, function (err) {
			if(!err) {
				casper.echo('Inside the deleteUser method','INFO');
			}
		});
	});
};

// method to Approve pending member by searching it from advance search for backend setting two 
postEventMemberApprovalTestcases.memberApprovalByAdvanceSearchSettingTwo = function() {
	casper.then(function() {
		casper.echo('                                      CASE 9', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*Approve pending member by searching it from advance search for backend setting two*', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		postEventMemberApprovalMethod.registerMember(json['memberInfo'], casper, function(err) {
			
		});
	});
	casper.thenOpen(config.url, function() {
		//login with admin user to get the id of the post and to approve it
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(json["AdminUserLogin"].username, json["AdminUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.waitForSelector('button#searchContent', function success() {
							casper.click('button#searchContent');
							casper.waitForSelector('a#advancedSearch', function success() {
								casper.click('a#advancedSearch');
								casper.waitForSelector('a#anchor_tab_member_search', function success() {
									casper.click('a#anchor_tab_member_search');
									casper.waitForSelector('#search-par', function success() {
										casper.sendKeys('input[name="s_username"]',json.userToDelete, {keepFocus: true});
										casper.page.sendEvent("keypress", casper.page.event.key.Enter);
										casper.fillSelectors('form[name="posts"]', {
			    								'select[name="usergroupid"]': '20237756'
										}, true);
										casper.click('input.btn.btn-primary');
										casper.waitForSelector('div.panel-body.table-responsive a strong',function success() {
											casper.click('div.panel-body.table-responsive a strong');
											casper.waitForSelector('div.alert.alert-danger.text-center strong', function() {
												casper.echo(casper.fetchText('div.alert.alert-danger.text-center strong'),'INFO');
												casper.click('div.alert.alert-danger.text-center a.btn.btn-danger');
												casper.waitForSelector('div.panel-body.table-responsive', function success() {
													casper.echo(casper.fetchText('div.alert-info.text-danger'),'INFO');
												
												}, function fail() {
													casper.echo('Message not found','ERROR');
												});
											});
										}, function fail() {
											casper.echo('Pending Member not found','ERROR');
										});
									}, function fail() {
										casper.echo('Member Search Form not found','ERROR');	
									});
								}, function fail() {
									casper.echo('Member panel-heading not found','ERROR');
								});
							}, function fail() {
								casper.echo('Advance Search button not found','ERROR');
							});
						}, function fail() {
							casper.echo('Search button not found','ERROR');
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
	casper.then(function() { // method called to delete the user which is approved above
		postEventMemberApprovalMethod.deleteMember(casper, function (err) {
			if(!err) {
				casper.echo('Inside the deleteUser method','INFO');
			}
		});
	});
};


// method to Approve a pending user from- Approval queue button for backend setting three 
postEventMemberApprovalTestcases.memberApprovalByApprovalQueueButtonSettingThree = function() {
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                      CASE 10', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*    Approve a pending user from- Approval queue button for backend setting three  *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		//method to Enable -  Email verification and Enable -Approve New Registrations
		postEventMemberApprovalMethod.enableApproveRegistrationsAndEnableEmail(casper, function(err) {
			if(!err) {
				casper.echo('Enable Approve New Event functionality method called ','INFO');
			}
		});
		casper.then(function() {
			//method to set the user permission to Administration 
			postEventMemberApprovalMethod.setAdmin(casper, casper.test, function(err) {
				if(!err) {
					casper.echo('Set admin method called ','INFO');
				}
			});
		});
	});
	casper.then(function() {
		try {
			casper.test.assertExists('ul.nav.pull-right span.caret');
			casper.then(function() {
				forumLoginMethod.logoutFromApp(casper, function() { });
			});
		} catch (e) {
			casper.echo('No user logged in','INFO');
		}
		postEventMemberApprovalMethod.registerMember(json['memberInfo'], casper, function(err) {
		
		});
		casper.thenOpen(config.url, function() {
			//login with admin user to get the id of the post and to approve it
			casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(json["AdminUserLogin"].username, json["AdminUserLogin"].password, casper, function(err) {
				if(!err) {
					wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
						if(isExists) {
							casper.echo('User has been successfuly login to application with admin user', 'INFO');
							casper.waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function success() {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								casper.waitForSelector('li[id^="forum_"]', function success() {
									casper.test.assertDoesntExist('li#approvalQueue a' ,'approval queue icon is deleted from the forum','INFO');
								},function fail(){
									casper.echo('Approval Queue not Found','INFO');
								});        
							},function fail(){
								casper.echo('Categories not Found','ERROR');
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
	});
	casper.then(function() { // method called to delete the user which is approved above
		postEventMemberApprovalMethod.deleteMember(casper, function (err) {
			if(!err) {
				casper.echo('Inside the deleteUser method','INFO');
			}
		});
	});
};

// method to Approve pending member by searching it from advance search for backend setting three 
postEventMemberApprovalTestcases.memberApprovalByAdvanceSearchSettingThree = function() {
	casper.then(function() {
		casper.echo('                                      CASE 12', 'INFO');
		casper.echo('***************************************************************************************', 'INFO');
		casper.echo('*Approve pending member by searching it from advance search for backend setting three *', 'INFO');
		casper.echo('***************************************************************************************', 'INFO');
		postEventMemberApprovalMethod.registerMember(json['memberInfo'], casper, function(err) {
			
		});
	});
	casper.thenOpen(config.url, function() {
		//login with admin user to get the id of the post and to approve it
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(json["AdminUserLogin"].username, json["AdminUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.waitForSelector('button#searchContent', function success() {
							casper.click('button#searchContent');
							casper.waitForSelector('a#advancedSearch', function success() {
								casper.click('a#advancedSearch');
								casper.waitForSelector('a#anchor_tab_member_search', function success() {
									casper.click('a#anchor_tab_member_search');
									casper.waitForSelector('#search-par', function success() {
										casper.sendKeys('input[name="s_username"]',json.userToDelete, {keepFocus: true});
										casper.page.sendEvent("keypress", casper.page.event.key.Enter);
										casper.fillSelectors('form[name="posts"]', {
			    								'select[name="usergroupid"]': '20237756'
										}, true);
										casper.click('input.btn.btn-primary');
										casper.waitForSelector('div.panel-body.table-responsive a strong',function success() {
											casper.click('div.panel-body.table-responsive a strong');
											casper.waitForSelector('div.alert.alert-danger.text-center strong', function() {
												casper.echo(casper.fetchText('div.alert.alert-danger.text-center strong'),'INFO');
												casper.click('div.alert.alert-danger.text-center a.btn.btn-danger');
												casper.waitForSelector('div.panel-body.table-responsive', function success() {
													casper.echo(casper.fetchText('div.alert-info.text-danger'),'INFO');
												
												}, function fail() {
													casper.echo('Message not found','ERROR');
												});
											});
										}, function fail() {
											casper.echo('Pending Member not found','ERROR');
										});
									}, function fail() {
										casper.echo('Member Search Form not found','ERROR');	
									});
								}, function fail() {
									casper.echo('Member panel-heading not found','ERROR');
								});
							}, function fail() {
								casper.echo('Advance Search button not found','ERROR');
							});
						}, function fail() {
							casper.echo('Search button not found','ERROR');
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
	casper.then(function() {
		postEventMemberApprovalMethod.goToApprovalQueuePage(casper, casper.test, function(err) {
			if(!err) {
				postEventMemberApprovalMethod.memberId(casper, function(err,memberId) {
					if(!err) {
						casper.then(function() {
							casper.test.assertExists('a#approveMember_'+memberId[1]+' i','approve tick for user member found');
							casper.click('a#approveMember_'+memberId[1]+' i');
							casper.waitWhileVisible('li#member_'+memberId[1], function success() {
								casper.test.assertDoesntExist('li#member_'+memberId[1] ,'username is deleted from the approval queue page','INFO');
							}, function fail() { 
								casper.test.assertExists('li#member_'+memberId[1] ,'username is deleted from the approval queue page','INFO');
							});
						});
					}
				});
			} else {
				casper.echo('Not called goToApprovalQueuePage method','ERROR');
			}
		});
	});
	casper.then(function() { // method called to delete the user which is approved above
		postEventMemberApprovalMethod.deleteMember(casper, function (err) {
			if(!err) {
				casper.echo('Inside the deleteUser method','INFO');
			}
		});
	});
};

// method to Approve a pending user from- Approval queue button for backend setting Four 
postEventMemberApprovalTestcases.memberApprovalByApprovalQueueButtonSettingFour = function() {
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                      CASE 13', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*    Approve a pending user from- Approval queue button for backend setting four  *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		//method to Disable -  Email verification and Disable -Approve New Registrations
		postEventMemberApprovalMethod.disableApproveRegistrationsAndDisableEmail(casper, function(err) {
			if(!err) {
				casper.echo('Enable Approve New Event functionality method called ','INFO');
			}
		});
		casper.then(function() {
			//method to set the user permission to Administration 
			postEventMemberApprovalMethod.setAdmin(casper, casper.test, function(err) {
				if(!err) {
					casper.echo('Set admin method called ','INFO');
				}
			});
		});
	});
	casper.then(function() {
		try {
			casper.test.assertExists('ul.nav.pull-right span.caret');
			casper.then(function() {
				forumLoginMethod.logoutFromApp(casper, function() { });
			});
		} catch (e) {
			casper.echo('No user logged in','INFO');
		}
		postEventMemberApprovalMethod.registerMember(json['memberInfo'], casper, function(err) {
		
		});
		casper.thenOpen(config.url, function() {
			//login with admin user to get the id of the post and to approve it
			casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(json["AdminUserLogin"].username, json["AdminUserLogin"].password, casper, function(err) {
				if(!err) {
					wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
						if(isExists) {
							casper.echo('User has been successfuly login to application with admin user', 'INFO');
							casper.waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function success() {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								casper.waitForSelector('li[id^="forum_"]', function success() {
									casper.test.assertDoesntExist('li#approvalQueue a' ,'approval queue icon is deleted from the forum','INFO');
								},function fail(){
									casper.echo('Approval Queue not Found','INFO');
								});        
							},function fail(){
								casper.echo('Categories not Found','ERROR');
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
	});
	casper.then(function() { // method called to delete the user which is approved above
		postEventMemberApprovalMethod.deleteMember(casper, function (err) {
			if(!err) {
				casper.echo('Inside the deleteUser method','INFO');
			}
		});
	});
};

// method to Approve pending member by searching it from advance search for backend setting Four 
postEventMemberApprovalTestcases.memberApprovalByAdvanceSearchSettingFour = function() {
	casper.then(function() {
		casper.echo('                                      CASE 15', 'INFO');
		casper.echo('*************************************************************************************', 'INFO');
		casper.echo('*Approve pending member by searching it from advance search for backend setting Four*', 'INFO');
		casper.echo('*************************************************************************************', 'INFO');
		postEventMemberApprovalMethod.registerMember(json['memberInfo'], casper, function(err) {
			
		});
	});
	casper.thenOpen(config.url, function() {
		//login with admin user to get the id of the post and to approve it
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(json["AdminUserLogin"].username, json["AdminUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.waitForSelector('button#searchContent', function success() {
							casper.click('button#searchContent');
							casper.waitForSelector('a#advancedSearch', function success() {
								casper.click('a#advancedSearch');
								casper.waitForSelector('a#anchor_tab_member_search', function success() {
									casper.click('a#anchor_tab_member_search');
									casper.waitForSelector('#search-par', function success() {
										casper.sendKeys('input[name="s_username"]',json.userToDelete, {keepFocus: true});
										casper.page.sendEvent("keypress", casper.page.event.key.Enter);
										casper.fillSelectors('form[name="posts"]', {
			    								'select[name="usergroupid"]': '20237756'
										}, true);
										casper.click('input.btn.btn-primary');
										casper.waitForSelector('div.panel-body.table-responsive a strong',function success() {
											casper.click('div.panel-body.table-responsive a strong');
											casper.waitForSelector('span#memberName', function() {
												casper.test.assertDoesntExist('div.alert.alert-danger.text-center a.btn.btn-danger','approve button is not appear');
											});
										}, function fail() {
											casper.echo('Pending Member not found','ERROR');
										});
									}, function fail() {
										casper.echo('Member Search Form not found','ERROR');	
									});
								}, function fail() {
									casper.echo('Member panel-heading not found','ERROR');
								});
							}, function fail() {
								casper.echo('Advance Search button not found','ERROR');
							});
						}, function fail() {
							casper.echo('Search button not found','ERROR');
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
	casper.then(function() { // method called to verify  user moved to Registered group
		postEventMemberApprovalMethod.checkPendingUser(casper, function (err) {
			if(!err) {
				casper.echo('Inside the checkPendingUser method','INFO');
			}
		});
	});
	casper.then(function() { // method called to delete the user which is approved above
		postEventMemberApprovalMethod.deleteMember(casper, function (err) {
			if(!err) {
				casper.echo('Inside the deleteUser method','INFO');
			}
		});
	});
};


// TestCases to test Member Approval functionality from back end
// method to Approve a pending user from- From Default User Groups (by check box) 
postEventMemberApprovalTestcases.memberApprovalFromDefaultUserGroupsByCheckbox = function() {
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                      CASE 16', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*        Approve a pending user from- From Default User Groups (by check box)      *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		//method to enable approve new post** All posts
		postEventMemberApprovalMethod.enableApproveRegistrationsAndDisableEmail(casper, function(err) {
			if(!err) {
				casper.echo('Enable Approve New Event functionality method called ','INFO');
			}
		});
		casper.then(function() {
			//method to set the user permission to Administration 
			postEventMemberApprovalMethod.setAdmin(casper, casper.test, function(err) {
				if(!err) {
					casper.echo('Set admin method called ','INFO');
				}
			});
		});
	});
	postEventMemberApprovalMethod.registerMember(json['memberInfo'], casper, function(err) {
			
	});
	casper.thenOpen(config.backEndUrl, function() {
		registerMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', 'Users Link Found'); 
						casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
						casper.test.assertExists('div#ddUsers a', '*****Group permission is found****');
						casper.click('div#ddUsers a');
						casper.waitForSelector('table.text.fullborder', function success() {
							casper.click('tr:nth-child(5) td:nth-child(2) a');
							casper.waitForSelector('table#groupUsersList', function success() {
								casper.click('tr td input[name="user_id"]');
								casper.waitForSelector('div#floatingActionMenu', function success() {
									casper.test.assertExist('select[name="action"]','drop down is appear on the bottom of page');
									casper.fillSelectors('form#frmGroupUsers', {
					    					'select[name="action"]': 'approve_members'
									}, true);
								},function fail() {
									casper.echo('Floating menu not found','INFO');
								});
				
							},function fail(){
								casper.echo('User table not found','ERROR');
							});
			
						}, function fail() {
							casper.echo('Table not found','INFO');
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error ', 'ERROR');
			}
		});
		casper.then(function() {
			backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
			});
		});
	});
	casper.then(function() { // method called to verify  user moved to Registered group
		postEventMemberApprovalMethod.checkPendingUser(casper, function (err) {
			if(!err) {
				casper.echo('Inside the checkPendingUser method','INFO');
			}
		});
	});
	casper.then(function() { // method called to delete the user which is approved above
		postEventMemberApprovalMethod.deleteMember(casper, function (err) {
			if(!err) {
				casper.echo('Inside the deleteUser method','INFO');
			}
		});
	});
};

// method to Approve a pending user From Default User Groups (by buttons) 
postEventMemberApprovalTestcases.memberApprovalFromDefaultUserGroupsByButtons = function() {
	casper.then(function() {
		casper.echo('                                      CASE 17', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*             Approve a pending user From Default User Groups (by buttons)         *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		postEventMemberApprovalMethod.registerMember(json['memberInfo'], casper, function(err) {
			
		});
	});
	casper.thenOpen(config.backEndUrl, function() {
		registerMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', 'Users Link Found'); 
						casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
						casper.test.assertExists('div#ddUsers a', '*****Group permission is found****');
						casper.click('div#ddUsers a');
						casper.waitForSelector('table.text.fullborder', function success() {
							casper.click('tr:nth-child(5) td:nth-child(2) a');
							casper.waitForSelector('table#groupUsersList', function success() {
								casper.mouse.move("td.userlist-icons a:nth-child(1)");
								casper.click('td.userlist-icons a:nth-child(1)');
								casper.waitWhileVisible('a[title="View profile"]', function success() {
									casper.test.assertDoesntExist('a[title="View profile"]' ,'username is deleted from the approval queue page','INFO');
								}, function fail() { 
									casper.test.assertExists('a[title="View profile"]' ,'username is not deleted from the approval queue page','INFO');
								});
							},function fail(){
								casper.echo('User table not found','ERROR');
							});
			
						}, function fail() {
							casper.echo('Table not found','INFO');
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error ', 'ERROR');
			}
		});
		casper.then(function() {
			backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
			});
		});
	});
	casper.then(function() { // method called to verify  user moved to Registered group
		postEventMemberApprovalMethod.checkPendingUser(casper, function (err) {
			if(!err) {
				casper.echo('Inside the checkPendingUser method','INFO');
			}
		});
	});
	casper.then(function() { // method called to delete the user which is approved above
		postEventMemberApprovalMethod.deleteMember(casper, function (err) {
			if(!err) {
				casper.echo('Inside the deleteUser method','INFO');
			}
		});
	});
};

// method to Approve a pending user from Change a User's User Group(approve button) 
postEventMemberApprovalTestcases.memberApprovalFromChangeUserGroupApproveButton = function() {
	casper.then(function() {
		casper.echo('                                      CASE 18', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo("*       Approve a pending user from Change a User's User Group(approve button)     *", 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		postEventMemberApprovalMethod.registerMember(json['memberInfo'], casper, function(err) {
			
		});
	});
	casper.thenOpen(config.backEndUrl, function() {
		registerMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', 'Users Link Found'); 
						casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
						casper.test.assertExists('div#ddUsers a', '*****Group permission is found****');
						casper.click('div#ddUsers a');
						casper.waitForSelector('form#frmChangeUsersGroup', function success() {
							casper.fill('form#frmChangeUsersGroup', {
								'member' : json.userToDelete
							}, true);
							casper.waitForSelector('form[name="ugfrm"]', function success() {
								casper.test.assertExists('a#approve_user', '******Approve user button found *****');
								casper.click('a#approve_user');
								casper.waitWhileVisible('a[title="View profile"]', function success() {
									casper.test.assertDoesntExist('a[title="View profile"]' ,'username is deleted from the approval queue page','INFO');
								}, function fail() { 
									casper.test.assertExists('a[title="View profile"]' ,'username is not deleted from the approval queue page','INFO');
								});
							}, function fail(){
								casper.echo('Approve user button not found','ERROR');	
							});
						},function fail(){
							casper.echo('Change user group permission not found','ERROR');
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error ', 'ERROR');
			}
		});
		casper.then(function() {
			backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
			});
		});
	});
	casper.then(function() { // method called to verify  user moved to Registered group
		postEventMemberApprovalMethod.checkPendingUser(casper, function (err) {
			if(!err) {
				casper.echo('Inside the checkPendingUser method','INFO');
			}
		});
	});
	casper.then(function() { // method called to delete the user which is approved above
		postEventMemberApprovalMethod.deleteMember(casper, function (err) {
			if(!err) {
				casper.echo('Inside the deleteUser method','INFO');
			}
		});
	});
};

// method to Approve a pending user from Change a User's User Group(change group) 
postEventMemberApprovalTestcases.memberApprovalFromChangeUserGroupChangeGroup = function() {
	casper.then(function() {
		casper.echo('                                      CASE 19', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo("*       Approve a pending user from Change a User's User Group(change group)       *", 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		postEventMemberApprovalMethod.registerMember(json['memberInfo'], casper, function(err) {
			
		});
	});
	casper.thenOpen(config.backEndUrl, function() {
		registerMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', 'Users Link Found'); 
						casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
						casper.test.assertExists('div#ddUsers a', '*****Group permission is found****');
						casper.click('div#ddUsers a');
						casper.waitForSelector('form#frmChangeUsersGroup', function success() {
							casper.fill('form#frmChangeUsersGroup', {
								'member' : json.userToDelete
							}, true);
							casper.waitForSelector('form[name="ugfrm"]', function success() {
								casper.test.assertExists('form#frmChangeUsersGroupFinal', '*************POP UP appear*************');
								casper.fillLabels('form#frmChangeUsersGroupFinal', {
									'Registered Users' : 'checked',
									'Pending Approval' : ''
								}, true);
								casper.waitWhileVisible('a[title="View profile"]', function success() {
									casper.test.assertDoesntExist('a[title="View profile"]' ,'username is deleted from the approval queue page','INFO');
								}, function fail() { 
									casper.test.assertExists('a[title="View profile"]' ,'username is not deleted from the approval queue page','INFO');
								});
							}, function fail() {
								casper.echo('Approve user button not found','ERROR');	
							});
						},function fail() {
							casper.echo('Change user group permission not found','ERROR');
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error ', 'ERROR');
			}
		});
		casper.then(function() {
			backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
			});
		});
	});
	casper.then(function() { // method called to verify  user moved to Registered group
		postEventMemberApprovalMethod.checkPendingUser(casper, function (err) {
			if(!err) {
				casper.echo('Inside the checkPendingUser method','INFO');
			}
		});
	});
	casper.then(function() { // method called to delete the user which is approved above
		postEventMemberApprovalMethod.deleteMember(casper, function (err) {
			if(!err) {
				casper.echo('Inside the deleteUser method','INFO');
			}
		});
	});
};

// method to Approve a pending user from- From Default User Groups (by check box) for backend setting two
postEventMemberApprovalTestcases.memberApprovalFromDefaultUserGroupsByCheckboxSettingTwo = function() {
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                      CASE 20', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('* Approve a pending user from- From Default User Groups (by check box) Setting two *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		//method to enable approve new post** All posts
		postEventMemberApprovalMethod.disableApproveRegistrationsAndEnableEmail(casper, function(err) {
			if(!err) {
				casper.echo('Enable Approve New Event functionality method called ','INFO');
			}
		});
		casper.then(function() {
			//method to set the user permission to Administration 
			postEventMemberApprovalMethod.setAdmin(casper, casper.test, function(err) {
				if(!err) {
					casper.echo('Set admin method called ','INFO');
				}
			});
		});
	});
	postEventMemberApprovalMethod.registerMember(json['memberInfo'], casper, function(err) {
			
	});
	casper.thenOpen(config.backEndUrl, function() {
		registerMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', 'Users Link Found'); 
						casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
						casper.test.assertExists('div#ddUsers a', '*****Group permission is found****');
						casper.click('div#ddUsers a');
						casper.waitForSelector('table.text.fullborder', function success() {
							casper.click('tr:nth-child(5) td:nth-child(2) a');
							casper.waitForSelector('table#groupUsersList', function success() {
								casper.click('tr td input[name="user_id"]');
								casper.waitForSelector('div#floatingActionMenu', function success() {
									casper.test.assertExist('select[name="action"]','drop down is appear on the bottum of page');
									casper.fillSelectors('div#floatingActionMenu', {
					    					'select[name="action"]': 'show_all_additional_users'
									}, true);
									casper.waitForSelector('form#frmChangeAdditional', function success() {
										casper.echo('POP UP found','INFO');
										casper.fillLabels('form#frmChangeAdditional', {
										
											'Registered Users' : 'checked',
										}, true);
										casper.click('input[id="a2"][value="overwite_additional_usergroup"]');
										casper.evaluate(function() {
											var x = document.querySelectorAll(' div.ui-dialog-buttonset button');
											 $(x[1]).click();
										});
										casper.waitWhileVisible('a[title="View profile"]', function success() {
											casper.test.assertDoesntExist('a[title="View profile"]' ,'username is deleted from the Pending Email Verification page','INFO');
										}, function fail() { 
											casper.test.assertExists('a[title="View profile"]' ,'username is not deleted from the Pending Email Verification page','INFO');
										});
									}, function fail() {
										casper.echo('pop up not found','INFO');
									});
								},function fail() {
									casper.echo('Floating menu not found','INFO');
								});
							},function fail(){
								casper.echo('User table not found','ERROR');
							});
			
						}, function fail() {
							casper.echo('Table not found','INFO');
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error ', 'ERROR');
			}
		});
		casper.then(function() {
			backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
			});
		});
	});
	casper.then(function() { // method called to verify  user moved to Registered group
		postEventMemberApprovalMethod.checkPendingUser(casper, function (err) {
			if(!err) {
				casper.echo('Inside the checkPendingUser method','INFO');
			}
		});
	});
	casper.then(function() { // method called to delete the user which is approved above
		postEventMemberApprovalMethod.deleteMember(casper, function (err) {
			if(!err) {
				casper.echo('Inside the deleteUser method','INFO');
			}
		});
	});
};

// method to Approve a pending user from Change a User's User Group(change group) for setting two
postEventMemberApprovalTestcases.memberApprovalFromChangeUserGroupChangeGroupSettingTwo = function() {
	casper.then(function() {
		casper.echo('                                      CASE 21', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo("*  Approve a pending user from Change a User's User Group(change group) Setting two*", 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		postEventMemberApprovalMethod.registerMember(json['memberInfo'], casper, function(err) {
			
		});
	});
	casper.thenOpen(config.backEndUrl, function() {
		registerMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', 'Users Link Found'); 
						casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
						casper.test.assertExists('div#ddUsers a', '*****Group permission is found****');
						casper.click('div#ddUsers a');
						casper.waitForSelector('form#frmChangeUsersGroup', function success() {
							casper.fill('form#frmChangeUsersGroup', {
								'member' : json.userToDelete
							}, true);
							casper.waitForSelector('form[name="ugfrm"]', function success() {
								casper.test.assertExists('form#frmChangeUsersGroupFinal', '*************POP UP appear*************');
								casper.fillLabels('form#frmChangeUsersGroupFinal', {
									'Registered Users' : 'checked',
									'Pending Email Verification' : ''
								}, true);
								casper.waitWhileVisible('a[title="View profile"]', function success() {
									casper.test.assertDoesntExist('a[title="View profile"]' ,'username is deleted from the Pending Email Verification page','INFO');
								}, function fail() { 
									casper.test.assertExists('a[title="View profile"]' ,'username is not deleted from the Pending Email Verification page','INFO');
								});
							}, function fail() {
								casper.echo('Approve user button not found','ERROR');	
							});
						},function fail() {
							casper.echo('Change user group permission not found','ERROR');
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error ', 'ERROR');
			}
		});
		casper.then(function() {
			backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
			});
		});
	});
	casper.then(function() { // method called to verify  user moved to Registered group
		postEventMemberApprovalMethod.checkPendingUser(casper, function (err) {
			if(!err) {
				casper.echo('Inside the checkPendingUser method','INFO');
			}
		});
	});
	casper.then(function() { // method called to delete the user which is approved above
		postEventMemberApprovalMethod.deleteMember(casper, function (err) {
			if(!err) {
				casper.echo('Inside the deleteUser method','INFO');
			}
		});
	});
};

// method to Approve a pending user from- From Default User Groups (by check box) for backend setting three
postEventMemberApprovalTestcases.memberApprovalFromDefaultUserGroupsByCheckboxSettingThree = function() {
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                      CASE 22', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*Approve a pending user from- From Default User Groups (by check box) Setting three*', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		//method to enable approve new post** All posts
		postEventMemberApprovalMethod.enableApproveRegistrationsAndEnableEmail(casper, function(err) {
			if(!err) {
				casper.echo('Enable Approve New Event functionality method called ','INFO');
			}
		});
		casper.then(function() {
			//method to set the user permission to Administration 
			postEventMemberApprovalMethod.setAdmin(casper, casper.test, function(err) {
				if(!err) {
					casper.echo('Set admin method called ','INFO');
				}
			});
		});
	});
	postEventMemberApprovalMethod.registerMember(json['memberInfo'], casper, function(err) {
			
	});
	casper.thenOpen(config.backEndUrl, function() {
		registerMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', 'Users Link Found'); 
						casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
						casper.test.assertExists('div#ddUsers a', '*****Group permission is found****');
						casper.click('div#ddUsers a');
						casper.waitForSelector('table.text.fullborder', function success() {
							casper.click('tr:nth-child(6) td:nth-child(2) a');
							casper.waitForSelector('table#groupUsersList', function success() {
								casper.click('tr td input[name="user_id"]');
								casper.waitForSelector('div#floatingActionMenu', function success() {
									casper.test.assertExist('select[name="action"]','drop down is appear on the bottum of page');
									casper.fillSelectors('div#floatingActionMenu', {
					    					'select[name="action"]': 'show_all_additional_users'
									}, true);
									casper.waitForSelector('form#frmChangeAdditional', function success() {
										casper.echo('POP UP found','INFO');
										casper.fillLabels('form#frmChangeAdditional', {
										
											'Registered Users' : 'checked',
										}, true);
										casper.click('input[id="a2"][value="overwite_additional_usergroup"]');
										casper.evaluate(function() {
											var x = document.querySelectorAll(' div.ui-dialog-buttonset button');
											 $(x[1]).click();
										});
										casper.waitWhileVisible('a[title="View profile"]', function success() {
											casper.test.assertDoesntExist('a[title="View profile"]' ,'username is deleted from the Pending Email Verification page','INFO');
										}, function fail() { 
											casper.test.assertExists('a[title="View profile"]' ,'username is not deleted from the Pending Email Verification page','INFO');
										});
									}, function fail() {
										casper.echo('pop up not found','INFO');
									});
								},function fail() {
									casper.echo('Floating menu not found','INFO');
								});
							},function fail(){
								casper.echo('User table not found','ERROR');
							});
			
						}, function fail() {
							casper.echo('Table not found','INFO');
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error ', 'ERROR');
			}
		});
		casper.then(function() {
			backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
			});
		});
	});
	casper.then(function() { // method called to verify  user moved to Registered group
		postEventMemberApprovalMethod.checkPendingUser(casper, function (err) {
			if(!err) {
				casper.echo('Inside the checkPendingUser method','INFO');
			}
		});
	});
	casper.then(function() { // method called to delete the user which is approved above
		postEventMemberApprovalMethod.deleteMember(casper, function (err) {
			if(!err) {
				casper.echo('Inside the deleteUser method','INFO');
			}
		});
	});
};

// method to Approve a pending user from Change a User's User Group(change group) for setting three
postEventMemberApprovalTestcases.memberApprovalFromChangeUserGroupChangeGroupSettingThree = function() {
	casper.then(function() {
		casper.echo('                                      CASE 23', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo("*Approve a pending user from Change a User's User Group(change group) Setting three*", 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		postEventMemberApprovalMethod.registerMember(json['memberInfo'], casper, function(err) {
			
		});
	});
	casper.thenOpen(config.backEndUrl, function() {
		registerMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', 'Users Link Found'); 
						casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
						casper.test.assertExists('div#ddUsers a', '*****Group permission is found****');
						casper.click('div#ddUsers a');
						casper.waitForSelector('form#frmChangeUsersGroup', function success() {
							casper.fill('form#frmChangeUsersGroup', {
								'member' : json.userToDelete
							}, true);
							casper.waitForSelector('form[name="ugfrm"]', function success() {
								casper.test.assertExists('form#frmChangeUsersGroupFinal', '*************POP UP appear*************');
								casper.fillLabels('form#frmChangeUsersGroupFinal', {
									'Registered Users' : 'checked',
									'Pending Email Verification' : ''
								}, true);
								casper.waitWhileVisible('a[title="View profile"]', function success() {
									casper.test.assertDoesntExist('a[title="View profile"]' ,'username is deleted from the Pending Email Verification page','INFO');
								}, function fail() { 
									casper.test.assertExists('a[title="View profile"]' ,'username is not deleted from the Pending Email Verification page','INFO');
								});
							}, function fail() {
								casper.echo('Approve user button not found','ERROR');	
							});
						},function fail() {
							casper.echo('Change user group permission not found','ERROR');
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error ', 'ERROR');
			}
		});
		casper.then(function() {
			backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
			});
		});
	});
	casper.then(function() { // method called to verify  user moved to Registered group
		postEventMemberApprovalMethod.checkPendingUser(casper, function (err) {
			if(!err) {
				casper.echo('Inside the checkPendingUser method','INFO');
			}
		});
	});
	casper.then(function() { // method called to delete the user which is approved above
		postEventMemberApprovalMethod.deleteMember(casper, function (err) {
			if(!err) {
				casper.echo('Inside the deleteUser method','INFO');
			}
		});
	});
};

// method to Approve a pending user from Change a User's User Group(change group) for setting four
postEventMemberApprovalTestcases.memberApprovalFromChangeUserGroupChangeGroupSettingFour = function() {
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                      CASE 24', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*Approve a pending user from- From Default User Groups (by check box) Setting four *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		//method to enable approve new post** All posts
		postEventMemberApprovalMethod.disableApproveRegistrationsAndDisableEmail(casper, function(err) {
			if(!err) {
				casper.echo('Enable Approve New Event functionality method called ','INFO');
			}
		});
		casper.then(function() {
			//method to set the user permission to Administration 
			postEventMemberApprovalMethod.setAdmin(casper, casper.test, function(err) {
				if(!err) {
					casper.echo('Set admin method called ','INFO');
				}
			});
		});
	});
	postEventMemberApprovalMethod.registerMember(json['memberInfo'], casper, function(err) {
			
	});
	casper.thenOpen(config.backEndUrl, function() {
		registerMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', 'Users Link Found'); 
						casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
						casper.test.assertExists('div#ddUsers a', '*****Group permission is found****');
						casper.click('div#ddUsers a');
						casper.waitForSelector('form#frmChangeUsersGroup', function success() {
							casper.fill('form#frmChangeUsersGroup', {
								'member' : json.userToDelete
							}, true);
							casper.waitForSelector('form[name="ugfrm"]', function success() {
								var checked = casper.evaluate(function() {
									var element = document.getElementById(20237761).checked;
									return element;
								});
								casper.echo('the value of checked = '+checked,'INFO');
								if(checked == true) {
									casper.echo('The pending user is moved to Register user, Verified','INFO');
								}
								else {
									casper.echo('The pending user is not moved to Register user, Verified','INFO');
								}
							}, function fail() {
								casper.echo('changer user group form not found','ERROR');	
							});
						},function fail() {
							casper.echo('Change user group permission not found','ERROR');
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error ', 'ERROR');
			}
		});
		casper.then(function() {
			backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
			});
		});
	});
	casper.then(function() { // method called to delete the user which is approved above
		postEventMemberApprovalMethod.deleteMember(casper, function (err) {
			if(!err) {
				casper.echo('Inside the deleteUser method','INFO');
			}
		});
	});
};

// Test cases for delete member functionality
// method to Delete a pending user from- Approval queue button 
postEventMemberApprovalTestcases.deleteMemberByApprovalQueueButton = function() {
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                      CASE 25', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*                   Delete a pending Member from- Approval queue button           *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		//method to enable approve new post** All posts
		postEventMemberApprovalMethod.enableApproveRegistrationsAndDisableEmail(casper, function(err) {
			if(!err) {
				casper.echo('Enable Approve New Event functionality method called ','INFO');
			}
		});
		casper.then(function() {
			//method to set the user permission to Administration 
			postEventMemberApprovalMethod.setAdmin(casper, casper.test, function(err) {
				if(!err) {
					casper.echo('Set admin method called ','INFO');
				}
			});
		});
	});
	casper.then(function() {
		postEventMemberApprovalMethod.registerMember(json['memberInfo'], casper, function(err) {
			if(!err) {
				casper.then(function() {
					postEventMemberApprovalMethod.goToApprovalQueuePage(casper, casper.test, function(err) {
						if(!err) {
							postEventMemberApprovalMethod.memberId(casper, function(err,memberId) {
								if(!err) {
									casper.then(function() {
										casper.test.assertExists('a#deleteMember_'+memberId[1]+' i','approve tick for user member found');
										casper.click('a#deleteMember_'+memberId[1]+' i');
										casper.waitWhileVisible('li#member_'+memberId[1], function success() {
											casper.test.assertDoesntExist('li#member_'+memberId[1] ,'username is deleted from the approval queue page','INFO');
										}, function fail() { 
											casper.test.assertExists('li#member_'+memberId[1] ,'username is deleted from the approval queue page','INFO');
										});
									});	
								}
							});
						} else {
							casper.echo('Not called goToApprovalQueuePage method','ERROR');
						}
					});
				});
			} else {
				casper.echo('Not called registerMember method','ERROR');
			}
		});
	});
};

// method to Delete a pending user -By clicking on  user name 
postEventMemberApprovalTestcases.deleteMemberByClickingOnUsername  = function() {
	casper.then(function() {
		casper.echo('                                      CASE 26', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*                   Delete a pending user -By clicking on  user name              *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		postEventMemberApprovalMethod.registerMember(json['memberInfo'], casper, function(err) {
			if(!err) {
				casper.then(function() {
					postEventMemberApprovalMethod.goToApprovalQueuePage(casper, casper.test, function(err) {
						if(!err) {
							postEventMemberApprovalMethod.memberId(casper, function(err,memberId) {
								if(!err) {
									casper.then(function() {
										casper.test.assertExists('li#member_'+memberId[1]+' a strong','Pending user name found');
										casper.click('li#member_'+memberId[1]+' a strong');
										casper.waitForSelector('div.alert.alert-danger', function() {
											var actualText = casper.fetchText('div.alert.alert-danger.text-center strong');
											var expectedText = "This user is pending approval.";
											casper.test.assert(actualText.indexOf(expectedText) > -1);
											casper.click('div.alert.alert-danger.text-center a.btn.btn-danger');
											casper.waitWhileVisible('li#member_'+memberId[1], function success() {
												casper.test.assertDoesntExist('li#member_'+memberId[1] ,'username is deleted from the approval queue page','INFO');
											}, function fail() { 
												casper.test.assertExists('li#member_'+memberId[1] ,'username is deleted from the approval queue page','INFO');
											});
										}, function fail() {
											casper.echo('Alert div not found','ERROR');
										});
									});	
								}
							});
						} else {
							casper.echo('Not called goToApprovalQueuePage method','ERROR');
						}
					});
				});
			} else {
				casper.echo('Not called registerMember method','ERROR');
			}
		});
	});
};

// method to Delete a pending user-by  Searching pending User  
postEventMemberApprovalTestcases.deleteMemberBySearchingPendingUser = function() {
	casper.then(function() {
		casper.echo('                                      CASE 27', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*                   Delete a pending user-by  Searching pending User              *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		postEventMemberApprovalMethod.registerMember(json['memberInfo'], casper, function(err) {
		
		});
	});
	casper.thenOpen("http://beta8.websitetoolbox.com/cgi/members/cloudsearch_batch_changes.cgi" , function() {

	});
	casper.thenOpen(config.url, function() {
		//login with admin user to search the user and to delete it
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(json["AdminUserLogin"].username, json["AdminUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.waitForSelector('button#searchContent', function success() {
							casper.click('button#searchContent');
							casper.waitForSelector('a#searchMembers', function success() {
								casper.click('a#searchMembers');
								casper.waitForSelector('input[name="s_username"]', function success() {
									casper.sendKeys('input[name="s_username"]',json.userToDelete, {keepFocus: true});
									casper.page.sendEvent("keypress", casper.page.event.key.Enter);
									casper.waitForSelector('div.panel-body.table-responsive a strong',function success() {
										casper.click('div.panel-body.table-responsive a strong');
										casper.waitForSelector('div.alert.alert-danger.text-center strong', function() {
											casper.echo(casper.fetchText('div.alert.alert-danger.text-center strong'),'INFO');
											casper.click('div.alert.alert-danger.text-center a.btn.btn-danger');
											casper.wait(5000, function() {
											
											});	
										});
									}, function fail() {
										casper.echo('Pending Member not found','ERROR');
									});
								}, function fail() {
									casper.echo('Search bar not found','ERROR');
								});
							}, function fail() {
								casper.echo('Member Search button not found','ERROR');
							});
						}, function fail() {
							casper.echo('Search button not found','ERROR');
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

// method to Delete a single user by selecting a checkbox 
postEventMemberApprovalTestcases.deleteMemberBySelectingCheckbox = function() {
	casper.then(function() {
		casper.echo('                                      CASE 28', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*                   Delete a single user by selecting a checkbox                  *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		postEventMemberApprovalMethod.registerMember(json['memberInfo'], casper, function(err) {
			if(!err) {
				casper.then(function() {
					postEventMemberApprovalMethod.goToApprovalQueuePage(casper, casper.test, function(err) {
						if(!err) {
							postEventMemberApprovalMethod.memberId(casper, function(err,memberId) {
								if(!err) {
									casper.then(function() {
										casper.click('input#mem_'+memberId[1]);
										casper.test.assertExists('div#pending-menu','floating menu is appear on bottom of the page','INFO');
										casper.test.assertExists('div#pending-menu span.dropdown a.text-danger i', 'approve tick on the floating menu******************');
										casper.click('div#pending-menu span.dropdown a.text-danger i');
										casper.waitWhileVisible('li#member_'+memberId[1], function success() {
											casper.test.assertDoesntExist('li#member_'+memberId[1] ,'username is deleted from the approval queue page','INFO');
										}, function fail() { 
											casper.test.assertExists('li#member_'+memberId[1] ,'username is deleted from the approval queue page','INFO');
										});
									});	
								}
							});
						} else {
							casper.echo('Not called goToApprovalQueuePage method','ERROR');
						}
					});
				});
			} else {
				casper.echo('Not called registerMember method','ERROR');
			}
		});
	});
};

// method to Delete All user by selecting the checkbox appearing on the top right corner 
postEventMemberApprovalTestcases.deleteMemberBySelectingRightCornerCheckbox = function() {
	casper.then(function() {
		casper.echo('                                      CASE 29', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*     Delete All user by selecting the checkbox appearing on the top right corner *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		postEventMemberApprovalMethod.registerMember(json['memberInfo'], casper, function(err) {
			if(!err) {
				casper.then(function() {
					postEventMemberApprovalMethod.goToApprovalQueuePage(casper, casper.test, function(err) {
						if(!err) {
							postEventMemberApprovalMethod.memberId(casper, function(err,memberId) {
								if(!err) {
									casper.then(function() {
										casper.click('div.subheading input#select_all_pending_members');
										casper.test.assertExists('div#pending-menu','floating tab is appear on bottom of the page');
										casper.test.assertExists('div#pending-menu span.dropdown a.text-danger i', 'DELETE TICK ON THE FLOATING MENU');
										casper.waitForSelector('div#pending-menu',function success() {
											casper.click('div#pending-menu span.dropdown a.text-danger i');
											var actualText = casper.fetchText('form[name="posts"] div.alert.alert-info.text-center');
											var expectedText ="There's currently nothing that needs your approval."; 
											casper.echo('TEXT FETCHED = '+actualText,'INFO');
											casper.test.assert(actualText.indexOf(expectedText) > -1);
										}, function fail(){
											casper.echo('Floating Menu not Found','INFO');
										});
									});	
								}
							});
						} else {
							casper.echo('Not called goToApprovalQueuePage method','ERROR');
						}
					});
				});
			} else {
				casper.echo('Not called registerMember method','ERROR');
			}
		});
	});
};

// method to Delete pending member by searching it from advance search 
postEventMemberApprovalTestcases.deleteMemberByAdvanceSearch = function() {
	casper.then(function() {
		casper.echo('                                      CASE 6', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*            Delete pending member by searching it from advance search            *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		postEventMemberApprovalMethod.registerMember(json['memberInfo'], casper, function(err) {
			
		});
	});
	casper.thenOpen(config.url, function() {
		//login with admin user to get the id of the post and to approve it
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(json["AdminUserLogin"].username, json["AdminUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.waitForSelector('button#searchContent', function success() {
							casper.click('button#searchContent');
							casper.waitForSelector('a#advancedSearch', function success() {
								casper.click('a#advancedSearch');
								casper.waitForSelector('a#anchor_tab_member_search', function success() {
									casper.click('a#anchor_tab_member_search');
									casper.waitForSelector('#search-par', function success() {
										casper.sendKeys('input[name="s_username"]',json.userToDelete, {keepFocus: true});
										casper.page.sendEvent("keypress", casper.page.event.key.Enter);
										casper.fillSelectors('form[name="posts"]', {
			    								'select[name="usergroupid"]': '20237757'
										}, true);
										casper.click('input.btn.btn-primary');
										casper.waitForSelector('div.panel-body.table-responsive a strong',function success() {
											casper.click('div.panel-body.table-responsive a strong');
											casper.waitForSelector('div.alert.alert-danger.text-center strong', function() {
												casper.echo(casper.fetchText('div.alert.alert-danger.text-center strong'),'INFO');
												casper.click('div.alert.alert-danger.text-center a.btn.btn-success');
											});
										}, function fail() {
											casper.echo('Pending Member not found','ERROR');
										});
									}, function fail() {
										casper.echo('Member Search Form not found','ERROR');	
									});
								}, function fail() {
									casper.echo('Member panel-heading not found','ERROR');
								});
							}, function fail() {
								casper.echo('Advance Search button not found','ERROR');
							});
						}, function fail() {
							casper.echo('Search button not found','ERROR');
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


// method to Delete a pending user from- Approval queue button for backend setting two 
postEventMemberApprovalTestcases.deleteMemberByApprovalQueueButtonSettingTwo = function() {
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                      CASE 30', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*    Delete a pending user from- Approval queue button for backend setting two     *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		//method to Enable -  Email verification and Disable -Approve New Registrations
		postEventMemberApprovalMethod.disableApproveRegistrationsAndEnableEmail(casper, function(err) {
			if(!err) {
				casper.echo('Disable Approve New Event functionality method called ','INFO');
			}
		});
		casper.then(function() {
			//method to set the user permission to Administration 
			postEventMemberApprovalMethod.setAdmin(casper, casper.test, function(err) {
				if(!err) {
					casper.echo('Set admin method called ','INFO');
				}
			});
		});
	});
	casper.then(function() {
		try {
			casper.test.assertExists('ul.nav.pull-right span.caret');
			casper.then(function() {
				forumLoginMethod.logoutFromApp(casper, function() { });
			});
		} catch (e) {
			casper.echo('No user logged in','INFO');
		}
		postEventMemberApprovalMethod.registerMember(json['memberInfo'], casper, function(err) {
		
		});
		casper.thenOpen(config.url, function() {
			//login with admin user to get the id of the post and to approve it
			casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(json["AdminUserLogin"].username, json["AdminUserLogin"].password, casper, function(err) {
				if(!err) {
					wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
						if(isExists) {
							casper.echo('User has been successfuly login to application with admin user', 'INFO');
							casper.waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function success() {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								casper.waitForSelector('li[id^="forum_"]', function success() {
									casper.test.assertDoesntExist('li#approvalQueue a' ,'approval queue icon is deleted from the forum','INFO');
								},function fail(){
									casper.echo('Approval Queue not Found','INFO');
								});        
							},function fail(){
								casper.echo('Categories not Found','ERROR');
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
	});
	casper.then(function() { // method called to delete the user which is approved above
		postEventMemberApprovalMethod.deleteMember(casper, function (err) {
			if(!err) {
				casper.echo('Inside the deleteUser method','INFO');
			}
		});
	});
};

// method to Delete a pending user-by  Searching pending User for backend setting two 
postEventMemberApprovalTestcases.deleteMemberBySearchingPendingUserSettingTwo = function() {
	casper.then(function() {
		casper.echo('                                      CASE 31', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*           Delete a pending user-by  Searching pending User Setting Two           *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		postEventMemberApprovalMethod.registerMember(json['memberInfo'], casper, function(err) {
		
		});
	});
	casper.thenOpen("http://beta8.websitetoolbox.com/cgi/members/cloudsearch_batch_changes.cgi" , function() {

	});
	casper.thenOpen(config.url, function() {
		//login with admin user to search the user and to delete it
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(json["AdminUserLogin"].username, json["AdminUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.waitForSelector('button#searchContent', function success() {
							casper.click('button#searchContent');
							casper.waitForSelector('a#searchMembers', function success() {
								casper.click('a#searchMembers');
								casper.waitForSelector('input[name="s_username"]', function success() {
									casper.sendKeys('input[name="s_username"]',json.userToDelete, {keepFocus: true});
									casper.page.sendEvent("keypress", casper.page.event.key.Enter);
									casper.waitForSelector('div.panel-body.table-responsive a strong',function success() {
										casper.click('div.panel-body.table-responsive a strong');
										casper.waitForSelector('div.alert.alert-danger.text-center strong', function() {
											casper.echo(casper.fetchText('div.alert.alert-danger.text-center strong'),'INFO');
											casper.click('div.alert.alert-danger.text-center a.btn.btn-danger');
											casper.wait(5000, function() {
											
											});	
										});
									}, function fail() {
										casper.echo('Pending Member not found','ERROR');
									});
								}, function fail() {
									casper.echo('Search bar not found','ERROR');
								});
							}, function fail() {
								casper.echo('Member Search button not found','ERROR');
							});
						}, function fail() {
							casper.echo('Search button not found','ERROR');
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

// method to Delete a pending user from- Approval queue button for backend setting three 
postEventMemberApprovalTestcases.deleteMemberByApprovalQueueButtonSettingThree = function() {
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                      CASE 32', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*    Delete a pending user from- Approval queue button for backend setting three   *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		//method to Enable -  Email verification and Disable -Approve New Registrations
		postEventMemberApprovalMethod.enableApproveRegistrationsAndEnableEmail(casper, function(err) {
			if(!err) {
				casper.echo('Disable Approve New Event functionality method called ','INFO');
			}
		});
		casper.then(function() {
			//method to set the user permission to Administration 
			postEventMemberApprovalMethod.setAdmin(casper, casper.test, function(err) {
				if(!err) {
					casper.echo('Set admin method called ','INFO');
				}
			});
		});
	});
	casper.then(function() {
		try {
			casper.test.assertExists('ul.nav.pull-right span.caret');
			casper.then(function() {
				forumLoginMethod.logoutFromApp(casper, function() { });
			});
		} catch (e) {
			casper.echo('No user logged in','INFO');
		}
		postEventMemberApprovalMethod.registerMember(json['memberInfo'], casper, function(err) {
		
		});
		casper.thenOpen(config.url, function() {
			//login with admin user to get the id of the post and to approve it
			casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(json["AdminUserLogin"].username, json["AdminUserLogin"].password, casper, function(err) {
				if(!err) {
					wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
						if(isExists) {
							casper.echo('User has been successfuly login to application with admin user', 'INFO');
							casper.waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function success() {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								casper.waitForSelector('li[id^="forum_"]', function success() {
									casper.test.assertDoesntExist('li#approvalQueue a' ,'approval queue icon is deleted from the forum','INFO');
								},function fail(){
									casper.echo('Approval Queue not Found','INFO');
								});        
							},function fail(){
								casper.echo('Categories not Found','ERROR');
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
	});
	casper.then(function() { // method called to delete the user which is approved above
		postEventMemberApprovalMethod.deleteMember(casper, function (err) {
			if(!err) {
				casper.echo('Inside the deleteUser method','INFO');
			}
		});
	});
};

// method to Delete a pending user-by  Searching pending User for backend setting three 
postEventMemberApprovalTestcases.deleteMemberBySearchingPendingUserSettingThree = function() {
	casper.then(function() {
		casper.echo('                                      CASE 33', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*           Delete a pending user-by  Searching pending User Setting Three         *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		postEventMemberApprovalMethod.registerMember(json['memberInfo'], casper, function(err) {
		
		});
	});
	casper.thenOpen("http://beta8.websitetoolbox.com/cgi/members/cloudsearch_batch_changes.cgi" , function() {

	});
	casper.thenOpen(config.url, function() {
		//login with admin user to search the user and to delete it
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(json["AdminUserLogin"].username, json["AdminUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.waitForSelector('button#searchContent', function success() {
							casper.click('button#searchContent');
							casper.waitForSelector('a#searchMembers', function success() {
								casper.click('a#searchMembers');
								casper.waitForSelector('input[name="s_username"]', function success() {
									casper.sendKeys('input[name="s_username"]',json.userToDelete, {keepFocus: true});
									casper.page.sendEvent("keypress", casper.page.event.key.Enter);
									casper.waitForSelector('div.panel-body.table-responsive a strong',function success() {
										casper.click('div.panel-body.table-responsive a strong');
										casper.waitForSelector('div.alert.alert-danger.text-center strong', function() {
											casper.echo(casper.fetchText('div.alert.alert-danger.text-center strong'),'INFO');
											casper.click('div.alert.alert-danger.text-center a.btn.btn-danger');
											casper.wait(5000, function() {
											
											});	
										});
									}, function fail() {
										casper.echo('Pending Member not found','ERROR');
									});
								}, function fail() {
									casper.echo('Search bar not found','ERROR');
								});
							}, function fail() {
								casper.echo('Member Search button not found','ERROR');
							});
						}, function fail() {
							casper.echo('Search button not found','ERROR');
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

// method to Delete a pending user from- Approval queue button for backend setting four 
postEventMemberApprovalTestcases.deleteMemberByApprovalQueueButtonSettingFour = function() {
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                      CASE 34', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*    Delete a pending user from- Approval queue button for backend setting four    *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		//method to Enable -  Email verification and Disable -Approve New Registrations
		postEventMemberApprovalMethod.disableApproveRegistrationsAndDisableEmail(casper, function(err) {
			if(!err) {
				casper.echo('Disable Approve New Event functionality method called ','INFO');
			}
		});
		casper.then(function() {
			//method to set the user permission to Administration 
			postEventMemberApprovalMethod.setAdmin(casper, casper.test, function(err) {
				if(!err) {
					casper.echo('Set admin method called ','INFO');
				}
			});
		});
	});
	casper.then(function() {
		try {
			casper.test.assertExists('ul.nav.pull-right span.caret');
			casper.then(function() {
				forumLoginMethod.logoutFromApp(casper, function() { });
			});
		} catch (e) {
			casper.echo('No user logged in','INFO');
		}
		postEventMemberApprovalMethod.registerMember(json['memberInfo'], casper, function(err) {
		
		});
		casper.thenOpen(config.url, function() {
			//login with admin user to get the id of the post and to approve it
			casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(json["AdminUserLogin"].username, json["AdminUserLogin"].password, casper, function(err) {
				if(!err) {
					wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
						if(isExists) {
							casper.echo('User has been successfuly login to application with admin user', 'INFO');
							casper.waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function success() {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								casper.waitForSelector('li[id^="forum_"]', function success() {
									casper.test.assertDoesntExist('li#approvalQueue a' ,'approval queue icon is deleted from the forum','INFO');
								},function fail(){
									casper.echo('Approval Queue not Found','INFO');
								});        
							},function fail(){
								casper.echo('Categories not Found','ERROR');
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
	});
	casper.then(function() { // method called to delete the user which is approved above
		postEventMemberApprovalMethod.deleteMember(casper, function (err) {
			if(!err) {
				casper.echo('Inside the deleteUser method','INFO');
			}
		});
	});
};

// method to Delete a pending user-by  Searching pending User for backend setting four 
postEventMemberApprovalTestcases.deleteMemberBySearchingPendingUserSettingFour = function() {
	casper.then(function() {
		casper.echo('                                      CASE 35', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*           Delete a pending user-by  Searching pending User Setting Four          *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		postEventMemberApprovalMethod.registerMember(json['memberInfo'], casper, function(err) {
		
		});
	});
	casper.thenOpen("http://beta8.websitetoolbox.com/cgi/members/cloudsearch_batch_changes.cgi" , function() {

	});
	casper.thenOpen(config.url, function() {
		//login with admin user to search the user and to delete it
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(json["AdminUserLogin"].username, json["AdminUserLogin"].password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.waitForSelector('button#searchContent', function success() {
							casper.click('button#searchContent');
							casper.waitForSelector('a#searchMembers', function success() {
								casper.click('a#searchMembers');
								casper.waitForSelector('input[name="s_username"]', function success() {
									casper.sendKeys('input[name="s_username"]',json.userToDelete, {keepFocus: true});
									casper.page.sendEvent("keypress", casper.page.event.key.Enter);
									casper.waitForSelector('div.panel-body.table-responsive a strong',function success() {
										casper.click('div.panel-body.table-responsive a strong');
										casper.waitForSelector('div.alert.alert-danger.text-center strong', function() {
											casper.echo(casper.fetchText('div.alert.alert-danger.text-center strong'),'INFO');
											casper.click('div.alert.alert-danger.text-center a.btn.btn-danger');
											casper.wait(5000, function() {
											
											});	
										});
									}, function fail() {
										casper.echo('Pending Member not found','ERROR');
									});
								}, function fail() {
									casper.echo('Search bar not found','ERROR');
								});
							}, function fail() {
								casper.echo('Member Search button not found','ERROR');
							});
						}, function fail() {
							casper.echo('Search button not found','ERROR');
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

// method to Delete a pending user from- From Default User Groups (by check box) 
postEventMemberApprovalTestcases.deleteMemberFromDefaultUserGroupsByCheckbox = function() {
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                      CASE 36', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*        Delete a pending user from- From Default User Groups (by check box)       *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		//method to enable approve new post** All posts
		postEventMemberApprovalMethod.enableApproveRegistrationsAndDisableEmail(casper, function(err) {
			if(!err) {
				casper.echo('Enable Approve New Event functionality method called ','INFO');
			}
		});
		casper.then(function() {
			//method to set the user permission to Administration 
			postEventMemberApprovalMethod.setAdmin(casper, casper.test, function(err) {
				if(!err) {
					casper.echo('Set admin method called ','INFO');
				}
			});
		});
	});
	postEventMemberApprovalMethod.registerMember(json['memberInfo'], casper, function(err) {
			
	});
	casper.thenOpen(config.backEndUrl, function() {
		registerMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', 'Users Link Found'); 
						casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
						casper.test.assertExists('div#ddUsers a', '*****Group permission is found****');
						casper.click('div#ddUsers a');
						casper.waitForSelector('table.text.fullborder', function success() {
							casper.click('tr:nth-child(5) td:nth-child(2) a');
							casper.waitForSelector('table#groupUsersList', function success() {
								casper.click('tr td input[name="user_id"]');
								casper.test.assertExist('select[name="action"]','drop down is appear on the bottom of page');
								casper.fillSelectors('div#floatingActionMenu', {
				    					'select[name="action"]': 'delete_members'
								}, true);
								casper.waitWhileVisible('a[title="View profile"]', function success() {
									casper.test.assertDoesntExist('a[title="View profile"]' ,'username is deleted from the approval queue page','INFO');
								}, function fail() { 
									casper.test.assertExists('a[title="View profile"]' ,'username is not deleted from the approval queue page','INFO');
								});
							},function fail() {
								casper.echo('Floating menu not found','INFO');
							});
						}, function fail() {
							casper.echo('Table not found','INFO');
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error ', 'ERROR');
			}
		});
		casper.then(function() {
			backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
			});
		});
	});
};

// method to Delete a pending user From Default User Groups (by buttons) 
postEventMemberApprovalTestcases.deleteMemberFromDefaultUserGroupsByButtons = function() {
	casper.then(function() {
		casper.echo('                                      CASE 37', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*             Delete a pending user From Default User Groups (by buttons)          *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		postEventMemberApprovalMethod.registerMember(json['memberInfo'], casper, function(err) {
			
		});
	});
	casper.thenOpen(config.backEndUrl, function() {
		registerMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', 'Users Link Found'); 
						casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
						casper.test.assertExists('div#ddUsers a', '*****Group permission is found****');
						casper.click('div#ddUsers a');
						casper.waitForSelector('table.text.fullborder', function success() {
							casper.click('tr:nth-child(5) td:nth-child(2) a');
							casper.waitForSelector('table#groupUsersList', function success() {
								casper.mouse.move("td.userlist-icons a:nth-child(3)");
								casper.click('td.userlist-icons a:nth-child(3)');
								casper.waitWhileVisible('a[title="View profile"]', function success() {
									casper.test.assertDoesntExist('a[title="View profile"]' ,'username is deleted from the approval queue page','INFO');
								}, function fail() { 
									casper.test.assertExists('a[title="View profile"]' ,'username is not deleted from the approval queue page','INFO');
								});
							},function fail(){
								casper.echo('User table not found','ERROR');
							});
			
						}, function fail() {
							casper.echo('Table not found','INFO');
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error ', 'ERROR');
			}
		});
		casper.then(function() {
			backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
			});
		});
	});
};

// method to Delete a pending user from Change a User's User Group(Delete button) 
postEventMemberApprovalTestcases.deleteMemberFromChangeUserGroupDeleteButton = function() {
	casper.then(function() {
		casper.echo('                                      CASE 38', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo("*       Delete a pending user from Change a User's User Group(approve button)      *", 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		postEventMemberApprovalMethod.registerMember(json['memberInfo'], casper, function(err) {
			
		});
	});
	casper.thenOpen(config.backEndUrl, function() {
		registerMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', 'Users Link Found'); 
						casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
						casper.test.assertExists('div#ddUsers a', '*****Group permission is found****');
						casper.click('div#ddUsers a');
						casper.waitForSelector('form#frmChangeUsersGroup', function success() {
							casper.fill('form#frmChangeUsersGroup', {
								'member' : json.userToDelete
							}, true);
							casper.waitForSelector('form[name="ugfrm"]', function success() {
								casper.test.assertExists('a#delete_user', '******Delete user button found *****');
								casper.click('a#delete_user');
								casper.waitWhileVisible('a[title="View profile"]', function success() {
									casper.test.assertDoesntExist('a[title="View profile"]' ,'username is deleted from the approval queue page','INFO');
								}, function fail() { 
									casper.test.assertExists('a[title="View profile"]' ,'username is not deleted from the approval queue page','INFO');
								});
							}, function fail(){
								casper.echo('Approve user button not found','ERROR');	
							});
						},function fail(){
							casper.echo('Change user group permission not found','ERROR');
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error ', 'ERROR');
			}
		});
		casper.then(function() {
			backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
			});
		});
	});
};

// method to Delete a pending user from- From Default User Groups (by check box) for backend setting two
postEventMemberApprovalTestcases.deleteMemberFromDefaultUserGroupsByCheckboxSettingTwo = function() {
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                      CASE 39', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('* Delete a pending user from- From Default User Groups (by check box) Setting two  *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		//method to enable approve new post** All posts
		postEventMemberApprovalMethod.disableApproveRegistrationsAndEnableEmail(casper, function(err) {
			if(!err) {
				casper.echo('Enable Approve New Event functionality method called ','INFO');
			}
		});
		casper.then(function() {
			//method to set the user permission to Administration 
			postEventMemberApprovalMethod.setAdmin(casper, casper.test, function(err) {
				if(!err) {
					casper.echo('Set admin method called ','INFO');
				}
			});
		});
	});
	postEventMemberApprovalMethod.registerMember(json['memberInfo'], casper, function(err) {
			
	});
	casper.thenOpen(config.backEndUrl, function() {
		registerMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', 'Users Link Found'); 
						casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
						casper.test.assertExists('div#ddUsers a', '*****Group permission is found****');
						casper.click('div#ddUsers a');
						casper.waitForSelector('table.text.fullborder', function success() {
							casper.click('tr:nth-child(5) td:nth-child(2) a');
							casper.waitForSelector('table#groupUsersList', function success() {
								casper.click('tr td input[name="user_id"]');
								casper.waitForSelector('div#floatingActionMenu', function success() {
									casper.test.assertExist('select[name="action"]','drop down is appear on the bottum of page');
									casper.fillSelectors('div#floatingActionMenu', {
					    					'select[name="action"]': 'delete_members'
									}, true);
									casper.waitWhileVisible('a[title="View profile"]', function success() {
										casper.test.assertDoesntExist('a[title="View profile"]' ,'username is deleted from the Pending Email Verification page','INFO');
									}, function fail() { 
										casper.test.assertExists('a[title="View profile"]' ,'username is not deleted from the Pending Email Verification page','INFO');
									});
								},function fail() {
									casper.echo('Floating menu not found','INFO');
								});
							},function fail(){
								casper.echo('User table not found','ERROR');
							});
			
						}, function fail() {
							casper.echo('Table not found','INFO');
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error ', 'ERROR');
			}
		});
		casper.then(function() {
			backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
			});
		});
	});
};

// method to Delete a pending user from Change a User's User Group(delete button) for setting two
postEventMemberApprovalTestcases.deleteMemberFromChangeUserGroupDeleteButtonSettingTwo = function() {
	casper.then(function() {
		casper.echo('                                      CASE 40', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo("*  Delete a pending user from Change a User's User Group(delete button) Setting two *", 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		postEventMemberApprovalMethod.registerMember(json['memberInfo'], casper, function(err) {
			
		});
	});
	casper.thenOpen(config.backEndUrl, function() {
		registerMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', 'Users Link Found'); 
						casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
						casper.test.assertExists('div#ddUsers a', '*****Group permission is found****');
						casper.click('div#ddUsers a');
						casper.waitForSelector('form#frmChangeUsersGroup', function success() {
							casper.fill('form#frmChangeUsersGroup', {
								'member' : json.userToDelete
							}, true);
							casper.waitForSelector('form[name="ugfrm"]', function success() {
								casper.test.assertExists('a#delete_user', '******Delete user button found *****');
								casper.click('a#delete_user');
								casper.waitWhileVisible('a[title="View profile"]', function success() {
									casper.test.assertDoesntExist('a[title="View profile"]' ,'username is deleted from the approval queue page','INFO');
								}, function fail() { 
									casper.test.assertExists('a[title="View profile"]' ,'username is not deleted from the approval queue page','INFO');
								});
							}, function fail(){
								casper.echo('Approve user button not found','ERROR');	
							});
						},function fail() {
							casper.echo('Change user group permission not found','ERROR');
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error ', 'ERROR');
			}
		});
		casper.then(function() {
			backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
			});
		});
	});
};

// method to Delete a pending user From Default User Groups (by buttons) for setting two
postEventMemberApprovalTestcases.deleteMemberFromDefaultUserGroupsByButtonsSettingTwo = function() {
	casper.then(function() {
		casper.echo('                                      CASE 41', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*   Delete a pending user From Default User Groups (by buttons) for setting two    *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		postEventMemberApprovalMethod.registerMember(json['memberInfo'], casper, function(err) {
			
		});
	});
	casper.thenOpen(config.backEndUrl, function() {
		registerMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', 'Users Link Found'); 
						casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
						casper.test.assertExists('div#ddUsers a', '*****Group permission is found****');
						casper.click('div#ddUsers a');
						casper.waitForSelector('table.text.fullborder', function success() {
							casper.click('tr:nth-child(5) td:nth-child(2) a');
							casper.waitForSelector('table#groupUsersList', function success() {
								casper.mouse.move("tr td a.userlist-delete");
								casper.click('tr td a.userlist-delete');
								casper.waitWhileVisible('a[title="View profile"]', function success() {
									casper.test.assertDoesntExist('a[title="View profile"]' ,'username is deleted from the approval queue page','INFO');
								}, function fail() { 
									casper.test.assertExists('a[title="View profile"]' ,'username is not deleted from the approval queue page','INFO');
								});
							},function fail(){
								casper.echo('User table not found','ERROR');
							});
			
						}, function fail() {
							casper.echo('Table not found','INFO');
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error ', 'ERROR');
			}
		});
		casper.then(function() {
			backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
			});
		});
	});
};

// method to Delete a pending user from- From Default User Groups (by check box) for backend setting three
postEventMemberApprovalTestcases.deleteMemberFromDefaultUserGroupsByCheckboxSettingThree = function() {
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                      CASE 42', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*Delete a pending user from- From Default User Groups (by check box) Setting three *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		//method to enable approve new post** All posts
		postEventMemberApprovalMethod.enableApproveRegistrationsAndEnableEmail(casper, function(err) {
			if(!err) {
				casper.echo('Enable Approve New Event functionality method called ','INFO');
			}
		});
		casper.then(function() {
			//method to set the user permission to Administration 
			postEventMemberApprovalMethod.setAdmin(casper, casper.test, function(err) {
				if(!err) {
					casper.echo('Set admin method called ','INFO');
				}
			});
		});
	});
	postEventMemberApprovalMethod.registerMember(json['memberInfo'], casper, function(err) {
			
	});
	casper.thenOpen(config.backEndUrl, function() {
		registerMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', 'Users Link Found'); 
						casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
						casper.test.assertExists('div#ddUsers a', '*****Group permission is found****');
						casper.click('div#ddUsers a');
						casper.waitForSelector('table.text.fullborder', function success() {
							casper.click('tr:nth-child(6) td:nth-child(2) a');
							casper.waitForSelector('table#groupUsersList', function success() {
								casper.click('tr td input[name="user_id"]');
								casper.waitForSelector('div#floatingActionMenu', function success() {
									casper.test.assertExist('select[name="action"]','drop down is appear on the bottum of page');
									casper.fillSelectors('div#floatingActionMenu', {
					    					'select[name="action"]': 'delete_members'
									}, true);
									casper.waitWhileVisible('a[title="View profile"]', function success() {
										casper.test.assertDoesntExist('a[title="View profile"]' ,'username is deleted from the Pending Email Verification page','INFO');
									}, function fail() { 
										casper.test.assertExists('a[title="View profile"]' ,'username is not deleted from the Pending Email Verification page','INFO');
									});
								},function fail() {
									casper.echo('Floating menu not found','INFO');
								});
							},function fail(){
								casper.echo('User table not found','ERROR');
							});
			
						}, function fail() {
							casper.echo('Table not found','INFO');
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error ', 'ERROR');
			}
		});
		casper.then(function() {
			backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
			});
		});
	});
};

// method to Delete a pending user From Default User Groups (by buttons) for setting three
postEventMemberApprovalTestcases.deleteMemberFromDefaultUserGroupsByButtonsSettingThree = function() {
	casper.then(function() {
		casper.echo('                                      CASE 43', 'INFO');
		casper.echo('**************************************************************************************', 'INFO');
		casper.echo('*   Delete a pending user From Default User Groups (by buttons) for setting three    *', 'INFO');
		casper.echo('**************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		postEventMemberApprovalMethod.registerMember(json['memberInfo'], casper, function(err) {
			
		});
	});
	casper.thenOpen(config.backEndUrl, function() {
		registerMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', 'Users Link Found'); 
						casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
						casper.test.assertExists('div#ddUsers a', '*****Group permission is found****');
						casper.click('div#ddUsers a');
						casper.waitForSelector('table.text.fullborder', function success() {
							casper.click('tr:nth-child(6) td:nth-child(2) a');
							casper.waitForSelector('table#groupUsersList', function success() {
								casper.mouse.move("tr td a.userlist-delete");
								casper.click('tr td a.userlist-delete');
								casper.waitWhileVisible('a[title="View profile"]', function success() {
									casper.test.assertDoesntExist('a[title="View profile"]' ,'username is deleted from the approval queue page','INFO');
								}, function fail() { 
									casper.test.assertExists('a[title="View profile"]' ,'username is not deleted from the approval queue page','INFO');
								});
							},function fail(){
								casper.echo('User table not found','ERROR');
							});
			
						}, function fail() {
							casper.echo('Table not found','INFO');
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error ', 'ERROR');
			}
		});
		casper.then(function() {
			backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
			});
		});
	});
};

// method to Delete a pending user from Change a User's User Group(change group) for setting three
postEventMemberApprovalTestcases.deleteMemberFromChangeUserGroupChangeGroupSettingThree = function() {
	casper.then(function() {
		casper.echo('                                      CASE 44', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo("*Delete a pending user from Change a User's User Group(change group) Setting three *", 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		postEventMemberApprovalMethod.registerMember(json['memberInfo'], casper, function(err) {
			
		});
	});
	casper.thenOpen(config.backEndUrl, function() {
		registerMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', 'Users Link Found'); 
						casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
						casper.test.assertExists('div#ddUsers a', '*****Group permission is found****');
						casper.click('div#ddUsers a');
						casper.waitForSelector('form#frmChangeUsersGroup', function success() {
							casper.fill('form#frmChangeUsersGroup', {
								'member' : json.userToDelete
							}, true);
							casper.waitForSelector('form[name="ugfrm"]', function success() {
								casper.test.assertExists('form#frmChangeUsersGroupFinal', '*************POP UP appear*************');
								/*casper.fillLabels('form#frmChangeUsersGroupFinal', {
									'Registered Users' : 'checked',
									'Pending Email Verification' : ''
								}, true);*/
								casper.waitWhileVisible('a[title="View profile"]', function success() {
									casper.test.assertDoesntExist('a[title="View profile"]' ,'username is deleted from the Pending Email Verification page','INFO');
								}, function fail() { 
									casper.test.assertExists('a[title="View profile"]' ,'username is not deleted from the Pending Email Verification page','INFO');
								});
							}, function fail() {
								casper.echo('Approve user button not found','ERROR');	
							});
						},function fail() {
							casper.echo('Change user group permission not found','ERROR');
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error ', 'ERROR');
			}
		});
		casper.then(function() {
			backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
			});
		});
	});
};

// method to Delete a pending user from Change a User's User Group(delete button) for setting three
postEventMemberApprovalTestcases.deleteMemberFromChangeUserGroupDeleteButtonSettingThree = function() {
	casper.then(function() {
		casper.echo('                                      CASE 45', 'INFO');
		casper.echo('***************************************************************************************', 'INFO');
		casper.echo("*  Delete a pending user from Change a User's User Group(delete button) Setting three *", 'INFO');
		casper.echo('***************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		postEventMemberApprovalMethod.registerMember(json['memberInfo'], casper, function(err) {
			
		});
	});
	casper.thenOpen(config.backEndUrl, function() {
		registerMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', 'Users Link Found'); 
						casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
						casper.test.assertExists('div#ddUsers a', '*****Group permission is found****');
						casper.click('div#ddUsers a');
						casper.waitForSelector('form#frmChangeUsersGroup', function success() {
							casper.fill('form#frmChangeUsersGroup', {
								'member' : json.userToDelete
							}, true);
							casper.waitForSelector('form[name="ugfrm"]', function success() {
								casper.test.assertExists('a#delete_user', '******Delete user button found *****');
								casper.click('a#delete_user');
								casper.waitWhileVisible('a[title="View profile"]', function success() {
									casper.test.assertDoesntExist('a[title="View profile"]' ,'username is deleted from the approval queue page','INFO');
								}, function fail() { 
									casper.test.assertExists('a[title="View profile"]' ,'username is not deleted from the approval queue page','INFO');
								});
							}, function fail(){
								casper.echo('Approve user button not found','ERROR');	
							});
						},function fail() {
							casper.echo('Change user group permission not found','ERROR');
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error ', 'ERROR');
			}
		});
		casper.then(function() {
			backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
			});
		});
	});
};

// method to Delete a pending user for setting four
postEventMemberApprovalTestcases.deleteMemberSettingFour = function() {
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                      CASE 46', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*                        Delete a pending user Setting four                        *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		//method to enable approve new post** All posts
		postEventMemberApprovalMethod.disableApproveRegistrationsAndDisableEmail(casper, function(err) {
			if(!err) {
				casper.echo('Enable Approve New Event functionality method called ','INFO');
			}
		});
		casper.then(function() {
			//method to set the user permission to Administration 
			postEventMemberApprovalMethod.setAdmin(casper, casper.test, function(err) {
				if(!err) {
					casper.echo('Set admin method called ','INFO');
				}
			});
		});
	});
	postEventMemberApprovalMethod.registerMember(json['memberInfo'], casper, function(err) {
			
	});
	casper.thenOpen(config.backEndUrl, function() {
		registerMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', 'Users Link Found'); 
						casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
						casper.test.assertExists('div#ddUsers a', '*****Group permission is found****');
						casper.click('div#ddUsers a');
						casper.waitForSelector('form#frmChangeUsersGroup', function success() {
							casper.fill('form#frmChangeUsersGroup', {
								'member' : json.userToDelete
							}, true);
							casper.waitForSelector('form[name="ugfrm"]', function success() {
								var checked = casper.evaluate(function() {
									var element = document.getElementById(20237761).checked;
									return element;
								});
								casper.echo('the value of checked = '+checked,'INFO');
								if(checked == true) {
									casper.echo('The pending user is moved to Register user, Verified','INFO');
								}
								else {
									casper.echo('The pending user is not moved to Register user, Verified','INFO');
								}
							}, function fail() {
								casper.echo('changer user group form not found','ERROR');	
							});
						},function fail() {
							casper.echo('Change user group permission not found','ERROR');
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error ', 'ERROR');
			}
		});
		casper.then(function() {
			backEndForumRegisterMethod.redirectToBackEndLogout(casper,casper.test, function() {
			});
		});
	});
	/*casper.then(function() { // method called to delete the user which is approved above
		postEventMemberApprovalMethod.deleteMember(casper, function (err) {
			if(!err) {
				casper.echo('Inside the deleteUser method','INFO');
			}
		});
	});*/
};

