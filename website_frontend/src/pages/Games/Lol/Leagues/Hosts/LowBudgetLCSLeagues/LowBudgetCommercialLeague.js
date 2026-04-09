import { EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../../EventInformation.css';

export const LowBudgetCommercialLeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"LCS Commercial League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring, Fall, and Winter Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["16 Teams Max", "Support on Discord", "Live Streamed Matches"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry", "Platinum Average, 1 Emerald 3 Max", "See Rank Points for Team Eligibility"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://discord.com/invite/w4WVB4Z"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/LoL/leagues/low-budget-leagues"} />
            </div>
        </div>
    );
}
