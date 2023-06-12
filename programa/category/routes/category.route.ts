import { Router } from 'express';
import categoryController from '../controllers/category.controller';

class CategoryRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes(): void {
        this.router.get('/', categoryController.list);
        this.router.get('/:id', categoryController.getById);
        this.router.get('/byEnterpriseId/:enterpriseId', categoryController.findByEnterpriseId);
        this.router.get('/byPlatformId/:platformId', categoryController.findByPlatformId);
        this.router.get('/byStatus/:status', categoryController.findByStatus);
        this.router.post('/', categoryController.insert);
        this.router.patch('/:id', categoryController.update);
        this.router.delete('/:id', categoryController.delete);
    }
}

const categoryRoutes = new CategoryRoutes();
export default categoryRoutes.router;
