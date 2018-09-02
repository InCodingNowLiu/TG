const express = require('express');
var bodyParser = require('body-parser');
// var Service = require('./controllers/user/service/email')
const kraken = require('kraken-js');
let app = express();
module.exports = app;
// app.use(express.static(__dirname + "/public"));
const options = require('./lib/spec')(app);
app.use(kraken(options));
app.on('start', function () {
    // eslint-disable-next-line no-use-before-define
    console.log('Application ready to serve requests.');
    // eslint-disable-next-line no-use-before-define
    console.log('Environment: %s', app.kraken.get('env:env'));
});


