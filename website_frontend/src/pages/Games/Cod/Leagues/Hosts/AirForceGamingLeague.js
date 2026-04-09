import { EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const AirForceGamingLeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"Air Force Gaming League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring, Summer, and Fall Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Highly Competitive", "Pro & Casual Leagues (NA Only)", "Air Force & Space Force Associated Players ONLY", "Premade or Mixed Leagues", "Multiple Skill Divisions"]} regionTitle={"Region/Type"} regionInfoList={["4v4 - NA/EU/APAC"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://airforcegaming.com/dafgl"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/call-of-duty/leagues"} />
            </div>
        </div>
    );
}