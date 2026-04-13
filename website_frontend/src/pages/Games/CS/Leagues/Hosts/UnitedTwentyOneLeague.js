import { EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const UnitedTwentyOneLeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"United TwentyOne League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Bi-Monthly Leagues"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Main and Second Divisions", "$10,000 Prize Pool (Main Division)", "$2,000 Prize Pool (Second Division)", "Winners of Second Division Move to Main", "Live Streamed Matches", "Highly Competitive"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - Available Worldwide"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Entry Fee TBD"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://x.com/OfUnited21"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/CS2/leagues"} />
            </div>
        </div>
    );
}