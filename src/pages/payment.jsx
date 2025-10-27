import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

const MOCK_ORDER = {
    id: 12345,
    status: 'PENDING',
    totalAmount: 188700,
    paymentMethod: 'Virtual Account',
    createdAt: new Date().toISOString(),
    items: [
        { title: 'Produk Keren A', quantity: 1 },
        { title: 'Produk Keren B', quantity: 2 },
    ],
    store: {
        name: 'Toko Sebelah'
    },
    paymentDetails: {
        bank: 'Bank BDI (Bax Digital Indonesia)',
        vaNumber: '9880123456789012',
        expiry: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    }
}

function Payment() {
    const { orderId } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [order, setOrder] = useState(MOCK_ORDER)
    useEffect(() => {
        setOrder(prev => ({ ...prev, id: orderId || 12345 }))
    }, [orderId])
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount)
    }
    const formatExpiry = (dateString) => {
        return new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Asia/Jakarta'
        }).format(new Date(dateString)) + ' WIB'
    }
    const renderPaymentDetails = () => {
        if (order.status !== 'PENDING') {
            return (
                <div className="bg-green-100 border border-green-300 text-green-800 p-6 rounded-lg text-center">
                    <h3 className="text-2xl font-bold">Pesanan Lunas</h3>
                    <p className="text-lg mt-2">Status pesanan Anda saat ini: <span className="font-semibold">{order.status}</span></p>
                </div>
            )
        }
        switch (order.paymentMethod) {
            case 'Virtual Account':
                return (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
                        <h3 className="text-xl font-semibold text-blue-800">
                            Instruksi Pembayaran Virtual Account
                        </h3>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Bank</span>
                                <span className="font-bold text-gray-900">{order.paymentDetails.bank}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Nomor Virtual Account</span>
                                <span className="font-bold text-blue-700 text-lg">{order.paymentDetails.vaNumber}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Total Tagihan</span>
                                <span className="font-bold text-red-800 text-lg">{formatCurrency(order.totalAmount)}</span>
                            </div>
                        </div>
                        <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 p-4 rounded-lg text-center">
                            <p className="font-semibold">Segera lakukan pembayaran sebelum:</p>
                            <p className="text-lg font-bold">{formatExpiry(order.paymentDetails.expiry)}</p>
                        </div>
                        <p className="text-sm text-gray-500 text-center">
                            Setelah pembayaran Anda terkonfirmasi, status pesanan akan otomatis diperbarui oleh penjual.
                        </p>
                    </div>
                )
            default:
                return (
                    <div className="bg-gray-100 p-6 rounded-lg text-center">
                        <p className="text-lg">Metode pembayaran '{order.paymentMethod}' sedang diproses.</p>
                    </div>
                )
        }
    }
    if (loading) {
        return <div className="min-h-screen flex items-center justify-center"><p>Memuat data pesanan...</p></div>
    }
    if (error) {
        return <div className="min-h-screen flex items-center justify-center text-red-600"><p>{error}</p></div>
    }

    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">

                <div className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200">
                    <div className="bg-gradient-to-r from-red-800 to-blue-700 p-8 text-white text-center">
                        <h1 className="text-4xl font-extrabold">Pesanan Diterima!</h1>
                        <p className="text-xl mt-2 opacity-90">
                            {order.status === 'PENDING' ? 'Silakan selesaikan pembayaran Anda.' : 'Terima kasih atas pesanan Anda.'}
                        </p>
                    </div>
                    <div className="p-8 space-y-6">
                        <div className="text-center">
                            <p className="text-lg text-gray-600">ID Pesanan Anda:</p>
                            <p className="text-3xl font-bold text-red-800">#{order.id}</p>
                            <p className="mt-2 text-lg">
                                Status:
                                <span className={`font-semibold px-3 py-1 rounded-full ml-2 ${order.status === 'PENDING' ? 'text-yellow-600 bg-yellow-100' :
                                        order.status === 'PAID' ? 'text-green-600 bg-green-100' :
                                            'text-gray-600 bg-gray-100'
                                    }`}>
                                    {order.status}
                                </span>
                            </p>
                        </div>
                        {renderPaymentDetails()}
                        <div className="border-t pt-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                Ringkasan Pesanan
                            </h3>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Toko</span>
                                    <span className="font-medium">{order.store.name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Jumlah Item</span>
                                    <span className="font-medium">{order.items.reduce((acc, item) => acc + item.quantity, 0)} item</span>
                                </div>
                                <div className="flex justify-between text-lg">
                                    <span className="text-gray-600">Total</span>
                                    <span className="font-bold text-red-800">{formatCurrency(order.totalAmount)}</span>
                                </div>
                            </div>
                        </div>
                        <div className="border-t pt-6 flex flex-col sm:flex-row gap-4">
                            <Link
                                to="/my-orders"
                                className="w-full text-center px-6 py-3 border border-blue-600 text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-all"
                            >
                                Cek Status Pesanan Lain
                            </Link>
                            <Link
                                to="/"
                                className="w-full text-center px-6 py-3 bg-red-800 text-white font-bold rounded-lg hover:bg-red-900 transition-all"
                            >
                                Kembali ke Beranda
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment

