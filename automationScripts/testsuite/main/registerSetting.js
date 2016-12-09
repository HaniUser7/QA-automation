/****This script is dedicated for Back-end registration Setting changes permission in back-end and check front on the forum. It covers testing of registration page with all defined validations****/
'use strict';

var config = require('../../../config/config.json');
var registerSettingTest = require('../cases/registerSetting.js');
var registerSetting = module.exports = {};


registerSetting.featureTest = function(casper, test) {
 
	casper.start(config.backEndUrl, function() {

		this.echo('Title Of The Page :' +this.getTitle(), 'INFO');

		//1.Test case for Back-end Full Name front end Registration with Full name blank data
		registerSettingTest.fullNameBlankData();

		//2.Test case for Back-end Birthday front end Registration with Birthday blank data
		registerSettingTest.birthdayBlankData();

		//3.Test case for Back-end Signature end Registration with Signature blank data
		registerSettingTest.signatureBlankData();

		//4.Test case for Back-end instantMessage front end Registration with instantMessage blank data
		registerSettingTest.instantMessageBlankData();

		//5.verify Full Name Back End And Fornt End Registration Page Full Name Enable/Disable
		registerSettingTest.labelFullName();

		//6.verify Birthday Back End And Fornt End Registration Page Birthday Enable/Disable
		registerSettingTest.labelBirthday();

		//7.verify Signature Back End And Fornt End Registration Page Signature Enable/Disable
		registerSettingTest.labelSignature();

		//8.verify instantMessage Back End And Fornt End Registration Page instantMessage Enable/Disable
		registerSettingTest.labelInstantMessage();

		//9.Test case for New Registration With Start New Topic Page Login
		registerSettingTest.registrationStartNewTopic();

		//10.Test case for New Registration With New Topic Page Login
		registerSettingTest.registrationNewTopic();

		//11.Test case for Incontext login with New Registration 
		registerSettingTest.registrationIncontextlogin();

		//12.Test case for Registration with different username format 
		registerSettingTest.differentUsernameFormat();



	});

};

