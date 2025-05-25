import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { LogOut, MessageSquare, Settings, User } from 'lucide-react';
import AppLoading from '@/components/AppLoading';
import AppError from '@/components/AppError';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from 'react-hot-toast';
import { useTheme } from '@/context/themeContext';

const NavBar: React.FC = () => {
  const { logout, authUser } = useAuthStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { theme, toggleTheme } = useTheme();
  
  const fetchApi = async () => {
    setIsLoading(true);
    try {
      const res = await logout();
      if (res?.status === 'ok') {
        navigate('/login');
      } else {
        toast.error('Failed to logout: Invalid response');
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error('Failed to logout: ' + error.message);
      } else {
        toast.error('Failed to logout: An unknown error occurred');
      }
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  const handleLogout = async () => {
    await fetchApi();
  }

  if (isLoading) return <AppLoading />;
  if (isError) return <AppError />;

  return (
    <React.Fragment>
      <header
        className='bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
        backdrop-blur-lg bg-base-100/80'
        style={{
          borderBottom: '1px solid #e5e7eb' 
        }}
      >
        <div className='container mx-auto px-4 h-10 md:h-16 md:px-8'>
          <div className='flex items-center justify-between h-full flex-wrap md:flex-nowrap'>
            <div className='flex items-center gap-8'>
              <Link to='/' className='flex items-center gap-2.5 
                  hover:opacity-80 transition-all'>
                <div className='size-9 rounded-lg bg-primary/10 
                  flex items-center justify-center'>
                  <MessageSquare className='w-5 h-5 text-primary' />
                </div>
                <h1 className='text-lg font-bold'>Chatty</h1>
              </Link>
            </div>
  
            <div className='flex items-center gap-5 md:gap-4'>
              <Link to="/settings" className='btn btn-sm gap-2 transition-colors'>
                <Settings className='size-5' /> &nbsp;
                <span className='hidden sm:inline text-center v-start'>Settings</span>
              </Link>
  
              {authUser && (
                <>
                  <Link to="/profile" className='btn btn-sm gap-2 transition-colors'>
                    <User className='size-5' />&nbsp;
                    <span className='hidden sm:inline text-center v-start'>Profile</span>
                  </Link>
                  
                  <button datatype="logout" className='flex gap-2 items-center border-none bg-transparent hover:bg-blue-200' onClick={handleLogout}>
                    <LogOut className='size-5' />
                    <span className='hidden sm:inline text-center v-start'>Logout</span>
                  </button>
                </>
              )}
              <button datatype='toggle' className='btn btn-sm gap-2 bg-transparent border-none' onClick={toggleTheme}>
                <span className='size-5'>{theme === 'light' ? '🌞' : '🌙'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  )
}

export default NavBar;