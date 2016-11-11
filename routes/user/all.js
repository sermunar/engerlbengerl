
var models  = require('../../models');

module.exports = (req, res) => {
  models.User.findAll().then(function(users) {
      res.status(200).json(users);
  });
};