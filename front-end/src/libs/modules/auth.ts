import request from "@/libs/request/index";

export const checkAuth = async () => {
  return await request.get({
    url: '/auth/check',
  })
}

export const signUp = async (fullName: string, email: string, password: string) => {
  return await request.post({
    url: '/auth/signup',
    data: { fullName, email, password },
  })
}