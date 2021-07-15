"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const nodemailer_1 = __importDefault(require("nodemailer"));
class ReportesController {
    registrareporte(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query(`INSERT INTO reportesvending set ?`, req.body, function (err, result, fields) {
                if (err)
                    throw err;
                res.json(result);
            });
        });
    }
    getreportesvendingFolio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body.folio);
            yield database_1.default.query(`SELECT reportesvending.id, estado_reporte.estado_reporte as estatus, 
        tipomaq.tipomaq, problemascomunes.problema as problema_reportado, 
        date_format(reportesvending.fecha,'%d-%m-%Y %h:%i:%s %p') as fecha, nombre_report as nombre, comentarios
        FROM reportesvending 
        inner join problemascomunes on reportesvending.problema_reportado=problemascomunes.id
        inner join estado_reporte on reportesvending.estatus=estado_reporte.idestado_reporte
        inner join tipomaq on reportesvending.tipomaq=tipomaq.idtipomaq
        where reportesvending.id=?`, req.body.folio, function (err, result, fields) {
                if (err)
                    throw err;
                res.json(result);
            });
        });
    }
    getreportesvending(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body.folio);
            yield database_1.default.query(`SELECT reportesvending.id, estado_reporte.estado_reporte as estatus, 
        tipomaq.tipomaq, problemascomunes.problema as problema_reportado, 
        date_format(reportesvending.fecha,'%d-%m-%Y %h:%i:%s %p') as fecha, nombre_report as nombre, comentarios
        FROM reportesvending 
        inner join problemascomunes on reportesvending.problema_reportado=problemascomunes.id
        inner join estado_reporte on reportesvending.estatus=estado_reporte.idestado_reporte
        inner join tipomaq on reportesvending.tipomaq=tipomaq.idtipomaq
        inner join puntos_venta_vending on reportesvending.puntoventa=puntos_venta_vending.idtienda
        where reportesvending.fecha between ? and ?
        and reportesvending.estatus in (?) and puntos_venta_vending.estado in (?);`, [req.body.fecha1, req.body.fecha2, req.body.estatus, req.body.sucursal], function (err, result, fields) {
                if (err)
                    throw err;
                res.json(result);
            });
        });
    }
    getestatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query(`select idestado_reporte as idestatus,estado_reporte as estatus from estado_reporte order by idestado_reporte;`, req.body, function (err, result, fields) {
                if (err)
                    throw err;
                res.json(result);
            });
        });
    }
    registrahistorial(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query(`INSERT INTO historialreporte_vending set ?`, req.body, function (err, result, fields) {
                if (err)
                    throw err;
                res.json(result);
            });
        });
    }
    enviarEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // create reusable transporter object using the default SMTP transport
            console.log(`${__dirname}/../../assets/LOGO_AUTOMERCADEO.png`);
            let transporter = nodemailer_1.default.createTransport({
                service: 'gmail',
                tls: { rejectUnauthorized: false },
                auth: {
                    user: 'reportesautomercadeo@gmail.com',
                    pass: 'AmKf8er0'
                }
            });
            let mailDetails = {
                from: 'Auto Mercadeo',
                to: req.body.email,
                subject: 'Reporte de servicio',
                html: `<h4>Su reporte fue creado con éxito el día: ${req.body.fecha} a la hora: ${req.body.hora} y se le dará seguimiento de inmediato con el número de folio: </h4>
            <h1 style="color:#4636bf; text-decoration: underline">${req.body.folio}</h1><br><h3>Este correo fue creado por una solicitud de servicio para equipos vending de automercadeo, si usted no lo solicitó, haga caso omiso.</h3><br><img src="cid:logoautomercadeo.png">`,
                attachments: [{
                        filename: 'LOGO_AUTOMERCADEO.png',
                        path: `${__dirname}/../../assets/LOGO_AUTOMERCADEO.png`,
                        cid: `logoautomercadeo.png`
                    }]
            };
            // send mail with defined transport object
            let info = yield transporter.sendMail(mailDetails, function (err, data) {
                if (err) {
                    console.log('Error Occurs', err);
                }
                else {
                    console.log('Email sent successfully from ', mailDetails.from);
                    res.json({ status: true, message: 'Correo enviado con éxito a ' + mailDetails.to });
                }
            });
        });
    }
    enviarEmailinterno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // create reusable transporter object using the default SMTP transport
            console.log(`${__dirname}/../../assets/LOGO_AUTOMERCADEO.png`);
            let transporter = nodemailer_1.default.createTransport({
                service: 'gmail',
                tls: { rejectUnauthorized: false },
                auth: {
                    user: 'reportesautomercadeo@gmail.com',
                    pass: 'AmKf8er0'
                }
            });
            let mailDetails = {
                from: 'Auto Mercadeo',
                to: req.body.email,
                subject: 'Reporte de servicio',
                html: `<h4>Se ha registrado un reporte el día: ${req.body.fecha} a la hora: ${req.body.hora} con el número de folio: </h4>
            <h1 style="color:#4636bf; text-decoration: underline">${req.body.folio}</h1><br>
            <h4>
                Detalles del reporte
            </h4>
            <h4>
                <ul>
                    <li>Folio del reporte: ${req.body.folio}</li>
                    <li>Problema reportado: ${req.body.problema}</li>
                    <li>Persona que reportó el problema: ${req.body.persona}</li>
                    <li>Teléfono de contacto: ${req.body.telefono}</li>
                    <li>Correo de contacto: ${req.body.correo}</li>
                    <li>Comentarios del reporte: ${req.body.comments}</li>
                    <li>Sucursal del reporte: ${req.body.sucursal}</li>
                    <li>Máquina: ${req.body.maq}</li>
                    <li>Ciudad: ${req.body.ciudad}</li>
                </ul>
            </h4>
            <br><img src="cid:logoautomercadeo.png">`,
                attachments: [{
                        filename: 'LOGO_AUTOMERCADEO.png',
                        path: `${__dirname}/../../assets/LOGO_AUTOMERCADEO.png`,
                        cid: `logoautomercadeo.png`
                    }]
            };
            // send mail with defined transport object
            let info = yield transporter.sendMail(mailDetails, function (err, data) {
                if (err) {
                    console.log('Error Occurs', err);
                }
                else {
                    console.log('Email sent successfully from ', mailDetails.from);
                    res.json({ status: true, message: 'Correo enviado con éxito a ' + mailDetails.to });
                }
            });
        });
    }
}
const reportesController = new ReportesController();
exports.default = reportesController;
