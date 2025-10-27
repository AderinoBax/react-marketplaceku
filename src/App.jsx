import React, { useEffect } from 'react'
import { Routes, Route, useLocation, Outlet } from 'react-router-dom'
import Home from './pages/home.jsx'
import Product from './pages/product.jsx'
import ProductDetail from './pages/productDetail.jsx'
import Cart from './pages/cart.jsx'
import Checkout from './pages/checkout.jsx'
import Payment from './pages/payment.jsx'
import Login from './pages/login.jsx'
import Signup from './pages/signup.jsx'
import FAQ from './pages/faq.jsx'
import PaymentGuide from './pages/paymentGuide.jsx'
import Terms from './pages/terms.jsx'
import Privacy from './pages/privacy.jsx'
import Contact from './pages/contact.jsx'
import Navbar from './components/navbar.jsx'
import Footer from './components/footer.jsx'
import SellerDashboard from './sellerPages/dashboard.jsx'
import SellerMyProduct from './sellerPages/myProduct.jsx'
import SellerOrders from './sellerPages/orders.jsx'
import SellerStoreSettings from './sellerPages/storeSettings.jsx'
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}
const MainLayout = () => (
  <div className="flex flex-col min-h-screen font-sans bg-gray-50 text-gray-800">
    <Navbar />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </div>
)
function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Product />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-status/:orderId" element={<Payment />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/payment-guide" element={<PaymentGuide />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        <Route path="/seller/dashboard" element={<SellerDashboard />} />
        <Route path="/seller/products" element={<SellerMyProduct />} />
        <Route path="/seller/orders" element={<SellerOrders />} />
        <Route path="/seller/settings" element={<SellerStoreSettings />} />
        <Route path="*" element={
          <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-blue-600">404</h1>
              <p className="text-2xl font-medium text-gray-700 mt-4">Halaman Tidak Ditemukan</p>
              <p className="text-gray-500 mt-2">Maaf, halaman yang Anda cari tidak ada.</p>
              <a href="/" className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition-colors">
                Kembali ke Beranda
              </a>
            </div>
          </div>
        } />
      </Routes>
    </>
  )
}
export default App

