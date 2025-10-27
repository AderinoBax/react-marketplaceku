import React from 'react'
import { motion } from 'framer-motion'
import { FileText } from 'lucide-react'
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.3, staggerChildren: 0.1 } }
}
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
}
function TermsPage() {
  return (
    <div className="bg-white min-h-screen py-16 md:py-24">
      <div className="container mx-auto max-w-4xl px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <FileText className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Syarat & Ketentuan
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Terakhir diperbarui: 27 Oktober 2025. Harap baca ketentuan ini dengan saksama.
          </p>
        </motion.div>
        <motion.div 
          className="text-gray-700 leading-relaxed"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 variants={itemVariants} className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Pendahuluan</motion.h2>
          <motion.p variants={itemVariants} className="mb-4">Selamat datang di Marketplaceku, sebuah platform portfolio yang dikelola oleh Aderino Arya Nanda. Dengan mengakses atau menggunakan platform kami, Anda setuju untuk terikat oleh Syarat & Ketentuan ("Ketentuan") ini. Platform ini disediakan sebagai proyek demonstrasi dan portfolio.</motion.p>
          <motion.h2 variants={itemVariants} className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Akun Pengguna</motion.h2>
          <motion.p variants={itemVariants} className="mb-4">Untuk menggunakan fitur tertentu, Anda mungkin perlu mendaftar akun. Anda bertanggung jawab untuk menjaga kerahasiaan kata sandi Anda dan untuk semua aktivitas yang terjadi di bawah akun Anda. Data yang Anda masukkan bersifat simulasi dan tidak akan digunakan untuk tujuan komersial.</motion.p>
          <motion.h2 variants={itemVariants} className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Transaksi (Simulasi)</motion.h2>
          <motion.p variants={itemVariants} className="mb-4">Semua transaksi, produk, harga, dan pembayaran di platform ini adalah data simulasi (mock data). Tidak ada transaksi moneter nyata yang terjadi. Platform ini tidak boleh digunakan untuk aktivitas jual beli komersial yang sebenarnya.</motion.p>
          <motion.h2 variants={itemVariants} className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Batasan Tanggung Jawab</motion.h2>
          <motion.p variants={itemVariants} className="mb-4">Karena ini adalah platform portfolio, Aderino Arya Nanda tidak bertanggung jawab atas kehilangan data, gangguan layanan, atau kerugian apa pun yang timbul dari penggunaan (atau ketidakmampuan untuk menggunakan) platform ini. Gunakan platform ini dengan risiko Anda sendiri.</motion.p>
          <motion.h2 variants={itemVariants} className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Perubahan Ketentuan</motion.h2>
          <motion.p variants={itemVariants} className="mb-4">Kami berhak untuk mengubah Ketentuan ini kapan saja. Versi terbaru akan selalu diposting di halaman ini. Dengan terus menggunakan platform setelah perubahan tersebut, Anda setuju dengan Ketentuan yang baru.</motion.p>
        </motion.div>
      </div>
    </div>
  )
}
export default TermsPage
