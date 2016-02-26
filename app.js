var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var app = express();

var http = require("http");
var server = http.createServer(app);

var cfenv = require('cfenv');
var appEnv = cfenv.getAppEnv();
var port = appEnv.port;
var host = appEnv.bind

server.listen(port, host, () => console.log(`server listening on ${appEnv.url}`));

var io = require('socket.io').listen(server);
var twitter = require("ntwitter");


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/favicon.ico', (req, res) => res.status(404).send('not found'))

app.use('/', routes);

// twitter streaming
io.sockets.on("connection", function(socket) {

    var twit = new twitter({
    consumer_key: 'qRUEbvTQQ5fghgelqOtRdvGrU',
    consumer_secret: 'yPhAM53a9qRHPYFXePy8jotyT7D1gJEcCIEjCxkJvGsvNbTbhE',
    access_token_key: '33357585-41vs2SapcL0TrfTrqeyk7hfqvPjatv1cJqXgvJo0G',
    access_token_secret: 'Swm3eDQHGtpQLGA74e3329aUYPLUdDu1C8rEuHfvDr73c'
    });

    socket.on("play", function(data){
        console.log(data["start"]);
        if (data["start"]) {
            twit.stream('statuses/filter', {'locations':'-180,-90,180,90'}, function(stream) {
            twit.currentTwitStream = stream;
            stream.on('data', function (data) {
            if (data["geo"]) {
            socket.emit("locale", {location: data["geo"]})
            }
            });
        });
        }
        else {
            twit.currentTwitStream.destroy();
        }

    });
});



/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
