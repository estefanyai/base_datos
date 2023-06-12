import { Router } from 'express';
import userController from '../controllers/user.controller';

class UserRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes(): void {
        this.router.get('/', userController.list);
        this.router.get('/:id', userController.getById);
        this.router.get('/enterprise/:enterpriseId', userController.findByEnterpriseId);
        this.router.get('/byStatus/:status', userController.findByStatus);
        this.router.post('/', userController.insert);
        this.router.patch('/:id', userController.update);
        this.router.delete('/:id', userController.delete);
    }
}

const userRoutes = new UserRoutes();
userRoutes.routes();

export default userRoutes.router;