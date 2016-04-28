var errors = require('restify-errors'),
	request = require('request'),
	uri = 'https://us13.api.mailchimp.com/3.0/campaigns';

exports.POST_sendCampaign = function(req, res, next, apikey) {
	console.log("\nvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv\nPOST_sendCampaign");
	var params = req.params;
	request({
		uri: uri + '/' + params.campaign_id + '/actions/send',
		method: "POST",
		headers: {
	    	'Authorization': apikey
	    }
	}, function(error, response, body) {
		if (error) {
			var errResponse = new errors.InvalidArgumentError(error);
			return res.send(errResponse);
		}
		console.log(body);
		return res.send(body);
	});
}
