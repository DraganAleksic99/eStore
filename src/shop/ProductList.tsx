import React from 'react'
import { Product } from '../types'
import { addToCart } from '../modules/cart/slice'
import { useDispatch } from 'react-redux'

type ProductListProps = {
  products: Product[] | undefined
}

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const dispatch = useDispatch()

  if (!products || products.length === 0) {
    return null
  }
  return (
    <>
      {products?.map(p => (
        <div className="card m-1 p-1 bg-light" key={p.id}>
          <h4>
            {p.name}
            <span className="badge badge-pill badge-primary float-right">
              ${p.price.toFixed(2)}
            </span>
          </h4>
          <div className="card-text bg-white p-1">
            {p.description}
            <button
              className="btn btn-success btn-sm float-right"
              onClick={() => dispatch(addToCart({ product: p, quantity: 1 }))}
            >
              Add To Cart
            </button>
          </div>
        </div>
      ))}
    </>
  )
}
