import { GameImage, HeaderImage, SeoData } from "components";

export const Games = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"Games"}
                description="Find your next competition in one of our 7 different supported titles!"
                canonicalPath={"/games"}
            />

            <HeaderImage
                title={"uSync Titles"}
                imageClass={"gamesPage"}
                eyebrow={"7 Supported Games"}
                subtext={"Pick your title and find verified LANs, tournaments, leagues, and more."}
            />

            <GameImage 
                games={
                    {
                        "Call of Duty": "/games/call-of-duty",
                        "Warzone": "/games/warzone",
                        "Halo": "/games/halo",
                        "League of Legends": "/games/LoL",
                        "Rocket League": "/games/RocketLeague",
                        "Valorant": "/games/Valorant",
                        "CS2": "/games/CS2"
                    }
                }
            />
        </div>
    );
}
