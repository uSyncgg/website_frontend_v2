import React from "react";
import styles from './NoEvents.module.css';
import { Link } from "react-router";

export const NoEvents = ({ pageType }) => {
    
    return (
        <div>
            {pageType === 'LANs' && 
                <div className={styles.eventContainer}>
                    <h1>None Upcoming - Please Check Back Tomorrow</h1>
                </div>
            }

            {pageType === 'Leagues' &&
                <div className={styles.eventContainer}>
                    <h1>No Active Leagues - Please Check Back Later</h1>
                    <h3>
                        Post Your League {" "}
                        <Link to={"/more/eventhost"} className={styles.link}>Here</Link>
                    </h3>
                </div>
            }
        </div>
    );
}

