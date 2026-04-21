import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const PremierCircuitLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="The Premier Circuit (TPC) League is an invite-only top tier Call of Duty amateur league. Challengers players duke it out inm this high stakes league."
                canonicalPath={"/games/call-of-duty/leagues/tpc-league"}
            />
            <HeaderImage title={"The Premier Circuit League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring and Fall Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["$1,000 Prize Pool", "Stats for Every Game", "Live Streamed Matches", "Qualifier Tournament to Enter", "4v4 CDL Variant", "16 Teams MAX"]} regionTitle={"Region/Type"} regionInfoList={["4v4 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Entry Fee TBD - DM to Enter"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://x.com/TPCircuit"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/call-of-duty/leagues"} />
            </div>
        </div>
    );
}