import { EventInfoCard, HeaderImage, ExternalButton } from "components";
import '../../../EventInformation.css';

export const AirforceGamingLeague = () => {
    return (
        <div className="standardContainer">
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
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://airforcegaming.com/dafgl"} />
            </div>
        </div>
    );
}
