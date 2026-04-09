import { EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const DropInGamingH2H = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"Drop In Gaming"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Fees"} infoList={["Free 1v1 Matches"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Support on Twitter", "Small Number of Users", "Set Wager Amounts by Site", "Regular Daily Matches"]} />
                </div>

                <div>
                    <EventInfoCard title={"Restrictions"} infoList={["16+", "NA / EU Only"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://www.dropingaming.com/matches/"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/Valorant/head-to-head"} />
            </div>
        </div>
    );
}