'use strict';
var forumLoginMethod = require('../methods/login.js');
var json = require('../../testdata/registerData.json');
var wait = require('../wait.js');
var utils = require('./utils.js');
var config = require('../../../config/config.json');
var registerMethod=module.exports = {};

/************************************PRIVATE METHODS***********************************/

//Login To Forum Back End

registerMethod.loginToForumBackEnd = function(driver, callback) {
		
	//Click On Login Link 
	wait.waitForElement('a#navLogin', driver, function(err, isExist) {
		if(isExist) {
			driver.click('a#navLogin');
			driver.echo('Successfully open login form.....', 'INFO');
			fillDataToLogin(config.backendCred, driver, function(err) {
				if (!err)
					driver.echo('Proccessing to login on forum back end....', 'INFO');
					
					
			});
		} else {
			driver.echo('Login Link Not Found', 'ERROR');
		}
		return callback(null);
		
	});
};


//Method For Filling Data In Login Form(Back end)
var fillDataToLogin = function(data, driver, callback) {
	driver.fill('form[name="frmLogin"]', {
		'username' : data.uname,
		'password' : data.upass,
	}, false);
	driver.test.assertExists('form[name="frmLogin"] button');
	driver.click('form[name="frmLogin"] button');
	return callback(null);
};


//Method For Filling Data In Registration Form
registerMethod.registerToApp = function(data, driver, callback) {
	driver.fill('form[name="PostTopic"]', {
		'member' : data.uname,
		'email': data.uemail,
		'pw' : data.upass
		
	}, false);
	
	try {
		driver.test.assertExists('form[name="PostTopic"] input[name="name"]');
		driver.fill('form[name="PostTopic"]', {
			'name' : data.fullName,
			'name_private' : true
		}, false);
	} catch(e) {
		driver.test.assertDoesntExist('form[name="PostTopic"] input[name="name"]');
	}
	
	try {
		driver.test.assertExists('form[name="PostTopic"] input[name="imID"]');
		driver.fill('form[name="PostTopic"]', {
			'imID' : data.imID
		}, false);
	} catch(e) {
		driver.test.assertDoesntExist('form[name="PostTopic"] input[name="imID"]');
	}
	
	try {
		driver.test.assertExists('form[name="PostTopic"] div.sign-container');
		driver.fill('form[name="PostTopic"]', {
			'signature' : data.usignature
		}, false);
	} catch(e) {
		driver.test.assertDoesntExist('form[name="PostTopic"] div.sign-container');
	}
	
	try {
		driver.test.assertExists('form[name="PostTopic"] input[name="birthDatepicker"]');
		driver.sendKeys('input[name="birthDatepicker"]', data.birthday, {reset : true});
	} catch(e) {
		driver.test.assertDoesntExist('form[name="PostTopic"] input[name="birthDatepicker"]');
	}
	
	try {
		driver.test.assertExists('form[name="PostTopic"] input[name="rules_checkbox"]');
		utils.enableorDisableCheckbox('rules_checkbox', true, driver, function() {
			driver.echo("Rules Checkbox Has Been Enabled For User", 'INFO');
		});
	} catch(e) {
		driver.test.assertDoesntExist('form[name="PostTopic"] input[name="rules_checkbox"]');
	}
	
	/*var actionValue = driver.evaluate(function() {   
		document.querySelector('form[name="PostTopic"]').setAttribute('action', '/register/create_account?apikey=4XXhjFbE6fBhmfFwGWkmjgPIN4UKBFDYdSWGcR4q&type=json');
		return document.querySelector('form[name="PostTopic"]').getAttribute('action');     
	});*/
	
	driver.test.assertExists('form[name="PostTopic"] button');
	driver.click('form[name="PostTopic"] button');
	return callback(null);		
};

//Method For Verifying Error Message On Registration Form After Submitting Form

registerMethod.verifyErrorMsg = function(errorMessage, expectedErrorMsg, msgTitle, driver, callback) {
	driver.echo('Actual Error message : '+errorMessage, 'INFO');
	driver.echo('Expected Error message : '+expectedErrorMsg, 'INFO');
	if((errorMessage == expectedErrorMsg) || (errorMessage.indexOf(expectedErrorMsg) > -1)) {
		driver.echo('Error message is verified when user try to edit with "' +msgTitle+'"', 'INFO');
	} else {
		driver.echo("Error Message Is Not Correct", 'ERROR');
	}
	return callback(null);
};

//Logout To Forum Front End

registerMethod.redirectToLogout = function(driver, test, callback) {
	try {
		driver.test.assertExists('div.bmessage');
		var message = driver.fetchText('div.bmessage');
		var successMsg = message.substring(0, message.indexOf('<'));
		var expectedSuccessMsg = json['validInfo'].expectedSuccessMsg;
		driver.test.assertEquals(successMsg.trim(), expectedSuccessMsg.trim());
		driver.echo('Successfully done registration on forum.....', 'INFO');
		
		

		//Clicking On 'Back To Category' Link 
		wait.waitForElement('small a[href="/categories"]', casper, function(err, isExist) {
			if(isExist) {
				driver.click('small a[href="/categories"]');
				driver.echo('Successfully back to category', 'INFO');
				forumLoginMethod.logoutFromApp(driver, function(err) {
				if (!err)
					driver.echo('Successfully logout from application', 'INFO');
				});
			}
		});
	} catch(e) {
		try {
			driver.test.assertExists('#registerEditProfile div[role="alert"]');
			var errorMessage = driver.fetchText('#registerEditProfile div[role="alert"]');
			var expectedErrorMsg = "It looks like you already have a forum account!";
			//driver.echo('........errorMessage : ' +errorMessage+ '\nexpectedErrorMsg : ' +expectedErrorMsg, 'ERROR');
			driver.test.assert(errorMessage.indexOf(expectedErrorMsg) > -1);
			//driver.echo('........', 'ERROR');
			driver.echo('USER ALREADY REGISTERED ON FORUM.....', 'INFO');
			return callback(null);
		} catch(e1) {
			driver.echo('Successfully done registration on forum.....', 'INFO');
			casper.wait(2000 , function(){
				casper.capture('3.png');

			});
			//Click On Logout Link
			wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
			    if(isExist) {
					forumLoginMethod.logoutFromApp(driver, function(err) {
						if (!err)
							driver.echo('Successfully logout from application', 'INFO');
					});
				}else{
				  casper.echo('logout link not found');
				}
			});
		}
	}
	driver.then(function() {
		return callback(null);
	});
};


