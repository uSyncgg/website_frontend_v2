import { EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const CasualXPLeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"Casual XP League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring and Fall Seasons (Estimated)"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Two Divisions: Premier and CXP", "4v4 CDL Ruleset, with 1 Sniper and Smoke Grenade per Team", "11-Game Regular Season, Followed by Playoffs", "Point Cap System: A unique competitive balance system created by CXP and now starting to be recognized across the scene", "Premier Division = Highest Competition Division", "Live Streamed Matches with Record Statistics"]} regionTitle={"Region/Type"} regionInfoList={["4v4 - All Regions"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://discord.gg/AEgVZM9FY2"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/call-of-duty/leagues"} />
            </div>
        </div>
    );
}