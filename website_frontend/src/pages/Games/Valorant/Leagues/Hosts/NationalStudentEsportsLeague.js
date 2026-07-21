import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const NationalStudentEsportsLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"NSE League - Valorant"}
                description="National Student Esports Valorant UK university league. £1,000 prize pool with 3 divisions. Women only and open leagues with LAN finals and live streamed matches."
                canonicalPath={"/games/Valorant/leagues/nse"}
            />
            <HeaderImage title={"NSE League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring, Summer, Fall, and Winter Seasons"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - UK"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["£1,000 Total Prize Pool (Estimated)", "3 Divisions, Move Up Divisions Based on Placing", "3 Week Regular Season", "4 Week Playoffs and Swiss", "Women Only League and an Open League", "LAN Finals", "Live Streamed Matches"]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Entry Fee TBD - Must be Attending University"]} footer={<ExternalButton blank={true} title={"Join Now"} path={"https://www.nse.gg/events/"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/Valorant/leagues"} />
            </div>
        </div>
    );
}
