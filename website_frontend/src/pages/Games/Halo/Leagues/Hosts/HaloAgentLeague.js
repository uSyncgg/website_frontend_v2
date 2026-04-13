import { EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const HaloAgentLeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"Halo Agent"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Randomly Hosted Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["$1,000 Prize Pool (Estimated)", "Highly Competitive", "Live Streamed Matches", "Live Support on Discord"]} regionTitle={"Region/Type"} regionInfoList={["4v4 - All Regions"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["TBD"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://twitter.com/TheHaloAgent"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/halo/leagues"} />
            </div>
        </div>
    );
}