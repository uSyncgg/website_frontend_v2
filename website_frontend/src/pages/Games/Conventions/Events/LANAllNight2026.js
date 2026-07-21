import { EventInfoCard, HeaderImage, ExternalButton, BackButton, SeoData } from "components";
import '../../EventInformation.css';

export const LANAllNight2026 = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"LAN All Night 2026 - Convention"}
                description={"The LAN All Night Gaming Festival is transforming into a fantastical realm where modern technology and ancient magic collide. Whether you are a spellcasting streamer, a rogue speedrunner, or a paladin of the keyboard and mouse, there is loot and glory waiting for you."}
                canonicalPath={"/lans/lan-all-night-2026"}
            />

            <HeaderImage title={"LAN All Night 2026"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date/Place"} infoList={["Nov 6 - 8th, 2026", "Grapevine, TX"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={[
                        "BYOC LAN Party",
                        "Fighting Games, Tabletop Games, and Freeplay",
                        "Vendors, Prizes, and Giveaways",
                        "Ran Entirely by Volunteers",
                        "Benefits Charity",
                    ]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["BYOC: $95", "Friday General Admission: $12", "Saturday General Admission: $18"]} footer={<ExternalButton blank={true} title={"Join Now"} path={"https://www.tixr.com/groups/lanfest/events/lan-all-night-gaming-festival-2026-195402"} /> } />
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/other-lans"} />
            </div>
        </div>
    );
}
