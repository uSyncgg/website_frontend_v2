import { EventInfoCard, HeaderImage, ExternalButton, BackButton, SeoData } from "components";
import '../../../EventInformation.css';

export const EgoChallTournament = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Join us on June 13th for a high-stakes Call of Duty competition! We are hosting a competitive 2v2 LAN S&D tournament with a guaranteed prize pool of $300. If more than 15 teams enter, the higher the prize pool climbs!"
                canonicalPath={"/lans/egochall-tournament"}
            />

            <HeaderImage title={"EgoChall Tournament"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date/Place"} infoList={["June 13 - 14th, 2026", "Chapel Hill, NC"]} /> 
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={[
                        "$300 GTD Prize Pool, Scales with More Entrants"
                        , "2v2 BO7 CDL Search and Destroy"
                        , "Solo Players Welcome"
                        , "12PM Local Start Time"
                        , "Live Streamed Matches"
                    ]} /> 
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Team Pass: $20"]} footer={<ExternalButton blank={true} title={"Join Now"} path={"https://www.start.gg/tournament/egochall-cod-tournament/details"} />}/> 
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/call-of-duty/lans"} />
            </div>
        </div>
    );
}
