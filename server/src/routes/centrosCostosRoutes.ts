import { Router } from 'express'
import centrosCostosController from  '../controllers/centrosCostosController'

class CentrosCostosRoutes{
    public router: Router = Router()

    constructor(){
        this.config()
    }

    config(): void{
        this.router.get('/todos', centrosCostosController.todos)
        this.router.get('/todosvending',centrosCostosController.todosvending)
        this.router.get('/tiposmaqpv',centrosCostosController.maquinasenpv)
    }
}

const centrosCostosRoutes = new CentrosCostosRoutes()
export default centrosCostosRoutes.router   