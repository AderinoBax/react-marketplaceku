import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar'
import Footer from './components/footer'
import Home from './pages/home'
import Product from './pages/product'
import ProductDetail from './pages/productDetail'
import Cart from './pages/cart'
import Login from './pages/login'
import Signup from './pages/signup'
import Checkout from './pages/checkout'
import Payment from './pages/payment'
function App() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Product />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-status/:orderId" element={<Payment />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
export default App

