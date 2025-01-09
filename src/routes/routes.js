import AuthRouter from "./auth.routes.js";
import BookRouter from "./book.routes.js";
import BorrowRouter from "./borrow.routes.js";
import CategoryRouter from "./category.routes.js";
import UserRouter from "./user.routes.js";

const Routes = () => {
  return [AuthRouter, BookRouter, CategoryRouter, BorrowRouter, UserRouter];
};

export default Routes;
