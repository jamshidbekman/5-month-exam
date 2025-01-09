import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import authenticateToken from "../middleware/authenticateToken.js";
import authorizeRole from "../middleware/authorizeRole.js";

const UserRouter = Router();

const userController = new UserController();

UserRouter.get("/my-books", authenticateToken, authorizeRole("user"), (req, res) => userController.getMyBooksController(req, res));
UserRouter.get("/borrow/:bookId", authenticateToken, authorizeRole("user"), (req, res) => userController.getBorrowBookController(req, res));
UserRouter.get("/borrows-history", authenticateToken, authorizeRole("user"), (req, res) => userController.getBorrowsHistoryController(req, res));

export default UserRouter;
