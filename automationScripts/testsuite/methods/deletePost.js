var deletePostMethod= module.exports = {};
var wait=require('../wait.js');
var utils=require('../utils.js');
var uploadMethods=require('../methods/uploadmethod.js');
var inContextLoginMethod = require('../methods/inContextLogin.js');
var loginPrivacyOptionMethod = require('../methods/loginByPrivacyOption.js');
var registerMethod=require('../methods/register.js');
var json = require('../../testdata/inContextLogin.json');


//Create a post method  admin--------------------------------------------------------------------------
deletePostMethod.profilePost=function(driver , callback) {
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('***********Method to create post************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				inContextLoginMethod.loginToApp(json['validInfose'].username, json['validInfose'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists){
							if(isExists){
								//casper.test.assertExists('form[name="posts"] a.topic-title','Topic found');
								//casper.click('ul li:nth-child(2) span:nth-child(1) span:nth-child(2) h4 a');
								casper.click('form[name="posts"] a.topic-title');
								wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' , casper , function(err , isExists){
									if(isExists) {
										casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
										wait.waitForTime(5000 , casper , function(err) {
											casper.capture('1.png');
											casper.withFrame('message_ifr', function() {
												casper.sendKeys('#tinymce', driver.page.event.key.Ctrl,driver.page.event.key.A, {keepFocus: true});			
												casper.sendKeys('#tinymce', driver.page.event.key.Backspace, {keepFocus: true});
												casper.sendKeys('#tinymce', 'dragme');
											});
											casper.wait(5000 , function(){
												casper.test.assertExists('input[name="submitbutton"]','button found');
                                                                                                casper.click('input[name="submitbutton"]');
												casper.wait(5000 , function(){
													casper.capture('34.png');
													casper.then(function() {
															inContextLoginMethod.logoutFromApp(casper, function(err){
														if (!err)
															casper.echo('Successfully logout from application', 'INFO');
														});
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

 //select multiple post id from checkbox
deletePostMethod.PostListing=function(driver , callback) {
	casper.echo('-------------Post listing method called----------------------------' ,'INFO');
	var post= casper.evaluate(function(){
		var aa=document.querySelectorAll('input[name="pid"]');
			var a= aa.length;
			var hh=aa[2].getAttribute('id');
			return hh;
	});
	casper.echo("message :" +post,'INFO');
	casper.click('input[value="'+post+'"]');
	casper.click('input#deleteposts');
				

};
				

//**************************Method to Disable Approve new Posts******************************

deletePostMethod.disableApproveAllPost=function(driver , callback) {
	casper.thenOpen(config.backEndUrl , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('------------------Method to Disable Approve new Posts*-----------------------' ,'INFO');
		loginPrivacyOptionMethod.loginToForumBackEnd(casper , function(err) {	
			if (!err)
				casper.echo('LoggedIn to forum backend....', 'INFO');
		});
		wait.waitForElement('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]' , casper , function(err , isExists){
			if(isExists) {
				casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
				/*casper.evaluate(function() {
																														document.querySelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings').click();
});*/
				casper.capture('88.png');
				casper.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
				wait.waitForElement('button.button.btn-m.btn-blue' , casper , function(err , isExists) {
					if(isExists) {
						casper.click('select#post_approval');
						casper.sendKeys('select[name="post_approval"] option[value="0"]', 'Disabled');
						casper.click('button.button.btn-m.btn-blue');
						casper.wait(30000 , function(){
							casper.capture('67.png');

						});		
					}					
				});	
			}
		}); 
	});
};

//******************************Topic created method called**************************	
deletePostMethod.createTopic=function(driver , callback) {
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
};							

//search topic for register user
deletePostMethod.searchlogin=function(driver , callback) {
	//casper.echo('***********Verify with Edit the Post from Search result page camera webaddress************','INFO');
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('input#inline_search_box' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('input#inline_search_box');
								casper.fill('form#inlineSearchForm', {
									'keywords' :'NewTopic'
								},true);
							
							}
						});
					}
				});
			}
		});
	});
};

//------------------------------------searchloginOwnpost----------------------------------------------------

deletePostMethod.searchLoginOwn=function(driver , callback) {
	//casper.echo('***********Verify with Edit the Post from Search result page camera webaddress************','INFO');
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				inContextLoginMethod.loginToApp(json['validInfose'].username, json['validInfose'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('input#inline_search_box' , casper , function(err , isExists) {
							if(isExists) {
								casper.click('input#inline_search_box');
								casper.fill('form#inlineSearchForm', {
									'keywords' :'dragme'
								},true);
							}
						});
					}
				});
			}
		});
	});
};

//--------------------------------------------------------------------------------------------------------------------------------

////Create a post method from register user 
deletePostMethod.profilePostRegister=function(driver , callback) {
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('***********Method to create post************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists){
							if(isExists){
								//casper.test.assertExists('form[name="posts"] a.topic-title','Topic found');
								//casper.click('ul li:nth-child(2) span:nth-child(1) span:nth-child(2) h4 a');
								casper.click('form[name="posts"] a.topic-title');
								wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' , casper , function(err , isExists){
									if(isExists) {
										casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
										wait.waitForTime(5000 , casper , function(err) {
											casper.capture('1.png');
											casper.withFrame('message_ifr', function() {
												casper.sendKeys('#tinymce', driver.page.event.key.Ctrl,driver.page.event.key.A, {keepFocus: true});			
												casper.sendKeys('#tinymce', driver.page.event.key.Backspace, {keepFocus: true});
												casper.sendKeys('#tinymce', 'dragme');
											});
											casper.wait(5000 , function(){
												casper.test.assertExists('input[name="submitbutton"]','button found');
                                                                                                casper.click('input[name="submitbutton"]');
												casper.wait(5000 , function(){
													casper.capture('34.png');
													casper.then(function() {
															inContextLoginMethod.logoutFromApp(casper, function(err){
														if (!err)
															casper.echo('Successfully logout from application', 'INFO');
														});
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


//*******************************************Delete own topic/post as *******************************************
//"Enable 'delete own post' under the Group permission.
//(WTB>User>group permission>manage> change permission)
//Enable  'delete own topic' under the Group permission.
//(WTB>User>group permission>manage> change permission)"

//"view category
//---------------------------------------------------------------------------delete own topic- disable
//---------------------------------------------------------------------------delete own post-enable "
deletePostMethod.BackEndSettings=function(driver , callback) {
	casper.thenOpen(config.backEndUrl , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('------------------Backend Method to enable delete own post and topic-----------------------' ,'INFO');
		loginPrivacyOptionMethod.loginToForumBackEnd(casper , function(err) {	
			if (!err)
				casper.echo('LoggedIn to forum backend....', 'INFO');
		});
		wait.waitForElement('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', casper , function(err , isExists) {
			if(isExists) {
				driver.evaluate(function() {
					document.querySelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"').click();
 				});
				wait.waitForElement('div.tooltipMenu.text a[title="Assign permissions to user groups"]', casper , function(err , isExists) {
					if( isExists) {
						driver.evaluate(function() {
							document.querySelector('div.tooltipMenu.text a[title="Assign permissions to user groups"]').click();
						});
						driver.wait(1000, function(){
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
							driver.echo("message : "+grpName, 'INFO');
 							driver.click('div.tooltipMenu a[href="'+grpName+'"]');
						});
						wait.waitForElement('button.button.btn-m.btn-blue' , casper , function(err , isExists) {
							if(isExists) {
								utils.enableorDisableCheckbox('delete_posts',true, casper, function(err) {
									if(!err)
										driver.echo('Successfully checked delete own post','INFO');
								});
								//casper.click('button.button.btn-m.btn-blue');
								utils.enableorDisableCheckbox('delete_threads',false, casper, function(err) {
									if(!err)
										driver.echo('Successfully unchecked delete own topic ','INFO');
								});
								casper.click('button.button.btn-m.btn-blue');
							}
						});
					}	
				});
			}
		});
	});
};	

//create topic method only for own topic register user--------------------------------------------------------------------------
deletePostMethod.createMoreTopic=function(driver , callback) {
	casper.thenOpen(config.url , function(){
		casper.echo('-----------New topic created Method called-------------' , 'INFO');
		inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
			if (err) {
				casper.echo("Error occurred in callback user not logged-in", "ERROR");	
			}else {
				casper.echo('Processing to Login on forum.....','INFO');
				casper.waitForSelector('a[href="/categories"]' , function success(){
					casper.test.assertExists('a[href="/categories"]','Topic found');
					//casper.click('span.topic-content a');
					wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary ' , casper , function(err , isExists) {
						if(isExists) {
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
						}
					});
				},function fail() {
					casper.echo('Failed block called','INFO');
					
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
};							

//----------------------------------------------------view category----------------------------------------------
//----------------------------------------------------delete own topic- enable Method-----------------------------------
//----------------------------------------------------delete own post-disable" Method-----------------------------------
deletePostMethod.BackEndSettingsPostDisable=function(driver , callback) {
	casper.thenOpen(config.backEndUrl , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('------------------Backend Method to enable delete own post and topic-----------------------' ,'INFO');
		loginPrivacyOptionMethod.loginToForumBackEnd(casper , function(err) {	
			if (!err)
				casper.echo('LoggedIn to forum backend....', 'INFO');
		});
		wait.waitForElement('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', casper , function(err , isExists) {
			if(isExists) {
				driver.evaluate(function() {
					document.querySelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"').click();
 				});
				wait.waitForElement('div.tooltipMenu.text a[title="Assign permissions to user groups"]', casper , function(err , isExists) {
					if( isExists) {
						driver.evaluate(function() {
							document.querySelector('div.tooltipMenu.text a[title="Assign permissions to user groups"]').click();
						});
						driver.wait(1000, function(){
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
							driver.echo("message : "+grpName, 'INFO');
 							driver.click('div.tooltipMenu a[href="'+grpName+'"]');
						});
						wait.waitForElement('button.button.btn-m.btn-blue' , casper , function(err , isExists) {
							if(isExists) {
								utils.enableorDisableCheckbox('delete_posts',false, casper, function(err) {
									if(!err)
										driver.echo('Successfully checked delete own post','INFO');
								});
								//casper.click('button.button.btn-m.btn-blue');
								utils.enableorDisableCheckbox('delete_threads',true, casper, function(err) {
									if(!err)
										driver.echo('Successfully checked delete own topic ','INFO');
								});
								casper.click('button.button.btn-m.btn-blue');
							}
						});
					}	
				});
			}
		});
	});
};
//--------------------------------------------------------------------------------------------------------------------------------	

//----------------------------------------------------view category----------------------------------------------
//----------------------------------------------------delete own topic- disable Method-----------------------------------
//----------------------------------------------------delete own post-disable" Method-----------------------------------
deletePostMethod.BackEndSettingsTopicPostDisable=function(driver , callback) {
	casper.thenOpen(config.backEndUrl , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('------------------Backend Method to enable delete own post and topic-----------------------' ,'INFO');
		loginPrivacyOptionMethod.loginToForumBackEnd(casper , function(err) {	
			if (!err)
				casper.echo('LoggedIn to forum backend....', 'INFO');
		});
		wait.waitForElement('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', casper , function(err , isExists) {
			if(isExists) {
				driver.evaluate(function() {
					document.querySelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"').click();
 				});
				wait.waitForElement('div.tooltipMenu.text a[title="Assign permissions to user groups"]', casper , function(err , isExists) {
					if( isExists) {
						driver.evaluate(function() {
							document.querySelector('div.tooltipMenu.text a[title="Assign permissions to user groups"]').click();
						});
						driver.wait(1000, function(){
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
							driver.echo("message : "+grpName, 'INFO');
 							driver.click('div.tooltipMenu a[href="'+grpName+'"]');
						});
						wait.waitForElement('button.button.btn-m.btn-blue' , casper , function(err , isExists) {
							if(isExists) {
								utils.enableorDisableCheckbox('delete_posts',false, casper, function(err) {
									if(!err)
										driver.echo('Successfully unchecked delete own post','INFO');
								});
								//casper.click('button.button.btn-m.btn-blue');
								utils.enableorDisableCheckbox('delete_threads',false, casper, function(err) {
									if(!err)
										driver.echo('Successfully unchecked delete own topic ','INFO');
								});
								casper.click('button.button.btn-m.btn-blue');
							}
						});
					}	
				});
			}
		});
	});
};	

//----------------------------------------------------view category----------------------------------------------
//----------------------------------------------------delete own topic- enable Method-----------------------------------
//----------------------------------------------------delete own post-enable" Method-----------------------------------

deletePostMethod.BackEndSettingsTopicPostEnable=function(driver , callback) {
	casper.thenOpen(config.backEndUrl , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('------------------Backend Method to enable delete own post and topic-----------------------' ,'INFO');
		loginPrivacyOptionMethod.loginToForumBackEnd(casper , function(err) {	
			if (!err)
				casper.echo('LoggedIn to forum backend....', 'INFO');
		});
		wait.waitForElement('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', casper , function(err , isExists) {
			if(isExists) {
				driver.evaluate(function() {
					document.querySelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"').click();
 				});
				wait.waitForElement('div.tooltipMenu.text a[title="Assign permissions to user groups"]', casper , function(err , isExists) {
					if( isExists) {
						driver.evaluate(function() {
							document.querySelector('div.tooltipMenu.text a[title="Assign permissions to user groups"]').click();
						});
						driver.wait(1000, function(){
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
							driver.echo("message : "+grpName, 'INFO');
 							driver.click('div.tooltipMenu a[href="'+grpName+'"]');
						});
						wait.waitForElement('button.button.btn-m.btn-blue' , casper , function(err , isExists) {
							if(isExists) {
								utils.enableorDisableCheckbox('delete_posts',true, casper, function(err) {
									if(!err)
										driver.echo('Successfully checked delete own post','INFO');
								});
								//casper.click('button.button.btn-m.btn-blue');
								utils.enableorDisableCheckbox('delete_threads',true, casper, function(err) {
									if(!err)
										driver.echo('Successfully checked delete own topic ','INFO');
								});
								casper.click('button.button.btn-m.btn-blue');
							}
						});
					}	
				});
			}
		});
	});
};	


//-------------------------------------------------------Edit own topic/post as register(edit own topic enable)	Methods---------------------
deletePostMethod.BackEndSettingsEditOwnTopicEnable=function(driver , callback) {
	casper.thenOpen(config.backEndUrl , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('------------------Backend Method to enable delete own post and topic-----------------------' ,'INFO');
		loginPrivacyOptionMethod.loginToForumBackEnd(casper , function(err) {	
			if (!err)
				casper.echo('LoggedIn to forum backend....', 'INFO');
		});
		wait.waitForElement('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', casper , function(err , isExists) {
			if(isExists) {
				driver.evaluate(function() {
					document.querySelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"').click();
 				});
				wait.waitForElement('div.tooltipMenu.text a[title="Assign permissions to user groups"]', casper , function(err , isExists) {
					if( isExists) {
						driver.evaluate(function() {
							document.querySelector('div.tooltipMenu.text a[title="Assign permissions to user groups"]').click();
						});
						driver.wait(1000, function(){
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
							driver.echo("message : "+grpName, 'INFO');
 							driver.click('div.tooltipMenu a[href="'+grpName+'"]');
						});
						wait.waitForElement('button.button.btn-m.btn-blue' , casper , function(err , isExists) {
							if(isExists) {
								utils.enableorDisableCheckbox('edit_posts',true, casper, function(err) {
									if(!err)
										driver.echo('Successfully checked edit own post','INFO');
								});
								casper.click('button.button.btn-m.btn-blue');
							}
						});
					}	
				});
			}
		});
	});		
};	
	
//-----------------------------------------Edit own topic/post as register(edit own post disable) Method---------------------------------	
deletePostMethod.BackEndSettingsEditOwnTopicDisable=function(driver , callback) {
	casper.thenOpen(config.backEndUrl , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('------------------Backend Method to enable delete own post and topic-----------------------' ,'INFO');
		loginPrivacyOptionMethod.loginToForumBackEnd(casper , function(err) {	
			if (!err)
				casper.echo('LoggedIn to forum backend....', 'INFO');
		});
		wait.waitForElement('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', casper , function(err , isExists) {
			if(isExists) {
				driver.evaluate(function() {
					document.querySelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"').click();
 				});
				wait.waitForElement('div.tooltipMenu.text a[title="Assign permissions to user groups"]', casper , function(err , isExists) {
					if( isExists) {
						driver.evaluate(function() {
							document.querySelector('div.tooltipMenu.text a[title="Assign permissions to user groups"]').click();
						});
						driver.wait(1000, function(){
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
							driver.echo("message : "+grpName, 'INFO');
 							driver.click('div.tooltipMenu a[href="'+grpName+'"]');
						});
						wait.waitForElement('button.button.btn-m.btn-blue' , casper , function(err , isExists) {
							if(isExists) {
								utils.enableorDisableCheckbox('edit_posts',false, casper, function(err) {
									if(!err)
										driver.echo('Successfully unchecked edit own post','INFO');
								});
								casper.click('button.button.btn-m.btn-blue');
							}
						});
					}	
				});
			}
		});
	});		
};

//-------------------------------------------------create topic method called----------------------------------
deletePostMethod.topicCreate=function(driver , callback){

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
					casper.wait(2000 , function(){
						casper.capture('a.png');

					});
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

};

//-----------------------------------------------Register a user-----------------------------------------------------------
 deletePostMethod.enableUserRegister= function(username,casper,test) {	
	casper.thenOpen(config.backEndUrl, function() {
		//registerMethod.logoutFromApp(casper, casper.test, function(err) {
			//if(!err){
				registerMethod.loginToForumBackEnd(casper, test, function(err) {
					 if(!err){
						casper.echo('Logged-in successfully from back-end', 'INFO');
						wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
								casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
								casper.test.assertExists('div#ddUsers a[href="/tool/members/mb/addusers"]');
								casper.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
								wait.waitForElement('input#autosuggest', casper, function(err, isExists) {
									casper.test.assertExists('#autosuggest');
									casper.sendKeys('#autosuggest',username, {keepFocus: true});
									casper.click('#autosuggest');
									casper.page.sendEvent("keypress", casper.page.event.key.Enter);
									casper.waitForSelector('form[name="ugfrm"]', function success(){
									    var grpName = casper.evaluate(function(){
										    for(var i=2;i<6;i++){
												var x1 = document.querySelector('form#frmChangeUsersGroupFinal div:nth-child('+i+') label');
												if (x1.innerText == 'Administrators') {
													var x3 = document.querySelector('form#frmChangeUsersGroupFinal div:nth-child('+i+') input').getAttribute('value');
													return x3;
												}
											}
										});
										casper.echo(+grpName,'INFO');
											wait.waitForTime(3000, casper, function() { 
												casper.fillSelectors('form[name="ugfrm"]', {
													'input[type="checkbox"]' :grpName
												}, true);
												casper.wait(2000 , function(){
													casper.capture('66.png');

												});
												casper.test.assertExists('button[title="Close"]');
												casper.click('button[title="Close"]');
												wait.waitForTime(4000, casper, function() {
													casper.capture('555.png'); 
												    /*registerMethod.logoutFromApp(casper, casper.test, function(err) {
														if(!err){
															casper.echo('backend logout sucessful');
														}
													});*/
													casper.test.assertExists('div#account_sub_menu a[data-tooltip-elm="ddAccount"]');
														casper.click('div#account_sub_menu a[data-tooltip-elm="ddAccount"]');
														casper.test.assertExists('div#ddAccount a:nth-child(6)');
														casper.click('div#ddAccount a:nth-child(6)');	
														casper.echo('                    Logout Form BackEnd                     ' ,'INFO');






	
												});
											});
									},function fail(){
										casper.echo('');
									});
								});
							} else {
								casper.echo('Backend Menu not found', 'ERROR');
							}
						});
					}
				});
			//}
		//});
	});
   
};














































