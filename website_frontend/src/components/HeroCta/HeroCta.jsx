import styles from './HeroCta.module.css';
import { Link } from 'react-router';

/**
 * Plain call-to-action panel for the catalog hero's aside slot — same visual
 * footprint as VerifiedBoard (bordered panel, header row), for when there's
 * no real verified data for this catalog's type but the space is worth using.
 */
export const HeroCta = ({ eyebrow, body, buttonLabel, path }) => {
    return (
        <div className={styles.cta}>
            {eyebrow !== undefined && <p className={styles.eyebrow}>{eyebrow}</p>}
            {body !== undefined && <p className={styles.body}>{body}</p>}
            <Link to={path} className={styles.button}>{buttonLabel}</Link>
        </div>
    );
}
