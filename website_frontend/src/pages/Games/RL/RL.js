import { SeoData, HeaderImage, WaysToCompete, SectionHeading, VerifiedEvents } from "components";
import '../EventBanners.css';

const FORMATS = [
    { key: "leagues", name: "Leagues", blurb: "Multi-week seasons with standings", path: "/games/RocketLeague/leagues", live: true },
    { key: "lans", name: "LANs", blurb: "In-person events", path: "/Comingsoon", live: false },
    { key: "tourneys", name: "Online Tournaments", blurb: "Bracket play, credits or free entry", path: "/Comingsoon", live: false },
    { key: "wagers", name: "Wagers", blurb: "Stake-based matches through a verified host", path: "/games/RocketLeague/wagers", live: true },
    { key: "h2h", name: "Head to Head", blurb: "Challenge a specific opponent", path: "/games/RocketLeague/head-to-head", live: true },
];

const VERIFIED = [
    { name: "Nemesis Leagues", path: "/games/RocketLeague/leagues/nemesis-leagues", imgUrl: "https://i.imgur.com/PcmcLLk.png", alt: "Nemesis Leagues", buttonTitle: "All Leagues", section: "Leagues" },
    { name: "RLPC", path: "/games/RocketLeague/leagues/rlpc-leagues", imgUrl: "https://i.imgur.com/kVDfckC.png", alt: "RLPC Leagues", buttonTitle: "All Leagues", section: "Leagues" },
    { name: "College Carball Association", path: "/games/RocketLeague/leagues/cca", imgUrl: "https://i.imgur.com/UqFxQ9Q.png", alt: "College Carball", buttonTitle: "More Info", section: "Leagues" },
    { name: "Gankster GG", path: "/games/RocketLeague/head-to-head/gankster", imgUrl: "https://i.imgur.com/ljDANVi.png", alt: "Gankster Head to Head", buttonTitle: "More Info", section: "HeadToHead" },
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
            <VerifiedEvents events={VERIFIED} />
        </div>
    );
}
