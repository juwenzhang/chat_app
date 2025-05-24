import React, { useState } from 'react';
import { X } from 'lucide-react';

interface TipModelProps {
  title: string;
  onClose?: () => void;
}

const TipModel: React.FC<TipModelProps> = (props: TipModelProps) => {
  const { title, onClose } = props;
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300">
      <div 
        className="fixed inset-0 bg-gray-900 bg-opacity-60 transition-opacity" 
        onClick={handleClose}
      />
      <div 
        className="bg-blue-2 p-8 rounded-xl shadow-2xl relative z-10 transform transition-all duration-300 scale-100 hover:scale-105"
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="modal-title"
      >
        <div className="flex justify-center items-center mb-4">
          <h3 
            id="modal-title"
            className="text-xl font-semibold text-red-950 text-center"
          >
            {title}
          </h3>
          <div className='m-3'>
            <button
              type="button"
              className="m-1 ml-auto inline-flex items-center rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={handleClose}
            >
              <span className="sr-only">Close</span>
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipModel;