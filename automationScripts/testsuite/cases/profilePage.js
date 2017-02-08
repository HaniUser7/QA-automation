var registerJSON=require('../../testdata/registerData.json');
var loginJSON = require('../../testdata/loginData.json');
var config = require('../../../config/config.json');
var deletePostMethod = require('../methods/deletePost.js');
var forumLoginMethod = require('../methods/login.js');
var loginPrivacyOptionMethod = require('../methods/loginByPrivacyOption.js');
var profilePageMethod= require('../methods/profilePage.js');
var uploadMethods=require('../methods/upload.js');
var registerTests=require('../cases/register.js');
var registerMethod=require('../methods/register.js');
var utils=require('../utils.js');
var profilePageTests = module.exports = {};
var wait=require('../wait.js');



//verify by creating Admin-user
profilePageTests.CreateAdminUser=function() {

		
		//1.test case for register user
		casper.echo('1.Admin user', 'INFO');
		casper.echo('******************************', 'INFO');
		wait.waitForTime(1000,casper,function(err){
			casper.test.assertExists('a[href="/register/register"]');
			casper.click('a[href="/register/register"]');
			casper.echo('Successfully open register form.....', 'INFO');
			wait.waitForTime(2000,casper,function(err){
				registerMethod.registerToApp(registerJSON['validInfoAdmin'], casper, function(err) {
					if(!err) {
						casper.echo('Processing to registration on forum.....', 'INFO');
						registerMethod.redirectToLogout(casper, casper.test, function(err) {
							if(!err) {
                                                        	casper.echo('User logout successfully', 'INFO');
							}
						});
					}
				});
			});
		});
	
                   
	//2.Test case for backend setting admin user 
	profilePageMethod.enableUserRegister(registerJSON['validInfoAdmin'].uname , casper , function(err){
		if(!err){
			casper.echo('enableUser working', 'INFO');
		}
	});
       
};

//Verify by creating Register user
profilePageTests.CreateRegisterUser=function() {

	//1.test case for register user
	casper.thenOpen(config.url, function() {
		casper.echo('1.Register user', 'INFO');
		casper.echo('******************************', 'INFO');
		wait.waitForTime(1000,casper,function(err){
			casper.test.assertExists('a[href="/register/register"]');
			casper.click('a[href="/register/register"]');
			casper.echo('Successfully open register form.....', 'INFO');
			wait.waitForTime(2000,casper,function(err){
				registerMethod.registerToApp(registerJSON['validInfoRegister'], casper, function(err) {
					if(!err) {
						casper.echo('Processing to registration on forum.....', 'INFO');
						registerMethod.redirectToLogout(casper, casper.test, function(err) {
							if(!err) {
                                                        	casper.echo('User logout successfully', 'INFO');
							}
						});
					}
				});
			});
		});
	}); 
		
};

//Verify with sending message by message button.

profilePageTests.profilePageMessageButton=function(){

	profilePageMethod.messageButtonEnable(casper , function(err){
		if(!err)
			casper.echo('Method called succesfully' ,'INFO');

	});
	casper.thenOpen(config.url , function() {
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 1                 ' ,'INFO');	
		casper.echo('*********************Verify with sending message by message button.**********************','INFO');	
		forumLoginMethod.loginToApp(loginJSON['validInfo'].username, loginJSON['validInfo'].password, casper, function(err) {
			if (err) {
				casper.echo("Error occurred in callback user not logged-in", "ERROR");
			}else {
				casper.echo('Processing to Login on forum.....', 'INFO');
				wait.waitForTime(1000 , casper , function(err) {
					
					wait.waitForElement('ul.nav.pull-right span.caret' , casper , function(err , isExists) {
						if(isExists) {
							casper.click('ul.nav.pull-right span.caret');
							casper.click('a#user-nav-panel-profile');
							wait.waitForElement('a#send_message', casper , function(err ,isExists) {
								if(isExists) {
									casper.click('a#send_message');
									wait.waitForTime(5000 , casper , function(err){
										profilePageMethod.createMessage(loginJSON['privateMessage'], casper, function(err) { 
											if(!err) {
												casper.echo('method called successfully' ,'INFO');
												wait.waitForVisible('ul.nav.pull-right span.caret' , casper , function(err , isExists){
													if(isExists){
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err)
																casper.echo('Successfully logout from application', 'INFO');
														});
													}
									
												});
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
	});
};

//"Verify with sending message by message button when message permission is disable from back end"
profilePageTests.profilePageMessageButtonDisable=function(){
	profilePageMethod.messageButtonDisable(casper , function(err){
		if(!err)
			casper.echo('Method called succesfully' ,'INFO');

	});
	casper.thenOpen(config.url , function() {
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 2                 ' ,'INFO');	
		casper.echo('*********************Verify with sending message by message button is disable.**********************','INFO');	
		forumLoginMethod.loginToApp(loginJSON['validInfo'].username, loginJSON['validInfo'].password, casper, function(err) {
			if (err) {
				casper.echo("Error occurred in callback user not logged-in", "ERROR");
			}else {
				casper.echo('Processing to Login on forum.....', 'INFO');
				wait.waitForTime(1000 , casper , function(err) {
					wait.waitForElement('ul.nav.pull-right span.caret' , casper , function(err , isExists) {
						if(isExists) {
							casper.click('ul.nav.pull-right span.caret');
							casper.click(' ul.dropdown-menu span:nth-child(2)  li:nth-child(2) a');
							wait.waitForElement('a#send_message', casper , function(err ,isExists) {
								if(isExists) {
									casper.echo('Message Button Not Found','INFO');
								} else{
									casper.test.assertDoesntExist('a#send_message' ,'Message Button Not found on ProfilePage');
									wait.waitForVisible('ul.nav.pull-right span.caret' , casper , function(err , isExists){
										if(isExists){
											forumLoginMethod.logoutFromApp(casper, function(err){
												if (!err)
													casper.echo('Successfully logout from application', 'INFO');
											});
										}
									});
								}
							});
						}
					});
				});
			}
		});
	});
};


//All Post tab for own profile page

profilePageTests.profilePageAllPostTab=function(){
	casper.thenOpen(config.url , function() {
		
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 3                 ' ,'INFO');	
		casper.echo('******************Verify All Post tab for own profile page************************','INFO');
		forumLoginMethod.loginToApp(loginJSON['validInfo'].username,loginJSON['validInfo'].password, casper, function(err) {
			if (err) {
				casper.echo("Error occurred in callback user not logged-in", "ERROR");
			}else {
				casper.echo('Processing to Login on forum.....', 'INFO');
				wait.waitForElement('ul.nav.pull-right span.caret' , casper , function(err , isExists) {
					if(isExists) {
						casper.click('ul.nav.pull-right span.caret');
						casper.click('a#user-nav-panel-profile');
						wait.waitForElement('a#PostsOFUser', casper , function(err ,isExists) {
							if(isExists) {
								casper.test.assertExists('a#PostsOFUser' ,'All Post Tab Is Found');
								wait.waitForVisible('ul.nav.pull-right span.caret' , casper , function(err , isExists){
									if(isExists){
										forumLoginMethod.logoutFromApp(casper, function(err){
											if (!err)
												casper.echo('Successfully logout from application', 'INFO');
										});
									}
								});
							}
						});
					}
				});
			}
		});
	});
};

//Verify with All post tab after start a topic/post
profilePageTests.profilePageCreateTopic=function(){
	
	profilePageMethod.topicCreate(casper , function(err) {
		if(!err)
			casper.echo('Topic created method called' ,'INFO');
	});

	//post method 
	profilePageMethod.profilePost(casper , function(err) {
		if(!err)
			casper.echo('post have been created' ,'INFO');
    	});
    	

	casper.thenOpen(config.url , function() {
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 4                 ' ,'INFO');	
		casper.echo('******************Verify All Post tab after creating a topic/post************************','INFO');
		forumLoginMethod.loginToApp(loginJSON['validInfo'].username, loginJSON['validInfo'].password, casper, function(err) {
			if (err) {
				casper.echo("Error occurred in callback user not logged-in", "ERROR");
			}else {
				casper.echo('Processing to Login on forum.....', 'INFO');
				wait.waitForElement('ul.nav.pull-right span.caret' , casper , function(err , isExists) {
					if(isExists) {
						casper.click('ul.nav.pull-right span.caret');
						casper.click('a#user-nav-panel-profile');
						wait.waitForTime(1000 , casper , function(err) {
							casper.test.assertExists('div.panel-dropdown div.post-edit.pull-right.dropdown a' ,'Topic Found on ProfilePage');	
							wait.waitForVisible('ul.nav.pull-right span.caret' , casper , function(err , isExists){
								if(isExists){
									forumLoginMethod.logoutFromApp(casper, function(err){
										if (!err)
											casper.echo('Successfully logout from application', 'INFO');
									});
								}
							});
						});
					}
				});
			}
		});
	});
};

//Verify with All post tab after delete a topic/post
profilePageTests.profilePageDeletePost=function() {
	
     	profilePageMethod.profilePost(casper , function(err) {
		if(!err)
			casper.echo('post have been created' ,'INFO');
    	});
    	

	//Verify with All post tab after delete a topic/post
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 5                 ' ,'INFO');	
		casper.echo('***********Verify with All post tab after delete a topic/post************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(loginJSON['validInfo'].username,loginJSON['validInfo'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForVisible('ul.nav.pull-right span.caret' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('ul.nav.pull-right span.caret');
								casper.click('a#user-nav-panel-profile');
								wait.waitForElement('a#PostsOFUser', casper , function(err ,isExists) {
									if(isExists) {
										casper.click('i.glyphicon.glyphicon-chevron-down');
										var post= casper.evaluate(function(){
   											var postId=document.querySelectorAll('a#search_delete_post');
     											var postLength= postId.length;
    											var postHref=postId[0].getAttribute('href');
     											return postHref;
										});
										casper.echo("message :" +post,'INFO');
										casper.click('a[href="'+post+'"]');
										wait.waitForVisible('ul.nav.pull-right span.caret' , casper , function(err , isExists){
											if(isExists){
												forumLoginMethod.logoutFromApp(casper, function(err){
													if (!err)
														casper.echo('Successfully logout from application', 'INFO');
												});
											}
										});
									}
								});
							}else{
								casper.echo('loading............. failed' ,'INFO');
							
							}
						});
					}
				});
			}
	     	});
	});
};

//Verify with All post tab after edit a topic/post on topic listing page
profilePageTests.profilePageEditTopic=function() {
	
	profilePageMethod.topicCreate(casper , function(err) {
		if(!err)
			casper.echo('Topic created method called' ,'INFO');
	});

	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 6               ' ,'INFO');	
		casper.echo('*********Verify with All post tab after edit a topic/post on topic listing page**************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(loginJSON['userInfo'].username, loginJSON['userInfo'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('form[name="posts"] a.topic-title');
								wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' , casper , function(err , isExists) {
									if(isExists) {
										casper.click('i.glyphicon.glyphicon-chevron-down');
										var post= casper.evaluate(function(){
   											var aa=document.querySelectorAll('a#edit_post_request');
     												var a= aa.length;
    												var hh=aa[0].getAttribute('href');
     												return hh;
										});
										casper.echo("message :" +post,'INFO');
										casper.click('a[href="'+post+'"]');
										wait.waitForElement('input[type="button"]' , casper , function(err) {
											if(isExists) {
												wait.waitForTime(3000, casper , function(err){
													casper.withFrame('message1_ifr', function() {
														casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
														casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
														casper.sendKeys('#tinymce', 'hdragme');
													});
													wait.waitForTime(2000 , casper ,  function(err){
															
														casper.click('input[type="button"]');
															
														wait.waitForTime(5000 , casper , function(err ){
															var successMessage = casper.fetchText('div#ajax_subscription_vars div  div:nth-child(4) span');
															casper.echo('success message  '+successMessage ,'INFO');
																	wait.waitForVisible('ul.nav.pull-right span.caret' , casper , function(err , isExists){
																	if(isExists){
																forumLoginMethod.logoutFromApp(casper, function(err){
																			if (!err)
																		casper.echo('Successfully logout from application', 'INFO');
																	 	});
																	}
																});
																																																												
															});
														});	
													});		
												}
											}); 											}
									});
								}
							});	
						}
					});
				}
			});
		});
	
};

//---------------------------------------Topic started tab---------------------------------------------------------------------------
//verify Topic started tab with before start a topic.
profilePageTests.profilePageTopicTab=function() {
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 8                ' ,'INFO');	
		casper.echo('***********verify Topic started tab with before start a topic.************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(loginJSON['validInfo'].username,loginJSON['validInfo'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('ul.nav.pull-right span.caret' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('ul.nav.pull-right span.caret');
								casper.click('a#user-nav-panel-profile');
								wait.waitForElement('a#Topics_Started', casper , function(err ,isExists) {
									if(isExists) {
										casper.test.assertExists('a#Topics_Started' ,'Topics Started Tab is present');
										wait.waitForVisible('ul.nav.pull-right span.caret' , casper , function(err , isExists){
											if(isExists){
												forumLoginMethod.logoutFromApp(casper, function(err){
													if (!err)
														casper.echo('Successfully logout from application', 'INFO');
												});
											}
										});
									}
								});
							}
						});
					}
				});
			}
		});
	});
};
			
//Verify with create a topic   and check topic started tab after start a topic.
profilePageTests.profilePageTopicTabCreateTopic=function() {
	
	profilePageMethod.topicCreate(casper , function(err) {
		if(!err)
			casper.echo('Topic created method called' ,'INFO');
	});

	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 9                 ' ,'INFO');	
		casper.echo('***********Verify with All post tab after delete a topic/post************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(loginJSON['validInfo'].username, loginJSON['validInfo'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('ul.nav.pull-right span.caret' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('ul.nav.pull-right span.caret');
								casper.click('a#user-nav-panel-profile');
								wait.waitForElement('a#Topics_Started', casper , function(err ,isExists) {
									if(isExists) {
										casper.click('a#Topics_Started');
										casper.test.assertExists('div.panel-dropdown div.post-edit.pull-right.dropdown' ,'Topic is present');
										wait.waitForVisible('ul.nav.pull-right span.caret' , casper , function(err , isExists){
											if(isExists){
												forumLoginMethod.logoutFromApp(casper, function(err){
													if (!err)
														casper.echo('Successfully logout from application', 'INFO');
												});
											}
										});
									}
								});
							}
						});
					}
				});
			}
		});
	});	

};

//verify with edit topic title
profilePageTests.profilePageTopicEditTopicTitle=function() {

	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 10                 ' ,'INFO');	
		casper.echo('***********verify with edit topic title************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(loginJSON['userInfo'].username, loginJSON['userInfo'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err) {
							if(isExists) {
								casper.click('span.topic-content a');
								wait.waitForElement('small#editTopic' , casper , function(err){
									if(isExists) {
										casper.click('small#editTopic');
										
										casper.sendKeys('a#edit_subject span:nth-child(2) div form div div div input', 'hell1');	
										wait.waitForTime(5000 ,casper , function(){
											casper.click('i.glyphicon.glyphicon-ok');
											wait.waitForVisible('ul.nav.pull-right span.caret' , casper , function(err , isExists){
												if(isExists){
													forumLoginMethod.logoutFromApp(casper, function(err){
														if (!err)
															casper.echo('Successfully logout from application', 'INFO');
													});
												}
											});
										});
									}
								});
							}
						});
					}
				});
			}
		});
	});
};

//verify with delete the topic which have edited .
profilePageTests.profilePageTopicTabDelete=function() {
	
     	profilePageMethod.profilePost(casper , function(err) {
		if(!err)
			casper.echo('post have been created' ,'INFO');
    	});
    	

	//Verify with All post tab after delete a topic/post
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 11                 ' ,'INFO');	
		casper.echo('***********Verify with All post tab after delete a topic/post************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(loginJSON['validInfo'].username, loginJSON['validInfo'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('ul.nav.pull-right span.caret' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('ul.nav.pull-right span.caret');
								casper.click('a#user-nav-panel-profile');
								wait.waitForElement('a#PostsOFUser', casper , function(err ,isExists) {
									if(isExists) {
										
										casper.click('i.glyphicon.glyphicon-chevron-down');
										var post= casper.evaluate(function(){
   											var postId=document.querySelectorAll('a#search_delete_post');
     											var postLength= postId.length;
    											var postHref=postId[0].getAttribute('href');
     											return postHref;
										});
										casper.echo("message :" +post,'INFO');
										casper.click('a[href="'+post+'"]');
										wait.waitForVisible('ul.nav.pull-right span.caret' , casper , function(err , isExists){
											if(isExists){
												forumLoginMethod.logoutFromApp(casper, function(err){
													if (!err)
														casper.echo('Successfully logout from application', 'INFO');
												});
											}
										});	
									}
								});
							}
						});
					}
				});
			}
	     	});
	});
};

//--------------------------------------------Likes Tab--------------------------------------------------------------------------
//Verify with like the post.
profilePageTests.profilePageLikesTab=function(){
	//create topic register user
	profilePageMethod.topicCreate(casper , function(err) {
		if(!err) {
			casper.echo('Topic created method called' ,'INFO');
			wait.waitForTime(1000 , casper , function(err){
				profilePageMethod.reputationEnable(casper , function(err){
					if(!err)
						casper.echo('successfully called method','INFO');	

				});
			});
		}
	});

	
	
	//login by admin to like register user post
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 12                ' ,'INFO');	
		casper.echo('***********Verify with like the post.************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(loginJSON['userInfo'].username, loginJSON['userInfo'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err) {
							if(isExists) {
								casper.click('form[name="posts"] a.topic-title');
								wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' , casper , function(err) {
									if(isExists) {
										casper.click('i.glyphicon.glyphicon-like-alt');	
										casper.click('ul.nav.pull-right span.caret');
										casper.click('a#user-nav-panel-profile');
										wait.waitForElement('span.feed-filter.top.cleared a:nth-child(3)' , casper , function(err) {
											if(isExists) {
												casper.click('span.feed-filter.top.cleared a:nth-child(3)');
												wait.waitForVisible('ul.nav.pull-right span.caret' , casper , function(err , isExists){
													if(isExists){
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err)
																casper.echo('Successfully logout from application', 'INFO');
														});
													}
												});
											}
										});	
									}
								});
							}
						});
					}
				});
			}
		});
	});
	
};	

//Verify with dislike the same post you already liked
profilePageTests.profilePageDisLikesTab=function(){

	//login by admin to dislike register user post
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 13                ' ,'INFO');	
		casper.echo('***********Verify with like the post.************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(loginJSON['userInfo'].username, loginJSON['userInfo'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err) {
							if(isExists) {
								casper.click('form[name="posts"] a.topic-title');
								wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' , casper , function(err) {
									if(isExists) {
										casper.click('i.glyphicon.glyphicon-dislike-alt');
										wait.waitForTime(2000 , casper , function(err) {	
											casper.click('ul.nav.pull-right span.caret');
											casper.click('a#user-nav-panel-profile');
											wait.waitForElement('span.feed-filter.top.cleared a:nth-child(3)' , casper , function(err) {
												if(isExists) {
													casper.click('span.feed-filter.top.cleared a:nth-child(3)');
													wait.waitForVisible('ul.nav.pull-right span.caret' , casper , function(err , isExists){
														if(isExists){
															forumLoginMethod.logoutFromApp(casper, function(err){
																if (!err)
																	casper.echo('Successfully logout from application', 'INFO');
															});
														}
													});
												}
											});
										});	
									}
								});
							}
						});
					}
				});
			}
		});
	});
};

//Verify with delete the post that you liked

profilePageTests.profilePageDeleteLikePost=function(){

	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 14             ' ,'INFO');	
		casper.echo('**********Verify with delete the post that you liked*************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(loginJSON['userInfo'].username, loginJSON['userInfo'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('span.topic-content a');
								wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' , casper , function(err , isExists) {
									if(isExists) {	
										casper.click('i.glyphicon.glyphicon-like-alt');
										wait.waitForTime(5000 , casper , function(err) {
											
											casper.click('i.glyphicon.glyphicon-chevron-down');
											wait.waitForTime(1000 , casper , function(err) {
												
												casper.click('div[id^="post_list_"]:nth-child(1) div:nth-child(1) div ul li:nth-child(3) a');
												wait.waitForTime(2000 , casper , function(err) {

													
													casper.click('ul.nav.pull-right span.caret');
													casper.click('a#user-nav-panel-profile');
													wait.waitForElement('span.feed-filter.top.cleared a:nth-child(3)' , casper , function(err) {
														if(isExists) {
															casper.click('span.feed-filter.top.cleared a:nth-child(3)');
															wait.waitForVisible('ul.nav.pull-right span.caret' , casper , function(err , isExists){
																if(isExists){
																forumLoginMethod.logoutFromApp(casper, function(err){
																		if (!err)
																		casper.echo('Successfully logout from application', 'INFO');
																	});
																}
															});
														}
													});
												});
												
											});
										});
										
									}
								});
							}
						});
					}
				});
			}
		});
	});	
};

//---------------------------------------------------------------------------------------------------------------------------------

//-------------------------------------------------Post count----------------------------------------------------------------

//verify post count for newly register user
//verify by register a new user
profilePageTests.CreateRegisterUserPostCount=function() {

	 //1.test case for register user
	
        casper.thenOpen(config.url, function() {
		casper.echo('1.Register user', 'INFO');
		casper.echo('******************************', 'INFO');
		wait.waitForTime(2000,casper,function(err){
			casper.test.assertExists('a[href="/register/register"]');
			casper.click('a[href="/register/register"]');
			casper.echo('Successfully open register form.....', 'INFO');
			wait.waitForTime(3000,casper,function(err){
				registerMethod.registerToApp(registerJSON['validInfoRegisterUser'], casper, function(err) {
					if(!err) {
						casper.echo('Processing to registration on forum.....', 'INFO');
						registerMethod.redirectToLogout(casper, casper.test, function(err) {
							if(!err) {
                                                        	casper.echo('User logout successfully', 'INFO');
							}
						});
					}
				});
			});
		});
	}); 
	
};

//verify post count for newly register user

profilePageTests.profilePagePostCount=function() {

	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 15             ' ,'INFO');	
		casper.echo('**********Verify with delete the post that you liked*************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(loginJSON['validInfoRegisterUser'].username, loginJSON['validInfoRegisterUser'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('ul.nav.pull-right span.caret' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('ul.nav.pull-right span.caret');
								casper.click('a#user-nav-panel-profile');
								wait.waitForElement('a#Topics_Started', casper , function(err ,isExists) {
									if(isExists) {
										wait.waitForVisible('ul.nav.pull-right span.caret' , casper , function(err , isExists){
											if(isExists){
												forumLoginMethod.logoutFromApp(casper, function(err){
													if (!err)
														casper.echo('Successfully logout from application', 'INFO');
												});
											}
										});
										
									}
								});
							}
						});
					}
				});
			}
		});
	});
};
						
//verify post count with add topic/post
profilePageTests.profilePagePostCountAddtopic=function() {
	profilePageMethod.createTopicRegisterUser(casper , function(err) {
		if(!err)
			casper.echo('Topic created method called' ,'INFO');
	});


	//verify post count with add topic/post visibility on profilepage
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 16             ' ,'INFO');	
		casper.echo('**********Verify with delete the post that you liked*************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(loginJSON['validInfoRegisterUser'].username, loginJSON['validInfoRegisterUser'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('ul.nav.pull-right span.caret' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('ul.nav.pull-right span.caret');
								casper.click('a#user-nav-panel-profile');
								wait.waitForElement('a#Topics_Started', casper , function(err ,isExists) {
									if(isExists) {
										
										wait.waitForVisible('ul.nav.pull-right span.caret' , casper , function(err , isExists){
											if(isExists){
												forumLoginMethod.logoutFromApp(casper, function(err){
													if (!err)
														casper.echo('Successfully logout from application', 'INFO');
												});
											}
										});
									}
								});
							}
						});
					}
				});
			}
		});
	});

};	

//verify post count  with delete the post
profilePageTests.profilePagePostCountDeletePost=function(){

	//create post method called
	profilePageMethod.profilePostNewlyRegister(casper , function(err) {
		if(!err)
			casper.echo('post have been created' ,'INFO');
    	});
    			

	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 17             ' ,'INFO');	
		casper.echo('**********Verify with delete the post that you liked*************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(loginJSON['validInfoRegisterUser'].username, loginJSON['validInfoRegisterUser'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....', 'INFO');
						wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('form[name="posts"] a.topic-title');
								wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' , casper , function(err , isExists) {
									if(isExists) {	
										casper.click('i.glyphicon.glyphicon-chevron-down');
										wait.waitForTime(1000 , casper , function(err) {
											
											//1st topic id---
											casper.click('div[id^="post_list_"]:nth-child(1) div:nth-child(1) div ul li:nth-child(3) a');
											wait.waitForTime(2000 , casper , function(err) {
												
												casper.click('ul.nav.pull-right span.caret');
												casper.click('a#user-nav-panel-profile');
												wait.waitForElement('span.feed-filter.top.cleared a:nth-child(3)' , casper , function(err) {
														if(isExists) {
															
															
															wait.waitForVisible('ul.nav.pull-right span.caret' , casper , function(err , isExists){
																if(isExists){
																forumLoginMethod.logoutFromApp(casper, function(err){
																	if (!err)
																		casper.echo('Successfully logout from application', 'INFO');
																	});
																}
															});	
														}
													});
												});
											});
										}
									});
								}
							});
						}
					});
				}
			});
		});	
};

//------------------------------------------------Reputation--------------------------------------------------------------
//verify with reputation link after disable the permissions

profilePageTests.profilePageReputationDisable=function(){
	profilePageMethod.reputationDisable(casper , function(err){
		if(!err)
			casper.echo('successfully called method','INFO');	

	});

	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 18             ' ,'INFO');	
		casper.echo('**********Verify with delete the post that you liked*************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(loginJSON['validInfoRegisterUser'].username, loginJSON['validInfoRegisterUser'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('ul.nav.pull-right span.caret' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('ul.nav.pull-right span.caret');
								casper.click('a#user-nav-panel-profile');
								wait.waitForElement('a#Topics_Started', casper , function(err ,isExists) {
									if(isExists) {
										wait.waitForVisible('ul.nav.pull-right span.caret' , casper , function(err , isExists){
											if(isExists){
												forumLoginMethod.logoutFromApp(casper, function(err){
													if (!err)
														casper.echo('Successfully logout from application', 'INFO');
												});
											}
										});
									}
								});
							}
						});
					}
				});
			}
		});
	});
};	

//verify with reputation link after enable the permissions
profilePageTests.profilePageReputationEnable=function(){
	profilePageMethod.reputationEnable(casper , function(err){
		if(!err)
			casper.echo('successfully called method','INFO');	

	});	
	
	//
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 19             ' ,'INFO');	
		casper.echo('**********Verify with delete the post that you liked*************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(loginJSON['validInfoRegisterUser'].username, loginJSON['validInfoRegisterUser'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('ul.nav.pull-right span.caret' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('ul.nav.pull-right span.caret');
								casper.click('a#user-nav-panel-profile');
								wait.waitForElement('a#Topics_Started', casper , function(err ,isExists) {
									if(isExists) {
										
										wait.waitForVisible('ul.nav.pull-right span.caret' , casper , function(err , isExists){
											if(isExists){
												forumLoginMethod.logoutFromApp(casper, function(err){
													if (!err)
														casper.echo('Successfully logout from application', 'INFO');
												});
											}
										});
									}
								});
							}
						});
					}
				});
			}
		});
	});
};

//verify after like the post(one user like your only one post)
//reputation count check
profilePageTests.profilePageReputationCount=function(){
	//create topic-------
	profilePageMethod.topicCreate(casper , function(err) {
		if(!err) {
			casper.echo('Topic created method called' ,'INFO');
			wait.waitForTime(2000 , casper , function(err){
				profilePageMethod.reputationEnable(casper , function(err){
					if(!err)
						casper.echo('Reputation enable method called successfully ','INFO');	
				});
			});
		}
	});
	
	
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 20                ' ,'INFO');	
		casper.echo('***********verify after like the post(one user like your only one post)************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(loginJSON['userInfo'].username, loginJSON['userInfo'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err) {
							if(isExists) {
								casper.click('form[name="posts"] a.topic-title');
								wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' , casper , function(err) {
									if(isExists) {
										
										casper.click('i.glyphicon.glyphicon-like-alt');	
										
										wait.waitForVisible('ul.nav.pull-right span.caret' , casper , function(err , isExists){
											if(isExists){
												forumLoginMethod.logoutFromApp(casper, function(err){
													if (!err)
														casper.echo('Successfully logout from application', 'INFO');
												});
											}
										});
									}
								});
							}
						});
					}
				});
			}
		});
	});
	
	//
	
	
};	

//verify after like the post(one user like your multiple post one post)
profilePageTests.profilePageReputationCountMultiplePostLike=function(){

	profilePageMethod.profilePost(casper , function(err) {	
		if(!err)
			casper.echo('method called successfully' ,'INFO');		
	});
	
	casper.then(function(){
		casper.echo('---------------------2nd post method called-------------------------' ,'INFO');
		profilePageMethod.profilePost(casper , function(err) {	
			if(!err)
				casper.echo('method called successfully' ,'INFO');		

		});
	});

	//Like 1st post-------------------------------------------------------
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 21                ' ,'INFO');	
		casper.echo('***********Verify with like the post.************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(loginJSON['userInfo'].username, loginJSON['userInfo'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err) {
							if(isExists) {
								casper.click('form[name="posts"] a.topic-title');
								wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' , casper , function(err) {
									if(isExists) {
										casper.click('i.glyphicon.glyphicon-like-alt');	
										wait.waitForVisible('ul.nav.pull-right span.caret' , casper , function(err , isExists){
											if(isExists){
												forumLoginMethod.logoutFromApp(casper, function(err){
													if (!err)
														casper.echo('Successfully logout from application', 'INFO');
												});
											}
										});
									}
								});
							}
						});
						
					}
				});
			}
		});
	});

	//Like 2nd post

	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
			
		casper.echo('***********Verify with like the 2nd post.************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(loginJSON['userInfo'].username, loginJSON['userInfo'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err) {
							if(isExists) {
								casper.click('form[name="posts"] a.topic-title');
								wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' , casper , function(err) {
									if(isExists) {
										casper.click('div#main_posts_container div:nth-child(1) div div div:nth-child(5) a:nth-child(2)');	
										
										wait.waitForTime(5000 , casper , function(err){
											casper.click('div#main_posts_container div:nth-child(3) div div div:nth-child(5) a:nth-child(2)');	
											wait.waitForVisible('ul.nav.pull-right span.caret' , casper , function(err , isExists){
												if(isExists){
													forumLoginMethod.logoutFromApp(casper, function(err){
														if (!err)
															casper.echo('Successfully logout from application', 'INFO');
													});
												}
											});

											
										});
									}
								});
							}
						});
						
					}
				});
			}
		});
	});
	//check reputation visibility on profilepage
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 22             ' ,'INFO');	
		casper.echo('************check reputation visibility on profilepage***********','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(loginJSON['validInfo'].username, loginJSON['validInfo'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						
						wait.waitForElement('ul.nav.pull-right span.caret' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('ul.nav.pull-right span.caret');
								casper.click('a#user-nav-panel-profile');
								wait.waitForElement('a#Topics_Started', casper , function(err ,isExists) {
									if(isExists) {
										
										wait.waitForVisible('ul.nav.pull-right span.caret' , casper , function(err , isExists){
											if(isExists){
												forumLoginMethod.logoutFromApp(casper, function(err){
													if (!err)
														casper.echo('Successfully logout from application', 'INFO');
												});
											}
										});
									}
								});
							}
						});
					}
				});
			}
		});
	});
};

//verify after dislike the post(one user dislike your only one post)

profilePageTests.profilePageReputationCountdislikePost=function(){

	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 23                ' ,'INFO');	
		casper.echo('***********verify after dislike the post(one user dislike your only one post)************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(loginJSON['userInfo'].username, loginJSON['userInfo'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err) {
							if(isExists) {
								casper.click('span.topic-content a');
								wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' , casper , function(err) {
									if(isExists) {
										casper.click('i.glyphicon.glyphicon-dislike-alt');
										wait.waitForVisible('ul.nav.pull-right span.caret' , casper , function(err , isExists){
											if(isExists){
												forumLoginMethod.logoutFromApp(casper, function(err){
													if (!err)
														casper.echo('Successfully logout from application', 'INFO');
												});
											}
										});
									}
								});
							}
						});
					}
				});
			}
		});
	});
	
	//
	
	//check reputation-count
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		
		casper.echo('**********check reputation count after dislike of a post/topic*************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(loginJSON['validInfo'].username, loginJSON['validInfo'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('ul.nav.pull-right span.caret' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('ul.nav.pull-right span.caret');
								casper.click('a#user-nav-panel-profile');
								wait.waitForElement('a#Topics_Started', casper , function(err ,isExists) {
									if(isExists) {
										
										wait.waitForVisible('ul.nav.pull-right span.caret' , casper , function(err , isExists){
											if(isExists){
												forumLoginMethod.logoutFromApp(casper, function(err){
													if (!err)
														casper.echo('Successfully logout from application', 'INFO');
												});
											}
										});
									}
								});
							}
						});
					}
				});
			}
		});
	});
};	

//verify after dislike the post(one user dislike your multiple post one post)
profilePageTests.profilePageReputationCountMultidislike=function(){

	//1st dislike post
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 24                ' ,'INFO');	
		casper.echo('***********Verify with like the post.************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(loginJSON['userInfo'].username, loginJSON['userInfo'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err) {
							if(isExists) {
								casper.click('form[name="posts"] a.topic-title');
								wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' , casper , function(err) {
									if(isExists) {
										casper.click('i.glyphicon.glyphicon-dislike-alt');
										casper.wait(7000 , function(){
											
											casper.click('div#main_posts_container div:nth-child(1) div div div:nth-child(5) a:nth-child(4)');
											wait.waitForVisible('ul.nav.pull-right span.caret' , casper , function(err , isExists){
												if(isExists){
													forumLoginMethod.logoutFromApp(casper, function(err){	
														if (!err)
															casper.echo('Successfully logout from application', 'INFO');
													});
												}
											});

										});	
										
									}
								});
							}
						});
						
					}
				});
			}
		});
	});	

	
	//check reputation-count
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		
		casper.echo('**********Verify with delete the post that you liked*************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(loginJSON['validInfo'].username, loginJSON['validInfo'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('ul.nav.pull-right span.caret' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('ul.nav.pull-right span.caret');
								casper.click('a#user-nav-panel-profile');
								wait.waitForElement('a#Topics_Started', casper , function(err ,isExists) {
									if(isExists) {
										
										forumLoginMethod.logoutFromApp(casper, function(err){
											if (!err)
												casper.echo('Successfully logout from application', 'INFO');
										});
									}
								});
							}
						});
					}
				});
			}
		});
	});
};	


//verify with edit user icon
profilePageTests.profilePageEditUserIcon=function(){
	profilePageMethod.BackEndSettingsChangeUsernameEnable(casper , function(err) {	
		if(!err)
			casper.echo('method called successfully' ,'INFO');		
	});


	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 25                 ' ,'INFO');	
		casper.echo('***********verify with edit custom member title***********','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(loginJSON['validInfo'].username, loginJSON['validInfo'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('ul.nav.pull-right span.caret' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('ul.nav.pull-right span.caret');
								casper.click('a#user-nav-panel-profile');
								wait.waitForElement('a#PostsOFUser' , casper , function(err , isExists) {
									if(isExists) {
										casper.click('a#anchor_tab_edit i');
										wait.waitForElement('a[aria-controls="Account Settings"] ' , casper , function(err) {
											if(isExists) {
												casper.click('ul.nav.nav-tabs li:nth-child(2) a');
												wait.waitForElement('div#usrName a:nth-child(2) small' , casper , function(err , isExists){
													if(isExists) {
														casper.evaluate(function(){
															document.querySelector('div#usrName a:nth-child(2) small').click();
														});
					
														wait.waitForTime(4000 , casper , function(err){

	var str = casper.fetchText('form.form-inline.editableform div div div:nth-child(1) input');

	casper.echo('length of string'+str.length,'INFO');
	wait.waitForTime(3000 , casper , function(err){
		if(str.length!=null) {
			for(var i =0; i<str.length;i++) {
				casper.sendKeys('form.form-inline.editableform div div div:nth-child(1) input', casper.page.event.key.Backspace, {keepFocus: true});
			}
		}
     	});
});

wait.waitForTime(3000 ,casper , function(err){
	
	casper.sendKeys('form.form-inline.editableform div div div:nth-child(1) input' ,'hani');
	wait.waitForTime(2000 , casper , function(err){
		
		casper.click('button.btn.btn-primary.btn-sm.editable-submit');													

	});

});
														}
														
													        wait.waitForVisible('ul.nav.pull-right span.caret' , casper , function(err , isExists){
															if(isExists){
															forumLoginMethod.logoutFromApp(casper, function(err){
																	if (!err)
																		casper.echo('Successfully logout from application', 'INFO');	
																});
															}
														});
													});
												}
											});
										}
									});
								}
							});
						}
					});
				}
			});
		});
};


//verify with delete icon
profilePageTests.profilePageDeleteIcon= function(){

	//1.test case for register user
	casper.thenOpen(config.url, function() {
		casper.echo('1.Register user', 'INFO');
		casper.echo('******************************', 'INFO');
		wait.waitForTime(2000,casper,function(err){
			casper.test.assertExists('a[href="/register/register"]');
			casper.click('a[href="/register/register"]');
			casper.echo('Successfully open register form.....', 'INFO');
			wait.waitForTime(3000,casper,function(err){
				registerMethod.registerToApp(registerJSON['validUser'], casper, function(err) {
					if(!err) {
						casper.echo('Processing to registration on forum.....', 'INFO');
						registerMethod.redirectToLogout(casper, casper.test, function(err) {
							if(!err) {
                                                        	casper.echo('User logout successfully', 'INFO');
							}
						});
					}
				});
			});
		});
	}); 
			
	//verify with delete icon delete register user
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 26                ' ,'INFO');	
		casper.echo('**********************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(loginJSON['validUser'].username, loginJSON['validUser'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('ul.nav.pull-right span.caret' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('ul.nav.pull-right span.caret');
								casper.click('a#user-nav-panel-profile');
								wait.waitForElement('a#PostsOFUser' , casper , function(err , isExists) {
									if(isExists) {
										casper.click('a#deleteAccountDialog i');
										wait.waitForElement('div#userAccountName' , casper , function(err , isExists) {
											if(isExists) {
												casper.click('a#deleteAccount');
												wait.waitForVisible('ul.nav.pull-right span.caret' , casper , function(err , isExists){
													if(isExists){
														forumLoginMethod.logoutFromApp(casper, function(err){
																if (!err)
																	casper.echo('Successfully logout from application', 'INFO');
															});
														}
												});
											}
										});
									}
								});
							}
						});
					}
				});
			}
		});
	});
};

//verify with insert a photo and send it
profilePageTests.profilePageInsertPhoto= function(){
	//1.test case for register user
	casper.thenOpen(config.url, function() {
		casper.echo('1.Register user', 'INFO');
		casper.echo('******************************', 'INFO');
		wait.waitForTime(2000,casper,function(err){
			casper.test.assertExists('a[href="/register/register"]');
			casper.click('a[href="/register/register"]');
			casper.echo('Successfully open register form.....', 'INFO');
			wait.waitForTime(3000,casper,function(err){
				registerMethod.registerToApp(registerJSON['validUser'], casper, function(err) {
					if(!err) {
						casper.echo('Processing to registration on forum.....', 'INFO');
						registerMethod.redirectToLogout(casper, casper.test, function(err) {
							if(!err) {
                                                                
								casper.echo('User logout successfully', 'INFO');
							}
						});
					}
				});
			});
		});
	}); 
	
	
	profilePageMethod.messageButtonEnable(casper , function(err){
		if(!err)
			casper.echo('Method called succesfully' ,'INFO');

	});	
	
	//Login with a newly created user
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 27                ' ,'INFO');	
		casper.echo('**********************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(loginJSON['validUser'].username, loginJSON['validUser'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('ul.nav.pull-right span.caret' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('ul.nav.pull-right span.caret');
								casper.click('a#user-nav-panel-profile');
								wait.waitForElement('a#send_message' , casper , function(){
									casper.click('a#send_message');
									wait.waitForTime(5000 , casper , function(err){
										profilePageMethod.createMessageInsertImage(loginJSON['privateMessages'], casper, function(err) { 
											if(!err)
												casper.echo('method called successfully' ,'INFO');	
										});
									});		
								});
							}else{
								casper.echo('user has been deleted so cannot be logged-In' ,'INFO');
							}
						});
					}
				});
			}
		});
	});
};

//------------------------------------------------Edit-Profile-------------------------------------------------------------
//Disable Signature  for Registered user from group Permission

profilePageTests.profilePageDisableSignature=function(){
	profilePageMethod.BackEndSettingsSignatureDisable(casper , function(err) {
		if(!err)
			casper.echo('signature disabled successfully' ,'INFO');

	});
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 28             ' ,'INFO');	
		casper.echo('**********Verify with delete the post that you liked*************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(loginJSON['validInfo'].username, loginJSON['validInfo'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('ul.nav.pull-right span.caret' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('ul.nav.pull-right span.caret');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('button[type="submit"]' , casper , function(){ 
									if(isExists) {
										wait.waitForVisible('ul.nav.pull-right span.caret' , casper , function(err , isExists){
											if(isExists){
												forumLoginMethod.logoutFromApp(casper, function(err){
													if (!err)
														casper.echo('Successfully logout from application', 'INFO');
												});
											}
										});
									}
								});
							}
						});
					}
				});
			}
		});
	});
};

//Enable Signature  for Registered user from group Permission
profilePageTests.profilePageEnableSignature=function(){
	profilePageMethod.BackEndSettingsSignatureEnable(casper , function(err) {
		if(!err)
			casper.echo('signature Enabled successfully' ,'INFO');

	});
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 29             ' ,'INFO');	
		casper.echo('**********Enable Signature  for Registered user from group Permission*************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(loginJSON['validInfo'].username, loginJSON['validInfo'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForVisible('ul.nav.pull-right span.caret' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('ul.nav.pull-right span.caret');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('button[type="submit"]' , casper , function(){ 
									if(isExists) {
										wait.waitForVisible('ul.nav.pull-right span.caret' , casper , function(err , isExists){
											if(isExists){
												forumLoginMethod.logoutFromApp(casper, function(err){
													if (!err)
														casper.echo('Successfully logout from application', 'INFO');
												});
											}
										});
									}
								});
							}else{
								casper.echo('loading .......failed' ,'INFO');
								forumLoginMethod.logoutFromApp(casper, function(err){
									if (!err)
										casper.echo('Successfully logout from application', 'INFO');
								});
							}
						});
					}
				});
			}
		});
	});
};

//verify with add a signature greater then maximum charecter(500) limits.
profilePageTests.profilePageAddSignature=function(){
	profilePageMethod.BackEndSettingsDefaultOptionEnable(casper , function(err){
		if(!err)
			casper.echo('Default options enable successfully' ,'INFO');
	});


	//Enable default option IM-id
	profilePageMethod.BackEndSettingsDefaultOptionIMIDEnable(casper , function(err){
		if(!err)
			casper.echo('Default options enable IM-id successfully' ,'INFO');	
			wait.waitForTime(2000 , casper , function(err){
				profilePageMethod.BackEndSettingsDefaultOptionBirtdayEnable(casper , function(err){
					if(!err)
						casper.echo('Default options birthday enable successfully' ,'INFO');
				});
			});
	});

	


	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 30             ' ,'INFO');	
		casper.echo('**********Verify with add a signature greater then maximum charecter(500) limits.*************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(loginJSON['validInfo'].username, loginJSON['validInfo'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('ul.nav.pull-right span.caret' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('ul.nav.pull-right span.caret');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('button[type="submit"]' , casper , function(){ 
									if(isExists) {
										
										profilePageMethod.fillDataSignature(loginJSON['signature'] ,casper , function(err) {
											if(!err) {
												casper.echo('method called' ,'INFO');
												
												wait.waitForVisible('ul.nav.pull-right span.caret' , casper , function(err , isExists){
													if(isExists){
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err)
																casper.echo('Successfully logout from application', 'INFO');
														});
													}
												});
											}
										});
									}
								});
							}
						});
					}
				});
			}
		});
	});
};

//verify with edit signature
profilePageTests.profilePageEditSignature=function(){
	
	//add a signature
	profilePageMethod.addSignature(casper , function(err){
		if(!err){
			casper.echo('signature has added' ,'INFO');	

		}
	});

	casper.thenOpen(config.url , function(){
		
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 31                 ' ,'INFO');	
		casper.echo('**********verify with edit signature*************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(loginJSON['validInfo'].username, loginJSON['validInfo'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('ul.nav.pull-right span.caret' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('ul.nav.pull-right span.caret');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('button[type="submit"]' , casper , function(){ 
									if(isExists) {
										
										wait.waitForTime(5000 , casper , function(){
											
											casper.click('a#edit_signature small.text-muted.glyphicon.glyphicon-pencil'
);
											wait.waitForTime(2000 , casper , function(err){
												casper.withFrame('signature_ifr', function() {
													casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
													casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
													casper.sendKeys('#tinymce', 'hello123');
												});
												wait.waitForTime(1000 , casper , function(err) {
													
                      											casper.click('button[type="submit"]');
													wait.waitForVisible('ul.nav.pull-right span.caret' , casper , function(err , isExists){
														if(isExists){
															forumLoginMethod.logoutFromApp(casper, function(err){
																	if (!err)
																		casper.echo('Successfully logout from application', 'INFO');
																});
															}
														});
													});
		      							        	});
										});
									}
								});
							}
						});
					}
				});
			}
		});
	
	});
};


//Verify with delete signature
profilePageTests.profilePageDeleteSignature=function(){
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 32                 ' ,'INFO');	
		casper.echo('**********Verify with delete signature*************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(loginJSON['validInfo'].username, loginJSON['validInfo'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('ul.nav.pull-right span.caret' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('ul.nav.pull-right span.caret');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('button[type="submit"]' , casper , function(){ 
									if(isExists) {
										
										casper.click('a#edit_signature small.text-muted.glyphicon.glyphicon-pencil');
										wait.waitForTime(5000 , casper , function(){

											casper.withFrame('signature_ifr', function() {
												casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
												casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
												casper.sendKeys('#tinymce', '');
											});
											wait.waitForTime(1000 , casper , function(err) {
												
                      										casper.click('button[type="submit"]');
												 wait.waitForTime(2000 , casper , function(err) {
													forumLoginMethod.logoutFromApp(casper, function(err){
														if (!err)
															casper.echo('Successfully logout from application', 'INFO');
													});
												});
											});
										});
                       								
										casper.thenOpen(config.url , function(){
											casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		
											casper.echo('**********verify with edit signature************','INFO');
											wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
												if(isExists) {
													forumLoginMethod.loginToApp(loginJSON['validInfo'].username, loginJSON['validInfo'].password, casper, function(err) {
														
														if (err) {
															casper.echo("Error occurred in callback user not logged-in", "ERROR");	
														}else {
															casper.echo('Processing to Login on forum.....','INFO');
															wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists) {
																if(isExists) {
casper.click('form[name="posts"] a.topic-title');
wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' , casper , function(err , isExists) {
	if(isExists) {
		wait.waitForVisible('ul.nav.pull-right span.caret' , casper , function(err , isExists){
			if(isExists){
				forumLoginMethod.logoutFromApp(casper, function(err){
					if (!err)
						casper.echo('Successfully logout from application', 'INFO');
				});
			}
		});				
	}
});
																}
															});
														}
													});
												}
											});
										});
									}
								});
							}
						});
					}
				});
			}
		});
	});
	//Default fields disable method-----------
	casper.then(function(){
		profilePageMethod.BackEndSettingsDefaultOptionDisable(casper , function(err){
			if(!err)
				casper.echo('Default options enable successfully' ,'INFO');
		});


		//Enable default option IM-id
		profilePageMethod.BackEndSettingsDefaultOptionIMIDDisable(casper , function(err){
			if(!err) {
				casper.echo('Default options enable IM-id successfully' ,'INFO');	
				profilePageMethod.BackEndSettingsDefaultOptionBirtdayEnable(casper , function(err){
					if(!err)
						casper.echo('Default options birthday enable successfully' ,'INFO');
				});
			}
		});
	});
		
};

//Disable CustomTitile  for Registered user from group Permission
profilePageTests.profilePageDisableCustomTitle=function(){
	profilePageMethod.BackEndSettingsDisableCustomTitle(casper , function(err) {
		if(!err)
			casper.echo('signature disabled successfully' ,'INFO');

	});
	
	//verify with custom user option
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 33                 ' ,'INFO');	
		casper.echo('***********Disable CustomTitile  for Registered user from group Permission************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(loginJSON['validInfo'].username, loginJSON['validInfo'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						
						wait.waitForElement('ul.nav.pull-right span.caret' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('ul.nav.pull-right span.caret');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('button[type="submit"]' , casper , function(){ 
									if(isExists) {
										
										wait.waitForVisible('ul.nav.pull-right span.caret' , casper , function(err , isExists){
											if(isExists){
												forumLoginMethod.logoutFromApp(casper, function(err){
													if (!err)
														casper.echo('Successfully logout from application', 'INFO');
												});
											}
										});
									}
								});
							}
						});
					}
				});
			}
		});
	});
};


//Enable CustomTitile for Registered user from group Permission
profilePageTests.profilePageEnableCustomTitle=function(){
	profilePageMethod.BackEndSettingsEnableCustomTitle(casper , function(err) {
		if(!err)
			casper.echo('signature disabled successfully' ,'INFO');

	});
	
	//verify with custom user option
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 34                 ' ,'INFO');	
		casper.echo('***********Disable Custom Title  for Registered user from group Permission************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(loginJSON['validInfo'].username, loginJSON['validInfo'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						
						wait.waitForElement('ul.nav.pull-right span.caret' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('ul.nav.pull-right span.caret');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('button[type="submit"]' , casper , function(){ 
									if(isExists) {
										
										wait.waitForTime(1000, casper , function(err){
											forumLoginMethod.logoutFromApp(casper, function(err){
												if (!err)
													casper.echo('Successfully logout from application', 'INFO');
											});	
										});
										
									}
								});
							}
						});
					}
				});
			}
		});
	});
};


//verify by add a custom user title 
profilePageTests.addCustomTitle=function(){
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 35                 ' ,'INFO');	
		casper.echo('----------verify by add a custom user title---------------------    ' ,'INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(loginJSON['validInfo'].username, loginJSON['validInfo'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						
						wait.waitForElement('ul.nav.pull-right span.caret' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('ul.nav.pull-right span.caret');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('button[type="submit"]' , casper , function(){ 
									if(isExists) {
										
										casper.click('div#custom_user_title input');
										casper.sendKeys('div#custom_user_title input','h');
										
										wait.waitForTime(2000 , casper ,function(err) {
											casper.click('button[type="submit"]');
											wait.waitForTime(2000 , casper , function(err){
												casper.click('button[type="submit"]');
												wait.waitForVisible('ul.nav.pull-right span.caret' , casper , function(err , isExists){
													if(isExists){
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err)
																casper.echo('Successfully logout from application', 'INFO');
														});
													}
												});
											});
										});
									}
								});
							}
						});
					}
				});
			}
		});
	});
};


//verify with edit custom member title
profilePageTests.profilePageEditCustomTitle=function(){
	
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 36                 ' ,'INFO');	
		casper.echo('***********Verify with edit custom member title***********','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(loginJSON['validInfo'].username, loginJSON['validInfo'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						
						wait.waitForVisible('ul.nav.pull-right span.caret' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('ul.nav.pull-right span.caret');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('button[type="submit"]' , casper , function(){ 
									if(isExists) {
										casper.click('a#change_user_title small');
										casper.sendKeys('form.form-inline.editableform div div div:nth-child(1) input','t');
										wait.waitForTime(2000 , casper ,function(err) {
											casper.click('button[type="submit"]');
											wait.waitForTime(2000 , casper , function(err){
											       casper.click('button[type="submit"]');
											       wait.waitForVisible('ul.nav.pull-right span.caret' , casper , function(err , isExists){
													if(isExists){
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err)
																casper.echo('Successfully logout from application', 'INFO');
														});
													}
												});
											});
										});
									}
								});
							}else{
								casper.echo('loading failed.............' ,'INFO');
																																																												forumLoginMethod.logoutFromApp(casper, function(err){
									if (!err)
										casper.echo('Successfully logout from application', 'INFO');
								});
							}
						});
					}
				});
			}
		});
	});
};



//
//verify with delete custom user title
profilePageTests.profilePageDeleteCustomTitle=function(){
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 37                 ' ,'INFO');	
		casper.echo('***********Verify with delete custom user title***********','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(loginJSON['validInfo'].username, loginJSON['validInfo'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						
						wait.waitForVisible('ul.nav.pull-right span.caret' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('ul.nav.pull-right span.caret');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('button[type="submit"]' , casper , function(){ 
									if(isExists) {
										casper.click('a#change_user_title small');
										var str = casper.fetchText('form.form-inline.editableform div div div:nth-child(1) input');
											casper.echo('length of string'+str.length,'INFO');
											wait.waitForTime(2000 , casper , function(err){
												
												if(str.length !=null) {
													for(var i =0; i<str.length;i++) {
														casper.sendKeys('form.form-inline.editableform div div div:nth-child(1) input', casper.page.event.key.Backspace, {keepFocus: true});
													}
												}
											});
											wait.waitForTime(2000 , casper ,function(err) {
												
												casper.click('button.btn.btn-primary.btn-sm.editable-submit');
												wait.waitForTime(1000 , casper , function(err){
													casper.click('button[type="submit"]');
											        	wait.waitForVisible('ul.nav.pull-right span.caret' , casper , function(err , isExists){
														if(isExists){
															forumLoginMethod.logoutFromApp(casper, function(err){
																	if (!err)
																		casper.echo('Successfully logout from application', 'INFO');
																});
															}
														});
													});
												});
											}
										});
									}
								});
							}
						});
					}
				});
			});
	
};

//Verify the shield icon for registered user  on edit profile pgae
profilePageTests.profilePageShieldIcon=function(){
	profilePageMethod.addShieldCustomField(casper , function(err) {
		if(!err)
			casper.echo('method called successfully' ,'INFO');

	});	
	
	//verify shield icon on edit-profile page
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 38                 ' ,'INFO');	
		casper.echo('*********Verify the shield icon for registered user  on edit profile pgae*************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(loginJSON['validInfo'].username, loginJSON['validInfo'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						
						wait.waitForElement('ul.nav.pull-right span.caret' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('ul.nav.pull-right span.caret');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('button[type="submit"]' , casper , function(){ 
									if(isExists) {
										
										forumLoginMethod.logoutFromApp(casper, function(err){
											if (!err)
												casper.echo('Successfully logout from application', 'INFO');
										});
									}
								});
							}
						});
					}
				});
			}
		});
	});

	//verfiy by delete the shield icon on profile page
	casper.thenOpen(config.backEndUrl , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('-------------------Verfiy by delete the shield iocon on profile page----------------------' ,'INFO');
		loginPrivacyOptionMethod.loginToForumBackEnd(casper , function(err) {	
			if (!err)
				casper.echo('LoggedIn to forum backend....', 'INFO');
		});
		wait.waitForElement('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', casper , function(err , isExists) {
			if(isExists) {
				casper.evaluate(function() {
					document.querySelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"').click();
 				});
				wait.waitForElement('div.tooltipMenu.text a[title="Add profile fields that your users can fill out"]', casper , function(err , isExists) {
					if(isExists) {
						
						casper.evaluate(function() {
							document.querySelector('div.tooltipMenu.text a[title="Add profile fields that your users can fill out"]').click();
						});
						wait.waitForElement('div[align="center"] p[align="right"] a img' , casper , function(err , isExists){
							if(isExists) {
								casper.click('input[name="allbox"]');
								casper.click('button[type="submit"]');
							}
						});
					}
				});
			}
		});
	});
};

//Verify the tool tip on the shield icon 
profilePageTests.profilePageToolTipShieldIcon=function(){
	profilePageMethod.addShieldCustomField(casper , function(err) {
		if(!err)
			casper.echo('method called successfully' ,'INFO');

	});	
	
	//verify shield icon on edit-profile page
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 39                 ' ,'INFO');	
		casper.echo('***********Verify the tool tip on the shield icon ***********','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(loginJSON['validInfo'].username, loginJSON['validInfo'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						
						wait.waitForElement('ul.nav.pull-right span.caret' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('ul.nav.pull-right span.caret');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('button[type="submit"]' , casper , function(){ 
									if(isExists) {
										
										var tool = casper.evaluate(function() {
											var id = document.querySelector('form[name="PostTopic"] span.text-muted').getAttribute('data-original-title');
											return id;
										});
										casper.echo(tool ,'INFO');
										var toole="This field is only visible to administrators."
										casper.test.assertEquals(tool,toole);
										casper.echo('Correct Message','INFO')
										wait.waitForTime(1000 , casper , function(err){
											forumLoginMethod.logoutFromApp(casper, function(err){
												if (!err)
													casper.echo('Successfully logout from application', 'INFO');
											});
										});
									}
								});
							}
						});
					}
				});
			}
		});
	});

	
};

//Verify the shield icon for registered user  on edit profile pgae by the admin
profilePageTests.profilePageShieldIconRegisteruser=function(){
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 40                 ' ,'INFO');	
		casper.echo('***********Verify the shield icon for registered user  on edit profile pgae by the admin***********','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(loginJSON['userInfo'].username, loginJSON['userInfo'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						
						wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists) {
							if(isExists) {
								var userId = casper.evaluate(function() {
									var userId = document.querySelectorAll('a.default-user.username');
									var userIdLength= userId.length;
    									var userHref=userId[1].getAttribute('href');
     									return userHref;
								});	
								 casper.echo("message :" +userId,'INFO');
								 casper.click('a[href="'+userId+'"]');
								 wait.waitForElement('a#anchor_tab_edit i' , casper , function(err , isExists) {
								 	if(isExists) {
										casper.click('a#anchor_tab_edit i');
										wait.waitForElement('button[type="submit"]' , casper , function(err , isExists) {
											if(isExists) {
												
												var shield = casper.evaluate(function() {
													var id = document.querySelector('input[id="customField"]').getAttribute('name');
													return id;
												});
												 casper.echo("custom field found on register user edit profile page :" +shield,'INFO');
												  forumLoginMethod.logoutFromApp(casper, function(err){
													if (!err)
														casper.echo('Successfully logout from application', 'INFO');
												   });
											}
										});
									}
								  });
							}
						});
					}
				});
			}
		});
	});
};

//verify with invalid birthday(fututre year)
profilePageTests.profilePageInvalidBirthday=function(){
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 41                ' ,'INFO');	
		casper.echo('***********Verify with invalid birthday(fututre year)***********','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(loginJSON['userInfo'].username, loginJSON['userInfo'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('ul.nav.pull-right span.caret' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('ul.nav.pull-right span.caret');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('button[type="submit"]' , casper , function(){ 
									if(isExists) {
										casper.sendKeys('input#imID','hello');
										casper.sendKeys('input#birthDatepicker' ,'04/05/2018');
										casper.click('button[type="submit"]');
										
										wait.waitForElement('div.alert.alert-danger.text-center' , casper , function(err) {
											if(isExists) {
												var successMessage = casper.fetchText('div.alert.alert-danger.text-center');
												casper.echo('success message'+successMessage ,'INFO');
												wait.waitForVisible('ul.nav.pull-right span.caret' , casper , function(err , isExists){
													if(isExists){
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err)
																casper.echo('Successfully logout from application', 'INFO');
														});
													}
												});
											}
										});
									}
								});
							}
						});
					}
				});
			}
		});
	});
};		

//verify with invalid birthday(future month)
profilePageTests.profilePageInvalidFutureMonth=function(){
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 42                 ' ,'INFO');	
		casper.echo('***********Verify with invalid birthday(future month)***********','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(loginJSON['userInfo'].username, loginJSON['userInfo'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('ul.nav.pull-right span.caret' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('ul.nav.pull-right span.caret');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('button[type="submit"]' , casper , function(){ 
									if(isExists) {
										casper.sendKeys('input#imID','hello');
										casper.sendKeys('input#birthDatepicker' ,'04/12/2017');
										casper.click('button[type="submit"]');
										
										wait.waitForElement('div.alert.alert-danger.text-center' , casper , function(err) {
											if(isExists) {
												var successMessage = casper.fetchText('div.alert.alert-danger.text-center');
												casper.echo('success message'+successMessage ,'INFO');
												wait.waitForVisible('ul.nav.pull-right span.caret' , casper , function(err , isExists){
													if(isExists){
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err)
																casper.echo('Successfully logout from application', 'INFO');
														});
													}
												});
												
											}
										});
									}
								});
							}
						});
					}
				});
			}
		});
	});
};

//verify with enter full name greater then maximum limits(30)
profilePageTests.profilePageVerifyFullName=function(){
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 43                 ' ,'INFO');	
		casper.echo('***********Verify with enter full name greater then maximum limits(30)***********','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(loginJSON['userInfo'].username, loginJSON['userInfo'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('ul.nav.pull-right span.caret' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('ul.nav.pull-right span.caret');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('button[type="submit"]' , casper , function(){ 
									if(isExists) {
										casper.sendKeys('input[name="name"]' ,'In case one approaches you to write for them a reference letter you need to assess the situation and see if you can legally do');
										casper.sendKeys('input#imID','hello');
										casper.click('button[type="submit"]');
										wait.waitForElement('ul.nav.pull-right span.caret' , casper , function(err , isExists) {
											if(isExists) {
												casper.click('a#user-nav-panel-profile');
												wait.waitForElement('a#PostsOFUser' , casper , function(){
													if(isExists) {
														var str = casper.fetchText('li span.custom-field-content');
var n = str.indexOf("hani12@wt.com");
var str2 = str.substr(1, n-1);
var successMessage = str2.trim();
														casper.echo('success message'+successMessage ,'INFO');
														wait.waitForVisible('ul.nav.pull-right span.caret' , casper , function(err , isExists){
															if(isExists){
															forumLoginMethod.logoutFromApp(casper, function(err){
																	if (!err)
																		casper.echo('Successfully logout from application', 'INFO');
																});
															}
														});
													
														}										
													});
												}
											});
										}
									});
								}
							});
						}
					});
				}
			});
		});
};
























//-------------------------------------------------------------------------------------------------------------------------------


