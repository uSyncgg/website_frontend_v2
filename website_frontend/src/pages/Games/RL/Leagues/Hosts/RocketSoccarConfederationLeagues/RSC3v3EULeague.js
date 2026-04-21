import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../../EventInformation.css';

export const RSC3v3EULeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Rocket Soccar Confederation Europe 3v3 league. $600 prize pool across all 6 divisions. Free to enter with spring and fall seasons annually."
                canonicalPath={"/games/RocketLeague/leagues/rsc-leagues/3v3-eu"}
            />
            <HeaderImage title={"RSC EU 3v3"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring and Fall Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["$600 Prize Pool Across All Divisions", "Sign up as an Individual", "6 Skill Divisions", "Weekly Matches"]} regionTitle={"Region/Type"} regionInfoList={["3v3 - EU"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://discord.com/invite/Bw4rvpG"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/RocketLeague/leagues/rsc-leagues"} />
            </div>
        </div>
    );
}
