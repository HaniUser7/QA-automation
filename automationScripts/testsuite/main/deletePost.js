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
		//deletePostTests.deletePostSearchTopic();
		//delete post by searching post-15
		//deletePostTests.deletePostSearchPost();
    //********************************Delete own topic using register user***********************************
		//Verify by delete one own  topic -selecting by check box by register user.
		//deletePostTests.deleteOwnTopic();
		//Verify by delete own all topic-selecting by check box using register user
		//deletePostTests.deleteAllOwnTopic();
		//verify with delete  own topic-by drop down of the topic
		//deletePostTests.deleteOwnTopicDropdown();
		//verify with delete own post-selecting by check box 
		//deletePostTests.deleteOwnPostCheckboxRegister();
		//delete  own post from own profile page
		//deletePostTests.deleteOwnProfilePage();
		//delete  own topic by searching topic
		//deletePostTests.deleteOwnSearchTopic();
		//delete  own post by searching post
		//deletePostTests.deleteOwnSearchPost();
   //*****************"view category-delete own topic- enable-delete own post-disable******************************
		//Verify by delete own topic -selecting by check box 
		/*deletePostTests.deleteOwnTopicPostDisable();
		//Verify by delete all own topic-selecting by check box 
		deletePostTests.deleteAllTopicPostDisable();
		//verify with delete  own topic-by drop down of the topic
		deletePostTests.deleteOwnTopicDropdownPostDisable();
		//verify with delete own post-selecting by check box
		deletePostTests.deleteOwnPostCheckboxPostDisable();
		//verify with delete own post-by drop down of the post
		deletePostTests.deleteOwnPostDropDownOwnPostDisable();
		//delete  own post from own profile page
		deletePostTests.deleteOwnProfilePagePostDisable();
		//delete  own topic by searching topic
		deletePostTests.deleteSearchPostDisable();
		//delete own post by searching post
		deletePostTests.deleteOwnSearPostDisable();*/
   //***************************view category-delete own topic-disable-delete own post-disable*************************
		//Verify by delete own topic -selecting by check box 
		/*deletePostTests.deleteOwnTopicPostDisable();
		//Verify by delete all own topic-selecting by check box 
		deletePostTests.deleteAllTopicsPostDisable();
		//verify with delete  own topic-by drop down of the topic
		deletePostTests.deleteOwnTopicDropdownTopicPostDisable();
		//verify with delete own post-selecting by check box 
		deletePostTests.deleteOwnPostCheckboxTopicPostDisable();
		//verify with delete own post-by drop down of the post
		deletePostTests.deleteOwnPostDropDownOwnTopicPostDisable();
		//delete  own post from own profile page
		deletePostTests.deleteOwnProfilePageTopicPostDisable();
		//delete  own topic by searching topic
		deletePostTests.deleteOwnSearchTopicPostDisable();
		//delete own post by searching post
		deletePostTests.deleteOwnSearchTopicPostDis();*/
//*****************************view category-delete own topic-enable-delete own post-enable*******************************
		//Verify by delete own topic -selecting by check box 
		/*deletePostTests.deleteOwnTopicPostEnable();
		//Verify by delete all own topic-selecting by check box 
		deletePostTests.deleteAllTopicsPostEnable();
		//verify with delete  own topic-by drop down of the topic
		deletePostTests.deleteOwnTopicDropdownTopicPostEnable();
		//verify with delete own post-selecting by check box 
		deletePostTests.deleteOwnPostCheckboxTopicPostEnable();
		//verify with delete own post-by drop down of the post
		deletePostTests.deleteOwnPostDropDownOwnTopicPostEnable();
		//delete  own post from own profile page
		deletePostTests.deleteOwnProfilePageTopicPostEnable();
		//delete  own topic by searching topic
		deletePostTests.deleteOwnSearchTopicPostEnable();
		//delete own post by searching post
		deletePostTests.deleteOwnSearchTopicPostEnab();*/
 //*******************************Edit others topic/post as admin**********************************************************
		//verify with edit topic(Post listing  page)
		//deletePostTests.editTopicAdmin();
		//verify with edit post(Post listing  page)
		//deletePostTests.editPostAdmin();		
		//verify with edit post on profile page
		//deletePostTests.editPostProfilePageAdmin();
		//edit topic by searching topic
		//deletePostTests.editTopicSearch();
		//edit post by searching post
		//deletePostTests.editPostSearch();
		//edit on search listing page by people who posted
		//deletePostTests.editPostPeoplePosted();
 //****************************Edit own topic/post as register(edit own topic enable)**********************************
		//verify with edit own  topic(Post listing  page)
		//deletePostTests.editTopicregister();	
		//verify with edit own  post(Post listing  page)
		//deletePostTests.editPostregister();	
		//verify with edit own  post on profile page
		//deletePostTests.editProfilePageregister();
		//edit topic by searching own topic
		//deletePostTests.editSearchTopicRegister();
		//edit on search listing page by people who posted
		//deletePostTests.editSearchPeoplePostedRegister();	
//*****************************Edit own topic/post as register(edit own topic disable)**************************************
		//verify with edit own  topic(Post listing  page)
		//deletePostTests.editTopicEditDisable();
		//verify with edit own  post(Post listing  page)
		//deletePostTests.editPostEditPostDisable();
		//verify with edit own  post on profile page
		//deletePostTests.editProfilePageEditPostDisable();
		//edit topic by searching own topic
		//deletePostTests.editSearchEditPostDisable();
		//edit on search listing page by people who posted
		deletePostTests.editSearchPeoplePostedEditPostDisable();










	


	});
};
