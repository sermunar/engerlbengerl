var express = require('express');
var app = express();
var path = require('path');
var models = require('./models');
var sequelize_fixtures = require('sequelize-fixtures');
var routes = require('./routes');

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

app.use('/public', express.static('public'))
app.use('/data', routes);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

models.sequelize.sync().then(function () {
  /**
   * Listen on provided port, on all network interfaces.
   */
  sequelize_fixtures.loadFile('./fixtures/fixtures.json', models).then(function () {
    app.listen(port, function () {
      console.log('Express server listening on port ' + port);
    });
  });
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}