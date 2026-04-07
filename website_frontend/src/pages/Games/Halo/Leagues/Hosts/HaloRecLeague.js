import { EventInfoCard, HeaderImage, ExternalButton } from "components";
import '../../../EventInformation.css';

export const HaloRecLeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage imageClass={"hrlPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring, Summer, and Fall Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Multiple Premade and Mixed Divisions - Players can ONLY play on 1 premade team and 1 mixed team MAX", "Wednesdays (Mixed) and Thursdays(Premade) for Gamedays", "9PM EST (Premade) and 10:30PM (Mixed) for Gametimes", "Recreational", "Live Streamed Matches"]} regionTitle={"Region/Type"} regionInfoList={["4v4 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["$30 - Premade Teams", "Free Entry - Mixed"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://halo.esrl.gg/"} />
            </div>
        </div>
    );
}