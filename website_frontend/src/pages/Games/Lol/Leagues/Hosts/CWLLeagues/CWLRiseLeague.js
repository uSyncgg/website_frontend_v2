import { EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../../EventInformation.css';

export const CWLRiseLeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"CWL Rise"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring, Summer, and Fall Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["€200 Prize Pool for First, €80 for Second", "2 Consecutive 4-Week Tournaments", "Community Contests and Events During Season and Offseason", "Flexible Rules for EUNE Players", "Support on Discord", "Live Streamed Matches"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - EUW"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["€25 per Team", "100 LP Individual Cap | 200 LP Team Cap | Up to 2 Masters players per Team"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://discord.gg/WTJJmgPgCU"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/LoL/leagues/cobalt-winds-leagues"} />
            </div>
        </div>
    );
}
