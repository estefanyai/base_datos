import { NextFunction } from "connect";
import { Request, Response } from "express";
import platformModel from '../models/platform.model';

class PlatformController {

    constructor() {
    }

    public async list(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await platformModel.list();
            res.status(200).send(response);
        } catch (error) {
            next(error)
        }
    }

    public async insert(req: Request, res: Response, next: NextFunction) {
        try {
            const platformData = req.body;
            const response = await platformModel.insert(platformData);
            res.status(201).send(response);
        } catch (error) {
            next(error)
        }
    }

    public async update(req: Request, res: Response, next: NextFunction) {
        try {
            const platformId: string = req.params.id;
            const platformDataToUpdate = req.body;
            const response = await platformModel.update(platformId, platformDataToUpdate);
            res.status(200).send(response);
        } catch (error) {
            next(error)
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const platformId: string = req.params.id;
            const response = await platformModel.delete(platformId);
            res.status(200).send(response);
        } catch (error) {
            next(error)
        }
    }

    public async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const platformId: string = req.params.id;
            const response = await platformModel.getById(platformId);
            res.status(200).send(response);
        } catch (error) {
            next(error)
        }
    }

    public async findByEnterpriseId(req: Request, res: Response, next: NextFunction) {
        try {
            const enterpriseId: string = req.params.enterpriseId;
            const response = await platformModel.findByEnterpriseId(enterpriseId);
            res.status(200).send(response);
        } catch (error) {
            next(error)
        }
    }

    public async findByStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const { status } = req.params;
            const booleanStatus = status === 'true'; // Convierte el string "true" a true y cualquier otro valor a false
            const platforms = await platformModel.findByStatus(booleanStatus);
            res.status(200).send(platforms);
        } catch (error) {
            next(error)
        }
    }
}

const platformController = new PlatformController();
export default platformController;