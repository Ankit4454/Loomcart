import { API_URLS, LOCALSTORAGE_TOKEN_KEY, getFormBody } from "../utils";

const customFetch = async (url, { body, ...customConfig }) => {
  let token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);

  const headers = {
    "content-type": "application/x-www-form-urlencoded",
  };

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

  if (body) {
    config.body = getFormBody(body);
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

