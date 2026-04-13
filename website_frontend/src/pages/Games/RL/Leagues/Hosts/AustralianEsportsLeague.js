import { EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const AustralianEsportsLeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"Australian Esports League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring and Fall Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["$3,500 Total Prize Pool (Estimated)", "Stage 1 (Regular Season): Best of 1 Matches", "Stage 2 (Playoffs): Best of 3 Matches", "Top Teams from Stage 1 Move to Stage 2", "Open Series = Any University Can Join", "Elite Series = Invitation Only"]} regionTitle={"Region/Type"} regionInfoList={["3v3 - AUS"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Entry Fee TBD - Must be Enrolled at an Australian University"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://ael.org.au/uni/"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/RocketLeague/leagues"} />
            </div>
        </div>
    );
}
