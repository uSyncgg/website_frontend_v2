import { EventInfoCard, HeaderImage, ExternalButton } from "components";
import '../../../EventInformation.css';

export const CollegeCodLeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"College COD League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Early Spring Season"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Prize Pool TBD", "Highly Competitive", "Live Streamed Matches", "Live Support Admins on Discord", "Scholarship Players Allowed"]} regionTitle={"Region/Type"} regionInfoList={["4v4 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["$200 - $350 per Team (Estimated)", "Must be a FULL TIME College Student"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://collegecod.com/"} />
            </div>
        </div>
    );
}