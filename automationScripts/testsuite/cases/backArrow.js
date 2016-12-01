/****This script is dedicated for Admin to move topic/post on the forum. It covers testing of move topic/post with all defined validations****/

"use strict";

var backArrowTests= module.exports = {};

var wait = require('../wait.js');

var forumLoginMethod  = require('../methods/login.js');

var backArrowMethod  = require('../methods/backArrow.js');

var json  = require('../../testdata/backArrowData.json');

//Test Case for Register With Valid Information.

backArrowTests.verifyBackArrow= function() {

	/*****Verify back arrow on topic listing page*****/
	casper.echo('Verify back arrow on topic listing page', 'INFO');
	forumLoginMethod.loginToApp(json['registered_user'].username, json['registered_user'].password, casper, function(err) {
		if(!err) {
			wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExists) {	
				if(!err){
					if(isExists) {
						casper.click('a[href="/categories"]');
						wait.waitForElement('a[href="#forums"]', casper, function(err, isExists) {	
							if(!err){
								if(isExists) {
									//Click on first category
									try{
										casper.test.assertDoesntExist('.table-responsive ul li:nth-child(2) a');
									}catch(e){
										casper.test.assertExists('.table-responsive ul li:nth-child(2) a');
										casper.click('.table-responsive ul li:nth-child(2)  a');
										wait.waitForElement('#back_arrow_topic', casper, function(err, isExists) {	
											if(!err){
												if(isExists) {
													//click on back arrow
													casper.test.assertExists('#back_arrow_topic');
										  			casper.click('#back_arrow_topic');
													wait.waitForElement('a[href="#forums"]', casper, function(err, isExists) {	
														if(!err){
															if(isExists) {
									
																casper.echo('Navigate back to category listing page ', 'INFO');
															} else {
																casper.echo('Does not navigate back to category listing page ', 'ERROR');
															}	
														}
													});
												} else {
													casper.echo('Back arrow does not appears in 5 seconds ', 'ERROR');
												}	
											}
										});
									}
							
								} else {
									casper.echo('Category listing page not found ', 'ERROR');
								}	
							}
						});
					} else {
						casper.echo('Unable to successfully login ', 'ERROR');
					}	
				}
			});
		}
	});		
}; 

backArrowTests.sortOption= function() {
	casper.then(function(){

		/*****Verify with sorting options like latest/new/top*****/
		casper.echo('Verify with sorting options like latest/new/top', 'INFO');
		casper.test.assertExists('.table-responsive ul li:nth-child(2) a');
		casper.click('.table-responsive ul li:nth-child(2) a');
		wait.waitForElement('.panel-heading', casper, function(err, isExists) {	
			if(!err){
				if(isExists) {
					casper.test.assertExists('.panel-heading li:nth-child(2) a');
					casper.click('.panel-heading li:nth-child(2) a');
					wait.waitForElement('.panel-heading li:nth-child(2).active', casper, function(err, isExists) {	
						if(!err){
							if(isExists) {
								casper.test.assertExists('#back_arrow_topic');
								casper.click('#back_arrow_topic');
								wait.waitForElement('.panel-heading li:nth-child(1).active', casper, function(err, isExists) {	
									if(!err){
										if(isExists) {
											casper.echo('Navigate back to  latest topic listing page ', 'INFO');
										} else {
											casper.echo('latest topic is not appeared in 5 seconds ', 'ERROR');
										}	
									}
								});
							} else {
								casper.echo('Sorting by new topic is not possible', 'ERROR');
							}	
						}
					});
					} else {
						casper.echo('Does not navigate  to topic listing page ', 'ERROR');
				}	
			}
		});
	});	
};


backArrowTests.readAllPost= function() {
	casper.then(function(){
		/*****Verify back arrow with Read all post button on topic listing page*****/
		casper.echo('Verify back arrow with Read all post button on topic listing page', 'INFO');
		try{
			casper.test.assertExists('a[href="/?action=markread"] span');
			casper.click('a[href="/?action=markread"] span');
		}catch(e){
			casper.test.assertDoesntExist('a[href="/?action=markread"] span');
		}
		wait.waitForTime(2000, casper, function(err){
			if(!err){
				casper.test.assertExists('#back_arrow_topic');
				casper.click('#back_arrow_topic');
				wait.waitForElement('a[href="#forums"]', casper, function(err, isExists) {	
					if(!err){
						if(isExists) {
							casper.echo('Navigate back to category listing page ', 'INFO');
						} else {
							casper.echo('Does not navigate back to category listing page ', 'ERROR');
						}	
					}
				});
			}
		});
		
	});	
};

backArrowTests.postListingPage = function() {
	casper.then(function(){
		/*****Verify back arrow when user login on post listing page directly*****/
		casper.echo('Verify back arrow when user login on post listing page directly', 'INFO');
		casper.test.assertExists('.table-responsive ul li:nth-child(2) a');
		casper.click('.table-responsive ul li:nth-child(2) a');
		wait.waitForElement('.panel-heading', casper, function(err, isExists) {	
			if(!err){
				if(isExists) {
					casper.test.assertExists('#back_arrow_topic');
					casper.click('#back_arrow_topic');
					wait.waitForElement('a[href="#forums"]', casper, function(err, isExists) {	
						if(!err){
							if(isExists) {
								casper.echo('Navigate back to category listing page ', 'INFO');
							} else {
								casper.echo('Does not navigate back to category listing page ', 'ERROR');
							}	
						}
					});
					} else {
						casper.echo('Does not navigate  to topic listing page ', 'ERROR');
				}	
			}
		});
	});	
};

backArrowTests.topicListingPage = function() {
	casper.then(function(){
		/*****Verify with Start new topic on topic listing page*****/
		casper.echo('Verify with Start new topic on topic listing page', 'INFO');
		casper.test.assertExists('.table-responsive ul li:nth-child(2) a');
		casper.click('.table-responsive ul li:nth-child(2) a');
		wait.waitForElement('.panel-heading', casper, function(err, isExists) {	
			if(!err){
				if(isExists) {
					backArrowMethod.startTopic(json['StartTopic'],casper ,function(err){
						if(!err){
							casper.test.assertExists('#backArrowPost');
							casper.click('#backArrowPost');
							wait.waitForElement('.panel-heading li:nth-child(1).active', casper, function(err, isExists) {	
								if(!err){
									if(isExists) {
										casper.echo('Navigate back to  latest topic listing page ', 'INFO');
									} else {
										casper.echo('latest topic is not appeared in 5 seconds ', 'ERROR');
									}	
								}
							});
						}
					});
					} else {
						casper.echo('Does not navigate  to topic listing page ', 'ERROR');
				}	
			}
		});
	});	
};

backArrowTests.forumListingPage = function() {
	casper.then(function(){
		/*****Verify with Start new topic on topic listing page*****/
		casper.echo('Verify with Start new topic on forum listing page', 'INFO');
		casper.click('i.icon.icon-menu');
		casper.test.assertExists('a[href="/categories"]');
		casper.click('a[href="/categories"]');	
		wait.waitForElement('.table-responsive ul li', casper, function(err, isExists) {	
			if(!err){
				if(isExists) {
					casper.reload(function(){
						backArrowMethod.startTopic(json['StartTopic'],casper ,function(err){
							if(!err){
								casper.test.assertExists('#backArrowPost');
								casper.click('#backArrowPost');
							}
						});
					});
				} else {
					casper.echo('Category Doesnot open Sucessfully', 'ERROR');
				}	
			}
		});	
	});	
};

backArrowTests.moveTopicListingPage = function() {
	casper.then(function(){
		/*****Verify back arrow with move topic on topic listing page*****/
		casper.echo('Verify back arrow with move topic on topic listing page', 'INFO');
		backArrowMethod.selectCategory(json['StartTopic'],casper,function(err){
			if(!err){


			}		
		}); 
	});	
};












