import AuthService from "../services/auth.service.js";

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }
  async registerController(req, res) {
    try {
      const body = req.body;
      const data = await this.authService.register(body);
      if (data) {
        res.status(201).json({
          message: "Successfully registered",
          success: true,
          token: data,
        });
      }
    } catch (error) {
      res.status(400).json({
        message: error.message,
        success: false,
      });
    }
  }
  async loginController(req, res) {
    try {
      const body = req.body;
      const data = await this.authService.login(body);
      if (data) {
        res.status(200).json({
          message: "Successfully logined",
          success: true,
          token: data,
        });
      }
    } catch (error) {
      res.status(400).json({
        message: error.message,
        success: false,
      });
    }
  }
}

export default AuthController;
