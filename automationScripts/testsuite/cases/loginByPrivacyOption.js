var config = require('../../../config/config.json');
var json = require('../../testdata/inContextLogin.json');
var loginPrivacyOptionMethod = require('../methods/loginByPrivacyOption.js');
var inContextLoginMethod=require('../methods/inContextLogin.js');

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
		inContextLoginMethod.loginToApp(json['validInfo'].username, json['validInfo'].password, casper, function(err) {
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
		inContextLoginMethod.loginToApp(json['validInfo'].username, json['validInfo'].password, casper, function(err) {
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
		inContextLoginMethod.loginToApp(json['validInfo'].username, json['validInfo'].password, casper, function(err) {
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
	casper.thenOpen(config.url ,function(){		
		casper.echo('***********Check Login from Calender option is side menu**************','INFO');	
		casper.click('i.icon.icon-menu');
		casper.click('ul#calendars_toggle_link');
		
	});
};

//loginPrivacyOptionTests.loginPrivacyFrmCalender
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
							'paypal_email_address':'support@websitetoolbox.com'
						},false);
						casper.click('select#paid_access_area');
						casper.click('button.button.btn-m.btn-blue');
						casper.thenOpen(config.url, function() {
							casper.click('i.icon.icon-menu');
							casper.click('a#paid_access_donate_link');
							inContextLoginMethod.loginToApp(json['validInfo'].username, json['validInfo'].password, casper, function(err) {
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









