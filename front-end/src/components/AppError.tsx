import React from 'react'

interface AppLoadingProps {
  children?: React.ReactNode;
}

const AppError: React.FC<AppLoadingProps> = () => {
  return (
    <React.Fragment>
      <div className='flex items-center justify-center h-screen'>
        <h1 className='bg-red'>error</h1>
      </div>
    </React.Fragment>
  )
}

export default AppError;