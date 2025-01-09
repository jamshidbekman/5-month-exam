import mongoose, { Mongoose } from "mongoose";
import borrowModel from "../models/borrow.model.js";
import borrowHistoryModel from "../models/borrowHistory.model.js";
import userModel from "../models/user.model.js";

class UserService {
  constructor() {
    this.borrowModel = borrowModel;
    this.borrowHistoryModel = borrowHistoryModel;
    this.userModel = userModel;
  }
  async getMyBooks(userId) {
    const borrows = await this.borrowModel.aggregate([
      {
        $match: { user: new mongoose.Types.ObjectId(userId) },
      },
      {
        $lookup: {
          localField: "book",
          foreignField: "_id",
          from: "books",
          as: "book",
          pipeline: [
            {
              $lookup: {
                localField: "author",
                foreignField: "_id",
                from: "authors",
                as: "author",
              },
            },
            {
              $lookup: {
                localField: "category",
                foreignField: "_id",
                from: "categories",
                as: "category",
              },
            },
            {
              $project: {
                title: 1,
                author: 1,
                category: 1,
              },
            },
          ],
        },
      },
      {
        $project: {
          book: 1,
          borrowDate: 1,
          returnDate: 1,
        },
      },
      {
        $unwind: "$book",
      },
      {
        $unwind: "$book.author",
      },
      {
        $unwind: "$book.category",
      },
    ]);
    if (borrows.length == 0) {
      throw new Error("Your books not found");
    }
    return borrows;
  }
  async getBorrowBook(bookId, userId) {
    const user = await this.userModel.findById(userId);

    if (user == null) {
      throw new Error("User not found. Please login again.");
    }

    const book = await this.borrowModel.aggregate([
      {
        $match: { book: new mongoose.Types.ObjectId(bookId), user: new mongoose.Types.ObjectId(userId) },
      },
      {
        $lookup: {
          localField: "book",
          foreignField: "_id",
          from: "books",
          as: "book",
          pipeline: [
            {
              $lookup: {
                localField: "author",
                foreignField: "_id",
                from: "authors",
                as: "author",
              },
            },
            {
              $lookup: {
                localField: "category",
                foreignField: "_id",
                from: "categories",
                as: "category",
              },
            },
            {
              $project: {
                title: 1,
                category: 1,
                author: 1,
              },
            },
          ],
        },
      },
      {
        $project: {
          book: 1,
          borrowDate: 1,
          returnDate: 1,
        },
      },
      {
        $unwind: "$book",
      },
      {
        $unwind: "$book.author",
      },
      {
        $unwind: "$book.category",
      },
    ]);

    if (book.length == 0) {
      throw new Error("Book not found");
    }

    return book[0];
  }
  async getBorrowsHistory(userId) {
    const history = await this.borrowHistoryModel.aggregate([
      {
        $match: { user: new mongoose.Types.ObjectId(userId) },
      },
      {
        $lookup: {
          localField: "book",
          foreignField: "_id",
          from: "books",
          as: "book",
          pipeline: [
            {
              $lookup: {
                localField: "author",
                foreignField: "_id",
                from: "authors",
                as: "author",
              },
            },
            {
              $lookup: {
                localField: "category",
                foreignField: "_id",
                from: "categories",
                as: "category",
              },
            },
            {
              $project: {
                title: 1,
                category: 1,
                author: 1,
              },
            },
          ],
        },
      },
      {
        $project: {
          book: 1,
          borrowDate: 1,
          returnDate: 1,
        },
      },
      {
        $unwind: "$book",
      },
      {
        $unwind: "$book.author",
      },
      {
        $unwind: "$book.category",
      },
    ]);

    if (history.length == 0) {
      throw new Error("History not found");
    }

    return history;
  }
}

export default UserService;
