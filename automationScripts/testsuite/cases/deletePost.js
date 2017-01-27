//----- This js file covers all the upload functionality on forum Frontend---------//
var config = require('../../../config/config.json');
var jsons=require('../../testdata/registerData.json');
var json = require('../../testdata/inContextLogin.json');
//var inContextLoginMethod = require('../methods/inContextLogin.js');
var forumLoginMethod = require('../methods/login.js');
var loginPrivacyOptionMethod = require('../methods/loginByPrivacyOption.js');
var deletePostMethod = require('../methods/deletePost.js');
var registerTests=require('../cases/register.js');
var registerMethod=require('../methods/register.js');
var uploadMethods=require('../methods/upload.js');
var wait=require('../wait.js');
var utils=require('../utils.js');
deletePostTests = module.exports = {};

//verify by creating Admin-user
deletePostTests.CreateAdminUser=function() {

	//1.test case for register user
	casper.thenOpen(config.url, function() {
		casper.echo('1.Admin user', 'INFO');
		casper.echo('******************************', 'INFO');
		wait.waitForTime(1000,casper,function(err){
			casper.test.assertExists('a[href="/register/register"]');
			casper.click('a[href="/register/register"]');
			casper.echo('Successfully open register form.....', 'INFO');
			wait.waitForTime(2000,casper,function(err){
				registerMethod.registerToApp(jsons['validInfoAdmin'], casper, function(err) {
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
                   
	//2.Test case for backend setting admin user 
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		deletePostMethod.enableUserRegister('hani12',casper,function(err){
			if(!err){
				casper.echo('enableUser working', 'INFO');
			}
		});
        });
};

//Verify by creating Register user
deletePostTests.CreateRegisterUser=function() {

	//1.test case for register user
	casper.thenOpen(config.url, function() {
		casper.echo('1.Register user', 'INFO');
		casper.echo('******************************', 'INFO');
		wait.waitForTime(1000,casper,function(err){
			casper.test.assertExists('a[href="/register/register"]');
			casper.click('a[href="/register/register"]');
			casper.echo('Successfully open register form.....', 'INFO');
			wait.waitForTime(2000,casper,function(err){
				registerMethod.registerToApp(jsons['validInfoRegister'], casper, function(err) {
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

//Verify by delete one topic -selecting by check box 
deletePostTests.deleteTopicAdmin=function(){
	
	deletePostMethod.topicCreate(casper , function(err) {
		if(!err)
			casper.echo('Topic created method called' ,'INFO');
	});

	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 1               ' ,'INFO');	
		casper.echo('***********Verify by delete one topic -selecting by check box ************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(json['validInfose'].username, json['validInfose'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('ul.nav.nav-tabs li:nth-child(2) a')	
								wait.waitForElement('span.forum-title' , casper , function(err , isExists) {
									if(isExists) {
										casper.click('span.forum-title');
										wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists) {
											if(isExists) {
												casper.click('input[name="id"]');
												wait.waitForTime(1000 , casper , function(err) {
													casper.click('i.glyphicon.glyphicon-trash');
													wait.waitForTime(2000 , casper , function(err) {
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err)
																casper.echo('Successfully logout from application', 'INFO');
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
			}
		});
	});
};

//Verify by delete all topic-selecting by check box 
deletePostTests.deleteAllTopicAdmin=function(){

	deletePostMethod.topicCreate(casper , function(err) {
		if(!err)
			casper.echo('topic created method called' ,'INFO');
	});

	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 2             ' ,'INFO');	
		casper.echo('***********Verify by delete all topic-selecting by check box  ************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(json['validInfose'].username, json['validInfose'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('ul.nav.nav-tabs li:nth-child(2) a')	
								wait.waitForElement('span.forum-title' , casper , function(err , isExists) {
									if(isExists) {
										casper.click('span.forum-title');
										wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists) {
											if(isExists) {
												casper.click('input[name="allbox"]');
												casper.click('i.glyphicon.glyphicon-trash');
												wait.waitForTime(2000 , casper , function(err){
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
			}else{
				forumLoginMethod.logoutFromApp(casper, function(err){
					if (!err)
						casper.echo('Successfully logout from application', 'INFO');
				});	


			}
			
		});
	});	
};

//Verify by delete multiple topic-selecting by check box 
deletePostTests.deleteMultipleTopicAdmin=function(){
	//create topic method
	deletePostMethod.topicCreate(casper , function(err) {
		if(!err)
			casper.echo('topic created method called' ,'INFO');
	});
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 3             ' ,'INFO');	
		casper.echo('***********Verify by delete multiple topic-selecting by check box************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(json['validInfose'].username, json['validInfose'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('ul.nav.nav-tabs li:nth-child(2) a')	
								wait.waitForElement('span.forum-title' , casper , function(err , isExists) {
									if(isExists) {
										casper.click('span.forum-title');
										wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists) {
											if(isExists) {
												casper.click('input[name="allbox"]');
												casper.click('i.glyphicon.glyphicon-trash');
												wait.waitForTime(2000 , casper , function(err) {
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
			}
		});
	});	
};

//verify with delete topic-by drop down of the topic
deletePostTests.deleteTopicDropDownAdmin=function(){
	//create topic method
	deletePostMethod.topicCreate(casper , function(err) {
		if(!err)
			casper.echo('topic created method called' ,'INFO');
	});
	
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 4             ' ,'INFO');	
		casper.echo('***********Verify by delete multiple topic-selecting by check box************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(json['validInfose'].username, json['validInfose'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('span.topic-content a');
								wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' , casper , function(err , isExists) {
									if(isExists) {	
										casper.click('i.glyphicon.glyphicon-chevron-down');
										casper.click('div[id^="post_list_"]:nth-child(1) div:nth-child(1) div ul li:nth-child(3) a');
										wait.waitForTime(2000 , casper , function(err) {
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

//verify with delete post-selecting by drop down of the post
deletePostTests.deletePostDropDownAdmin=function(){
	//create topic method
	deletePostMethod.topicCreate(casper , function(err) {
		if(!err)
			casper.echo('topic created method called' ,'INFO');
	});
	
	casper.then(function(){
		casper.echo('-----------------------------New post created method called----------------------------------------' ,'INFO');
     		deletePostMethod.profilePost(casper , function(err) {
			if(!err)
				casper.echo('post have been created' ,'INFO');
    		});
		wait.waitForTime(2000 , casper , function(err){
			deletePostMethod.profilePost(casper , function(err) {
				if(!err)
					casper.echo(' 2nd post have been created' ,'INFO');
    			});	
		});
    	});

	
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 5             ' ,'INFO');	
		casper.echo('***********verify with delete post-selecting by drop down of the post************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(json['validInfose'].username, json['validInfose'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('span.topic-content a');
								wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' , casper , function(err , isExists) {
									if(isExists) {	
										casper.click('span#first_coloumn_3 div div div:nth-child(1) div a i');
										var post= casper.evaluate(function(){
   										var aa=document.querySelectorAll('a#delete_post_request');
     											var a= aa.length;
    											var hh=aa[1].getAttribute('href');
     											return hh;
										});
										casper.echo("message :" +post,'INFO');
										casper.click('a[href="'+post+'"]');
										wait.waitForTime(2000 , casper , function(err){
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

//verify with delete post-selecting by check box 
deletePostTests.deletePostCheckboxAdmin=function(){
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 6            ' ,'INFO');	
		casper.echo('***********verify with delete post-selecting by check box ************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(json['validInfose'].username, json['validInfose'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a' , casper , function(err , isExists) {
							if(isExists) {
								//casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								casper.evaluate(function() {
									document.querySelector('ul.nav.nav-tabs li:nth-child(2) a').click();
								});
								wait.waitForElement('span.forum-title' , casper , function(err , isExists) {
									if(isExists) {	
										casper.click('span.forum-title');
										wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists) {
											if(isExists){
												casper.click('form[name="posts"] a.topic-title');
												wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' , casper , function(err , isExists) {
													if(isExists){
														var post= casper.evaluate(function(){
   														var aa=document.querySelectorAll('input[name="pid"]');
     															var a= aa.length;
    													 		var hh=aa[1].getAttribute('id');
     															return hh;
														});
														casper.echo("message :" +post,'INFO');
														casper.click('input[value="'+post+'"]');
														casper.click('input#deleteposts');
														wait.waitForTime(2000 , casper , function(err) {
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
					}
				});
			}
    		});
	});
};

//delete post from members profile page
deletePostTests.deletePostProfilePageAdmin=function(){

	deletePostMethod.profilePost(casper , function(err) {
		if(!err)
			casper.echo('post have been created' ,'INFO');
    	});
    	
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 7                 ' ,'INFO');	
		casper.echo('***********delete post from members profile page************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(json['validInfose'].username, json['validInfose'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('ul.nav.pull-right span.caret' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('ul.nav.pull-right span.caret');
								casper.click('a#user-nav-panel-profile');
								wait.waitForElement('a#send_message', casper , function(err ,isExists) {
									if(isExists) {
										casper.click('i.glyphicon.glyphicon-chevron-down');
										wait.waitForTime(1000 , casper , function(err){
											var post= casper.evaluate(function(){
   												var aa=document.querySelectorAll('a#search_delete_post');
     													var a= aa.length;
    													var hh=aa[0].getAttribute('href');
     												return hh;
											});
											casper.echo("message :" +post,'INFO');
											casper.click('a[href="'+post+'"]');
											wait.waitForTime(2000,casper , function(err){
												forumLoginMethod.logoutFromApp(casper, function(err){
													if (!err)
														casper.echo('Successfully logout from application', 'INFO');
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

//Verify by delete multiple post-selecting by check box 
deletePostTests.deleteMultiplePostAdmin=function(){
	
	deletePostMethod.profilePost(casper , function(err) {
		if(!err)
			casper.echo('post have been created' ,'INFO');
			wait.waitForTime(1000 , casper , function(err){
				deletePostMethod.profilePost(casper , function(err) {
					if(!err)
						casper.echo(' 2nd post have been created' ,'INFO');
    				});	
			});
	});
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 8            ' ,'INFO');	
		casper.echo('***********Verify by delete multiple topic-selecting by check box************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(json['validInfose'].username, json['validInfose'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....',
			
 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('span.forum-title' , casper , function(err , isExists) {
									if(isExists) {	
										casper.click('span.forum-title');
										wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists) {
											if(isExists){
												casper.click('form[name="posts"] a.topic-title');
												wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' , casper , function(err , isExists) {
													if(isExists){
														var post= casper.evaluate(function(){
   															var aa=document.querySelectorAll('input[name="pid"]');
     															var a= aa.length;
    													 	
      															var hh=aa[1].getAttribute('id');
     															
																return hh;
														});
														casper.echo("message :" +post,'INFO');
														casper.click('input[value="'+post+'"]');
														casper.click('input#deleteposts');
														wait.waitForTime(1000 , casper , function(err){
															deletePostMethod.PostListing(casper , function(err){
															if(!err)
																casper.echo('method called successfully','INFO');

															});
															wait.waitForTime(2000 , casper , function(err){
															forumLoginMethod.logoutFromApp(casper, function(err){
																if (!err)
																	casper.echo('Successfully logout from application', 'INFO');
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
					}
				});
			}
		});
    	});	

};

//*******************************************Delete others topic/post as register user*****************************
//----------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
//Verify by delete one topic -selecting by check box 
deletePostTests.deletePostRegisteruser=function(){
	
	deletePostMethod.disableApproveAllPost(casper , function(err){
		casper.echo('-------------------------Delete others topic/post as register user testcases----------------------------' ,'INFO');
		if(!err)
			casper.echo('disableApproveAllPost method called successfully' ,'INFO');
	});

	casper.then(function(){
		deletePostMethod.BackEndSettingsTopicPostEnable(casper , function(err) {
			if(!err)
				casper.echo('topic post successfully enable' ,'INFO');
		});
		wait.waitForTime(1000 , casper , function(err){
			//create topic
	 		deletePostMethod.createTopic(casper , function(err){
				if(!err)
					casper.echo('create topic  method called successfully' ,'INFO');
			});
		});
	});
	
	
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 9               ' ,'INFO');	
		casper.echo('***********Verify by delete one topic -selecting by check box ************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('ul.nav.nav-tabs li:nth-child(2) a')	
								wait.waitForElement('span.forum-title' , casper , function(err , isExists) {
									if(isExists) {
										casper.click('span.forum-title');
										wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists) {
											if(isExists) {

												casper.click('input[name="id"]');
												wait.waitForTime(1000 , casper , function(err) {
												
													casper.click('i.glyphicon.glyphicon-trash');
													wait.waitForTime(2000 , casper , function(err){
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err)
																casper.echo('Successfully logout from application', 'INFO');
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
			}
		});
	});
};

//Verify by delete all topic-selecting by check box 
deletePostTests.deleteAllTopicRegisteruser=function(){
	//create topic method called
	deletePostMethod.topicCreate(casper , function(err) {
		if(!err)
			casper.echo('topic created method called' ,'INFO');

	});
	
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 10             ' ,'INFO');	
		casper.echo('***********Verify by delete all topic-selecting by check box Register user','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('ul.nav.nav-tabs li:nth-child(2) a')	
								wait.waitForElement('span.forum-title' , casper , function(err , isExists) {
									if(isExists) {
										casper.click('span.forum-title');
										wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists) {
											if(isExists) {
												casper.click('input[name="allbox"]');
												wait.waitForTime(1000 , casper , function(err) {
													casper.capture('1.png');
													casper.click('i.glyphicon.glyphicon-trash');
													wait.waitForTime(2000 , casper , function(err){
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err)
																casper.echo('Successfully logout from application', 'INFO');
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
			}
		});
	});	
};

//verify with delete topic-by drop down of the topic
deletePostTests.deleteTopicDropDownRegisuser=function(){
	//create topic method
	deletePostMethod.topicCreate(casper , function(err) {
		if(!err)
			casper.echo('topic created method called' ,'INFO');

	});
	
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 11             ' ,'INFO');	
		casper.echo('***********Verify by delete multiple topic-selecting by check box************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
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
										casper.click('div[id^="post_list_"]:nth-child(1) div:nth-child(1) div ul li:nth-child(3) a');
										wait.waitForTime(2000 , casper , function(err) {
											
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

//verify with delete post-selecting by check box 
deletePostTests.deletePostCheckboxRegister=function(){

	deletePostMethod.topicCreate(casper , function(err) {
		if(!err)
			casper.echo('topic created method called' ,'INFO');
			wait.waitForTime(1000 , casper , function(err) {
				deletePostMethod.profilePostRegister(casper , function(err) {
					if(!err)
						casper.echo('post have been created' ,'INFO');
    				});
    			});
	});

	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 12            ' ,'INFO');	
		casper.echo('***********Verify by delete multiple topic-selecting by check box************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('span.forum-title' , casper , function(err , isExists) {
									if(isExists) {	
										casper.click('span.forum-title');
										wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists) {
											if(isExists){
												casper.click('form[name="posts"] a.topic-title');
												wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' , casper , function(err , isExists) {
													if(isExists){
														var post= casper.evaluate(function(){
   															var aa=document.querySelectorAll('input[name="pid"]');
     															var a= aa.length;
    													 		
      															var hh=aa[1].getAttribute('id');
     															
																return hh;
														});
														casper.echo("message :" +post,'INFO');
														casper.click('input[value="'+post+'"]');
														casper.click('input#deleteposts');
														wait.waitForTime(2000 , casper , function(err) {
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
					}
				});
			}
    		});
	});
};

//verify with delete post-by drop down of the post Register user
deletePostTests.deletePostDropDownRegister=function(){
	
	deletePostMethod.profilePostRegister(casper , function(err) {
		if(!err)
			casper.echo('post have been created' ,'INFO');
			wait.waitForTime(1000 , casper , function(err){
				deletePostMethod.profilePostRegister(casper , function(err) {
					if(!err)
						casper.echo('2nd post have been created' ,'INFO');
    				});
			});
    	});
    	
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 13             ' ,'INFO');	
		casper.echo('***********verify with delete post-selecting by drop down of the post register user************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....', 'INFO');
						wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('form[name="posts"] a.topic-title');
								wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' , casper , function(err , isExists) {
									if(isExists) {	
										casper.click('span#first_coloumn_3 div div div:nth-child(1) div a i');
										wait.waitForTime(1000 , casper , function(err){
											var post= casper.evaluate(function(){
   												var aa=document.querySelectorAll('a#delete_post_request');
     												var a= aa.length;
    												var hh=aa[1].getAttribute('href');
     												return hh;
											});
											casper.echo("message :" +post,'INFO');
											casper.click('a[href="'+post+'"]');
											wait.waitForTime(2000 , casper , function(err) {
												forumLoginMethod.logoutFromApp(casper, function(err){
													if (!err)
														casper.echo('Successfully logout from application', 'INFO');
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
	
//delete post from members profile page
deletePostTests.deletePostProfilePage=function(){
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 14                 ' ,'INFO');	
		casper.echo('***********delete post from members profile page************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('ul.nav.pull-right span.caret' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('ul.nav.pull-right span.caret');
								casper.click('a#user-nav-panel-profile');
								wait.waitForElement('a#send_message', casper , function(err ,isExists) {
									if(isExists) {
										casper.click('i.glyphicon.glyphicon-chevron-down');
										var post= casper.evaluate(function(){
   											var aa=document.querySelectorAll('a#search_delete_post');
     												var a= aa.length;
    												var hh=aa[0].getAttribute('href');
     											return hh;
										});
										casper.echo("message :" +post,'INFO');
										casper.click('a[href="'+post+'"]');
										wait.waitForTime(2000 , casper , function(err){
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

//delete topic by searching topic
deletePostTests.deletePostSearchTopic=function(){
	deletePostMethod.topicCreate(casper , function(err) {
		if(!err)
			casper.echo('topic created method called' ,'INFO');
	});

	
	casper.thenOpen("http://beta8.websitetoolbox.com/cgi/members/cloudsearch_batch_changes.cgi" , function(){

	});

	casper.then(function() {
		deletePostMethod.searchlogin(casper , function(err) {
			if(!err)
				casper.echo('search method called successfully' ,'INFO');

		});
		wait.waitForTime(2000 , casper , function(err){
			casper.echo('                         Testcase 15                                  ' ,'INFO');
			casper.echo('--------------------delete topic by searching topic by Register user--------------------' ,'INFO');
			wait.waitForElement('div.post-body.pull-left span:nth-child(2) a' , casper , function(err , isExists){
				if(isExists) {
					casper.capture('a.png');
					casper.click('input[name="id"]');
					casper.click('input[type="button"]');	
					wait.waitForTime(2000 , casper , function(){
						forumLoginMethod.logoutFromApp(casper, function(err){
							if (!err)
								casper.echo('Successfully logout from application', 'INFO');
						});	
					});
				}
			});
		});
	});
		
};

//delete post by searching post
deletePostTests.deletePostSearchPost=function(){
	deletePostMethod.topicCreate(casper , function(err) {
		if(!err)
			casper.echo('topic created method called' ,'INFO');
	});
	casper.then(function(){
		casper.echo('-----------------------------New post created---------------------------------------------------' ,'INFO');
     		deletePostMethod.profilePostRegister(casper , function(err) {
			if(!err)
				casper.echo('post have been created' ,'INFO');
    		});
		wait.waitForTime(3000 , casper , function(){
			deletePostMethod.profilePostRegister(casper , function(err) {
			if(!err)
				casper.echo(' 2nd post have been created' ,'INFO');
    			});
		});
	});

	casper.thenOpen("http://beta8.websitetoolbox.com/cgi/members/cloudsearch_batch_changes.cgi" , function(){

	});

	casper.then(function(){
		deletePostMethod.searchlogin(casper , function(err) {
			if(!err)
				casper.echo('search method called successfully' ,'INFO');
		});
		wait.waitForTime(2000 , casper , function(err) {
			casper.echo('                         Testcase 16                                 ' ,'INFO');
			casper.echo('-----------------------------------delete topic by searching post by Register user------------------------------' ,'INFO');
			wait.waitForElement('a#anchor_tab_show_threads' , casper , function(err , isExists){
				if(isExists) {
					casper.click('a#anchor_tab_show_posts');
					wait.waitForElement('div.post-body.pull-left span:nth-child(2) a' , casper , function(err , isExists) {
						if(isExists) {
							casper.click('div#feed-main div:nth-child(2) div div div:nth-child(1) div a');
							
								var post= casper.evaluate(function(){
   									var aa=document.querySelectorAll('a#search_delete_post');
     									var a= aa.length;
    									var hh=aa[1].getAttribute('href');
     									return hh;
								});
								casper.echo("message :" +post,'INFO');
								casper.click('a[href="'+post+'"]');
								wait.waitForTime(2000 , casper , function(err){
									forumLoginMethod.logoutFromApp(casper, function(err){
										if (!err)
											casper.echo('Successfully logout from application', 'INFO');
									});	
								});
							}
						});
					}
				});
			});
		});
	
};


//***************************************Delete own topic post *****************************************************************************
//------------------------------------------delete own topic- disable-----------------------------------------------------------------------
//------------------------------------------delete own post-enable -------------------------------------------------------------------------

//Verify by delete one own  topic -selecting by check box when .
deletePostTests.deleteOwnTopic=function(){
	deletePostMethod.createTopic(casper , function(err) {
		if(!err) {
			casper.echo('Topic created successfully','INFO')
		}
	
	});
	//backend setting method----------------------------------
	deletePostMethod.BackEndSettings(casper , function(err) {
		if(!err) {
			casper.echo('delete own topic and post checked','INFO')
		}
	});
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 17               ' ,'INFO');	
		casper.echo('***********Verify by delete one topic -selecting by check box when delete own topic- disable delete own post-enable  ************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('ul.nav.nav-tabs li:nth-child(2) a')	
								wait.waitForElement('span.forum-title' , casper , function(err , isExists) {
									if(isExists) {
										casper.click('span.forum-title');
										wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists) {
											if(isExists) {

												casper.click('input[name="id"]');
												wait.waitForTime(2000 , casper , function(err) {
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
			}
		});
	});
};

 
//Verify by delete own all topic-selecting by check box using 
deletePostTests.deleteAllOwnTopic=function(){
	deletePostMethod.BackEndSettings(casper , function(err) {
		if(!err) {
			casper.echo('Backend settings  successfully','INFO')
		}
		wait.waitForTime(2000 , casper , function(err){
			deletePostMethod.createMoreTopic(casper , function(err) {
				if(!err) {
					casper.echo('Topic created successfully','INFO')
				}
			});	
		});
	});
	
	//Result found delete topic is unavailable
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 18             ' ,'INFO');	
		casper.echo('***********Verify by delete all topic-selecting by check box when when delete own topic- disable delete own post-enable  ************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('ul.nav.nav-tabs li:nth-child(2) a')	
								wait.waitForElement('span.forum-title' , casper , function(err , isExists) {
									if(isExists) {
										casper.click('span.forum-title');
										wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists) {
											if(isExists) {

												casper.click('input[name="allbox"]');
												wait.waitForTime(2000 , casper , function(err) {
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
			}
		});
	});	
};


//verify with delete  own topic-by drop down of the topic
deletePostTests.deleteOwnTopicDropdown=function(){
	//create topic method
	deletePostMethod.createTopic(casper , function(err) {
		if(!err) {
			casper.echo('Topic created successfully','INFO')
		}
	
	});



	//Result found delete dropdown of the  topic is unavailable
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 19             ' ,'INFO');	
		casper.echo('**********verify with delete  own topic-by drop down of the topic when when delete own topic- disable delete own post-enable*************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....',
			
 'INFO');
						wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('span.topic-content a');
								wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' , casper , function(err , isExists) {
									if(isExists) {	
										casper.click('i.glyphicon.glyphicon-chevron-down');
										wait.waitForTime(2000 , casper , function(err) {
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


//verify with delete own post-selecting by check box 

deletePostTests.deleteOwnPostCheckbox=function(){
	deletePostMethod.createTopic(casper , function(err) {
		if(!err) {
			casper.echo('Topic created successfully','INFO')
		}
		wait.waitForTime(3000 , casper , function(err) {
			deletePostMethod.profilePostRegister(casper , function(err) {
				if(!err)
					casper.echo('post have been created' ,'INFO');
    			});	
		
		});
	
	});	

	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 20            ' ,'INFO');	
		casper.echo('***********Verify with delete own post-selecting by check box when when delete own topic- disable delete own post-enable************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('span.forum-title' , casper , function(err , isExists) {
									if(isExists) {	
										casper.click('span.forum-title');
										wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists) {
											if(isExists){
												casper.click('form[name="posts"] a.topic-title');
												wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' , casper , function(err , isExists) {
													if(isExists){
														var post= casper.evaluate(function(){
   															var aa=document.querySelectorAll('input[name="pid"]');
     															var a= aa.length;
    													 		
      															var hh=aa[1].getAttribute('id');
     															
																return hh;
														});
														casper.echo("message :" +post,'INFO');
														casper.click('input[value="'+post+'"]');
														casper.click('input#deleteposts');

														wait.waitForTime(2000 , casper , function(err) {
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
					}
				});
			}
    		});
	});	
};

//verify with delete own post-by drop down of the post
deletePostTests.deletePostDropDown=function(){
	 deletePostMethod.profilePostRegister(casper , function(err) {
		if(!err)
			casper.echo('post have been created' ,'INFO');
    	 });
    	
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 21            ' ,'INFO');	
		casper.echo('***********verify with delete post-selecting by drop down of the post  when delete own topic- disable delete own post-enable************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....',
			
 'INFO');
						wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('form[name="posts"] a.topic-title');
								wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' , casper , function(err , isExists) {
									if(isExists) {	
											casper.click('i.glyphicon.glyphicon-chevron-down');
											var post= casper.evaluate(function(){
   												var aa=document.querySelectorAll('a#delete_post_request');
     													var a= aa.length;
    													var hh=aa[3].getAttribute('href');
     													return hh;
											});
											casper.echo("message :" +post,'INFO');
											casper.click('a[href="'+post+'"]');
											wait.waitForTime(1000 , casper , function(err) {
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


//delete  own post from own profile page
deletePostTests.deleteOwnProfilePage=function(){
	deletePostMethod.createTopic(casper , function(err) {
		if(!err) {
			casper.echo('Topic created successfully','INFO')
		}
	
	});

	casper.then(function(){
		casper.echo('-----------------------------New post created---------------------------------------------------' ,'INFO');
     		deletePostMethod.profilePostRegister(casper , function(err) {
			if(!err)
				casper.echo('post have been created' ,'INFO');
    		});
    	});
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 22                 ' ,'INFO');	
		casper.echo('***********delete post from members profile page when delete own topic- disable delete own post-enable************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForTime(2000 , casper , function(err){
							wait.waitForElement('ul.nav.pull-right span.caret' , casper , function(err , isExists) {
								if(isExists) {
								
									casper.click('ul.nav.pull-right span.caret');
									casper.click('a#user-nav-panel-profile');
									wait.waitForElement('a#send_message', casper , function(err ,isExists) {
										if(isExists) {
											casper.click('i.glyphicon.glyphicon-chevron-down');
											var post= casper.evaluate(function(){
   												var aa=document.querySelectorAll('a#search_delete_post');
     												var a= aa.length;
    												var hh=aa[0].getAttribute('href');
     											return hh;
											});
											casper.echo("message :" +post,'INFO');
											casper.click('a[href="'+post+'"]');
											wait.waitForTime(2000 , casper , function(err){
												forumLoginMethod.logoutFromApp(casper, function(err){
													if (!err)
														casper.echo('Successfully logout from application', 'INFO');
												});
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
};


//delete  own topic by searching topic
deletePostTests.deleteOwnSearchTopic=function(){

	deletePostMethod.BackEndSettings(casper , function(err) {
		if(!err) {
			casper.echo('Backend settings  successfully','INFO')
		}
		wait.waitFortime(4000 , casper , function(err){
			deletePostMethod.createTopic(casper , function(err) {
				if(!err) {
					casper.echo('Topic created successfully','INFO')
				}
			});
		});
	});
	
	casper.then(function(){
		deletePostMethod.searchlogin(casper , function(err) {
			if(!err)
				casper.echo('search method called successfully' ,'INFO');
		});
		wait.waitForTime(3000 , casper , function(err) {
			casper.echo('                         Testcase 23                                ' ,'INFO');
			casper.echo('-----------------------------------delete topic by searching topic  when delete own topic- disable delete own post-enable------------------------------' ,'INFO');
			wait.waitForElement('div.post-body.pull-left span:nth-child(2) a' , casper , function(err , isExists){
				if(isExists) {
					casper.click('div.post-body.pull-left span:nth-child(2) a');
					wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' , casper , function(err , isExists) {
						if(isExists){
							casper.click('input[name="pid"]');
							casper.click('input[type="button"]');
							wait.waitForTime(2000 , casper , function(err){
								forumLoginMethod.logoutFromApp(casper, function(err){
									if (!err)
										casper.echo('Successfully logout from application', 'INFO');
								});	
							});	
						}
					});
				}
			});
		});
	});
};

//delete  own post by searching post
deletePostTests.deleteOwnSearchPost=function(){
	
	deletePostMethod.createTopic(casper , function(err) {
		if(!err) {
			casper.echo('Topic created successfully','INFO')
		}
		casper.thenOpen("http://beta8.websitetoolbox.com/cgi/members/cloudsearch_batch_changes.cgi" , function(){

		});
	});	

	


	
	casper.then(function(){
		casper.echo('-----------------------------New post created---------------------------------------------------' ,'INFO');
     		deletePostMethod.profilePostRegister(casper , function(err) {
			if(!err)
				casper.echo('post have been created' ,'INFO');
    		});
		wait.waitForTime(4000 , casper , function(err) {
			deletePostMethod.profilePostRegister(casper , function(err) {
				if(!err)
					casper.echo('post have been created' ,'INFO');
    			});
		});
    	});

	
	casper.then(function(){
		deletePostMethod.searchLoginOwn(casper , function(err) {
			if(!err)
				casper.echo('search methyod called successfully' ,'INFO');
		});
		wait.waitForTime(3000 , casper , function(err){
			casper.echo('                         Testcase 24                                 ' ,'INFO');
			casper.echo('-----------------------------------delete topic by searching post when delete own topic- disable delete own post-enable ------------------------------' ,'INFO');
			wait.waitForElement('a#anchor_tab_show_threads' , casper , function(err , isExists){
				if(isExists) {
					casper.click('a#anchor_tab_show_posts');
					wait.waitForElement('div.post-body.pull-left span:nth-child(2) a' , casper , function(err , isExists) {
						if(isExists) {
							casper.click('div#feed-main div:nth-child(2) div div div:nth-child(1) div a');
							wait.waitForTime(1000 , casper , function(err){
								var post= casper.evaluate(function(){
   									var aa=document.querySelectorAll('a#search_delete_post');
     									var a= aa.length;
    									var hh=aa[1].getAttribute('href');
     									return hh;
								});
								casper.echo("message :" +post,'INFO');
								casper.click('a[href="'+post+'"]');
								wait.waitForTime(2000 , casper , function(err){
									forumLoginMethod.logoutFromApp(casper, function(err){
										if (!err)
											casper.echo('Successfully logout from application', 'INFO');
									});
								});
							});
						}
					});
				}
			});
		});
	});
};

//--------------------------------------"view category-------------------------------------------------------------------------------------------
//--------------------------------------delete own topic- enable---------------------------------------------------------------------------------
//--------------------------------------delete own post-disable"---------------------------------------------------------------------------------
//---------------------------------Verify by delete own topic -selecting by check box------------------------------------------------------------ 

deletePostTests.deleteOwnTopicPostDisable=function(){
	deletePostMethod.createTopic(casper , function(err) {
		casper.echo('testcases starts delete own topic enable delete own post disable' ,'');
		if(!err) {
			casper.echo('Topic created successfully','INFO')
		}
	
	});
	//backend setting method----------------------------------
	deletePostMethod.BackEndSettingsPostDisable(casper , function(err) {
		if(!err) {
			casper.echo('delete own topic and post checked','INFO')
		}
	});
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 25               ' ,'INFO');
		casper.echo('--------------------delete own topic- enable-----------------------delete own post-disable------------- ' ,'');	
		casper.echo('***********Verify by delete one topic -selecting by check box when delete own topic- enable ,delete own post-disable ************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('ul.nav.nav-tabs li:nth-child(2) a')	
								wait.waitForElement('span.forum-title' , casper , function(err , isExists) {
									if(isExists) {
										casper.click('span.forum-title');
										wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists) {
											if(isExists) {

												casper.click('input[name="id"]');
												wait.waitForTime(1000 , casper , function(err) {
													casper.capture('1.png');
													casper.click('i.glyphicon.glyphicon-trash');
													wait.waitForTime(2000 , casper , function(err){
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err)
																casper.echo('Successfully logout from application', 'INFO');
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
			}
		});
	});
};

//Verify by delete all own topic-selecting by check box 
deletePostTests.deleteAllTopicPostDisable=function(){
	deletePostMethod.BackEndSettingsPostDisable(casper , function(err) {
		if(!err) {
			casper.echo('Backend settings  successfully','INFO')
		}



	});
	casper.then(function(){
		deletePostMethod.createTopic(casper , function(err) {
			if(!err) {
				casper.echo('Topic created successfully','INFO')
			}
		});
	});
	//Result found delete topic is unavailable
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 26             ' ,'INFO');	
		casper.echo('***********Verify by delete all topic-selecting by check box when delete own topic- enable ,delete own post-disable  ************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('ul.nav.nav-tabs li:nth-child(2) a')	
								wait.waitForElement('span.forum-title' , casper , function(err , isExists) {
									if(isExists) {
										casper.click('span.forum-title');
										wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists) {
											if(isExists) {

												casper.click('input[name="allbox"]');
												wait.waitForTime(1000 , casper , function(err) {
													casper.capture('1.png');
													wait.waitForTime(2000 , casper , function(){
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err)
																casper.echo('Successfully logout from application', 'INFO');
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
			}
		});
	});	
};

//verify with delete  own topic-by drop down of the topic
deletePostTests.deleteOwnTopicDropdownPostDisable=function(){
	//create topic method
	deletePostMethod.createTopic(casper , function(err) {
		if(!err) {
			casper.echo('Topic created successfully','INFO')
		}
	});


	//Result found delete dropdown of the  topic is unavailable
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 27             ' ,'INFO');	
		casper.echo('**********verify with delete  own topic-by drop down of the topic when delete own topic- enable ,delete own post-disable*************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
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
										//casper.click('div[id^="post_list_"]:nth-child(1) div:nth-child(1) div ul li:nth-child(3) a');
										wait.waitForTime(2000 , casper , function(err) {
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

//verify with delete own post-selecting by check box 
deletePostTests.deleteOwnPostCheckboxPostDisable=function(){

	//create topic method
	deletePostMethod.createTopic(casper , function(err) {
		if(!err) {
			casper.echo('Topic created successfully','INFO')
		}
		wait.waitForTime(3000 , casper , function(){
			deletePostMethod.profilePostRegister(casper , function(err) {
				if(!err)
					casper.echo('post have been created' ,'INFO');
    			});
		});
	});
	
	
	//Result found post cannot be deleted
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 28            ' ,'INFO');	
		casper.echo('***********Verify by delete multiple topic-selecting by check box when delete own topic- enable ,delete own post-disable************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('span.forum-title' , casper , function(err , isExists) {
									if(isExists) {	
										casper.click('span.forum-title');
										wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists) {
											if(isExists){
												casper.click('form[name="posts"] a.topic-title');
												wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' , casper , function(err , isExists) {
													if(isExists){
														var post= casper.evaluate(function(){
   															var aa=document.querySelectorAll('input[name="pid"]');
     															var a= aa.length;
    													 		
      															var hh=aa[1].getAttribute('id');
     															
																return hh;
														});
														casper.echo("message :" +post,'INFO');
														wait.waitForTime(2000 , casper , function(err){
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
					}
				});
			}
    		});
	});	
};

//verify with delete own post-by drop down of the post
deletePostTests.deleteOwnPostDropDownOwnPostDisable=function(){
	
     	deletePostMethod.profilePostRegister(casper , function(err) {
		if(!err)
			casper.echo('post have been created' ,'INFO');
    	});
    	
	//Result found post cannot be deleted
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 29            ' ,'INFO');	
		casper.echo('***********verify with delete post-selecting by drop down of the post register user when delete own topic- enable ,delete own post-disable************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
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
										wait.waitForTime(2000 , casper , function(err) {
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

//delete  own post from own profile page
deletePostTests.deleteOwnProfilePagePostDisable=function(){
	//create topic method
	deletePostMethod.createTopic(casper , function(err) {
		if(!err) {
			casper.echo('Topic created successfully','INFO')
		}
		wait.waitForTime(3000 , casper , function(err){
			deletePostMethod.profilePostRegister(casper , function(err) {
				if(!err)
					casper.echo('post have been created' ,'INFO');
    			});
		});
	});

	
	//Result found post cannot be deleted
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 30                 ' ,'INFO');	
		casper.echo('***********delete post from members profile page when delete own topic- enable ,delete own post-disable************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForTime(2000 , casper , function(err){
							wait.waitForElement('ul.nav.pull-right span.caret' , casper , function(err , isExists) {
								if(isExists) {
									casper.click('ul.nav.pull-right span.caret');
									casper.click('a#user-nav-panel-profile');
									wait.waitForElement('a#send_message', casper , function(err ,isExists) {
										if(isExists) {
											casper.click('i.glyphicon.glyphicon-chevron-down');
											wait.waitForTime(2000 , casper , function(err){
												forumLoginMethod.logoutFromApp(casper, function(err){
													if (!err)
														casper.echo('Successfully logout from application', 'INFO');
												});
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
};

//delete  own topic by searching topic
deletePostTests.deleteSearchPostDisable=function(){
	deletePostMethod.BackEndSettingsPostDisable(casper , function(err) {
		if(!err) {
			casper.echo('delete own topic and post checked','INFO')
		}
	});	

	casper.then(function(){
		deletePostMethod.createTopic(casper , function(err) {
			if(!err) {
				casper.echo('Topic created successfully','INFO')
			}
		});
	});

	casper.then(function(){
		deletePostMethod.searchlogin(casper , function(err) {
			if(!err)
				casper.echo('search method called successfully' ,'INFO');
		});
	});
	//Result found delete option is unavaialble
	casper.then(function(){
		casper.echo('                         Testcase 31                                ' ,'INFO');
		casper.echo('------------------delete topic by searching topic when delete own topic- enable ,delete own post-disable--------------------------' ,'INFO');
		wait.waitForElement('div.post-body.pull-left span:nth-child(2) a' , casper , function(err , isExists){
			if(isExists) {
				casper.click('input[name="id"]');
				casper.click('i.glyphicon.glyphicon-trash');
				wait.waitForTime(3000 , casper , function(err){
					forumLoginMethod.logoutFromApp(casper, function(err){
						if (!err)
							casper.echo('Successfully logout from application', 'INFO');
					});	
				});	
			}
		});				
	});
};

//delete own post by searching post
deletePostTests.deleteOwnSearPostDisable=function(){

	deletePostMethod.createTopic(casper , function(err) {
		if(!err) {
			casper.echo('Topic created successfully','INFO')
		}
		wait.waitForTime(4000 , casper , function(err){
			deletePostMethod.profilePostRegister(casper , function(err) {
				if(!err)
					casper.echo('post have been created' ,'INFO');
    			});
		});
	});
	
	casper.then(function(){
		deletePostMethod.searchLoginOwn(casper , function(err) {
			if(!err)
				casper.echo('search methyod called successfully' ,'INFO');
		});
		wait.waitForTime(3000 , casper , function(err){
			casper.echo('                         Testcase 32                                 ' ,'INFO');
			casper.echo('-----------------------------------delete topic by searching topic when delete own topic- enable ,delete own post-disable------------------------------' ,'INFO');

			wait.waitForElement('a#anchor_tab_show_threads' , casper , function(err , isExists){
				if(isExists) {
					casper.click('a#anchor_tab_show_posts');
					wait.waitForElement('div.post-body.pull-left span:nth-child(2) a' , casper , function(err , isExists) {
						if(isExists) {
							casper.click('div#feed-main div:nth-child(2) div div div:nth-child(1) div a');
							wait.waitForTime(2000 , casper , function(err){
								forumLoginMethod.logoutFromApp(casper, function(err){
									if (!err)
										casper.echo('Successfully logout from application', 'INFO');
								});
							});
						}
					});
				}
			});
		});
	});
		
};


//-----------------------------------------------------------"view category-------------------------------------------------
//----------------------------------------------------------delete own topic- disable---------------------------------------
//----------------------------------------------------------delete own post-disable"----------------------------------------
deletePostTests.deleteOwnTopicPostDisable=function(){
	deletePostMethod.createTopic(casper , function(err) {
		if(!err) {
			casper.echo('Topic created successfully','INFO')
		}
	
	});
	//backend setting method----------------------------------
	deletePostMethod.BackEndSettingsTopicPostDisable(casper , function(err) {
		if(!err) {
			casper.echo('delete own topic and post checked','INFO')
		}
	});
	//Result correct topic cannot be deleted 
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 33               ' ,'INFO');	
		casper.echo('***********Verify by delete one topic -selecting by check box when delete own topic- disable ,delete own post-disable  ************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('ul.nav.nav-tabs li:nth-child(2) a')	
								wait.waitForElement('span.forum-title' , casper , function(err , isExists) {
									if(isExists) {
										casper.click('span.forum-title');
										wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists) {
											if(isExists) {

												casper.click('input[name="id"]');
												wait.waitForTime(3000 , casper , function(err) {
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
			}
		});
	});
};

//Verify by delete all own topic-selecting by check box 
deletePostTests.deleteAllTopicsPostDisable=function(){
	deletePostMethod.BackEndSettingsTopicPostDisable(casper , function(err) {
		if(!err) {
			casper.echo('Backend settings  successfully','INFO')
		}



	});
	deletePostMethod.createMoreTopic(casper , function(err) {
		if(!err) {
			casper.echo('Topic created successfully','INFO')
		}
	
	});
	//Result found delete topic is unavailable
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 34             ' ,'INFO');	
		casper.echo('***********Verify by delete all topic-selecting by check box when delete own topic- disable ,delete own post-disable  ************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('ul.nav.nav-tabs li:nth-child(2) a')	
								wait.waitForElement('span.forum-title' , casper , function(err , isExists) {
									if(isExists) {
										casper.click('span.forum-title');
										wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists) {
											if(isExists) {

												casper.click('input[name="allbox"]');
												wait.waitForTime(3000 , casper , function(err) {
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
			}
		});
	});	
};

//verify with delete  own topic-by drop down of the topic
deletePostTests.deleteOwnTopicDropdownTopicPostDisable=function(){
	//create topic method
	deletePostMethod.createTopic(casper , function(err) {
		if(!err) {
			casper.echo('Topic created successfully','INFO')
		}
	
	});


	//Result found delete dropdown of the  topic is unavailable
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 35            ' ,'INFO');	
		casper.echo('**********verify with delete  own topic-by drop down of the topic when delete own topic- disable ,delete own post-disable*************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
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
										wait.waitForTime(3000 , casper , function(err) {
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

//verify with delete own post-selecting by check box 
deletePostTests.deleteOwnPostCheckboxTopicPostDisable=function(){
	deletePostMethod.createTopic(casper , function(err) {
		if(!err) {
			casper.echo('Topic created successfully','INFO')
		}
		wait.waitForTime(4000 , casper , function(err){
			
			deletePostMethod.profilePostRegister(casper , function(err) {
				if(!err)
					casper.echo('post have been created' ,'INFO');
    			});
		});
	
	});

	
	//Result found post cannot be deleted
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 36            ' ,'INFO');	
		casper.echo('***********Verify by delete multiple topic-selecting by check box when delete own topic- disable ,delete own post-disable************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('span.forum-title' , casper , function(err , isExists) {
									if(isExists) {	
										casper.click('span.forum-title');
										wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists) {
											if(isExists){
												casper.click('form[name="posts"] a.topic-title');
												wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' , casper , function(err , isExists) {
													if(isExists){
														var post= casper.evaluate(function(){
   															var aa=document.querySelectorAll('input[name="pid"]');
     															var a= aa.length;
    													 		var hh=aa[1].getAttribute('id');
     															return hh;
														});
														casper.echo("message :" +post,'INFO');
														wait.waitForTime(2000 , casper , function(err) {
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
					}
				});
			}
    		});
	});	
};

//verify with delete own post-by drop down of the post
deletePostTests.deleteOwnPostDropDownOwnTopicPostDisable=function(){
	 
     	deletePostMethod.profilePostRegister(casper , function(err) {
		if(!err)
			casper.echo('post have been created' ,'INFO');
    	});
    	
	//Result found post cannot be deleted
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 37            ' ,'INFO');	
		casper.echo('***********verify with delete post-selecting by drop down of the post register user when delete own topic- disable ,delete own post-disable************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
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
										wait.waitForTime(2000 , casper , function(err) {
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

//delete  own post from own profile page
deletePostTests.deleteOwnProfilePageTopicPostDisable=function(){
	deletePostMethod.createTopic(casper , function(err) {
		if(!err) {
			casper.echo('Topic created successfully','INFO')
		}
		wait.waitForTime(3000 , casper , function(err){
			deletePostMethod.profilePostRegister(casper , function(err) {
				if(!err)
					casper.echo('post have been created' ,'INFO');
    			});	
		});
	});
	
	//Result found post cannot be deleted
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 38                ' ,'INFO');	
		casper.echo('***********delete post from members profile page when delete own topic- disable ,delete own post-disable************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForTime(2000 , casper , function(err){
							wait.waitForElement('ul.nav.pull-right span.caret' , casper , function(err , isExists) {
								if(isExists) {
								
									casper.click('ul.nav.pull-right span.caret');
									casper.click('a#user-nav-panel-profile');
									wait.waitForElement('a#send_message', casper , function(err ,isExists) {
										if(isExists) {
											casper.click('i.glyphicon.glyphicon-chevron-down');
											wait.waitForTime(2000 , casper , function(err){
												forumLoginMethod.logoutFromApp(casper, function(err){
													if (!err)
														casper.echo('Successfully logout from application', 'INFO');
												});
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
};

//delete  own topic by searching topic
deletePostTests.deleteOwnSearchTopicPostDisable=function(){
	deletePostMethod.BackEndSettingsTopicPostDisable(casper , function(err) {
		if(isExists) {
			casper.echo('Backend settings  successfully','INFO')
		}
		wait.waitFortime(3000 , casper , function(err){
			deletePostMethod.createTopic(casper , function(err) {
				if(!err) {
					casper.echo('Topic created successfully','INFO')
				}
			});
		});
	});
	
	
	casper.thenOpen("http://beta8.websitetoolbox.com/cgi/members/cloudsearch_batch_changes.cgi" , function(){

	});


	
	casper.then(function(){
		deletePostMethod.searchlogin(casper , function(err) {
			if(!err)
				casper.echo('search method called successfully' ,'INFO');
		});
		wait.waitForTime(3000 , casper , function(err){
			casper.echo('                         Testcase 39                                ' ,'INFO');
			casper.echo('-----------------------------------delete topic by searching topic when delete own topic- disable ,delete own post-disable------------------------------' ,'INFO');
			wait.waitForElement('div.post-body.pull-left span:nth-child(2) a' , casper , function(err , isExists){
				if(isExists) {
					casper.echo('Topic is disable so cannot be deleted successfull' ,'INFO');
					wait.waitForTime(2000 , casper , function(){
						forumLoginMethod.logoutFromApp(casper, function(err){
							if (!err)
								casper.echo('Successfully logout from application', 'INFO');
						});	
					});									
				}
			});
		});
	});
	
};

//delete own post by searching post
deletePostTests.deleteOwnSearchTopicPostDis=function(){
	deletePostMethod.createTopic(casper , function(err) {
		if(!err) {
			casper.echo('Topic created successfully','INFO')
		}
		casper.thenOpen("http://beta8.websitetoolbox.com/cgi/members/cloudsearch_batch_changes.cgi" , function(){
		});
	});
	
	casper.then(function(){
		casper.echo('-----------------------------New post created---------------------------------------------------' ,'INFO');
     		deletePostMethod.profilePostRegister(casper , function(err) {
			if(!err)
				casper.echo('post have been created' ,'INFO');
    		});
		wait.waitForTime(4000 , casper , function(err){
			deletePostMethod.searchLoginOwn(casper , function(err) {
				if(!err)
					casper.echo('search methyod called successfully' ,'INFO');
			});
			wait.waitForTime(3000 , casper , function(){
				casper.echo('                         Testcase 40                                 ' ,'INFO');
				casper.echo('-----------------------------------delete post by searching post when delete own topic- disable ,delete own post-disable------------------------------' ,'INFO');
		
				wait.waitForElement('a#anchor_tab_show_threads' , casper , function(err , isExists){
					if(isExists) {
						casper.click('a#anchor_tab_show_posts');
						wait.waitForElement('div.post-body.pull-left span:nth-child(2) a' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('div#feed-main div:nth-child(2) div div div:nth-child(1) div a');
								casper.echo('post cannot be deleted successfull' ,'INFO');
								wait.waitForTime(2000 , casper , function(err){
									forumLoginMethod.logoutFromApp(casper, function(err){
										if (!err)
											casper.echo('Successfully logout from application', 'INFO');
									});
								});
							}
						});
					}
				});	
			});
		});
    	});
};
//-------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------"view category-------------------------------------------------
//----------------------------------------------------------delete own topic- enable---------------------------------------
//----------------------------------------------------------delete own post-enable"----------------------------------------

//Verify by delete own topic -selecting by check box 
deletePostTests.deleteOwnTopicPostEnable=function(){
	deletePostMethod.createTopic(casper , function(err) {
		casper.echo('------------------------------------------delete own topic- enable---------------------------------------' ,'INFO');
		casper.echo('------------------------------------------delete own post-enable"----------------------------------------' ,'INFO');
		if(!err) {
			casper.echo('Topic created successfully','INFO')
		}
	
	});
	//backend setting method----------------------------------
	deletePostMethod.BackEndSettingsTopicPostEnable(casper , function(err) {
		if(!err) {
			casper.echo('delete own topic and post checked','INFO')
		}
	});
	//Result correct topic cannot be deleted 
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		
		casper.echo('                   TestCase 41               ' ,'INFO');	
		casper.echo('***********Verify by delete one topic -selecting by check box ************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('ul.nav.nav-tabs li:nth-child(2) a')	
								wait.waitForElement('span.forum-title' , casper , function(err , isExists) {
									if(isExists) {
										casper.click('span.forum-title');
										wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists) {
											if(isExists) {

												casper.click('input[name="id"]');
												wait.waitForTime(1000 , casper , function(err) {
													casper.capture('1.png');
													casper.click('i.glyphicon.glyphicon-trash');
													wait.waitForTime(2000 , casper , function(){
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err)
																casper.echo('Successfully logout from application', 'INFO');
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
			}
		});
	});
};

//Verify by delete all own topic-selecting by check box 
deletePostTests.deleteAllTopicsPostEnable=function(){
	deletePostMethod.BackEndSettingsTopicPostEnable(casper , function(err) {
		if(!err) {
			casper.echo('Backend settings  successfully','INFO')
		}



	});
	deletePostMethod.createTopic(casper , function(err) {
		if(!err) {
			casper.echo('Topic created successfully','INFO')
		}
	
	});

	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 42             ' ,'INFO');	
		casper.echo('***********Verify by delete all topic-selecting by check box when-delete own topic- enable ,delete own post-enable ************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('ul.nav.nav-tabs li:nth-child(2) a')	
								wait.waitForElement('span.forum-title' , casper , function(err , isExists) {
									if(isExists) {
										casper.click('span.forum-title');
										wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists) {
											if(isExists) {
												casper.click('input[name="allbox"]');
												casper.click('i.glyphicon.glyphicon-trash');
												wait.waitForTime(2000 , casper , function(err) {
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
			}
		});
	});	
};

//verify with delete  own topic-by drop down of the topic
deletePostTests.deleteOwnTopicDropdownPostEnable=function(){
	//create topic method
	deletePostMethod.createTopic(casper , function(err) {
		if(!err) {
			casper.echo('Topic created successfully','INFO')
		}
	
	});


	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 43            ' ,'INFO');	
		casper.echo('**********verify with delete  own topic-by drop down of the topic when-delete own topic- enable ,delete own post-enable*************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....',
			
 'INFO');
						wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('form[name="posts"] a.topic-title');
								wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' , casper , function(err , isExists) {
									if(isExists) {	
										casper.click('i.glyphicon.glyphicon-chevron-down');
										wait.waitForTime(1000 , casper , function(err){
											casper.capture('d.png');
											casper.click('div[id^="post_list_"]:nth-child(1) div:nth-child(1) div ul li:nth-child(3) a');
											wait.waitForTime(2000 , casper , function(err) {
											
												forumLoginMethod.logoutFromApp(casper, function(err){
													if (!err)
														casper.echo('Successfully logout from application', 'INFO');
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

//Verify with delete own post-selecting by check box 
deletePostTests.deleteOwnPostCheckboxPostEnable=function(){
	//create topic method
	deletePostMethod.createTopic(casper , function(err) {
		if(!err) {
			casper.echo('Topic created successfully','INFO')
		}
		wait.waitForTime(3000 , casper , function(err){
			deletePostMethod.profilePostRegister(casper , function(err) {
				if(!err)
					casper.echo('post have been created' ,'INFO');
    			});
		});
	});

	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 44            ' ,'INFO');	
		casper.echo('***********verify with delete own post-selecting by check box when-delete own topic- enable ,delete own post-enable************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....',
			
 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('span.forum-title' , casper , function(err , isExists) {
									if(isExists) {	
										casper.click('span.forum-title');
										wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists) {
											if(isExists){
												casper.click('form[name="posts"] a.topic-title');
												wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' , casper , function(err , isExists) {
													if(isExists){
														var post= casper.evaluate(function(){
   															var aa=document.querySelectorAll('input[name="pid"]');
     															var a= aa.length;
    													 		var hh=aa[1].getAttribute('id');
     															return hh;
														});
														casper.echo("message :" +post,'INFO');
														casper.click('input[value="'+post+'"]');
														casper.click('input#deleteposts');
														wait.waitForTime(2000 , casper , function(err){
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
					}
				});
			}
		});
    	});	
};

//verify with delete own post-by drop down of the post
deletePostTests.deleteOwnPostDropDownOwnTopicPostEnable=function(){
	
	deletePostMethod.profilePostRegister(casper , function(err) {
		if(!err)
			casper.echo('post have been created' ,'INFO');
			wait.waitForTime(3000 , casper , function(err){
				deletePostMethod.profilePostRegister(casper , function(err) {
					if(!err)
						casper.echo('post have been created' ,'INFO');
    				});
			});
    	});
    	
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 45            ' ,'INFO');	
		casper.echo('***********verify with delete post-selecting by drop down of the post register user when-delete own topic- enable ,delete own post-enable************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....',
			
 'INFO');
						wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('form[name="posts"] a.topic-title');
								wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' , casper , function(err , isExists) {
									if(isExists) {	
										wait.waitForTime(5000 , casper , function(err) {
											casper.click('span#first_coloumn_3 div div div:nth-child(1) div a i');
											wait.waitForTime(1000 , casper , function(err){
											
												var post= casper.evaluate(function(){
   													var aa=document.querySelectorAll('a#delete_post_request');
     													var a= aa.length;
    													var hh=aa[1].getAttribute('href');
     													return hh;
												});
												casper.echo("message :" +post,'INFO');
												casper.click('a[href="'+post+'"]');
												wait.waitForTime(2000 , casper , function(err){
													forumLoginMethod.logoutFromApp(casper, function(err){
														if (!err)
															casper.echo('Successfully logout from application', 'INFO');
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

//delete  own post from own profile page
deletePostTests.deleteOwnProfilePageTopicPostEnable=function(){
	deletePostMethod.createTopic(casper , function(err) {
		if(!err) {
			casper.echo('Topic created successfully','INFO')
		}
		wait.waitForTime(2000 , casper , function(err){
			deletePostMethod.profilePostRegister(casper , function(err) {
				if(!err)
					casper.echo('post have been created' ,'INFO');
    			});
		});
	});	

	
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 46                ' ,'INFO');	
		casper.echo('***********delete post from members profile page when-delete own topic- enable ,delete own post-enable************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForTime(2000 , casper , function(err){
							wait.waitForElement('ul.nav.pull-right span.caret' , casper , function(err , isExists) {
								if(isExists) {
									casper.click('ul.nav.pull-right span.caret');
									casper.click('a#user-nav-panel-profile');
									wait.waitForElement('a#send_message', casper , function(err ,isExists) {
										if(isExists) {
											casper.click('i.glyphicon.glyphicon-chevron-down');
											var post= casper.evaluate(function(){
   												var aa=document.querySelectorAll('a#search_delete_post');
     												var a= aa.length;
    												var hh=aa[0].getAttribute('href');
     											return hh;
											});
											casper.echo("message :" +post,'INFO');
											casper.click('a[href="'+post+'"]');
											wait.waitForTime(2000 , casper , function(err){
												forumLoginMethod.logoutFromApp(casper, function(err){
													if (!err)
														casper.echo('Successfully logout from application', 'INFO');
												});
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
};

//delete  own topic by searching topic
deletePostTests.deleteOwnSearchTopicPostEnable=function(){
	deletePostMethod.BackEndSettingsTopicPostEnable(casper , function(err) {
		if(!err) {
			casper.echo('delete own topic and post checked','INFO')
		}
		wait.waitForTime(2000 , casper , function(err){
			deletePostMethod.createTopic(casper , function(err) {
				if(!err) {
					casper.echo('Topic created successfully','INFO')
				}
			});
			casper.thenOpen("http://beta8.websitetoolbox.com/cgi/members/cloudsearch_batch_changes.cgi" , function(){

			});
		});
	});
	
	casper.then(function(){
		deletePostMethod.searchlogin(casper , function(err) {
			if(!err)
				casper.echo('search method called successfully' ,'INFO');
		});
		wait.waitForTime(2000 , casper , function(err){
			casper.echo('                         Testcase 47                                ' ,'INFO');
			casper.echo('-----delete topic by searching topic when-delete own topic- enable ,delete own post-enable----------','INFO');
			wait.waitForTime(2000 , casper , function(err) {
				casper.capture('search.png');
				wait.waitForElement('div.post-body.pull-left span:nth-child(2) a' , casper , function(err, isExists){
					if(isExists){
						casper.click('input[name="id"]');
						casper.click('input[type="button"]');	
						wait.waitForTime(2000 , casper , function(err){
							forumLoginMethod.logoutFromApp(casper, function(err){
								if (!err)
									casper.echo('Successfully logout from application', 'INFO');
							});	
						});
					}
				});
			});
		});
	});
	
};

//delete own post by searching post
deletePostTests.deleteOwnSearchTopicPostEnab=function(){
	deletePostMethod.createTopic(casper , function(err) {
		if(!err) {
			casper.echo('Topic created successfully','INFO');
			casper.thenOpen("http://beta8.websitetoolbox.com/cgi/members/cloudsearch_batch_changes.cgi" , function(){

			});
		}
			
	});	
	
	casper.then(function(){
		deletePostMethod.profilePostRegister(casper , function(err) {
			if(!err)
				casper.echo('post have been created' ,'INFO');
    		});
		wait.waitForTime(2000 , casper , function(err){
			deletePostMethod.profilePostRegister(casper , function(err) {
				if(!err)
					casper.echo('post have been created' ,'INFO');
    			});
		});
    	});
	casper.then(function(){
		deletePostMethod.searchLoginOwn(casper , function(err) {
			if(!err)
				casper.echo('search methyod called successfully' ,'INFO');
		});
		wait.waitForTime(2000 , casper , function(err){
			casper.echo('                         Testcase 48                                 ' ,'INFO');
			casper.echo('-----------delete topic by searching post when-delete own topic- enable ,delete own post-enable----' ,'INFO');
			wait.waitForElement('a#anchor_tab_show_threads' , casper , function(err , isExists){
				if(isExists) {
					casper.click('a#anchor_tab_show_posts');
					wait.waitForElement('div.post-body.pull-left span:nth-child(2) a' , casper , function(err , isExists) {
						if(isExists) {
							casper.click('div#feed-main div:nth-child(2) div div div:nth-child(1) div a');

							var post= casper.evaluate(function(){
   								var aa=document.querySelectorAll('a#search_delete_post');
     								var a= aa.length;
    								var hh=aa[1].getAttribute('href');
     								return hh;
							});
							casper.echo("message :" +post,'INFO');
							casper.click('a[href="'+post+'"]');
							wait.waitForTime(2000 , casper , function(err){
								forumLoginMethod.logoutFromApp(casper, function(err){
									if (!err)
										casper.echo('Successfully logout from application', 'INFO');
								});
							});
						}
					});
				}
			});
		});
	});
};
//-----------------------------------------------------------------------------------------------------------------
//--------------------------------------Edit others topic/post as admin---------------------------------------------
//-----------------------------------------------------------------------------------------------------------------
//verify with edit topic(Post listing  page)
deletePostTests.editTopicAdmin=function(){
	deletePostMethod.createTopic(casper , function(err) {
		if(!err) {
			casper.echo('Topic created successfully','INFO')
		}
	});	

	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 49                ' ,'INFO');	
		casper.echo('*********verify with edit topic(Post listing  page) as Admin**************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(json['validInfose'].username, json['validInfose'].password, casper, function(err) {
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
												wait.waitForTime(5000 , casper , function(err) {
													
													casper.withFrame('message1_ifr', function() {
														casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
														casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
														casper.sendKeys('#tinymce', 'hdragme');
													});
													wait.waitForTime(2000 , casper ,  function(err){
														casper.click('input[type="button"]');
														wait.waitForTime(2000 , casper , function(err){
																		forumLoginMethod.logoutFromApp(casper, function(err){
																if (!err)
																	casper.echo('Successfully logout from application', 'INFO');
															});
														});
													});
												});
											} 											});
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


//verify with edit post(Post listing  page)
deletePostTests.editPostAdmin=function(){
	deletePostMethod.createTopic(casper , function(err) {
		if(!err) {
			casper.echo('Topic created successfully','INFO')
		}
		wait.waitForTime(2000 , casper , function(err){
			deletePostMethod.profilePostRegister(casper , function(err) {
				if(!err)
					casper.echo('post have been created' ,'INFO');
    			});
		});
	});
	
	//verify with edit post(Post listing  page)
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 50                ' ,'INFO');	
		casper.echo('*********verify with edit Post(Post listing  page) as Admin**************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(json['validInfose'].username, json['validInfose'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('form[name="posts"] a.topic-title');
								wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' , casper , function(err , isExists) {
									if(isExists) {
										wait.waitForElement('span#first_coloumn_2 div div div:nth-child(1) div a i' , casper , function(err) {
											if(isExists) {
												casper.click('span#first_coloumn_2 div div div:nth-child(1) div a i');
												var post= casper.evaluate(function(){
   													var aa=document.querySelectorAll('a#edit_post_request');
     														var a= aa.length;
    														var hh=aa[1].getAttribute('href');
     														return hh;
												});
												casper.echo("message :" +post,'INFO');
												casper.click('a[href="'+post+'"]');
												wait.waitForElement('input[type="button"]' , casper , function(err) {
													if(isExists) {
														wait.waitForTime(5000 , casper , function(err) {
															casper.capture('post1.png');
															casper.withFrame('message1_ifr', function() {
																casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
																casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
																casper.sendKeys('#tinymce', 'h234dragme');
															});
															wait.waitForTime(2000 , casper ,  function(err){
																casper.capture('post.png');
																casper.click('input[type="button"]');
																wait.waitForTime(2000 , casper , function(){
	forumLoginMethod.logoutFromApp(casper, function(err){
																	if (!err)
																		casper.echo('Successfully logout from application', 'INFO');
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
					}
				});
			}
		});
	});
};

//verify with edit post on profile page
deletePostTests.editPostProfilePageAdmin=function(){

	deletePostMethod.profilePostAdmin(casper , function(err) {
		if(!err)
			casper.echo('post have been created' ,'INFO');
    	});
    
	//verify with edit post(Post listing  page)
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 51                ' ,'INFO');	
		casper.echo('************verify with edit post on profile page as Admin***********','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(json['validInfose'].username, json['validInfose'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('ul.nav.pull-right span.caret' , casper , function(err , isExists) {
							if(isExists) {
									casper.click('ul.nav.pull-right span.caret');
									casper.click('a#user-nav-panel-profile');
									wait.waitForElement('a#send_message', casper , function(err ,isExists) {
										if(isExists) {
											casper.click('i.glyphicon.glyphicon-chevron-down');
											var post= casper.evaluate(function(){
   												var aa=document.querySelectorAll('a#search_edit_post');
     												var a= aa.length;
    												var hh=aa[0].getAttribute('href');
     											return hh;
											});
											casper.echo("message :" +post,'INFO');
											casper.click('a[href="'+post+'"]');
											wait.waitForElement('input[type="button"]' , casper , function(err) {
												if(isExists) {
													wait.waitForTime(10000 , casper , function(err) {
														
														casper.withFrame('message1_ifr', function() {
															casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
															casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
															casper.sendKeys('#tinymce', 'h234dragme');
														});
														wait.waitForTime(2000 , casper ,  function(err){
															casper.click('input[type="button"]');
															wait.waitForTime(2000 , casper , function(err){
															forumLoginMethod.logoutFromApp(casper, function(err){
																	if (!err)
																		casper.echo('Successfully logout from application', 'INFO');
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
				}
			});
		});
};

//edit topic by searching topic
deletePostTests.editTopicSearchAdmin=function(){
	deletePostMethod.topicCreate(casper , function(err) {
		if(!err)
			casper.echo('Topic created method called' ,'INFO');
			casper.thenOpen("http://beta8.websitetoolbox.com/cgi/members/cloudsearch_batch_changes.cgi" , function(){

			});
	});

	casper.then(function(){	
		deletePostMethod.searchlogin(casper , function(err) {
			if(!err)
				casper.echo('search method called successfully' ,'INFO');
		});
		wait.waitForTime(2000 , casper , function(err){
			casper.echo('                         Testcase 52                                 ' ,'INFO');
			casper.echo('--------------------------edit topic by searching topic as Admin------------------------------' ,'INFO');
			wait.waitForElement('a#anchor_tab_show_posts' , casper , function(err , isExists){
				if(isExists) {
					casper.click('a#anchor_tab_show_posts');
					wait.waitForElement('div.post-body.pull-left span:nth-child(2) a' ,casper , function(err , isExists) {
						if(isExists){
							casper.click('i.glyphicon.glyphicon-chevron-down');
							var post= casper.evaluate(function(){
   								var aa=document.querySelectorAll('a#search_edit_post');
     								var a= aa.length;
    								var hh=aa[0].getAttribute('href');
     								return hh;
							});
							casper.echo("message :" +post,'INFO');
							casper.click('a[href="'+post+'"]');
							wait.waitForElement('input[type="button"]' , casper , function(err) {
								if(isExists) {
									wait.waitForTime(20000 , casper , function(err) {
										casper.capture('post1.png');
										casper.withFrame('message1_ifr', function() {
											casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
											casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
											casper.sendKeys('#tinymce', 'h234dragme');
										});
									});
									wait.waitForTime(2000 , casper ,  function(err){
										casper.click('input[type="button"]');
										wait.waitForTime(2000 , casper , function(err) {
											forumLoginMethod.logoutFromApp(casper, function(err){
												if (!err)
													casper.echo('Successfully logout from application', 'INFO');
											});
										});
									});
								}
							});	
						}
					});											
				}
			});
		});
	});
};

//edit post by searching post
deletePostTests.editPostSearchAdmin=function(){
	casper.then(function(){
		casper.echo('-----------------------------New post created---------------------------------------------------' ,'INFO');
     		deletePostMethod.profilePostRegister(casper , function(err) {
			if(!err)
				casper.echo('post have been created' ,'INFO');
    		});
    	});

	casper.then(function(){
		casper.echo('-----------------------------2nd New post created---------------------------------------------------' ,'INFO');
     		deletePostMethod.profilePostRegister(casper , function(err) {
			if(!err)
				casper.echo('post have been created' ,'INFO');
    		});
    	});







	casper.thenOpen("http://beta8.websitetoolbox.com/cgi/members/cloudsearch_batch_changes.cgi" , function(){

	});

	deletePostMethod.searchLoginOwn(casper , function(err) {
		if(!err)
			casper.echo('search method called successfully' ,'INFO');
	});	
	casper.then(function(){
		casper.echo('                         Testcase 53                                 ' ,'INFO');
		casper.echo('-----------------------------------edit post by searching post as Admin------------------------------' ,'INFO');
		
		
			wait.waitForElement('a#anchor_tab_show_posts' , casper , function(err , isExists){
				if(isExists) {
					casper.click('a#anchor_tab_show_posts');
					wait.waitForElement('div.post-body.pull-left span:nth-child(2) a' ,casper , function(err , isExists) {
						if(isExists){
							casper.click('i.glyphicon.glyphicon-chevron-down');
							var post= casper.evaluate(function(){
   								var aa=document.querySelectorAll('a#search_edit_post');
     								var a= aa.length;
    								var hh=aa[0].getAttribute('href');
     								return hh;
							});
							casper.echo("message :" +post,'INFO');
							casper.click('a[href="'+post+'"]');
							wait.waitForElement('input[type="button"]' , casper , function(err) {
								if(isExists) {
									wait.waitForTime(20000 , casper , function(err) {
										casper.capture('post1.png');
										casper.withFrame('message1_ifr', function() {
											casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
											casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
											casper.sendKeys('#tinymce', 'h234dragme');
										});
									});
									wait.waitForTime(2000 , casper ,  function(err){
										casper.capture('post.png');
										casper.click('input[type="button"]');
										casper.then(function() {
											forumLoginMethod.logoutFromApp(casper, function(err){
												if (!err)
													casper.echo('Successfully logout from application', 'INFO');
											});
										});	
									});
								}
							});	
						}
					});											
				}
			});
		});
};
//edit on search listing page by people who posted
deletePostTests.editPostPeoplePosted=function(){
	casper.thenOpen( config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                         Testcase 54                                ' ,'INFO');
		casper.echo('-------------------------edit on search listing page by people who posted as Admin----------------------------' ,'INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(json['validInfose'].username, json['validInfose'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists){
							if(isExists) {
								casper.click('span[data-original-title="Posts"]');
								wait.waitForElement('span.badge' ,casper , function(err , isExists) {
									if(isExists){
										casper.click('span.badge');
										wait.waitForElement('div.post-body.pull-left span:nth-child(2) a' , casper , function(err , isExists) {
											if(isExists) {
												casper.click('i.glyphicon.glyphicon-chevron-down');
												var post= casper.evaluate(function(){
   													var aa=document.querySelectorAll('a#search_edit_post');
     														var a= aa.length;
    														var hh=aa[0].getAttribute('href');
     													return hh;
												});
												casper.echo("message :" +post,'INFO');
												casper.click('a[href="'+post+'"]');
												wait.waitForElement('input[type="button"]' , casper , function(err) {
													if(isExists) {
														wait.waitForTime(20000 , casper , function(err) {
															casper.capture('post1.png');
															casper.withFrame('message1_ifr', function() {
																casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
																casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
																casper.sendKeys('#tinymce', 'h234dragme');
															});
														});
														wait.waitForTime(2000 , casper ,  function(err){
															casper.capture('post.png');
															casper.click('input[type="button"]');
															casper.then(function() {
															forumLoginMethod.logoutFromApp(casper, function(err){
																if (!err)
																	casper.echo('Successfully logout from application', 'INFO');
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
					}
				});
			}
		});
	});	
};
//-------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------Edit own topic/post as register(edit own topic enable)--------------------------------------------------------------------------------------------------------------------------------------------		
//verify with edit own  topic(Post listing  page)
deletePostTests.editTopicregister=function(){
	deletePostMethod.BackEndSettingsEditOwnTopicEnable(casper , function(err) {
		if(!err)
			casper.echo('Successfully checked' ,'INFO');
	});
	
	casper.thenOpen(config.url , function(){
		casper.echo('-----------New topic created Method called-------------' , 'INFO');
			
		inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
			if (err) {
				casper.echo("Error occurred in callback user not logged-in", "ERROR");	
			}else {
				casper.echo('Processing to Login on forum.....','INFO');
				casper.waitForSelector('form[name="posts"] a.topic-title' , function success(){
					casper.test.assertExists('form[name="posts"] a.topic-title','Topic found');
					casper.click('span.topic-content a');
					wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' , casper , function(err , isExists){
						if(isExists) {
							casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
						}
					});						
				},function fail() {
					casper.echo('Failed block called','INFO');
					wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
						if(isExists) {
							//method to create a new topic
							uploadMethods.startTopic(json['newTopic'], casper, function(err) {
								if(!err) {
									casper.echo('new topic created', 'INFO');
								}else {
									casper.echo('Topic not created', 'INFO');
								}
							});
						} else {
							casper.echo('User icon not found','ERROR');	
						}
					});
				});
				casper.then(function() {
					inContextLoginMethod.logoutFromApp(casper, function(err){
						if (!err)
							casper.echo('Successfully logout from application', 'INFO');
					});
				});	
			}
		});
     	});
	
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 55                ' ,'INFO');	
		casper.echo('*********verify with edit topic(Post listing  page) register when edit own topic enable**************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
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
											
										//casper.click('edit_post_request');	
										wait.waitForElement('input[type="button"]' , casper , function(err) {
											if(isExists) {
												wait.waitForTime(5000 , casper , function(err) {
													casper.capture('7.png');
													casper.withFrame('message1_ifr', function() {
														casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
														casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
														casper.sendKeys('#tinymce', 'hdragme');
													});
													wait.waitForTime(2000 , casper ,  function(err){
														casper.capture('hel.png');
														casper.click('input[type="button"]');
														casper.then(function() {
															inContextLoginMethod.logoutFromApp(casper, function(err){
																if (!err)
																	casper.echo('Successfully logout from application', 'INFO');
															});
														});	
														
													});
												});	
											}
										}); 										}
								});
							}
						});	
					}
				});
			}
		});
	});
};

//verify with edit own  post(Post listing  page)
deletePostTests.editPostregister=function(){
	deletePostMethod.BackEndSettingsEditOwnTopicEnable(casper , function(err) {
		if(!err)
			casper.echo('Successfully checked' ,'INFO');
	});
	
	casper.thenOpen(config.url , function(){
		casper.echo('-----------New topic created Method called-------------' , 'INFO');
			
		inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
			if (err) {
				casper.echo("Error occurred in callback user not logged-in", "ERROR");	
			}else {
				casper.echo('Processing to Login on forum.....','INFO');
				casper.waitForSelector('form[name="posts"] a.topic-title' , function success(){
					casper.test.assertExists('form[name="posts"] a.topic-title','Topic found');
					casper.click('span.topic-content a');
					wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' , casper , function(err , isExists){
						if(isExists) {
							casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
						}
					});						
				},function fail() {
					casper.echo('Failed block called','INFO');
					wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
						if(isExists) {
							//method to create a new topic
							uploadMethods.startTopic(json['newTopic'], casper, function(err) {
								if(!err) {
									casper.echo('new topic created', 'INFO');
								}else {
									casper.echo('Topic not created', 'INFO');
								}
							});
						} else {
							casper.echo('User icon not found','ERROR');	
						}
					});
				});
				casper.then(function() {
					inContextLoginMethod.logoutFromApp(casper, function(err){
						if (!err)
							casper.echo('Successfully logout from application', 'INFO');
					});
				});	
			}
		});
     	});
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 56                ' ,'INFO');	
		casper.echo('*********verify with edit topic(Post listing  page) register when edit own topic enable**************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				inContextLoginMethod.loginToApp(json['validInfose'].username, json['validInfose'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('form[name="posts"] a.topic-title');
								wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' , casper , function(err , isExists) {
									if(isExists) {
										casper.click('span#first_coloumn_2 div div div:nth-child(1) div a i');
										var post= casper.evaluate(function(){
   											var aa=document.querySelectorAll('a#edit_post_request');
     												var a= aa.length;
    												var hh=aa[1].getAttribute('href');
     												return hh;
											});
											casper.echo("message :" +post,'INFO');
											casper.click('a[href="'+post+'"]');
											wait.waitForElement('input[type="button"]' , casper , function(err) {
												if(isExists) {
													wait.waitForTime(5000 , casper , function(err) {
														casper.capture('post1.png');
														casper.withFrame('message1_ifr', function() {
															casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
															casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
															casper.sendKeys('#tinymce', 'h234dragme');
														});
														wait.waitForTime(2000 , casper ,  function(err){
															casper.capture('post.png');
															casper.click('input[type="button"]');
															casper.then(function() {
															inContextLoginMethod.logoutFromApp(casper, function(err){
																if (!err)
																	casper.echo('Successfully logout from application', 'INFO');
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
				}
			});
		
	});	
};

//verify with edit own  post on profile page

deletePostTests.editProfilePageregister=function(){

	casper.then(function(){
		casper.echo('-----------------------------New post created---------------------------------------------------' ,'INFO');
     		deletePostMethod.profilePostRegister(casper , function(err) {
			if(!err)
				casper.echo('post have been created' ,'INFO');
    		});
    	});	
	//verify with edit post(Post listing  page)
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 57                ' ,'INFO');	
		casper.echo('************verify with edit post on profile page  register when edit own topic enable***********','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('ul.nav.pull-right span.caret' , casper , function(err , isExists) {
							if(isExists) {
									casper.click('ul.nav.pull-right span.caret');
									casper.click('a#user-nav-panel-profile');
									wait.waitForElement('a#send_message', casper , function(err ,isExists) {
										if(isExists) {
											casper.click('i.glyphicon.glyphicon-chevron-down');
											var post= casper.evaluate(function(){
   												var aa=document.querySelectorAll('a#search_edit_post');
     												var a= aa.length;
    												var hh=aa[0].getAttribute('href');
     											return hh;
											});
											casper.echo("message :" +post,'INFO');
											casper.click('a[href="'+post+'"]');
											wait.waitForElement('input[type="button"]' , casper , function(err) {
												if(isExists) {
													wait.waitForTime(20000 , casper , function(err) {
														casper.capture('post1.png');
														casper.withFrame('message1_ifr', function() {
															casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
															casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
															casper.sendKeys('#tinymce', 'h234dragme');
														});
														wait.waitForTime(2000 , casper ,  function(err){
															casper.capture('post.png');
															casper.click('input[type="button"]');
															casper.then(function() {
															inContextLoginMethod.logoutFromApp(casper, function(err){
																if (!err)
																	casper.echo('Successfully logout from application', 'INFO');
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
				}
			});
		});
};

//edit topic by searching own topic
deletePostTests.editSearchTopicRegister=function(){
	casper.thenOpen(config.url , function(){
		casper.echo('-----------New topic created Method called-------------' , 'INFO');
			
		inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
			if (err) {
				casper.echo("Error occurred in callback user not logged-in", "ERROR");	
			}else {
				casper.echo('Processing to Login on forum.....','INFO');
				casper.waitForSelector('form[name="posts"] a.topic-title' , function success(){
					casper.test.assertExists('form[name="posts"] a.topic-title','Topic found');
					casper.click('span.topic-content a');
					wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' , casper , function(err , isExists){
						if(isExists) {
							casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
						}
					});						
				},function fail() {
					casper.echo('Failed block called','INFO');
					wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
						if(isExists) {
							//method to create a new topic
							uploadMethods.startTopic(json['newTopic'], casper, function(err) {
								if(!err) {
									casper.echo('new topic created', 'INFO');
								}else {
									casper.echo('Topic not created', 'INFO');
								}
							});
						} else {
							casper.echo('User icon not found','ERROR');	
						}
					});
				});
				casper.then(function() {
					inContextLoginMethod.logoutFromApp(casper, function(err){
						if (!err)
							casper.echo('Successfully logout from application', 'INFO');
					});
				});	
			}
		});
     	});

	casper.thenOpen("http://beta8.websitetoolbox.com/cgi/members/cloudsearch_batch_changes.cgi" , function(){

	});





		
	deletePostMethod.searchlogin(casper , function(err) {
		if(!err)
			casper.echo('search method called successfully' ,'INFO');
	});		
	casper.then(function(){
		casper.echo('                         Testcase 58                                 ' ,'INFO');
		casper.echo('-----------------------------------edit topic by searching topic  register when edit own topic enable------------------------------' ,'INFO');
		
		
			wait.waitForElement('a#anchor_tab_show_posts' , casper , function(err , isExists){
				if(isExists) {
					casper.click('a#anchor_tab_show_posts');
					wait.waitForElement('div.post-body.pull-left span:nth-child(2) a' ,casper , function(err , isExists) {
						if(isExists){
							casper.click('i.glyphicon.glyphicon-chevron-down');
							
							//casper.click('div.post-body.pull-left span:nth-child(2) a');
							//wait.waitForElement('' , casper , function(err , isExists) {
							//if(isExists){
							var post= casper.evaluate(function(){
   								var aa=document.querySelectorAll('a#search_edit_post');
     									var a= aa.length;
    									var hh=aa[0].getAttribute('href');
     									return hh;
								});
								casper.echo("message :" +post,'INFO');
								casper.click('a[href="'+post+'"]');
								wait.waitForElement('input[type="button"]' , casper , function(err) {
									if(isExists) {
									wait.waitForTime(20000 , casper , function(err) {
										casper.capture('post1.png');
										casper.withFrame('message1_ifr', function() {
											casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
											casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
											casper.sendKeys('#tinymce', 'h234dragme');
										});
									});
									wait.waitForTime(2000 , casper ,  function(err){
										casper.capture('post.png');
										casper.click('input[type="button"]');
										casper.then(function() {
											inContextLoginMethod.logoutFromApp(casper, function(err){
												if (!err)
													casper.echo('Successfully logout from application', 'INFO');
											});
										});	
									});
								}
							});	
						}
					});											
				}
			});
			
		
		
	});

};

//edit post by searching post as register (edit own topic enable)
deletePostTests.editSearchPostRegister=function(){

	casper.then(function(){
		casper.echo('-----------------------------New post created---------------------------------------------------' ,'INFO');
     		deletePostMethod.profilePostRegister(casper , function(err) {
			if(!err)
				casper.echo('post have been created' ,'INFO');
    		});
    	});
	
	casper.then(function(){
		casper.echo('-----------------------------2nd New post created---------------------------------------------------' ,'INFO');
     		deletePostMethod.profilePostRegister(casper , function(err) {
			if(!err)
				casper.echo('post have been created' ,'INFO');
    		});
    	});




	casper.thenOpen("http://beta8.websitetoolbox.com/cgi/members/cloudsearch_batch_changes.cgi" , function(){

	});



	

				
	deletePostMethod.searchLoginOwn(casper , function(err) {
		if(!err)
			casper.echo('search method called successfully' ,'INFO');
	});	
	casper.then(function(){
		casper.echo('                         Testcase 59                                 ' ,'INFO');
		casper.echo('-----------------------------------edit post by searching post ------------------------------' ,'INFO');
		
		
			wait.waitForElement('a#anchor_tab_show_posts' , casper , function(err , isExists){
				if(isExists) {
					casper.click('a#anchor_tab_show_posts');
					wait.waitForElement('div.post-body.pull-left span:nth-child(2) a' ,casper , function(err , isExists) {
						if(isExists){
							casper.click('div#feed-main div:nth-child(2) div div div:nth-child(1) div a');
							var post= casper.evaluate(function(){
   								var aa=document.querySelectorAll('a#search_edit_post');
     								var a= aa.length;
    								var hh=aa[1].getAttribute('href');
     								return hh;
							});
							casper.echo("message :" +post,'INFO');
							casper.click('a[href="'+post+'"]');
							wait.waitForElement('input[type="button"]' , casper , function(err) {
								if(isExists) {
									wait.waitForTime(20000 , casper , function(err) {
										casper.capture('post1.png');
										casper.withFrame('message1_ifr', function() {
											casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
											casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
											casper.sendKeys('#tinymce', 'h234dragme');
										});
									});
									wait.waitForTime(2000 , casper ,  function(err){
										casper.capture('post.png');
										casper.click('input[type="button"]');
										casper.then(function() {
											inContextLoginMethod.logoutFromApp(casper, function(err){
												if (!err)
													casper.echo('Successfully logout from application', 'INFO');
											});
										});	
									});
								}
							});	
						}
					});											
				}
			});
			
		
		
	});
};


//edit on search listing page by people who posted
deletePostTests.editSearchPeoplePostedRegister=function() {
	casper.thenOpen( config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                         Testcase 60                                ' ,'INFO');
		casper.echo('-------------------------edit on search listing page by people who posted  register when edit own topic enable----------------------------' ,'INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists){
							if(isExists) {
								casper.click('span[data-original-title="Posts"]');
								wait.waitForElement('span.badge' ,casper , function(err , isExists) {
									if(isExists){
										casper.click('span.badge');
										wait.waitForElement('div.post-body.pull-left span:nth-child(2) a' , casper , function(err , isExists) {
											if(isExists) {
												casper.click('i.glyphicon.glyphicon-chevron-down');
												var post= casper.evaluate(function(){
   													var aa=document.querySelectorAll('a#search_edit_post');
     														var a= aa.length;
    														var hh=aa[0].getAttribute('href');
     													return hh;
												});
												casper.echo("message :" +post,'INFO');
												casper.click('a[href="'+post+'"]');
												wait.waitForElement('input[type="button"]' , casper , function(err) {
													if(isExists) {
														wait.waitForTime(20000 , casper , function(err) {
															casper.capture('post1.png');
															casper.withFrame('message1_ifr', function() {
																casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
																casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
																casper.sendKeys('#tinymce', 'h234dragme');
															});
														});
														wait.waitForTime(2000 , casper ,  function(err){
															casper.capture('post.png');
															casper.click('input[type="button"]');
															casper.then(function() {
															inContextLoginMethod.logoutFromApp(casper, function(err){
																if (!err)
																	casper.echo('Successfully logout from application', 'INFO');
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
					}
				});
			}
		});
	});		
};


//**********************************Edit own topic/post as register(edit own topic/post disable)*****************************************
//verify with edit own  topic(Post listing  page)
deletePostTests.editTopicPostDisable=function(){
	deletePostMethod.BackEndSettingsEditOwnTopicDisable(casper , function(err) {
		if(!err)
			casper.echo('Successfully checked' ,'INFO');
	});
	
	casper.thenOpen(config.url , function(){
		casper.echo('-----------New topic created Method called-------------' , 'INFO');
			
		inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
			if (err) {
				casper.echo("Error occurred in callback user not logged-in", "ERROR");	
			}else {
				casper.echo('Processing to Login on forum.....','INFO');
				casper.waitForSelector('form[name="posts"] a.topic-title' , function success(){
					casper.test.assertExists('form[name="posts"] a.topic-title','Topic found');
					casper.click('span.topic-content a');
					wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' , casper , function(err , isExists){
						if(isExists) {
							casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
						}
					});						
				},function fail() {
					casper.echo('Failed block called','INFO');
					wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
						if(isExists) {
							//method to create a new topic
							uploadMethods.startTopic(json['newTopic'], casper, function(err) {
								if(!err) {
									casper.echo('new topic created', 'INFO');
								}else {
									casper.echo('Topic not created', 'INFO');
								}
							});
						} else {
							casper.echo('User icon not found','ERROR');	
						}
					});
				});
				casper.then(function() {
					inContextLoginMethod.logoutFromApp(casper, function(err){
						if (!err)
							casper.echo('Successfully logout from application', 'INFO');
					});
				});	
			}
		});
     	});
	
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 61                ' ,'INFO');	
		casper.echo('*********verify with edit topic(Post listing  page) as register when (edit own topic/post disable)**************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
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
										 										}
									casper.then(function() {
										inContextLoginMethod.logoutFromApp(casper, function(err){
											if (!err)
												casper.echo('Successfully logout from application', 'INFO');
										});
									});	
								});
							}
						});	
					}
				});
			}
		});
	});
};


//verify with edit own  post(Post listing  page)
deletePostTests.editPostDisable=function(){
	deletePostMethod.BackEndSettingsEditOwnTopicEnable(casper , function(err) {
		if(!err)
			casper.echo('Successfully checked' ,'INFO');
	});
	
	casper.thenOpen(config.url , function(){
		casper.echo('-----------New topic created Method called-------------' , 'INFO');
			
		inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
			if (err) {
				casper.echo("Error occurred in callback user not logged-in", "ERROR");	
			}else {
				casper.echo('Processing to Login on forum.....','INFO');
				casper.waitForSelector('form[name="posts"] a.topic-title' , function success(){
					casper.test.assertExists('form[name="posts"] a.topic-title','Topic found');
					casper.click('span.topic-content a');
					wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' , casper , function(err , isExists){
						if(isExists) {
							casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
						}
					});						
				},function fail() {
					casper.echo('Failed block called','INFO');
					wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
						if(isExists) {
							//method to create a new topic
							uploadMethods.startTopic(json['newTopic'], casper, function(err) {
								if(!err) {
									casper.echo('new topic created', 'INFO');
								}else {
									casper.echo('Topic not created', 'INFO');
								}
							});
						} else {
							casper.echo('User icon not found','ERROR');	
						}
					});
				});
				casper.then(function() {
					inContextLoginMethod.logoutFromApp(casper, function(err){
						if (!err)
							casper.echo('Successfully logout from application', 'INFO');
					});
				});	
			}
		});
     	});
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 62                ' ,'INFO');	
		casper.echo('*********verify with edit topic(Post listing  page) as register when (edit own topic/post disable**************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('form[name="posts"] a.topic-title');
								wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' , casper , function(err , isExists) {
									if(isExists) {
										casper.click('span#first_coloumn_2 div div div:nth-child(1) div a i');
										casper.then(function() {
																																								       												inContextLoginMethod.logoutFromApp(casper, function(err){
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
		
//verify with edit own  post on profile page
deletePostTests.editProfilePagePostDisable=function(){

	/*casper.then(function(){
		casper.echo('-----------------------------New post created---------------------------------------------------' ,'INFO');
     		deletePostMethod.profilePostRegister(casper , function(err) {
			if(!err)
				casper.echo('post have been created' ,'INFO');
    		});
    	});*/	
	//verify with edit post(Post listing  page)
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 63                ' ,'INFO');	
		casper.echo('************verify with edit post on profile page as register when (edit own topic/post disable***********','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('ul.nav.pull-right span.caret' , casper , function(err , isExists) {
							if(isExists) {
									casper.click('ul.nav.pull-right span.caret');
									casper.click('a#user-nav-panel-profile');
									wait.waitForElement('a#send_message', casper , function(err ,isExists) {
										if(isExists) {
											casper.click('i.glyphicon.glyphicon-chevron-down');
											casper.then(function() {
																																															      													inContextLoginMethod.logoutFromApp(casper, function(err){
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

//edit topic by searching own topic
deletePostTests.editSearchTopicPostDisable=function(){

	deletePostMethod.BackEndSettingsEditOwnTopicDisable(casper , function(err) {
		if(!err)
			casper.echo('Successfully checked' ,'INFO');
	});
	





	/*casper.thenOpen(config.url , function(){
		casper.echo('-----------New topic created Method called-------------' , 'INFO');
			
		inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
			if (err) {
				casper.echo("Error occurred in callback user not logged-in", "ERROR");	
			}else {
				casper.echo('Processing to Login on forum.....','INFO');
				casper.waitForSelector('form[name="posts"] a.topic-title' , function success(){
					casper.test.assertExists('form[name="posts"] a.topic-title','Topic found');
					casper.click('span.topic-content a');
					wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' , casper , function(err , isExists){
						if(isExists) {
							casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
						}
					});						
				},function fail() {
					casper.echo('Failed block called','INFO');
					wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
						if(isExists) {
							//method to create a new topic
							uploadMethods.startTopic(json['newTopic'], casper, function(err) {
								if(!err) {
									casper.echo('new topic created', 'INFO');
								}else {
									casper.echo('Topic not created', 'INFO');
								}
							});
						} else {
							casper.echo('User icon not found','ERROR');	
						}
					});
				});
				casper.then(function() {
					inContextLoginMethod.logoutFromApp(casper, function(err){
						if (!err)
							casper.echo('Successfully logout from application', 'INFO');
					});
				});	
			}
		});
     	});*/
	casper.thenOpen("http://beta8.websitetoolbox.com/cgi/members/cloudsearch_batch_changes.cgi" , function(){

	});




		
	deletePostMethod.searchlogin(casper , function(err) {
		casper.echo('--------------------------Searchlogin method called----------------------------------' ,'INFO');
		if(!err)
			casper.echo('search method called successfully' ,'INFO');
	});		
	casper.then(function(){
		casper.echo('                         Testcase 64                                ' ,'INFO');
		casper.echo('-----------------------------------delete topic by searching topic as register when (edit own topic/post disable------------------------------' ,'INFO');
		wait.waitForElement('a#anchor_tab_show_posts' , casper , function(err , isExists){
			if(isExists) {
				casper.click('a#anchor_tab_show_posts');
				wait.waitForElement('div.post-body.pull-left span:nth-child(2) a' ,casper , function(err , isExists) {
					if(isExists){
						casper.echo('Topic cannot be deleted' ,'INFO');
							
					}
				});											
			}
		});
	});

};

deletePostTests.editSearchTopicPostDisable=function(){
	
	casper.thenOpen("http://beta8.websitetoolbox.com/cgi/members/cloudsearch_batch_changes.cgi" , function(){

	});
	casper.then(function() {
		deletePostMethod.searchLoginOwn(casper , function(err) {
			if(!err)
				casper.echo('search method called successfully' ,'INFO');
		});
	});	
	casper.then(function(){
		casper.echo('                         Testcase 59                                 ' ,'INFO');
		casper.echo('-----------------------------------edit post by searching post ------------------------------' ,'INFO');
		
		
			wait.waitForElement('a#anchor_tab_show_posts' , casper , function(err , isExists){
				if(isExists) {
					casper.click('a#anchor_tab_show_posts');
					wait.waitForElement('div.post-body.pull-left span:nth-child(2) a' ,casper , function(err , isExists) {
						if(isExists){
							casper.click('div#feed-main div:nth-child(2) div div div:nth-child(1) div a');
							casper.echo('Post cannot be deleted' ,'INFO');
							/*var post= casper.evaluate(function(){
   								var aa=document.querySelectorAll('a#search_edit_post');
     								var a= aa.length;
    								var hh=aa[1].getAttribute('href');
     								return hh;
							});
							casper.echo("message :" +post,'INFO');
							casper.click('a[href="'+post+'"]');
							wait.waitForElement('input[type="button"]' , casper , function(err) {
								if(isExists) {
									wait.waitForTime(20000 , casper , function(err) {
										casper.capture('post1.png');
										casper.withFrame('message1_ifr', function() {
											casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
											casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
											casper.sendKeys('#tinymce', 'h234dragme');
										});
									});
									wait.waitForTime(2000 , casper ,  function(err){
										casper.capture('post.png');
										casper.click('input[type="button"]');
										casper.then(function() {
											inContextLoginMethod.logoutFromApp(casper, function(err){
												if (!err)
													casper.echo('Successfully logout from application', 'INFO');
											});
										});	
									});
								}
							});*/	
						}
					});											
				}
			});
			
		
		
	});
};


//edit on search listing page by people who posted
deletePostTests.editSearchPeoplePostedEditPostDisable=function() {
	casper.thenOpen( config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                         Testcase 65                                ' ,'INFO');
		casper.echo('-------------------------edit on search listing page by people who posted as register when (edit own topic/post disable----------------------------' ,'INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists){
							if(isExists) {
								casper.click('span[data-original-title="Posts"]');
								wait.waitForElement('span.badge' ,casper , function(err , isExists) {
									if(isExists){
										casper.click('span.badge');
										wait.waitForElement('div.post-body.pull-left span:nth-child(2) a' , casper , function(err , isExists) {
											if(isExists) {
												casper.click('i.glyphicon.glyphicon-chevron-down');
												casper.then(function() {
																																																								   														inContextLoginMethod.logoutFromApp(casper, function(err){
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
			}
		});
	});		
};


