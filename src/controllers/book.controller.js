import BookService from "../services/book.service.js";

class BookController {
  constructor() {
    this.bookService = new BookService();
  }
  async createAuthorController(req, res) {
    try {
      const body = req.body;
      const data = await this.bookService.createAuthor(body);
      if (data) {
        res.status(201).json({
          message: "Author successfully created",
          success: true,
          author: data
        });
      }
    } catch (error) {
      res.status(400).json({
        message: error.message,
        success: false,
      });
    }
  }
  async createBookController(req, res) {
    try {
      const body = req.body;
      const data = await this.bookService.createBook(body);
      if (data) {
        res.status(201).json({
          message: "Book successfully created",
          success: true,
          book: data,
        });
      }
    } catch (error) {
      res.status(400).json({
        message: error.message,
        success: false,
      });
    }
  }
  async getAllBooks(req, res) {
    try {
      const data = await this.bookService.getAllBooks();
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({
        message: error.message,
        success: false,
      });
    }
  }
}

export default BookController;
