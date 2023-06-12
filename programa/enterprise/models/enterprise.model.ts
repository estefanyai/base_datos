import { Schema, model } from 'mongoose';

interface IEnterprise {
  name: string;
  status: boolean;
}

class EntepriseModel {
    enterpriseSchema: Schema<IEnterprise> | undefined;
    EnterpriseModel: any;

    constructor() {
        this.defineMongooseSchema();
        this.createMongooseModel();
    }

    private defineMongooseSchema(){
        this.enterpriseSchema = new Schema<IEnterprise>({
            name: { type: String, required: true },
            status: { type: Boolean, required: true},
          });      
    }

    private createMongooseModel(){
      this.EnterpriseModel = model<IEnterprise>('Enterprise', this.enterpriseSchema);
    }

    public async list() {
      const enterprises = await this.EnterpriseModel.find({});
      return enterprises;
    }

    public async insert(enterpriseData: IEnterprise) {
      const newEnterprise = new this.EnterpriseModel(enterpriseData);
      const savedEnterprise = await newEnterprise.save();
      return savedEnterprise;
    }

    public async update(id: string, dataToUpdate: IEnterprise) {
      const updatedEnterprise = await this.EnterpriseModel.findByIdAndUpdate(id, dataToUpdate, { new: true });
      return updatedEnterprise;
    }

    public async delete(id: string) {
      const deletedEnterprise = await this.EnterpriseModel.findByIdAndDelete(id);
      return deletedEnterprise;
    }

    public async getById(id: string) {
      const enterprise = await this.EnterpriseModel.findById(id);
      return enterprise;
    }

    public async findByStatus(status: boolean) {
      const enterprises = await this.EnterpriseModel.find({ status });
      return enterprises;
    }
}

const enterpriseModel = new EntepriseModel();
export default enterpriseModel