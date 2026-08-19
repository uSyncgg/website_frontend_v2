import { EventInfoCard, HeaderImage, ExternalButton, BackButton, SeoData, VerifiedText } from "components";
import '../../../EventInformation.css';

export const GoodbyeBO7DuoLANSwitch = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Grab a partner and spin the wheel - California's first Black Ops 7 DUO-Switch LAN hits Valhallan Esports in Lake Forest, Sept 26–27. 4v4, in-person only, no remote play."
                canonicalPath={"/lans/goodbye-bo7-duo-lan-switch"}
                title={"Goodbye BO7 Duo LAN Switch - Call of Duty"}
            />

            <HeaderImage title={"Goodbye BO7 Duo LAN Switch"} imageClass={"eventPage"} />

            <div className="verifiedContainer">
                <VerifiedText />
            </div>

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date/Place"} infoList={["September 26 - 27th, 2026", "Lake Forest, CA"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={[
                        "Prize Pool Based on Entrants"
                        , "2v2 Switcharoo Format"
                        , "2-day LAN event with up to 5 Spins"
                        , "Pool Play and Wheel Spins Before"
                        , "28 Teams MAX"
                    ]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["$75 per Duo"]} footer={<ExternalButton host={"Goodbye BO7 Duo LAN Switch"} blank={true} title={"Join Now"} path={"https://www.thevintagesocal.com/events/california-esports-4v4-call-of-duty-blackops-7-duo-switch-2-day-lan"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/call-of-duty/lans"} />
            </div>
        </div>
    );
}
