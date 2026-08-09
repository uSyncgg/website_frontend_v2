// Calling cards — the art that frames a player's shareable profile card,
// the same idea as a Valorant banner or a CoD calling card. Two sources:
//
//   1. a custom banner the player uploads themselves, or
//   2. one of the uSync patterns below, most of which have to be earned.
//
// Every pattern is painted with plain canvas ops instead of shipping image
// assets, so the same function draws the 240px picker thumbnail and the
// 1200px download at full quality. Painters take normalized work: all
// coordinates are fractions of width/height, never fixed pixels.

const linearBg = (ctx, w, h, stops) => {
    const g = ctx.createLinearGradient(0, 0, w, h);
    stops.forEach(([offset, color]) => g.addColorStop(offset, color));
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
};

const glow = (ctx, w, h, cx, cy, radius, color) => {
    const r = Math.max(w, h) * radius;
    const g = ctx.createRadialGradient(w * cx, h * cy, 0, w * cx, h * cy, r);
    g.addColorStop(0, color);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
};

// Diagonal bands, drawn wide enough that the rotation never exposes a corner.
const bands = (ctx, w, h, { angle = -0.42, count = 9, color, width = 0.035 }) => {
    ctx.save();
    ctx.translate(w / 2, h / 2);
    ctx.rotate(angle);
    ctx.fillStyle = color;
    const span = Math.hypot(w, h);
    const step = span / count;
    for (let i = -count; i <= count; i++) {
        ctx.fillRect(i * step, -span, span * width, span * 2);
    }
    ctx.restore();
};

const grid = (ctx, w, h, { step = 0.0625, color, lineWidth = 1 }) => {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    for (let x = 0; x <= 1.0001; x += step) {
        ctx.moveTo(w * x, 0);
        ctx.lineTo(w * x, h);
    }
    for (let y = 0; y <= 1.0001; y += step * 1.7) {
        ctx.moveTo(0, h * y);
        ctx.lineTo(w, h * y);
    }
    ctx.stroke();
    ctx.restore();
};

const rays = (ctx, w, h, { cx = 0.08, cy = 1.05, count = 11, color }) => {
    ctx.save();
    ctx.translate(w * cx, h * cy);
    ctx.fillStyle = color;
    const span = Math.hypot(w, h) * 1.6;
    for (let i = 0; i < count; i++) {
        const a = -Math.PI / 2 - 0.75 + (i / (count - 1)) * 1.5;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(a - 0.022) * span, Math.sin(a - 0.022) * span);
        ctx.lineTo(Math.cos(a + 0.022) * span, Math.sin(a + 0.022) * span);
        ctx.closePath();
        ctx.fill();
    }
    ctx.restore();
};

const rings = (ctx, w, h, { cx = 0.82, cy = 0.32, count = 5, color }) => {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = Math.max(1, w * 0.0022);
    const base = Math.max(w, h) * 0.12;
    for (let i = 1; i <= count; i++) {
        ctx.beginPath();
        ctx.arc(w * cx, h * cy, base * i, 0, Math.PI * 2);
        ctx.stroke();
    }
    ctx.restore();
};

// `requirement` is what the player has to do to earn the card. `key` points at
// a counter on the profile's unlock progress; `verified` means it comes with a
// uSync Verified subscription instead of being earned in events.
export const CALLING_CARDS = [
    {
        id: 'nightfall',
        name: 'Nightfall',
        tagline: 'Standard issue — every account starts here.',
        accent: '#9b6fe0',
        requirement: null,
        paint: (ctx, w, h) => {
            linearBg(ctx, w, h, [[0, '#1b1430'], [.55, '#0f0c17'], [1, '#0a0810']]);
            glow(ctx, w, h, .18, .22, .62, 'rgba(155,111,224,.34)');
            glow(ctx, w, h, .92, .88, .5, 'rgba(122,90,201,.2)');
        },
    },
    {
        id: 'circuit',
        name: 'Circuit',
        tagline: 'Enter 10 events on uSync.',
        accent: '#6fd3e0',
        requirement: { key: 'eventsEntered', target: 10, label: 'Enter 10 events' },
        paint: (ctx, w, h) => {
            linearBg(ctx, w, h, [[0, '#0d1a20'], [.6, '#0a1016'], [1, '#080b10']]);
            grid(ctx, w, h, { color: 'rgba(111,211,224,.13)' });
            glow(ctx, w, h, .22, .28, .55, 'rgba(111,211,224,.22)');
            bands(ctx, w, h, { angle: -0.42, count: 4, color: 'rgba(111,211,224,.06)', width: .02 });
        },
    },
    {
        id: 'champion',
        name: 'Champion',
        tagline: 'Win 5 tournaments.',
        accent: '#e0b15e',
        requirement: { key: 'tournamentWins', target: 5, label: 'Win 5 tournaments' },
        paint: (ctx, w, h) => {
            linearBg(ctx, w, h, [[0, '#2a1d0d'], [.55, '#140f0a'], [1, '#0b0806']]);
            rays(ctx, w, h, { color: 'rgba(224,177,94,.10)' });
            glow(ctx, w, h, .12, .95, .7, 'rgba(224,177,94,.28)');
            glow(ctx, w, h, .85, .1, .45, 'rgba(224,177,94,.1)');
        },
    },
    {
        id: 'lan-veteran',
        name: 'LAN Veteran',
        tagline: 'Attend 5 LANs.',
        accent: '#5ED39B',
        requirement: { key: 'lansAttended', target: 5, label: 'Attend 5 LANs' },
        paint: (ctx, w, h) => {
            linearBg(ctx, w, h, [[0, '#0c2119'], [.6, '#0a1310'], [1, '#070b09']]);
            bands(ctx, w, h, { angle: -0.42, count: 7, color: 'rgba(94,211,155,.07)', width: .028 });
            glow(ctx, w, h, .78, .25, .55, 'rgba(94,211,155,.2)');
        },
    },
    {
        id: 'hot-streak',
        name: 'Hot Streak',
        tagline: 'Win 10 matches in a row.',
        accent: '#e0575c',
        requirement: { key: 'winStreak', target: 10, label: 'Win 10 in a row' },
        paint: (ctx, w, h) => {
            linearBg(ctx, w, h, [[0, '#2a0f14'], [.55, '#170a0d'], [1, '#0b0507']]);
            bands(ctx, w, h, { angle: -0.9, count: 12, color: 'rgba(224,87,92,.09)', width: .012 });
            glow(ctx, w, h, .2, .8, .6, 'rgba(224,87,92,.3)');
            glow(ctx, w, h, .9, .2, .4, 'rgba(224,140,94,.16)');
        },
    },
    {
        id: 'verified-elite',
        name: 'Verified Elite',
        tagline: 'Included with uSync Verified.',
        accent: '#b18af0',
        requirement: { verified: true, label: 'uSync Verified subscribers' },
        paint: (ctx, w, h) => {
            linearBg(ctx, w, h, [[0, '#241a3d'], [.5, '#140f22'], [1, '#0a0810']]);
            rings(ctx, w, h, { color: 'rgba(177,138,240,.16)' });
            glow(ctx, w, h, .82, .32, .45, 'rgba(177,138,240,.3)');
            bands(ctx, w, h, { angle: -0.42, count: 3, color: 'rgba(255,255,255,.035)', width: .05 });
        },
    },
];

export const CUSTOM_CARD_ID = 'custom';

// Each card's art exists twice: as a canvas painter (above, for the PNG) and
// as a CSS gradient set in AccountUI.module.css (for the live card and the
// profile hero). This turns 'lan-veteran' into the `pattern_lanVeteran` class.
export const cardPatternClass = (id) => `pattern_${String(id).replace(/-(\w)/g, (_, c) => c.toUpperCase())}`;

export const getCallingCard = (id) => CALLING_CARDS.find(c => c.id === id) || CALLING_CARDS[0];

// A card with no requirement is always available; everything else is earned in
// events or comes with Verified.
export const isCallingCardUnlocked = (card, progress = {}, verified = false) => {
    if (!card?.requirement) return true;
    if (card.requirement.verified) return !!verified;
    return (progress[card.requirement.key] || 0) >= card.requirement.target;
};

// "3 / 5 tournament wins" style progress for the locked-card tooltip.
export const getCallingCardProgress = (card, progress = {}) => {
    if (!card?.requirement || card.requirement.verified) return null;
    return { current: progress[card.requirement.key] || 0, target: card.requirement.target };
};
