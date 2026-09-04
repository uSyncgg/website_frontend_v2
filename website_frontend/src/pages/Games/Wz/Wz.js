import { SeoData, HeaderImage, WaysToCompete, SectionHeading, VerifiedEvents } from "components";
import '../EventBanners.css';

const FORMATS = [
    { key: "leagues", name: "Leagues", blurb: "Multi-week seasons with standings", path: "/games/warzone/leagues", live: true },
    { key: "lans", name: "LANs", blurb: "In-person events", path: "/games/warzone/lans", live: true },
    { key: "tourneys", name: "Online Tournaments", blurb: "Bracket play, credits or free entry", path: "/Comingsoon", live: false },
    { key: "wagers", name: "Wagers", blurb: "Stake-based matches through a verified host", path: "/games/warzone/wagers", live: true },
    { key: "h2h", name: "Head to Head", blurb: "Challenge a specific opponent", path: "/games/warzone/head-to-head", live: true },
];

const VERIFIED = [
    { name: "Checkmate Gaming", path: "/games/warzone/wagers/cmg", imgUrl: "https://i.imgur.com/QKP5L9N.png", alt: "CMG Wagers", buttonTitle: "More Info", section: "Wagers" },
    { name: "Checkmate Gaming", path: "/games/warzone/head-to-head/cmg", imgUrl: "https://i.imgur.com/QKP5L9N.png", alt: "CMG Head to Head", buttonTitle: "More Info", section: "HeadToHead" },
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
            <VerifiedEvents events={VERIFIED} />
        </div>
    );
}
