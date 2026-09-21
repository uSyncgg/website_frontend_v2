const STATUS_FALLBACKS = {
    400: 'This pass is no longer available.',
    404: 'This event or pass could not be found.',
    409: 'This pass is no longer available.',
    422: 'Some of the submitted information was invalid.'
};

export function getApiErrorMessage(err) {
    const status = err?.response?.status;
    const detail = err?.response?.data?.detail;

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
