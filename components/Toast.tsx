import React, { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Auto-hide after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <div 
      className={`fixed bottom-12 left-1/2 transform -translate-x-1/2 z-[60] transition-all duration-500 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
      }`}
    >
      <div className="bg-slate-900/95 backdrop-blur-md text-white px-6 py-3.5 rounded-full shadow-2xl flex items-center gap-3 border border-white/10 min-w-max max-w-[90vw]">
        <CheckCircle size={20} className="text-emerald-400 shrink-0" />
        <span className="text-sm font-medium leading-normal text-center">{message}</span>
      </div>
    </div>
  );
};

export default Toast;