import { EventInfoCard, HeaderImage, ExternalButton } from "components";
import '../../../EventInformation.css';

export const UnitedRogueLeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"United Rogue"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring and Fall Seasons (Estimated)"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["NO Prize Pool", "Draft League", "Franchises", "Live Streamed Matches"]} regionTitle={"Region/Type"} regionInfoList={["4v4 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry - Free Agent", "Must Fill out Intent Form"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://discord.com/invite/zenX8TcSdT"} />
            </div>
        </div>
    );
}