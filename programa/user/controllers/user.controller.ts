import { NextFunction } from "connect";
import { Request, Response } from "express";
import userModel from '../models/user.model';
import { encryptPassword, createConfirmationToken } from '../../shared/utils/utils';

class UserController {

    constructor() {
    }

    public async insert(req: Request, res: Response, next: NextFunction) {
        const userData = req.body;
        try {
            userData.password = encryptPassword(userData.password);
            userData.recoverPasswordToken = createConfirmationToken(userData);

            userData.isConfirmed = false;
            const newUser = await userModel.insert(userData);
            
            res.status(201).send(newUser);
        } catch (error) {
            next(error);
        }
    }

    public async list(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await userModel.list();
            res.status(200).send(users);
        } catch (error) {
            next(error)
        }
    }

    public async update(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        const dataToUpdate = req.body;

        try {
            const updatedUser = await userModel.update(id, dataToUpdate);
            res.status(200).send(updatedUser);
        } catch (error) {
            next(error);
        }
    }

    public async getById(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;

        try {
            const user = await userModel.getById(id);
            res.status(200).send(user);
        } catch (error) {
            next(error);
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;

        try {
            const deletedUser = await userModel.delete(id);
            res.status(200).send(deletedUser);
        } catch (error) {
            next(error);
        }
    }

    public async findByEnterpriseId(req: Request, res: Response, next: NextFunction) {
        const enterpriseId = req.params.enterpriseId;

        try {
            const users = await userModel.findByEnterpriseId(enterpriseId);
            res.status(200).send(users);
        } catch (error) {
            next(error);
        }
    }

    public async findByStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const { status } = req.params;
            const booleanStatus = status === 'true'; // Convierte el string "true" a true y cualquier otro valor a false
            const users = await userModel.findByStatus(booleanStatus);
            res.status(200).send(users);
        } catch (error) {
            next(error)
        }
    }
}

const userController = new UserController();
export default userController;
