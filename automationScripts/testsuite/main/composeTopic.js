/****This script is dedicated for composeTopic Setting ****/
'use strict';

var config = require('../../../config/config.json');
var composeTopicTest = require('../cases/composeTopic.js');
var composeTopic = module.exports = {};


composeTopic.featureTest = function(casper, test) {

	casper.start(config.backEndUrl, function() {


		/************************   .Create User   ****************************/

		//Test case for create registeruser
		composeTopicTest.createRegisterUser();

		//Test case for create adminuser
	  	composeTopicTest.createAdminUser();	

		//Test case for create  category
        composeTopicTest.backendSetting()	
    
		/************************   1.Add New Topic   ****************************/

		//1.Test case for Add New Topic with selecting category and verify message
		composeTopicTest.addNewTopicSelectingCategory();

		//2.test case for Add New Topic with hindi text and verify message
		composeTopicTest.addNewTopicHindiText();

		//3.test case for Verify Post preview with entered message
		composeTopicTest.postPreviewEnteredMessage();

		//4.test case for Verify Post preview with image of entered message
		composeTopicTest.postPreviewImage();

		//5.test case for Verify Error message after entering message more than 65000 charecters while adding new Topic
		//composeTopicTest.errorMessageMoreCharecters();

		/************************   2.Compost Topic (Make sure 'Post approval' is disabled)    ****************************/

		//6.Test case for Verify Compost Topic on Category Listing Page(For Guest/Registered User/Admin)
		composeTopicTest.compostTopicCategoryListingPage();

		//7.test case for Verify Compost Topic on Topic Listing Page(For Guest/Registered User/Admin)
		composeTopicTest.compostTopicListingPage();

		//8.test case for Verify Compost Topic on Latest Topic Page(For Guest/Registered User/Admin)
		composeTopicTest.compostTopicLatestTopicPage();

		//9.test case for Verify Compose Topic when there is no topic available(For Guest/Registered User/Admin)
		composeTopicTest.composeTopicNoTopicAvailable();

		//10.test case for Verify Preview Post of Compose Topic(For Guest/Registered User/Admin-preview)
		composeTopicTest.previewPostComposeTopics();

		//11.Verify Preview Post of Compose Topic(For Guest/Registered User/Admin-Message generate)
		composeTopicTest.previewPostComposeTopicMessage();

		//12.Verify Compose Topic without selecting any category(For Guest/Registered User/Admin)
		composeTopicTest.composeTopicWithoutSelectingAnyCategory();

		/******************************  3.Compose Topic Options   ******************************************/

		//13.Test case for Verify Compose Post Options(For Guest/Registered User/Admin)
		composeTopicTest.composePostOptions();

		/**************  4.Compose Topic Permission(Make sure 'Post approval' is disabled)  ******************/

		//14.Verify Compose Topic on Category/topic Listing Page(if start new topic permission is disabled)(For Guest User)
		composeTopicTest.startNewTopicPermissionDisabled();

		//15.Verify Compose Topic on topic listing page(if start new topic permission is disabled of one cateogry)(For Guest User)
		composeTopicTest.listingPageDisabledOneCateogry();

		//16.Verify Dropdown of Compose Topic on Category/Latest topic page(if start new topic permission is disabled of one cateogry)(For Guest User)
		composeTopicTest.dropdownDisabledOneCateogry();

		//17.Verify Compose Topic on Category/topic/Latest topic Page(if start new topic permission is disabled)(For Register User)
		composeTopicTest.composePostRegisterUser();

		//18.Verify Compose Topic on topic listing page(if start new topic permission is disabled of one cateogry)(For Register User)
		composeTopicTest.previewPostComposeTopic();

		//19.Verify Dropdown of Compose Topic on Category/Latest topic page(if start new topic permission is disabled of one cateogry)(For Register User)
		//composeTopicTest.previewPostDropdownTopicMessage();

		/**************  5.Compose Topic With Attach, Insert and Follow Option  ******************/

		//20.Verify Compose Topic with un-follow option(For Register user/Admin)
		composeTopicTest.composeTopicUnFollowOption();

		//21.Verify Compose Topic with follow option(For Register user/Admin)
		composeTopicTest.composeTopicFollowOption();

		//22.Verify Compost Topic with attach file on Category/topic/Latest topic Page (Registered User/Admin)
		composeTopicTest.compostTopicAttachFile();

		//23.Verify Compost Topic with Insert photos on Category/topic/Latest topic Page (Registered User/Admin)
		composeTopicTest.compostTopicInsert();

		//24.Verify Compose Topic with Pin option(Admin)
		composeTopicTest.composeTopicPinOption();

		//25.Verify Compose Topic with Lock option(Admin)
		composeTopicTest.composeTopicLockOption();
	
		/**************  5.Compose Topic With Attach, Insert and Follow Option  ******************/
		
		//26Test case for create  category
        composeTopicTest.deleteCategories();
         		
		//27.Test case for create  category
        composeTopicTest.deleteUser();		 
     
	});

};

