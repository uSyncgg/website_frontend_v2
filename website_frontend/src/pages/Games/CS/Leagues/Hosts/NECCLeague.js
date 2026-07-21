import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const NECCLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"NECC League - Counter-Strike"}
                description="NECC is the Counter-Strike 2 league for academically eligible college students. Play live streamed matches to viewers and prove yourself."
                canonicalPath={"/games/CS2/leagues/necc"}
            />
            <HeaderImage title={"NECC League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring and Fall Seasons"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - NA"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["$1,000 Prize Pool (Estimated)", "Multiple Skill Divisions", "6 Week Regular Season With Playoff Bracket After", "Live Streamed Matches", "Live Support on Discord"]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["$1,500/yr - Unlimited Game Title Participation", "$800/yr - One Game Title Participation", "Must be a FULL TIME College Student and ACADEMICALLY ELIGIBLE"]} footer={<ExternalButton blank={true} title={"Join Now"} path={"https://necc.gg/"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/CS2/leagues"} />
            </div>
        </div>
    );
}