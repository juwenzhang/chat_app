import React from 'react';

interface MessageSkeletonProps {
  children?: React.ReactNode;
  theme?: "light" | "dark";
}

const MessageSkeleton: React.FC<MessageSkeletonProps> = () => {
  const skeletonMessages = Array.from({ length: 6 }).fill(null);
  return (
    <React.Fragment>
      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        {skeletonMessages.map((_, index) => {
          return (
            <div key={index} className={`chat ${index % 2 === 0 ? "chat-start" : "chat-end"}`}>
              <div className='chat-image avatar'>
                <div className='size-10 rounded-full'>
                  <div className='skeleton w-full h-full rounded-full'></div>
                </div>
              </div>

              <div className='chat-header mb-1'>
                <div className='skeleton h-4 w-6'></div>
              </div>

              <div className='chat-bubble bg-transparent p-0'>
                <div className='skeleton h-16 w-[200px]'></div>
              </div>
            </div>
          )
        })}
      </div>
    </React.Fragment>
  )
}

export default MessageSkeleton;