import React, { useState, useRef } from 'react'
import useChatStore from '@/store/useChatStore';
import { X, Image as LImage, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/store/useAuthStore';

interface ChatInputProps {
  children?: React.ReactNode;
  theme?: "light" | "dark";
}

const ChatInput: React.FC<ChatInputProps> = () => {
  const [text, setText] = useState<string>('') 
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const { authUser } = useAuthStore()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { sendMessage, selectUser } = useChatStore()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const file = e.target.files?.[0];
    if (!file?.type.startsWith('image/')) {
      toast.error('Please select an image file.')
      return;
    }
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      // start settle big image
      const image = new Image();
      image.src = e.target?.result as string;
      image.onload = () => {
        const maxWidth = 600; // 最大宽度
        const maxHeight = 600; // 最大高度
        const scale = Math.min(  // 获取图片的缩放因子
          maxWidth / image.width, 
          maxHeight / image.height
        );
        
        const canvas = document.createElement('canvas');
        canvas.width = image.width * scale;
        canvas.height = image.height * scale;
        
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
          // 实现为图片添加水印效果
          ctx.font = '20px Arial'; // 设置字体大小和字体
          ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'; // 设置字体颜色和透明度
          ctx.textAlign = 'center'; // 设置文本水平对齐方式
          ctx.textBaseline = 'middle'; // 设置文本垂直对齐方式
          ctx.fillText( // 添加水印文本
            authUser.user.fullName, 
            canvas.width - 50, 
            canvas.height - 20
          ); 
        }
        const resizedImage = canvas.toDataURL('image/jpeg', 0.8); // 调整质量为 80%
        setImagePreview(resizedImage)
      }
    } 
    reader.readAsDataURL(file)
  }

  const removeImagePreview = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setImagePreview(null)
  }

  const handleSendMessage = async (
    e: any
  ) => {
    e.preventDefault()
    if (!text.trim() && !imagePreview) return;
    try {
      await sendMessage(selectUser._id, {
        text: text.trim(),
        image: imagePreview,
      })
      setText('')
      removeImagePreview()
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }

  return (
    <React.Fragment>
      <div className='p-6 w-full'>
        {imagePreview && (
          <div className='mb-3 flex items-center gap-2'>
            <div className='relative'>
              <img 
                src={imagePreview} 
                alt="preview"
                className='w-20 h-20 object-cover rounded-lg border border-zinc-700' 
              />
              <button 
                onClick={removeImagePreview}
                className='absolute top-1.5 right-1.5 size-5 rounded-full bg-base-300 flex 
                    items-center justify-center'
                type='button'
              >
                <X className='size-4' />
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSendMessage} className='flex items-center gap-2'>
          <div className='flex-1 flex gap-2'>
            <input 
              type="text" 
              datatype='text'
              className='w-full h-10 input rounded-lg input-sm sm:input-md border-none'
              placeholder='Type your message here...'
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <input 
              type="file" 
              accept='image/*'
              className='hidden border-none'
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            <button 
              type='button'
              className={`pt-1.5 hidden border-none sm:flex btn btn-circle 
                ${imagePreview? 'text-emerald-500' : 'text-zinc-400'}`}
              onClick={() => fileInputRef.current?.click()}
            >
              <LImage size={25} />
            </button>

            <button 
              type='button'
              className={`pt-1.5 hidden border-none sm:flex btn btn-circle 
                ${imagePreview? 'text-emerald-500' : 'text-zinc-400'}`}
              onClick={(e) => handleSendMessage(e)}
            >
              <Send size={25} />
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  )
}

export default ChatInput;