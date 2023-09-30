import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add: (state, action) => {
            const index = state.items.findIndex((item) => item.product.id === action.payload.product.id);
            if (index < 0) {
                state.items.push(action.payload);
            } else {
                state.items[index].qty += Number(action.payload.qty);
            }
        },
        remove: (state, action) => {
            state.items = state.items.filter(item => item.product.id !== action.payload.id);
        },
        qty: (state, action) => {
            const index = state.items.findIndex((item) => item.product.id === action.payload.product.id);
            state.items[index].qty = action.payload.qty;
        },
        clear: (state, action) => {
            state.items = [];
        }
    }
});

export const {add, remove, qty, clear} = cartSlice.actions;

export default cartSlice.reducer;