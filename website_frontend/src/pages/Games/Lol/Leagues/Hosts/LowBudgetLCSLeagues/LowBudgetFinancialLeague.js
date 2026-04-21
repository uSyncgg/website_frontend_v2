import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../../EventInformation.css';

export const LowBudgetFinancialLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="LCS Financial league is a free to play League of Legends league for those with an Emerald average rank. Join the action for yourself."
                canonicalPath={"/games/LoL/leagues/low-budget-leagues/financial"}
            />
            <HeaderImage title={"LCS Financial League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring, Fall, and Winter Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["16 Teams Max", "Support on Discord", "Live Streamed Matches"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry", "Emerald Average, 2 Diamond 3 Max", "See Rank Points for Team Eligibility"]} />
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
