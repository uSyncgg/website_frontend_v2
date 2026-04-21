import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const XPLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="XP League - the amateur Call of Duty league that feels like the professional league. Win the championship for a cash prize pool."
                canonicalPath={"/games/call-of-duty/leagues/xp-league-cod"}
            />
            <HeaderImage title={"XP League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring, Summer, and Fall Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["£/$4,500 Prize Pool with Immediate Payouts", "NA and EU Legaues", "Multiple Divisions - 100+ Teams", "No CDL or Top 50 NA Pro Point Players", "Quick Responses / Reliable Format", "Live Streamed Matches at a High Level"]} regionTitle={"Region/Type"} regionInfoList={["4v4 - NA/EU"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["£/$50 per Team"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://x.com/XP_Leagues?s=20"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/call-of-duty/leagues"} />
            </div>
        </div>
    );
}