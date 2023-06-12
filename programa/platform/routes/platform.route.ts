import { Router } from 'express';
import platformController from '../controllers/platform.controller';

class PlatformRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes(): void {
        this.router.get('/', platformController.list);
        this.router.get('/:id', platformController.getById);
        this.router.get('/byEnterpriseId/:enterpriseId', platformController.findByEnterpriseId);
        this.router.get('/byStatus/:status', platformController.findByStatus);
        this.router.post('/', platformController.insert);
        this.router.patch('/:id', platformController.update);
        this.router.delete('/:id', platformController.delete);
    }
}

const platformRoutes = new PlatformRoutes();
export default platformRoutes.router;