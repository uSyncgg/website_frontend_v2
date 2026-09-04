import { useMemo } from "react";
import { SeoData, LanMap } from "components";
import { useAllLanEvents } from "hooks";
import { toLanMarkers } from 'data/lanMarkers';

export const AllLans = () => {
    const { data } = useAllLanEvents();

    const markers = useMemo(() => toLanMarkers(data), [data]);

    return (
        <div className="standardContainer">
            <SeoData
                title={"All LANs"}
                description="Find all esports LAN events across every game title on an interactive map. Browse upcoming in-person gaming tournaments and LAN parties near you."
                canonicalPath={"/lans/all"}
            />

            <div className="lanMapContainer">
                <LanMap markers={markers} showAllGames={true} />
            </div>
        </div>
    )
}
