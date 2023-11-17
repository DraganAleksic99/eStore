import React from 'react'
import { PaginationButtons } from './PaginationButtons'

type PaginationControlsProps = {
  setPage: (operand: string) => void
  setLimit: (value: number) => void
  setSort: (value: string) => void
  currentPage: number
  setPageCallback: (value: number) => void
  limit: number
}

const pageSizes = [5, 10, 25]
const sortKeys = ['Name', 'Price']

export const PaginationControls: React.FC<PaginationControlsProps> = props => {
  const { currentPage, setPage, setLimit, setSort, setPageCallback, limit } = props

  return (
    <div className="m-2">
      <div className="text-center m-1">
        <PaginationButtons
          currentPage={currentPage}
          setPage={setPage}
          setPageCallback={setPageCallback}
          limit={limit}
        />
      </div>
      <div className="form-inline justify-content-center">
        <select
          className="form-control"
          onChange={e => setLimit(Number(e.target.value))}
          value={limit}
        >
          {pageSizes.map(s => (
            <option value={s} key={s}>
              {s} per page
            </option>
          ))}
        </select>
        <select className="form-control" onChange={e => setSort(e.target.value)}>
          {sortKeys.map(k => (
            <option value={k.toLowerCase()} key={k}>
              Sort By {k}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
