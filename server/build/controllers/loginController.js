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
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = __importDefault(require("../database"));
class LoginController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query(`select * from users where user= ?`, req.body.user, function (err, result, fields) {
                if (err)
                    throw err;
                if (result.length > 0) {
                    bcrypt_1.default.compare(req.body.pass, result[0].pass, function (err, response) {
                        res.json(response);
                    });
                }
                else {
                    res.json(false);
                }
            });
        });
    }
    setUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //ESTE MÉTODO RECIBE UN OBJETO CON DOS PROPIEDADES, UNA LLAMADA user Y OTRA LLAMADA pass
            //CON ESTOS DATOS SE INSERTARÁ UN NUEVO USUARIO EN LA BASE DE DATOS CON UNA CONTRASEÑA ENCRIPTADA
            const saltRounds = 13;
            bcrypt_1.default.hash(req.body.pass, saltRounds, function (err, hash) {
                return __awaiter(this, void 0, void 0, function* () {
                    req.body.pass = hash;
                    yield database_1.default.query(`INSERT INTO users set ?`, req.body, function (err, result, fields) {
                        if (err)
                            throw err;
                        res.json(result);
                    });
                });
            });
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //ESTE MÉTODO RECIBE UN OBJETO CON DOS PROPIEDADES, UNA LLAMADA user Y OTRA LLAMADA pass
            //LA PROPIEDAD pass ES LA NUEVA CONTRASEÑA DEL USUARIO Y LA PROPIERDAD user ES EL USUARIO AL QUE SE
            //LE VA A CAMBIAR LA CONTRASEÑA
            const saltRounds = 13;
            bcrypt_1.default.hash(req.body.pass, saltRounds, function (err, hash) {
                return __awaiter(this, void 0, void 0, function* () {
                    req.body.pass = hash;
                    yield database_1.default.query(`UPDATE users SET pass = ? WHERE user = ?`, [req.body.pass, req.body.user], function (err, result, fields) {
                        if (err)
                            throw err;
                        res.json(result);
                    });
                });
            });
        });
    }
}
const loginController = new LoginController();
exports.default = loginController;
