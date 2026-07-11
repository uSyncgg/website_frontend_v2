import { SeoData, MapCoverGame, LanMap } from "components";
import { ALL_LAN_MARKERS } from 'data/lanMarkers';

export const AllLans = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Find all esports LAN events across every game title on an interactive map. Browse upcoming in-person gaming tournaments and LAN parties near you."
                canonicalPath={"/lans/all"}
            />
            <div className="lanMapContainer">
                <LanMap markers={ALL_LAN_MARKERS} showAllGames={true} />

                <MapCoverGame />
            </div>
        </div>
    )
}
