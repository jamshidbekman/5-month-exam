import jwt from "jsonwebtoken";
class jwtService {
  constructor() {}
  generateToken(data) {
    const key = process.env.JWT_SECRET_KEY;
    const token = jwt.sign(data, key, {
      expiresIn: "1h",
    });
    return token;
  }
  checkToken(token) {
    const key = process.env.JWT_SECRET_KEY;
    try {
      const checkToken = jwt.verify(token, key);
      return checkToken;
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        throw new Error("Token expired. Please login again.");
      } else if (error.name === "JsonWebTokenError") {
        throw new Error("Invalid token. Access denied.");
      } else {
        throw new Error("Token error. Please try again.");
      }
    }
  }
}

export default jwtService;
