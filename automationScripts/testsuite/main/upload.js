var config = require('../../../config/config.json');
var uploadTests = require('../cases/upload.js');
var upload = module.exports = {};

upload.featureTest = function(casper, test) {
	casper.start(config.url, function() {
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		//Verify with post from topic listing page(Attachment/insert photos)
		uploadTests.uploadPostAttachmentInsert();
























	});
};
