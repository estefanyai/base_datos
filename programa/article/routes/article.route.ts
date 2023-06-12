import { Router } from 'express';
import articleController from '../controllers/article.controller';

class ArticleRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes(): void {
        this.router.get('/', articleController.list);
        this.router.get('/:id', articleController.getById);
        this.router.get('/bySectionId/:sectionId', articleController.findBySectionId);
        this.router.get('/byEnterpriseId/:enterpriseId', articleController.findByEnterpriseId);
        this.router.get('/byPlatformId/:platformId', articleController.findByPlatformId);
        this.router.post('/', articleController.insert);
        this.router.patch('/:id', articleController.update);
        this.router.delete('/:id', articleController.delete);
        this.router.get('/byStatus/:status', articleController.findByStatus);
    }
}

const articleRoutes = new ArticleRoutes();
export default articleRoutes.router;