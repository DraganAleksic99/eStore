import { ValidatedForm } from '../forms/ValidatedForm'
import { useDispatch, useSelector } from 'react-redux'
import { cartSelector } from '../modules/cart/selectors'
import { clearCart } from '../modules/cart/slice'
import { useAddNewOrderMutation } from '../modules/orders/ordersApi'
import { CartItem } from '../modules/cart/slice'
import { useNavigate } from 'react-router-dom'

export const Checkout = () => {
  const navigate = useNavigate()
  const cart = useSelector(cartSelector)
  const [addNewOrder] = useAddNewOrderMutation()
  const dispatch = useDispatch()
  const defaultAttrs = { type: 'text', required: true }
  const formModel = [
    { label: 'Name' },
    { label: 'Email', attrs: { type: 'email' } },
    { label: 'Address' },
    { label: 'City' },
    { label: 'Zip/Postal Code', name: 'zip' },
    { label: 'Country' }
  ]

  const handleCancel = () => {
    navigate('/shop/cart')
  }

  const handleSubmit = async (formData: {}) => {
    const order = {
      ...formData,
      products: cart.map((item: CartItem) => ({
        quantity: item.quantity,
        product_id: item.product.id
      }))
    }

    const newOrder = await addNewOrder(order).unwrap()
    dispatch(clearCart())
    navigate('/shop/thanks')
  }
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col bg-dark text-white">
          <div className="navbar-brand">E STORE</div>
        </div>
      </div>
      <div className="row">
        <div className="col m-2">
          <ValidatedForm
            formModel={formModel}
            defaultAttrs={defaultAttrs}
            submitCallback={handleSubmit}
            cancelCallback={handleCancel}
            submitText="Place Order"
            cancelText="Return to Cart"
          />
        </div>
      </div>
    </div>
  )
}
