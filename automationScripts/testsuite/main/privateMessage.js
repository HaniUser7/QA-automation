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
		
		// method to compose a message by scenario 2
		//privateMessageTestcases.composeScenarioSecond();
		
		// method to compose message by Scenario3
		//privateMessageTestcases.composeMessageScenarioThird();
		
		// method to verify when we enter invalid recipients name
		//privateMessageTestcases.invalidRecipientsName();
		
		// method to verify when we leave blank reciepients name
		//privateMessageTestcases.blankRecipientsName();
		
		// method to verify when leave blank subject 
		//privateMessageTestcases.blankSubject();
		
		// method to verify when leave blank message body
		//privateMessageTestcases.blankMessageBody();
		
		// method To verify auto drop down in reciver's field
		//privateMessageTestcases.autoDropdown();
		
		//To verify Attachement /Insert Photo link when disable
		//privateMessageTestcases.verifyAttachementAndInsertPhotoLinkWhenDisable();
		
		// method To verify Attachement /Insert Photo link when enable
		//privateMessageTestcases.verifyAttachementAndInsertPhotoLinkWhenEnable();
		
		// method To verify delete multiple Conversation
		//privateMessageTestcases.deleteMultipleConversation();
		
		// method To verify delete all Conversation
		//privateMessageTestcases.deleteAllConversation();
		
		// method Delete coversation from conversation page
		//privateMessageTestcases.deleteFromConversationPage();
		
		// method To verify mark as unread(check box)(single)
		//privateMessageTestcases.unreadCheckbox();
		
		// method To verify mark as unread(check box)(multiple)
		//privateMessageTestcases.unreadMultipleCheckbox();
		
		// method To verify mark as unread(check box)(all)
		//privateMessageTestcases.unreadAllCheckbox();
		
		// method To verify mark as read(check box)(single)
		//privateMessageTestcases.readCheckbox();
		
		// method To verify mark as read(check box)(multiple)
		//privateMessageTestcases.readMultipleCheckbox();
		
		// method To verify mark as read(check box)(all)
		//privateMessageTestcases.readAllCheckbox();
		
		// method to verify mark as read(coversation page)
		//privateMessageTestcases.readFromConversationPage();
		
		// method Move single conversation(inbox to archieve)
		//privateMessageTestcases.moveSingleToArchieve();
		
		// method to move multiple conversation(inbox to archieve)
		//privateMessageTestcases.moveMultipleToArchieve();
		
		// method to move all coversation(inbox to archieve)
		//privateMessageTestcases.moveAllToArchieve();
		
		// method to Move single conversation(archieve to inbox)
		//privateMessageTestcases.moveSingleToInbox();
		
		// method to move multiple conversation(archieve to inbox)
		//privateMessageTestcases.moveMultipleToInbox();
		
		// method to move all coversation(archieve to inbox)
		//privateMessageTestcases.moveAllToInbox();
		
		// method To verify ignored member (check box)
		//privateMessageTestcases.ignoreUser();
		
		// method to verify with unignore user
		//privateMessageTestcases.unignoreUser();
		
		// method To Verify deleted member on ignore list
		//privateMessageTestcases.deletedMemberOnIgnoreList();
		
		// method to verify with send reply on previous message after ignoring
		//privateMessageTestcases.replyOnPreviousMessage();
		
		// method to Verify profile link on user name
		//privateMessageTestcases.verifyProfileLinkOnUserName();
		
		// method to Verify hover card on user name
		//privateMessageTestcases.verifyHoverCardOnUserName();
		
		// method To verify "See all" link when there are no conversation.
		//privateMessageTestcases.verifySeeAll();
		
		// method To verify leave conversation( single)
		//privateMessageTestcases.leaveSingleConversation();
		
		// method To verify leave conversation (Multiple)
		//privateMessageTestcases.leaveMultipleConversation();
		
		// method To verify leave conversation (all)
		//privateMessageTestcases.leaveAllConversation();
		
		// method to verify with reply option
		//privateMessageTestcases.verifyReplyOption();
		
		// method To verify one to one conversation between sender and and single recipient
		//privateMessageTestcases.verifyOneToOneSingleSenderAndReciever();
		
		// method To verify one to one conversation between sender and multiple recipient
		//privateMessageTestcases.verifyOneToOneSingleSenderAndMultipleReciever();
		
		// method verify when:If user S1 sent a message to R1, R2 but reply coming only from R2 only
		privateMessageTestcases.verifyMultipleRecieverAndReplyByOne();
	});
};
