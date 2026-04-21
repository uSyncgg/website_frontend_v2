import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const AustralianEsportsLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Australian Esports League (AEL) is the #1 AUS Counter-Strike 2 university league. Compete for large prize pools, while having your matches broadcasted."
                canonicalPath={"/games/CS2/leagues/ael"}
            />
            <HeaderImage title={"Australian Esports League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring and Fall Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["$3,500 Prize Pool over 2 Seasons (Estimated)", "Stage 1 (Regular Season): Best of 1 Matches", "Stage 2 (Playoffs): Best of 3 Matches", "Top Teams from Stage 1 Move to Stage 2", "Open Series = Any University Can Join", "Elite Series = Invitational-Only Universities", "Live Streamed Matches"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - AUS"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Entry Fee TBD", "Must be enrolled at an Australian University"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://ael.org.au/uni/"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/CS2/leagues"} />
            </div>
        </div>
    );
}