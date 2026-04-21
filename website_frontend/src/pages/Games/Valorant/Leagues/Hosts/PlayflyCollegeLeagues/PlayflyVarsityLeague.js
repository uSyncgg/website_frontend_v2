import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../../EventInformation.css';

export const PlayflyVarsityLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Playfly College Valorant Varsity League for Platinum and above college students. $280k prize pool shared across all titles. Spring and fall seasons."
                canonicalPath={"/games/Valorant/leagues/playfly-leagues/varsity"}
            />
            <HeaderImage title={"Playfly Varsity"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring and Fall Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["$280k Prize Pool Split Across All Titles and Divisions", "Live Streamed Matches", "Live Support on Discord"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Must be a FULL TIME College Student", "$1,000 for Full Year", "$625 for Half Year", "Platinum & Above"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://playflycollege.gg/pages/playfly-college-esports"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/Valorant/leagues/playfly-leagues"} />
            </div>
        </div>
    );
}
