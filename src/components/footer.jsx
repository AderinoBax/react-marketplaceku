import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-12">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold text-gray-800">Marketplaceku</h3>
            <p className="mt-2 text-gray-600 max-w-sm">
              Platform e-commerce terpercaya untuk semua kebutuhan Anda. Belanja
              aman dan nyaman.
            </p>
            <p className="mt-4 text-sm text-gray-500">
              © {new Date().getFullYear()} PT. Bax Digital Indonesia.
            </p>
          </div>
          <div className="mb-6 md:mb-0">
            <h4 className="font-semibold text-gray-700">Navigasi</h4>
            <ul className="mt-2 space-y-2">
              <li>
                <Link
                  to="/products"
                  className="text-gray-600 hover:text-gray-900 hover:underline"
                >
                  Produk
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-gray-900 hover:underline"
                >
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-gray-600 hover:text-gray-900 hover:underline"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700">Legal</h4>
            <ul className="mt-2 space-y-2">
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-gray-600 hover:text-gray-900 hover:underline"
                >
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-service"
                  className="text-gray-600 hover:text-gray-900 hover:underline"
                >
                  Syarat & Ketentuan
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-gray-200 py-4">
        <div className="container mx-auto px-6 text-center text-sm text-gray-500">
          Powered by{' '}
          <a
            href="https://baxdigitalindonesia.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:underline"
          >
            Bax Digital Indonesia
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
