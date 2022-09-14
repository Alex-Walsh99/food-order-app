import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css'
import CartContext from "../../store/cart-context";
import {useContext, useEffect, useState} from "react";

const HeaderCartButton = () => {
    const [btnHightlighted, setBtnHighlighted] = useState(false);

    const ctx = useContext(CartContext);
    const {items} = ctx;

    const numberOfCartItems = items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0);

    const btnClasses = `${classes.button} ${btnHightlighted ? classes.bump : ''}`

    useEffect(() => {
        if (items.length === 0)
            return;
        setBtnHighlighted(true);

        const timer = setTimeout(() => {
            setBtnHighlighted(false);
        }, 300)

        return () => {
            clearTimeout(timer);
        }

    }, [items]);

    return <button className={btnClasses} onClick={ctx.onToggleVisibility}>
        <span className={classes.icon}>
            <CartIcon/>
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
};

export default HeaderCartButton