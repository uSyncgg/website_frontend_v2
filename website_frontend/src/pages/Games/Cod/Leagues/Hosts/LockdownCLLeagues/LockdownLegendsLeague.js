import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton, VerifiedText } from "components";
import '../../../../EventInformation.css';

export const LockdownLegendsLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"LockdownCL Legends League - Call of Duty"}
                description="LCL Legends league is the Call of Duty league for those who are the best of the best and looking to make money."
                canonicalPath={"/games/call-of-duty/leagues/lockdowncl-leagues/legends"}
            />
            <HeaderImage title={"LockdownCL Legends League"} imageClass={"lockdownCODLeagues"} verified={true} />

            <div className="verifiedContainer">
                <VerifiedText />
            </div>

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring and Fall Seasons"]} regionTitle={"Region/Type"} regionInfoList={["4v4 - All Regions (NA Based)"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["$251 Prize Pool", "Crim 3 & above", "4v4 CDL Variant Ruleset", "Playoffs after Regular Season", "Solo Registration - Draft Format", "Live Streamed Matches"]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry"]} footer={<ExternalButton host={"LockdownCL Legends League"} blank={true} title={"Join Now"} path={"https://discord.gg/SMZ4R8XzWZ"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/call-of-duty/leagues/lockdowncl-leagues"} />
            </div>
        </div>
    );
}