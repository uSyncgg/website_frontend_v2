import { HeaderImage, HostBanner } from "components";
import { useCheckResize } from "hooks";

export const LPLLeagues = () => {
    const isMobile = useCheckResize();

    const gold = isMobile ? "Gold Division - Invite Only" : "Invite Only";
    const silver = isMobile ? "Silver Division - Invite Only": "Invite Only";
    const bronze = isMobile ? "Bronze Division - Qualified Teams" : "Qualified Teams";
    const openDiv = isMobile ? "Open Division - Open" : "Open";

    return (
        <div className="standardContainer">
            <HeaderImage imageClass={"lplVALLeagues"} />

            <div className="eventBannerContainer">
                <HostBanner>
                    <HostBanner.Title path={"/games/Valorant/leagues/lpl-leagues/gold"}>Gold Division League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/Valorant/leagues/lpl-leagues/gold"} 
                        imgUrl={"https://i.imgur.com/bqbNpmT.png"} 
                        alt={"LPL Leagues"}
                        verified={true}
                    />
                    <HostBanner.Region>{gold}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/Valorant/leagues/lpl-leagues/gold"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/Valorant/leagues/lpl-leagues/silver"}>Silver Division League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/Valorant/leagues/lpl-leagues/silver"} 
                        imgUrl={"https://i.imgur.com/bqbNpmT.png"} 
                        alt={"LPL Leagues"}
                        verified={true}
                    />
                    <HostBanner.Region>{silver}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/Valorant/leagues/lpl-leagues/silver"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/Valorant/leagues/lpl-leagues/bronze"}>Bronze Division League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/Valorant/leagues/lpl-leagues/bronze"} 
                        imgUrl={"https://i.imgur.com/bqbNpmT.png"} 
                        alt={"LPL Leagues"}
                        verified={true}
                    />
                    <HostBanner.Region>{bronze}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/Valorant/leagues/lpl-leagues/bronze"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/Valorant/leagues/lpl-leagues/open"}>Open Division League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/Valorant/leagues/lpl-leagues/open"} 
                        imgUrl={"https://i.imgur.com/bqbNpmT.png"} 
                        alt={"LPL Leagues"}
                        verified={true}
                    />
                    <HostBanner.Region>{openDiv}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/Valorant/leagues/lpl-leagues/open"} />
                </HostBanner>

                <div className="hrEvents" />
            </div>
        </div>
    );
}
