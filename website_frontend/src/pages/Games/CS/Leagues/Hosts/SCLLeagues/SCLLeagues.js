import { HeaderImage, HostBanner } from "components";
import { useCheckResize } from "hooks";

export const SCLLeagues = () => {
    const isMobile = useCheckResize();

    const challenger = isMobile ? "Challenger Division - Highest Division" : "Highest Division";
    const masters = isMobile ? "Masters Division - High-Tier Division" : "High-Tier Division";
    const intermediate = isMobile ? "Intermediate Division - Mid-Tier Division" : "Mid-Tier Division";
    const pub = isMobile ? "Public Division - Open Division": "Open Division";

    return (
        <div className="standardContainer">
            <HeaderImage title={"SCL Leagues"} imageClass={"nonVerifiedPage"} />

            <div className="eventBannerContainer">
                <HostBanner>
                    <HostBanner.Title path={"/games/CS2/leagues/scl-leagues/challenger"}>Challenger Division</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/CS2/leagues/scl-leagues/challenger"} 
                        imgUrl={"https://i.imgur.com/b6fSddr.png"} 
                        alt={"SCL League"}
                        verified={false}
                    />
                    <HostBanner.Region>{challenger}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/CS2/leagues/scl-leagues/challenger"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/CS2/leagues/scl-leagues/masters"}>Masters Division</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/CS2/leagues/scl-leagues/masters"} 
                        imgUrl={"https://i.imgur.com/b6fSddr.png"} 
                        alt={"SCL League"}
                        verified={false}
                    />
                    <HostBanner.Region>{masters}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/CS2/leagues/scl-leagues/masters"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/CS2/leagues/scl-leagues/intermediate"}>Intermediate Division</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/CS2/leagues/scl-leagues/intermediate"} 
                        imgUrl={"https://i.imgur.com/b6fSddr.png"} 
                        alt={"SCL League"}
                        verified={false}
                    />
                    <HostBanner.Region>{intermediate}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/CS2/leagues/scl-leagues/intermediate"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/CS2/leagues/scl-leagues/public"}>Public Division</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/CS2/leagues/scl-leagues/public"} 
                        imgUrl={"https://i.imgur.com/b6fSddr.png"} 
                        alt={"SCL League"}
                        verified={false}
                    />
                    <HostBanner.Region>{pub}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/CS2/leagues/scl-leagues/public"} />
                </HostBanner>

                <div className="hrEvents" />
            </div>
        </div>
    );
}
