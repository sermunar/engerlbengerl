var users = require('express').Router();
var all = require('./all');
var models  = require('../../models');

users.get('/', (req, res) => {
  models.User.findAll().then(function(users) {
      res.status(200).json(users);
  });
});

module.exports = users;