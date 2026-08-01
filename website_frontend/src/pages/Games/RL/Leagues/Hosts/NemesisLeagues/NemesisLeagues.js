import { SeoData, HeaderImage, HostBanner, BackButton } from "components";
import { useCheckResize } from "hooks";
import '../../../../EventBanners.css';

export const NemesisLeagues = () => {
    const isMobile = useCheckResize();

    const titan = isMobile ? "Titan League - 1741+ MMR" : "1741+ MMR";
    const rival = isMobile ? "Rival League - 1627 - 1740 MMR" : "1626 - 1740 MMR";
    const challenger = isMobile ? "Challenger League - 1535 - 1625 MMR" : "1535 - 1625 MMR";
    const prospect = isMobile ? "Prospect League - 1415 - 1534 MMR" : "1415 - 1534 MMR";
    const novice = isMobile ? "Novice League - 1203 - 1414 MMR" : "1203 - 1414 MMR";
    const provisional = isMobile ? "Provisional League - 835 - 1202 MMR" : "835 - 1202 MMR";

    return (
        <div className="standardContainer">
            <SeoData
                title={"Nemesis Leagues - Rocket League"}
                description="Nemesis Rocket League Leagues. With range based MMR leagues this is the perfect opportunity for North American RL players wanted to compete at the next level."
                canonicalPath={"/games/RocketLeague/leagues/nemesis-leagues"}
            />
            <HeaderImage title={"Nemesis Leagues"} imageClass={"nonVerifiedPage"} />

            <div className="eventBannerContainer">
                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/nemesis-leagues/titan"}>Titan League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/nemesis-leagues/titan"} 
                        imgUrl={"https://i.imgur.com/PcmcLLk.png"} 
                        alt={"Nemesis Leagues"}
                        verified={true}
                    />
                    <HostBanner.Region>{titan}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/nemesis-leagues/titan"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/nemesis-leagues/rival"}>Rival League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/nemesis-leagues/rival"} 
                        imgUrl={"https://i.imgur.com/PcmcLLk.png"} 
                        alt={"Nemesis Leagues"}
                        verified={true}
                    />
                    <HostBanner.Region>{rival}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/nemesis-leagues/rival"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/nemesis-leagues/challenger"}>Challenger League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/nemesis-leagues/challenger"} 
                        imgUrl={"https://i.imgur.com/PcmcLLk.png"} 
                        alt={"Nemesis Leagues"}
                        verified={true}
                    />
                    <HostBanner.Region>{challenger}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/nemesis-leagues/challenger"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/nemesis-leagues/prospect"}>Prospect League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/nemesis-leagues/prospect"} 
                        imgUrl={"https://i.imgur.com/PcmcLLk.png"} 
                        alt={"Nemesis Leagues"}
                        verified={true}
                    />
                    <HostBanner.Region>{prospect}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/nemesis-leagues/prospect"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/nemesis-leagues/novice"}>Novice League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/nemesis-leagues/novice"} 
                        imgUrl={"https://i.imgur.com/PcmcLLk.png"} 
                        alt={"Nemesis Leagues"}
                        verified={true}
                    />
                    <HostBanner.Region>{novice}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/nemesis-leagues/novice"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/nemesis-leagues/provisional"}>Provisional League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/nemesis-leagues/provisional"} 
                        imgUrl={"https://i.imgur.com/PcmcLLk.png"} 
                        alt={"Nemesis Leagues"}
                        verified={true}
                    />
                    <HostBanner.Region>{provisional}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/nemesis-leagues/provisional"} />
                </HostBanner>

                <div className="hrEvents" />

                <div className="backButtonContainer">
                    <BackButton path={"/games/RocketLeague/leagues"} />
                </div>
            </div>
        </div>
    );
}
