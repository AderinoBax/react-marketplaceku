import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

const MOCK_AUTH_USER = {
  id: 1, 
  token: 'dummy-token-ganti-nanti',
}
const MOCK_ADDRESSES = [
  { id: 1, label: 'Rumah', fullAddress: 'Jl. Merdeka No. 17, Jakarta Pusat, 10110' },
  { id: 2, label: 'Kantor', fullAddress: 'Jl. Jend. Sudirman Kav. 45, Jakarta Selatan, 12930' },
]

const MOCK_COURIERS = [
  { name: 'Standard', cost: 15000 },
  { name: 'Express', cost: 30000 },
  { name: 'Same Day', cost: 45000 },
]

const MOCK_PAYMENT_METHODS = [
  { name: 'Virtual Account', fee: 0 },
  { name: 'Credit Card', fee: 0 },
  { name: 'E-Wallet', fee: 0 },
]
const DEFAULT_TAX_RATE = 0.11 // 11%
const DEFAULT_TRANSACTION_FEE = 0.03 // 3%
function Checkout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { storeId, storeName, items } = location.state || { 
    storeId: 101, 
    storeName: 'Mock Store (Refresh)', 
    items: [
      { variantId: 1, quantity: 1, title: 'Mock Item (Refresh)', price: 100000, imageUrl: 'https://placehold.co/200x200' }
    ]
  }
  const [selectedAddressId, setSelectedAddressId] = useState(MOCK_ADDRESSES[0].id)
  const [selectedCourier, setSelectedCourier] = useState(MOCK_COURIERS[0])
  const [selectedPayment, setSelectedPayment] = useState(MOCK_PAYMENT_METHODS[0].name)
  const [totals, setTotals] = useState({
    subTotal: 0,
    tax: 0,
    transactionFee: 0,
    shipping: 0,
    total: 0,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  useEffect(() => {
    if (!location.state || !items || items.length === 0) {
      setError('Data keranjang tidak ditemukan. Mengarahkan kembali ke keranjang...')
      setTimeout(() => navigate('/cart'), 3000)
    }
  }, [location.state, items, navigate])
  useEffect(() => {
    if (items && items.length > 0) {
      const subTotalNum = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      const taxAmount = subTotalNum * DEFAULT_TAX_RATE
      const feeAmount = subTotalNum * DEFAULT_TRANSACTION_FEE
      const shippingCost = selectedCourier.cost
      const totalAmount = subTotalNum + taxAmount + feeAmount + shippingCost

      setTotals({
        subTotal: subTotalNum,
        tax: taxAmount,
        transactionFee: feeAmount,
        shipping: shippingCost,
        total: totalAmount,
      })
    }
  }, [items, selectedCourier])
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount)
  }
  const handleSubmitOrder = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const buyerId = MOCK_AUTH_USER.id
    const payload = {
      buyerId: buyerId,
      storeId: storeId,
      shippingAddressId: selectedAddressId,
      items: items.map(item => ({ 
        variantId: item.variantId, 
        quantity: item.quantity 
      })),
      shippingCost: selectedCourier.cost,
      courierName: selectedCourier.name,
      paymentMethod: selectedPayment,
    }
    try {
      const token = MOCK_AUTH_USER.token 
      const response = await fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Checkout gagal.')
      }
      console.log('Order berhasil dibuat:', data)
      alert(`Order ${data.orderId} berhasil dibuat! Menunggu pembayaran.`)
      navigate(`/order-status/${data.orderId}`) 
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (!items || items.length === 0) {
    return (
      <div className="container mx-auto py-12 px-6 min-h-screen text-center">
        <h1 className="text-2xl text-red-700">{error || 'Tidak ada item.'}</h1>
      </div>
    )
  }
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-extrabold text-red-800 mb-8">
          Checkout
        </h1>
        <form onSubmit={handleSubmitOrder} className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-2/3 space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                1. Alamat Pengiriman
              </h2>
              <div className="space-y-4">
                {MOCK_ADDRESSES.map(addr => (
                  <label key={addr.id} className="flex items-start p-4 border rounded-lg cursor-pointer">
                    <input
                      type="radio"
                      name="address"
                      value={addr.id}
                      checked={selectedAddressId === addr.id}
                      onChange={() => setSelectedAddressId(addr.id)}
                      className="mt-1 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="ml-4">
                      <span className="font-semibold text-lg">{addr.label}</span>
                      <p className="text-gray-600">{addr.fullAddress}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                2. Opsi Pengiriman
              </h2>
              <select
                value={selectedCourier.name}
                onChange={(e) => {
                  const courier = MOCK_COURIERS.find(c => c.name === e.target.value)
                  setSelectedCourier(courier)
                }}
                className="w-full p-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                {MOCK_COURIERS.map(c => (
                  <option key={c.name} value={c.name}>
                    {c.name} ({formatCurrency(c.cost)})
                  </option>
                ))}
              </select>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                3. Metode Pembayaran
              </h2>
              <select
                value={selectedPayment}
                onChange={(e) => setSelectedPayment(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                {MOCK_PAYMENT_METHODS.map(p => (
                  <option key={p.name} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Ringkasan Pesanan
              </h2>
              <p className="text-lg font-semibold text-blue-700 mb-4">{storeName}</p>
              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {items.map(item => (
                  <div key={item.variantId} className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">{item.title} (x{item.quantity})</span>
                    <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatCurrency(totals.subTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pajak (11%)</span>
                  <span className="font-medium">{formatCurrency(totals.tax)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Biaya Transaksi (3%)</span>
                  <span className="font-medium">{formatCurrency(totals.transactionFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Biaya Pengiriman</span>
                  <span className="font-medium">{formatCurrency(totals.shipping)}</span>
                </div>
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-red-800">{formatCurrency(totals.total)}</span>
                  </div>
                </div>
              </div>
              {error && (
                <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  <p>{error}</p>
                </div>
              )}
              
              <button
                type="submit"
                disabled={loading}
                className="mt-8 w-full block text-center px-6 py-4 bg-red-800 text-white text-lg font-bold rounded-lg shadow-lg hover:bg-red-900 transition-all disabled:bg-gray-400"
              >
                {loading ? 'Memproses Pesanan...' : `Bayar Sekarang (${formatCurrency(totals.total)})`}
              </button>
              <Link
                to="/cart"
                className="mt-4 w-full block text-center text-gray-600 hover:text-black"
              >
                Kembali ke Keranjang
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Checkout
