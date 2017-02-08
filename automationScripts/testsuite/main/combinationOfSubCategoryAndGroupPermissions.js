
//----- This js file covers all the valid and invalid Test scenarios for Thumps Up Down functionality from login window comes from home page---------//

'use strict';
var config = require('../../../config/config.json');
var combinationOfSubCategoryAndGroupPermissionsTestcases = require('../cases/combinationOfSubCategoryAndGroupPermissions.js');
var combinationOfSubCategoryAndGroupPermissions = module.exports = {};

combinationOfSubCategoryAndGroupPermissions.featureTest = function(casper, test) {
	casper.start(config.url, function() {
		this.echo("Title of the page :"+this.getTitle(),'INFO');
		
		// method to test methods
		//combinationOfSubCategoryAndGroupPermissionsTestcases.toTestmethods();
		
		// method to create a category and its sub category and get their id
		combinationOfSubCategoryAndGroupPermissionsTestcases.createCategoryAndSubCategory();
		
		// method to verify with category cat1
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithCategory();
		
		// method to verify with sub-category cat1a
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithSubCategory();
		
		// method to verify with the private sub-category cat1a
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPrivateSubCategory();
		
		// method to verify with the parent category cat1
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithParentCategory();
		
		// method to verify with other sub-categories 
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithOtherSubCategory();
		
		// method to verify start new topic button with the sub-category cat1a
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithNewTopicButtonForSubCategory();
		
		// method to verify start new topic button with the sub-category cat1a(Disable)
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithNewTopicButtonForSubCategoryDisable();
		
		// method to verify start new topic button with the parent category cat1
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithNewTopicButtonForParentCategory();
		
		// method to verify with other sub-categories 
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithNewTopicButtonForOtherSubCategory();
		
		// method to verify Reply topic button with the sub-category cat1a
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForSubCategory();
		
		// method to verify Reply topic button with the sub-category cat1a(Disable)
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForSubCategoryDisable();
		
		// method to verify reply topic button with the parent category cat1
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicWithParentCategory();
		
		// method to verify with other sub-categories 
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForOtherSubCategory();
		
		// method to verify  upload attachments with the private sub-category cat1a
		//combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithUploadAttachmentsWithSubCategory();
		
		// method to verify upload attachments button with the private sub-category cat1a(Disable)
		//combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithUploadAttachmentsWithSubCategoryDisable();
		
		// method to verify  upload attachments with the parent category cat1
		//combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithUploadAttachmentsWithParentCategory();
		
		// method to verify Post approval with the private sub-category cat1a
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalWithSubCategory();
		
		// method to verify Post approval with the private sub-category cat1a(Disable)
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalWithSubCategoryDisable();
		
		// method to verify Post approval with the parent category cat1
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalWithParentCategory();
		
		// method to verify with other sub-categories 
		combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalWithOtherSubCategory();
		
	});
};
