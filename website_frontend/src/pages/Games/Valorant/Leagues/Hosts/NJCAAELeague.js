import { EventInfoCard, HeaderImage, ExternalButton } from "components";
import '../../../EventInformation.css';

export const NJCAAELeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"NJCAAE League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring and Fall Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["3 Skill Tiers", "2 Qualifier Tournaments", "Single Elimination Playoffs", "9 Week Round Robin Regular Season"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - USA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["$2,000/yr Membership - Must Attend a 2 Year College"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://discord.com/invite/UD9aKwAgGX"} />
            </div>
        </div>
    );
}
