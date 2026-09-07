import { VerifiedEvents } from "components";
import { useVerifiedEvents } from "hooks";
import { buildEventPath } from "utils/eventPaths";

const mapBucket = (items, { prefix, section, buttonTitle }) =>
    (items || []).map(item => ({
        name: item.name,
        path: buildEventPath(prefix, item.path),
        imgUrl: item.banner_img,
        alt: item.name,
        buttonTitle,
        section,
    }));

export const VerifiedEventsShowcase = ({ game, gameSlug }) => {
    const { data, loading, error } = useVerifiedEvents(game);

    if (loading) {
        return <p style={{ textAlign: 'center', color: 'white', fontSize: '1.5rem', padding: '2rem 0' }}>Loading verified events...</p>;
    }

    const events = (error || !data) ? [] : [
        ...mapBucket(data.league_parent_events, { prefix: `/games/${gameSlug}/leagues`, section: "Leagues", buttonTitle: "All Leagues" }),
        ...mapBucket(data.league_events, { prefix: `/games/${gameSlug}/leagues`, section: "Leagues", buttonTitle: "More Info" }),
        ...mapBucket(data.wager_events, { prefix: `/games/${gameSlug}/wagers`, section: "Wagers", buttonTitle: "More Info" }),
        ...mapBucket(data.xp_events, { prefix: `/games/${gameSlug}/head-to-head`, section: "HeadToHead", buttonTitle: "More Info" }),
        ...mapBucket(data.lan_events, { prefix: `/lans`, section: "Lans", buttonTitle: "More Info" }),
    ];

    return <VerifiedEvents events={events} />;
}
