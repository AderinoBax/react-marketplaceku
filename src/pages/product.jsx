import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const mockCategories = [
  'Semua Kategori',
  'Elektronik',
  'Fashion',
  'Buku',
  'Olahraga',
  'Rumah Tangga',
]

const mockProducts = [
  {
    id: 1,
    title: 'Kamera Mirrorless Canggih XT-30',
    store: { name: 'Kamera Maju Jaya' },
    variants: [{ price: 12500000, stock: 15 }],
    category: 'Elektronik',
    imageUrl: 'https://placehold.co/600x400/3182CE/FFFFFF?text=Kamera',
  },
  {
    id: 2,
    title: 'Sepatu Lari Nyaman ZoomX',
    store: { name: 'Sport Station' },
    variants: [{ price: 899000, stock: 40 }],
    category: 'Olahraga',
    imageUrl: 'https://placehold.co/600x400/E53E3E/FFFFFF?text=Sepatu',
  },
  {
    id: 3,
    title: 'Novel Fiksi "Laskar Pelangi"',
    store: { name: 'Gramedia' },
    variants: [{ price: 120000, stock: 100 }],
    category: 'Buku',
    imageUrl: 'https://placehold.co/600x400/3182CE/FFFFFF?text=Buku',
  },
  {
    id: 4,
    title: 'Kemeja Pria Lengan Panjang',
    store: { name: 'Fashion Store' },
    variants: [{ price: 250000, stock: 50 }],
    category: 'Fashion',
    imageUrl: 'https://placehold.co/600x400/E53E3E/FFFFFF?text=Kemeja',
  },
  {
    id: 5,
    title: 'Smart TV 55 Inch 4K UHD',
    store: { name: 'Elektronik King' },
    variants: [{ price: 7800000, stock: 10 }],
    category: 'Elektronik',
    imageUrl: 'https://placehold.co/600x400/3182CE/FFFFFF?text=Smart+TV',
  },
  {
    id: 6,
    title: 'Blender Dapur Multifungsi',
    store: { name: 'Perabot Rumah' },
    variants: [{ price: 450000, stock: 30 }],
    category: 'Rumah Tangga',
    imageUrl: 'https://placehold.co/600x400/E53E3E/FFFFFF?text=Blender',
  },
]
function Products() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [categories] = useState(mockCategories) 
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Semua Kategori')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    setLoading(true)
    setError(null)
    setTimeout(() => {
      try {
        setProducts(mockProducts)
        setFilteredProducts(mockProducts)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }, 1000) 
  }, [])
  
  useEffect(() => {
    let tempProducts = [...products]
    
    if (selectedCategory && selectedCategory !== 'Semua Kategori') {
      tempProducts = tempProducts.filter(
        (product) => product.category === selectedCategory,
      )
    }
    
    if (searchTerm) {
      tempProducts = tempProducts.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredProducts(tempProducts)
  }, [searchTerm, selectedCategory, products]) 
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount)
  }
  return (
    <div className="container mx-auto py-12 px-6 min-h-screen">
      <h1 className="text-4xl font-extrabold text-red-800 mb-8">
        Jelajahi Produk Kami
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-lg mb-10 flex flex-col md:flex-row gap-4 items-center sticky top-24 z-40 border border-gray-200">
        <div className="w-full md:w-2/3">
          <label htmlFor="search" className="sr-only">
            Cari Produk
          </label>
          <input
            type="text"
            id="search"
            placeholder="Cari berdasarkan nama produk..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="w-full md:w-1/3">
          <label htmlFor="category" className="sr-only">
            Filter Kategori
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      {loading && (
        <p className="text-center text-gray-600 text-lg py-10">
          Memuat produk...
        </p>
      )}

      {error && (
        <p className="text-center text-red-600 text-lg py-10">
          Error: {error}
        </p>
      )}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                formatCurrency={formatCurrency}
              />
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full text-lg py-10">
              Produk tidak ditemukan. Coba kata kunci atau kategori lain.
            </p>
          )}
        </div>
      )}
    </div>
  )
}

function ProductCard({ product, formatCurrency }) {
  const firstVariant = product.variants[0] || { price: 0, stock: 0 }
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-xl flex flex-col">
      <Link to={`/products/${product.id}`} className="block">
        <img
          className="w-full h-48 object-cover"
          src={product.imageUrl}
          alt={product.title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/600x400/CCCCCC/FFFFFF?text=No+Image';
          }}
        />
      </Link>
      <div className="p-6 flex flex-col flex-grow">
        <p className="text-sm text-blue-600 font-semibold mb-1">
          {product.store.name}
        </p>
        <h3 className="text-lg font-bold text-gray-800 truncate mb-2 flex-grow">
          <Link
            to={`/products/${product.id}`}
            className="hover:underline"
          >
            {product.title}
          </Link>
        </h3>
        <p className="text-xl font-extrabold text-red-800 mb-4">
          {formatCurrency(firstVariant.price)}
        </p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>Stok: {firstVariant.stock}</span>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
            {product.category}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Products
