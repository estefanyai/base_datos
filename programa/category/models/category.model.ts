import { Schema, model } from 'mongoose';

interface ICategory {
  name: string;
  url: string;
  enterpriseId: string;
  platformId: string;
  status: boolean;
}

class CategoryModel {
  private categorySchema: Schema<ICategory> | undefined;
  private CategoryModel: any;

  constructor() {
    this.defineMongooseSchema();
    this.createMongooseModel();
  }

  private defineMongooseSchema(){
    this.categorySchema = new Schema<ICategory>({
      name: { type: String, required: true },
      url: { type: String, required: true },
      enterpriseId: { type: String, required: true },
      platformId: { type: String, required: true },
      status: { type: Boolean, required: true },
    });      
  }

  private createMongooseModel(){
    this.CategoryModel = model<ICategory>('Category', this.categorySchema);
  }

  public async list() {
    const categories = await this.CategoryModel.find({});
    return categories;
  }

  public async insert(categoryData: ICategory) {
    const newCategory = new this.CategoryModel(categoryData);
    const savedCategory = await newCategory.save();
    return savedCategory;
  }

  public async update(id: string, dataToUpdate: ICategory) {
    const updatedCategory = await this.CategoryModel.findByIdAndUpdate(id, dataToUpdate, { new: true });
    return updatedCategory;
  }

  public async delete(id: string) {
    const deletedCategory = await this.CategoryModel.findByIdAndDelete(id);
    return deletedCategory;
  }

  public async getById(id: string) {
    const category = await this.CategoryModel.findById(id);
    return category;
  }

  public async findByEnterpriseId(enterpriseId: string) {
    const categories = await this.CategoryModel.find({ enterpriseId: enterpriseId });
    return categories;
  }

  public async findByStatus(status: boolean) {
    const categories = await this.CategoryModel.find({ status });
    return categories;
  }

  public async findByPlatformId(platformId: string) {
    const articles = await this.CategoryModel.find({ platformId });
    return articles;
  }

}

const categoryModel = new CategoryModel();
export default categoryModel;