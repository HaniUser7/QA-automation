
//----- This js file covers all the valid and invalid Test scenarios for Thumps Up Down functionality from login window comes from home page---------//

'use strict';
var config = require('../../../config/config.json');
var combinationOfSubCategoryAndGroupPermissionsTestcases = require('../cases/combinationOfSubCategoryAndGroupPermissions.js');
var combinationOfSubCategoryAndGroupPermissions = module.exports = {};

combinationOfSubCategoryAndGroupPermissions.featureTest = function(casper, test) {
	casper.start(config.url, function() {
		this.echo("Title of the page :"+this.getTitle(),'INFO');
		
		// method to test methods
		combinationOfSubCategoryAndGroupPermissionsTestcases.toTestmethods();
		
	});
};
