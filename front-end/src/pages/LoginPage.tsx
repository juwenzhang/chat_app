import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '@/store/useAuthStore';
import { Mail, Lock, EyeOff, Eye, MessageSquare, Loader2 } from 'lucide-react';
import AuthImagePattern from '@/components/AuthImagePattern';

interface LoginPageProps {
  children?: React.ReactNode;
}

const LoginPage: React.FC<LoginPageProps> = () => {
  const [showPassword, setShowPassword] = useState(false); 
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { login, isLoginIn } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await login(formData.email, formData.password);
    if (res?.status === "ok") {
      navigate('/');
    } else {
      toast.error('Login failed!');
    }
  };

  return (
    <React.Fragment>
      <div 
        className='grid grid-cols-1 lg:grid-cols-2 h-[80vh]'
        style={{
          ...(window.innerWidth >= 1024 && { transform: 'translateY(12vh)' })
        }}
      >
        {/* left sider part */}
        <div className='flex flex-col justify-center items-center p-4 sm:p-8 bg-gray-300 rounded-lg 
        shadow-md box-border md:h-[80vh] h-screen' style={{ 
          backgroundImage: 'linear-gradient(135deg, #d0daeb 0%, #c6daf8 25%, #b4cdf5 50%, #81a1d5 75%, #5f98fc 100%)' 
        }}>
          <div className='w-full max-w-sm space-y-4'>
            <div className='text-center mb-4'>
              <div className='flex flex-col items-center gap-1 group'>
                <div className='rounded-xl bg-primary flex items-center justify-center 
                  group-hover:bg-primary/20 transition-colors'>
                  <MessageSquare className='w-5 h-5 text-primary' />
                </div>
                <h1 className='text-xl font-bold mt-1 text-primary'>登录/Login</h1>
                <p className='text-sm text-base-content/60'>开始你的免费之旅/Get Started With Your Free Account</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className='space-y-6 max-w-sm w-full box-border'>
            <div className='form-control box-border'>
              <label className='label box-border' htmlFor="email">
                <span className='label-text font-medium text-gray-700 text-sm'>邮箱/Email</span>
              </label>
              <div className='relative box-border'>
                <div className='absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none 
                  box-border'>
                  <Mail className='w-4 h-4 text-gray-400 transition-all duration-300' />
                </div>
                <input
                  type="email"
                  id="email"
                  className='bg-blue-2 w-full h-8 pl-8 rounded-lg border border-gray-300 
                    focus:outline-none focus:border-primary 
                  focus:ring-2 focus:ring-primary/20 hover:border-gray-400 
                  transition-all duration-300 text-sm'
                  placeholder='请输入邮箱/Enter your email'
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className='form-control box-border'>
              <label className='label box-border' htmlFor='password'>
                <span className='label-text font-medium text-gray-700 text-sm'>密码/Password</span>
              </label>
              <div className='relative box-border'>
                <div className='absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none 
                  box-border'>
                  <Lock className='w-4 h-4 text-gray-400 transition-all duration-300' />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id='password'
                  className='bg-blue-2 w-full h-8 pl-8 pr-8 rounded-lg border border-gray-300 
                    focus:outline-none focus:border-primary 
                  focus:ring-2 focus:ring-primary/20 hover:border-gray-400 transition-all
                     duration-300 text-sm'
                  placeholder='请输入密码/Enter your password'
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className='bg-transparent border-0 absolute inset-y-0 right-0 flex items-center justify-center px-3 
                  text-gray-400 hover:text-gray-600 transition-colors duration-300'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword 
                    ? <EyeOff className='w-3 h-3' /> 
                    : <Eye className='w-3 h-3' />
                  }
                </button>
              </div>
            </div>

            <button
              type="submit"
              className='btn w-full h-8 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 
                text-white rounded-lg transition-all duration-300 border-none shadow-md hover:shadow-lg text-sm'
              disabled={isLoginIn}
            >
              {
                isLoginIn 
                  ? <>
                    <Loader2 className='w-4 h-4 animate-spin' />
                    登录中.../Logging in...
                  </>
                  : <>
                    登录/Login
                  </>
              }
            </button>
          </form>
          <div className='text-center p-3 text-sm'>
            还没有账号？&nbsp;&nbsp;
            <Link to="/signup" className='link link-primary'>注册</Link>
          </div>
        </div>

        {/* right side part */}
        <div className='flex flex-col justify-center items-center p-4 sm:p-8 bg-gray-300 rounded-lg 
        shadow-md box-border md:h-[80vh] h-screen' style={{ 
          backgroundImage: 'linear-gradient(135deg, #5f98fc 0%, #81a1d5 25%, #b4cdf5 50%, #c6daf8 75%, #d0daeb 100%)',
        }}>
          <AuthImagePattern 
            title="加入社区/JOIN OUR COMMUNITY" 
            subtitle="欢迎来到我们的社区，成为我们的一员，与我们一起成长/Welcome to our community, join us and grow together." 
          /> 
        </div>
      </div>
    </React.Fragment>
  )
}

export default LoginPage;