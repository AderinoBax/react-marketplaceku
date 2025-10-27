import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutGrid, Package, ShoppingCart, Settings, LogOut, X } from 'lucide-react'
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
export default SellerSidebar
