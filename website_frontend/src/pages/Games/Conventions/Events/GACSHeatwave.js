import { EventInfoCard, HeaderImage, ExternalButton, BackButton, SeoData } from "components";
import '../../EventInformation.css';

export const GACSHeatwave = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"GA:CS Operation Heatwave - Convention"}
                description="GA:CS Presents | 🔥Operation Heatwave 🔥 🗓️ August 8th-9th, 2026 💰 Up to $2000 Prize Pool 🤝 16 Teams 📍 Game Arena - Columbus, OH"
                canonicalPath={"/lans/gacs-operation-heatwave"}
            />

            <HeaderImage title={"GA:CS Operation Heatwave"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date/Place"} infoList={["August 8 - 9th, 2026", "Columbus, OH"]} /> 
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={[
                        "Up to $2,000 Prize Pool"
                        , "Competitive CS2 Event"
                        , "16 Teams MAX"
                        , "Pool Play Day 1 and Top 8 Day 2"
                        , "Live Streamed Matches"
                    ]} /> 
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Team Pass: $250"]} footer={<ExternalButton blank={true} title={"Join Now"} path={"https://www.start.gg/tournament/ga-cs-operation-heatwave/details"} />}/> 
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/other-lans"} />
            </div>
        </div>
    );
}
