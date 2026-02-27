import { HeaderImage, HostBanner } from "components";
import { useCheckResize } from "hooks";

export const OCEDivisions = () => {
    const isMobile = useCheckResize();

    const d1 = isMobile ? "Division 1 League - $5100 Team Salary Cap" : "$5100 Team Salary Cap";
    const d2 = isMobile ? "Division 2 League - $3100 Team Salary Cap" : "$3100 Team Salary Cap";
    const d3 = isMobile ? "Division 3 League - $1300 Team Salary Cap" : "$1300 Team Salary Cap";

    return (
        <div className="standardContainer">
            <HeaderImage title={"Oceania Leagues"} imageClass={"nonVerifiedPage"} />

            <div className="eventBannerContainer">
                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/oce-leagues/divisions"}>Division 1 League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/oce-leagues/divisions"} 
                        imgUrl={"https://i.imgur.com/NxauxTy.png"} 
                        alt={"Oceania Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>{d1}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/oce-leagues/divisions"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/oce-leagues/divisions"}>Division 2 League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/oce-leagues/divisions"} 
                        imgUrl={"https://i.imgur.com/NxauxTy.png"} 
                        alt={"Oceania Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>{d2}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/oce-leagues/divisions"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/oce-leagues/divisions"}>Division 3 League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/oce-leagues/divisions"} 
                        imgUrl={"https://i.imgur.com/NxauxTy.png"} 
                        alt={"Oceania Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>{d3}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/oce-leagues/divisions"} />
                </HostBanner>

                <div className="hrEvents" />
            </div>
        </div>
    );
}
