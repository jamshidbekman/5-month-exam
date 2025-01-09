import UserService from "../services/user.service.js";

class UserController {
  constructor() {
    this.userService = new UserService();
  }
  async getMyBooksController(req, res) {
    try {
      const userId = req.token.id;
      const data = await this.userService.getMyBooks(userId);
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({
        message: error.message,
        success: false,
      });
    }
  }
  async getBorrowBookController(req, res) {
    try {
      const userId = req.token.id;
      const { bookId } = req.params;
      const data = await this.userService.getBorrowBook(bookId, userId);
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({
        message: error.message,
        success: false,
      });
    }
  }
  async getBorrowsHistoryController(req, res) {
    try {
      const userId = req.token.id;
      const data = await this.userService.getBorrowsHistory(userId);
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({
        message: error.message,
        success: false,
      });
    }
  }
}

export default UserController;
