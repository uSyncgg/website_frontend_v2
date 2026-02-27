import { HeaderImage, HostBanner } from "components";
import { useCheckResize } from "hooks";

export const UltimateRocketLeagueLeagues = () => {
    const isMobile = useCheckResize();

    const duos = isMobile ? "2v2 League - Draft Format" : "Draft Format";
    const trios = isMobile ? "3v3 League - Draft Format" : "Draft Format";

    return (
        <div className="standardContainer">
            <HeaderImage title={"Ultimate Rocket Leagues"} imageClass={"nonVerifiedPage"} />

            <div className="eventBannerContainer">
                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/url-leagues/2s"}>2v2 League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/url-leagues/2s"} 
                        imgUrl={"https://i.imgur.com/pjxLzXe.png"} 
                        alt={"Ulatimate Rocket Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>{duos}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/url-leagues/2s"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/url-leagues/3s"}>3v3 League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/url-leagues/3s"} 
                        imgUrl={"https://i.imgur.com/pjxLzXe.png"} 
                        alt={"Ulatimate Rocket Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>{trios}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/url-leagues/3s"} />
                </HostBanner>

                <div className="hrEvents" />
            </div>
        </div>
    );
}
