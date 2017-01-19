var profilePageMethod = module.exports = {};


profilePageMethod.fillDataToMessage = function(driver, callback) {
	
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



profilePageMethod.fillData = function(driver , callback) {
	driver.fillSelectors('form[name="PostTopic"]',{
		'div.editable-input':'hani1'
	},false);
	driver.click('button.btn.btn-primary.btn-sm.editable-submit i');
	
};



profilePageMethod.startTopic = function(data,driver,callback) {
	driver.click('a.pull-right.btn.btn-uppercase.btn-primary ');
	driver.waitForSelector('div.post-body.pull-left',function success() {								
		driver.sendKeys('input[name="subject"]', data.title, {reset:true});								
		driver.withFrame('message_ifr', function() {
			driver.sendKeys('#tinymce', driver.page.event.key.Ctrl,driver.page.event.key.A, {keepFocus: true});			
			driver.sendKeys('#tinymce', driver.page.event.key.Backspace, {keepFocus: true});
			driver.sendKeys('#tinymce',data.content);
		});
		driver.waitForSelector('#all_forums_dropdown', function success() {
			driver.click('#all_forums_dropdown');
			driver.fill('form[name="PostTopic"]',{
				'forum' : data.category
			},false);
			driver.then(function() {
				driver.click('#post_submit');
			});
		}, function fail() {
			driver.waitForSelector('#post_submit',function success() {							
				driver.test.assertExists('#post_submit');
				driver.click('#post_submit');
			},function fail() {
				driver.echo('Unable to submit form','ERROR');
			});
		});
	},function fail(){
		driver.echo('Unable to Open Form To Start Topic','ERROR');
	});
	driver.then(function() {
		return callback(null);
	});
};

//----------------------------------send Message-----------------------------------------------------------------------------


profilePageMethod.createMessage = function(data, driver, callback) {		
	driver.sendKeys('input[id="tokenfield_typeahead-tokenfield"]', data.to, {keepFocus:true});
	driver.sendKeys('input[id="tokenfield_typeahead-tokenfield"]', casper.page.event.key.Enter, {keepFocus:true} );
	driver.sendKeys('input[id="pm_subject"]', data.subject, {keepFocus:true});		
	driver.test.assertExists('textarea#pmessage_new');
	driver.evaluate(function() {
		document.querySelector('textarea#pmessage_new').click();
	});
	driver.waitUntilVisible('iframe#pmessage_new_ifr', function success() {
		driver.withFrame('pmessage_new_ifr', function() {
			driver.sendKeys('#tinymce', driver.page.event.key.Ctrl,driver.page.event.key.A,{keepFocus: true});		
			driver.sendKeys('#tinymce', driver.page.event.key.Backspace, {keepFocus: true});
			driver.sendKeys('#tinymce', data.pmessage);
		});
	}, function fail() {
		driver.echo('Message iframe not fount', 'ERROR')
	});
	driver.then(function() {
		driver.test.assertExists('a#send_pmsg_button');
		driver.click('a#send_pmsg_button');
		//driver.waitUntilVisible('div#loading_msg', function() {
			//driver.echo(casper.fetchText('div#loading_msg p'), 'INFO');
			driver.waitUntilVisible('div#ajax-msg-top', function success() {
				driver.echo(driver.fetchText('div#ajax-msg-top p'),'INFO');
			}, function fail() {
				driver.echo(casper.fetchText('div#pm_error_msg'), 'ERROR');
			});	
			driver.then(function() {
				return callback(null);
			});
		//});
	});
};





//--------------------------------------------BackEndSettings For message Button-----------------------------------------
profilePageMethod.messageButtonEnable= function(driver , callback){
	
	loginPrivacyOptionMethod.loginToForumBackEnd(casper , function(err) {
		if (!err)
			casper.echo('LoggedIn to forum backend....', 'INFO');
	});
	wait.waitForElement('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', casper , function(err, isExists) {
		if(isExists) {
			casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
			casper.evaluate(function() {
				document.querySelector('div#ddSettings  div a:nth-child(2)').click();
			});
			wait.waitForElement('button.button.btn-m.btn-blue' , casper , function(err , isExists) {
				if(isExists) {
					utils.enableorDisableCheckbox('allow_pm',true, casper, function(err) {
						if(!err)
							casper.echo('Successfully checked','INFO');
					});
					casper.click('button.button.btn-m.btn-blue');
				}
			});
		}
	});
			
};






















