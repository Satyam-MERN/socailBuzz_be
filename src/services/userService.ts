import { Service } from "typedi";
import { UserModel } from "../models/userModel";
import { BadRequestError, ServerError } from "../utilities/httpError";
@Service()
export class UserService {
  constructor() {}
  async createUser(userData: any) {
    try {
      const user = new UserModel(userData);
      const savedUser = await user.save();
      return savedUser;
    } catch (error: any) {
      throw new ServerError(`Error creating user: ${error.message}`);
    }
  }
}
