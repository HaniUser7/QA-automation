var forumRegister = require('./register.js');
var json = require('../testdata/moderator.json');
var config = require('../../config/config.json');
var forumLogin = require('./forum_login.js');
var editProfile = require('./editprofile.js');
var utils = require('./utils.js');
var verifyModeratorPermission = require('./verifyModeratorPermission.js');


var mod_permission = module.exports = {};

mod_permission.mod_permissionfeatureTest=function(casper,x){

		casper.on('remote.alert', function(message) {
		casper.echo('alert message: ' + message, 'INFO');
		});

		casper.start();


		casper.then(function() {
			editProfile.removeShortAnswerFields(casper, casper.test, function(err) {
			if(!err)
				casper.echo('User Field Removed Successfully......','INFO');
			});
		});

		//Login To Backend URL and disable Approve New Posts
		casper.thenOpen(config.backEndUrl,function() {
			casper.echo('Login To Backend URL and disable Approve New Posts and Disable Approve new post', 'INFO');
			casper.echo('Title of the page :' +this.getTitle(), 'INFO');
			casper.echo('---------------------------------------------------------------------------');		
			//setting page -> security page
			casper.waitForSelector('a[data-tooltip-elm="ddSettings"]', function success() {
				casper.test.assertExists('a[data-tooltip-elm="ddSettings"]');
				casper.click('a[data-tooltip-elm="ddSettings"]');
				casper.waitForSelector('a[href="/tool/members/mb/settings?tab=Security"]', function success() {
					casper.test.assertExists('a[href="/tool/members/mb/settings?tab=Security"]');
					casper.click('a[href="/tool/members/mb/settings?tab=Security"]');
				}, function fail(err) {
					casper.echo(err);
				});
				casper.waitForSelector('#post_approval', function success() {
					casper.test.assertExists('#post_approval');
					casper.click('#post_approval');
					casper.sendKeys('select[name="post_approval"] option[value="0"]', 'Disabled');
					utils.enableorDisableCheckbox('reqregapp',false, casper, function() {
						casper.echo('checkbox is checked for view category for general category', 'INFO');
						casper.capture('1223.png');	
							casper.test.assertExists('button[type="submit"]');
							casper.click('button[type="submit"]');
							casper.then(function(){});
					});
				}, function fail() {
					casper.echo(err);
				});
			}, function fail(err) {
				casper.echo(err);
			});
		});

		casper.thenOpen(config.url, function(){
			this.echo('**************************Registering User***************************', 'INFO');
			this.echo('title of the page : '+this.getTitle());
			casper.waitForSelector('a[href="/register/register"]', function sucess(){
				casper.test.assertExists('a[href="/register/register"]');
				this.click('a[href="/register/register"]');
				casper.waitForSelector('form[name="PostTopic"]', function sucess(){
					forumRegister.registerToApp(json['user1'], casper, function(err) {
							if(!err){
								casper.waitForSelector('div.panel-body.table-responsive', function sucess(){
									casper.echo('User is Succesfully Registered....................','INFO');
									},function fail(){
										this.echo('User is Not Succesfully Registered','ERROR');
								});
							}
					});
					},function fail(){
						this.echo('User Registeration Form Does Not Found','ERROR');
				});
				},function fail(){
					this.echo('Problem in opening Url','ERROR');
			});
		});


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
					casper.echo('Problem in opening Dashboard as we have previosly login', 'ERROR');
			});
		});	


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
					casper.echo('Problem in opening Dashboard as we have previosly login', 'ERROR');
			});		
		});
		
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
					casper.echo('Problem in opening Dashboard as we have previosly login', 'ERROR');
			});
					
				
		});

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
					casper.echo('Problem in opening Dashboard as we have previosly login', 'ERROR');
			});		
		});
	
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
					casper.echo('Problem in opening Dashboard as we have previosly login', 'ERROR');
			});
			
		});
		
		
		casper.thenOpen(config.backEndUrl, function(){
			this.echo('*******************************Case-5********************************', 'INFO');
			this.echo('verify with member title (add html tags)', 'INFO');
			this.echo('title of the page : '+this.getTitle());
			casper.waitForSelector(
'div#my_account_forum_menu', function success() {
				ClickOnCategoryLinks(casper,function(err){
					if(!err){							
						casper.echo('Category Page Found..........................','INFO');					
						casper.waitForSelector('div#tab_wrapper',function sucess(){
							casper.test.assertExists('div#sortable ul.ui-sortable li:nth-child(1) div.select');
							casper.mouse.move('div#sortable ul.ui-sortable li:nth-child(1) div.select');
							var firstLiId = casper.evaluate(function() {
										document.querySelector("a.moderateAction").style.display = 'block';
										var id = document.querySelector('div#sortable ul.ui-sortable li:nth-child(1)').getAttribute('id');
										return id;
									});
							test.assertExists('a.moderateAction[data-forumid="'+firstLiId+'"]');
							casper.click('a.moderateAction[data-forumid="'+firstLiId+'"]');
							test.assertExists('div#forumModerator'+firstLiId + ' a:last-child');
							var user_id = this.evaluate(function() {				  
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
										casper.test.assertEquals(title,'xyzabc</i>','Verified Member Tittle With HTML tags');										
										},function fail(){
											casper.echo('Unable to open Frontend','ERROR');
									});
								});
								},function fail(){
									casper.echo('Unable to open Form','ERROR');
							});
							},function fail(){
								casper.echo('Unable to open Categories','ERROR');
						});
					}
				});
 				},function fail() {
					casper.echo('Problem in opening Dashboard as we have previosly login', 'ERROR');
			});
					
				
		});

		casper.thenOpen(config.backEndUrl, function(){
			this.echo('*******************************Case-6********************************', 'INFO');
			this.echo('verify with remove moderator title', 'INFO');
			this.echo('title of the page : '+this.getTitle());
			casper.waitForSelector('div#my_account_forum_menu', function success() {
				ClickOnCategoryLinks(casper,function(err){
					if(!err){							
						casper.echo('Category Page Found..........................','INFO');					
						casper.waitForSelector('div#tab_wrapper',function sucess(){
							casper.test.assertExists('div#sortable ul.ui-sortable li:nth-child(1) div.select');
							casper.mouse.move('div#sortable ul.ui-sortable li:nth-child(1) div.select');
							var firstLiId = casper.evaluate(function() {
										document.querySelector("a.moderateAction").style.display = 'block';
										var id = document.querySelector('div#sortable ul.ui-sortable li:nth-child(1)').getAttribute('id');
										return id;
									});
							casper.test.assertExists('a.moderateAction[data-forumid="'+firstLiId+'"]');
							casper.click('a.moderateAction[data-forumid="'+firstLiId+'"]');
							casper.test.assertExists('div#forumModerator'+firstLiId + ' a:last-child');
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
											casper.echo('Unable to open Frontend','ERROR');
									});
								});
								},function fail(){
									casper.echo('Unable to open Form','ERROR');
							});
							},function fail(){
								casper.echo('Unable to open Categories','ERROR');
						});
					}
				});
 				},function fail() {
					casper.echo('Problem in opening Dashboard as we have previosly login', 'ERROR');
			});
					
		});	

		
		
		//Logout from front end
		casper.thenOpen(config.url,function() {
			forumRegister.redirectToLogout(casper, test, function() {});
		});
	
		//Verify Moderator Permission
		casper.then(function() {
			casper.echo('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
			casper.echo('Verifying Moderator Permission', 'INFO');
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
	driver.then(function(){
		ClickOnCategoryLinks(driver,function(err){
			if(!err){
				driver.echo('Category Page Found..........................','INFO');						
				driver.waitForSelector('div#tab_wrapper',function sucess(){
					driver.test.assertExists('div#sortable ul.ui-sortable li:nth-child(1) div.select');
					driver.mouse.move('div#sortable ul.ui-sortable li:nth-child(1) div.select');
					var firstLiId = casper.evaluate(function() {
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
							driver.echo('Form Doesnt open to Remove moderator from this Category','ERROR');
					});
					},function fail(){
						driver.echo('Problem in Opening Categories','ERROR');
				});
			}
		});
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

		
