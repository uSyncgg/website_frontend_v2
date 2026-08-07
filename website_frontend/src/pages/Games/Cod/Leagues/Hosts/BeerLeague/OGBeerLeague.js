import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../../EventInformation.css';

export const OGBeerLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"OG Beer League - Call of Duty"}
                description="Call of Duty Beer League. Enjoy beers and compete in a Call of Duty league while under the influence."
                canonicalPath={"/games/call-of-duty/leagues/cod-beer-league/og-beer-league"}
            />
            <HeaderImage title={"OG Beer League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["2 Seasons per Game", "6 Week Off-Season Game"]} regionTitle={"Region/Type"} regionInfoList={["4v4 - NA"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["8 week regular season + playoffs and separate All-Star weekend", "Top 32 make playoffs, 33-48 are eligible substitutes", "Sign up solo or as a duo"]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry"]} footer={<ExternalButton host={"OG Beer League"} blank={true} title={"Join Now"} path={"https://www.google.com/url?q=https%3A%2F%2Ftwitter.com%2FCoDBeerLeague&sa=D&sntz=1&usg=AOvVaw3LK3JovZ7B1-JO42DXymZJ"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/call-of-duty/leagues/cod-beer-league"} />
            </div>
        </div>
    );
}
