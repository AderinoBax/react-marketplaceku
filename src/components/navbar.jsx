import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Search, ShoppingCart, User, Menu, X } from 'lucide-react'
const navLinkClasses = ({ isActive }) =>
  `relative font-medium transition-colors hover:text-blue-600 ${
    isActive ? 'text-blue-600' : 'text-gray-700'
  }`
const mobileNavLinkClasses = ({ isActive }) =>
  `block py-3 text-lg font-medium transition-colors hover:text-blue-600 ${
    isActive ? 'text-blue-600' : 'text-gray-900'
  }`
const iconClasses = "text-gray-700 hover:text-blue-600 transition-colors"
const mobileMenuVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.2, ease: "easeOut" }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.2, ease: "easeIn" }
  }
}
function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
  return (
    <motion.header
      className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-lg shadow-sm"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <nav className="container mx-auto max-w-7xl px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <ShoppingBag className="w-7 h-7 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Marketplaceku</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/" className={navLinkClasses}>Home</NavLink>
            <NavLink to="/products" className={navLinkClasses}>Produk</NavLink>
          </div>
          <div className="flex items-center gap-6">
            <button className={iconClasses + " hidden md:block"}>
              <Search className="w-5 h-5" />
            </button>
            <Link to="/cart" className={iconClasses}>
              <ShoppingCart className="w-5 h-5" />
            </Link>
            <Link to="/login" className={iconClasses}>
              <User className="w-5 h-5" />
            </Link>
            <button className="md:hidden text-gray-700" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg z-40 px-6 py-4"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <nav className="flex flex-col space-y-4">
              <NavLink to="/" className={mobileNavLinkClasses} onClick={toggleMobileMenu}>Home</NavLink>
              <NavLink to="/products" className={mobileNavLinkClasses} onClick={toggleMobileMenu}>Produk</NavLink>
              <button className="flex items-center gap-2 text-lg text-gray-900 py-2">
                <Search className="w-5 h-5" />
                Cari
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
export default Navbar

