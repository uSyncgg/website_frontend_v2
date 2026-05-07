import { EventInfoCard, HeaderImage, ExternalButton, BackButton, SeoData } from "components";
import '../../../EventInformation.css';

export const EWGL3 = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="EWGL 3, St Johns, Florida, September 12th & 13th, $5,000 +/- Prize Pool + Championship Rings + MVP Ring"
                canonicalPath={"/lans/ewgl3"}
            />

            <HeaderImage title={"EWGL 3"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date/Place"} infoList={["Sept 12 - 13th, 2026", "St Johns, FL"]} /> 
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={[
                        "$5k +/- prize pool"
                        , "16 team max"
                        , "Pool Play then Double Elim Bracket"
                        , "Championship Rings"
                    ]} /> 
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Entry fee unknown ($300 estimated)"]} /> 
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://x.com/ewgleague/status/2033241825549451307?s=20"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/call-of-duty/lans"} />
            </div>
        </div>
    );
}

