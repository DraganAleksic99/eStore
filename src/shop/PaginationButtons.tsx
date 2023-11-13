import React from "react";

type PaginationButtonsProps = {
    setPage: (operand: string) => void
    currentPage: number
    setPageCallback: (value: number) => void
    limit: number
}

export const PaginationButtons: React.FC<PaginationButtonsProps> = ({currentPage, setPage, setPageCallback, limit}) => {
    const pageNumbers = [];
    const numberOfPages = Math.ceil(200 / limit);

    for (let i = 1; i <= numberOfPages; i++) {
        pageNumbers[i] = i;    
    }

 return <>
    <button disabled={ currentPage === 1 } className="btn btn-secondary mx-1" onClick={() => setPage('previous')} > 
        Previous
    </button>
    { currentPage > 4 &&
        <>
        <button className="btn btn-secondary mx-1"
        >1</button>
        <span className="h4">...</span>
        </>
    }
    { pageNumbers.map(num =>
        <button className={ `btn mx-1 ${num === currentPage ? "btn-primary": "btn-secondary"}`} key={ num }
            onClick={() => setPageCallback(num)}>
            { num }
        </button>
    )}
    { currentPage <= (pageNumbers.length - 4) &&
        <>
            <span className="h4">...</span>
            <button className="btn btn-secondary mx-1" >
                { pageNumbers.length }
            </button>
        </>
    }
    <button disabled={ currentPage === pageNumbers.length } onClick={() => setPage('next')} 
        className="btn btn-secondary mx-1">
        Next
    </button>
 </>
}