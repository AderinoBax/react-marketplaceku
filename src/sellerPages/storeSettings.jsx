import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Bell, UserCircle, Menu, Save, Image as ImageIcon, Upload } from 'lucide-react'
import SellerSidebar from '/src/sellerComponents/sidebar.jsx'
import SellerFooter from '/src/sellerComponents/footer.jsx'
const MOCK_STORE_DATA = {
  name: "Aderino's Store",
  slug: 'aderino-store-123',
  description: 'Toko portfolio demo yang menjual berbagai produk digital dan fisik berkualitas tinggi. Dibuat dengan React, Tailwind, dan Framer Motion.',
  logoUrl: 'https://placehold.co/128x128/333/fff?text=Logo',
  bannerUrl: 'https://placehold.co/1024x300/555/fff?text=Store+Banner',
}
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
          <h1 className="text-2xl font-bold text-gray-800">Pengaturan Toko</h1>
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
function StoreSettingsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [storeData, setStoreData] = useState(MOCK_STORE_DATA)
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setStoreData(prev => ({ ...prev, [name]: value }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Menyimpan data toko: ' + JSON.stringify(storeData))
  }
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SellerSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col md:pl-64">
        <SellerHeader setIsOpen={setIsSidebarOpen} />
        <main className="flex-1 p-6 md:p-10">
          <motion.form
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            onSubmit={handleSubmit}
          >
            <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden mb-8">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">Informasi Toko</h2>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Nama Toko</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={storeData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">URL Toko (Slug)</label>
                  <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                    <span className="px-4 py-3 bg-gray-100 text-gray-500 border-r border-gray-300">marketplaceku.com/store/</span>
                    <input
                      type="text"
                      id="slug"
                      name="slug"
                      value={storeData.slug}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Deskripsi Toko</label>
                  <textarea
                    id="description"
                    name="description"
                    rows="4"
                    value={storeData.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden mb-8">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">Branding Toko</h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="flex-shrink-0">
                    <img className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-md" src={storeData.logoUrl} alt="Logo Toko" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Logo Toko</label>
                    <button type="button" className="flex items-center bg-white text-gray-700 px-4 py-2 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors">
                      <Upload className="w-4 h-4 mr-2" />
                      Ganti Logo
                    </button>
                    <p className="text-xs text-gray-500 mt-2">Rekomendasi: 300x300px, PNG atau JPG.</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Banner Toko</label>
                  <div className="w-full h-48 rounded-lg bg-gray-200 flex items-center justify-center border-2 border-dashed border-gray-300 relative overflow-hidden">
                    {storeData.bannerUrl ? (
                      <img src={storeData.bannerUrl} alt="Banner Toko" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-12 h-12 text-gray-400" />
                    )}
                    <button type="button" className="absolute top-4 right-4 flex items-center bg-white text-gray-700 px-4 py-2 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors shadow-md">
                      <Upload className="w-4 h-4 mr-2" />
                      Ganti Banner
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Rekomendasi: 1200x300px, PNG atau JPG.</p>
                </div>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="flex justify-end">
              <button
                type="submit"
                className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <Save className="w-5 h-5 mr-2" />
                Simpan Perubahan
              </button>
            </motion.div>
          </motion.form>
          <SellerFooter />
        </main>
      </div>
    </div>
  )
}
export default StoreSettingsPage

