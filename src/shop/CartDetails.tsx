import { Link } from 'react-router-dom'
import { CartDetailsRows } from './CartDetailsRows'
import { useSelector } from 'react-redux'
import { cartSelector, cartItemsSelector, cartPriceSelector } from '../modules/cart/selectors'

export const CartDetails = () => {
  const cart = useSelector(cartSelector)
  const cartItems = useSelector(cartItemsSelector)
  const cartPrice = useSelector(cartPriceSelector)
  const getLinkClasses = () => `btn btn-secondary m-1 ${cartItems === 0 ? 'disabled' : ''}`

  return (
    <div className="col-lg-9">
      <div className="row">
        <div className="col bg-dark text-white">
          <div className="navbar-brand">E STORE</div>
        </div>
      </div>
      <h2 className="text-center m-3">Your Cart</h2>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Quantity</th>
            <th>Product</th>
            <th className="text-right">Price</th>
            <th className="text-right">Subtotal</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <CartDetailsRows cart={cart} cartPrice={cartPrice} />
        </tbody>
      </table>
      <div className="text-center">
        <Link className="btn btn-primary m-1" to="/shop/products">
          Continue Shopping
        </Link>
        <Link className={getLinkClasses()} to="/shop/checkout">
          Checkout
        </Link>
      </div>
    </div>
  )
}
