import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton, VerifiedText } from "components";
import '../../../EventInformation.css';

export const CollegeHaloLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="UGC Halo is the #1 collegiate Halo league. Full time college students can compete at the highest level and win cash prizes."
                canonicalPath={"/games/halo/leagues/ugc-halo"}
            />
            <HeaderImage imageClass={"ugcPage"} />

            <div className="verifiedContainer">
                <VerifiedText />
            </div>

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Fall and Spring Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["$2,500 Prize Pool (Estimated)", "Highly Competitive", "No Live Streamed Matches"]} regionTitle={"Region/Type"} regionInfoList={["4v4 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Must be a Full Time College Student", "Entry Fee TBD"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://discord.com/invite/CapnyyzMkJ"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/halo/leagues"} />
            </div>
        </div>
    );
}
