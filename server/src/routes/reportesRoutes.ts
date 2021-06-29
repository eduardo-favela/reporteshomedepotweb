import { Router } from 'express'
import reportesController  from '../controllers/reportesController'

class ReportesRoutes {
    public router: Router = Router()

    constructor(){
        this.config()
    }

    config(): void{
        this.router.post('/registrareporte', reportesController.registrareporte)
        this.router.post('/enviarEmail', reportesController.enviarEmail)
    }
}

const reportesRoutes = new ReportesRoutes()
export default reportesRoutes.router