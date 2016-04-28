var errors = require('restify-errors'),
	request = require('request'),
	uri = 'https://us13.api.mailchimp.com/3.0/campaigns';

exports.PUT_campaignContent = function(req, res, next, apikey) {
	console.log("\nvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv\nPUT_campaignContent");
	var params = req.params;
	var jsonParams = {
		'template': {
			'id': parseInt(params.template.id)
		}
	}
	console.log(jsonParams)
	request({
		uri: uri + '/' + params.campaign_id + '/content',
		method: "PUT",
		headers: {
	    	'Authorization': apikey
	    },
	    json: jsonParams
	}, function(error, response, body) {
		if (error) {
			var errResponse = new errors.InvalidArgumentError(error);
			return res.send(errResponse);
		}
		console.log(body);
		return res.send(body);
	});
}
