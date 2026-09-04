import { EventInfoCard, HeaderImage, ExternalButton, BackButton, SeoData, VerifiedText } from "components";
import { useEvent } from "hooks";
import '../../../EventInformation.css';
import { NotFound } from "pages/NotFound";

export const CaliforniaTierListLAN = () => {
    const { data, error } = useEvent("lans", "Call of Duty", "California Tier List LAN");

    if (error?.response?.status === 404) {
        return <NotFound />;
    }

    return (
        <div className="standardContainer">
            <SeoData
                title={"California Tier List LAN - Call of Duty"}
                description="California Tier List 4v4 2-Day LAN August 29th - 30th! 1st & 2nd Place Prize. $2,000 True Prize Pool but Can be +/- Based on Sign-ups. 14 Slots Available."
                canonicalPath={"/lans/california-tier-list-lan"}
            />

            <HeaderImage imageUrl={data?.header_img} />

            <div className="verifiedContainer">
                <VerifiedText />
            </div>

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date/Place"} infoList={["Aug 29 - 30th, 2026", "Lake Forest, CA"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={[
                        "$2,000 Prize Pool (Based on Entrants)"
                        , "4v4 CDL Variant"
                        , "2v2 SND Side Event"
                        , "14 Teams MAX (10 Teams for 2v2)"
                    ]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Team Pass: $250","2v2 Event: $60"]} footer={<ExternalButton host={"California Tier List LAN"} blank={true} title={"Join Now"} path={"https://x.com/TheVintageSoCal/status/2085893976843010280"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/call-of-duty/lans"} />
            </div>
        </div>
    );
}
