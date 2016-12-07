//----- This js file covers all the inContextLogin functionality on forum Frontend---------//
//'use strict';
var config = require('../../../config/config.json');
var incontextLoginTests = require('../cases/inContextLogin.js');
var inContextLogin = module.exports = {};

inContextLogin.featureTest = function(casper, test) {

	casper.start(config.backEndUrl, function() {
	
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		//Incontext login from start new topic button	
		inContextLoginTests.inContextLoginfrmStartTopic();
		//Incontext Login while Like this post from Topic page 
		inContextLoginTests.inContextLoginLikePostTopicPage();
		//Incontext Login while Like this Topic from list of topics 
		inContextLoginTests.inContextLoginLikeTopicHome();
		//inContext Login from vote on post from post list 
		inContextLoginTests.inContextLoginVoteOnpost();	
		//inContext Login from Email button on Profile view screen of any user
		inContextLoginTests.inContextLoginEmailButton();
		//Login from Topic listing page when 'View Topic Content' permission is Disabled
		 inContextLoginTests.inContextLoginViewTopicContent();
		//login from Start New Topic button when its permission is OFF.
		 inContextLoginTests.inContextLoginLikeStartPermissionOff();
		//Login when 'Post Event' permission is Disabled.
		 inContextLoginTests.inContextLoginPostEvent();
		//inContext Login from Quote on post from post list 
		inContextLoginTests.inContextLoginQuote();
		//Incontext Login while Dislike this post from Topic page
		inContextLoginTests.inContextLoginDisLikeTopicHome();
		//inContext Login from the Forum Main page when 'View Forum' permission is Disabled.
		inContextLoginTests.inContextLoginForumDisable();
		//inContext Login  when 'View Profile' permission is Disabled.
		inContextLoginTests.inContextLoginViewProfileDisable();
		//inContext Login when View Calendar permission is Disabled
		inContextLoginTests.inContextLoginViewCalendarDisable();
		
	});


};
