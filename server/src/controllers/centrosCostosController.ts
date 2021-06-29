import { Request, Response } from 'express'
import db from '../database'

class CentrosCostosController {
    public async todos(req: Request, res: Response){
        await db.query(`select id,concat(id, ', ', trim(descripcion)) as descripcion from puntos_venta_kiosko where descripcion like ('%HOME%')`, function(err, result, fields){
            if(err) throw err
            res.json(result)
        })
    }
    public async todosvending(req: Request, res: Response){
        await db.query(`select sucursal as descripcion, ciudad as plaza from puntos_venta_vending
        where nombre like ('%Home Depot México, S. de R.L. de C.V.%') group by sucursal, ciudad`, function(err, result, fields){
            if(err) throw err
            res.json(result)
        })
    }
    public async maquinasenpv(req: Request, res: Response){
        await db.query(`select idpuntos_venta_vending as id, tipo_maq from puntos_venta_vending
        where sucursal=?;`,req.body.sucursal, function(err, result, fields){
            if(err) throw err
            res.json(result)
        })
    }
}

const centrosCostosController = new CentrosCostosController()
export default centrosCostosController