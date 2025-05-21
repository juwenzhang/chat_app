import express from 'express';
import { AuthProtectRoute } from '../middlewares/auth.middleware.js';
import { 
  getUsersForSideBar, 
  getMessagesForUser,
  sendMessage 
} from '../controllers/message.controller.js';

const MessageRouter = express.Router();

MessageRouter.get("/users", AuthProtectRoute, getUsersForSideBar)
MessageRouter.get("/:userId", AuthProtectRoute, getMessagesForUser)
MessageRouter.post("/send/:userId", AuthProtectRoute, sendMessage)

export default MessageRouter;