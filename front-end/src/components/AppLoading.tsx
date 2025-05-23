import React from 'react'
import { Loader } from 'lucide-react'

interface AppLoadingProps {
  children?: React.ReactNode;
}

const AppLoading: React.FC<AppLoadingProps> = () => {
  return (
    <React.Fragment>
      <div className='flex items-center justify-center h-screen'>
        <Loader className="animate-spin" size={60} />
      </div>
    </React.Fragment>
  )
}

export default AppLoading;