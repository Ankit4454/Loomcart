import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "../reducers/cartReducers";
import { wishlistReducer } from "../reducers/wishlistReducers";
import storage from "redux-persist/lib/storage";
import {
    persistReducer, persistStore, FLUSH,
    REHYDRATE, PAUSE, PERSIST,
    PURGE, REGISTER,
} from "redux-persist";

const cartPersistConfig = {
    key: 'cart',
    storage: storage
};

const wishlistPersistConfig = {
    key: 'wishlist',
    storage: storage
}

const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
const persistedWishlistReducer = persistReducer(wishlistPersistConfig, wishlistReducer);

export const store = configureStore({
    reducer: {
        cart: persistedCartReducer,
        wishlist: persistedWishlistReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);