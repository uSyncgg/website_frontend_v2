import { EventInfoCard, HeaderImage, ExternalButton } from "components";
import '../../../EventInformation.css';

export const CollegeCarballAssociationLeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage imageClass={"ccaPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring, Summer, and Fall Season"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["5 Week Regular Season with Playoffs", "World Championship includes NA and EU", "Live Streamed Matches", "24/7 Support and Admins on Discord"]} regionTitle={"Region/Type"} regionInfoList={["3v3 - NA/EU"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Entry Fee TBD - Must be a FULL TIME College Student"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://discord.gg/cca"} />
            </div>
        </div>
    );
}
