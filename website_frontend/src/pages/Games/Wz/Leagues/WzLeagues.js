import { HeaderImage, HostBanner, NoEvents } from "components";

export const WzLeagues = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"Warzone Leagues"} imageClass={"wzLeaguePage"} />

            <div className="eventBannerContainer">
                <div className="hrEvents" />

                <NoEvents pageType={"Leagues"} />

                <div className="hrEvents" />
            </div>
        </div>
    );
}
