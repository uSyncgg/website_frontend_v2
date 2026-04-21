import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../../EventInformation.css';

export const MetaShiftNobleLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Noble is the #1 and tier 1 league from MetaShift. This League of Legends league is no joke - and only the best players can compete for the cash prize."
                canonicalPath={"/games/LoL/leagues/meta-shift-leagues/noble"}
            />
            <HeaderImage title={"MetaShift Noble League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring, Summer, and Fall Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["$620 Prize Pool (Estimated)", "5 Teams Max", "Live Streamed Matches"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["$120 per Team (Estimated)", "Tier 1", "See Website for Tier Check"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://discord.com/invite/RtJa6kY"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/LoL/leagues/meta-shift-leagues"} />
            </div>
        </div>
    );
}
