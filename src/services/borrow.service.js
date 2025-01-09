import mongoose from "mongoose";
import bookModel from "../models/book.model.js";
import borrowModel from "../models/borrow.model.js";
import borrowHistoryModel from "../models/borrowHistory.model.js";
import userModel from "../models/user.model.js";

class BorrowService {
  constructor() {
    this.borrowModel = borrowModel;
    this.bookModel = bookModel;
    this.borrowHistoryModel = borrowHistoryModel;
    this.userModel = userModel;
  }

  async createBorrow({ book, borrowDate, returnDate }, userId) {
    const findUser = await this.userModel.findById(userId);

    if (findUser == null) throw new Error("User not found. Please login again.");

    const findBorrow = await this.borrowModel.findOne({ book: book, user: userId });

    if (findBorrow) throw new Error("You have already borrowed the book");

    const findBook = await this.bookModel.findById(book);

    if (!findBook) throw new Error("Book not found");

    const copies = findBook.availableCopies;

    if (copies === 0) throw new Error("No copies available for this book at the moment. Please try again late");

    const createdBorrow = await this.borrowModel.create({
      user: userId,
      book,
      borrowDate,
      returnDate,
    });

    await this.bookModel.findByIdAndUpdate(book, { $inc: { availableCopies: -1 } }, { new: true });

    return createdBorrow.populate([
      {
        path: "book",
        select: "title author category",
        populate: [{ path: "author" }, { path: "category" }],
      },
      { path: "user", select: "username" },
    ]);
  }

  async returnBorrow({ book }, userId) {
    const returnBorrow = await this.borrowModel.findOne({
      book,
      user: new mongoose.Types.ObjectId(userId),
    });

    if (!returnBorrow) throw new Error("Borrow not found");

    await this.borrowHistoryModel.create({
      user: returnBorrow.user,
      book: returnBorrow.book,
      borrowDate: returnBorrow.borrowDate,
      returnDate: returnBorrow.returnDate,
    });

    await this.bookModel.findByIdAndUpdate(book, { $inc: { availableCopies: 1 } }, { new: true });

    await this.borrowModel.findByIdAndDelete(returnBorrow._id);

    return returnBorrow;
  }
}

export default BorrowService;
