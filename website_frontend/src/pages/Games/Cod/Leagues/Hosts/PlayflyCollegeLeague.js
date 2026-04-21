import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const PlayflyCollegeLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Massive $280k prize pool for college Call of Duty league Playfly. Full time college students playing to earn scholarships."
                canonicalPath={"/games/call-of-duty/leagues/playfly-cod-league"}
            />
            <HeaderImage title={"Playfly COD League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring and Fall Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["$280k Prize Pool Split Across All Titles and Divisions", "Highly Competitive", "Multiple Tiers for Each Division", "Live Streamed Matches", "Live Support Admins on Discord", "Scholarship Players Allowed"]} regionTitle={"Region/Type"} regionInfoList={["4v4 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Must be a FULL TIME College Student", "$1,000 for Full Year", "$625 for Half Year", "Free Entry - Open Division"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://playflycollege.gg/pages/playfly-college-esports"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/call-of-duty/leagues"} />
            </div>
        </div>
    );
}