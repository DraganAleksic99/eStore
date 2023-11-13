import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Product } from '../../types';

const url = 'https://my-json-server.typicode.com/DraganAleksic99/estore';

export const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl: url}),
    reducerPath: 'productsApi',
    endpoints: (build) => ({
        getProducts: build.query<Product[], {page: number, limit: number, sort: string}>({
            query: ({page, limit, sort}) => `${url}products?_page=${page}&_limit=${limit}&_sort=${sort}`
        }),
    }),
});

export const { useGetProductsQuery } = api;