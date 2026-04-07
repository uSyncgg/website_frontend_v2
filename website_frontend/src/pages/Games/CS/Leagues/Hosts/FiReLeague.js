import { EventInfoCard, HeaderImage, ExternalButton } from "components";
import '../../../EventInformation.css';

export const FiReLeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"FiRe League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Qualifiers / Leagues Year Round"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Various Prize Pools", "Invitational Tournaments", "Qualifiers Pre Season", "Based in Buenos Aires", "Live Streamed Matches", "Highly Competitive"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - NA, SA, and EU"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Variable Cost Based on Event"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://x.com/FiReSPORTSgg"} />
            </div>
        </div>
    );
}