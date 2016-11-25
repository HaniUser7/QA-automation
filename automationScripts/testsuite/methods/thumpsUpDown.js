/***These are the function which has been called in thumpsUpDown.js and also will be used in other js file as per requirement**********/

'use strict';
var thumpsUpDownMethod = module.exports = {};
//*************************************************PRIVATE METHODS***********************************************

//Method For Verifying Error Message On Thums UP/DOWN
thumpsUpDownMethod.verifyErrorMsg = function(errorMessage, expectedErrorMsg, msgTitle, driver, callback) {
	driver.echo('Actual Error message : '+errorMessage, 'INFO');
	driver.echo('Expected Error message : '+expectedErrorMsg, 'INFO');
	if((errorMessage == expectedErrorMsg) || (errorMessage.indexOf(expectedErrorMsg) > -1)) {
		driver.echo('Error message is verified when user try to edit with "' +msgTitle+'"', 'INFO');
	} else {
		driver.echo("Error Message Is Not Correct", 'ERROR');
	}
	return callback(null);
};

//Method For Verifying Success Message On Thums UP/DOWN
thumpsUpDownMethod.verifySuccessMsg = function(successMsg, expectedSuccessMsg, msgTitle, driver, callback) {
	driver.echo('Actual Success message : '+successMsg, 'INFO');
	driver.echo('Expected Success message : '+expectedSuccessMsg, 'INFO');
	if((successMsg == expectedSuccessMsg) || (successMsg.indexOf(expectedSuccessMsg) > -1)) {
		driver.echo('Success message is verified when user try to edit with "' +msgTitle+'"', 'INFO');
	} else {
		driver.echo("Error Message Is Not Correct", 'ERROR');
	}
	return callback(null);
};

// method for goto New Topic page to application
thumpsUpDownMethod.gotoNewTopicpage = function(driver, callback) {
	driver.test.assertExists('#links-nav');
	driver.click('#links-nav');
	driver.test.assertExists('#latest_topics_show');
	driver.click('#latest_topics_show');
	driver.waitForSelector('a[href="/post/printadd"]', function success() {
		this.click('a[href="/post/printadd"]');
		return callback(null);
	});
};

// method for goto post topic page to application
thumpsUpDownMethod.postTopicpage = function(data, driver, callback) {
	casper.echo("data.title : "+data.title, 'INFO');
	casper.echo("data.content : "+data.content, 'INFO');
	casper.echo("data.category : "+data.category, 'INFO');
	driver.sendKeys('input[name="subject"]', data.title, {reset:true});
	driver.withFrame('message_ifr', function() {
		this.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
		this.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
 		this.sendKeys('#tinymce', data.content);
	});	
		driver.wait(3000);
		driver.click('#all_forums_dropdown');
		driver.fill('form[name="PostTopic"]',{
			'forum' : data.category
		},false);
	
	driver.then(function() {
		driver.click('#post_submit');
	});
	
	return callback(null);
};
