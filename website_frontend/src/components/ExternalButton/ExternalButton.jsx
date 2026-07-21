import styles from './ExternalButton.module.css';
import { Link, useLocation } from 'react-router';
import React from 'react';
import { trackJoinNowClick } from 'utils/analytics';

export const ExternalButton = ({ path, title, inverted=false, blank=false, host=undefined }) => {
    const location = useLocation();
    const segments = location.pathname.split('/');
    const game = segments[1] === 'games' ? segments[2] : undefined;

    return (
        <React.Fragment>
            <Link 
                to={path} 
                target={blank ? '_blank' : ""} 
                className={styles.aWrapper}
                rel='nofollow'
                onClick={() => trackJoinNowClick(game, host, path)}
            >
                <button className={`${styles.button} ${!inverted ? styles.buttonStandard : styles.buttonInverted}`}>{title}</button>
            </Link>
        </React.Fragment>
    )
}
