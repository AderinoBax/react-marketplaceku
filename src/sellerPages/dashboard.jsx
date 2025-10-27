import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { LayoutGrid, Package, ShoppingCart, DollarSign, Settings, LogOut, ChevronRight, Bell, UserCircle, Menu, X } from 'lucide-react'
const MOCK_STATS = [
  { name: 'Total Pendapatan', value: 'Rp 12.500.000', icon: DollarSign, color: 'text-green-500' },
  { name: 'Pesanan Baru', value: '15', icon: ShoppingCart, color: 'text-blue-500' },
  { name: 'Total Produk', value: '82', icon: Package, color: 'text-red-500' },
]
const MOCK_ORDERS = [
  { id: '#12345', customer: 'Budi Santoso', total: 'Rp 750.000', status: 'PROCESSING', statusColor: 'bg-yellow-100 text-yellow-800' },
  { id: '#12344', customer: 'Citra Lestari', total: 'Rp 1.200.000', status: 'SHIPPED', statusColor: 'bg-blue-100 text-blue-800' },
  { id: '#12343', customer: 'Agus Wijaya', total: 'Rp 300.000', status: 'DELIVERED', statusColor: 'bg-green-100 text-green-800' },
  { id: '#12342', customer: 'Dewi Anggraini', total: 'Rp 550.000', status: 'CANCELLED', statusColor: 'bg-red-100 text-red-800' },
]
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
}
function SellerSidebar({ isOpen, setIsOpen }) {
  const location = useLocation()
  const navItems = [
    { name: 'Dashboard', href: '/seller/dashboard', icon: LayoutGrid },
    { name: 'Produk Saya', href: '/seller/products', icon: Package },
    { name: 'Pesanan', href: '/seller/orders', icon: ShoppingCart },
    { name: 'Pengaturan Toko', href: '/seller/settings', icon: Settings },
  ]
  const NavLink = ({ item }) => {
    const isActive = location.pathname === item.href
    return (
      <Link
        to={item.href}
        onClick={() => setIsOpen(false)}
        className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
          isActive ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <item.icon className="w-5 h-5 mr-3" />
        <span className="font-medium">{item.name}</span>
      </Link>
    )
  }
  return (
    <>
      <aside className={`fixed z-30 inset-y-0 left-0 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 h-20 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-blue-600">
              <Link to="/">Seller</Link>
            </h1>
            <button onClick={() => setIsOpen(false)} className="md:hidden text-gray-500">
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map(item => <NavLink key={item.name} item={item} />)}
          </nav>
          <div className="p-4 border-t border-gray-200">
            <Link
              to="/"
              className="flex items-center px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <LogOut className="w-5 h-5 mr-3 text-red-500" />
              <span className="font-medium">Kembali ke Toko</span>
            </Link>
          </div>
        </div>
      </aside>
      {isOpen && <div onClick={() => setIsOpen(false)} className="fixed z-20 inset-0 bg-black opacity-50 md:hidden"></div>}
    </>
  )
}
function SellerHeader({ setIsOpen }) {
  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={() => setIsOpen(true)} className="md:hidden text-gray-600 mr-4">
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
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
function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SellerSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col md:pl-64">
        <SellerHeader setIsOpen={setIsSidebarOpen} />
        <main className="flex-1 p-6 md:p-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {MOCK_STATS.map((stat) => (
                <div key={stat.name} className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 flex items-center space-x-4">
                  <div className={`p-3 rounded-full ${stat.color} bg-opacity-10`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                    <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  </div>
                </div>
              ))}
            </motion.div>
            <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">Pesanan Terbaru</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pelanggan</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {MOCK_ORDERS.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.customer}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.total}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${order.statusColor}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link to={`/seller/orders/${order.id}`} className="text-blue-600 hover:text-blue-800 flex items-center justify-end">
                            Detail <ChevronRight className="w-4 h-4 ml-1" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
export default DashboardPage
