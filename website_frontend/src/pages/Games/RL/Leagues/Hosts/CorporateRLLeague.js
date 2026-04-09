import { EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const CorporateRLLeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"Corporate Rocket League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual spring and Fall Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["$2,000 in Charity Donations, No Prize Pool (Estimated)", "Must Sign up with Company", "4 Different Divisions Based on Skill", "All matches are played each Saturday", "~8 Week Long Regular Season and Playoffs"]} regionTitle={"Region/Type"} regionInfoList={["3v3 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["$150 per Team"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://cea.gg/"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/RocketLeague/leagues"} />
            </div>
        </div>
    );
}
