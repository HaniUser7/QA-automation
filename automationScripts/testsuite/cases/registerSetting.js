'use strict';
var registerTests = require('./register.js');
var json = require('../../testdata/registerSettingData.json');
var registerSettingMethods = require('../methods/registerSetting.js');
var wait = require('../wait.js');
var registerSettingTests=module.exports = {};
var errorMessage = "";


//Back end Full Name front end Registration with with Full name  blank data
registerSettingTests.blankUsername = function() {
	 
	registerSettingTests.defaultRegistrationSetting('form[name="posts"] select[name="required_name"]',casper, function(err) {
		if(!err){
		     casper.echo('defaultRegistrationSetting  working');
		}
	});
}



//1.Back end backEndBirthday front end Registration with with Full name  blank data
registerSettingTests.backEndBirthday = function() {
	 
	registerSettingTests.defaultRegistrationSetting('form[name="posts"] select[name="required_dob"] ',casper, function(err) {
		if(!err){
		     casper.echo('defaultRegistrationSetting  working');
		}
	});
}
//1.Back end Signature end Registration with with Full name  blank data
registerSettingTests.Signature = function() {
	 
	registerSettingTests.defaultRegistrationSetting('form[name="posts"] select[name="required_signature"]',casper, function(err) {
		if(!err){
		     casper.echo('defaultRegistrationSetting  working');
		}
	});
}
//1.Back end instantMessage front end Registration with with Full name  blank data
registerSettingTests.instantMessage = function() {
	 
	registerSettingTests.defaultRegistrationSetting('form[name="posts"] select[name="required_imType"] ',casper, function(err) {
		if(!err){
		     casper.echo('defaultRegistrationSetting  working');
		}
	});
}



//.Back end Full Name front end Registration with with Full name  blank data
registerSettingTests.defaultRegistrationSetting = function(id,casper,callback) {
	 
	    //1.Back end  deafult "Yes",Required "Registration Page Only"  front end Registration 
		casper.then(function() {
			casper.echo('******************** case-01 ************************');
			casper.echo('test case for deafult "Yes",Required "Registration Page Only"  front end Registration');
			casper.echo('********************************************');
			registerSettingMethods.registerBackUrl(id,json['setRegistrationValueOn'], casper, function(err) {
			 if(!err){
				   registerSettingMethods.registerFrontUrl(registerTests.blankUsername(), casper, function(err) {
					 if(!err){
						casper.echo('registerFrontUrl not working');	 
						}
					});
				}
			});
			
			//2.Back end  deafult "Yes",Required "Visible"  front end Registration 
			casper.then(function() {
				casper.echo('******************** case-02 ************************');
				casper.echo('test case for deafult "Yes",Required "Visible"  front end Registration ');
				casper.echo('********************************************');
				registerSettingMethods.registerBackUrl(id,json['setVisibleValueOn'], casper, function(err) {
				 if(!err){
					   registerSettingMethods.registerFrontUrl(registerTests.blankUsername(), casper, function(err) {
						 if(!err){
							casper.echo('registerFrontUrl is working');	 
							}
						});
					}
				});
			});
			
			 //3.Back end  deafult "Yes",Required "Hidden"  front end Registration 
			casper.then(function() {
				casper.echo('******************** case-03 ************************');
				casper.echo('test case for deafult "Yes",Required "Hidden"  front end Registration');
				casper.echo('********************************************');
				registerSettingMethods.registerBackUrl(id,json['setHiddenValueOn'], casper, function(err) {
				 if(!err){
					   registerSettingMethods.registerFrontUrl(registerTests.existEmail(), casper, function(err) {
						 if(!err){
							casper.echo('registerFrontUrl is working');	 
							}
						});
					}
				});
			});

			//4.Back end  deafult "No", Required "Registration Page Only"  front end Registration 
			casper.then(function() {
				casper.echo('******************** case-04 ************************');
				casper.echo('test case for deafult "No", Required "Registration Page Only"  front end Registration');
				casper.echo('********************************************');
				registerSettingMethods.registerBackUrl(id,json['setRegistrationValueOff'], casper, function(err) {
				 if(!err){
					   registerSettingMethods.registerFrontUrl(registerTests.existEmail(), casper, function(err) {
						 if(!err){
							casper.echo('registerFrontUrl is working');	 
							}
						});
					}
				});
			});

			//5.Back end deafult "No",Required "Visible"  front end Registration 
			casper.then(function() {
				casper.echo('******************** case-05 ************************');
				casper.echo('test case for deafult "No",Required "Visible"  front end Registration');
				casper.echo('********************************************');
				registerSettingMethods.registerBackUrl(id,json['setVisibleValueOff'], casper, function(err) {
				 if(!err){
					   registerSettingMethods.registerFrontUrl(registerTests.existEmail(), casper, function(err) {
						 if(!err){
							casper.echo('registerFrontUrl is working');	 
							}
						});
					}
				});
			});


			 //6.Back end  deafult "No",Required "Hidden"  front end Registration 
			casper.then(function() {
				casper.echo('******************** case-06 ************************');
				casper.echo('test case for deafult "No",Required "Hidden"  front end Registration');
				casper.echo('********************************************');
				registerSettingMethods.registerBackUrl(id,json['setHiddenValueOff'], casper, function(err) {
				 if(!err){
					   registerSettingMethods.registerFrontUrl(registerTests.existEmail(), casper, function(err) {
						 if(!err){
							casper.echo('registerFrontUrl is working');	 
							}
						});
					}
				});
			});
		});
		casper.then(function() {
				return callback(null);	
		});
	
}



















