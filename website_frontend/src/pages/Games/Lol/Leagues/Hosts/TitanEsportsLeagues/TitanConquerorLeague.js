import { EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../../EventInformation.css';

export const TitanConquerorLeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage imageClass={"titanLOLLeagues"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Summer, Fall, and Winter Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["1st Place = 35% - 2nd Place = 15% - 3rd/4th Place = 5% - Operators = 40%", "Top 16 Teams Advance to Playoffs", "Standard Draft", "Support on Discord", "Live Streamed Matches"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["$75 per Team", "$25 Forfeit Deposit", "Diamond 4 Cap"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://lol.titanesports.org/"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/LoL/leagues/titan-leagues"} />
            </div>
        </div>
    );
}
