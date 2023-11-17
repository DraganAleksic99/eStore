import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { categoriesSelector } from '../modules/loadData/selectors'
import { fetchCategories } from '../modules/loadData/categoriesSlice'
import { AppDispatch, useAppDispatch } from '../store'
import { Link } from 'react-router-dom'

type CategoryNavigationProps = {
  pathname: string
}

export const CategoryNavigation: React.FC<CategoryNavigationProps> = ({ pathname }) => {
  const dispatch: AppDispatch = useAppDispatch()

  console.log(pathname)

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  const categories = useSelector(categoriesSelector)

  return (
    <>
      <Link
        className={`btn btn-${pathname === '/shop/products' ? 'primary' : 'secondary'} btn-block`}
        to="/shop/products"
      >
        All
      </Link>

      {categories &&
        categories.map(cat => (
          <Link
            key={cat}
            to={`/shop/products/${cat.toLowerCase()}`}
            className={`btn btn-block ${
              pathname === `/shop/products/${cat.toLowerCase()}` ? 'btn-primary' : 'btn-secondary'
            }`}
          >
            {cat}
          </Link>
        ))}
    </>
  )
}
