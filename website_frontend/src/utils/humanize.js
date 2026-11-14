// Turns a machine key (snake_case, kebab-case, or camelCase) into a
// display-friendly label, e.g. "shirt_size" -> "Shirt Size". Used where the
// backend only sends back a flat key -> value dict with no label metadata
// (e.g. a registration's custom_fields on the receipt).
export function humanizeKey(key) {
    return String(key)
        .replace(/[_-]+/g, ' ')
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

// "Just now", "5m ago", "3h ago", "2d ago" for an ISO timestamp.
export function timeAgo(iso) {
    const minutes = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (minutes < 1440) return `${Math.round(minutes / 60)}h ago`;
    return `${Math.round(minutes / 1440)}d ago`;
}
