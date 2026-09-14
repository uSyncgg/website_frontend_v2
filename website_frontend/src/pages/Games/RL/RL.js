import { SeoData, HeaderImage, WaysToCompete, SectionHeading } from "components";
import { VerifiedEventsShowcase } from "pages/Games/Shared/VerifiedEventsShowcase";
import '../EventBanners.css';

const FORMATS = [
    { key: "leagues", name: "Leagues", blurb: "Multi-week seasons with standings", path: "/games/RocketLeague/leagues", live: true },
    { key: "lans", name: "LANs", blurb: "In-person events", path: "/Comingsoon", live: false },
    { key: "tourneys", name: "Online Tournaments", blurb: "Bracket play, credits or free entry", path: "/Comingsoon", live: false },
    { key: "wagers", name: "Wagers", blurb: "Stake-based matches through a verified host", path: "/games/RocketLeague/wagers", live: true },
    { key: "h2h", name: "Head to Head", blurb: "Challenge a specific opponent", path: "/games/RocketLeague/head-to-head", live: true },
];

export const RL = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"Rocket League"}
                description="Rocket League tournaments, leagues, LANs, head-to-head, and wagers to make money playing RL. Compete in events to prove your skill."
                canonicalPath={"/games/RocketLeague"}
            />
            <HeaderImage
                imageClass={"rlGamePage"}
                title={"Rocket League"}
                eyebrow={"PC · Console · Crossplay"}
                subtext={"Rocket League tournaments, leagues, LANs, head-to-head, and wagers to make money playing RL. Compete in events to prove your skill."}
            />

            <SectionHeading>Ways to Compete</SectionHeading>
            <WaysToCompete formats={FORMATS} />

            <SectionHeading>Verified Events</SectionHeading>
            <VerifiedEventsShowcase game="Rocket League" gameSlug="RocketLeague" />
        </div>
    );
}
