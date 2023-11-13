import { Product } from "../../types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
    product: Product
    quantity: number
}

type CartState = {
    cart: CartItem[]
    cartItems: number
    cartPrice: number
}

export const initialState: CartState = {
    cart: [],
    cartItems: 0,
    cartPrice: 0
}

export const slice = createSlice({
    name: 'handleCart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const p = action.payload.product;
            const q = action.payload.quantity || 1;
            let existing = state.cart.find(item => item.product.id === p.id);
            if (existing) {
                existing.quantity += q;
            } else {
                state.cart = [...state.cart, action.payload];
            }
            state.cartItems += q;
            state.cartPrice += p.price;
        },
        updateCartQuantity: (state, action: PayloadAction<CartItem>) => {
            state.cart = state.cart.map((item) => {
                if (item.product.id === action.payload.product.id) {
                    const diff = action.payload.quantity - item.quantity;
                    state.cartItems += diff;
                    state.cartPrice += (item.product.price * diff);
                    return action.payload;
                } else {
                    return item;
                }
            })
        },
        removeFromCart: (state, action: PayloadAction<Product>) => {
            let selection = state.cart.find(item => item.product.id === action.payload.id);
            state.cartItems = selection ? (state.cartItems - selection.quantity) : state.cartItems;
            state.cartPrice = selection 
                ? (state.cartPrice - (selection.quantity * selection.product.price))
                : state.cartPrice;
            state.cart = state.cart.filter(item => item !==selection);
        },
        clearCart: (state) => {
            state = {cart: [], cartItems: 0, cartPrice: 0};
        }
    }
});

export default slice.reducer;
export const {addToCart, updateCartQuantity, removeFromCart, clearCart} = slice.actions;