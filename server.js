var express         = require('express');
var bodyParser      = require('body-parser');
var cookieParser    = require('cookie-parser');
var session         = require('express-session');
var app             = express();
var exphbs          = require('express3-handlebars');
var fs              = require('fs');
var https 			= require('https');
var _ 				= require('underscore');

var options = {
  key: fs.readFileSync('ssl/key.pem'),
  cert: fs.readFileSync('ssl/cert.pem')
};

//resolve config
var config = require('./config');

var requiredValues = ['host'];

if(_.difference(requiredValues, _.keys(config)).length > 0){
	throw new Error('Define all needed config values');
}

app.engine('html', exphbs({
	defaultLayout: 'main',
	extname: '.html',
	helpers: {
		CONFIG: function(key){
			return config[key];
		}
	}
}));
app.set('view engine', 'html');

app.use('/static', express.static(__dirname + '/static'));

app.use(cookieParser('keyboard cat'));
app.use(session({ secret: 'keyboard cat', key: 'sid', cookie: { secure: false }}));
app.use(bodyParser());
 
require('./routes.js')(app);

app.listen(4000, function(){
    console.log('Server running...');
});
// https.createServer(options, app).listen(4000);