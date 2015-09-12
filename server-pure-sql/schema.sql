CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  /* Describe your table here.*/
  id    int(10) AUTO_INCREMENT,
  username  varchar(30) UNIQUE,
  primary key (id)
);

CREATE TABLE messages (
  /* Describe your table here.*/
  id            int(10) AUTO_INCREMENT,
  text          varchar(150),
  createdAt    timestamp,
  userId       int(10), 
  roomname     varchar(30),
  primary key (id),
  foreign key (userId)   references users(id)
);

/* Create other tables and define schemas for them here! */


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

