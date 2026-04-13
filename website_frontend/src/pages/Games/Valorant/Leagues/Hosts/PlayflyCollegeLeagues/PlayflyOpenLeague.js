import { EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../../EventInformation.css';

export const PlayflyOpenLeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"Playfly Open"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring and Fall Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["$280k Prize Pool Split Across All Titles and Divisions", "Live Streamed Matches", "Live Support on Discord"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry - Must be a FULL TIME College Student", "Gold & Lower"]} />
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
