import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton, VerifiedText } from "components";
import '../../../EventInformation.css';

export const CollegeValorantLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="College Valorant League presented by Riot Games. A verified collegiate league with scholarship prizes. Free to enter for full time college students in NA."
                canonicalPath={"/games/Valorant/leagues/riot"}
            />
            <HeaderImage imageClass={"cvalPage"} />

            <div className="verifiedContainer">
                <VerifiedText />
            </div>

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Fall Season"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Scholarship Prize to Top Teams", "4 Regional Divisions", "Support from Game Publisher Riot", "Top Teams From Each Phase Qualify for Championship", "Live Streamed Matches", "Live Support on Discord"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry - Must be a FULL TIME College Student"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://universityesportsna.riotgames.com/"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/Valorant/leagues"} />
            </div>
        </div>
    );
}
