import { EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const CmgWagers = () => {
    return (
        <div className="standardContainer">
            <HeaderImage imageClass={"cmgPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Fees"} infoList={["Regular Member: 7.5%", "Elite Member: 3.75%", "Live Support Fee: 2.5% - 5%", "Deposit/Withdraw Fees through Paypal"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["24/7 Live Support", "Consistent Rule Updates", "Large Number of Users and Matches Daily"]} />
                </div>

                <div>
                    <EventInfoCard title={"Restrictions"} infoList={["18+", "Available Worldwide", "US State Restrictions: AZ, IA, MS, MT, NV, and SD"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://www.checkmategaming.com/challenges"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/warzone/wagers"} />
            </div>
        </div>
    );
}