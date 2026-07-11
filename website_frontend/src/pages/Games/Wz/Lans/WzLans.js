<<<<<<< HEAD
import { SeoData, HostBanner, MapCoverGame, NoEvents, LanMap } from "components";
=======
import { SeoData, HostBanner, NoEvents, LanMap } from "components";
import { WZ_LAN_MARKERS } from 'data/lanMarkers';
>>>>>>> origin/main

export const WzLans = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Find Warzone LAN events near you. Browse in-person Call of Duty Warzone LAN tournaments and events happening across North America and beyond."
                canonicalPath={"/games/warzone/lans"}
            />
            <div className="lanMapContainer">
<<<<<<< HEAD
                <LanMap markers={[]} game="Warzone" />

                <MapCoverGame game={"Warzone"} />
=======
                <LanMap markers={WZ_LAN_MARKERS} game="Warzone" />
>>>>>>> origin/main
            </div>

            <div className="eventBannerContainer">
                <div className="hrEvents" />

                {/* <HostBanner /> */}

                <NoEvents pageType={"LANs"} />

                <div className="hrEvents" />
            </div>
        </div>
    );
}
