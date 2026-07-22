import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../../EventInformation.css';

export const MetaShiftEmeraldLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"MetaShift Emerald League - League of Legends"}
                description="Emerald league is a LoL league hosted by MetaShift. Grab your teammates and get read to compete for cash prizes."
                canonicalPath={"/games/LoL/leagues/meta-shift-leagues/emerald"}
            />
            <HeaderImage title={"MetaShift Emerald League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring, Summer, and Fall Seasons"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - NA"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["$1,100 Prize Pool (Estimated)", "16 Teams Max", "Live Streamed Matches"]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["$100 per Team (Estimated)", "Tier 3", "See Website for Tier Check"]} footer={<ExternalButton host={"MetaShift Emerald League"} blank={true} title={"Join Now"} path={"https://discord.com/invite/RtJa6kY"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/LoL/leagues/meta-shift-leagues"} />
            </div>
        </div>
    );
}
