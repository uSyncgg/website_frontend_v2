import { HeaderImage, HostBanner } from "components";
import { useCheckResize } from "hooks";

export const RocketSoccarConfederationLeagues = () => {
    const isMobile = useCheckResize();

    const na = isMobile ? "3v3 NA League - Draft Format" : "Draft Format";
    const eu = isMobile ? "3v3 EU League - Draft Format" : "Draft Format";

    return (
        <div className="standardContainer">
            <HeaderImage title={"Rocket Soccar Confederation"} imageClass={"nonVerifiedPage"} />

            <div className="eventBannerContainer">
                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/rsc-leagues/3v3-na"}>3v3 NA League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/rsc-leagues/3v3-na"} 
                        imgUrl={"https://i.imgur.com/QiNSeyE.png"} 
                        alt={"Rocket Soccar Confederation"}
                        verified={false}
                    />
                    <HostBanner.Region>{na}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/rsc-leagues/3v3-na"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/rsc-leagues/3v3-eu"}>3v3 EU League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/rsc-leagues/3v3-eu"} 
                        imgUrl={"https://i.imgur.com/QiNSeyE.png"} 
                        alt={"Rocket Soccar Confederation"}
                        verified={false}
                    />
                    <HostBanner.Region>{eu}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/rsc-leagues/3v3-eu"} />
                </HostBanner>

                <div className="hrEvents" />
            </div>
        </div>
    );
}
