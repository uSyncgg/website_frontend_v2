import cmgLogo from 'assets/images/cmg-logo.svg';
import consolekingsLogo from 'assets/images/console-kings-logo.svg';

// Tournament hosts, keyed by the `company` value the scrapers send.
// To add a new host: add its entry here and (optionally) drop its logo in src/assets/images.
export const HOSTS = {
    cmg: { label: 'CMG', logo: cmgLogo },
    codagent: { label: 'Codagent', logo: null },
    consolekings: { label: "Console Kings", logo: consolekingsLogo }
};

export const hostKeyFromLabel = (label) =>
    Object.keys(HOSTS).find(key => HOSTS[key].label === label) || String(label).toLowerCase();
