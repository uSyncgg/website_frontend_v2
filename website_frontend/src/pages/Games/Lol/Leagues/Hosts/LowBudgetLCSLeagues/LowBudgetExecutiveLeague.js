import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../../EventInformation.css';

export const LowBudgetExecutiveLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="The LCS Executive league is the diamond average league. League of Legends leagues have never been so action packed - start today."
                canonicalPath={"/games/LoL/leagues/low-budget-leagues/executive"}
            />
            <HeaderImage title={"LCS Executive League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring, Fall, and Winter Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["16 Teams Max", "Support on Discord", "Live Streamed Matches"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry", "Diamond Average", "See Rank Points for Team Eligibility"]} />
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
