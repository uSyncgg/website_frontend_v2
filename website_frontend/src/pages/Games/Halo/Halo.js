import { SeoData, HeaderImage, WaysToCompete, SectionHeading, VerifiedEvents } from "components";
import '../EventBanners.css';

const FORMATS = [
    { key: "leagues", name: "Leagues", blurb: "Multi-week seasons with standings", path: "/games/halo/leagues", live: true },
    { key: "lans", name: "LANs", blurb: "In-person events", path: "/games/halo/lans", live: true },
    { key: "tourneys", name: "Online Tournaments", blurb: "Bracket play, credits or free entry", path: "/Comingsoon", live: false },
    { key: "wagers", name: "Wagers", blurb: "Stake-based matches through a verified host", path: "/games/halo/wagers", live: true },
    { key: "h2h", name: "Head to Head", blurb: "Challenge a specific opponent", path: "/games/halo/head-to-head", live: true },
];

const VERIFIED = [
    { name: "Halo Rec League", path: "/games/halo/leagues/halo-rec-league", imgUrl: "https://i.imgur.com/6cA46YH.png", alt: "Halo Rec League", buttonTitle: "More Info", section: "Leagues" },
    { name: "College Halo", path: "/games/halo/leagues/ugc-halo", imgUrl: "https://i.imgur.com/JeMuXtx.png", alt: "UGC League", buttonTitle: "More Info", section: "Leagues" },
    { name: "UGC College Halo Scrims", path: "/games/halo/head-to-head/ugc-scrim", imgUrl: "https://i.imgur.com/JeMuXtx.png", alt: "UGC Head to Head", buttonTitle: "More Info", section: "HeadToHead" },
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
            <VerifiedEvents events={VERIFIED} />
        </div>
    );
}
