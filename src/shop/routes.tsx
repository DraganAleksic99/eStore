import { Routes, Route, Navigate } from 'react-router-dom'
import { NotFound } from './NotFound'
import { Shop } from './Shop'
import { CartDetails } from './CartDetails'
import { Checkout } from './Checkout'
import { Thanks } from './Thanks'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/shop/products" />} />
      <Route path="shop/products" element={<Shop />}>
        <Route path=":category" element={<Shop />} />
      </Route>
      <Route path="shop/cart" element={<CartDetails />} />
      <Route path="shop/checkout" element={<Checkout />} />
      <Route path="shop/thanks" element={<Thanks />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
