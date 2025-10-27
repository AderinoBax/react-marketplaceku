import React from 'react'
import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.3, staggerChildren: 0.1 } }
}
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
}
function PrivacyPage() {
  return (
    <div className="bg-white min-h-screen py-16 md:py-24">
      <div className="container mx-auto max-w-4xl px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Kebijakan Privasi
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Terakhir diperbarui: 27 Oktober 2025.
          </p>
        </motion.div>
        <motion.div 
          className="text-gray-700 leading-relaxed"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 variants={itemVariants} className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Pendahuluan</motion.h2>
          <motion.p variants={itemVariants} className="mb-4">Kebijakan Privasi ini menjelaskan bagaimana "Marketplaceku", sebuah platform portfolio yang dikelola oleh Aderino Arya Nanda, mengumpulkan dan menggunakan data. Platform ini disediakan murni untuk tujuan demonstrasi dan portfolio, dan semua data bersifat simulasi.</motion.p>
          <motion.h2 variants={itemVariants} className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Informasi yang Kami Kumpulkan (Simulasi)</motion.h2>
          <motion.p variants={itemVariants} className="mb-4">Saat Anda menggunakan fitur registrasi, kami (secara simulasi) mengumpulkan informasi pribadi seperti Nama, Alamat Email, dan Kata Sandi (yang di-hash). Data ini hanya disimpan dalam database proyek untuk mendemonstrasikan fungsionalitas backend.</motion.p>
          <motion.h2 variants={itemVariants} className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Penggunaan Informasi</motion.h2>
          <motion.p variants={itemVariants} className="mb-4">Informasi yang Anda berikan hanya digunakan untuk fungsionalitas inti platform portfolio ini, seperti: (a) Memverifikasi login Anda, (b) Mensimulasikan proses keranjang belanja, (c) Mensimulasikan proses checkout dan riwayat pesanan. Kami tidak akan pernah menjual, menyewakan, atau menggunakan data ini untuk pemasaran.</motion.p>
          <motion.h2 variants={itemVariants} className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Keamanan Data</motion.h2>
          <motion.p variants={itemVariants} className="mb-4">Meskipun ini adalah platform simulasi, kami menerapkan langkah-langkah keamanan standar (seperti hashing kata sandi) untuk melindungi data demonstrasi di database kami. Namun, kami sangat menyarankan Anda untuk tidak menggunakan kata sandi dunia nyata saat mendaftar.</motion.p>
          <motion.h2 variants={itemVariants} className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Perubahan Kebijakan</motion.h2>
          <motion.p variants={itemVariants} className="mb-4">Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Setiap perubahan akan diposting di halaman ini. Penggunaan platform ini bersifat sukarela dan hanya untuk tujuan demonstrasi.</motion.p>
        </motion.div>
      </div>
    </div>
  )
}
export default PrivacyPage
