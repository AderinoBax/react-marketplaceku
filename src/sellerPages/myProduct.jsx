import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Bell, UserCircle, Menu, Plus, Search, Edit, Trash2, Image as ImageIcon } from 'lucide-react'
import SellerSidebar from '../sellerComponents/sidebar'
import SellerFooter from '../sellerComponents/footer'
const MOCK_PRODUCTS_DATA = [
  { id: 1, name: 'Jaket Kulit Premium', sku: 'JKT-001', stock: 50, price: 'Rp 1.200.000', status: 'ACTIVE', statusColor: 'bg-green-100 text-green-800', imageUrl: 'https://placehold.co/80x80/333/fff?text=Jaket' },
  { id: 2, name: 'Sepatu Sneaker Putih', sku: 'SPT-002', stock: 120, price: 'Rp 750.000', status: 'ACTIVE', statusColor: 'bg-green-100 text-green-800', imageUrl: 'https://placehold.co/80x80/e0e0e0/333?text=Sepatu' },
  { id: 3, name: 'Kemeja Batik Modern', sku: 'KMJ-003', stock: 30, price: 'Rp 350.000', status: 'DRAFT', statusColor: 'bg-yellow-100 text-yellow-800', imageUrl: 'https://placehold.co/80x80/f0e0d0/333?text=Kemeja' },
  { id: 4, name: 'Tas Ransel Laptop', sku: 'TAS-001', stock: 0, price: 'Rp 500.000', status: 'ARCHIVED', statusColor: 'bg-gray-100 text-gray-800', imageUrl: 'https://placehold.co/80x80/ccc/333?text=Tas' },
]
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
}
function SellerHeader({ setIsOpen }) {
  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={() => setIsOpen(true)} className="md:hidden text-gray-600 mr-4">
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Produk Saya</h1>
        </div>
        <div className="flex items-center space-x-6">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Bell className="w-6 h-6 text-gray-500 cursor-pointer hover:text-blue-600" />
          </motion.div>
          <div className="flex items-center space-x-2 cursor-pointer">
            <UserCircle className="w-8 h-8 text-gray-400" />
            <span className="hidden md:block font-medium text-gray-700">Aderino A.N.</span>
          </div>
        </div>
      </div>
    </header>
  )
}
function MyProductPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [products, setProducts] = useState(MOCK_PRODUCTS_DATA)
  const [searchTerm, setSearchTerm] = useState('')
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  )
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SellerSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col md:pl-64">
        <SellerHeader setIsOpen={setIsSidebarOpen} />
        <main className="flex-1 p-6 md:p-10">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.div variants={itemVariants} className="flex flex-wrap justify-between items-center gap-4 mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Manajemen Produk</h1>
              <Link
                to="/seller/products/new"
                className="flex items-center bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <Plus className="w-5 h-5 mr-2" />
                Tambah Produk Baru
              </Link>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Cari produk (nama atau SKU)..."
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produk</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stok</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-16 w-16">
                              {product.imageUrl ? (
                                <img className="h-16 w-16 rounded-lg object-cover" src={product.imageUrl} alt={product.name} />
                              ) : (
                                <div className="h-16 w-16 rounded-lg bg-gray-200 flex items-center justify-center">
                                  <ImageIcon className="w-8 h-8 text-gray-400" />
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{product.sku}</td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${product.stock === 0 ? 'text-red-500' : 'text-gray-900'}`}>{product.stock}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{product.price}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${product.statusColor}`}>
                            {product.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                          <Link to={`/seller/products/edit/${product.id}`} className="text-blue-600 hover:text-blue-800 transition-colors">
                            <Edit className="w-5 h-5 inline-block" />
                          </Link>
                          <button onClick={() => alert('Hapus produk ' + product.id)} className="text-red-600 hover:text-red-800 transition-colors">
                            <Trash2 className="w-5 h-5 inline-block" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
          <SellerFooter />
        </main>
      </div>
    </div>
  )
}
export default MyProductPage
