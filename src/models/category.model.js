import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
  {
    title: {
      type: String,
      minLength: 4,
      maxLength: 20,
      required: [true, "Kategoriya nomi kiritilishi shart"],
    },
  },
  {
    versionKey: false,
  }
);

const categoryModel = mongoose.model("categories", categorySchema);

export default categoryModel;
