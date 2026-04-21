import { SeoData, HostBanner, MapCoverGame } from "components";

export const CodLans = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Call of Duty LAN tournaments near you. Find the closest Call of Duty LANs to where you live and work. Every LAN going on near you."
                canonicalPath={"/games/call-of-duty/lans"}
            />
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
