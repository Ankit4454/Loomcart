import { API_URLS, LOCALSTORAGE_TOKEN_KEY, getFormBody } from "../utils";

const customFetch = async (url, { body, ...customConfig }) => {
  let token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);

  const headers = {};

  if (token) {
    token = token.replaceAll('"', '');
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body instanceof FormData) {
    config.body = body;
  } else if (body) {
    config.body = getFormBody(body);
    config.headers['content-type'] = 'application/x-www-form-urlencoded';
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    if (data.success) {
      return {
        data: data.data,
        success: true,
        message: data.message
      };
    }

    throw new Error(data.message);
  } catch (error) {
    console.error(error);
    return {
      message: error.message,
      success: false,
    };
  }
};

export const register = async (name, email, mobileNumber, password) => {
  return customFetch(API_URLS.signup(), {
    method: 'POST',
    body: {
      name, email, mobileNumber, password
    }
  });
};

export const login = (emailOrMobileNumber, password) => {
  return customFetch(API_URLS.signin(), {
    method: 'POST',
    body: {
      emailOrMobileNumber, password
    }
  });
};

export const editUser = async (id, name, email, mobileNumber) => {
  return customFetch(API_URLS.updateUser(), {
    method: 'POST',
    body: {
      id, name, email, mobileNumber
    }
  });
};

export const createAddress = async (user, name, mobileNumber, pincode, addressLine1, addressLine2, landmark, city, state, addressType) => {
  return customFetch(API_URLS.createAddress(), {
    method: 'POST',
    body: {
      user, name, mobileNumber, pincode, addressLine1, addressLine2, landmark, city, state, addressType
    }
  });
};

export const updateAddress = async (addressId, name, mobileNumber, pincode, addressLine1, addressLine2, landmark, city, state, addressType) => {
  return customFetch(API_URLS.updateAddress(), {
    method: 'POST',
    body: {
      id: addressId, name, mobileNumber, pincode, addressLine1, addressLine2, landmark, city, state, addressType
    }
  });
};

export const deleteAddress = async (addressId) => {
  return customFetch(API_URLS.deleteAddress(addressId), {
    method: 'GET'
  });
};

export const getAddressList = (userId) => {
  return customFetch(API_URLS.getAddressList(userId), {
    method: 'GET'
  });
};

export const getAddress = (addressId) => {
  return customFetch(API_URLS.getAddress(addressId), {
    method: 'GET'
  });
};

export const createProduct = async (user, name, description, price, category, picture) => {
  const formData = new FormData();
  formData.append('user', user);
  formData.append('name', name);
  formData.append('description', description);
  formData.append('price', price);
  formData.append('category', category);
  formData.append('picture', picture);

  return customFetch(API_URLS.createProduct(), {
    method: 'POST',
    body: formData
  });
};

export const updateProduct = async (productId, name, description, price, category, picture) => {
  const formData = new FormData();
  formData.append('id', productId);
  formData.append('name', name);
  formData.append('description', description);
  formData.append('price', price);
  formData.append('category', category);
  formData.append('picture', picture);

  return customFetch(API_URLS.updateProduct(), {
    method: 'POST',
    body: formData
  });
};

export const deleteProduct = async (productId) => {
  return customFetch(API_URLS.deleteProduct(productId), {
    method: 'GET'
  });
};

export const getUserProducts = (userId) => {
  return customFetch(API_URLS.getUserProducts(userId), {
    method: 'GET'
  });
};

export const getProduct = (productId) => {
  return customFetch(API_URLS.getProduct(productId), {
    method: 'GET'
  });
};

export const getAllProducts = () => {
  return customFetch(API_URLS.products(), {
    method: 'GET'
  });
};

export const getSearchResult = (string) => {
  return customFetch(API_URLS.searchProducts(string), {
    method: 'GET'
  });
};

export const filterCategoryProducts = (string) => {
  return customFetch(API_URLS.categoryProducts(string), {
    method: 'GET'
  });
};

export const createRating = async (userId, productId, star, review) => {
  return customFetch(API_URLS.createRating(), {
    method: 'POST',
    body: {
      user: userId, product: productId, star, review
    }
  });
};

export const updateRating = async (ratingId, star, review) => {
  return customFetch(API_URLS.updateRating(), {
    method: 'POST',
    body: {
      id: ratingId, star, review
    }
  });
};

export const deleteRating = async (ratingId) => {
  return customFetch(API_URLS.deleteRating(ratingId), {
    method: 'GET'
  });
};

export const createOrder = async (user, productList, address, status) => {
  return customFetch(API_URLS.createOrder(), {
    method: 'POST',
    body: {
      user, productList, address, status
    }
  });
};

export const updateOrder = async (orderId, status) => {
  return customFetch(API_URLS.updateOrder(), {
    method: 'POST',
    body: {
      id: orderId, status
    }
  });
};

export const getUsersOrders = async (user) => {
  return customFetch(API_URLS.orders(user), {
    method: 'GET'
  });
};