import { Link } from 'react-router';
import { trackEventCardClick } from 'utils/analytics';
import styles from './WaysToCompete.module.css';

export const WaysToCompete = ({ formats }) => {
    return (
        <div className={styles.grid}>
            {formats.map(f => (
                <Link
                    key={f.key}
                    to={f.path}
                    className={`${styles.card} ${f.live ? "" : styles.disabled}`}
                    onClick={() => trackEventCardClick(f.path, f.name)}
                >
                    <h3 className={styles.name}>{f.name}</h3>
                    <p className={styles.blurb}>{f.blurb}</p>
                </Link>
            ))}
        </div>
    );
}
