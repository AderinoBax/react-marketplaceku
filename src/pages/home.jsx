import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck, Truck, CreditCard } from 'lucide-react'
const MOCK_CATEGORIES = [
  { name: 'Elektronik', href: '/products?category=elektronik', imageUrl: 'https://placehold.co/600x400/3b82f6/white?text=Elektronik' },
  { name: 'Fashion Pria', href: '/products?category=fashion-pria', imageUrl: 'https://placehold.co/600x400/ef4444/white?text=Fashion+Pria' },
  { name: 'Fashion Wanita', href: '/products?category=fashion-wanita', imageUrl: 'https://placehold.co/600x400/8b5cf6/white?text=Fashion+Wanita' },
  { name: 'Rumah Tangga', href: '/products?category=rumah-tangga', imageUrl: 'https://placehold.co/600x400/10b981/white?text=Rumah+Tangga' },
]
const MOCK_PRODUCTS = [
  { id: 1, title: 'Jam Tangan Pintar Pro v2', price: 'Rp 1.499.000', imageUrl: 'https://placehold.co/600x600/ef4444/white?text=Produk+1' },
  { id: 2, title: 'Kemeja Katun Premium Pria', price: 'Rp 299.000', imageUrl: 'https://placehold.co/600x600/3b82f6/white?text=Produk+2' },
  { id: 3, title: 'Sepatu Lari Ultra-Light', price: 'Rp 799.000', imageUrl: 'https://placehold.co/600x600/ef4444/white?text=Produk+3' },
  { id: 4, title: 'Wireless Headphone Elite', price: 'Rp 2.199.000', imageUrl: 'https://placehold.co/600x600/3b82f6/white?text=Produk+4' },
  { id: 5, title: 'Tas Ransel Kanvas Klasik', price: 'Rp 450.000', imageUrl: 'https://placehold.co/600x600/ef4444/white?text=Produk+5' },
]
const heroVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}
const heroItemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
}
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.1,
      ease: "easeOut",
    },
  },
}
function Home() {
  return (
    <div className="bg-white text-gray-800">
      <HeroSection />
      <FeaturedCategories />
      <FeaturedProducts />
      <AlternatingFeatureSection />
    </div>
  )
}
const HeroSection = () => (
  <motion.section 
    className="relative h-screen flex items-center justify-center text-white text-center px-6 overflow-hidden"
    variants={heroVariants}
    initial="hidden"
    animate="visible"
  >
    <div className="absolute inset-0 z-0">
      <img 
        src="https://placehold.co/1920x1080/ef4444/white?text=Marketplaceku" 
        alt="Hero Background"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-red-800 to-blue-800 opacity-70"></div>
    </div>
    <div className="relative z-10 max-w-4xl">
      <motion.h1 
        className="text-5xl md:text-7xl font-extrabold leading-tight mb-6"
        variants={heroItemVariants}
      >
        Era Baru Belanja Online
      </motion.h1>
      <motion.p 
        className="text-xl md:text-2xl font-light opacity-90 mb-10"
        variants={heroItemVariants}
      >
        Temukan produk premium, layanan eksklusif, dan pengalaman tak terlupakan.
      </motion.p>
      <motion.div variants={heroItemVariants}>
        <Link
          to="/products"
          className="inline-block px-10 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
        >
          Jelajahi Sekarang <ArrowRight className="inline-block ml-2 h-5 w-5" />
        </Link>
      </motion.div>
    </div>
  </motion.section>
)
const FeaturedCategories = () => (
  <motion.section 
    className="py-20 px-6 container mx-auto"
    variants={sectionVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
  >
    <h2 className="text-4xl font-bold text-center text-red-800 mb-12">
      Kategori Pilihan
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {MOCK_CATEGORIES.map((category) => (
        <motion.div
          key={category.name}
          className="relative rounded-lg overflow-hidden shadow-xl group"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
        >
          <Link to={category.href}>
            <img src={category.imageUrl} alt={category.name} className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-6">
              <h3 className="text-white text-2xl font-semibold">
                {category.name}
              </h3>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  </motion.section>
)
const FeaturedProducts = () => (
  <motion.section 
    className="py-20 bg-gray-50 overflow-hidden"
    variants={sectionVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
  >
    <div className="container mx-auto px-6">
      <h2 className="text-4xl font-bold text-center text-red-800 mb-12">
        Produk Unggulan
      </h2>
    </div>
    <div className="flex space-x-8 overflow-x-auto pb-8 pl-6 pr-6 md:pl-0 md:pr-0 md:container md:mx-auto snap-x snap-mandatory scrollbar-thin scrollbar-thumb-red-600 scrollbar-track-gray-200">
      {MOCK_PRODUCTS.map((product) => (
        <motion.div
          key={product.id}
          className="snap-start flex-shrink-0 w-80 bg-white rounded-lg shadow-lg overflow-hidden group border border-transparent hover:border-blue-600"
          whileHover={{ y: -5 }}
        >
          <Link to={`/products/${product.id}`} className="flex flex-col h-full">
            <div className="overflow-hidden">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 truncate group-hover:text-blue-600 transition-colors">
                {product.title}
              </h3>
              <div className="flex-grow"></div>
              <p className="text-xl font-bold text-red-700 mt-4">
                {product.price}
              </p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  </motion.section>
)
const AlternatingFeatureSection = () => (
  <motion.section 
    className="py-24 px-6 container mx-auto"
    variants={sectionVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
  >
    <h2 className="text-4xl font-bold text-center text-red-800 mb-20">
      Pengalaman Belanja Terbaik
    </h2>
    <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
      <div>
        <ShieldCheck className="w-16 h-16 text-blue-600 mb-6" />
        <h3 className="text-3xl font-semibold text-gray-900 mb-4">
          Transaksi Aman Terenkripsi
        </h3>
        <p className="text-lg text-gray-600 leading-relaxed mb-6">
          Kami menggunakan teknologi enkripsi end-to-end terkini untuk memastikan setiap data transaksi Anda aman. Belanja dengan tenang, kami jaga data Anda.
        </p>
        <Link to="/privacy" className="text-lg font-semibold text-blue-600 hover:text-blue-800">
          Pelajari Kebijakan Kami <ArrowRight className="inline-block ml-1 h-5 w-5" />
        </Link>
      </div>
      <motion.div 
        className="rounded-lg shadow-2xl overflow-hidden"
        whileHover={{ scale: 1.03, rotate: 1 }}
      >
        <img src="https://placehold.co/800x600/3b82f6/white?text=Transaksi+Aman" alt="Transaksi Aman" className="w-full h-full object-cover" />
      </motion.div>
    </div>
    <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
      <motion.div 
        className="rounded-lg shadow-2xl overflow-hidden md:order-first"
        whileHover={{ scale: 1.03, rotate: -1 }}
      >
        <img src="https://placehold.co/800x600/ef4444/white?text=Pengiriman+Cepat" alt="Pengiriman Cepat" className="w-full h-full object-cover" />
      </motion.div>
      <div>
        <Truck className="w-16 h-16 text-red-600 mb-6" />
        <h3 className="text-3xl font-semibold text-gray-900 mb-4">
          Pengiriman Cepat & Terpercaya
        </h3>
        <p className="text-lg text-gray-600 leading-relaxed mb-6">
          Didukung oleh mitra logistik terbaik, kami memastikan pesanan Anda sampai di depan pintu Anda lebih cepat dari yang Anda duga.
        </p>
        <Link to="/shipping" className="text-lg font-semibold text-red-600 hover:text-red-800">
          Lacak Pesanan Anda <ArrowRight className="inline-block ml-1 h-5 w-5" />
        </Link>
      </div>
    </div>
    <div className="grid md:grid-cols-2 gap-16 items-center">
      <div>
        <CreditCard className="w-16 h-16 text-blue-600 mb-6" />
        <h3 className="text-3xl font-semibold text-gray-900 mb-4">
          Berbagai Metode Pembayaran
        </h3>
        <p className="text-lg text-gray-600 leading-relaxed mb-6">
          Mulai dari Virtual Account, E-Wallet, hingga Kartu Kredit, kami menyediakan semua metode pembayaran favorit Anda untuk kemudahan checkout.
        </p>
        <Link to="/payment-methods" className="text-lg font-semibold text-blue-600 hover:text-blue-800">
          Lihat Opsi Pembayaran <ArrowRight className="inline-block ml-1 h-5 w-5" />
        </Link>
      </div>
      <motion.div 
        className="rounded-lg shadow-2xl overflow-hidden"
        whileHover={{ scale: 1.03, rotate: 1 }}
      >
        <img src="https://placehold.co/800x600/3b82f6/white?text=Pembayaran+Mudah" alt="Pembayaran Mudah" className="w-full h-full object-cover" />
      </motion.div>
    </div>
  </motion.section>
)
export default Home

