import mongoose, { Schema } from "mongoose";

const authorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: [5, "Minimum 5 characters"],
      maxLength: [25, "Maximum 20 characters"],
    },
    birthYear: {
      type: Number,
    },
    description: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

const authorModel = mongoose.model("authors", authorSchema);

export default authorModel;
