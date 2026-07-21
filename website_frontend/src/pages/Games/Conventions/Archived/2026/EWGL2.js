import { EventInfoCard, HeaderImage, ExternalButton, BackButton, SeoData } from "components";
import '../../../EventInformation.css';

export const EWGL2 = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"EWGL 2 - Convention"}
                description="EWGL 2, Cary, North Carolina, June 6th & 7th, $5,000 +/- Prize Pool + Championship Rings + MVP Ring."
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
                    <EventInfoCard title={"Entry Fee"} infoList={["Entry fee unknown ($300 estimated)"]} footer={<ExternalButton blank={true} title={"Join Now"} path={"https://x.com/ewgleague/status/2033241825549451307?s=20"} />}/> 
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/call-of-duty/lans"} />
            </div>
        </div>
    );
}

