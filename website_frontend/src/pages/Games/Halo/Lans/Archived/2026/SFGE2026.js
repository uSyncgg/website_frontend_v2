import { EventInfoCard, HeaderImage, ExternalButton, BackButton, SeoData } from "components";
import '../../../../EventInformation.css';

export const SFGE2026 = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"Southern-Fried Gaming Expo 2026 - Halo"}
                description="The 13th Annual Southern-Fried Gaming Expo attracts over 8,500 attendees and for 2026 is expanding from 137,000 square feet to over 173,000! The event takes place in both the Renaissance Atlanta Waverly Hotel and the Cobb Convention Center Atlanta."
                canonicalPath={"/lans/sfge-2026"}
            />

            <HeaderImage title={"Southern-Fried Gaming Expo 2026"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date/Place"} infoList={["Jul 31st - Aug 2nd, 2026", "Atlanta, GA"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={[
                        "Prize Pool Based on Entrants"
                        , "Halo Infinite FFA Tournament"
                        , "All Tournaments are Free Entry"
                        , "Various Tournament Titles: CS2, Mario Kart, Fortnite, College Football, SSBU, and More"
                    ]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["3-Day Weekend Pass (Adult): $85","3-Day Weekend Pass (Child): $50"]} footer={<ExternalButton host={"Southern-Fried Gaming Expo 2026"} blank={true} title={"Join Now"} path={"https://www.start.gg/tournament/southern-fried-gaming-expo-2026/details"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/halo/lans"} />
            </div>
        </div>
    );
}
