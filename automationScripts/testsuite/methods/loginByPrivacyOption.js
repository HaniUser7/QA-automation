var config = require('../../../config/config.json');
var loginPrivacyOptionMethod = module.exports = {};
var wait=require('../wait.js');


//Login To Forum Back End
loginPrivacyOptionMethod.loginToForumBackEnd = function(driver,callback) {
		
	//Click On Login Link
	//wait.waitForTime(1000 , casper , function(err) {
		wait.waitForElement('a#navLogin', casper, function(err, isExist) {
			if(isExist) {
				driver.click('a#navLogin');
				driver.echo('Successfully open login form.....', 'INFO');
				fillDataToLogin(config.backendCred, driver, function(err) {
					if (!err)
						driver.echo('Proccessing to login on forum back end....', 'INFO');
				
				});
			} else {
				driver.echo('Login Link Not Found', 'ERROR');
			}
			return callback(null)
		});
	//});
};

//Method For Filling Data In Login Form(Back end)
var fillDataToLogin = function(data, driver, callback) {
	driver.fill('form[name="frmLogin"]', {
		'username' : data.uname,
		'password' : data.upass,
	}, false);
	driver.test.assertExists('form[name="frmLogin"] button');
	driver.click('form[name="frmLogin"] button');
	return callback(null)
};


