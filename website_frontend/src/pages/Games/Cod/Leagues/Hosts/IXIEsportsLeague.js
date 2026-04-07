import { EventInfoCard, HeaderImage, ExternalButton } from "components";
import '../../../EventInformation.css';

export const IXIEsportsLeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"IXI Esports"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Summer Season"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["$100 Prize Pool", "Highly Competitive", "Regular Season League Matches then Playoffs", "Free Monthly Tournaments", "8s Group", "Live Support and Admins"]} regionTitle={"Region/Type"} regionInfoList={["4v4 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry", "Free Agents Recruited by Teams or Create Team With 4+"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://discord.com/invite/qUQzHmQ3dZ"} />
            </div>
        </div>
    );
}