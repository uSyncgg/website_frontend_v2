import styles from './ProfileViewToggle.module.css';

/**
 * Segmented control for switching between a profile's views (player / host /
 * venue). Renders every view it's given; the caller passes only the views the
 * account has.
 */
export const ProfileViewToggle = ({ views, active, onChange }) => {
    return (
        <div className={styles.seg} role="tablist" aria-label="Profile view">
            {views.map(view => (
                <button
                    key={view.key}
                    type="button"
                    role="tab"
                    aria-selected={view.key === active}
                    className={view.key === active ? styles.on : undefined}
                    onClick={() => onChange(view.key)}
                >
                    {view.label}
                </button>
            ))}
        </div>
    );
}
