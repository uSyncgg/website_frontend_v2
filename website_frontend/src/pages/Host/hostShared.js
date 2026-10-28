import { FORMATS } from "utils/bracket";
import { resetDemoEvents, STAGE_LABELS } from "services/hostEventsMock";
import styles from "./Host.module.css";

export const GAMES = ["Call of Duty", "CS 2", "Halo", "League of Legends", "Rocket League", "Valorant", "Warzone", "Other"];
export const TEAM_SIZES = ["1v1", "2v2", "3v3", "4v4", "5v5"];
export const BEST_OF = [1, 3, 5, 7];
export const MAX_ENTRANTS = [4, 8, 16, 32, 64];

export const formatLabel = (format) => FORMATS[format]?.label ?? format;

export const formatDate = (iso) => new Date(iso).toLocaleString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit',
});

export const entrantsById = (event) => Object.fromEntries(event.entrants.map(e => [e.id, e]));

export const isTeamEvent = (event) => event.teamSize !== '1v1';

export const StageChip = ({ stage }) => (
    <span className={`${styles.chip} ${styles[`stage_${stage}`]}`}>{STAGE_LABELS[stage]}</span>
);

// Shown on every host page while the flow runs on browser-only mock data.
export const MockBanner = () => (
    <div className={styles.mockBanner}>
        Mockup: events, players and brackets here are sample data saved only in this browser. Nothing is sent to uSync's servers.
        <button type="button" onClick={() => window.confirm('Put the demo events back? Anything you created or changed is lost.') && resetDemoEvents()}>
            Reset demo data
        </button>
    </div>
);
