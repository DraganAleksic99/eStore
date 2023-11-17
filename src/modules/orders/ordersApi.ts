import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const protocol = 'http'
const hostname = 'localhost'
const port = 3500

const url = `${protocol}://${hostname}:${port}/api`

export const pApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: url }),
  reducerPath: 'ordersApi',
  tagTypes: ['Post'],
  endpoints: build => ({
    getOrder: build.query({
      query: () => `${url}/orders`
    }),
    addNewOrder: build.mutation({
      query: payload => ({
        url: '/orders',
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

export const { useAddNewOrderMutation, useGetOrderQuery } = pApi
