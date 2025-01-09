import mongoose, { Schema } from "mongoose";

const borrowHistorySchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "books",
    },
    borrowDate: {
      type: String,
    },
    returnDate: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

const borrowHistoryModel = mongoose.model("borrows-histories", borrowHistorySchema);

export default borrowHistoryModel;
