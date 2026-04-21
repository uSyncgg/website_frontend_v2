import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const OneVOneMeWagers = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="1v1 Call of Duty wager matches for real money. Win cash by playing video games."
                canonicalPath={"/games/call-of-duty/wagers/1v1me"}
            />
            <HeaderImage title={"1v1Me"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Fees"} infoList={["Match Fee: 0%", "Consistent Fee with Deposits/Withdrawals"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Live Support on App", "1v1 Matches ONLY", "Large Number of Users", "Staking on Tournaments (Betting on Winner)"]} />
                </div>

                <div>
                    <EventInfoCard title={"Restrictions"} infoList={["18+", "Available Regions: USA, CA, IE, UK, FR, MX, DE"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://www.1v1me.com/"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/call-of-duty/wagers"} />
            </div>
        </div>
    );
}