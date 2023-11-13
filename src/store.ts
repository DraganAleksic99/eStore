import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './modules/cart/slice';
import loadCategoriesReducer from './modules/loadData/categoriesSlice';
import { useDispatch } from 'react-redux';
import { api } from './modules/loadData/productsApi';
import { pApi } from './modules/orders/ordersApi';

export const store = configureStore({
    reducer:{
        [api.reducerPath]: api.reducer,
        [pApi.reducerPath]: pApi.reducer,
        loadCategories: loadCategoriesReducer,
        handleCart: cartReducer
    },
    middleware: (gDM) => gDM().concat(api.middleware).concat(pApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();