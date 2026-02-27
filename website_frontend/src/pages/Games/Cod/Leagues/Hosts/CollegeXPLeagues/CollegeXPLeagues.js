import { HeaderImage, HostBanner } from "components";
import { useCheckResize } from "hooks";

export const CollegeXPLeagues = () => {
    const isMobile = useCheckResize();

    const varsity = isMobile ? "Varsity Division - NA" : "NA";
    const club    = isMobile ? "Club Division - NA"    : "NA";
    const open    = isMobile ? "Open Division - NA"    : "NA";

    return (
        <div className="standardContainer">
            <HeaderImage title={"College XP Leagues"} imageClass={"nonVerifiedPage"} />

            <div className="eventBannerContainer">
                <HostBanner>
                    <HostBanner.Title path={"/games/call-of-duty/leagues/cxp-leagues/cxp-varsity"}>Varsity Division</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/call-of-duty/leagues/cxp-leagues/cxp-varsity"} 
                        imgUrl={"https://i.imgur.com/jGdqqOZ.png"} 
                        alt={"CXP League"}
                        verified={false}
                    />
                    <HostBanner.Region>{varsity}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/call-of-duty/leagues/cxp-leagues/cxp-varsity"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/call-of-duty/leagues/cxp-leagues/cxp-open"}>Open Division</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/call-of-duty/leagues/cxp-leagues/cxp-open"} 
                        imgUrl={"https://i.imgur.com/jGdqqOZ.png"} 
                        alt={"CXP League"}
                        verified={false}
                    />
                    <HostBanner.Region>{open}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/call-of-duty/leagues/cxp-leagues/cxp-open"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/call-of-duty/leagues/cxp-leagues/cxp-club"}>Club Division</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/call-of-duty/leagues/cxp-leagues/cxp-club"} 
                        imgUrl={"https://i.imgur.com/jGdqqOZ.png"} 
                        alt={"CXP League"}
                        verified={false}
                    />
                    <HostBanner.Region>{club}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/call-of-duty/leagues/cxp-leagues/cxp-club"} />
                </HostBanner>

                <div className="hrEvents" />
            </div>
        </div>
    );
}
