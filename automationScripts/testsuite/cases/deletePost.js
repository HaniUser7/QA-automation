//----- This js file covers all the upload functionality on forum Frontend---------//
var config = require('../../../config/config.json');
var json = require('../../testdata/inContextLogin.json');
var inContextLoginMethod = require('../methods/inContextLogin.js');
var loginPrivacyOptionMethod = require('../methods/loginByPrivacyOption.js');
var wait=require('../wait.js');
var utils=require('../utils.js');
deletePostTests = module.exports = {};

//Verify by delete one topic -selecting by check box 
deletePostTests.deletePostDeleteTopic=function(){
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('                   TestCase 1               ' ,'INFO');	
		casper.echo('***********Verify by delete one topic -selecting by check box ************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....',
			
 'INFO');
					        casper.wait(2000 , function(){
						casper.capture('1546.png');

						});



















	});
};






