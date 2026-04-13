import { EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../../EventInformation.css';

export const RLPCTripleALeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage imageClass={"rlpcRLLeagues"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring, Summer, and Winter Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["No Prize Pool", "Must Sign up Solo", "Draft Based League", "Live Streamed Matches", "Live Support on Discord", "Must Sign 1 - 3 Season Contract"]} regionTitle={"Region/Type"} regionInfoList={["3v3 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry", "1575 - 1799 MMR"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://linktr.ee/officialrlpc"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/RocketLeague/leagues/rlpc-leagues"} />
            </div>
        </div>
    );
}
