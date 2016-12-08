
'use strict';
var config = require('../../../config/config.json');
var memberTitleTests = require('../cases/memberTitle.js');
var  memberTitle = module.exports = {};


memberTitle.featureTest = function(casper, test) {

	casper.on('remote.alert', function(message) {
		this.echo('alert message: ' + message, 'INFO');
	});

	casper.start(config.backEndUrl, function() {
		
		this.echo("Title of the page :"+ this.getTitle(), 'INFO');
		//memberTitleTests.addTitle();
		
		

		memberTitleTests.post10Topics();

		memberTitleTests.post15Topics();
		
	});
};
