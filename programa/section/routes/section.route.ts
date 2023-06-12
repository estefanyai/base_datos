import { Router } from 'express';
import sectionController from '../controllers/section.controller';

class SectionRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes(): void {
        this.router.get('/', sectionController.list);
        this.router.get('/:id', sectionController.getById);
        this.router.get('/byPlatformId/:platformId', sectionController.findByPlatformId);
        this.router.get('/byEnterpriseId/:enterpriseId', sectionController.findByEnterpriseId);
        this.router.get('/byCategoryId/:categoryId', sectionController.findByCategoryId);
        this.router.post('/', sectionController.insert);
        this.router.patch('/:id', sectionController.update);
        this.router.delete('/:id', sectionController.delete);
        this.router.get('/byStatus/:status', sectionController.findByStatus);
    }
}

const sectionRoutes = new SectionRoutes();
export default sectionRoutes.router;
