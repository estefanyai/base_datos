import { Router } from 'express';
import enterpriseController from '../controllers/enterprise.controller';

class EnterpriseRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes(): void {
        this.router.get('/', enterpriseController.list);
        this.router.get('/:id', enterpriseController.getById);
        this.router.post('/', enterpriseController.insert);
        this.router.patch('/:id', enterpriseController.update);
        this.router.delete('/:id', enterpriseController.delete);
        this.router.get('/byStatus/:status', enterpriseController.findByStatus);
    }
}

const enterpriseRoutes = new EnterpriseRoutes();
enterpriseRoutes.routes();

export default enterpriseRoutes.router;