const API_ROOT = process.env.REACT_APP_API_ROOT;

export const API_URLS = {
    signup: () => `${API_ROOT}/users/signup`,
    signin: () => `${API_ROOT}/users/signin`,
    updateUser: () => `${API_ROOT}/users/update`,
    products: () => `${API_ROOT}/products/all`,
    categoryProducts: (string) => `${API_ROOT}/products/category/${string}`,
    searchProducts: (string) => `${API_ROOT}/products/search/${string}`,
    getProduct: (productId) => `${API_ROOT}/products/getProduct/${productId}`,
    getUserProducts: (userId) => `${API_ROOT}/products/getUserProduct/${userId}`,
    createProduct: () => `${API_ROOT}/products/create`,
    updateProduct: () => `${API_ROOT}/products/update`,
    deleteProduct: (productId) => `${API_ROOT}/products/delete/${productId}`,
    getAddressList: (userId) => `${API_ROOT}/addresses/getAddressList/${userId}`,
    getAddress: (addressId) => `${API_ROOT}/addresses/getAddress/${addressId}`,
    createAddress: () => `${API_ROOT}/addresses/create`,
    updateAddress: () => `${API_ROOT}/addresses/update`,
    deleteAddress: (addressId) => `${API_ROOT}/addresses/delete/${addressId}`,
    orders: (user) => `${API_ROOT}/orders?user=${user}`,
    getOrder: (orderId) => `${API_ROOT}/orders/${orderId}`,
    createOrder: () => `${API_ROOT}/orders/create`,
    updateOrder: () => `${API_ROOT}/orders/update`,
    deleteOrder: (orderId) => `${API_ROOT}/orders/delete/${orderId}`,
    createRating: () => `${API_ROOT}/ratings/create`,
    updateRating: () => `${API_ROOT}/ratings/update`,
    deleteRating: (ratingId) => `${API_ROOT}/ratings/delete/${ratingId}`,
    sendResetPasswordLink: () => `${API_ROOT}/users/sendResetPasswordLink`,
    resetPassword: () => `${API_ROOT}/users/resetPassword`,
}

export const LOCALSTORAGE_TOKEN_KEY = '__loomcart_token__';

