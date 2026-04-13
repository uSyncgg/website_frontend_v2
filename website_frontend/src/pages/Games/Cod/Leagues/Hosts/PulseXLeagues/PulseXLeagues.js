import { HeaderImage, HostBanner, BackButton } from "components";
import { useCheckResize } from "hooks";

export const PulseXLeagues = () => {
    const isMobile = useCheckResize();

    const uppers = isMobile ? "Uppers Division - NA" : "NA";
    const lowers = isMobile ? "Lowers Division - NA" : "NA";
    const open = isMobile ? "Open Division - NA" : "NA";

    return (
        <div className="standardContainer">
            <HeaderImage title={"Pulse X Leagues"} imageClass={"nonVerifiedPage"} />

            <div className="eventBannerContainer">
                <HostBanner>
                    <HostBanner.Title path={"/games/call-of-duty/leagues/pulse-x-leagues/pulse-x-uppers"}>Uppers Division</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/call-of-duty/leagues/pulse-x-leagues/pulse-x-uppers"} 
                        imgUrl={"https://i.imgur.com/RHgIQV1.jpg"} 
                        alt={"Pulse X League"}
                        verified={false}
                    />
                    <HostBanner.Region>{uppers}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/call-of-duty/leagues/pulse-x-leagues/pulse-x-uppers"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/call-of-duty/leagues/pulse-x-leagues/pulse-x-lowers"}>Lowers Division</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/call-of-duty/leagues/pulse-x-leagues/pulse-x-lowers"} 
                        imgUrl={"https://i.imgur.com/RHgIQV1.jpg"} 
                        alt={"Pulse X League"}
                        verified={false}
                    />
                    <HostBanner.Region>{lowers}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/call-of-duty/leagues/pulse-x-leagues/pulse-x-lowers"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/call-of-duty/leagues/pulse-x-leagues/pulse-x-open"}>Open Division</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/call-of-duty/leagues/pulse-x-leagues/pulse-x-open"} 
                        imgUrl={"https://i.imgur.com/RHgIQV1.jpg"} 
                        alt={"Pulse X League"}
                        verified={false}
                    />
                    <HostBanner.Region>{open}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/call-of-duty/leagues/pulse-x-leagues/pulse-x-open"} />
                </HostBanner>

                <div className="hrEvents" />

                <div className="backButtonContainer">
                    <BackButton path={"/games/call-of-duty/leagues"} />
                </div>
            </div>
        </div>
    );
}
