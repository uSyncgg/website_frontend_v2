import styles from './Receipt.module.css';
import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

export const Receipt = ({ totalPrice, eventTitle }) => {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formatted = today.toLocaleDateString('en-US', options);

    return (
        <div className={styles.secondContainer}>
            <div className={styles.cartContainer}>
                <div className={styles.successBadge}>
                    <FaCheckCircle />
                </div>
                <h1 className={styles.title}>Payment Confirmed</h1>
                <p className={styles.subtitle}>A confirmation has been sent to your email.</p>

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
                   <span className={styles.totalValue}>${totalPrice}</span>
                </div>
            </div>
        </div>
    )
}
