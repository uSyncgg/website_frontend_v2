import { EventInfoCard, HeaderImage, ExternalButton, BackButton, SeoData } from "components";
import '../../EventInformation.css';

export const HellcaseCS2LAN2026 = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Localhost Denver is putting on another Counter Strike 2 Tournament and is raising the stakes!"
                canonicalPath={"/lans/hellcase-cs2-2026"}
            />

            <HeaderImage title={"Hellcase CS2 LAN 2026"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date/Place"} infoList={["Aug 22nd - Aug 24th, 2026", "Lakewood, CO"]} /> 
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={[
                        "Up to $2,500 Prize Pool"
                        , "Competitive CS2 Event"
                        , "Swiss Stage - 5 Rounds"
                        , "Top 8 Playoff Bracket"
                        , "ESL Pro Tour Rules"
                    ]} /> 
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Team Pass: $225","Spectator Pass: $10 ($15 for 2-Days)"]} footer={<ExternalButton blank={true} title={"Join Now"} path={"https://nerdstreet.com/events/counter-strike-2-tournament-2026-08-22?section=overview"} />}/> 
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/other-lans"} />
            </div>
        </div>
    );
}
