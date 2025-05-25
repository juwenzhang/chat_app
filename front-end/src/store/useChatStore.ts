import { create } from "zustand";
import toast from "react-hot-toast";
import { getUserList, getMessageList } from "@/libs/modules/chat";

interface ChatStateType {
  message: Array<any>;
  users: Array<any>;
  selectUser: any;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  getUsers: () => Promise<any>;
  getMessages: (userId: string) => Promise<any>;
  setSelectUser: (user: any) => Promise<any>;
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

  setSelectUser: async (user: any) => {
    try {
      set({ selectUser: user })
      toast.success('设置用户成功')
    } catch (error) {
      if (error instanceof Error) {
        toast.error('设置用户失败' + error.message)
      }
    }
  }
}))

export default useChatStore;