import { Request, Response } from 'express'
import db from '../database'
import problemasComunesRoutes from '../routes/problemasComunesRoutes'

class ProblemasComunesController {
    public async getproblemasvending(req: Request, res: Response){
        await db.query(`select * from problemascomunes where tipomaq in ('vending','todas')`, function(err, result, fields){
            if(err) throw err
            res.json(result)
        })
    }
}

const problemasComunesController = new ProblemasComunesController()
export default problemasComunesController