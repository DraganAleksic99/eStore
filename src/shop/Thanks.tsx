import { Link, useLocation } from 'react-router-dom'

export const Thanks = () => {
  const { state: customer } = useLocation()

  console.log(customer.products)

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-lg-9 bg-dark text-white">
          <div className="navbar-brand">E STORE</div>
        </div>
      </div>
      <div className="m-2 text-center">
        <h2>Thanks!</h2>
        <p>Thanks for placing your order.</p>
        <p>We'll ship your goods as soon as possible.</p>
      </div>
      <div className="container my-5 col-lg-9">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th colSpan={2}>
                <h3>Your Shipping Details</h3>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{customer.Name}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{customer.Email}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>{customer.Address}</td>
            </tr>
            <tr>
              <td>City</td>
              <td>{customer.City}</td>
            </tr>
            <tr>
              <td>Country</td>
              <td>{customer.Country}</td>
            </tr>
            <tr>
              <td>ZipCode</td>
              <td>{customer.ZipCode}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="text-center">
        <Link to="/shop/products" className="btn btn-primary">
          Return to Store
        </Link>
      </div>
    </div>
  )
}
