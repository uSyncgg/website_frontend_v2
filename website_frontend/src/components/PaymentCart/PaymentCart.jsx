import styles from './PaymentCart.module.css';
import React from 'react';
import { FaLock, FaShieldAlt } from 'react-icons/fa';

export const PaymentCart = ({ pass, fee, eventName }) => {
    return (
        <div className={styles.secondContainer}>
            <div className={styles.cartContainer}>
                <p className={styles.eyebrow}>Order Summary</p>
                <h2 className={styles.cartTitle}>{eventName || 'Your Event Pass'}</h2>

                <div className={styles.cartItem}>
                    <span>Event Pass</span>
                    <span>${pass}</span>
                </div>
                <div className={styles.cartItem}>
                    <span className={styles.feeLabel}>
                        Platform Fee
                        <span className={styles.feeNote}>5% &middot; keeps uSync running</span>
                    </span>
                    <span>${fee}</span>
                </div>

                <hr className={styles.cartDivider} />

                <div className={styles.cartTotal}>
                   <span>Total Due</span>
                   <span className={styles.totalValue}>${(pass + fee).toFixed(2)}</span>
                </div>

                <div className={styles.trustRow}>
                    <span className={styles.trustItem}><FaLock /> Secure Stripe checkout</span>
                    <span className={styles.trustItem}><FaShieldAlt /> Buyer protection</span>
                </div>
            </div>
        </div>
    )
}
