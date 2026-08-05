import styles from './AccountUI.module.css';

export const ProfileSidebar = ({ title = "Edit profile", sections, activeId, onSelect }) => (
    <div className={styles.sidebar}>
        <p className={styles.sidebarTitle}>{title}</p>
        <ul className={styles.sidebarList}>
            {sections.map((section) => {
                const isActive = section.id === activeId;
                return (
                    <li className={`${styles.sidebarStep} ${isActive ? styles.sidebarStep_active : styles.sidebarStep_plain}`} key={section.id}>
                        <button type="button" className={styles.sidebarStepButton} onClick={() => onSelect(section.id)}>
                            <span className={styles.sidebarBubble}>{section.icon || "•"}</span>
                            <span className={styles.sidebarLabel}>{section.label}</span>
                        </button>
                    </li>
                );
            })}
        </ul>
    </div>
);
