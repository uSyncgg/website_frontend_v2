// Renders the admin-authored article markup as React elements (never raw HTML).
//   ## Heading / ### Subheading
//   - bullet      1. numbered
//   ![alt text](image url)
//   blank line between paragraphs; **bold** and [link text](https://...) inside text
// Only http(s) and site-relative urls become links or images.

const SAFE_URL = /^(https?:\/\/|\/|data:image\/)/i;

const renderInline = (text) => {
    const parts = [];
    const pattern = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
    let last = 0;
    let match;
    while ((match = pattern.exec(text)) !== null) {
        if (match.index > last) parts.push(text.slice(last, match.index));
        if (match[1] !== undefined) {
            parts.push(<strong key={match.index}>{match[1]}</strong>);
        } else if (SAFE_URL.test(match[3]) && !match[3].startsWith('data:')) {
            const external = /^https?:/i.test(match[3]);
            parts.push(
                <a key={match.index} href={match[3]} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                    {match[2]}
                </a>
            );
        } else {
            parts.push(match[0]);
        }
        last = pattern.lastIndex;
    }
    if (last < text.length) parts.push(text.slice(last));
    return parts;
};

export const parseArticleBody = (body) => {
    const blocks = [];
    let list = null;
    const flushList = () => { if (list) { blocks.push(list); list = null; } };

    for (const raw of (body ?? '').split(/\r?\n/)) {
        const line = raw.trim();
        if (!line) { flushList(); continue; }

        const image = line.match(/^!\[([^\]]*)\]\(([^)\s]+)\)$/);
        if (image) {
            flushList();
            if (SAFE_URL.test(image[2])) blocks.push({ type: 'image', alt: image[1], src: image[2] });
            continue;
        }
        const heading = line.match(/^(#{2,3})\s+(.+)$/);
        if (heading) {
            flushList();
            blocks.push({ type: heading[1].length === 2 ? 'h2' : 'h3', text: heading[2] });
            continue;
        }
        const bullet = line.match(/^[-*]\s+(.+)$/);
        const numbered = line.match(/^\d+[.)]\s+(.+)$/);
        if (bullet || numbered) {
            const type = bullet ? 'ul' : 'ol';
            if (!list || list.type !== type) { flushList(); list = { type, items: [] }; }
            list.items.push((bullet ?? numbered)[1]);
            continue;
        }
        flushList();
        blocks.push({ type: 'p', text: line });
    }
    flushList();
    return blocks;
};

export const ArticleBody = ({ body }) => parseArticleBody(body).map((block, i) => {
    switch (block.type) {
        case 'h2': return <h2 key={i}>{renderInline(block.text)}</h2>;
        case 'h3': return <h3 key={i}>{renderInline(block.text)}</h3>;
        case 'image': return <img key={i} src={block.src} alt={block.alt} loading="lazy" style={{ maxWidth: '100%', height: 'auto', borderRadius: '.75rem' }} />;
        case 'ul': return <ul key={i}>{block.items.map((t, j) => <li key={j}>{renderInline(t)}</li>)}</ul>;
        case 'ol': return <ol key={i}>{block.items.map((t, j) => <li key={j}>{renderInline(t)}</li>)}</ol>;
        default: return <p key={i}>{renderInline(block.text)}</p>;
    }
});
