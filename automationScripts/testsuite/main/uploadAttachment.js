/****This script is dedicated for Upload Attachment Setting changes permission in back-end and check front on the forum related upload. It covers Upload Attachment with all defined validations****/
'use strict';

var config = require('../../../config/config.json');
var uploadAttachmentTest = require('../cases/uploadAttachment.js');
var uploadAttachment = module.exports = {};


uploadAttachment.featureTest = function(casper, test) {
 
	casper.start(config.backEndUrl, function() {

		this.echo('Title Of The Page :' +this.getTitle(), 'INFO');
		
		

		//.Test case for Registration with different username format 
		//uploadAttachmentTest.backEndSetting();
		
		//1.test case for verify with upload avatar from registration page(verify it from )
		//uploadAttachmentTest.avatarFromRegistration();
		
		//2.test case for verify with upload avatar when you change the avatar after upload on registration page
		//uploadAttachmentTest.uploadAvatarRegistrationChange();
		
		//3.test case for verify with upload avatar when you change the avatar after upload on  edit profile page
		//uploadAttachmentTest.uploadAvatarEditProfileChange();
		
		 //4.test case for verify with upload avatar when you upload avatar after deleting it on registration page
		//uploadAttachmentTest.uploadAvatarRegistrationDeleting();
		
		//5.test case for verify with upload avatar when you upload  avatar after deleting it on edit profile page
		//uploadAttachmentTest.uploadAvatarEditProfileDeleting();
		
		//6.test case for verify upload avatar for the first time on profile page
		//uploadAttachmentTest.uploadAvatarProfile();
		
		//7.test case for verify upload avatar on profile page again when you already upload a avatar
		//uploadAttachmentTest.uploadAvatarProfileAgain();

		//8.test case for verify upload avatar on profile page after remove the already uploaded avatar.
        //uploadAttachmentTest.uploadAvatarProfileRemove();
		
		//9.test case for verify with upload avatar by pc when facebook is enable
        //uploadAttachmentTest.uploadAvatarFacebookEnable();
		
		//9.test case for test case for verify with use my facebook avatar option
        uploadAttachmentTest.uploadAvatarFacebookOption();

	});

};

