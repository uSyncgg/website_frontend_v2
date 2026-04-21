import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const PraccH2H = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Pracc is the place to play your LoL XP and scrim matches. Find a scrim for League today."
                canonicalPath={"/games/LoL/head-to-head/pracc"}
            />
            <HeaderImage title={"Pracc"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Fees"} infoList={["Free Scrim Finder"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["All Levels of Competition", "Live Discord Support", "Various Different Platforms to Use", "Large Number of Users Searching for Scrims"]} />
                </div>

                <div>
                    <EventInfoCard title={"Restrictions"} infoList={["Available Worldwide"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://pracc.com/"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/LoL/head-to-head"} />
            </div>
        </div>
    );
}