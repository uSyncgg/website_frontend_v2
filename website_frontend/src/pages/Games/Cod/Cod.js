import { SeoData, HeaderImage, WaysToCompete, SectionHeading } from "components";
import { VerifiedEventsShowcase } from "pages/Games/Shared/VerifiedEventsShowcase";
import '../EventBanners.css';

const FORMATS = [
    { key: "leagues", name: "Leagues", blurb: "Multi-week seasons with standings", path: "/games/call-of-duty/leagues", live: true },
    { key: "lans", name: "LANs", blurb: "In-person events", path: "/games/call-of-duty/lans", live: true },
    { key: "tourneys", name: "Online Tournaments", blurb: "Bracket play, credits or free entry", path: "/tournaments/call-of-duty-tournaments", live: true },
    { key: "wagers", name: "Wagers", blurb: "Stake-based matches through a verified host", path: "/games/call-of-duty/wagers", live: true },
    { key: "h2h", name: "Head to Head", blurb: "Challenge a specific opponent", path: "/games/call-of-duty/head-to-head", live: true },
];

export const Cod = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"Call of Duty"}
                description="Call of Duty leagues, LANs, wagers, head-to-head, and tournaments. Find every type of competition from every site."
                canonicalPath={"/games/call-of-duty"}
            />
            <HeaderImage
                imageClass={"codGamePage"}
                title={"Call of Duty"}
                eyebrow={"Console · Crossplay"}
                subtext={"Call of Duty leagues, LANs, wagers, head-to-head, and tournaments. Find every type of competition from every site."}
            />

            <SectionHeading>Ways to Compete</SectionHeading>
            <WaysToCompete formats={FORMATS} />

            <SectionHeading>Verified Events</SectionHeading>
            <VerifiedEventsShowcase game="Call of Duty" gameSlug="call-of-duty" />
        </div>
    );
}
