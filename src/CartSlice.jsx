import { createSlice, current } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [], // Initialize items as an empty array
    },
    reducers: {
        addItem: (state, action) => {
            let item = state.items.find((item) => item.name === action.payload.name);
            if (item) {
                item.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        removeItem: (state, action) => {
            state.items.splice(action.payload, 1);
        },
        incrementQuantity: (state, action) => {
            let item = state.items[action.payload];
            item.quantity += 1;
        },
        decrementQuantity: (state, action) => {
            let item = state.items[action.payload];
            if (item.quantity > 0) {
                item.quantity -= 1;
            }
        },
    },
});

export const { addItem, removeItem, decrementQuantity, incrementQuantity } = CartSlice.actions;

export default CartSlice.reducer;
