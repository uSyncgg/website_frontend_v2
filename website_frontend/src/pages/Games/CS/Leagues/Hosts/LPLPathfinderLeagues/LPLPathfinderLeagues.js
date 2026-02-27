import { HeaderImage, HostBanner } from "components";
import { useCheckResize } from "hooks";

export const LPLPathfinderLeagues = () => {
    const isMobile = useCheckResize();

    const gold = isMobile ? "Gold Division - Invite Only" : "Invite Only";
    const silver = isMobile ? "Silver Division - Invite Only" : "Invite Only";
    const bronze = isMobile ? "Bronze Division - Qualified Teams" : "Qualified Teams";
    const open = isMobile ? "Open Division - Open" : "Open";

    return (
        <div className="standardContainer">
            <HeaderImage title={"LPL Leagues"} imageClass={"nonVerifiedPage"} />

            <div className="eventBannerContainer">
                <HostBanner>
                    <HostBanner.Title path={"/games/CS2/leagues/lpl-leagues/lpl-gold"}>Gold Division</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/CS2/leagues/lpl-leagues/lpl-gold"} 
                        imgUrl={"https://i.imgur.com/bqbNpmT.png"} 
                        alt={"LPL Pathfinder League"}
                        verified={false}
                    />
                    <HostBanner.Region>{gold}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/CS2/leagues/lpl-leagues/lpl-gold"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/CS2/leagues/lpl-leagues/lpl-silver"}>Silver Division</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/CS2/leagues/lpl-leagues/lpl-silver"} 
                        imgUrl={"https://i.imgur.com/bqbNpmT.png"} 
                        alt={"LPL Pathfinder League"}
                        verified={false}
                    />
                    <HostBanner.Region>{silver}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/CS2/leagues/lpl-leagues/lpl-silver"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/CS2/leagues/lpl-leagues/lpl-bronze"}>Bronze Division</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/CS2/leagues/lpl-leagues/lpl-bronze"} 
                        imgUrl={"https://i.imgur.com/bqbNpmT.png"} 
                        alt={"LPL Pathfinder League"}
                        verified={false}
                    />
                    <HostBanner.Region>{bronze}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/CS2/leagues/lpl-leagues/lpl-bronze"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/CS2/leagues/lpl-leagues/lpl-open"}>Open Division</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/CS2/leagues/lpl-leagues/lpl-open"} 
                        imgUrl={"https://i.imgur.com/bqbNpmT.png"} 
                        alt={"LPL Pathfinder League"}
                        verified={false}
                    />
                    <HostBanner.Region>{open}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/CS2/leagues/lpl-leagues/lpl-open"} />
                </HostBanner>

                <div className="hrEvents" />
            </div>
        </div>
    );
}
