import { EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const DropInGamingWagers = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"Drop-In Gaming"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Fees"} infoList={["Match Fee: 10%", "Varying Fee with Deposits/Withdrawals"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Set Buy In Amounts", "Support on Twitter", "Small Number of Users"]} />
                </div>

                <div>
                    <EventInfoCard title={"Restrictions"} infoList={["16+", "NA / EU Only"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://www.dropingaming.com/matches/"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/LoL/wagers"} />
            </div>
        </div>
    );
}