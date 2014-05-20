var express         = require('express');
var bodyParser      = require('body-parser');
var cookieParser    = require('cookie-parser');
var session         = require('express-session');
var app             = express();
var exphbs          = require('express3-handlebars');
var fs              = require('fs');
var https 			= require('https');

var options = {
  key: fs.readFileSync('ssl/key.pem'),
  cert: fs.readFileSync('ssl/cert.pem')
};

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use('/static', express.static(__dirname + '/static'));

app.use(cookieParser('keyboard cat'));
app.use(session({ secret: 'keyboard cat', key: 'sid', cookie: { secure: false }}));
app.use(bodyParser());
 

require('./routes.js')(app);

https.createServer(options, app).listen(4000);