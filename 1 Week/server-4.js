var express = require('express');
var morgan = require('morgan');
var dishRouterModule = require('./dishRouter');
var promoRouterModule = require('./promoRouter');
var leaderRouterModule = require('./leaderRouter');

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));

app.use('/dishes',dishRouterModule);
app.use('/promotions',promoRouterModule);
app.use('/leadership',leaderRouterModule);

app.use(express.static(__dirname + '/public'));

app.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});