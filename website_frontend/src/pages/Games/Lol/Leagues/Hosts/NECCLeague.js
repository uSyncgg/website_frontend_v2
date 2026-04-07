import { EventInfoCard, HeaderImage, ExternalButton } from "components";
import '../../../EventInformation.css';

export const NECCLeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"NECC League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring and Fall Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["$6k Prize Pool", "Highly Competitive", "Live Streamed Matches", "Support on Discord"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["$1,500/yr - Unlimited Game Title Participation", "$800/yr - One Game Title Participation", "Must be a FULL TIME College Student and ACADEMICALLY ELIGIBLE"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://necc.gg/"} />
            </div>
        </div>
    );
}
