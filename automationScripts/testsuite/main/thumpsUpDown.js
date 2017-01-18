
//----- This js file covers all the valid and invalid Test scenarios for Thumps Up Down functionality from login window comes from home page---------//

'use strict';
var config = require('../../../config/config.json');
var thumpsUpDownTestcases = require('../cases/thumpsUpDown.js');
var thumpsUpDown = module.exports = {};

thumpsUpDown.featureTest = function(casper, test) {
	casper.start(config.url, function() {
		this.echo("Title of the page :"+this.getTitle(),'INFO');
		
		// call method to verify the thumbs up for guest user(unregister user) on post listing page
		thumpsUpDownTestcases.unregisterUserOnPostListingPageLike();
		
		// call method to verify the thumbs down for guest user(unregister user) on post listing page
		thumpsUpDownTestcases.unregisterUserOnPostListingPageDislike();

		// call method to verify the thumbs up for guest user(unregister user) on Topic listing page
		thumpsUpDownTestcases.unregisterUserOnTopicListingPageLike();
		
		// method to verify the thumbs up and down for (register user) on Topic listing page
		thumpsUpDownTestcases.registerUserOnTopicListingPageLike();

		// call method to verify the thumbs up and down for (register user) on Topic listing page
		thumpsUpDownTestcases.registerUserOnPostListingPageLike();
		
		// method to verify with click on likers/dislikers username when disable view profile permission ->AS A REGISTER USER 
		thumpsUpDownTestcases.clickOnLikersUsername();
		
		// method to verify When registered/moderator user click on link of own name from voter list. when disable view profile permission
		thumpsUpDownTestcases.clickOnOwnName();
		
		// method To verify the functionality of reputation tab which is showing in profile page-
		thumpsUpDownTestcases.clickReputationTab();
		
		// method To verify the reputation functionality of back end(disable)"
		thumpsUpDownTestcases.verifyReputationTab();
		
		// Method to Verify  with the increasing  order of count
		thumpsUpDownTestcases.verifyIncreasedCount();
		
		// Metod To verify the counter of thumbs down
		thumpsUpDownTestcases.verifyDecreasedCount();
		
		// Method To verify the colour of like/dislike link
		thumpsUpDownTestcases.verifyColour();
		
		// Method To verify the functionality of reputation on profile page
		thumpsUpDownTestcases.verifyReputationOnProfilePage();
		
		//Method To verify the user account off case
		thumpsUpDownTestcases.verifyUserAccountOffCase();
		
		// Method To verify user reputation
		thumpsUpDownTestcases.verifyReputation();
		
		// Method To verify the like/unlike icon in guest user 
		thumpsUpDownTestcases.verifyLikeInGuestUser();
		
		// Method To verify with log in pop up
		thumpsUpDownTestcases.verifyLogInPopUp();
		
		//To verify the login button 
		thumpsUpDownTestcases.verifyLoginButton();
		
		// Method To verify the forget pass word link of pop up window
		thumpsUpDownTestcases.verifyForgotPasswordLink();
		
		// Method "to verify create account link on pop up window when new registration is disable"
		thumpsUpDownTestcases.verifyCreateAccountInPopUp();
		
		// Method To verify reputaion count of fb user
		thumpsUpDownTestcases.reputationCountFbUser();
		
		// Method To verify likers/dislikers list 
		thumpsUpDownTestcases.verifyLikersList();
		
		// Method To verify like list of fb user
		//thumpsUpDownTestcases.verifyFbUserLikersList();
		
		//verify combine all forum.
		thumpsUpDownTestcases.verifyCombineAllForum();
		
		// Method To verify reputaion link on profile page when reputation is off for fb user
		//thumpsUpDownTestcases.verifyReputationOnFbUser();
		
		// Method To verify reputaion link on profile page when reputation is on for fb user
		//thumpsUpDownTestcases.verifyReputationOnFbUserWhenOn();
	});
};
