import { EventInfoCard, HeaderImage, ExternalButton, BackButton, SeoData } from "components";
import '../../EventInformation.css';

export const FortLAN2026 = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"FortLAN 2026 - Convention"}
                description={"FortLAN returns this Fall for a full weekend of gaming, community, and fun. Join us October 16th-18th at the Grand Wayne Center for a three-day LAN celebration featuring 280 BYOC seats and activities for gamers of all ages."}
                canonicalPath={"/lans/fortlan-2026"}
            />

            <HeaderImage title={"FortLAN 2026"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date/Place"} infoList={["Oct 16 - 18th, 2026", "Fort Wayne, IN"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={[
                        "BYOC Gaming, Community, and Fun LAN",
                        "Raffle Prizes",
                        "Charity Commitment",
                        "Variety of Competitive Tournament Titles",
                    ]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["BYOC: $50"]} footer={<ExternalButton host={"FortLAN 2026"} blank={true} title={"Join Now"} path={"https://www.tixr.com/groups/lanfest/events/fortlan-fall-2026-189274"} />} />
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/other-lans"} />
            </div>
        </div>
    );
}
