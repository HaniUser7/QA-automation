var config = require('../../../config/config.json');
var uploadTests = require('../cases/upload.js');
var upload = module.exports = {};

upload.featureTest = function(casper, test) {
	casper.start(config.url, function() {
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		//Verify with post from topic listing page(Attachment/insert photos)
		uploadTests.uploadPostAttachment();
		//Verify with post from topic listing page(insert photos)
		/*uploadTests.uploadPostAttachmentInsert();
		//Verify with start new Topic Attachment
		uploadTests.uploadStartNewTopic();
		//Verify with start new Topic Insert
		uploadTests.uploadStartNewTopicInsert();
		//Verify with start new Topic Insert camera
		uploadTests.uploadStartNewTopicInsertCamera();
		//Verify with start new Topic Insert camera web
		uploadTests.uploadStartNewTopicInsertCameraWeb();
		//verify start new topic from undercategory
		uploadTests.uploadStartNewTopicUnderCat();
		//verify start new topic from forum listing
		uploadTests.uploadStartNewTopicforumlisting();
		//verify postreply under category
		uploadTests.uploadPostListingUnderCategory();*/
		//calender
		//uploadTests.uploadCalenderEvent();
		//
		//uploadTests.uploadCalenderEditEvent();
		//
		//uploadTests.uploadCalenderEditEventrecurring();
		//
		//uploadTests.uploadPrivateMessage();
		//
		//uploadTests.uploadPrivateMessageInbox();
		//
		//uploadTests.uploadPrivateMessageInboxReplySection();
		//
		//uploadTests.uploadEditPostCameraWeb();
		//
		/*uploadTests.uploadEditPostAttachment();
		//
		uploadTests.uploadEditPostcameraWebaddress();
		//
		uploadTests.uploadEditPostcameraWebbrowse();
		//
		uploadTests.uploadEditPostUnderCategoryPostReplyAttachment();
*/
		//
		//uploadTests.uploadEditPostUnderCategoryPostReplycamerabrowse();
		//
		uploadTests.uploadEditPostUnderCategoryPostReplycamerawebaddress();
		//
		uploadTests.uploadEditPostUnderCategoryPostReplyImagebuttonbrowse();
		//
		uploadTests.uploadEditPostUnderCategoryPostReplyImagebuttonwebaddress();
		//
		uploadTests.uploadEditPostundercategoryAttachment();










	});
};
