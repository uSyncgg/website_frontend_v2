import styles from './ExternalButton.module.css';
import { Link } from 'react-router';
import React from 'react';

export const ExternalButton = ({ path, title, inverted=false, blank=false }) => {
    return (
        <React.Fragment>
            <Link 
                to={path} 
                target={blank ? '_blank' : ""} 
                className={styles.aWrapper}
                rel='nofollow'
            >
                <button className={`${styles.button} ${!inverted ? styles.buttonStandard : styles.buttonInverted}`}>{title}</button>
            </Link>
        </React.Fragment>
    )
}
