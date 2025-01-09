import CategoryService from "../services/category.service.js";

class CategoryController {
  constructor() {
    this.categoryService = new CategoryService();
  }
  async createCategoryController(req, res) {
    try {
      const body = req.body;
      const data = await this.categoryService.createCategory(body);
      if (data) {
        res.status(201).json({
          message: "Category successfully created",
          success: true,
          category: data,
        });
      }
    } catch (error) {
      res.status(400).json({
        message: error.message,
        success: false,
      });
    }
  }
  async getBooksStats(req, res) {
    try {
      const data = await this.categoryService.getBooksStats();
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
}
export default CategoryController;
