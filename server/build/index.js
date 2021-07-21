"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const centrosCostosRoutes_1 = __importDefault(require("./routes/centrosCostosRoutes"));
const body_parser_1 = __importDefault(require("body-parser"));
const equiposfallasRoutes_1 = __importDefault(require("./routes/equiposfallasRoutes"));
const problemasComunesRoutes_1 = __importDefault(require("./routes/problemasComunesRoutes"));
const reportesRoutes_1 = __importDefault(require("./routes/reportesRoutes"));
const loginRoutes_1 = __importDefault(require("./routes/loginRoutes"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json({ limit: '50mb' }));
        this.app.use(express_1.default.urlencoded({ limit: '50mb', extended: true }));
        this.app.use(body_parser_1.default.json({ limit: '50mb' }));
        this.app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true }));
    }
    routes() {
        this.app.use('/api/centrosCostos', centrosCostosRoutes_1.default);
        this.app.use('/api/equipos', equiposfallasRoutes_1.default);
        this.app.use('/api/problemas', problemasComunesRoutes_1.default);
        this.app.use('/api/reportes', reportesRoutes_1.default);
        this.app.use('/api/login', loginRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
