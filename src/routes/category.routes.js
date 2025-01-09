import { Router } from "express";
import CategoryController from "../controllers/category.controller.js";
import authenticateToken from "../middleware/authenticateToken.js";
import authorizeRole from "../middleware/authorizeRole.js";

const CategoryRouter = Router();

const categoryController = new CategoryController();

CategoryRouter.post("/category", authenticateToken, authorizeRole("admin"), (req, res) => categoryController.createCategoryController(req, res));
CategoryRouter.get("/books/stats", authenticateToken, (req, res) => categoryController.getBooksStats(req, res));

export default CategoryRouter;
