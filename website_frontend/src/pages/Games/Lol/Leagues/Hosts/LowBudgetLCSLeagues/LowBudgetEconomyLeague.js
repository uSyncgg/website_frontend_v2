import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../../EventInformation.css';

export const LowBudgetEconomyLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="LCS Economy league is a Gold average League of Legends league. Join with your friends or meet new ones in this action packed league."
                canonicalPath={"/games/LoL/leagues/low-budget-leagues/economy"}
            />
            <HeaderImage title={"LCS Economy League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring, Fall, and Winter Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["16 Teams Max", "Support on Discord", "Live Streamed Matches"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry", "Gold Average, 1 Platinum 3 Max", "See Rank Points for Team Eligibility"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://discord.com/invite/w4WVB4Z"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/LoL/leagues/low-budget-leagues"} />
            </div>
        </div>
    );
}
