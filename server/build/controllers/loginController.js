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
const path = require('path');
class LoginController {
    getuser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /*         console.log(req.body.idUsuario)
                    console.log(req.body.password) */
            yield (yield database_1.default).query(`SELECT * FROM usuarios WHERE idUsuario= '${req.body.idUsuario}' and pass='${req.body.password}'`, function (err, result, fields) {
                if (err)
                    throw console.error(err);
                else {
                    /* console.log(result[0].empleados_numEmpleado) */
                    res = res.json(result[0]);
                }
            });
        });
    }
    getUserInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log(req.body)
            yield (yield database_1.default).query(`SELECT idUsuario, em.nombreEmpleado  as nombre, puestos.puesto,
        ifnull(concat(autos.marca,' ',autos.descripcion ,' ',autos.modelo),'na') as automovil,
        dis.distrito, dis.idDistrito as distritonum, reg.region, reg.idregion as regionnum, em.foto, em.descripcion as pventa FROM usuarios 
        right join empleados as em on usuarios.empleados_numEmpleado=em.numEmp
        inner join puestos on em.puesto=puestos.idpuesto
        left join autos on autos.empleados_numEmp=em.numEmp
        inner join distritos as dis on em.distritos_idDistrito=dis.idDistrito        
        inner join regiones as reg on em.regiones_idregion=reg.idregion
        WHERE em.numEmp=?`, [req.body.empleados_numEmpleado], function (err, result, fields) {
                if (err)
                    throw console.error(err);
                /*             else{
                                res=res.json(result[0])
                            } */
                //console.log(result)
                /* result[0].foto=`${__dirname}\\..\\..\\src\\files\\fotosEmpleados\\${result[0].foto}`
                result[0].foto=path.normalize(result[0].foto) */
                res.json(result[0]);
            });
        });
    }
}
const loginController = new LoginController();
exports.default = loginController;
