import { SeoData, HostBanner, MapCoverGame, NoEvents, LanMap } from "components";

const HALO_LAN_MARKERS = [
    { lat: 35.7735601, lng: -78.6408138,  name: "Game And Geek Expo 2026",         link: "/lans/game-and-geek-2026", game: 'Halo' },
    { lat: 33.8847879, lng: -84.4649911,  name: "Southern-Fried Gaming Expo 2026", link: "/lans/sfge-2026",          game: 'Halo' },
    { lat: 39.6829806, lng: -105.0793028, name: "Citadel I",                        link: "/lans/citadel-i",          game: 'Halo' },
];

export const HaloLans = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Halo LAN tournaments near you and across the world. Find the closest Halo LAN to you today."
                canonicalPath={"/games/halo/lans"}
            />
            <div className="lanMapContainer">
                <LanMap markers={HALO_LAN_MARKERS} game="Halo" />

                <MapCoverGame game={"Halo"} />
            </div>

            <div className="eventBannerContainer">
                <div className="hrEvents" />

                {/* <NoEvents pageType={"LANs"} /> */}

                <HostBanner>
                    <HostBanner.Title path={"/lans/game-and-geek-2026"}>Game And Geek Expo 2026</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/lans/game-and-geek-2026"} 
                        imgUrl={"https://i.imgur.com/pR1izqw.png"} 
                        alt={"Game And Geek Expo 2026"}
                        verified={false}
                    />
                    <HostBanner.Region>Raleigh, NC</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/lans/game-and-geek-2026"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/lans/sfge-2026"}>Southern-Fried Gaming Expo 2026</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/lans/sfge-2026"} 
                        imgUrl={"https://i.imgur.com/1UtSmN5.png"} 
                        alt={"Southern-Fried Gaming Expo 2026"}
                        verified={false}
                    />
                    <HostBanner.Region>Atlanta, GA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/lans/sfge-2026"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/lans/citadel-i"}>Citadel I</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/lans/citadel-i"} 
                        imgUrl={"https://i.imgur.com/NXXgHBk.png"} 
                        alt={"Citadel I"}
                        verified={false}
                    />
                    <HostBanner.Region>Lakewood, CO</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/lans/citadel-i"} />
                </HostBanner>

                <div className="hrEvents" />
            </div>
        </div>
    );
}
