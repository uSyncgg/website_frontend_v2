import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const CorporateLoLLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Corporate League of Legends league is the league that employed people have been searching for. Play with co-workers against other companies in League of Legends."
                canonicalPath={"/games/LoL/leagues/corporate-league"}
            />
            <HeaderImage title={"Corporate LOL League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring and Fall Season"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - NA"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["No Prize Pool", "Entry Fees Donated to Charity", "Non-Swiss Elimination Format", "Same Organization Co-Workers Only"]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["$250 per Team"]} footer={<ExternalButton blank={true} title={"Join Now"} path={"https://cea.gg/"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/LoL/leagues"} />
            </div>
        </div>
    );
}
