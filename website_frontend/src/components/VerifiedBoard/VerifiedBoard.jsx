import styles from './VerifiedBoard.module.css';
import { Link } from 'react-router';

/**
 * Small panel listing verified organizers, sat beside the catalog hero.
 *
 * Uses the site's own verified mark rather than a generic checkmark, so the
 * badge here is the same one shown on the event pages it refers to.
 *
 * Rows are supplied by config — see the `board` key in catalog/*.catalog.js.
 * Every row must be an organizer flagged verified on its own page, and must
 * name exactly one destination: a row is a single link, so an organizer
 * verified in more than one section is pointed at whichever one matters most.
 */
export const VerifiedBoard = ({ label, rows = [] }) => {
    if (rows.length === 0) return null;

    return (
        <div className={styles.board}>
            <div className={styles.head}>
                <img
                    className={styles.mark}
                    src="https://i.imgur.com/PCHIHQB.png"
                    alt=""
                    loading="lazy"
                    decoding="async"
                />
                <span className={styles.label}>{label}</span>
            </div>

            <ul className={styles.rows}>
                {rows.map(row => (
                    <li key={row.path}>
                        <Link to={row.path} className={styles.row}>
                            <span className={styles.what}>{row.name}</span>
                            <span className={styles.tag}>{row.tag}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
