const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authBrearer = req.headers["authorization"];
    if (!authBrearer || !authBrearer.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized in MiddleWare" });
    }
    const token = authBrearer.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    return res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = authMiddleware;
