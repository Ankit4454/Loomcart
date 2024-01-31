import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "../reducers/cartReducers";
import { wishlistReducer } from "../reducers/wishlistReducers";

export const store = configureStore({
    reducer:{
        cartReducer,
        wishlistReducer
    }
});