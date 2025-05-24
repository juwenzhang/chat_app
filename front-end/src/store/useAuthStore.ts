import { create } from 'zustand'
import { checkAuth, signUp, login, logout } from '@/libs/modules/auth'
import { toast } from 'react-hot-toast'
import { localStorageCache } from '@/utils/settleCache'

interface AuthStateType {
  authUser: null | string,
  isCheckingAuth: boolean,
  isSignUp: boolean,
  isLoginIn: boolean,
  isUpdatingProfile: boolean,
  checkAuth: () => void,
  signup: (fullName: string, email: string, password: string) => any,
  login: (email: string, password: string) => any,
  logout: () => any,
}

export const useAuthStore = create<AuthStateType>((set) => ({
  authUser: localStorageCache.getCache('user') || null,
  isCheckingAuth: true,
  isSignUp: false,
  isLoginIn: false,
  isUpdatingProfile: false,

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
  }
}))