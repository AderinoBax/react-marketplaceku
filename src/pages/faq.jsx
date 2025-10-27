import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'
const MOCK_FAQS = [
  {
    q: "Bagaimana cara melacak pesanan saya?",
    a: "Anda dapat melacak status pesanan Anda secara real-time dengan mengunjungi halaman 'Pesanan Saya' di profil akun Anda. Kami juga akan mengirimkan email notifikasi di setiap tahap pengiriman."
  },
  {
    q: "Apa kebijakan pengembalian barang (refund)?",
    a: "Kami menawarkan kebijakan pengembalian 14 hari tanpa syarat untuk semua produk yang belum dibuka. Untuk produk yang rusak, silakan hubungi layanan pelanggan kami dalam waktu 24 jam setelah barang diterima untuk proses penggantian."
  },
  {
    q: "Berapa lama waktu pengiriman?",
    a: "Waktu pengiriman bervariasi tergantung lokasi Anda dan kurir yang dipilih. Pengiriman standar biasanya memakan waktu 2-4 hari kerja untuk wilayah Jabodetabek dan 3-7 hari kerja untuk di luar Jabodetabek."
  },
  {
    q: "Apakah saya bisa mengubah atau membatalkan pesanan?",
    a: "Anda dapat membatalkan pesanan selama statusnya masih 'Menunggu Pembayaran' or 'Sedang Diproses'. Pesanan yang sudah 'Dikirim' tidak dapat dibatalkan. Perubahan alamat juga hanya bisa dilakukan sebelum pesanan dikirim."
  },
  {
    q: "Metode pembayaran apa saja yang diterima?",
    a: "Kami menerima berbagai metode pembayaran, termasuk Transfer Bank (Virtual Account), Kartu Kredit (Visa, MasterCard), dan dompet digital (OVO, GoPay, Dana)."
  }
]
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}
const answerVariants = {
  hidden: { opacity: 0, height: 0, y: -10 },
  visible: { opacity: 1, height: 'auto', y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, height: 0, y: -10, transition: { duration: 0.2, ease: "easeIn" } }
}
function FaqPage() {
  const [expanded, setExpanded] = useState(0)
  return (
    <div className="bg-white min-h-screen py-16 md:py-24">
      <div className="container mx-auto max-w-4xl px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <HelpCircle className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Punya Pertanyaan?
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Kami di sini untuk membantu. Temukan jawaban yang paling sering ditanyakan di bawah ini.
          </p>
        </motion.div>
        <motion.div 
          className="divide-y divide-gray-200 border-t border-b border-gray-200"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {MOCK_FAQS.map((faq, i) => (
            <motion.div key={i} className="py-6" variants={itemVariants}>
              <button 
                onClick={() => setExpanded(expanded === i ? null : i)}
                className="flex justify-between items-center w-full text-left"
              >
                <h3 className="text-xl font-semibold text-gray-900">{faq.q}</h3>
                <motion.div
                  animate={{ rotate: expanded === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-6 h-6 text-gray-500" />
                </motion.div>
              </button>
              <AnimatePresence>
                {expanded === i && (
                  <motion.div
                    variants={answerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="overflow-hidden"
                  >
                    <p className="pt-4 text-gray-700 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
export default FaqPage
