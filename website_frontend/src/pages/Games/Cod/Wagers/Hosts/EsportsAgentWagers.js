import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton, VerifiedText } from "components";
import '../../../EventInformation.css';

export const EsportsAgentWagers = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Live supported cod wagers from Esports Agent. Sign up today and experience the pro league for yourself."
                canonicalPath={"/games/call-of-duty/wagers/eagent"}
            />
            <HeaderImage imageClass={"eagentPage"} />

            <div className="verifiedContainer">
                <VerifiedText />
            </div>

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Fees"} infoList={["Regular Member: 5%", "Prestige Member: 0%", "No Fee & Instant Deposits/Withdrawals"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["24/7 Live Support", "Consistent Rule Updates", "CDL Ruleset with Select GAs", "PC Reset / Monitor Cam Options", "Large Number of Users and Matches Daily"]} />
                </div>

                <div>
                    <EventInfoCard title={"Restrictions"} infoList={["18+", "Available Worldwide", "US State Restrictions: AZ, MT, and SD"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://esportsagent.gg/wagers"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/call-of-duty/wagers"} />
            </div>
        </div>
    );
}