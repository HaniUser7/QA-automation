//----- This js file covers all the profilePage functionality on forum Frontend---------//
//'use strict';
var config = require('../../../config/config.json');
var profilePageTests = require('../cases/profilePage.js');
var profilePage = module.exports = {};

profilePage.featureTest = function(casper, test) {

	casper.start(config.backEndUrl, function() {
	casper.echo("Title of the page :"+this.getTitle(), 'INFO');
	//Verify with sending message by message button.
	profilePageTests.profilePageMessageButton();
	//All Post tab for own profile page
	profilePageTests.profilePageSendFile();
	
	//profilePageTests.profilePageInsertImage();

	//profilePageTests.profilePageMessageButton();

	});


};	


	
