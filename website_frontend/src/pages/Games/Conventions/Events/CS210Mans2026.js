import { EventInfoCard, HeaderImage, ExternalButton, BackButton, SeoData } from "components";
import '../../EventInformation.css';

export const CS210Mans2026 = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"CS2 10-Mans 2026 - Convention"}
                description={"Join Counter-Strike 2 10mans at Localhost Denver on Aug 7 — $10 entry, PC stations, prizes & pizza. Presented by Hellcase. Register now and rack up frags!"}
                canonicalPath={"/lans/cs2-10-mans-2026"}
            />

            <HeaderImage title={"CS2 10-Mans 2026"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date/Place"} infoList={["Aug 7th, 2026", "Lakewood, CO"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={[
                        "Case Giveaways",
                        "10mans from 7:30pm - 10:00pm",
                        "CS2 Competitive Ruleset",
                    ]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["$10 Venue Fee"]} footer={<ExternalButton host={"CS2 10-Mans 2026"} blank={true} title={"Join Now"} path={"https://nerdstreet.com/events/counter-strike-10mans-or-presented-by-hellcase-2026-08-07?section=overview"} />} />
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/other-lans"} />
            </div>
        </div>
    );
}
