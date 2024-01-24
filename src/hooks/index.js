import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../providers";
import { login as userLogin, register, editUser } from "../api";
import { getItemFromLocalStorage, setItemInLocalStorage, removeItemFromLocalStorage, LOCALSTORAGE_TOKEN_KEY } from "../utils";
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify';

export const useAuth = () => {
    return useContext(AuthContext);
}

export const useProvideAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
            if (userToken) {
                const user = jwtDecode(userToken);

                setUser(user);
            }
            setLoading(false);
        }
        getUser();
    }, []);

    const login = async (emailOrMobileNumber, password) => {
        const response = await userLogin(emailOrMobileNumber, password);

        if (response.success) {
            setUser(response.data.user);
            setItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY, response.data.token ? response.data.token : null);
            return {
                success: true,
                message: response.message
            };
        } else {
            return {
                success: false,
                message: response.message
            };
        }
    }

    const signup = async (name, email, mobileNumber, password) => {
        const response = await register(name, email, mobileNumber, password);
        if (response.success) {
            return {
                success: true,
                message: response.message
            };
        } else {
            return {
                success: false,
                message: response.message
            }
        }
    }

    const logout = () => {
        setUser(null);
        removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
        toast.success("You have successfully logged out", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    const updateUser = async (id, name, email) => {
        const response = await editUser(id, name, email);

        if (response.success) {
            setUser(response.data.user);
            setItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY, response.data.token ? response.data.token : null);
            return {
                success: true
            };
        } else {
            return {
                success: false,
                message: response.message
            }
        }
    }

    return {
        user,
        login,
        logout,
        loading,
        signup,
        updateUser
    }
};


