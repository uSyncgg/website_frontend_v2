import { EventInfoCard, HeaderImage, ExternalButton, BackButton, SeoData } from "components";
import '../../../EventInformation.css';

export const LowtierMajorIV = () => {
    return (
        <div className="standardContainer">
            <SeoData 
                title={"Lowtier Major IV - Convention"}
                description={"Every player planning to attend this event must receive a ranking before forming a roster. You must join our discord and put your name in the “player-rating” text channel under the general section. "}
                canonicalPath={"/lans/lowtier-major-iv"}
            />
            
            <HeaderImage title={"Lowtier Major IV"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date/Place"} infoList={["June 13 - 14th, 2026", "Knoxville, TN"]} /> 
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["$5,000 Prize Pool, Based on Entrants", "4v4 CDL Ruleset", "Players Must be Ranked, and a Point System is Assigned to Each Player", "Maximum of 24 Points Per Team"]} /> 
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Team Pass: $325"]} footer={<ExternalButton blank={true} title={"Join Now"} path={"https://x.com/TPCircuit/status/2031850516507181452"} />}/> 
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/call-of-duty/lans"} />
            </div>
        </div>
    );
}
