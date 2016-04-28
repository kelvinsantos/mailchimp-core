var errors = require('restify-errors'),
	request = require('request'),
	uri = 'https://us13.api.mailchimp.com/3.0/templates';

exports.POST_templates = function(req, res, next, apikey) {
	console.log("\nvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv\nPOST_templates");
	request({
		uri: uri,
		method: "POST",
		headers: {
	    	'Authorization': apikey
	    },
	    json: req.params
	}, function(error, response, body) {
		if (error) {
			var errResponse = new errors.InvalidArgumentError(error);
			return res.send(errResponse);
		}
		console.log(body);
		return res.send(body);
	});
}
