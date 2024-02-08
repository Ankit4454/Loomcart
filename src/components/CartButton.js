import React from 'react';
import styles from '../styles/button.module.css';
import { MdOutlineAddShoppingCart } from "react-icons/md";

function CartButton(props) {
    return (
        <button onClick={props.handleAddCart} className={styles.cartBtn}>
            <span className={styles.iconContainer}>
                <MdOutlineAddShoppingCart size={24} />
            </span>
            <p className={styles.text}>Add to Cart</p>
        </button>
    )
}

export default CartButton;