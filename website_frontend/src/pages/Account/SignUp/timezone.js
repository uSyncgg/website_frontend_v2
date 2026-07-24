// Primary IANA timezone per US state. A handful of states straddle two
// zones; SPLIT_STATE_ZIP_RULES below overrides this default using the
// zip3 prefix for the (well documented) counties that fall in the other zone.
const STATE_TIMEZONES = {
    Alabama: "America/Chicago",
    Alaska: "America/Anchorage",
    Arizona: "America/Phoenix",
    Arkansas: "America/Chicago",
    California: "America/Los_Angeles",
    Colorado: "America/Denver",
    Connecticut: "America/New_York",
    Delaware: "America/New_York",
    Florida: "America/New_York",
    Georgia: "America/New_York",
    Hawaii: "Pacific/Honolulu",
    Idaho: "America/Denver",
    Illinois: "America/Chicago",
    Indiana: "America/New_York",
    Iowa: "America/Chicago",
    Kansas: "America/Chicago",
    Kentucky: "America/New_York",
    Louisiana: "America/Chicago",
    Maine: "America/New_York",
    Maryland: "America/New_York",
    Massachusetts: "America/New_York",
    Michigan: "America/New_York",
    Minnesota: "America/Chicago",
    Mississippi: "America/Chicago",
    Missouri: "America/Chicago",
    Montana: "America/Denver",
    Nebraska: "America/Chicago",
    Nevada: "America/Los_Angeles",
    "New Hampshire": "America/New_York",
    "New Jersey": "America/New_York",
    "New Mexico": "America/Denver",
    "New York": "America/New_York",
    "North Carolina": "America/New_York",
    "North Dakota": "America/Chicago",
    Ohio: "America/New_York",
    Oklahoma: "America/Chicago",
    Oregon: "America/Los_Angeles",
    Pennsylvania: "America/New_York",
    "Rhode Island": "America/New_York",
    "South Carolina": "America/New_York",
    "South Dakota": "America/Chicago",
    Tennessee: "America/Chicago",
    Texas: "America/Chicago",
    Utah: "America/Denver",
    Vermont: "America/New_York",
    Virginia: "America/New_York",
    Washington: "America/Los_Angeles",
    "West Virginia": "America/New_York",
    Wisconsin: "America/Chicago",
    Wyoming: "America/Denver",
};

// zip3 ranges known to fall in a different zone than their state's default.
const SPLIT_STATE_ZIP_RULES = {
    Texas: [{ min: 798, max: 799, tz: "America/Denver" }, { min: 885, max: 885, tz: "America/Denver" }],
    Florida: [{ min: 324, max: 325, tz: "America/Chicago" }],
    Indiana: [{ min: 463, max: 464, tz: "America/Chicago" }, { min: 475, max: 477, tz: "America/Chicago" }],
    Kentucky: [{ min: 420, max: 421, tz: "America/Chicago" }],
    Michigan: [{ min: 499, max: 499, tz: "America/Chicago" }],
    "North Dakota": [{ min: 586, max: 588, tz: "America/Denver" }],
    "South Dakota": [{ min: 577, max: 577, tz: "America/Denver" }],
    Nebraska: [{ min: 693, max: 693, tz: "America/Denver" }],
    Idaho: [{ min: 838, max: 838, tz: "America/Los_Angeles" }],
    Kansas: [{ min: 677, max: 679, tz: "America/Denver" }],
    Tennessee: [{ min: 376, max: 379, tz: "America/New_York" }],
};

const browserTimeZone = () => {
    try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch {
        return "UTC";
    }
};

// The standard "common timezones" set used in most modern sign-up forms,
// covering every US zone plus the major international hubs our country list supports.
export const COMMON_TIMEZONES = [
    { value: "Pacific/Honolulu", label: "(UTC-10:00) Hawaii" },
    { value: "America/Anchorage", label: "(UTC-09:00) Alaska" },
    { value: "America/Los_Angeles", label: "(UTC-08:00) Pacific Time (US & Canada)" },
    { value: "America/Phoenix", label: "(UTC-07:00) Arizona" },
    { value: "America/Denver", label: "(UTC-07:00) Mountain Time (US & Canada)" },
    { value: "America/Chicago", label: "(UTC-06:00) Central Time (US & Canada)" },
    { value: "America/Mexico_City", label: "(UTC-06:00) Mexico City" },
    { value: "America/New_York", label: "(UTC-05:00) Eastern Time (US & Canada)" },
    { value: "America/Halifax", label: "(UTC-04:00) Atlantic Time (Canada)" },
    { value: "America/Argentina/Buenos_Aires", label: "(UTC-03:00) Buenos Aires" },
    { value: "America/Sao_Paulo", label: "(UTC-03:00) Sao Paulo" },
    { value: "UTC", label: "(UTC+00:00) UTC" },
    { value: "Europe/London", label: "(UTC+00:00) London, Dublin" },
    { value: "Europe/Paris", label: "(UTC+01:00) Paris, Berlin, Madrid" },
    { value: "Europe/Athens", label: "(UTC+02:00) Athens, Cairo" },
    { value: "Europe/Moscow", label: "(UTC+03:00) Moscow" },
    { value: "Asia/Dubai", label: "(UTC+04:00) Dubai" },
    { value: "Asia/Kolkata", label: "(UTC+05:30) Mumbai, New Delhi" },
    { value: "Asia/Bangkok", label: "(UTC+07:00) Bangkok, Jakarta" },
    { value: "Asia/Singapore", label: "(UTC+08:00) Singapore, Hong Kong" },
    { value: "Asia/Tokyo", label: "(UTC+09:00) Tokyo, Seoul" },
    { value: "Australia/Sydney", label: "(UTC+10:00) Sydney" },
    { value: "Pacific/Auckland", label: "(UTC+12:00) Auckland" },
];

// Friendly display for a raw IANA zone. Falls back to spacing out
// underscores so nothing like "Los_Angeles" is ever shown to a person.
export const formatTimezoneLabel = (tz) => {
    const match = COMMON_TIMEZONES.find(z => z.value === tz);
    if (match) return match.label;
    return String(tz || "").replace(/_/g, " ");
};

// Derives a timezone from the address the person actually entered instead of
// trusting the browser/device, which can be wrong (VPN, shared computer,
// filling the form out for someone else) and this data is used internally.
export const getTimezoneForAddress = ({ country, state, zip }) => {
    if (country !== "United States" || !state) {
        return browserTimeZone();
    }

    const zip3 = parseInt(String(zip || "").slice(0, 3), 10);
    const overrides = SPLIT_STATE_ZIP_RULES[state];
    if (overrides && !Number.isNaN(zip3)) {
        const match = overrides.find(rule => zip3 >= rule.min && zip3 <= rule.max);
        if (match) return match.tz;
    }

    return STATE_TIMEZONES[state] || browserTimeZone();
};
