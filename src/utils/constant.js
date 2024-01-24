const API_ROOT = process.env.REACT_APP_API_ROOT;

export const API_URLS = {
    signup: () => `${API_ROOT}/users/signup`,
    signin: () => `${API_ROOT}/users/signin`,
    updateUser: () => `${API_ROOT}/users/update`,
    products: () => `${API_ROOT}/products`,
    getProduct: (productId) => `${API_ROOT}/products/${productId}`,
    createProduct: () => `${API_ROOT}/products/create`,
    updateProduct: () => `${API_ROOT}/products/update`,
    deleteProduct: (productId) => `${API_ROOT}/products/delete/${productId}`,
    createAddress: () => `${API_ROOT}/addresses/create`,
    updateAddress: () => `${API_ROOT}/addresses/update`,
    deleteAddress: (addressId) => `${API_ROOT}/addresses/delete/${addressId}`,
    orders: (userId) => `${API_ROOT}/orders?userId=${userId}`,
    getOrder: (orderId) => `${API_ROOT}/orders/${orderId}`,
    createOrder: () => `${API_ROOT}/orders/create`,
    updateOrder: () => `${API_ROOT}/orders/update`,
    deleteOrder: (orderId) => `${API_ROOT}/orders/delete/${orderId}`,
    createRating: () => `${API_ROOT}/ratings/create`,
    updateRating: () => `${API_ROOT}/ratings/update`,
    deleteRating: (ratingId) => `${API_ROOT}/ratings/delete/${ratingId}`,
}

export const LOCALSTORAGE_TOKEN_KEY = '__loomcart_token__';
