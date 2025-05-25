import React, { useRef, useState, useEffect } from 'react'
import useChatStore from '@/store/useChatStore';
import Sidebar from '@/components/SideBar';
import ChatContainer from '@/components/ChatContainer';
import NoChatSelected from '@/components/NoChatSelected';
import { rightSideBackgroundStyle } from '@/constants/theme';

interface HomePageProps {
  children?: React.ReactNode,
  theme: "light" | "dark"
}

const HomePage: React.FC<HomePageProps> = (props: HomePageProps) => {
  const { theme } = props;
  const { selectUser } = useChatStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsDragging(true);
    setStartPosition({ 
      x: e.clientX - position.x, 
      y: e.clientY - position.y 
    });
  }

  const throttle = (func: (...args: any[]) => any, limit: number) => {
    let inThrottle: boolean;
    return function(this: any, ...args: any[]) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  useEffect(() => {
    let animationFrameId: number;
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && containerRef.current) {
        const newX = e.clientX - startPosition.x;
        const newY = e.clientY - startPosition.y;
        
        const updatePosition = () => {
          const windowWidth = window.innerWidth;
          const windowHeight = window.innerHeight;
          
          const { width, height } = containerRef.current 
            ? containerRef.current.getBoundingClientRect() 
            : { width: 0, height: 0 };

          const maxX = windowWidth - width;
          const maxY = windowHeight - height;
          const clampedX = Math.max(0, Math.min(newX, maxX));
          const clampedY = Math.max(0, Math.min(newY, maxY));

          setPosition({ x: clampedX, y: clampedY });
        }
        animationFrameId = requestAnimationFrame(updatePosition);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      cancelAnimationFrame(animationFrameId);
    }

    const throttledHandleMouseMove = throttle(handleMouseMove, 16);

    if (isDragging) {
      window.addEventListener('mousemove', throttledHandleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', throttledHandleMouseMove);
      window.removeEventListener('mouseup', () => setIsDragging(false));
    }
  })

  return (
    <React.Fragment>
      <div className='h-screen bg-base-200'>
        <div 
          className='flex items-center justify-center'
          style={{
            transform: `translateY(8vh)`,
          }}
        >
          <div 
            className='bg-base-200 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]'
            ref={containerRef}
            onMouseDown={handleMouseDown}
            style={{
              transform: `translate(${position.x}px, ${position.y}px)`,
              backgroundImage: `${rightSideBackgroundStyle[theme]}`
            }}
          >
            <div className='flex h-full rounded-lg overflow-hidden'>
              <Sidebar theme={theme} />
              {!selectUser ? <NoChatSelected /> : <ChatContainer />}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default HomePage;