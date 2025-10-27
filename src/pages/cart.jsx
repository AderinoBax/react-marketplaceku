import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { X, Plus, Minus, Loader2, ShoppingCart, Trash2 } from 'lucide-react'
const MOCK_CART = {
  storeId: 'store-001',
  storeName: 'Toko Elektronik Jaya',
  items: [
    { id: 1, variantId: 'v1', title: 'Jam Tangan Pintar Pro v2', price: 1499000, quantity: 1, imageUrl: 'https://placehold.co/600x600/ef4444/white?text=Produk+1' },
    { id: 4, variantId: 'v4', title: 'Wireless Headphone Elite', price: 2199000, quantity: 1, imageUrl: 'https://placehold.co/600x600/3b82f6/white?text=Produk+4' },
  ]
}
const TAX_RATE = 0.11
const TRANSACTION_FEE_RATE = 0.03
const SHIPPING_COST = 15000
const MOCK_AUTH_USER = { userId: 'user-123', token: 'fake-token-xyz' }
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}
const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
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
      delay: 0.2,
    },
  },
}
function CartPage() {
  const [cart, setCart] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [subTotal, setSubTotal] = useState(0)
  const [tax, setTax] = useState(0)
  const [fee, setFee] = useState(0)
  const [total, setTotal] = useState(0)
  const navigate = useNavigate()
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setCart(MOCK_CART)
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])
  useEffect(() => {
    if (cart && cart.items) {
      const newSubTotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      const newTax = newSubTotal * TAX_RATE
      const newFee = newSubTotal * TRANSACTION_FEE_RATE
      setSubTotal(newSubTotal)
      setTax(newTax)
      setFee(newFee)
      setTotal(newSubTotal + newTax + newFee + SHIPPING_COST)
    } else {
      setSubTotal(0); setTax(0); setFee(0); setTotal(0);
    }
  }, [cart])
  const handleUpdateQuantity = (variantId, newQuantity) => {
    if (newQuantity < 1) newQuantity = 1
    const newCart = { ...cart }
    const itemIndex = newCart.items.findIndex(item => item.variantId === variantId)
    if (itemIndex > -1) {
      newCart.items[itemIndex].quantity = newQuantity
      setCart(newCart)
    }
  }
  const handleRemoveItem = (variantId) => {
    const newCart = { ...cart }
    newCart.items = newCart.items.filter(item => item.variantId !== variantId)
    setCart(newCart)
  }
  const handleCheckout = () => {
    navigate('/checkout', {
      state: {
        items: cart.items,
        storeId: cart.storeId,
        storeName: cart.storeName,
        subTotal, tax, fee, shippingCost: SHIPPING_COST, total
      }
    })
  }
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
      </div>
    )
  }
  if (!cart || cart.items.length === 0) {
    return <CartEmpty />
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
          Keranjang Belanja Anda
        </motion.h1>
        <div className="flex flex-col lg:flex-row gap-12">
          <motion.div
            className="lg:w-2/3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">Toko: {cart.storeName}</h2>
              </div>
              {cart.items.map((item) => (
                <CartItem
                  key={item.variantId}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveItem={handleRemoveItem}
                />
              ))}
            </div>
          </motion.div>
          <motion.div
            className="lg:w-1/3"
            variants={summaryVariants}
            initial="hidden"
            animate="visible"
          >
            <OrderSummary
              subTotal={subTotal}
              tax={tax}
              fee={fee}
              shippingCost={SHIPPING_COST}
              total={total}
              onCheckout={handleCheckout}
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
const CartItem = ({ item, onUpdateQuantity, onRemoveItem }) => (
  <motion.div
    className="flex flex-col sm:flex-row items-center gap-6 p-6 border-b border-gray-200"
    variants={itemVariants}
    layout
  >
    <img src={item.imageUrl} alt={item.title} className="w-32 h-32 object-cover rounded-lg flex-shrink-0" />
    <div className="flex-grow w-full">
      <Link to={`/products/${item.id}`} className="text-lg font-semibold text-gray-900 hover:text-blue-600">
        {item.title}
      </Link>
      <p className="text-xl font-bold text-red-700 my-2">
        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.price)}
      </p>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center border border-gray-300 rounded-lg">
          <button
            onClick={() => onUpdateQuantity(item.variantId, item.quantity - 1)}
            className="p-2 text-gray-600 hover:text-red-600 disabled:opacity-50"
            disabled={item.quantity <= 1}
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="px-4 py-1 text-center w-12 font-semibold">{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.variantId, item.quantity + 1)}
            className="p-2 text-gray-600 hover:text-blue-600"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <button
          onClick={() => onRemoveItem(item.variantId)}
          className="text-gray-500 hover:text-red-600 transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  </motion.div>
)
const OrderSummary = ({ subTotal, tax, fee, shippingCost, total, onCheckout }) => (
  <div className="bg-white rounded-lg shadow-lg p-8 sticky top-24">
    <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-4 mb-6">
      Ringkasan Pesanan
    </h2>
    <div className="space-y-4 text-gray-700">
      <div className="flex justify-between">
        <span>Subtotal</span>
        <span className="font-medium">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(subTotal)}</span>
      </div>
      <div className="flex justify-between">
        <span>Pajak (11%)</span>
        <span className="font-medium">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(tax)}</span>
      </div>
      <div className="flex justify-between">
        <span>Biaya Transaksi (3%)</span>
        <span className="font-medium">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(fee)}</span>
      </div>
      <div className="flex justify-between">
        <span>Biaya Pengiriman</span>
        <span className="font-medium">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(shippingCost)}</span>
      </div>
      <div className="border-t border-gray-200 pt-6 mt-6">
        <div className="flex justify-between text-xl font-bold text-gray-900">
          <span>Total</span>
          <span>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(total)}</span>
        </div>
      </div>
    </div>
    <button
      onClick={onCheckout}
      className="w-full mt-8 px-6 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
    >
      Lanjut ke Checkout
    </button>
  </div>
)
const CartEmpty = () => (
  <motion.div
    className="container mx-auto px-6 py-24 text-center flex flex-col items-center min-h-[70vh] justify-center"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <ShoppingCart className="w-32 h-32 text-red-200 mb-8" />
    <h1 className="text-4xl font-bold text-red-800 mb-4">
      Keranjang Anda Kosong
    </h1>
    <p className="text-xl text-gray-600 mb-10 max-w-lg">
      Sepertinya Anda belum menambahkan produk apapun ke keranjang. Mari kita cari sesuatu!
    </p>
    <Link
      to="/products"
      className="px-10 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
    >
      Mulai Belanja
    </Link>
  </motion.div>
)
export default CartPage

