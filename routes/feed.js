var express = require('express');
var redis = require('redis');
var router = express.Router();

var config = require('../config.js')[process.env.NODE_ENV || 'development'];
var client = redis.createClient(config.redis.port, config.redis.host);

client.auth(config.redis.password);

router.get('/', function(req, res, next) {
	var key = req.query.key;

	client.get(key, function(err, data) {
		var response, success = true, code = 200;

		try {
	    if (!err && data) {
	      response = JSON.parse(data);
	    } else if(err) {
	    	code = 501;
	    	success = false;
	    	response = JSON.parse(data);
	    } else {
	    	response = "Result not found";
	    }
	  } catch(e) {
	  	code = 501;
	  	success = false;
	  	response = "Err due to parse data " + JSON.stringify(e);
	  }

    return res.status(code).json({
    	success: success, 
    	result: response
    });
  });

  client.on('error', function(err) {
		return res.status(501).json({
    	success: false, 
    	message: "Error due to SETX " + JSON.stringify(err)
    });
	});
});


router.post('/', function(req, res, next) {
	var key, value;

	key = req.body.key;
	value = req.body.value;

	client.setex(key, 3600, JSON.stringify(value), function(err, response) {
    var response, success = true, code = 200;

    try {
	    if(err) {
	    	code = 501;
	    	success = false;
	    	response = "Failed to insert " + JSON.stringify(err);
	    } else {
	    	response = "Successfully Inserted!!";
	    }
	  } catch(e) {
	  	code = 501;
	  	success = false;
	  	response = "Err due to parse data " + JSON.stringify(e);
	  }

    return res.status(code).json({
    	success: success, 
    	message: response
    });
  });

  client.on('error', function(err) {
		return res.status(501).json({
    	success: false, 
    	message: "Error due to SETX " + JSON.stringify(err)
    });
	});
  
});

module.exports = router;
