import { Schema, model } from 'mongoose';

interface ISection {
  enterpriseId: string;
  platformId: string;
  categoryId: string;
  status: boolean,
  name: string;
}

class SectionModel {
  sectionSchema: Schema<ISection> | undefined;
  SectionModel: any;

  constructor() {
    this.defineMongooseSchema();
    this.createMongooseModel();
  }

  private defineMongooseSchema() {
    this.sectionSchema = new Schema<ISection>({
      enterpriseId: { type: String, required: true },
      platformId: { type: String, required: true },
      categoryId: { type: String, required: true },
      name: { type: String, required: true },
      status: { type: Boolean, required: true},
    });
  }

  private createMongooseModel() {
    this.SectionModel = model<ISection>('Section', this.sectionSchema);
  }

  public async list() {
    const sections = await this.SectionModel.find({});
    return sections;
  }

  public async insert(sectionData: ISection) {
    const newSection = new this.SectionModel(sectionData);
    const savedSection = await newSection.save();
    return savedSection;
  }

  public async update(id: string, dataToUpdate: ISection) {
    const updatedSection = await this.SectionModel.findByIdAndUpdate(id, dataToUpdate, { new: true });
    return updatedSection;
  }

  public async delete(id: string) {
    const deletedSection = await this.SectionModel.findByIdAndDelete(id);
    return deletedSection;
  }

  public async getById(id: string) {
    const section = await this.SectionModel.findById(id);
    return section;
  }

  public async findByCategoryId(categoryId: string) {
    const sections = await this.SectionModel.find({ categoryId });
    return sections;
  }

  public async findByPlatformId(platformId: string) {
    const sections = await this.SectionModel.find({ platformId });
    return sections;
  }

  public async findByEnterpriseId(enterpriseId: string) {
    const sections = await this.SectionModel.find({ enterpriseId: enterpriseId });
    return sections;
  }

  public async findByStatus(status: boolean) {
    const sections = await this.SectionModel.find({ status });
    return sections;
  }
}

const sectionModel = new SectionModel();
export default sectionModel;