import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, ChevronDown, Loader2, ListFilter } from 'lucide-react'
const MOCK_PRODUCTS = [
  { id: 1, title: 'Jam Tangan Pintar Pro v2', price: 'Rp 1.499.000', category: 'Elektronik', imageUrl: 'https://placehold.co/600x600/ef4444/white?text=Produk+1' },
  { id: 2, title: 'Kemeja Katun Premium Pria', price: 'Rp 299.000', category: 'Fashion Pria', imageUrl: 'https://placehold.co/600x600/3b82f6/white?text=Produk+2' },
  { id: 3, title: 'Sepatu Lari Ultra-Light', price: 'Rp 799.000', category: 'Fashion Wanita', imageUrl: 'https://placehold.co/600x600/ef4444/white?text=Produk+3' },
  { id: 4, title: 'Wireless Headphone Elite', price: 'Rp 2.199.000', category: 'Elektronik', imageUrl: 'https://placehold.co/600x600/3b82f6/white?text=Produk+4' },
  { id: 5, title: 'Tas Ransel Kanvas Klasik', price: 'Rp 450.000', category: 'Fashion Pria', imageUrl: 'https://placehold.co/600x600/ef4444/white?text=Produk+5' },
  { id: 6, title: 'Lampu Meja LED Estetik', price: 'Rp 199.000', category: 'Rumah Tangga', imageUrl: 'https://placehold.co/600x600/3b82f6/white?text=Produk+6' },
  { id: 7, title: 'Blender Dapur Multifungsi', price: 'Rp 899.000', category: 'Rumah Tangga', imageUrl: 'https://placehold.co/600x600/ef4444/white?text=Produk+7' },
  { id: 8, title: 'Dress Musim Panas Floral', price: 'Rp 350.000', category: 'Fashion Wanita', imageUrl: 'https://placehold.co/600x600/3b82f6/white?text=Produk+8' },
]
const MOCK_CATEGORIES = [
  { id: 'all', name: 'Semua Kategori' },
  { id: 'Elektronik', name: 'Elektronik' },
  { id: 'Fashion Pria', name: 'Fashion Pria' },
  { id: 'Fashion Wanita', name: 'Fashion Wanita' },
  { id: 'Rumah Tangga', name: 'Rumah Tangga' },
]
const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}
function ProductPage() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setProducts(MOCK_PRODUCTS)
      setFilteredProducts(MOCK_PRODUCTS)
      setCategories(MOCK_CATEGORIES)
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])
  useEffect(() => {
    let tempProducts = [...products]
    if (selectedCategory !== 'all') {
      tempProducts = tempProducts.filter(p => p.category === selectedCategory)
    }
    if (searchTerm) {
      tempProducts = tempProducts.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    setFilteredProducts(tempProducts)
  }, [searchTerm, selectedCategory, products])
  return (
    <div className="bg-white min-h-screen">
      <ProductHeader />
      <FilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />
      <ProductGrid
        isLoading={isLoading}
        filteredProducts={filteredProducts}
      />
    </div>
  )
}
const ProductHeader = () => (
  <div className="relative bg-gradient-to-r from-red-800 to-blue-800 text-white py-24 px-6 text-center">
    <div className="absolute inset-0 bg-black opacity-30"></div>
    <motion.div
      className="relative z-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
        Jelajahi Produk Kami
      </h1>
      <p className="mt-4 text-xl md:text-2xl font-light opacity-90 max-w-2xl mx-auto">
        Temukan semua yang Anda butuhkan, dari gadget terbaru hingga fashion terkini.
      </p>
    </motion.div>
  </div>
)
const FilterBar = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, categories }) => (
  <motion.div 
    className="sticky top-0 z-40 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200"
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.3 }}
  >
    <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row gap-4 justify-between items-center">
      <div className="relative w-full md:w-2/5">
        <input
          type="text"
          placeholder="Cari produk..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      </div>
      <div className="flex gap-4 w-full md:w-auto">
        <div className="relative w-full md:w-64">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full appearance-none bg-white pl-5 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
        <button className="p-3 bg-white border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 md:hidden">
          <ListFilter className="w-5 h-5" />
        </button>
      </div>
    </div>
  </motion.div>
)
const ProductGrid = ({ isLoading, filteredProducts }) => (
  <div className="container mx-auto px-6 py-16">
    {isLoading ? (
      <div className="flex justify-center items-center min-h-[40vh]">
        <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
      </div>
    ) : (
      <>
        {filteredProducts.length === 0 ? (
          <div className="text-center min-h-[40vh] flex flex-col justify-center items-center">
            <h2 className="text-3xl font-semibold text-gray-700 mb-4">Oops! Produk tidak ditemukan.</h2>
            <p className="text-lg text-gray-500">Coba ubah kata kunci atau filter kategori Anda.</p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            variants={gridVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        )}
      </>
    )}
  </div>
)
const ProductCard = ({ product }) => (
  <motion.div
    className="bg-white rounded-lg shadow-lg overflow-hidden group border border-transparent hover:border-blue-600 transition-all duration-300"
    variants={cardVariants}
    whileHover={{ y: -5 }}
  >
    <Link to={`/products/${product.id}`} className="flex flex-col h-full">
      <div className="overflow-hidden h-72">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <p className="text-sm font-medium text-blue-600 mb-1">{product.category}</p>
        <h3 className="text-lg font-semibold text-gray-900 mb-3 truncate group-hover:text-blue-600 transition-colors">
          {product.title}
        </h3>
        <div className="flex-grow"></div>
        <p className="text-xl font-bold text-red-700 mt-4">
          {product.price}
        </p>
      </div>
    </Link>
  </motion.div>
)
export default ProductPage

