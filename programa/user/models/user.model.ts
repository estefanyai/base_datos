import { Schema, model } from 'mongoose';

interface IUser {
  enterpriseId: string;
  name: string;
  lastName: string;
  rut: string;
  email: string;
  phone: string;
  password: string;
  recoverPasswordToken: string;
  isConfirmed: boolean;
  status: boolean;
}

class UserModel {
  userSchema: Schema<IUser> | undefined;
  UserModel: any;

  constructor() {
    this.defineMongooseSchema();
    this.createMongooseModel();
  }

  private defineMongooseSchema() {
    this.userSchema = new Schema<IUser>({
      enterpriseId: { type: String, required: true },
      name: { type: String, required: true },
      lastName: { type: String, required: true },
      rut: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      recoverPasswordToken: { type: String, required: false },
      isConfirmed: { type: Boolean, required: true },
      status: { type: Boolean, required: true },
    });
  }

  private createMongooseModel() {
    this.UserModel = model<IUser>('User', this.userSchema);
  }

  public async list() {
    const users = await this.UserModel.find({});
    return users;
  }

  public async insert(userData: IUser) {
    const newUser = new this.UserModel(userData);

    const savedUser = await newUser.save();
    return savedUser;
  }

  public async update(id: string, dataToUpdate: IUser) {
    const updatedUser = await this.UserModel.findByIdAndUpdate(id, dataToUpdate, { new: true });
    return updatedUser;
  }

  public async delete(id: string) {
    const deletedUser = await this.UserModel.findByIdAndDelete(id);
    return deletedUser;
  }

  public async getById(id: string) {
    const user = await this.UserModel.findById(id);
    return user;
  }

  public async findByEnterpriseId(enterpriseId: string) {
    const users = await this.UserModel.find({ enterpriseId: enterpriseId });
    return users;
  }

  public async findByStatus(status: boolean) {
    const users = await this.UserModel.find({ status });
    return users;
  }
}

const userModel = new UserModel();
export default userModel;