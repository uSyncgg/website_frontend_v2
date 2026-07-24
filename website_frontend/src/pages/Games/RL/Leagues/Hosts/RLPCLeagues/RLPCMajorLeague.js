import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton, VerifiedText } from "components";
import '../../../../EventInformation.css';

export const RLPCMajorLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"RLPC Major League - Rocket League"}
                description="RLPC Major League is for the best Rocket League players with 1800+ MMR. Three seasons per year with a prize pool based on donations."
                canonicalPath={"/games/RocketLeague/leagues/rlpc-leagues/major"}
            />
            <HeaderImage imageClass={"rlpcRLLeagues"} />

            <div className="verifiedContainer">
                <VerifiedText />
            </div>

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring, Summer, and Winter Seasons"]} regionTitle={"Region/Type"} regionInfoList={["3v3 - NA"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Prize Pool Based on Donations", "Must Sign 1 - 3 Season Contract", "Build Your Own Team", "Live Streamed Matches", "Live Support on Discord"]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry", "1800+ MMR"]} footer={<ExternalButton host={"RLPC Major League"} blank={true} title={"Join Now"} path={"https://linktr.ee/officialrlpc"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/RocketLeague/leagues/rlpc-leagues"} />
            </div>
        </div>
    );
}
