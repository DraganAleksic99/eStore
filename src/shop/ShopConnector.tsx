import { Switch, Route, Redirect } from "react-router-dom";
import { Shop } from "./Shop";
import { CartDetails } from "./CartDetails";
import { Checkout } from "./Checkout";
import { Thanks } from "./Thanks";

export const ShopConnector = () => {
    
    return <Switch>
        <Route path="/shop/products/:category?"
            render={ (routeProps) =>
            <Shop { ...routeProps }  />} />

{/* @ts-ignore */}
        <Route path="/shop/cart" render={ (routeProps) => <CartDetails {...routeProps}/>} />
        <Route path="/shop/checkout" render={ routeProps =>
            <Checkout { ...routeProps } /> } />
{/* @ts-ignore */}

        <Route path="/shop/thanks" render={ routeProps =>
            <Thanks /> } />
        <Redirect to="/shop/products" />
    </Switch>
}
