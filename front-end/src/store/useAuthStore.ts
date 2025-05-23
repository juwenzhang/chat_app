import { create } from 'zustand'
import { checkAuth, signUp } from '@/libs/modules/auth'

interface AuthStateType {
  authUser: null | string,
  isCheckingAuth: boolean,
  isSignUp: boolean,
  isLoginIn: boolean,
  isUpdatingProfile: boolean,
  checkAuth: () => void,
  signup: (fullName: string, email: string, password: string) => void,
}

export const useAuthStore = create<AuthStateType>((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSignUp: false,
  isLoginIn: false,
  isUpdatingProfile: false,

  checkAuth: async () => { 
    try {
      // send network request to check auth status
      const res = await checkAuth()
      if (res.code === 200) {
        set({ authUser: res })
      } else {
        set({ authUser: null })
      }
    } catch (error) {
      console.error("error in checkAuth:", error)
      set({ authUser: null })
    } finally {
      set({ isCheckingAuth: false })
    }
  },

  signup: async (fullName: string, email: string, password: string) => {
    try {
      const res = await signUp(fullName, email, password)
      if (res.code === 200) {
        set({ isSignUp: true })
      } else {
        set({ isSignUp: false })
      }
    } catch (error) {
      console.error("error in signup:", error)
    }
  }
}))