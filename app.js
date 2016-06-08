var restify = require('restify'),
	request = require('request'),
	POST_templates = require('./routes/POST_templates'),
	POST_campaign = require('./routes/POST_campaign'),
	PUT_campaignContent = require('./routes/PUT_campaignContent');
	POST_sendCampaign = require('./routes/POST_sendCampaign');

var server = restify.createServer();
server.use(restify.fullResponse());
server.use(restify.bodyParser({
    // See http://mcavage.me/node-restify/#bundled-plugins
}));

/* supports tacking CORS headers into actual requests
 * add url in origins to allow access domains
 */
server.use(restify.CORS({
    origins: [
        'http://0.0.0.0:3000'
    ],
    credentials: true
    // headers: ['curia']
}));
server.opts(/.*/, function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
//console.log('header is ', req.header)
    res.header("Access-Control-Allow-Methods", req.header("Access-Control-Request-Method"));
    res.header("Access-Control-Allow-Headers", req.header("Access-Control-Request-Headers"));
    res.send(200);
    return next();
});
server.use(restify.fullResponse());
// server.opts(/.*/, function (req,res,next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With, Cache-Control");
//     res.send(200);
//     return next();
// });

// Compress the responses
server.use(restify.gzipResponse());

// Uncomment this to log all requests
// server.pre(function (request, response, next) {
// 	console.log('---------> ' + request.url)
//     next();
// });

server.get('/healthcheck', function (req, res, next) {
    res.send('mailchimp api is running...');
});

server.post('/api/3.0/campaign', function (req, res, next) {

    console.log("\nvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv\n/api/3.0/campaign");
    
    POST_campaign.POST_campaign(req, res, next, req.params.apikey); // Sends response directly.
});


server.put('/api/3.0/campaign/content', function (req, res, next) {

    console.log("\nvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv\n/api/3.0/campaign/content");
    
    PUT_campaignContent.PUT_campaignContent(req, res, next, req.params.apikey); // Sends response directly.
});


server.post('/api/3.0/campaign/actions/send', function (req, res, next) {

    console.log("\nvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv\n/api/3.0/campaign/actions/send");
    
    POST_sendCampaign.POST_sendCampaign(req, res, next, req.params.apikey); // Sends response directly.
});


server.post('/api/3.0/templates', function (req, res, next) {

    console.log("\nvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv\n/api/3.0/templates");
    
    POST_templates.POST_templates(req, res, next, req.params.apikey); // Sends response directly.
});


server.listen(3000, function() {
  console.log('%s listening at %s', server.name, server.url);
});

