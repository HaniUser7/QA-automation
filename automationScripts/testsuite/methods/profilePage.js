var loginPrivacyOptionMethod = require('../methods/loginByPrivacyOption.js');
var forumLoginMethod = require('../methods/login.js');
var uploadMethods=require('../methods/upload.js');
var wait=require('../wait.js');
var utils=require('../utils.js');
var registerMethod=require('../methods/register.js');
var loginJSON = require('../../testdata/loginData.json');



var profilePageMethod = module.exports = {};


profilePageMethod.fillDataToMessage = function(driver, callback) {
	
	driver.fillSelectors('form#PostPrivateMessage',{	
		'input#tokenfield_typeahead-tokenfield':'hani',
		'input#pm_subject':'Message',
		
	},false);
	
	casper.evaluate(function() {
		document.querySelector('a#send_pmsg_button').click();
	});	
	
	driver.click('a#send_pmsg_button');
	return callback(null)
};



profilePageMethod.fillData = function(driver , callback) {
	driver.fillSelectors('form[name="PostTopic"]',{
		'div.editable-input':'hani1'
	},false);
	driver.click('button.btn.btn-primary.btn-sm.editable-submit i');
	
};



profilePageMethod.startTopic = function(data,driver,callback) {
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

//----------------------------------send Message-----------------------------------------------------------------------------


profilePageMethod.createMessage = function(data, driver, callback) {		
	driver.sendKeys('input[id="tokenfield_typeahead-tokenfield"]', data.to, {keepFocus:true});
	driver.sendKeys('input[id="tokenfield_typeahead-tokenfield"]', casper.page.event.key.Enter, {keepFocus:true} );
	driver.sendKeys('input[id="pm_subject"]', data.subject, {keepFocus:true});		
	driver.test.assertExists('textarea#pmessage_new');
	driver.evaluate(function() {
		document.querySelector('textarea#pmessage_new').click();
	});
	driver.waitUntilVisible('iframe#pmessage_new_ifr', function success() {
		driver.withFrame('pmessage_new_ifr', function() {
			driver.sendKeys('#tinymce', driver.page.event.key.Ctrl,driver.page.event.key.A,{keepFocus: true});		
			driver.sendKeys('#tinymce', driver.page.event.key.Backspace, {keepFocus: true});
			driver.sendKeys('#tinymce', data.pmessage);
		});
	}, function fail() {
		driver.echo('Message iframe not fount', 'ERROR')
	});
	driver.then(function() {
		driver.test.assertExists('a#send_pmsg_button');
		driver.click('a#send_pmsg_button');
			driver.waitUntilVisible('div#ajax-msg-top', function success() {
				driver.echo(driver.fetchText('div#ajax-msg-top p'),'INFO');
			}, function fail() {
				driver.echo(casper.fetchText('div#pm_error_msg'), 'ERROR');
			});	
			driver.then(function() {
				return callback(null);
			});
		
	});
};





//--------------------------------------------BackEndSettings For message Button-----------------------------------------
profilePageMethod.messageButtonEnable= function(casper , callback){

	casper.thenOpen(config.backEndUrl , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                      Enable message button method called                ' ,'INFO');
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
						wait.waitForTime(30000 , casper , function(err){
							return callback(null);
						});
					}
				});
			}
		});
	});
			
};

//---------------------------------------------BackEndSettings For message Button Disable--------------------------------------
profilePageMethod.messageButtonDisable= function(casper , callback){

	casper.thenOpen(config.backEndUrl , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('Enable message button method called' ,'INFO');
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
						utils.enableorDisableCheckbox('allow_pm',false, casper, function(err) {
							if(!err)
								casper.echo('Successfully unchecked','INFO');
						});
						casper.click('button.button.btn-m.btn-blue');
						casper.wait(30000 , function(){
							return callback(null);
						});
					}
				});
			}
		});
	});
			
};

//-----------------------------------------create a post method for register user------------------------------------------
profilePageMethod.profilePost=function(casper , callback) {
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('------------------------------------post method called-------------------------------------------','INFO');
		casper.echo('***********Method to create post************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(loginJSON['validInfo'].username, loginJSON['validInfo'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists){
							if(isExists){
								
								casper.evaluate(function() {
									document.querySelector('form[name="posts"] a.topic-title').click();
								});
								wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' , casper , function(err , isExists){
									if(isExists) {
										casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
										wait.waitForTime(5000 , casper , function(err) {
											casper.withFrame('message_ifr', function() {
												casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
												casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
												casper.sendKeys('#tinymce', 'dragme');
											});
											casper.wait(5000 , function(){
												casper.test.assertExists('input[name="submitbutton"]','button found');
                                                                                                casper.click('input[name="submitbutton"]');
												wait.waitForTime(2000 , casper , function(err){
													
													forumLoginMethod.logoutFromApp(casper, function(err){
														if (!err)
															casper.echo('Successfully logout from application', 'INFO');
															return callback(null);
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


//------------------------------------------BackEndSettings For reputation Disable-----------------------------------------------
profilePageMethod.reputationDisable= function(casper , callback){
	casper.thenOpen(config.backEndUrl,function(){	
		casper.echo('****************BackEndSettings For reputation Disable-*****************','INFO');
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
 						
 						utils.enableorDisableCheckbox('reputation',false , casper, function() {
 							casper.echo('successfully unchecked', 'INFO');
 						});
						casper.click('button.button.btn-m.btn-blue');
						wait.waitForTime(20000 , casper , function(err) {
							return callback(null);
						});
					}
				});
			}
		});
	});
};
 		
//------------------------------------------BackEndSettings For reputation Enable-----------------------------------------------
profilePageMethod.reputationEnable= function(casper , callback){
	casper.thenOpen(config.backEndUrl,function(){	
		casper.echo('****************BackEndSettings For reputation Enable-*****************','INFO');
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
 						
 						utils.enableorDisableCheckbox('reputation',true , casper, function() {
 							casper.echo('successfully checked', 'INFO');
 						});
						casper.click('button.button.btn-m.btn-blue');
						wait.waitForTime(20000 , casper , function(err) {
							
							return callback(null);
						});
					}
				});
			}
		});
	});
};
 	
//------------------------------------------disable signature permissions for register user Method------------------------------------------

profilePageMethod.BackEndSettingsSignatureDisable=function(casper , callback) {
	casper.thenOpen(config.backEndUrl , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('----------------Backend Method to disable signature permissions for register user Method-------------------' ,'INFO');
		loginPrivacyOptionMethod.loginToForumBackEnd(casper , function(err) {	
			if (!err)
				casper.echo('LoggedIn to forum backend....', 'INFO');
		});
		wait.waitForElement('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', casper , function(err , isExists) {
			if(isExists) {
				casper.evaluate(function() {
					document.querySelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"').click();
 				});
				wait.waitForElement('div.tooltipMenu.text a[title="Assign permissions to user groups"]', casper , function(err , isExists) {
					if( isExists) {
						casper.evaluate(function() {
							document.querySelector('div.tooltipMenu.text a[title="Assign permissions to user groups"]').click();
						});
						wait.waitForTime(1000 , casper , function(err){
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
						});
						wait.waitForElement('button.button.btn-m.btn-blue' , casper , function(err , isExists) {
							if(isExists) {
								utils.enableorDisableCheckbox('allow_signature',false, casper, function(err) {
									if(!err)
										casper.echo('Successfully unchecked edit own post','INFO');
								});
								casper.click('button.button.btn-m.btn-blue');
								wait.waitForTime(15000, casper , function(){
									return callback(null);
								});
							}
						});
					}	
				});
			}
		});
	});		
};


//------------------------------------------Enable signature permissions for register user Method------------------------------------------

profilePageMethod.BackEndSettingsSignatureEnable=function(casper , callback) {
	casper.thenOpen(config.backEndUrl , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('--------------Backend Method Enable signature permissions for register user Method------------------------' ,'INFO');
		loginPrivacyOptionMethod.loginToForumBackEnd(casper , function(err) {	
			if (!err)
				casper.echo('LoggedIn to forum backend....', 'INFO');
		});
		wait.waitForElement('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', casper , function(err , isExists) {
			if(isExists) {
				casper.evaluate(function() {
					document.querySelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"').click();
 				});
				wait.waitForElement('div.tooltipMenu.text a[title="Assign permissions to user groups"]', casper , function(err , isExists) {
					if( isExists) {
						casper.evaluate(function() {
							document.querySelector('div.tooltipMenu.text a[title="Assign permissions to user groups"]').click();
						});
						wait.waitForTime(1000 , casper , function(err){
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
						});
						wait.waitForElement('button.button.btn-m.btn-blue' , casper , function(err , isExists) {
							if(isExists) {
								utils.enableorDisableCheckbox('allow_signature',true, casper, function(err) {
									if(!err)
										casper.echo('Signature enable method called successfully','INFO');
								});
								casper.click('button.button.btn-m.btn-blue');
								wait.waitForTime(15000, casper , function(){
									return callback(null);
									
								});
							}
						});
					}	
				});
			}
		});
	});		
};


//-------------------------------Fill data into signature-----------------------------------------------------------------------
profilePageMethod.fillDataSignature=function(data ,driver , callback) {
	casper.echo('Fill data into signature method called' ,'INFO');
	driver.waitForSelector('button[type="submit"]',function success() {								
		driver.sendKeys('input[id="imID"]', data.Instantmessage, {reset:true});	
		driver.sendKeys('input[id="birthDatepicker"]', data.birthday, {reset:true});
                wait.waitForElement('#signature' , casper , function(err , isExists){
			if(isExists){
				casper.wait(2000 , function(){
					casper.capture('o.png');
				});
				
				driver.click('#signature');
				wait.waitForTime(5000 , casper , function(err){
					driver.withFrame('signature_ifr', function() {
						driver.sendKeys('#tinymce', driver.page.event.key.Ctrl,driver.page.event.key.A, {keepFocus: true});			
						driver.sendKeys('#tinymce', driver.page.event.key.Backspace, {keepFocus: true});
						driver.sendKeys('#tinymce',data.signature);
					});
				});
			}else{
				
				driver.test.assertExists('a#edit_signature small.text-muted.glyphicon.glyphicon-pencil');
                        	driver.click('a#edit_signature small.text-muted.glyphicon.glyphicon-pencil');
				
                       		driver.withFrame('signature_ifr', function() {
					driver.sendKeys('#tinymce', driver.page.event.key.Ctrl,driver.page.event.key.A, {keepFocus: true});			
					driver.sendKeys('#tinymce', driver.page.event.key.Backspace, {keepFocus: true});
					driver.sendKeys('#tinymce',data.signature);
				});
			}
		});
		wait.waitForTime(5000 , casper , function(err) {
		  driver.click('button[type="submit"]');
		      	wait.waitForElement('div.alert.alert-danger.text-center' , casper , function(err , isExists) {
		      		if(isExists) {
					
					var successMessage = driver.fetchText('div.alert.alert-danger.text-center');
					driver.echo('success message'+successMessage ,'INFO');
				}
			});
		});
		},function fail(){
			driver.echo('Unable to fill data in signature','ERROR');
		});
		driver.then(function() {
			return callback(null);
		});
};

//-------------------------------------------Disable Custom Title--------------------------------------------------------
//Verify updation message after saving permissions
profilePageMethod.BackEndSettingsDisableCustomTitle=function(casper , callback) {
	casper.thenOpen(config.backEndUrl , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('------------------Backend Method to disable Custom Title-----------------------' ,'INFO');
		loginPrivacyOptionMethod.loginToForumBackEnd(casper , function(err) {	
			if (!err)
				casper.echo('LoggedIn to forum backend....', 'INFO');
		});
		wait.waitForElement('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', casper , function(err , isExists) {
			if(isExists) {
				casper.evaluate(function() {
					document.querySelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"').click();
 				});
				wait.waitForElement('div.tooltipMenu.text a[title="Assign permissions to user groups"]', casper , function(err , isExists) {
					if( isExists) {
						casper.evaluate(function() {
							document.querySelector('div.tooltipMenu.text a[title="Assign permissions to user groups"]').click();
						});
						wait.waitForTime(1000 , casper , function(err){
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
						});
						wait.waitForElement('button.button.btn-m.btn-blue' , casper , function(err , isExists) {
							if(isExists) {
								utils.enableorDisableCheckbox('allow_customtitle',false, casper, function(err) {
									if(!err)
										casper.echo('Successfully unchecked custom Title','INFO');
								});
								casper.click('button.button.btn-m.btn-blue');
								wait.waitForTime(15000, casper , function(){
									return callback(null);
								});
							}
						});
					}	
				});
			}
		});
	});		
};


//--------------------------------------Enable custom title-------------------------------------------
profilePageMethod.BackEndSettingsEnableCustomTitle=function(casper , callback) {
	casper.thenOpen(config.backEndUrl , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('------------------Backend Method to enable custom title -----------------------' ,'INFO');
		loginPrivacyOptionMethod.loginToForumBackEnd(casper , function(err) {	
			if (!err)
				casper.echo('LoggedIn to forum backend....', 'INFO');
		});
		wait.waitForElement('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', casper , function(err , isExists) {
			if(isExists) {
				casper.evaluate(function() {
					document.querySelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"').click();
 				});
				wait.waitForElement('div.tooltipMenu.text a[title="Assign permissions to user groups"]', casper , function(err , isExists) {
					if( isExists) {
						casper.evaluate(function() {
							document.querySelector('div.tooltipMenu.text a[title="Assign permissions to user groups"]').click();
						});
						wait.waitForTime(1000 , casper , function(err){
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
						});
						wait.waitForElement('button.button.btn-m.btn-blue' , casper , function(err , isExists) {
							if(isExists) {
								utils.enableorDisableCheckbox('allow_customtitle',true, casper, function(err) {
									if(!err)
										casper.echo('Successfully checked custom Title','INFO');
								});
								casper.click('button.button.btn-m.btn-blue');
								wait.waitForTime(15000, casper , function(){
									return callback(null);
								});
							}
						});
					}	
				});
			}
		});
	});		
};


//----------------------verify by creating a custom profile-field--------------------------------------------
profilePageMethod.addShieldCustomField=function(casper , callback) {
	casper.thenOpen(config.backEndUrl , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('------------------Backend Method to add shield custom field-----------------------' ,'INFO');
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
								casper.click('div[align="center"] p[align="right"] a img');
								wait.waitForElement('button[type="submit"]' , casper , function(err , isExists) {
									if(isExists){
										casper.sendKeys('input[name="fieldname"]' ,'hell');
										utils.enableorDisableCheckbox('private',true, casper, function(err) {
											if(!err)
												casper.echo('Successfully check private field','INFO');
										});
										casper.click('button[type="submit"]');
										casper.wait(2000 , function(){
											return callback(null);

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

//--------------------------------------create topic method---------------------------------------------------
profilePageMethod.topicCreate=function(casper , callback){

	casper.thenOpen(config.url , function(){
		casper.echo('-----------New topic created Method called-------------' , 'INFO');
			
		forumLoginMethod.loginToApp(loginJSON['validInfo'].username, loginJSON['validInfo'].password, casper, function(err) {
			if (err) {
				casper.echo("Error occurred in callback user not logged-in", "ERROR");	
			}else {
				casper.echo('Processing to Login on forum.....','INFO');
				wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists){
					if(isExists) {
						
						//casper.click('span.topic-content a');
						casper.evaluate(function() {
							document.querySelector('span.topic-content a').click();
						});
						wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' , casper , function(err , isExists){
							if(isExists) {
								casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
							}
						});						
					}
					else {
						casper.echo('Failed block called','INFO');
						
						wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
						
							if(isExists) {
								//method to create a new topic
								uploadMethods.startTopic(loginJSON['newTopic'], casper, function(err) {
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
					casper.then(function() {
						forumLoginMethod.logoutFromApp(casper, function(err){
							if (!err)
								casper.echo('Successfully logout from application', 'INFO');
								return callback(null);
						});
					});	
				});
			}
		});
	});
};

//--------------------------------create topic by newly register user------------------------------------------
profilePageMethod.createTopicRegisterUser=function(casper , callback){

	casper.thenOpen(config.url , function(){
		casper.echo('-----------New topic created Method called-------------' , 'INFO');
			
		forumLoginMethod.loginToApp(loginJSON['validInfoRegisterUser'].username, loginJSON['validInfoRegisterUser'].password, casper, function(err) {
			if (err) {
				casper.echo("Error occurred in callback user not logged-in", "ERROR");	
			}else {
				casper.echo('Processing to Login on forum.....','INFO');
				wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists){
					if(isExists) {
						
						casper.click('span.topic-content a');
						wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' , casper , function(err , isExists){
							if(isExists) {
								casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
							}
						});						
					}
					else {
						casper.echo('Failed block called','INFO');
						
						wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
						
							if(isExists) {
								//method to create a new topic
								uploadMethods.startTopic(loginJSON['newTopic'], casper, function(err) {
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
					casper.then(function() {
						forumLoginMethod.logoutFromApp(casper, function(err){
							if (!err)
								casper.echo('Successfully logout from application', 'INFO');
								return callback(null);
						});
					});	
				});
			}
		});
	});
};

//------------------------------send message with insert photos----------------------------------------
profilePageMethod.createMessageInsertImage = function(data, driver, callback) {		
	driver.sendKeys('input[id="tokenfield_typeahead-tokenfield"]', data.to, {keepFocus:true});
	driver.sendKeys('input[id="tokenfield_typeahead-tokenfield"]', casper.page.event.key.Enter, {keepFocus:true} );
	driver.sendKeys('input[id="pm_subject"]', data.subject, {keepFocus:true});		
	driver.test.assertExists('textarea#pmessage_new');
	driver.evaluate(function() {
		document.querySelector('textarea#pmessage_new').click();
	});
	driver.waitUntilVisible('iframe#pmessage_new_ifr', function success() {
		driver.withFrame('pmessage_new_ifr', function() {
			driver.sendKeys('#tinymce', driver.page.event.key.Ctrl,driver.page.event.key.A,{keepFocus: true});		
			driver.sendKeys('#tinymce', driver.page.event.key.Backspace, {keepFocus: true});
			driver.sendKeys('#tinymce', data.pmessage);
		});
	}, function fail() {
		driver.echo('Message iframe not fount', 'ERROR')
	});
	driver.then(function() {
		driver.click('i.mce-ico.mce-i-image');
		driver.click('input#autoUploadInsertPhoto');
		driver.test.assertExists('a#send_pmsg_button');
		driver.click('a#send_pmsg_button');
		driver.waitUntilVisible('div#ajax-msg-top', function success() {
			driver.echo(driver.fetchText('div#ajax-msg-top p'),'INFO');
		}, function fail() {
			driver.echo(casper.fetchText('div#pm_error_msg'), 'ERROR');
		});	
		driver.then(function() {
			return callback(null);
		});
		
	});
};

//-----------------------------------------------Register  a Admin  user-----------------------------------------------------------
 profilePageMethod.enableUserRegister= function(data , casper , callback){
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		registerMethod.loginToForumBackEnd(casper, casper.test , function(err){
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
							casper.sendKeys('#autosuggest',data, {keepFocus: true});
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
									casper.test.assertExists('button[title="Close"]');
									casper.click('button[title="Close"]');
									wait.waitForTime(4000, casper, function() {
										casper.test.assertExists('div#account_sub_menu a[data-tooltip-elm="ddAccount"]');
										casper.click('div#account_sub_menu a[data-tooltip-elm="ddAccount"]');
										casper.test.assertExists('div#ddAccount a:nth-child(6)');
										casper.click('div#ddAccount a:nth-child(6)');	
										casper.echo('                    Logout Form BackEnd                     ' ,'INFO');
										return callback(null);
									});
								});
							},function fail(){
								casper.echo('form selector not found','ERROR');
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}
		});
	});
   
};

//------------------------------------------Enable change username  permissions for register user Method------------------------------------------

profilePageMethod.BackEndSettingsChangeUsernameEnable=function(casper , callback) {
	casper.thenOpen(config.backEndUrl , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('------------------Backend Method to enable change username  permissions for register user Method----------' ,'INFO');
		loginPrivacyOptionMethod.loginToForumBackEnd(casper , function(err) {	
			if (!err)
				casper.echo('LoggedIn to forum backend....', 'INFO');
		});
		wait.waitForElement('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', casper , function(err , isExists) {
			if(isExists) {
				casper.evaluate(function() {
					document.querySelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"').click();
 				});
				wait.waitForElement('div.tooltipMenu.text a[title="Assign permissions to user groups"]', casper , function(err , isExists) {
					if( isExists) {
						casper.evaluate(function() {
							document.querySelector('div.tooltipMenu.text a[title="Assign permissions to user groups"]').click();
						});
						casper.wait(1000, function(){
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
						});
						wait.waitForElement('button.button.btn-m.btn-blue' , casper , function(err , isExists) {
							if(isExists) {
								utils.enableorDisableCheckbox('change_username',true, casper, function(err) {
									if(!err)
										casper.echo('Successfully checked change username','INFO');
								});
								casper.click('button.button.btn-m.btn-blue');
								wait.waitForTime(15000, casper , function(){
									return callback(null);
								});
							}
						});
					}	
				});
			}
		});
	});		
};

//----------------------------------add a signature---------------------------------------------------------
profilePageMethod.addSignature=function(casper , callback) {

	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		
		casper.echo('**********add a signature method*************','INFO');
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
										//casper.sendKeys('input#imID', 'hell');
										//casper.sendKeys('input[id="birthDatepicker"]', '3/10/2001');
										wait.waitForTime(5000 , casper , function(){
											casper.click('#signature');
											wait.waitForTime(2000 , casper , function(err){
												casper.withFrame('signature_ifr', function() {
													casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
													casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
													casper.sendKeys('#tinymce', 'hello12');
												});
												wait.waitForTime(1000 , casper , function(err) {
													casper.capture('hell.png');
                      											casper.click('button[type="submit"]');
													wait.waitForVisible('ul.nav.pull-right span.caret' , casper , function(err , isExists){
casper.capture('hell2.png');
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

			
//---------------------------post method for newly registeruser-----------------------------------------------------	
profilePageMethod.profilePostNewlyRegister=function(casper , callback) {
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('------------------------------------post method called-------------------------------------------','INFO');
		casper.echo('***********Method to create post************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(loginJSON['validInfoRegisterUser'].username, loginJSON['validInfoRegisterUser'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists){
							if(isExists){
								casper.click('form[name="posts"] a.topic-title');
								wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' , casper , function(err , isExists){
									if(isExists) {
										casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
										wait.waitForTime(5000 , casper , function(err) {
											casper.withFrame('message_ifr', function() {
												casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});			
												casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
												casper.sendKeys('#tinymce', 'dragme');
											});
											casper.wait(5000 , function(){
												casper.test.assertExists('input[name="submitbutton"]','button found');
                                                                                                casper.click('input[name="submitbutton"]');
												wait.waitForTime(2000 , casper , function(err){
													
													forumLoginMethod.logoutFromApp(casper, function(err){
														if (!err)
															casper.echo('Successfully logout from application', 'INFO');
															return callback(null);
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
						
//---------------------------------Enable default option signature from-----------------------
profilePageMethod.BackEndSettingsDefaultOptionEnable=function(casper , callback) {
	casper.thenOpen(config.backEndUrl , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('------------------Backend Method to enable  default option signature ----------' ,'INFO');
		loginPrivacyOptionMethod.loginToForumBackEnd(casper , function(err) {	
			if (!err)
				casper.echo('LoggedIn to forum backend....', 'INFO');
		});
		wait.waitForElement('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', casper , function(err , isExists) {
			if(isExists) {
				casper.evaluate(function() {
					document.querySelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]').click();
 				});
				//casper.click('');
				wait.waitForElement('div#ddUsers div a:nth-child(9)', casper , function(err , isExists) {
					if(isExists){
						casper.click('div#ddUsers div a:nth-child(9)');
						wait.waitForElement('button.button.btn-m.btn-blue' , casper , function(err , isExists) {
							if(isExists) {
								casper.sendKeys('select[name="required_signature"] option[value="0"]', 'No');
								casper.click('select[name="visiblity_signature"]');
								casper.sendKeys('select[name="visiblity_signature"] option[value="2"]', 'Visible');
								wait.waitForTime(1000 , casper , function(err){								
									casper.click('button.button.btn-m.btn-blue');
								});
								wait.waitForTime(20000, casper , function(){
										return callback(null);
								});
							}
						});
					}
				});	
			}
		});
		
	});		
};

//---------------------------------Enable im-ID Element from default option----------------------------
profilePageMethod.BackEndSettingsDefaultOptionIMIDEnable=function(casper , callback) {
	casper.thenOpen(config.backEndUrl , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('------------------Backend Method to enable  im-ID Element from default option----------' ,'INFO');
		loginPrivacyOptionMethod.loginToForumBackEnd(casper , function(err) {	
			if (!err)
				casper.echo('LoggedIn to forum backend....', 'INFO');
		});
		wait.waitForElement('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', casper , function(err , isExists) {
			if(isExists) {
				casper.evaluate(function() {
					document.querySelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]').click();
 				});
				
				wait.waitForElement('div#ddUsers div a:nth-child(9)', casper , function(err , isExists) {
					if(isExists){
						casper.click('div#ddUsers div a:nth-child(9)');
						wait.waitForElement('button.button.btn-m.btn-blue' , casper , function(err , isExists) {
							if(isExists) {
								casper.sendKeys('select[name="required_imType"] option[value="0"]', 'No');
								casper.click('select[name="visiblity_imType"]');
								casper.sendKeys('select[name="visiblity_imType"] option[value="2"]', 'Visible');
								wait.waitForTime(1000 , casper , function(err){								
									casper.click('button.button.btn-m.btn-blue');
								});
								wait.waitForTime(20000, casper , function(){
										return callback(null);
								});
							}
						});
					}
				});	
			}
		});
		
	});		
};
						
//---------------------------------Enable birthday- picker Element from default option----------------------------
profilePageMethod.BackEndSettingsDefaultOptionBirtdayEnable=function(casper , callback) {
	casper.thenOpen(config.backEndUrl , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('------------------Backend Method to enable  birthday- picker Element from default option-----------' ,'INFO');
		loginPrivacyOptionMethod.loginToForumBackEnd(casper , function(err) {	
			if (!err)
				casper.echo('LoggedIn to forum backend....', 'INFO');
		});
		wait.waitForElement('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', casper , function(err , isExists) {
			if(isExists) {
				casper.evaluate(function() {
					document.querySelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]').click();
 				});
				
				wait.waitForElement('div#ddUsers div a:nth-child(9)', casper , function(err , isExists) {
					if(isExists){
						casper.click('div#ddUsers div a:nth-child(9)');
						wait.waitForElement('button.button.btn-m.btn-blue' , casper , function(err , isExists) {
							if(isExists) {
								casper.sendKeys('select[name="required_dob"] option[value="0"]', 'No');
								casper.click('select[name="visiblity_dob"]');
								casper.sendKeys('select[name="visiblity_dob"] option[value="2"]', 'Visible');
								wait.waitForTime(1000 , casper , function(err){								
									casper.click('button.button.btn-m.btn-blue');
								});
								wait.waitForTime(20000, casper , function(){
										return callback(null);
								});
							}
						});
					}
				});	
			}
		});
		
	});		
};














































