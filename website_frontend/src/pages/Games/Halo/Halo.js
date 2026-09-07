import { SeoData, HeaderImage, WaysToCompete, SectionHeading } from "components";
import { VerifiedEventsShowcase } from "pages/Games/Shared/VerifiedEventsShowcase";
import '../EventBanners.css';

const FORMATS = [
    { key: "leagues", name: "Leagues", blurb: "Multi-week seasons with standings", path: "/games/halo/leagues", live: true },
    { key: "lans", name: "LANs", blurb: "In-person events", path: "/games/halo/lans", live: true },
    { key: "tourneys", name: "Online Tournaments", blurb: "Bracket play, credits or free entry", path: "/Comingsoon", live: false },
    { key: "wagers", name: "Wagers", blurb: "Stake-based matches through a verified host", path: "/games/halo/wagers", live: true },
    { key: "h2h", name: "Head to Head", blurb: "Challenge a specific opponent", path: "/games/halo/head-to-head", live: true },
];

export const Halo = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"Halo"}
                description="Halo and Halo Infinite LANs, leagues, wagers, tournaments, and head-to-head matches from across the globe. Find your next event today."
                canonicalPath={"/games/halo"}
            />
            <HeaderImage
                imageClass={"haloGamePage"}
                title={"Halo Infinite"}
                eyebrow={"Console · Crossplay"}
                subtext={"Halo and Halo Infinite LANs, leagues, wagers, tournaments, and head-to-head matches from across the globe. Find your next event today."}
            />

            <SectionHeading>Ways to Compete</SectionHeading>
            <WaysToCompete formats={FORMATS} />

            <SectionHeading>Verified Events</SectionHeading>
            <VerifiedEventsShowcase game="Halo" gameSlug="halo" />
        </div>
    );
}
