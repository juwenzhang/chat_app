import express from 'express';
import { AuthProtectRoute } from '../middlewares/auth.middleware.js';
import { 
  getUsersForSideBar, 
  getMessagesForUser,
  sendMessage 
} from '../controllers/message.controller.js';
import bodyParser from 'body-parser';

const MessageRouter = express.Router();
MessageRouter.use(bodyParser.json({ limit: '500mb' }));
MessageRouter.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));

MessageRouter.get("/users", AuthProtectRoute, getUsersForSideBar)
MessageRouter.get("/:userId", AuthProtectRoute, getMessagesForUser)
MessageRouter.post("/send/:userId", AuthProtectRoute, sendMessage)

export default MessageRouter;