import React, { useState, useRef } from 'react'
import useChatStore from '@/store/useChatStore';
import { X, Image, Send } from 'lucide-react';
import toast from 'react-hot-toast';

interface ChatInputProps {
  children?: React.ReactNode;
  theme?: "light" | "dark";
}

const ChatInput: React.FC<ChatInputProps> = () => {
  const [text, setText] = useState<string>('') 
  const [imagePreview, setImagePreview] = useState<string | null>(null)
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
    reader.onload = () => {
      console.log(reader.result)
      setImagePreview(reader.result as string)
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
        text: text,
        image: imagePreview,
      })
      setText('')
      removeImagePreview()
    } catch (error) {
      console.log(error)
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
              <Image size={25} />
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