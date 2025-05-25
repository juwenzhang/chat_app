import request from "@/libs/request/index";

export const getUserList = async () => {
  return await request.get({
    url: '/message/users',
  })
}

export const getMessageList = async (userId: string) => {
  return await request.get({
    url: `/message/messages/${userId}`,
  })
}