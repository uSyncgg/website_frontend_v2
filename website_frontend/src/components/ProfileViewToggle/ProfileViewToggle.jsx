import styles from './ProfileViewToggle.module.css';

/**
 * Segmented control for switching between a profile's views (player / host /
 * venue). Views the account doesn't have are shown disabled rather than hidden
 * so the set of profile types stays consistent from profile to profile.
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
                    disabled={!view.available}
                    title={view.available ? undefined : `No ${view.label.toLowerCase()} profile`}
                    className={view.key === active ? styles.on : undefined}
                    onClick={() => onChange(view.key)}
                >
                    {view.label}
                </button>
            ))}
        </div>
    );
}
