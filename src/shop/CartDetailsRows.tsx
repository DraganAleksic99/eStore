import React from 'react';
import { CartItem } from '../modules/cart/slice';
import { updateCartQuantity, removeFromCart } from '../modules/cart/slice';
import { useDispatch, useSelector } from 'react-redux';
import { Product } from '../types';
import { cartPriceSelector, cartSelector } from '../modules/cart/selectors';

type CartDetailsRowsProps = {
    cartPrice: number
    cart: CartItem[]
}

export const CartDetailsRows: React.FC<CartDetailsRowsProps> = ({cart, cartPrice}) => {
    const dispatch = useDispatch();
    const handleChange = (e: any, product: Product) => {
        dispatch(updateCartQuantity({product: product, quantity: e.target.value}));
    }
    if (!cart || cart.length === 0) {
        return <tr>
                <td colSpan={5}>Your cart is empty</td>
            </tr>
        } else {
        return <>
            { cart.map(item =>
            <tr key={ item.product.id }>
                <td>
                    <input type="number" value={ item.quantity }
                        onChange={ (e) => handleChange(e, item.product) } />
                </td>
                <td>{ item.product.name }</td>
                <td>${ item.product.price.toFixed(2) }</td>
                <td>${ (item.quantity * item.product.price).toFixed(2) }</td>
                <td>
                    <button className="btn btn-sm btn-danger"
                        onClick={ () => dispatch(removeFromCart(item.product))}>
                        Remove
                    </button>
                </td>
            </tr>
            )}
            <tr>
                <th colSpan={3} className="text-right">Total:</th>
                <th colSpan={2}>${ cartPrice.toFixed(2) }</th>
            </tr>
        </>
    }
}
