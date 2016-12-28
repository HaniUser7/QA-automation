/****This script is dedicated for Upload Attachment Setting changes permission in back-end and check front on the forum related upload. It covers Upload Attachment with all defined validations****/
'use strict';

var config = require('../../../config/config.json');
var uploadAttachmentTest = require('../cases/uploadAttachment.js');
var uploadTests = require('../cases/upload.js');
var uploadAttachment = module.exports = {};


uploadAttachment.featureTest = function(casper, test) {

	casper.start(config.backEndUrl, function() {

		this.echo('Title Of The Page :' +this.getTitle(), 'INFO');

		/************************    Avatar   ****************************/
	/*	
		//.Test case for Registration with different username format 
		uploadAttachmentTest.backEndSetting();

		//1.test case for verify with upload avatar from registration page(verify it from )
		uploadAttachmentTest.avatarFromRegistration();

		//2.test case for verify with upload avatar when you change the avatar after upload on registration page
		uploadAttachmentTest.uploadAvatarRegistrationChange();

		//3.test case for verify with upload avatar when you change the avatar after upload on  edit profile page
		uploadAttachmentTest.uploadAvatarEditProfileChange();

		//4.test case for verify with upload avatar when you upload avatar after deleting it on registration page
		uploadAttachmentTest.uploadAvatarRegistrationDeleting();

		//5.test case for verify with upload avatar when you upload  avatar after deleting it on edit profile page
		uploadAttachmentTest.uploadAvatarEditProfileDeleting();

		//6.test case for verify upload avatar for the first time on profile page
		uploadAttachmentTest.uploadAvatarProfile();

		//7.test case for verify upload avatar on profile page again when you already upload a avatar
		uploadAttachmentTest.uploadAvatarProfileAgain();

		//8.test case for verify upload avatar on profile page after remove the already uploaded avatar.
		uploadAttachmentTest.uploadAvatarProfileRemove();

		//9.test case for verify with upload avatar by pc when facebook is enable
		uploadAttachmentTest.uploadAvatarFacebookEnable();

		//10.test case for verify with select none option for avavtar
		uploadAttachmentTest.uploadAvatarFacebookNone();

		//11.test case for verify with use my facebook avatar option
		//uploadAttachmentTest.uploadAvatarFacebookOption();

		//12.test case for verify with upload  when none option is enable
		//uploadAttachmentTest.uploadAvatarFacebookNoneOption();

		//13.test case for verify with upload on profile page when use face book  is enable
		uploadAttachmentTest.uploadAvatarFacebookProfile();

		//14.test case for verify with upload avavtar from profile page when you select none at the time of registration
		uploadAttachmentTest.uploadAvatarFacebookProfileNone();

		//15.test case for verify upload avatar on edit profile page if you select use my face book at the time of registration
		uploadAttachmentTest.uploadAvatarFacebookEditeProfile();

		//16.test case for verify with upload avavtar from edit profile page when you select none at the time of registration
		uploadAttachmentTest.uploadAvatarFacebookEditeProfileNone();
		
	*/	
		/************************    Private Message    ****************************/
		
	/*	
		//1.test case for Verify with private message(send new message)(Attachment/Insert photos)
		uploadAttachmentTest.privateMessageSendNewMessage();
	
		//2.test case for Verify with private message(reply section)(Attachment/insert photos)
		uploadAttachmentTest.privateMessageReplySection();
		
		//3.test case for Verify with private message from PM page(new message)(Attachment/Insert photos)
		uploadAttachmentTest.privateMessageFromPm();
		
		//4.test case for Verify with send the message from profile page message button (Attachement/Insert photos)
		uploadAttachmentTest.messageFromProfilePage();
		*/
		//5.test case for Verify with send the message from archieve box (Attachement/Insert photos)
		//uploadAttachmentTest.messageFromArchieveBox();
		
		//6.test case for Verify with send the message from hover card(Attachement/Insert photos)
		//uploadAttachmentTest.messageFromHoverCard();//still working mouse mover issue
		
		
		/************************     Signature    ****************************/

        //1.test case for verify with signature attachment from edit profile page
		//uploadAttachmentTest.editProfilePage();
		
		//2.test case for verify with signature attachment from Member Registration page
		//uploadAttachmentTest.memberRegistrationPage();
		
		/************************  User Account off cases   ****************************/
		
		//test case for backend setting User Account off cases 
		 uploadAttachmentTest.backendSettingUserAccount(); 
		   
		/*** 1.Post section *****************************/
		
		//1.Verify with post from topic listing page(Attachment/insert photos)
		//uploadTests.uploadPostAttachment();
	/*	
		//2.Verify with post from topic listing page(insert photos)
		uploadTests.uploadPostAttachmentCamera();
		
		//3.Verify with start new Topic Attachment
		uploadTests.uploadStartNewTopic();
		
		//4.Verify with start new Topic Insert
		uploadTests.uploadStartNewTopicImageButton();
		
		//5.Verify with start new Topic Insert camera
		uploadTests.uploadStartNewTopicCameraBrowse();
		
		//6.Verify with start new Topic Insert camera web
		uploadTests.uploadStartNewTopicCameraWebaddress();
		
		//7.verify start new topic from undercategory
		uploadTests.uploadStartNewTopicUnderCat();
		
		//8.verify start new topic from forum listing
		uploadTests.uploadStartNewTopicforumlisting();
		
		//9.verify postreply under category
		uploadTests.uploadPostListingUnderCategory();
	*/
	/*** 1.Edit section *****************************/
		/*
		//1.Verify with Edit the Post from Topic listing page attachment
		uploadTests.uploadEditPostAttachment();
		
		//2.Verify with Edit the Post from Topic listing page(insert photos) camera web address
		uploadTests.uploadEditPostCameraWebaddress();
		
		//3.Verify with Edit the Post from Topic listing page(insert photos) camera browse
		uploadTests.uploadEditPostCamerabrowse();
		
		//4.Verify with Edit the Topic/Post from Topic listing page Attachment
		uploadTests.uploadEditTopicAttachment();
		
		//5.Verify with Edit the Topic/Post from Topic listing page insert photo camera webaddress
		uploadTests.uploadEditTopicCameraWebaddress();
		
		//6.Verify with Edit the Topic/Post from Topic listing page insert photo camera webaddress
		uploadTests.uploadEditTopicCameraWebbrowse(); //working fine----21
		
		//7.Verify with Edit the Topic/Post from Topic listing page using image button browse
		uploadTests.uploadEditTopicImageButtonbrowse();
		
		//8.Verify with Edit the Topic/Post from Topic listing page using Image button webaddress
		uploadTests.uploadEditTopicImageButtonWebaddress();
		
		//9.Verify with Edit topic listing page under category (post a reply)Attachment
		uploadTests.uploadEditPostUnderCategoryPostReplyAttachment();
		
		//10.Verify with Edit topic listiuploadTests.uploadsubcategoryng page under category (using post a reply)camera browse
		uploadTests.uploadEditPostUnderCategoryPostReplyCamerabrowse();
		
		//11.Verify with Edit topic listing page under category (using post a reply) camera webaddress
		uploadTests.uploadEditPostUnderCategoryPostReplyCameraWebaddress();
		
		//12.Verify with Edit topic listing page under category (using post a reply) Imagebutton browse
		uploadTests.uploadEditPostUnderCategoryPostReplyImagebuttonbrowse(); //working fine
		
		//13.Verify with Edit topic listing page under category(using post a reply) Imagebutton  webaddress
		uploadTests.uploadEditPostUnderCategoryPostReplyImagebuttonwebaddress();
		
		//14.Verify with Edit topic listing page under category(Attachment)
		uploadTests.uploadEditPostunderCategoryAttachment();
		
		//15.Verify with Edit topic listing page under category insert photo camera browse
		uploadTests.uploadEditPostunderCategoryCamerabrowse();
		
		//16.Verify with Edit topic listing page under category insert photo camera webaddress
		uploadTests.uploadEditPostunderCategoryCameraWebaddress();
		
		//17.Verify with Edit topic listing page under category insert photo Image button browse
		uploadTests.uploadEditPostunderCategoryImageButtonbrowse();
		
		//18.Verify with Edit topic listing page under category insert photo Image button webaddress
		uploadTests.uploadEditPostunderCategoryImageButtonWebaddress();
		
		//19.Verify with Edit the Post from Search result page Attachment
		uploadTests.uploadEditPostSearch();
		
		//20.Verify with Edit the Post from Search result page camera webaddress
		uploadTests.uploadEditPostSearchCameraWebaddress();
		
		//21.Verify with Edit the Post from Search result page Image webaddress
		uploadTests.uploadEditPostSearchCamerabrowse();
		
		//22.Verify with Edit the Post from Search result page Image button browse
		uploadTests.uploadEditPostSearchImagebrowse();
		
		//23.Verify with Edit the post from Profile page(Attachment)
		uploadTests.uploadEditProfileAttachment();
		
		//24.Verify with Edit the post from Profile page camera browse
		uploadTests.uploadEditPostProfileCamerabrowse();
		
		//25.Verify with Edit the post from Profile page camera webaddress
		uploadTests.uploadEditPostProfileCameraWebaddress();
		
		//26.Verify with Edit the post from Profile page Image webaddress
		uploadTests.uploadEditPostProfileImagewebaddress();
		
		//27.Verify with Edit the post from Profile page Image browse
		uploadTests.uploadEditPostProfileImagebrowse();
		
		//28.Verify with Edit the topic/post by Admin for himself/registered user Attachment
		uploadTests.uploadAdminLogin();
		
		//29.Verify with Edit the topic/post by Admin for himself/registered user Camera browse
		uploadTests.uploadAdminCamerabrowse();
		
		//30.Verify with Edit the topic/post by Admin for himself/registered user camera webaddress
		uploadTests.uploadAdminCameraWebaddress();
		
		//31.Verify with Edit the topic/post by Admin for himself/registered user Image browse
		uploadTests.uploadAdminImagebrowse();
		
		//32.Verify with Edit the topic/post by Admin for himself/registered user Image webaddress
		uploadTests.uploadAdminImageWebaddress();
		
		//33.Verify with sub category from forum listing page(Attachement/insert photos)
		uploadTests.uploadSubCategory();
		
		//33.Verify with sub category from forum listing page camera browse
		uploadTests.uploadSubCategoryCamerabrowse();
		
		//34.Verify with sub category from forum listing page camera webaddress
		uploadTests.uploadSubCategoryCameraWebaddress();
		
		//35.Verify with sub category from forum listing page Image browse
		uploadTests.uploadSubCategoryImagebrowse();
		
		//36.Verify with sub category from forum listing page Image webaddress
		uploadTests.uploadSubCategoryImageWebaddress();
	   */
	  
	   /*** 3.Approval section *****************************/
		/*
		//1.Verify with Edit the post from  Approval queue Page
		uploadTests.uploadApprovalqueue();
	    
		//2.Verify with Edit the post from  Approval queue Page camera browse
		uploadTests.uploadApprovalCamerabrowse();

		//3.Verify with Edit the post from  Approval queue Page camera webaddress
		uploadTests.uploadApprovalCameraWebaddress();	

		//4.Verify with Edit the post from  Approval queue Page Image browse
		uploadTests.uploadApprovalImagebrowse();

		//5.Verify with Edit the post from  Approval queue Page Image webaddress
		uploadTests.uploadApprovalImageWebaddress();
	  */
	
	});

};

