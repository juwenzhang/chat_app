import React from 'react'

interface ChatMessageProps {
  children?: React.ReactNode;
  theme?: "light" | "dark";
  message: any
}

const ChatMessage: React.FC<ChatMessageProps> = (props: ChatMessageProps) => {
  const { message } = props;
  return (
    <React.Fragment>
      hello world 
    </React.Fragment>
  )
}

export default ChatMessage;