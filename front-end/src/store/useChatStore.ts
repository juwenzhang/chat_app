import { create } from "zustand";
import toast from "react-hot-toast";
import { getUserList, getMessageList, sendMessage } from "@/libs/modules/chat";

interface ChatStateType {
  message: Array<any>;
  users: Array<any>;
  selectUser: any;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  getUsers: () => Promise<any>;
  getMessages: (userId: string) => Promise<any>;
  sendMessage: (userId: string, data: any) => Promise<any>;
  setSelectUser: (user: any) => Promise<any>;
  resetAll: () => void;
}

const useChatStore = create<ChatStateType>((set) => ({
  message: [],
  users: [],
  selectUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    try {
      set({ isUsersLoading: true })
      const res = await getUserList()
      if (res.status === "ok") {
        set({ users: res.users })
      } else {
        toast.error(res.message)
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error('获取用户列表失败' + error.message)
      }
    } finally {
      set({ isUsersLoading: false })
    }
  },

  getMessages: async (userId: string) => {
    try {
      set({ isMessagesLoading: true })
      const res = await getMessageList(userId)
      if (res.status === "ok") {
        set({ message: res.messages })
      } else {
        toast.error(res.message)
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error('获取消息列表失败' + error.message)
      }
    } finally {
      set({ isMessagesLoading: false })
    }
  },

  sendMessage: async (userId: string, data: any) => {
    try {
      const res = await sendMessage(userId, data)
      if (res.status === "ok") {
        set((state) => ({ message: [...state.message, res.newMessage] }))
      } else {
        toast.error(res.message)
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error('发送消息失败' + error.message)
      }
    }
  },

  setSelectUser: async (user: any) => {
    try {
      set({ selectUser: user })
      toast.success('请开始聊天吧')
    } catch (error) {
      if (error instanceof Error) {
        toast.error('设置用户失败' + error.message)
      }
    }
  },

  resetAll: () => {
    set({ selectUser: null })
    toast.success('请选择新用户开始聊天吧')
  }
}))

export default useChatStore;