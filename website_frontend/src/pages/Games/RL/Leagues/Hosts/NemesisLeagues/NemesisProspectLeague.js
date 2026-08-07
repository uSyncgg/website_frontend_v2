import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton, VerifiedText } from "components";
import '../../../../EventInformation.css';

export const NemesisProspectLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"Nemesis Prospect - Rocket League"}
                description="Looking for a free to enter Rocket League league - look no further. Prospect league is a 1270 - 1452 MMR range based league that is entirely free."
                canonicalPath={"/games/RocketLeague/leagues/nemesis-leagues/prospect"}
            />
            <HeaderImage imageClass={"nemesisRLLeagues"} />

            <div className="verifiedContainer">
                <VerifiedText />
            </div>

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring Season"]} regionTitle={"Region/Type"} regionInfoList={["3v3 - NA"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["$1,000 Prize Pool (Estimated)", "4 Different Divisions", "18 Match Regular Season", "Draft Based League"]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry", "1415 - 1534 MMR"]} footer={<ExternalButton host={"Nemesis Prospect"} blank={true} title={"Join Now"} path={"https://discord.com/invite/nemesisrl"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/RocketLeague/leagues/nemesis-leagues"} />
            </div>
        </div>
    );
}
