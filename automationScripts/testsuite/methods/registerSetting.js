'use strict';
var wait = require('../wait.js');
var registerSettingMethod=module.exports = {};
var errorMessage = "";

//Method for logout from application
registerSettingMethod.logoutFromApp = function(driver,test, callback) {
	
	try {
		test.assertExists('div#account_sub_menu a:nth-of-type(2)');
		driver.click('div#account_sub_menu a:nth-of-type(2)');
		try{
			test.assertExists('div#ddAccount a:nth-of-type(5)');
			driver.click('div#ddAccount a:nth-of-type(5)');
			wait.waitForElement('div#content_wrapper div.text', casper, function(err, isExist) {
				if(isExist) {
					var logout = driver.fetchText('div#content_wrapper div.text');
					driver.echo("message : "+logout, 'INFO');
					return callback(null);
				} else {
					driver.echo('Logout  message not generated', 'ERROR');
					return callback(null);
				}
			});
		} catch(e) {
			driver.test.assertDoesntExist('div#ddAccount a:nth-of-type(5)');
			return callback(null);
		}
	} catch(e) {
		driver.test.assertDoesntExist('div#account_sub_menu a:nth-of-type(2)');
		return callback(null);
	}
};

//Method For Filling Data In Default Registration Options
registerSettingMethod.registerEditProfile = function(data, driver, callback) {		
	try {
		driver.test.assertExists('form[name="posts"] select[name="required_name"] ');
		driver.fill('form[name="posts"]', {
			'required_name' : data.required,
			'visiblity_name' : data.visiblity,
		},false);
	} catch(e) {
	    driver.test.assertDoesntExist('form[name="posts"] select[name="required_name"]');
	}
	
	try {
		driver.test.assertExists('form[name="posts"] select[name="required_imType"]');
		driver.fill('form[name="posts"] ', {
			'required_imType' : data.required,
			'visiblity_imType' : data.visiblity,
		},false);
	} catch(e) {
	    driver.test.assertDoesntExist('form[name="posts"] select[name="required_imType"]');
	}
	
	try {
		driver.test.assertExists('form[name="posts"] select[name="required_dob"] ');
		driver.fill('form[name="posts"] ', {
			'required_dob' : data.required,
			'visiblity_dob' : data.visiblity,
		},false);
	} catch(e) {
	    driver.test.assertDoesntExist('form[name="posts"] select[name="required_dob"] ');
	}
	
	try {
		driver.test.assertExists('form[name="posts"] select[name="required_signature"] ');
		driver.fill('form[name="posts"] ', {
			'required_signature' : data.required,
			'visiblity_signature' : data.visiblity,
		},false);
	} catch(e) {
	    driver.test.assertDoesntExist('form[name="posts"] select[name="required_signature"] ');
	}

	driver.test.assertExists('form[name="posts"] button');
	driver.click('form[name="posts"] button');

	return callback(null);		
};






