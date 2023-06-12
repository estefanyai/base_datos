import { NextFunction } from "connect";
import { Request, Response } from "express";
import enterpriseModel from '../models/enterprise.model';

class EntepriseController {

  constructor() {
  }

  public async insert(req: Request, res: Response, next: NextFunction) {
    const enterpriseData = req.body;

    try {
      const newEnterprise = await enterpriseModel.insert(enterpriseData);
      res.status(201).send(newEnterprise);
    } catch (error) {
      next(error);
    }
  }

  public async list(req: Request, res: Response, next: NextFunction) {
    try {
      const enterprises = await enterpriseModel.list();
      res.status(200).send(enterprises);
    } catch (error) {
      next(error)
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const dataToUpdate = req.body;

    try {
      const updatedEnterprise = await enterpriseModel.update(id, dataToUpdate);
      res.status(200).send(updatedEnterprise);
    } catch (error) {
      next(error);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    try {
      const enterprise = await enterpriseModel.getById(id);
      res.status(200).send(enterprise);
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    try {
      const deletedEnterprise = await enterpriseModel.delete(id);
      res.status(200).send(deletedEnterprise);
    } catch (error) {
      next(error);
    }
  }

  public async findByStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { status } = req.params;
      const booleanStatus = status === 'true'; // Convierte el string "true" a true y cualquier otro valor a false
      const enterprises = await enterpriseModel.findByStatus(booleanStatus);
      res.status(200).send(enterprises);
    } catch (error) {
      next(error)
    }
  }
}

const enterpriseController = new EntepriseController();
export default enterpriseController