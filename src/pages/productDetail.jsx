import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Plus, Minus, CheckCircle, AlertCircle, Loader2, Store, ChevronLeft } from 'lucide-react'
const MOCK_PRODUCT = {
  id: 'prod-001',
  title: 'Nama Produk Premium yang Cukup Panjang',
  storeName: "Toko Resmi Bax Digital",
  storeSlug: "bax-digital-store",
  images: [
    'https://placehold.co/600x600/ef4444/white?text=Gambar+1',
    'https://placehold.co/600x600/3b82f6/white?text=Gambar+2',
    'https://placehold.co/600x600/16a34a/white?text=Gambar+3',
  ],
  description: "Ini adalah deskripsi produk yang sangat mendetail. Menjelaskan semua fitur unggulan, bahan yang digunakan, serta manfaat yang akan didapat oleh pelanggan. Dibuat dengan material terbaik untuk daya tahan maksimal dan kenyamanan pengguna.",
  variants: [
    { id: 'var-001', name: 'Hitam', price: 499000, stock: 15 },
    { id: 'var-002', name: 'Putih', price: 499000, stock: 10 },
    { id: 'var-003', name: 'Merah Maroon', price: 510000, stock: 0 },
    { id: 'var-004', name: 'Biru Navy', price: 510000, stock: 5 },
  ]
}
const MOCK_AUTH_USER = { userId: 'user-123', token: 'fake-token-xyz' }
const galleryVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
}
const infoVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 0.6, 
      ease: "easeOut", 
      staggerChildren: 0.1 
    } 
  }
}
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
}
function ProductDetailPage() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [selectedImage, setSelectedImage] = useState('')
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [apiError, setApiError] = useState(null)
  const [notification, setNotification] = useState(null)
  useEffect(() => {
    setIsLoading(true)
    setApiError(null)
    setTimeout(() => {
      setProduct(MOCK_PRODUCT)
      setSelectedImage(MOCK_PRODUCT.images[0])
      const defaultVariant = MOCK_PRODUCT.variants.find(v => v.stock > 0) || MOCK_PRODUCT.variants[0]
      setSelectedVariant(defaultVariant)
      setIsLoading(false)
    }, 1000)
  }, [productId])
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [notification])
  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant)
    setQuantity(1)
  }
  const handleQuantity = (type) => {
    if (type === 'inc' && quantity < selectedVariant.stock) {
      setQuantity(quantity + 1)
    } else if (type === 'dec' && quantity > 1) {
      setQuantity(quantity - 1)
    }
  }
  const handleAddToCart = async () => {
    if (!MOCK_AUTH_USER.userId) {
      navigate('/login')
      return
    }
    setIsAddingToCart(true)
    setApiError(null)
    setNotification(null)
    try {
      const payload = {
        userId: MOCK_AUTH_USER.userId,
        productVariantId: selectedVariant.id,
        quantity: quantity,
      }
      await new Promise(resolve => setTimeout(resolve, 1500))
      setNotification(`${product.title} (${selectedVariant.name}) berhasil ditambah!`)
    } catch (err) {
      setApiError('Gagal menambahkan ke keranjang. Coba lagi.')
    } finally {
      setIsAddingToCart(false)
    }
  }
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
      </div>
    )
  }
  if (!product) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[80vh] text-center px-6">
        <AlertCircle className="w-20 h-20 text-red-500 mb-6" />
        <h1 className="text-4xl font-bold text-red-800 mb-4">Produk Tidak Ditemukan</h1>
        <p className="text-xl text-gray-600 mb-8">Produk yang Anda cari mungkin telah dihapus atau tidak tersedia.</p>
        <Link
          to="/products"
          className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-all"
        >
          Lihat Produk Lain
        </Link>
      </div>
    )
  }
  return (
    <div className="bg-gray-50 min-h-screen py-16 px-6 overflow-x-hidden">
      <motion.div 
        className="container mx-auto max-w-7xl"
        initial="hidden"
        animate="visible"
      >
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline mb-6"
        >
          <ChevronLeft className="w-5 h-5" />
          Kembali ke Semua Produk
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div variants={galleryVariants} className="flex flex-col gap-5">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden sticky top-24">
              <motion.img
                key={selectedImage}
                src={selectedImage}
                alt="Produk Utama"
                className="w-full h-auto aspect-square object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="flex gap-4">
              {product.images.map((img, idx) => (
                <motion.img
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  onClick={() => setSelectedImage(img)}
                  className={`w-1/4 rounded-lg cursor-pointer border-2 transition-all ${
                    selectedImage === img ? 'border-blue-600 shadow-md' : 'border-gray-200 hover:border-gray-400'
                  }`}
                  whileHover={{ scale: 1.05 }}
                />
              ))}
            </div>
          </motion.div>
          <motion.div variants={infoVariants} className="flex flex-col space-y-7">
            <motion.div variants={itemVariants}>
              <Link to={`/store/${product.storeSlug}`} className="inline-flex items-center gap-2 text-gray-600 font-medium hover:text-blue-600">
                <Store className="w-5 h-5" />
                {product.storeName}
              </Link>
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-5xl font-bold text-red-800">
              {product.title}
            </motion.h1>
            <motion.p variants={itemVariants} className="text-4xl font-light text-gray-900">
              {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(selectedVariant.price)}
            </motion.p>
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Pilih Varian: <span className="font-bold text-blue-600">{selectedVariant.name}</span>
              </h3>
              <div className="flex flex-wrap gap-3">
                {product.variants.map(v => (
                  <button
                    key={v.id}
                    onClick={() => handleVariantSelect(v)}
                    disabled={v.stock === 0}
                    className={`px-5 py-2 rounded-full border-2 font-medium transition-all ${
                      selectedVariant.id === v.id
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                        : 'bg-gray-50 text-gray-800 border-gray-300 hover:bg-gray-100'
                    } ${
                      v.stock === 0 ? 'bg-gray-100 text-gray-400 line-through cursor-not-allowed' : ''
                    }`}
                  >
                    {v.name}
                  </button>
                ))}
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Jumlah</h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleQuantity('dec')}
                    disabled={quantity <= 1}
                    className="p-2 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:opacity-50"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="text-xl font-bold w-10 text-center">{quantity}</span>
                  <button
                    onClick={() => handleQuantity('inc')}
                    disabled={quantity >= selectedVariant.stock}
                    className="p-2 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:opacity-50"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <span className="text-md text-gray-600">
                  Stok: {selectedVariant.stock}
                </span>
              </div>
            </motion.div>
            <motion.button
              variants={itemVariants}
              onClick={handleAddToCart}
              disabled={isAddingToCart || selectedVariant.stock === 0}
              className="w-full px-6 py-5 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed flex justify-center items-center gap-3"
            >
              {isAddingToCart ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <ShoppingCart className="w-6 h-6" />
              )}
              {isAddingToCart ? 'Menambahkan...' : (selectedVariant.stock === 0 ? 'Stok Habis' : 'Tambah ke Keranjang')}
            </motion.button>
            <AnimatePresence>
              {apiError && (
                <motion.div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <AlertCircle className="w-5 h-5" />
                  <span>{apiError}</span>
                </motion.div>
              )}
            </AnimatePresence>
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-3 mb-4">
                Deskripsi Produk
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      <AnimatePresence>
        {notification && (
          <motion.div
            className="fixed bottom-10 right-10 bg-green-600 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 z-50"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <CheckCircle className="w-6 h-6" />
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
export default ProductDetailPage

