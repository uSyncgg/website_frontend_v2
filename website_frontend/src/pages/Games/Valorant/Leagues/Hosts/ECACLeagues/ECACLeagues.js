import { HeaderImage, HostBanner } from "components";
import { useCheckResize } from "hooks";

export const ECACLeagues = () => {
    const isMobile = useCheckResize();

    const a = isMobile ? "Division A - Diamond - Radiant" : "Diamond - Radiant";
    const b = isMobile ? "Division B - Gold - Platinum" : "Gold - Platinum";
    const c = isMobile ? "Division C - Iron - Silver" : "Iron - Silver";

    return (
        <div className="standardContainer">
            <HeaderImage title={"ECAC Leagues"} imageClass={"nonVerifiedPage"} />

            <div className="eventBannerContainer">
                <HostBanner>
                    <HostBanner.Title path={"/games/Valorant/leagues/ecac-leagues/division-a"}>Division A League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/Valorant/leagues/ecac-leagues/division-a"} 
                        imgUrl={"https://i.imgur.com/VCXkcNL.png"} 
                        alt={"ECAC Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>{a}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/Valorant/leagues/ecac-leagues/division-a"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/Valorant/leagues/ecac-leagues/division-b"}>Division B League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/Valorant/leagues/ecac-leagues/division-b"} 
                        imgUrl={"https://i.imgur.com/VCXkcNL.png"} 
                        alt={"ECAC Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>{b}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/Valorant/leagues/ecac-leagues/division-b"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/Valorant/leagues/ecac-leagues/division-c"}>Division C League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/Valorant/leagues/ecac-leagues/division-c"} 
                        imgUrl={"https://i.imgur.com/VCXkcNL.png"} 
                        alt={"ECAC Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>{c}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/Valorant/leagues/ecac-leagues/division-c"} />
                </HostBanner>

                <div className="hrEvents" />
            </div>
        </div>
    );
}
