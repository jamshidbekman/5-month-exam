import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/database.js";
import Routes from "./routes/routes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api", ...Routes());

const PORT = process.env.PORT || 3000;

const bootstrap = async () => {
  try {
    await connectDB();
    console.log("db connected");
    app.listen(PORT, () => {
      console.log("server is running port", PORT);
    });
  } catch (error) {
    console.error(error.message);
  }
};

bootstrap();
