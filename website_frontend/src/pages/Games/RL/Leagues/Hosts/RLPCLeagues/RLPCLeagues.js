import { HeaderImage, HostBanner, BackButton } from "components";
import { useCheckResize } from "hooks";

export const RLPCLeagues = () => {
    const isMobile = useCheckResize();

    const major = isMobile ? "Major League - 1800 MMR & Above" : "1800 MMR & Above";
    const single = isMobile ? "Single A League - 1021 - 1349 MMR" : "1021 - 1349 MMR";
    const double = isMobile ? "Double A League - 1350 - 1574 MMR" : "1450 - 1574 MMR";
    const triple = isMobile ? " Triple A League - 1575 - 1799 MMR" : "1575 - 1799 MMR";

    return (
        <div className="standardContainer">
            <HeaderImage imageClass={"rplcRLLeagues"} />

            <div className="eventBannerContainer">
                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/rlpc-leagues/major"}>Major League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/rlpc-leagues/major"} 
                        imgUrl={"https://i.imgur.com/kVDfckC.png"} 
                        alt={"RLPC Leagues"}
                        verified={true}
                    />
                    <HostBanner.Region>{major}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/rlpc-leagues/major"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/rlpc-leagues/aaa"}>Triple A League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/rlpc-leagues/aaa"} 
                        imgUrl={"https://i.imgur.com/kVDfckC.png"} 
                        alt={"RLPC Leagues"}
                        verified={true}
                    />
                    <HostBanner.Region>{triple}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/rlpc-leagues/aaa"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/rlpc-leagues/aa"}>Double A League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/rlpc-leagues/aa"} 
                        imgUrl={"https://i.imgur.com/kVDfckC.png"} 
                        alt={"RLPC Leagues"}
                        verified={true}
                    />
                    <HostBanner.Region>{double}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/rlpc-leagues/aa"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/rlpc-leagues/a"}>Single A League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/rlpc-leagues/a"} 
                        imgUrl={"https://i.imgur.com/kVDfckC.png"} 
                        alt={"RLPC Leagues"}
                        verified={true}
                    />
                    <HostBanner.Region>{single}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/rlpc-leagues/a"} />
                </HostBanner>

                <div className="hrEvents" />

                <div className="backButtonContainer">
                    <BackButton path={"/games/RocketLeague/leagues"} />
                </div>
            </div>
        </div>
    );
}
