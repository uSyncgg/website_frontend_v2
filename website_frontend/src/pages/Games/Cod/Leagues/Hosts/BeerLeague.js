import { EventInfoCard, HeaderImage, ExternalButton } from "components";
import '../../../EventInformation.css';

export const BeerLeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"Call of Duty Beer League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring and Fall Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["No Prize Pool", "4v4 CDL Ruleset", "8 GMs draft teams", "GMs don't play, they just build and coach the team", "Drink Before / During / After Matches", "Playoffs for T48 Players", "Must be 21+ to Enter"]} regionTitle={"Region/Type"} regionInfoList={["4v4 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://www.google.com/url?q=https%3A%2F%2Ftwitter.com%2FCoDBeerLeague&sa=D&sntz=1&usg=AOvVaw3LK3JovZ7B1-JO42DXymZJ"} />
            </div>
        </div>
    );
}