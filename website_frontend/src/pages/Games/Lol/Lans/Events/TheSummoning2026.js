import { EventInfoCard, HeaderImage, ExternalButton, BackButton, SeoData } from "components";
import '../../../EventInformation.css';

export const TheSummoning2026 = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="The Summoning aims to create an unparalleled experience for collectors, competitors and families. This convention style event features tabletop, TCG, comics, sports cards, esports tournaments and more all under one roof. Every attendee is guaranteed to leave with unforgettable memories"
                canonicalPath={"/lans/the-summoning-2026"}
            />

            <HeaderImage title={"The Summoning 2026"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date/Place"} infoList={["July 18th, 2026", "Windsor, ON"]} /> 
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={[
                        "$250 Prize Pool"
                        , "1v1 Mundo Dodgeball Tournament"
                        , "SSBU, Pokemon VGC, Melee, and More Tournaments"
                        , "9AM Doors Open"
                    ]} /> 
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry"]} footer={<ExternalButton blank={true} title={"Join Now"} path={"https://www.start.gg/tournament/the-summoning-esports-tournaments/details"} />}/> 
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/LoL/lans"} />
            </div>
        </div>
    );
}
