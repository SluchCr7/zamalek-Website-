'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ImagePlus, Loader2 } from 'lucide-react'
import { useNews } from '@/app/Context/NewsContext'

export default function AddNewsModal() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const { addNews, openModal, setOpenModal, loading } = useNews()
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      const url = URL.createObjectURL(file)
      setImagePreview(url)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!imageFile) return alert('الرجاء اختيار صورة للخبر')

    await addNews(title, content, imageFile)

    if (!loading) {
      setTitle('')
      setContent('')
      setImageFile(null)
      setImagePreview(null)
    }
  }

  return (
    <AnimatePresence>
      {openModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[999] flex items-center justify-center p-4"
          onClick={() => setOpenModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="relative bg-card border border-border rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            dir="rtl"
          >
            {/* Close Button */}
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-6 left-6 text-gray-500 hover:text-primary transition-colors z-10 p-2 bg-muted rounded-full"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="text-center py-8 border-b border-border bg-muted/30">
              <h2 className="text-2xl font-black text-foreground flex items-center justify-center gap-3">
                <span className="text-primary text-3xl">🏹</span>
                إضافة خبر جديد
              </h2>
              <p className="text-gray-500 mt-2 text-sm font-bold opacity-60">
                شارك آخر أخبار الملكي مع الجماهير
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {/* Image Upload */}
              <div className="w-full h-64 border-2 border-dashed border-border rounded-3xl flex items-center justify-center relative group overflow-hidden bg-muted/20 hover:border-primary/50 transition-colors">
                {imagePreview ? (
                  <>
                    <Image
                      src={imagePreview}
                      alt="Selected"
                      fill
                      className="object-cover rounded-3xl"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                      <label
                        htmlFor="imageUpload"
                        className="cursor-pointer bg-primary text-foreground px-6 py-3 rounded-2xl text-sm font-black hover:scale-105 transition-transform"
                      >
                        تغيير الصورة
                      </label>
                    </div>
                  </>
                ) : (
                  <label
                    htmlFor="imageUpload"
                    className="flex flex-col items-center justify-center cursor-pointer text-gray-400 hover:text-primary transition-colors w-full h-full"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <ImagePlus size={32} />
                    </div>
                    <span className="font-black text-lg">اختر صورة الخبر</span>
                    <span className="text-xs opacity-50 mt-2 font-bold">
                      PNG, JPG, JPEG (يفضل جودة عالية)
                    </span>
                  </label>
                )}
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  required={!imagePreview}
                />
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-black text-foreground/70 mb-2 mr-2">
                  عنوان الخبر
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="مثال: الزمالك يختتم تدريباته لمواجهة الأهلي..."
                  className="w-full bg-muted/50 border border-border rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-bold"
                  required
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-black text-foreground/70 mb-2 mr-2">
                  محتوى الخبر
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows="6"
                  placeholder="اكتب تفاصيل الخبر هنا بكل التفاصيل..."
                  className="w-full bg-muted/50 border border-border rounded-2xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-bold leading-relaxed"
                  required
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-4 sticky bottom-0 bg-card py-4 border-t border-border mt-8">
                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="px-8 py-3 rounded-2xl border border-border font-black text-sm hover:bg-muted transition-all"
                >
                  إلغاء
                </button>
                <button
                  disabled={loading}
                  type="submit"
                  className="px-10 py-3 rounded-2xl bg-primary text-foreground font-black shadow-lg shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2 disabled:opacity-50 disabled:scale-100"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      جاري النشر...
                    </>
                  ) : (
                    'نشر الخبر'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
