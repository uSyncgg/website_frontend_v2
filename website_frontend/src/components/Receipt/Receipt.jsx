import styles from './Receipt.module.css';
import React from 'react';

export const Receipt = ({ totalPrice, eventTitle }) => {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formatted = today.toLocaleDateString('en-US', options);

    return (
        <div className={styles.secondContainer}>
            <h1>Your Receipt</h1>
            <div className={styles.cartContainer}>
                <div className={styles.cartItem}>
                    <span>Event</span> 
                    <span>{eventTitle}</span>
                </div>
                <div className={styles.cartItem}>
                    <span>Date</span>
                    <span>{formatted}</span>
                </div>
                
                <hr className={styles.cartDivider} />

                <div className={styles.cartTotal}>
                   <span>Price Total</span>
                   <span>${totalPrice}</span> 
                </div>
            </div>
        </div>
    )
}
