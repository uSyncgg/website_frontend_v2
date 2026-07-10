import { SeoData, HostBanner, MapCoverGame, NoEvents } from "components";

export const HaloLans = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Halo LAN tournaments near you and across the world. Find the closest Halo LAN to you today."
                canonicalPath={"/games/halo/lans"}
            />
            <div className="lanMapContainer">
                <iframe 
                    title="Halo LAN Map" 
                    id="map" 
                    className="lanMap"
                    src="https://www.google.com/maps/d/u/2/embed?mid=1RWVPklwSmTd6iqaSgHP4LLh2WOd8Pt8&ehbc=2E312F"
                />

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
