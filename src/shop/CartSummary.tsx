import React from 'react';
import { Link } from "react-router-dom";

type CartSummaryProps = {
    cartItems: number
    cartPrice: number
}

export const CartSummary: React.FC<CartSummaryProps> = ({cartItems, cartPrice}) => {
    const getSummary = () => {
        if (cartItems > 0) {
            return <span>
                { cartItems } item(s), ${ cartPrice.toFixed(2)}
            </span>
        } else {
            return <span>Your cart: (empty) </span>
        }
    }
    const getLinkClasses = () => {
        return `btn btn-sm bg-dark text-white ${ cartItems === 0 ? "disabled": ""}`;
    }

    return (
        <div className="float-right">
            <small>
                { getSummary() }
                <Link className={ getLinkClasses() } to="/shop/cart">
                    <i className="fa fa-shopping-cart"></i>
                </Link>
            </small>
        </div>
    )
}