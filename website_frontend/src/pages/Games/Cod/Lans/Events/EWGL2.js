import { EventInfoCard, HeaderImage, ExternalButton, BackButton, SeoData } from "components";
import '../../../EventInformation.css';

export const EWGL2 = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="INSERT"
                canonicalPath={"/lans/ewgl2"}
            />

            <HeaderImage title={"EWGL 2"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date/Place"} infoList={["June 6 - 7th, 2026", "Cary, NC"]} /> 
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={[
                        "$5k +/- prize pool"
                        , "24 team max"
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

