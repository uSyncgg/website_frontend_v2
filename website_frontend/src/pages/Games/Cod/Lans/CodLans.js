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
                    <HostBanner.Region>Charleston, SC</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/lans/charleston-crown-series"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/lans/lowtier-major-iv"}>Lowtier Major IV</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/lans/lowtier-major-iv"} 
                        imgUrl={"https://i.imgur.com/t4k8Qi6.png"} 
                        alt={"Lowtier Major IV"}
                        verified={false}
                    />
                    <HostBanner.Region>Knoxville, TN</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/lans/lowtier-major-iv"} />
                </HostBanner>

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
                <div className="hrEvents" />
            </div>
        </div>
    );
}
