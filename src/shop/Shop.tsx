import React from "react";
import { CategoryNavigation } from "./CategoryNavigation";
import { ProductList } from "./ProductList";
import { Product } from "../types";
import { CartSummary } from "./CartSummary";
import { PaginationControls } from "./PaginationControls";

type ShopProps = {
    products: Product[]
    cartItems: number
    cartPrice: number
    setPage: (operand: string) => void
    setLimit: (value: number) => void
    setSort: (value: string) => void
    currentPage: number
    setPageCallback: (value: number) => void
    limit: number
}

export const Shop: React.FC<ShopProps> = (props) => {
    const {products, cartItems, cartPrice, setPage, setLimit, setSort,
        currentPage, setPageCallback, limit} = props;
        
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col bg-dark text-white">
                    <div className="navbar-brand">SPORTS STORE</div>
                    <CartSummary cartItems={cartItems} cartPrice={cartPrice} />
                </div>
            </div>
            <div className="row">
                <div className="col-3 p-2">
                    <CategoryNavigation baseUrl="/shop/products" />
                </div>
                <div className="col-9 p-2">
                    <PaginationControls setPage={setPage} currentPage={currentPage} limit={limit}
                        setLimit={setLimit} setSort={setSort} setPageCallback={setPageCallback}/>
                    <ProductList products={ products } />
                </div>
            </div>
        </div>
    )
}