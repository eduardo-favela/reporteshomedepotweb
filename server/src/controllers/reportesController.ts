import { Request, Response } from 'express'
import db from '../database'
import nodemailer from 'nodemailer'

class ReportesController {
    public async registrareporte(req: Request, res: Response){
        await db.query(`INSERT INTO reportesvending set ?`,req.body, function(err, result, fields){
            if(err) throw err
            res.json(result)
        })
    }

    public async enviarEmail(req: Request, res: Response){
        // create reusable transporter object using the default SMTP transport
        console.log(`${__dirname}/../../assets/LOGO_AUTOMERCADEO.png`)
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            tls: { rejectUnauthorized: false },
            auth: {
                user: 'reportesautomercadeo@gmail.com',
                pass: 'AmKf8er0'
            }
        });

        let mailDetails = {
            from: 'reportesautomercadeo@gmail.com',
            to: req.body.email,
            subject: 'Reporte de servicio',
            html:`<h4>Su reporte fue creado con éxito el día: ${req.body.fecha} a la hora: ${req.body.hora} y se le dará seguimiento de inmediato con el número de folio: </h4>
            <h1 style="color:#4636bf; text-decoration: underline">${req.body.folio}</h1><br><h3>Este correo fue creado por una solicitud de servicio para equipos vending de automercadeo, si usted no lo solicitó, haga caso omiso.</h3><br><img src="cid:logoautomercadeo.png">`,
            attachments: [{
                filename: 'LOGO_AUTOMERCADEO.png',
                path: `${__dirname}/../../assets/LOGO_AUTOMERCADEO.png`,
                cid:`logoautomercadeo.png`
           }]
        }

        // send mail with defined transport object
        let info = await transporter.sendMail(mailDetails,function(err,data){
            if(err) {
                console.log('Error Occurs', err);
            } else {
                console.log('Email sent successfully');
                res.json({status:true,message:'Correo enviado con éxito a '+mailDetails.to})
            }
        });
    }
}

const reportesController = new ReportesController()
export default reportesController