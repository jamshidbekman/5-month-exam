import { Router } from "express";
import BookController from "../controllers/book.controller.js";
import authenticateToken from "../middleware/authenticateToken.js";
import authorizeRole from "../middleware/authorizeRole.js";

const BookRouter = Router();

const bookController = new BookController();

BookRouter.post("/authors", authenticateToken, authorizeRole("admin"), (req, res) => bookController.createAuthorController(req, res));
BookRouter.post("/books", authenticateToken, authorizeRole("admin"), (req, res) => bookController.createBookController(req, res));
BookRouter.get("/books", authenticateToken, (req, res) => bookController.getAllBooks(req, res));

export default BookRouter;
