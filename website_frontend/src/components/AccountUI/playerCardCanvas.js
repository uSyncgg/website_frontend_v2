// Canvas renderer for the downloadable player card. Everything is drawn in
// code — no image assets and no libraries — so the PNG matches the live card
// in PlayerCardArt without a screenshot step.
//
// Two shapes, same content: portrait for a profile pin, landscape for a post
// or a league sign-up sheet.

const SANS = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';

export const CARD_SIZES = {
    portrait: { w: 1080, h: 1500 },
    landscape: { w: 1600, h: 900 },
};

const roundRect = (ctx, x, y, w, h, r) => {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
};

// Shrink a label until it fits its box, so a long gamertag can't overflow.
const fitFont = (ctx, text, maxWidth, startSize, weight, family, minSize = 12) => {
    let size = startSize;
    do {
        ctx.font = `${weight} ${size}px ${family}`;
        size -= 1;
    } while (ctx.measureText(text).width > maxWidth && size > minSize);
    return size + 1;
};

const drawCover = (ctx, img, x, y, w, h) => {
    const scale = Math.max(w / img.width, h / img.height);
    const dw = img.width * scale;
    const dh = img.height * scale;
    ctx.save();
    roundRect(ctx, x, y, w, h, 0);
    ctx.clip();
    ctx.drawImage(img, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh);
    ctx.restore();
};

// A custom banner is someone's own artwork, so it gets a scrim rather than
// restyling — enough contrast for the text, as little of the image lost as
// possible.
const drawScrim = (ctx, w, h) => {
    const side = ctx.createLinearGradient(0, 0, w, 0);
    side.addColorStop(0, 'rgba(8,6,12,.88)');
    side.addColorStop(.6, 'rgba(8,6,12,.58)');
    side.addColorStop(1, 'rgba(8,6,12,.34)');
    ctx.fillStyle = side;
    ctx.fillRect(0, 0, w, h);

    const bottom = ctx.createLinearGradient(0, h * .4, 0, h);
    bottom.addColorStop(0, 'rgba(8,6,12,0)');
    bottom.addColorStop(1, 'rgba(8,6,12,.82)');
    ctx.fillStyle = bottom;
    ctx.fillRect(0, 0, w, h);
};

export const paintCardBackground = (ctx, { card, bannerImage }, w, h) => {
    ctx.clearRect(0, 0, w, h);
    if (bannerImage) {
        drawCover(ctx, bannerImage, 0, 0, w, h);
        drawScrim(ctx, w, h);
    } else {
        card.paint(ctx, w, h);
    }
};

// Picker thumbnail: the art plus its accent bar, at whatever size the tile is.
export const drawCallingCardThumb = (canvas, { card, bannerImage }) => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { width: w, height: h } = canvas;
    paintCardBackground(ctx, { card, bannerImage }, w, h);
    ctx.fillStyle = bannerImage ? 'rgba(255,255,255,.8)' : card.accent;
    ctx.fillRect(0, 0, w, Math.max(2, h * .022));
};

const drawWordmark = (ctx, x, y, scale, accent) => {
    const size = 44 * scale;
    roundRect(ctx, x, y, size, size, 12 * scale);
    ctx.fillStyle = accent;
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = `900 ${24 * scale}px ${SANS}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('S', x + size / 2, y + size / 2 + 1);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    ctx.font = `800 ${25 * scale}px ${SANS}`;
    ctx.fillText('uSync', x + size + 14 * scale, y + size * .72);
};

const drawVerifiedPill = (ctx, rightX, y, scale, accent) => {
    const h = 44 * scale;
    ctx.font = `700 ${15 * scale}px ${MONO}`;
    const label = 'VERIFIED';
    const w = ctx.measureText(label).width + 74 * scale;
    const x = rightX - w;

    roundRect(ctx, x, y, w, h, h / 2);
    ctx.fillStyle = 'rgba(255,255,255,.08)';
    ctx.fill();
    ctx.strokeStyle = accent;
    ctx.globalAlpha = .6;
    ctx.lineWidth = 2 * scale;
    ctx.stroke();
    ctx.globalAlpha = 1;

    ctx.beginPath();
    ctx.arc(x + 26 * scale, y + h / 2, 13 * scale, 0, Math.PI * 2);
    ctx.fillStyle = accent;
    ctx.fill();

    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3.4 * scale;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(x + 20 * scale, y + h / 2);
    ctx.lineTo(x + 24 * scale, y + h / 2 + 5 * scale);
    ctx.lineTo(x + 33 * scale, y + h / 2 - 6 * scale);
    ctx.stroke();

    ctx.fillStyle = '#fff';
    ctx.font = `700 ${15 * scale}px ${MONO}`;
    ctx.fillText(label, x + 50 * scale, y + h / 2 + 5 * scale);
};

const drawChip = (ctx, x, y, label, value, accent, scale) => {
    const h = 42 * scale;
    ctx.font = `700 ${15 * scale}px ${MONO}`;
    const labelW = ctx.measureText(label.toUpperCase()).width;
    ctx.font = `400 ${17 * scale}px ${SANS}`;
    const valueW = ctx.measureText(value).width;
    const w = labelW + valueW + 54 * scale;

    roundRect(ctx, x, y, w, h, h / 2);
    ctx.fillStyle = 'rgba(255,255,255,.07)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,.16)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = accent;
    ctx.font = `700 ${15 * scale}px ${MONO}`;
    ctx.fillText(label.toUpperCase(), x + 18 * scale, y + h / 2 + 5 * scale);

    ctx.fillStyle = 'rgba(255,255,255,.88)';
    ctx.font = `400 ${17 * scale}px ${SANS}`;
    ctx.fillText(value, x + 18 * scale + labelW + 14 * scale, y + h / 2 + 5 * scale);

    return w;
};

const drawAvatar = (ctx, x, y, size, accent, initial, avatarImage) => {
    roundRect(ctx, x, y, size, size, size * .16);
    if (avatarImage) {
        ctx.save();
        ctx.clip();
        const scale = Math.max(size / avatarImage.width, size / avatarImage.height);
        const dw = avatarImage.width * scale;
        const dh = avatarImage.height * scale;
        ctx.drawImage(avatarImage, x + (size - dw) / 2, y, dw, dh);
        ctx.restore();
    } else {
        const g = ctx.createLinearGradient(x, y, x + size, y + size);
        g.addColorStop(0, accent);
        g.addColorStop(1, 'rgba(0,0,0,.55)');
        ctx.fillStyle = g;
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = `900 ${size * .46}px ${SANS}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(initial, x + size / 2, y + size / 2 + 2);
        ctx.textAlign = 'left';
        ctx.textBaseline = 'alphabetic';
    }
    roundRect(ctx, x, y, size, size, size * .16);
    ctx.strokeStyle = 'rgba(255,255,255,.18)';
    ctx.lineWidth = 2;
    ctx.stroke();
};

const drawStatTiles = (ctx, stats, { x, y, w, cols, rowH, gap, scale }) => {
    const tileW = (w - gap * (cols - 1)) / cols;
    stats.forEach((stat, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const tx = x + col * (tileW + gap);
        const ty = y + row * (rowH + gap);

        roundRect(ctx, tx, ty, tileW, rowH, 14 * scale);
        ctx.fillStyle = 'rgba(10,8,16,.62)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,.12)';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = 'rgba(255,255,255,.55)';
        const labelSize = fitFont(ctx, stat.label.toUpperCase(), tileW - 28 * scale, 15 * scale, 700, MONO, 9);
        ctx.font = `700 ${labelSize}px ${MONO}`;
        ctx.fillText(stat.label.toUpperCase(), tx + 16 * scale, ty + 34 * scale);

        ctx.fillStyle = stat.color || '#fff';
        const valueSize = fitFont(ctx, String(stat.value), tileW - 28 * scale, rowH * .34, 800, SANS, 14);
        ctx.font = `800 ${valueSize}px ${SANS}`;
        ctx.fillText(String(stat.value), tx + 16 * scale, ty + rowH - 20 * scale);
    });
};

const drawXp = (ctx, xp, { x, y, w, scale, accent }) => {
    if (!xp) return;
    ctx.fillStyle = 'rgba(255,255,255,.55)';
    ctx.font = `700 ${14 * scale}px ${MONO}`;
    ctx.fillText(`LEVEL ${xp.level}`, x, y);

    const progressLabel = `${xp.current.toLocaleString()} / ${xp.next.toLocaleString()}`;
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'right';
    ctx.fillText(progressLabel, x + w, y);
    ctx.textAlign = 'left';

    const trackY = y + 14 * scale;
    const trackH = 12 * scale;
    roundRect(ctx, x, trackY, w, trackH, trackH / 2);
    ctx.fillStyle = 'rgba(0,0,0,.4)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,.12)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    const pct = Math.max(0, Math.min(1, xp.current / xp.next));
    if (pct > 0) {
        const fill = ctx.createLinearGradient(x, 0, x + w, 0);
        fill.addColorStop(0, '#25c4f2');
        fill.addColorStop(.55, accent);
        fill.addColorStop(1, '#f1c45c');
        roundRect(ctx, x, trackY, Math.max(w * pct, trackH), trackH, trackH / 2);
        ctx.fillStyle = fill;
        ctx.fill();
    }

    if (xp.note) {
        ctx.fillStyle = 'rgba(255,255,255,.5)';
        ctx.font = `400 ${16 * scale}px ${SANS}`;
        ctx.fillText(xp.note, x, trackY + trackH + 26 * scale);
    }
};

const drawFooter = (ctx, { x, y, w, handle, right, accent, scale }) => {
    ctx.fillStyle = 'rgba(255,255,255,.14)';
    ctx.fillRect(x, y, w, 2);
    ctx.fillStyle = accent;
    ctx.font = `700 ${19 * scale}px ${MONO}`;
    ctx.fillText(handle, x, y + 40 * scale);
    ctx.fillStyle = 'rgba(255,255,255,.5)';
    ctx.font = `400 ${18 * scale}px ${SANS}`;
    ctx.textAlign = 'right';
    ctx.fillText(right, x + w, y + 40 * scale);
    ctx.textAlign = 'left';
};

// The name plus the skewed accent rule that sits under it on every card.
const drawName = (ctx, name, x, y, maxWidth, scale) => {
    const size = fitFont(ctx, name, maxWidth, 96 * scale, 900, SANS, 34);
    ctx.fillStyle = '#fff';
    ctx.font = `900 ${size}px ${SANS}`;
    ctx.fillText(name, x, y);
    return size;
};

const drawAccentRule = (ctx, x, y, w, accent) => {
    ctx.save();
    ctx.transform(1, 0, -0.4, 1, 0, 0);
    const g = ctx.createLinearGradient(x, 0, x + w, 0);
    g.addColorStop(0, accent);
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x + y * 0.4, y, w, 9);
    ctx.restore();
};

/**
 * @param {HTMLCanvasElement} canvas  already sized to CARD_SIZES[layout]
 * @param {object} opts
 * @param {'portrait'|'landscape'} opts.layout
 * @param {object} opts.card              calling card definition (art + accent)
 * @param {HTMLImageElement} [opts.bannerImage]  custom banner, replaces the art
 * @param {HTMLImageElement} [opts.photoImage]   optional cut-out headshot
 * @param {'body'|'bust'} [opts.photoFraming]    how much of the player the shot shows
 * @param {HTMLImageElement} [opts.avatarImage]  optional profile avatar for the frame
 * @param {string} opts.name
 * @param {string} opts.handle            e.g. usync.gg/p/frostbyte
 * @param {string} [opts.meta]            location · main game
 * @param {boolean} [opts.verified]
 * @param {{label:string,value:string}} [opts.social]
 * @param {{label:string,value:string}} [opts.platform]
 * @param {Array<{label:string,value:string,color?:string}>} opts.stats
 * @param {{level:number,current:number,next:number,note?:string}} [opts.xp]
 */
export const drawPlayerCard = (canvas, opts) => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    const {
        layout = 'portrait', card, bannerImage, photoImage, photoFraming = 'bust', avatarImage,
        name, handle, meta, verified, social, platform, stats = [], xp,
    } = opts;

    const accent = bannerImage ? '#9b6fe0' : card.accent;
    const portrait = layout === 'portrait';
    const scale = portrait ? 1 : 1.15;
    const pad = portrait ? 56 : 72;
    const contentW = W - pad * 2;

    paintCardBackground(ctx, { card, bannerImage }, W, H);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';

    ctx.fillStyle = accent;
    ctx.fillRect(0, 0, W, 10);

    drawWordmark(ctx, pad, pad, scale, accent);
    if (verified) drawVerifiedPill(ctx, W - pad, pad, scale, accent);

    const initial = (name || '?').slice(0, 1).toUpperCase();

    if (portrait) {
        // Footer, XP and stats are anchored to the bottom edge. With a headshot
        // the identity stacks upward from them so the cut-out gets the whole
        // hero; without one it sits up under the wordmark instead, so the slack
        // falls in the middle of the card rather than leaving a hole up top.
        const rows = Math.ceil(stats.length / 3);
        // No headshot means more room for the numbers, so the tiles grow into
        // it rather than the card carrying dead space.
        const rowH = photoImage ? 130 : 182;
        const statsH = rows * rowH + (rows - 1) * 14;
        const xpY = H - 238;
        const statsY = xpY - 64 - statsH;

        const heroTop = pad + 116;
        const avatarSize = 170;
        let nameY = photoImage
            ? statsY - 74 - 26 - 54
            : heroTop + avatarSize + 96;

        // With no headshot the hero is just the avatar, which leaves slack
        // between the identity and the stats. Split it evenly above and below
        // so the block floats in the upper half instead of sitting on a seam.
        if (!photoImage) {
            const slack = (statsY - 56) - (nameY + 80 + 42);
            if (slack > 0) nameY += slack / 2;
        }

        const metaY = nameY + 54;
        const chipsY = metaY + 26;
        const heroBottom = nameY - 96;

        if (photoImage) {
            // Mirrors the live card's photo layer, in the same proportions:
            // top level with the avatar, right edge bleeding a hair past the
            // card, bottom running down into the stats. Uploads are trimmed to
            // the subject beforehand, so a contain fit inside this box puts
            // every player in the same place.
            //
            // Torso cut-outs are fitted by height; face-only crops get a
            // smaller, higher box, because filling this one with a head would
            // take over the card. Framing is worked out from the shoulder line
            // when the upload is trimmed (see utils/headshot).
            const wideSubject = photoFraming === 'bust';
            const boxTop = wideSubject ? pad + 34 : pad + 62;
            const boxBottom = statsY + (wideSubject ? -70 : rowH * 0.62);
            const boxRight = W - pad * 0.2;
            const boxW = W * (wideSubject ? 0.62 : 0.88);
            const boxH = boxBottom - boxTop;

            const ratio = Math.min(boxW / photoImage.width, boxH / photoImage.height);
            const dw = photoImage.width * ratio;
            const dh = photoImage.height * ratio;
            const px = boxRight - dw;
            const py = boxBottom - dh;

            // Same light the live card puts behind the cut-out, so it reads as
            // lifted off the art instead of pasted onto it.
            const halo = ctx.createRadialGradient(
                px + dw / 2, py + dh * .62, 0,
                px + dw / 2, py + dh * .62, dw * .72,
            );
            halo.addColorStop(0, 'rgba(255,255,255,.14)');
            halo.addColorStop(1, 'rgba(255,255,255,0)');
            ctx.fillStyle = halo;
            ctx.fillRect(px - 60, py - 60, dw + 120, dh + 120);

            // Same bottom fade the live card applies with a CSS mask, so the
            // player dissolves into the stats instead of ending on a hard edge.
            const faded = document.createElement('canvas');
            faded.width = Math.max(1, Math.round(dw));
            faded.height = Math.max(1, Math.round(dh));
            const fctx = faded.getContext('2d');
            fctx.drawImage(photoImage, 0, 0, faded.width, faded.height);
            fctx.globalCompositeOperation = 'destination-out';
            const fade = fctx.createLinearGradient(0, faded.height * .62, 0, faded.height);
            fade.addColorStop(0, 'rgba(0,0,0,0)');
            fade.addColorStop(.55, 'rgba(0,0,0,.45)');
            fade.addColorStop(1, 'rgba(0,0,0,1)');
            fctx.fillStyle = fade;
            fctx.fillRect(0, faded.height * .62, faded.width, faded.height * .38);

            ctx.save();
            ctx.shadowColor = 'rgba(0,0,0,.5)';
            ctx.shadowBlur = 40;
            ctx.shadowOffsetY = 18;
            ctx.drawImage(faded, px, py, dw, dh);
            ctx.restore();

            // Scrim under the identity so the name stays readable where it
            // crosses the player — the CSS twin of .pcardScrim.
            const scrim = ctx.createLinearGradient(0, 0, W * .78, H * .35);
            scrim.addColorStop(0, 'rgba(10,8,16,.84)');
            scrim.addColorStop(.4, 'rgba(10,8,16,.5)');
            scrim.addColorStop(1, 'rgba(10,8,16,0)');
            ctx.fillStyle = scrim;
            ctx.fillRect(0, 0, W, H);
        }

        drawAvatar(ctx, pad, heroBottom - avatarSize, avatarSize, accent, initial, avatarImage);

        drawName(ctx, name, pad, nameY, contentW, 1);
        drawAccentRule(ctx, pad, nameY + 24, 190, accent);

        if (meta) {
            ctx.fillStyle = 'rgba(255,255,255,.62)';
            ctx.font = `400 22px ${SANS}`;
            ctx.fillText(meta, pad, metaY);
        }

        let chipX = pad;
        if (social) chipX += drawChip(ctx, chipX, chipsY, social.label, social.value, accent, 1) + 12;
        if (platform) drawChip(ctx, chipX, chipsY, platform.label, platform.value, accent, 1);

        drawStatTiles(ctx, stats, { x: pad, y: statsY, w: contentW, cols: 3, rowH, gap: 14, scale: 1 });
        drawXp(ctx, xp, { x: pad, y: xpY, w: contentW, scale: 1, accent });
        drawFooter(ctx, { x: pad, y: H - 96, w: contentW, handle, right: bannerImage ? 'Custom banner' : card.name, accent, scale: 1 });
        return;
    }

    // ---- landscape ----
    const leftW = contentW * .46;
    const avatarSize = 132;
    const identityY = pad + 190;

    // Landscape has no hero for a cut-out, so the frame carries the headshot.
    drawAvatar(ctx, pad, identityY - 96, avatarSize, accent, initial, photoImage || avatarImage);

    const nameX = pad + avatarSize + 34;
    drawName(ctx, name, nameX, identityY, leftW - avatarSize - 34, 1.1);
    drawAccentRule(ctx, nameX, identityY + 26, 190, accent);

    if (meta) {
        ctx.fillStyle = 'rgba(255,255,255,.62)';
        ctx.font = `400 24px ${SANS}`;
        ctx.fillText(meta, nameX, identityY + 84);
    }

    let chipX = pad;
    const chipY = identityY + 140;
    if (social) chipX += drawChip(ctx, chipX, chipY, social.label, social.value, accent, 1.1) + 14;
    if (platform) drawChip(ctx, chipX, chipY, platform.label, platform.value, accent, 1.1);

    const statsX = pad + leftW + 60;
    const statsW = W - pad - statsX;
    drawStatTiles(ctx, stats, { x: statsX, y: pad + 120, w: statsW, cols: 3, rowH: 150, gap: 14, scale: 1.1 });

    drawXp(ctx, xp, { x: pad, y: H - 210, w: contentW, scale: 1.1, accent });
    drawFooter(ctx, { x: pad, y: H - 96, w: contentW, handle, right: bannerImage ? 'Custom banner' : card.name, accent, scale: 1.1 });
};
