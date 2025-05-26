import React, { useState, useRef, useEffect } from'react'
import { useAuthStore } from '@/store/useAuthStore';
import { Camera, User, Mail } from 'lucide-react';
import { useTheme } from '@/context/themeContext';
import { rightSideBackgroundStyle as BackgroundStyle } from '@/constants/theme';
import toast from 'react-hot-toast';

interface ProfilePageProps {
  children?: React.ReactNode;
}

const ProfilePage: React.FC<ProfilePageProps> = () => {
  const defaultImg = new URL("@/assets/img.jpg", import.meta.url).href;
  const { authUser, isUpdatingProfile, upLoadProFile, changeAuthUser } = useAuthStore();
  const [selectImage, setSelectImage] = useState<string | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const { theme } = useTheme();
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartPosition({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const throttle = (func: (...args: any[]) => void, limit: number) => {
    let inThrottle: boolean;
    return function(this: any, ...args: any[]) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  };

  useEffect(() => {
    let animationFrameId: number;
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && profileRef.current) {
        const newX = e.clientX - startPosition.x;
        const newY = e.clientY - startPosition.y;

        const updatePosition = () => {
          // 获取窗口尺寸
          const windowWidth = window.innerWidth;
          const windowHeight = window.innerHeight;
          // 获取元素尺寸
          const { width, height } = profileRef.current 
            ? profileRef.current.getBoundingClientRect() 
            : { width: 0, height: 0 };

          // 边界限制
          const minX = 0;
          const maxX = windowWidth - width;
          const minY = 0;
          const maxY = windowHeight - height;

          setPosition({
            x: Math.max(minX, Math.min(newX, maxX)),
            y: Math.max(minY, Math.min(newY, maxY))
          });
        }

        animationFrameId = requestAnimationFrame(updatePosition);
      }
    };

    const throttledMouseMove = throttle(handleMouseMove, 16);

    const handleMouseUp = () => {
      setIsDragging(false);
      cancelAnimationFrame(animationFrameId);
    };

    if (isDragging) {
      document.addEventListener('mousemove', throttledMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', throttledMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, startPosition]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      if (e.target?.result) {
        setSelectImage(e.target.result as string);
      }
    };
    const res = await upLoadProFile(file);
    if (res.status === "ok" && res) {
      await changeAuthUser({ ...authUser, profilePic: res.profilePic }); 
      setSelectImage(null); 
    }
  };

  return (
    <React.Fragment>
      <div 
        className="profile-container box-border" 
        style={{
          ...(window.innerWidth >= 1024 && { transform: 'translateY(12vh)' })
        }}
      >
        <div 
          className='max-w-2xl max-auto p-4 py-8 m-auto 
            rounded-xl shadow-2xl bg-base-100 bg-clip-border 
            backdrop-filter backdrop-blur-lg bg-opacity-80 box-border'
          style={{
            backgroundImage: `
              ${BackgroundStyle[theme]}
            `,
            transform: `translate(${position.x}px, ${position.y}px)`,
            cursor: isDragging ? 'grabbing' : 'grab',
            opacity: 0.7
          }}
          ref={profileRef}
          onMouseDown={handleMouseDown}
        >
          <div className='bg-base-300 rounded-xl p-6 space-y-8 box-border'>
            {/* basic description */}
            <div className='text-center box-border'>
              <h1 className='text-2xl font-semibold box-border'>Profile</h1>
              <p className='mt-2 box-border'>Your Profile Information</p>
            </div>
            {/* avatar upload */}
            <div className='flex flex-col items-center gap-4 box-border'>
              <div className='relative'>
                <img 
                  src={selectImage || authUser?.user?.profilePic || defaultImg}
                  alt="Profile"
                  className='size-32 rounded-full object-cover border-4 box-border'
                />
                <label 
                  htmlFor="avatar-upload"
                  className={`
                    absolute bottom-0 right-0
                    bg-base-content hover:scale-105
                    p-2 rounded-full cursor-pointer
                    transition-all duration-300 box-border
                    ${isUpdatingProfile 
                      ? 'animate-pulse pointer-events-none' 
                      : ''
                    }
                  `}
                >
                  <Camera className='size-5 text-base-200'/>
                  <input 
                    type="file" 
                    id="avatar-upload"
                    className='hidden'
                    accept='image/*'
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>
              <p className='text-sm'>
                {isUpdatingProfile ? 'Updating...' : 'Click The Camera Icon To Upload Your Avatar'}
              </p>
            </div>

            {/* user information sections */}
            <div className='space-y-6'>
              <div className='space-y-1.5'>
                <div className='text-sm text-zinc-600 flex items-center gap-2'>
                  <User className='size-4'/>
                  FullName
                </div>
                <p className='px-4 py-2.5 bg-base-200 rounded-lg border'>{authUser?.user?.fullName}</p>
              </div>
            </div>
            <div className='space-y-6'>
              <div className='space-y-1'>
                <div className='text-sm text-zinc-600 flex items-center gap-2'>
                  <Mail className='size-4'/>
                  Email Address
                </div>
                <p className='px-4 py-2.5 bg-base-200 rounded-lg border'>{authUser?.user?.email}</p>
              </div>
            </div>

            {/* time show */}
            <div className='bg-base-300 rounded-xl'>
              <h2 className='text-lg font-medium mb-4'>Account Information</h2>
              <div className='space-y-3 text-sm'>
                <div className='flex items-center justify-between py-2 border-b border-zinc-700'>
                  <span>Member Since</span>
                  <span>
                    {authUser?.user?.createdAt?.split("T")[0]}
                    &nbsp;&nbsp;
                    {authUser?.user?.createdAt?.split("T")[1].split(".")[0]}
                  </span>
                </div>
              </div>
              <div className='space-y-3 text-sm'>
                <div className='flex items-center justify-between py-2 border-b border-zinc-700'>
                  <span>Member Update</span>
                  <span>
                    {authUser?.user?.updatedAt?.split("T")[0]}
                    &nbsp;&nbsp;
                    {authUser?.user?.updatedAt?.split("T")[1].split(".")[0]}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProfilePage;