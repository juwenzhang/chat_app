import request from "@/libs/request/index";

export const checkAuth = async () => {
  return await request.get({
    url: '/auth/check',
  })
}

export const signUp = async (
  fullName: string, 
  email: string, 
  password: string
) => {
  return await request.post({
    url: '/auth/signup',
    data: { fullName, email, password },
  })
}

export const login = async (
  email: string, 
  password: string
) => {
  return await request.post({
    url: '/auth/login',
    data: { email, password },
  })
}

export const logout = async () => {
  return await request.get({
    url: '/auth/logout',
  })
}

export const upLoadProFile = async (
  file: File
) => {
  const formData = new FormData()
  formData.append('profilePic', file)
  return await request.put({
    url: '/auth/upload-profile',
    data: formData,
  })
}