import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Product } from '../../types'

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://my-json-server.typicode.com/DraganAleksic99/estore'
  }),
  reducerPath: 'productsApi',
  endpoints: build => ({
    getProducts: build.query<Product[], { page: number; limit: number; sort: string }>({
      query: ({ page, limit, sort }) => `/products?_page=${page}&_limit=${limit}&_sort=${sort}`
    }),
    getTotalCount: build.query<{ total: number }, void>({
      query: () => '/count'
    })
  })
})

export const { useGetProductsQuery, useGetTotalCountQuery } = api
