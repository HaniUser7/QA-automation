//----- This js file covers all the profilePage functionality on forum Frontend---------//

var config = require('../../../config/config.json');
var profilePageTests = require('../cases/profilePage.js');
var profilePage = module.exports = {};

profilePage.featureTest = function(casper, test) {
	casper.start(config.backEndUrl, function() {

	casper.echo("Title of the page :"+this.getTitle(), 'INFO');	

//------------------create user admin , Register user-----------------------------------
	//verify by creating Admin-user
	//profilePageTests.CreateAdminUser();
	//Verify by creating Register user
	//profilePageTests.CreateRegisterUser();
//---------------------------------------------------------------------------------------

	//Verify with sending message by message button.
	profilePageTests.profilePageMessageButton();
	//Verify with sending message by message button is disable.
	profilePageTests.profilePageMessageButtonDisable();
	//All Post tab for own profile page.
	profilePageTests.profilePageAllPostTab();
	//Verify with All post tab after start a topic/post
	profilePageTests.profilePageCreateTopic();
        //Verify with All post tab after delete a topic/post
	profilePageTests.profilePageDeletePost();
	//Verify with All post tab after edit a topic/post on topic listing page
	profilePageTests.profilePageEditTopic();
//---------------------------------Topic started tab--------------------------------------------------
	//verify Topic started tab with before start a topic.
	profilePageTests.profilePageTopicTab();
	//Verify with topic started tab after start a topic.
	profilePageTests.profilePageTopicTabCreateTopic();
	///verify with edit topic title
	profilePageTests.profilePageTopicEditTopicTitle();
	//verify with delete the topic which have edited .
	profilePageTests.profilePageTopicTabDelete();
//-------------------------------Likes tab-------------------------------------------------------------
	//Verify with like the post.
	profilePageTests.profilePageLikesTab();
	//verify with dislike the same post you already liked
	profilePageTests.profilePageDisLikesTab();
	//Verify with delete the post that you liked
	profilePageTests.profilePageDeleteLikePost();
//---------------------------------Post count----------------------------------------------------------
	//verify by register a new user
	 profilePageTests.CreateRegisterUserPostCount();
	//verify post count for newly register user
	 profilePageTests.profilePagePostCount();
	//verify post count with add topic/post
	 profilePageTests.profilePagePostCountAddtopic();
	//verify post count  with delete the post
	profilePageTests.profilePagePostCountDeletePost();
//---------------------------Reputation------------------------------------------------------------------
	//verify with reputation link after disable the permissions
	profilePageTests.profilePageReputationDisable();
	//verify with reputation link after enable the permissions
	profilePageTests.profilePageReputationEnable();
	//verify after like the post(one user like your only one post)
	profilePageTests.profilePageReputationCount();
	//verify after like the post(one user like your multiple post one post)
	profilePageTests.profilePageReputationCountMultiplePostLike();
	//verify after dislike the post(one user dislike your only one post)
	profilePageTests.profilePageReputationCountdislikePost();
	//verify after dislike the post(one user dislike your multiple post one post)
	profilePageTests.profilePageReputationCountMultidislike();
	//verify with edit user icon
	profilePageTests.profilePageEditUserIcon();
	//verify with delete icon
	profilePageTests.profilePageDeleteIcon();

//-----------------------------upload-------------------------------------------------------------
	//verify with insert a photo and send it
	//profilePageTests.profilePageInsertPhoto();
		
	

 //---------------EditProfilePage-----------------------------------------------------------------
	//Disable Signature  for Registered user from group Permission.
	profilePageTests.profilePageDisableSignature();	
	//Enable Signature  for Registered user from group Permission
	profilePageTests.profilePageEnableSignature();
	//verify with add a signature greater then maximum charecter(500) limits.
	profilePageTests.profilePageAddSignature();
	//verify with edit signature
	profilePageTests.profilePageEditSignature();
	//verify with delete signature
	profilePageTests.profilePageDeleteSignature();
	//Disable CustomTitile  for Registered user from group Permission
	profilePageTests.profilePageDisableCustomTitle();
	//Enable CustomTitile for Registered user from group Permission
	profilePageTests.profilePageEnableCustomTitle();
	//verify by add a custom user title 
	profilePageTests.addCustomTitle();
	//verify with edit custom member title
	profilePageTests.profilePageEditCustomTitle();
	//verify with delete custom user title
	profilePageTests.profilePageDeleteCustomTitle();
//-------------------------------shield icon--------------------------------------------------
	//Verify the shield icon for registered user  on edit profile pgae
	profilePageTests.profilePageShieldIcon();
	//Verify the tool tip on the shield icon 
	profilePageTests.profilePageToolTipShieldIcon();
	//Verify the shield icon for registered user  on edit profile pgae by the admin
	profilePageTests.profilePageShieldIconRegisteruser();
	//verify with invalid birthday(fututre year)
	profilePageTests.profilePageInvalidBirthday();
	//verify with invalid birthday(future month)
	profilePageTests.profilePageInvalidFutureMonth();
	//verify with enter full name greater then maximum limits(30)
	profilePageTests.profilePageVerifyFullName();
	
	
	});
};
