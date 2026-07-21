import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../../EventInformation.css';

export const CollegeXPVarsityLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"CXP Varsity - Call of Duty"}
                description="Scholarship Call of Duty players looking to make money. Pre season tournaments for seeding on a national scale."
                canonicalPath={"/games/call-of-duty/leagues/cxp-leagues/cxp-varsity"}
            />
            <HeaderImage title={"CXP Varsity"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring and Fall Seasons"]} regionTitle={"Region/Type"} regionInfoList={["4v4 - NA"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["High Level Scholarship Players", "Prize Pool: $75% Varsity Entry Fee", "Varsity players must have the ability to compete from school facility", "Pre-Season and In-Season Tournaments", "Region/Conference Based Regular Season", "Live Streamed Matches", "Double Elimination Playoff Bracket"]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["$240 per Team", "$275 Late Entry per Team"]} footer={<ExternalButton blank={true} title={"Join Now"} path={"https://x.com/CXPCoD"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/call-of-duty/leagues/cxp-leagues"} />
            </div>
        </div>
    );
}