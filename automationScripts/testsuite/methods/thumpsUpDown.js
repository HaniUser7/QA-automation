/***These are the function which has been called in thumpsUpDown.js and also will be used in other js file as per requirement**********/

'use strict';
var registerMethod = require('./methods/register.js');
var thumpsUpDownMethod = module.exports = {};
//*************************************************PRIVATE METHODS***********************************************

//Method For Verifying Error Message On Thums UP/DOWN
thumpsUpDownMethod.verifyErrorMsg = function(errorMessage, expectedErrorMsg, msgTitle, driver, callback) {
	driver.echo('Actual Error message : '+errorMessage, 'INFO');
	driver.echo('Expected Error message : '+expectedErrorMsg, 'INFO');
	if((errorMessage == expectedErrorMsg) || (errorMessage.indexOf(expectedErrorMsg) > -1)) {
		driver.echo('Error message is verified when user try to edit with "' +msgTitle+'"', 'INFO');
	} else {
		driver.echo("Error Message Is Not Correct", 'ERROR');
	}
	return callback(null);
};

//Method For Verifying Success Message On Thums UP/DOWN
thumpsUpDownMethod.verifySuccessMsg = function(successMsg, expectedSuccessMsg, msgTitle, driver, callback) {
	driver.echo('Actual Success message : '+successMsg, 'INFO');
	driver.echo('Expected Success message : '+expectedSuccessMsg, 'INFO');
	if((successMsg == expectedSuccessMsg) || (successMsg.indexOf(expectedSuccessMsg) > -1)) {
		driver.echo('Success message is verified when user try to edit with "' +msgTitle+'"', 'INFO');
	} else {
		driver.echo("Error Message Is Not Correct", 'ERROR');
	}
	return callback(null);
};

// method for goto New Topic page to application
thumpsUpDownMethod.gotoNewTopicpage = function(driver, callback) {
	driver.test.assertExists('#links-nav');
	driver.click('#links-nav');
	driver.test.assertExists('#latest_topics_show');
	driver.click('#latest_topics_show');
	driver.waitForSelector('a[href="/post/printadd"]', function success() {
		this.click('a[href="/post/printadd"]');
		return callback(null);
	});
};

// method for goto post topic page to application
thumpsUpDownMethod.postTopicpage = function(data, driver, callback) {
	casper.echo("data.title : "+data.title, 'INFO');
	casper.echo("data.content : "+data.content, 'INFO');
	casper.echo("data.category : "+data.category, 'INFO');
	driver.sendKeys('input[name="subject"]', data.title, {reset:true});
	driver.withFrame('message_ifr', function() {
		this.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
		this.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
 		this.sendKeys('#tinymce', data.content);
	});	
		driver.wait(3000);
		driver.click('#all_forums_dropdown');
		driver.fill('form[name="PostTopic"]',{
			'forum' : data.category
		},false);
	
	driver.then(function() {
		driver.click('#post_submit');
	});
	
	return callback(null);
};

//Method For Enabling View Profile For Registered User
thumpsUpDownMethod.viewChangePermission = function(driver, test, callback) {
	try {
		test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		try {
			test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			driver.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			driver.waitForSelector('table.text.fullborder', function success() {
				var grpName = this.evaluate(function(){
					for(var i=1; i<=7; i++) {
						var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
						if (x1.innerText == 'Registered Users') {
							var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('href');
							return x2;
						}
					}
				});
				this.click('a[href="'+grpName+'"]');
				return callback(null);
			}, function fail() {
				driver.echo('ERROR OCCURRED', 'ERROR');
			});
		}catch(e) {
			test.assertDoesntExist('div#ddUsers a[href="/tool/members/mb/usergroup"]');
		}
	}catch(e) {
		test.assertDoesntExist('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	}
};
thumpsUpDownMethod.disableViewProfile = function(driver, test, callback) {
//Login To Forum Back-end And Change Permissions From back End
	driver.then(function() {
		registerMethod.loginToForumBackEnd(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('div#my_account_forum_menu', function success() {
					thumpsUpDownMethod.viewChangePermission(casper, test, function(err) {
						if(!err) {
							casper.waitForSelector('#view_profiles', function success() {
								casper.echo('Opened Change Permission Page Successfully', 'INFO')
								try {
									utils.enableorDisableCheckbox('view_profiles', false, casper, function() {
										casper.echo('checkbox is unchecked', 'INFO');
									});
									try {
										test.assertExists('button.button.btn-m.btn-blue');
										this.click('button.button.btn-m.btn-blue');
										casper.waitForSelector('font[color="red"]', function() {
											var successMsg = this.fetchText('font[color="red"]');
											var expectedSuccessMsg = 'Your user group settings have been updated.';
											if(successMsg && successMsg!= '')
												verifySuccessMsg(successMsg, expectedSuccessMsg, 'UncheckedViewProfile', casper, function() {
											});
										});
									}catch(e) {
										test.assertDoesntExist('button.button.btn-m.btn-blue');
									}
					
								}catch(e) {
									test.assertDoesntExist('#view_messageboard');
								}
							}, function fail() {
								casper.echo('ERROR OCCURRED', 'ERROR');
							});
						}else {
							casper.echo('Error : '+err, 'INFO');
						}
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});
}
