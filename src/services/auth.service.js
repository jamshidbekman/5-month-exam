import Joi from "joi";
import bcrypt from "bcrypt";
import userModel from "../models/user.model.js";
import jwtService from "./jwt.service.js";

class AuthService {
  constructor() {
    this.userModel = userModel;
    this.jwtService = new jwtService();
  }
  async register(body) {
    const validateUser = Joi.object({
      username: Joi.string().min(5).max(15).required(),
      password: Joi.string().min(8).max(20).required(),
      role: Joi.string(),
    });

    const { error } = validateUser.validate(body);

    if (error) {
      throw new Error(error.message);
    }

    const foundUser = await this.userModel.findOne({ username: body.username });

    if (foundUser !== null) {
      throw new Error("username already been existed");
    }

    const hashedPassword = await bcrypt.hash(body.password, 12);

    const user = await this.userModel.create({ ...body, password: hashedPassword });

    const token = this.jwtService.generateToken({ id: user._id, role: user.role });

    return token;
  }
  async login({ username, password }) {
    const user = await this.userModel.findOne({ username: username });

    if (user == null) {
      throw new Error("username or password wrong");
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      throw new Error("username or password wrong");
    }

    const token = this.jwtService.generateToken({ id: user._id, role: user.role });

    return token;
  }
}

export default AuthService;
