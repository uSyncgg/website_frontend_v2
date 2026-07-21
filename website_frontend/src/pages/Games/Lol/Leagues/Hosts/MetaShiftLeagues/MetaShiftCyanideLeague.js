import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../../EventInformation.css';

export const MetaShiftCyanideLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"MetaShift Cyanide League - League of Legends"}
                description="MetaShift Cyanide league is a tier 4 league from the provider. This League of Legends league has a large prize pool for the winner."
                canonicalPath={"/games/LoL/leagues/meta-shift-leagues/cyanide"}
            />
            <HeaderImage title={"MetaShift Cyanide League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring, Summer, and Fall Seasons"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - NA"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["$1,100 Prize Pool (Estimated)", "10 Teams Max", "Live Streamed Matches"]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["$100 per Team", "Tier 4", "See Website for Tier Check"]} footer={<ExternalButton blank={true} title={"Join Now"} path={"https://discord.com/invite/RtJa6kY"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/LoL/leagues/meta-shift-leagues"} />
            </div>
        </div>
    );
}
