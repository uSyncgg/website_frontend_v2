import { EventInfoCard, HeaderImage, ExternalButton } from "components";
import '../../../../EventInformation.css';

export const RLPCDoubleALeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage imageClass={"rlpcRLLeagues"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring, Summer, and Winter"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["No Prize Pool", "Must Sign up Solo", "Draft Based League", "Live Streamed Matches", "Support on Discord", "Must sign 1 - 3 Season Contact"]} regionTitle={"Region/Type"} regionInfoList={["3v3 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry", "1350 - 1574 MMR"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://linktr.ee/officialrlpc"} />
            </div>
        </div>
    );
}
