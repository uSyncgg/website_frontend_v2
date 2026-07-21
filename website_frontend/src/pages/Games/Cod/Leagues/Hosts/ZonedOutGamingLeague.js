import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const ZonedOutGamingLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"Zoned Out League - Call of Duty"}
                description="Zoned Out Call of Duty league. Multiple different skill divisions hosted during nearly every season of the year."
                canonicalPath={"/games/call-of-duty/leagues/zoned-out"}
            />
            <HeaderImage title={"Zoned Out League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Multiple Seasons per Year"]} regionTitle={"Region/Type"} regionInfoList={["4v4 - NA"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["$3,750 Prize Pool Across All Divisions", "Multiple Skill Divisions", "Live Streamed Matches"]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Elite Division - $100 per Team", "Master Division - $60 per Team", "Open Division - $40 per Team"]} footer={<ExternalButton host={"Zoned Out League"} blank={true} title={"Join Now"} path={"https://zonedoutgaming.com/leagues/call-of-duty/"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/call-of-duty/leagues"} />
            </div>
        </div>
    );
}