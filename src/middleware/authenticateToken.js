import jwtService from "../services/jwt.service.js";

function authenticateToken(req, res, next) {
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided.", success: false });
  }

  try {
    const checkToken = new jwtService().checkToken(token);
    req.token = checkToken;
    next();
  } catch (error) {
    return res.status(401).json({
      message: error.message,
      success: false,
    });
  }
}

export default authenticateToken;
