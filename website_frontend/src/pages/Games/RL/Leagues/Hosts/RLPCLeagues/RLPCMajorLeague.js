import { EventInfoCard, HeaderImage, ExternalButton } from "components";
import '../../../../EventInformation.css';

export const RLPCMajorLeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage imageClass={"rlpcRLLeagues"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring, Summer, and Winter Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Prize Pool Based on Donations", "Must Sign 1 - 3 Season Contract", "Build Your Own Team", "Live Streamed Matches", "Live Support on Discord"]} regionTitle={"Region/Type"} regionInfoList={["3v3 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry", "1800+ MMR"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://linktr.ee/officialrlpc"} />
            </div>
        </div>
    );
}
