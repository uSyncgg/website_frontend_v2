import { EventInfoCard, HeaderImage, ExternalButton, BackButton, SeoData } from "components";
import '../../../../EventInformation.css';

export const LowBudgetCEOLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description={"LCS CEO League is a League of Legends Masters 375 LP and below ranked league. Sign up and have your matches live streamed."}
                canonicalPath={"/games/LoL/leagues/low-budget-leagues/ceo"}
            />

            <HeaderImage title={"LCS CEO League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring, Fall, and Winter Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["16 Teams Max", "Support on Discord", "Live Streamed Matches"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry", "Masters 375 LP Cap", "15 Points Maximum (Estimate)"]} />
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
