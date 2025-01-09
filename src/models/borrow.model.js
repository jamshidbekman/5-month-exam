import mongoose, { Schema } from "mongoose";

const borrowSchema = new Schema(
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
      default: Date.now,
    },
    returnDate: {
      type: String,
      required: [true, "Qaytarish vaqti kiritlishi shart"],
    },
  },
  {
    versionKey: false,
  }
);

const borrowModel = mongoose.model("borrows", borrowSchema);

export default borrowModel;
