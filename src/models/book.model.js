import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Kitob nomi kiritilishi shart."],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "authors",
      required: [true, "Avtor kiritilishi shart."],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
      required: [true, "Kategoriya kiritilishi shart."],
    },
    copies: {
      type: Number,
      default: 1,
    },
    availableCopies: {
      type: Number,
    },
  },
  {
    versionKey: false,
  }
);

const bookModel = mongoose.model("books", bookSchema);

export default bookModel;
