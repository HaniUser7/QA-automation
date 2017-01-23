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
	//verify Topic started tab with before start a topic.
	//profilePageTests.profilePageTopicTab();
	///verify with edit topic title
	//profilePageTests.profilePageTopicEditTopicTitle();
	//verify with delete the topic which have edited .
	profilePageTests.profilePageTopicTabDelete();

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
