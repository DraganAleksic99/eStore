import React from "react";
import { ValidatedForm } from "../forms/ValidatedForm";
import { useDispatch, useSelector } from "react-redux";
import { cartSelector } from "../modules/cart/selectors";
import { clearCart } from "../modules/cart/slice";
import { useAddNewOrderMutation } from "../modules/orders/ordersApi";
import { CartItem } from "../modules/cart/slice";
import { RouteComponentProps } from "react-router-dom";

type CheckoutProps = {
    history: RouteComponentProps['history']
}

export const Checkout: React.FC<CheckoutProps> = ({history}) => {
    const cart = useSelector(cartSelector)
    const [addNewOrder] = useAddNewOrderMutation();
    const dispatch = useDispatch();
    const defaultAttrs = { type: "text", required: true };
    const formModel = [
        { label: "Name"},
        { label: "Email", attrs: { type: "email" }},
        { label: "Address" },
        { label: "City"},
        { label: "Zip/Postal Code", name: "zip"},
        { label: "Country"}
    ]

    const handleCancel = () => {
        history.push('/shop/cart')
    }

    const handleSubmit = (formData: {}) => {
        const order = { ...formData, products: cart.map((item: CartItem) =>
            ({ quantity: item.quantity, product_id: item.product.id})) }
        addNewOrder(order);
        dispatch(clearCart());
        history.push('/shop/thanks');
    }
    return  <div className="container-fluid">
        <div className="row">
            <div className="col bg-dark text-white">
            <div className="navbar-brand">SPORTS STORE</div>
            </div>
        </div>
        <div className="row">
            <div className="col m-2">
            <ValidatedForm formModel={ formModel }
                defaultAttrs={ defaultAttrs }
                submitCallback={ handleSubmit }
                cancelCallback={ handleCancel }
                submitText="Place Order"
                cancelText="Return to Cart" />
            </div>
        </div>
    </div>
 }

