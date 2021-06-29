import { Router } from 'express'
import problemasComunesController  from '../controllers/problemasComunesController'

class ProblemasComunes {
    public router: Router = Router()

    constructor(){
        this.config()
    }

    config(): void{
        this.router.get('/vending', problemasComunesController.getproblemasvending)
    }
}

const problemasComunes = new ProblemasComunes()
export default problemasComunes.router