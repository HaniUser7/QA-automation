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
		//Verify by delete one topic -selecting by check box 
		deletePostTests.deletePostRegisteruser();
		//













	});
};
