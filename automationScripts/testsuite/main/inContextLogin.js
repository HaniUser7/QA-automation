//----- This js file covers all the inContextLogin functionality on forum Frontend---------//
//'use strict';
var config = require('../../../config/config.json');
var incontextLoginTests = require('../cases/inContextLogin.js');
var inContextLogin = module.exports = {};

inContextLogin.featureTest = function(casper, test) {

	casper.start(config.url, function() {
	
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		//Incontext login from start new topic button	
		inContextLoginTests.inContextLoginfrmStartTopic();
		//Incontext Login while Like this post from Topic page 
		inContextLoginTests.inContextLoginLikePostTopicPage();
		//Incontext Login while Dislike this post from Topic page
		inContextLoginTests.inContextLoginDisLikePostTopicPage();
		//Incontext Login while Like this Topic from list of topics 
		inContextLoginTests.inContextLoginLikeTopicHome();	
	});


};
