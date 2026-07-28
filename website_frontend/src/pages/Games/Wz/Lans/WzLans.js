import { SeoData, HostBanner, NoEvents, LanMap } from "components";
import { WZ_LAN_MARKERS } from 'data/lanMarkers';
import '../../EventBanners.css';

export const WzLans = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"Warzone LANs"}
                description="Find Warzone LAN events near you. Browse in-person Call of Duty Warzone LAN tournaments and events happening across North America and beyond."
                canonicalPath={"/games/warzone/lans"}
            />

            <div className="lanMapContainer">
                <LanMap markers={WZ_LAN_MARKERS} game="Warzone" />
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
