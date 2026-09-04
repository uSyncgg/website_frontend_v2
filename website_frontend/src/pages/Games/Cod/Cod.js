import { SeoData, HeaderImage, WaysToCompete, SectionHeading, VerifiedEvents } from "components";
import '../EventBanners.css';

const FORMATS = [
    { key: "leagues", name: "Leagues", blurb: "Multi-week seasons with standings", path: "/games/call-of-duty/leagues", live: true },
    { key: "lans", name: "LANs", blurb: "In-person events", path: "/games/call-of-duty/lans", live: true },
    { key: "tourneys", name: "Online Tournaments", blurb: "Bracket play, credits or free entry", path: "/tournaments/call-of-duty-tournaments", live: true },
    { key: "wagers", name: "Wagers", blurb: "Stake-based matches through a verified host", path: "/games/call-of-duty/wagers", live: true },
    { key: "h2h", name: "Head to Head", blurb: "Challenge a specific opponent", path: "/games/call-of-duty/head-to-head", live: true },
];

const VERIFIED = [
    { name: "LockdownCL", path: "/games/call-of-duty/leagues/lockdowncl-leagues", imgUrl: "https://i.imgur.com/MQkAGHe.png", alt: "LockdownCL Leagues", buttonTitle: "All Leagues", section: "Leagues" },
    { name: "Checkmate Gaming", path: "/games/call-of-duty/wagers/cmg", imgUrl: "https://i.imgur.com/QKP5L9N.png", alt: "CMG Wagers", buttonTitle: "More Info", section: "Wagers" },
    { name: "Esports Agent", path: "/games/call-of-duty/wagers/eagent", imgUrl: "https://i.imgur.com/mued0Qd.png", alt: "Esports Agent Wagers", buttonTitle: "More Info", section: "Wagers" },
    { name: "Checkmate Gaming", path: "/games/call-of-duty/head-to-head/cmg", imgUrl: "https://i.imgur.com/QKP5L9N.png", alt: "CMG Head to Head", buttonTitle: "More Info", section: "HeadToHead" },
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
            <VerifiedEvents events={VERIFIED} />
        </div>
    );
}
