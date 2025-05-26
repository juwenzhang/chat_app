import request from "@/libs/request/index";

export const getUserList = async () => {
  return await request.get({
    url: '/message/users',
  })
}

export const getMessageList = async (
  userId: string
) => {
  return await request.get({
    url: `/message/${userId}`,
  })
}

export const sendMessage = async (
  userId: string, 
  data: any,
) => {
  return await request.post({
    url: `/message/send/${userId}`,
    data: { ...data },
  })
}