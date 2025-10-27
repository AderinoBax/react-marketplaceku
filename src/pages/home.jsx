import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="bg-gradient-to-br from-blue-100 via-white to-red-100 min-h-screen">
      <section className="relative bg-maroon-700 text-white py-20 px-6 sm:px-10 lg:px-20 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-red-800 to-blue-800 opacity-80"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Temukan Kebutuhan Anda di Marketplaceku
          </h1>
          <p className="mt-6 text-xl md:text-2xl font-light opacity-90">
            Jelajahi berbagai produk terbaik dari penjual terpercaya.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/products"
              className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
            >
              Mulai Belanja Sekarang
            </Link>
            <Link
              to="/register"
              className="px-8 py-4 border-2 border-white text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-white hover:text-red-800 transition-transform transform hover:scale-105"
            >
              Jadi Penjual
            </Link>
          </div>
        </div>
      </section>
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center text-red-800 mb-12">
          Kenapa Memilih Marketplaceku?
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center border-t-4 border-blue-600">
            <div className="text-5xl text-blue-600 mb-4">🛒</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              Pilihan Produk Lengkap
            </h3>
            <p className="text-gray-600">
              Temukan ribuan produk dari berbagai kategori, mulai dari elektronik
              hingga fashion terbaru.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg text-center border-t-4 border-red-600">
            <div className="text-5xl text-red-600 mb-4">🔒</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              Transaksi Aman & Mudah
            </h3>
            <p className="text-gray-600">
              Sistem pembayaran terenkripsi dan jaminan keamanan untuk setiap
              transaksi Anda.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg text-center border-t-4 border-blue-600">
            <div className="text-5xl text-blue-600 mb-4">🚀</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              Pengiriman Cepat
            </h3>
            <p className="text-gray-600">
              Mitra logistik terpercaya siap mengantarkan pesanan Anda dengan
              cepat dan aman.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-red-800 py-16 px-6 sm:px-10 lg:px-20 text-center text-white">
        <h2 className="text-4xl font-bold mb-6">
          Siap untuk Mulai Berbelanja atau Berjualan?
        </h2>
        <p className="text-xl opacity-90 mb-8">
          Daftar sekarang dan nikmati pengalaman marketplace yang tak tertandingi!
        </p>
        <Link
          to="/register"
          className="px-10 py-5 bg-blue-600 text-white text-xl font-bold rounded-lg shadow-xl hover:bg-blue-700 transition-transform transform hover:scale-105"
        >
          Gabung Sekarang!
        </Link>
      </section>
    </div>
  )
}

export default Home
