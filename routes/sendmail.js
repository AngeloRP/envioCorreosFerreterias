var express = require('express');
const nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');
var router = express.Router();

/* GET users listing. 
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});*/

/*const corsm = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
};*/

router.post('/', function (req, res, next) {
    console.log(req.body);
    var destinatario = req.body.to;
    var titulo = req.body.subject;
    var texto = req.body.text;
    var cc = req.body.cc;
    /*
    var nombre = req.nombre;
    var correo = req.correo;
    var mensaje = req.mensaje;*/

    var isError = false;
    let smtpConfig = {
        service: 'Gmail',
        auth: {
            user: 'angelorp93@gmail.com',
            pass: 'Watchmen'
        }
    };

    let configAnterior = {
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'okitoxd@gmail.com', // generated ethereal user
            pass: 'passwordxxx'  // generated ethereal password
        }
    }

    var auth = {
        auth: {
            api_key: 'key-78748990af44d1eebadbf22c8c5221b0',
            domain: 'sandboxb70f71a882e2412ba2104b6f61dd4d8d.mailgun.org'
        }
    }

    let transporter = nodemailer.createTransport(smtpConfig)// nodemailer.createTransport(mg(auth));

    let mailOptions = {
        from: 'angelorp93@gmail.com',//' "Mailgun Sandbox" <postmaster@sandboxb70f71a882e2412ba2104b6f61dd4d8d.mailgun.org>', // sender address
        to: destinatario,  //destinatario, // list of receivers
        subject: titulo,// titulo, // Subject line
        text: texto,// texto, // plain text body
        cc: cc
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('Error al enviar mensaje');
            return;
        } else {
            //  res.send('Mensaje enviado');
            res.json(
                {
                    "success": true,
                    "msg": "Mensaje Enviado Satisfactoriamente a " + destinatario
                }
            );
        }

    });
});

module.exports = router;
