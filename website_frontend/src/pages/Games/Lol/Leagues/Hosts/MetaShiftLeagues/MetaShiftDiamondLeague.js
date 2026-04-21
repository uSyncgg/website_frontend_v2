import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../../EventInformation.css';

export const MetaShiftDiamondLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="MetaShift Diamond league is the highest prize pool league from the League of Legends hoster. Sign up today and make money playing league."
                canonicalPath={"/games/LoL/leagues/meta-shift-leagues/diamond"}
            />
            <HeaderImage title={"MetaShift Diamond League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring, Summer, and Fall Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["$1,500 Prize Pool (Estimated)", "10 Teams Max", "Live Streamed Matches"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["$120 per Team (Estimated)", "Tier 2", "See Website for Tier Check"]} />
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
