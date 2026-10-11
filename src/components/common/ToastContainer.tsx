import React from 'react';
import { useShop } from '../../context/ShopContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts } = useShop();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center gap-3 p-4 rounded-xl shadow-stitch-lg border transition-all transform animate-slide-up ${
            toast.type === 'error'
              ? 'bg-[#FAF0F2] text-[#9A2C38] border-[#E8B5B8]'
              : toast.type === 'info'
              ? 'bg-[#EFE6D8] text-[#3B2418] border-[#D8CBB9]'
              : 'bg-[#FAF7EF] text-[#3B2418] border-[#879477]'
          }`}
        >
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-[#C97882] flex-shrink-0" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-[#879477] flex-shrink-0" />}
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#879477] flex-shrink-0" />}
          <p className="text-sm font-medium leading-snug">{toast.message}</p>
        </div>
      ))}
    </div>
  );
};
