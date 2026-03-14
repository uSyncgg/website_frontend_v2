import styles from './EventInfoCard.module.css';

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

export const EventInfoCard = ({ title, infoList }) => {

    return (
        <div className={styles.eventCard}>
            <h1 className={styles.title}>{title}</h1>
            {CreateBullets(infoList)}
        </div>
    )
}
