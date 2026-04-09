import { EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const OneUpWagers = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"One Up"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Fees"} infoList={["Match Fee: 15%", "Instant Withdrawals: 10%", "Free 3-5 Day Withdrawals", "$50 MINIMUM Withdrawals"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Xbox 1v1 ONLY", "Live Support on App", "Ranked Modes ONLY", "Small Number of Users"]} />
                </div>

                <div>
                    <EventInfoCard title={"Restrictions"} infoList={["18+", "Available Worldwide", "US State Restrictions: AZ, AK, IA, LA, MB, MI, MT, NV, SC, TN, VT, and WA"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://playoneup.com/"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/halo/wagers"} />
            </div>
        </div>
    );
}