import React from 'react'
import { Link } from 'react-router-dom'

function Navbar(props) {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          Marketplaceku
        </Link>
        <div className="flex space-x-4 items-center">
          <Link to="/" className="text-gray-600 hover:text-gray-900">
            Home
          </Link>
          <Link to="/products" className="text-gray-600 hover:text-gray-900">
            Produk
          </Link>
          <Link to="/cart" className="text-gray-600 hover:text-gray-900">
            Keranjang
          </Link>
          <div className="w-px h-6 bg-gray-300 mx-2"></div>
          <Link to="/login" className="text-gray-600 hover:text-gray-900">
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 transition-colors"
          >
            Daftar
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
