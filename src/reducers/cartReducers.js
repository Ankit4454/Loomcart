import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        increment: (state, action) => {
            const id = action.payload;
            const existingItem = state.cart.find(item => item.id === id);
            if (existingItem) {
                existingItem.count += 1;
            } else {
                state.cart.push({ id, count: 1 });
            }
        },
        decrement: (state, action) => {
            const id = action.payload;
            const index = state.cart.findIndex(item => item.id === id);

            if (index !== -1) {
                if (state.cart[index].count === 1) {
                    state.cart.splice(index, 1);
                } else {
                    state.cart[index].count -= 1;
                }
            }
        }
    }
});

export const cartReducer = cartSlice.reducer;
export const { increment, decrement } = cartSlice.actions;
export const cartSelector = (state) => state.cartReducer.cart;
