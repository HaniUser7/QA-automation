
//----- This js file covers all the valid and invalid Test scenarios for Thumps Up Down functionality from login window comes from home page---------//

'use strict';
var config = require('../../../config/config.json');
var postEventMemberApprovalTestcases = require('../cases/postEventMemberApproval.js');
var postEventMemberApproval = module.exports = {};

postEventMemberApproval.featureTest = function(casper, test) {
	casper.start(config.url, function() {
		this.echo("Title of the page :"+this.getTitle(),'INFO');
		
		// method to create a topic 
		postEventMemberApprovalTestcases.createTopic();
		
		// method to Approve a pending post from- Approval queue button 
		postEventMemberApprovalTestcases.approvalQueueButton();
		
		// method to Approve a pending post -By clicking on topic
		postEventMemberApprovalTestcases.byClickingOnTopic();
		
		// method to Approve a pending post byselect the pending post by  check box
		postEventMemberApprovalTestcases.byCheckBox();
		
		// method to Approve a pending post by select all pending post by  check box
		postEventMemberApprovalTestcases.byCheckBoxAll();
		
		// method to Delete a pending post from- Approval queue button 
		postEventMemberApprovalTestcases.deleteApprovalQueueButton();
		
		// method to Delete a pending post -By clicking on  post 
		postEventMemberApprovalTestcases.deleteClickingPost();
		
		// method to Delete a pending post by select the pending post by  check box
		postEventMemberApprovalTestcases.deleteByCheckBox();
		
		// method to Delete a pending post by select all pending post by  check box
		postEventMemberApprovalTestcases.deleteByAllCheckBox();
		
		// method to edit a pending post from- Approval queue button 
		postEventMemberApprovalTestcases.editApprovalQueueButton();
		
		// method to edit a pending post by clicking on it
		postEventMemberApprovalTestcases.editByClickingPost();

		// method to check the functionality of approve post for guest user
		postEventMemberApprovalTestcases.unregisterUserApprovePost();
	});
};
