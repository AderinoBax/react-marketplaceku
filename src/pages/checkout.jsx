import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Truck, CreditCard, Wallet, CheckCircle, Loader2, AlertCircle } from 'lucide-react'
const MOCK_AUTH_USER = { userId: 'user-123', token: 'fake-token-xyz' }
const MOCK_ADDRESSES = [
  { id: 'addr-001', label: 'Rumah', name: 'Aderino Arya Nanda', phone: '081234567890', details: 'Jl. Merdeka No. 17, Jakarta Selatan, DKI Jakarta, 12345' },
  { id: 'addr-002', label: 'Kantor', name: 'Aderino (BDI)', phone: '081234567891', details: 'Gedung Bax Digital, Jl. Sudirman Kav. 1, Jakarta Pusat, DKI Jakarta, 10220' },
]
const MOCK_COURIERS = [
  { id: 'courier-001', name: 'Reguler (SiCepat)', price: 15000, eta: '2-3 Hari' },
  { id: 'courier-002', name: 'Kargo (JNE Trucking)', price: 45000, eta: '3-5 Hari' },
  { id: 'courier-003', name: 'Instan (GoSend)', price: 25000, eta: '2-3 Jam' },
]
const MOCK_PAYMENTS = [
  { id: 'pay-001', name: 'Virtual Account', icon: CreditCard },
  { id: 'pay-002', name: 'E-Wallet (GoPay)', icon: Wallet },
  { id: 'pay-003', name: 'Kartu Kredit/Debit', icon: CreditCard },
]
const mainVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.2
    },
  },
}
const summaryVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      delay: 0.2
    },
  },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}
function CheckoutPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [orderData, setOrderData] = useState(null)
  const [selectedAddressId, setSelectedAddressId] = useState(MOCK_ADDRESSES[0].id)
  const [selectedCourier, setSelectedCourier] = useState(MOCK_COURIERS[0])
  const [selectedPayment, setSelectedPayment] = useState(MOCK_PAYMENTS[0])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  useEffect(() => {
    if (!location.state) {
      navigate('/cart')
    } else {
      setOrderData(location.state)
    }
  }, [location, navigate])
  const handleSubmitOrder = async () => {
    if (!selectedAddressId || !selectedCourier || !selectedPayment) {
      setError('Harap lengkapi semua pilihan (alamat, kurir, dan pembayaran).')
      return
    }
    setIsLoading(true)
    setError(null)
    const itemsPayload = orderData.items.map(item => ({
      variantId: item.variantId,
      quantity: item.quantity,
    }))
    const payload = {
      buyerId: MOCK_AUTH_USER.userId,
      storeId: orderData.storeId,
      shippingAddressId: selectedAddressId,
      items: itemsPayload,
      shippingCost: selectedCourier.price,
      courierName: selectedCourier.name,
      paymentMethod: selectedPayment.name,
    }
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      const mockOrderId = `ORD-${Date.now()}`
      navigate(`/order-status/${mockOrderId}`, { replace: true })
    } catch (err) {
      setError('Gagal membuat pesanan. Silakan coba lagi.')
      setIsLoading(false)
    }
  }
  if (!orderData) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
      </div>
    )
  }
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-6">
        <motion.h1
          className="text-4xl font-bold text-center text-red-800 mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Checkout
        </motion.h1>
        {error && (
          <motion.div
            className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-8 flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <AlertCircle className="w-6 h-6 flex-shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}
        <div className="flex flex-col lg:flex-row gap-12">
          <motion.div
            className="lg:w-2/3 space-y-8"
            variants={mainVariants}
            initial="hidden"
            animate="visible"
          >
            <AddressSelector selectedId={selectedAddressId} onSelect={setSelectedAddressId} />
            <ShippingSelector selectedId={selectedCourier.id} onSelect={setSelectedCourier} />
            <PaymentSelector selectedId={selectedPayment.id} onSelect={setSelectedPayment} />
          </motion.div>
          <motion.div
            className="lg:w-1/3"
            variants={summaryVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="bg-white rounded-lg shadow-lg p-8 sticky top-24">
              <OrderSummary orderData={orderData} shippingCost={selectedCourier.price} />
              <button
                onClick={handleSubmitOrder}
                disabled={isLoading}
                className="w-full mt-8 px-6 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed flex justify-center items-center"
              >
                {isLoading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  `Bayar Sekarang (${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(orderData.total - orderData.shippingCost + selectedCourier.price)})`
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
const AddressSelector = ({ selectedId, onSelect }) => (
  <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-lg p-8">
    <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
      <MapPin className="w-7 h-7 text-blue-600" />
      Alamat Pengiriman
    </h2>
    <div className="space-y-4">
      {MOCK_ADDRESSES.map((addr) => (
        <label
          key={addr.id}
          className={`flex p-5 border rounded-lg cursor-pointer transition-all ${
            selectedId === addr.id
              ? 'border-blue-600 ring-2 ring-blue-600 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <input
            type="radio"
            name="address"
            value={addr.id}
            checked={selectedId === addr.id}
            onChange={() => onSelect(addr.id)}
            className="mt-1 mr-4"
          />
          <div>
            <span className="text-sm font-semibold bg-gray-200 text-gray-800 px-2 py-0.5 rounded-full">{addr.label}</span>
            <p className="font-semibold text-gray-800 mt-2">{addr.name} ({addr.phone})</p>
            <p className="text-gray-600">{addr.details}</p>
          </div>
          {selectedId === addr.id && (
            <CheckCircle className="w-6 h-6 text-blue-600 ml-auto flex-shrink-0" />
          )}
        </label>
      ))}
    </div>
  </motion.div>
)
const ShippingSelector = ({ selectedId, onSelect }) => (
  <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-lg p-8">
    <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
      <Truck className="w-7 h-7 text-blue-600" />
      Metode Pengiriman
    </h2>
    <div className="space-y-4">
      {MOCK_COURIERS.map((courier) => (
        <label
          key={courier.id}
          className={`flex items-center p-5 border rounded-lg cursor-pointer transition-all ${
            selectedId === courier.id
              ? 'border-blue-600 ring-2 ring-blue-600 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <input
            type="radio"
            name="shipping"
            value={courier.id}
            checked={selectedId === courier.id}
            onChange={() => onSelect(courier)}
            className="mr-4"
          />
          <div className="flex-grow">
            <p className="font-semibold text-gray-800">{courier.name}</p>
            <p className="text-gray-600 text-sm">Estimasi {courier.eta}</p>
          </div>
          <span className="font-semibold text-gray-800">
            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(courier.price)}
          </span>
        </label>
      ))}
    </div>
  </motion.div>
)
const PaymentSelector = ({ selectedId, onSelect }) => (
  <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-lg p-8">
    <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
      <CreditCard className="w-7 h-7 text-blue-600" />
      Metode Pembayaran
    </h2>
    <div className="space-y-4">
      {MOCK_PAYMENTS.map((payment) => (
        <label
          key={payment.id}
          className={`flex items-center p-5 border rounded-lg cursor-pointer transition-all ${
            selectedId === payment.id
              ? 'border-blue-600 ring-2 ring-blue-600 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <input
            type="radio"
            name="payment"
            value={payment.id}
            checked={selectedId === payment.id}
            onChange={() => onSelect(payment)}
            className="mr-4"
          />
          <payment.icon className="w-6 h-6 text-gray-700 mr-4" />
          <span className="font-semibold text-gray-800">{payment.name}</span>
          {selectedId === payment.id && (
            <CheckCircle className="w-6 h-6 text-blue-600 ml-auto" />
          )}
        </label>
      ))}
    </div>
  </motion.div>
)
const OrderSummary = ({ orderData, shippingCost }) => {
  const finalTotal = orderData.subTotal + orderData.tax + orderData.fee + shippingCost
  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-4 mb-6">
        Ringkasan Pesanan
      </h2>
      <div className="space-y-3">
        {orderData.items.map(item => (
          <div key={item.variantId} className="flex items-center gap-4">
            <img src={item.imageUrl} alt={item.title} className="w-16 h-16 rounded-lg object-cover" />
            <div className="flex-grow">
              <p className="text-gray-800 font-medium truncate">{item.title}</p>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
            <span className="text-gray-800 font-medium">
              {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>
      <div className="space-y-4 text-gray-700 border-t border-gray-200 pt-6 mt-6">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-medium">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(orderData.subTotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Pajak (11%)</span>
          <span className="font-medium">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(orderData.tax)}</span>
        </div>
        <div className="flex justify-between">
          <span>Biaya Transaksi (3%)</span>
          <span className="font-medium">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(orderData.fee)}</span>
        </div>
        <div className="flex justify-between">
          <span>Biaya Pengiriman</span>
          <span className="font-medium">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(shippingCost)}</span>
        </div>
        <div className="border-t border-gray-200 pt-6 mt-6">
          <div className="flex justify-between text-xl font-bold text-gray-900">
            <span>Total</span>
            <span>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(finalTotal)}</span>
          </div>
        </div>
      </div>
    </>
  )
}
export default CheckoutPage

