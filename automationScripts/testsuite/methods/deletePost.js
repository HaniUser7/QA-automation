var deletePostMethod= module.exports = {};
var wait=require('../wait.js');
var utils=require('../utils.js');
var uploadMethods=require('../methods/uploadmethod.js');
var inContextLoginMethod = require('../methods/inContextLogin.js');
var loginPrivacyOptionMethod = require('../methods/loginByPrivacyOption.js');
var json = require('../../testdata/inContextLogin.json');


//Create a post method  admin--------------------------------------------------------------------------
deletePostMethod.profilePost=function(driver , callback) {
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('***********Method to create post************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				inContextLoginMethod.loginToApp(json['validInfose'].username, json['validInfose'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists){
							if(isExists){
								//casper.test.assertExists('form[name="posts"] a.topic-title','Topic found');
								//casper.click('ul li:nth-child(2) span:nth-child(1) span:nth-child(2) h4 a');
								casper.click('form[name="posts"] a.topic-title');
								wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' , casper , function(err , isExists){
									if(isExists) {
										casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
										wait.waitForTime(5000 , casper , function(err) {
											casper.capture('1.png');
											casper.withFrame('message_ifr', function() {
												casper.sendKeys('#tinymce', driver.page.event.key.Ctrl,driver.page.event.key.A, {keepFocus: true});			
												casper.sendKeys('#tinymce', driver.page.event.key.Backspace, {keepFocus: true});
												casper.sendKeys('#tinymce', 'dragme');
											});
											casper.wait(5000 , function(){
												casper.test.assertExists('input[name="submitbutton"]','button found');
                                                                                                casper.click('input[name="submitbutton"]');
												casper.wait(5000 , function(){
													casper.capture('34.png');
													casper.then(function() {
															inContextLoginMethod.logoutFromApp(casper, function(err){
														if (!err)
															casper.echo('Successfully logout from application', 'INFO');
														});
													});	
												});
											});
										});
									}
									
								});
							}
						});
					}
				});
			}
		});
	});
};

 //select multiple post id from checkbox
deletePostMethod.PostListing=function(driver , callback) {
	casper.echo('-------------Post listing method called----------------------------' ,'INFO');
	var post= casper.evaluate(function(){
		var aa=document.querySelectorAll('input[name="pid"]');
			var a= aa.length;
			var hh=aa[2].getAttribute('id');
			return hh;
	});
	casper.echo("message :" +post,'INFO');
	casper.click('input[value="'+post+'"]');
	casper.click('input#deleteposts');
				

};
				

//**************************Method to Disable Approve new Posts******************************

deletePostMethod.disableApproveAllPost=function(driver , callback) {
	casper.thenOpen(config.backEndUrl , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('------------------Method to Disable Approve new Posts*-----------------------' ,'INFO');
		loginPrivacyOptionMethod.loginToForumBackEnd(casper , function(err) {	
			if (!err)
				casper.echo('LoggedIn to forum backend....', 'INFO');
		});
		wait.waitForElement('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]' , casper , function(err , isExists){
			if(isExists) {
				casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
				/*casper.evaluate(function() {
																														document.querySelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings').click();
});*/
				casper.capture('88.png');
				casper.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
				wait.waitForElement('button.button.btn-m.btn-blue' , casper , function(err , isExists) {
					if(isExists) {
						casper.click('select#post_approval');
						casper.sendKeys('select[name="post_approval"] option[value="0"]', 'Disabled');
						casper.click('button.button.btn-m.btn-blue');
						casper.wait(30000 , function(){
							casper.capture('67.png');

						});		
					}					
				});	
			}
		}); 
	});
};

//******************************Topic created method called**************************	
deletePostMethod.createTopic=function(driver , callback) {
	casper.thenOpen(config.url , function(){
		casper.echo('-----------New topic created Method called-------------' , 'INFO');
			
		inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
			if (err) {
				casper.echo("Error occurred in callback user not logged-in", "ERROR");	
			}else {
				casper.echo('Processing to Login on forum.....','INFO');
				casper.waitForSelector('form[name="posts"] a.topic-title' , function success(){
					casper.test.assertExists('form[name="posts"] a.topic-title','Topic found');
					casper.click('span.topic-content a');
					wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' , casper , function(err , isExists){
						if(isExists) {
							casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
						}
					});						
				},function fail() {
					casper.echo('Failed block called','INFO');
					wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
						if(isExists) {
							//method to create a new topic
							uploadMethods.startTopic(json['newTopic'], casper, function(err) {
								if(!err) {
									casper.echo('new topic created', 'INFO');
								}else {
									casper.echo('Topic not created', 'INFO');
								}
							});
						} else {
							casper.echo('User icon not found','ERROR');	
						}
					});
				});
				casper.then(function() {
					inContextLoginMethod.logoutFromApp(casper, function(err){
						if (!err)
							casper.echo('Successfully logout from application', 'INFO');
					});
				});	
			}
		});
     	});
};							

//search topic for register user
deletePostMethod.searchlogin=function(driver , callback) {
	//casper.echo('***********Verify with Edit the Post from Search result page camera webaddress************','INFO');
	wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
		if(isExists) {
			inContextLoginMethod.loginToApp(json['validInfose'].username, json['validInfose'].password, casper, function(err) {
				if (err) {
					casper.echo("Error occurred in callback user not logged-in", "ERROR");	
				}else {
					casper.echo('Processing to Login on forum.....','INFO');
					wait.waitForElement('input#inline_search_box' , casper , function(err , isExists) {
						if(isExists) {
							casper.click('input#inline_search_box');
							casper.fill('form#inlineSearchForm', {
								'keywords' :'NewTopic'
							},true);
							
						}
					});
				}
			});
		}
	});
};


////Create a post method from register user 
deletePostMethod.profilePostRegister=function(driver , callback) {
	casper.thenOpen(config.url , function(){
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('***********Method to create post************','INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....','INFO');
						wait.waitForElement('form[name="posts"] a.topic-title' , casper , function(err , isExists){
							if(isExists){
								//casper.test.assertExists('form[name="posts"] a.topic-title','Topic found');
								//casper.click('ul li:nth-child(2) span:nth-child(1) span:nth-child(2) h4 a');
								casper.click('form[name="posts"] a.topic-title');
								wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' , casper , function(err , isExists){
									if(isExists) {
										casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
										wait.waitForTime(5000 , casper , function(err) {
											casper.capture('1.png');
											casper.withFrame('message_ifr', function() {
												casper.sendKeys('#tinymce', driver.page.event.key.Ctrl,driver.page.event.key.A, {keepFocus: true});			
												casper.sendKeys('#tinymce', driver.page.event.key.Backspace, {keepFocus: true});
												casper.sendKeys('#tinymce', 'dragme');
											});
											casper.wait(5000 , function(){
												casper.test.assertExists('input[name="submitbutton"]','button found');
                                                                                                casper.click('input[name="submitbutton"]');
												casper.wait(5000 , function(){
													casper.capture('34.png');
													casper.then(function() {
															inContextLoginMethod.logoutFromApp(casper, function(err){
														if (!err)
															casper.echo('Successfully logout from application', 'INFO');
														});
													});	
												});
											});
										});
									}
									
								});
							}
						});
					}
				});
			}
		});
	});
};






