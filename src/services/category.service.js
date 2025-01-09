import bookModel from "../models/book.model.js";
import categoryModel from "../models/category.model.js";

class CategoryService {
  constructor() {
    this.bookModel = bookModel;
    this.categoryModel = categoryModel;
  }
  async createCategory({ title }) {
    const createdCategory = await this.categoryModel.create({ title });
    if (createdCategory) {
      return createdCategory;
    } else {
      throw new Error("Something went wrong");
    }
  }
  async getBooksStats() {
    const stats = await this.bookModel.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
          totalCopies: { $sum: "$copies" },
          availableCopies: { $sum: "$availableCopies" },
        },
      },
      {
        $lookup: {
          localField: "_id",
          foreignField: "_id",
          from: "categories",
          as: "category",
        },
      },
      {
        $project: {
          _id: { $arrayElemAt: ["$category.title", 0] },
          count: 1,
          totalCopies: 1,
          availableCopies: 1,
        },
      },
    ]);
    return stats;
  }
}

export default CategoryService;
