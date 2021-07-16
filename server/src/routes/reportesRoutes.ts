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
        this.router.post('/enviarEmailinterno', reportesController.enviarEmailinterno)
        this.router.post('/registrahistorial', reportesController.registrahistorial)
        this.router.post('/getreportefolio', reportesController.getreportesvendingFolio)
        this.router.post('/getreportesvending', reportesController.getreportesvending)
        this.router.post('/getdetallereporte', reportesController.getdetallereporte)
        this.router.get('/getestatus', reportesController.getestatus)
    }
}

const reportesRoutes = new ReportesRoutes()
export default reportesRoutes.router