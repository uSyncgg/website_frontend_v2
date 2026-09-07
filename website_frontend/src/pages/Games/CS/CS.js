import { SeoData, HeaderImage, WaysToCompete, SectionHeading } from "components";
import { VerifiedEventsShowcase } from "pages/Games/Shared/VerifiedEventsShowcase";
import '../EventBanners.css';

const FORMATS = [
    { key: "leagues", name: "Leagues", blurb: "Multi-week seasons with standings", path: "/games/CS2/leagues", live: true },
    { key: "lans", name: "LANs", blurb: "In-person events", path: "/Comingsoon", live: false },
    { key: "tourneys", name: "Online Tournaments", blurb: "Bracket play, credits or free entry", path: "/Comingsoon", live: false },
    { key: "wagers", name: "Wagers", blurb: "Stake-based matches through a verified host", path: "/games/CS2/wagers", live: true },
    { key: "h2h", name: "Head to Head", blurb: "Challenge a specific opponent", path: "/games/CS2/head-to-head", live: true },
];

export const CS = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"Counter-Strike"}
                description="Counter-Strike 2 Leagues, LANs, Wagers, Head-To-Head, and Tournaments all in one place. Try the true competitive experience today."
                canonicalPath={"/games/CS2"}
            />
            <HeaderImage
                imageClass={"cs2GamePage"}
                title={"Counter-Strike 2"}
                eyebrow={"PC"}
                subtext={"Counter-Strike 2 Leagues, LANs, Wagers, Head-To-Head, and Tournaments all in one place. Try the true competitive experience today."}
            />

            <SectionHeading>Ways to Compete</SectionHeading>
            <WaysToCompete formats={FORMATS} />

            <SectionHeading>Verified Events</SectionHeading>
            <VerifiedEventsShowcase game="CS2" gameSlug="CS2" />
        </div>
    );
}
