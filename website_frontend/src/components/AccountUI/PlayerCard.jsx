import { useEffect, useRef } from 'react';
import { FaDownload, FaImage, FaLock, FaMagic, FaTrash, FaUser } from 'react-icons/fa';
import styles from './AccountUI.module.css';
import { CALLING_CARDS, CUSTOM_CARD_ID, getCallingCardProgress, isCallingCardUnlocked } from './callingCards';
import { PlayerCardArt } from './PlayerCardArt';
import { drawCallingCardThumb, drawPlayerCard, CARD_SIZES } from './playerCardCanvas';

const TONE_COLORS = { money: '#5ED39B', rank: '#86eaff' };

const CallingCardThumb = ({ card, bannerImage }) => {
    const ref = useRef(null);
    useEffect(() => {
        drawCallingCardThumb(ref.current, { card, bannerImage });
    }, [card, bannerImage]);

    return <canvas ref={ref} width={320} height={179} className={styles.callingCardThumb} />;
};

/**
 * Player card panel: the live card, the calling-card picker, and the export.
 *
 * State lives in `usePlayerCardOptions` one level up because the profile hero
 * is framed with the same calling card — changing it here re-skins the whole
 * dashboard, which is the point.
 */
export const PlayerCard = ({ profile, verified = false, options, stats = [], location, mainGame, xp, progress = {} }) => {
    const exportCanvas = useRef(null);
    const photoInput = useRef(null);
    const {
        card,
        cardId,
        setCardId,
        usingBanner,
        banner,
        photo,
        photoOriginal,
        photoMode,
        setPhotoMode,
        photoStatus,
        photoProgress,
        layout,
        setLayout,
        uploadBanner,
        removeBanner,
        uploadPhoto,
        removePhoto,
        socialId,
        setSocialId,
        platformId,
        setPlatformId,
        linkedSocials,
        linkedEventPlatforms,
        social,
        platform,
    } = options;

    const displayName = profile.accountType === 'host' ? profile.accountName : profile.username;

    const download = () => {
        const canvas = exportCanvas.current;
        if (!canvas) return;
        const size = CARD_SIZES[layout];
        canvas.width = size.w;
        canvas.height = size.h;

        drawPlayerCard(canvas, {
            layout,
            card,
            bannerImage: usingBanner ? banner.image : null,
            photoImage: photo?.image || null,
            photoFraming: photo?.framing || 'bust',
            name: displayName,
            handle: `usync.gg/p/${profile.username}`,
            meta: [location, mainGame ? `Main: ${mainGame}` : null].filter(Boolean).join(' · '),
            verified,
            social,
            platform,
            stats: stats.map((s) => ({ ...s, color: TONE_COLORS[s.tone] })),
            xp,
        });

        canvas.toBlob((blob) => {
            if (!blob) return;
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${profile.username || 'player'}-usync-card-${layout}.png`;
            a.click();
            URL.revokeObjectURL(url);
        }, 'image/png');
    };

    return (
        // Portrait leaves room beside the card on a wide screen, so the
        // controls move alongside it instead of stacking under it. Landscape
        // needs the full width and stays stacked.
        <div className={`${styles.playerCardBlock} ${layout === 'portrait' ? styles.playerCardSplit : ''}`}>
            <div className={styles.playerCardTopRow}>
                <div className={styles.segmented}>
                    <button
                        type="button"
                        className={`${styles.segmentedBtn} ${layout === 'portrait' ? styles.segmentedBtnActive : ''}`}
                        onClick={() => setLayout('portrait')}
                    >
                        Portrait
                    </button>
                    <button
                        type="button"
                        className={`${styles.segmentedBtn} ${layout === 'landscape' ? styles.segmentedBtnActive : ''}`}
                        onClick={() => setLayout('landscape')}
                    >
                        Landscape
                    </button>
                </div>
            </div>

            <div className={styles.playerCardMain}>
                <div className={styles.playerCardStage}>
                    <PlayerCardArt
                        layout={layout}
                        card={card}
                        bannerUrl={usingBanner ? banner.url : null}
                        photoUrl={photo?.url || null}
                        photoFraming={photo?.framing || 'bust'}
                        photoBusy={photoStatus === 'working'}
                        avatarUrl={profile.avatar || null}
                        onAddPhoto={() => photoInput.current?.click()}
                        name={displayName}
                        location={location}
                        mainGame={mainGame}
                        verified={verified}
                        social={social}
                        platform={platform}
                        stats={stats}
                        xp={xp}
                        handle={profile.username}
                    />
                </div>

                <p className={styles.playerCardNote}>
                    Click the card to tilt it. Downloads as a {CARD_SIZES[layout].w} × {CARD_SIZES[layout].h} PNG.
                </p>

                <div className={styles.playerCardActions}>
                    <button type="button" className={styles.playerCardPrimary} onClick={download}>
                        <FaDownload /> Download card
                    </button>

                    <label className={styles.playerCardGhost}>
                        <FaImage /> {banner ? 'Replace banner' : 'Upload banner'}
                        <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={(e) => {
                                uploadBanner(e.target.files?.[0]);
                                e.target.value = '';
                            }}
                        />
                    </label>

                    {banner && (
                        <button type="button" className={styles.playerCardGhost} onClick={removeBanner}>
                            <FaTrash /> Remove banner
                        </button>
                    )}

                    <button type="button" className={styles.playerCardGhost} onClick={() => photoInput.current?.click()}>
                        <FaUser /> {photo ? 'Replace headshot' : 'Add headshot'}
                    </button>

                    {photo && (
                        <button type="button" className={styles.playerCardGhost} onClick={removePhoto}>
                            <FaTrash /> Remove headshot
                        </button>
                    )}

                    <input
                        ref={photoInput}
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                            uploadPhoto(e.target.files?.[0]);
                            e.target.value = '';
                        }}
                    />
                </div>

                {photoOriginal && photoStatus !== 'idle' && (
                    <div className={styles.cutoutStatus}>
                        {photoStatus === 'working' && (
                            <>
                                <span className={styles.cutoutSpinner} aria-hidden="true" />
                                <span>
                                    Cutting out the background
                                    {photoProgress != null ? ` — loading model ${photoProgress}%` : '…'}
                                </span>
                            </>
                        )}

                        {photoStatus === 'ready' && (
                            <>
                                <FaMagic />
                                <span>{photoMode === 'cutout' ? 'Background removed.' : 'Showing your original photo.'}</span>
                                <button
                                    type="button"
                                    className={styles.cutoutToggle}
                                    onClick={() => setPhotoMode(photoMode === 'cutout' ? 'original' : 'cutout')}
                                >
                                    {photoMode === 'cutout' ? 'Use original' : 'Use cut-out'}
                                </button>
                            </>
                        )}

                        {photoStatus === 'failed' && (
                            <span className={styles.cutoutFailed}>
                                Couldn't remove the background automatically — using your photo as-is. A PNG with a
                                transparent background works best.
                            </span>
                        )}
                    </div>
                )}
            </div>

            <div className={styles.playerCardSide}>
                <h3 className={styles.playerCardSubhead}>Calling card</h3>
                <p className={styles.playerCardHint}>
                    Use your own banner or equip a uSync pattern — it frames this card and your profile header. Locked patterns
                    are earned by playing.
                </p>

                <div className={styles.callingCardGrid}>
                    {banner && (
                        <button
                            type="button"
                            className={`${styles.callingCardTile} ${usingBanner ? styles.callingCardTileActive : ''}`}
                            onClick={() => setCardId(CUSTOM_CARD_ID)}
                        >
                            <CallingCardThumb card={CALLING_CARDS[0]} bannerImage={banner.image} />
                            <span className={styles.callingCardName}>Your banner</span>
                            <span className={styles.callingCardTagline}>Custom upload</span>
                        </button>
                    )}

                    {CALLING_CARDS.map((c) => {
                        const unlocked = isCallingCardUnlocked(c, progress, verified);
                        const active = !usingBanner && cardId === c.id;
                        const p = getCallingCardProgress(c, progress);

                        return (
                            <button
                                type="button"
                                key={c.id}
                                className={`${styles.callingCardTile} ${active ? styles.callingCardTileActive : ''} ${unlocked ? '' : styles.callingCardTileLocked}`}
                                onClick={() => unlocked && setCardId(c.id)}
                                disabled={!unlocked}
                                aria-pressed={active}
                            >
                                <span className={styles.callingCardThumbWrap}>
                                    <CallingCardThumb card={c} />
                                    {!unlocked && (
                                        <span className={styles.callingCardLock}>
                                            <FaLock />
                                            {p && (
                                                <span className={styles.callingCardProgress}>
                                                    {p.current} / {p.target}
                                                </span>
                                            )}
                                        </span>
                                    )}
                                </span>
                                <span className={styles.callingCardName}>{c.name}</span>
                                <span className={styles.callingCardTagline}>
                                    {unlocked ? (c.requirement ? 'Unlocked' : c.tagline) : c.requirement.label}
                                </span>
                            </button>
                        );
                    })}
                </div>

                <div className={styles.playerCardSelectRow}>
                    <label className={styles.playerCardSelect}>
                        <span className={styles.playerCardSelectLabel}>Social shown</span>
                        <select className={styles.input} value={socialId} onChange={(e) => setSocialId(e.target.value)}>
                            <option value="">None</option>
                            {linkedSocials.map((p) => (
                                <option key={p.value} value={p.value}>
                                    {p.label}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className={styles.playerCardSelect}>
                        <span className={styles.playerCardSelectLabel}>Event platform shown</span>
                        <select className={styles.input} value={platformId} onChange={(e) => setPlatformId(e.target.value)}>
                            <option value="">None</option>
                            {linkedEventPlatforms.map((p) => (
                                <option key={p.value} value={p.value}>
                                    {p.label}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
            </div>

            {/* Sized and drawn only when someone actually downloads. */}
            <canvas
                ref={exportCanvas}
                width={CARD_SIZES.portrait.w}
                height={CARD_SIZES.portrait.h}
                style={{ display: 'none' }}
            />
        </div>
    );
};
