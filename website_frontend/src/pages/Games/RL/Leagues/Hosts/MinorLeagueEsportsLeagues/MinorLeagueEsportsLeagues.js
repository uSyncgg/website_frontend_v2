import { SeoData, HeaderImage, HostBanner, BackButton } from "components";
import { useCheckResize } from "hooks";

export const MinorLeagueEsportsLeagues = () => {
    const isMobile = useCheckResize();

    const premier = isMobile ? "Premier League - 1651 - 1900 MMR" : "1651 - 1900 MMR";
    const master = isMobile ? "Master League - 1451 - 1650 MMR" : "1451 - 1650 MMR";
    const champion = isMobile ? "Champion League - 1251 - 1450 MMR" : "1251 - 1450 MMR";
    const academy = isMobile ? "Academy League - 1000 - 1250 MMR" : "1000 - 1250 MMR";
    const foundation = isMobile ? "Foundation League - 0 - 1050 MMR" : "0 - 1050 MMR";

    return (
        <div className="standardContainer">
            <SeoData
                description="Rocket League Minor League Esports (MLE) leagues. Compete in a Rocket League league of your choice based on your MMR and skills."
                canonicalPath={"/games/RocketLeague/leagues/mle-leagues"}
            />
            <HeaderImage title={"Minoir League Esports"} imageClass={"nonVerifiedPage"} />

            <div className="eventBannerContainer">
                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/mle-leagues/premier"}>Premier League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/mle-leagues/premier"} 
                        imgUrl={"https://i.imgur.com/1ouD021.png"} 
                        alt={"Minor League Esports"}
                        verified={false}
                    />
                    <HostBanner.Region>{premier}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/mle-leagues/premier"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/mle-leagues/master"}>Master League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/mle-leagues/master"} 
                        imgUrl={"https://i.imgur.com/1ouD021.png"} 
                        alt={"Minor League Esports"}
                        verified={false}
                    />
                    <HostBanner.Region>{master}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/mle-leagues/master"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/mle-leagues/champ"}>Champion League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/mle-leagues/champ"} 
                        imgUrl={"https://i.imgur.com/1ouD021.png"} 
                        alt={"Minor League Esports"}
                        verified={false}
                    />
                    <HostBanner.Region>{champion}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/mle-leagues/champ"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/mle-leagues/academy"}>Academy League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/mle-leagues/academy"} 
                        imgUrl={"https://i.imgur.com/1ouD021.png"} 
                        alt={"Minor League Esports"}
                        verified={false}
                    />
                    <HostBanner.Region>{academy}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/mle-leagues/academy"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/mle-leagues/foundation"}>Foundation League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/mle-leagues/foundation"} 
                        imgUrl={"https://i.imgur.com/1ouD021.png"} 
                        alt={"Minor League Esports"}
                        verified={false}
                    />
                    <HostBanner.Region>{foundation}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/mle-leagues/foundation"} />
                </HostBanner>

                <div className="hrEvents" />

                <div className="backButtonContainer">
                    <BackButton path={"/games/RocketLeague/leagues"} />
                </div>
            </div>
        </div>
    );
}
