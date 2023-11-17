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

  const { data: products } = useGetProductsQuery({ page, limit, sort })

  const filteredProducts = filterProducts(products, category)

  const updatePage = (operand: string) => {
    if (operand === 'next') {
      setPage(page + 1)
    }
    if (operand === 'previous') {
      setPage(page - 1)
    }
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col bg-dark text-white">
          <div className="navbar-brand">E STORE</div>
          <CartSummary />
        </div>
      </div>
      <div className="row">
        <div className="col-3 p-2">
          <CategoryNavigation pathname={pathname} />
        </div>
        <div className="col-9 p-2">
          <PaginationControls
            setPage={updatePage}
            currentPage={page}
            limit={limit}
            setLimit={setLimit}
            setSort={setSort}
            setPageCallback={setPage}
          />
          <ProductList products={filteredProducts} />
        </div>
      </div>
    </div>
  )
}
