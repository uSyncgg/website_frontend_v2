import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton, VerifiedText } from "components";
import '../../../../EventInformation.css';

export const RLPCSingleALeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="RLPC Single A League for Rocket League players with 1021 - 1349 MMR. A verified free to enter draft based 3v3 league with three seasons per year."
                canonicalPath={"/games/RocketLeague/leagues/rlpc-leagues/a"}
            />
            <HeaderImage imageClass={"rlpcRLLeagues"} />

            <div className="verifiedContainer">
                <VerifiedText />
            </div>

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring, Summer, and Winter Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["No Prize Pool", "Must Sign up Solo", "Draft Based League", "Live Streamed Matches", "Support on Discord", "Must Sign 1 - 3 Season Contract"]} regionTitle={"Region/Type"} regionInfoList={["3v3 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry", "1021 - 1349 MMR"]} />
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
