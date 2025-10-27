import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar'
import Footer from './components/footer'
import Home from './pages/home'
import ProductPage from './pages/product'
import ProductDetailPage from './pages/productDetail'
import CartPage from './pages/cart'
import CheckoutPage from './pages/checkout'
import PaymentPage from './pages/payment'
import LoginPage from './pages/login'
import SignupPage from './pages/signup'
import FaqPage from './pages/faq'
import PaymentGuidePage from './pages/paymentGuide'
import TermsPage from './pages/terms'
import PrivacyPage from './pages/privacy'
import ContactPage from './pages/contact'
function App() {
  return (
    <div className="font-sans bg-gray-50 text-gray-900 flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/products/:productId" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-status/:orderId" element={<PaymentPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/payment-guide" element={<PaymentGuidePage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
export default App

