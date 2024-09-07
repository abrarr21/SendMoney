import { JWT_SECRET } from "../constant.js";
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({});
  }

  const token = authHeader.split(" ")[1];

  try {
    const verify = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = verify.userId;
    next();
  } catch (error) {
    return res.status(403).json({});
  }
};

export default authMiddleware;
