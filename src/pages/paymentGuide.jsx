import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CreditCard, Banknote, Wallet, CheckCircle } from 'lucide-react'
const paymentMethods = [
  {
    name: "Virtual Account (VA)",
    icon: Banknote,
    steps: [
      "Pilih 'Virtual Account' saat checkout.",
      "Salin nomor VA yang tertera di halaman pembayaran.",
      "Buka aplikasi m-banking atau ATM Anda.",
      "Pilih menu 'Transfer' > 'Virtual Account'.",
      "Masukkan nomor VA dan konfirmasi jumlah pembayaran.",
      "Pembayaran akan terverifikasi otomatis dalam 1-5 menit."
    ]
  },
  {
    name: "Kartu Kredit",
    icon: CreditCard,
    steps: [
      "Pilih 'Kartu Kredit' saat checkout.",
      "Masukkan nomor kartu, tanggal kadaluarsa, dan CVV.",
      "Anda akan diarahkan ke halaman 3D Secure bank Anda.",
      "Masukkan kode OTP yang dikirimkan ke ponsel Anda.",
      "Pembayaran akan langsung terkonfirmasi."
    ]
  },
  {
    name: "Dompet Digital (E-Wallet)",
    icon: Wallet,
    steps: [
      "Pilih E-Wallet (misal: GoPay, OVO) saat checkout.",
      "Masukkan nomor ponsel yang terdaftar di aplikasi E-Wallet Anda.",
      "Buka aplikasi E-Wallet Anda.",
      "Anda akan melihat notifikasi permintaan pembayaran.",
      "Konfirmasi pembayaran dengan memasukkan PIN Anda.",
      "Pembayaran akan langsung terkonfirmasi."
    ]
  }
]
const contentVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.2, ease: "easeIn" } }
}
const stepVariants = (i) => ({
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { delay: i * 0.1 } }
})
function PaymentGuidePage() {
  const [activeTab, setActiveTab] = useState(0)
  return (
    <div className="bg-white min-h-screen py-16 md:py-24">
      <div className="container mx-auto max-w-4xl px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <CreditCard className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Panduan Pembayaran
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pelajari cara membayar pesanan Anda dengan mudah dan aman di Marketplaceku.
          </p>
        </motion.div>
        <div className="flex border-b border-gray-200">
          {paymentMethods.map((method, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`flex items-center gap-2 py-4 px-6 text-lg font-medium border-b-2 transition-colors duration-300
                ${activeTab === index 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                }
              `}
            >
              <method.icon className="w-5 h-5" />
              <span>{method.name}</span>
            </button>
          ))}
        </div>
        <div className="py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <ul className="space-y-4">
                {paymentMethods[activeTab].steps.map((step, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-3"
                    variants={stepVariants(i)}
                    initial="hidden"
                    animate="visible"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 text-lg leading-relaxed">{step}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
export default PaymentGuidePage
