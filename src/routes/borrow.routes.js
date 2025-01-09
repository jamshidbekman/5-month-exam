import { Router } from "express";
import BorrowController from "../controllers/borrow.controller.js";
import authenticateToken from "../middleware/authenticateToken.js";

const BorrowRouter = Router();

const borrowController = new BorrowController();

BorrowRouter.post("/get-borrow", authenticateToken, (req, res) => borrowController.createBorrowController(req, res));
BorrowRouter.post("/return-borrow", authenticateToken, (req, res) => borrowController.returnBorrowController(req, res));

export default BorrowRouter;
