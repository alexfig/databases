var db = require('../db');

module.exports = {
  messages: {
    get: function (cb) {
      db.query("SELECT * FROM messages", function(err, results){
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
          user_id: results.pop().id,
          text: data.message,
          roomname: data.roomname
        };
        // Insert into db 
        db.query("INSERT IGNORE INTO rooms SET ?", {roomname: data.roomname}, function (err) {
          if(err) cb(err);
          else{
            db.query("INSERT INTO messages SET ?", post, function (err) {
              cb(err);
            });
          }
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

