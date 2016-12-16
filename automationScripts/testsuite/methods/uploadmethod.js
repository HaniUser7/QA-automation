var uploadMethods= module.exports = {};
var wait=require('../wait.js');
var utils=require('../utils.js');
var inContextLoginMethod = require('../methods/inContextLogin.js');
var json = require('../../testdata/inContextLogin.json');


uploadMethods.uploadMethod=function(data , driver , callback ){
	casper.thenOpen('data', function(){
		casper.echo('ImageUploaded','INFO');
		casper.wait(1000 , function(){
			casper.capture('uploadImage.png');
		});
	});

};

uploadMethods.BackEndSettings=function(driver , callback) {
	

	wait.waitForElement('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', casper , function(err , isExists) {
		if(isExists) {
			driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');	
			driver.evaluate(function() {
				document.querySelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"').click();
 			});
			wait.waitForElement('div.tooltipMenu.text a[title="Assign permissions to user groups"]', casper , function(err , isExists) {
				if( isExists) {
					driver.evaluate(function() {
						document.querySelector('div.tooltipMenu.text a[title="Assign permissions to user groups"]').click();
					});
					driver.wait(1000, function(){
					var grpName = casper.evaluate(function(){
 	       						for(var i=1; i<=7; i++) {
 	        						var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
 								if (x1.innerText == 'Registered Users') {
 									document.querySelector('tr:nth-child('+i+') td:nth-child(3) a').click();
 									var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('href');
 									return x2;
								}
 							}
 						});

 					driver.echo("message : "+grpName, 'INFO');
 					driver.click('div.tooltipMenu a[href="'+grpName+'"]');
					});
					wait.waitForElement('button.button.btn-m.btn-blue' , casper , function(err , isExists) {
						if(isExists) {
							utils.enableorDisableCheckbox('view_calendar',true, casper, function(err) {
								if(!err)
									driver.echo('Successfully checked','INFO');
							});
							casper.click('button.button.btn-m.btn-blue');
							casper.then(function(){
								utils.enableorDisableCheckbox('other_post_replies',true, casper, function(err) {
									if(!err)
										driver.echo('Successfully checked','INFO');
								});
								casper.click('button.button.btn-m.btn-blue');
								utils.enableorDisableCheckbox('upload_attachments',true, casper, function(err) {
									if(!err)
										driver.echo('Successfully checked','INFO');
								});
								casper.click('button.button.btn-m.btn-blue');
							
							});

							}
						});
					}
				});	
			}
		});
		
};	


uploadMethods.fillDataToMessage = function(driver, callback) {
	
	driver.fillSelectors('form#PostPrivateMessage',{	
		'input#tokenfield_typeahead-tokenfield':'hani',
		'input#pm_subject':'Message',
		//'#tinymce':'hello how are you'
	},false);
	
	casper.evaluate(function() {
		document.querySelector('a#send_pmsg_button').click();
	});	
	//driver.click('a[href="/file?id=16747797"]');
	driver.click('a#send_pmsg_button');
	return callback(null)
};



//camera web address method
uploadMethods.Webaddress=function(driver , callback){
	wait.waitForElement('a#insertImage_' , casper , function(err , isExists) {
		if(isExists) {
			casper.evaluate(function() {
																				document.querySelector('a#web').click();
});
	casper.wait(1000,function(){
		casper.capture('imagePopUp.png');
		casper.sendKeys('input[name="fname"]', 'http://s3.amazonaws.com/betafiles.websitetoolbox.com/117/thumb/16748568');	
		casper.click('button#insert_image_btn');				
		casper.wait(2000, function(){
			casper.capture('inboxCameraButton.png');
															
		});
	});
      }
     });
};

//camera web browse

uploadMethods.Webbrowse=function(driver , callback){
	wait.waitForElement('a#insertImage_' , casper , function(err , isExists) {
		if(isExists){
			casper.echo('Method called successfully','INFO');
		}


	});
};

//camera webaddress method till login
uploadMethods.webaddresslogin=function(driver , callback) {
	casper.echo('*************Verify with Edit topic listing page under category camera webaddress**********','INFO');
	wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
		if(isExists) {
			inContextLoginMethod.loginToApp(json['validInfos'].username, json['validInfos'].password, casper, function(err) {
				if (err) {
					casper.echo("Error occurred in callback user not logged-in", "ERROR");	
				}else {
					casper.echo('Processing to Login on forum.....',
			
 'INFO');
					wait.waitForElement('a[href="/categories"]' , casper , function(err , isExists) {
						if(isExists) {
							casper.click('a[href="/categories"]');
							wait.waitForElement('span.forum-title:nth-child(1)' ,casper , function(err , isExists) {
								if(isExists) {
									casper.click('span.forum-title:nth-child(1)');
									wait.waitForElement('a#topics_tab', casper , function(err , isExists) {
										if(isExists) {
											casper.click('a#topics_tab');	
											wait.waitForElement('form[name="posts"] a.topic-title' , casper , function( err , isExists){
												if(isExists) {
													casper.click('span.topic-content a');
													wait.waitForElement('a.pull-right.btn.btn-uppercase.btn-primary' ,casper , function(err , isExists){
														if(isExists) {
																
															casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
														}
													});
												}
											});
										}
									});
								}
							});
						}
					});
				}
			});
		}
	});
};


















													




