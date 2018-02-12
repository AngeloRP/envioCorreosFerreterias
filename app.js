var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var cors = require('cors')
var index = require('./routes/index');
var users = require('./routes/users');
var sendmail = require('./routes/sendmail');



var app = express();
/*function perimitirCrossDomain(req, res, next) {
  //en vez de * se puede definir SÓLO los orígenes que permitimos
  console.log(req.headers.origin) //
  res.header('Access-Control-Allow-Origin', );
  //metodos http permitidos para CORS
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,application/x-www-form-urlencoded,multipart/form-data,text/plain, Authorization,Access-Control-Allow-Origin, Origin, Accept, X-Requested-With, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Headers');
  next();
}
/*function (origin, callback) {
    console.log('Origin:'+ origin);
    
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
*/


var whitelist = ['http://localhost:4200', 'http://localhost:3000'];
var corsOptions = {
  origin: '*',
  methods: 'GET,PUT,POST,DELETE,PATCH, DELETE, OPTIONS',
  allowedHeaders: 'Content-Type,application/x-www-form-urlencoded,multipart/form-data,text/plain, Authorization,Access-Control-Allow-Origin, Origin, Accept, X-Requested-With, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Headers',
  preflightContinue: false,
  optionsSuccessStatus: 204
}



// view engine setup
/*app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');*/
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(perimitirCrossDomain);
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);
app.use('/users', users);
app.use('/sendmail', sendmail);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});







/*
app.post("/contacto", function (req, res) {
  var nombre = req.body.nombre;
  var correo = req.body.correo;
  var mensaje = req.body.mensaje;

  var isError = false;
  var auth = {
    auth: {
      api_key: 'key-78748990af44d1eebadbf22c8c5221b0',
      domain: 'sandboxb70f71a882e2412ba2104b6f61dd4d8d.mailgun.org'
    }
  }
  var transporter = nodemailer.createTransport(mg(auth));

  let mailOptions = {
    from: ' "Mailgun Sandbox" <postmaster@sandboxb70f71a882e2412ba2104b6f61dd4d8d.mailgun.org>', // sender address
    to: 'aceleratortoaru@gmail.com',  //destinatario, // list of receivers
    subject: 'Holi Boli',// titulo, // Subject line
    text: 'tazdingo',// texto, // plain text body
  };
  // send mail with defined transport object
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log('\nERROR: ' + error + '\n');
      res.json({ yo: 'error' });
    } else {
      // console.log('\nRESPONSE SENT: ' + info.response+'\n');
      res.render('gracias');
    }
  });
});
*/


module.exports = app;
