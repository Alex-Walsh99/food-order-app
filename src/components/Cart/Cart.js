import classes from './Cart.module.css'
import Modal from "../UI/Modal";
import {Fragment, useContext, useState} from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem/CartItem";
import Checkout from "./Checkout";
import useHttp from "../../hooks/use-http";

const Cart = () => {

    const {isLoading, error, sendRequest: sendOrderRequest} = useHttp();
    const [didSubmit, setDidSubmit] = useState(false);
    const [isCheckout, setIsCheckout] = useState(false);
    const ctx = useContext(CartContext);

    const totalAmount = `£${ctx.totalAmount.toFixed(2)}`;
    const hasItems = ctx.items.length > 0;

    const cartItemRemoveHandler = id =>{
        ctx.removeItem(id)
    }

    const cartItemAddHandler = item =>{
        ctx.addItem({...item, amount: 1});
    }

    const orderHandler = () => {
        setIsCheckout(true);
    }

    const submitOrderHandler = async (userData) => {
        sendOrderRequest({
            url: 'https://react-http-2480d-default-rtdb.firebaseio.com/orders.json',
            method: 'POST',
            header: {'Content-Type': 'application/json'},
            body: {
                user:userData,
                orderedItems: ctx.items
            }
        }, () => {
            setDidSubmit(true)
            ctx.clearCart();
        });
    };

    const cartItems = <ul className={classes['cart-items']}>{ctx.items.map((item) =>
        (<CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={cartItemRemoveHandler.bind(null, item.id)} onAdd={cartItemAddHandler.bind(null, item)}/>
        ))}
    </ul>;

    const modalActions =
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={ctx.onToggleVisibility}>Close</button>
            {hasItems && <button className={classes['button']} onClick={orderHandler}>Order</button>}
        </div>

    const cartModalContent = <Fragment>{cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={ctx.onToggleVisibility}/>}
        {!isCheckout && modalActions}</Fragment>

    const isSubmittingModalContent = <p>Sending order data...</p>

    const didSubmitModalContent = <Fragment>
        <p>Sent order data! Enjoy your meal!</p>
        <div className={classes.actions}>
            <button className={classes['button']} onClick={ctx.onToggleVisibility}>Ok</button>
        </div>
    </Fragment>


    return <Modal onClose={ctx.onToggleVisibility}>
        {!isLoading && !didSubmit && cartModalContent}
        {isLoading && isSubmittingModalContent}
        {!isLoading && didSubmit && didSubmitModalContent}
    </Modal>
};

export default Cart;
