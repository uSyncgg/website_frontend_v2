import { EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const EsportsCompanyLeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"The Esports Company"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring and Fall Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Pennsylvania High Schools Only", "Championship on LAN", "School Manager Must Sign Team Up", "Live Streamed Matches"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - USA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Contact for Quote - Must be a High School Student"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://theesportcompany.com/"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/Valorant/leagues"} />
            </div>
        </div>
    );
}
