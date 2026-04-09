import { HeaderImage, HostBanner, BackButton } from "components";
import { useCheckResize } from "hooks";

export const CodRecLeagues = () => {
    const isMobile = useCheckResize();

    const premade = isMobile ? "Premade League - NA" : "NA";
    const open    = isMobile ? "Open League - NA"    : "NA";

    return (
        <div className="standardContainer">
            <HeaderImage title={"College Rec Leagues"} imageClass={"nonVerifiedPage"} />

            <div className="eventBannerContainer">
                <HostBanner>
                    <HostBanner.Title path={"/games/call-of-duty/leagues/cod-rec-leagues/cod-rec-premade-league"}>Premade League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/call-of-duty/leagues/cod-rec-leagues/cod-rec-premade-league"} 
                        imgUrl={"https://i.imgur.com/qbmhh4T.png"} 
                        alt={"Cod Rec Premade League"}
                        verified={false}
                    />
                    <HostBanner.Region>{premade}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/call-of-duty/leagues/cod-rec-leagues/cod-rec-premade-league"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/call-of-duty/leagues/cod-rec-leagues/cod-rec-open-league"}>Open League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/call-of-duty/leagues/cod-rec-leagues/cod-rec-open-league"} 
                        imgUrl={"https://i.imgur.com/qbmhh4T.png"} 
                        alt={"CXP League"}
                        verified={false}
                    />
                    <HostBanner.Region>{open}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/call-of-duty/leagues/cod-rec-leagues/cod-rec-open-league"} />
                </HostBanner>

                <div className="hrEvents" />

                <div className="backButtonContainer">
                    <BackButton path={"/games/call-of-duty/leagues"} />
                </div>
            </div>
        </div>
    );
}
