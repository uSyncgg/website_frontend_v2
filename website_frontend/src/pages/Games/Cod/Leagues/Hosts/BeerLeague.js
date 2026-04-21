import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const BeerLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Call of Duty Beer League. Enjoy beers and compete in a Call of Duty league while under the influence."
                canonicalPath={"/games/call-of-duty/leagues/cod-beer-league"}
            />
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
                <ExternalButton blank={true} title={"Join Now"} path={"https://www.google.com/url?q=https%3A%2F%2Ftwitter.com%2FCoDBeerLeague&sa=D&sntz=1&usg=AOvVaw3LK3JovZ7B1-JO42DXymZJ"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/call-of-duty/leagues"} />
            </div>
        </div>
    );
}