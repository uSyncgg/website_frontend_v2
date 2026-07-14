import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const CollegeCodLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="College Call of Duty League (CCL) with a $40k prize pool. The #1 Call of Duty college league with professional players."
                canonicalPath={"/games/call-of-duty/leagues/ccl-league"}
            />
            <HeaderImage title={"College COD League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Early Spring Season"]} regionTitle={"Region/Type"} regionInfoList={["4v4 - NA"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Prize Pool TBD", "Highly Competitive", "Live Streamed Matches", "Live Support Admins on Discord", "Scholarship Players Allowed"]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["$200 - $350 per Team (Estimated)", "Must be a FULL TIME College Student"]} footer={<ExternalButton blank={true} title={"Join Now"} path={"https://collegecod.com/"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/call-of-duty/leagues"} />
            </div>
        </div>
    );
}