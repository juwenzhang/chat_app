import MessageModel from "../models/message.model.js";
import UserModel from "../models/user.model.js";
import cloudinary from "../libs/cloudinary.lib.js";

export const getUsersForSideBar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await UserModel.find({
      _id: { $ne: loggedInUserId }
    }).select("-password");  // do not contain password in response result
    res.status(200).json({ users: filteredUsers });
  } catch (error) {
    console.log("get users for sidebar error: ", error.message || "internal server error")
    return res.status(500).json({ message: "internal server error" });
  }
}

export const getMessagesForUser = async (req, res) => {
  try {
    const { userId: userToChatId } = req.params
    const senderId = req.user._id;

    // console.log(userToChatId, senderId)

    const messages = await MessageModel.find({
      $or: [
        { senderId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: senderId }
      ]
    })
    res.status(200).json({ messages });
  } catch (error) {
    console.log("get messages for user error: ", error.message || "internal server error")
    return res.status(500).json({ message: "internal server error" });
  }
}

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { userId: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl = "";
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image)
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new MessageModel({ 
      senderId, 
      receiverId, 
      text, 
      image: imageUrl 
    });
    await newMessage.save();

    res.status(201).json({ message: "message sent successfully", newMessage });
  } catch (error) {
    console.log("send message error: ", error.message || "internal server error")
    return res.status(500).json({ message: "internal server error" });
  }
}