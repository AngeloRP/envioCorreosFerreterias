var express = require('express');
const nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');
var router = express.Router();
var hbs = require('nodemailer-express-handlebars');
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
    var businessName = req.body.businessName;
    var names = req.body.names;
    var ownerPhone = req.body.ownerPhone;
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

    let transporter = nodemailer.createTransport(smtpConfig);// nodemailer.createTransport(mg(auth));
    let transporter2 = nodemailer.createTransport(smtpConfig);
    transporter2.use('nuevoUsuario',hbs({
        viewPath:    'views/email',
        extName: '.hbs'
    }));


    let mailOptions = {
        from: 'angelorp93@gmail.com',//' "Mailgun Sandbox" <postmaster@sandboxb70f71a882e2412ba2104b6f61dd4d8d.mailgun.org>', // sender address
        to: destinatario,  //destinatario, // list of receivers
        subject: titulo,// titulo, // Subject line
        text: texto,// texto, // plain text body
        html: `
                <div>
                    <img style="width:100%;heigth:100%;position:absolute;z-index:1;top:0;left:0;" src="cid:algo" />
                    <a href="https://www.youtube.com/watch?v=etZT2Vof2sM">Mira Nuestro video promocional aqui</a>
                
        </div>
        `,
        attachments: [
            {
                filename: 'principal.jpg',
                path: '../envioCorreosFerreterias/images/principal.jpg',
                cid: 'algo'
            },
        ],
    };
    texto2 = '';
    let mailOption2 = {
        from: 'angelorp93@gmail.com',//' "Mailgun Sandbox" <postmaster@sandboxb70f71a882e2412ba2104b6f61dd4d8d.mailgun.org>', // sender address
        to: 'grojas@disnovo.com',  //Genesis
        subject: 'Información del Negocio: ' + businessName,// titulo, // Subject line
        context: {
            correoDestino:destinatario,
            names: names,
            negocio:businessName,
            telefono:ownerPhone
        },
        template:'nuevoUsuario',
        cc: ['grojas@disnovo.com', ' "Jorge Chavez" <jchavez@disnovo.com>, "Maria Jimenez"  <mjimenez@disnovo.com> ']
        /*context: {
            correoDestino:destinatario,
            names: names,
            negocio:businessName,
            telefono:ownerPhone
        }*/
        //,// texto, // plain text body
        // cc: ['arodas@disnovo.com', ' "Jorge Chavez" <jchavez@disnovo.com>, "Nelson Gimenez"  <njgimenez@gmail.com> ']
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('Error al enviar mensaje 1');
            return;
        } else {
            //  res.send('Mensaje enviado');
            transporter2.sendMail(mailOptions2, (error, info) => {
                if (error) {
                    console.log(error);
                    res.send('Error al enviar mensaje 2');
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
        }

    });
});

module.exports = router;
