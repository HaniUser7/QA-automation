/****This script is dedicated for new user registration on the forum. It covers testing of registration page with all defined validations****/
'use strict';

var config = require('../../../config/config.json');
var registerSettingTests = require('../cases/registerSetting.js');
var registerSetting = module.exports = {};


registerSetting.featureTest = function(casper, test) {
  
	casper.start(config.backEndUrl, function() {

		this.echo('Title Of The Page :' +this.getTitle(), 'INFO');


		registerSettingTests.blankUsername();

		registerSettingTests.backEndBirthday();

		registerSettingTests.Signature();

		registerSettingTests.instantMessage();


	});

};

