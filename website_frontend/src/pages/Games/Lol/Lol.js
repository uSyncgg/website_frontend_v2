import { SeoData, HeaderImage, WaysToCompete, SectionHeading } from "components";
import { VerifiedEventsShowcase } from "pages/Games/Shared/VerifiedEventsShowcase";
import '../EventBanners.css';

const FORMATS = [
    { key: "leagues", name: "Leagues", blurb: "Multi-week seasons with standings", path: "/games/LoL/leagues", live: true },
    { key: "lans", name: "LANs", blurb: "In-person events", path: "/games/LoL/lans", live: true },
    { key: "tourneys", name: "Online Tournaments", blurb: "Bracket play, credits or free entry", path: "/Comingsoon", live: false },
    { key: "wagers", name: "Wagers", blurb: "Stake-based matches through a verified host", path: "/games/LoL/wagers", live: true },
    { key: "h2h", name: "Head to Head", blurb: "Challenge a specific opponent", path: "/games/LoL/head-to-head", live: true },
];

export const Lol = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"League of Legends"}
                description="League of Legends LANs, leagues, tournaments, head-to-head, and wagers from every site on Google. Earn money playing League of Legends."
                canonicalPath={"/games/LoL"}
            />
            <HeaderImage
                imageClass={"lolGamePage"}
                title={"League of Legends"}
                eyebrow={"PC"}
                subtext={"League of Legends LANs, leagues, tournaments, head-to-head, and wagers from every site on Google. Earn money playing League of Legends."}
            />

            <SectionHeading>Ways to Compete</SectionHeading>
            <WaysToCompete formats={FORMATS} />

            <SectionHeading>Verified Events</SectionHeading>
            <VerifiedEventsShowcase game="League of Legends" gameSlug="LoL" />
        </div>
    );
}
