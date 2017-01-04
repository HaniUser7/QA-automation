var config = require('../../../config/config.json');
var deletePostTests = require('../cases/deletePost.js');
var deletePost = module.exports = {};

upload.featureTest = function(casper, test) {
	casper.start(config.url, function() {
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');




















	});
};
