var db = require('../db');

module.exports = {
  messages: {
    get: function (cb) {
      db.query("SELECT username, text, roomname, createdAt FROM users join messages WHERE users.id = messages.userId", function(err, results){
        console.log('messages: ' + results);
        cb(err, results);
      });
    }, // a function which produces all the messages
    post: function (data, cb) {
      console.log('models message post');
      // Query DB for user id
      db.query("SELECT id FROM users WHERE username = ?", data.username, function(err, results) {
        if(err) {
          console.log('Error selecting');
          cb(err);
          return;
        }
        // Get the POST data
        console.log(results);
        var post = {
          userId: results.pop().id,
          text: data.text,
          roomname: data.roomname
        };
        // Insert into db 
        db.query("INSERT INTO messages SET ?", post, function (err) {
          cb(err);
        });
      }); // a function which can be used to insert a message into the database
    }
  },

  users: {
    // Ditto as above.
    get: function () {

    },
    post: function (data, cb) {
      console.log('models user post');
      var user = {
        username: data.username
      };
      db.query("INSERT IGNORE INTO users SET ?", user, function (err) {
        cb(err);
      });
    }
  }
};

