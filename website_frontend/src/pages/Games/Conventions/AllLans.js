import { SeoData, MapCoverGame } from "components"

export const AllLans = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Find all esports LAN events across every game title on an interactive map. Browse upcoming in-person gaming tournaments and LAN parties near you."
                canonicalPath={"/lans/all"}
            />
            <div className="lanMapContainer">
                <iframe 
                    title="LAN Map"  
                    id="map" 
                    className={"allLansMap"}
                    src="https://www.google.com/maps/d/u/2/embed?mid=1QrCfeXFSyZJMXLzUeAiIWy0hcWgaJVg&ehbc=2E312F"
                />

                <MapCoverGame />
            </div>
        </div>
    )
}
