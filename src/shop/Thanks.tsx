import { Link, useLocation } from 'react-router-dom'

export const Thanks = () => {
  const { state } = useLocation()
  console.log(state)

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-lg-8 bg-dark text-white">
          <div className="navbar-brand">E STORE</div>
        </div>
      </div>
      <div className="m-2 text-center">
        <h2>Thanks!</h2>
        <p>Thanks for placing your order.</p>
        <p>We'll ship your goods as soon as possible.</p>
        <Link to="/shop/products" className="btn btn-primary">
          Return to Store
        </Link>
      </div>
    </div>
  )
}
