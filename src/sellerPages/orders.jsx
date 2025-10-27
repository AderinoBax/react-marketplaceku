import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Bell, UserCircle, Menu, Search, Package, CheckCircle, Clock, XCircle, ChevronRight, FileText } from 'lucide-react'
import SellerSidebar from '../sellerComponents/sidebar.jsx'
import SellerFooter from '../sellerComponents/footer.jsx'
const MOCK_ORDERS_DATA = [
  { id: 'MP-2025-001', buyerName: 'Rino A.', date: '27 Okt 2025', totalAmount: 'Rp 1.250.000', status: 'PROCESSING', statusEnum: 'Processing', statusColor: 'bg-blue-100 text-blue-800', icon: <Clock className="w-4 h-4 mr-2" />, itemCount: 2 },
  { id: 'MP-2025-002', buyerName: 'Budi S.', date: '27 Okt 2025', totalAmount: 'Rp 350.000', status: 'PAID', statusEnum: 'Paid', statusColor: 'bg-green-100 text-green-800', icon: <CheckCircle className="w-4 h-4 mr-2" />, itemCount: 1 },
  { id: 'MP-2025-003', buyerName: 'Citra L.', date: '26 Okt 2025', totalAmount: 'Rp 750.000', status: 'SHIPPED', statusEnum: 'Shipped', statusColor: 'bg-purple-100 text-purple-800', icon: <Package className="w-4 h-4 mr-2" />, itemCount: 3 },
  { id: 'MP-2025-004', buyerName: 'Dewi K.', date: '25 Okt 2025', totalAmount: 'Rp 500.000', status: 'CANCELLED', statusEnum: 'Cancelled', statusColor: 'bg-red-100 text-red-800', icon: <XCircle className="w-4 h-4 mr-2" />, itemCount: 1 },
  { id: 'MP-2025-005', buyerName: 'Eka P.', date: '25 Okt 2025', totalAmount: 'Rp 1.100.000', status: 'PENDING', statusEnum: 'Pending', statusColor: 'bg-yellow-100 text-yellow-800', icon: <Clock className="w-4 h-4 mr-2" />, itemCount: 5 },
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
          <h1 className="text-2xl font-bold text-gray-800">Manajemen Pesanan</h1>
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
const TABS = ['Semua', 'Pending', 'Paid', 'Processing', 'Shipped', 'Cancelled']
function OrdersPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('Semua')
  const filteredOrders = MOCK_ORDERS_DATA.filter(order => {
    const matchesTab = activeTab === 'Semua' || order.statusEnum.toUpperCase() === activeTab.toUpperCase()
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.buyerName.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesTab && matchesSearch
  })
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SellerSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col md:pl-64">
        <SellerHeader setIsOpen={setIsSidebarOpen} />
        <main className="flex-1 p-6 md:p-10">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.h1 variants={itemVariants} className="text-3xl font-bold text-gray-800 mb-8">Daftar Pesanan</motion.h1>
            <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-lg border border-gray-100 mb-8">
              <div className="border-b border-gray-200">
                <nav className="flex flex-wrap -mb-px px-6 overflow-x-auto">
                  {TABS.map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm mr-8
                        ${activeTab === tab
                          ? 'border-blue-600 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                      {tab}
                    </button>
                  ))}
                </nav>
              </div>
              <div className="p-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Cari (ID Pesanan atau Nama Pembeli)..."
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </motion.div>
            <motion.div variants={containerVariants} className="space-y-6">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <motion.div key={order.id} variants={itemVariants} className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="p-5 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-blue-600 text-lg">{order.id}</span>
                        <span className="text-sm text-gray-500">{order.date}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-500">Pembeli</span>
                        <span className="font-medium text-gray-800">{order.buyerName}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-500">Total</span>
                        <span className="font-bold text-gray-900 text-lg">{order.totalAmount}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-500">Status</span>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${order.statusColor}`}>
                          {order.icon}
                          {order.status}
                        </span>
                      </div>
                      <Link
                        to={`/seller/orders/${order.id}`}
                        className="flex items-center justify-center h-12 w-12 bg-gray-100 rounded-full text-gray-600 hover:bg-blue-600 hover:text-white transition-colors"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </Link>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div variants={itemVariants} className="text-center py-16 bg-white rounded-lg shadow-lg border border-gray-100">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700">Tidak Ada Pesanan</h3>
                  <p className="text-gray-500 mt-2">Tidak ada pesanan yang cocok dengan filter Anda.</p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
          <SellerFooter />
        </main>
      </div>
    </div>
  )
}
export default OrdersPage

