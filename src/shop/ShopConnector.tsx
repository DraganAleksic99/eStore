import { useEffect, useState} from "react";
import { Product } from "../types";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { Shop } from "./Shop";
import { cartItemsSelector, cartPriceSelector, cartSelector } from "../modules/cart/selectors";
import { CartDetails } from "./CartDetails";
import { AppDispatch, useAppDispatch } from "../store";
import { fetchCategories } from "../modules/loadData/categoriesSlice";
import { useGetProductsQuery } from "../modules/loadData/productsApi";
import { Checkout } from "./Checkout";
import { Thanks } from "./Thanks";

const filterProducts = (products: Product[] = [], category?: string) =>
 (!category || category === "All")
 ? products
 : products.filter(p => p.category.toLowerCase() === category.toLowerCase());

export const ShopConnector = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(25);
    const [sort, setSort] = useState('name');
    const dispatch: AppDispatch = useAppDispatch();
    

    const updatePage = (operand: string) => {
        if (operand === 'next') {
            setPage(page + 1);
        }
        if (operand === 'previous') {
            setPage(page - 1);
        }
    }
    
    useEffect(() => {
        dispatch(fetchCategories());
    },[dispatch]);
    
    const { data: products } = useGetProductsQuery({page, limit, sort});
    console.log(products);

    const cartItems = useSelector(cartItemsSelector);
    const cartPrice = useSelector(cartPriceSelector);
    const cart = useSelector(cartSelector);
    
    return <Switch>
        <Route path="/shop/products/:category?"
            render={ (routeProps) =>
            <Shop { ...routeProps } cartItems={cartItems} cartPrice={cartPrice} setPage={updatePage} 
                setPageCallback={setPage} limit={limit} products={ filterProducts(products,
                routeProps.match.params.category) } setLimit={setLimit} setSort={setSort}
                currentPage={page} />} />
        
        <Route path="/shop/cart" render={ (routeProps) =>
            <CartDetails cartItems={cartItems} cart={cart} cartPrice={cartPrice} {...routeProps}/>} />

        <Route path="/shop/checkout" render={ routeProps =>
            <Checkout { ...routeProps } cart={cart} /> } />

        <Route path="/shop/thanks" render={ routeProps =>
            <Thanks /> } />
        <Redirect to="/shop/products" />
    </Switch>
}