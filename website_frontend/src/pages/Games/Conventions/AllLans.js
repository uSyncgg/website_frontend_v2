import { MapCoverGame } from "components"

export const AllLans = () => {
    return (
        <div className="standardContainer">
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
