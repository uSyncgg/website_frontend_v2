import { SeoData, HeaderImage, HostBanner, NoEvents } from "components";
import '../../EventBanners.css';

export const WzLeagues = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"Warzone Leagues"}
                description="Find Warzone leagues. Browse competitive Call of Duty Warzone league opportunities for players looking to compete in organized team play."
                canonicalPath={"/games/warzone/leagues"}
            />
            <HeaderImage title={"Warzone Leagues"} imageClass={"wzLeaguePage"} />

            <div className="eventBannerContainer">
                <NoEvents pageType={"Leagues"} />
            </div>
        </div>
    );
}
