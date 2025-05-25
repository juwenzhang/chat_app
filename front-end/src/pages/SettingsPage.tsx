import React from 'react'

interface SettingsPageProps {
  children?: React.ReactNode;
  theme?: "light" | "dark"
}

const SettingdPage: React.FC<SettingsPageProps> = () => {
  return (
    <React.Fragment>
      <div 
        className='h-screen container md:h-[80vh] mx-auto max-w-5xl box-border'
        style={{
          transform: 'translateY(12vh)'
        }}  
      >
        <div className='space-y-6'>
          <div className='flex flex-col gap-1'>
            <h2 className='text-lg font-semibold'>Theme</h2>
            <p className='text-sm text-base-content/70'>Choose a theme for your chat interface</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default SettingdPage;