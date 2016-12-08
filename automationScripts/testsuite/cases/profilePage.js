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
		}http://docs.casperjs.org/en/latest/modules/casper.html#fillselectors
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


//Verify with All post tab after start a topic/post aoll post clickable

profilePageTests.profilePageAllPostTab=function(){
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
								/*casper.wait(1000,function(){

									casper.capture('post.png');
								});*/
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
profilePageTests.profilePageEditTopic=function(){
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
});






