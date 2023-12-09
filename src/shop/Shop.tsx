import { useState } from 'react'
import { CategoryNavigation } from './CategoryNavigation'
import { ProductList } from './ProductList'
import { CartSummary } from './CartSummary'
import { PaginationControls } from './PaginationControls'
import { useGetProductsQuery } from '../modules/loadData/productsApi'
import { Product } from '../types'
import { useParams, useLocation } from 'react-router-dom'

const filterProducts = (products: Product[] = [], category?: string) =>
  !category || category === 'All'
    ? products
    : products.filter(p => p.category.toLowerCase() === category.toLowerCase())

export const Shop = () => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(5)
  const [sort, setSort] = useState('name')
  const { category } = useParams()
  const { pathname } = useLocation()
  const {
    data: products,
    isLoading,
    isSuccess,
    isError
  } = useGetProductsQuery({ page, limit, sort })
  const filteredProducts = filterProducts(products, category)

  const updatePage = (operand: string) => {
    if (operand === 'next') {
      setPage(page + 1)
    }
    if (operand === 'previous') {
      setPage(page - 1)
    }
  }

  let productsList

  if (isError) productsList = <p>Something went wrong</p>

  if (isLoading) {
    productsList = Array(limit)
      .fill('')
      .map((_, i: number) => (
        <div className="card m-1 p-1 bg-light h-15 loading" key={i}>
          <h4>
            Title
            <span
              className="badge badge-pill badge-primary float-right"
              style={{ color: 'transparent' }}
            >
              $100.00
            </span>
          </h4>
          <div className="card-text bg-white p-1">
            Description
            <button className="btn btn-success btn-sm float-right">Add To Cart</button>
          </div>
        </div>
      ))
  }

  if (isSuccess) productsList = <ProductList products={filteredProducts} />

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-lg-9 bg-dark text-white">
          <div className="navbar-brand">E STORE</div>
          <CartSummary />
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-2 p-2">
          <CategoryNavigation pathname={pathname} />
        </div>
        <div className="col-lg-7 p-2">
          <PaginationControls
            setPage={updatePage}
            currentPage={page}
            limit={limit}
            setLimit={setLimit}
            setSort={setSort}
            setPageCallback={setPage}
          />
          {productsList}
        </div>
      </div>
    </div>
  )
}
