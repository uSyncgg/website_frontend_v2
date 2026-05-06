import { EventInfoCard, HeaderImage, ExternalButton, BackButton, SeoData } from "components";
import '../../EventInformation.css';

export const DreamCon2026 = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="INPUT DESCRIPTION HERE"
                canonicalPath={"/lans/dreamcon2026"}
            />

            <HeaderImage title={"Dream Con 2026"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date/Place"} infoList={["July 10 - 12th, 2026", "Houston, TX"]} /> 
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={[
                        "Rocket League, Marvel Rivals, Madden, and more"
                        , "4 titles per person"
                    ]} /> 
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["$10 entry per title"]} /> 
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://www.start.gg/tournament/dream-con-championship-series-2026/details"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/other-lans"} />
            </div>
        </div>
    );
}

