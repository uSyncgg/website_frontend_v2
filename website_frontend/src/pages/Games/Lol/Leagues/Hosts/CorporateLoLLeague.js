import { EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const CorporateLoLLeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"Corporate LOL League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring and Fall Season"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["No Prize Pool", "Entry Fees Donated to Charity", "Non-Swiss Elimination Format", "Same Organization Co-Workers Only"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["$250 per Team"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://cea.gg/"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/LoL/leagues"} />
            </div>
        </div>
    );
}
