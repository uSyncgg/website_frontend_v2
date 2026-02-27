import { GameImage, HeaderImage } from "components";

export const Leagues = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"League Titles"} imageClass={"leaguesPage"} />
            
            <GameImage 
                games={
                    {
                        "Call of Duty": "/games/call-of-duty/leagues",
                        "Warzone": "/games/warzone/leagues",
                        "Halo": "/games/halo/leagues",
                        "League of Legends": "/games/LoL/leagues",
                        "Rocket League": "/games/RocketLeague/leagues",
                        "Valorant": "/games/Valorant/leagues",
                        "CS2": "/games/CS2/leagues"
                    }
                }
            />
        </div>
    );
}
