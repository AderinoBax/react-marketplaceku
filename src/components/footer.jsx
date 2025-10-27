import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingBag, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'
const footerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: "easeOut", 
      staggerChildren: 0.2 
    } 
  }
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}
function Footer() {
  return (
    <motion.footer
      className="bg-gray-900 text-gray-300 py-16"
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="container mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-12">
        <motion.div className="lg:col-span-2 space-y-4" variants={itemVariants}>
          <Link to="/" className="flex items-center gap-2">
            <ShoppingBag className="w-8 h-8 text-blue-500" />
            <span className="text-2xl font-bold text-white">Marketplaceku</span>
          </Link>
          <p className="text-gray-400">
            Sebuah proyek portfolio e-commerce yang dibuat oleh Aderino Arya Nanda.
          </p>
          <div className="flex space-x-4 pt-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook className="w-6 h-6" /></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter className="w-6 h-6" /></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram className="w-6 h-6" /></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Youtube className="w-6 h-6" /></a>
          </div>
        </motion.div>
        <motion.div variants={itemVariants}>
          <h3 className="text-lg font-semibold text-white mb-4">Marketplace</h3>
          <ul className="space-y-3">
            <li><Link to="/products" className="hover:text-white transition-colors">Semua Produk</Link></li>
            <li><Link to="/categories" className="hover:text-white transition-colors">Kategori</Link></li>
            <li><Link to="/best-sellers" className="hover:text-white transition-colors">Produk Unggulan</Link></li>
            <li><Link to="/register-seller" className="hover:text-white transition-colors">Jadi Penjual</Link></li>
          </ul>
        </motion.div>
        <motion.div variants={itemVariants}>
          <h3 className="text-lg font-semibold text-white mb-4">Bantuan</h3>
          <ul className="space-y-3">
            <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Hubungi Kami</Link></li>
            <li><Link to="/profile/orders" className="hover:text-white transition-colors">Lacak Pesanan</Link></li>
            <li><Link to="/payment-guide" className="hover:text-white transition-colors">Panduan Pembayaran</Link></li>
          </ul>
        </motion.div>
        <motion.div variants={itemVariants}>
          <h3 className="text-lg font-semibold text-white mb-4">Perusahaan</h3>
          <ul className="space-y-3">
            <li><Link to="/about" className="hover:text-white transition-colors">Tentang Kami</Link></li>
            <li><Link to="/terms" className="hover:text-white transition-colors">Syarat & Ketentuan</Link></li>
            <li><Link to="/privacy" className="hover:text-white transition-colors">Kebijakan Privasi</Link></li>
          </ul>
        </motion.div>
      </div>
      <motion.div
        className="container mx-auto max-w-7xl px-6 mt-12 border-t border-gray-700 pt-8 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <p className="text-gray-400">&copy; {new Date().getFullYear()} Aderino Arya Nanda. All rights reserved.</p>
      </motion.div>
    </motion.footer>
  )
}
export default Footer

