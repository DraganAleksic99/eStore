import { Link } from 'react-router-dom'
import { useGetOrdersQuery } from '../modules/orders/ordersApi'

export const Thanks = () => {
  const { data: orders } = useGetOrdersQuery({})
  return (
    <div>
      <div className="col bg-dark text-white">
        <div className="navbar-brand">E STORE</div>
      </div>
      <div className="m-2 text-center">
        <h2>Thanks!</h2>
        <h2>{orders}</h2>
        <p>Thanks for placing your order.</p>
        <p>We'll ship your goods as soon as possible.</p>
        <Link to="/shop/products" className="btn btn-primary">
          Return to Store
        </Link>
      </div>
    </div>
  )
}
