var express = require('express');
var path = require('path');
var app = express();

var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var api = require('./routes/api');
var index = require('./routes/index');

app.set('port', (process.env.PORT || 3000));

var mongoURI = "mongodb://localhost:27017/prime_peer_db_pg_01";
var MongoDB=mongoose.connect(mongoURI).connection;

MongoDB.on('error', function(err){
    console.log("Mongodb connection error", err);
});
MongoDB.once('open', function(){
    console.log("Mongodb connection open");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', api);
app.use('/', index);

app.use(express.static(path.join(__dirname, 'public')));



app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
