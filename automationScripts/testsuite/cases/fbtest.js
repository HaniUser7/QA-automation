casper.options.verbose = true;
casper.options.logLevel = "debug";
casper.options.viewportSize = {width: 1024, height: 768};
var json = require('../hani/fbData.json');
casper.test.begin('Fb button availability', function suite(test) {
casper.start('https://beta12.websitetoolbox.com/', function() {
			this.echo('**************************Case 9***************************','INFO');
			test.assertExists('a[href="/register/login"]');
			this.click('a[href="/register/login"]');
			test.assertExists('div.modal-footer a#fb_login em','Facebook Login Button Found On login Page Of FrontEndUrl');
			this.click('div.modal-footer a#fb_login em');
			this.eachThen(json['InvalidInfo'], function(response) {
    					var responseData = response.data;
    					casper.echo('user data : '+JSON.stringify(responseData), 'INFO');
    					casper.waitForPopup(/facebook/, function(popup) {
					});
				       casper.withPopup(/facebook/ , function() {
				       		this.waitForSelector('form#login_form', function success(){
							test.assertExists('form#login_form');
							casper.echo("responseData.email : " +responseData.email+ " & responseData.pass : " +responseData.pass);
							this.fill('form#login_form',{
								'email': responseData.email,
								'pass': responseData.pass
							}, false);
						
							test.assertExists('form[id="login_form"] input[id="u_0_2"]');
							this.click('form[id="login_form"] input[id="u_0_2"]');
							},function fail(){
								this.echo('Facebook Form Not Found','ERROR');
							});
							if (responseData.errorType != "success") {
								casper.wait(1000, function() {
									this.capture(responseData.errorType+'.png');
			
								});
							}
					
					});
					if (responseData.errorType == "success") {
						casper.wait(5000, function() {
							this.capture(responseData.errorType+'.png');
							
						});
					}
					
				});	
			        casper.wait(5000,function(){
			        
			        	casper.test.assertExists('ul.nav.pull-right span.caret');
					casper.click('ul.nav.pull-right span.caret');
					this.capture('111.png');
					try {
						test.assertExists('a#logout');			
						this.click('a#logout');
						casper.waitForSelector('a#td_tab_login', function() {
										
							this.capture('logout1.png');
							test.assertExists('a#td_tab_login');
										
						});
										
										
									
					}catch(e) {
						casper.test.assertDoesntExist('#logout');
					}
			        
			        });			
						
			
					
		//});//startclose	
		/*casper.thenOpen('http://beta12.websitetoolbox.com/',function(){
			this.echo('**************************Case 12***************************','INFO');
			this.echo('verify with register Facebook button	','INFO');
			this.capture('dashboard1.png');
			//this.waitForSelector('a[href="/register/register"]',function success(){		
				this.click('a[href="/register/register"]');
			
				this.capture('register.png');
				test.assertExists('a.facebook.pull-left.fb_login','Facebook Button Found');
				this.click('a.facebook.pull-left.fb_login em');
			//this.click('a#fblogin');
				this.eachThen(json['InvalidInfo'], function(response) {
					var responseData = response.data;
					casper.echo('user data : '+JSON.stringify(responseData), 'INFO');
					casper.waitForPopup(/facebook/, function(popup) {
					});
					casper.withPopup(/facebook/ , function() {
			       			this.waitForSelector('form#login_form', function success(){
							test.assertExists('form#login_form');
							this.fill('form#login_form',{
								'email': responseData.email,
								'pass': responseData.pass
							}, true);
				
							//test.assertExists('form[id="login_form"] input[id="u_0_2"]');
							//this.click('form[id="login_form"] input[id="u_0_2"]');
						},function fail(){
				
						});
						if (responseData.errorType != "Success") {
							casper.wait(1000, function() {
								this.capture(responseData.errorType+'.png');
			
							});
						} 	
					});
				
				
					if (responseData.errorType == "Success") {
						casper.echo('........responseData.errorType : ' +responseData.errorType);
						this.capture(responseData.errorType+'.png');
					}
					
					
				});
				
				casper.wait(5000, function() {
						
					casper.waitForSelector('a#logout', function success(){
						this.capture('111.png');
						
						}, function fail() {
							this.echo('messages icon not found..', 'ERROR');
						});
							
						
					});
				
				//}					
				
		
			});*/
			/*casper.thenOpen('http://beta12.websitetoolbox.com/',function(){
				
				this.waitForSelector('#private_message_notification', function success(){
					this.capture('111.png');
					this.waitForSelector('a#logout',function success(){
						test.assertExists('a#logout','Found Logout');
						 this.click('a#logout');
						 this.wait(5000,function(){
						 	this.capture('dasg123.png');	
						 })
							
					},function fail(){
					});
				}, function fail() {
					this.echo('messages icon not found..', 'ERROR');
				});
			
			});*/
			
			
				
			
		//},function fail(){
			//this.echo('Form not Found','ERROR');
		//});
	//});//thenopenclose
	
	
	
	});//startopen			
		
	casper.run(function(){
		test.done();
	});
	
}); 	
							
					
