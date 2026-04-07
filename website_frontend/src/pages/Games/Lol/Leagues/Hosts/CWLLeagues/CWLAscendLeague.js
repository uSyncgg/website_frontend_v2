import { EventInfoCard, HeaderImage, ExternalButton } from "components";
import '../../../../EventInformation.css';

export const CWLAscendLeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"CWL Ascend"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring, Summer, and Fall Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["€350 Prize Pool for First Place, €100 for Second", "2 Consecutive 4-Week Tournaments", "Community Contests and Events During Season and Offseason", "Flexible Rules for EUNE Players", "Support on Discord", "Live Streamed Matches"]} regionTitle={"Region/Type"} regionInfoList={["5v5 EUW"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["€40 per Team", "750 LP Individual Cap | No Team Cap"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://discord.gg/WTJJmgPgCU"} />
            </div>
        </div>
    );
}
