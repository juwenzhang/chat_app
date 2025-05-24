import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateToken } from "../libs/utils.lib.js";
import UserModel from "../models/user.model.js";
import cloudinary from "../libs/cloudinary.lib.js";

const __filename = fileURLToPath(import.meta.url);  
const __dirname = path.dirname(__filename); 

export const AuthSignup = async (req, res) => {
  const { fullName, email, password } = req.body;
  console.log("signup req.body: ", req.body)
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "please fill in all fields" });
    }
    // generate hash password, and save it into database
    if (password.length < 6) {
      return res.status(400).json({ message: "password must be at least 6 characters" });
    }
    // get user, if user exist, return error message, if not, create new user
    const user = await UserModel.findOne({ email });  
    if (user) return res.status(400).json({ message: "user already exist" });
    
    // get salt to exec generatoring hash password
    const salt = await bcrypt.genSalt(10);  // 对称加密
    const hashPassword = await bcrypt.hash(password, salt);

    // create new user
    const newUser = new UserModel({ fullName, email, password: hashPassword });
    if (newUser) {
      // generate jwt token to front-end to use
      // const token = generateToken(newUser._id, res);
      await newUser.save();  // save new user to database
      return res.status(201).json({ message: "user created successfully", status: "ok"/*token*/ });  
    }
  } catch (error) {
    console.log("signup error: ", error.message || "internal server error")
    return res.status(500).json({ message: "internal server error", status: "no" });
  }
}

export const AuthLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) return res.status(400).json({ message: "please fill in all fields" });
    
    const user = await UserModel.findOne({ email });  // get user from database
    if (!user) return res.status(400).json({ message: "user not found" });

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ message: "invalid credentials" });
    
    const token = generateToken(user._id, res);
    return res.status(200).json({ 
      message: "login successfully", 
      token,
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic, 
      status: "ok"
    });
  } catch (error) {
    console.log("login error: ", error.message || "internal server error")
    return res.status(500).json({ message: "internal server error", status: "no" });
  }  
}

export const AuthLogout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });  // clear cookie from front-end
    return res.status(200).json({ message: "logout successfully", status: "ok" });
  } catch (error) {
    console.log("logout error: ", error.message || "internal server error")
    return res.status(500).json({ message: "internal server error", status: "no" });  
  }
}

export const AuthUploadProfile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "please upload profile picture" });
    const user_id = req.user._id;
    try {
      console.log('尝试上传到 Cloudinary，使用文件 buffer');
      const uploadResponse = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({
          resource_type: 'auto'
        }, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
        stream.end(req.file.buffer);
      });

      const updateUser = await UserModel.findByIdAndUpdate(
        user_id,
        { profilePic: uploadResponse.secure_url },
        { new: true }
      );
      res.status(200).json({
        message: "profile uploaded successfully",
        profilePic: updateUser.profilePic
      });
    } catch (cloudinaryError) {
      console.log("Cloudinary 上传失败，尝试本地备份: ", cloudinaryError.message);
      const staticDir = path.join(__dirname, '../static/profile_pics');
      if (!fs.existsSync(staticDir)) {
        fs.mkdirSync(staticDir, { recursive: true });
      }
      const backupFileName = `${user_id}_${Date.now()}${path.extname(req.file.originalname)}`;
      const backupFilePath = path.join(staticDir, backupFileName);
      try {
        console.log('尝试本地备份，使用文件 buffer 写入目标文件:', backupFilePath);
        fs.writeFileSync(backupFilePath, req.file.buffer);
        const localUrl = `${staticDir}/${backupFileName}`;
        console.log("本地备份成功: ", localUrl);
        const updateUser = await UserModel.findByIdAndUpdate(
          user_id,
          { profilePic: localUrl },
          { new: true }
        );
        // 移除多余的 save 调用
        res.status(200).json({
          message: "profile 已成功备份到本地静态资源",
          profilePic: updateUser.profilePic
        });
      } catch (backupError) {
        console.log("本地备份失败: ", backupError.message);
        res.status(503).json({ message: "所有存储服务暂时不可用，请稍后重试" });
      }
    }
  } catch (error) {
    console.log("upload profile error: ", error.message || "internal server error")
    return res.status(500).json({ message: "internal server error" });
  }
}

export const AuthCheck = async (req, res) => {
  try {
    res.status(200).json({ message: "check successfully", user: req.user, status: "ok" });
  } catch (error) {
    console.log("check error: ", error.message || "internal server error")
    return res.status(500).json({ message: "internal server error", status: "no" });
  }
}