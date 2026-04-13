import { EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../../EventInformation.css';

export const MetaShiftPlatinumLeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"MetaShift Platinum League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring, Summer, and Fall Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["$360 Prize Pool (Estimated)", "8 Teams Max", "Live Streamed Matches"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["$60 per Team (Estimated)", "Tier 5", "See Website for Tier Check"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://discord.com/invite/RtJa6kY"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/LoL/leagues/meta-shift-leagues"} />
            </div>
        </div>
    );
}
