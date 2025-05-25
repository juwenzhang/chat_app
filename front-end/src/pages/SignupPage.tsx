import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { useFetch } from '@/hooks/useFetch';
import { useNavigate, Link } from 'react-router-dom';
import { MessageSquare, User, Mail, Lock, EyeOff, Eye, Loader2 } from 'lucide-react';
import { leftSideBackgroundStyle, rightSideBackgroundStyle } from '@/constants/theme';
import AuthImagePattern from '@/components/AuthImagePattern';
import AppLoading from '@/components/AppLoading';
import AppError from '@/components/AppError';
import TipModel from '@/components/TipModel';

interface SignupPageProps {
  children?: React.ReactNode;
  theme: "light" | "dark";
}

const SignupPage: React.FC<SignupPageProps> = (props: SignupPageProps) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showTip, setShowTip] = useState({ show: false, title: '' });
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const { signup, isSignUp } = useAuthStore();
  const { isLoading, isError } = useFetch('auth/signup', () => {
    const { fullName, email, password } = formData;
    signup(fullName, email, password);
  }, {
    staleTime: 0,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,  
  });
  const { theme } = props;
  const validateForm = () => {
    const { fullName, email, password } = formData;
    if (!fullName || !email || !password) {
      setShowTip({ show: true, title: "Please fill in all fields" });
      return false;
    }
    if (password.length < 6) {
      setShowTip({ show: true, title: "Password must be at least 6 characters" });
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setShowTip({ show: true, title: "Invalid email address" });
      return false;
    }
    return true; 
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      const res = await signup(formData.fullName, formData.email, formData.password);
      if (res?.status === "ok") {
        navigate('/login');
      }
    }
  };

  if (isLoading) return <AppLoading />;
  if (isError) return <AppError />;

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
        shadow-md md:h-[80vh] h-screen box-border' style={{ 
          backgroundImage: `${leftSideBackgroundStyle[theme]}`, 
        }}>
          <div className='w-full max-w-sm space-y-4'>
            <div className='text-center mb-4'>
              <div className='flex flex-col items-center gap-1 group'>
                <div className='rounded-xl bg-primary flex items-center justify-center 
                  group-hover:bg-primary/20 transition-colors'>
                  <MessageSquare className='w-5 h-5 text-primary' />
                </div>
                <h1 className='text-xl font-bold mt-1 text-primary'>创建用户/create account</h1>
                <p className='text-sm text-base-content/60'>开始你的免费之旅/Get Started With Your Free Account</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className='space-y-6 max-w-sm w-full box-border'>
            <div className='form-control box-border'>
              <label className='label box-border' htmlFor="fullName">
                <span className='label-text font-medium text-gray-700 text-sm'>姓名/Full Name</span>
              </label>
              <div className='relative box-border'>
                <div className='absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none 
                  box-border'>
                  <User className='w-4 h-4 text-gray-400 transition-all duration-300' />
                </div>
                <input
                  type="text"
                  id="fullName"
                  className='bg-blue-2 w-full h-8 pl-8 rounded-lg border border-gray-300 
                    focus:outline-none focus:border-primary 
                  focus:ring-2 focus:ring-primary/20 hover:border-gray-400 
                  transition-all duration-300 text-sm'
                  placeholder='请输入姓名/Enter your full name'
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

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
                  focus:ring-2 focus:ring-primary/20 hover:border-gray-400 transition-all 
                    duration-300 text-sm'
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
                  text-gray-400 hover:text-gray-600 transition-colors duration-300 box-border'
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
              className='btn w-full h-8 rounded-lg transition-all duration-300 border-none shadow-md 
              hover:shadow-lg text-sm border-none box-border'
              disabled={isSignUp}
            >
              {
                isSignUp 
                  ? <>
                    <Loader2 className='w-4 h-4 animate-spin' />
                    加载中.../Loading...
                  </>
                  : <>
                    注册/Create Account
                  </>
              }
            </button>
          </form>
          <div className='text-center p-3 text-sm'>
            Already have an account? &nbsp;&nbsp;
            <Link to="/login" className='link link-primary'>Sign In</Link>
          </div>
        </div>

        {/* right side part */}
        <div className='flex flex-col justify-center items-center p-4 sm:p-8 bg-gray-300 rounded-lg 
        shadow-md md:h-[80vh] h-screen box-border' style={{ 
          backgroundImage: `${rightSideBackgroundStyle[theme]}`,
        }}>
          <AuthImagePattern 
            title="加入社区/JOIN OUR COMMUNITY" 
            theme={theme}
            subtitle="欢迎来到我们的社区，成为我们的一员，与我们一起成长/Welcome to our community, join us and grow together." 
          /> 
        </div>
        {showTip.show && createPortal(
          <TipModel 
            title={showTip.title} 
            onClose={() => setShowTip({ show: false, title: '' })}
          />,
          document.body
        )}
      </div>
    </React.Fragment>
  );
};

export default SignupPage;