import { SeoData, HeaderImage, WaysToCompete, SectionHeading, VerifiedEvents } from "components";
import '../EventBanners.css';

const FORMATS = [
    { key: "leagues", name: "Leagues", blurb: "Multi-week seasons with standings", path: "/games/CS2/leagues", live: true },
    { key: "lans", name: "LANs", blurb: "In-person events", path: "/Comingsoon", live: false },
    { key: "tourneys", name: "Online Tournaments", blurb: "Bracket play, credits or free entry", path: "/Comingsoon", live: false },
    { key: "wagers", name: "Wagers", blurb: "Stake-based matches through a verified host", path: "/games/CS2/wagers", live: true },
    { key: "h2h", name: "Head to Head", blurb: "Challenge a specific opponent", path: "/games/CS2/head-to-head", live: true },
];

const VERIFIED = [
    { name: "FACEIT ESEA", path: "/games/CS2/leagues/faceitesea", imgUrl: "https://i.imgur.com/STmx1Aa.png", alt: "FACEIT ESEA League", buttonTitle: "More Info", section: "Leagues" },
    { name: "FACEIT", path: "/games/CS2/head-to-head/faceit", imgUrl: "https://i.imgur.com/4GwagUk.png", alt: "Faceit Head to Head", buttonTitle: "More Info", section: "HeadToHead" },
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
            <VerifiedEvents events={VERIFIED} />
        </div>
    );
}
