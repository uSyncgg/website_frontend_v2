import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CALLING_CARDS, CUSTOM_CARD_ID, getCallingCard, isCallingCardUnlocked } from "./callingCards";
import { canRemoveBackground, removeBackground } from "utils/backgroundRemoval";
import { autoFitHeadshot } from "utils/headshot";

// Decode a file (or a blob we produced) into something both CSS and canvas can
// use: an object URL for backgrounds, a decoded Image for the PNG export.
const loadImage = (blob) =>
    new Promise((resolve, reject) => {
        const url = URL.createObjectURL(blob);
        const image = new Image();
        image.onload = () => resolve({ url, image });
        image.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error("That file could not be read as an image."));
        };
        image.src = url;
    });

const release = (entry) => {
    if (entry?.url) URL.revokeObjectURL(entry.url);
};

// The equipped calling card isn't only the player card's business — the
// profile hero is framed with the same art, so the choice lives one level up
// and both surfaces read from here.
export const usePlayerCardOptions = ({ profile, verified, progress, socialPlatforms = [], eventPlatforms = [] }) => {
    const linkedSocials = useMemo(
        () => socialPlatforms.filter(p => profile.links?.[p.value]),
        [socialPlatforms, profile.links]
    );
    const linkedEventPlatforms = useMemo(
        () => eventPlatforms.filter(p => profile.links?.[p.value]),
        [eventPlatforms, profile.links]
    );

    const [cardId, setCardId] = useState(profile.callingCard || CALLING_CARDS[0].id);
    const [layout, setLayout] = useState('portrait');
    // Standard is the default on purpose: hardly anyone has a cut-out headshot,
    // and a card that opens with an empty photo slot reads as unfinished for
    // the people who never will. Pro is the opt-in for those who do.
    const [cardStyle, setCardStyle] = useState(profile.photo ? 'pro' : 'standard');
    const [banner, setBanner] = useState(null); // { url, image }
    const [socialId, setSocialId] = useState(profile.cardSocial || linkedSocials[0]?.value || "");
    const [platformId, setPlatformId] = useState(profile.cardPlatform || linkedEventPlatforms[0]?.value || "");

    // Headshots keep both versions: what was uploaded, and the cut-out we made
    // from it. Nobody's photo is thrown away because the model had a bad day.
    const [photoOriginal, setPhotoOriginal] = useState(null);
    const [photoCutout, setPhotoCutout] = useState(null);
    const [photoMode, setPhotoMode] = useState('cutout'); // cutout | original
    const [photoStatus, setPhotoStatus] = useState('idle'); // idle | working | ready | failed
    const [photoProgress, setPhotoProgress] = useState(null);
    // Only the newest upload is allowed to write results back.
    const uploadToken = useRef(0);

    // Losing Verified (or any other unlock) shouldn't leave a card equipped
    // that the player can no longer claim.
    useEffect(() => {
        if (cardId === CUSTOM_CARD_ID) return;
        if (!isCallingCardUnlocked(getCallingCard(cardId), progress, verified)) {
            setCardId(CALLING_CARDS[0].id);
        }
    }, [cardId, progress, verified]);

    const usingBanner = cardId === CUSTOM_CARD_ID && !!banner;
    const card = getCallingCard(cardId);
    const photo = (photoMode === 'cutout' && photoCutout) || photoOriginal;

    const uploadBanner = useCallback(async (file) => {
        if (!file) return;
        try {
            const next = await loadImage(file);
            setBanner(prev => {
                release(prev);
                return next;
            });
            setCardId(CUSTOM_CARD_ID);
        } catch {
            /* an unreadable file just leaves the current banner alone */
        }
    }, []);

    const removeBanner = useCallback(() => {
        setBanner(prev => {
            release(prev);
            return null;
        });
        setCardId(CALLING_CARDS[0].id);
    }, []);

    const uploadPhoto = useCallback(async (file) => {
        if (!file) return;
        const token = ++uploadToken.current;

        let original;
        try {
            const fitted = await autoFitHeadshot(file);
            original = { ...(await loadImage(fitted.blob)), framing: fitted.framing };
        } catch {
            return;
        }
        if (token !== uploadToken.current) {
            release(original);
            return;
        }

        // Show the photo straight away — the cut-out swaps in when it's ready.
        setPhotoOriginal(prev => {
            release(prev);
            return original;
        });
        setPhotoCutout(prev => {
            release(prev);
            return null;
        });
        setPhotoMode('cutout');
        setPhotoProgress(null);

        if (!canRemoveBackground()) {
            setPhotoStatus('failed');
            return;
        }

        setPhotoStatus('working');
        try {
            const blob = await removeBackground(file, (pct) => {
                if (token === uploadToken.current) setPhotoProgress(pct);
            });
            const fitted = await autoFitHeadshot(blob);
            const cutout = { ...(await loadImage(fitted.blob)), framing: fitted.framing };
            if (token !== uploadToken.current) {
                release(cutout);
                return;
            }
            setPhotoCutout(prev => {
                release(prev);
                return cutout;
            });
            setPhotoStatus('ready');
        } catch {
            if (token === uploadToken.current) setPhotoStatus('failed');
        } finally {
            if (token === uploadToken.current) setPhotoProgress(null);
        }
    }, []);

    const removePhoto = useCallback(() => {
        uploadToken.current++;
        setPhotoOriginal(prev => {
            release(prev);
            return null;
        });
        setPhotoCutout(prev => {
            release(prev);
            return null;
        });
        setPhotoMode('cutout');
        setPhotoStatus('idle');
        setPhotoProgress(null);
    }, []);

    const findLink = (platforms, value) => {
        const platform = platforms.find(p => p.value === value);
        if (!platform || !profile.links?.[value]) return null;
        return { label: platform.label, value: profile.links[value] };
    };

    return {
        card,
        cardId,
        setCardId,
        usingBanner,
        banner,
        layout,
        setLayout,
        cardStyle,
        setCardStyle,
        uploadBanner,
        removeBanner,

        photo,
        photoOriginal,
        photoCutout,
        photoMode,
        setPhotoMode,
        photoStatus,
        photoProgress,
        uploadPhoto,
        removePhoto,

        socialId,
        setSocialId,
        platformId,
        setPlatformId,
        linkedSocials,
        linkedEventPlatforms,
        social: findLink(socialPlatforms, socialId),
        platform: findLink(eventPlatforms, platformId),
    };
};
