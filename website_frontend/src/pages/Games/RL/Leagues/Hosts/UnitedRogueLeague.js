import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const UnitedRogueLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"United Rogue League - Rocket League"}
                description="United Rogue Rocket League. Free to enter for ages 16+. 32 franchises across a 5 league system with enforced salary caps and live streamed matches."
                canonicalPath={"/games/RocketLeague/leagues/united-rogue"}
            />
            <HeaderImage title={"United Rogue League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["2 Seasons Annually"]} regionTitle={"Region/Type"} regionInfoList={["3v3 - NA"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["32 Franchises over 5 League System", "8 Week Regular Season, 4 Week Playoffs", "Group Stage Playoffs into Single Elimination Bracket", "2 Conferences with 4 Divisions in Each League", "Enforced Salary Caps for Competitiveness", "Live Streamed Matches"]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry", "Ages 16+"]} footer={<ExternalButton blank={true} title={"Join Now"} path={"https://rl.unitedrogue.com/"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/RocketLeague/leagues"} />
            </div>
        </div>
    );
}
