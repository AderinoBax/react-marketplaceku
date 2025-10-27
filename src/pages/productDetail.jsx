import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
const MOCK_PRODUCT = {
  id: 123,
  title: 'Nama Produk yang Cukup Panjang dan Deskriptif',
  description: `Ini adalah deskripsi lengkap produk. 
Paragraf pertama menjelaskan keunggulan utama.

Fitur Utama:
- Fitur A
- Fitur B
- Fitur C

Paragraf terakhir menjelaskan tentang garansi atau layanan purna jual.`,
  store: { id: 101, name: 'Toko Resmi Bax Digital', slug: 'toko-resmi-bax-digital' },
  images: [
    'https://placehold.co/600x600/ef4444/white?text=Gambar+Produk+1',
    'https://placehold.co/600x600/3b82f6/white?text=Gambar+2',
    'https://placehold.co/600x600/ef4444/white?text=Gambar+3',
    'https://placehold.co/600x600/3b82f6/white?text=Gambar+4',
  ],
  variants: [
    { id: 1, name: 'Merah Maroon', price: 299000, stock: 50, sku: 'BD-PRO-001-RED' },
    { id: 2, name: 'Biru Navy', price: 299000, stock: 30, sku: 'BD-PRO-001-BLUE' },
    { id: 3, name: 'Hitam (Stok Habis)', price: 299000, stock: 0, sku: 'BD-PRO-001-BLK' },
  ]
}
const MOCK_AUTH_USER = { 
  id: 1,
  token: 'dummy-token-ganti-nanti' 
}
function ProductDetail() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [addingToCart, setAddingToCart] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState(null)
  useEffect(() => {
    setLoading(true)
    setError(null)
    const fetchProduct = () => {
      try {
        console.log(`Fetching product with ID: ${productId}`)
        if (!MOCK_PRODUCT) {
          throw new Error('Produk tidak ditemukan')
        }
        setProduct(MOCK_PRODUCT)
        const defaultVariant = MOCK_PRODUCT.variants.find(v => v.stock > 0)
        setSelectedVariant(defaultVariant || MOCK_PRODUCT.variants[0])
        setSelectedImage(0)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    const timer = setTimeout(fetchProduct, 500)
    return () => clearTimeout(timer)
  }, [productId])
  const handleQuantityChange = (amount) => {
    setQuantity(prevQty => {
      const newQty = prevQty + amount
      if (newQty < 1) return 1
      if (selectedVariant && newQty > selectedVariant.stock) return selectedVariant.stock
      return newQty
    })
  }
  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant)
    setQuantity(1)
  }
  const handleAddToCart = async () => {
    if (!selectedVariant || selectedVariant.stock === 0) {
      setFeedbackMessage({ type: 'error', text: 'Varian ini sedang habis.' })
      return
    }
    if (quantity > selectedVariant.stock) {
      setFeedbackMessage({ type: 'error', text: `Stok tidak mencukupi (tersisa ${selectedVariant.stock}).` })
      return
    }
    setAddingToCart(true)
    setFeedbackMessage(null)
    const payload = {
      userId: MOCK_AUTH_USER.id,
      productVariantId: selectedVariant.id,
      quantity: quantity
    }
    try {
      const token = MOCK_AUTH_USER.token
      const response = await fetch('http://localhost:3000/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Gagal menambahkan ke keranjang')
      }
      setFeedbackMessage({ type: 'success', text: 'Berhasil ditambahkan ke keranjang!' })
    } catch (err) {
      setFeedbackMessage({ type: 'error', text: err.message })
    } finally {
      setAddingToCart(false)
      setTimeout(() => setFeedbackMessage(null), 3000)
    }
  }
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount)
  }
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><p>Memuat detail produk...</p></div>
  }
  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-600"><p>{error}</p></div>
  }
  if (!product) {
    return <div className="min-h-screen flex items-center justify-center"><p>Produk tidak ditemukan.</p></div>
  }
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow-xl rounded-lg border border-gray-200 p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <div className="aspect-w-1 aspect-h-1 mb-4 overflow-hidden rounded-lg shadow-md">
                <img 
                  src={product.images[selectedImage]} 
                  alt={product.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex space-x-2 overflow-x-auto p-1">
                {product.images.map((img, index) => (
                  <button 
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all ${selectedImage === index ? 'border-blue-600 shadow' : 'border-transparent hover:border-gray-300'}`}
                  >
                    <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col space-y-6">
              <div>
                <Link to={`/store/${product.store.slug}`} className="text-lg font-medium text-blue-600 hover:underline">
                  {product.store.name}
                </Link>
                <h1 className="text-4xl font-extrabold text-red-800 mt-1">
                  {product.title}
                </h1>
              </div>
              <div className="text-4xl font-bold text-gray-900">
                {formatCurrency(selectedVariant ? selectedVariant.price : product.variants[0].price)}
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Pilih Varian: <span className="font-semibold">{selectedVariant?.name}</span></h3>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map(variant => (
                    <button
                      key={variant.id}
                      onClick={() => handleVariantSelect(variant)}
                      disabled={variant.stock === 0}
                      className={`
                        px-4 py-2 border rounded-lg font-medium transition-all
                        ${selectedVariant?.id === variant.id 
                          ? 'bg-blue-600 text-white border-blue-600 ring-2 ring-blue-300' 
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}
                        ${variant.stock === 0 ? 'bg-gray-100 text-gray-400 line-through cursor-not-allowed' : ''}
                      `}
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Jumlah</h3>
                <div className="flex items-center border border-gray-300 rounded-lg max-w-[150px]">
                  <button 
                    onClick={() => handleQuantityChange(-1)}
                    disabled={!selectedVariant || selectedVariant.stock === 0}
                    className="px-4 py-2 text-xl font-bold text-gray-600 hover:bg-gray-100 rounded-l-lg disabled:bg-gray-50 disabled:cursor-not-allowed"
                  >
                    -
                  </button>
                  <input 
                    type="text" 
                    readOnly
                    value={quantity} 
                    className="w-full text-center border-l border-r border-gray-300 py-2 focus:outline-none"
                  />
                  <button 
                    onClick={() => handleQuantityChange(1)}
                    disabled={!selectedVariant || selectedVariant.stock === 0}
                    className="px-4 py-2 text-xl font-bold text-gray-600 hover:bg-gray-100 rounded-r-lg disabled:bg-gray-50 disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Stok tersisa: {selectedVariant?.stock || 0}
                </p>
              </div>
              <div className="space-y-4">
                {feedbackMessage && (
                  <div className={`p-3 rounded-lg text-center ${feedbackMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {feedbackMessage.text}
                  </div>
                )}
                <button
                  onClick={handleAddToCart}
                  disabled={addingToCart || !selectedVariant || selectedVariant.stock === 0}
                  className="w-full flex items-center justify-center px-6 py-4 bg-red-800 text-white text-lg font-bold rounded-lg shadow-lg hover:bg-red-900 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c.121.001.24.015.358.043a4.5 4.5 0 0 1 4.162 4.162l-.002 1.168a2.25 2.25 0 0 1-2.247 2.247H5.25a2.25 2.25 0 0 1-2.247-2.247L3.003 3.5H3.75M16.5 18a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                  </svg>
                  {addingToCart ? 'Menambahkan...' : (!selectedVariant || selectedVariant.stock === 0 ? 'Stok Habis' : 'Tambah ke Keranjang')}
                </button>
              </div>
              <div className="border-t pt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Deskripsi Produk</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {product.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ProductDetail

