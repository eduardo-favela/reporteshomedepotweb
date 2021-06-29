import { Router } from 'express'
import equiposFallasController  from '../controllers/equiposFallasController'

class EquiposfallasRoutes {
    public router: Router = Router()

    constructor(){
        this.config()
    }

    config(): void{
        this.router.get('/', equiposFallasController.getEquipos)
        this.router.get('/getEstatusReporte', equiposFallasController.getEstatusReporte)
        this.router.post('/getReportesDistrito', equiposFallasController.getReportesDistrito)
        this.router.post('/fallas', equiposFallasController.getFallas)
        this.router.post('/registraReporte', equiposFallasController.registraReporte)
        this.router.post('/registraEquipo', equiposFallasController.registraEquipo)
        this.router.post('/updateEstatusRep', equiposFallasController.updateEstatusRep)
        this.router.post('/registraComentarios', equiposFallasController.registraComentarios)
        this.router.post('/getDetalleReporte', equiposFallasController.getDetalleReporte)
    }
}

const equiposfallasRoutes = new EquiposfallasRoutes()
export default equiposfallasRoutes.router