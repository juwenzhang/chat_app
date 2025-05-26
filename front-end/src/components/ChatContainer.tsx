import React from'react'
import useChatStore from '@/store/useChatStore';
import { useFetch } from '@/hooks/useFetch';
import AppLoading from '@/components/AppLoading';
import AppError from '@/components/AppError';
import ChatHeader from '@/components/ChatHeader';
import ChatMessage from '@/components/ChatMessage';
import ChatInput from '@/components/ChatInput';
import MessageSkeleton from './MessageSkeleton';

interface ChatContainerProps {
  children?: React.ReactNode;
  theme?: "light" | "dark"
}

const ChatContainer: React.FC<ChatContainerProps> = () => {
  const { message, getMessages, isMessagesLoading, selectUser } = useChatStore()

  const { isLoading, isError} = useFetch(
    "messages/fetch", 
    () => getMessages(selectUser._id), 
  )

  if (isLoading) return <AppLoading/>
  if (isError) return <AppError/>
  if (isMessagesLoading) return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader selectUser={selectUser} />
      <MessageSkeleton />
      <ChatInput />
    </div>
  )
  
  return (
    <React.Fragment>
      <div className='flex-1 flex flex-col overflow-auto'>
        <ChatHeader selectUser={selectUser} />
        <ChatMessage message={message} />
        <ChatInput />
      </div>
    </React.Fragment>
  )
}

export default ChatContainer;