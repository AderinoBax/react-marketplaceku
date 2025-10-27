import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, Phone, User } from 'lucide-react'
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
}
function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form Submitted:", formData)
    setIsSubmitted(true)
    setFormData({ name: '', email: '', message: '' })
    setTimeout(() => setIsSubmitted(false), 3000)
  }
  return (
    <div className="bg-white min-h-screen py-16 md:py-24">
      <motion.div 
        className="container mx-auto max-w-6xl px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-16">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            initial={{ y: -20 }} animate={{ y: 0 }}
          >
            Hubungi Saya
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ y: -10 }} animate={{ y: 0 }} transition={{ delay: 0.1 }}
          >
            Punya pertanyaan atau ingin bekerja sama? Saya siap mendengarkan.
          </motion.p>
        </div>
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <motion.div 
            className="bg-gray-50 p-8 md:p-12 rounded-lg shadow-sm border border-gray-200"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Informasi Kontak</h2>
            <motion.div variants={itemVariants} className="flex items-start mb-6">
              <User className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Aderino Arya Nanda</h3>
                <p className="text-gray-600">Full Stack Developer Portfolio</p>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="flex items-start mb-6">
              <Mail className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Email</h3>
                <a href="mailto:aderino@example.com" className="text-blue-600 hover:text-blue-700 transition-colors">
                  aderino@example.com
                </a>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="flex items-start">
              <Phone className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Telepon (Contoh)</h3>
                <p className="text-gray-600">+62 123 4567 890</p>
              </div>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            {isSubmitted ? (
              <motion.div 
                className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-6 rounded-lg text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <h3 className="text-xl font-semibold">Terima kasih!</h3>
                <p>Pesan Anda telah terkirim. Saya akan segera merespons.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    required 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow" 
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Alamat Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    required 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow" 
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Pesan Anda</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="5" 
                    value={formData.message}
                    onChange={handleChange}
                    required 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow"
                  ></textarea>
                </div>
                <div>
                  <motion.button 
                    type="submit"
                    className="w-full flex justify-center items-center px-6 py-4 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-colors transform hover:scale-105"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Kirim Pesan
                    <Send className="w-5 h-5 ml-2" />
                  </motion.button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
export default ContactPage
