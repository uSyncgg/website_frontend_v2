const STATUS_FALLBACKS = {
    400: 'This pass is no longer available.',
    404: 'This event or pass could not be found.',
    409: 'This pass is no longer available.',
    422: 'Some of the submitted information was invalid.'
};

export const RATE_LIMIT_MESSAGE =
    "You're making requests too quickly. Please wait a minute and try again.";

export const isRateLimited = (err) => err?.response?.status === 429;

// For "couldn't load" screens: the rate-limit message on a 429, otherwise the page's own fallback text.
export const getLoadErrorMessage = (err, fallback) =>
    isRateLimited(err) ? RATE_LIMIT_MESSAGE : fallback;

export function getApiErrorMessage(err) {
    const status = err?.response?.status;
    const detail = err?.response?.data?.detail;

    // Checked first so slowapi's raw "Rate limit exceeded: ..." body is never shown.
    if (isRateLimited(err)) {
        return RATE_LIMIT_MESSAGE;
    }

    if (typeof detail === 'string' && detail.trim()) {
        return detail;
    }

    if (Array.isArray(detail) && detail[0]?.msg) {
        return detail[0].msg;
    }

    if (status && STATUS_FALLBACKS[status]) {
        return STATUS_FALLBACKS[status];
    }

    if (status >= 500) {
        return 'Something went wrong on our end. Please try again in a moment.';
    }

    return 'Something went wrong. Please try again.';
}
