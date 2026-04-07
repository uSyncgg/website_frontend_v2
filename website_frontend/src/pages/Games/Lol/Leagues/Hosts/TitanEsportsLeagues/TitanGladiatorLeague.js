import { EventInfoCard, HeaderImage, ExternalButton } from "components";
import '../../../../EventInformation.css';

export const TitanGladiatorLeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage imageClass={"titanLOLLeagues"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Summer, Fall, and Winter Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["1st Place = 35% - 2nd Place = 15% - 3rd/4th Place = 5% - Operators = 40%", "9 Week Round Robin Group Stage", "3 Week Playoffs", "Standard Draft", "Support on Discord"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["$25 per Team", "$25 Forfeit Deposit", "Platinum 4 Cap"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://lol.titanesports.org/"} />
            </div>
        </div>
    );
}
