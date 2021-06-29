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
class CentrosCostosController {
    todos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query(`select id,concat(id, ', ', trim(descripcion)) as descripcion from puntos_venta_kiosko where descripcion like ('%HOME%')`, function (err, result, fields) {
                if (err)
                    throw err;
                res.json(result);
            });
        });
    }
    todosvending(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query(`select sucursal as descripcion, ciudad as plaza from puntos_venta_vending
        where nombre like ('%Home Depot México, S. de R.L. de C.V.%') group by sucursal, ciudad`, function (err, result, fields) {
                if (err)
                    throw err;
                res.json(result);
            });
        });
    }
    maquinasenpv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query(`select idpuntos_venta_vending as id, tipo_maq from puntos_venta_vending
        where sucursal=?;`, req.body.sucursal, function (err, result, fields) {
                if (err)
                    throw err;
                res.json(result);
            });
        });
    }
}
const centrosCostosController = new CentrosCostosController();
exports.default = centrosCostosController;
