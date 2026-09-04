import { SeoData, HeaderImage, WaysToCompete, SectionHeading, VerifiedEvents } from "components";
import '../EventBanners.css';

const FORMATS = [
    { key: "leagues", name: "Leagues", blurb: "Multi-week seasons with standings", path: "/games/LoL/leagues", live: true },
    { key: "lans", name: "LANs", blurb: "In-person events", path: "/games/LoL/lans", live: true },
    { key: "tourneys", name: "Online Tournaments", blurb: "Bracket play, credits or free entry", path: "/Comingsoon", live: false },
    { key: "wagers", name: "Wagers", blurb: "Stake-based matches through a verified host", path: "/games/LoL/wagers", live: true },
    { key: "h2h", name: "Head to Head", blurb: "Challenge a specific opponent", path: "/games/LoL/head-to-head", live: true },
];

const VERIFIED = [
    { name: "Titan Esports", path: "/games/LoL/leagues/titan-leagues", imgUrl: "https://i.imgur.com/SoRhxEf.png", alt: "Titan Esports Leagues", buttonTitle: "All Leagues", section: "Leagues" },
    { name: "Risen Leagues", path: "/games/LoL/leagues/risen-leagues", imgUrl: "https://i.imgur.com/s5LrZoC.png", alt: "Risen Leagues", buttonTitle: "All Leagues", section: "Leagues" },
    { name: "Aegis Leagues", path: "/games/LoL/leagues/aegis-leagues", imgUrl: "https://i.imgur.com/o0sTnrZ.png", alt: "Aegis Leagues", buttonTitle: "All Leagues", section: "Leagues" },
    { name: "CLOL", path: "/games/LoL/leagues/clol", imgUrl: "https://i.imgur.com/2jNA26x.png", alt: "CLOL", buttonTitle: "More Info", section: "Leagues" },
    { name: "Playfly College", path: "/games/LoL/leagues/playfly", imgUrl: "https://i.imgur.com/XHCsRTv.png", alt: "Playfly College League", buttonTitle: "More Info", section: "Leagues" },
    { name: "Gankster GG", path: "/games/LoL/head-to-head/gankster", imgUrl: "https://i.imgur.com/ljDANVi.png", alt: "Gankster Head to Head", buttonTitle: "More Info", section: "HeadToHead" },
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
            <VerifiedEvents events={VERIFIED} />
        </div>
    );
}
