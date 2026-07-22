import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton, VerifiedText } from "components";
import '../../../../EventInformation.css';

export const LockdownWomensLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"LockdownCL Womens League - Call of Duty"}
                description="LCL Womens League is made for the women competitive Call of Duty players that want to compete for cash prizes."
                canonicalPath={"/games/call-of-duty/leagues/lockdowncl-leagues/womens"}
            />
            <HeaderImage imageClass={"lockdownCODLeagues"} />

            <div className="verifiedContainer">
                <VerifiedText />
            </div>

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring and Fall Seasons"]} regionTitle={"Region/Type"} regionInfoList={["4v4 - All Regions (NA Based)"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["$270 Prize Pool", "All skill levels", "4v4 CDL Variant Ruleset", "Playoffs after Regular Season", "Solo Registration - Draft Format", "Live Streamed Matches"]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry"]} footer={<ExternalButton host={"LockdownCL Womens League"} blank={true} title={"Join Now"} path={"https://discord.gg/SMZ4R8XzWZ"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/call-of-duty/leagues/lockdowncl-leagues"} />
            </div>
        </div>
    );
}