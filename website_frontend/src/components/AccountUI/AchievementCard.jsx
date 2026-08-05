import { useState } from "react";
import { FaTimes, FaPlus, FaTrophy } from "react-icons/fa";
import { AccountField } from "./AccountField";
import styles from './AccountUI.module.css';

export const AchievementCard = ({ achievement, icon: Icon = FaTrophy, onRemove }) => (
    <div className={styles.achievementCard}>
        <div className={styles.achievementIconWrap}><Icon /></div>
        <div className={styles.achievementBody}>
            <p className={styles.achievementTitle}>{achievement.title}</p>
            {achievement.description && <p className={styles.achievementDesc}>{achievement.description}</p>}
            {achievement.date && <span className={styles.achievementDate}>{achievement.date}</span>}
        </div>
        {onRemove && (
            <button type="button" className={styles.achievementRemove} onClick={onRemove} aria-label="Remove achievement">
                <FaTimes />
            </button>
        )}
    </div>
);

export const AchievementList = ({ achievements = [], iconOptions = [], editable = false, onAdd, onRemove }) => {
    const [draft, setDraft] = useState({ icon: iconOptions[0]?.value || "trophy", title: "", description: "", date: "" });

    const getIcon = (value) => (iconOptions.find(o => o.value === value) || iconOptions[0] || {}).icon;

    const handleAdd = () => {
        if (!draft.title.trim()) return;
        onAdd?.({ ...draft, id: `a${Date.now()}` });
        setDraft({ icon: iconOptions[0]?.value || "trophy", title: "", description: "", date: "" });
    };

    return (
        <>
            <div className={styles.achievementList}>
                {achievements.length === 0 && <p className={styles.emptyState}>No achievements added yet.</p>}
                {achievements.map((a) => (
                    <AchievementCard
                        key={a.id}
                        achievement={a}
                        icon={getIcon(a.icon)}
                        onRemove={editable ? () => onRemove?.(a.id) : undefined}
                    />
                ))}
            </div>

            {editable && (
                <div style={{ marginTop: "1.25rem" }}>
                    <p className={styles.label} style={{ marginBottom: ".85rem" }}>Add an achievement</p>
                    <div className={styles.formGrid}>
                        <AccountField
                            label="Title" name="achTitle" value={draft.title}
                            onChange={(e) => setDraft(d => ({ ...d, title: e.target.value }))}
                            placeholder="MVP — Winter Championship" required={false} span={2}
                        />
                        <AccountField
                            label="Icon" name="achIcon" as="select" options={iconOptions} value={draft.icon}
                            onChange={(e) => setDraft(d => ({ ...d, icon: e.target.value }))} required={false}
                        />
                        <AccountField
                            label="Date" name="achDate" type="date" value={draft.date}
                            onChange={(e) => setDraft(d => ({ ...d, date: e.target.value }))} required={false}
                        />
                        <AccountField
                            label="Description" name="achDesc" value={draft.description}
                            onChange={(e) => setDraft(d => ({ ...d, description: e.target.value }))}
                            placeholder="What happened?" required={false} span={2}
                        />
                    </div>
                    <button type="button" className={styles.secondaryButton} onClick={handleAdd}>
                        <FaPlus style={{ marginRight: ".4rem" }} /> Add achievement
                    </button>
                </div>
            )}
        </>
    );
};
