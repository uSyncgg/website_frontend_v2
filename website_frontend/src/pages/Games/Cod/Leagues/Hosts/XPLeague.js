import { EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const XPLeague = () => {
    return (
        <div className="standardContainer">
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
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://x.com/XP_Leagues?s=20"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/call-of-duty/leagues"} />
            </div>
        </div>
    );
}