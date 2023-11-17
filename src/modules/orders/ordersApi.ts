import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const url = 'https://my-json-server.typicode.com/DraganAleksic99/estore/'

export const ordersApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: url }),
  reducerPath: 'ordersApi',
  tagTypes: ['Post'],
  endpoints: build => ({
    getOrders: build.query({
      query: () => `orders`
    }),
    addNewOrder: build.mutation({
      query: payload => ({
        url: 'orders',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }),
      invalidatesTags: ['Post']
    })
  })
})

export const { useAddNewOrderMutation, useGetOrdersQuery } = ordersApi
