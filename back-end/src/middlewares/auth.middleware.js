import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

export const AuthProtectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;  // get token from cookie
    if (!token) return res.status(401).json({ message: "unauthorized" }); 

    const decoded = jwt.verify(token, process.env.JWT_SECRET);  
    if (!decoded) return res.status(401).json({ message: "unauthorized" });

    const user = await UserModel.findById(decoded.userId).select("-password")
    if (!user) return res.status(401).json({ message: "unauthorized" });

    req.user = user;
    next();
  } catch (error) {
    console.log("auth protect error: ", error.message || "internal server error")
    return res.status(500).json({ message: "internal server error" });
  }
}