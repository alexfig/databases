var Sequelize = require("sequelize");
var sequelize = new Sequelize("chat", "root", "");

module.exports.User = sequelize.define('User', {
  id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  username: {type: Sequelize.STRING, allowNull: false, defaultValue: 'Anonymous', unique: true}
});

module.exports.Message = sequelize.define('Message' {
  userid: {type: Sequelize.INTEGER, references: {model: User, key:id} },
  text: Sequelize.STRING,
  roomname: Sequelize.STRING
});

module.exports.User.sync().success(function() {
  console.log("Successfully synced User table");
});
module.exports.Messages.sync().success(function() {
  console.log("Successfully synced Messages table");
});