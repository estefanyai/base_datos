import { NextFunction } from "connect";
import { Request, Response } from "express";
import categoryModel from '../models/category.model';

class CategoryController {
    constructor() {
    }
    
    public async list(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await categoryModel.list();
            res.status(200).send(response);
        } catch (error) {
            next(error)
        }
    }
    
    public async insert(req: Request, res: Response, next: NextFunction) {
        try {
            const categoryData = req.body;
            const response = await categoryModel.insert(categoryData);
            res.status(201).send(response);
        } catch (error) {
            next(error)
        }
    }
    
    public async update(req: Request, res: Response, next: NextFunction) {
        try {
            const categoryId: string = req.params.id;
            const categoryDataToUpdate = req.body;
            const response = await categoryModel.update(categoryId, categoryDataToUpdate);
            res.status(200).send(response);
        } catch (error) {
            next(error)
        }
    }
    
    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const categoryId: string = req.params.id;
            const response = await categoryModel.delete(categoryId);
            res.status(200).send(response);
        } catch (error) {
            next(error)
        }
    }
    
    public async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const categoryId: string = req.params.id;
            const response = await categoryModel.getById(categoryId);
            res.status(200).send(response);
        } catch (error) {
            next(error)
        }
    }
    
    public async findByEnterpriseId(req: Request, res: Response, next: NextFunction) {
        try {
            const enterpriseId: string = req.params.enterpriseId;
            const response = await categoryModel.findByEnterpriseId(enterpriseId);
            res.status(200).send(response);
        } catch (error) {
            next(error)
        }
    }

    public async findByPlatformId(req: Request, res: Response, next: NextFunction) {
        try {
            const platformId: string = req.params.platformId;
            const response = await categoryModel.findByPlatformId(platformId);
            res.status(200).send(response);
        } catch (error) {
            next(error)
        }
    }

    public async findByStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const { status } = req.params;
            const booleanStatus = status === 'true'; // Convierte el string "true" a true y cualquier otro valor a false
            const categories = await categoryModel.findByStatus(booleanStatus);
            res.status(200).send(categories);
        } catch (error) {
            next(error)
        }
    }
}    

const categoryController = new CategoryController();
export default categoryController;