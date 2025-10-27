const API_BASE_URL = 'http://localhost:3000/api'
const getAuthToken = () => {
  const authData = localStorage.getItem('authData')
  if (!authData) return null
  try {
    return JSON.parse(authData).token
  } catch (e) {
    console.error("Gagal parse authData:", e)
    return null
  }
}
const apiFetch = async (endpoint, options = {}) => {
  const token = getAuthToken()
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...options.headers,
  }
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`
  }
  const config = {
    method: options.method || 'GET',
    ...options,
    headers: defaultHeaders,
  }
  if (options.body) {
    config.body = JSON.stringify(options.body)
  }
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config)
    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.message || 'Terjadi kesalahan pada server')
    }
    return data
  } catch (error) {
    console.error(`API Fetch Error (${endpoint}):`, error)
    throw error
  }
}
export const loginUser = (email, password) => {
  return apiFetch('/auth/login', {
    method: 'POST',
    body: { email, password },
  })
}
export const registerUser = (name, email, password, role) => {
  return apiFetch('/auth/register', {
    method: 'POST',
    body: { name, email, password, role },
  })
}
export const fetchProducts = () => {
  return apiFetch('/products')
}
export const fetchProductById = (productId) => {
  return apiFetch(`/products/${productId}`)
}
export const fetchCart = (userId) => {
  return apiFetch(`/cart/${userId}`)
}
export const updateCartItem = (userId, productVariantId, quantity) => {
  return apiFetch('/cart', {
    method: 'POST',
    body: { userId, productVariantId, quantity },
  })
}
export const createOrder = (orderData) => {
  return apiFetch('/orders', {
    method: 'POST',
    body: orderData,
  })
}
export const fetchOrderById = (orderId) => {
  return apiFetch(`/orders/${orderId}`)
}
