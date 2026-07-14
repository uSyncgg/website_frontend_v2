import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const EsportsCompanyLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="The Esports Company Valorant high school league for Pennsylvania schools. LAN championship with live streamed matches. School manager must sign up team."
                canonicalPath={"/games/Valorant/leagues/tec"}
            />
            <HeaderImage title={"The Esports Company"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring and Fall Seasons"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - USA"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Pennsylvania High Schools Only", "Championship on LAN", "School Manager Must Sign Team Up", "Live Streamed Matches"]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Contact for Quote - Must be a High School Student"]} footer={<ExternalButton blank={true} title={"Join Now"} path={"https://theesportcompany.com/"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/Valorant/leagues"} />
            </div>
        </div>
    );
}
