import { EventInfoCard, HeaderImage, ExternalButton, BackButton, SeoData, VerifiedText } from "components";
import '../../../EventInformation.css';

export const CaliforniaEsportsMW3Throwback = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Relive Modern Warfare 3 the way it was meant to be played - a 2-day, in-person 4v4 LAN throwback at Valhallan Esports, Lake Forest, Oct 17–18."
                canonicalPath={"/lans/california-esports-mw3-throwback"}
                title={"California Esports MW3 Throwback - Call of Duty"}
            />

            <HeaderImage imageClass={"caliTier3"} />

            <div className="verifiedContainer">
                <VerifiedText />
            </div>

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date/Place"} infoList={["October 17 - 18th, 2026", "Lake Forest, CA"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={[
                        "Prize Pool Based on Entrants"
                        , "4v4 CDL Variant MW3 Format"
                        , "2v2 Side Event"
                        , "12 Teams MAX"
                    ]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Team Pass: $150", "2v2 Side Event: $60"]} footer={<ExternalButton host={"California Esports MW3 Throwback"} blank={true} title={"Join Now"} path={"https://www.thevintagesocal.com/events/california-esports-4v4-call-of-duty-mw3-throwback-2-day-lan"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/call-of-duty/lans"} />
            </div>
        </div>
    );
}
