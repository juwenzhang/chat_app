import React from 'react';
import useChatStore from '@/store/useChatStore';
import SideBarSkeletons from '@/components/SideBarSkeletons';
import { User } from 'lucide-react';
import AppError from '@/components/AppError';
import { useFetch } from '@/hooks/useFetch';
import { leftSideBackgroundStyle } from '@/constants/theme';
import { localStorageCache } from '@/utils/settleCache';

interface SideBarProps {
  children?: React.ReactNode;
  theme: "light" | "dark";
}

const SideBar: React.FC<SideBarProps> = (props: SideBarProps) => {
  const { theme } = props;
  const { users, selectUser, getUsers } = useChatStore();
  const { isLoading, isError } = useFetch(
    'chat/users', 
    () => getUsers(), 
    { staleTime: 0 }
  );
  const defaultAvatar = new URL("@/assets/img.jpg", import.meta.url).href;
  const onlineUsers: Array<any> = localStorageCache.getCache("onlineUsers") || [];

  const scrollbarHiddenStyle: {
    overflowY: 'auto';
    scrollbarWidth: 'none'; // 适用于 Firefox
    '-ms-overflow-style': 'none'; // 适用于 IE 和 Edge
    WebkitScrollbar?: { display: 'none' }; // 适用于 Chrome, Safari 和 Opera
  } = {
    overflowY: 'auto',
    scrollbarWidth: 'none', // 适用于 Firefox
    '-ms-overflow-style': 'none', // 适用于 IE 和 Edge
  };
  scrollbarHiddenStyle['WebkitScrollbar'] = {
    display: 'none', // 适用于 Chrome, Safari 和 Opera
  };

  if (isLoading) return <SideBarSkeletons />;
  if (isError) return <AppError />;

  return (
    <React.Fragment>
      <aside 
        className='h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200'
        style={{
          borderRight: '1px solid rgb(7, 8, 8)',
          boxSizing: 'border-box', 
        }}
      > 
        <div className='border-b border-base-300 w-full p-5'>
          <div className='flex items-center gap-2'>
            <User className='size-6'/>
            <span className='font-medium'>Contacts</span>
          </div>
          {/* show online user */}
        </div>

        <div 
          className='w-full py-3'
          style={scrollbarHiddenStyle}
        >
          {users && users?.map((user) => {
            return (
              <button
                key={user['_id']}
                className={`
                  w-full p-3 flex items-center gap-3 hover:bg-base-300 cursor-pointer
                  ${selectUser?._id === user._id ? 'bg-base-300 ring-1 ring-base-300' : ''}
                `}
                style={{ backgroundImage: `${leftSideBackgroundStyle[theme]}` }}
              >
                <div className='relative mx-auto lg:mx-0'>
                  <img 
                    src={user.profilePic || defaultAvatar}
                    alt={user.fullName}
                    className='size-10 rounded-full object-cover'
                  />
                  {onlineUsers.includes(user._id) && (
                    <span
                      className='absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900'
                    ></span>
                  )}
                </div>
                {/* user informations */}
                <div className='text-left min-w-0'>
                  <div className='font-medium truncate'>{user.fullName}</div>
                  <div className='text-sm text-zinc-400'>
                    {onlineUsers.includes(user._id)? 'Online' : 'Offline'}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </aside>
    </React.Fragment>
  )
}

export default SideBar;