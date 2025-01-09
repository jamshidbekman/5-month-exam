import authorModel from "../models/author.model.js";
import bookModel from "../models/book.model.js";
import categoryModel from "../models/category.model.js";
import jwtService from "./jwt.service.js";

class BookService {
  constructor() {
    this.bookModel = bookModel;
    this.jwtService = new jwtService();
    this.authorModel = authorModel;
    this.categoryModel = categoryModel;
  }
  async createAuthor({ name }) {
    const author = await this.authorModel.create({ name });
    if (author) {
      return author;
    } else {
      throw new Error("Some error");
    }
  }
  async createBook(book) {
    const findAuthor = await this.authorModel.findById(book.author);
    if (findAuthor == null) {
      throw new Error("Author not found");
    }
    const findCategory = await this.categoryModel.findById(book.category);
    if (findCategory == null) {
      throw new Error("Category not found");
    }
    const createdBook = await this.bookModel.create({ ...book, availableCopies: book.copies });

    if (createdBook) {
      return await createdBook.populate([{ path: "author" }, { path: "category" }]);
    } else {
      throw new Error("Something went wrong");
    }
  }
  async getAllBooks() {
    const books = await this.bookModel.find().populate([{ path: "author" }, { path: "category" }]);

    if (books.length < 1) {
      throw new Error("Books not found");
    }

    return books;
  }
}

export default BookService;
