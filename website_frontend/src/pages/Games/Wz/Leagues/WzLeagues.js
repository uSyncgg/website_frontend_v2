import { SeoData, HeaderImage, HostBanner, NoEvents } from "components";

export const WzLeagues = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Find Warzone leagues. Browse competitive Call of Duty Warzone league opportunities for players looking to compete in organized team play."
                canonicalPath={"/games/warzone/leagues"}
            />
            <HeaderImage title={"Warzone Leagues"} imageClass={"wzLeaguePage"} />

            <div className="eventBannerContainer">
                <div className="hrEvents" />

                <NoEvents pageType={"Leagues"} />

                <div className="hrEvents" />
            </div>
        </div>
    );
}
