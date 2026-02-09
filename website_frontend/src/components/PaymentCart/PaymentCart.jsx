import styles from './PaymentCart.module.css';
import React from 'react';

export const PaymentCart = ({ pass, fee }) => {
    return (
        <div className={styles.secondContainer}>
            <h1>Your Cart</h1>
            <div className={styles.cartContainer}>
                <div className={styles.cartItem}>
                    <span>Event Pass</span> 
                    <span>${pass}</span>
                </div>
                <div className={styles.cartItem}>
                    <span>Site Fee</span>
                    <span>${fee}</span>
                </div>
                
                <hr className={styles.cartDivider} />

                <div className={styles.cartTotal}>
                   <span>Total</span>
                   <span>${pass + fee}</span> 
                </div>
            </div>
        </div>
    )
}
