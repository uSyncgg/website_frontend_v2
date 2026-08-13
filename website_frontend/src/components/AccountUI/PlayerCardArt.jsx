import { useRef, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import styles from './AccountUI.module.css';
import { cardPatternClass } from './callingCards';

const USYNC_LOGO = "https://i.imgur.com/F5lNU1H.png";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

/**
 * The live player card. Same thing the download produces, except this one
 * tilts: click (or Enter/Space) to arm it, then move the pointer across it for
 * the holographic sweep, the way a physical card catches light.
 *
 * Portrait and landscape are the same content at two aspect ratios — portrait
 * for a profile pin, landscape for a post or a sign-up sheet.
 */
export const PlayerCardArt = ({
    layout = 'portrait',
    card,
    bannerUrl,
    photoUrl,
    photoFraming = 'bust',
    photoBusy = false,
    avatarUrl,
    onAddPhoto,
    name,
    location,
    mainGame,
    verified,
    social,
    platform,
    stats = [],
    xp,
    scopeLabel,
    handle,
}) => {
    const ref = useRef(null);
    const [armed, setArmed] = useState(false);

    const setFromPoint = (clientX, clientY) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = clamp((clientX - rect.left) / rect.width, 0, 1);
        const y = clamp((clientY - rect.top) / rect.height, 0, 1);
        el.style.setProperty('--ry', `${((x - 0.5) * 20).toFixed(2)}deg`);
        el.style.setProperty('--rx', `${((0.5 - y) * 15).toFixed(2)}deg`);
        el.style.setProperty('--glow-x', `${(x * 100).toFixed(1)}%`);
        el.style.setProperty('--glow-y', `${(y * 100).toFixed(1)}%`);
    };

    const rest = () => {
        const el = ref.current;
        if (!el) return;
        el.style.setProperty('--rx', '0deg');
        el.style.setProperty('--ry', '0deg');
        el.style.setProperty('--glow-x', '50%');
        el.style.setProperty('--glow-y', '50%');
    };

    const toggle = (e) => {
        setArmed(prev => {
            const next = !prev;
            if (next && e?.clientX != null) setFromPoint(e.clientX, e.clientY);
            else rest();
            return next;
        });
    };

    const patternClass = bannerUrl ? styles.patternCustom : styles[cardPatternClass(card.id)];
    const initial = (name || '?').slice(0, 1).toUpperCase();

    const identity = (
        <div className={styles.pcardIdentity}>
            <p className={styles.pcardHandle}>{name}</p>
            <p className={styles.pcardMeta}>
                <FaMapMarkerAlt />
                {location && <span>{location}</span>}
                {location && mainGame && <span className={styles.pcardDot}>·</span>}
                {mainGame && <span>Main: {mainGame}</span>}
            </p>
        </div>
    );

    const chips = (social || platform) && (
        <div className={styles.pcardChips}>
            {social && <span><b>{social.label}</b>{social.value}</span>}
            {platform && <span><b>{platform.label}</b>{platform.value}</span>}
        </div>
    );

    const statGrid = (
        <div className={layout === 'portrait' ? styles.pcardStats : styles.pcardStatsWide}>
            {stats.map(stat => (
                <div key={stat.label}>
                    <span>{stat.label}</span>
                    <strong className={stat.tone ? styles[stat.tone] : undefined}>{stat.value}</strong>
                </div>
            ))}
        </div>
    );

    const xpBlock = xp && (
        <div className={styles.pcardXp}>
            <div className={styles.pcardXpCopy}>
                <span>Level {xp.level}</span>
                <strong>{xp.current.toLocaleString()} / {xp.next.toLocaleString()}</strong>
            </div>
            <div className={styles.pcardXpTrack}>
                <i style={{ width: `${clamp((xp.current / xp.next) * 100, 0, 100).toFixed(1)}%` }} />
            </div>
            {xp.note && <p>{xp.note}</p>}
        </div>
    );

    // A card is always a card *for something* — one game, or the whole career.
    const scope = scopeLabel && <span className={styles.pcardScope}>{scopeLabel}</span>;

    const brandRow = (
        <div className={styles.pcardBrandRow}>
            <span className={styles.pcardBrandLeft}>
                <img className={styles.pcardWordmark} src={USYNC_LOGO} alt="uSync" />
                {scope}
            </span>
            {verified && (
                <span className={styles.pcardVerified}>
                    <img src="https://i.imgur.com/PCHIHQB.png" alt="" />
                    Verified
                </span>
            )}
        </div>
    );

    // Portrait keeps the frame as the profile avatar, because the headshot
    // already hangs off the hero as a cut-out — showing it twice looks cheap.
    // Landscape has no hero, so there the frame is where the headshot lives.
    const frameUrl = (layout === 'landscape' ? photoUrl || avatarUrl : avatarUrl) || null;
    const avatar = (
        <span className={styles.pcardFrame}>
            {frameUrl ? <img src={frameUrl} alt="" /> : <span className={styles.pcardFrameInitial}>{initial}</span>}
        </span>
    );

    // Empty-state cut-out. It exists only in the live card — the PNG is drawn
    // from scratch on canvas, so an empty slot can never reach a download.
    // The photo is trimmed to the subject before it gets here, so it can be
    // placed with plain object-fit: anchored to the card's right edge, starting
    // level with the avatar, running down *behind* the stats and fading out
    // into them. It sits below the content layer so the tiles read on top.
    // Two shapes turn up: torso cut-outs, which get the full height and run
    // down behind the stats, and face-only crops, which get a smaller, higher
    // box — given the tall one a head would balloon and swallow the card.
    // Either way the player lands in the same place beside the avatar.
    const wideSubject = photoFraming === 'bust';

    const photoLayer = photoUrl && layout === 'portrait' && (
        <span className={`${styles.pcardPhotoLayer} ${wideSubject ? styles.pcardPhotoLayerWide : ''}`} aria-hidden="true">
            <span className={styles.pcardPhotoGlow} />
            <img className={`${styles.pcardPhoto} ${photoBusy ? styles.pcardPhotoBusy : ''}`} src={photoUrl} alt="" />
        </span>
    );

    // Keeps the name and meta legible where they cross the player.
    const photoScrim = photoUrl && layout === 'portrait' && (
        <span className={styles.pcardScrim} aria-hidden="true" />
    );

    const photoSlot = photoUrl ? (
        photoBusy ? (
            <span className={styles.pcardPhotoWorking}>
                <span className={styles.cutoutSpinner} aria-hidden="true" />
                Cutting out…
            </span>
        ) : null
    ) : onAddPhoto ? (
        <button
            type="button"
            className={styles.pcardPhotoSlot}
            onClick={(e) => { e.stopPropagation(); onAddPhoto(); }}
            title="Add a cut-out headshot"
        >
            <svg viewBox="0 0 64 80" aria-hidden="true">
                <circle cx="32" cy="21" r="15" />
                <path d="M5 78c0-16 12-27 27-27s27 11 27 27" />
            </svg>
            <span className={styles.pcardPhotoSlotLabel}>Add headshot</span>
            <span className={styles.pcardPhotoSlotHint}>PNG cut-out</span>
        </button>
    ) : null;

    const footer = (
        <div className={styles.pcardFooter}>
            <span>usync.gg/p/{handle}</span>
            <span>{bannerUrl ? 'Custom banner' : card.name}</span>
        </div>
    );


    return (
        <article
            ref={ref}
            tabIndex={0}
            role="img"
            aria-label={`${name} player card`}
            className={`${styles.pcard} ${layout === 'portrait' ? styles.pcardPortrait : styles.pcardLandscape} ${patternClass} ${armed ? styles.pcardArmed : ''}`}
            style={bannerUrl ? { '--pcard-banner': `url(${bannerUrl})` } : undefined}
            onClick={toggle}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggle();
                }
            }}
            onPointerMove={(e) => armed && setFromPoint(e.clientX, e.clientY)}
            onPointerLeave={rest}
        >
            <span className={styles.pcardField} aria-hidden="true" />
            <span className={styles.pcardHolo} aria-hidden="true" />

            {layout === 'portrait' ? (
                <>
                    {photoLayer}
                    {photoScrim}
                    {brandRow}
                    <div className={`${styles.pcardHero} ${!photoUrl && onAddPhoto ? styles.pcardHeroWithPhoto : ''}`}>
                        {avatar}
                        {photoSlot}
                    </div>
                    {identity}
                    {chips}
                    {statGrid}
                    {xpBlock}
                    {footer}
                </>
            ) : (
                <>
                    {brandRow}
                    <div className={styles.pcardWideGrid}>
                        <div className={styles.pcardWideIdentity}>
                            <div className={styles.pcardNameRow}>
                                {avatar}
                                {identity}
                            </div>
                            {chips}
                        </div>
                        {statGrid}
                    </div>
                    {xpBlock}
                    {footer}
                </>
            )}
        </article>
    );
};
