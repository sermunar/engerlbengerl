var routes = require('express').Router();
var user = require('./user');

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

routes.use('/user', user);

module.exports = routes;