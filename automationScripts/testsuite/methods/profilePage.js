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


