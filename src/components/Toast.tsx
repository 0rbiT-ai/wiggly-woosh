import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import { ToastMessage } from '../types';

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

const icons = {
  success: <CheckCircle size={20} className="text-green-400" />,
  error: <XCircle size={20} className="text-red-400" />,
  info: <Info size={20} className="text-brand-teal" />,
};

const bgColors = {
  success: 'border-green-500/30 bg-green-950/50',
  error: 'border-red-500/30 bg-red-950/50',
  info: 'border-brand-teal/30 bg-brand-teal/5',
};

export default function Toast({ toasts, onDismiss }: ToastProps) {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 max-w-sm w-full px-4 sm:px-0">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className={`relative glass-strong rounded-2xl p-4 border ${bgColors[toast.type]} shadow-2xl`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 shrink-0">{icons[toast.type]}</div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm">{toast.title}</p>
                {toast.message && (
                  <p className="text-xs text-white/50 mt-1 leading-relaxed">{toast.message}</p>
                )}
              </div>
              <button
                onClick={() => onDismiss(toast.id)}
                className="shrink-0 p-1 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={14} className="text-white/40" />
              </button>
            </div>
            <div className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full overflow-hidden bg-white/5">
              <div
                className={`h-full rounded-full animate-toast-progress ${
                  toast.type === 'success' ? 'bg-green-400' :
                  toast.type === 'error' ? 'bg-red-400' : 'bg-brand-teal'
                }`}
                onAnimationEnd={() => onDismiss(toast.id)}
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
