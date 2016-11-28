/****This script is dedicated for Admin to move topic/post on the forum. It covers testing of move topic/post with all defined validations****/

"use strict";

var backArrowTests= module.exports = {};

var wait = require('../wait.js');

//Test Case for Register With Valid Information.

backArrowTests.verifyBackArrow= function() {

	/*****Verify back arrow on topic listing page*****/
	casper.echo('*****************************Case1**********************************','INFO');
	casper.echo('Verify back arrow on topic listing page', 'INFO');
	wait.waitForElement('a[href="/categories"]', casper, function(err, isExists) {	
		if(!err){
			if(isExists) {
				casper.click('a[href="/categories"]');
				wait.waitForElement('a[href="#forums"]', casper, function(err, isExists) {	
					if(!err){
						if(isExists) {
							//Click on first category
							casper.test.assertExists('.table-responsive ul li a');
							casper.click('.table-responsive ul li a');
							wait.waitForElement('#back_arrow_topic', casper, function(err, isExists) {	
								if(!err){
									if(isExists) {
										//click on back arrow
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
						} else {
							casper.echo('Category listing page not found ', 'ERROR');
						}	
					}
				});
			} else {
				casper.echo('Category Tab does not found', 'ERROR');
			}	
		}
	});
		
}; 



backArrowTests.sortOption= function() {
	casper.then(function(){

		/*****Verify with sorting options like latest/new/top*****/
		casper.echo('*****************************Case2**********************************','INFO');
		casper.echo('Verify with sorting options like latest/new/top', 'INFO');
		casper.test.assertExists('.table-responsive ul li a');
		casper.click('.table-responsive ul li a');
	});	
	casper.then(function(){
		try{
			casper.test.assertExists('a#topics_tab');
			casper.click('a#topics_tab');
		}catch(e){
			casper.test.assertDoesntExist('a#topics_tab');
		}
		wait.waitForElement('span.topic-content a', casper, function(err, isExists) {	
			if(!err){
				if(isExists) {
					casper.test.assertExists('.panel-heading li:nth-child(2) a');
					casper.click('.panel-heading li:nth-child(2) a');
					wait.waitForTime(3000, casper, function(err){
						if(!err){

							casper.click('#back_arrow_topic');
						}
					});
					} else {
						casper.echo('Does not navigate back to category listing page ', 'ERROR');
				}	
			}
		});
	});
};


backArrowTests.readAllPost= function() {
	casper.then(function(){
		//casper.capture('130.png');
		/*****Verify back arrow with Read all post button on topic listing page*****/
		casper.echo('*****************************Case3**********************************','INFO');
		casper.echo('Verify back arrow with Read all post button on topic listing page', 'INFO');
		casper.test.assertExists('span.icon.icon-sweep');
		casper.click('span.icon.icon-sweep');
		wait.waitForTime(3000, casper, function(err){
			if(!err){
				casper.capture('131.png');
				casper.click('#back_arrow_topic');
			}
		});
	});	
};


