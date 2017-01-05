var config = require('../../../config/config.json');
var deletePostTests = require('../cases/deletePost.js');
var deletePost = module.exports = {};

deletePost.featureTest = function(casper, test) {
	casper.start(config.url, function() {
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		//Verify by delete one topic -selecting by check box 
		deletePostTests.deletePostDeleteTopic();
		//Verify by delete multiple topic-selecting by check box 
		deletePostTests.deletePostMultiple();
		//Verify by delete all topic-selecting by check box 
		deletePostTests.deletePostAllTopic();
		//verify with delete topic-by drop down of the topic
		deletePostTests.deletePostDropDown();

















	});
};
