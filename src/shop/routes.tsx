import { Routes, Route } from "react-router-dom"
import { NotFound } from "./NotFound"
import { Shop } from "./Shop"
import { CartDetails } from "./CartDetails"
import { Checkout } from "./Checkout"
import { Thanks } from "./Thanks"

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Shop />} >
                <Route path=":category" element={<Shop />} />
            </Route>
            <Route path="shop/cart" element={<CartDetails />} />
            <Route path="shop/cart" element={<CartDetails />} />
            <Route path="shop/checkout" element={<Checkout />} />
            <Route path="shop/thanks" element={<Thanks />} />
            <Route path="*" element={<NotFound/>} />
        </Routes>
    )
}