import { EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const EliteWarfareGamingLeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"Elite Warfare Gaming League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring and Fall Seasons (Estimated)"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["70/30% Prize Pool Split", "4v4 CDL Ruleset Based on Divisions", "Group A: T150 Pro Point Players / NO T250 Ranked Players", "Group B: Crim 3 Ranked Peak / No Pro Point Players / No top U18 Players (Via S7 U18 League)", "Group C: Diamond 3 Ranked Peak / No Pro Point Players / No Challengers Cup Participants / $50 Earnings Limit on COD Agent/CMGs / No top U18 Players (Via S7 U18 League)"]} regionTitle={"Region/Type"} regionInfoList={["4v4 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Group A: $50 Team Pass", "Group B: $40 Team Pass", "Group C: $30 Team Pass"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://discord.gg/HN2mKEvb7K"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/call-of-duty/leagues"} />
            </div>
        </div>
    );
}