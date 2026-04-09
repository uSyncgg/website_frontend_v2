import { HeaderImage, HostBanner, BackButton } from "components";
import { useCheckResize } from "hooks";

export const FrontierDoublesLeagues = () => {
    const isMobile = useCheckResize();

    const elite = isMobile ? "Elite League - 37.5 Salary Cap" : "37.5 Salary Cap";
    const star = isMobile ? "Star League - 48 Salary Cap" : "48 Salary Cap";
    const expert = isMobile ? "Expert League - 42 Salary Cap" : "42 Salary Cap";
    const adept = isMobile ? "Adept Leaue - 36 Salary Cap" : "36 Salary Cap";
    const origin = isMobile ? "Origin League - 30 Salary Cap" : "30 Salary Cap";

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
                    <HostBanner.Title path={"/games/RocketLeague/leagues/frontier-doubles-leagues/adept"}>Adept League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/frontier-doubles-leagues/adept"} 
                        imgUrl={"https://i.imgur.com/JRaBjWV.png"} 
                        alt={"Frontier Doubles Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>{adept}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/frontier-doubles-leagues/adept"} />
                </HostBanner>

                <div className="hrEvents" />

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

                <div className="backButtonContainer">
                    <BackButton path={"/games/RocketLeague/leagues"} />
                </div>
            </div>
        </div>
    );
}
