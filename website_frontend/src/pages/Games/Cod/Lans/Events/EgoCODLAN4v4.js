import { EventInfoCard, HeaderImage, ExternalButton, BackButton, SeoData } from "components";
import '../../../EventInformation.css';

export const EgoCODLAN4v4 = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"Ego LAN 4v4 - Call of Duty"}
                description={"$1,000 prize pool call of duty LAN tournament and event near chapel hill, NC. Grab your challengers team and compete for a chance at a cash prize!"}
                canonicalPath={"/lans/ego-cod-lan-4v4"}
            />

            <HeaderImage title={"Ego COD LAN 4v4"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date/Place"} infoList={["Aug 15 - 16th, 2026", "Chapel Hill, NC"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={[
                        "$1,000 Prize Pool",
                        "4v4 CDL Format",
                        "Single Elimination Best of 5",
                        "Minimum of 5 Teams to Run",
                    ]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Team Pass: $100", "Solo Entry: $25"]} footer={<ExternalButton host={"Ego COD LAN 4v4"} blank={true} title={"Join Now"} path={"https://www.start.gg/tournament/ego-cod-lan-4v4-tournament/details"} />} />
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/call-of-duty/lans"} />
            </div>
        </div>
    );
}
