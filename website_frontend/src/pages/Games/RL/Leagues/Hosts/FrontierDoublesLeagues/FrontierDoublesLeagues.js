import { HeaderImage, HostBanner } from "components";
import { useCheckResize } from "hooks";

export const FrontierDoublesLeagues = () => {
    const isMobile = useCheckResize();

    const elite = isMobile ? "Elite League - 1600 - 1799 MMR" : "1600 - 1799 MMR";
    const star = isMobile ? "Star League - 1400 - 1599 MMR" : "1400 - 1599 MMR";
    const expert = isMobile ? "Expert League - 1200 - 1399 MMR" : "1200 - 1399 MMR";
    const origin = isMobile ? "Origin League - 0 - 1199 MMR" : "0 - 1199 MMR";

    return (
        <div className="standardContainer">
            <HeaderImage title={"Frontier Doubles Leagues"} imageClass={"nonVerifiedPage"} />

            <div className="eventBannerContainer">
                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/frontier-doubles-leagues/elite"}>Elite League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/frontier-doubles-leagues/elite"} 
                        imgUrl={"https://i.imgur.com/JRaBjWV.png"} 
                        alt={"Frontier Doubles Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>{elite}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/frontier-doubles-leagues/elite"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/frontier-doubles-leagues/star"}>Star League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/frontier-doubles-leagues/star"} 
                        imgUrl={"https://i.imgur.com/JRaBjWV.png"} 
                        alt={"Frontier Doubles Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>{star}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/frontier-doubles-leagues/star"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/frontier-doubles-leagues/expert"}>Expert League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/frontier-doubles-leagues/expert"} 
                        imgUrl={"https://i.imgur.com/JRaBjWV.png"} 
                        alt={"Frontier Doubles Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>{expert}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/frontier-doubles-leagues/expert"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/frontier-doubles-leagues/origin"}>Origin League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/frontier-doubles-leagues/origin"} 
                        imgUrl={"https://i.imgur.com/JRaBjWV.png"} 
                        alt={"Frontier Doubles Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>{origin}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/frontier-doubles-leagues/origin"} />
                </HostBanner>

                <div className="hrEvents" />
            </div>
        </div>
    );
}
