import cmgLogo from 'assets/images/cmg-logo.svg';

// Tournament hosts, keyed by the `company` value the scrapers send.
// To add a new host: add its entry here and (optionally) drop its logo in src/assets/images.
export const HOSTS = {
    cmg: { label: 'CMG', logo: cmgLogo },
    codagent: { label: 'CoD Agent', logo: null },
};

export const hostKeyFromLabel = (label) =>
    Object.keys(HOSTS).find(key => HOSTS[key].label === label) || String(label).toLowerCase();
