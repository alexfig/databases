var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(function(err, results){
        var statusCode = err ? 404 : 202
        sendResponse(res, results, statusCode);
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log('message post');
      models.messages.post(req.body, function(err) {
        if (err) {
          console.log(err);
          sendResponse(res, "unable to send message", 404);
        } else {
          sendResponse(res, "Posted message", 201);
        }
      });
    } // a function which handles posting a message to the database
  },

  users: {
    get: function (req, res) {

    },
    post: function (req, res) {
      console.log('user post');
      console.log('user collectData cb');
      models.users.post(req.body, function(err) {
        if (err) {
          sendResponse(res, "unable to create user", 404);
        } else {
          sendResponse(res, "Created user", 201);
        }
      });
    }
  }
};

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "application/json"
};
var sendResponse = function(response, data, statusCode) {
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(data));
};
