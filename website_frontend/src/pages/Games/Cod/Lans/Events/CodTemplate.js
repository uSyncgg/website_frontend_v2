import { EventInfoCard, HeaderImage, ExternalButton, BackButton, SeoData } from "components";
import '../../../EventInformation.css';

export const INSERTFILENAME = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="INPUT DESCRIPTION HERE"
                canonicalPath={"/lans/INSERT PATH HERE"}
            />

            <HeaderImage title={"INSERT TITLE HERE"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date/Place"} infoList={["INSERT DATE HERE", "INSERT LOCATION HERE"]} /> 
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={[
                        "INSERT DESCRIPTION HERE"
                        , "INSERT DESCRIPTION HERE"
                        , "INSERT DESCRIPTION HERE"
                        , "INSERT DESCRIPTION HERE"
                        , "INSERT DESCRIPTION HERE"
                    ]} /> 
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["INSERT ENTRY FEE HERE"]} /> 
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"INSERT LINK TO EVENT"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/call-of-duty/lans"} />
            </div>
        </div>
    );
}
