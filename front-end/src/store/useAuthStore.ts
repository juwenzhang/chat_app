import { create } from 'zustand'
import { checkAuth, signUp, login, logout, upLoadProFile } from '@/libs/modules/auth'
import { toast } from 'react-hot-toast'
import { localStorageCache } from '@/utils/settleCache'

interface AuthStateType {
  authUser: any,
  isCheckingAuth: boolean,
  isSignUp: boolean,
  isLoginIn: boolean,
  isUpdatingProfile: boolean,
  onlineUsers: Array<any>,
  changeAuthUser: (authUser: any) => void,
  checkAuth: () => void,
  signup: (fullName: string, email: string, password: string) => any,
  login: (email: string, password: string) => any,
  logout: () => any,
  upLoadProFile: (file: File) => any,
}

export const useAuthStore = create<AuthStateType>((set) => ({
  authUser: localStorageCache.getCache('user') || null,
  isCheckingAuth: true,
  isSignUp: false,
  isLoginIn: false,
  isUpdatingProfile: false,
  onlineUsers: [],

  changeAuthUser: async (authUser: any) => { 
    set({ authUser }) 
    if (localStorageCache.hasCache("user")) {
      localStorageCache.removeCache("user");
    }
    localStorageCache.setCache("user", JSON.stringify(authUser));
  },

  checkAuth: async () => { 
    try {
      const res = await checkAuth()
      if (res.status === "ok") {
        set({ authUser: res })
      } else {
        // debugger
        set({ authUser: null })
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error('Check auth failed' + error.message)
      }
      set({ authUser: null })
    } finally {
      set({ isCheckingAuth: false })
    }
  },

  signup: async (fullName: string, email: string, password: string) => {
    set({ isSignUp: true })
    try {
      const res = await signUp(fullName, email, password)
      console.log("signup successfully")
      if (res.status === "ok") {
        toast.success('Sign up successfully')
      }
      toast.error('Sign up failed')
      return res
    } catch (error) {
      if (error instanceof Error) {
        toast.error('Sign up failed' + error.message)
      }
    } finally {
      set({ isSignUp: false })
    } 
  },

  login: async (email: string, password: string) => {
    try {
      const res = await login(email, password)
      set({ authUser: res })
      set({ isLoginIn: true })
      localStorageCache.setCache('token', res.token)
      localStorageCache.setCache('user', JSON.stringify(res))
      toast.success('Login successfully')
      return res
    } catch (error) {
      if (error instanceof Error) {
        toast.error('Login failed' + error.message)
      }
    } finally {
      set({ isLoginIn: false })
    }
  },

  logout: async () => {
    try {
      const res = await logout()
      toast.success('Logout successfully')
      localStorageCache.removeCache('token')
      localStorageCache.removeCache('user')
      return res
    } catch (error) {
      if (error instanceof Error) {
        toast.error("logout failed" + error.message)
      }
    } finally {
      set({ authUser: null })
      set({ isLoginIn: false })
      set({ isCheckingAuth: false })
      set({ isSignUp: false })
      set({ isUpdatingProfile: false })
    }
  },

  upLoadProFile: async (file: File) => {
    try {
      set({ isUpdatingProfile: true })
      const res = await upLoadProFile(file)
      if (res.status === "ok") {
        toast.success('UpLoad profile successfully')
      }
      return res
    } catch (error) {
      if (error instanceof Error) {
        toast.error('UpLoad profile failed' + error.message)
      }
    } finally {
      set({ isUpdatingProfile: false })
    }
  }
}))