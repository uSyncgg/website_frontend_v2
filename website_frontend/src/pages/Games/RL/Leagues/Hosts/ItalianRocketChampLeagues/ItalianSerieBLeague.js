import { EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../../EventInformation.css';

export const ItalianSerieBLeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"Italian Series B"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Two Annual Seasons (Estimated)"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Prize Based on Teams Performance", "2 Players Must Have Italian Citizenship", "Top Team Promoted to Serie A", "Earn Points in Regular Season to Determine Rank", "Live Streamed Matches"]} regionTitle={"Region/Type"} regionInfoList={["3v3 - ITL"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://www.italianrocketchampionship.it/?lang=eng"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/RocketLeague/leagues/italian-leagues"} />
            </div>
        </div>
    );
}
