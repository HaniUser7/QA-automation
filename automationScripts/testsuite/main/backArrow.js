
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

	});
};
