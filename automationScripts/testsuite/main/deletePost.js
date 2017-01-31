var config = require('../../../config/config.json');
var deletePostTests = require('../cases/deletePost.js');

var deletePost = module.exports = {};

deletePost.featureTest = function(casper, test) {
	casper.start(config.url, function() {
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		//verify by Admin a user on another server
		//deletePostTests.CreateAdminUser();
		//verify by Register a user on another server
		//deletePostTests.CreateRegisterUser();
		//Verify by delete one topic -selecting by check box 
		//deletePostTests.deleteTopicAdmin();
		//Verify by delete multiple topic-selecting by check box 
		/*deletePostTests.deleteAllTopicAdmin();
		//Verify by delete all topic-selecting by check box 3-issue
		deletePostTests.deleteMultipleTopicAdmin();
		//verify with delete topic-by drop down of the topic
		deletePostTests.deleteTopicDropDownAdmin();
		//verify with delete post-selecting by check box 
		deletePostTests.deletePostDropDownAdmin();
		//verify with delete post-selecting by check box 
		deletePostTests.deletePostCheckboxAdmin();
		//delete post from members profile page
		deletePostTests.deletePostProfilePageAdmin();
		//Verify by delete multiple post-selecting by check box 
		deletePostTests.deleteMultiplePostAdmin();
	//****************************Register user*******************************************************
		//Verify by delete one topic -selecting by check box-8 
		deletePostTests.deletePostRegisteruser();
		//Verify by delete all topic -selecting by check box-9 
		deletePostTests.deleteAllTopicRegisteruser();
		//verify with delete topic-by drop down of the topic-10
		deletePostTests.deleteTopicDropDownRegisuser();
		//verify with delete post-selecting by check box-11
		deletePostTests.deletePostCheckboxRegister();
		//verify with delete post-by drop down of the post Register user-12
		deletePostTests.deletePostDropDownRegister();
		//delete post from members profile page register user-13
		deletePostTests.deletePostProfilePage();
		//delete topic by searching topic-14
		deletePostTests.deletePostSearchTopic();
		//delete post by searching post-15
		deletePostTests.deletePostSearchPost();
    //********************************Delete own topic using delete own topic- disable ,delete own post-enable ***********************************
    	
		//Verify by delete one own  topic -selecting by check box by register user.
		deletePostTests.deleteOwnTopic();
		//Verify by delete own all topic-selecting by check box using register user
		deletePostTests.deleteAllOwnTopic();
		//verify with delete  own topic-by drop down of the topic
		deletePostTests.deleteOwnTopicDropdown();
		//verify with delete own post-selecting by check box 
		deletePostTests.deleteOwnPostCheckbox();
		//delete  own post from own profile page
		deletePostTests.deleteOwnProfilePage();
		//delete  own topic by searching topic
		deletePostTests.deleteOwnSearchTopic();
		//delete  own post by searching post
		deletePostTests.deleteOwnSearchPost();
   //*****************"view category-delete own topic- enable-delete own post-disable******************************
   	
		//Verify by delete own topic -selecting by check box 
		deletePostTests.deleteOwnTopicPostDisable();
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
		deletePostTests.deleteOwnSearPostDisable();
   //***************************view category-delete own topic-disable-delete own post-disable*************************
   
		//Verify by delete own topic -selecting by check box 
		deletePostTests.deleteOwnTopicPostDisable();
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
		deletePostTests.deleteOwnSearchTopicPostDis();
//*****************************view category-delete own topic-enable-delete own post-enable*******************************

		//Verify by delete own topic -selecting by check box 
		deletePostTests.deleteOwnTopicPostEnable();
		//Verify by delete all own topic-selecting by check box 
		deletePostTests.deleteAllTopicsPostEnable();
		//verify with delete  own topic-by drop down of the topic
		deletePostTests.deleteOwnTopicDropdownPostEnable();
		//verify with delete own post-selecting by check box 
		deletePostTests.deleteOwnPostCheckboxPostEnable();
		//verify with delete own post-by drop down of the post
		deletePostTests.deleteOwnPostDropDownOwnTopicPostEnable();
		//delete  own post from own profile page
		deletePostTests.deleteOwnProfilePageTopicPostEnable();
		//delete  own topic by searching topic
		deletePostTests.deleteOwnSearchTopicPostEnable();
		//delete own post by searching post
		deletePostTests.deleteOwnSearchTopicPostEnab();
 //*******************************Edit others topic/post as Admin**********************************************************
		//verify with edit topic(Post listing  page)
		deletePostTests.editTopicAdmin();
		//verify with edit post(Post listing  page)
		deletePostTests.editPostAdmin();		
		//verify with edit post on profile page
		deletePostTests.editPostProfilePageAdmin();
		//edit topic by searching topic
		deletePostTests.editTopicSearchAdmin();
		//edit post by searching post
		deletePostTests.editPostSearchAdmin();
		//edit on search listing page by people who posted
		deletePostTests.editPostPeoplePosted();*/
 //****************************Edit own topic/post as register(edit own topic enable)**********************************
		//verify with edit own  topic(Post listing  page)
		deletePostTests.editTopicregister();	
		//verify with edit own  post(Post listing  page)
		deletePostTests.editPostregister();	
		//verify with edit own  post on profile page
		deletePostTests.editProfilePageregister();
		//edit topic by searching own topic
		deletePostTests.editSearchTopicRegister();
		//edit post by searching own post
		deletePostTests.editSearchPostRegister();
		//edit on search listing page by people who posted
		deletePostTests.editSearchPeoplePostedRegister();	
//*****************************Edit own topic/post as register(edit own topic disable)**************************************
		//verify with edit own  topic(Post listing  page)
		/*deletePostTests.editTopicPostDisable();
		//verify with edit own  post(Post listing  page)
		deletePostTests.editPostDisable();
		//verify with edit own  post on profile page
		deletePostTests.editProfilePagePostDisable();
		//edit topic by searching own topic
		deletePostTests.editSearchTopicPostDisable();
		//edit post by searching own post
		//deletePostTests.editSearchTopicPostDisa();
		//edit on search listing page by people who posted
		//deletePostTests.editSearchPeoplePostedEditPostDisable();*/
		







	


	});
};
