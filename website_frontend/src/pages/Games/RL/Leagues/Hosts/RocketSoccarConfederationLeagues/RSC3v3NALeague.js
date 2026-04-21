import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../../EventInformation.css';

export const RSC3v3NALeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Rocket Soccar Confederation North America 3v3 league. Free to enter with 9 competitive skill divisions. Three seasons annually in April, August, and December."
                canonicalPath={"/games/RocketLeague/leagues/rsc-leagues/3v3-na"}
            />
            <HeaderImage title={"RSC NA 3v3"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual April, August, and December Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["No Prize Pool", "Sign up as a Free Agent", "9 Competitive Skill Divisions", "Draft Based League", "Weekly Matches"]} regionTitle={"Region/Type"} regionInfoList={["3v3 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://discord.com/invite/rsc"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/RocketLeague/leagues/rsc-leagues"} />
            </div>
        </div>
    );
}
