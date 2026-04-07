import { EventInfoCard, HeaderImage, ExternalButton } from "components";
import '../../../EventInformation.css';

export const FemaleCodLeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"Female Call of Duty League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Winter and Spring Season"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["$1,500 Prize Pool", "Regular Season and Playoffs", "Female ONLY", "Competitive", "Live Streamed Matches"]} regionTitle={"Region/Type"} regionInfoList={["4v4 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["$100 per Team"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://x.com/FemaleC0DLeague"} />
            </div>
        </div>
    );
}