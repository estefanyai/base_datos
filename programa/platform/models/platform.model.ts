import { Schema, model } from 'mongoose';

interface IPlatform {
  enterpriseId: string;
  name: string;
  status: boolean;
}

class PlatformModel {
    platformSchema: Schema<IPlatform> | undefined;
    PlatformModel: any;

    constructor() {
        this.defineMongooseSchema();
        this.createMongooseModel();
    }

    private defineMongooseSchema(){
        this.platformSchema = new Schema<IPlatform>({
            enterpriseId: { type: String, required: true },
            name: { type: String, required: true },
            status: { type: Boolean, required: true },
          });      
    }

    private createMongooseModel(){
      this.PlatformModel = model<IPlatform>('Platform', this.platformSchema);
    }

    public async list() {
      const platforms = await this.PlatformModel.find({});
      return platforms;
    }

    public async insert(platformData: IPlatform) {
      const newPlatform = new this.PlatformModel(platformData);
      const savedPlatform = await newPlatform.save();
      return savedPlatform;
    }

    public async update(id: string, dataToUpdate: IPlatform) {
      const updatedPlatform = await this.PlatformModel.findByIdAndUpdate(id, dataToUpdate, { new: true });
      return updatedPlatform;
    }

    public async delete(id: string) {
      const deletedPlatform = await this.PlatformModel.findByIdAndDelete(id);
      return deletedPlatform;
    }

    public async getById(id: string) {
      const platform = await this.PlatformModel.findById(id);
      return platform;
    }

    public async findByEnterpriseId(enterpriseId: string) {
      const platforms = await this.PlatformModel.find({ enterpriseId: enterpriseId });
      return platforms;
    }

    public async findByStatus(status: boolean) {
      const platforms = await this.PlatformModel.find({ status });
      return platforms;
    }
}

const platformModel = new PlatformModel();
export default platformModel;