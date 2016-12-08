/***These are the function which has been called in postEventMemberApproval.js and also will be used in other js file as per requirement**********/

'use strict';
var json = require('../../testdata/forgotpasswordData.json');
var config = require('../../../config/config.json');
var postEventMemberApprovalMethod = require('../methods/postEventMemberApproval.js');
var registerMethod = require('../methods/register.js');
var forumLoginMethod = require('../methods/login.js');
var wait = require('../wait.js');
var postEventMemberApprovalTestcases = module.exports = {};
postEventMemberApprovalTestcases.errors = [];

// method to Approve a pending post from- Approval queue button 
postEventMemberApprovalTestcases.approvalQueueButton = function() {
	casper.echo('                                      CASE 1', 'INFO');
	casper.echo('************************************************************************************', 'INFO');
	casper.echo('*                   Approve a pending post from- Approval queue button             *', 'INFO');
	casper.echo('************************************************************************************', 'INFO');
	casper.click('form[name="posts"] a.topic-title');
	wait.waitForElement('i.glyphicon.glyphicon-like-alt', casper, function(err, isExists) {
		if(isExists) {
			casper.click('i.glyphicon.glyphicon-like-alt');
			wait.waitForElement('div#form-dialog[aria-hidden="false"]', casper, function(err, isExists) {
				if(isExists) {
					casper.test.assertExists('button#bootstrap_close_register_dialog','Close button at the Pop Up');
					casper.click('button#bootstrap_close_register_dialog');
				} else {
					casper.echo('Pop Up not found','INFO');
				}
			});
		} else {
			casper.echo('Like button not found','INFO');
		}
	});
};
