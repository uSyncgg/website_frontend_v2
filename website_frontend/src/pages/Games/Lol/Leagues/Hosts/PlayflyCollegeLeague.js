import { EventInfoCard, HeaderImage, ExternalButton } from "components";
import '../../../EventInformation.css';

export const PlayflyCollegeLeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage imageClass={"playflyPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring and Fall Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["$280k Prize Pool Split Across All Titles and Division", "Highly Competitive", "Multiple Tiers for Each Division", "Live Streamed Matches", "Live Support on Discord"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Must be a FULL TIME College Student", "$1,000 for Full Year", "$625 for Half Year", "Free Entry - Open Division"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://playflycollege.gg/pages/playfly-college-esports"} />
            </div>
        </div>
    );
}
