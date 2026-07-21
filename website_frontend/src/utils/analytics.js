const PROD_HOSTNAMES = ["www.usync.gg", "usync.gg"];

const isTrackedEnv = () => {
    if (window.location.search.includes('ga_debug=1')) {
        sessionStorage.setItem('ga_debug', '1');
    }
    return PROD_HOSTNAMES.includes(window.location.hostname) || sessionStorage.getItem('ga_debug') === '1';
};

function trackEvent(name, params = {}) {
    if (isTrackedEnv() && typeof window.gtag === 'function') {
        const debugFlag = sessionStorage.getItem('ga_debug') === '1' ? { debug_mode: true } : {};
        window.gtag('event', name, { ...params, ...debugFlag });
    }
}

export function trackPageView(path) {
    trackEvent('page_view', { page_path: path, page_title: document.title });
}

export function trackJoinNowClick(game, host, url) {
    trackEvent('join_now_click', { game, host, destination_url: url });
}

export function trackEventCardClick(destinationPath, title) {
    trackEvent('event_card_click', { destination_path: destinationPath, title });
}
