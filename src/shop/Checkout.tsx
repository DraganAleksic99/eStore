import { useDispatch, useSelector } from 'react-redux'
import { cartSelector } from '../modules/cart/selectors'
import { clearCart } from '../modules/cart/slice'
import { useAddNewOrderMutation } from '../modules/orders/ordersApi'
import { CartItem } from '../modules/cart/slice'
import { useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Input } from './Input'

export interface IFormInput {
  name: string
  email: string
  adress: string
  city: string
  zipCode: string
  country: string
}

export const Checkout = () => {
  const navigate = useNavigate()
  const cart = useSelector(cartSelector)
  const [addNewOrder] = useAddNewOrderMutation()
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInput>({
    defaultValues: {
      name: '',
      email: '',
      adress: '',
      city: '',
      zipCode: '',
      country: ''
    }
  })

  const handleCancel = () => {
    navigate('/shop/cart')
  }

  const onSubmit: SubmitHandler<IFormInput> = async (formData: {}) => {
    const order = {
      id: 1,
      ...formData,
      products: cart.map((item: CartItem) => ({
        quantity: item.quantity,
        product_id: item.product.id
      }))
    }

    const newOrder = await addNewOrder(JSON.stringify(order)).unwrap()

    dispatch(clearCart())
    navigate('/shop/thanks', { state: newOrder })
  }

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-lg-9 bg-dark text-white">
          <div className="navbar-brand">E STORE</div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-9 m-2">
          <form onSubmit={handleSubmit(data => onSubmit(data))}>
            <Input name="name" register={register} errors={errors} />
            <Input name="email" register={register} errors={errors} />
            <Input name="adress" register={register} errors={errors} />
            <Input name="city" register={register} errors={errors} />
            <Input name="zipCode" register={register} errors={errors} />
            <Input name="country" register={register} errors={errors} />
            <div className="text-center mt-3">
              <button className="btn btn-secondary m-1">Submit</button>
              <button type="button" className="btn btn-secondary m-1" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
