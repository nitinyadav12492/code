
import jwt from "jsonwebtoken";
import User from "../models/user-model.js";

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized HTTP, token not provided",
    });
  }

  // Remove "Bearer " from token
  const jwtToken = token.replace("Bearer ", "").trim();

  try {
    const JWT_SECRET = process.env.JWT_SECRET || process.env.JWT_SECRET_KEY;
    const isVerified = jwt.verify(jwtToken, JWT_SECRET);

    console.log(isVerified);

    const userData = await User.findOne({
      email: isVerified.email,
    }).select("-password");

    if (!userData) {
      return res.status(401).json({
        message: "Unauthorized, user not found",
      });
    }

    console.log(userData);

    req.user = userData;
    req.token = token;
    req.userId = userData._id;

    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      message: "Unauthorized, invalid token",
    });
  }
};

export default authMiddleware;