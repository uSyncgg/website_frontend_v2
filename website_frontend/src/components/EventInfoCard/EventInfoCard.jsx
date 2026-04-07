import styles from './EventInfoCard.module.css';
import React from 'react';

function CreateBullets(infoList) {
    const listItems = infoList.map((item, index) => (
        <li key={index} className={styles.eventItem}>{item}</li>
    ))

    return (
        <ul className={styles.ul}>
            {listItems}
        </ul>
    )
}

export const EventInfoCard = ({ title, infoList, regionTitle, regionInfoList }) => {
    
    return (
        <div className={styles.eventCard}>
            <h1 className={styles.title}>{title}</h1>
            {CreateBullets(infoList)}
            { regionTitle && regionInfoList && (
                <React.Fragment>
                    <h1 className={styles.title}>{regionTitle}</h1>
                    {CreateBullets(regionInfoList)}

                </React.Fragment>
            )}
        </div>
    )
}
