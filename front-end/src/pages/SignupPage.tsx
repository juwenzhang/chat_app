import React, { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useFetch } from '@/hooks/useFetch';
import { useNavigate, Link } from 'react-router-dom';
import AppLoading from '@/components/AppLoading';
import AppError from '@/components/AppError';
import { MessageSquare, User, Mail, Lock, EyeOff, Eye } from 'lucide-react';
import AuthImagePattern from '@/components/AuthImagePattern';

interface SignupPageProps {
  children?: React.ReactNode;
}

const SignupPage: React.FC<SignupPageProps> = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const { signup, isSignUp } = useAuthStore();
  const { isLoading, isError } = useFetch('auth', () => {
    const { fullName, email, password } = formData;
    signup(fullName, email, password);
  });

  const validateForm = () => {
    const { fullName, email, password } = formData;
    if (!fullName || !email || !password) {
      alert('Please fill in all fields');
      return false;
    }
    if (!email.includes('@')) {
      alert('Please enter a valid email address');
      return false;
    }
    if (password.length < 6) {
      alert('Password must be at least 6 characters');
      return false;
    }
    if (isSignUp) {
      alert('Signup failed, please try again later');
      return false;
    }
    signup(fullName, email, password);
    return true; 
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      navigate('/login');
    }
  };

  if (isLoading) return <AppLoading />;
  if (isError) return <AppError />;

  return (
    <React.Fragment>
      <div className='h-[90vh] grid lg:grid-cols-2 pt-[3vh] box-border'>
        {/* left sider part */}
        <div className='flex flex-col justify-center items-center p-4 sm:p-8 bg-gray-300 rounded-lg 
        shadow-md h-[90vh] box-border' style={{ 
          backgroundImage: 'linear-gradient(135deg, #d0daeb 0%, #c6daf8,25%,#b4cdf5 50%, #81a1d5, 75%, #5f98fc 100%)' 
        }}>
          <div className='w-full max-w-md space-y-6'>
            <div className='text-center mb-6'>
              <div className='flex flex-col items-center gap-2 group'>
                <div className='size-12 rounded-xl bg-primary flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                  <MessageSquare className='size-6 text-primary' />
                </div>
                <h1 className='text-2xl font-bold mt-2 text-primary'>创建用户/create account</h1>
                <p className='text-base-content/60'>开始你的免费之旅/Get Started With Your Free Account</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className='space-y-9 max-w-lg mx-auto box-border'>
            <div className='form-control box-border'>
              <label className='label box-border'>
                <span className='label-text font-medium text-gray-700'>姓名/Full Name</span>
              </label>
              <div className='relative box-border'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none box-border'>
                  <User className='w-5 h-5 text-gray-400 transition-all duration-300' />
                </div>
                <input
                  type="text"
                  className='w-full h-12 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:border-primary 
                  focus:ring-2 focus:ring-primary/20 hover:border-gray-400 transition-all duration-300'
                  placeholder='请输入姓名/Enter your full name'
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

            <div className='form-control box-border'>
              <label className='label box-border'>
                <span className='label-text font-medium text-gray-700'>邮箱/Email</span>
              </label>
              <div className='relative box-border'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none box-border'>
                  <Mail className='w-5 h-5 text-gray-400 transition-all duration-300' />
                </div>
                <input
                  type="email"
                  className='w-full h-12 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:border-primary 
                  focus:ring-2 focus:ring-primary/20 hover:border-gray-400 transition-all duration-300'
                  placeholder='请输入邮箱/Enter your email'
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className='form-control box-border'>
              <label className='label box-border'>
                <span className='label-text font-medium text-gray-700'>密码/Password</span>
              </label>
              <div className='relative box-border'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none box-border'>
                  <Lock className='w-5 h-5 text-gray-400 transition-all duration-300' />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className='w-full h-12 pl-10 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:border-primary 
                  focus:ring-2 focus:ring-primary/20 hover:border-gray-400 transition-all duration-300'
                  placeholder='请输入密码/Enter your password'
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className='absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-300'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className='btn w-full h-12 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded-lg transition-all duration-300'
            >
              注册/Sign Up
            </button>
          </form>
          <div className='text-center p-5'>
            Already have an account? &nbsp;&nbsp;
            <Link to="/login" className='link link-primary'>Sign In</Link>
          </div>
        </div>

        {/* right side part */}
        <AuthImagePattern 
          title="加入社区/JOIN OUR COMMUNITY"
          subtitle="欢迎来到我们的社区，成为我们的一员，与我们一起成长/Welcome to our community, join us and grow together."
        />
      </div>
    </React.Fragment>
  );
};

export default SignupPage;