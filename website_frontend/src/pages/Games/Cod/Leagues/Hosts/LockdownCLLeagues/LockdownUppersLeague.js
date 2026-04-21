import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton, VerifiedText } from "components";
import '../../../../EventInformation.css';

export const LockdownUppersLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="LockDown Call of Duty League is hosting LCL Uppers - the perfect league for those looking for good competition and a prize pool."
                canonicalPath={"/games/call-of-duty/leagues/lockdowncl-leagues/uppers"}
            />
            <HeaderImage imageClass={"lockdownCODLeagues"} />

            <div className="verifiedContainer">
                <VerifiedText />
            </div>

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring and Fall Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["$264 Prize Pool", "Diamond 2 - Crim 2", "4v4 CDL Variant Ruleset", "Solo Registration - Draft Format", "Live Streamed Matches"]} regionTitle={"Region/Type"} regionInfoList={["4v4 - All Regions (NA Based)"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://discord.gg/SMZ4R8XzWZ"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/call-of-duty/leagues/lockdowncl-leagues"} />
            </div>
        </div>
    );
}