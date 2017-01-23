/****This script is dedicated for followpinlock Setting ****/
'use strict';

var config = require('../../../config/config.json');
var followpinlockTest = require('../cases/followpinlock.js');
var followpinlock = module.exports = {};


followpinlock.featureTest = function(casper, test) {

	casper.start(config.backEndUrl, function() {

		this.echo('Title Of The Page :' +this.getTitle(), 'INFO');

		   
		   followpinlockTest.deleteTopic();
		   
		/************************   1.Follow/UnFollow Topic  ****************************/
       		
		//1.Test case for Add New topic by enable Follow check box and verify unfollow topic option on forum listing page
		followpinlockTest.enableFollowCheckbox();

		//2.test case for Add New topic by disabling Follow check box and verify follow topic option on Post page
		followpinlockTest.disablingFollowCheckbox();

		//3.test case for Follow any topic and verify followed topic in Followed Content page
		followpinlockTest.followedTopicContentPage();

		//4.test case for unFollow any topic and verify unfollowed topic in Followed Content page
		followpinlockTest.unfollowedTopicContentPage();
		
		//5.test case for Unfollow Topic from followed content page and verify that topic on the page
		followpinlockTest.unfollowTopicFollowed();
		
		//6.Test case for Verify message in Topic list content on Followed Content page if there is no any followed topic in the list
		followpinlockTest.compostTopicCategoryListingPage();

		//7.test case for Follow any category and verify that topic in category lis on Followed Content page
	    followpinlockTest.followAnyCategory();

		//8.test case for UnFollow category from followed content list and verify visibility of that category in the list
		followpinlockTest.unfollowAnyCategory();

		//9.test case Add New topic by enable Follow check box and verify unfollow topic option on latest topic page
		followpinlockTest.enableFollowCheckboxAddNewTopic();

		//10.test case for Add New topic by disabling Follow check box and verify follow topic option on latest topic page
		followpinlockTest.disablingFollowCheckboxLatestAddNewTopic();

	    //11.Add New topic by disabling Follow check box and verify follow topic option on topic listing page
		followpinlockTest.disablingFollowCheckboxLatestTopicPage();
	
		//12.Add New topic by enable Follow check box and verify unfollow topic option on topic listing page
		followpinlockTest.enableFollowCheckboxLatestTopicPage();
		
		//13.Add New topic by enable Follow check box and verify unfollow topic option on topic listing page for sub category topic 
		followpinlockTest.enableFollowCheckboxSubCategoryTopic();
		
		//14.Verify the follow option visibility on latest topic page by the guest user/unregistered user.
		followpinlockTest.optionVisibilityLatestTopicPage();
     
		//15.Verify the follow option visibility on topic listing page by the guest user/unregistered user.
		followpinlockTest.optionVisibilityTopicListingPage();

		//16.Verify the follow option visibility on post listing page by the guest user/unregistered user.
	    followpinlockTest.optionVisibilityPostListingPage();

    		
		/************************   2.Lock-unLock Topic  ****************************/
/*
		//17.Lock any topic and Verify Lock option of topic listing page[Home page]
		followpinlockTest.lockAnyTopic();

		//18.un-Lock any topic and Verify Lock optipon of topic listing page[Home page]
		followpinlockTest.unlockAnyTopic();

		//19.Lock any topic and Verify Lock option of forum listing page[Home page]
		followpinlockTest.lockAnyTopicForumListingPage();

		//20.Un-Lock any topic and Verify Lock option of forum listing page[Home page]
		followpinlockTest.unlockAnyTopicForumListingPage();

		//21.Add New topic by enable lock check box and verify lock topic  on forum listing page
		followpinlockTest.enableLockCheckBoxForumListingPage();

		//22.Add New topic by disabling Follow check box and verify follow topic option on Post page
		followpinlockTest.disablingFollowCheckBoxForumListingPage();

		//23.Add New topic by enable lock check box and verify unlock topic option on latest topic page
		followpinlockTest.enableLockCheckBoxLatestTopicPage();

		//24.Add New topic by disabling lock check box and verify lock topic option on latest topic page
		followpinlockTest.disablingLockCheckBoxLatestTopicPage();

		//25.Lock any topic and Verify Lock optipon of post listing page under category
		followpinlockTest.lockAnyTopicVerifyPostListingPage();

		//26.un-Lock any topic and Verify Lock optipon of post listing page under category
		followpinlockTest.unlockAnyTopicVerifyPostListingPage();

		//27.Lock topic from Profile page and verify locked topic
		followpinlockTest.lockTopicProfilePage();

		//28.un-Lock topic from Profile page and verify unlocked topic
		followpinlockTest.unlockTopicProfilePage();

		//29.Lock any topic from post page and verify locked message
		followpinlockTest.lockTopicPostPage();

		//30.UnLock any locked  topic from post page and verify that the locked message should be disappeared 
		followpinlockTest.unlockTopicPostPage();

		//31.Verify Reply a Post option angainst locked topic on post page for registered user
		//followpinlockTest.ReplyPostOptionAngainstLockedTopic();

		//32.Verify Vote option against locked topic on post page
		followpinlockTest.voteOptionAgainstLockedTopic();	
	*/	
    /********************************   3.Pin-unPin Topic  ****************************/
/*			
		//33.Pin any topic and Verify Pin icon of topic listing page[Home page]
		followpinlockTest.PinIconTopicListingPage();

		//34.un-Pin any pinned topic and Verify pic icon of topic listing page[Home page]
		followpinlockTest.unPinVerifyPicIconTopicListingPage();

		//35.Pin any topic and Verify Pin icon of post listing page under category
		followpinlockTest.PinIconPostListingPageUnderCategory();

		//36.un-Pinany topic and Verify Pin icon of post listing page under category
		followpinlockTest.unPinIconVerifyPostListingPageUnderCategory();

		//37.Add New topic by enable pin check box and verify pin topic  on forum listing page
		followpinlockTest.enablePinVerifyPinTopicForumListingPage();

		//38.Add New topic by disabling pin check box and verify unpin topic  on forum listing page
		followpinlockTest.disablingPinVerifyTopicForumListingPage();

		//39.Add New topic by enable pin check box and verify unpin topic option on latest topic page
		followpinlockTest.enablePinVerifyPinOptionForumListingPage();

		//40.Add New topic by disabling pin check box and verify unpin topic  on latest topic page
		followpinlockTest.disablingPinVerifyLatestTopicPage();

		//41.Add New topic by enable pin check box and verify unpin topic option on  topic listing page
		followpinlockTest.enablePinVerifyPinOptionTopicListingPage();

		//42.Add New topic by disabling pin check box and verify unpin topic  on  topic listing page
		followpinlockTest.disablingPinVerifyTopicListingPage();

		//43.Add New topic by enable pin check box and verify unpin topic option on topic listing page for sub category topic 
		followpinlockTest.enablePinVerifyPinOptionSubCategoryTopic();

		//44.Add New topic by disabling un pin check box and verify pin topic option on topic listing page for sub category topic 
		followpinlockTest.disablingUnPinVerifyPinOptionSubCategoryTopic();

		//45.Add New topic by enable pin check box and verify unpin topic option on topic listing page under category topic 
		followpinlockTest.enablePinVerifyPinOptionUnderCategoryTopic();

		//46.Add New topic by disabling un pin check box and verify pin topic option on topic listing page under category topic 
		followpinlockTest.disablingUnPinVerifyPinOptionUnderCategoryTopic();

		//47.Pin any topic and Verify Pin icon of  latest topic page
		followpinlockTest.pinTopicVerifyLatestTopicPage();

		//48.Un- Pin any topic and Verify Pin icon of  latest topic page
		followpinlockTest.unPinTopicVerifyLatestTopicPage();

		//49.Pin any topic and Verify Pin icon of  topic listing page under category
		followpinlockTest.pinTopicVerifytopicListingPageUnderCategory();

		//50.Un-Pin any topic and Verify Pin icon of  topic listing page under category
		followpinlockTest.UnpinTopicVerifytopicListingPageUnderCategory();

		//51.Pin any topic and Verify Pin icon of  topic listing page under sub category
		followpinlockTest.pinTopicVerifytopicListingPageUnderSubCategory();

		//52.Un-Pin any topic and Verify Pin icon of  topic listing page under sub category
		followpinlockTest.UnpinTopicVerifytopicListingPageUnderSubCategory();
		
		//53.Pin any topic and Verify Pin icon of  category search page  
		followpinlockTest.pinTopicVerifyCategorySearchPage();
		
		//54.Un-Pin any topic and Verify Pin icon of  category search page   
		followpinlockTest.unPinTopicVerifyCategorySearchPage();

		//55.Pin any topic and Verify Pin icon of topic listing page from moderator shield icon
		followpinlockTest.pinTopicVerifyModeratorShieldIcon();

		//56.Un-Pin any topic and Verify Pin icon of topic listing page from moderator shield icon
		followpinlockTest.unPinTopicVerifyModeratorShieldIcon();

		//57.Pin any topic and Verify Pin icon of latest topic from moderator shield icon
		followpinlockTest.pinTopicVerifyLatestTopicModeratorShieldIcon();

		//58.Un-Pin any topic and Verify Pin icon of latest topic from moderator shield icon
		followpinlockTest.unPinTopicVerifyLatestTopicModeratorShieldIcon();

		//59.Pin any topic and Verify Pin icon under category page from moderator shield icon
		followpinlockTest.pinTopicVerifyUnderCategoryPageModeratorShieldIcon();

		//60.Un-Pin any topic and Verify Pin icon under category page from moderator shield icon
		followpinlockTest.unPinTopicVerifyUnderCategoryPageModeratorShieldIcon();

		//61.Pin any topic and Verify Pin icon under sub category page from moderator shield icon
		followpinlockTest.pinTopicVerifyUnderSubCategoryPageModeratorShieldIcon();

		//62.Un-Pin any topic and Verify Pin icon under sub category page from moderator shield icon
		followpinlockTest.unPinTopicVerifyUnderSubCategoryPageModeratorShieldIcon();
*/		
	});

};

