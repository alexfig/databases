var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.Messages.findAll()
      .success(function(messages) {
        sendResponse(res, {results: messages}, 202);
      })
      .error(function(error) {
        console.log(error);
        sendResponse(res, 'cant get message', 404);
      })
    },
    // a function which handles a get request for all messages
    post: function (req, res) {
      console.log('message post');
      models.Users.findOrCreate({username: req.body.username})
      .success(function(user){
        var message = {
          userid: user.id,
          text: req.body.text,
          rooomname: req.body.rooomname
        };
        var newMessage = models.Messages.build(message);
        newMessage.save().success(function(){
          sendResponse(res, "Posted message", 201);
        });
      })
      .error(function(){
        console.log(error);
        sendResponse(res, 'cant post message', 404);
      });
    }, // a function which handles posting a message to the database

  users: {
    get: function (req, res) {

    },
    post: function (req, res) {
      console.log('user post');
      console.log('user collectData cb');
      models.Users.findOrCreate({username: req.body.username})
      .success(function(){
        sendResponse(res, "Created user", 201);
      })
      .error(function(error){
        console.log(error);
        sendResponse(res, "unable to create user", 404);
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
