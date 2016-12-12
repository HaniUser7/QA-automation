//----- This js file covers all the valid and invalid Test scenarios for Thumps Up Down functionality from login window comes from home page---------//

'use strict';
var config = require('../../../config/config.json');
var privateMessageTestcases = require('../cases/privateMessage.js');
var privateMessage = module.exports = {};

privateMessage.featureTest = function(casper, test) {
	casper.start(config.url, function() {
		this.echo("Title of the page :"+this.getTitle(),'INFO');
		
		// method to create a message
		//privateMessageTestcases.createPrivateMessage();
		
		// method To verify delete Conversation
		//privateMessageTestcases.deleteConversation();
		
		// method To verify delete multiple Conversation
		//privateMessageTestcases.deleteMultipleConversation();
		
		// method To verify delete all Conversation
		//privateMessageTestcases.deleteAllConversation();
		
		// method Delete coversation from conversation page
		//privateMessageTestcases.deleteFromConversationPage();
		
		// method To verify mark as unread(check box)(single)
		privateMessageTestcases.unreadCheckbox();
		
		// method To verify mark as unread(check box)(multiple)
		privateMessageTestcases.unreadMultipleCheckbox();
		
		// method To verify mark as unread(check box)(all)
		privateMessageTestcases.unreadAllCheckbox();
		
		// method To verify mark as read(check box)(single)
		privateMessageTestcases.readCheckbox();
		
		// method To verify mark as read(check box)(multiple)
		privateMessageTestcases.readMultipleCheckbox();
		
		// method To verify mark as read(check box)(all)
		privateMessageTestcases.readAllCheckbox();
		
		// method to verify mark as read(coversation page)
		privateMessageTestcases.readFromConversationPage();
		
	
		
	});
};
