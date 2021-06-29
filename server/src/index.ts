import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import centrosCostosRoutes from './routes/centrosCostosRoutes';
import bodyParser from 'body-parser';
import equiposfallasRoutes from './routes/equiposfallasRoutes';
import problemasComunesRoutes from './routes/problemasComunesRoutes';
import reportesRoutes from './routes/reportesRoutes';

class Server {

    public app: Application

    constructor(){
        this.app = express()
        this.config()
        this.routes()
    }
    config(): void{
        this.app.set('port', process.env.PORT || 3000)
        this.app.use(morgan('dev'))
        this.app.use(cors())
        this.app.use(express.json({limit: '50mb'}))
        this.app.use(express.urlencoded({limit: '50mb', extended: true}))
        this.app.use(bodyParser.json({limit: '50mb'}))
        this.app.use(bodyParser.urlencoded({limit: '50mb',extended: true}))
    }
    routes(): void{
        this.app.use('/api/centrosCostos', centrosCostosRoutes)
        this.app.use('/api/equipos', equiposfallasRoutes)
        this.app.use('/api/problemas', problemasComunesRoutes)
        this.app.use('/api/reportes', reportesRoutes)
    }
    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'))
        })
        
    }

}

const server = new Server()
server.start()