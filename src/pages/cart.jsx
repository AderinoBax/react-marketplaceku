import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const mockCartData = {
  id: 1,
  userId: 1, 
  items: [
    {
      id: 1,
      cartId: 1,
      productVariantId: 1,
      quantity: 1,
      productVariant: {
        id: 1,
        sku: 'SKU-CAM-XT30',
        price: 12500000,
        product: {
          id: 1,
          title: 'Kamera Mirrorless Canggih XT-30',
          store: { name: 'Kamera Maju Jaya' },
        },
        imageUrl: 'https://placehold.co/600x400/3182CE/FFFFFF?text=Kamera',
      },
    },
    {
      id: 2,
      cartId: 1,
      productVariantId: 2,
      quantity: 2,
      productVariant: {
        id: 2,
        sku: 'SKU-RUN-ZOOMX',
        price: 899000,
        product: {
          id: 2,
          title: 'Sepatu Lari Nyaman ZoomX',
          store: { name: 'Sport Station' },
        },
        imageUrl: 'https://placehold.co/600x400/E53E3E/FFFFFF?text=Sepatu',
      },
    },
  ],
  subTotal: '14298000.00', 
}
const DEFAULT_TAX_RATE = 0.11 
const DEFAULT_TRANSACTION_FEE = 0.03 
const MOCK_SHIPPING_COST = 25000 
function Cart() {
  const [cartData, setCartData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [totals, setTotals] = useState({
    subTotal: 0,
    tax: 0,
    transactionFee: 0,
    shipping: MOCK_SHIPPING_COST,
    total: 0,
  })
  useEffect(() => {
    setLoading(true)
    setError(null)
    setTimeout(() => {
      try {
        const data = mockCartData
        if (data && data.items.length === 0) {
          data.subTotal = '0.00' 
        }
        setCartData(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }, 1000) 
  }, [])
  useEffect(() => {
    if (cartData && cartData.items.length > 0) {
      const subTotalNum = parseFloat(cartData.subTotal)
      const taxAmount = subTotalNum * DEFAULT_TAX_RATE
      const feeAmount = subTotalNum * DEFAULT_TRANSACTION_FEE
      const totalAmount = subTotalNum + taxAmount + feeAmount + MOCK_SHIPPING_COST

      setTotals({
        subTotal: subTotalNum,
        tax: taxAmount,
        transactionFee: feeAmount,
        shipping: MOCK_SHIPPING_COST,
        total: totalAmount,
      })
    } else {
      setTotals({
        subTotal: 0,
        tax: 0,
        transactionFee: 0,
        shipping: 0,
        total: 0,
      })
    }
  }, [cartData]) 
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount)
  }
  const handleRemoveItem = (productVariantId) => {
    alert(`(TODO) Hapus item dengan variant ID: ${productVariantId}`)
  }
  const handleUpdateQuantity = (productVariantId, newQuantity) => {
    alert(`(TODO) Update item ${productVariantId} menjadi ${newQuantity}`)
  }
  if (loading) {
    return (
      <div className="container mx-auto py-12 px-6 min-h-screen text-center">
        <p className="text-gray-600 text-lg">Memuat keranjang Anda...</p>
      </div>
    )
  }
  if (error) {
    return (
      <div className="container mx-auto py-12 px-6 min-h-screen text-center">
        <p className="text-red-600 text-lg">Error: {error}</p>
      </div>
    )
  }
  if (!cartData || cartData.items.length === 0) {
    return (
      <div className="container mx-auto py-20 px-6 min-h-screen text-center">
        <h1 className="text-4xl font-extrabold text-red-800 mb-6">
          Keranjang Anda Kosong
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Sepertinya Anda belum menambahkan produk apapun ke keranjang.
        </p>
        <Link
          to="/products"
          className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
        >
          Mulai Belanja Sekarang
        </Link>
      </div>
    )
  }
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-extrabold text-red-800 mb-8">
          Keranjang Belanja
        </h1>
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
              <ul className="divide-y divide-gray-200">
                {cartData.items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    formatCurrency={formatCurrency}
                    onRemove={handleRemoveItem}
                    onUpdateQuantity={handleUpdateQuantity}
                  />
                ))}
              </ul>
            </div>
          </div>
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Ringkasan Pesanan
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    {formatCurrency(totals.subTotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pajak (11%)</span>
                  <span className="font-medium">
                    {formatCurrency(totals.tax)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Biaya Transaksi (3%)</span>
                  <span className="font-medium">
                    {formatCurrency(totals.transactionFee)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Biaya Pengiriman</span>
                  <span className="font-medium">
                    {formatCurrency(totals.shipping)}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-red-800">
                      {formatCurrency(totals.total)}
                    </span>
                  </div>
                </div>
              </div>
              <Link
                to="/checkout" 
                className="mt-8 w-full block text-center px-6 py-4 bg-red-800 text-white text-lg font-bold rounded-lg shadow-lg hover:bg-red-900 transition-all"
              >
                Lanjut ke Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
function CartItem({ item, formatCurrency, onRemove, onUpdateQuantity }) {
  const { productVariant, quantity } = item
  return (
    <li className="p-6 flex flex-col sm:flex-row gap-6">
      <img
        className="w-full sm:w-32 h-32 object-cover rounded-lg border border-gray-200"
        src={productVariant.imageUrl}
        alt={productVariant.product.title}
        onError={(e) => {
          e.target.onerror = null
          e.target.src = 'https://placehold.co/400x400/CCCCCC/FFFFFF?text=No+Image'
        }}
      />
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <p className="text-sm text-blue-600 font-semibold">
            {productVariant.product.store.name}
          </p>
          <Link
            to={`/products/${productVariant.product.id}`}
            className="text-lg font-bold text-gray-800 hover:underline"
          >
            {productVariant.product.title}
          </Link>
          <p className="text-lg font-semibold text-red-800 mt-1">
            {formatCurrency(productVariant.price)}
          </p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <label htmlFor={`quantity-${item.id}`} className="sr-only">
              Kuantitas
            </label>
            <input
              type="number"
              id={`quantity-${item.id}`}
              min="1"
              value={quantity}
              onChange={(e) =>
                onUpdateQuantity(item.productVariantId, parseInt(e.target.value))
              }
              className="w-20 px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <button
            onClick={() => onRemove(item.productVariantId)}
            className="text-sm font-medium text-red-600 hover:text-red-800 hover:underline"
          >
            Hapus
          </button>
        </div>
      </div>
    </li>
  )
}

export default Cart
