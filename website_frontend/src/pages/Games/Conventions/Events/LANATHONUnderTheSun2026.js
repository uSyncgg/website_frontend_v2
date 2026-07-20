import { EventInfoCard, HeaderImage, ExternalButton, BackButton, SeoData } from "components";
import '../../EventInformation.css';

export const LANATHONUnderTheSun2026 = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description={"This will be a LAN like no other. Focused on a summer party feel. Play whatever you like, no tournaments just BYOC fun."}
                canonicalPath={"/lans/lan-a-thon-under-the-sun-2026"}
            />

            <HeaderImage title={"LAN-A-THON Under The Sun 2026"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date/Place"} infoList={["Sep 4 - 6th, 2026", "Bonita, CA"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={[
                        "Summer Party BYOC LAN",
                        "No Tournaments, All for Fun",
                        "Raffles, Pizza, Co-Op, and More",
                    ]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["BYOC Seat: $30", "Rental PC Seat: $40", "Spectator: $15"]} footer={<ExternalButton blank={true} title={"Join Now"} path={"https://www.tixr.com/groups/lanfest/events/san-diego-lan-a-thon-under-the-sun-2026-172400"} />} />
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/other-lans"} />
            </div>
        </div>
    );
}
