import express from 'express';
import * as dotenv from "dotenv";
import errorHandler from './shared/middlewares/error.middleware';
import Database from './shared/services/mongoose.service';

// routes
import enterpriseRoutes from './enterprise/routes/enterprise.route';
import platformRoutes from './platform/routes/platform.route';
import userRoutes from './user/routes/user.route';
import sectionRoutes from './section/routes/section.route';
import categoryRoutes from './category/routes/category.route';
import articleRoutes from './article/routes/article.route';


class Server {
    public app: express.Application
    public port = 3000;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config() {
        dotenv.config();
        this.app.set('port', process.env.PORT || this.port);
        this.initCors();
        this.app.use(express.json());
        const mongoDb = new Database();
        mongoDb.startConnection();
    }

    private initCors() {
        this.app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range, enterpriseId, userId');
            if (req.method === 'OPTIONS') {
                return res.sendStatus(200);
            } else {
                return next();
            }
        });
    }

    public routes(): void {
        express.Router();
        this.app.use('/enterprise', enterpriseRoutes);
        this.app.use('/platform', platformRoutes);
        this.app.use('/user', userRoutes);
        this.app.use('/section', sectionRoutes);
        this.app.use('/category', categoryRoutes);
        this.app.use('/article', articleRoutes);
        this.app.use(errorHandler)
    }

    startServer() {
        this.app.listen(this.app.get('port'), () => {
            console.log('server running on port : ', this.app.get('port'));
        });
    }
}

const server = new Server();
server.startServer();