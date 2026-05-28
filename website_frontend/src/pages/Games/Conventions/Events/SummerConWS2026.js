import { EventInfoCard, HeaderImage, ExternalButton, BackButton, SeoData } from "components";
import '../../EventInformation.css';

export const SummerConWS2026 = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Summer Con is a collection of over 250 vendors, artists, exhibitors, prop builders, crafters, streamers, podcasters, gamers, and experts who set up at the convention to sell their products, teach, and meet the thousands of people who enter the Convention."
                canonicalPath={"/lans/summercon-ws-2026"}
            />

            <HeaderImage title={"SummerCon 2026"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date/Place"} infoList={["June 19 - 21st, 2026", "Puyallup, WA"]} /> 
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={[
                        "$5,000 prize pool"
                        , "Free entry tournaments with day-pass"
                        , "250+ vendors, artists, exhibitors, streamers, cosplayers, etc"
                        , "Tournament Titles: SSBU, Tekken 8, SF6, and More"
                    ]} /> 
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Friday: $40","Saturday: $70","Sunday: $55","3-Day: $130"]} /> 
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://www.wasummercon.com/"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/other-lans"} />
            </div>
        </div>
    );
}
