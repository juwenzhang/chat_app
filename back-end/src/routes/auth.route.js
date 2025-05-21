import express from 'express';
import multer from 'multer';
import { 
  AuthSignup, 
  AuthLogin, 
  AuthLogout, 
  AuthUploadProfile, 
  AuthCheck 
} from '../controllers/auth.controller.js';
import { AuthProtectRoute } from '../middlewares/auth.middleware.js';

const AuthRouter = express.Router();
const upload = multer()

AuthRouter.post("/signup", AuthSignup);
AuthRouter.post("/login", AuthLogin);
AuthRouter.get("/logout", AuthLogout)
AuthRouter.put("/upload-profile", 
  AuthProtectRoute, 
  upload.single('profilePic'), 
  AuthUploadProfile
)
AuthRouter.get("/check", AuthProtectRoute, AuthCheck)

export default AuthRouter;