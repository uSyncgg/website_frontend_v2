import { EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const SDCLeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"SDC League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring, Summer, Fall, and Winter Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Prize Pool Funded by Community", "Semi-Competitive", "Live Streamed Matches"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry", "No Rank Requirements"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://sdcleague.com"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/LoL/leagues"} />
            </div>
        </div>
    );
}
