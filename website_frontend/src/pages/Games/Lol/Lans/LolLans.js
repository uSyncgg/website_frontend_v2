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
                    <HostBanner.Title path={"/lans/lakewood-league-xii-spring"}>Lakewood League XII Spring</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/lans/lakewood-league-xii-spring"} 
                        imgUrl={"https://i.imgur.com/IbpZc52.png"} 
                        alt={"Lakewood League XII Spring"}
                        verified={false}
                    />
                    <HostBanner.Region>Lakewood, CO</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/lans/lakewood-league-xii-spring"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/lans/volan-2026"}>Volan 2026</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/lans/volan-2026"} 
                        imgUrl={"https://i.imgur.com/SynVnAn.png"} 
                        alt={"Volan 2026"}
                        verified={false}
                    />
                    <HostBanner.Region>Knoxville, TN</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/lans/volan-2026"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/lans/macs-spring-2026"}>MACS Spring 2026</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/lans/macs-spring-2026"} 
                        imgUrl={"https://i.imgur.com/4bddM3N.png"} 
                        alt={"MACS Spring 2026"}
                        verified={false}
                    />
                    <HostBanner.Region>Philadelphia, PA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/lans/macs-spring-2026"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/lans/rmcs-spring-2026"}>RMCS Spring 2026</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/lans/rmcs-spring-2026"}
                        imgUrl={"https://i.imgur.com/WaNJjN7.png"} 
                        alt={"RMCS Spring 2026"}
                        verified={false}
                    />
                    <HostBanner.Region>Lakewood, CO</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/lans/rmcs-spring-2026"} />
                </HostBanner>
                <div className="hrEvents" />
            </div> 
        </div>
    );
}
