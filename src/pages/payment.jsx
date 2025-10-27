import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, Loader2, AlertCircle, CheckCircle } from 'lucide-react'
const MOCK_ORDER = {
  id: 'mock-12345',
  totalAmount: 549000,
  status: 'PENDING',
  paymentMethod: 'Virtual Account',
  virtualAccount: '7001208123456789',
  items: [
    { name: 'Produk A', quantity: 1 },
  ]
}
const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      duration: 0.5, 
      ease: "easeOut", 
      staggerChildren: 0.1 
    } 
  }
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}
function PaymentPage() {
  const { orderId } = useParams()
  const [order, setOrder] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    setIsLoading(true)
    setError(null)
    setTimeout(() => {
      const simulatedOrder = { ...MOCK_ORDER, id: orderId }
      setOrder(simulatedOrder)
      setIsLoading(false)
    }, 1500)
  }, [orderId])
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
      </div>
    )
  }
  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[80vh] text-center px-6">
        <AlertCircle className="w-20 h-20 text-red-500 mb-6" />
        <h1 className="text-4xl font-bold text-red-800 mb-4">Terjadi Kesalahan</h1>
        <p className="text-xl text-gray-600 mb-8">{error}</p>
        <Link
          to="/products"
          className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-all"
        >
          Kembali Belanja
        </Link>
      </div>
    )
  }
  if (!order) {
    return null
  }
  const isPaid = order.status !== 'PENDING'
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-6">
      <motion.div
        className="w-full max-w-2xl bg-white p-12 sm:p-16 rounded-xl shadow-2xl text-center"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          {isPaid ? (
            <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
          ) : (
            <Clock className="w-24 h-24 text-yellow-500 mx-auto mb-6" />
          )}
        </motion.div>
        <motion.h1 variants={itemVariants} className="text-4xl font-bold text-red-800 mb-3">
          {isPaid ? 'Pembayaran Berhasil!' : 'Menunggu Pembayaran'}
        </motion.h1>
        <motion.p variants={itemVariants} className="text-lg text-gray-600 mb-6">
          {isPaid ? 'Pesanan Anda telah dikonfirmasi.' : 'Pesanan Anda telah dibuat. Segera selesaikan pembayaran.'}
        </motion.p>
        <motion.div variants={itemVariants} className="bg-gray-100 p-6 rounded-lg mb-8 text-left">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Total Pembayaran</span>
            <span className="text-2xl font-bold text-gray-900">
              {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(order.totalAmount)}
            </span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Order ID</span>
            <span className="font-semibold text-gray-900">#{order.id}</span>
          </div>
          {!isPaid && (
            <>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Metode</span>
                <span className="font-semibold text-gray-900">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Nomor VA</span>
                <span className="font-bold text-lg text-blue-600">{order.virtualAccount}</span>
              </div>
            </>
          )}
        </motion.div>
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/"
            className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-all"
          >
            Kembali ke Beranda
          </Link>
          <Link
            to="/profile/orders"
            className="w-full sm:w-auto px-8 py-4 bg-gray-200 text-gray-800 text-lg font-semibold rounded-lg hover:bg-gray-300 transition-all"
          >
            Lihat Pesanan Saya
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
export default PaymentPage

