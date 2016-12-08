'use strict';
var config = require('../../../config/config.json');
var addNewTopicTests = require('../cases/addNewTopic.js');
var addNewTopic = module.exports = {};


addNewTopic.featureTest = function(casper, test) {

	casper.on('remote.alert', function(message) {
		this.echo('alert message: ' + message, 'INFO');
	});

	casper.start(config.url, function() {
		
		this.echo("Title of the page :"+this.getTitle(), 'INFO');
	
		addNewTopicTests.addNewCategory();
	
		addNewTopicTests.addNewTopicInHindi();

		addNewTopicTests.postPreview();
		
		addNewTopicTests.postPreviewwithImage();

		addNewTopicTests.verifyErrorMsg();

		addNewTopicTests.composeCategoryListingPage();

		addNewTopicTests.composeTopicListingPage();

	});
};
