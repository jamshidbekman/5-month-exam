import BorrowService from "../services/borrow.service.js";

class BorrowController {
  constructor() {
    this.borrowService = new BorrowService();
  }
  async createBorrowController(req, res) {
    try {
      const body = req.body;
      const userId = req.token.id;
      const data = await this.borrowService.createBorrow(body, userId);
      res.status(201).json({
        message: "Successfully borrowed",
        success: true,
        data,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
        success: false,
      });
    }
  }
  async returnBorrowController(req, res) {
    try {
      const body = req.body;
      const userId = req.token.id;
      const data = await this.borrowService.returnBorrow(body, userId);
      if (data) {
        res.status(200).json({
          message: "Borrow successfully returned",
          success: true,
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

export default BorrowController;
