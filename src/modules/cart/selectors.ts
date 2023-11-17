import { RootState } from '../../store'

export const cartSelector = (state: RootState) => state.handleCart.cart
export const cartPriceSelector = (state: RootState) => state.handleCart.cartPrice
export const cartItemsSelector = (state: RootState) => state.handleCart.cartItems
