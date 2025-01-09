function authorizeRole(requiredRole) {
  return (req, res, next) => {
    const userRole = req.token.role;
    if (userRole !== requiredRole) {
      return res.status(403).json({ message: "Access forbidden: insufficient permissions", success: false });
    }
    next();
  };
}

export default authorizeRole;
