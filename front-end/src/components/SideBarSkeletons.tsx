import React from'react';
import { User } from 'lucide-react';

interface SideBarSkeletonsProps {
  children?: React.ReactNode;
  theme?: "light" | "dark";
}

const SideBarSkeletons: React.FC<SideBarSkeletonsProps> = () => {
  const skeletonContacts = Array.from({ length: 10 }).fill(null);

  return (
    <React.Fragment>
      <aside 
        className='h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200'
        style={{
          borderRight: '1px solid rgb(7, 8, 8)',
        }}
      >
        {/* header */}
        <header className='border-b border-base-300 w-full p-5'>
          <div className='flex items-center gap-2'>
            <User className='size-6'/>
            <span className='font-medium'>Contacts</span>
          </div>
        </header>

        {/* skeletons contacts */}
        <article 
          className='w-full py-3 scrollbar-hidden'
        >
          {skeletonContacts.map((_, index) => {
            return (
              <div key={index} className='w-full p-3 flex items-center gap-3'>
                {/* Avatar skeleton */}
                <div className='relative mx-auto lg:mx-0'>
                  <div className='skeleton size-12 rounded-full'></div>
                </div>
                {/* user info */}
                <div className='hidden lg:block text-left min-w-0 flex-1'>
                  <div className='skeleton h-4 w-32 mb-2'></div>
                  <div className='skeleton h-3 w-16'></div>
                </div>
              </div>
            )
          })}
        </article>
      </aside>
    </React.Fragment>
  )
}

export default SideBarSkeletons;