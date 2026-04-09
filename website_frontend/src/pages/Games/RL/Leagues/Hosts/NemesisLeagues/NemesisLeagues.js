import { HeaderImage, HostBanner, BackButton } from "components";
import { useCheckResize } from "hooks";

export const NemesisLeagues = () => {
    const isMobile = useCheckResize();

    const titan = isMobile ? "Titan League - 1746+ MMR" : "1746+ MMR";
    const rival = isMobile ? "Rival League - 1608 - 1745 MMR" : "1608 - 1745 MMR";
    const challenger = isMobile ? "Challenger League - 1499 - 1607 MMR" : "1499 - 1607 MMR";
    const prospect = isMobile ? "Prospect League - 1320 - 1498 MMR" : "1320 - 1498 MMR";
    const novice = isMobile ? "Novice League - 1100 - 1319 MMR" : "1100 - 1319 MMR";

    return (
        <div className="standardContainer">
            <HeaderImage title={"Nemesis Leagues"} imageClass={"nonVerifiedPage"} />

            <div className="eventBannerContainer">
                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/nemesis-leagues/titan"}>Titan League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/nemesis-leagues/titan"} 
                        imgUrl={"https://i.imgur.com/PcmcLLk.png"} 
                        alt={"Nemesis Leagues"}
                        verified={false}
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
                        verified={false}
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
                        verified={false}
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
                        verified={false}
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
                        verified={false}
                    />
                    <HostBanner.Region>{novice}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/nemesis-leagues/novice"} />
                </HostBanner>

                <div className="hrEvents" />

                <div className="backButtonContainer">
                    <BackButton path={"/games/RocketLeague/leagues"} />
                </div>
            </div>
        </div>
    );
}
