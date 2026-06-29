'use client'
import { useNews } from '@/app/hooks/useNews'
import { motion, AnimatePresence } from 'framer-motion'
import { X, FileText, ImagePlus, Video, Trophy, Users } from 'lucide-react'

export default function AddMenuModalAll({ open, onClose }) {
    const { setOpenModal } = useNews()
    
    const menuItems = [
        { 
          id: 'news', 
          icon: <FileText size={24} />, 
          label: 'إضافة خبر جديد', 
          desc: 'نشر أخبار الفريق والبيانات الرسمية',
          onClick: () => { setOpenModal(true); onClose(); } 
        },
        { 
          id: 'photo', 
          icon: <ImagePlus size={24} />, 
          label: 'إضافة صورة للجاليري', 
          desc: 'تحديث مكتبة الصور الخاصة بالنادي',
          onClick: onClose 
        },
        { 
          id: 'video', 
          icon: <Video size={24} />, 
          label: 'إضافة فيديو', 
          desc: 'رفع فيديوهات التدريبات والأهداف',
          onClick: onClose 
        },
        { 
          id: 'player', 
          icon: <Users size={24} />, 
          label: 'إضافة لاعب', 
          desc: 'إدراج لاعب جديد في قائمة الفريق',
          onClick: onClose 
        },
    ]

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-card border border-border rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden"
            dir="rtl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 left-6 text-gray-500 hover:text-primary transition-colors p-2 bg-muted rounded-full"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="text-center py-10 border-b border-border bg-muted/30">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Trophy className="text-primary" size={32} />
              </div>
              <h2 className="text-2xl font-black text-foreground">لوحة التحكم السريعة</h2>
              <p className="text-gray-500 mt-2 text-sm font-bold opacity-60">اختر نوع المحتوى الذي ترغب في إضافته</p>
            </div>

            {/* Options */}
            <div className="p-8 grid gap-4">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ x: -8 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-6 p-5 rounded-3xl bg-muted/50 border border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-right group"
                  onClick={item.onClick}
                >
                  <div className="w-12 h-12 shrink-0 rounded-2xl bg-card border border-border flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-foreground transition-all shadow-sm">
                    {item.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-black text-foreground group-hover:text-primary transition-colors">{item.label}</span>
                    <span className="text-xs text-foreground/40 font-bold">{item.desc}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
