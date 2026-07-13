// Add ordinal suffix to the day (e.g. 21 -> "21st")
export function getOrdinalSuffix(n) {
    if (n >= 11 && n <= 13) return `${n}th`;
    switch (n % 10) {
    case 1: return `${n}st`;
    case 2: return `${n}nd`;
    case 3: return `${n}rd`;
    default: return `${n}th`;
    }
}

// Build the tournament's start time as a real Date object WITHOUT relying on
// `new Date("Apr 14 2025 10:00 AM GMT-0400")`. That string format parses on
// Chrome but returns an Invalid Date on Safari/iOS, which then throws when
// formatted and blanks the whole page. We parse the pieces into numbers and
// build the date explicitly, which every browser handles the same way.
export function parseEstDate(dateStr, timeStr) {
    if (!dateStr || !timeStr) return null;

    const MONTHS = {
        jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
        jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
    };

    // "Apr 14th" / "April 14" -> month name + day number
    const dateMatch = String(dateStr).match(/([A-Za-z]+)\s+(\d{1,2})/);
    // "10:00 AM" / "10:00 AM EDT" -> hour, minute, meridiem
    const timeMatch = String(timeStr).match(/(\d{1,2}):(\d{2})\s*([AaPp][Mm])/);
    if (!dateMatch || !timeMatch) return null;

    const monthIndex = MONTHS[dateMatch[1].slice(0, 3).toLowerCase()];
    const day = parseInt(dateMatch[2], 10);
    if (monthIndex === undefined || Number.isNaN(day)) return null;

    let hour = parseInt(timeMatch[1], 10);
    const minute = parseInt(timeMatch[2], 10);
    const meridiem = timeMatch[3].toLowerCase();
    if (Number.isNaN(hour) || Number.isNaN(minute)) return null;
    if (meridiem === 'pm' && hour !== 12) hour += 12;
    if (meridiem === 'am' && hour === 12) hour = 0;

    // Source times are stated in EST/EDT (GMT-0400). Local = UTC - 4, so
    // UTC = local + 4. Date.UTC gives an unambiguous epoch on all browsers.
    const year = new Date().getFullYear();
    const estDateObj = new Date(Date.UTC(year, monthIndex, day, hour + 4, minute));
    return Number.isNaN(estDateObj.getTime()) ? null : estDateObj;
}
