/***These are the function which has been called in above test cases and also will be used in other js file as per requirement**********/
'use strict';

var memberTitleMethods = module.exports = {};
var wait = require('../wait.js');
var json  = require('../../testdata/memberTitle.json');
var backArrowMethod = require('./backArrow.js');

memberTitleMethods.postTopic = function(num,driver,callback){
	driver.repeat(num, function() {
		driver.test.assertExists('i.icon.icon-menu');
		driver.click('i.icon.icon-menu');
		driver.test.assertExists('a[href="/categories"]');
		driver.click('a[href="/categories"]');
		wait.waitForElement('.table-responsive ul li', driver, function(err, isExists) {	
			if(!err){
				if(isExists) {
					driver.test.assertExists('.table-responsive ul li:nth-child(1) a');
					driver.click('.table-responsive ul li:nth-child(1) a');
					wait.waitForElement('#back_arrow_topic', driver, function(err, isExists) {	
						if(!err){
							if(isExists) {
								backArrowMethod.startTopic(json['StartTopic'],driver,function(err){
									if(!err){
										return callback(null);
									}
								});
							} else {
								driver.echo('Category Doesnot open Sucessfully', 'ERROR');
							}	
						}
					});
				} else {
					driver.echo('Category Doesnot open Sucessfully', 'ERROR');
				}	
			}
		});
	});
};





