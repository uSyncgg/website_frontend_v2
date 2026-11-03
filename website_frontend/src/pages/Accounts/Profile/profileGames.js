import { gamesCatalog } from "catalog/games.catalog";
import styles from "./Profile.module.css";

// Profile game names come from the sign-up form ("CS 2", "Call of Duty", ...),
// so match them against the catalog loosely to pick up icons, links and slugs.
const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
export const findCatalogGame = (name) => gamesCatalog.entries.find(entry =>
    normalize(entry.name) === normalize(name) || normalize(entry.apiGame) === normalize(name)
);

export const initials = (name) => name.split(/\s+/).map(w => w.charAt(0)).join('').slice(0, 3).toUpperCase();

const slugify = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// A profile's games as { name, slug, entry }: the catalog's name and slug where the game is in
// it ("CS 2" -> Counter-Strike 2, cs2), otherwise the name as typed. The slug goes in stats URLs.
export const playerGames = (names = []) => names.map(name => {
    const entry = findCatalogGame(name);
    return { name: entry?.name ?? name, slug: entry?.slug ?? slugify(name), genre: entry?.genre, image: entry?.image, path: entry?.path };
});

export const gameEmblem = (game) => (
    <div className={styles.emblem}>
        {game.image ? <img src={game.image} alt="" /> : initials(game.name)}
    </div>
);
