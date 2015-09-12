var Sequelize = require("sequelize");
var sequelize = new Sequelize("chat", "root", "");
module.exports = sequelize;
/* TODO this constructor takes the database name, username, then password.
 * Modify the arguments if you need to */

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */
var User = sequelize.define('User', {
  id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  username: {type: Sequelize.STRING, allowNull: false, defaultValue: 'Anonymous', unique: true}
});

var Message = sequelize.define('Message' {
  userid: {type: Sequelize.INTEGER, references: {model: User, key:id} },
  text: Sequelize.STRING,
  roomname: Sequelize.STRING
});

/* .sync() makes Sequelize create the database table for us if it doesn't
 *  exist already: */
User.sync().success(function() {
  /* This callback function is called once sync succeeds. */

  // now instantiate an object and save it:
  var newUser = User.build({username: "Jean Valjean"});
  newUser.save().success(function() {

    /* This callback function is called once saving succeeds. */

    // Retrieve objects from the database:
    User.findAll({ where: {username: "Jean Valjean"} }).success(function(usrs) {
      // This function is called back with an array of matches.
      for (var i = 0; i < usrs.length; i++) {
        console.log(usrs[i].username + " exists");
      }
    });
  });
});

CREATE TABLE messages (
  /* Describe your table here.*/
  id            int(10) AUTO_INCREMENT,
  text          varchar(150),
  created_at    timestamp,
  user_id       int(10), 
  roomname     varchar(30),
  primary key (id),
  foreign key (user_id)   references users(id),
  foreign key (roomname) references rooms(roomname)
);