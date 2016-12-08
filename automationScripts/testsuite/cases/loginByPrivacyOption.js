var config = require('../../../config/config.json');
var json = require('../../testdata/inContextLogin.json');
var loginPrivacyOptionMethod = require('../methods/loginByPrivacyOption.js');
var inContextLoginMethod=require('../methods/inContextLogin.js');
var utils=require('../utils.js')
loginPrivacyOptionTests= module.exports = {};
var wait=require('../wait.js');

//Enable "Force Guest Login/ Privacy Private" option to check Incontext Login to Guest User from Backend
loginPrivacyOptionTests.loginPrivacyOption=function(){
	loginPrivacyOptionMethod.loginToForumBackEnd(casper , function(err) {
		if (!err)
			casper.echo('LoggedIn to forum backend....', 'INFO');
	});
	wait.waitForElement('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', casper , function(err , isExists) {
		if(isExists) {
			casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');	
			casper.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
			wait.waitForElement('select#privacy', casper , function(err , isExists) {
				if(isExists) {
					casper.click('select#privacy');
					casper.sendKeys('select[name="privacy"] option[value="private"]', 'privacy');
					casper.capture('222.png');
					casper.click('button.button.btn-m.btn-blue');
					casper.thenOpen(config.url, function() {
					
	
					});					
				}
			});	
		}
	});
};

//Check login while launching app

loginPrivacyOptionTests.loginPrivacylaunchapp=function() {
	casper.thenOpen(config.url ,function(){
		casper.echo('*********Check login while launching app****************','INFO');
		inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
			if (err) {
					casper.echo("Error occurred in callback user not logged-in", "ERROR");
			}else {
				casper.echo('Processing to Login on forum.....', 'INFO');
				wait.waitForTime(1000 , casper , function(err){
					wait.waitForElement('ul.nav.pull-right span.caret', casper , function(err, isExists){
						if(isExists) {
							inContextLoginMethod.logoutFromApp(casper, function(err){
								if (!err)
									casper.echo('Successfully logout from application', 'INFO');
							});
						}else {
							casper.echo('Toggle selector not found after login ul.nav.pull-right span.caret','ERROR');
						}
					});
			       });
			}
		});
	});
};

//Check Login from Topic option in side menu

loginPrivacyOptionTests.loginPrivacyFrmMainMenu=function() {
	casper.thenOpen(config.url ,function(){	
		casper.echo('*********Check Login from Topic option in side menu****************','INFO');	
		casper.click('i.icon.icon-menu');
		casper.click('li#latest_topics_show a');
		inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
			if (err) {
					casper.echo("Error occurred in callback user not logged-in", "ERROR");
			}else {
				casper.echo('Processing to Login on forum.....', 'INFO');
				wait.waitForTime(1000 , casper , function(err){
					wait.waitForElement('ul.nav.pull-right span.caret', casper , function(err, isExists){
						if(isExists) {
							inContextLoginMethod.logoutFromApp(casper, function(err){
								if (!err)
									casper.echo('Successfully logout from application', 'INFO');
							});
						}else {
							casper.echo('Toggle selector not found after login ul.nav.pull-right span.caret','ERROR');
						}
					});
			       });
			}
		});
	});
};

//Check Login from Members option is side menu

loginPrivacyOptionTests.loginPrivacyFrmMember=function() {
	casper.thenOpen(config.url ,function(){		
		casper.echo('*********Check Login from Members option in side menu****************','INFO');		
		casper.click('i.icon.icon-menu');
		casper.click('li#members_list_show a');
		casper.click('li#latest_topics_show a');
		inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
			if (err) {
					casper.echo("Error occurred in callback user not logged-in", "ERROR");
			}else {
				casper.echo('Processing to Login on forum.....', 'INFO');
				wait.waitForTime(1000 , casper , function(err){
					wait.waitForElement('ul.nav.pull-right span.caret', casper , function(err, isExists){
						if(isExists) {
							inContextLoginMethod.logoutFromApp(casper, function(err){
								if (!err)
									casper.echo('Successfully logout from application', 'INFO');
							});
						}else {
							casper.echo('Toggle selector not found after login ul.nav.pull-right span.caret','ERROR');
						}
					});
			       });
			}
		});
	});
};

//Check Login from Calender option is side menu
//calender id require in this testcase

loginPrivacyOptionTests.loginPrivacyFrmCalender=function() {
	casper.thenOpen(config.backEndUrl ,function(){			
		casper.echo('***********Check Login from calender option in side menu**************','INFO');		
		loginPrivacyOptionMethod.loginToForumBackEnd(casper , function(err) {
			if (!err)
				casper.echo('LoggedIn to forum backend....', 'INFO');
		});
		wait.waitForElement('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', casper , function(err, isExists) {
			if(isExists) {
				casper.evaluate(function() {
					document.querySelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"').click();
				});
				wait.waitForElement('div.tooltipMenu.text a[title="Assign permissions to user groups"]', casper , function(err , isExists) {
					if( isExists) {
						casper.evaluate(function() {
							document.querySelector('div.tooltipMenu.text a[title="Assign permissions to user groups"]').click();
						});
						wait.waitForTime(1000 , casper , function(err) {
							var grpName = casper.evaluate(function(){
	       								for(var i=1; i<=7; i++) {
	        								var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
										if (x1.innerText == 'Unregistered / Not Logged In') {
											document.querySelector('tr:nth-child('+i+') td:nth-child(3) a').click();
											var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('href');
											return x2;
										}
									}
								});
								casper.echo("message : "+grpName, 'INFO');
								casper.click('div.tooltipMenu a[href="'+grpName+'"]');
								wait.waitForElement('button.button.btn-m.btn-blue' , casper , function (err , isExists) {
									if(isExists) {
										utils.enableorDisableCheckbox('view_calendar',false, casper, function(err) {
											if(!err)
												casper.echo('Successfully unchecked','INFO');
										});										
										casper.thenOpen(config.url , function() {
											wait.waitForElement('i.icon.icon-menu' ,casper , function (err ,isExists) {
												if(isExists) {
													casper.click('i.icon.icon-menu');
													casper.click('li#calenders_show a');

													inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
														if (err) {
															casper.echo("Error occurred in callback user not logged-in", "ERROR");
														}else {
															casper.echo('Processing to Login on forum.....', 'INFO');
															wait.waitForTime(1000 , casper , function(err){
															wait.waitForElement('ul.nav.pull-right span.caret', casper , function(err, isExists){
																if(isExists) {
															inContextLoginMethod.logoutFromApp(casper, function(err){
																	if (!err)
																	casper.echo('Successfully logout from application', 'INFO');
																});
																	}else {
																	casper.echo('Toggle selector not found after login ul.nav.pull-right span.caret','ERROR');
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
						}
					});
				}
			});
		});
};

//loginPrivacyOptionTests.loginPrivacyFrmDonate
loginPrivacyOptionTests.loginPrivacyDonate=function() {
	casper.thenOpen(config.backEndUrl ,function(){			
		casper.echo('***********Check Login from Donate option is side menu**************','INFO');		
		loginPrivacyOptionMethod.loginToForumBackEnd(casper , function(err) {
			if (!err)
				casper.echo('LoggedIn to forum backend....', 'INFO');
		});
		wait.waitForElement('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', casper , function(err , isExists) {
			if(isExists) {
				casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');	
				casper.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Paid+Access"]');
				wait.waitForElement('input#paypal_email_address', casper , function(err , isExists) {
					if(isExists) {
						casper.fill('form#frmForumSettings',{
							'paypal_email_address':'support@websitetoolbox.com',
							 'paid_access_donation':'1'
							
						},false);
						casper.click('select#paid_access_area');
						casper.click('button.button.btn-m.btn-blue');
						casper.thenOpen(config.url, function() {
							casper.click('i.icon.icon-menu');
							casper.click('a#paid_access_donate_link');
							inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
								if (err) {
									casper.echo("Error occurred in callback user not logged-in", "ERROR");
								}else {
									casper.echo('Processing to Login on forum.....', 'INFO');
									wait.waitForTime(1000 , casper , function(err){
										wait.waitForElement('ul.nav.pull-right span.caret', casper , function(err, isExists){
											if(isExists) {
												inContextLoginMethod.logoutFromApp(casper, function(err){
													if (!err)
														casper.echo('Successfully logout from application', 'INFO');
												});
											}else {
												casper.echo('Toggle selector not found after login ul.nav.pull-right span.caret','ERROR');
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









