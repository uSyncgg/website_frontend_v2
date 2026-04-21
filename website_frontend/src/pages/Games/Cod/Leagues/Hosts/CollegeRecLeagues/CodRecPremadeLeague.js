import { EventInfoCard, HeaderImage, ExternalButton, BackButton, SeoData } from "components";
import '../../../../EventInformation.css';

export const CodRecPremadeLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description={"Recreational Call of Duty league for players looking for a challenge. Play weekly matches with your premade roster based on your skill level."}
                canonicalPath={"/games/call-of-duty/leagues/cod-rec-leagues/cod-rec-premade-league"}
            />

            <HeaderImage title={"Cod Rec Premade League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring, Summer, and Fall Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["No Prize Pool", "Recreational", "Live Streamed Matches", "Premade League", "Multiple Skill Divisions"]} regionTitle={"Region/Type"} regionInfoList={["4v4 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["$30 per Team"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://www.google.com/url?q=https%3A%2F%2Fcod.esrl.gg%2F&sa=D&sntz=1&usg=AOvVaw359r5MIeBPnIT5_Guhelh-"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/call-of-duty/leagues/cod-rec-leagues"} />
            </div>
        </div>
    );
}
