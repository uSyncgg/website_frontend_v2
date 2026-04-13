import { EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const CollegeHaloLeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage imageClass={"ugcPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Fall and Spring Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["$2,500 Prize Pool (Estimated)", "Highly Competitive", "No Live Streamed Matches"]} regionTitle={"Region/Type"} regionInfoList={["4v4 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Must be a Full Time College Student", "Entry Fee TBD"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://discord.com/invite/CapnyyzMkJ"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/halo/leagues"} />
            </div>
        </div>
    );
}
