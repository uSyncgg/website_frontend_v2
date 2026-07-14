import { EventInfoCard, HeaderImage, ExternalButton, BackButton, SeoData } from "components";
import '../../../EventInformation.css';

export const ShintoChamps2026 = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="The Premier Circuit's 2nd annual Champs event hosted at the prestigious Game Arena in downtown Columbus, Ohio. This is the Premier Circuit's biggest event of the year, you don't want to miss it!"
                canonicalPath={"/lans/shintochamps2026"}
            />

            <HeaderImage title={"Shinto Champs"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date/Place"} infoList={["Sept 4 - 6th, 2026", "Columbus, OH"]} /> 
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={[
                        "$7.5k Prize Pool"
                        , "48 teams MAX"
                        , "Pool Play then Double Elim Bracket"
                        , "Last LAN Event for BO7"
                    ]} /> 
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Team Pass: $325"]} footer={<ExternalButton blank={true} title={"Join Now"} path={"https://tpc.misfitsarena.gg/lan/shinto-champs-presented-by-misfits-arena-mqfrnrkx"} />}/> 
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/call-of-duty/lans"} />
            </div>
        </div>
    );
}

