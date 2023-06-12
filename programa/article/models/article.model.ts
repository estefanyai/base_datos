import { Schema, model } from 'mongoose';

interface IArticle {
  title: string;
  description: string;
  sectionId: string;
  enterpriseId: string;
  platformId: string;
  status: boolean;
}

class ArticleModel {
  articleSchema: Schema<IArticle> | undefined;
  ArticleModel: any;

  constructor() {
    this.defineMongooseSchema();
    this.createMongooseModel();
  }

  private defineMongooseSchema() {
    this.articleSchema = new Schema<IArticle>({
      title: { type: String, required: true },
      description: { type: String, required: true },
      sectionId: { type: String, required: true },
      enterpriseId: { type: String, required: true },
      platformId: { type: String, required: true },
      status: { type: Boolean, required: true },
    });
  }

  private createMongooseModel() {
    this.ArticleModel = model<IArticle>('Article', this.articleSchema);
  }

  public async list() {
    const articles = await this.ArticleModel.find({});
    return articles;
  }

  public async insert(articleData: IArticle) {
    const newArticle = new this.ArticleModel(articleData);
    const savedArticle = await newArticle.save();
    return savedArticle;
  }

  public async update(id: string, dataToUpdate: IArticle) {
    const updatedArticle = await this.ArticleModel.findByIdAndUpdate(id, dataToUpdate, { new: true });
    return updatedArticle;
  }

  public async delete(id: string) {
    const deletedArticle = await this.ArticleModel.findByIdAndDelete(id);
    return deletedArticle;
  }

  public async getById(id: string) {
    const article = await this.ArticleModel.findById(id);
    return article;
  }

  public async findBySectionId(sectionId: string) {
    const articles = await this.ArticleModel.find({ sectionId });
    return articles;
  }

  public async findByPlatformId(platformId: string) {
    const articles = await this.ArticleModel.find({ platformId });
    return articles;
  }

  public async findByEnterpriseId(enterpriseId: string) {
    const articles = await this.ArticleModel.find({ enterpriseId: enterpriseId });
    return articles;
  }

  public async findByStatus(status: boolean) {
    const articles = await this.ArticleModel.find({ status });
    return articles;
  }
}

const articleModel = new ArticleModel();
export default articleModel;