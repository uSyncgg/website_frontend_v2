import { SeoData, HeaderImage, WaysToCompete, SectionHeading } from "components";
import { VerifiedEventsShowcase } from "pages/Games/Shared/VerifiedEventsShowcase";
import '../EventBanners.css';

const FORMATS = [
    { key: "leagues", name: "Leagues", blurb: "Multi-week seasons with standings", path: "/games/Valorant/leagues", live: true },
    { key: "lans", name: "LANs", blurb: "In-person events", path: "/Comingsoon", live: false },
    { key: "tourneys", name: "Online Tournaments", blurb: "Bracket play, credits or free entry", path: "/Comingsoon", live: false },
    { key: "wagers", name: "Wagers", blurb: "Stake-based matches through a verified host", path: "/games/Valorant/wagers", live: true },
    { key: "h2h", name: "Head to Head", blurb: "Challenge a specific opponent", path: "/games/Valorant/head-to-head", live: true },
];

export const Valorant = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"Valorant"}
                description="Find Valorant esports events. Browse head-to-head scrim finders, leagues, and wager platforms for Valorant players of all skill levels."
                canonicalPath={"/games/Valorant"}
            />
            <HeaderImage
                imageClass={"valGamePage"}
                title={"Valorant"}
                eyebrow={"PC"}
                subtext={"Find Valorant esports events. Browse head-to-head scrim finders, leagues, and wager platforms for Valorant players of all skill levels."}
            />

            <SectionHeading>Ways to Compete</SectionHeading>
            <WaysToCompete formats={FORMATS} />

            <SectionHeading>Verified Events</SectionHeading>
            <VerifiedEventsShowcase game="Valorant" gameSlug="Valorant" />
        </div>
    );
}
