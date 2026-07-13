import { EventInfoCard, HeaderImage, ExternalButton, BackButton, SeoData } from "components";
import '../../../EventInformation.css';

export const HNLxFANDOM2026 = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description={"Enter to play VALORANT, COD, and OW2 at Hawaii's Newest convention 'For the Culture!' Featuring Anime, Collectibles, Cosplay, K-Pop, Gaming and More!"}
                canonicalPath={"/lans/hnl-x-fandom-2026"}
            />

            <HeaderImage title={"HNL x FANDOM 2026"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date/Place"} infoList={["August 8 - 9th, 2026", "Honolulu, HI"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={[
                        "Black Ops 7 Tournament",
                        "Other Tournaments: Valorant and Overwatch",
                        "Live Streamed Matches",
                        "Anime, Collectibles, Cosplay, K-Pop, Gaming and More"
                    ]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Ages 18 and Up: $22.00", "Child Ages 13-17 / Military / Seniors 60+: $14.60"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://www.ticketmaster.com/event/0A0064D801D80C85"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/call-of-duty/lans"} />
            </div>
        </div>
    );
}
