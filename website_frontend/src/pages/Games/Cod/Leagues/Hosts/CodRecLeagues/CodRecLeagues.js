import { HeaderImage, HostBanner, BackButton, SeoData } from "components";
import { useCheckResize } from "hooks";
import '../../../../EventBanners.css';

export const CodRecLeagues = () => {
    const isMobile = useCheckResize();

    const premade = isMobile ? "Premade League - NA" : "NA";
    const mixed    = isMobile ? "Mixed League - NA"    : "NA";

    return (
        <div className="standardContainer">
            <SeoData
                title={"Rec Leagues - Call of Duty"}
                description={"Recreational Call of Duty league for players looking for a challenge. Play weekly matches based on your skill level."}
                canonicalPath={"/games/call-of-duty/leagues/cod-rec-leagues"}
            />

            <HeaderImage title={"College Rec League"} imageClass={"nonVerifiedPage"} />

            <div className="eventBannerContainer">
                <HostBanner>
                    <HostBanner.Title path={"/games/call-of-duty/leagues/cod-rec-league/cod-rec-premade-league"}>Premade League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/call-of-duty/leagues/cod-rec-league/cod-rec-premade-league"} 
                        imgUrl={"https://i.imgur.com/xLmOqds.png"} 
                        alt={"Cod Rec Premade League"}
                        verified={false}
                    />
                    <HostBanner.Region>{premade}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/call-of-duty/leagues/cod-rec-league/cod-rec-premade-league"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/call-of-duty/leagues/cod-rec-league/cod-rec-mixed-league"}>Mixed League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/call-of-duty/leagues/cod-rec-league/cod-rec-mixed-league"} 
                        imgUrl={"https://i.imgur.com/xLmOqds.png"} 
                        alt={"Cod Rec Mixed League"}
                        verified={false}
                    />
                    <HostBanner.Region>{mixed}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/call-of-duty/leagues/cod-rec-league/cod-rec-mixed-league"} />
                </HostBanner>

                <div className="hrEvents" />

                <div className="backButtonContainer">
                    <BackButton path={"/games/call-of-duty/leagues"} />
                </div>
            </div>
        </div>
    );
}
