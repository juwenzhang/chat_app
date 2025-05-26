import React from 'react'
import { useAuthStore } from '@/store/useAuthStore';
import useChatStore from '@/store/useChatStore';
import { X } from 'lucide-react';

interface ChatHeaderProps {
  children?: React.ReactNode;
  theme?: "light" | "dark";
  selectUser: any
}

const ChatHeader: React.FC<ChatHeaderProps> = (props: ChatHeaderProps) => {
  const { selectUser } = props;
  const { onlineUsers } = useAuthStore()
  const { resetAll } = useChatStore()
  const defaultAvatar = new URL('@/assets/img.jpg', import.meta.url).href;
  return (
    <React.Fragment>
      <div className='p-2.5 border-b border-base-300'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            {/* Avatar */}
            <div className='avatar'>
              <div>
                <img 
                  src={selectUser.profilePic || defaultAvatar} 
                  alt={selectUser.fullName} 
                  className='size-10 rounded-full object-cover'
                />
              </div>
            </div>
            {/* user info */}
            <div>
              <h3 className='font-medium'>{ selectUser.fullName }</h3>
              <p className='text-sm text-base-content/70'>
                {onlineUsers.includes(selectUser._id) ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>

          {/* other button */}
          <button 
            onClick={() => resetAll()}
            className='btn btn-sm gap-2 border-none m-2'
            style={{ 
              backgroundColor: 'transparent',
            }}
          >
            <X className='size-5'/>
          </button>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ChatHeader;