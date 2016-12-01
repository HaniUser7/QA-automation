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

backArrowTests.lockTopicListingPage = function() {
	casper.then(function(){
		/*****Verify back arrow with move topic on topic listing page*****/
		casper.echo('Verify back arrow with move topic on topic listing page', 'INFO');
		backArrowMethod.selectCategory(json['StartTopic'],casper,function(err){
			if(!err){
				casper.click('input[name="id"]');
				wait.waitForElement('div.hover-menu.open', casper, function(err, isExists) {	
					if(!err){
						if(isExists) {
							casper.echo('floating menu appears', 'INFO');
							casper.test.assertExists('i.glyphicon.glyphicon-lock');
							casper.click('i.glyphicon.glyphicon-lock');
							wait.waitForTime(3000,casper,function(err){
								if(!err){
									try{
										casper.test.assertExists('a#lock');
										casper.click('a#lock');
									}catch(e){
										casper.test.assertDoesntExist('a#lock');
									}
									wait.waitForTime(5000,casper,function(err){
										if(!err){
											casper.capture('12345678.png');
											casper.test.assertExists('#back_arrow_topic');
											casper.click('#back_arrow_topic');
										}
									});
								}
							});
						} else {
							casper.echo('floating menu appears is not visible ', 'ERROR');
						}	
					}
				});
			}		
		}); 
	});	
};

backArrowTests.lockPostListingPage = function() {
	casper.then(function(){
		/*****Verify back arrow with lock option on post listing page*****/
		casper.echo('Verify back arrow with lock option on post listing page', 'INFO');
		backArrowMethod.selectCategory(json['StartTopic'],casper,function(err){
			if(!err){
				casper.test.assertExists('span.topic-content a');
				casper.click('span.topic-content a');
				wait.waitForElement('a span.caret', casper, function(err, isExists) {	
					if(!err){
						if(isExists) {
							casper.click('a span.caret');
							casper.test.assertExists('a[href^="/mbactions/lock?id="]');
							casper.click('a[href^="/mbactions/lock?id="]');
							wait.waitForElement('div.alert.alert-warning.text-center', casper, function(err, isExists) {	
								if(!err){
									if(isExists) {
										casper.echo('Message:'+ casper.fetchText('div.alert.alert-warning.text-center').trim(),'INFO');
										casper.capture('123.png');
										casper.test.assertExists('#backArrowPost');
										casper.click('#backArrowPost');
									} else {
										casper.echo('Topic is not Locked','ERROR');
									}	
								}
							});
						} else {
							casper.echo('Shield Icon Doesnt Exists','ERROR');
						}	
					}
				});
			}		
		}); 
	});	
};

backArrowTests.unLockTopicListingPage = function() {
	casper.then(function(){
		/*****Verify back arrow with unlock option on topic listing page*****/
		casper.echo('Verify back arrow with unlock option on topic listing page', 'INFO');
		backArrowMethod.selectCategory(json['StartTopic'],casper,function(err){
			if(!err){
				casper.click('input[name="id"]');
				wait.waitForElement('div.hover-menu.open', casper, function(err, isExists) {	
					if(!err){
						if(isExists) {
							casper.echo('floating menu appears', 'INFO');
							casper.test.assertExists('i.glyphicon.glyphicon-lock');
							casper.click('i.glyphicon.glyphicon-lock');
							wait.waitForTime(3000,casper,function(err){
								if(!err){
									try{
										casper.test.assertExists('#unlock');
										casper.click('#unlock');
									}catch(e){
										casper.test.assertDoesntExist('#unlock');
									}
									wait.waitForTime(5000,casper,function(err){
										if(!err){
											casper.capture('12345678.png');
											casper.test.assertExists('#back_arrow_topic');
											casper.click('#back_arrow_topic');
										}
									});
								}
							});
						} else {
							casper.echo('floating menu appears is not visible ', 'ERROR');
						}	
					}
				});
			}		
		}); 
	});	
};

backArrowTests.unLockPostListingPage = function() {
	casper.then(function(){
		/*****Verify back arrow with unlock option on post listing page*****/
		casper.echo('Verify back arrow with unlock option on post listing page', 'INFO');
		backArrowMethod.selectCategory(json['StartTopic'],casper,function(err){
			if(!err){
				casper.test.assertExists('span.topic-content a');
				casper.click('span.topic-content a');
				wait.waitForElement('a span.caret', casper, function(err, isExists) {	
					if(!err){
						if(isExists) {
							casper.click('a span.caret');
							try{
								casper.test.assertExists('a[href^="/mbactions/unlock?id="]');
								casper.click('a[href^="/mbactions/unlock?id="]');
								wait.waitForTime(5000,function(err){
									if(!err){
										casper.test.assertExists('#backArrowPost');
										casper.click('#backArrowPost');
									}
								});
							}catch(e){
								casper.test.assertDoesntExist('a[href^="/mbactions/unlock?id="]');
							}
						} else {
							casper.echo('Shield Icon Doesnt Exists','ERROR');
						}	
					}
				});
			}		
		}); 
	});	
};

backArrowTests.pinTopicListingPage = function() {
	casper.then(function(){
		/*****Verify back arrow with pin topic on topic listing page*****/
		casper.echo('Verify back arrow with pin topic on topic listing page', 'INFO');
		backArrowMethod.selectCategory(json['StartTopic'],casper,function(err){
			if(!err){
				casper.click('input[name="id"]');
				wait.waitForElement('div.hover-menu.open', casper, function(err, isExists) {	
					if(!err){
						if(isExists) {
							casper.echo('floating menu appears', 'INFO');
							casper.test.assertExists('i.icon.glyphicon-pushpin');
							casper.click('i.icon.glyphicon-pushpin');
							casper.test.assertExists('a#pin');
							casper.click('a#pin');
							wait.waitForTime(5000,casper,function(err){
								if(!err){
									casper.test.assertExists('#back_arrow_topic');
									casper.click('#back_arrow_topic');
								}
							});
						} else {
							casper.echo('floating menu appears is not visible ', 'ERROR');
						}	
					}
				});
			}		
		}); 
	});	
};

backArrowTests.pinPostListingPage = function() {
	casper.then(function(){
		/*****Verify back arrow with pin option on post listing page*****/
		casper.echo('Verify back arrow with pin option on post listing page', 'INFO');
		backArrowMethod.selectCategory(json['StartTopic'],casper,function(err){
			if(!err){
				casper.test.assertExists('span.topic-content a');
				casper.click('span.topic-content a');
				wait.waitForElement('a span.caret', casper, function(err, isExists) {	
					if(!err){
						if(isExists) {
							casper.click('a span.caret'); 	
							try{
								casper.test.assertExist('a[href^="/mbactions/pin?id="]');
								casper.click('a[href^="/mbactions/pin?id="]');
								wait.waitForTime(5000,function(err){
									if(!err){
										casper.click('a span.caret'); 	
										casper.test.assertExist('a[href^="/mbactions/unpin?id="]');
										casper.echo('Message:Topic is pinned','INFO');
										casper.test.assertExists('#backArrowPost');
										casper.click('#backArrowPost');
									}
								});		
							}catch(e){
								casper.test.assertDoesntExist('a[href^="/mbactions/pin?id="]');
							}										
						} else {
							casper.echo('Shield Icon Doesnt Exists','ERROR');
						}	
					}
				});
			}		
		}); 
	});	
};


backArrowTests.unPinTopicListingPage = function() {
	casper.then(function(){
		/*****Verify back arrow with unpin option on topic listing page*****/
		casper.echo('Verify back arrow with unpin option on topic listing page', 'INFO');
		backArrowMethod.selectCategory(json['StartTopic'],casper,function(err){
			if(!err){
				casper.click('input[name="id"]');
				wait.waitForElement('div.hover-menu.open', casper, function(err, isExists) {	
					if(!err){
						if(isExists) {
							casper.echo('floating menu appears', 'INFO');
							casper.test.assertExists('i.icon.glyphicon-pushpin');
							casper.click('i.icon.glyphicon-pushpin');
							casper.test.assertExists('a#unpin');
							casper.click('a#unpin');
							wait.waitForTime(5000,casper,function(err){
								if(!err){
									casper.test.assertExists('#back_arrow_topic');
									casper.click('#back_arrow_topic');
								}
							});
						} else {
							casper.echo('floating menu appears is not visible ', 'ERROR');
						}	
					}
				});
			}		
		}); 
	});	
};

backArrowTests.unPinPostListingPage = function() {
	casper.then(function(){
		/*****Verify back arrow with unpin option on post listing page*****/
		casper.echo('Verify back arrow with unpin option on post listing page', 'INFO');
		backArrowMethod.selectCategory(json['StartTopic'],casper,function(err){
			if(!err){
				casper.test.assertExists('span.topic-content a');
				casper.click('span.topic-content a');
				wait.waitForElement('a span.caret', casper, function(err, isExists) {	
					if(!err){
						if(isExists) {
							casper.click('a span.caret'); 	
							try{
								casper.test.assertExist('a[href^="/mbactions/unpin?id="]');
								casper.click('a[href^="/mbactions/unpin?id="]');
								wait.waitForTime(5000,function(err){
									if(!err){
										casper.click('a span.caret'); 	
										casper.test.assertExist('a[href^="/mbactions/pin?id="]');
										casper.echo('Message:Topic is unpinned','INFO');
										casper.test.assertExists('#backArrowPost');
										casper.click('#backArrowPost');
									}
								});		
							}catch(e){
								casper.test.assertDoesntExist('a[href^="/mbactions/unpin?id="]');
							}										
						} else {
							casper.echo('Shield Icon Doesnt Exists','ERROR');
						}	
					}
				});
			}		
		}); 
	});	
};

backArrowTests.deleteTopicListingPage = function() {
	casper.then(function(){
		/*****Verify back arrow with delete topic on topic listing page*****/
		casper.echo('Verify back arrow with delete topic on topic listing page', 'INFO');
		backArrowMethod.selectCategory(json['StartTopic'],casper,function(err){
			if(!err){
				casper.click('input[name="id"]');
				wait.waitForElement('div.hover-menu.open', casper, function(err, isExists) {	
					if(!err){
						if(isExists) {
							casper.test.assertExists('i.glyphicon.glyphicon-trash');
							casper.click('i.glyphicon.glyphicon-trash');
							wait.waitForTime(5000,casper,function(err){
								if(!err){
									casper.echo('Message:Post is Deleted Successfully','INFO');
									casper.test.assertExists('#back_arrow_topic');
									casper.click('#back_arrow_topic');
								}
							});
						} else {
							casper.echo('floating menu appears is not visible ', 'ERROR');
						}	
					}
				});
			}		
		}); 
	});	
};


















