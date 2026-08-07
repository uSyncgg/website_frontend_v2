import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton, VerifiedText } from "components";
import '../../../../EventInformation.css';

export const RLPCTripleALeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"RLPC AAA League - Rocket League"}
                description="RLPC Triple A League for Rocket League players with 1575 - 1799 MMR. Draft based 3v3 NA league. Sign up solo and get drafted to a team."
                canonicalPath={"/games/RocketLeague/leagues/rlpc-leagues/aaa"}
            />
            <HeaderImage title={"RLPC AAA League"} imageClass={"rlpcRLLeagues"} />

            <div className="verifiedContainer">
                <VerifiedText />
            </div>

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring, Summer, and Winter Seasons"]} regionTitle={"Region/Type"} regionInfoList={["3v3 - NA"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["No Prize Pool", "Must Sign up Solo", "Draft Based League", "Live Streamed Matches", "Live Support on Discord", "Must Sign 1 - 3 Season Contract"]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry", "1575 - 1799 MMR"]} footer={<ExternalButton host={"RLPC AAA League"} blank={true} title={"Join Now"} path={"https://linktr.ee/officialrlpc"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/RocketLeague/leagues/rlpc-leagues"} />
            </div>
        </div>
    );
}
