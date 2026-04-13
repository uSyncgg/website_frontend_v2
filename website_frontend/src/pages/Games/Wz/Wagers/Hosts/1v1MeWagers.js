import { EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const OneVOneMeWagers = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"1v1Me"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Fees"} infoList={["Match Fee: 0%", "Varying Fee with Deposits/Withdrawals"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Live Support on App", "1v1 Kill Race Matches ONLY", "Large Number of Users", "Staking on Tournaments (Betting on Winner)"]} />
                </div>

                <div>
                    <EventInfoCard title={"Restrictions"} infoList={["18+", "Available Regions: USA, CA, IE, UK, FR, MX, and DE"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://www.1v1me.com/"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/warzone/wagers"} />
            </div>
        </div>
    );
}