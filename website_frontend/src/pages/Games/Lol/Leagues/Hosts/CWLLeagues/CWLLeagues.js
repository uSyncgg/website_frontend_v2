import { HeaderImage, HostBanner, BackButton } from "components";
import { useCheckResize } from "hooks";

export const CWLLeagues = () => {
    const isMobile = useCheckResize();

    const ascend = isMobile ? "CWL Ascend - 750 LP Individual Cap" : "750 LP Individual Cap";
    const defy = isMobile ? "CWL Defy - 500 LP Individual Cap" : "500 LP Individual Cap";
    const rise = isMobile ? "CWL Rise - 100 LP Individual Cap" : "100 LP Individual Cap";

    return (
        <div className="standardContainer">
            <HeaderImage title={"CWL Divisions"} imageClass={"nonVerifiedPage"} />

            <div className="eventBannerContainer">
                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/cobalt-winds-leagues/cwl-ascend"}>CWL Ascend</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/cobalt-winds-leagues/cwl-ascend"} 
                        imgUrl={"https://i.imgur.com/sMnBEnL.png"} 
                        alt={"Cobalt Winds Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>{ascend}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/leagues/cobalt-winds-leagues/cwl-ascend"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/cobalt-winds-leagues/cwl-defy"}>CWL Defy</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/cobalt-winds-leagues/cwl-defy"} 
                        imgUrl={"https://i.imgur.com/sMnBEnL.png"} 
                        alt={"Cobalt Winds Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>{defy}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/leagues/cobalt-winds-leagues/cwl-defy"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/cobalt-winds-leagues/cwl-rise"}>CWL Rise</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/cobalt-winds-leagues/cwl-rise"} 
                        imgUrl={"https://i.imgur.com/sMnBEnL.png"} 
                        alt={"Cobalt Winds Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>{rise}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/leagues/cobalt-winds-leagues/cwl-rise"} />
                </HostBanner>

                <div className="hrEvents" />

                <div className="backButtonContainer">
                    <BackButton path={"/games/LoL/leagues"} />
                </div>
            </div>
        </div>
    );
}
