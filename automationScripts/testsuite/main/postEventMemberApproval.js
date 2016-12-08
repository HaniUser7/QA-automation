
//----- This js file covers all the valid and invalid Test scenarios for Thumps Up Down functionality from login window comes from home page---------//

'use strict';
var config = require('../../../config/config.json');
var postEventMemberApprovalTestcases = require('../cases/thumpsUpDown.js');
var postEventMemberApproval = module.exports = {};

postEventMemberApproval.featureTest = function(casper, test) {
	casper.start(config.url, function() {
		this.echo("Title of the page :"+this.getTitle(),'INFO');
		
	});
};
