var config = require("./config/config.json");

casper.options.viewportSize = config.app.viewportSize;
casper.options.verbose = config.app.verbose;
casper.options.logLevel = config.app.logLevel;
//casper.options.waitTimeout = config.app.waitTimeout;

var feature = casper.cli.get('feature');
if(feature){
	casper.echo("Started testing for the feature: " + feature +"\n");
}else{
	casper.echo("It seems, you have not given any option.");
}

switch (feature) {
    case "login":
        casper.test.begin('Verify login functionality from home page with all valid and invalid scenarios ', function(test) {
		var forumLogin = require("./testsuite/forum_login.js");
		forumLogin.featureTest(casper, casper.test);
		casper.run(function(){
			test.done();
		});
	});
        break;
    case "editProfile":
	casper.test.begin("Start Edit Profile functionality from home page & verify content with all valid and invalid scenarios", function(test) {
		var editProfile = require("./testsuite/editprofile.js");
		editProfile.featureTest(casper, casper.test);
		casper.run(function() {
			test.done();
			test.assert(true);
		});
	});
        
        break;

    case "editProfileWithSettings":
	casper.test.begin("Start Edit Profile functionality from home page & verify content with all valid and invalid scenarios", function(test) {
		var editProfile = require("./testsuite/editprofile.js");
		editProfile.customFieldsTest(casper, casper.test);
		casper.run(function() {
			test.done();
			test.assert(true);
		});
	});
        
        break;
    case "deleteAccount":
	casper.test.begin("Start 'Delete Account' functionality from home page & verify content with all scenarios", function(test) {

		var deleteAccount = require("./testsuite/deleteAccount.js");
		var x = require('casper').selectXPath;
		deleteAccount.featureTest(casper, casper.test, x);
		casper.run(function(){
			test.done();
			test.assert(true);
		});
	});
        
        break;
		
    case "deleteAccountWithSettings":
	casper.test.begin("Start 'Delete Account' functionality from home page & verify content with all scenarios", function(test) {

		var deleteAccount = require("./testsuite/deleteAccount.js");
		deleteAccount.customFieldsTest(casper, casper.test);
		
		casper.run(function(){
			test.done();
			test.assert(true);
		});
	});
        
        break;
    case "register":
    	casper.test.begin('REGISTRATION TEST', function(test) {
		var forumRegister = require("./testsuite/register.js");
		forumRegister.featureTest(casper, test);
		casper.run(function(){
			test.done();
			test.assert(true);
		});
	});
        break;
	case "registerWithSettings":
    	casper.test.begin('REGISTRATION WITH SETTINGS TEST', function(test) {
		var forumRegister = require("./testsuite/register.js");
		forumRegister.registerWithSettings(casper, test);
		casper.run(function(){
			test.done();
			test.assert(true);
		});
	});
        break;
        case "inContextRegistration":
    	casper.test.begin('IN CONTEXT REGISTRATION TEST', function(test) {
		var inContextForumRegister = require("./testsuite/inContextRegister.js");
		inContextForumRegister.featureTest(casper, test);
		casper.run(function(){
			test.done();
			test.assert(true);
		});
	});
        break;
         case "backEndRegistration":
    	casper.test.begin('BACK END REGISTRATION TEST', function(test) {
		var backEndRegister = require("./testsuite/backEndRegister.js");
		backEndRegister.featureTest(casper, test);
		casper.run(function(){
			test.done();
			test.assert(true);
		});
	});
        break;
        case "verifyCategoryPermissions":
    	casper.test.begin('VERIFY CATEGORY PERMISSIONS TEST', function(test) {
		var verifyCategoryPermissions = require("./testsuite/verifyCategoryPermissions.js");
		verifyCategoryPermissions.featureTest(casper, test);
		casper.run(function(){
			test.done();
			test.assert(true);
		});
	});
        break;
        case "uploadAttachment":
    	casper.test.begin('VERIFY UPLOAD ATTACHMENT TEST', function(test) {
		var uploadAttachment = require("./testsuite/uploadAttachment.js");
		uploadAttachment.featureTest(casper, test);
		casper.run(function(){
			test.done();
			test.assert(true);
		});
	});
        break;
	case "topic":
	casper.test.begin("Start New Topic functionality from home page & verify content with all valid and invalid scenarios", function(test) {

		var newTopic = require("./testsuite/newTopic.js");
		var x = require('casper').selectXPath;
		newTopic.featureTest(casper, casper.test, x);
		
		casper.run(function(){
			test.done();
		});
	});
        
        break;
    case "postreply":
        casper.test.begin("Start reply topic functionality from home page & verify content with all valid and invalid scenarios", function(test) {

		var postAReply = require("./testsuite/postAReply.js");
		var x = require('casper').selectXPath;
		postAReply.featureTest(casper, casper.test, x);
		casper.run(function(){
			test.done();
		});
	});
        break;
 case "edittopic":
        casper.test.begin("Start edit Topic functionality from home page & verify content with all valid and invalid scenarios", function(test) {

		var editTopic = require("./testsuite/editTopic.js");
		var x = require('casper').selectXPath;
		editTopic.featureTest(casper, casper.test, x);
		casper.run(function(){
			test.done();
		});
	});
        break;
	case "forgotpassword":
        casper.test.begin('Verify forgot your password functionality from home page ', function(test) {
		var forumLogin = require("./testsuite/forgotPassword.js");
		forumLogin.featureTest(casper, casper.test);
		casper.run(function(){
			test.done();
		});
	});
        break;
case "deletetopic":
        casper.test.begin("Delete Topic functionality from home page & verify deleted post", function(test) {

		var deleteTopic = require("./testsuite/deleteTopic.js");
		var x = require('casper').selectXPath;
		deleteTopic.featureTest(casper, casper.test, x);		
		casper.run(function(){
			test.done();
		});
	});
        break;
	case "calendar" :
		 casper.test.begin('Verify calendar functionlity ', function(test) {
		var x = require('casper').selectXPath;
		 var calendar = require("./testsuite/calendar.js");
		 calendar.featureTest(casper, casper.test,x);
		 casper.run(function(){
			test.done();
		});
	});
        break;
	case "incontextlogin" :
		 casper.test.begin('Verify inContext Login functionlity ', function(test) {
		 var inContextLogin = require("./testsuite/inContextLogin.js");
		 inContextLogin.featureTest(casper, casper.test);
		 casper.run(function(){
			test.done();
		});
	});
        break;
	case "pintopic" :
		 casper.test.begin('Verify pin topic functionlity ', function(test) {
		 var pinTopic = require("./testsuite/pinTopic.js");
		 var x = require('casper').selectXPath;
		 pinTopic.pinUnPinFeature(casper, casper.test, x);
		 casper.run(function(){
			test.done();
		});
	});
        break;
	case "lockunlock" :
		 casper.test.begin('Verify lock-unLock topic functionlity ', function(test) {
		 var lock_unLockTopic = require("./testsuite/lock_unLockTopic.js");
		 var x = require('casper').selectXPath;
		 lock_unLockTopic.featureTest(casper, casper.test, x);
		 casper.run(function(){
			test.done();
		});
	});
        break;
	case "poll" :
		 casper.test.begin('Verify poll topic functionlity ', function(test) {
		 var poll = require("./testsuite/poll.js");
		 var x = require('casper').selectXPath;
		 poll.featureTest(casper, casper.test, x);
		 casper.run(function(){
			test.done();
		});
	});
        break;
	case "movetopic" :
		 casper.test.begin('Verify move topic functionlity ', function(test) {
		 var moveTopic = require("./testsuite/moveTopic.js");
		 var x = require('casper').selectXPath;
		 moveTopic.moveTopicFeature(casper, casper.test, x);
		 casper.run(function(){
			test.done();
		});
	});
        break;

    default:
	casper.echo("Please select any feature from options given below. For ex: casperjs main.js <option>.\n"); 
        casper.echo("Options:");
	casper.echo("	register");
	casper.echo("	registerWithSettings");
	casper.echo("	inContextRegistration");
	casper.echo("	backEndRegistration");
	casper.echo("	verifyCategoryPermissions");
	casper.echo("	login");
	casper.echo("	topic");
	casper.echo("	postreply\n");
	casper.echo("	edittopic\n");
	casper.echo("	deletetopic\n");
	casper.echo("	calendar\n");
	casper.echo("	poll\n");
	casper.echo("Relevant test data has to be fed in JSON format in files placed for each feature in '<current directory>/testData/'.");
	casper.exit();
};



