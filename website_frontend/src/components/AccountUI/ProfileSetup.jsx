import { useRef, useState } from "react";
import { FaCamera, FaCheck, FaChevronDown, FaLink, FaSitemap, FaTrophy } from "react-icons/fa";
import { Link } from "react-router";
import styles from './AccountUI.module.css';

/**
 * The setup that used to be signup steps.
 *
 * Linking accounts and bracket hosting were removed from the signup flow —
 * neither is needed for an account to exist, and asking for them before the
 * account existed was standing between people and a finished signup. They live
 * here instead, on the profile someone lands on straight after, where the same
 * work is a choice rather than a toll.
 *
 * The panel is also the profile's completion tracker, and it retires itself:
 * at 100% it collapses into an achievement rather than sitting there forever
 * telling a finished profile that it's finished.
 */
const Task = ({ task, open, onToggle, children }) => (
    <div className={`${styles.setupTask} ${task.done ? styles.setupTaskDone : ''}`}>
        <button
            type="button"
            className={styles.setupTaskHead}
            onClick={() => (children ? onToggle() : undefined)}
            aria-expanded={children ? open : undefined}
        >
            <span className={styles.setupTick}>{task.done ? <FaCheck /> : <span className={styles.setupDot} />}</span>
            <span className={styles.setupTaskBody}>
                <span className={styles.setupTaskTitle}>{task.title}</span>
                <span className={styles.setupTaskNote}>{task.note}</span>
            </span>
            {task.href ? (
                <Link to={task.href} className={styles.setupAction} onClick={(e) => e.stopPropagation()}>
                    {task.done ? 'Edit' : 'Add'}
                </Link>
            ) : children ? (
                <span className={`${styles.setupChevron} ${open ? styles.setupChevronOpen : ''}`}><FaChevronDown /></span>
            ) : null}
        </button>

        {children && open && <div className={styles.setupTaskPanel}>{children}</div>}
    </div>
);

export const ProfileSetup = ({
    tasks = [],
    hosting,
    onHostingChange,
    links = {},
    onLinkChange,
    linkGroups = [],
    avatarUrl,
    onAvatarChange,
    bio = "",
    onBioChange,
    onDismiss,
}) => {
    const [openTask, setOpenTask] = useState(null);
    const [linkTab, setLinkTab] = useState(linkGroups[0]?.id);
    const avatarInput = useRef(null);

    const doneCount = tasks.filter(t => t.done).length;
    const percent = tasks.length ? Math.round((doneCount / tasks.length) * 100) : 0;
    const complete = percent === 100;

    if (complete) {
        return (
            <section className={styles.setupComplete}>
                <span className={styles.setupTrophy}><FaTrophy /></span>
                <div>
                    <p className={styles.setupCompleteTitle}>Profile complete</p>
                    <p className={styles.setupCompleteText}>
                        Every part of your profile is filled in — you've earned the <strong>Fully Synced</strong> achievement.
                    </p>
                </div>
                {onDismiss && (
                    <button type="button" className={styles.setupDismiss} onClick={onDismiss}>Dismiss</button>
                )}
            </section>
        );
    }

    const activeGroup = linkGroups.find(g => g.id === linkTab) || linkGroups[0];

    return (
        <section className={styles.setup}>
            <div className={styles.setupHead}>
                <div>
                    <h2 className={styles.setupTitle}>Finish setting up your profile</h2>
                    <p className={styles.setupSub}>None of this is required — do it now, or come back whenever.</p>
                </div>
                <div className={styles.setupMeter}>
                    <span className={styles.setupPercent}>{percent}%</span>
                    <span className={styles.setupCount}>{doneCount} of {tasks.length} done</span>
                </div>
            </div>

            <div className={styles.setupTrack}>
                <i style={{ width: `${percent}%` }} />
            </div>

            <div className={styles.setupTasks}>
                {tasks.map(task => {
                    const open = openTask === task.id;
                    const toggle = () => setOpenTask(open ? null : task.id);

                    if (task.id === 'links') {
                        return (
                            <Task key={task.id} task={task} open={open} onToggle={toggle}>
                                <div className={styles.linkTabs}>
                                    {linkGroups.map(g => (
                                        <button
                                            type="button"
                                            key={g.id}
                                            className={`${styles.linkTab} ${activeGroup?.id === g.id ? styles.linkTabActive : ''}`}
                                            onClick={() => setLinkTab(g.id)}
                                        >
                                            {g.label}
                                        </button>
                                    ))}
                                </div>

                                <div className={styles.linkAccountsGrid}>
                                    {(activeGroup?.platforms || []).map(({ value, label, icon: Icon }) => (
                                        <div className={styles.linkAccountRow} key={value}>
                                            <Icon className={styles.linkAccountIcon} />
                                            <span className={styles.linkAccountLabel}>{label}</span>
                                            <input
                                                className={styles.linkAccountInput}
                                                placeholder="Username"
                                                value={links[value] || ''}
                                                onChange={(e) => onLinkChange?.(value, e.target.value)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </Task>
                        );
                    }

                    if (task.id === 'avatar') {
                        return (
                            <Task key={task.id} task={task} open={open} onToggle={toggle}>
                                <div className={styles.setupAvatarRow}>
                                    <button
                                        type="button"
                                        className={styles.setupAvatarDrop}
                                        style={avatarUrl ? { backgroundImage: `url(${avatarUrl})` } : undefined}
                                        onClick={() => avatarInput.current?.click()}
                                    >
                                        {!avatarUrl && <FaCamera />}
                                    </button>
                                    <div>
                                        <p className={styles.setupHelp} style={{ marginBottom: '.6rem' }}>
                                            PNG, JPG or GIF, up to 8MB. It shows on your profile and on your player card.
                                        </p>
                                        <button type="button" className={styles.setupChoice} onClick={() => avatarInput.current?.click()}>
                                            {avatarUrl ? 'Replace photo' : 'Upload a photo'}
                                        </button>
                                    </div>
                                    <input
                                        ref={avatarInput}
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) onAvatarChange?.(URL.createObjectURL(file));
                                            e.target.value = '';
                                        }}
                                    />
                                </div>
                            </Task>
                        );
                    }

                    if (task.id === 'bio') {
                        return (
                            <Task key={task.id} task={task} open={open} onToggle={toggle}>
                                <textarea
                                    className={styles.input}
                                    rows={3}
                                    style={{ resize: 'vertical', fontFamily: 'inherit' }}
                                    placeholder="Controller CoD player & part-time wager grinder."
                                    value={bio}
                                    onChange={(e) => onBioChange?.(e.target.value)}
                                />
                            </Task>
                        );
                    }

                    if (task.id === 'hosting') {
                        return (
                            <Task key={task.id} task={task} open={open} onToggle={toggle}>
                                <p className={styles.setupHelp}>
                                    Bracket hosting puts a <strong>Create bracket</strong> button on your profile so you can run
                                    your own matches for friends or your team. It doesn't make you an event host.
                                </p>
                                <div className={styles.setupChoices}>
                                    <button
                                        type="button"
                                        className={`${styles.setupChoice} ${hosting === true ? styles.setupChoiceOn : ''}`}
                                        onClick={() => onHostingChange?.(true)}
                                    >
                                        <FaSitemap /> Turn it on
                                    </button>
                                    <button
                                        type="button"
                                        className={`${styles.setupChoice} ${hosting === false ? styles.setupChoiceOn : ''}`}
                                        onClick={() => onHostingChange?.(false)}
                                    >
                                        Not right now
                                    </button>
                                </div>
                            </Task>
                        );
                    }

                    return <Task key={task.id} task={task} open={open} onToggle={toggle} />;
                })}
            </div>

            <p className={styles.setupFoot}>
                <FaLink /> Everything here also lives in <Link to="/account/profile/edit">Edit profile</Link>.
            </p>
        </section>
    );
};
