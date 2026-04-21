import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const EsportsAgentH2H = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Esports Agent head to head matches for cod players looking for competitive play. Join now to prove your skill."
                canonicalPath={"/games/call-of-duty/head-to-head/eagent"}
            />
            <HeaderImage title={"Esports Agent"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Fees"} infoList={["Free XP Matches"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["24/7 Live Support On Site", "Consistent Rule Updates", "Small Number of Daily Users", "CDL Ruleset and Select GAs"]} />
                </div>

                <div>
                    <EventInfoCard title={"Restrictions"} infoList={["Available Worldwide"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://esportsagent.gg/wagers"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/call-of-duty/head-to-head"} />
            </div>
        </div>
    );
}