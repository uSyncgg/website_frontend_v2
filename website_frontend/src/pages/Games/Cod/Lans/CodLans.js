import { SeoData, HostBanner, NoEvents, LanMap } from "components";
import { COD_LAN_MARKERS } from 'data/lanMarkers';
import '../../EventBanners.css';

export const CodLans = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"Call of Duty LANs"}
                description="Call of Duty LAN tournaments near you. Find the closest Call of Duty LANs to where you live and work. Every LAN going on near you."
                canonicalPath={"/games/call-of-duty/lans"}
            />
            <div className="lanMapContainer">
                <LanMap markers={COD_LAN_MARKERS} game="CoD" />
            </div>

            <div className="eventBannerContainer">

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/lans/ewgl3"}>EWGL 3</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/lans/ewgl3"} 
                        imgUrl={"https://i.imgur.com/7o2e5a3.png"} 
                        alt={"EWGL 3"}
                        verified={false}
                    />
                    <HostBanner.Region>St Johns, FL</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/lans/ewgl3"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/lans/shintochamps2026"}>Shinto Champs</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/lans/shintochamps2026"} 
                        imgUrl={"https://i.imgur.com/0TKXrhh.png"} 
                        alt={"Shinto Champs"}
                        verified={false}
                    />
                    <HostBanner.Region>Columbus, OH</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/lans/shintochamps2026"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/lans/ga-cod-modern-warfare-4-launch-tournament"}>GA:CoD Modern Warfare 4 Launch Tournament</HostBanner.Title>
                    <HostBanner.Image
                        path={"/lans/ga-cod-modern-warfare-4-launch-tournament"}
                        imgUrl={"https://i.imgur.com/EWYDkHI.png"}
                        alt={"GA:CoD Modern Warfare 4 Launch Tournament"}
                        verified={false}
                    />
                    <HostBanner.Region>Columbus, OH</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/lans/ga-cod-modern-warfare-4-launch-tournament"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/lans/california-tier-list-lan"}>California Tier List LAN</HostBanner.Title>
                    <HostBanner.Image
                        path={"/lans/california-tier-list-lan"}
                        imgUrl={"https://i.imgur.com/1fHItii.png"}
                        alt={"California Tier List LAN"}
                        verified={false}
                    />
                    <HostBanner.Region>Lake Forest, CA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/lans/california-tier-list-lan"} />
                </HostBanner>

                <div className="hrEvents" />

            </div>
        </div>
    );
}
