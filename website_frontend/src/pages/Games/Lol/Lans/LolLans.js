import { HostBanner, MapCoverGame } from "components";

export const LolLans = () => {
    return (
        <div className="standardContainer">
            <div className="lanMapContainer">
                <iframe 
                    title="League of Legends LAN Map" 
                    id="map" 
                    className="lanMap"
                    src="https://www.google.com/maps/d/u/2/embed?mid=1CFHyDVMbDSwBAX2_cz3KqiCm0UY9aQQ&ehbc=2E312F"
                />

                <MapCoverGame game={"LoL"} />
            </div>

            <div className="eventBannerContainer">
                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/lans/heartland-2026"}>Heartland 2026</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/lans/heartland-2026"} 
                        imgUrl={"https://i.imgur.com/ZRcvLqn.png"} 
                        alt={"Heartland 2026"}
                        verified={false}
                    />
                    <HostBanner.Button title={"More Info"} path={"/lans/heartland-2026"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/lans/midwest-battleground-2026"}>Midwest Battleground 2026</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/lans/midwest-battleground-2026"} 
                        imgUrl={"https://i.imgur.com/jCZV5y1.png"} 
                        alt={"Midwest Battleground 2026"}
                        verified={false}
                    />
                    <HostBanner.Button title={"More Info"} path={"/lans/midwest-battleground-2026"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/lans/tomorrowlan-2026"}>TomorrowLAN 2026</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/lans/tomorrowlan-2026"} 
                        imgUrl={"https://i.imgur.com/clcdX48.png"} 
                        alt={"TomorrowLAN 2026"}
                        verified={false}
                    />
                    <HostBanner.Button title={"More Info"} path={"/lans/tomorrowlan-2026"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/lans/gatorlan-spring-2026"}>GatorLAN Spring 2026</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/lans/gatorlan-spring-2026"} 
                        imgUrl={"https://i.imgur.com/Ibby6Qe.png"} 
                        alt={"GatorLAN Spring 2026"}
                        verified={false}
                    />
                    <HostBanner.Button title={"More Info"} path={"/lans/gatorlan-spring-2026"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/lans/volan-2026"}>Volan 2026</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/lans/volan-2026"} 
                        imgUrl={"https://i.imgur.com/SynVnAn.png"} 
                        alt={"Volan 2026"}
                        verified={false}
                    />
                    <HostBanner.Button title={"More Info"} path={"/lans/volan-2026"} />
                </HostBanner>

                <div className="hrEvents" />
            </div> 
        </div>
    );
}
