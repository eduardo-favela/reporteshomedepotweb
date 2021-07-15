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
        await db.query(`select idtienda as id, concat(idtienda, ', ', trim(tienda)) as descripcion, municipio as plaza
         from puntos_venta_vending`, function(err, result, fields){
            if(err) throw err
            res.json(result)
        })
    }
    public async maquinasenpv(req: Request, res: Response){
        await db.query(`select * from tipomaq order by idtipomaq;`,req.body.sucursal, function(err, result, fields){
            if(err) throw err
            res.json(result)
        })
    }
}

const centrosCostosController = new CentrosCostosController()
export default centrosCostosController