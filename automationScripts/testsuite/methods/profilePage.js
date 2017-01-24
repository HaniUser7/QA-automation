var loginPrivacyOptionMethod = require('../methods/loginByPrivacyOption.js');
var inContextLoginMethod = require('../methods/inContextLogin.js');
var wait=require('../wait.js');
var utils=require('../utils.js');
var json = require('../../testdata/inContextLogin.json');

var profilePageMethod = module.exports = {};


profilePageMethod.fillDataToMessage = function(driver, callback) {
	
	driver.fillSelectors('form#PostPrivateMessage',{	
		'input#tokenfield_typeahead-tokenfield':'hani',
		'input#pm_subject':'Message',
		//'#tinymce':'hello how are you'
	},false);
	
	casper.evaluate(function() {
		document.querySelector('a#send_pmsg_button').click();
	});	
	//driver.click('a[href="/file?id=16747797"]');
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
		//driver.waitUntilVisible('div#loading_msg', function() {
			//driver.echo(casper.fetchText('div#loading_msg p'), 'INFO');
			driver.waitUntilVisible('div#ajax-msg-top', function success() {
				driver.echo(driver.fetchText('div#ajax-msg-top p'),'INFO');
			}, function fail() {
				driver.echo(casper.fetchText('div#pm_error_msg'), 'ERROR');
			});	
			driver.then(function() {
				return callback(null);
			});
		//});
	});
};





//--------------------------------------------BackEndSettings For message Button-----------------------------------------
profilePageMethod.messageButtonEnable= function(driver , callback){

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
						utils.enableorDisableCheckbox('allow_pm',true, casper, function(err) {
							if(!err)
								casper.echo('Successfully checked','INFO');
						});
						casper.click('button.button.btn-m.btn-blue');
					}
				});
			}
		});
	});
			
};

//---------------------------------------------BackEndSettings For message Button Disable--------------------------------------
profilePageMethod.messageButtonDisable= function(driver , callback){

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
						casper.wait(10000 , function(){

							casper.capture('o.png');
						});
					}
				});
			}
		});
	});
			
};

//-----------------------------------------create a post method for register user------------------------------------------
profilePageMethod.profilePost=function(driver , callback) {
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('------------------------------------post method called-------------------------------------------','INFO');
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


//------------------------------------------BackEndSettings For reputation Disable-----------------------------------------------
profilePageMethod.reputationDisable= function(driver , callback){
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
 						utils.enableorDisableCheckbox('reputation',false , casper, function() {
 							casper.echo('successfully unchecked', 'INFO');
 						});
						casper.click('button.button.btn-m.btn-blue');
						wait.waitForTime(10000 , casper , function(err) {
							casper.capture('reputationunchecked.png');
						});
					}
				});
			}
		});
	});
};
 		
//------------------------------------------BackEndSettings For reputation Enable-----------------------------------------------
profilePageMethod.reputationEnable= function(driver , callback){
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
 						utils.enableorDisableCheckbox('reputation',true , casper, function() {
 							casper.echo('successfully checked', 'INFO');
 						});
						casper.click('button.button.btn-m.btn-blue');
						wait.waitForTime(15000 , casper , function(err) {
							casper.capture('reputationunchecked.png');
						});
					}
				});
			}
		});
	});
};
 	
//------------------------------------------disable signature permissions for register user Method------------------------------------------

profilePageMethod.BackEndSettingsSignatureDisable=function(driver , callback) {
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
								utils.enableorDisableCheckbox('allow_signature',false, casper, function(err) {
									if(!err)
										driver.echo('Successfully unchecked edit own post','INFO');
								});
								casper.click('button.button.btn-m.btn-blue');
								wait.waitForTime(10000, casper , function(){

									casper.capture('signature.png');
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

profilePageMethod.BackEndSettingsSignatureEnable=function(driver , callback) {
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
								utils.enableorDisableCheckbox('allow_signature',true, casper, function(err) {
									if(!err)
										driver.echo('Successfully unchecked edit own post','INFO');
								});
								casper.click('button.button.btn-m.btn-blue');
								wait.waitForTime(10000, casper , function(){

									casper.capture('signature.png');
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
	casper.echo('signature method called' ,'INFO');
	driver.waitForSelector('button[type="submit"]',function success() {								
		driver.sendKeys('input[id="imID"]', data.Instantmessage, {reset:true});	
		driver.sendKeys('input[id="birthDatepicker"]', data.birthday, {reset:true});
                try {
				driver.echo('try block called' ,'INFO');
				driver.test.assertExists('a#edit_signature small.text-muted.glyphicon.glyphicon-pencil');
                        	driver.click('a#edit_signature small.text-muted.glyphicon.glyphicon-pencil');
				wait.waitForTime(5000 , casper , function(){

					driver.capture('pic1.png');
				});
                       		driver.withFrame('signature_ifr', function() {
					driver.sendKeys('#tinymce', driver.page.event.key.Ctrl,driver.page.event.key.A, {keepFocus: true});			
					driver.sendKeys('#tinymce', driver.page.event.key.Backspace, {keepFocus: true});
					driver.sendKeys('#tinymce',data.signature);
				});
			}catch(e){
				casper.click('a#signature');
				driver.withFrame('signature_ifr', function() {
					driver.sendKeys('#tinymce', driver.page.event.key.Ctrl,driver.page.event.key.A, {keepFocus: true});			
					driver.sendKeys('#tinymce', driver.page.event.key.Backspace, {keepFocus: true});
					driver.sendKeys('#tinymce',data.signature);
				});
			}
			wait.waitForTime(5000 , casper , function(err) {
				casper.capture('pic.png');
                      		casper.click('button[type="submit"]');
		      		wait.waitForElement('div.alert.alert-danger.text-center' , casper , function(err , isExists) {
		      			if(isExists) {
						casper.capture('8.png');
						var successMessage = casper.fetchText('div.alert.alert-danger.text-center');
						casper.echo('success message'+successMessage ,'INFO');
							
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
profilePageMethod.BackEndSettingsDisableCustomTitle=function(driver , callback) {
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
								utils.enableorDisableCheckbox('allow_customtitle',false, casper, function(err) {
									if(!err)
										driver.echo('Successfully unchecked custom Title','INFO');
								});
								casper.click('button.button.btn-m.btn-blue');
								wait.waitForTime(10000, casper , function(){

									casper.capture('signature.png');
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
profilePageMethod.BackEndSettingsEnableCustomTitle=function(driver , callback) {
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
								utils.enableorDisableCheckbox('allow_customtitle',true, casper, function(err) {
									if(!err)
										driver.echo('Successfully checked custom Title','INFO');
								});
								casper.click('button.button.btn-m.btn-blue');
								wait.waitForTime(10000, casper , function(){

									casper.capture('signature.png');
								});
							}
						});
					}	
				});
			}
		});
	});		
};




















































