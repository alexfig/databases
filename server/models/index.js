var Sequelize = require("sequelize");
var sequelize = new Sequelize("chat", "root", "");
var customDataTypes = require('../../node_modules/sequelize-mysql-timestamp');

module.exports.User = sequelize.define('users', {
  id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  username: {type: Sequelize.STRING, allowNull: false, defaultValue: 'Anonymous', unique: true}
},{  timestamps: false });

module.exports.User.sync().then(function() {
  console.log("Successfully synced User table");
});

module.exports.Message = sequelize.define('messages', {
  id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  text: Sequelize.STRING,
  roomname: Sequelize.STRING,
  createdAt: {type: customDataTypes.TIMESTAMP}
}, {  timestamps: false });

module.exports.User.hasMany(module.exports.Message);

module.exports.Message.sync().then(function() {
  console.log("Successfully synced Messages table");
});
// console.log(module.exports.User)

  
