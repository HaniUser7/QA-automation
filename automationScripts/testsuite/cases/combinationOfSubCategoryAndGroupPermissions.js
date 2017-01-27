/***These are the function which has been called in postEventMemberApproval.js and also will be used in other js file as per requirement**********/

'use strict';
var json = require('../../testdata/combinationOfSubCategoryAndGroupPermissions.json');
var config = require('../../../config/config.json');
var combinationOfSubCategoryAndGroupPermissionsMethod = require('../methods/combinationOfSubCategoryAndGroupPermissions.js');
var registerMethod = require('../methods/register.js');
var forumLoginMethod = require('../methods/login.js');
var privateMessageMethod = require('../methods/privateMessage.js');
var backEndForumRegisterMethod = require('../methods/backEndRegistration.js');
var wait = require('../wait.js');
var combinationOfSubCategoryAndGroupPermissionsTestcases = module.exports = {};

// method to test all backend setting
combinationOfSubCategoryAndGroupPermissionsTestcases.toTestmethods = function() {
	casper.thenOpen(config.backEndUrl, function() {
		combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermission(casper, function(err) {
			if(!err) {
				casper.echo('Disable Approve New Event functionality method called ','INFO');
			}
		});
	});
};
