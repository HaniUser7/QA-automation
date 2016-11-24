
//----- This js file covers all the valid and invalid scenarios for Backend Registration functionality from home page---------//

'use strict';
var backEndRegisterJSON = require('../../testdata/backEndRegisterData.json');
var config = require('../../../config/config.json');
var backEndForumRegisterTests = require('../cases/backEndRegistration.js');
var backEndForumRegisterMethod  = require('../methods/backEndRegistration.js');
var wait = require('../wait.js');
var backEndForumRegister= module.exports = {};


backEndForumRegister.featureTest = function(casper, test) {

	casper.on('remote.alert', function(message) {
		this.echo('alert message: ' + message, 'INFO');
	});

	casper.start(config.backEndUrl, function() {
		
		this.echo("Title of the page :"+this.getTitle(), 'INFO');
	
		//Register User With Valid Information.

		backEndForumRegisterTests.validInfo();

		//Verify Error Messages While User Registering With Blank User Name.
	
		backEndForumRegisterTests.blankUserName();

		//Verify Error Messages While User Registering With Blank EmailId.
	
		backEndForumRegisterTests.blankEmailId();
	
		//Verify Error Messages While User Registering With Existing UserName.
	
		backEndForumRegisterTests.existingUserName();

		//Register User With Existing EmailId.

		backEndForumRegisterTests.existingEmailId();
	
		//Verify Error Messages While User Registering With Invalid Email Id.
	
		backEndForumRegisterTests.invalidEmailId();

	});
};