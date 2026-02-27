import { HostBanner, MapCoverGame } from "components";
export const Conventions = () => {
    return (
        <div className="standardContainer">
            <div className="lanMapContainer">
                <iframe 
                    title="LAN Map" 
                    id="map" 
                    className="lanMap"
                    src="https://www.google.com/maps/d/u/2/embed?mid=14BPiOYVAOTLrIFgUNrLdViUMRoypuU4&ehbc=2E312F"
                />

                <MapCoverGame />
            </div>

            <div className="eventBannerContainer">
                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/lans/dreamhack-birmingham"}>DreamHack Birmingham</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/lans/dreamhack-birmingham"} 
                        imgUrl={"https://i.imgur.com/6mNKaHp.png"} 
                        alt={"DreamHack Birmingham LAN"}
                        verified={false}
                    />
                    <HostBanner.Button title={"More Info"} path={"/lans/dreamhack-birmingham"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/lans/fortlan-spring-2026"}>FortLAN Spring 2026</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/lans/fortlan-spring-2026"} 
                        imgUrl={"https://i.imgur.com/W1iIUMc.png"} 
                        alt={"FortLAN Spring 2026"}
                        verified={false}
                    />
                    <HostBanner.Button title={"More Info"} path={"/lans/fortlan-spring-2026"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/lans/low-ping-lan-2026"}>Low Ping LAN</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/lans/low-ping-lan-2026"} 
                        imgUrl={"https://i.imgur.com/xzN1wAG.png"} 
                        alt={"Low Ping LAN"}
                        verified={false}
                    />
                    <HostBanner.Button title={"More Info"} path={"/lans/low-ping-lan-2026"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/lans/tomorrownlan_2026"}>TomorrowLAN 2026</HostBanner.Title>
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
