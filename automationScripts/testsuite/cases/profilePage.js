var json = require('../../testdata/inContextLogin.json');
var config = require('../../../config/config.json');
var inContextLoginMethod = require('../methods/inContextLogin.js');
var loginPrivacyOptionMethod = require('../methods/loginByPrivacyOption.js');
var profilePageMethod= require('../methods/profilePage.js');
var utils=require('../utils.js');
var profilePageTests = module.exports = {};
var wait=require('../wait.js');

//Verify with sending message by message button.

profilePageTests.profilePageMessageButton=function(){
	casper.echo('*********************Verify with sending message by message button.**********************','INFO');
	loginPrivacyOptionMethod.loginToForumBackEnd(casper , function(err) {
		if (!err)
			casper.echo('LoggedIn to forum backend....', 'INFO');
	});
	wait.waitForElement('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', casper , function(err, isExists) {
		if(isExists) {
			casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
			casper.evaluate(function() {
				document.querySelector('div#ddSettings  div a:nth-child(2)').click();
			});
			wait.waitForElement('button.button.btn-m.btn-blue' , casper , function(err , isExists) {
				if(isExists) {
					utils.enableorDisableCheckbox('allow_pm',true, casper, function(err) {
						if(!err)
							casper.echo('Successfully checked','INFO');
					});
					casper.click('button.button.btn-m.btn-blue');
					casper.thenOpen(config.url , function() {
						casper.echo("Title of the page :"+this.getTitle(), 'INFO');	
						inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
							if (err) {
								casper.echo("Error occurred in callback user not logged-in", "ERROR");
							}else {
								casper.echo('Processing to Login on forum.....', 'INFO');

								wait.waitForTime(1000 , casper , function(err) {
					
									wait.waitForElement('ul.nav.pull-right span.caret' , casper , function(err , isExists) {
										if(isExists) {
											casper.click('ul.nav.pull-right span.caret');
											casper.capture('111.png');
											casper.click(' ul.dropdown-menu span:nth-child(2)  li:nth-child(2) a');
											
											wait.waitForElement('a#send_message', casper , function(err ,isExists) {
												if(isExists) {
													casper.click('a#send_message');
													casper.wait(1000,function(){

														casper.capture('sit.png');

													});										
													wait.waitForElement('a#send_pmsg_button' ,casper ,function(err ,isExists) {
														if(isExists) {
															profilePageMethod.fillDataToMessage(casper, function(err) {
																if(!err)
																	casper.echo('Data fill successfully','INFO');		
																});
															casper.echo('Processing to Login on forum.....', 'INFO');
															wait.waitForTime(1000 , casper ,function(err) {
																			wait.waitForElement('ul.nav.pull-right span.caret', casper ,function(err ,isExists){
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

							}
						});
					});
				}
			});
		}
    	});
};

//All Post tab for own profile page

profilePageTests.profilePageSendFile=function(){
	casper.thenOpen(config.url , function() {
		casper.echo('******************verify with send attached file by message.************************','INFO');
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
			if (err) {
				casper.echo("Error occurred in callback user not logged-in", "ERROR");
			}else {
				casper.echo('Processing to Login on forum.....', 'INFO');
				wait.waitForElement('ul.nav.pull-right span.caret' , casper , function(err , isExists) {
					if(isExists) {
						casper.click('ul.nav.pull-right span.caret');
						casper.click('a#user-nav-panel-profile');
						wait.waitForElement('a#send_message', casper , function(err ,isExists) {
							if(isExists) {
								casper.click('a#send_message');
								wait.waitForVisible('a#send_pmsg_button' ,casper ,function(err ,isExists) {
									if(isExists) {
										profilePageMethod.fillDataToMessage(casper, function(err) {
											if(!err)
												casper.echo('Data fill successfully','INFO');	
										});
										wait.waitForTime(1000 , casper ,function(err) {
																			wait.waitForElement('ul.nav.pull-right span.caret', casper ,function(err ,isExists){
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
		});
	};



//Verify with sending message by message button when message permission is disable from back end

profilePageTests.profilePageMessageButtonRemove=function(){
	casper.thenOpen(config.backEndUrl , function() {
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('****Verify with sending message by message button when message permission is disable from back end**','INFO');
		loginPrivacyOptionMethod.loginToForumBackEnd(casper , function(err) {
			if (!err)
				casper.echo('LoggedIn to forum backend....', 'INFO');
		});
		wait.waitForElement('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', casper , function(err, isExists) {
			if(isExists) {
				casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
				casper.evaluate(function() {
					document.querySelector('div#ddSettings  div a:nth-child(2)').click();
				});
				wait.waitForElement('button.button.btn-m.btn-blue' , casper , function(err , isExists) {
					utils.enableorDisableCheckbox('allow_pm',false, casper, function(err) {
						if(!err)
							casper.echo('Successfully unchecked','INFO');
					});
					casper.click('button.button.btn-m.btn-blue');
					casper.thenOpen(config.url , function() {
						inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
							if (err) {
								casper.echo("Error occurred in callback user not logged-in", "ERROR");
							}else {	
								casper.echo('Processing to Login on forum.....', 'INFO');
							
								wait.waitForTime(1000 , casper ,function(err) {
																					wait.waitForElement('ul.nav.pull-right span.caret', casper ,function(err ,isExists){
	if(isExists) {
			casper.click('a#user-nav-panel-profile');	

	inContextLoginMethod.logoutFromApp(casper, function(err){
		if (!err)
			casper.echo('Successfully logout from application', 'INFO');
	});
		}
	
																});												

								});
							}
						});
					});
				});
			}
		});
	});
};



//Verify all post tab before start a topic/or post.

profilePageTests.profilePageAllPostTab=function(){
	casper.thenOpen(config.url,function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('Verify all post tab before start a topic/or post.','INFO');	
		inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
			if (err) {
				casper.echo("Error occurred in callback user not logged-in", "ERROR");
			}else {
				casper.echo('Processing to Login on forum.....', 'INFO');
				wait.waitForTime(1000 , casper ,function(err) {
					wait.waitForElement('ul.nav.pull-right span.caret', casper ,function(err ,isExists){
						if(isExists) {
							casper.click('a#user-nav-panel-profile');	
							wait.waitForElement('a#emailMember' , casper , function(err , isExists) {
								if(isExists) {
									casper.click('a#PostsOFUser');
									inContextLoginMethod.logoutFromApp(casper, function(err){
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
	});
};


//Verify with All post tab after start a topic/post all post clickable

profilePageTests.profilePageAllPostTabclick=function(){
	casper.thenOpen(config.url,function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');	
		casper.echo('Verify all post tab before start a topic/or post on topic listing.','INFO');
		inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
			if (err) {
				casper.echo("Error occurred in callback user not logged-in", "ERROR");
		}	else {
				casper.echo('Processing to Login on forum.....', 'INFO');
				wait.waitForTime(1000 , casper ,function(err) {
					wait.waitForElement('ul.nav.pull-right span.caret', casper ,function(err ,isExists){
						if(isExists) {
							casper.click('a#user-nav-panel-profile');	
							wait.waitForElement('a#emailMember' , casper , function(err , isExists) {
								if(isExists) {
									casper.click('a#PostsOFUser');
								
									inContextLoginMethod.logoutFromApp(casper, function(err){
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
	});
};


//Verify with All post tab after delete a topic/post

profilePageTests.profilePageAllPostTabDelete=function(){
	casper.thenOpen(config.url,function(){	
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');	
		casper.echo('Verify with All post tab after delete a topic/post.','INFO');
		inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
			if (err) {
				casper.echo("Error occurred in callback user not logged-in", "ERROR");
		}	else {
				casper.echo('Processing to Login on forum.....', 'INFO');
				wait.waitForTime(1000 , casper ,function(err) {
					wait.waitForElement('ul.nav.pull-right span.caret', casper ,function(err ,isExists){
						if(isExists) {
							casper.click('a#topic_8915312');
							wait.waitForElement('i.glyphicon.glyphicon-chevron-down', casper , function(err , isExists) {
								if(isExists)	{
									
									casper.click('a#posttoggle_34272622 i');
									casper.click('a#delete_post_request');
									casper.click('ul.nav.pull-right span.caret');
									casper.click('a#user-nav-panel-profile');
									wait.waitForElement('a#emailMember', casper ,function(err ,isExists) {
										if(isExists) {
											casper.click('a#PostsOFUser');
											casper.wait(1000,function(){
												casper.capture('post.png');

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

//Verify with All post tab after edit a topic/post on topic listing page
/*profilePageTests.profilePageEditTopic=function(){
	casper.thenOpen(config.url,function(){		
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');	
		casper.echo('Verify with All post tab after edit a topic/post on topic listing page','INFO');	
		inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
			if (err) {
				casper.echo("Error occurred in callback user not logged-in", "ERROR");
			}else {
				casper.echo('Processing to Login on forum.....', 'INFO');
				wait.waitForTime(1000 , casper ,function(err) {
					wait.waitForElement('ul.nav.pull-right span.caret', casper ,function(err ,isExists){
						if(isExists) {
							casper.click('a#posttoggle_34247466 i');
							casper.click('a#edit_post_request');
							wait.waitForElement('#message1_ifr' ,casper  ,function(err ,isExists) {
								if(isExists) {
									casper.echo('Message post is editable','INFO');
									casper.withFrame('message1_ifr', function() {
										casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
										casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
										casper.sendKeys('#tinymce',json['EditTopic'].content);
									});
									
								}

							});
							
						}
					});
				});
			}
		});
	});
});*/

//verify with reputation link after disable the permissions

profilePageTests.profilePageAllReputationDisable=function(){
	casper.thenOpen(config.backEndUrl,function(){	
		casper.echo('****************verify with reputation link after disable the permissions*****************','INFO');
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
 		loginPrivacyOptionMethod.loginToForumBackEnd(casper , function(err) {
 			if (!err)
 				casper.echo('LoggedIn to forum backend....', 'INFO');
 		});					
 		wait.waitForElement('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]' , casper , function(err ,isExists) {
 			if(isExists) {
 				casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');	
 				casper.click('div#ddSettings  div a:nth-child(2)');
 				wait.waitForElement('div#ddSettings' , casper ,function(err , isExists) {
 					if(isExists) {
 						//casper.click('div#ddSettings a:nth-child(2)');
 						utils.enableorDisableCheckbox('reputation', false, casper, function() {
 							casper.echo('checkbox is uncheckedchecked', 'INFO');
 						});
 						casper.thenOpen(config.url , function() {
 							inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
 								if (err) {
 									casper.echo("Error occurred in callback user not logged-in", "ERROR");
 								}else {
 									casper.echo('Processing to Login on forum.....', 'INFO');
 								wait.waitForTime(1000 , casper ,function(err) {
 									wait.waitForElement('ul.nav.pull-right span.caret', casper ,function(err ,isExists){		
 										if(isExists) {
 											casper.click('ul.nav.pull-right span.caret');
 											casper.click('a#user-nav-panel-profile');	
 											wait.waitForElement('a#emailMember' , casper , function(err , isExists) {
 												if(isExists) {
 													casper.echo('reputations is not present','INFO');
													/*casper.wait(1000,function(){
															casper.capture('report.png');
													});*/
													wait.waitForElement('ul.nav.pull-right span.caret' , casper ,function(err , isExists) {
														if(isExists) {
															inContextLoginMethod.logoutFromApp(casper, function(err){
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
				}
			});
		}
	});
	});
};
			
						
//verify with reputation link after enable the permissions

profilePageTests.profilePageAllReputationEnable=function(){	
	casper.thenOpen(config.backEndUrl,function(){		
		casper.echo('****************verify with reputation link after enable the permissions*****************','INFO');
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');		
		loginPrivacyOptionMethod.loginToForumBackEnd(casper , function(err) {
 			if (!err)
 				casper.echo('LoggedIn to forum backend....', 'INFO');
 		});
		wait.waitForElement('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]' , casper , function(err ,isExists) {
 			if(isExists) {
 				casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');	
 				casper.click('div#ddSettings  div a:nth-child(2)');
				wait.waitForElement('div#ddSettings' , casper ,function(err , isExists) {
 					if(isExists) {
 						utils.enableorDisableCheckbox('reputation', true , casper, function() {
 							casper.echo('checkbox is checked', 'INFO');
 						});
						casper.thenOpen(config.url , function() {
							inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
 								if (err) {
 									casper.echo("Error occurred in callback user not logged-in", "ERROR");
 								}else {
 									casper.echo('Processing to Login on forum.....', 'INFO');
 									wait.waitForTime(1000 , casper ,function(err) {
 										wait.waitForElement('ul.nav.pull-right span.caret', casper ,function(err ,isExists){		
 											if(isExists) {
 												casper.click('ul.nav.pull-right span.caret');
 												casper.click('a#user-nav-panel-profile');	
 												wait.waitForElement('a#emailMember' , casper , function(err , isExists) {
 													if(isExists) {
 														casper.echo('reputations is  present','INFO');
														
wait.waitForElement('ul.nav.pull-right span.caret' , casper ,function(err , isExists) {
															if(isExists) {
															inContextLoginMethod.logoutFromApp(casper, function(err){
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
					}
 				});
			}
		});
	});
};
 			
//verify with edit user icon

profilePageTests.profilePageEditUserIcon=function(){	
	casper.thenOpen(config.backEndUrl,function(){			
		casper.echo('*****************verify with edit user icon****************','INFO');
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');		
		loginPrivacyOptionMethod.loginToForumBackEnd(casper , function(err) {
 			if (!err)
 				casper.echo('LoggedIn to forum backend....', 'INFO');
 		});
		wait.waitForElement('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', casper , function(err , isExists) {
			if(isExists) {
				casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');	
				casper.evaluate(function() {
					document.querySelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"').click();
 				});
				wait.waitForElement('div.tooltipMenu.text a[title="Assign permissions to user groups"]', casper , function(err , isExists) {
					if( isExists) {
						casper.evaluate(function() {
							document.querySelector('div.tooltipMenu.text a[title="Assign permissions to user groups"]').click();
						});
						wait.waitForTime(1000 , casper , function (err){
						var grpName = casper.evaluate(function(){
 	       						for(var i=1; i<=7; i++) {
 	        						var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
 								if (x1.innerText == 'Registered Users') {
 									document.querySelector('tr:nth-child('+i+') td:nth-child(3) a').click();
 									var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('href');
 									return x2;
								}
 							}
 						});
 						casper.echo("message : "+grpName, 'INFO');
 						casper.click('div.tooltipMenu a[href="'+grpName+'"]');
						wait.waitForElement('button.button.btn-m.btn-blue' , casper , function(err , isExists) {
							if(isExists) {
								utils.enableorDisableCheckbox('change_username',true, casper, function(err) {
									if(!err)
										casper.echo('Successfully checked','INFO');
								});
								casper.thenOpen(config.url, function(){
									inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
 										if (err) {
 											casper.echo("Error occurred in callback user not logged-in", "ERROR");
 										}else {
 											casper.echo('Processing to Login on forum.....', 'INFO');
 											wait.waitForTime(1000 , casper ,function(err) {
 												wait.waitForElement('ul.nav.pull-right span.caret', casper ,function(err ,isExists){			
													if(isExists) {
														casper.click('ul.nav.pull-right span.caret');
														casper.click('a#user-nav-panel-profile');
														wait.waitForElement('a#emailMember' , casper , function( err , isExists) {
															if(isExists) {
																casper.click('a#anchor_tab_edit');
																wait.waitForElement('button.btn.btn-primary', casper , function(err , isExists) {
	if(isExists){
	
	 	/*var grp = casper.evaluate(function(){
				document.querySelector('a[aria-controls="Account Settings"]').getAttribute('href');
			});
			casper.echo("message :" +grp,'INFO');
			casper.click('a[href="'+grp+'"]');*/
			casper.click('a[aria-controls="Account Settings"]');
			wait.waitForElement('div#usrName a:nth-child(2) small' , casper , function(err , isExists) {
				if(isExists) {
					
					casper.evaluate(function(){
						document.querySelector('div#usrName a:nth-child(2) small').click();
					});
					
					casper.wait(1000, function(){
						casper.capture('1678.png');

					});
				
					profilePageMethod.fillData(casper , function(err) {
						if(!err)
							casper.echo('data saved successfully', 'INFO');
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
			
				
//verify with delete icon
profilePageTests.profilePageDeleteIcon=function(){
	casper.thenOpen(config.url,function(){			
		casper.echo('*****************verify with Delete user icon****************','INFO');
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		inContextLoginMethod.loginToApp(json['validInfose'].username, json['validInfose'].password, casper, function(err) {
			if (err) {
				casper.echo("Error occurred in callback user not logged-in", "ERROR");
		}else {
			casper.echo('Processing to Login on forum.....', 'INFO');
			wait.waitForTime(1000 , casper ,function(err) {
				wait.waitForElement('ul.nav.pull-right span.caret', casper ,function(err ,isExists){
					if(isExists) {
						casper.click('a#user-nav-panel-profile');	
						wait.waitForElement('a#emailMember' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('a#deleteAccountDialog');
								casper.click('a#deleteAccount');
								wait.waitForElement('ul.nav.pull-right span.caret' , casper , function(err ,  isexists) {
									inContextLoginMethod.logoutFromApp(casper, function(err){
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
      });		
};	

				
//Post count
//verify post count for newly register user
profilePageTests.profilePagePostCount=function(){
	casper.thenOpen(config.url,function(){				
		casper.echo('*****************verify with Delete user icon****************','INFO');
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');							
		inContextLoginMethod.loginToApp(json['validInfosef'].username, json['validInfosef'].password, casper, function(err) {
			if (err) {
				casper.echo("Error occurred in callback user not logged-in", "ERROR");
			}else {
				casper.echo('Processing to Login on forum.....', 'INFO');
				wait.waitForTime(1000 , casper ,function(err) {
					wait.waitForElement('ul.nav.pull-right span.caret', casper ,function(err ,isExists){
						if(isExists) {
							casper.click('a#user-nav-panel-profile');
							wait.waitForElement('a#emailMember' , casper , function(err , isExists) {
								if(isExists) {
									casper.echo('no post avlabial','INFO');									
								}								

							});
						}
					});
				});
			}
	  	});
	
	});
};

//Verify with like the post.

profilePageTests.profilePagePostCount=function(){
	casper.thenOpen(config.url,function(){		
		casper.echo('**********Verify with like the post.*******,'INFO');
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');	
		inContextLoginMethod.loginToApp(json['validInfosef'].username, json['validInfosef'].password, casper, function(err) {
			if (err) {
				casper.echo("Error occurred in callback user not logged-in", "ERROR");
			}else {
				casper.echo('Processing to Login on forum.....', 'INFO');
				wait.waitForTime(1000 , casper ,function(err) {
					wait.waitForElement('form[name="posts"] a.topic-title', casper ,function(err ,isExists){
						if(isExists) {
							casper.click('form[name="posts"] a.topic-title');
											
							
						}
					});
				});
			}
	  	});	























	});
};





















