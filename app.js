'use strict'
let urls = []
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	let scan = /^https?:\/\//
	let isUrl = function(data) {
		if (scan.test(data) == true) return true
		else return false;
	}
	
	req.url = req.url.slice(1)
	if (req.url.length == 0) {
	res.end(`<b>Trey's url shortener for Free Code Camp</b> <br>
Add \/new\/ plus a http or https complete url to the end of this site's url to receive a shortened url.  Or, paste shortened url into bar to go to that site.`);
	} else {
		if (req.url.slice(0, 4) == 'new/') {
			req.url = req.url.slice(4);
			let x = urls.length;
			if (isUrl(req.url)) {
			urls.push(req.url)
			res.end(`Your url = ${req.url}, shortened url = this site's url + /${x}`)
			} else {
				res.end(`Invalid url, please try again.`)
			}
			console.log(req.url)
		} else if (req.url[0].match(/^[0-9]/)!= null) {
			res.redirect(urls[req.url])
		} else {
			res.end('not in database')
		}
 		
	}
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
