
//----- This js file covers all the valid and invalid Test scenarios for forgot Password functionality from login window comes from home page---------//

'use strict';
var config = require('../../../config/config.json');
var thumpsUpDownTestcases = require('../cases/thumpsUpDown.js');
var thumpsUpDown = module.exports = {};

thumpsUpDown.featureTest = function(casper, test) {
	//Method For Verifying JavaScript Errors
	casper.on("page.error", function(msg, trace) {
		this.echo("Error:    " + msg, "ERROR");
		this.echo("file:     " + trace[0].file, "WARNING");
		this.echo("line:     " + trace[0].line, "WARNING");
		this.echo("function: " + trace[0]["function"], "WARNING");
		thumpsUpDown.errors.push(msg);
	});
	casper.start(config.url, function() {
		this.echo("Title of the page :"+this.getTitle());
		
		// call method to Reset password with valid user name
		thumpsUpDownTestcases.unregisterUserOnPostListingPage();
		
	});
};
