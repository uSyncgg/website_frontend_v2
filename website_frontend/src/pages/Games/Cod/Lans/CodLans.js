import { SeoData, HostBanner, MapCoverGame, NoEvents, LanMap } from "components";

const COD_LAN_MARKERS = [
    { lat: 37.545672,  lng: -77.4363207, name: "RVA Esports Championship", link: "/lans/rva-esports-championship-2026", game: 'CoD' },
    { lat: 30.0990662, lng: -81.5229898, name: "EWGL 3",                   link: "/lans/ewgl3",                        game: 'CoD' },
    { lat: 39.9940032, lng: -83.0060542, name: "Shinto Champs",            link: "/lans/shintochamps2026",             game: 'CoD' },
];

export const CodLans = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Call of Duty LAN tournaments near you. Find the closest Call of Duty LANs to where you live and work. Every LAN going on near you."
                canonicalPath={"/games/call-of-duty/lans"}
            />
            <div className="lanMapContainer">
                <LanMap markers={COD_LAN_MARKERS} game="CoD" />

                <MapCoverGame game={"CoD"} />
            </div>

            <div className="eventBannerContainer">

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/lans/rva-esports-championship-2026"}>RVA Esports Championship 2026</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/lans/rva-esports-championship-2026"} 
                        imgUrl={"https://i.imgur.com/88QABxG.png"} 
                        alt={"RVA Esports Championship 2026"}
                        verified={false}
                    />
                    <HostBanner.Region>Richmond, VA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/lans/rva-esports-championship-2026"} />
                </HostBanner>

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

                <div className="hrEvents" />

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

            </div>
        </div>
    );
}
