//----- This js file covers all Verify Login page on Forum by enabling Privacy Private  option functionality on forum Frontend---------//
//'use strict';
var config = require('../../../config/config.json');
var loginByPrivacyOptionTests = require('../cases/loginByPrivacyOption.js');
var loginByPrivacyOption = module.exports = {};
loginByPrivacyOption.featureTest = function(casper, test) {
	casper.start(config.backEndUrl, function() {
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		//Login page on Forum by enabling Privacy Private option from backend
		loginPrivacyOptionTests.loginPrivacyOption();		
		//Check login while launching app
		loginPrivacyOptionTests.loginPrivacylaunchapp();
		//Check Login from Topic option in side menu
		loginPrivacyOptionTests.loginPrivacyFrmMainMenu();
		//Check Login from Members option is side menu
		loginPrivacyOptionTests.loginPrivacyFrmMember();
		//Check Login from Calender option is side menu
		loginPrivacyOptionTests.loginPrivacyFrmCalender();
		//loginPrivacyOptionTests.loginPrivacyFrmCalender
		loginPrivacyOptionTests.loginPrivacyDonate();
	});
};
