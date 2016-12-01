
//----- This js file covers all the valid and invalid Test scenarios for Thumps Up Down functionality from login window comes from home page---------//

'use strict';
var config = require('../../../config/config.json');
var thumpsUpDownTestcases = require('../cases/thumpsUpDown.js');
var thumpsUpDown = module.exports = {};

thumpsUpDown.featureTest = function(casper, test) {
	casper.start(config.url, function() {
		this.echo("Title of the page :"+this.getTitle());
		
		// call method to verify the thumbs up for guest user(unregister user) on post listing page
		//thumpsUpDownTestcases.unregisterUserOnPostListingPageLike();
		
		// call method to verify the thumbs down for guest user(unregister user) on post listing page
		//thumpsUpDownTestcases.unregisterUserOnPostListingPageDislike();

		// call method to verify the thumbs up for guest user(unregister user) on Topic listing page
		//thumpsUpDownTestcases.unregisterUserOnTopicListingPageLike();
		
		// method to verify the thumbs up and down for (register user) on Topic listing page
		//thumpsUpDownTestcases.registerUserOnTopicListingPageLike();

		// call method to verify the thumbs up and down for (register user) on Topic listing page
		//thumpsUpDownTestcases.registerUserOnPostListingPageLike();
		
		// method to verify with click on likers/dislikers username when disable view profile permission ->AS A REGISTER USER 
		//thumpsUpDownTestcases.clickOnLikersUsername();
		
		//"method to verify When registered/moderator user click on link of own name from voter list. when disable view profile permission"
		//thumpsUpDownTestcases.clickOnOwnName();
		
		//"method To verify the functionality of reputation tab which is showing in profile page-
		thumpsUpDownTestcases.clickReputationTab();
	});
};
