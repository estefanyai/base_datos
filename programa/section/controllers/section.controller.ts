import { NextFunction } from "connect";
import { Request, Response } from "express";
import sectionModel from '../models/section.model';

class SectionController {

    constructor() {
    }

    public async list(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await sectionModel.list();
            res.status(200).send(response);
        } catch (error) {
            next(error)
        }
    }

    public async insert(req: Request, res: Response, next: NextFunction) {
        try {
            const sectionData = req.body;
            const response = await sectionModel.insert(sectionData);
            res.status(201).send(response);
        } catch (error) {
            next(error)
        }
    }

    public async update(req: Request, res: Response, next: NextFunction) {
        try {
            const sectionId: string = req.params.id;
            const sectionDataToUpdate = req.body;
            const response = await sectionModel.update(sectionId, sectionDataToUpdate);
            res.status(200).send(response);
        } catch (error) {
            next(error)
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const sectionId: string = req.params.id;
            const response = await sectionModel.delete(sectionId);
            res.status(200).send(response);
        } catch (error) {
            next(error)
        }
    }

    public async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const sectionId: string = req.params.id;
            const response = await sectionModel.getById(sectionId);
            res.status(200).send(response);
        } catch (error) {
            next(error)
        }
    }

    public async findByCategoryId(req: Request, res: Response, next: NextFunction) {
        try {
            const categoryId: string = req.params.categoryId;
            const response = await sectionModel.findByCategoryId(categoryId);
            res.status(200).send(response);
        } catch (error) {
            next(error)
        }
    }

    public async findByPlatformId(req: Request, res: Response, next: NextFunction) {
        try {
            const platformId: string = req.params.platformId;
            const response = await sectionModel.findByPlatformId(platformId);
            res.status(200).send(response);
        } catch (error) {
            next(error)
        }
    }

    public async findByEnterpriseId(req: Request, res: Response, next: NextFunction) {
        try {
            const enterpriseId: string = req.params.enterpriseId;
            const response = await sectionModel.findByEnterpriseId(enterpriseId);
            res.status(200).send(response);
        } catch (error) {
            next(error)
        }
    }

    public async findByStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const { status } = req.params;
            const booleanStatus = status === 'true'; // Convierte el string "true" a true y cualquier otro valor a false
            const sections = await sectionModel.findByStatus(booleanStatus);
            res.status(200).send(sections);
        } catch (error) {
            next(error)
        }
    }
}

const sectionController = new SectionController();
export default sectionController;