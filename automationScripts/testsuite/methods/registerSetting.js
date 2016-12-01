'use strict';
var registerMethod = require('./register.js');
var wait = require('../wait.js');
var registerSettingMethods=module.exports = {};
var errorMessage = "";


//Method For Filling Data In Default Registration Options
 registerSettingMethods.registerBackUrl= function(Data, casper, callback) {
	     //Open Back-End URL And Get Title
		casper.thenOpen(config.backEndUrl, function() {
			casper.echo('Title of the page :' +this.getTitle(), 'INFO');
			try {
				casper.test.assertExists('a[href="/tool/members/login?action=logout"]');
				casper.click('a[href="/tool/members/login?action=logout"]');
			}catch(e) {
				casper.test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
			}
		});
		registerMethod.loginToForumBackEnd(casper, casper.test, function() {
		casper.echo('Successfully Login To Forum Back End...........', 'INFO');
		//Clicking On "General" Tab Under Settings 
		wait.waitForElement('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', casper, function(err, isExist) {
			if(!err){
				if(isExist) {
					casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
					casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
					casper.test.assertExists('a[href="/tool/members/mb/fields?action=default_registration_option"]');
					casper.click('a[href="/tool/members/mb/fields?action=default_registration_option"]');
					casper.echo('Successfully open Default Option page.....', 'INFO');
					wait.waitForElement('form[name="posts"]', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								 registerSettingMethods.registerEditProfile(Data, casper, function(err){
									if(!err){
											//Clicking On "General" Tab Under Settings 
										wait.waitForElement('p[align="center"] font[color="red"]', casper, function(err, isExist) {
											if(!err){
												if(isExist) {
													casper.test.assertExists('p[align="center"] font[color="red"]');
													var message = casper.fetchText('p[align="center"] font[color="red"]');
													casper.echo("message : "+message, 'INFO');
													var expectedErrorMsg = 'Your profile fields have been updated.';
													casper.test.assertEquals(message, expectedErrorMsg);
													casper.test.assertExists('a[href="/tool/members/login?action=logout"]');
													casper.click('a[href="/tool/members/login?action=logout"]');
												     //start from forum url
													casper.thenOpen(config.url, function() {
														casper.echo('Title of the page :' +this.getTitle(), 'INFO');
														wait.waitForElement('.pull-right a[href="/register/register"]', casper, function(err, isExist) {
															if(!err){
																if(isExist) {
																	casper.test.assertExists('.pull-right a[href="/register/register"]');
																	casper.click('.pull-right a[href="/register/register"]');
																	casper.echo('Successfully open register form.....', 'INFO');
																	return callback(null);
																} else {
																	casper.echo('User didn\'t not found any register link', 'ERROR');
																	return callback(null);
																}
															}
														});
													});

												} else {
												casper.echo('Default registration message not generated', 'ERROR');
												}
											}
										});
									}
								});
							} else {
							casper.echo('Default registration form not found', 'ERROR');
							}
						}
					});	
				} else {
				casper.echo('Setting Link Not Found', 'ERROR');
				}
			}
		});		

	});		
};

//Method For Filling Data In Default Registration Options
 registerSettingMethods.registerFrontUrl= function(functioncall,casper,callback) {
	functioncall;
	return callback(null);		
};




//Method For Filling Data In Default Registration Options
registerSettingMethods.registerEditProfile = function(data, driver, callback) {		
	try {
		driver.test.assertExists('form[name="posts"] select[name="required_name"] ');
		driver.fill('form[name="posts"]', {
			'required_name' : data.required,
			'visiblity_name' : data.visiblity,
	},false);
	
	} catch(e) {
		driver.test.assertDoesntExist('form[name="posts"] select[name="required_name"]');
	}
	/*try {
		driver.test.assertExists('form[name="posts"] select[name="required_imType"] ');
		driver.fill('form[name="posts"] select[name="required_imType"]', {
			'required_imType' : data.required,
			'visiblity_imType' : data.visiblity,
	},false);
	} catch(e) {
		driver.test.assertDoesntExist('form[name="posts"] select[name="required_imType"]');
	}
	try {
		driver.test.assertExists('form[name="posts"] select[name="required_dob"] ');
		driver.fill('form[name="posts"] select[name="required_dob"]', {
			'required_dob' : data.required,
			'visiblity_dob' : data.visiblity,
	},false);
	} catch(e) {
		driver.test.assertDoesntExist('form[name="posts"] select[name="required_dob"] ');
	}
	try {
		driver.test.assertExists('form[name="posts"] select[name="required_signature"] ');
		driver.fill('form[name="posts"] select[name="required_signature"]', {
			'required_signature' : data.required,
			'visiblity_signature' : data.visiblity,
	},false);
	} catch(e) {
		driver.test.assertDoesntExist('form[name="posts"] select[name="required_signature"] ');
	}
*/
	driver.test.assertExists('form[name="posts"] button');
	driver.click('form[name="posts"] button');
	
	return callback(null);		
};






