import { SeoData, HostBanner, MapCoverGame, LanMap } from "components";

const CONVENTION_MARKERS = [
    { lat: 37.5450707, lng: -77.4368334,  name: "ImmerseCon 2026",         link: "/lans/immersecon-2026",         game: 'Conventions' },
    { lat: 29.7519972, lng: -95.3573069,  name: "Dream Con 2026",           link: "/lans/dreamcon2026",            game: 'Conventions' },
    { lat: 39.9940217, lng: -83.0062971,  name: "GA:CS Operation Heatwave", link: "/lans/gacs-operation-heatwave", game: 'Conventions' },
    { lat: 39.9597244, lng: -75.16156,    name: "The Retake",               link: "/lans/the-retake",              game: 'Conventions' },
    { lat: 39.6829806, lng: -105.0793028, name: "Hellcase CS2 LAN 2026",    link: "/lans/hellcase-cs2-2026",       game: 'Conventions' },
];
export const Conventions = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Find esports LAN conventions and in-person gaming events. Browse gaming conventions and multi-game LAN events happening across the country."
                canonicalPath={"/lans"}
            />
            <div className="lanMapContainer">
                <LanMap markers={CONVENTION_MARKERS} game="Conventions" />

                <MapCoverGame />
            </div>

            <div className="eventBannerContainer">
                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/lans/immersecon-2026"}>ImmerseCon 2026</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/lans/immersecon-2026"} 
                        imgUrl={"https://i.imgur.com/fwRdpTT.png"} 
                        alt={"ImmerseCon 2026"}
                        verified={false}
                    />
                    <HostBanner.Region>Richmond, VA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/lans/immersecon-2026"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/lans/dreamcon2026"}>Dream Con 2026</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/lans/dreamcon2026"} 
                        imgUrl={"https://i.imgur.com/RLe3gpp.png"} 
                        alt={"Dream Con 2026"}
                        verified={false}
                    />
                    <HostBanner.Region>Houston, TX</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/lans/dreamcon2026"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/lans/gacs-operation-heatwave"}>GA:CS Operation Heatwave</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/lans/gacs-operation-heatwave"} 
                        imgUrl={"https://i.imgur.com/wgR4yga.png"} 
                        alt={"GA:CS Operation Heatwave"}
                        verified={false}
                    />
                    <HostBanner.Region>Columbus, OH</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/lans/gacs-operation-heatwave"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/lans/the-retake"}>The Retake</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/lans/the-retake"} 
                        imgUrl={"https://i.imgur.com/sCivztU.png"} 
                        alt={"The Retake"}
                        verified={false}
                    />
                    <HostBanner.Region>Philadelphia, PA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/lans/the-retake"} />
                </HostBanner>
                
                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/lans/hellcase-cs2-2026"}>Hellcase CS2 LAN 2026</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/lans/hellcase-cs2-2026"} 
                        imgUrl={"https://i.imgur.com/3vI1PAe.png"} 
                        alt={"Hellcase CS2 LAN 2026"}
                        verified={false}
                    />
                    <HostBanner.Region>Lakewood, CO</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/lans/hellcase-cs2-2026"} />
                </HostBanner>

                <div className="hrEvents" />
            </div>
        </div>
    );
}
