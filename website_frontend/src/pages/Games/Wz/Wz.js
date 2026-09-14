import { SeoData, HeaderImage, WaysToCompete, SectionHeading } from "components";
import { VerifiedEventsShowcase } from "pages/Games/Shared/VerifiedEventsShowcase";
import '../EventBanners.css';

const FORMATS = [
    { key: "leagues", name: "Leagues", blurb: "Multi-week seasons with standings", path: "/games/warzone/leagues", live: true },
    { key: "lans", name: "LANs", blurb: "In-person events", path: "/games/warzone/lans", live: true },
    { key: "tourneys", name: "Online Tournaments", blurb: "Bracket play, credits or free entry", path: "/Comingsoon", live: false },
    { key: "wagers", name: "Wagers", blurb: "Stake-based matches through a verified host", path: "/games/warzone/wagers", live: true },
    { key: "h2h", name: "Head to Head", blurb: "Challenge a specific opponent", path: "/games/warzone/head-to-head", live: true },
];

export const Wz = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"Warzone"}
                description="Find Warzone esports events. Browse head-to-head matches, LAN events, leagues, and wager platforms for Call of Duty Warzone players of all skill levels."
                canonicalPath={"/games/warzone"}
            />
            <HeaderImage
                imageClass={"wzGamePage"}
                title={"Call of Duty: Warzone"}
                eyebrow={"Console · Crossplay"}
                subtext={"Find Warzone esports events. Browse head-to-head matches, LAN events, leagues, and wager platforms for Call of Duty Warzone players of all skill levels."}
            />

            <SectionHeading>Ways to Compete</SectionHeading>
            <WaysToCompete formats={FORMATS} />

            <SectionHeading>Verified Events</SectionHeading>
            <VerifiedEventsShowcase game="Warzone" gameSlug="warzone" />
        </div>
    );
}
