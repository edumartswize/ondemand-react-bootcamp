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
            console.log(action.payload);
            state.items = state.items.filter(item => item.product.id !== action.payload.id);
        },
        qty: (state, action) => {
            console.log(action.payload);
            const index = state.items.findIndex((item) => item.product.id === action.payload.product.id);
            state.items[index].qty = action.payload.qty;
        }
    }
});

export const {add, remove, qty} = cartSlice.actions;

export default cartSlice.reducer;