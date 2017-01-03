var config = require('../../../config/config.json');
var uploadTests = require('../cases/upload.js');
var upload = module.exports = {};

upload.featureTest = function(casper, test) {
	casper.start(config.url, function() {
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
	//*********************Post section******************************************
		//Verify with post from topic listing page(Attachment/insert photos)
		uploadTests.uploadPostAttachment();
		//Verify with post from topic listing page(insert photos)
		/*uploadTests.uploadPostAttachmentCamera();
		//Verify with start new Topic Attachment
		uploadTests.uploadStartNewTopic();
		//Verify with start new Topic Insert
		uploadTests.uploadStartNewTopicImageButton();
		//Verify with start new Topic Insert camera
		uploadTests.uploadStartNewTopicCameraBrowse();
		//Verify with start new Topic Insert camera web
		uploadTests.uploadStartNewTopicCameraWebaddress();
		//verify start new topic from undercategory
		uploadTests.uploadStartNewTopicUnderCat();
		//verify start new topic from forum listing
		uploadTests.uploadStartNewTopicforumlisting();
		//verify postreply under category
		uploadTests.uploadPostListingUnderCategory();
	//***************************calender section****************************************
		//Verify with calender page(insert photos) Image button web address
		uploadTests.uploadCalenderEventImageButton();
		//verify with Edit the event from calender page(insert photos) Image button
		uploadTests.uploadCalenderEditEvent();
		//verify with Edit the event from calender page event ranged/recurring/same day
		uploadTests.uploadCalenderEditEventrecurring();
	
	//********************Private Message section Inbox**************************************
		//Verify with private message(send new message)(Attachment)
		//uploadTests.uploadPMSendNewMessage(); not found selector
		//Verify with private message(Inbox)(Insert photo) Attachment
		uploadTests.uploadPMInboxAttachment();
		//Verify with private message(Inbox)(Insert photo) camera browse
		uploadTests.uploadPrivateMessageInboxaddress();
		//Verify with private message(Inbox)(Insert photo) camera webaddress
		uploadTests.uploadPMInboxwebbrowse();
		//Verify with private message(Inbox)(Insert photo) camera Image button
		//uploadTests.uploadPMInboxImageButton(); selector not found
	//**************************Edit section**************************************************
		//Verify with Edit the Post from Topic listing page attachment
		 uploadTests.uploadEditPostAttachment();
		//Verify with Edit the Post from Topic listing page(insert photos) camera web address
		uploadTests.uploadEditPostCameraWebaddress();
		//Verify with Edit the Post from Topic listing page(insert photos) camera browse
		uploadTests.uploadEditPostCamerabrowse();
		//Verify with Edit the Topic/Post from Topic listing page Attachment
		uploadTests.uploadEditTopicAttachment();
		//Verify with Edit the Topic/Post from Topic listing page insert photo camera webaddress
		uploadTests.uploadEditTopicCameraWebaddress();
		//Verify with Edit the Topic/Post from Topic listing page insert photo camera webaddress
		uploadTests.uploadEditTopicCameraWebbrowse(); //working fine----21*/
		//Verify with Edit the Topic/Post from Topic listing page using image button browse
		/*uploadTests.uploadEditTopicImageButtonbrowse();
		//Verify with Edit the Topic/Post from Topic listing page using Image button webaddress
		uploadTests.uploadEditTopicImageButtonWebaddress();
		//Verify with Edit topic listing page under category (post a reply)Attachment
		uploadTests.uploadEditPostUnderCategoryPostReplyAttachment();
		//Verify with Edit topic listiuploadTests.uploadsubcategoryng page under category (using post a reply)camera browse
		uploadTests.uploadEditPostUnderCategoryPostReplyCamerabrowse();
		//Verify with Edit topic listing page under category (using post a reply) camera webaddress
		uploadTests.uploadEditPostUnderCategoryPostReplyCameraWebaddress();
		//Verify with Edit topic listing page under category (using post a reply) Imagebutton browse
		uploadTests.uploadEditPostUnderCategoryPostReplyImagebuttonbrowse(); //working fine
		//Verify with Edit topic listing page under category(using post a reply) Imagebutton  webaddress
		uploadTests.uploadEditPostUnderCategoryPostReplyImagebuttonwebaddress();
		//Verify with Edit topic listing page under category(Attachment)
		uploadTests.uploadEditPostunderCategoryAttachment();
		//Verify with Edit topic listing page under category insert photo camera browse
		uploadTests.uploadEditPostunderCategoryCamerabrowse();
		//Verify with Edit topic listing page under category insert photo camera webaddress
		uploadTests.uploadEditPostunderCategoryCameraWebaddress();
		//Verify with Edit topic listing page under category insert photo Image button browse
		uploadTests.uploadEditPostunderCategoryImageButtonbrowse();*/
		//Verify with Edit topic listing page under category insert photo Image button webaddress
		uploadTests.uploadEditPostunderCategoryImageButtonWebaddress();
	//******************Search section*********************************************************
		//Verify with Edit the Post from Search result page Attachment
		/*uploadTests.uploadEditPostSearch();
		//Verify with Edit the Post from Search result page camera webaddress
		uploadTests.uploadEditPostSearchCameraWebaddress();
		//Verify with Edit the Post from Search result page Image webaddress
		uploadTests.uploadEditPostSearchCamerabrowse();
		//Verify with Edit the Post from Search result page Image button browse
		uploadTests.uploadEditPostSearchImagebrowse();*/
	//**************************profile page*******************************************************
		//Verify with Edit the post from Profile page(Attachment)
		uploadTests.uploadEditProfileAttachment();
		//Verify with Edit the post from Profile page camera browse
		uploadTests.uploadEditPostProfileCamerabrowse();
		//Verify with Edit the post from Profile page camera webaddress
		uploadTests.uploadEditPostProfileCameraWebaddress();
		//Verify with Edit the post from Profile page Image webaddress
		uploadTests.uploadEditPostProfileImagewebaddress();
		//Verify with Edit the post from Profile page Image browse
		uploadTests.uploadEditPostProfileImagebrowse();
		//Verify with Edit the topic/post by Admin for himself/registered user Attachment
		uploadTests.uploadAdminLogin();
		//Verify with Edit the topic/post by Admin for himself/registered user Camera browse
		uploadTests.uploadAdminCamerabrowse();
		//Verify with Edit the topic/post by Admin for himself/registered user camera webaddress
		uploadTests.uploadAdminCameraWebaddress();
		//Verify with Edit the topic/post by Admin for himself/registered user Image browse
		uploadTests.uploadAdminImagebrowse();
		//Verify with Edit the topic/post by Admin for himself/registered user Image webaddress
		uploadTests.uploadAdminImageWebaddress();
	//***********************Sub-category***********************************************************
		//Verify with sub category from forum listing page(Attachement/insert photos)
		/*uploadTests.uploadSubCategory();
		//Verify with sub category from forum listing page camera browse
		uploadTests.uploadSubCategoryCamerabrowse();
		//Verify with sub category from forum listing page camera webaddress
		uploadTests.uploadSubCategoryCameraWebaddress();
		//Verify with sub category from forum listing page Image browse
		uploadTests.uploadSubCategoryImagebrowse();
		//Verify with sub category from forum listing page Image webaddress
		uploadTests.uploadSubCategoryImageWebaddress();*/
	   //****************************Approval section************************************
		//Verify with Edit the post from  Approval queue Page
		uploadTests.uploadApprovalqueue();
	        //Verify with Edit the post from  Approval queue Page camera browse
		uploadTests.uploadApprovalCamerabrowse();
		//Verify with Edit the post from  Approval queue Page camera webaddress
		uploadTests.uploadApprovalCameraWebaddress();	
		//Verify with Edit the post from  Approval queue Page Image browse
		uploadTests.uploadApprovalImagebrowse();
		//Verify with Edit the post from  Approval queue Page Image webaddress
		uploadTests.uploadApprovalImageWebaddress();
	 //*********************************Album Section***************************************	
		//verify with add new pic in album from add photos button
		uploadTests.uploadAlbum();
		//verify with upload pic by click on add album>add photos
		uploadTests.uploadAlbumAddPhotos();
		//verify with  upload pic after click on  edit album>add photos
		uploadTests.uploadEditAlbum();
		//verify with upload picz by click on album cover photo>add photo
		uploadTests.uploadAlbumCover();
		//verify with upload picz by click on album cover photo>edit album >delete all picz>add new photo
		uploadTests.uploadAlbumDelete();
		//verify with upload picz by click on album cover photo>edit album>delete some picz>add new photo.
		uploadTests.uploadAlbumCoverAdd();
		//verify with upload picz by edit album>delete all picz> add new picz
		uploadTests.uploadEditAddNew();
		//verify with upload picz by edit album>delete some picz>add new picz
		uploadTests.uploadEditAddNewPicz();
	//******************************Combine all forum cases****************************************
		//Delete Category method
		//uploadTests.DeleteCategory();
		//Verify with post from topic listing page(Attachment/insert photos)
		//uploadTests.uploadCombineAllForum();
		
		





	});
};
