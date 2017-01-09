var config = require('../../../config/config.json');
var deletePostTests = require('../cases/deletePost.js');
var deletePost = module.exports = {};

deletePost.featureTest = function(casper, test) {
	casper.start(config.url, function() {
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		//Verify by delete one topic -selecting by check box 
		/*deletePostTests.deletePostDeleteTopic();
		//Verify by delete multiple topic-selecting by check box 
		deletePostTests.deletePostMultiple();
		//Verify by delete all topic-selecting by check box 
		deletePostTests.deletePostAllTopic();*/
		//verify with delete topic-by drop down of the topic
		//deletePostTests.deleteTopicDropDown();
		//verify with delete post-selecting by check box 
		//deletePostTests.deletePostDropDown();
		//verify with delete post-selecting by check box 
		//deletePostTests.deletePostCheckbox();
		//delete post from members profile page
		//deletePostTests.deletePostProfilePage();
		//Verify by delete multiple post-selecting by check box 
		//deletePostTests.deleteMultiplePost();
	//****************************Register user*******************************************************
		//Verify by delete one topic -selecting by check box-8 
		/*deletePostTests.deletePostRegisteruser();
		//Verify by delete all topic -selecting by check box-9 
		deletePostTests.deleteAllTopicRegisteruser();
		//verify with delete topic-by drop down of the topic-10
		deletePostTests.deleteTopicDropDownRegisuser();
		//verify with delete post-selecting by check box-11
		deletePostTests.deletePostCheckboxRegister();
		//verify with delete post-by drop down of the post Register user-12
		deletePostTests.deletePostDropDownRegister();
		//delete post from members profile page register user-13
		deletePostTests.deletePostProfilePage();*/
		//delete topic by searching topic-14
		deletePostTests.deletePostSearchTopic();
		//delete post by searching post-15
		//deletePostTests.deletePostSearchPost();












	});
};
