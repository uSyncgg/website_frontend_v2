import { HostBanner, MapCoverGame } from "components";

export const CodLans = () => {
    return (
        <div className="standardContainer">
            <div className="lanMapContainer">
                <iframe 
                    title="Call of Duty LAN Map" 
                    id="map" 
                    className="lanMap"
                    src="https://www.google.com/maps/d/u/2/embed?mid=1GEf0IzpwDFmiA-Snc7WsoH_nbqPvNhU&ehbc=2E312F"
                />

                <MapCoverGame game={"CoD"} />
            </div>

            <div className="eventBannerContainer">
                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/lans/charleston-crown-series"}>Charleston Crown Series</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/lans/charleston-crown-series"} 
                        imgUrl={"https://i.imgur.com/xJuJq6u.png"} 
                        alt={"Charleston Crown Series LAN"}
                        verified={true}
                    />
                    <HostBanner.Button title={"More Info"} path={"/lans/charleston-crown-series"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/lans/shintogc-major-iii-2026"}>ShintoGC Major III</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/lans/shintogc-major-iii-2026"} 
                        imgUrl={"https://i.imgur.com/t4k8Qi6.png"} 
                        alt={"ShintoGC Major III LAN"}
                        verified={false}
                    />
                    <HostBanner.Button title={"More Info"} path={"/lans/shintogc-major-iii-2026"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/lans/g-site-bo7"}>G-SITE BO7</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/lans/g-site-bo7"} 
                        imgUrl={"https://i.imgur.com/ZAeuKjU.png"} 
                        alt={"G-SITE BO7 LAN"}
                        verified={false}
                    />
                    <HostBanner.Button title={"More Info"} path={"/lans/g-site-bo7"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/lans/tomorrowlan_2026"}>TomorrowLAN 2026</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/lans/tomorrowlan_2026"} 
                        imgUrl={"https://i.imgur.com/clcdX48.png"} 
                        alt={"TomorrowLAN 2026"}
                        verified={false}
                    />
                    <HostBanner.Button title={"More Info"} path={"/lans/tomorrowlan_2026"} />
                </HostBanner>

                <div className="hrEvents" />
            </div>
        </div>
    );
}
