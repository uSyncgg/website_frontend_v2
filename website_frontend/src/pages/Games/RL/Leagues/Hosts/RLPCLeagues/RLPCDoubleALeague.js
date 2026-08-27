import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton, VerifiedText } from "components";
import '../../../../EventInformation.css';

export const RLPCDoubleALeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"RLPC AA League - Rocket League"}
                description="RLPC Double A League for Rocket League players with 1350 - 1574 MMR. A free draft based 3v3 North American league. Three seasons per year."
                canonicalPath={"/games/RocketLeague/leagues/rlpc-leagues/aa"}
            />
            <HeaderImage title={"RLPC AA League"} imageClass={"rlpcRLLeagues"} />

            <div className="verifiedContainer">
                <VerifiedText />
            </div>

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring, Summer, and Winter"]} regionTitle={"Region/Type"} regionInfoList={["3v3 - NA"]} />
                </div>
 
                <div>
                    <EventInfoCard title={"Details"} infoList={["No Prize Pool", "Must Sign up Solo", "Draft Based League", "Live Streamed Matches", "Support on Discord", "Must sign 1 - 3 Season Contact"]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry", "1350 - 1574 MMR"]} footer={<ExternalButton host={"RLPC AA League"} blank={true} title={"Join Now"} path={"https://linktr.ee/officialrlpc"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/RocketLeague/leagues/rlpc-leagues"} />
            </div>
        </div>
    );
}
