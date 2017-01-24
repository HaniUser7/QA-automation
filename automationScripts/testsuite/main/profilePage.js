//----- This js file covers all the profilePage functionality on forum Frontend---------//

var config = require('../../../config/config.json');
var profilePageTests = require('../cases/profilePage.js');
var profilePage = module.exports = {};

profilePage.featureTest = function(casper, test) {
	casper.start(config.backEndUrl, function() {

	casper.echo("Title of the page :"+this.getTitle(), 'INFO');	

	//Verify with sending message by message button.
	//profilePageTests.profilePageMessageButton();
	//Verify with sending message by message button is disable.
	//profilePageTests.profilePageMessageButtonDisable();
	//All Post tab for own profile page.
	//profilePageTests.profilePageAllPostTab();
	//Verify with All post tab after start a topic/post
	//profilePageTests.profilePageCreateTopic();
        //Verify with All post tab after delete a topic/post
	//profilePageTests.profilePageDeletePost();
	//Verify with All post tab after edit a topic/post on topic listing page
	//profilePageTests.profilePageEditTopic();
//---------------------------------Topic started tab--------------------------------------------------
	//verify Topic started tab with before start a topic.
	//profilePageTests.profilePageTopicTab();
	///verify with edit topic title
	//profilePageTests.profilePageTopicEditTopicTitle();
	//verify with delete the topic which have edited .
	//profilePageTests.profilePageTopicTabDelete();
//-------------------------------Likes tab-------------------------------------------------------------
	//Verify with like the post.
	//profilePageTests.profilePageLikesTab();
	//verify with dislike the same post you already liked
	//profilePageTests.profilePageDisLikesTab();
	//Verify with delete the post that you liked
	//profilePageTests.profilePageDeleteLikePost();
//---------------------------------Post count----------------------------------------------------------
	//verify by register a new user
	//profilePageTests.CreateRegisterUser();
	//verify post count for newly register user
	//profilePageTests.profilePagePostCount();
	//verify post count with add topic/post
	//profilePageTests.profilePagePostCountAddtopic();
	//verify post count  with delete the post
	//profilePageTests.profilePagePostCountDeletePost();
//---------------------------Reputation------------------------------------------------------------------
	//verify with reputation link after disable the permissions
	//profilePageTests.profilePageReputationDisable();
	//verify with reputation link after enable the permissions
	//profilePageTests.profilePageReputationEnable();
	//verify after like the post(one user like your only one post)
	//profilePageTests.profilePageReputationCount();
	//verify after like the post(one user like your multiple post one post)
	//profilePageTests.profilePageReputationCountMultiplePostLike();
	//verify after dislike the post(one user dislike your only one post)
	//profilePageTests.profilePageReputationCountdislikePost();
	//verify after dislike the post(one user dislike your multiple post one post)
	//profilePageTests.profilePageReputationCountMultidislike();
	//verify with edit user icon
	//profilePageTests.profilePageEditUserIcon();

 //---------------EditProfilePage-----------------------------------------------------------------
	//Disable Signature  for Registered user from group Permission.
	//profilePageTests.profilePageDisableSignature();	
	//Enable Signature  for Registered user from group Permission
	//profilePageTests.profilePageEnableSignature();
	//verify with add a signature greater then maximum charecter(500) limits.
	//profilePageTests.profilePageAddSignature();
	//verify with edit signature
	//profilePageTests.profilePageEditSignature();
	//verify with delete signature
	//profilePageTests.profilePageDeleteSignature();
	//Disable CustomTitile  for Registered user from group Permission
	//profilePageTests.profilePageDisableCustomTitle();
	//Enable CustomTitile for Registered user from group Permission
	//profilePageTests.profilePageEnableCustomTitle();
	//verify with edit custom member title
	//profilePageTests.profilePageEditCustomTitle();
	//verify with delete custom user title
	profilePageTests.profilePageDeleteCustomTitle();
	



	//profilePageTests.profilePageSendFile();	
	//sending message by message button when message permission is disable from back end
	//profilePageTests.profilePageMessageButtonRemove();
	//Verify all post tab before start a topic/or post.
	//profilePageTests.profilePageAllPostTab();
	//Verify with All post tab after start a topic/post.
	//profilePageTests.profilePageAllPostTabDelete();
	//verify with reputation link after disable the permissions
	//profilePageTests.profilePageAllReputationDisable();
	//verify with reputation link after enable the permissions
	//profilePageTests.profilePageAllReputationEnable();
	//
	//profilePageTests.profilePageEditUserIcon();
	//
	//profilePageTests.profilePageDeleteIcon();
	//profilePageTests.profilePagePostCount();
	//
	//profilePageTests.profilePageDislikePostCount();


	});
};
