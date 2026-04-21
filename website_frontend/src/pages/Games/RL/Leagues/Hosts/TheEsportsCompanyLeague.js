import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const TheEsportsCompanyLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="The Esports Company Rocket League high school league for Pennsylvania schools. 2 competitive divisions with a LAN championship. Live streamed matches."
                canonicalPath={"/games/RocketLeague/leagues/the-esports-company"}
            />
            <HeaderImage title={"The Esports Company"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring and Fall Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Pennsylvania High Schools Only", "Championship on LAN", "2 Competitive Divisions", "School Manager Must Sign up Team", "Live Streamed Matches"]} regionTitle={"Region/Type"} regionInfoList={["3v3 - USA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Contact for Quote - Must be a High School Student"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://theesportcompany.com/"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/RocketLeague/leagues"} />
            </div>
        </div>
    );
}
