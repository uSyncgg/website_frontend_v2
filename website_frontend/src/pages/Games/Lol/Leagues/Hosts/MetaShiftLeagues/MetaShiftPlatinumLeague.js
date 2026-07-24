import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../../EventInformation.css';

export const MetaShiftPlatinumLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"MetaShift Platinum League - League of Legends"}
                description="Platinum League of Legends league by MetaShift. This is a 8 team tier 5 league that is for league players trying to prove themselves."
                canonicalPath={"/games/LoL/leagues/meta-shift-leagues/platinum"}
            />
            <HeaderImage title={"MetaShift Platinum League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring, Summer, and Fall Seasons"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - NA"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["$360 Prize Pool (Estimated)", "8 Teams Max", "Live Streamed Matches"]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["$60 per Team (Estimated)", "Tier 5", "See Website for Tier Check"]} footer={<ExternalButton host={"MetaShift Platinum League"} blank={true} title={"Join Now"} path={"https://discord.com/invite/RtJa6kY"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/LoL/leagues/meta-shift-leagues"} />
            </div>
        </div>
    );
}
