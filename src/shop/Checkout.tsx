import { useDispatch, useSelector } from 'react-redux'
import { cartSelector } from '../modules/cart/selectors'
import { clearCart } from '../modules/cart/slice'
import { useAddNewOrderMutation } from '../modules/orders/ordersApi'
import { CartItem } from '../modules/cart/slice'
import { useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Input } from './Input'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

export interface IFormInput {
  Name: string
  Email: string
  Address: string
  City: string
  ZipCode: string
  Country: string
}

const schema = Yup.object({
  Name: Yup.string().max(255).required(),
  Email: Yup.string().email().max(255).required(),
  Address: Yup.string().max(255).required(),
  City: Yup.string().max(255).required(),
  ZipCode: Yup.string().max(255).required(),
  Country: Yup.string().max(255).required()
}).required()

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
      Name: '',
      Email: '',
      Address: '',
      City: '',
      ZipCode: '',
      Country: ''
    },
    resolver: yupResolver(schema)
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
        product_id: item.product.id,
        name: item.product.name
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
            <Input name="Name" register={register} errors={errors} />
            <Input name="Email" register={register} errors={errors} />
            <Input name="Address" register={register} errors={errors} />
            <Input name="City" register={register} errors={errors} />
            <Input name="ZipCode" register={register} errors={errors} />
            <Input name="Country" register={register} errors={errors} />
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
