'use strict';
var forumRegister = require('./register.js');
var json = require('../testdata/moderator.json');
var config = require('../../config/config.json');
var forumLogin = require('./forum_login.js');
var editProfile = require('./editprofile.js');
var utils = require('./utils.js');
var verifyModeratorPermission = require('./verifyModeratorPermission.js');


var mod_permission = module.exports = {};

mod_permission.mod_permissionfeatureTest=function(casper,test,x){

		casper.on('remote.alert', function(message) {
			this.echo('alert message: ' + message, 'INFO');
		});

		casper.start();

		//Open Forum Backend URL And Remove Short Answer fields. 
		casper.then(function() {
			editProfile.removeShortAnswerFields(casper, test, function(err) {
				if(!err){
					casper.echo('User Field Removed Successfully......','INFO');
				}	
			});
		});

		//Login To Backend URL and disable Approve New Registration,disable Approve new post and disable Email address verification 
		casper.thenOpen(config.backEndUrl,function() {
			this.echo('Login To Backend URL and disable Approve New Registration,Disable Approve new post and disable Email address verification', 'INFO');
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
			this.echo('---------------------------------------------------------------------------');		
			//setting page -> security page
			casper.waitForSelector('a[data-tooltip-elm="ddSettings"]', function success() {
				test.assertExists('a[data-tooltip-elm="ddSettings"]');
				this.click('a[data-tooltip-elm="ddSettings"]');
				casper.waitForSelector('a[href="/tool/members/mb/settings?tab=Security"]', function success() {
					test.assertExists('a[href="/tool/members/mb/settings?tab=Security"]');
					this.click('a[href="/tool/members/mb/settings?tab=Security"]');
					casper.waitForSelector('#post_approval', function success() {
						test.assertExists('#post_approval');
						this.click('#post_approval');
						this.sendKeys('select[name="post_approval"] option[value="0"]', 'Disabled');
						utils.enableorDisableCheckbox('reqregapp',false, casper, function() {
							casper.echo('checkbox is unchecked to diasble approve registration', 'INFO');
							utils.enableorDisableCheckbox('confirm_email',false, casper, function() {
								casper.echo('checkbox is unchecked to disable Email address verification', 'INFO');	
								test.assertExists('button[type="submit"]');
								casper.click('button[type="submit"]');
								casper.then(function(){});
							});
						});
						}, function fail() {
							this.echo('ERROR OCCURRED', 'ERROR');
					});
					}, function fail(err) {
						this.echo('ERROR OCCURRED', 'ERROR');
				});
				}, function fail(err) {
					this.echo('ERROR OCCURRED', 'ERROR');
			});
		});

		//Open Forum Backend URL And Register User.
		casper.thenOpen(config.url, function(){
			this.echo('**************************Registering User***************************', 'INFO');
			this.echo('title of the page : '+this.getTitle());
			casper.waitForSelector('a[href="/register/register"]', function sucess(){
				this.click('a[href="/register/register"]');
				casper.waitForSelector('form[name="PostTopic"]', function sucess(){
					forumRegister.registerToApp(json['user1'], casper, function(err) {
							if(!err){
								casper.waitForSelector('div.panel-body.table-responsive', function sucess(){
									casper.echo('User is Succesfully Registered....................','INFO');
									},function fail(){
										casper.echo('User is Not Succesfully Registered','ERROR');
								});
							}
					});
					},function fail(){
						this.echo('User Registration form Does Not Get Open','ERROR');
				});
				},function fail(){
					this.echo('Frontend Does Not Open Succesfully','ERROR');
			});
		});

		//Open Forum Backend URL And Add Moderator.
		casper.thenOpen(config.backEndUrl, function(){
			this.echo('*******************************Case-1********************************', 'INFO');
			this.echo('Verfiy with Add a moderator for category(General)','INFO');
			this.echo('title of the page : '+this.getTitle());
			casper.waitForSelector('div#my_account_forum_menu', function success() {
				ClickOnCategoryLinks(casper,function(err){
					if(!err){							
						casper.echo('Category Page Found..........................','INFO');					
						AddNewModerator(casper,json['user1'],1,function(err){
							if(!err){
								casper.then(function(){
									casper.echo('Moderator Added Successfully...........', 'INFO');
								});
							}
						});

					}
				});
 				},function fail() {
					this.echo('Backend Does Not Open Succesfully', 'ERROR');
			});
		});	

		//Open forum backend url and delete moderator that we have added in previous test scenario.
		casper.thenOpen(config.backEndUrl, function(){
			this.echo('*******************************Case-2********************************', 'INFO');
			this.echo('Verfiy with delete a moderator for category(GENERAL)','INFO');
			this.echo('title of the page : '+this.getTitle());
			casper.waitForSelector('div#my_account_forum_menu', function success() {
				RemoveModerator(casper,function(err){
					if(!err){
						casper.then(function(){
							casper.echo('Moderator Removed Successfully...........', 'INFO'); 
						});
					}
				});
				},function fail(){
					this.echo('Backend Does Not Open Succesfully', 'ERROR');
			});		
		});
		
		//Open forum backend url and add same moderator in two category.
		casper.thenOpen(config.backEndUrl, function(){
			this.echo('*******************************Case-3********************************', 'INFO');
			this.echo('verify with add same moderator in two different category(General and next to General CATEGORY)', 'INFO');
			this.echo('title of the page : '+this.getTitle());
			casper.waitForSelector('div#my_account_forum_menu', function success() {
				ClickOnCategoryLinks(casper,function(err){
					if(!err){							
						casper.echo('Category Page Found..........................','INFO');					
						AddNewModerator(casper,json['user1'],1,function(err){
							if(!err){
								casper.then(function(){
									casper.echo('Moderator Added Successfully in category 1...........', 'INFO');
									AddNewModerator(casper,json['user1'],2,function(err){
										if(!err){
											casper.then(function(){
												casper.echo('Moderator Added Successfully in category 2...........', 'INFO');
											});
										}
									});
								});
							}
						});
					}
				});
 				},function fail() {
					this.echo('Backend Does Not Open Succesfully', 'ERROR');
			});
					
				
		});
		
		//Open forum backend url and delete moderator that is in two different category.
		casper.thenOpen(config.backEndUrl, function(){
			this.echo('*******************************Case-4********************************', 'INFO');
			this.echo('verify with delete moderator"when same moderator added in two different category ', 'INFO');
			this.echo('title of the page : '+this.getTitle());
			casper.waitForSelector('div#my_account_forum_menu', function success() {
				RemoveModerator(casper,function(err){
					if(!err){
						casper.then(function(){
							casper.echo('Moderator Removed from All Category in which user is a Moderator Successfully...........', 'INFO'); 
						});
					}
				});
				},function fail(){
					this.echo('Backend Does Not Open Succesfully', 'ERROR');
			});		
		});
	
		//Open forum backend url and add moderator in category general.
		casper.thenOpen(config.backEndUrl, function(){
			this.echo('Add a moderator for category(General)','INFO');
			this.echo('title of the page : '+this.getTitle());
			casper.waitForSelector('div#my_account_forum_menu', function success() {
				ClickOnCategoryLinks(casper,function(err){
					if(!err){							
						casper.echo('Category Page Found..........................','INFO');					
						AddNewModerator(casper,json['user1'],1,function(err){
							if(!err){
								casper.then(function(){
									casper.echo('Moderator Added Successfully...........', 'INFO');
								});
							}
						});
					}
				});
 				},function fail() {
					this.echo('Backend Does Not Open Succesfully', 'ERROR');
			});
			
		});
		
		//Open forum backend url and add member title of the moderator that we have added in last test scenario..
		casper.thenOpen(config.backEndUrl, function(){
			this.echo('*******************************Case-5********************************', 'INFO');
			this.echo('verify with member title (add html tags)', 'INFO');
			this.echo('title of the page : '+this.getTitle());
			casper.waitForSelector('div#my_account_forum_menu', function success() {
				ClickOnCategoryLinks(casper,function(err){
					if(!err){							
						casper.echo('Category Page Found..........................','INFO');					
						casper.waitForSelector('div#tab_wrapper',function sucess(){
							test.assertExists('div#sortable ul.ui-sortable li:nth-child(1) div.select');
							casper.mouse.move('div#sortable ul.ui-sortable li:nth-child(1) div.select');
							var firstLiId = casper.evaluate(function() {
										document.querySelector("a.moderateAction").style.display = 'block';
										var id = document.querySelector('div#sortable ul.ui-sortable li:nth-child(1)').getAttribute('id');
										return id;
									});
							test.assertExists('a.moderateAction[data-forumid="'+firstLiId+'"]');
							casper.click('a.moderateAction[data-forumid="'+firstLiId+'"]');
							test.assertExists('div#forumModerator'+firstLiId + ' a:last-child');
							var user_id = casper.evaluate(function() {				  
			 							var str= document.querySelector('div.tooltipMenu.forumModeratorbutton a:last-child').getAttribute('href');
										var n = str.indexOf('userid=');
										var href=str.substring(n+('userid=').length);
										n =href.indexOf('&');
										var user_id=href.substring(0,n);
						 				return user_id;
							});
							casper.click('div#forumModerator'+firstLiId + ' a:last-child');
							casper.waitForSelector('form#add_mod_form',function success(){
								casper.sendKeys('input[name="usertitle"]','',{reset:true});
				                                casper.sendKeys('input[name="usertitle"]','<i>xyzabc</i>', {keepFocus: true});
								casper.page.sendEvent("keypress", this.page.event.key.Enter);
								casper.then(function(){});
								casper.thenOpen(config.url+'profile/'+user_id,function(){ 
									casper.waitForSelector('div#fb-root',function success(){
										var title = casper.evaluate(function() {
												   var moderator = document.querySelector('div#uploadAvatar ul li:nth-child(2) span.profile-title');					   var str=moderator.innerHTML.trim();
												   var n = str.indexOf('>');
												   var front_endtitle=str.substring(n+1);
					 							   return front_endtitle;
											    });
										test.assertEquals(title,'xyzabc</i>','Verified Member Tittle With HTML tags');										
										},function fail(){
											casper.echo('frontend Does Not Open Succesfully','ERROR');
									});
								});
								},function fail(){
									casper.echo('moderator permission edit Form does not appears','ERROR');
							});
							},function fail(){
								casper.echo('div#tab_wrapper selector does not appear','ERROR');
						});
					}
				});
 				},function fail() {
					this.echo('Backend Does Not Open Succesfully', 'ERROR');
			});
					
				
		});

		//Open forum backend url and remove moderator title that we have added in last scenario.
		casper.thenOpen(config.backEndUrl, function(){
			this.echo('*******************************Case-6********************************', 'INFO');
			this.echo('verify with remove moderator title', 'INFO');
			this.echo('title of the page : '+this.getTitle());
			casper.waitForSelector('div#my_account_forum_menu', function success() {
				ClickOnCategoryLinks(casper,function(err){
					if(!err){							
						casper.echo('Category Page Found..........................','INFO');					
						casper.waitForSelector('div#tab_wrapper',function sucess(){
							test.assertExists('div#sortable ul.ui-sortable li:nth-child(1) div.select');
							casper.mouse.move('div#sortable ul.ui-sortable li:nth-child(1) div.select');
							var firstLiId = casper.evaluate(function() {
										document.querySelector("a.moderateAction").style.display = 'block';
										var id = document.querySelector('div#sortable ul.ui-sortable li:nth-child(1)').getAttribute('id');
										return id;
									});
							test.assertExists('a.moderateAction[data-forumid="'+firstLiId+'"]');
							casper.click('a.moderateAction[data-forumid="'+firstLiId+'"]');
							test.assertExists('div#forumModerator'+firstLiId + ' a:last-child');
							var user_id = casper.evaluate(function() {				  
			 							var str= document.querySelector('div.tooltipMenu.forumModeratorbutton a:last-child').getAttribute('href');
										var n = str.indexOf('userid=');
										var href=str.substring(n+('userid=').length);
										n =href.indexOf('&');
										var user_id=href.substring(0,n);
						 				return user_id;
							});
							casper.click('div#forumModerator'+firstLiId + ' a:last-child');
							casper.waitForSelector('form#add_mod_form',function success(){
								casper.sendKeys('input[name="usertitle"]','',{reset:true});
								casper.sendKeys('input[name="usertitle"]','', {keepFocus: true});
								casper.page.sendEvent("keypress", this.page.event.key.Enter);
								casper.then(function(){});
								casper.thenOpen(config.url+'profile/'+user_id,function(){  
									casper.waitForSelector('div#fb-root',function success(){
										var title = casper.evaluate(function() {
												   var moderator = document.querySelector('div#uploadAvatar ul li:nth-child(2) span.profile-title');					     
												   var front_endtitle=moderator.innerText.trim();
					 							   return front_endtitle;
										});
										casper.echo('Title->'+title);						
										},function fail(){
											this.echo('Front end Does Not Open Succesfully', 'ERROR');
									});
								});
								},function fail(){
									casper.echo('moderator permission edit Form does not appears','ERROR');
							});
							},function fail(){
								casper.echo('div#tab_wrapper selector does not appear','ERROR');
						});
					}
				});
 				},function fail() {
					this.echo('Backend Does Not Open Succesfully', 'ERROR');
			});
					
		});	

		//Logout from front end
		casper.thenOpen(config.url,function() {
			forumRegister.redirectToLogout(casper, test, function() {});
		});
	
		//Verify Moderator Permission module call.
		casper.then(function() {
			this.echo('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
			this.echo('Verifying Moderator Permission', 'INFO');
			verifyModeratorPermission.verifyModeratorPermissionfeatureTest(casper, x, function(){
				casper.echo('Verifying Moderator Permission Feature', 'INFO');
			});
		});		

};

//********************************Method BackEndLogout***********************
 var LogoutbackEnd = function(driver,callback) {
	driver.test.assertExists('div#account_sub_menu a[data-tooltip-elm="ddAccount"]');
	driver.click('div#account_sub_menu a[data-tooltip-elm="ddAccount"]');
	driver.test.assertExists('a[href="/tool/members/login?action=logout"]');
	driver.click('a[href="/tool/members/login?action=logout"]');										
   	driver.echo('---------------------------------------------------------------------------','INFO');
	return callback(null);
}; 
//Method  to Open Category Page.
var ClickOnCategoryLinks=function(driver, callback){
	driver.then(function(){
		driver.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
		driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
		driver.test.assertExists('div#ddContent a[href="/tool/members/mb/forums"]');
		driver.click('div#ddContent a[href="/tool/members/mb/forums"]');
		driver.echo('---------------------------------------------------------------------------','INFO');
	});
	driver.then(function() {
		return callback(null);
	});
};

//Method  to Retrieve First Category ID.
var find_category_id= function(driver,cat_no,callback){
	var category_id= driver.evaluate(function(a) {
			var categories = document.querySelector('select[name="forum_id"]');					
			return categories[a].value;
	},cat_no);
	return callback(null,category_id);
};

//Method to Add new moderarator
var AddNewModerator=function(driver,data,category_no,callback){			
	driver.waitForSelector('a[href^="/tool/members/mb/moderators?action=new"]', function success() {
		driver.click('a[href^="/tool/members/mb/moderators?action=new"]');
		driver.waitForSelector('form#add_mod_form',function sucess(){   
			find_category_id(casper,category_no,function(err,category_id){
				if(!err){
					driver.fill('form#add_mod_form',{
						'user': data.uname,
						'forum_id': category_id
					}, false);
					driver.test.assertExists('form#add_mod_form button','Add New Moderator Form Found');
					driver.click('form#add_mod_form button');
					
				}
			});
			}, function fail(){	
				driver.echo('Moderator Doesnot Added Sucessfully', 'ERROR');			
		});
		},function fail() {
			driver.echo('Form Does Not found to Add Moderator','ERROR');
	});			
	return callback(null);
}
//Method to Remove last Moderator from first category  .
var RemoveModerator=function(driver,callback){
	ClickOnCategoryLinks(driver,function(err){
		if(!err){
			driver.echo('Category Page Found..........................','INFO');						
			driver.waitForSelector('div#tab_wrapper',function sucess(){
				driver.test.assertExists('div#sortable ul.ui-sortable li:nth-child(1) div.select');
				driver.mouse.move('div#sortable ul.ui-sortable li:nth-child(1) div.select');
				var firstLiId = driver.evaluate(function() {
							document.querySelector("a.moderateAction").style.display = 'block';
							var id = document.querySelector('div#sortable ul.ui-sortable li:nth-child(1)').getAttribute('id');
							return id;
				});
				driver.test.assertExists('a.moderateAction[data-forumid="'+firstLiId+'"]');
				driver.click('a.moderateAction[data-forumid="'+firstLiId+'"]');
				driver.test.assertExists('div#forumModerator'+firstLiId + ' a:last-child');
				driver.click('div#forumModerator'+firstLiId + ' a:last-child');
				driver.waitForSelector('a#remove_moderator',function success(){
					driver.test.assertExists('a#remove_moderator');
					driver.click('a#remove_moderator');
					driver.then(function(){
						 if(this.exists('a#remove_mod_all')){
						 	driver.click('a#remove_mod_all');
						 }														
					});
					},function fail(){
						driver.echo('div#tab_wrapper selector does not appear','ERROR');
				});
				},function fail(){
					driver.echo('Categories page doesnot loaded','ERROR');
			});
		}
	});
	driver.then(function() {
		return callback(null);
	});
}
//Method to return tittle of user ac to user id passed to it. 
var user_title= function(driver,user_id,callback){
	var title;
	driver.thenOpen(config.url+ 'profile/' +user_id,function(){ 
		driver.waitForSelector('div#fb-root',function success(){
			title = driver.evaluate(function() {
					   var moderator = document.querySelector('div#uploadAvatar ul li:nth-child(2) span.profile-title');					           
					   var str=moderator.innerHTML.trim();
					   var n = str.indexOf('>');
					   var front_endtitle=str.substring(n+1);
					   return front_endtitle;
			 });	casper.echo('title='+title);						
			},function fail(){
				driver.echo('Problem in opening frontend ','ERROR');
		});
	});
	driver.then(function() {
		return callback(null,title);
	});
}
		
