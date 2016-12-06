
'use strict';
var config = require('../../../config/config.json');
var backArrowTests = require('../cases/backArrow.js');
var backArrow = module.exports = {};


backArrow.featureTest = function(casper, test) {

	casper.on('remote.alert', function(message) {
		this.echo('alert message: ' + message, 'INFO');
	});

	casper.start(config.url, function() {
		
		this.echo("Title of the page :"+this.getTitle(), 'INFO');
	
		//Register User With Valid Information.
		backArrowTests.verifyBackArrow();

		backArrowTests.sortOption();
	
		backArrowTests.readAllPost();

		backArrowTests.postListingPage();

		backArrowTests.topicListingPage();

		backArrowTests.forumListingPage();

		backArrowTests.moveTopicListingPage();

		backArrowTests.movePostListingPage();

		backArrowTests.movePostfromPostListingPage();

		backArrowTests.lockTopicListingPage();

		backArrowTests.lockPostListingPage();

		backArrowTests.unLockTopicListingPage();

		backArrowTests.unLockPostListingPage();
		
		backArrowTests.pinTopicListingPage();

		backArrowTests.pinPostListingPage();

		backArrowTests.unPinTopicListingPage();

		backArrowTests.unPinPostListingPage();

		backArrowTests.addPoll();

		backArrowTests.deleteTopicListingPage();

		backArrowTests.pagination();	
		
		backArrowTests.editAnyPost();	

		backArrowTests.ediTitle();

		backArrowTests.cancelEditButton();

		backArrowTests.approvePostListingPage();

		backArrowTests.approvePage();
	
	});
};
