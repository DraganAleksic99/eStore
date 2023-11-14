import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { cartPriceSelector, cartItemsSelector } from '../modules/cart/selectors';

export const CartSummary = () => {
    const cartPrice = useSelector(cartPriceSelector)
    const cartItems = useSelector(cartItemsSelector)

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