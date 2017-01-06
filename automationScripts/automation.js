var config = require("../config/config.json");

casper.options.viewportSize = config.app.viewportSize;
casper.options.verbose = config.app.verbose;
casper.options.logLevel = config.app.logLevel;
casper.options.waitTimeout = config.app.waitTimeout;

var feature = casper.cli.get('feature');
if(feature){
	casper.echo("Started testing for the feature: " + feature +"\n");
}else{
	casper.echo("It seems, you have not given any option.");
}

switch (feature) {
    	case "forgotPassword":
		casper.test.begin('Verify forgot password functionality from home page with all valid and invalid scenarios ', function(test) {
			var forgotPassword = require("./testsuite/main/forgotPassword.js");
			forgotPassword.featureTest(casper, casper.test);
			casper.run(function(){
				test.done();
			});
		});
	break;
	
	case "thumpsUpDown":
		casper.test.begin('Verify thumps up and down functionality from home page with all valid and invalid scenarios ', function(test) {
			var thumpsUpDown = require("./testsuite/main/thumpsUpDown.js");
			thumpsUpDown.featureTest(casper, casper.test);
			casper.run(function(){
				test.done();
			});
		});
	break;
	
	case "postEventMemberApproval":
		casper.test.begin('Verify post, Event and Member Approval functionality from home page with all valid and invalid scenarios ', function(test) {
			var postEventMemberApproval = require("./testsuite/main/postEventMemberApproval.js");
			postEventMemberApproval.featureTest(casper, casper.test);
			casper.run(function(){
				test.done();
			});
		});
	break;
	
	case "privateMessage":
		casper.test.begin('Verify privateMessage functionality from home page with all valid and invalid scenarios ', function(test) {
			var privateMessage = require("./testsuite/main/privateMessage.js");
			privateMessage.featureTest(casper, casper.test);
			casper.run(function(){
				test.done();
			});
		});
	break;
	
	default:
		casper.echo("Please select any feature from options given below. For ex: casperjs automation.js <option>.\n"); 
        	casper.echo("Options:");
        	casper.echo("forgotPassword");
        	casper.echo("thumpsUpDown");
        	casper.echo("privateMessage");
        	casper.echo("postEventMemberApproval");
		casper.exit();
};



