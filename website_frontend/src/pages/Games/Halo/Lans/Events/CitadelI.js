import { EventInfoCard, HeaderImage, ExternalButton, BackButton, SeoData } from "components";
import '../../../EventInformation.css';

export const CitadelI = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Hosted by Halo Growth Guild (HGG), Citadel I is a community-driven Halo LAN weekend bringing players together from across the country to celebrate a shared love for Halo. Experience both classic and modern Halo through competition."
                canonicalPath={"/lans/citadel-i"}
            />

            <HeaderImage title={"Citadel I"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date/Place"} infoList={["August 15 - 17th, 2026", "Lakewood, CO"]} /> 
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={[
                        "Community Draft Tournament"
                        , "Open 8s and pickup games"
                        , "Casual play and competition throughout the weekend"
                        , "HALO 2 CLASSIC (SAT ONLY)"
                        , "HALO INFINITE (SAT & SUN)"
                    ]} /> 
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["$25 per day"]} footer={<ExternalButton blank={true} title={"Join Now"} path={"https://nerdstreet.com/events/citadel-i-halo-lan-2026-08-15?section=overview"} />}/> 
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/halo/lans"} />
            </div>
        </div>
    );
}
