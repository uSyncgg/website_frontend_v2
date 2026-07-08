import { SeoData, HostBanner, MapCoverGame, NoEvents, LanMap } from "components";

export const WzLans = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Find Warzone LAN events near you. Browse in-person Call of Duty Warzone LAN tournaments and events happening across North America and beyond."
                canonicalPath={"/games/warzone/lans"}
            />
            <div className="lanMapContainer">
                <LanMap markers={[]} game="Warzone" />

                <MapCoverGame game={"Warzone"} />
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
