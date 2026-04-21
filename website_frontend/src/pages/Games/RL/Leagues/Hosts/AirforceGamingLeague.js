import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const AirforceGamingLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Airforce Gaming Rocket League league. For Air Force and Space Force associated players only. Pro and casual divisions available for NA, EU, and APAC."
                canonicalPath={"/games/RocketLeague/leagues/airforce-gaming"}
            />
            <HeaderImage title={"Airforce Gaming League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual spring, Summer, and Fall Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Pro & Casual Leagues (NA Only)", "Air Force & Space Force Associated Players ONLY", "Highly Competitive"]} regionTitle={"Region/Type"} regionInfoList={["3v3 - NA/EU/APAC"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://airforcegaming.com/dafgl"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/RocketLeague/leagues"} />
            </div>
        </div>
    );
}
