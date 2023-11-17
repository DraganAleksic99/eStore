import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './modules/cart/slice'
import loadCategoriesReducer from './modules/loadData/categoriesSlice'
import { useDispatch } from 'react-redux'
import { api } from './modules/loadData/productsApi'
import { ordersApi } from './modules/orders/ordersApi'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    loadCategories: loadCategoriesReducer,
    handleCart: cartReducer
  },
  middleware: gDM => gDM().concat(api.middleware).concat(ordersApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
