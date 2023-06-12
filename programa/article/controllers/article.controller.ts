import { NextFunction } from "connect";
import { Request, Response } from "express";
import articleModel from '../models/article.model';

class ArticleController {

    constructor() {
    }

    public async list(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await articleModel.list();
            res.status(200).send(response);
        } catch (error) {
            next(error)
        }
    }

    public async insert(req: Request, res: Response, next: NextFunction) {
        try {
            const articleData = req.body;
            const response = await articleModel.insert(articleData);
            res.status(201).send(response);
        } catch (error) {
            next(error)
        }
    }

    public async update(req: Request, res: Response, next: NextFunction) {
        try {
            const articleId: string = req.params.id;
            const articleDataToUpdate = req.body;
            const response = await articleModel.update(articleId, articleDataToUpdate);
            res.status(200).send(response);
        } catch (error) {
            next(error)
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const articleId: string = req.params.id;
            const response = await articleModel.delete(articleId);
            res.status(200).send(response);
        } catch (error) {
            next(error)
        }
    }

    public async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const articleId: string = req.params.id;
            const response = await articleModel.getById(articleId);
            res.status(200).send(response);
        } catch (error) {
            next(error)
        }
    }

    public async findBySectionId(req: Request, res: Response, next: NextFunction) {
        try {
            const sectionId: string = req.params.sectionId;
            const response = await articleModel.findBySectionId(sectionId);
            res.status(200).send(response);
        } catch (error) {
            next(error)
        }
    }

    public async findByPlatformId(req: Request, res: Response, next: NextFunction) {
        try {
            const platformId: string = req.params.platformId;
            const response = await articleModel.findByPlatformId(platformId);
            res.status(200).send(response);
        } catch (error) {
            next(error)
        }
    }

    public async findByEnterpriseId(req: Request, res: Response, next: NextFunction) {
        try {
            const enterpriseId: string = req.params.enterpriseId;
            const response = await articleModel.findByEnterpriseId(enterpriseId);
            res.status(200).send(response);
        } catch (error) {
            next(error)
        }
    }

    public async findByStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const { status } = req.params;
            const booleanStatus = status === 'true'; // Convierte el string "true" a true y cualquier otro valor a false
            const articles = await articleModel.findByStatus(booleanStatus);
            res.status(200).send(articles);
        } catch (error) {
            next(error)
        }
    }
}

const articleController = new ArticleController();
export default articleController;
