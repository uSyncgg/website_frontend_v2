import { EventInfoCard, HeaderImage, ExternalButton } from "components";
import '../../../../EventInformation.css';

export const RSC3v3EULeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"RSC EU 3v3"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring and Fall Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["$600 Prize Pool Across All Divisions", "Sign up as an Individual", "6 Skill Divisions", "Weekly Matches"]} regionTitle={"Region/Type"} regionInfoList={["3v3 - EU"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://discord.com/invite/Bw4rvpG"} />
            </div>
        </div>
    );
}
