import { EventInfoCard, HeaderImage, ExternalButton, BackButton, SeoData, VerifiedText } from "components";
import { useEvent } from "hooks";
import '../../../EventInformation.css';
import { NotFound } from "pages/NotFound";

export const CaliforniaEsportsMW4Kickoff = () => {
    const { data, error } = useEvent("lans", "Call of Duty", "California Esports MW4 Kickoff");

    if (error?.response?.status === 404) {
        return <NotFound />;
    }

    return (
        <div className="standardContainer">
            <SeoData
                description="Be first on the LAN floor for Modern Warfare 4 - California Esports' 3-day 4v4 kickoff tournament at Valhallan Esports, Lake Forest, Nov 13–15."
                canonicalPath={"/lans/california-esports-mw4-kickoff"}
                title={"California Esports MW4 Kickoff - Call of Duty"}
            />

            <HeaderImage imageUrl={data?.header_img} />

            <div className="verifiedContainer">
                <VerifiedText />
            </div>

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date/Place"} infoList={["November 13 - 15th, 2026", "Lake Forest, CA"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={[
                        "$2,000 Prize Pool"
                        , "4v4 MW4 Kickoff LAN"
                        , "14 Teams MAX"
                        , "Custom Team Event Badges Available"
                    ]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Team Pass: $300"]} footer={<ExternalButton host={"California Esports MW4 Kickoff"} blank={true} title={"Join Now"} path={"https://www.thevintagesocal.com/events/california-esports-4v4-call-of-duty-modern-warfare-4-kickoff-3-day-lan"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/call-of-duty/lans"} />
            </div>
        </div>
    );
}
